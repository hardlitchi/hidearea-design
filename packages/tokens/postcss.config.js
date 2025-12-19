import purgecss from '@fullhuman/postcss-purgecss';

const isProd = process.env.NODE_ENV === 'production';

export default {
  plugins: [
    // PurgeCSSは本番環境でのみ有効化（開発中は無効）
    ...(isProd
      ? [
          purgecss({
            // コンテンツファイル: HTMLとTSファイルをスキャン
            content: [
              // Core package components
              '../core/src/**/*.{ts,html}',
              '../core/dist/**/*.{js,d.ts}',
              // React wrapper
              '../react/src/**/*.{ts,tsx}',
              // Vue wrapper
              '../vue/src/**/*.{ts,vue}',
              // Examples
              '../../example/**/*.{html,ts,tsx,vue,js}',
              // Docs
              '../docs/**/*.{md,vue,ts}',
              // Storybook
              '../storybook/**/*.{ts,tsx,mdx}',
            ],

            // Safelist: 削除してはいけないセレクタ
            safelist: {
              // Web Components のカスタム要素とその状態
              standard: [
                /^ha-/,
                /^data-/,
                /^aria-/,
                /:host/,
                /:defined/,
              ],
              // Deep selectors (::part など)
              deep: [
                /::part/,
                /::slotted/,
                /::shadow/,
              ],
              // Greedy patterns (部分一致)
              greedy: [
                // Theme-related
                /data-theme/,
                /\[theme=/,
                // State selectors
                /:hover/,
                /:focus/,
                /:focus-visible/,
                /:focus-within/,
                /:active/,
                /:disabled/,
                /:checked/,
                /:invalid/,
                /:valid/,
                /:required/,
                /:optional/,
                /:read-only/,
                /:read-write/,
                // Variant classes and attributes
                /variant-/,
                /size-/,
                /color-/,
                /\[variant=/,
                /\[size=/,
                // CSS variables (すべて保持 - デザイントークンとして重要)
                /^--/,
                // Component-specific classes
                /ha-.+/,
              ],
            },

            // CSS変数を保持
            variables: true,

            // キーフレームを保持
            keyframes: true,

            // フォントフェイスを保持
            fontFace: true,

            // 未使用のセレクタを削除しない（Web Components は動的に生成されるため）
            rejected: false,

            // デフォルトの抽出器を使用
            defaultExtractor: (content) => {
              // Custom element names (ha-button, ha-input, etc.)
              const customElements = content.match(/ha-[\w-]+/g) || [];

              // CSS classes
              const classes = content.match(/[\w-/:]+(?<!:)/g) || [];

              // Attribute values
              const attributes = content.match(/(?<=["'`])[^"'`]*(?=["'`])/g) || [];

              // CSS variable names
              const cssVars = content.match(/--[\w-]+/g) || [];

              return [
                ...new Set([...customElements, ...classes, ...attributes, ...cssVars]),
              ];
            },
          }),
        ]
      : []),
  ],
};
