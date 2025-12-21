/**
 * @hidearea-design/plugin-system
 *
 * Hidearea Design Systemのプラグインシステム
 * カスタムコンポーネント、テーマ、機能拡張を可能にします
 */

// 型定義
export type {
  Plugin,
  PluginMetadata,
  PluginOptions,
  PluginContext,
  PluginLifecycle,
  PluginLogger,
  PluginEntry,
  ThemeDefinition,
} from './types.js';

export { PluginState } from './types.js';

// プラグインコンテキスト
export { PluginContextImpl, DefaultLogger } from './plugin-context.js';

// プラグインマネージャー
export {
  PluginManager,
  getPluginManager,
  resetPluginManager,
  type PluginManagerOptions,
} from './plugin-manager.js';

// ヘルパー関数
export { createPlugin } from './helpers.js';
