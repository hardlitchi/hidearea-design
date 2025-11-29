import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Web Components テスト用の環境
    environment: 'happy-dom',

    // グローバル API を有効化（describe, it, expect など）
    globals: true,

    // カバレッジ設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.styles.ts',
        'src/**/index.ts',
        'src/**/*.d.ts',
      ],
      // 目標カバレッジ
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },

    // テストファイルのパターン
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    // セットアップファイル
    setupFiles: ['./vitest.setup.ts'],
  },
});
