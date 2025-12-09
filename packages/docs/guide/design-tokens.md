# デザイントークン

Hidearea Designのデザイントークンシステムについての包括的なガイドです。

## 概要

デザイントークンは、デザインシステムの基本的な値（カラー、タイポグラフィ、スペーシングなど）を定義したものです。Style Dictionaryを使用してJSON形式で管理し、CSS変数、JavaScript定数、TypeScript型定義として出力しています。

### トークンの階層構造

Hidearea Designは2層のトークン構造を採用しています：

1. **基本トークン（Primitive Tokens）**
   - デザインシステムの基礎となる値
   - 色、スペーシング、タイポグラフィなどの生の値
   - 例: `color-blue-500`, `spacing-4`, `font-size-lg`

2. **セマンティックトークン（Semantic Tokens）**
   - 用途に基づいた意味のあるトークン
   - 基本トークンを参照し、特定の用途に割り当てる
   - テーマ切り替えに対応
   - 例: `component-button-primary-background`, `text-heading-h1-fontSize`

### 設計原則

- **一貫性**: すべてのコンポーネントで同じトークンを使用
- **保守性**: 1箇所の変更で全体に反映
- **テーマ対応**: ライト/ダークテーマの自動切り替え
- **型安全性**: TypeScript型定義による開発体験の向上

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

## 基本トークン（Primitive Tokens）

### カラートークン

#### 基本カラーパレット

7色のカラーパレット、各色10階調（50-900）：

| カラー | 用途 | 階調 |
|--------|------|------|
| **gray** | グレースケール、テキスト、ボーダー | 50-900 |
| **blue** | プライマリカラー、リンク | 50-900 |
| **purple** | セカンダリカラー、装飾 | 50-900 |
| **green** | 成功、ポジティブアクション | 50-900 |
| **yellow** | 警告、注意喚起 | 50-900 |
| **red** | エラー、危険なアクション | 50-900 |
| **cyan** | 情報、補助カラー | 50-900 |

```css
/* 基本カラーの使用例 */
var(--color-blue-500)   /* 中間の青 */
var(--color-green-600)  /* やや濃い緑 */
var(--color-red-500)    /* 中間の赤 */
var(--color-gray-100)   /* とても薄いグレー */
var(--color-gray-900)   /* とても濃いグレー */
```

#### カラー階調の選び方

- **50-200**: 背景色、淡いアクセント
- **300-400**: ホバー状態、ボーダー
- **500-600**: デフォルト状態、アクティブ
- **700-800**: テキスト、強調
- **900**: 最も濃い、ヘッダーなど

#### セマンティックカラー

用途別のカラー定義（基本カラーを参照）：

```css
/* セマンティックカラー */
var(--color-primary-500)      /* プライマリカラー（通常blue-500） */
var(--color-secondary-500)    /* セカンダリカラー（通常purple-500） */
var(--color-success-500)      /* 成功状態（通常green-500） */
var(--color-warning-500)      /* 警告状態（通常yellow-500） */
var(--color-error-500)        /* エラー状態（通常red-500） */
var(--color-info-500)         /* 情報表示（通常cyan-500） */
var(--color-neutral-500)      /* ニュートラル（通常gray-500） */
```

::: tip セマンティックカラーを使うべき理由
セマンティックカラーを使用することで、テーマ変更時にすべてのコンポーネントが自動的に新しいカラーパレットに対応します。
:::

::: warning 基本カラーの直接使用は避ける
コンポーネント内では `color-blue-500` ではなく `color-primary-500` または `component-button-primary-background` を使用してください。
:::

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

## セマンティックトークン（Semantic Tokens）

セマンティックトークンは、基本トークンの上に構築された意味のあるトークンです。コンポーネントやパターンの特定の用途に対応します。

### コンポーネントトークン

各コンポーネント専用のトークンセット：

#### Button

```css
/* Primary Button */
var(--component-button-primary-background-default)
var(--component-button-primary-background-hover)
var(--component-button-primary-background-active)
var(--component-button-primary-background-disabled)
var(--component-button-primary-text-default)
var(--component-button-primary-text-disabled)
var(--component-button-primary-border-default)

/* Secondary, Ghost, Danger も同様のパターン */
```

