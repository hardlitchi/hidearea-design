import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['build/**', 'node_modules/**', 'tests/**'],
      include: ['src/**/*.{js,mjs,cjs}', 'config.mjs', 'scripts/**/*.{js,mjs}'],
      // These tests validate build output, not source code
      // So coverage will be low - this is expected
      all: true,
      lines: 0,
      functions: 0,
      branches: 0,
      statements: 0
    }
  }
});
