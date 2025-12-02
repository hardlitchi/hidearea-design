import StyleDictionary from "style-dictionary";
import { readFileSync } from "fs";
import YAML from "yaml";

/**
 * Style Dictionary設定
 * hidearea-design デザイントークンビルド設定
 */

// YAMLパーサーをグローバルに登録
StyleDictionary.registerParser({
  name: "yaml-parser",
  pattern: /\.yaml$/,
  parser: ({ filePath }) => {
    try {
      const fileContent = readFileSync(filePath, "utf-8");
      return YAML.parse(fileContent);
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
      throw error;
    }
  },
});

// Style Dictionaryインスタンスを作成
const sd = new StyleDictionary({
  // ソースファイルのパス
  source: ["src/base/**/*.yaml", "src/themes/**/*.yaml"],

  // 出力プラットフォーム設定
  platforms: {
    // CSS Variables（ライトテーマ）
    "css/light": {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "light.css",
          format: "css/variables",
          filter: (token) => {
            // ライトテーマまたはベーストークンのみ
            return !token.path.includes("dark");
          },
          options: {
            selector: ":root",
            outputReferences: true,
          },
        },
      ],
    },

    // CSS Variables（ダークテーマ）
    "css/dark": {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "dark.css",
          format: "css/variables",
          filter: (token) => {
            // ダークテーマまたはベーストークンのみ
            return (
              !token.path.includes("light") || !token.path.includes("theme")
            );
          },
          options: {
            selector: '[data-theme="dark"]',
            outputReferences: true,
          },
        },
      ],
    },

    // CSS Variables（すべて）
    "css/variables": {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
          options: {
            selector: ":root",
            outputReferences: true,
          },
        },
      ],
    },

    // JavaScript/TypeScript
    "js/es6": {
      transformGroup: "js",
      buildPath: "build/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
        {
          destination: "tokens.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },

    // JSON
    json: {
      transformGroup: "js",
      buildPath: "build/json/",
      files: [
        {
          destination: "tokens.json",
          format: "json/flat",
        },
      ],
    },

    // SCSS
    scss: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

// ビルドを実行
await sd.buildAllPlatforms();

console.log("✅ Design tokens built successfully!");
