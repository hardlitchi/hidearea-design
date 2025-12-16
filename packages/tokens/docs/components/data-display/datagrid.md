# Datagrid (データグリッド) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/datagrid.css`
**ステータス:** ✅ 実装済み

---

## 概要

Datagridコンポーネントは、表形式のデータを表示・操作するための高機能なテーブルコンポーネントです。
ソート、選択、ページネーション、ホバー効果など、モダンなデータテーブルに必要な機能を提供します。
大量のデータを効率的に表示し、ユーザーが情報を素早く見つけられるようにします。

### 用途

- データの一覧表示
- 管理画面のテーブル
- レポートやダッシュボード
- 商品リストや在庫管理
- ユーザー管理テーブル
- 検索結果の表示

---

## 主な機能

### 1. ソート機能

列ヘッダーをクリックして、データを昇順・降順にソートできます。

**特徴:**
- ソート可能な列にホバー効果
- ソートアイコンの表示
- ユーザー選択なしで列を強調

**使用場面:**
- 日付や数値の並び替え
- アルファベット順のソート
- 優先度の並び替え

### 2. 行選択機能

チェックボックスを使用して、複数の行を選択できます。

**特徴:**
- ヘッダーで全選択/全解除
- 個別行の選択
- 選択行の背景色変更
- 選択数のカウント

**使用場面:**
- 一括操作（削除、エクスポートなど）
- 複数アイテムの選択
- バッチ処理

### 3. ページネーション

大量のデータを複数ページに分割して表示します。

**特徴:**
- ページ番号の表示
- 前へ/次へボタン
- 現在のページ情報表示
- レスポンシブ対応

**使用場面:**
- 100件以上のデータ
- パフォーマンス最適化
- サーバーサイドページング

### 4. スタイルバリアント

- **Striped (ストライプ)**: 行を交互に色分け
- **Bordered (ボーダー)**: セルに境界線を追加
- **Hoverable (ホバー)**: ホバー時に行を強調

---

## 使用方法

### Pattern 1: 基本的なDatagrid

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/datagrid.css">
</head>
<body>
  <div class="ha-datagrid">
    <table class="datagrid datagrid--hoverable">
      <thead>
        <tr>
          <th class="datagrid-cell datagrid-header-cell">名前</th>
          <th class="datagrid-cell datagrid-header-cell">メール</th>
          <th class="datagrid-cell datagrid-header-cell">役割</th>
          <th class="datagrid-cell datagrid-header-cell">ステータス</th>
        </tr>
      </thead>
      <tbody>
        <tr class="datagrid-row">
          <td class="datagrid-cell">山田太郎</td>
          <td class="datagrid-cell">yamada@example.com</td>
          <td class="datagrid-cell">管理者</td>
          <td class="datagrid-cell">アクティブ</td>
        </tr>
        <tr class="datagrid-row">
          <td class="datagrid-cell">佐藤花子</td>
          <td class="datagrid-cell">sato@example.com</td>
          <td class="datagrid-cell">編集者</td>
          <td class="datagrid-cell">アクティブ</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
```

### Pattern 2: ソート機能付き

```html
<div class="ha-datagrid">
  <table class="datagrid datagrid--hoverable">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell datagrid-header-cell--sortable" onclick="sortTable(0)">
          名前
          <span class="sort-icon">↕</span>
        </th>
        <th class="datagrid-cell datagrid-header-cell datagrid-header-cell--sortable" onclick="sortTable(1)">
          登録日
          <span class="sort-icon">↕</span>
        </th>
        <th class="datagrid-cell datagrid-header-cell datagrid-header-cell--sortable" onclick="sortTable(2)">
          スコア
          <span class="sort-icon">↕</span>
        </th>
        <th class="datagrid-cell datagrid-header-cell">アクション</th>
      </tr>
    </thead>
    <tbody>
      <tr class="datagrid-row">
        <td class="datagrid-cell">山田太郎</td>
        <td class="datagrid-cell">2025-01-15</td>
        <td class="datagrid-cell">95</td>
        <td class="datagrid-cell">
          <button class="btn-action">編集</button>
        </td>
      </tr>
      <tr class="datagrid-row">
        <td class="datagrid-cell">佐藤花子</td>
        <td class="datagrid-cell">2025-02-20</td>
        <td class="datagrid-cell">87</td>
        <td class="datagrid-cell">
          <button class="btn-action">編集</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

