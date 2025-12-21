import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
  ssr: {
    noExternal: [
      '@hidearea-design/core',
      '@hidearea-design/react',
      '@hidearea-design/tokens',
    ],
  },
});
