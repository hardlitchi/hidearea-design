// vite.config.ts
import { defineConfig } from "file:///home/neko/workspaces/design/node_modules/.pnpm/vite@5.4.21_@types+node@20.19.25/node_modules/vite/dist/node/index.js";
import vue from "file:///home/neko/workspaces/design/node_modules/.pnpm/@vitejs+plugin-vue@5.2.4_vite@5.4.21_@types+node@20.19.25__vue@3.5.24_typescript@5.9.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/neko/workspaces/design/packages/vue";
var vite_config_default = defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "HideareaDesignVue",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ["vue", "@hidearea-design/core"],
      output: {
        globals: {
          vue: "Vue",
          "@hidearea-design/core": "HideareaDesignCore"
        }
      }
    },
    sourcemap: true,
    outDir: "dist"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9uZWtvL3dvcmtzcGFjZXMvZGVzaWduL3BhY2thZ2VzL3Z1ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvbmVrby93b3Jrc3BhY2VzL2Rlc2lnbi9wYWNrYWdlcy92dWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvbmVrby93b3Jrc3BhY2VzL2Rlc2lnbi9wYWNrYWdlcy92dWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpXSxcbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmMvaW5kZXgudHNcIiksXG4gICAgICBuYW1lOiBcIkhpZGVhcmVhRGVzaWduVnVlXCIsXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcInVtZFwiXSxcbiAgICAgIGZpbGVOYW1lOiAoZm9ybWF0KSA9PiBgaW5kZXguJHtmb3JtYXR9LmpzYCxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbXCJ2dWVcIiwgXCJAaGlkZWFyZWEtZGVzaWduL2NvcmVcIl0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgIHZ1ZTogXCJWdWVcIixcbiAgICAgICAgICBcIkBoaWRlYXJlYS1kZXNpZ24vY29yZVwiOiBcIkhpZGVhcmVhRGVzaWduQ29yZVwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICBvdXREaXI6IFwiZGlzdFwiLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZTLFNBQVMsb0JBQW9CO0FBQzFVLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFGeEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsT0FBTztBQUFBLElBQ0wsS0FBSztBQUFBLE1BQ0gsT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsTUFDckIsVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsSUFDdkM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLHVCQUF1QjtBQUFBLE1BQ3pDLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLHlCQUF5QjtBQUFBLFFBQzNCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxFQUNWO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
