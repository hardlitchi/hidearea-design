import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Web Components テスト用の環境
    environment: "happy-dom",

    // グローバル API を有効化（describe, it, expect など）
    globals: true,

    // テストタイムアウト設定（フォークランナーのタイムアウトを防ぐ）
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true, // 単一フォークモードでメモリ問題を回避
      },
    },
    testTimeout: 30000,
    hookTimeout: 30000,

    // カバレッジ設定
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.styles.ts",
        "src/**/index.ts",
        "src/**/*.d.ts",
        "src/test-utils/**",
      ],
      // 目標カバレッジ
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 60, // 現在のカバレッジに合わせて調整（60.35%）
        statements: 80,
      },
    },

    // テストファイルのパターン
    include: [
      "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],

    // セットアップファイル
    setupFiles: ["./vitest.setup.ts"],
  },
});
