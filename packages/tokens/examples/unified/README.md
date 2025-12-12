# Unified CSS Example

このディレクトリには、統合CSS（`build/css/html/all.css`）を使用したサンプルが含まれています。

## 特徴

- **1ファイルで全コンポーネント対応**: 38個のコンポーネントが1つのCSSファイルにまとめられています
- **ファイルサイズ**: 約149KB（Gzip圧縮後は大幅に小さくなります）
- **クラスプレフィックス**: `.ha-*` プレフィックスで名前空間を分離
- **用途**: プロトタイピング、デモページ、小規模プロジェクト

## 使用方法

### HTML

```html
<!DOCTYPE html>
<html lang="ja" data-theme="light">
<head>
  <link rel="stylesheet" href="../../build/css/variables.css">
  <link rel="stylesheet" href="../../build/css/html/all.css">
</head>
<body>
  <!-- Button -->
  <div class="ha-button">
    <button>クリック</button>
  </div>

  <!-- Card -->
  <div class="ha-card">
    <h3>タイトル</h3>
    <p>コンテンツ</p>
  </div>

  <!-- Badge -->
  <div class="ha-badge">
    <span>バッジ</span>
  </div>

  <!-- Alert -->
  <div class="ha-alert">
    <div role="alert">アラート</div>
  </div>
</body>
</html>
```

## 利用可能なコンポーネント

統合CSSには以下の38コンポーネントが含まれています:

### Forms (10)
- `.ha-button`
- `.ha-input`
- `.ha-checkbox`
- `.ha-radio`
- `.ha-select`
- `.ha-textarea`
- `.ha-switch`
- `.ha-form-group`
- `.ha-file-upload`
- `.ha-date-picker`
- `.ha-time-picker`

### Data Display (11)
- `.ha-card`
- `.ha-table`
- `.ha-list-container`
- `.ha-list-item`
- `.ha-list-divider`
- `.ha-avatar`
- `.ha-avatar-group`
- `.ha-badge`
- `.ha-chip`
- `.ha-accordion`
- `.ha-datagrid`

### Navigation (4)
- `.ha-breadcrumb`
- `.ha-menu`
- `.ha-pagination`
- `.ha-tabs`

### Overlays (3)
- `.ha-modal`
- `.ha-drawer`
- `.ha-tooltip`

### Feedback (6)
- `.ha-alert`
- `.ha-toast`
- `.ha-toast-container`
- `.ha-progress`
- `.ha-skeleton`
- `.ha-spinner`

### Layout (4)
- `.ha-button` (重複)
- `.ha-container`
- `.ha-grid`
- `.ha-stack`

## vs. 個別インポート

### 統合CSS（このサンプル）

**利点**:
- 1回のHTTPリクエストで全コンポーネント取得
- 設定が簡単
- プロトタイピングに最適

**欠点**:
- 未使用コンポーネントも含まれる
- ファイルサイズが大きい（149KB）

### 個別インポート（examples/basic）

**利点**:
- 必要なコンポーネントのみインポート
- ファイルサイズを最小化
- 本番環境に最適

**欠点**:
- 複数のHTTPリクエスト
- 各コンポーネントを個別に管理

## パフォーマンス

- **ファイルサイズ**: 149KB (非圧縮)
- **Gzip圧縮後**: 約20-30KB (推定)
- **HTTPリクエスト数**: 2個 (variables.css + all.css)

## デモページ

`index.html`を開いてサンプルを確認できます:

```bash
open examples/unified/index.html
```

## 本番環境での使用

本番環境では以下を推奨します:
1. 必要なコンポーネントのみ個別にインポート (`build/css/html/forms/button.css`)
2. CSS Minification
3. Gzip/Brotli圧縮
4. CDNからの配信
