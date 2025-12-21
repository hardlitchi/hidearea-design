import type {
  PluginContext,
  PluginMetadata,
  PluginOptions,
  PluginLogger,
  ThemeDefinition,
} from './types.js';

/**
 * プラグインコンテキストの実装
 */
export class PluginContextImpl implements PluginContext {
  private eventHandlers: Map<string, Set<(...args: unknown[]) => void>> = new Map();
  private registeredComponents: Map<string, CustomElementConstructor> = new Map();
  private registeredThemes: Map<string, ThemeDefinition> = new Map();
  private extendedTokens: Record<string, string> = {};
  private globalStyles: string[] = [];

  constructor(
    public metadata: PluginMetadata,
    public options: PluginOptions,
    public logger: PluginLogger
  ) {}

  /**
   * カスタムコンポーネントを登録
   */
  registerComponent(name: string, constructor: CustomElementConstructor): void {
    if (this.registeredComponents.has(name)) {
      this.logger.warn(`Component "${name}" is already registered. Overwriting.`);
    }

    // Web Componentsとして登録
    if (!customElements.get(name)) {
      customElements.define(name, constructor);
      this.registeredComponents.set(name, constructor);
      this.logger.info(`Registered component: ${name}`);
    } else {
      this.logger.warn(`Component "${name}" is already defined in customElements registry`);
    }
  }

  /**
   * カスタムテーマを登録
   */
  registerTheme(name: string, theme: ThemeDefinition): void {
    if (this.registeredThemes.has(name)) {
      this.logger.warn(`Theme "${name}" is already registered. Overwriting.`);
    }

    this.registeredThemes.set(name, theme);
    this.applyTheme(theme);
    this.logger.info(`Registered theme: ${name}`);
  }

  /**
   * テーマを適用
   */
  private applyTheme(theme: ThemeDefinition): void {
    // CSS変数を適用
    const root = document.documentElement;
    Object.entries(theme.tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // 追加スタイルを適用
    if (theme.styles) {
      this.addGlobalStyles(theme.styles);
    }

    // ダークモードのサポート
    if (theme.dark) {
      const darkModeStyles = `
        @media (prefers-color-scheme: dark) {
          :root {
            ${Object.entries(theme.dark.tokens)
              .map(([key, value]) => `${key}: ${value};`)
              .join('\n            ')}
          }
        }
      `;
      this.addGlobalStyles(darkModeStyles);

      if (theme.dark.styles) {
        this.addGlobalStyles(theme.dark.styles);
      }
    }
  }

  /**
   * デザイントークンを拡張
   */
  extendTokens(tokens: Record<string, string>): void {
    Object.assign(this.extendedTokens, tokens);

    // CSS変数として適用
    const root = document.documentElement;
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    this.logger.info(`Extended tokens: ${Object.keys(tokens).join(', ')}`);
  }

  /**
   * グローバルスタイルを追加
   */
  addGlobalStyles(styles: string): void {
    this.globalStyles.push(styles);

    // スタイル要素を作成して追加
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    styleElement.setAttribute('data-plugin', this.metadata.id);
    document.head.appendChild(styleElement);

    this.logger.debug(`Added global styles for plugin: ${this.metadata.id}`);
  }

  /**
   * イベントリスナーを登録
   */
  on(event: string, handler: (...args: unknown[]) => void): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }
    this.eventHandlers.get(event)!.add(handler);
  }

  /**
   * イベントリスナーを解除
   */
  off(event: string, handler: (...args: unknown[]) => void): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.eventHandlers.delete(event);
      }
    }
  }

  /**
   * イベントを発火
   */
  emit(event: string, ...args: unknown[]): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          this.logger.error(`Error in event handler for "${event}":`, error);
        }
      });
    }
  }

  /**
   * クリーンアップ
   */
  cleanup(): void {
    // 登録されたスタイルを削除
    const styleElements = document.querySelectorAll(`style[data-plugin="${this.metadata.id}"]`);
    styleElements.forEach(el => el.remove());

    // イベントハンドラーをクリア
    this.eventHandlers.clear();

    this.logger.info(`Cleaned up plugin: ${this.metadata.id}`);
  }

  /**
   * 登録されたコンポーネントを取得
   */
  getRegisteredComponents(): Map<string, CustomElementConstructor> {
    return new Map(this.registeredComponents);
  }

  /**
   * 登録されたテーマを取得
   */
  getRegisteredThemes(): Map<string, ThemeDefinition> {
    return new Map(this.registeredThemes);
  }

  /**
   * 拡張されたトークンを取得
   */
  getExtendedTokens(): Record<string, string> {
    return { ...this.extendedTokens };
  }
}

/**
 * デフォルトのロガー実装
 */
export class DefaultLogger implements PluginLogger {
  constructor(private pluginId: string, private enabled = true) {}

  private log(level: string, message: string, ...args: unknown[]): void {
    if (!this.enabled) return;

    const prefix = `[Plugin:${this.pluginId}]`;
    console[level as 'log' | 'warn' | 'error'](prefix, message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log('log', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV === 'development') {
      this.log('log', `[DEBUG] ${message}`, ...args);
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}
