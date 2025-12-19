import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HideareaDesignVue",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "@hidearea-design/core"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "@hidearea-design/core": "HideareaDesignCore",
        },
      },
    },
    sourcemap: true,
    outDir: "dist",
  },
});
