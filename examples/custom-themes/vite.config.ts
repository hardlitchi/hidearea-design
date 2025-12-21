import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: ["example.tokens.design.sb.hidearea.net"],
    port: 3002,
  },
  build: {
    outDir: 'dist',
  },
});
