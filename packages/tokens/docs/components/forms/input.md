# Input (テキスト入力) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/input.yaml`
**ステータス:** ✅ 実装済み (Phase 3)

---

## 概要

Inputコンポーネントは、ユーザーがテキストデータを入力するための基本的なフォーム要素です。複数の状態（default, hover, focus, error, success, disabled, readonly）をサポートし、フォームバリデーションと連携します。

### 用途

- テキスト入力フィールド
- メールアドレス入力
- パスワード入力
- 検索ボックス
- フォーム入力

---

## 状態

### 1. Default (デフォルト)

通常の入力可能状態です。

**使用場面:**
- 通常のテキスト入力
- 初期状態のフォームフィールド

**トークンプレフィックス:** `component.input.*`

### 2. Hover (ホバー)

マウスオーバー時の状態です。

**使用場面:**
- ユーザーがフィールドの上にマウスを置いた時
- インタラクティブであることを示す

### 3. Focus (フォーカス)

フィールドがフォーカスされている状態です。

**使用場面:**
- ユーザーがフィールドをクリックした時
- キーボードでフィールドを選択した時
- 現在入力中であることを示す

### 4. Error (エラー)

バリデーションエラーがある状態です。

**使用場面:**
- 必須フィールドが未入力
- メールアドレス形式が不正
- 文字数制限超過

### 5. Success (成功)

バリデーションが成功した状態です。

**使用場面:**
- 正しい形式で入力された
- サーバー側バリデーション成功
- リアルタイムバリデーション成功

### 6. Disabled (無効)

入力が無効な状態です。

**使用場面:**
- 条件が満たされるまで入力不可
- 権限がない場合
- フォーム送信中

### 7. Readonly (読み取り専用)

表示のみで編集不可の状態です。

**使用場面:**
- 編集不可だが選択可能なフィールド
- 参照用の情報表示

---

## トークン一覧

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.input.background.default` | `{background.primary}` | デフォルト状態の背景色 |
| `component.input.background.disabled` | `{background.tertiary}` | 無効時の背景色 |
| `component.input.background.readonly` | `{background.secondary}` | 読み取り専用時の背景色 |

### Text (テキスト色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.input.text.default` | `{foreground.primary}` | デフォルトのテキスト色 |
| `component.input.text.placeholder` | `{foreground.tertiary}` | プレースホルダーのテキスト色 |
| `component.input.text.disabled` | `{foreground.tertiary}` | 無効時のテキスト色 |

### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.input.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.input.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.input.border.focus` | `{primary.default}` | フォーカス時のボーダー色 |
| `component.input.border.error` | `{error.default}` | エラー時のボーダー色 |
| `component.input.border.success` | `{success.default}` | 成功時のボーダー色 |
| `component.input.border.disabled` | `{border.subtle}` | 無効時のボーダー色 |

---

## 使用例

### HTML/CSS

```html
<!-- デフォルト入力 -->
<input
  type="text"
  class="input"
  placeholder="名前を入力してください"
  style="
    background: var(--component-input-background-default);
    color: var(--component-input-text-default);
    border: 1px solid var(--component-input-border-default);
    padding: 8px 12px;
    border-radius: 4px;
  "
>

<!-- エラー状態の入力 -->
<input
  type="email"
  class="input input--error"
  placeholder="メールアドレス"
  aria-invalid="true"
  style="
    background: var(--component-input-background-default);
    color: var(--component-input-text-default);
    border: 1px solid var(--component-input-border-error);
  "
>

<!-- 成功状態の入力 -->
<input
  type="text"
  class="input input--success"
  value="有効な入力"
  aria-invalid="false"
  style="
    border: 1px solid var(--component-input-border-success);
  "
>

<!-- 無効状態の入力 -->
<input
  type="text"
  class="input"
  disabled
  style="
    background: var(--component-input-background-disabled);
    color: var(--component-input-text-disabled);
    border: 1px solid var(--component-input-border-disabled);
    cursor: not-allowed;
  "
>
```

### CSS Classes

