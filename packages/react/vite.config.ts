import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HideareaDesignReact",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@hidearea-design/core"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@hidearea-design/core": "HideareaDesignCore",
        },
      },
    },
    sourcemap: true,
    outDir: "dist",
    emptyOutDir: false,
  },
});
