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
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
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