<script>
function sortTable(columnIndex) {
  const table = document.querySelector('.datagrid');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('.datagrid-row'));

  rows.sort((a, b) => {
    const aValue = a.children[columnIndex].textContent;
    const bValue = b.children[columnIndex].textContent;
    return aValue.localeCompare(bValue);
  });

  rows.forEach(row => tbody.appendChild(row));
}
</script>
```

### Pattern 3: 選択機能付き

```html
<div class="ha-datagrid">
  <table class="datagrid datagrid--hoverable">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell datagrid-cell--checkbox">
          <input type="checkbox" id="select-all" onchange="toggleSelectAll(this)">
        </th>
        <th class="datagrid-cell datagrid-header-cell">商品名</th>
        <th class="datagrid-cell datagrid-header-cell">価格</th>
        <th class="datagrid-cell datagrid-header-cell">在庫</th>
      </tr>
    </thead>
    <tbody>
      <tr class="datagrid-row" data-id="1">
        <td class="datagrid-cell datagrid-cell--checkbox">
          <input type="checkbox" class="row-checkbox" onchange="toggleRowSelection(this)">
        </td>
        <td class="datagrid-cell">ノートパソコン</td>
        <td class="datagrid-cell">¥120,000</td>
        <td class="datagrid-cell">15</td>
      </tr>
      <tr class="datagrid-row" data-id="2">
        <td class="datagrid-cell datagrid-cell--checkbox">
          <input type="checkbox" class="row-checkbox" onchange="toggleRowSelection(this)">
        </td>
        <td class="datagrid-cell">マウス</td>
        <td class="datagrid-cell">¥3,500</td>
        <td class="datagrid-cell">42</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
function toggleSelectAll(checkbox) {
  const checkboxes = document.querySelectorAll('.row-checkbox');
  checkboxes.forEach(cb => {
    cb.checked = checkbox.checked;
    toggleRowSelection(cb);
  });
}

function toggleRowSelection(checkbox) {
  const row = checkbox.closest('.datagrid-row');
  if (checkbox.checked) {
    row.classList.add('datagrid-row--selected');
  } else {
    row.classList.remove('datagrid-row--selected');
  }
}
</script>
```

### Pattern 4: ページネーション付き

```html
<div class="ha-datagrid">
  <table class="datagrid datagrid--hoverable datagrid--striped">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell">ID</th>
        <th class="datagrid-cell datagrid-header-cell">タイトル</th>
        <th class="datagrid-cell datagrid-header-cell">著者</th>
        <th class="datagrid-cell datagrid-header-cell">日付</th>
      </tr>
    </thead>
    <tbody id="table-body">
      <!-- データ行はJavaScriptで挿入 -->
    </tbody>
  </table>

  <div class="datagrid-pagination">
    <div class="pagination-info">
      全 150 件中 1-10 件を表示
    </div>
    <div class="pagination-controls">
      <button class="pagination-button" onclick="previousPage()" disabled>
        前へ
      </button>
      <span class="pagination-page">1 / 15</span>
      <button class="pagination-button" onclick="nextPage()">
        次へ
      </button>
    </div>
  </div>
</div>
```

### Pattern 5: ストライプとボーダー付き

```html
<div class="ha-datagrid">
  <table class="datagrid datagrid--hoverable datagrid--striped datagrid--bordered">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell">部門</th>
        <th class="datagrid-cell datagrid-header-cell">売上</th>
        <th class="datagrid-cell datagrid-header-cell">目標</th>
        <th class="datagrid-cell datagrid-header-cell">達成率</th>
      </tr>
    </thead>
    <tbody>
      <tr class="datagrid-row">
        <td class="datagrid-cell">営業部</td>
        <td class="datagrid-cell">¥5,200,000</td>
        <td class="datagrid-cell">¥5,000,000</td>
        <td class="datagrid-cell">104%</td>
      </tr>
      <tr class="datagrid-row">
        <td class="datagrid-cell">開発部</td>
        <td class="datagrid-cell">¥3,800,000</td>
        <td class="datagrid-cell">¥4,000,000</td>
        <td class="datagrid-cell">95%</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Pattern 6: 空の状態

