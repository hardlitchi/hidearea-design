/**
 * Theme Switcher Component Metadata
 * Used by MCP server for AI-powered assistance
 */

import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'Theme Switcher',
  tagName: 'ha-theme-switcher',
  description: 'テーマ切り替えコンポーネント。ライト/ダーク/自動モードの切り替えを提供します。',
  category: 'Utility',
  props: [
    {
      name: 'variant',
      type: "'toggle' | 'dropdown' | 'segmented'",
      default: "'toggle'",
      required: false,
      description: 'コンポーネントの表示スタイル',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      required: false,
      description: 'コンポーネントのサイズ',
    },
    {
      name: 'show-label',
      type: 'boolean',
      default: 'false',
      required: false,
      description: 'ラベルを表示するかどうか',
    },
    {
      name: 'show-auto',
      type: 'boolean',
      default: 'false',
      required: false,
      description: '自動モードを表示するかどうか',
    },
  ],
  events: [
    {
      name: 'ha-theme-change',
      detail: "{ theme: 'light' | 'dark' | 'auto', effective: 'light' | 'dark' }",
      description: 'テーマが変更されたときに発火',
    },
  ],
  slots: [],
  examples: [
    {
      title: '基本的な使い方',
      description: 'デフォルトのトグルボタンスタイル',
      code: `<ha-theme-switcher></ha-theme-switcher>`,
    },
    {
      title: 'ドロップダウンスタイル',
      description: 'ドロップダウンメニューでテーマを選択',
      code: `<ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>`,
    },
    {
      title: 'セグメント付きコントロール',
      description: '自動モードオプション付きのセグメント化されたコントロール',
      code: `<ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>`,
    },
  ],
  accessibility: {
    roles: ['button', 'group'],
    keyboardSupport: [
      'Enter - テーマを切り替え',
      'Space - テーマを切り替え',
      'Arrow Keys - セグメント間を移動（segmentedバリアントの場合）',
    ],
    ariaAttributes: ['aria-label', 'aria-pressed', 'aria-expanded'],
  },
  tokens: {
    colors: [
      'component-button-primary-background-default',
      'component-button-primary-text-default',
      'background-primary',
      'foreground-primary',
    ],
    spacing: ['spacing-sm', 'spacing-md', 'spacing-lg'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md', 'interaction-transition-fast-duration'],
  },
};
