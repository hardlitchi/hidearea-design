import type { Plugin, PluginEntry, PluginOptions, PluginState } from './types.js';
import { PluginState as State } from './types.js';
import { PluginContextImpl, DefaultLogger } from './plugin-context.js';

/**
 * プラグインマネージャーのオプション
 */
export interface PluginManagerOptions {
  /** ロギングを有効にするか */
  enableLogging?: boolean;
  /** 自動的にプラグインを有効化するか */
  autoActivate?: boolean;
}

/**
 * プラグインマネージャー
 * プラグインのライフサイクルを管理
 */
export class PluginManager {
  private static instance: PluginManager | null = null;
  private plugins: Map<string, PluginEntry> = new Map();
  private options: Required<PluginManagerOptions>;

  constructor(options: PluginManagerOptions = {}) {
    this.options = {
      enableLogging: options.enableLogging ?? true,
      autoActivate: options.autoActivate ?? true,
    };
  }

  /**
   * シングルトンインスタンスを取得
   */
  static getInstance(options?: PluginManagerOptions): PluginManager {
    if (!PluginManager.instance) {
      PluginManager.instance = new PluginManager(options);
    }
    return PluginManager.instance;
  }

  /**
   * シングルトンインスタンスをリセット
   */
  static resetInstance(): void {
    if (PluginManager.instance) {
      PluginManager.instance.cleanup();
      PluginManager.instance = null;
    }
  }

  /**
   * プラグインを登録
   */
  async register(plugin: Plugin, options: PluginOptions = {}): Promise<void> {
    const { id } = plugin.metadata;

    if (this.plugins.has(id)) {
      throw new Error(`Plugin "${id}" is already registered`);
    }

    // 依存関係をチェック
    if (plugin.metadata.dependencies) {
      for (const depId of plugin.metadata.dependencies) {
        if (!this.plugins.has(depId)) {
          throw new Error(
            `Plugin "${id}" depends on "${depId}", but it is not registered`
          );
        }
      }
    }

    // コンテキストを作成
    const logger = new DefaultLogger(id, this.options.enableLogging);
    const context = new PluginContextImpl(plugin.metadata, options, logger);

    // プラグインエントリを作成
    const entry: PluginEntry = {
      plugin,
      state: State.Uninstalled,
      context,
    };

    this.plugins.set(id, entry);

    try {
      // インストール
      await this.install(id);

      // 自動有効化 (optionsで明示的に指定された場合はそちらを優先)
      const autoActivate = options.autoActivate ?? this.options.autoActivate;
      if (autoActivate) {
        await this.activate(id);
      }

      logger.info(`Plugin "${id}" registered successfully`);
    } catch (error) {
      entry.state = State.Error;
      entry.error = error as Error;
      logger.error(`Failed to register plugin "${id}":`, error);
      throw error;
    }
  }

  /**
   * プラグインをインストール
   */
  async install(pluginId: string): Promise<void> {
    const entry = this.getEntry(pluginId);

    if (entry.state !== State.Uninstalled) {
      throw new Error(`Plugin "${pluginId}" is already installed`);
    }

    try {
      // install メソッドを呼び出し
      await entry.plugin.install(entry.context);

      // onInstall フックを呼び出し
      if (entry.plugin.onInstall) {
        await entry.plugin.onInstall(entry.context);
      }

      entry.state = State.Installed;
      entry.context.logger.info(`Plugin "${pluginId}" installed`);
    } catch (error) {
      entry.state = State.Error;
      entry.error = error as Error;
      throw error;
    }
  }

  /**
   * プラグインをアンインストール
   */
  async uninstall(pluginId: string): Promise<void> {
    const entry = this.getEntry(pluginId);

    // 有効化されている場合は先に無効化
    if (entry.state === State.Active) {
      await this.deactivate(pluginId);
    }

    if (entry.state !== State.Installed && entry.state !== State.Inactive) {
      throw new Error(`Plugin "${pluginId}" is not installed`);
    }

    try {
      // onUninstall フックを呼び出し
      if (entry.plugin.onUninstall) {
        await entry.plugin.onUninstall(entry.context);
      }

      // クリーンアップ
      entry.context.cleanup();

      // プラグインを削除
      this.plugins.delete(pluginId);
      entry.context.logger.info(`Plugin "${pluginId}" uninstalled`);
    } catch (error) {
      entry.state = State.Error;
      entry.error = error as Error;
      throw error;
    }
  }