```html
<div class="ha-datagrid">
  <table class="datagrid">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell">名前</th>
        <th class="datagrid-cell datagrid-header-cell">メール</th>
        <th class="datagrid-cell datagrid-header-cell">ステータス</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="3">
          <div class="datagrid-empty">
            データがありません
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 属性とクラス

### テーブルクラス

| クラス | 説明 |
|-------|------|
| `datagrid` | 基本のテーブルクラス（必須） |
| `datagrid--hoverable` | ホバー時に行を強調 |
| `datagrid--striped` | 偶数行に背景色を追加 |
| `datagrid--bordered` | セルに境界線を追加 |

### セルクラス

| クラス | 説明 |
|-------|------|
| `datagrid-cell` | 基本のセルクラス（必須） |
| `datagrid-header-cell` | ヘッダーセル |
| `datagrid-header-cell--sortable` | ソート可能なヘッダー |
| `datagrid-cell--checkbox` | チェックボックス列 |

### 行クラス

| クラス | 説明 |
|-------|------|
| `datagrid-row` | 基本の行クラス |
| `datagrid-row--selected` | 選択された行 |

### ページネーションクラス

| クラス | 説明 |
|-------|------|
| `datagrid-pagination` | ページネーションコンテナ |
| `pagination-info` | 表示情報テキスト |
| `pagination-controls` | コントロールボタンエリア |
| `pagination-button` | ページ切り替えボタン |
| `pagination-page` | 現在のページ表示 |

---

## CSS変数

Datagridコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--datagrid-bg` - テーブルの背景色（デフォルト: `--foreground-inverse`）
- `--datagrid-color` - テキスト色（デフォルト: `--foreground-primary`）
- `--datagrid-header-bg` - ヘッダーの背景色（デフォルト: `--foreground-inverse`）
- `--datagrid-header-hover-bg` - ヘッダーホバー背景色（デフォルト: `--background-tertiary`）
- `--datagrid-row-hover-bg` - 行ホバー背景色（デフォルト: `--background-tertiary`）
- `--datagrid-selected-bg` - 選択行の背景色（デフォルト: `--primary-default`）
- `--datagrid-selected-hover-bg` - 選択行ホバー背景色
- `--datagrid-stripe-bg` - ストライプ背景色（デフォルト: `--background-tertiary`）
- `--datagrid-border-color` - 境界線の色（デフォルト: `--border-default`）

### スペーシング
- `--datagrid-cell-padding` - セルのパディング（デフォルト: `--spacing-3`）
- `--spacing-1` - ソートアイコンのマージン
- `--spacing-2` - チェックボックスパディング
- `--spacing-3` - ページネーションパディング
- `--spacing-4` - ページネーション横パディング

### タイポグラフィ
- `--font-size-sm` - テーブルとページネーションのフォントサイズ
- `--font-size-xs` - ソートアイコンのフォントサイズ
- `--font-weight-semibold` - ヘッダーのフォントウェイト
- `--font-weight-medium` - ページネーションボタンのフォントウェイト

### ボーダー
- `--border-radius-md` - ページネーションボタンの角丸

### カスタマイズ例

```css
/* カスタムカラー */
.ha-datagrid {
  --datagrid-bg: #fafafa;
  --datagrid-header-bg: #333;
  --datagrid-color: #333;
  --datagrid-selected-bg: #e3f2fd;
  --datagrid-border-color: #ddd;
}

/* カスタムパディング */
.ha-datagrid .datagrid-cell {
  --datagrid-cell-padding: var(--spacing-4);
}

/* カスタムホバー効果 */
.ha-datagrid .datagrid--hoverable .datagrid-row:hover {
  --datagrid-row-hover-bg: #f0f9ff;
  transform: scale(1.01);
}
```

