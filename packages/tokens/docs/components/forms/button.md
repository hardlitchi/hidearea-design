# Button (ボタン) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/button.yaml`
**ステータス:** ✅ 実装済み (Phase 3)

---

## 概要

ボタンコンポーネントは、ユーザーがアクションを実行するための主要なインタラクティブ要素です。4つのバリアント（primary, secondary, ghost, danger）と、複数の状態（default, hover, active, disabled）をサポートしています。

### 用途

- フォームの送信
- ダイアログの確認/キャンセル
- ナビゲーション
- 破壊的なアクション（削除など）

---

## バリアント

### 1. Primary (プライマリ)

最も重要なアクションに使用します。ページ内で最も目立つボタンです。

**使用場面:**
- フォームの送信ボタン
- 主要なCTA（Call to Action）
- モーダルの確認ボタン

**トークンプレフィックス:** `component.button.primary.*`

### 2. Secondary (セカンダリ)

副次的なアクションに使用します。プライマリより控えめな見た目です。

**使用場面:**
- キャンセルボタン
- 追加のオプション
- 補助的なアクション

**トークンプレフィックス:** `component.button.secondary.*`

### 3. Ghost (ゴースト)

最も控えめなボタンです。背景がなく、ホバー時のみ背景色が表示されます。

**使用場面:**
- テーブル内のアクション
- カード内の控えめなボタン
- アイコンボタン

**トークンプレフィックス:** `component.button.ghost.*`

### 4. Danger (デンジャー)

破壊的または危険なアクションに使用します。エラーカラーを使用します。

**使用場面:**
- 削除ボタン
- リセットボタン
- 取り消し不可能なアクション

**トークンプレフィックス:** `component.button.danger.*`

---

## トークン一覧

### Primary ボタン

#### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.primary.background.default` | `{primary.default}` | デフォルト状態の背景色 |
| `component.button.primary.background.hover` | `{primary.hover}` | ホバー時の背景色 |
| `component.button.primary.background.active` | `{primary.active}` | 押下時の背景色 |
| `component.button.primary.background.disabled` | `{border.default}` | 無効時の背景色 |

#### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.primary.text.default` | `{foreground.inverse}` | デフォルトのテキスト色 |
| `component.button.primary.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

#### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.primary.border.default` | `{primary.default}` | デフォルトのボーダー色 |
| `component.button.primary.border.hover` | `{primary.hover}` | ホバー時のボーダー色 |
| `component.button.primary.border.active` | `{primary.active}` | 押下時のボーダー色 |
| `component.button.primary.border.disabled` | `{border.default}` | 無効時のボーダー色 |

### Secondary ボタン

#### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.secondary.background.default` | `transparent` | デフォルト状態は透明 |
| `component.button.secondary.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.button.secondary.background.active` | `{background.tertiary}` | 押下時の背景色 |
| `component.button.secondary.background.disabled` | `transparent` | 無効時も透明 |

#### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.secondary.text.default` | `{foreground.secondary}` | デフォルトのテキスト色 |
| `component.button.secondary.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

#### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.secondary.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.button.secondary.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.button.secondary.border.active` | `{foreground.secondary}` | 押下時のボーダー色 |
| `component.button.secondary.border.disabled` | `{border.subtle}` | 無効時のボーダー色 |

### Ghost ボタン

#### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.ghost.background.default` | `transparent` | デフォルト状態は透明 |
| `component.button.ghost.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.button.ghost.background.active` | `{background.tertiary}` | 押下時の背景色 |
| `component.button.ghost.background.disabled` | `transparent` | 無効時も透明 |

#### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.ghost.text.default` | `{foreground.secondary}` | デフォルトのテキスト色 |
| `component.button.ghost.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

**注意:** Ghostボタンはボーダーを持ちません。

### Danger ボタン

#### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.danger.background.default` | `{error.default}` | デフォルト状態の背景色 |
| `component.button.danger.background.hover` | `{error.hover}` | ホバー時の背景色 |
| `component.button.danger.background.active` | `{error.active}` | 押下時の背景色 |
| `component.button.danger.background.disabled` | `{border.default}` | 無効時の背景色 |

#### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.danger.text.default` | `{foreground.inverse}` | デフォルトのテキスト色 |
| `component.button.danger.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

#### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.button.danger.border.default` | `{error.default}` | デフォルトのボーダー色 |
| `component.button.danger.border.hover` | `{error.hover}` | ホバー時のボーダー色 |
| `component.button.danger.border.active` | `{error.active}` | 押下時のボーダー色 |
| `component.button.danger.border.disabled` | `{border.default}` | 無効時のボーダー色 |

---

## 使用例

### HTML

```html
<!-- プライマリボタン -->
<button class="btn btn-primary">送信</button>

<!-- セカンダリボタン -->
<button class="btn btn-secondary">キャンセル</button>

<!-- ゴーストボタン -->
<button class="btn btn-ghost">詳細</button>

<!-- デンジャーボタン -->
<button class="btn btn-danger">削除</button>

<!-- 無効化されたボタン -->
<button class="btn btn-primary" disabled>無効</button>
```

### CSS

