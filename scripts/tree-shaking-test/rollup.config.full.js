import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  input: 'test-full.js',
  output: {
    file: 'dist/full.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    terser(),
  ],
});
