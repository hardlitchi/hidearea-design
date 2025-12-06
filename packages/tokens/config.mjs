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
 * カスタムフォーマット: ライトモードとダークモードのCSS変数
 */
StyleDictionary.registerFormat({
  name: 'css/variables-themes',
  format: function({ dictionary }) {
    const lightTokens = [];
    const darkTokens = [];
    const baseTokens = [];

    dictionary.allTokens.forEach(token => {
      const cssVar = `--${token.name}`;
      const value = token.value;

      if (token.path[0] === 'theme' && token.path[1] === 'light') {
        // ライトモードトークン
        const varName = `--${token.path.slice(2).join('-')}`;
        lightTokens.push(`  ${varName}: ${value};`);
      } else if (token.path[0] === 'theme' && token.path[1] === 'dark') {
        // ダークモードトークン
        const varName = `--${token.path.slice(2).join('-')}`;
        darkTokens.push(`  ${varName}: ${value};`);
      } else if (token.path[0] !== 'theme') {
        // ベーストークン
        baseTokens.push(`  ${cssVar}: ${value};`);
      }
    });

    return `:root {\n${baseTokens.join('\n')}\n}\n\n:root,\n[data-theme="light"] {\n${lightTokens.join('\n')}\n}\n\n[data-theme="dark"] {\n${darkTokens.join('\n')}\n}`;
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
          format: 'css/variables-themes',
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
