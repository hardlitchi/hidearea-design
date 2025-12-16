export default {
  name: "theme-switcher",
  displayName: "Theme Switcher",
  category: "utility",
  description: "テーマ切り替えコンポーネント。ライト/ダーク/自動モードの切り替えを提供します。",
  attributes: [
    {
      name: "variant",
      type: "'toggle' | 'dropdown' | 'segmented'",
      default: "'toggle'",
      description: "コンポーネントの表示スタイル",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "コンポーネントのサイズ",
    },
    {
      name: "show-label",
      type: "boolean",
      default: "false",
      description: "ラベルを表示するかどうか",
    },
    {
      name: "show-auto",
      type: "boolean",
      default: "false",
      description: "自動モードを表示するかどうか",
    },
  ],
  methods: [],
  events: [],
  slots: [],
  cssCustomProperties: [],
  examples: [
    {
      title: "基本的な使い方",
      description: "デフォルトのトグルボタンスタイル",
      code: `<ha-theme-switcher></ha-theme-switcher>`,
    },
    {
      title: "ドロップダウンスタイル",
      description: "ドロップダウンメニューでテーマを選択",
      code: `<ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>`,
    },
    {
      title: "セグメント付きコントロール",
      description: "自動モードオプション付きのセグメント化されたコントロール",
      code: `<ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>`,
    },
  ],
};