---

## アクセシビリティ

### セマンティックHTML

```html
<div class="ha-datagrid" role="region" aria-label="ユーザー一覧テーブル">
  <table class="datagrid" role="table" aria-describedby="table-desc">
    <caption id="table-desc" style="position: absolute; left: -10000px;">
      全150名のユーザー情報。ソート可能な列を含みます。
    </caption>
    <thead>
      <tr role="row">
        <th class="datagrid-cell datagrid-header-cell" role="columnheader" scope="col">
          名前
        </th>
        <th class="datagrid-cell datagrid-header-cell" role="columnheader" scope="col">
          メール
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="datagrid-row" role="row">
        <td class="datagrid-cell" role="cell">山田太郎</td>
        <td class="datagrid-cell" role="cell">yamada@example.com</td>
      </tr>
    </tbody>
  </table>
</div>
```

### ソート機能のアクセシビリティ

```html
<th
  class="datagrid-cell datagrid-header-cell datagrid-header-cell--sortable"
  role="columnheader"
  scope="col"
  aria-sort="ascending"
  tabindex="0"
  onclick="sortColumn(0)"
  onkeypress="handleKeyPress(event, 0)"
>
  名前
  <span class="sort-icon" aria-hidden="true">↑</span>
</th>

<script>
function handleKeyPress(event, columnIndex) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    sortColumn(columnIndex);
  }
}
</script>
```

### 選択機能のアクセシビリティ

```html
<th class="datagrid-cell datagrid-header-cell datagrid-cell--checkbox">
  <input
    type="checkbox"
    id="select-all"
    aria-label="すべての行を選択"
    onchange="toggleSelectAll(this)"
  >
</th>

<td class="datagrid-cell datagrid-cell--checkbox">
  <input
    type="checkbox"
    class="row-checkbox"
    aria-label="山田太郎を選択"
    onchange="toggleRowSelection(this)"
  >
</td>
```

### ページネーションのアクセシビリティ

```html
<nav class="datagrid-pagination" aria-label="テーブルページネーション">
  <div class="pagination-info" aria-live="polite" aria-atomic="true">
    全 150 件中 1-10 件を表示
  </div>
  <div class="pagination-controls">
    <button
      class="pagination-button"
      aria-label="前のページへ"
      disabled
    >
      前へ
    </button>
    <span class="pagination-page" aria-current="page">
      1 / 15
    </span>
    <button
      class="pagination-button"
      aria-label="次のページへ"
    >
      次へ
    </button>
  </div>
</nav>
```

### キーボード操作

- **Tab**: セル、ボタン、チェックボックス間を移動
- **Enter/Space**: ソート実行、チェックボックス切り替え、ボタンクリック
- **↑/↓**: 行間の移動（カスタム実装が必要）
- **Shift + Tab**: 前の要素にフォーカス

---

## ベストプラクティス

### ✅ 推奨

1. **適切なヘッダーの使用**
   - 各列に明確なヘッダーを設定
   - `scope="col"`を使用してアクセシビリティ向上

2. **ソート機能の明示**
   - ソート可能な列にアイコンを表示
   - 現在のソート状態を示す

3. **ページネーションの実装**
   - 50行以上のデータではページネーションを使用
   - 現在のページと総ページ数を表示

4. **空の状態の処理**
   - データがない場合は明確なメッセージを表示
   - 適切なアクションを提示

5. **レスポンシブ対応**
   - モバイルでは重要な列のみ表示
   - 横スクロールを考慮

