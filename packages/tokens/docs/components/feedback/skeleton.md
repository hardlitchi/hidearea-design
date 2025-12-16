# Skeleton (スケルトン) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/css/components/feedback/skeleton.css`
**ステータス:** ✅ 実装済み

---

## 概要

スケルトンコンポーネントは、コンテンツの読み込み中にプレースホルダーとして表示されるコンポーネントです。
4つのバリアント（text, circle, rectangle, rounded）と、2つのアニメーション（pulse, wave）をサポートしています。

### 用途

- コンテンツ読み込み中のプレースホルダー
- 画像読み込み前の表示
- リスト項目のローディング状態
- カードのローディング状態

---

## バリアント

### 1. Text (テキスト)
テキスト行のスケルトンです。

**使用場面:**
- タイトルのローディング
- 段落のローディング
- リストアイテムのローディング

### 2. Circle (サークル)
円形のスケルトンです。

**使用場面:**
- アバターのローディング
- アイコンのローディング
- 円形画像のローディング

### 3. Rectangle (矩形)
長方形のスケルトンです。

**使用場面:**
- 画像のローディング
- カードのローディング
- バナーのローディング

### 4. Rounded (角丸矩形)
角丸の長方形スケルトンです。

**使用場面:**
- カード画像のローディング
- サムネイルのローディング
- ボタンのローディング

---

## アニメーション

### Pulse (パルス)
透明度が変化する脈打つアニメーションです。

### Wave (ウェーブ)
光が流れるようなアニメーションです。

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- テキストスケルトン -->
<ha-skeleton variant="text" width="200px" height="1em"></ha-skeleton>

<!-- サークルスケルトン -->
<ha-skeleton variant="circle" width="40px" height="40px"></ha-skeleton>

<!-- 矩形スケルトン -->
<ha-skeleton variant="rectangle" width="100%" height="200px"></ha-skeleton>

<!-- ウェーブアニメーション -->
<ha-skeleton variant="text" animation="wave" width="100%"></ha-skeleton>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/feedback/skeleton.css">
</head>
<body>
  <!-- テキストスケルトン（パルス） -->
  <div class="ha-skeleton">
    <div class="skeleton skeleton--text skeleton--pulse" style="width: 200px;"></div>
  </div>

  <!-- サークルスケルトン -->
  <div class="ha-skeleton">
    <div class="skeleton skeleton--circular skeleton--pulse" style="width: 40px; height: 40px;"></div>
  </div>

  <!-- 矩形スケルトン（ウェーブ） -->
  <div class="ha-skeleton">
    <div class="skeleton skeleton--rectangular skeleton--wave" style="width: 100%; height: 200px;"></div>
  </div>

  <!-- 角丸矩形スケルトン -->
  <div class="ha-skeleton">
    <div class="skeleton skeleton--pulse" style="width: 100%; height: 150px; border-radius: 8px;"></div>
  </div>

  <!-- カードスケルトンの例 -->
  <div class="card-skeleton">
    <div class="skeleton skeleton--rectangular skeleton--wave" style="width: 100%; height: 200px;"></div>
    <div class="skeleton skeleton--text skeleton--pulse" style="width: 80%; margin-top: 16px;"></div>
    <div class="skeleton skeleton--text skeleton--pulse" style="width: 60%; margin-top: 8px;"></div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `text` \| `circle` \| `rectangle` \| `rounded` | `text` | スケルトンの形状 |
| `animation` | `pulse` \| `wave` | `pulse` | アニメーションタイプ |
| `width` | string | `100%` | 幅（CSS値） |
| `height` | string | `1em` | 高さ（CSS値） |

---

## CSS変数

スケルトンコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--skeleton-bg` - 背景色（デフォルト: `--background-tertiary`）
- `--skeleton-wave-color` - ウェーブ色（デフォルト: rgba(255, 255, 255, 0.4)）

### ボーダー
- `--skeleton-border-radius` - 角丸（デフォルト: `--border-radius-md`）
- `--border-radius-full` - 円形用の完全な角丸

---

## アクセシビリティ

- `aria-busy="true"`を使用
- `aria-label`で読み込み中であることを示す
- 読み込み完了後は適切にコンテンツを置き換え
- `role="status"`を使用

```html
<!-- アクセシビリティ対応 -->
<div role="status" aria-busy="true" aria-label="コンテンツ読み込み中">
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 100%;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 80%;"></div>
  <span class="sr-only">コンテンツを読み込んでいます...</span>
</div>

<!-- カードスケルトン -->
<div class="card" role="status" aria-label="記事読み込み中">
  <div class="skeleton skeleton--rectangular skeleton--wave" style="height: 200px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 80%; margin-top: 16px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 60%; margin-top: 8px;"></div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **実際のレイアウトを再現**
   - 読み込み後のコンテンツと同じ構造を使用
   - サイズや配置を一致させる

2. **適切なアニメーションの選択**
   - パフォーマンスを考慮
   - prefers-reduced-motionに対応

3. **複数行のテキスト**
   - 最後の行は短めに（80%程度）

```html
<!-- 良い例: リストアイテムスケルトン -->
<div class="list-item-skeleton">
  <div class="skeleton skeleton--circular skeleton--pulse" style="width: 40px; height: 40px;"></div>
  <div style="flex: 1; margin-left: 12px;">
    <div class="skeleton skeleton--text skeleton--pulse" style="width: 100%;"></div>
    <div class="skeleton skeleton--text skeleton--pulse" style="width: 70%; margin-top: 8px;"></div>
  </div>
</div>

<!-- 良い例: カードスケルトン -->
<div class="card-skeleton">
  <div class="skeleton skeleton--wave" style="width: 100%; height: 180px; border-radius: 8px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 90%; margin-top: 16px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 80%; margin-top: 8px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 60%; margin-top: 8px;"></div>
</div>
```

### ❌ 非推奨

1. **実際のコンテンツと異なるレイアウト**
   - レイアウトシフトを引き起こす

2. **過度なアニメーション**
   - パフォーマンスに影響
   - ユーザー体験を損なう

3. **長時間の表示**
   - タイムアウト処理を実装

---

## パターン例

### プロフィールカードスケルトン

```html
<div class="profile-card-skeleton">
  <!-- アバター -->
  <div class="skeleton skeleton--circular skeleton--pulse" style="width: 80px; height: 80px; margin: 0 auto;"></div>
  
  <!-- 名前 -->
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 60%; margin: 16px auto 0;"></div>
  
  <!-- 説明 -->
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 80%; margin: 8px auto 0;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 70%; margin: 4px auto 0;"></div>
</div>
```

### ブログ記事スケルトン

```html
<article class="blog-skeleton">
  <!-- サムネイル -->
  <div class="skeleton skeleton--wave" style="width: 100%; height: 300px; border-radius: 8px;"></div>
  
  <!-- タイトル -->
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 90%; margin-top: 24px; height: 2em;"></div>
  
  <!-- メタ情報 -->
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 40%; margin-top: 12px; height: 1em;"></div>
  
  <!-- 本文 -->
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 100%; margin-top: 16px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 95%; margin-top: 8px;"></div>
  <div class="skeleton skeleton--text skeleton--pulse" style="width: 80%; margin-top: 8px;"></div>
</article>
```

---

## 関連コンポーネント

- [Spinner](./spinner.md) - ローディングスピナー
- [Progress](./progress.md) - プログレスバー

---

**最終更新:** 2025-12-12
