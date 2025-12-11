import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '@hidearea-design/core': resolve(__dirname, '../../packages/core/src'),
        '@hidearea-design/tokens': resolve(__dirname, '../../packages/tokens/src'),
        '@hidearea-design/tokens/css': resolve(__dirname, '../../packages/tokens/build/css/variables.css')
      }
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(env.COMPONENT_SHOWCASE_PORT) || 5273,
      strictPort: true,
      // すべてのホストからのアクセスを許可（開発環境）
      allowedHosts: [
        'localhost',
        'components.design.sb.hidearea.net',
        '.hidearea.net',
        '.sb.hidearea.net',
        'all' // すべてのホストを許可
      ],
      fs: {
        // monorepo内のファイルへのアクセスを許可
        allow: ['..']
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
})