#### Input

```css
var(--component-input-background-default)
var(--component-input-background-disabled)
var(--component-input-background-readonly)
var(--component-input-text-default)
var(--component-input-text-placeholder)
var(--component-input-border-default)
var(--component-input-border-hover)
var(--component-input-border-focus)
var(--component-input-border-error)
var(--component-input-border-success)
```

#### その他のコンポーネント

- **Card**: 背景、ボーダー、ホバー、選択状態
- **Badge**: バリアント別の背景とテキスト
- **Alert**: 状態別の背景、テキスト、ボーダー、アイコン
- **Table**: ヘッダー、行、ホバー、選択、ストライプ
- **Navigation**: デフォルト、アクティブ、ホバー状態
- **Modal/Tooltip**: 背景、オーバーレイ、ボーダー

### 状態トークン

インタラクティブな状態を表すトークン：

```css
/* Focus */
var(--state-focus-ring-color)
var(--state-focus-ring-width)
var(--state-focus-ring-offset)

/* Disabled */
var(--state-disabled-opacity)
var(--state-disabled-cursor)

/* Hover */
var(--state-hover-elevation-small)
var(--state-hover-elevation-medium)

/* Status States */
var(--state-success-color)
var(--state-success-background)
var(--state-warning-color)
var(--state-error-color)
var(--state-info-color)

/* Selected */
var(--state-selected-background)
var(--state-selected-border)
```

### サーフェストークン

異なる階層のサーフェスと立体感：

```css
/* Base Surfaces */
var(--surface-base-background)
var(--surface-base-elevation)
var(--surface-raised-background)
var(--surface-raised-elevation)
var(--surface-overlay-background)
var(--surface-overlay-elevation)

/* Surface Levels (0-3) */
var(--surface-level-0-background)
var(--surface-level-1-background)
var(--surface-level-2-background)
var(--surface-level-3-background)

/* Interactive Surfaces */
var(--surface-interactive-default-background)
var(--surface-interactive-hover-background)
var(--surface-interactive-active-background)
```

### テキストトークン

コンテンツタイプ別のタイポグラフィ：

```css
/* Headings (h1-h6) */
var(--text-heading-h1-fontSize)
var(--text-heading-h1-fontWeight)
var(--text-heading-h1-lineHeight)
var(--text-heading-h1-color)

/* Body Text */
var(--text-body-large-fontSize)
var(--text-body-default-fontSize)
var(--text-body-small-fontSize)

/* Caption, Label, Helper */
var(--text-caption-fontSize)
var(--text-label-fontSize)
var(--text-helper-fontSize)

/* Code */
var(--text-code-inline-fontSize)
var(--text-code-inline-fontFamily)
var(--text-code-inline-background)
var(--text-code-block-fontSize)

/* Links */
var(--text-link-default-color)
var(--text-link-hover-color)
var(--text-link-visited-color)
```

### レイアウトトークン

一貫したレイアウトパターン：

```css
/* Container */
var(--layout-container-maxWidth-sm)
var(--layout-container-maxWidth-md)
var(--layout-container-padding-mobile)

/* Grid */
var(--layout-grid-gap-small)
var(--layout-grid-columns-mobile)
var(--layout-grid-columns-desktop)

/* Stack & Inline */
var(--layout-stack-gap-default)
var(--layout-inline-gap-default)
```

### インタラクショントークン

アニメーションとトランジション：

```css
/* Transitions */
var(--interaction-transition-fast-duration)
var(--interaction-transition-normal-duration)
var(--interaction-transition-slow-duration)

/* Animations */
var(--interaction-animation-fadeIn-duration)
var(--interaction-animation-slideIn-duration)
var(--interaction-animation-scale-duration)

/* Cursors */
var(--interaction-cursor-pointer)
var(--interaction-cursor-notAllowed)
```

## 実践的な使用例

### カスタムボタンコンポーネント

