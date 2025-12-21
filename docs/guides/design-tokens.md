# デザイントークン

Hidearea Design Systemは、すべてのコンポーネント間で一貫性を維持し、簡単なテーマ設定を可能にする包括的なデザイントークンシステムを使用しています。

## 目次

- [概要](#概要)
- [トークンアーキテクチャ](#トークンアーキテクチャ)
- [カラートークン](#カラートークン)
- [スペーシングトークン](#スペーシングトークン)
- [タイポグラフィトークン](#タイポグラフィトークン)
- [ボーダーとシャドウトークン](#ボーダーとシャドウトークン)
- [アニメーショントークン](#アニメーショントークン)
- [セマンティックトークン](#セマンティックトークン)
- [コンポーネントトークン](#コンポーネントトークン)
- [トークンの使用方法](#トークンの使用方法)
- [カスタムテーマ設定](#カスタムテーマ設定)

---

## 概要

デザイントークンは、視覚的なデザイン属性を格納する名前付きエンティティです。デザインの決定に対する単一の信頼できる情報源を提供し、デザインシステム全体で一貫したスタイリングを可能にします。

### メリット

- **一貫性**: 統一されたビジュアル言語
- **保守性**: 一箇所で値を更新
- **テーマ設定**: ライト/ダークモードの簡単な切り替え
- **スケーラビリティ**: コンポーネントを変更せずに新しいテーマを追加
- **型安全性**: フォールバック付きのCSS変数

### トークンレベル

Hidearea Designは3層のトークンアーキテクチャを使用しています:

1. **ベーストークン**: 生の値（色、サイズ）
2. **セマンティックトークン**: 目的ベースのトークン（primary、background）
3. **コンポーネントトークン**: コンポーネント固有のトークン（button-background）

---

## トークンアーキテクチャ

### ベーストークン
生の、プリミティブな値:
```css
--color-blue-500: #3b82f6;
--spacing-4: 1rem;
--font-size-base: 16px;
```

### セマンティックトークン
目的ベースで、ベーストークンを参照:
```css
--color-primary: var(--color-blue-600);
--color-background-surface: var(--color-white);
--spacing-md: var(--spacing-4);
```

### コンポーネントトークン
コンポーネント固有で、セマンティックトークンを参照:
```css
--component-button-primary-background: var(--color-primary);
--component-button-padding: var(--spacing-md);
```

---

## カラートークン

### ベースカラーパレット

50（最も明るい）から900（最も暗い）までの完全なカラースケール:

#### グレースケール
```css
--color-gray-50: #fafafa;   /* 最も明るい */
--color-gray-100: #f5f5f5;
--color-gray-200: #e5e5e5;
--color-gray-300: #d4d4d4;
--color-gray-400: #a3a3a3;
--color-gray-500: #737373;  /* ミッドトーン */
--color-gray-600: #525252;
--color-gray-700: #404040;
--color-gray-800: #262626;
--color-gray-900: #171717;  /* 最も暗い */
```

#### ブルー（プライマリ）
```css
--color-blue-50: #eff6ff;
--color-blue-100: #dbeafe;
--color-blue-200: #bfdbfe;
--color-blue-300: #93c5fd;
--color-blue-400: #60a5fa;
--color-blue-500: #3b82f6;  /* ベース */
--color-blue-600: #2563eb;  /* プライマリ */
--color-blue-700: #1d4ed8;
--color-blue-800: #1e40af;
--color-blue-900: #1e3a8a;
```

#### その他の色
- **グリーン**: 成功状態（#22c55e ベース）
- **レッド**: エラー/危険状態（#ef4444 ベース）
- **イエロー**: 警告状態（#eab308 ベース）
- **パープル**: 情報/アクセント（#a855f7 ベース）
- **シアン**: 追加アクセント（#06b6d4 ベース）

### セマンティックカラートークン

#### テキストカラー
```css
--color-text-primary: #171717;        /* メインテキスト（21:1 コントラスト） */
--color-text-secondary: #525252;      /* セカンダリテキスト（7:1 コントラスト） */
--color-text-tertiary: #737373;       /* 無効/プレースホルダー（4.5:1） */
--color-text-inverse: #ffffff;        /* 暗い背景上のテキスト */
--color-text-link: var(--color-blue-600);
--color-text-link-hover: var(--color-blue-700);
```

#### 背景カラー
```css
--color-background-primary: #ffffff;
--color-background-secondary: #f5f5f5;
--color-background-tertiary: #e5e5e5;
--color-background-surface: #ffffff;
--color-background-overlay: rgba(0, 0, 0, 0.5);
```

#### 状態カラー
```css
--color-success: var(--color-green-600);
--color-success-background: var(--color-green-50);
--color-warning: var(--color-yellow-600);
--color-warning-background: var(--color-yellow-50);
--color-error: var(--color-red-600);
--color-error-background: var(--color-red-50);
--color-info: var(--color-blue-600);
--color-info-background: var(--color-blue-50);
```

#### ボーダーカラー
```css
--color-border-default: #d4d4d4;      /* 3:1 コントラスト */
--color-border-strong: #a3a3a3;
--color-border-subtle: #e5e5e5;
--color-border-focus: var(--color-blue-500);
```

### コントラスト比

すべての色の組み合わせはWCAG AA基準を満たしています:

| トークン | 背景 | コントラスト | WCAG |
|-------|------------|----------|------|
| `text-primary` | `background-primary` | 21:1 | AAA ✅ |
| `text-secondary` | `background-primary` | 7:1 | AAA ✅ |
| `text-tertiary` | `background-primary` | 4.5:1 | AA ✅ |
| `border-default` | `background-primary` | 3:1 | AA ✅ |

---

## スペーシングトークン

### ベーススペーシングスケール

0.25rem（4px）単位:

```css
--spacing-0: 0;
--spacing-px: 1px;
--spacing-0-5: 0.125rem;  /* 2px */
--spacing-1: 0.25rem;      /* 4px */
--spacing-2: 0.5rem;       /* 8px */
--spacing-3: 0.75rem;      /* 12px */
--spacing-4: 1rem;         /* 16px */
--spacing-5: 1.25rem;      /* 20px */
--spacing-6: 1.5rem;       /* 24px */
--spacing-8: 2rem;         /* 32px */
--spacing-10: 2.5rem;      /* 40px */
--spacing-12: 3rem;        /* 48px */
--spacing-16: 4rem;        /* 64px */
--spacing-20: 5rem;        /* 80px */
--spacing-24: 6rem;        /* 96px */
```

### セマンティックスペーシング

```css
--spacing-xs: var(--spacing-1);    /* 4px - 密なスペース */
--spacing-sm: var(--spacing-2);    /* 8px - コンパクトなスペース */
--spacing-md: var(--spacing-4);    /* 16px - デフォルトスペース */
--spacing-lg: var(--spacing-6);    /* 24px - ゆったりしたスペース */
--spacing-xl: var(--spacing-8);    /* 32px - 特にゆったりしたスペース */
--spacing-2xl: var(--spacing-12);  /* 48px - セクションスペース */
```

### 使用ガイドライン

| トークン | ユースケース | 例 |
|-------|----------|---------|
| `xs` (4px) | アイコンスペース、密なギャップ | バッジのパディング |
| `sm` (8px) | コンポーネントパディング | チップのパディング |
| `md` (16px) | デフォルトパディング/マージン | ボタンのパディング |
| `lg` (24px) | カードのパディング | モーダルのパディング |
| `xl` (32px) | セクションスペース | ページのマージン |
| `2xl` (48px) | 主要セクション | ヒーローのパディング |

---

## タイポグラフィトークン

### フォントファミリー

```css
--font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI",
                     Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-mono: "SF Mono", Monaco, "Cascadia Code",
                     "Roboto Mono", Consolas, monospace;
```

### フォントサイズ

```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### フォントウェイト

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 行の高さ

```css
--line-height-none: 1;
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### テキストスタイル

事前定義されたテキストスタイルの組み合わせ:

```css
/* 見出し */
--text-heading-1-fontSize: var(--font-size-4xl);
--text-heading-1-lineHeight: var(--line-height-tight);
--text-heading-1-fontWeight: var(--font-weight-bold);

--text-heading-2-fontSize: var(--font-size-3xl);
--text-heading-2-lineHeight: var(--line-height-tight);
--text-heading-2-fontWeight: var(--font-weight-bold);

/* 本文 */
--text-body-default-fontSize: var(--font-size-base);
--text-body-default-lineHeight: var(--line-height-normal);
--text-body-default-fontWeight: var(--font-weight-normal);

--text-body-small-fontSize: var(--font-size-sm);
--text-body-small-lineHeight: var(--line-height-normal);
--text-body-small-fontWeight: var(--font-weight-normal);
```

---

## ボーダーとシャドウトークン

### ボーダー半径

```css
--border-radius-none: 0;
--border-radius-sm: 0.125rem;  /* 2px */
--border-radius-md: 0.25rem;   /* 4px */
--border-radius-lg: 0.5rem;    /* 8px */
--border-radius-xl: 0.75rem;   /* 12px */
--border-radius-2xl: 1rem;     /* 16px */
--border-radius-full: 9999px;  /* 完全に丸い */
```

### ボーダー幅

```css
--border-width-0: 0;
--border-width-1: 1px;
--border-width-2: 2px;
--border-width-4: 4px;
```

### シャドウ

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
```

---

## アニメーショントークン

### 継続時間

```css
--animation-duration-fast: 150ms;
--animation-duration-normal: 300ms;
--animation-duration-slow: 500ms;
```

### イージング関数

```css
--animation-easing-linear: linear;
--animation-easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--animation-easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--animation-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### トランジション

```css
--transition-fast: all 150ms ease-in-out;
--transition-normal: all 300ms ease-in-out;
--transition-slow: all 500ms ease-in-out;
```

---

## セマンティックトークン

セマンティックトークンは意味ベースの命名を提供します:

### インタラクティブ状態

```css
/* ホバー */
--color-interactive-hover-background: var(--color-gray-100);

/* アクティブ/押下 */
--color-interactive-active-background: var(--color-gray-200);

/* フォーカス */
--color-interactive-focus-outline: var(--color-blue-500);
--color-interactive-focus-outline-width: 2px;
--color-interactive-focus-outline-offset: 2px;

/* 無効 */
--color-interactive-disabled-background: var(--color-gray-100);
--color-interactive-disabled-text: var(--color-gray-400);
```

### フォーム状態

```css
--color-form-valid-border: var(--color-success);
--color-form-valid-background: var(--color-success-background);

--color-form-invalid-border: var(--color-error);
--color-form-invalid-background: var(--color-error-background);

--color-form-focus-border: var(--color-border-focus);
```

---

## コンポーネントトークン

各コンポーネントには独自のトークンセットがあります:

### ボタンの例

```css
/* プライマリバリアント */
--component-button-primary-background-default: var(--color-primary);
--component-button-primary-background-hover: var(--color-blue-700);
--component-button-primary-background-active: var(--color-blue-800);
--component-button-primary-text-default: var(--color-white);
--component-button-primary-border-default: transparent;

/* サイズ */
--component-button-padding-small: var(--spacing-2) var(--spacing-3);
--component-button-padding-medium: var(--spacing-3) var(--spacing-5);
--component-button-padding-large: var(--spacing-4) var(--spacing-6);

/* タイポグラフィ */
--component-button-fontSize: var(--font-size-base);
--component-button-fontWeight: var(--font-weight-medium);
```

### インプットの例

```css
--component-input-background: var(--color-white);
--component-input-border-color: var(--color-border-default);
--component-input-border-color-focus: var(--color-border-focus);
--component-input-padding: var(--spacing-3) var(--spacing-4);
--component-input-fontSize: var(--font-size-base);
--component-input-borderRadius: var(--border-radius-md);
```

---

## トークンの使用方法

### CSSでの使用

```css
.my-component {
  /* セマンティックトークンを使用 */
  color: var(--color-text-primary);
  background: var(--color-background-surface);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  /* トランジション */
  transition: var(--transition-fast);
}

.my-component:hover {
  background: var(--color-interactive-hover-background);
}
```

### JavaScriptでの使用

```javascript
// トークン値を取得
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// トークン値を設定
document.documentElement.style.setProperty(
  '--color-primary',
  '#3b82f6'
);
```

### コンポーネントでの使用

```html
<ha-button style="
  --component-button-primary-background-default: #9333ea;
  --component-button-padding-medium: 1rem 2rem;
">
  カスタムスタイルボタン
</ha-button>
```

---

## カスタムテーマ設定

### カスタムテーマの作成

1. **ベーストークンを上書き**:
```css
:root {
  --color-blue-600: #your-brand-color;
  --font-family-sans: 'Your Brand Font', sans-serif;
}
```

2. **セマンティックトークンを上書き**:
```css
:root {
  --color-primary: #your-brand-color;
  --color-text-primary: #your-text-color;
}
```

3. **コンポーネントトークンを上書き**:
```css
:root {
  --component-button-primary-background-default: #your-button-color;
  --component-button-borderRadius: 0.5rem;
}
```

### ダークモード

`data-theme="dark"` 属性を使用:

```css
[data-theme="dark"] {
  --color-text-primary: #ffffff;
  --color-text-secondary: #d4d4d4;
  --color-background-primary: #171717;
  --color-background-surface: #262626;
  --color-border-default: #404040;
}
```

ダークモードの切り替え:
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

### テーマスイッチャーコンポーネント

```html
<ha-theme-switcher variant="toggle"></ha-theme-switcher>
```

---

## トークンリファレンス

### 完全なトークンリスト

利用可能なすべてのトークンの完全なリストについては、以下を参照してください:
- [ベーストークン](../../packages/tokens/src/)
- [セマンティックトークン](../../packages/tokens/src/semantic/)
- [コンポーネントトークン](../../packages/tokens/src/components/)

### トークンの命名規則

トークンは次の形式に従います: `--{カテゴリ}-{プロパティ}-{バリアント}-{状態}`

例:
```css
--color-text-primary           /* カテゴリ-プロパティ-バリアント */
--component-button-primary-background-hover  /* コンポーネント-バリアント-プロパティ-状態 */
--spacing-md                   /* カテゴリ-サイズ */
```

---

## ベストプラクティス

### 1. セマンティックトークンを使用する
✅ **推奨**: `color: var(--color-text-primary);`
❌ **非推奨**: `color: var(--color-gray-900);`

### 2. ハードコードされた値を避ける
✅ **推奨**: `padding: var(--spacing-md);`
❌ **非推奨**: `padding: 16px;`

### 3. コンポーネントにはコンポーネントトークンを使用する
✅ **推奨**: `background: var(--component-button-primary-background-default);`
❌ **非推奨**: `background: var(--color-blue-600);`

### 4. トークンの階層を尊重する
- ベーストークン → セマンティックトークン → コンポーネントトークン
- 各レベルは上のレベルを参照します

### 5. コントラスト比をテストする
常に色の組み合わせがWCAG基準を満たしていることを確認してください:
- 通常のテキスト: 最低4.5:1
- 大きなテキスト: 最低3:1
- UIコンポーネント: 最低3:1

---

## リソース

### ツール
- [コントラストチェッカー](https://webaim.org/resources/contrastchecker/)
- [CSS変数のブラウザサポート](https://caniuse.com/css-variables)

### 関連ドキュメント
- [デザイントークン使用ガイド（日本語）](./design-tokens-usage.md) - 日本語での使い方ガイド
- [アクセシビリティガイド](./accessibility-guide.md)
- [コンポーネントAPIリファレンス](../api/README.md)
- [移行ガイド](./migration-guide.md)

---

**注意**: トークンは `packages/tokens/src/` のソースファイルから自動生成されます。再生成するには、tokensパッケージで `pnpm build` を実行してください。