  /**
   * プラグインを有効化
   */
  async activate(pluginId: string): Promise<void> {
    const entry = this.getEntry(pluginId);

    if (entry.state === State.Active) {
      return; // 既に有効化されている
    }

    if (entry.state !== State.Installed && entry.state !== State.Inactive) {
      throw new Error(
        `Plugin "${pluginId}" must be installed before activation (current state: ${entry.state})`
      );
    }

    try {
      // onActivate フックを呼び出し
      if (entry.plugin.onActivate) {
        await entry.plugin.onActivate(entry.context);
      }

      entry.state = State.Active;
      entry.context.logger.info(`Plugin "${pluginId}" activated`);
    } catch (error) {
      entry.state = State.Error;
      entry.error = error as Error;
      throw error;
    }
  }

  /**
   * プラグインを無効化
   */
  async deactivate(pluginId: string): Promise<void> {
    const entry = this.getEntry(pluginId);

    if (entry.state !== State.Active) {
      throw new Error(`Plugin "${pluginId}" is not active`);
    }

    try {
      // onDeactivate フックを呼び出し
      if (entry.plugin.onDeactivate) {
        await entry.plugin.onDeactivate(entry.context);
      }

      entry.state = State.Inactive;
      entry.context.logger.info(`Plugin "${pluginId}" deactivated`);
    } catch (error) {
      entry.state = State.Error;
      entry.error = error as Error;
      throw error;
    }
  }

  /**
   * プラグインを登録解除
   */
  unregister(pluginId: string): void {
    const entry = this.getEntry(pluginId);

    // 有効化されている場合は先に無効化
    if (entry.state === State.Active) {
      throw new Error(
        `Plugin "${pluginId}" must be deactivated before unregistering`
      );
    }

    // クリーンアップ
    entry.context.cleanup();

    this.plugins.delete(pluginId);
    entry.context.logger.info(`Plugin "${pluginId}" unregistered`);
  }

  /**
   * プラグインの状態を取得
   */
  getState(pluginId: string): PluginState {
    return this.getEntry(pluginId).state;
  }

  /**
   * プラグインエントリを取得
   */
  getPlugin(pluginId: string): PluginEntry | undefined {
    return this.plugins.get(pluginId);
  }

  /**
   * すべてのプラグインを取得
   */
  getAllPlugins(): Map<string, PluginEntry> {
    return new Map(this.plugins);
  }

  /**
   * 有効化されたプラグインを取得
   */
  getActivePlugins(): PluginEntry[] {
    return Array.from(this.plugins.values()).filter(
      entry => entry.state === State.Active
    );
  }

  /**
   * プラグインが登録されているか確認
   */
  has(pluginId: string): boolean {
    return this.plugins.has(pluginId);
  }

  /**
   * プラグインがインストールされているか確認
   */
  isInstalled(pluginId: string): boolean {
    const entry = this.plugins.get(pluginId);
    return entry !== undefined && entry.state !== State.Uninstalled;
  }

  /**
   * プラグインがアクティブか確認
   */
  isActive(pluginId: string): boolean {
    const entry = this.plugins.get(pluginId);
    return entry !== undefined && entry.state === State.Active;
  }

  /**
   * プラグインエントリを取得（存在しない場合はエラー）
   */
  private getEntry(pluginId: string): PluginEntry {
    const entry = this.plugins.get(pluginId);
    if (!entry) {
      throw new Error(`Plugin "${pluginId}" is not registered`);
    }
    return entry;
  }

  /**
   * すべてのプラグインをクリーンアップ
   */
  async cleanup(): Promise<void> {
    const activePlugins = this.getActivePlugins();

    // すべての有効なプラグインを無効化
    for (const entry of activePlugins) {
      try {
        await this.deactivate(entry.plugin.metadata.id);
      } catch (error) {
        console.error(
          `Failed to deactivate plugin "${entry.plugin.metadata.id}":`,
          error
        );
      }
    }

    // すべてのプラグインをアンインストール
    for (const [pluginId, entry] of this.plugins) {
      try {
        if (entry.state === State.Installed) {
          await this.uninstall(pluginId);
        }
        entry.context.cleanup();
      } catch (error) {
        console.error(`Failed to cleanup plugin "${pluginId}":`, error);
      }
    }

    this.plugins.clear();
  }
}

/**
 * グローバルプラグインマネージャーインスタンス
 */
let globalPluginManager: PluginManager | null = null;

/**
 * グローバルプラグインマネージャーを取得
 */
export function getPluginManager(options?: PluginManagerOptions): PluginManager {
  if (!globalPluginManager) {
    globalPluginManager = new PluginManager(options);
  }
  return globalPluginManager;
}

/**
 * グローバルプラグインマネージャーをリセット
 */
export function resetPluginManager(): void {
  if (globalPluginManager) {
    globalPluginManager.cleanup();
    globalPluginManager = null;
  }
}
