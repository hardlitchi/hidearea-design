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
 * Build component CSS files in 4 patterns:
 * 1. WebComponents: CSS with :host selectors (src/css/components/)
 * 2. HTML: Plain CSS with class selectors (build/css/html/)
 * 3. React/Vue: JavaScript/TypeScript exports (build/js/styles/)
 * 4. Unified: All components in single files (build/css/all.css, build/css/html/all.css)
 */
const srcCssDir = 'src/css/components';
const buildCssDirWebComponents = 'build/css/components';  // Pattern 1: WebComponents
const buildCssDirHtml = 'build/css/html';                 // Pattern 2: HTML
const buildJsStylesDir = 'build/js/styles';               // Pattern 3: React/Vue

// Create output directories
mkdirSync(buildCssDirWebComponents, { recursive: true });
mkdirSync(buildCssDirHtml, { recursive: true });
mkdirSync(buildJsStylesDir, { recursive: true });

// Helper function to recursively get all CSS files
const getAllCssFiles = (dir, baseDir = dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllCssFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.css')) {
      // Store relative path from baseDir
      const relativePath = fullPath.replace(baseDir + '/', '');
      files.push(relativePath);
    }
  }

  return files;
};

// Get all CSS files (including subdirectories)
const cssFiles = getAllCssFiles(srcCssDir);

console.log(`\n📦 Building component styles...`);

// Helper function to convert kebab-case to camelCase
const kebabToCamel = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

// Helper function to convert :host selectors to class selectors for plain HTML
const convertHostToClass = (cssContent, componentName) => {
  // IMPORTANT: Process specific patterns first, then general patterns

  // Convert :host([attribute][attribute]:pseudo-class) to .ha-component-name[attribute][attribute]:pseudo-class
  // Example: :host([disabled][checked]:hover) → .ha-radio[disabled][checked]:hover
  let converted = cssContent.replace(/:host\((\[[^\)]+\])(:[^)]+)\)/g, `.ha-${componentName}$1$2`);

  // Convert :host([attribute][attribute]...) to .ha-component-name[attribute][attribute]...
  // Example: :host([disabled][checked]) → .ha-radio[disabled][checked]
  converted = converted.replace(/:host\((\[[^\)]+\])\)/g, `.ha-${componentName}$1`);

  // Convert :host(:pseudo-class) to .ha-component-name:pseudo-class
  // Example: :host(:focus) → .ha-card:focus
  converted = converted.replace(/:host\((:[^)]+)\)/g, `.ha-${componentName}$1`);

  // Convert :host(.class) to .ha-component-name.class
  converted = converted.replace(/:host\(\.([^)]+)\)/g, `.ha-${componentName}.$1`);

  // Convert :host to .ha-component-name (must be last to avoid breaking other patterns)
  converted = converted.replace(/:host\b/g, `.ha-${componentName}`);

  // Convert ::slotted(*) to plain selectors
  // Handle cases where ::slotted is already preceded by a combinator (>, +, ~)
  converted = converted.replace(/\s*>\s*::slotted\(\*\)/g, ' > *');
  converted = converted.replace(/\s*>\s*::slotted\(([^)]+)\)/g, ' > $1');
  // Handle standalone ::slotted
  converted = converted.replace(/::slotted\(\*\)/g, '> *');
  converted = converted.replace(/::slotted\(([^)]+)\)/g, '$1');

  // Scope global element selectors to component
  // This converts element selectors like 'input {', 'button {' to '.ha-component input {', '.ha-component button {'

  // Split into CSS rules to process selectors separately from properties
  const rules = converted.split('}');
  const scopedRules = rules.map((rule, index) => {
    // Skip if this is the last empty segment after final }
    if (!rule.trim()) return rule;

    // Split into selector and declaration parts
    const openBraceIndex = rule.indexOf('{');
    if (openBraceIndex === -1) return rule; // No opening brace, return as-is

    let selector = rule.substring(0, openBraceIndex);
    const declaration = rule.substring(openBraceIndex);

    // Skip @ rules (media queries, keyframes, etc)
    if (selector.trim().startsWith('@')) return rule;

    // Skip if already scoped
    if (selector.includes(`.ha-${componentName}`)) return rule;

    // Scope element selectors at the start of selector
    // Match: whitespace + element-name + (space|colon|comma|bracket|{)
    // Examples: "input ", "button:", "label,", "select["
    selector = selector.replace(
      /(^|\n)(\s*)([a-z][\w-]*)(\s+|:|,|\[)/gi,
      (match, lineStart, indent, element, suffix) => {
        // List of elements that should be scoped (common HTML elements in components)
        const scopableElements = ['input', 'button', 'select', 'textarea', 'label', 'form', 'a', 'img', 'svg', 'span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td'];

        if (scopableElements.includes(element.toLowerCase())) {
          return `${lineStart}${indent}.ha-${componentName} ${element}${suffix}`;
        }
        return match;
      }
    );

    return selector + declaration;
  });

  return scopedRules.join('}');
};

// Arrays to collect all CSS content for unified builds
const allWebComponentsCSS = [];
const allHtmlCSS = [];

