import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  input: 'test-single.js',
  output: {
    file: 'dist/single.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    terser(),
  ],
});