```html
<!-- 良い例: 完全なアクセシビリティ -->
<div class="ha-datagrid" role="region" aria-label="商品一覧">
  <table class="datagrid datagrid--hoverable datagrid--striped">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell" scope="col">商品名</th>
        <th class="datagrid-cell datagrid-header-cell datagrid-header-cell--sortable"
            scope="col"
            aria-sort="none"
            tabindex="0">
          価格
          <span class="sort-icon" aria-hidden="true">↕</span>
        </th>
        <th class="datagrid-cell datagrid-header-cell" scope="col">在庫</th>
      </tr>
    </thead>
    <tbody>
      <tr class="datagrid-row">
        <td class="datagrid-cell">ノートパソコン</td>
        <td class="datagrid-cell">¥120,000</td>
        <td class="datagrid-cell">15</td>
      </tr>
    </tbody>
  </table>

  <nav class="datagrid-pagination" aria-label="ページネーション">
    <div class="pagination-info" aria-live="polite">
      全 100 件中 1-10 件を表示
    </div>
    <div class="pagination-controls">
      <button class="pagination-button" aria-label="前のページ" disabled>
        前へ
      </button>
      <span class="pagination-page" aria-current="page">1 / 10</span>
      <button class="pagination-button" aria-label="次のページ">
        次へ
      </button>
    </div>
  </nav>
</div>
```

### ❌ 非推奨

1. **ヘッダーなしのテーブル**
   - アクセシビリティとユーザビリティが低下

2. **大量データの一度表示**
   - パフォーマンスが悪化
   - スクロールが困難

3. **不明確なソート状態**
   - ユーザーが現在のソート順を把握できない

4. **選択状態の不明確さ**
   - 選択された行が視覚的に区別できない

5. **モバイル対応の欠如**
   - 小画面で使いにくい

```html
<!-- ヘッダーなし -->
<table class="datagrid">
  <tbody>
    <tr class="datagrid-row">
      <td class="datagrid-cell">山田太郎</td>
      <td class="datagrid-cell">yamada@example.com</td>
    </tr>
  </tbody>
</table>

<!-- ページネーションなしで1000行 -->
<table class="datagrid">
  <tbody>
    <!-- 1000行のデータ... -->
  </tbody>
</table>

<!-- ソート状態が不明確 -->
<th class="datagrid-cell datagrid-header-cell datagrid-header-cell--sortable">
  名前
</th>

<!-- aria-labelなしの選択 -->
<input type="checkbox" class="row-checkbox">
```

---

## レスポンシブ対応

Datagridコンポーネントには、モバイルデバイス向けのレスポンシブスタイルが組み込まれています。

```css
@media (max-width: 640px) {
  .datagrid-cell {
    padding: var(--spacing-2);
    font-size: var(--font-size-xs);
  }

  .pagination-info {
    display: none; /* モバイルでは非表示 */
  }

  .pagination-page {
    font-size: var(--font-size-xs);
  }
}
```

### カスタムレスポンシブ

```html
<style>
@media (max-width: 768px) {
  /* 重要でない列を非表示 */
  .datagrid-cell.hide-mobile {
    display: none;
  }

  /* 横スクロール可能に */
  .ha-datagrid {
    overflow-x: auto;
  }

  /* 最小幅を設定 */
  .datagrid {
    min-width: 600px;
  }
}
</style>

<div class="ha-datagrid">
  <table class="datagrid datagrid--hoverable">
    <thead>
      <tr>
        <th class="datagrid-cell datagrid-header-cell">名前</th>
        <th class="datagrid-cell datagrid-header-cell hide-mobile">メール</th>
        <th class="datagrid-cell datagrid-header-cell">ステータス</th>
        <th class="datagrid-cell datagrid-header-cell hide-mobile">登録日</th>
      </tr>
    </thead>
    <tbody>
      <!-- データ行... -->
    </tbody>
  </table>
</div>
```

---

## テーマ対応

全てのトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-datagrid">
    <table class="datagrid datagrid--hoverable datagrid--striped">
      <!-- テーブル内容... -->
    </table>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-datagrid">
    <table class="datagrid datagrid--hoverable datagrid--striped">
      <!-- テーブル内容... -->
    </table>
  </div>
</html>
```

---

## 関連コンポーネント

- [Table](./table.md) - シンプルなテーブルコンポーネント
- [Pagination](../navigation/pagination.md) - ページネーションコンポーネント
- [Checkbox](../forms/checkbox.md) - 行選択用のチェックボックス
- [Button](../layout/button.md) - アクションボタン
- [Badge](./badge.md) - ステータス表示

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