```css
/* ベーススタイル */
.input {
  background: var(--component-input-background-default);
  color: var(--component-input-text-default);
  border: 1px solid var(--component-input-border-default);
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* プレースホルダー */
.input::placeholder {
  color: var(--component-input-text-placeholder);
}

/* ホバー */
.input:hover:not(:disabled) {
  border-color: var(--component-input-border-hover);
}

/* フォーカス */
.input:focus {
  border-color: var(--component-input-border-focus);
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* エラー */
.input--error,
.input[aria-invalid="true"] {
  border-color: var(--component-input-border-error);
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* 成功 */
.input--success {
  border-color: var(--component-input-border-success);
}

.input--success:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* 無効 */
.input:disabled {
  background: var(--component-input-background-disabled);
  color: var(--component-input-text-disabled);
  border-color: var(--component-input-border-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* 読み取り専用 */
.input:read-only {
  background: var(--component-input-background-readonly);
  cursor: default;
}
```

### React

```tsx
import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  error,
  success,
  disabled,
  readonly,
}) => {
  const getClassName = () => {
    const classes = ['input'];
    if (error) classes.push('input--error');
    if (success) classes.push('input--success');
    return classes.join(' ');
  };

  return (
    <input
      type="text"
      className={getClassName()}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      aria-invalid={error}
      style={{
        background: disabled
          ? 'var(--component-input-background-disabled)'
          : readonly
          ? 'var(--component-input-background-readonly)'
          : 'var(--component-input-background-default)',
        color: 'var(--component-input-text-default)',
        border: `1px solid ${
          error
            ? 'var(--component-input-border-error)'
            : success
            ? 'var(--component-input-border-success)'
            : 'var(--component-input-border-default)'
        }`,
      }}
    />
  );
};
```

---

## アクセシビリティ

### ARIA属性

- `aria-invalid`: エラー状態の場合は`"true"`を設定
- `aria-describedby`: エラーメッセージやヘルパーテキストのIDを参照
- `aria-required`: 必須フィールドの場合は`"true"`を設定
- `aria-label` または `<label>`: フィールドの目的を明示

### キーボード操作

- `Tab`: 次のフィールドへ移動
- `Shift + Tab`: 前のフィールドへ移動
- テキスト入力: 標準的なテキスト編集操作

### 例

```html
<div class="form-field">
  <label for="email" id="email-label">
    メールアドレス <span aria-label="必須">*</span>
  </label>
  <input
    type="email"
    id="email"
    class="input input--error"
    aria-invalid="true"
    aria-describedby="email-error"
    aria-required="true"
    aria-labelledby="email-label"
  >
  <span id="email-error" class="error-message" role="alert">
    有効なメールアドレスを入力してください
  </span>
</div>
```

---

## ベストプラクティス

### 1. 適切なラベル付け

```html
<!-- Good -->
<label for="username">ユーザー名</label>
<input id="username" type="text" class="input">

<!-- Bad -->
<input type="text" class="input" placeholder="ユーザー名">
```

### 2. バリデーションフィードバック

```html
<!-- Good: 明確なエラーメッセージ -->
<input type="email" class="input input--error" aria-describedby="email-error">
<span id="email-error">メールアドレスの形式が正しくありません</span>

<!-- Bad: エラーの理由が不明 -->
<input type="email" class="input input--error">
```

### 3. プレースホルダーの使用

```html
<!-- Good: ラベルとプレースホルダーの併用 -->
<label for="search">検索</label>
<input id="search" type="text" placeholder="キーワードを入力..." class="input">

<!-- Bad: プレースホルダーのみ -->
<input type="text" placeholder="検索" class="input">
```

### 4. 適切な type 属性

```html
<!-- Good: 適切なtype -->
<input type="email" class="input">
<input type="password" class="input">
<input type="tel" class="input">
<input type="url" class="input">

<!-- Bad: 全てtext -->
<input type="text" class="input">
```

---

## 関連コンポーネント

- **[Button](./button.md)** - フォーム送信ボタン
- **[Select](./select.md)** - ドロップダウン選択
- **[Textarea](./textarea.md)** - 複数行テキスト入力
- **[Checkbox](./checkbox.md)** - チェックボックス入力
- **[Radio](./radio.md)** - ラジオボタン選択

---

## デザインガイドライン

### サイズとスペーシング

- **最小高さ:** 40px（タッチターゲットサイズ）
- **パディング:** 8px 12px（上下 左右）
- **ボーダー幅:** 1px
- **ボーダー半径:** 4px

### フォーカス状態

- フォーカスリングは常に表示
- カラー: `{primary.default}`
- シャドウ: `0 0 0 3px rgba(primary, 0.1)`

### エラー/成功フィードバック

- エラー/成功メッセージはフィールドの下に配置
- アイコンで視覚的にも伝える
- `role="alert"`で即座に読み上げ

---

**最終更新:** 2025-12-12
**バージョン:** 1.0.0
