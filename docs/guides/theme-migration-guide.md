# Theme System Migration Guide

デザインシステムのバージョンアップ時のテーマ移行ガイド。破壊的変更への対応方法を解説します。

## 目次

- [概要](#概要)
- [バージョン別移行ガイド](#バージョン別移行ガイド)
- [共通の移行パターン](#共通の移行パターン)
- [後方互換性の維持](#後方互換性の維持)
- [移行ツール](#移行ツール)
- [トラブルシューティング](#トラブルシューティング)

## 概要

### 移行が必要なケース

以下の場合に移行作業が必要です：

1. **メジャーバージョンアップ**: 破壊的変更を含む
2. **トークン名の変更**: 命名規則の統一など
3. **セマンティックトークンの再構成**: 構造の改善
4. **廃止されたトークン**: 非推奨トークンの削除

### セマンティックバージョニング

```
v1.2.3
│ │ └─ Patch: バグ修正（後方互換性あり）
│ └─── Minor: 新機能追加（後方互換性あり）
└───── Major: 破壊的変更（移行が必要）
```

## バージョン別移行ガイド

### v1.x → v2.0 移行ガイド

#### 主な変更点

1. **トークン命名規則の変更**
2. **セマンティックトークンの再構成**
3. **テーマシステムの刷新**
4. **非推奨トークンの削除**

#### ステップ1: トークン名の更新

**変更前（v1.x）:**

```css
/* Old naming convention */
--button-primary-bg: #3B82F6;
--button-primary-bg-hover: #2563EB;
--input-border: #D4D4D4;
--card-bg: #FFFFFF;
```

**変更後（v2.0）:**

```css
/* New naming convention */
--component-button-primary-background-default: #3B82F6;
--component-button-primary-background-hover: #2563EB;
--component-input-border-default: #D4D4D4;
--component-card-background-default: #FFFFFF;
```

**移行スクリプト:**

```javascript
// migrate-v1-to-v2.js
const tokenMapping = {
  '--button-primary-bg': '--component-button-primary-background-default',
  '--button-primary-bg-hover': '--component-button-primary-background-hover',
  '--input-border': '--component-input-border-default',
  '--card-bg': '--component-card-background-default',
  // ... 他のマッピング
};

function migrateCSS(cssContent) {
  let updated = cssContent;

  Object.entries(tokenMapping).forEach(([oldToken, newToken]) => {
    const regex = new RegExp(`var\\(${oldToken}\\)`, 'g');
    updated = updated.replace(regex, `var(${newToken})`);
  });

  return updated;
}

// 使用例
const fs = require('fs');
const cssFile = fs.readFileSync('styles.css', 'utf-8');
const migratedCSS = migrateCSS(cssFile);
fs.writeFileSync('styles-v2.css', migratedCSS);
```

#### ステップ2: テーマ属性の更新

**変更前（v1.x）:**

```html
<body class="theme-dark">
```

```css
.theme-dark {
  --button-primary-bg: #2563EB;
}
```

**変更後（v2.0）:**

```html
<body data-theme="dark">
```

```css
[data-theme="dark"] {
  --component-button-primary-background-default: #2563EB;
}
```

**移行手順:**

1. HTML内の `class="theme-*"` を `data-theme="*"` に置換
2. CSS内の `.theme-*` を `[data-theme="*"]` に置換

```bash
# HTML files
find . -name "*.html" -exec sed -i 's/class="theme-dark"/data-theme="dark"/g' {} +
find . -name "*.html" -exec sed -i 's/class="theme-light"/data-theme="light"/g' {} +

# CSS files
find . -name "*.css" -exec sed -i 's/\.theme-dark/[data-theme="dark"]/g' {} +
find . -name "*.css" -exec sed -i 's/\.theme-light/[data-theme="light"]/g' {} +
```

#### ステップ3: JavaScript APIの更新

**変更前（v1.x）:**

```javascript
import { ThemeManager } from '@hidearea-design/core';

const themeManager = new ThemeManager();
themeManager.setTheme('dark');
themeManager.getTheme(); // returns 'dark'
```

**変更後（v2.0）:**

```javascript
import { initTheme, setTheme, getTheme } from '@hidearea-design/core/utils/theme';

initTheme();
setTheme('dark');
getTheme(); // returns 'dark'
```

**移行コード:**

```javascript
// v1.x compatibility layer
if (typeof ThemeManager !== 'undefined') {
  console.warn('ThemeManager is deprecated. Use new theme utilities instead.');

  // Migrate existing code
  const themeManager = new ThemeManager();
  const currentTheme = themeManager.getTheme();

  // Use new API
  import('@hidearea-design/core/utils/theme').then(({ initTheme, setTheme }) => {
    initTheme();
    setTheme(currentTheme);
  });
}
```

#### ステップ4: 非推奨トークンの置換

```css
/* v1.x - Deprecated tokens */
--primary-color: #3B82F6;
--secondary-color: #10B981;
--danger-color: #EF4444;

/* v2.0 - New semantic tokens */
--color-primary-500: #3B82F6;
--color-success-500: #10B981;
--color-error-500: #EF4444;
```

**完全な変更マッピング:**

| v1.x | v2.0 | 用途 |
|------|------|------|
| `--primary-color` | `--color-primary-500` | プライマリカラー |
| `--secondary-color` | `--color-secondary-500` | セカンダリカラー |
| `--danger-color` | `--color-error-500` | エラーカラー |
| `--success-color` | `--color-success-500` | サクセスカラー |
| `--warning-color` | `--color-warning-500` | 警告カラー |
| `--text-color` | `--text-body-default-color` | テキストカラー |
| `--bg-color` | `--surface-base-background` | 背景色 |
| `--border-color` | `--surface-base-border` | ボーダーカラー |

### v0.x → v1.0 移行ガイド

#### 主な変更点

1. **CSS変数のプレフィックス追加**
2. **セマンティックトークンの導入**
3. **テーマシステムの追加**

#### トークン名の変更

```css
/* v0.x */
--blue-500: #3B82F6;
--spacing-4: 16px;
--font-size-base: 16px;

/* v1.0 */
--color-blue-500: #3B82F6;
--spacing-4: 16px;  /* 変更なし */
--font-size-base: 16px;  /* 変更なし */
```

**一括置換スクリプト:**

```javascript
function migrateV0ToV1(cssContent) {
  // Color tokens
  const colorRegex = /--(blue|red|green|yellow|gray|purple|pink|indigo)-(\d+)/g;
  let updated = cssContent.replace(colorRegex, '--color-$1-$2');

  return updated;
}
```

## 共通の移行パターン

### パターン1: エイリアストークンの作成

既存のコードを変更せずに、新しいトークン体系に移行：

```css
/* legacy-compat.css */
:root {
  /* Create aliases for old tokens */
  --button-primary-bg: var(--component-button-primary-background-default);
  --button-primary-bg-hover: var(--component-button-primary-background-hover);
  --input-border: var(--component-input-border-default);
  --card-bg: var(--component-card-background-default);

  /* Add deprecation warnings in development */
}
```

### パターン2: 段階的移行

大規模プロジェクトでは段階的に移行：

```css
/* Phase 1: Support both old and new tokens */
:root {
  /* New tokens */
  --component-button-primary-background-default: #3B82F6;

  /* Legacy support (will be removed in Phase 3) */
  --button-primary-bg: var(--component-button-primary-background-default);
}

/* Phase 2: Add deprecation warnings */
.button--primary {
  /* Prefer new tokens */
  background: var(--component-button-primary-background-default, var(--button-primary-bg));
}

/* Phase 3: Remove legacy tokens after full migration */
```

### パターン3: Feature Detection

新旧両方のトークンをサポート：

```css
.button--primary {
  /* Fallback to old token if new one doesn't exist */
  background: var(
    --component-button-primary-background-default,
    var(--button-primary-bg, #3B82F6)
  );
}
```

```javascript
// JavaScript feature detection
function supportsNewTokenSystem() {
  const root = getComputedStyle(document.documentElement);
  return !!root.getPropertyValue('--component-button-primary-background-default');
}

if (!supportsNewTokenSystem()) {
  console.warn('Old token system detected. Please update to v2.0');
  // Load compatibility layer
  import('./legacy-compat.css');
}
```

## 後方互換性の維持

### 互換性レイヤーの作成

```css
/* compat-layer-v1.css */
/**
 * Compatibility layer for v1.x tokens
 * Include this file to maintain backward compatibility
 * WARNING: This will be removed in v3.0
 */

:root {
  /* Button tokens - v1.x compatibility */
  --button-primary-bg: var(--component-button-primary-background-default);
  --button-primary-bg-hover: var(--component-button-primary-background-hover);
  --button-primary-text: var(--component-button-primary-text-default);
  --button-secondary-bg: var(--component-button-secondary-background-default);

  /* Input tokens - v1.x compatibility */
  --input-bg: var(--component-input-background-default);
  --input-border: var(--component-input-border-default);
  --input-border-focus: var(--component-input-border-focus);
  --input-text: var(--component-input-text-default);

  /* Card tokens - v1.x compatibility */
  --card-bg: var(--component-card-background-default);
  --card-border: var(--component-card-border-default);

  /* Theme tokens - v1.x compatibility */
  --bg-color: var(--surface-base-background);
  --text-color: var(--text-body-default-color);
  --border-color: var(--surface-base-border);
}
```

使用方法：

```html
<!-- Include compatibility layer after main tokens -->
<link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
<link rel="stylesheet" href="@hidearea-design/tokens/css/compat-layer-v1.css">
```

### 廃止予定の警告

```javascript
// deprecation-warnings.js
const DEPRECATED_TOKENS = {
  '--button-primary-bg': '--component-button-primary-background-default',
  '--input-border': '--component-input-border-default',
  '--card-bg': '--component-card-background-default',
};

function checkDeprecatedTokens() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const usedDeprecated = [];

  // Check all stylesheets
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        const cssText = rule.cssText;

        Object.keys(DEPRECATED_TOKENS).forEach(oldToken => {
          if (cssText.includes(oldToken)) {
            usedDeprecated.push({
              old: oldToken,
              new: DEPRECATED_TOKENS[oldToken],
              file: sheet.href,
            });
          }
        });
      }
    } catch (e) {
      // Cross-origin stylesheet
    }
  }

  if (usedDeprecated.length > 0) {
    console.group('%c⚠️ Deprecated Tokens Detected', 'color: orange; font-weight: bold');
    console.warn('The following deprecated tokens are in use:');
    console.table(usedDeprecated);
    console.warn('Please migrate to the new token names before v3.0');
    console.groupEnd();
  }
}

// Run on page load (development only)
if (process.env.NODE_ENV === 'development') {
  window.addEventListener('load', checkDeprecatedTokens);
}
```

## 移行ツール

### 自動移行スクリプト

```javascript
#!/usr/bin/env node
/**
 * Theme Migration Tool
 * Automatically migrates CSS files from v1.x to v2.0
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Token mapping from v1.x to v2.0
const TOKEN_MAPPING = {
  // Buttons
  '--button-primary-bg': '--component-button-primary-background-default',
  '--button-primary-bg-hover': '--component-button-primary-background-hover',
  '--button-primary-text': '--component-button-primary-text-default',

  // Inputs
  '--input-bg': '--component-input-background-default',
  '--input-border': '--component-input-border-default',
  '--input-border-focus': '--component-input-border-focus',

  // Cards
  '--card-bg': '--component-card-background-default',
  '--card-border': '--component-card-border-default',

  // Theme
  '--bg-color': '--surface-base-background',
  '--text-color': '--text-body-default-color',
  '--border-color': '--surface-base-border',
};

function migrateFile(filePath) {
  console.log(`Migrating: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf-8');
  let changes = 0;

  // Replace token references
  Object.entries(TOKEN_MAPPING).forEach(([oldToken, newToken]) => {
    const regex = new RegExp(`var\\(${escapeRegex(oldToken)}\\)`, 'g');
    const matches = content.match(regex);

    if (matches) {
      content = content.replace(regex, `var(${newToken})`);
      changes += matches.length;
    }
  });

  // Replace theme class with data attribute
  content = content.replace(/\.theme-(dark|light)/g, '[data-theme="$1"]');

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ ${changes} token(s) updated`);
  } else {
    console.log(`  - No changes needed`);
  }

  return changes;
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function main() {
  const cssFiles = glob.sync('**/*.css', {
    ignore: ['node_modules/**', 'dist/**', 'build/**'],
  });

  console.log(`Found ${cssFiles.length} CSS file(s)\n`);

  let totalChanges = 0;

  cssFiles.forEach(file => {
    totalChanges += migrateFile(file);
  });

  console.log(`\n✅ Migration complete!`);
  console.log(`   ${totalChanges} total token(s) updated across ${cssFiles.length} file(s)`);
  console.log(`\n⚠️  Please review the changes and test thoroughly before committing.`);
}

main();
```

使用方法：

```bash
# Install dependencies
npm install -g glob

# Run migration
node migrate-theme-v2.js

# Or with npx
npx migrate-theme-v2.js
```

### CSS変換ツール

```javascript
// css-token-transformer.js
const postcss = require('postcss');

const tokenTransformer = postcss.plugin('token-transformer', (opts = {}) => {
  const { mapping } = opts;

  return (root) => {
    root.walkDecls((decl) => {
      // Transform var() references
      if (decl.value.includes('var(--')) {
        Object.entries(mapping).forEach(([oldToken, newToken]) => {
          const regex = new RegExp(`var\\(${oldToken}\\)`, 'g');
          decl.value = decl.value.replace(regex, `var(${newToken})`);
        });
      }
    });

    // Transform theme selectors
    root.walkRules((rule) => {
      if (rule.selector.includes('.theme-')) {
        rule.selector = rule.selector.replace(/\.theme-(dark|light)/g, '[data-theme="$1"]');
      }
    });
  };
});

module.exports = tokenTransformer;
```

PostCSS設定：

```javascript
// postcss.config.js
const tokenTransformer = require('./css-token-transformer');
const TOKEN_MAPPING = require('./token-mapping.json');

module.exports = {
  plugins: [
    tokenTransformer({ mapping: TOKEN_MAPPING }),
    // other plugins...
  ],
};
```

## トラブルシューティング

### 問題1: トークンが適用されない

**原因**: 古いトークン名を使用している

**解決策**:

```javascript
// Check which tokens are actually defined
const root = getComputedStyle(document.documentElement);
const allTokens = [];

for (let i = 0; i < root.length; i++) {
  const prop = root[i];
  if (prop.startsWith('--')) {
    allTokens.push(prop);
  }
}

console.log('Available tokens:', allTokens);

// Check if specific token exists
const tokenValue = root.getPropertyValue('--component-button-primary-background-default');
console.log('Token value:', tokenValue || 'NOT FOUND');
```

### 問題2: テーマが切り替わらない

**原因**: 新しいテーマシステムに移行していない

**解決策**:

```javascript
// v1.x (old)
document.body.classList.remove('theme-light');
document.body.classList.add('theme-dark');

// v2.0 (new)
document.documentElement.setAttribute('data-theme', 'dark');

// または
import { setTheme } from '@hidearea-design/core/utils/theme';
setTheme('dark');
```

### 問題3: 混在したバージョンのトークン

**原因**: 移行が不完全

**解決策**: 移行スクリプトを実行して一括変換

```bash
# Find all old token references
grep -r "var(--button-primary-bg)" src/

# Run migration tool
node migrate-theme-v2.js

# Verify no old tokens remain
grep -r "var(--button-primary-bg)" src/
```

### 問題4: パフォーマンスの低下

**原因**: 互換性レイヤーによるCSS変数の多重参照

**解決策**: 完全移行後に互換性レイヤーを削除

```html
<!-- Remove after full migration -->
<!-- <link rel="stylesheet" href="compat-layer-v1.css"> -->
```

## チェックリスト

### 移行前

- [ ] 現在のバージョンを確認
- [ ] 変更ログを確認
- [ ] バックアップを作成
- [ ] テスト環境で検証

### 移行中

- [ ] トークン名を更新
- [ ] テーマ属性を更新（class → data-theme）
- [ ] JavaScript APIを更新
- [ ] 非推奨トークンを置換
- [ ] ビルドが通ることを確認

### 移行後

- [ ] すべてのページで表示確認
- [ ] テーマ切り替えの動作確認
- [ ] パフォーマンステスト
- [ ] ブラウザ互換性確認
- [ ] 互換性レイヤーの削除（任意）

## まとめ

テーマシステムの移行は計画的に：

1. **変更内容を理解**する
2. **移行ツール**を活用する
3. **段階的に移行**する
4. **テスト**を十分に行う
5. **互換性レイヤー**で安全に移行

詳細は以下も参照：

- [Theme System Guide](./theme-system.md)
- [Design Tokens Usage Guide](./design-tokens-usage.md)
- [CHANGELOG](../../CHANGELOG.md)
