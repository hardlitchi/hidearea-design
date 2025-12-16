import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '@hidearea-design/tokens/css': resolve(__dirname, 'node_modules/@hidearea-design/tokens/build/css/variables.css'),
        '@hidearea-design/tokens/styles': resolve(__dirname, 'node_modules/@hidearea-design/tokens/build/js/styles'),
        '@hidearea-design/core': resolve(__dirname, 'node_modules/@hidearea-design/core/dist'),
        '@hidearea-design/tokens': resolve(__dirname, 'node_modules/@hidearea-design/tokens/build')
      }
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.LOGIN_FORM_PORT) || 5274,
      strictPort: true,
      // すべてのホストからのアクセスを許可
      allowedHosts: [
        'localhost',
        '.hidearea.net',
        '.sb.hidearea.net',
        // すべてのホストを許可する場合（開発環境のみ推奨）
        'all'
      ],
      fs: {
        // monorepo内のファイルへのアクセスを許可
        allow: ['..']
      }
    },
    // ビルド設定
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
});
