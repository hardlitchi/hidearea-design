import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  return {
    server: {
      host: '0.0.0.0',
      port: parseInt(env.COMPONENT_SHOWCASE_PORT) || 55173,
      strictPort: true,
      // すべてのホストからのアクセスを許可（開発環境）
      allowedHosts: [
        'localhost',
        'components.design.sb.hidearea.net',
        '.hidearea.net',
        '.sb.hidearea.net',
        'all' // すべてのホストを許可
      ]
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
})