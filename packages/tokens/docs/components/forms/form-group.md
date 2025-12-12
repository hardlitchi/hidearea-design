# Form Group (フォームグループ) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/form-group.css`
**ステータス:** ✅ 実装済み

---

## 概要

Form Groupコンポーネントは、フォーム入力要素をラベル、ヘルパーテキスト、エラーメッセージと組み合わせて構造化するためのコンテナです。アクセシビリティを考慮した設計で、入力フィールドに関連する情報を一貫した方法で提供します。

### 用途

- フォーム入力とラベルの関連付け
- ヘルパーテキストによる入力ガイダンスの提供
- エラーメッセージの表示
- 必須フィールドの視覚的な表示
- フォーム全体の一貫したレイアウト

---

## 機能

### 1. ラベル

各フォームグループには、入力フィールドを説明するラベルが含まれます。

**特徴:**
- フォントサイズ: `0.875rem` (デスクトップ)
- フォントウェイト: Medium (500)
- クリック可能（入力要素にフォーカス移動）
- 状態に応じた色変更（エラー、無効）

### 2. 必須表示

required属性が設定されている場合、アスタリスク(*)が自動的に表示されます。

**特徴:**
- 色: エラーカラー（赤）
- ラベルの右側に表示
- 左マージン: `0.25rem`

### 3. ヘルパーテキスト

入力に関する補足情報や説明を提供します。

**特徴:**
- フォントサイズ: `0.75rem`
- 色: セカンダリテキストカラー
- 入力フィールドの下に配置
- 上マージン: `0.375rem`

### 4. エラーメッセージ

入力の検証エラーを表示します。

**特徴:**
- フォントサイズ: `0.75rem`
- 色: エラーカラー（赤）
- error属性がある場合のみ表示
- 入力フィールドの下に配置

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/form-group.css">
</head>
<body>
  <!-- 基本的な使用 -->
  <div class="ha-form-group">
    <label class="label">
      メールアドレス
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input type="email" placeholder="example@email.com">
    </div>
    <p class="helper-text">登録時に使用したメールアドレスを入力してください</p>
  </div>

  <!-- 必須フィールド -->
  <div class="ha-form-group" required>
    <label class="label">
      ユーザー名
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input type="text" placeholder="ユーザー名" required>
    </div>
    <p class="helper-text">3文字以上で入力してください</p>
  </div>

  <!-- エラー状態 -->
  <div class="ha-form-group" error>
    <label class="label">
      パスワード
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input type="password" aria-invalid="true">
    </div>
    <p class="error-text">パスワードは8文字以上である必要があります</p>
  </div>

  <!-- 無効状態 -->
  <div class="ha-form-group" disabled>
    <label class="label">アカウントID</label>
    <div class="slot-container">
      <input type="text" value="12345" disabled>
    </div>
    <p class="helper-text">アカウントIDは変更できません</p>
  </div>

  <!-- ヘルパーテキストなし -->
  <div class="ha-form-group">
    <label class="label">電話番号</label>
    <div class="slot-container">
      <input type="tel" placeholder="000-0000-0000">
    </div>
  </div>

  <!-- セレクトと組み合わせ -->
  <div class="ha-form-group" required>
    <label class="label">
      国
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <select required>
        <option value="">選択してください</option>
        <option value="jp">日本</option>
        <option value="us">アメリカ</option>
        <option value="uk">イギリス</option>
      </select>
    </div>
    <p class="helper-text">お住まいの国を選択してください</p>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `required` | `boolean` | `false` | 必須フィールドを示す赤いアスタリスクを表示 |
| `error` | `boolean` | `false` | エラー状態を表示（ラベルとメッセージが赤色に） |
| `disabled` | `boolean` | `false` | 無効状態を表示（テキストが灰色に） |

---

## CSS変数

```css
/* ラベル */
--font-size-sm: 0.875rem;              /* ラベルのフォントサイズ */
--font-weight-medium: 500;             /* ラベルのフォントウェイト */
--color-text-primary: #1a1a1a;         /* ラベルのテキスト色 */

/* 必須表示 */
--color-error: #dc2626;                /* 必須マークとエラーの色 */

/* ヘルパーテキスト */
--font-size-xs: 0.75rem;               /* ヘルパー/エラーテキストのサイズ */
--color-text-secondary: #6b7280;       /* ヘルパーテキストの色 */

/* 無効状態 */
--color-text-disabled: #9ca3af;        /* 無効状態のテキスト色 */

/* スペーシング */
--spacing-1: 0.25rem;                  /* 小スペース */
--spacing-1-5: 0.375rem;               /* 中小スペース */
--spacing-2: 0.5rem;                   /* 中スペース */
--spacing-4: 1rem;                     /* 大スペース */
--spacing-6: 1.5rem;                   /* 特大スペース（タッチデバイス） */

/* タッチデバイス最適化 */
--touch-target-minimum: 44px;          /* タッチターゲットの最小サイズ */
```

---

## レスポンシブ対応

### タッチデバイス最適化 (@media pointer: coarse)

```css
/* ラベルサイズの拡大 */
ラベルのフォントサイズ: 1rem
ラベルの下マージン: 0.75rem
ラベルの最小高さ: 44px（タップしやすさ向上）

/* テキストサイズの拡大 */
ヘルパー/エラーテキスト: 0.875rem
上マージン: 0.5rem

/* グループ間隔の拡大 */
フォームグループの下マージン: 1.5rem
```

