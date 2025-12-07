import StyleDictionary from 'style-dictionary';
import { readFileSync } from 'fs';
import YAML from 'yaml';

/**
 * YAMLパーサーをグローバルに登録
 */
StyleDictionary.registerParser({
  name: 'yaml-parser',
  pattern: /\.yaml$/,
  parser: ({ filePath, contents }) => {
    return YAML.parse(contents);
  },
});

/**
 * カスタムフォーマット: ライトモードとダークモードのCSS変数（二層構造）
 *
 * Shadow DOM対応のため、以下の構造を生成:
 * 1. :root に基本トークン（色、スペースなど）を定義
 * 2. :root にセマンティックトークンを二層構造で定義（--background-primary: var(--theme-bg-primary, #ffffff);）
 * 3. [data-theme="light/dark"] にテーマ固有の中間変数を定義（--theme-bg-primary: #ffffff;）
 *
 * この構造により、Shadow DOMでも:rootのセマンティックトークンを継承可能
 */
StyleDictionary.registerFormat({
  name: 'css/variables-themes-two-tier',
  format: function({ dictionary }) {
    const lightTokens = [];
    const darkTokens = [];
    const baseTokens = [];
    const semanticTokens = [];

    // テーマトークンの初期値を記録（ライトモードのデフォルト値）
    const defaultValues = {};

    dictionary.allTokens.forEach(token => {
      const cssVar = `--${token.name}`;
      const value = token.value;

      if (token.path[0] === 'theme' && token.path[1] === 'light') {
        // ライトモードトークン
        const semanticName = token.path.slice(2).join('-');
        const themeName = `--theme-${semanticName}`;
        lightTokens.push(`  ${themeName}: ${value};`);

        // デフォルト値を記録
        defaultValues[semanticName] = value;
      } else if (token.path[0] === 'theme' && token.path[1] === 'dark') {
        // ダークモードトークン
        const semanticName = token.path.slice(2).join('-');
        const themeName = `--theme-${semanticName}`;
        darkTokens.push(`  ${themeName}: ${value};`);
      } else if (token.path[0] !== 'theme') {
        // ベーストークン
        baseTokens.push(`  ${cssVar}: ${value};`);
      }
    });

    // セマンティックトークンを二層構造で定義
    Object.keys(defaultValues).forEach(semanticName => {
      const defaultValue = defaultValues[semanticName];
      const semanticVar = `--${semanticName}`;
      const themeVar = `--theme-${semanticName}`;
      semanticTokens.push(`  ${semanticVar}: var(${themeVar}, ${defaultValue});`);
    });

    return `:root {\n${baseTokens.join('\n')}\n${semanticTokens.join('\n')}\n}\n\n[data-theme="light"] {\n${lightTokens.join('\n')}\n}\n\n[data-theme="dark"] {\n${darkTokens.join('\n')}\n}`;
  }
});

/**
 * Style Dictionary設定
 */
const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables-themes-two-tier',
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'build/ts/',
      files: [
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

console.log('✅ Design tokens built successfully!');
