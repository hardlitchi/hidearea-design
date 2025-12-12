# Chip (チップ) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/chip.css`
**ステータス:** ✅ 実装済み

---

## 概要

チップコンポーネントは、タグ、カテゴリ、フィルター、選択された項目などを表示する小さなインタラクティブな要素です。
3つのサイズ（sm, md, lg）と、5つのカラーバリアント（primary, success, warning, error, info）をサポートしています。

### 用途

- タグ表示
- フィルター選択
- カテゴリラベル
- 選択済みアイテム表示

---

## バリアント

### 1. Primary (プライマリ)
ブランドカラーを使用したチップです。

**使用場面:**
- 重要なタグ
- アクティブなフィルター
- 選択された項目

### 2. Success (成功)
成功状態や完了を示すチップです。

**使用場面:**
- 完了タグ
- 承認済みラベル
- 成功状態の表示

### 3. Warning (警告)
注意が必要な情報を示すチップです。

**使用場面:**
- 注意タグ
- 保留中のラベル
- 警告状態の表示

### 4. Error (エラー)
エラーや重要な情報を示すチップです。

**使用場面:**
- エラータグ
- 拒否されたラベル
- 削除対象の表示

### 5. Info (情報)
情報を提供するチップです。

**使用場面:**
- 情報タグ
- ヒントラベル
- 補足情報の表示

---

## サイズ

### Small (sm)
- 高さ: `24px`
- フォントサイズ: `0.75rem`
- 用途: コンパクトな表示

### Medium (md) - デフォルト
- 高さ: `32px`
- フォントサイズ: `0.875rem`
- 用途: 標準的な表示

### Large (lg)
- 高さ: `40px`
- フォントサイズ: `1rem`
- 用途: 目立たせたい表示

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- 基本的なチップ -->
<ha-chip color="primary" size="md">
  タグ
</ha-chip>

<!-- アイコン付きチップ -->
<ha-chip color="success" size="md">
  <svg slot="icon">...</svg>
  完了
</ha-chip>

<!-- 削除可能なチップ -->
<ha-chip color="primary" size="md" removable>
  フィルター
</ha-chip>

<!-- クリック可能なチップ -->
<ha-chip color="info" size="md" interactive>
  カテゴリ
</ha-chip>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/chip.css">
</head>
<body>
  <!-- 基本的なチップ -->
  <div class="ha-chip" color="primary" size="md">
    <span class="chip">
      <span class="chip__text">タグ</span>
    </span>
  </div>

  <!-- アイコン付きチップ -->
  <div class="ha-chip" color="success" size="md">
    <span class="chip">
      <span class="chip__icon"><svg>...</svg></span>
      <span class="chip__text">完了</span>
    </span>
  </div>

  <!-- 削除可能なチップ -->
  <div class="ha-chip" color="primary" size="md">
    <span class="chip">
      <span class="chip__text">フィルター</span>
      <button class="chip__close" aria-label="削除">×</button>
    </span>
  </div>

  <!-- クリック可能なチップ -->
  <button class="ha-chip" color="info" size="md" interactive>
    <span class="chip">
      <span class="chip__text">カテゴリ</span>
    </span>
  </button>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `color` | `primary` \| `success` \| `warning` \| `error` \| `info` | `primary` | チップの色 |
| `size` | `small` \| `medium` \| `large` | `medium` | チップのサイズ |
| `interactive` | boolean | `false` | クリック可能な状態 |
| `disabled` | boolean | `false` | 無効状態 |

---

## CSS変数

チップコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### サイズ関連
- `--component-chip-size-small-height` - 24px
- `--component-chip-size-medium-height` - 32px
- `--component-chip-size-large-height` - 40px
- `--component-chip-size-small-padding-horizontal` - 8px
- `--component-chip-size-medium-padding-horizontal` - 12px
- `--component-chip-size-large-padding-horizontal` - 16px

### 色関連
- `--component-chip-primary-background-default` - プライマリ背景
- `--component-chip-primary-text-default` - プライマリテキスト
- `--component-chip-success-background-default` - 成功背景
- `--component-chip-warning-background-default` - 警告背景
- `--component-chip-error-background-default` - エラー背景
- `--component-chip-info-background-default` - 情報背景

### ボーダー
- `--component-chip-border-radius` - 16px (pill形状)
- `--component-chip-border-width` - 1px

---

## アクセシビリティ

- クリック可能なチップには`button`または`a`要素を使用
- 削除ボタンには`aria-label`で説明を提供
- キーボードでフォーカス可能にする
- 色だけでなくアイコンやテキストで意味を伝える

```html
<!-- クリック可能なチップ -->
<button class="ha-chip" color="primary" interactive aria-label="フィルターを適用">
  <span class="chip">
    <span class="chip__text">アクティブ</span>
  </span>
</button>

<!-- 削除可能なチップ -->
<div class="ha-chip" color="primary">
  <span class="chip">
    <span class="chip__text">タグ名</span>
    <button class="chip__close" aria-label="タグ名を削除">×</button>
  </span>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切な色の選択**
   - 意味のある色を使用（success=完了、error=エラーなど）

2. **簡潔なテキスト**
   - 短く分かりやすいラベルを使用

3. **一貫したサイズ**
   - 同じコンテキストでは同じサイズを維持

```html
<!-- 良い例 -->
<div class="ha-chip" color="success"><span class="chip"><span class="chip__text">完了</span></span></div>
<div class="ha-chip" color="warning"><span class="chip"><span class="chip__text">保留</span></span></div>
<div class="ha-chip" color="error"><span class="chip"><span class="chip__text">エラー</span></span></div>
```

### ❌ 非推奨

1. **長すぎるテキスト**
   - チップには短いラベルを使用

2. **意味のない色使い**
   - 色は意味を持たせる

---

## 関連コンポーネント

- [Badge](./badge.md) - 通知バッジ
- [Avatar](./avatar.md) - ユーザーアバター

---

**最終更新:** 2025-12-12
