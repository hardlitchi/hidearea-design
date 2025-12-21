import type { Plugin, PluginMetadata, PluginContext, PluginLifecycle } from './types.js';

/**
 * プラグイン作成のオプション
 */
export interface CreatePluginOptions extends Partial<PluginLifecycle> {
  /** プラグインのメタデータ */
  metadata: PluginMetadata;
  /** プラグインのインストール関数 */
  install: (context: PluginContext) => void | Promise<void>;
}

/**
 * プラグインを作成するヘルパー関数
 *
 * @example
 * ```ts
 * const myPlugin = createPlugin({
 *   metadata: {
 *     id: 'my-plugin',
 *     name: 'My Plugin',
 *     version: '1.0.0',
 *   },
 *   install(context) {
 *     context.registerComponent('my-component', MyComponent);
 *   },
 * });
 * ```
 */
export function createPlugin(options: CreatePluginOptions): Plugin {
  const { metadata, install, onInstall, onUninstall, onActivate, onDeactivate } = options;

  return {
    metadata,
    install,
    onInstall,
    onUninstall,
    onActivate,
    onDeactivate,
  };
}
