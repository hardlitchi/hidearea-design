/**
 * プラグインのメタデータ
 */
export interface PluginMetadata {
  /** プラグインの一意な識別子 */
  id: string;
  /** プラグイン名 */
  name: string;
  /** プラグインのバージョン */
  version: string;
  /** プラグインの説明 */
  description?: string;
  /** プラグインの作者 */
  author?: string;
  /** プラグインのホームページURL */
  homepage?: string;
  /** このプラグインが依存する他のプラグインのID */
  dependencies?: string[];
}

/**
 * プラグインの設定オプション
 */
export interface PluginOptions {
  /** 自動的にプラグインを有効化するか */
  autoActivate?: boolean;
  /** プラグイン固有の設定 */
  [key: string]: unknown;
}

/**
 * プラグインのライフサイクルフック
 */
export interface PluginLifecycle {
  /** プラグインがインストールされたときに呼び出される */
  onInstall?(context: PluginContext): void | Promise<void>;
  /** プラグインがアンインストールされたときに呼び出される */
  onUninstall?(context: PluginContext): void | Promise<void>;
  /** プラグインが有効化されたときに呼び出される */
  onActivate?(context: PluginContext): void | Promise<void>;
  /** プラグインが無効化されたときに呼び出される */
  onDeactivate?(context: PluginContext): void | Promise<void>;
}

/**
 * プラグインのコンテキスト
 */
export interface PluginContext {
  /** プラグインのメタデータ */
  metadata: PluginMetadata;
  /** プラグインの設定オプション */
  options: PluginOptions;
  /** カスタムコンポーネントを登録する */
  registerComponent(name: string, constructor: CustomElementConstructor): void;
  /** カスタムテーマを登録する */
  registerTheme(name: string, theme: ThemeDefinition): void;
  /** デザイントークンを拡張する */
  extendTokens(tokens: Record<string, string>): void;
  /** グローバルスタイルを追加する */
  addGlobalStyles(styles: string): void;
  /** イベントリスナーを登録する */
  on(event: string, handler: (...args: unknown[]) => void): void;
  /** イベントリスナーを解除する */
  off(event: string, handler: (...args: unknown[]) => void): void;
  /** イベントを発火する */
  emit(event: string, ...args: unknown[]): void;
  /** クリーンアップ (内部用) */
  cleanup(): void;
  /** ロガー */
  logger: PluginLogger;
}

/**
 * プラグインのロガー
 */
export interface PluginLogger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}

/**
 * テーマ定義
 */
export interface ThemeDefinition {
  /** テーマ名 */
  name: string;
  /** テーマのCSS変数 */
  tokens: Record<string, string>;
  /** 追加のスタイル */
  styles?: string;
  /** ダークモードのバリアント */
  dark?: {
    tokens: Record<string, string>;
    styles?: string;
  };
}

/**
 * プラグインのインターフェース
 */
export interface Plugin extends PluginLifecycle {
  /** プラグインのメタデータ */
  metadata: PluginMetadata;
  /** プラグインの初期化 */
  install(context: PluginContext): void | Promise<void>;
}

/**
 * プラグインの状態
 */
export enum PluginState {
  /** 未インストール */
  Uninstalled = 'uninstalled',
  /** インストール済み */
  Installed = 'installed',
  /** 有効化済み */
  Active = 'active',
  /** 無効化済み */
  Inactive = 'inactive',
  /** エラー */
  Error = 'error',
}

/**
 * プラグインレジストリのエントリ
 */
export interface PluginEntry {
  /** プラグインインスタンス */
  plugin: Plugin;
  /** プラグインの状態 */
  state: PluginState;
  /** プラグインのコンテキスト */
  context: PluginContext;
  /** エラー情報（存在する場合） */
  error?: Error;
}
