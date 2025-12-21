import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Hidearea Design',
  description: 'モダンなWebコンポーネントライブラリ',
  lang: 'ja',

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split vendor libraries for better caching
            if (id.includes('node_modules')) {
              // VitePress core dependencies
              if (id.includes('vue')) return 'vendor-vue';
              if (id.includes('vitepress')) return 'vendor-vitepress';

              // Design system packages
              if (id.includes('@hidearea-design/core')) return 'vendor-core';
              if (id.includes('@hidearea-design/react')) return 'vendor-react';
              if (id.includes('@hidearea-design/tokens')) return 'vendor-tokens';

              // Other vendor code
              return 'vendor-other';
            }

            // Split component documentation pages into separate chunks
            if (id.includes('/components/')) {
              // Extract component name from path
              const match = id.match(/\/components\/([^/]+)\.md/);
              if (match) {
                return `page-component-${match[1]}`;
              }
              return 'page-components';
            }

            // Split guide pages
            if (id.includes('/guide/')) {
              return 'page-guide';
            }
          },
        },
      },
    },
  },

  themeConfig: {
    nav: [
      { text: 'ガイド', link: '/guide/getting-started' },
      { text: 'コンポーネント', link: '/components/overview' },
      { text: 'Storybook', link: 'https://storybook.hidearea-design.com' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'はじめに',
          items: [
            { text: '概要', link: '/guide/introduction' },
            { text: 'クイックスタート', link: '/guide/getting-started' },
            { text: 'インストール', link: '/guide/installation' },
          ],
        },
        {
          text: '基本',
          items: [
            { text: 'デザイントークン', link: '/guide/design-tokens' },
            { text: 'テーマ設定', link: '/guide/theming' },
            { text: 'アクセシビリティ', link: '/guide/accessibility' },
          ],
        },
        {
          text: 'フレームワーク',
          items: [
            { text: 'React', link: '/guide/react' },
            { text: 'Vue', link: '/guide/vue' },
            { text: 'その他', link: '/guide/other-frameworks' },
          ],
        },
      ],
      '/components/': [
        {
          text: '概要',
          items: [{ text: 'コンポーネント一覧', link: '/components/overview' }],
        },
        {
          text: 'フォーム',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Input', link: '/components/input' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'FormGroup', link: '/components/form-group' },
            { text: 'Select', link: '/components/select' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Switch', link: '/components/switch' },
          ],
        },
        {
          text: 'レイアウト',
          items: [
            { text: 'Container', link: '/components/container' },
            { text: 'Grid', link: '/components/grid' },
            { text: 'Stack', link: '/components/stack' },
          ],
        },
        {
          text: 'フィードバック',
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Card', link: '/components/card' },
            { text: 'Progress', link: '/components/progress' },
            { text: 'Spinner', link: '/components/spinner' },
          ],
        },
        {
          text: 'ナビゲーション',
          items: [
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Breadcrumb', link: '/components/breadcrumb' },
            { text: 'Menu/Dropdown', link: '/components/menu' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hardlitchi/hidearea-design' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          ja: {
            translations: {
              button: {
                buttonText: '検索',
                buttonAriaLabel: '検索',
              },
              modal: {
                noResultsText: '結果が見つかりません',
                resetButtonTitle: 'リセット',
                footer: {
                  selectText: '選択',
                  navigateText: '移動',
                  closeText: '閉じる',
                },
              },
            },
          },
        },
      },
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Hidearea Design',
    },
  },
});
