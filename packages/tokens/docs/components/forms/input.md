# Input (テキスト入力) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/input.css`
**ステータス:** ✅ 実装済み

---

## 概要

Inputコンポーネントは、ユーザーがテキストデータを入力するための基本的なフォーム要素です。3つのバリアント（default, filled, outlined）と3つのサイズ（sm, md, lg）をサポートし、エラー状態、無効状態、読み取り専用状態など、様々な状態に対応しています。

### 用途

- テキスト入力
- メールアドレス入力
- パスワード入力
- 数値入力
- 検索フィールド

---

## バリアント

### 1. Default (デフォルト - アウトライン)

標準的なアウトラインスタイルです。最も一般的に使用されます。

**使用場面:**
- 一般的なフォーム入力
- ログインフォーム
- 設定画面

**スタイル:**
- ボーダー: 1px solid
- 背景: プライマリ背景色
- フォーカス時: プライマリカラーのボーダー + シャドウ

### 2. Filled (塗りつぶし)

背景が塗りつぶされたスタイルです。視覚的に区別しやすいです。

**使用場面:**
- 検索バー
- コメント入力欄
- 背景が明るい場所での入力

**スタイル:**
- ボーダー: 1px solid transparent
- 背景: セカンダリ背景色
- フォーカス時: プライマリ背景色 + ボーダー表示

### 3. Outlined (強調アウトライン)

2pxの太いボーダーで強調されたスタイルです。

**使用場面:**
- 重要な入力フィールド
- 単独で配置される入力
- 視覚的な強調が必要な場合

**スタイル:**
- ボーダー: 2px solid
- 背景: プライマリ背景色
- フォーカス時: プライマリカラーのボーダー + シャドウ

---

## サイズ

### Small (sm)
- パディング: `0.375rem 0.625rem`
- フォントサイズ: `0.875rem`
- 最小高さ: `32px`

### Medium (md) - デフォルト
- パディング: `0.5rem 0.75rem`
- フォントサイズ: `1rem`
- 最小高さ: `40px`

### Large (lg)
- パディング: `0.625rem 1rem`
- フォントサイズ: `1.125rem`
- 最小高さ: `48px`

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/input.css">
</head>
<body>
  <!-- デフォルトバリアント -->
  <div class="ha-input" variant="default" size="md">
    <div class="input-wrapper">
      <input type="text" placeholder="名前を入力">
    </div>
  </div>

  <!-- Filledバリアント -->
  <div class="ha-input" variant="filled" size="md">
    <div class="input-wrapper">
      <input type="email" placeholder="メールアドレス">
    </div>
  </div>

  <!-- Outlinedバリアント -->
  <div class="ha-input" variant="outlined" size="lg">
    <div class="input-wrapper">
      <input type="password" placeholder="パスワード">
    </div>
  </div>

  <!-- プレフィックス/サフィックス付き -->
  <div class="ha-input" variant="default" size="md">
    <div class="input-wrapper">
      <span class="prefix">@</span>
      <input type="text" placeholder="ユーザー名">
    </div>
  </div>

  <div class="ha-input" variant="default" size="md">
    <div class="input-wrapper">
      <input type="text" placeholder="金額">
      <span class="suffix">円</span>
    </div>
  </div>

  <!-- エラー状態 -->
  <div class="ha-input" variant="default" size="md" error>
    <div class="input-wrapper">
      <input type="email" placeholder="メールアドレス" aria-invalid="true">
    </div>
  </div>

  <!-- 無効状態 -->
  <div class="ha-input" variant="default" size="md">
    <div class="input-wrapper">
      <input type="text" value="変更不可" disabled>
    </div>
  </div>

  <!-- 読み取り専用 -->
  <div class="ha-input" variant="filled" size="md">
    <div class="input-wrapper">
      <input type="text" value="表示のみ" readonly>
    </div>
  </div>

  <!-- フルWidth -->
  <div class="ha-input" variant="default" size="md" full-width>
    <div class="input-wrapper">
      <input type="text" placeholder="フルワイド入力">
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `default` \| `filled` \| `outlined` | `default` | 入力フィールドのスタイルバリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | 入力フィールドのサイズ |
| `error` | `boolean` | `false` | エラー状態を表示 |
| `full-width` | `boolean` | `false` | 幅100%に拡張 |

---

## アクセシビリティ

```html
<!-- ラベル付き -->
<label for="username">ユーザー名</label>
<div class="ha-input" variant="default">
  <div class="input-wrapper">
    <input id="username" type="text" aria-required="true">
  </div>
</div>

<!-- エラー状態 -->
<div class="ha-input" error>
  <div class="input-wrapper">
    <input
      type="email"
      aria-invalid="true"
      aria-describedby="email-error"
    >
  </div>
</div>
<span id="email-error" role="alert">有効なメールアドレスを入力してください</span>
```

---

## 関連コンポーネント

- [Button](../layout/button.md) - フォーム送信ボタン
- [Textarea](./textarea.md) - 複数行テキスト入力
- [Select](./select.md) - 選択ボックス

---

**最終更新:** 2025-12-12
