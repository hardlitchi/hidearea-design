import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: parseInt(env.DASHBOARD_PORT) || 55175,
    strictPort: true,
    // すべてのホストからのアクセスを許可
    allowedHosts: [
      'localhost',
      '.hidearea.net',
      '.sb.hidearea.net',
      // すべてのホストを許可する場合（開発環境のみ推奨）
      'all'
    ]
  },
  // ビルド設定
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
