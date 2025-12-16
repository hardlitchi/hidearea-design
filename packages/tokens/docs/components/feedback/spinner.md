# Spinner (スピナー) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/css/components/feedback/spinner.css`
**ステータス:** ✅ 実装済み

---

## 概要

スピナーコンポーネントは、データの読み込み中や処理中であることを示す回転アニメーションです。
5つのサイズ（xs, sm, md, lg, xl）と、6つのカラーバリアント（primary, success, warning, error, info, neutral）をサポートしています。

### 用途

- ページ読み込み中の表示
- データ取得中の表示
- ボタン内のローディング状態
- インライン処理中の表示

---

## バリアント

### 1. Circular (サークル)
最も一般的な回転するサークルアニメーションです。

**使用場面:**
- 一般的なローディング
- ページ全体の読み込み
- データ取得中

### 2. Dots (ドット)
3つのドットが波打つアニメーションです。

**使用場面:**
- インライン表示
- テキストと組み合わせる
- 控えめな表示

### 3. Pulse (パルス)
脈打つようなアニメーションです。

**使用場面:**
- 最小限のアニメーション
- アクセシビリティ対応
- バックグラウンド処理

---

## サイズ

### Extra Small (xs)
- サイズ: `1rem` (16px)
- 用途: インラインテキスト

### Small (sm)
- サイズ: `1.5rem` (24px)
- 用途: ボタン内

### Medium (md) - デフォルト
- サイズ: `2rem` (32px)
- 用途: 標準的な表示

### Large (lg)
- サイズ: `3rem` (48px)
- 用途: カード中央

### Extra Large (xl)
- サイズ: `4rem` (64px)
- 用途: ページ全体

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- 基本的なスピナー -->
<ha-spinner size="md" color="primary"></ha-spinner>

<!-- ドットスピナー -->
<ha-spinner size="md" color="primary" variant="dots"></ha-spinner>

<!-- パルススピナー -->
<ha-spinner size="md" color="primary" variant="pulse"></ha-spinner>

<!-- ラベル付きスピナー -->
<ha-spinner size="lg" color="primary" label="読み込み中..."></ha-spinner>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/feedback/spinner.css">
</head>
<body>
  <!-- サークルスピナー -->
  <div class="ha-spinner" size="md">
    <div class="spinner spinner--md spinner--circular spinner--primary"></div>
  </div>

  <!-- ドットスピナー -->
  <div class="ha-spinner" size="md">
    <div class="spinner spinner--md spinner--dots">
      <div class="spinner__dot"></div>
      <div class="spinner__dot"></div>
      <div class="spinner__dot"></div>
    </div>
  </div>

  <!-- パルススピナー -->
  <div class="ha-spinner" size="md">
    <div class="spinner spinner--md spinner--pulse spinner--primary"></div>
  </div>

  <!-- ラベル付きスピナー -->
  <div class="ha-spinner" size="lg" role="status">
    <div class="spinner spinner--lg spinner--circular spinner--primary"></div>
    <span class="spinner__label">読み込み中...</span>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | スピナーのサイズ |
| `color` | `primary` \| `success` \| `warning` \| `error` \| `info` \| `neutral` | `primary` | スピナーの色 |
| `variant` | `circular` \| `dots` \| `pulse` | `circular` | アニメーションタイプ |

---

## CSS変数

スピナーコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### サイズ関連
- `--spinner-size-xs` - 1rem
- `--spinner-size-sm` - 1.5rem
- `--spinner-size-md` - 2rem
- `--spinner-size-lg` - 3rem
- `--spinner-size-xl` - 4rem

### 色関連
- `--primary-default` - プライマリ色
- `--success-default` - 成功色
- `--warning-default` - 警告色
- `--error-default` - エラー色
- `--info-default` - 情報色
- `--foreground-tertiary` - ニュートラル色

### アニメーション
- `--spinner-speed` - 0.8s (アニメーション速度)

---

## アクセシビリティ

- `role="status"`を使用
- `aria-label`または`aria-live="polite"`で説明を提供
- スクリーンリーダー向けのテキストを追加
- 視覚障害者向けに代替テキストを提供

```html
<!-- スクリーンリーダー対応 -->
<div class="ha-spinner" role="status" aria-label="読み込み中">
  <div class="spinner spinner--md spinner--circular spinner--primary"></div>
  <span class="sr-only">データを読み込んでいます...</span>
</div>

<!-- aria-live使用 -->
<div class="ha-spinner" role="status" aria-live="polite">
  <div class="spinner spinner--md spinner--circular spinner--primary"></div>
  <span class="spinner__label">処理中...</span>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なサイズの選択**
   - コンテキストに応じたサイズを使用
   - ボタン内はsmサイズ

2. **説明の提供**
   - 何を読み込んでいるか明示
   - スクリーンリーダー対応

3. **アニメーションの制御**
   - prefers-reduced-motionに対応

```html
<!-- 良い例: ボタン内スピナー -->
<button disabled>
  <div class="spinner spinner--sm spinner--circular"></div>
  送信中...
</button>

<!-- 良い例: ページローディング -->
<div class="loading-overlay" role="status" aria-label="ページ読み込み中">
  <div class="spinner spinner--xl spinner--circular spinner--primary"></div>
  <p>データを読み込んでいます...</p>
</div>
```

### ❌ 非推奨

1. **説明のないスピナー**
   - アクセシビリティを損なう

2. **大きすぎるサイズ**
   - UIを圧迫しない適切なサイズを選択

---

## 関連コンポーネント

- [Progress](./progress.md) - プログレスバー
- [Skeleton](./skeleton.md) - スケルトンローダー

---

**最終更新:** 2025-12-12