```css
.custom-button {
  /* セマンティックトークンを使用 */
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--text-body-default-fontSize);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-md);

  /* トランジション */
  transition:
    background var(--interaction-transition-fast-duration) var(--interaction-transition-fast-timing),
    border var(--interaction-transition-fast-duration) var(--interaction-transition-fast-timing);

  cursor: var(--interaction-cursor-pointer);
}

.custom-button--primary {
  background: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border: 1px solid var(--component-button-primary-border-default);
}

.custom-button--primary:hover {
  background: var(--component-button-primary-background-hover);
}

.custom-button--primary:focus-visible {
  outline: var(--state-focus-ring-width) solid var(--state-focus-ring-color);
  outline-offset: var(--state-focus-ring-offset);
}

.custom-button--primary:disabled {
  background: var(--component-button-primary-background-disabled);
  color: var(--component-button-primary-text-disabled);
  cursor: var(--state-disabled-cursor);
  opacity: var(--state-disabled-opacity);
}
```

### レスポンシブレイアウト

```css
.container {
  width: 100%;
  padding: var(--layout-container-padding-mobile);
  max-width: var(--layout-container-maxWidth-lg);
  margin: 0 auto;
}

@media (min-width: 768px) {
  .container {
    padding: var(--layout-container-padding-tablet);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--layout-container-padding-desktop);
  }
}
```

### カードグリッド

```css
.card-grid {
  display: grid;
  gap: var(--layout-grid-gap-medium);
  grid-template-columns: repeat(var(--layout-grid-columns-mobile), 1fr);
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(var(--layout-grid-columns-tablet), 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(var(--layout-grid-columns-desktop), 1fr);
  }
}

.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  transition: all var(--interaction-transition-normal-duration);
}

.card:hover {
  background: var(--component-card-background-hover);
  border-color: var(--component-card-border-hover);
  box-shadow: var(--state-hover-elevation-medium);
}
```

## ダークモード対応

セマンティックトークンを使用することで、ダークモードへの対応が自動的に行われます：

```html
<!-- ライトモード（デフォルト） -->
<body data-theme="light">
  <div class="card">カード内容</div>
</body>

<!-- ダークモード -->
<body data-theme="dark">
  <div class="card">カード内容</div>
</body>
```

同じCSSでも、`data-theme`属性によってトークンの値が自動的に切り替わります。

### テーマ切り替えの実装

```tsx
// React
import { useTheme } from '@hidearea-design/react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 ダーク' : '☀️ ライト'}
    </button>
  );
}
```

```vue
<!-- Vue -->
<template>
  <button @click="toggleTheme">
    {{ theme === 'light' ? '🌙 ダーク' : '☀️ ライト' }}
  </button>
</template>

<script setup>
import { useTheme } from '@hidearea-design/vue';
const { theme, toggleTheme } = useTheme();
</script>
```

## カスタマイズ

### ランタイムでの上書き

デザイントークンはCSS変数で提供されているため、ランタイムで上書き可能です：

```css
/* グローバルな上書き */
:root {
  --color-primary-500: #your-custom-color;
  --spacing-4: 1.5rem;
  --border-radius-md: 8px;
}

/* ダークモードのみ上書き */
[data-theme="dark"] {
  --component-card-background-default: #1a1a1a;
  --component-card-border-default: #333;
}
```

### コンポーネント単位での上書き

特定のコンポーネントのみカスタマイズ：

```css
.my-special-button {
  --component-button-primary-background-default: #custom-primary;
  --component-button-primary-background-hover: #custom-primary-dark;
}
```

### 新しいコンポーネントトークンの追加

カスタムコンポーネント用のトークンを定義：

```css
:root {
  /* カスタムコンポーネントトークン */
  --component-pricing-card-background: var(--surface-level-1-background);
  --component-pricing-card-border: var(--color-primary-200);
  --component-pricing-card-highlight: var(--color-primary-500);
  --component-pricing-card-price-color: var(--text-heading-h2-color);
}

[data-theme="dark"] {
  --component-pricing-card-background: var(--surface-level-2-background);
  --component-pricing-card-border: var(--color-primary-800);
}
```

## ベストプラクティス

### 1. セマンティックトークンを優先する

```css
/* Good ✓ */
.button {
  background: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
}

/* Avoid ✗ */
.button {
  background: var(--color-blue-500);
  color: var(--color-white);
}
```

**理由**: セマンティックトークンはテーマ切り替えに対応し、意図が明確です。

### 2. 適切なトークンカテゴリを選ぶ

