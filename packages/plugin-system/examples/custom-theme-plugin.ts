/**
 * カスタムテーマプラグインの例
 *
 * このプラグインは "Sunset" テーマを追加します
 */

import { createPlugin } from '../src/index.js';
import type { ThemeDefinition } from '../src/types.js';

/**
 * Sunset テーマ定義
 */
const sunsetTheme: ThemeDefinition = {
  name: 'sunset',
  tokens: {
    // Primary colors - オレンジ/赤系
    '--ha-color-primary': '#ff6b35',
    '--ha-color-primary-hover': '#ff5722',
    '--ha-color-primary-active': '#e64a19',

    // Secondary colors - ピンク系
    '--ha-color-secondary': '#ff8a80',
    '--ha-color-secondary-hover': '#ff6e6e',
    '--ha-color-secondary-active': '#ff5252',

    // Background colors - 暖色系
    '--ha-color-background-primary': '#fff5f0',
    '--ha-color-background-secondary': '#ffe8e0',
    '--ha-color-background-tertiary': '#ffd6cc',

    // Text colors
    '--ha-color-text-primary': '#3e2723',
    '--ha-color-text-secondary': '#5d4037',
    '--ha-color-text-tertiary': '#795548',

    // Status colors
    '--ha-color-success': '#66bb6a',
    '--ha-color-warning': '#ffa726',
    '--ha-color-error': '#ef5350',
    '--ha-color-info': '#42a5f5',

    // Border colors
    '--ha-color-border-primary': '#ffccbc',
    '--ha-color-border-secondary': '#ffb09933',
  },
  dark: {
    tokens: {
      // Dark mode - 夕暮れの暗い色調
      '--ha-color-primary': '#ff8a65',
      '--ha-color-primary-hover': '#ff7043',
      '--ha-color-primary-active': '#ff5722',

      '--ha-color-secondary': '#ffab91',
      '--ha-color-secondary-hover': '#ff9e80',
      '--ha-color-secondary-active': '#ff8a65',

      '--ha-color-background-primary': '#1a1110',
      '--ha-color-background-secondary': '#2d1f1e',
      '--ha-color-background-tertiary': '#3e2723',

      '--ha-color-text-primary': '#ffd6cc',
      '--ha-color-text-secondary': '#ffccbc',
      '--ha-color-text-tertiary': '#ffb09966',

      '--ha-color-border-primary': '#5d4037',
      '--ha-color-border-secondary': '#4e342e',
    },
  },
  styles: `
    /* Sunset theme specific styles */
    :root[data-theme="sunset"] {
      /* Shadow colors - 暖かみのある影 */
      --ha-shadow-sm: 0 1px 2px 0 rgba(255, 107, 53, 0.05);
      --ha-shadow-md: 0 4px 6px -1px rgba(255, 107, 53, 0.1);
      --ha-shadow-lg: 0 10px 15px -3px rgba(255, 107, 53, 0.15);

      /* Gradient backgrounds */
      --sunset-gradient: linear-gradient(135deg, #ff6b35 0%, #ff8a80 100%);
    }

    :root[data-theme="sunset"] .sunset-gradient {
      background: var(--sunset-gradient);
    }
  `,
};

/**
 * Sunset テーマプラグイン
 */
export const sunsetThemePlugin = createPlugin({
  metadata: {
    id: 'sunset-theme',
    name: 'Sunset Theme Plugin',
    version: '1.0.0',
    description: '暖かみのあるオレンジ/ピンク系のSunsetテーマ',
    author: 'Hidearea Design System',
  },

  install(context) {
    // テーマを登録
    context.registerTheme('sunset', sunsetTheme);

    context.logger.info('Sunset theme registered');
  },

  onActivate(context) {
    // テーマを適用
    document.documentElement.setAttribute('data-theme', 'sunset');
    context.logger.info('Sunset theme activated');
  },

  onDeactivate(context) {
    // テーマを解除
    document.documentElement.removeAttribute('data-theme');
    context.logger.info('Sunset theme deactivated');
  },
});
