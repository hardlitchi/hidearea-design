# Design Tokens Usage Guide

デザイントークンの使い方、命名規則、ベストプラクティスを解説します。

## 目次

- [概要](#概要)
- [トークンカテゴリ](#トークンカテゴリ)
- [命名規則](#命名規則)
- [使用パターン](#使用パターン)
- [実践例](#実践例)
- [よくある質問](#よくある質問)

## 概要

Hidearea Design Systemは2種類のデザイントークンを提供します：

### ベーストークン

基礎的な値を定義。直接使用することも可能ですが、セマンティックトークンの使用を推奨。

```css
/* Color base tokens */
--color-blue-500: #3B82F6;
--color-gray-900: #171717;

/* Spacing base tokens */
--spacing-4: 16px;
--spacing-8: 32px;

/* Typography base tokens */
--font-size-base: 16px;
--font-weight-medium: 500;
```

### セマンティックトークン

文脈固有の用途を明示。テーマ対応で保守性が高い。

```css
/* Component semantic tokens */
--component-button-primary-background-default: var(--color-blue-500);
--component-input-border-focus: var(--color-blue-500);

/* Surface semantic tokens */
--surface-base-background: var(--color-white);
--surface-raised-elevation: 0 1px 3px 0 rgba(0, 0, 0, 0.1);

/* Text semantic tokens */
--text-body-default-color: var(--color-gray-900);
--text-heading-default-color: var(--color-gray-900);
```

## トークンカテゴリ

### 1. Color Tokens

#### ベースカラー

```css
/* Primary colors */
--color-primary-50: #EFF6FF;
--color-primary-100: #DBEAFE;
--color-primary-500: #3B82F6;
--color-primary-900: #1E3A8A;

/* Neutral colors */
--color-gray-50: #FAFAFA;
--color-gray-900: #171717;
--color-white: #FFFFFF;
--color-black: #000000;

/* Semantic colors */
--color-success-500: #10B981;
--color-error-500: #EF4444;
--color-warning-500: #F59E0B;
--color-info-500: #3B82F6;
```

#### セマンティックカラー

```css
/* Text colors */
--text-body-default-color: var(--color-gray-900);
--text-body-muted-color: var(--color-gray-600);
--text-body-subtle-color: var(--color-gray-400);
--text-link-default-color: var(--color-primary-500);

/* Surface colors */
--surface-base-background: var(--color-white);
--surface-base-foreground: var(--color-gray-900);
--surface-base-border: var(--color-gray-200);

/* Component colors */
--component-button-primary-background-default: var(--color-primary-500);
--component-button-primary-background-hover: var(--color-primary-600);
```

### 2. Spacing Tokens

8pxベースのスペーシングスケール：

```css
--spacing-0: 0px;
--spacing-1: 4px;      /* 0.25rem */
--spacing-2: 8px;      /* 0.5rem */
--spacing-3: 12px;     /* 0.75rem */
--spacing-4: 16px;     /* 1rem */
--spacing-5: 20px;     /* 1.25rem */
--spacing-6: 24px;     /* 1.5rem */
--spacing-8: 32px;     /* 2rem */
--spacing-10: 40px;    /* 2.5rem */
--spacing-12: 48px;    /* 3rem */
--spacing-16: 64px;    /* 4rem */
--spacing-20: 80px;    /* 5rem */
--spacing-24: 96px;    /* 6rem */
```

セマンティックスペーシング：

```css
/* Component spacing */
--component-button-padding-y: var(--spacing-2-5);
--component-button-padding-x: var(--spacing-4);
--component-input-padding-y: var(--spacing-2-5);
--component-input-padding-x: var(--spacing-3);

/* Layout spacing */
--layout-container-padding: var(--spacing-4);
--layout-section-gap: var(--spacing-8);
--layout-grid-gap: var(--spacing-4);
```

### 3. Typography Tokens

#### フォントサイズ

```css
--font-size-xs: 12px;     /* 0.75rem */
--font-size-sm: 14px;     /* 0.875rem */
--font-size-base: 16px;   /* 1rem */
--font-size-lg: 18px;     /* 1.125rem */
--font-size-xl: 20px;     /* 1.25rem */
--font-size-2xl: 24px;    /* 1.5rem */
--font-size-3xl: 30px;    /* 1.875rem */
--font-size-4xl: 36px;    /* 2.25rem */
--font-size-5xl: 48px;    /* 3rem */
```

#### フォントウェイト

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### 行高

```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

#### セマンティックタイポグラフィ

```css
/* Headings */
--text-heading-h1-fontSize: var(--font-size-5xl);
--text-heading-h1-fontWeight: var(--font-weight-bold);
--text-heading-h1-lineHeight: var(--line-height-tight);

--text-heading-h2-fontSize: var(--font-size-4xl);
--text-heading-h2-fontWeight: var(--font-weight-bold);

/* Body text */
--text-body-default-fontSize: var(--font-size-base);
--text-body-default-fontWeight: var(--font-weight-normal);
--text-body-default-lineHeight: var(--line-height-normal);
--text-body-default-color: var(--color-gray-900);

/* UI text */
--text-label-fontSize: var(--font-size-sm);
--text-label-fontWeight: var(--font-weight-medium);
--text-caption-fontSize: var(--font-size-xs);
```

### 4. Border Tokens

#### ボーダー幅

```css
--border-width-none: 0;
--border-width-thin: 1px;
--border-width-medium: 2px;
--border-width-thick: 4px;
```

#### ボーダー半径

```css
--border-radius-none: 0;
--border-radius-sm: 2px;
--border-radius-md: 4px;
--border-radius-lg: 8px;
--border-radius-xl: 12px;
--border-radius-2xl: 16px;
--border-radius-full: 9999px;
```

#### コンポーネントボーダー

```css
--component-button-border-radius: var(--border-radius-md);
--component-button-border-width: var(--border-width-thin);

--component-input-border-radius: var(--border-radius-md);
--component-input-border-width: var(--border-width-thin);
--component-input-border-default: var(--color-gray-300);

--component-card-border-radius: var(--border-radius-lg);
--component-card-border-width: var(--border-width-thin);
```

### 5. Shadow Tokens

階層を表現するシャドウ：

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Surface elevation */
--surface-raised-elevation: var(--shadow-sm);
--surface-overlay-elevation: var(--shadow-lg);

/* State shadows */
--state-hover-elevation-low: var(--shadow-sm);
--state-hover-elevation-medium: var(--shadow-md);
--state-hover-elevation-high: var(--shadow-lg);
```

### 6. Animation Tokens

#### Duration

```css
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

#### Easing

```css
--easing-linear: linear;
--easing-ease: ease;
--easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

#### Interaction transitions

```css
--interaction-transition-fast-duration: var(--duration-fast);
--interaction-transition-fast-easing: var(--easing-ease-out);

--interaction-transition-normal-duration: var(--duration-normal);
--interaction-transition-normal-easing: var(--easing-ease-in-out);
```

## 命名規則

### パターン

```
--{category}-{element}-{property}-{variant}-{state}
```

### 例

```css
/* Component tokens */
--component-button-primary-background-default
  └─┬──┘  └──┬─┘ └──┬──┘ └────┬─────┘ └──┬──┘
 category element variant  property   state

/* State tokens */
--state-focus-ring-color
  └┬──┘ └─┬─┘ └┬┘ └─┬─┘
category variant sub property

/* Surface tokens */
--surface-raised-elevation
  └──┬──┘ └─┬──┘ └───┬───┘
  category variant property
```

### カテゴリ一覧

- `color-*`: ベースカラー
- `spacing-*`: スペーシング値
- `font-*`: フォント関連
- `border-*`: ボーダー関連
- `shadow-*`: シャドウ
- `component-*`: コンポーネント固有
- `surface-*`: サーフェス（背景・階層）
- `text-*`: テキストスタイル
- `state-*`: インタラクション状態
- `layout-*`: レイアウト
- `interaction-*`: アニメーション・トランジション

## 使用パターン

### パターン1: コンポーネントスタイル

セマンティックトークンを使用：

```css
.button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--component-button-padding-y) var(--component-button-padding-x);

  /* Typography */
  font-size: var(--text-body-default-fontSize);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);

  /* Visual */
  border-radius: var(--component-button-border-radius);
  border-width: var(--component-button-border-width);
  border-style: solid;

  /* Transition */
  transition:
    background-color var(--interaction-transition-fast-duration) var(--interaction-transition-fast-easing),
    border-color var(--interaction-transition-fast-duration) var(--interaction-transition-fast-easing),
    box-shadow var(--interaction-transition-fast-duration) var(--interaction-transition-fast-easing);

  /* Interaction */
  cursor: var(--interaction-cursor-pointer);
}

.button--primary {
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border-color: var(--component-button-primary-border-default);
}

.button--primary:hover {
  background-color: var(--component-button-primary-background-hover);
  border-color: var(--component-button-primary-border-hover);
  box-shadow: var(--state-hover-elevation-low);
}

.button--primary:focus-visible {
  outline: var(--state-focus-ring-width) solid var(--state-focus-ring-color);
  outline-offset: var(--state-focus-ring-offset);
}

.button--primary:disabled {
  background-color: var(--component-button-primary-background-disabled);
  opacity: var(--state-disabled-opacity);
  cursor: var(--state-disabled-cursor);
}
```

### パターン2: レイアウトコンポーネント

構造的なトークンを使用：

```css
.container {
  width: 100%;
  max-width: var(--layout-container-max-width);
  margin-inline: auto;
  padding-inline: var(--layout-container-padding);
}

.section {
  padding-block: var(--layout-section-padding-y);
}

.grid {
  display: grid;
  gap: var(--layout-grid-gap);
  grid-template-columns: repeat(auto-fit, minmax(var(--layout-grid-min-column-width), 1fr));
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}
```

### パターン3: カードコンポーネント

サーフェストークンを使用：

```css
.card {
  background-color: var(--component-card-background-default);
  border: var(--component-card-border-width) solid var(--component-card-border-default);
  border-radius: var(--component-card-border-radius);
  padding: var(--spacing-6);
  box-shadow: var(--surface-raised-elevation);

  transition:
    background-color var(--interaction-transition-normal-duration),
    border-color var(--interaction-transition-normal-duration),
    box-shadow var(--interaction-transition-normal-duration);
}

.card:hover {
  background-color: var(--component-card-background-hover);
  border-color: var(--component-card-border-hover);
  box-shadow: var(--state-hover-elevation-medium);
}

.card--selected {
  background-color: var(--component-card-background-selected);
  border-color: var(--component-card-border-selected);
}
```

### パターン4: テキストスタイル

タイポグラフィトークンを使用：

```css
h1 {
  font-size: var(--text-heading-h1-fontSize);
  font-weight: var(--text-heading-h1-fontWeight);
  line-height: var(--text-heading-h1-lineHeight);
  color: var(--text-heading-default-color);
  margin-block-end: var(--spacing-6);
}

p {
  font-size: var(--text-body-default-fontSize);
  font-weight: var(--text-body-default-fontWeight);
  line-height: var(--text-body-default-lineHeight);
  color: var(--text-body-default-color);
  margin-block-end: var(--spacing-4);
}

.caption {
  font-size: var(--text-caption-fontSize);
  font-weight: var(--text-caption-fontWeight);
  color: var(--text-body-muted-color);
}

a {
  color: var(--text-link-default-color);
  text-decoration: underline;
  transition: color var(--interaction-transition-fast-duration);
}

a:hover {
  color: var(--text-link-hover-color);
}

a:visited {
  color: var(--text-link-visited-color);
}
```

## 実践例

### 例1: カスタムボタンの作成

```css
/* ベーストークンで独自のコンポーネントトークンを定義 */
:root {
  --component-button-custom-background-default: var(--color-purple-500);
  --component-button-custom-background-hover: var(--color-purple-600);
  --component-button-custom-background-active: var(--color-purple-700);
  --component-button-custom-text-default: var(--color-white);
  --component-button-custom-border-default: var(--color-purple-500);
}

.button--custom {
  background-color: var(--component-button-custom-background-default);
  color: var(--component-button-custom-text-default);
  border-color: var(--component-button-custom-border-default);
}

.button--custom:hover {
  background-color: var(--component-button-custom-background-hover);
}

.button--custom:active {
  background-color: var(--component-button-custom-background-active);
}
```

### 例2: ダッシュボードレイアウト

```css
.dashboard {
  display: grid;
  gap: var(--layout-grid-gap);
  padding: var(--layout-container-padding);
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background-color: var(--surface-base-background);
}

.dashboard__header {
  grid-column: 1 / -1;
  padding: var(--spacing-4);
  background-color: var(--surface-raised-background);
  border-bottom: var(--border-width-thin) solid var(--surface-base-border);
  box-shadow: var(--surface-raised-elevation);
}

.dashboard__sidebar {
  padding: var(--spacing-4);
  background-color: var(--surface-raised-background);
  border-right: var(--border-width-thin) solid var(--surface-base-border);
}

.dashboard__main {
  padding: var(--spacing-6);
}

.dashboard__card {
  background-color: var(--component-card-background-default);
  border: var(--component-card-border-width) solid var(--component-card-border-default);
  border-radius: var(--component-card-border-radius);
  padding: var(--spacing-6);
  box-shadow: var(--surface-raised-elevation);
}

.dashboard__card + .dashboard__card {
  margin-block-start: var(--spacing-4);
}
```

### 例3: フォームコンポーネント

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-block-end: var(--spacing-4);
}

.form-label {
  font-size: var(--text-label-fontSize);
  font-weight: var(--text-label-fontWeight);
  color: var(--text-label-default-color);
}

.form-input {
  padding: var(--component-input-padding-y) var(--component-input-padding-x);
  font-size: var(--text-body-default-fontSize);
  line-height: var(--line-height-normal);

  background-color: var(--component-input-background-default);
  color: var(--component-input-text-default);

  border: var(--component-input-border-width) solid var(--component-input-border-default);
  border-radius: var(--component-input-border-radius);

  transition:
    border-color var(--interaction-transition-fast-duration),
    box-shadow var(--interaction-transition-fast-duration);
}

.form-input::placeholder {
  color: var(--component-input-text-placeholder);
}

.form-input:hover {
  border-color: var(--component-input-border-hover);
}

.form-input:focus {
  outline: none;
  border-color: var(--component-input-border-focus);
  box-shadow: 0 0 0 var(--state-focus-ring-width) var(--state-focus-ring-color-alpha);
}

.form-input:disabled {
  background-color: var(--component-input-background-disabled);
  color: var(--component-input-text-disabled);
  cursor: var(--state-disabled-cursor);
  opacity: var(--state-disabled-opacity);
}

.form-input--error {
  border-color: var(--component-input-border-error);
}

.form-input--success {
  border-color: var(--component-input-border-success);
}

.form-helper {
  font-size: var(--text-helper-fontSize);
  color: var(--text-helper-default-color);
}

.form-helper--error {
  color: var(--text-helper-error-color);
}
```

### 例4: モーダルコンポーネント

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);

  background-color: var(--component-modal-background-overlay);
  backdrop-filter: blur(4px);

  animation: modal-fade-in var(--interaction-transition-normal-duration) var(--easing-ease-out);
}

.modal {
  position: relative;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;

  background-color: var(--component-modal-background-default);
  border-radius: var(--component-modal-border-radius);
  box-shadow: var(--surface-overlay-elevation);

  animation: modal-slide-up var(--interaction-transition-normal-duration) var(--easing-ease-out);
}

.modal__header {
  padding: var(--spacing-6);
  border-bottom: var(--border-width-thin) solid var(--surface-base-border);
}

.modal__title {
  font-size: var(--text-heading-h3-fontSize);
  font-weight: var(--text-heading-h3-fontWeight);
  color: var(--text-heading-default-color);
  margin: 0;
}

.modal__body {
  padding: var(--spacing-6);
  color: var(--text-body-default-color);
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  border-top: var(--border-width-thin) solid var(--surface-base-border);
}

@keyframes modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## よくある質問

### Q1: ベーストークンとセマンティックトークン、どちらを使うべき?

**A**: **セマンティックトークンを優先**してください。

```css
/* ✓ 推奨: セマンティックトークン */
.button {
  background: var(--component-button-primary-background-default);
}

/* △ 可能だが非推奨: ベーストークン */
.button {
  background: var(--color-blue-500);
}

/* ✗ 避ける: ハードコード */
.button {
  background: #3B82F6;
}
```

**理由**:
- テーマ対応（ライト・ダークモード）
- 意図が明確
- 一括変更が容易

### Q2: 新しいコンポーネントトークンを追加するには?

**A**: `:root`で定義し、既存のベーストークンを参照：

```css
:root {
  --component-mybutton-background-default: var(--color-teal-500);
  --component-mybutton-background-hover: var(--color-teal-600);
  --component-mybutton-text-default: var(--color-white);
}

[data-theme="dark"] {
  --component-mybutton-background-default: var(--color-teal-600);
  --component-mybutton-background-hover: var(--color-teal-700);
}
```

### Q3: トークン値を直接変更できる?

**A**: **できますが、推奨しません**。代わりにカスタムトークンを作成：

```css
/* ✗ 避ける: 既存トークンの上書き */
:root {
  --color-primary-500: #FF0000;
}

/* ✓ 推奨: 新しいトークンを定義 */
:root {
  --color-brand-primary: #FF0000;
  --component-button-brand-background-default: var(--color-brand-primary);
}
```

### Q4: JavaScriptからトークン値を取得するには?

**A**: `getComputedStyle`を使用：

```javascript
const root = document.documentElement;
const styles = getComputedStyle(root);

// トークン値を取得
const primaryColor = styles.getPropertyValue('--color-primary-500').trim();
console.log(primaryColor); // "#3B82F6"

// トークン値を設定
root.style.setProperty('--component-button-custom-background-default', '#FF0000');
```

### Q5: トークンをTypeScriptで型安全に使うには?

**A**: トークン型定義を生成して使用：

```typescript
// tokens.d.ts (自動生成)
export type ColorToken =
  | '--color-primary-500'
  | '--color-gray-900'
  | ...;

export type SpacingToken =
  | '--spacing-4'
  | '--spacing-8'
  | ...;

// 使用例
import { ColorToken, SpacingToken } from './tokens';

function setColor(element: HTMLElement, token: ColorToken) {
  element.style.setProperty('color', `var(${token})`);
}

setColor(element, '--color-primary-500'); // ✓ OK
setColor(element, '--invalid-token');     // ✗ Type error
```

### Q6: レスポンシブデザインでトークンを使うには?

**A**: ブレークポイントトークンとメディアクエリを組み合わせ：

```css
:root {
  --layout-container-padding: var(--spacing-4);
  --layout-grid-columns: 1;
}

@media (min-width: 768px) {
  :root {
    --layout-container-padding: var(--spacing-6);
    --layout-grid-columns: 2;
  }
}

@media (min-width: 1024px) {
  :root {
    --layout-container-padding: var(--spacing-8);
    --layout-grid-columns: 3;
  }
}

.container {
  padding: var(--layout-container-padding);
}

.grid {
  grid-template-columns: repeat(var(--layout-grid-columns), 1fr);
}
```

### Q7: アニメーションにトークンを使うには?

**A**: duration、easing、delayトークンを使用：

```css
.animated-card {
  transition:
    transform var(--interaction-transition-normal-duration) var(--easing-ease-out),
    opacity var(--interaction-transition-fast-duration) var(--easing-ease-out);
}

.animated-card:hover {
  transform: translateY(-4px);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulsing {
  animation: pulse var(--duration-slow) var(--easing-ease-in-out) infinite;
}
```

### Q8: トークンのデバッグ方法は?

**A**: ブラウザDevToolsとカスタムスクリプトを使用：

```javascript
// すべてのトークンを表示
function debugTokens() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const tokens = {};

  for (const prop of styles) {
    if (prop.startsWith('--')) {
      tokens[prop] = styles.getPropertyValue(prop).trim();
    }
  }

  console.table(tokens);
}

// 特定のカテゴリのトークンを表示
function debugCategory(category) {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const tokens = {};

  for (const prop of styles) {
    if (prop.startsWith(`--${category}-`)) {
      tokens[prop] = styles.getPropertyValue(prop).trim();
    }
  }

  console.table(tokens);
}

// 使用例
debugTokens();
debugCategory('component-button');
debugCategory('spacing');
```

## まとめ

デザイントークンを効果的に使用するためのポイント：

1. **セマンティックトークンを優先**して使用
2. **命名規則に従う**（一貫性が重要）
3. **テーマ対応**を意識した実装
4. **階層的に構築**（ベース → セマンティック → コンポーネント）
5. **ドキュメント化**して共有

詳細は以下のドキュメントも参照してください：

- [Theme System Guide](./theme-system.md)
- [セマンティックトークンガイド](../../packages/tokens/docs/セマンティックトークンガイド.md)
- [アーキテクチャガイド](../../packages/tokens/docs/アーキテクチャガイド.md)
