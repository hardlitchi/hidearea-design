import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  input: 'test-multiple.js',
  output: {
    file: 'dist/multiple.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    terser(),
  ],
});