cssFiles.forEach(file => {
  const srcPath = join(srcCssDir, file);
  const cssContent = readFileSync(srcPath, 'utf-8');
  const componentName = basename(file, '.css');
  const camelCaseName = kebabToCamel(componentName);
  const category = file.includes('/') ? file.split('/')[0] : '';

  // Pattern 1: WebComponents - Copy CSS to build/css/components/ (preserve directory structure)
  const destCssPathWC = join(buildCssDirWebComponents, file);
  const destCssDirWC = join(buildCssDirWebComponents, category);
  if (category) {
    mkdirSync(destCssDirWC, { recursive: true });
  }
  copyFileSync(srcPath, destCssPathWC);
  allWebComponentsCSS.push(`/* ${componentName} */\n${cssContent}`);

  // Pattern 2: HTML - Convert :host to class selectors and save to build/css/html/
  const htmlCssContent = convertHostToClass(cssContent, componentName);
  const destCssPathHtml = join(buildCssDirHtml, file);
  const destCssDirHtml = join(buildCssDirHtml, category);
  if (category) {
    mkdirSync(destCssDirHtml, { recursive: true });
  }
  writeFileSync(destCssPathHtml, htmlCssContent, 'utf-8');
  allHtmlCSS.push(`/* ${componentName} */\n${htmlCssContent}`);
  console.log(`   ✓ Generated ${file} → WebComponents & HTML`);

  // Pattern 3: React/Vue - Generate JavaScript export in build/js/styles/
  const jsContent = `/**
 * ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)} Component Styles
 * Auto-generated from src/css/components/${file}
 * @hidearea-design/tokens
 *
 * For WebComponents: Use original :host selectors
 * For HTML: Use .ha-${componentName} class
 */

// WebComponents version (with :host)
export const ${camelCaseName}Styles = \`${cssContent.replace(/`/g, '\\`')}\`;

// HTML version (with class selectors)
export const ${camelCaseName}HtmlStyles = \`${htmlCssContent.replace(/`/g, '\\`')}\`;
`;

  const destJsPath = join(buildJsStylesDir, `${componentName}.js`);
  writeFileSync(destJsPath, jsContent, 'utf-8');

  // Generate TypeScript declaration
  const dtsContent = `/**
 * ${camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1)} Component Styles
 * Auto-generated from src/css/components/${file}
 * @hidearea-design/tokens
 */

/** WebComponents version (with :host) */
export declare const ${camelCaseName}Styles: string;

/** HTML version (with class selectors) */
export declare const ${camelCaseName}HtmlStyles: string;
`;

  const destDtsPath = join(buildJsStylesDir, `${componentName}.d.ts`);
  writeFileSync(destDtsPath, dtsContent, 'utf-8');
});

// Pattern 4: Unified CSS files - All components in single files
console.log(`\n📦 Building unified CSS files...`);

// WebComponents unified CSS
const unifiedWebComponentsCSS = `/**
 * Hidearea Design System - All Components (WebComponents)
 * Auto-generated unified CSS file
 * @hidearea-design/tokens
 */

${allWebComponentsCSS.join('\n\n')}
`;
writeFileSync('build/css/all.css', unifiedWebComponentsCSS, 'utf-8');
console.log(`   ✓ Generated all.css (WebComponents) → build/css/`);

// HTML unified CSS
const unifiedHtmlCSS = `/**
 * Hidearea Design System - All Components (HTML)
 * Auto-generated unified CSS file with class selectors
 * @hidearea-design/tokens
 *
 * Usage: <div class="ha-button">...</div>
 */

${allHtmlCSS.join('\n\n')}
`;
writeFileSync('build/css/html/all.css', unifiedHtmlCSS, 'utf-8');
console.log(`   ✓ Generated all.css (HTML) → build/css/html/`);

// Generate index file for easy imports (React/Vue)
console.log(`\n📦 Building JavaScript/TypeScript index files...`);

const indexContent = cssFiles.map(file => {
  const componentName = basename(file, '.css');
  const camelCaseName = kebabToCamel(componentName);
  return `export { ${camelCaseName}Styles, ${camelCaseName}HtmlStyles } from './${componentName}.js';`;
}).join('\n') + '\n';

writeFileSync(join(buildJsStylesDir, 'index.js'), indexContent, 'utf-8');
console.log(`   ✓ Generated index.js → ${buildJsStylesDir}/`);

// Generate TypeScript declaration for index
const indexDtsContent = cssFiles.map(file => {
  const componentName = basename(file, '.css');
  const camelCaseName = kebabToCamel(componentName);
  return `export { ${camelCaseName}Styles, ${camelCaseName}HtmlStyles } from './${componentName}.js';`;
}).join('\n') + '\n';

writeFileSync(join(buildJsStylesDir, 'index.d.ts'), indexDtsContent, 'utf-8');
console.log(`   ✓ Generated index.d.ts → ${buildJsStylesDir}/`);

console.log(`\n✅ Component styles built successfully!`);
console.log(`   📁 Pattern 1 (WebComponents): ${cssFiles.length} files → build/css/components/`);
console.log(`   📁 Pattern 2 (HTML): ${cssFiles.length} files → build/css/html/`);
console.log(`   📁 Pattern 3 (React/Vue): ${cssFiles.length * 2} exports → build/js/styles/`);
console.log(`   📄 Pattern 4 (Unified): 2 files → build/css/all.css, build/css/html/all.css`);
