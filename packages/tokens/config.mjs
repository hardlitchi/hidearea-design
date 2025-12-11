import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import YAML from 'yaml';

/**
 * YAMLパーサーをグローバルに登録
 */
StyleDictionary.registerParser({
  name: 'yaml-parser',
  pattern: /\.yaml$/,
  parser: ({ contents }) => {
    return YAML.parse(contents);
  },
});

/**
 * 検証用トランスフォーム: .valueサフィックスの検出
 *
 * トークン参照に不要な.valueサフィックスが含まれている場合にエラーを投げる
 * 例: "{color.white.value}" は "{color.white}" とすべき
 */
StyleDictionary.registerTransform({
  name: 'validate/no-value-suffix',
  type: 'value',
  transitive: true,
  filter: (token) => typeof token.value === 'string',
  transform: (token) => {
    if (token.value.includes('.value}')) {
      throw new Error(
        `トークン "${token.path.join('.')}" に不要な.valueサフィックスが含まれています: ${token.value}\n` +
        `修正: .valueサフィックスを削除してください`
      );
    }
    return token.value;
  }
});

/**
 * CSS変数参照を保持するトランスフォーム
 *
 * セマンティックトークン（background.*, foreground.*, border.*, primary.*, etc）への
 * 参照をCSS変数参照（var(--background-primary)）に変換する
 */