```css
/* ベーススタイル */
.btn {
  /* レイアウト */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);

  /* スペーシング */
  padding: var(--spacing-2-5) var(--spacing-4);

  /* タイポグラフィ */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--font-line-height-none);

  /* ボーダー */
  border-width: var(--border-width-1);
  border-style: solid;
  border-radius: var(--border-radius-md);

  /* トランジション */
  transition-property: background-color, border-color, color, box-shadow;
  transition-duration: var(--animation-duration-fast);
  transition-timing-function: var(--animation-easing-ease);

  /* カーソル */
  cursor: pointer;
  user-select: none;

  /* リセット */
  text-decoration: none;
}

/* プライマリボタン */
.btn-primary {
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border-color: var(--component-button-primary-border-default);
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--component-button-primary-background-hover);
  border-color: var(--component-button-primary-border-hover);
}

.btn-primary:active:not(:disabled) {
  background-color: var(--component-button-primary-background-active);
  border-color: var(--component-button-primary-border-active);
}

.btn-primary:disabled {
  background-color: var(--component-button-primary-background-disabled);
  color: var(--component-button-primary-text-disabled);
  border-color: var(--component-button-primary-border-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* セカンダリボタン */
.btn-secondary {
  background-color: var(--component-button-secondary-background-default);
  color: var(--component-button-secondary-text-default);
  border-color: var(--component-button-secondary-border-default);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--component-button-secondary-background-hover);
  border-color: var(--component-button-secondary-border-hover);
}

.btn-secondary:active:not(:disabled) {
  background-color: var(--component-button-secondary-background-active);
  border-color: var(--component-button-secondary-border-active);
}

.btn-secondary:disabled {
  background-color: var(--component-button-secondary-background-disabled);
  color: var(--component-button-secondary-text-disabled);
  border-color: var(--component-button-secondary-border-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* ゴーストボタン */
.btn-ghost {
  background-color: var(--component-button-ghost-background-default);
  color: var(--component-button-ghost-text-default);
  border: none; /* ゴーストはボーダーなし */
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--component-button-ghost-background-hover);
}

.btn-ghost:active:not(:disabled) {
  background-color: var(--component-button-ghost-background-active);
}

.btn-ghost:disabled {
  background-color: var(--component-button-ghost-background-disabled);
  color: var(--component-button-ghost-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* デンジャーボタン */
.btn-danger {
  background-color: var(--component-button-danger-background-default);
  color: var(--component-button-danger-text-default);
  border-color: var(--component-button-danger-border-default);
}

.btn-danger:hover:not(:disabled) {
  background-color: var(--component-button-danger-background-hover);
  border-color: var(--component-button-danger-border-hover);
}

.btn-danger:active:not(:disabled) {
  background-color: var(--component-button-danger-background-active);
  border-color: var(--component-button-danger-border-active);
}

.btn-danger:disabled {
  background-color: var(--component-button-danger-background-disabled);
  color: var(--component-button-danger-text-disabled);
  border-color: var(--component-button-danger-border-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### React

```tsx
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// 使用例
<Button variant="primary">送信</Button>
<Button variant="secondary">キャンセル</Button>
<Button variant="danger" onClick={handleDelete}>削除</Button>
```

---

## アクセシビリティ

### キーボード操作

- **Tab**: ボタンにフォーカス
- **Enter/Space**: ボタンを実行
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- ローディング中のボタン -->
<button class="btn btn-primary" aria-busy="true" disabled>
  読み込み中...
</button>

<!-- アイコンのみのボタン -->
<button class="btn btn-ghost" aria-label="メニューを開く">
  <svg>...</svg>
</button>

<!-- トグルボタン -->
<button
  class="btn btn-secondary"
  aria-pressed="false"
  role="button"
>
  お気に入り
</button>
```

### フォーカススタイル

```css
.btn:focus-visible {
  outline: 2px solid var(--primary-default);
  outline-offset: 2px;
}
```

---

## ベストプラクティス

### ✅ 推奨

1. **1ページに1つのプライマリボタン**
   - 最も重要なアクションのみプライマリボタンを使用

2. **明確なラベル**
   - 「送信」「保存」「削除」など、アクションが明確な動詞を使用

3. **適切なバリアントの選択**
   - 破壊的なアクションには必ずDangerバリアントを使用

4. **無効状態の適切な使用**
   - フォームが未完成の場合は送信ボタンを無効化

### ❌ 非推奨

1. **複数のプライマリボタン**
   - ユーザーの意思決定を困難にする

2. **曖昧なラベル**
   - 「OK」「実行」など、何が起こるか不明確

3. **破壊的アクションに通常のボタンを使用**
   - 削除などは必ずDangerバリアントを使用

---

## バリエーション

### サイズバリアント (今後追加予定)

現在実装されているのは1サイズのみですが、将来的には以下のサイズバリアントを追加予定：

- `small` - コンパクトなボタン
- `medium` - 標準サイズ (現在のデフォルト)
- `large` - 大きなボタン

### アイコン付きボタン

```html
<button class="btn btn-primary">
  <svg class="btn-icon">...</svg>
  送信
</button>
```

```css
.btn-icon {
  width: var(--spacing-5);
  height: var(--spacing-5);
}
```

---

## テーマ対応

全てのボタントークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <button class="btn btn-primary">送信</button>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <button class="btn btn-primary">送信</button>
</html>
```

---

## 関連コンポーネント

- [Input](./input.md) - フォーム入力
- [Badge](./badge.md) - ステータス表示
- [Alert](./alert.md) - 通知メッセージ

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
