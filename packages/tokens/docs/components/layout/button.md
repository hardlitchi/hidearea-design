# Button (ボタン) コンポーネント

**カテゴリ:** Layout
**ファイル:** `src/css/components/layout/button.css`
**ステータス:** ✅ 実装済み

---

## 概要

ボタンコンポーネントは、ユーザーがアクションを実行するための主要なインタラクティブ要素です。5つのバリアント（primary, secondary, outline, ghost, danger）と3つのサイズ（sm, md, lg）をサポートしています。

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

### 2. Secondary (セカンダリ)

副次的なアクションに使用します。プライマリより控えめな見た目です。

**使用場面:**
- キャンセルボタン
- 追加のオプション
- 補助的なアクション

### 3. Outline (アウトライン)

枠線のみのボタンです。背景が透明で境界線が特徴的です。

**使用場面:**
- 代替アクション
- グループ化されたボタンセット
- 背景との対比が必要な場合

### 4. Ghost (ゴースト)

最も控えめなボタンです。背景がなく、ホバー時のみ背景色が表示されます。

**使用場面:**
- テーブル内のアクション
- カード内の控えめなボタン
- アイコンボタン

### 5. Danger (デンジャー)

破壊的または危険なアクションに使用します。エラーカラーを使用します。

**使用場面:**
- 削除ボタン
- リセットボタン
- 取り消し不可能なアクション

---

## サイズ

### Small (sm)
- パディング: `0.375rem 0.75rem`
- フォントサイズ: `0.875rem`
- 最小高さ: `32px`

### Medium (md) - デフォルト
- パディング: `0.5rem 1rem`
- フォントサイズ: `1rem`
- 最小高さ: `40px`

### Large (lg)
- パディング: `0.75rem 1.5rem`
- フォントサイズ: `1.125rem`
- 最小高さ: `48px`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-button variant="primary" size="md">
  <button>送信</button>
</ha-button>

<ha-button variant="secondary" size="sm">
  <button>キャンセル</button>
</ha-button>

<ha-button variant="danger">
  <button>削除</button>
</ha-button>

<ha-button variant="ghost">
  <button disabled>無効</button>
</ha-button>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/layout/button.css">
</head>
<body>
  <!-- プライマリボタン -->
  <div class="ha-button" variant="primary" size="md">
    <button>送信</button>
  </div>

  <!-- セカンダリボタン -->
  <div class="ha-button" variant="secondary" size="md">
    <button>キャンセル</button>
  </div>

  <!-- アウトラインボタン -->
  <div class="ha-button" variant="outline" size="md">
    <button>詳細</button>
  </div>

  <!-- ゴーストボタン -->
  <div class="ha-button" variant="ghost" size="sm">
    <button>編集</button>
  </div>

  <!-- デンジャーボタン -->
  <div class="ha-button" variant="danger" size="md">
    <button>削除</button>
  </div>

  <!-- 無効化ボタン -->
  <div class="ha-button" variant="primary">
    <button disabled>無効</button>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { buttonStyles, buttonHtmlStyles } from '@hidearea-design/tokens/styles/button';

// React例
function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <div className="ha-button" data-variant={variant} data-size={size}>
      <button {...props}>{children}</button>
    </div>
  );
}

// 使用例
<Button variant="primary" size="md">送信</Button>
<Button variant="secondary" size="sm">キャンセル</Button>
<Button variant="danger" disabled>削除</Button>
```

### Pattern 4: 統合CSS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/all.css">
</head>
<body>
  <!-- 全コンポーネントが利用可能 -->
  <div class="ha-button" variant="primary">
    <button>送信</button>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `primary` \| `secondary` \| `outline` \| `ghost` \| `danger` | `primary` | ボタンのスタイルバリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | ボタンのサイズ |

---

## CSS変数

ボタンコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--primary-default` - プライマリカラー
- `--primary-hover` - プライマリホバーカラー
- `--primary-active` - プライマリアクティブカラー
- `--secondary-default` - セカンダリカラー
- `--error-default` - エラーカラー
- `--foreground-inverse` - 反転テキストカラー
- `--foreground-primary` - 主要テキストカラー
- `--border-default` - デフォルトボーダーカラー

### スペーシング
- `--spacing-1-5` - 0.375rem (sm パディング縦)
- `--spacing-2` - 0.5rem (md パディング縦)
- `--spacing-2-5` - 0.625rem (lg パディング縦)
- `--spacing-3` - 0.75rem (sm パディング横)
- `--spacing-4` - 1rem (md パディング横)
- `--spacing-6` - 1.5rem (lg パディング横)

### ボーダー
- `--border-radius-base` - 基本角丸
- `--border-radius-md` - 中サイズ角丸
- `--border-radius-lg` - 大サイズ角丸
- `--border-width-1` - 1px
- `--border-width-2` - 2px

### アニメーション
- `--animation-duration-base` - 200ms
- `--animation-duration-fast` - 150ms
- `--animation-easing-ease` - ease

---

## アクセシビリティ

- `button`要素を使用し、セマンティックなHTMLを保つ
- `:focus-visible`でキーボードフォーカスを明示
- `disabled`属性で無効状態を表現
- `aria-label`や`aria-describedby`で追加のコンテキストを提供可能

```html
<!-- アクセシビリティの良い例 -->
<div class="ha-button" variant="danger">
  <button aria-label="このアイテムを削除">削除</button>
</div>

<div class="ha-button" variant="primary">
  <button aria-describedby="submit-help">送信</button>
</div>
<p id="submit-help">フォームを送信すると確認メールが届きます</p>
```

---

## ベストプラクティス

### ✅ 推奨

```html
<!-- 適切なバリアント選択 -->
<div class="ha-button" variant="primary"><button>保存</button></div>
<div class="ha-button" variant="secondary"><button>キャンセル</button></div>

<!-- 破壊的アクションにはdanger -->
<div class="ha-button" variant="danger"><button>削除</button></div>

<!-- サイズの一貫性 -->
<div class="ha-button" variant="primary" size="md"><button>次へ</button></div>
<div class="ha-button" variant="secondary" size="md"><button>戻る</button></div>
```

### ❌ 非推奨

```html
<!-- プライマリボタンを複数配置しない -->
<div class="ha-button" variant="primary"><button>保存</button></div>
<div class="ha-button" variant="primary"><button>送信</button></div>
<div class="ha-button" variant="primary"><button>確認</button></div>

<!-- 異なるサイズを混在させない -->
<div class="ha-button" size="sm"><button>小</button></div>
<div class="ha-button" size="lg"><button>大</button></div>

<!-- 危険でないアクションにdangerを使わない -->
<div class="ha-button" variant="danger"><button>詳細を見る</button></div>
```

---

## 関連コンポーネント

- [Form Group](../forms/form-group.md) - ボタンをフォームと組み合わせる
- [Input](../forms/input.md) - フォーム入力と組み合わせる
- [Modal](../overlays/modal.md) - モーダル内でのアクションボタン

---

**最終更新:** 2025-12-12