### モバイル最適化 (@media max-width: 640px)

```css
/* レスポンシブフォントサイズ */
ラベル: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
ヘルパー/エラーテキスト: clamp(0.875rem, 0.8rem + 0.375vw, 1rem)
```

---

## アクセシビリティ

### ARIA属性の使用

```html
<!-- 必須フィールド -->
<div class="ha-form-group" required>
  <label class="label" for="email-input">
    メールアドレス
    <span class="required-indicator">*</span>
  </label>
  <div class="slot-container">
    <input
      id="email-input"
      type="email"
      aria-required="true"
    >
  </div>
  <p class="helper-text" id="email-helper">
    登録時に使用したメールアドレス
  </p>
</div>

<!-- エラー状態 -->
<div class="ha-form-group" error>
  <label class="label" for="password-input">パスワード</label>
  <div class="slot-container">
    <input
      id="password-input"
      type="password"
      aria-invalid="true"
      aria-describedby="password-error"
    >
  </div>
  <p class="error-text" id="password-error" role="alert">
    パスワードは8文字以上である必要があります
  </p>
</div>

<!-- 無効状態 -->
<div class="ha-form-group" disabled>
  <label class="label" for="account-id">アカウントID</label>
  <div class="slot-container">
    <input
      id="account-id"
      type="text"
      disabled
      aria-disabled="true"
    >
  </div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

```html
<!-- ラベルを常に提供 -->
<div class="ha-form-group">
  <label class="label" for="name">名前</label>
  <div class="slot-container">
    <input id="name" type="text">
  </div>
</div>

<!-- ヘルパーテキストで入力ガイダンスを提供 -->
<div class="ha-form-group">
  <label class="label">電話番号</label>
  <div class="slot-container">
    <input type="tel">
  </div>
  <p class="helper-text">ハイフン無しで入力してください</p>
</div>

<!-- 明確なエラーメッセージを表示 -->
<div class="ha-form-group" error>
  <label class="label">メールアドレス</label>
  <div class="slot-container">
    <input type="email" aria-invalid="true">
  </div>
  <p class="error-text">有効なメールアドレス形式で入力してください</p>
</div>
```

### ❌ 避けるべき

```html
<!-- ラベルなし（アクセシビリティの問題） -->
<div class="ha-form-group">
  <div class="slot-container">
    <input type="text" placeholder="名前">
  </div>
</div>

<!-- 曖昧なエラーメッセージ -->
<div class="ha-form-group" error>
  <label class="label">メールアドレス</label>
  <div class="slot-container">
    <input type="email">
  </div>
  <p class="error-text">エラーが発生しました</p>
</div>

<!-- ヘルパーテキストとエラーテキストを同時に表示 -->
<div class="ha-form-group" error>
  <label class="label">パスワード</label>
  <div class="slot-container">
    <input type="password">
  </div>
  <p class="helper-text">8文字以上で入力</p>
  <p class="error-text">パスワードが短すぎます</p>
</div>
```

---

## 使用例

### ログインフォーム

```html
<form>
  <div class="ha-form-group" required>
    <label class="label" for="login-email">
      メールアドレス
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input
        id="login-email"
        type="email"
        aria-required="true"
        placeholder="example@email.com"
      >
    </div>
  </div>

  <div class="ha-form-group" required>
    <label class="label" for="login-password">
      パスワード
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input
        id="login-password"
        type="password"
        aria-required="true"
      >
    </div>
    <p class="helper-text">パスワードをお忘れの場合は<a href="#">こちら</a></p>
  </div>
</form>
```

### ユーザー登録フォーム

```html
<form>
  <div class="ha-form-group" required>
    <label class="label" for="reg-name">
      氏名
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input id="reg-name" type="text" aria-required="true">
    </div>
  </div>

  <div class="ha-form-group" required error>
    <label class="label" for="reg-email">
      メールアドレス
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input
        id="reg-email"
        type="email"
        aria-invalid="true"
        aria-describedby="reg-email-error"
      >
    </div>
    <p class="error-text" id="reg-email-error" role="alert">
      このメールアドレスは既に登録されています
    </p>
  </div>

  <div class="ha-form-group" required>
    <label class="label" for="reg-password">
      パスワード
      <span class="required-indicator">*</span>
    </label>
    <div class="slot-container">
      <input
        id="reg-password"
        type="password"
        aria-required="true"
        aria-describedby="reg-password-helper"
      >
    </div>
    <p class="helper-text" id="reg-password-helper">
      8文字以上、大文字・小文字・数字を含める必要があります
    </p>
  </div>
</form>
```

---

## 関連コンポーネント

- [Input](./input.md) - テキスト入力フィールド
- [Textarea](./textarea.md) - 複数行テキスト入力
- [Select](./select.md) - 選択ボックス
- [Checkbox](./checkbox.md) - チェックボックス
- [Radio](./radio.md) - ラジオボタン
- [Date Picker](./date-picker.md) - 日付選択
- [Time Picker](./time-picker.md) - 時刻選択
- [File Upload](./file-upload.md) - ファイルアップロード

---

**最終更新:** 2025-12-12
