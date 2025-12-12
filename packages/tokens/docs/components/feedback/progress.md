# Progress (プログレス) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/css/components/feedback/progress.css`
**ステータス:** ✅ 実装済み

---

## 概要

プログレスコンポーネントは、タスクの完了状況や処理の進行状況を視覚的に表示するコンポーネントです。
3つのサイズ（sm, md, lg）と、5つのカラーバリアント（primary, success, warning, error, info）、2つのタイプ（determinate, indeterminate）をサポートしています。

### 用途

- ファイルアップロードの進行状況
- フォーム入力の完了度
- タスクの完了率表示
- ローディング状態の表示

---

## バリアント

### 1. Determinate (確定的)
具体的なパーセンテージを表示します。

**使用場面:**
- ファイルアップロード
- データ処理の進行状況
- フォーム入力の完了度

### 2. Indeterminate (不確定的)
完了までの時間が不明な処理に使用します。

**使用場面:**
- 読み込み中
- 処理中（時間不明）
- サーバー応答待ち

---

## サイズ

### Small (sm)
- 高さ: `0.5rem` (8px)
- 用途: コンパクトな表示

### Medium (md) - デフォルト
- 高さ: `0.75rem` (12px)
- 用途: 標準的な表示

### Large (lg)
- 高さ: `1rem` (16px)
- 用途: 目立たせたい表示

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- 確定的プログレス -->
<ha-progress value="60" max="100" color="primary" size="md">
  60%
</ha-progress>

<!-- 不確定的プログレス -->
<ha-progress indeterminate color="primary" size="md">
  読み込み中...
</ha-progress>

<!-- ラベル付きプログレス -->
<ha-progress value="75" max="100" color="success" size="md" show-label>
  完了中
</ha-progress>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/feedback/progress.css">
</head>
<body>
  <!-- 確定的プログレス -->
  <div class="ha-progress" size="md">
    <div class="progress progress--md">
      <div class="progress__bar progress__bar--primary" style="width: 60%"></div>
    </div>
  </div>

  <!-- ラベル付きプログレス -->
  <div class="ha-progress" size="md">
    <div class="progress__label">
      <span>アップロード中</span>
      <span class="progress__percentage">60%</span>
    </div>
    <div class="progress progress--md">
      <div class="progress__bar progress__bar--primary" style="width: 60%"></div>
    </div>
  </div>

  <!-- 不確定的プログレス（アニメーション） -->
  <div class="ha-progress" size="md">
    <div class="progress progress--md">
      <div class="progress__bar progress__bar--primary progress__bar--animated" style="width: 100%"></div>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `value` | number | 0 | 現在の値 |
| `max` | number | 100 | 最大値 |
| `color` | `primary` \| `success` \| `warning` \| `error` \| `info` | `primary` | プログレスバーの色 |
| `size` | `sm` \| `md` \| `lg` | `md` | プログレスバーのサイズ |
| `indeterminate` | boolean | `false` | 不確定的モード |

---

## CSS変数

プログレスコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### サイズ関連
- `--progress-height-sm` - 0.5rem
- `--progress-height-md` - 0.75rem
- `--progress-height-lg` - 1rem

### 色関連
- `--primary-default` - プライマリ色
- `--success-default` - 成功色
- `--warning-default` - 警告色
- `--error-default` - エラー色
- `--info-default` - 情報色
- `--color-neutral-200` - 背景色

### ボーダー
- `--border-radius-full` - 完全な角丸

---

## アクセシビリティ

- `role="progressbar"`を使用
- `aria-valuenow`、`aria-valuemin`、`aria-valuemax`で進行状況を提供
- `aria-label`または`aria-labelledby`で説明を提供
- 不確定的な場合は`aria-busy="true"`を使用

```html
<!-- 確定的プログレス -->
<div role="progressbar" 
     aria-valuenow="60" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="アップロード進行状況">
  <div class="progress progress--md">
    <div class="progress__bar progress__bar--primary" style="width: 60%"></div>
  </div>
</div>

<!-- 不確定的プログレス -->
<div role="progressbar" 
     aria-busy="true"
     aria-label="読み込み中">
  <div class="progress progress--md">
    <div class="progress__bar progress__bar--primary progress__bar--animated"></div>
  </div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切な色の選択**
   - 完了に近い場合はsuccess色を使用
   - エラー時はerror色を使用

2. **ラベルの提供**
   - 進行状況の説明を追加
   - パーセンテージを表示

```html
<!-- 良い例 -->
<div class="progress__label">
  <span>ファイルアップロード中</span>
  <span class="progress__percentage">75%</span>
</div>
<div class="progress progress--md">
  <div class="progress__bar progress__bar--success" style="width: 75%"></div>
</div>
```

### ❌ 非推奨

1. **説明のないプログレスバー**
   - 何が進行中か不明確

2. **誤った色の使用**
   - 成功時にerror色を使用しない

---

## 関連コンポーネント

- [Spinner](./spinner.md) - ローディングスピナー
- [Skeleton](./skeleton.md) - スケルトンローダー

---

**最終更新:** 2025-12-12