- **コンポーネントトークン**: 特定のコンポーネントのスタイル
- **状態トークン**: インタラクティブ状態（hover, focus, disabled）
- **サーフェストークン**: 背景と立体感
- **テキストトークン**: タイポグラフィ
- **レイアウトトークン**: スペーシングとレイアウト
- **インタラクショントークン**: アニメーションとトランジション

### 3. マジックナンバーを避ける

```css
/* Good ✓ */
.element {
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

/* Avoid ✗ */
.element {
  padding: 16px;
  margin-bottom: 24px;
}
```

### 4. トランジションは一貫性を保つ

```css
/* Good ✓ */
.interactive-element {
  transition: all var(--interaction-transition-fast-duration) var(--interaction-transition-fast-timing);
}

/* Avoid ✗ */
.interactive-element {
  transition: all 0.2s ease-in-out;
}
```

## トークン一覧

### 完全なトークンリスト

すべてのトークンの詳細については、以下を参照してください：

- **基本トークン**: `@hidearea-design/tokens/build/css/variables.css`
- **セマンティックトークン**: パッケージの `SEMANTIC-TOKENS.md`
- **TypeScript型定義**: `@hidearea-design/tokens/build/ts/index.d.ts`

### トークンのブラウザ確認

開発者ツールのコンソールで確認：

```js
// すべてのCSS変数を取得
const styles = getComputedStyle(document.documentElement);
const tokens = Array.from(document.styleSheets)
  .flatMap(sheet => Array.from(sheet.cssRules))
  .filter(rule => rule.type === CSSRule.STYLE_RULE)
  .flatMap(rule => Array.from(rule.style))
  .filter(prop => prop.startsWith('--'));

console.log(tokens);
```

## パフォーマンス

### バンドルサイズ

デザイントークンシステムの追加コスト：

- **CSS**: 約5.2 KB gzipped
- **JS**: 約5.1 KB gzipped

合計: **約10.3 KB gzipped** （許容範囲内）

### 最適化

- **Tree Shaking**: 未使用のJSトークンは自動的に除外
- **CSS変数**: ブラウザネイティブのため高速
- **キャッシュ**: トークンファイルは変更頻度が低いため効率的にキャッシュ可能

## ビルドプロセス

デザイントークンは以下の形式で出力されます：

- `build/css/variables.css` - CSS Custom Properties
- `build/js/index.js` - JavaScript定数
- `build/ts/index.d.ts` - TypeScript型定義

### ソース構造

```
packages/tokens/
├── src/
│   ├── colors.json           # 基本カラー
│   ├── typography.json       # タイポグラフィ
│   ├── spacing.json          # スペーシング
│   ├── borders.json          # ボーダー
│   ├── shadows.json          # シャドウ
│   ├── animations.json       # アニメーション
│   ├── breakpoints.json      # ブレークポイント
│   └── semantic/             # セマンティックトークン
│       ├── colors.json
│       ├── typography.json
│       ├── components.json
│       ├── states.json
│       ├── surfaces.json
│       ├── layout.json
│       └── interactions.json
├── build/                    # 生成ファイル
└── config.mjs               # Style Dictionary設定
```

### ビルド方法

```bash
cd packages/tokens
npm run build

# 出力確認
ls -lh build/css/
ls -lh build/js/
```

## トラブルシューティング

### トークンが反映されない

**問題**: CSS変数が適用されていない

**解決策**:
```js
// トークンのインポートを確認
import '@hidearea-design/tokens/build/css/variables.css';
```

### TypeScript型エラー

**問題**: トークンの型定義が見つからない

**解決策**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@hidearea-design/tokens"]
  }
}
```

### ダークモードが動作しない

**問題**: テーマ切り替えが反映されない

**解決策**:
```html
<!-- data-theme属性が正しく設定されているか確認 -->
<body data-theme="dark">
  <!-- content -->
</body>
```

## 次のステップ

- [セマンティックトークン詳細](/guide/semantic-tokens) - セマンティックトークンの完全なリファレンス
- [テーマカスタマイズ](/guide/theming) - カスタムテーマの作成方法
- [コンポーネント一覧](/components/overview) - トークンを使用したコンポーネント
- [アクセシビリティ](/guide/accessibility) - アクセシブルなカラーコントラスト
