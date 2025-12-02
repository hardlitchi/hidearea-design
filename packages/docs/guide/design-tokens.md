# デザイントークン

Hidearea Designのデザイントークンシステムについて説明します。

## 概要

デザイントークンは、デザインシステムの基本的な値（カラー、タイポグラフィ、スペーシングなど）を定義したものです。Style Dictionaryを使用してJSON形式で管理し、CSS変数、JavaScript定数、TypeScript型定義として出力しています。

## 使い方

### CSS変数として使用

```css
@import '@hidearea-design/tokens/build/css/variables.css';

.my-element {
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

### JavaScriptで使用

```js
import tokens from '@hidearea-design/tokens/build/js/index.js';

const primaryColor = tokens.color.primary[500];
const spacing = tokens.spacing[4];
```

### TypeScriptで使用

```ts
import type { DesignTokens } from '@hidearea-design/tokens';

const tokens: DesignTokens = {
  color: {
    primary: { 500: '#3b82f6' }
  }
};
```

## カラートークン

### 基本カラー

7色のカラーパレット、各色10階調（50-900）：

- **gray**: グレースケール
- **blue**: ブルー
- **purple**: パープル
- **green**: グリーン
- **yellow**: イエロー
- **red**: レッド
- **cyan**: シアン

```css
var(--color-blue-500)
var(--color-green-600)
var(--color-red-500)
```

### セマンティックカラー

用途別のカラー定義：

- **primary**: プライマリカラー
- **secondary**: セカンダリカラー
- **success**: 成功状態
- **warning**: 警告状態
- **error**: エラー状態
- **info**: 情報表示
- **neutral**: ニュートラル

```css
var(--color-primary-500)
var(--color-success-600)
var(--color-error-500)
```

## タイポグラフィトークン

### フォントファミリー

```css
var(--font-family-base)     /* システムフォント */
var(--font-family-heading)  /* 見出し用フォント */
var(--font-family-mono)     /* 等幅フォント */
```

### フォントサイズ

```css
var(--font-size-xs)   /* 0.75rem */
var(--font-size-sm)   /* 0.875rem */
var(--font-size-base) /* 1rem */
var(--font-size-lg)   /* 1.125rem */
var(--font-size-xl)   /* 1.25rem */
var(--font-size-2xl)  /* 1.5rem */
var(--font-size-3xl)  /* 1.875rem */
var(--font-size-4xl)  /* 2.25rem */
```

### フォントウェイト

```css
var(--font-weight-normal)   /* 400 */
var(--font-weight-medium)   /* 500 */
var(--font-weight-semibold) /* 600 */
var(--font-weight-bold)     /* 700 */
```

### 行の高さ

```css
var(--line-height-tight)   /* 1.25 */
var(--line-height-normal)  /* 1.5 */
var(--line-height-relaxed) /* 1.75 */
var(--line-height-loose)   /* 2 */
```

## スペーシングトークン

0から12までの13段階のスペーシング：

```css
var(--spacing-0)  /* 0 */
var(--spacing-1)  /* 0.25rem */
var(--spacing-2)  /* 0.5rem */
var(--spacing-3)  /* 0.75rem */
var(--spacing-4)  /* 1rem */
var(--spacing-5)  /* 1.25rem */
var(--spacing-6)  /* 1.5rem */
var(--spacing-8)  /* 2rem */
var(--spacing-10) /* 2.5rem */
var(--spacing-12) /* 3rem */
```

## ボーダートークン

### 角丸

```css
var(--border-radius-none) /* 0 */
var(--border-radius-sm)   /* 0.125rem */
var(--border-radius-base) /* 0.25rem */
var(--border-radius-md)   /* 0.375rem */
var(--border-radius-lg)   /* 0.5rem */
var(--border-radius-xl)   /* 0.75rem */
var(--border-radius-2xl)  /* 1rem */
var(--border-radius-3xl)  /* 1.5rem */
var(--border-radius-full) /* 9999px */
```

### ボーダー幅

```css
var(--border-width-0) /* 0 */
var(--border-width-1) /* 1px */
var(--border-width-2) /* 2px */
var(--border-width-4) /* 4px */
var(--border-width-8) /* 8px */
```

## シャドウトークン

```css
var(--shadow-sm)    /* 小さいシャドウ */
var(--shadow-base)  /* 基本シャドウ */
var(--shadow-md)    /* 中サイズシャドウ */
var(--shadow-lg)    /* 大きいシャドウ */
var(--shadow-xl)    /* 特大シャドウ */
var(--shadow-2xl)   /* 超特大シャドウ */
var(--shadow-inner) /* 内側シャドウ */
```

## アニメーショントークン

### 継続時間

```css
var(--duration-fast)   /* 150ms */
var(--duration-base)   /* 200ms */
var(--duration-slow)   /* 300ms */
var(--duration-slower) /* 500ms */
```

### イージング

```css
var(--easing-linear)      /* linear */
var(--easing-ease)        /* ease */
var(--easing-ease-in)     /* ease-in */
var(--easing-ease-out)    /* ease-out */
var(--easing-ease-in-out) /* ease-in-out */
```

## ブレークポイント

レスポンシブデザイン用のブレークポイント：

```css
var(--breakpoint-sm)  /* 640px */
var(--breakpoint-md)  /* 768px */
var(--breakpoint-lg)  /* 1024px */
var(--breakpoint-xl)  /* 1280px */
var(--breakpoint-2xl) /* 1536px */
```

## カスタマイズ

デザイントークンはCSS変数で提供されているため、ランタイムで上書き可能です：

```css
:root {
  --color-primary-500: #your-custom-color;
  --spacing-4: 1.5rem;
}
```

または、特定のコンポーネントのみ：

```css
.my-component {
  --color-primary-500: #custom-primary;
}
```

## ビルドプロセス

デザイントークンは以下の形式で出力されます：

- `build/css/variables.css` - CSS Custom Properties
- `build/js/index.js` - JavaScript定数
- `build/ts/index.d.ts` - TypeScript型定義

ソースファイルは `tokens/` ディレクトリのJSONファイルで管理されています。