StyleDictionary.registerTransform({
  name: 'css/preserve-semantic-references',
  type: 'value',
  transitive: false,
  filter: (token) => {
    // componentトークンのみ対象
    return token.path[0] === 'component' && typeof token.original.value === 'string';
  },
  transform: (token, options) => {
    const value = token.original.value;

    // セマンティックトークン参照のパターン
    const semanticPatterns = [
      'background', 'foreground', 'border',
      'primary', 'secondary', 'success', 'error', 'warning', 'info'
    ];

    // 参照が含まれているか確認
    if (value.startsWith('{') && value.endsWith('}')) {
      const ref = value.slice(1, -1); // {} を削除
      const refParts = ref.split('.');

      // セマンティックトークンへの参照の場合、CSS変数参照に変換
      if (semanticPatterns.includes(refParts[0])) {
        const cssVarName = `--${refParts.join('-')}`;
        return `var(${cssVarName})`;
      }
    }

    // それ以外は通常の解決
    return token.value;
  }
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

    // セマンティックエイリアスのトークン名を記録
    const aliasTokens = new Set(['background', 'foreground', 'border', 'primary', 'secondary', 'success', 'error', 'warning', 'info']);

    // セマンティックトークン参照をCSS変数参照に変換するヘルパー
    const convertToVarReference = (originalValue) => {
      if (typeof originalValue === 'string' && originalValue.startsWith('{') && originalValue.endsWith('}')) {
        const ref = originalValue.slice(1, -1); // {} を削除
        const refParts = ref.split('.');

        // セマンティックトークンへの参照の場合、CSS変数参照に変換
        if (aliasTokens.has(refParts[0])) {
          const cssVarName = `--${refParts.join('-')}`;
          return `var(${cssVarName})`;
        }
      }
      return null; // 変換しない
    };

    dictionary.allTokens.forEach(token => {
      const cssVar = `--${token.name}`;
      let value = token.value;

      // コンポーネントトークンで、セマンティック参照がある場合は変換
      if (token.path[0] === 'component' && token.original && token.original.value) {
        const varRef = convertToVarReference(token.original.value);
        if (varRef) {
          value = varRef;
        }
      }

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
      } else if (token.path[0] !== 'theme' && !aliasTokens.has(token.path[0])) {
        // ベーストークン（エイリアスを除く）
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

    const reducedMotion = `\n/* Reduced motion support for accessibility */\n@media (prefers-reduced-motion: reduce) {\n  :root {\n    --animation-duration-fast: 0ms;\n    --animation-duration-base: 0ms;\n    --animation-duration-slow: 0ms;\n    --animation-duration-slower: 0ms;\n  }\n}`;

    return `:root {\n${baseTokens.join('\n')}\n${semanticTokens.join('\n')}\n}\n\n[data-theme="light"] {\n${lightTokens.join('\n')}\n}\n\n[data-theme="dark"] {\n${darkTokens.join('\n')}\n}${reducedMotion}`;
  }
});

/**
 * Style Dictionary設定
 */
const sd = new StyleDictionary({
  log: { verbosity: 'verbose' },
  source: ['src/**/*.yaml'],
  parsers: ['yaml-parser'],
  platforms: {
    css: {
      transforms: ['css/preserve-semantic-references', 'name/kebab', 'validate/no-value-suffix'],
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
      transforms: ['validate/no-value-suffix'],
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
      transforms: ['validate/no-value-suffix'],
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

/**
 * Build component CSS files
 * 1. Copy CSS files from src/css/components/ to build/css/components/
 * 2. Generate TypeScript exports in build/js/styles/
 */
const srcCssDir = 'src/css/components';
const buildCssDir = 'build/css/components';
const buildJsStylesDir = 'build/js/styles';

// Create output directories
mkdirSync(buildCssDir, { recursive: true });
mkdirSync(buildJsStylesDir, { recursive: true });

// Get all CSS files
const cssFiles = readdirSync(srcCssDir).filter(file => file.endsWith('.css'));

console.log(`\n📦 Building component styles...`);

// Helper function to convert kebab-case to camelCase
const kebabToCamel = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

cssFiles.forEach(file => {
  const srcPath = join(srcCssDir, file);
  const cssContent = readFileSync(srcPath, 'utf-8');
  const componentName = basename(file, '.css');
  const camelCaseName = kebabToCamel(componentName);

  // 1. Copy CSS to build/css/components/
  const destCssPath = join(buildCssDir, file);
  copyFileSync(srcPath, destCssPath);
  console.log(`   ✓ Copied ${file} → ${buildCssDir}/`);

  // 2. Generate JavaScript export in build/js/styles/
  const jsContent = `/**
 * ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)} Component Styles
 * Auto-generated from src/css/components/${file}
 * @hidearea-design/tokens
 */

export const ${camelCaseName}Styles = \`${cssContent.replace(/`/g, '\\`')}\`;
`;

  const destJsPath = join(buildJsStylesDir, `${componentName}.js`);
  writeFileSync(destJsPath, jsContent, 'utf-8');
  console.log(`   ✓ Generated ${componentName}.js → ${buildJsStylesDir}/`);

  // 3. Generate TypeScript declaration in build/js/styles/
  const dtsContent = `/**
 * ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)} Component Styles
 * Auto-generated from src/css/components/${file}
 * @hidearea-design/tokens
 */

export declare const ${camelCaseName}Styles: string;
`;

  const destDtsPath = join(buildJsStylesDir, `${componentName}.d.ts`);
  writeFileSync(destDtsPath, dtsContent, 'utf-8');
  console.log(`   ✓ Generated ${componentName}.d.ts → ${buildJsStylesDir}/`);
});

// Generate index file for easy imports
const indexContent = cssFiles.map(file => {
  const componentName = basename(file, '.css');
  const camelCaseName = kebabToCamel(componentName);
  return `export { ${camelCaseName}Styles } from './${componentName}.js';`;
}).join('\n') + '\n';

writeFileSync(join(buildJsStylesDir, 'index.js'), indexContent, 'utf-8');
console.log(`   ✓ Generated index.js → ${buildJsStylesDir}/`);

// Generate TypeScript declaration for index
const indexDtsContent = cssFiles.map(file => {
  const componentName = basename(file, '.css');
  const camelCaseName = kebabToCamel(componentName);
  return `export { ${camelCaseName}Styles } from './${componentName}.js';`;
}).join('\n') + '\n';

writeFileSync(join(buildJsStylesDir, 'index.d.ts'), indexDtsContent, 'utf-8');
console.log(`   ✓ Generated index.d.ts → ${buildJsStylesDir}/`);

console.log(`\n✅ Component styles built successfully! (${cssFiles.length} files)`);
