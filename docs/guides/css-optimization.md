# CSS 最適化ガイド

Hidearea Design システムでCSSサイズを最適化する方法を説明します。

## 📊 現在のCSS状況

| ファイル | サイズ | 行数 | 内容 |
|---------|-------|------|------|
| `build/css/variables.css` | 91 KB | 1,793 | CSS変数（1,777個） |
| `build/css/all.css` | 188 KB | 8,421 | 全コンポーネントスタイル |
| `build/css/html/all.css` | 192 KB | - | HTML用スタイル |

**合計**: 約 841 KB（CSS files全体）

## 🎯 最適化戦略

### 推奨アプローチ: Per-Component CSS Imports

Web Componentsの特性上、**使用するコンポーネントのCSSのみを読み込む**のが最も効果的です。

### ❌ PurgeCSS が適さない理由

1. **動的な要素生成**: Web Componentsは実行時に要素を作成
2. **Shadow DOM**: セレクタがビルド時に検出できない
3. **CSS変数**: すべて必要（デザイントークンとして機能）
4. **属性セレクタ**: `[variant="primary"]` などが動的に変化

## ✅ 推奨される最適化方法

### 方法 1: 個別コンポーネントCSS（最も効果的）

```typescript
// ❌ すべてのスタイルを読み込み（188 KB）
import '@hidearea-design/tokens/css/all.css';

// ✅ 必要なコンポーネントのみ（~20-30 KB）
import '@hidearea-design/tokens/css/components/button.css';
import '@hidearea-design/tokens/css/components/input.css';
import '@hidearea-design/tokens/css/components/card.css';
```

### 方法 2: CSS Variables のみ読み込み

基本的なテーマだけ使用する場合：

```typescript
// 変数のみ（91 KB）
import '@hidearea-design/tokens/css/variables.css';

// 必要に応じてコンポーネントスタイルを追加
import '@hidearea-design/tokens/css/components/button.css';
```

### 方法 3: JavaScript Import（推奨 for React/Vue）

```typescript
// React/Vue での使用
import buttonStyles from '@hidearea-design/tokens/styles/button';
import inputStyles from '@hidearea-design/tokens/styles/input';

// スタイルは自動的に適用されます
```

## 📦 Per-Component CSS の使用例

### 例 1: シンプルなフォーム

```typescript
// 必要なCSSのみ
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/components/input.css';
import '@hidearea-design/tokens/css/components/button.css';
import '@hidearea-design/tokens/css/components/form-group.css';

// 合計サイズ: ~25 KB（変数含む）
```

### 例 2: ダッシュボード

```typescript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/components/card.css';
import '@hidearea-design/tokens/css/components/badge.css';
import '@hidearea-design/tokens/css/components/grid.css';
import '@hidearea-design/tokens/css/components/button.css';

// 合計サイズ: ~30 KB
```

### 例 3: データテーブル

```typescript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/components/datagrid.css';
import '@hidearea-design/tokens/css/components/pagination.css';
import '@hidearea-design/tokens/css/components/spinner.css';

// 合計サイズ: ~35 KB
```

## 🔧 ビルド時の最適化

### Vite 設定

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // CSSを個別にチャンク化
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // CSS code splitting を有効化
    cssCodeSplit: true,
  },
});
```

### Webpack 設定

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
```

## 📊 期待される削減効果

| 使用パターン | 全CSS読み込み | Per-component | 削減率 |
|------------|-------------|---------------|--------|
| 基本フォーム（3コンポーネント） | 188 KB | ~25 KB | 87% |
| ダッシュボード（5コンポーネント） | 188 KB | ~30 KB | 84% |
| データテーブル（3コンポーネント） | 188 KB | ~35 KB | 81% |
| 大規模アプリ（15+コンポーネント） | 188 KB | ~80 KB | 57% |

## 🎨 CSS変数の最適化

### 未使用の変数を削除しない理由

1. **テーマシステム**: 動的にテーマを切り替える際に必要
2. **カスタマイズ**: ユーザーがオーバーライド可能
3. **将来の拡張**: 新しいコンポーネント追加時に参照

### CSS変数の使用例

```css
/* ユーザーがカスタマイズ可能 */
:root {
  --color-primary: #2563eb; /* オーバーライド可能 */
}

/* コンポーネントで使用 */
ha-button {
  background: var(--color-primary);
}
```

## 🚀 パフォーマンスのヒント

### 1. Critical CSS

Above-the-foldのコンポーネントのみ先に読み込む：

```html
<head>
  <!-- Critical CSS: ヘッダーとヒーローセクション -->
  <link rel="stylesheet" href="variables.css" />
  <link rel="stylesheet" href="components/button.css" />
  <link rel="stylesheet" href="components/card.css" />
</head>
```

### 2. 遅延読み込み

```typescript
// 非Critical CSSは遅延読み込み
const loadModalStyles = async () => {
  await import('@hidearea-design/tokens/css/components/modal.css');
};

// モーダルを開く前に読み込み
button.addEventListener('click', async () => {
  await loadModalStyles();
  showModal();
});
```

### 3. Preload

```html
<!-- 後で必要になるCSSをプリロード -->
<link
  rel="preload"
  href="components/modal.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

## 📐 CSS サイズの測定

### スクリプトの作成

```typescript
// scripts/measure-css-size.ts
import fs from 'node:fs';
import { gzipSync } from 'node:zlib';

function measureCSS(filePath: string) {
  const content = fs.readFileSync(filePath);
  const size = content.length;
  const gzipSize = gzipSync(content).length;

  console.log(`${filePath}:`);
  console.log(`  Size: ${(size / 1024).toFixed(2)} KB`);
  console.log(`  Gzipped: ${(gzipSize / 1024).toFixed(2)} KB`);
  console.log(`  Compression: ${((gzipSize / size) * 100).toFixed(1)}%`);
}

// 使用例
measureCSS('build/css/all.css');
measureCSS('build/css/variables.css');
```

## 🛠️ 開発ツール

### CSS使用状況の分析

```typescript
// scripts/analyze-css-usage.ts
import { glob } from 'glob';
import fs from 'node:fs';

async function analyzeCSS() {
  // すべてのコンポーネントCSSファイルを取得
  const cssFiles = await glob('build/css/components/**/*.css');

  const sizes = cssFiles.map(file => ({
    name: file,
    size: fs.statSync(file).size,
  }));

  // サイズ順にソート
  sizes.sort((a, b) => b.size - a.size);

  console.log('Top 10 largest CSS files:');
  sizes.slice(0, 10).forEach(({ name, size }) => {
    console.log(`  ${name}: ${(size / 1024).toFixed(2)} KB`);
  });
}
```

## 📚 関連ドキュメント

- [Per-component Imports ガイド](./per-component-imports.md)
- [パフォーマンス最適化ガイド](./performance-optimization.md)
- [Design Tokens ドキュメント](./design-tokens.md)

## ✨ まとめ

### Web Components の CSS 最適化ベストプラクティス

1. ✅ **Per-component CSS imports を使用**（最も効果的）
2. ✅ **Critical CSS を先に読み込み**
3. ✅ **非Critical CSS は遅延読み込み**
4. ✅ **CSS Code Splitting を有効化**
5. ❌ **PurgeCSS は使用しない**（Web Componentsとの相性が悪い）

### 期待される効果

- 基本的なアプリ: **87% 削減**（188 KB → 25 KB）
- 中規模アプリ: **84% 削減**（188 KB → 30 KB）
- 大規模アプリ: **57% 削減**（188 KB → 80 KB）

Per-component imports と組み合わせることで、**最小限のバンドルサイズを実現**できます。
