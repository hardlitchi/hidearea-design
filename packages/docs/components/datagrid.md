# DataGrid

高度なデータグリッドコンポーネント。ソート、ページネーション、行選択機能を備えた、大量データの表示に適したテーブルコンポーネントです。

## 基本的な使い方

```javascript
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' }
];

const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

const grid = document.querySelector('ha-datagrid');
grid.setColumns(columns);
grid.setData(data);
```

```html
<ha-datagrid></ha-datagrid>
```

## 主な機能

### ソート機能

列ヘッダーをクリックして、データをソートできます。

```javascript
const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'email', label: 'Email', sortable: false }
];
```

- **1回目のクリック**: 昇順ソート
- **2回目のクリック**: 降順ソート
- **3回目のクリック**: ソート解除

### ページネーション

大量のデータを複数ページに分割して表示します。

```html
<ha-datagrid page-size="10"></ha-datagrid>
```

デフォルトのページサイズは10行です。`page-size`属性で変更できます。

### 行選択

チェックボックスで行を選択できます。

```html
<ha-datagrid selectable></ha-datagrid>
```

```javascript
const grid = document.querySelector('ha-datagrid');

// 選択された行のインデックスを取得
const selectedRows = grid.getSelectedRows();

// 選択をクリア
grid.clearSelection();
```

## スタイルバリアント

### Striped（縞模様）

```html
<ha-datagrid striped></ha-datagrid>
```

### Bordered（罫線）

```html
<ha-datagrid bordered></ha-datagrid>
```

### Hoverable（ホバーエフェクト）

```html
<ha-datagrid hoverable></ha-datagrid>
```

### 全機能有効

```html
<ha-datagrid striped bordered hoverable selectable></ha-datagrid>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `striped` | `boolean` | `false` | 縞模様の行 |
| `bordered` | `boolean` | `false` | 罫線表示 |
| `hoverable` | `boolean` | `false` | ホバーエフェクト |
| `selectable` | `boolean` | `false` | 行選択機能 |
| `page-size` | `number` | `10` | 1ページあたりの行数 |
| `current-page` | `number` | `1` | 現在のページ番号 |

## メソッド

| メソッド | 説明 |
|---------|------|
| `setColumns(columns)` | カラム定義を設定 |
| `setData(data)` | データを設定 |
| `getSelectedRows()` | 選択された行のインデックス配列を取得 |
| `clearSelection()` | 選択をクリア |

## イベント

| イベント | 説明 | detail |
|---------|------|--------|
| `sort-change` | ソート状態が変更された | `{ sortKey, sortDirection }` |
| `selection-change` | 選択状態が変更された | `{ selectedRows }` |
| `page-change` | ページが変更された | `{ currentPage, pageSize }` |

## React

```tsx
import { DataGrid } from '@hidearea-design/react';

const columns = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
];

const data = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
];

function App() {
  const handleSortChange = (event) => {
    console.log('Sort:', event.detail);
  };

  const handleSelectionChange = (event) => {
    console.log('Selection:', event.detail.selectedRows);
  };

  return (
    <DataGrid
      columns={columns}
      data={data}
      striped
      hoverable
      selectable
      onSortChange={handleSortChange}
      onSelectionChange={handleSelectionChange}
    />
  );
}
```

## Vue

```vue
<template>
  <HaDataGrid
    :columns="columns"
    :data="data"
    striped
    hoverable
    selectable
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { DataGrid as HaDataGrid } from '@hidearea-design/vue';

const columns = ref([
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
]);

const data = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
]);

const handleSortChange = (event) => {
  console.log('Sort:', event.detail);
};

const handleSelectionChange = (event) => {
  console.log('Selection:', event.detail.selectedRows);
};
</script>
```

## 使用例

### ユーザー管理

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useState } from 'react';

function UserManagement() {
  const columns = [
    { key: 'id', label: 'ID', sortable: true, width: '60px' },
    { key: 'name', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
  ];

  const [data] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@company.com', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@company.com', department: 'Marketing', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@company.com', department: 'Sales', status: 'Inactive' },
  ]);

  return (
    <div>
      <h2>User Management</h2>
      <DataGrid columns={columns} data={data} striped hoverable selectable pageSize={10} />
    </div>
  );
}
```

### 商品在庫管理

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useRef, useState } from 'react';

function ProductInventory() {
  const gridRef = useRef(null);
  const [data] = useState([
    { sku: 'PRD-001', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 150 },
    { sku: 'PRD-002', name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 500 },
    { sku: 'PRD-003', name: 'Laptop Stand', category: 'Office', price: 49.99, stock: 75 },
  ]);

  const columns = [
    { key: 'sku', label: 'SKU', sortable: true, width: '100px' },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price', label: 'Price', sortable: true, width: '100px' },
    { key: 'stock', label: 'Stock', sortable: true, width: '80px' },
  ];

  const handleDelete = () => {
    const selected = gridRef.current?.getSelectedRows();
    console.log('Delete items:', selected);
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleDelete}>Delete Selected</button>
      </div>
      <DataGrid ref={gridRef} columns={columns} data={data} bordered hoverable selectable pageSize={10} />
    </div>
  );
}
```

### 売上レポート

```html
<div id="sales-report"></div>

<script>
  const columns = [
    { key: 'date', label: 'Date', sortable: true, width: '120px' },
    { key: 'orderId', label: 'Order ID', sortable: true, width: '100px' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, width: '100px' },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
  ];

  const data = [
    { date: '2024-01-15', orderId: 'ORD-1001', customer: 'Alice Johnson', amount: '$299.99', status: 'Completed' },
    { date: '2024-01-16', orderId: 'ORD-1002', customer: 'Bob Smith', amount: '$159.99', status: 'Pending' },
    { date: '2024-01-17', orderId: 'ORD-1003', customer: 'Charlie Brown', amount: '$89.99', status: 'Shipped' },
  ];

  const grid = document.createElement('ha-datagrid');
  grid.setAttribute('striped', '');
  grid.setAttribute('bordered', '');
  grid.setAttribute('hoverable', '');
  grid.setAttribute('page-size', '15');

  document.getElementById('sales-report').appendChild(grid);

  grid.setColumns(columns);
  grid.setData(data);

  grid.addEventListener('sort-change', (e) => {
    console.log('Sort changed:', e.detail);
  });
</script>
```

### ページネーション付き大量データ

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function LargeDataset() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 大量のダミーデータを生成
    const items = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
      department: ['Engineering', 'Marketing', 'Sales'][i % 3],
      status: ['Active', 'Inactive'][i % 2],
    }));
    setData(items);
  }, []);

  const columns = [
    { key: 'id', label: 'ID', sortable: true, width: '60px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true, width: '100px' },
  ];

  const handlePageChange = (event) => {
    console.log('Page changed:', event.detail);
  };

  return (
    <DataGrid
      columns={columns}
      data={data}
      striped
      hoverable
      pageSize={20}
      onPageChange={handlePageChange}
    />
  );
}
```

### カスタムイベントハンドリング

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useRef, useState } from 'react';

function CustomEventHandling() {
  const gridRef = useRef(null);
  const [sortInfo, setSortInfo] = useState({ key: '', direction: '' });
  const [selectedCount, setSelectedCount] = useState(0);

  const columns = [
    { key: 'id', label: 'ID', sortable: true, width: '60px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: false },
  ];

  const data = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  const handleSortChange = (event) => {
    const { sortKey, sortDirection } = event.detail;
    setSortInfo({ key: sortKey || 'none', direction: sortDirection || 'none' });
  };

  const handleSelectionChange = (event) => {
    setSelectedCount(event.detail.selectedRows.length);
  };

  const clearAllSelections = () => {
    gridRef.current?.clearSelection();
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5' }}>
        <p>Current Sort: {sortInfo.key} ({sortInfo.direction})</p>
        <p>Selected Rows: {selectedCount}</p>
        <button onClick={clearAllSelections}>Clear Selection</button>
      </div>
      <DataGrid
        ref={gridRef}
        columns={columns}
        data={data}
        hoverable
        selectable
        onSortChange={handleSortChange}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
```

## カラム定義

カラムオブジェクトで利用可能なプロパティ：

```typescript
interface DataGridColumn {
  key: string;           // データのキー（必須）
  label: string;         // 列ヘッダーのラベル（必須）
  sortable?: boolean;    // ソート可能かどうか（オプション）
  width?: string;        // 列の幅（CSS値、オプション）
}
```

### カラム幅の設定

```javascript
const columns = [
  { key: 'id', label: 'ID', width: '60px' },
  { key: 'name', label: 'Name', width: '200px' },
  { key: 'email', label: 'Email' },  // 自動幅
];
```

## スタイルのカスタマイズ

DataGrid コンポーネントは、デザイントークンとカスタムCSS変数を使用して柔軟にカスタマイズできます。

### デザイントークン

DataGrid コンポーネントで使用される主要なデザイントークン：

```css
:root {
  /* テーブル背景 */
  --datagrid-bg: var(--color-surface-0);
  --datagrid-stripe-bg: var(--color-surface-50);

  /* ヘッダー */
  --datagrid-header-bg: var(--color-surface-100);
  --datagrid-header-hover-bg: var(--color-surface-200);
  --datagrid-header-color: var(--color-text-primary);

  /* 行 */
  --datagrid-row-hover-bg: var(--color-surface-50);
  --datagrid-selected-bg: var(--color-primary-50);
  --datagrid-selected-hover-bg: var(--color-primary-100);

  /* ボーダー */
  --datagrid-border-color: var(--color-border-subtle);
  --datagrid-cell-padding: var(--space-3); /* 12px */

  /* フォント */
  --datagrid-font-size: var(--font-size-sm);
  --datagrid-header-font-weight: var(--font-weight-semibold);
}
```

### カスタムCSS変数

DataGrid のスタイルをカスタマイズするためのCSS変数：

```css
ha-datagrid {
  /* 背景色 */
  --ha-datagrid-bg: var(--color-surface-0);
  --ha-datagrid-stripe-bg: var(--color-surface-50);

  /* ヘッダー */
  --ha-datagrid-header-bg: var(--color-surface-100);
  --ha-datagrid-header-hover-bg: var(--color-surface-200);
  --ha-datagrid-header-color: var(--color-text-primary);
  --ha-datagrid-header-font-weight: 600;

  /* 行のホバー */
  --ha-datagrid-row-hover-bg: var(--color-surface-50);

  /* 選択された行 */
  --ha-datagrid-selected-bg: var(--color-primary-50);
  --ha-datagrid-selected-hover-bg: var(--color-primary-100);

  /* ボーダー */
  --ha-datagrid-border-color: var(--color-border-subtle);
  --ha-datagrid-border-width: 1px;

  /* パディング */
  --ha-datagrid-cell-padding: 0.75rem;
  --ha-datagrid-header-padding: 0.75rem;

  /* フォント */
  --ha-datagrid-font-size: 14px;
  --ha-datagrid-line-height: 1.5;
}

/* コンパクトスタイル */
ha-datagrid.compact {
  --ha-datagrid-cell-padding: 0.5rem;
  --ha-datagrid-header-padding: 0.5rem;
  --ha-datagrid-font-size: 13px;
}

/* ラージスタイル */
ha-datagrid.large {
  --ha-datagrid-cell-padding: 1rem;
  --ha-datagrid-header-padding: 1rem;
  --ha-datagrid-font-size: 16px;
}
```

### Shadow DOMパーツ

DataGrid は Shadow DOM を使用しており、`::part()` セレクタでスタイルをカスタマイズできます：

```css
/* テーブル全体 */
ha-datagrid::part(table) {
  font-size: 14px;
  border-collapse: separate;
  border-spacing: 0;
}

/* ヘッダー */
ha-datagrid::part(header) {
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

ha-datagrid::part(header-cell) {
  padding: 1rem 0.75rem;
  border-bottom: 2px solid var(--color-border-subtle);
}

/* セル */
ha-datagrid::part(cell) {
  padding: 0.75rem;
  vertical-align: middle;
}

/* 行 */
ha-datagrid::part(row) {
  transition: background-color 0.2s ease;
}

ha-datagrid::part(row):hover {
  background-color: var(--color-surface-100);
}

/* ページネーション */
ha-datagrid::part(pagination) {
  border-top: 2px solid var(--color-border-subtle);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ha-datagrid::part(pagination-button) {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
}

/* ソートインジケーター */
ha-datagrid::part(sort-indicator) {
  margin-left: 0.5rem;
  color: var(--color-primary-500);
}

/* チェックボックス */
ha-datagrid::part(checkbox) {
  cursor: pointer;
}
```

### ダークモード対応

ダークモードでの DataGrid スタイル：

```css
/* ライトモード */
:root {
  --datagrid-bg: var(--color-surface-0);
  --datagrid-header-bg: var(--color-surface-100);
  --datagrid-border-color: var(--color-border-subtle);
  --datagrid-text-color: var(--color-text-primary);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  :root {
    --datagrid-bg: var(--color-surface-900);
    --datagrid-header-bg: var(--color-surface-800);
    --datagrid-border-color: var(--color-border-subtle-dark);
    --datagrid-text-color: var(--color-text-primary-dark);
    --datagrid-stripe-bg: var(--color-surface-850);
  }
}

ha-datagrid {
  background-color: var(--datagrid-bg);
  color: var(--datagrid-text-color);
}
```

### カスタムテーマ

DataGrid のカスタムテーマ例：

```css
/* プライマリテーマ */
ha-datagrid.theme-primary {
  --ha-datagrid-header-bg: var(--color-primary-100);
  --ha-datagrid-header-color: var(--color-primary-900);
  --ha-datagrid-selected-bg: var(--color-primary-100);
  --ha-datagrid-selected-hover-bg: var(--color-primary-200);
  --ha-datagrid-border-color: var(--color-primary-300);
}

/* サクセステーマ */
ha-datagrid.theme-success {
  --ha-datagrid-header-bg: var(--color-success-100);
  --ha-datagrid-selected-bg: var(--color-success-50);
}

/* カスタムストライプ */
ha-datagrid.custom-stripe {
  --ha-datagrid-stripe-bg: #f0f9ff;
}

/* エレベーション（影）付き */
ha-datagrid.elevated {
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

ha-datagrid.elevated::part(header) {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* ボーダーレス */
ha-datagrid.borderless {
  --ha-datagrid-border-color: transparent;
}

/* ミニマルスタイル */
ha-datagrid.minimal {
  --ha-datagrid-header-bg: transparent;
  --ha-datagrid-stripe-bg: transparent;
  --ha-datagrid-border-color: var(--color-border-subtle);
}

ha-datagrid.minimal::part(header) {
  border-bottom: 2px solid var(--color-border-default);
}

ha-datagrid.minimal::part(row) {
  border-bottom: 1px solid var(--color-border-subtle);
}
```

### レスポンシブスタイル

ビューポートサイズに応じて異なるスタイルを適用：

```css
/* モバイル */
ha-datagrid {
  --ha-datagrid-font-size: 13px;
  --ha-datagrid-cell-padding: 0.5rem;
}

/* タブレット */
@media (min-width: 768px) {
  ha-datagrid {
    --ha-datagrid-font-size: 14px;
    --ha-datagrid-cell-padding: 0.75rem;
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  ha-datagrid {
    --ha-datagrid-font-size: 14px;
    --ha-datagrid-cell-padding: 1rem;
  }
}

/* モバイルで横スクロール */
@media (max-width: 767px) {
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  ha-datagrid {
    min-width: 600px;
  }
}
```

### カラムの幅カスタマイズ

```css
/* 特定のカラムの幅を設定 */
ha-datagrid::part(header-cell):nth-child(1),
ha-datagrid::part(cell):nth-child(1) {
  width: 60px;
  text-align: center;
}

ha-datagrid::part(header-cell):nth-child(2),
ha-datagrid::part(cell):nth-child(2) {
  width: 100px;
}

ha-datagrid::part(header-cell):last-child,
ha-datagrid::part(cell):last-child {
  width: 150px;
  text-align: right;
}
```

### アニメーション

```css
/* 行のホバーアニメーション */
ha-datagrid::part(row) {
  transition: all 0.2s ease-in-out;
}

ha-datagrid::part(row):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* ソートインジケーターのアニメーション */
ha-datagrid::part(sort-indicator) {
  transition: transform 0.2s ease;
}

ha-datagrid::part(sort-indicator).ascending {
  transform: rotate(0deg);
}

ha-datagrid::part(sort-indicator).descending {
  transform: rotate(180deg);
}

/* ページネーションボタンのホバー */
ha-datagrid::part(pagination-button) {
  transition: all 0.2s ease;
}

ha-datagrid::part(pagination-button):hover:not(:disabled) {
  background-color: var(--color-primary-100);
  transform: translateY(-1px);
}
```

## アクセシビリティ

DataGrid コンポーネントは WCAG 2.1 AA 基準に準拠し、すべてのユーザーがデータにアクセスできるようにします。

### テーブル構造とARIAサポート

DataGrid は標準的なHTMLテーブル要素とARIA属性を組み合わせて、セマンティックで読みやすい構造を提供します。

```html
<ha-datagrid striped hoverable selectable>
  <!-- 自動的に以下のARIA属性が設定される -->
  <!-- role="table", aria-label="データテーブル" -->
</ha-datagrid>
```

**自動設定されるARIA属性**:

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="table"` | テーブルコンテナ | テーブルであることを示す |
| `role="rowgroup"` | thead, tbody | 行グループを示す |
| `role="row"` | tr | テーブル行を示す |
| `role="columnheader"` | th | カラムヘッダーを示す |
| `role="cell"` | td | データセルを示す |
| `aria-sort` | th | ソート状態（ascending, descending, none）を示す |
| `aria-selected` | tr | 選択された行を示す |
| `aria-label` | チェックボックス | 「行を選択」を示す |

### キーボードナビゲーション

DataGrid は完全なキーボード操作をサポートします。

**テーブル全体のナビゲーション**:

| キー | 動作 |
|-----|------|
| `Tab` | 次のフォーカス可能要素（ソートヘッダー、チェックボックス、ページネーション）へ移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |

**ソートヘッダー**:

| キー | 動作 |
|-----|------|
| `Enter` / `Space` | ソート実行（昇順 → 降順 → ソート解除） |
| `Tab` | 次のソート可能ヘッダーへ移動 |

**行選択（selectableモード）**:

| キー | 動作 |
|-----|------|
| `Space` | チェックボックスのON/OFF切り替え |
| `Tab` | 次の行のチェックボックスへ移動 |

**ページネーション**:

| キー | 動作 |
|-----|------|
| `Tab` | 前へ/次へボタン、ページ番号ボタンへ移動 |
| `Enter` / `Space` | ページ移動を実行 |

```html
<!-- キーボードナビゲーション例 -->
<ha-datagrid striped selectable></ha-datagrid>

<!-- フォーカス順序: -->
<!-- 1. ソート可能な列ヘッダー（左から右） -->
<!-- 2. 各行の選択チェックボックス（上から下） -->
<!-- 3. ページネーションボタン（前へ、1、2、3、次へ） -->
```

### スクリーンリーダー

DataGrid はスクリーンリーダーに最適化された情報を提供します。

**テーブル読み上げ例**:

```javascript
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' }
];

const data = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
];
```

**スクリーンリーダーの読み上げ** (NVDA/JAWS):
1. "データテーブル、3カラム、2行"
2. "カラムヘッダー、ID、ソート可能、現在ソートなし"
3. "カラムヘッダー、Name、ソート可能、現在ソートなし"
4. "カラムヘッダー、Email"
5. "行1、ID、1"
6. "Name、Alice Johnson"
7. "Email、alice@example.com"

**ソート状態の読み上げ**:
- ソート前: "ID、ソート可能、現在ソートなし"
- 昇順ソート後: "ID、ソート済み、昇順"
- 降順ソート後: "ID、ソート済み、降順"

**選択状態の読み上げ**:
- 未選択: "行を選択、チェックボックス、チェックなし"
- 選択済み: "行を選択、チェックボックス、チェック済み"

### ライブリージョン（動的コンテンツ）

DataGrid は動的な変更をスクリーンリーダーに通知します。

```html
<!-- 自動的にaria-live属性が設定される -->
<div aria-live="polite" aria-atomic="true">
  <!-- ソート実行時: "テーブルがNameカラムで昇順にソートされました" -->
  <!-- ページ変更時: "2ページ目を表示中" -->
  <!-- 選択変更時: "3行が選択されています" -->
</div>
```

### カラムヘッダーのアクセシビリティ

```html
<!-- ソート可能なヘッダー -->
<th
  role="columnheader"
  aria-sort="ascending"
  tabindex="0"
  scope="col"
>
  <button type="button" aria-label="Name カラムで昇順ソート">
    Name
    <span aria-hidden="true">↑</span>
  </button>
</th>

<!-- ソート不可のヘッダー -->
<th role="columnheader" scope="col">
  Email
</th>
```

### ページネーションのアクセシビリティ

```html
<nav aria-label="テーブルページネーション" role="navigation">
  <button
    aria-label="前のページへ"
    aria-disabled="true"
    disabled
  >
    前へ
  </button>

  <button
    aria-label="1ページ目"
    aria-current="page"
  >
    1
  </button>

  <button aria-label="2ページ目">
    2
  </button>

  <button aria-label="次のページへ">
    次へ
  </button>

  <span aria-live="polite" aria-atomic="true">
    1ページ目を表示中、全2ページ
  </span>
</nav>
```

### 行選択のアクセシビリティ

```html
<!-- 全選択チェックボックス -->
<th role="columnheader">
  <input
    type="checkbox"
    aria-label="すべての行を選択"
    tabindex="0"
  />
</th>

<!-- 個別行の選択チェックボックス -->
<tr role="row" aria-selected="true">
  <td role="cell">
    <input
      type="checkbox"
      aria-label="Alice Johnsonの行を選択"
      checked
      tabindex="0"
    />
  </td>
  <td role="cell">1</td>
  <td role="cell">Alice Johnson</td>
  <td role="cell">alice@example.com</td>
</tr>
```

### 空のテーブル状態

```html
<!-- データが0件の場合 -->
<div role="status" aria-live="polite">
  <p>表示するデータがありません</p>
</div>
```

### 読み込み中状態

```html
<!-- データ読み込み中 -->
<div role="status" aria-live="polite" aria-busy="true">
  <p>データを読み込んでいます...</p>
</div>
```

### カラムの説明

```html
<!-- カラムに説明が必要な場合 -->
<th role="columnheader" aria-describedby="col-id-desc">
  ID
  <span id="col-id-desc" hidden>ユーザーの一意識別子</span>
</th>
```

### フォーカスインジケーター

DataGrid は明確なフォーカスインジケーターを提供します：

```css
/* 自動的に適用されるフォーカススタイル */
ha-datagrid th:focus,
ha-datagrid button:focus,
ha-datagrid input:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

### ハイコントラストモード

```css
/* ハイコントラストモードでの表示 */
@media (prefers-contrast: high) {
  ha-datagrid {
    --ha-datagrid-border-color: #000000;
    --ha-datagrid-header-bg: #ffffff;
    --ha-datagrid-row-hover-bg: #ffff00;
  }
}
```

### レスポンシブアクセシビリティ

モバイルデバイスでの DataGrid はスクロール可能で、すべての機能がタッチ操作でアクセス可能です。

```html
<!-- 横スクロール可能なテーブル -->
<div
  role="region"
  aria-label="スクロール可能なテーブル"
  tabindex="0"
  style="overflow-x: auto;"
>
  <ha-datagrid striped hoverable></ha-datagrid>
</div>
```

**タッチターゲット**:
- すべてのインタラクティブ要素（ボタン、チェックボックス）は最小 44x44px のタッチターゲットサイズを確保

## パフォーマンス

- **仮想スクロール**: 現在未対応（将来の拡張として検討）
- **ページネーション**: 大量データには必須
- **クライアントサイドソート**: すべてのデータをクライアントでソート

### 推奨事項

- 1,000行未満: ページネーションなしでも問題なし
- 1,000-10,000行: ページネーション推奨（page-size="20"など）
- 10,000行以上: サーバーサイドページネーションとソートを検討

## Table コンポーネントとの使い分け

| 機能 | Table | DataGrid |
|------|-------|----------|
| 基本的なテーブル | ✅ | ✅ |
| ソート | ❌ | ✅ |
| ページネーション | ❌ | ✅ |
| 行選択 | ❌ | ✅ |
| カスタムコンテンツ | ✅ (スロット) | ⚠️ (制限あり) |
| シンプルさ | ✅ | ❌ |
| 大量データ | ❌ | ✅ |

**Table を使用**:
- シンプルな静的テーブル
- カスタムHTML/コンポーネントが必要
- 少量のデータ

**DataGrid を使用**:
- ソート、ページネーション、選択が必要
- 大量のデータ
- 構造化されたデータ

## ベストプラクティス

1. **適切なページサイズ**: ユーザーが一度に処理できる量（10-50行）に設定
2. **ソート可能な列を明示**: 重要な列にのみソート機能を提供
3. **列幅の設定**: ID列などの固定幅列には明示的に幅を指定
4. **イベントハンドリング**: 必要なイベントのみリスニング
5. **選択状態の管理**: 選択状態を親コンポーネントで管理

## トラブルシューティング

### データが表示されない

```javascript
// 正しい方法
const grid = document.querySelector('ha-datagrid');
grid.setColumns(columns);  // 先にカラムを設定
grid.setData(data);        // 次にデータを設定
```

### ソートが動作しない

```javascript
// カラム定義で sortable: true を設定
const columns = [
  { key: 'name', label: 'Name', sortable: true },  // ✅
  { key: 'email', label: 'Email' },                // ❌ ソート不可
];
```

### ページネーションが表示されない

```javascript
// データがpage-size以下の場合、自動的に非表示になります
const data = [1, 2, 3, 4, 5];  // 5行のデータ
grid.setAttribute('page-size', '10');  // ページサイズ10 → ページネーション非表示
```

### 選択がクリアされない

```javascript
// clearSelection()メソッドを呼び出す
gridRef.current.clearSelection();
```

## FAQ（よくある質問）

### Q1: 大量のデータを扱う際のパフォーマンスを最適化するには？

**A**: ページネーションとサーバーサイドのデータ取得を組み合わせることで、大量のデータでも高速に表示できます。

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function OptimizedDataGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/data?page=${page}&size=${pageSize}`);
      const result = await response.json();
      setData(result.items);
      setTotalItems(result.total);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataGrid
      columns={columns}
      data={data}
      pageSize={pageSize}
      currentPage={currentPage}
      totalItems={totalItems}
      onPageChange={(page) => setCurrentPage(page)}
      loading={loading}
    />
  );
}
```

**Vue での例**:
```vue
<template>
  <HaDataGrid
    :columns="columns"
    :data="data"
    :page-size="pageSize"
    :current-page="currentPage"
    :total-items="totalItems"
    :loading="loading"
    @page-change="handlePageChange"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import { DataGrid as HaDataGrid } from '@hidearea-design/vue';

const data = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalItems = ref(0);
const pageSize = 50;

const fetchData = async (page) => {
  loading.value = true;
  try {
    const response = await fetch(`/api/data?page=${page}&size=${pageSize}`);
    const result = await response.json();
    data.value = result.items;
    totalItems.value = result.total;
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

watch(currentPage, (newPage) => {
  fetchData(newPage);
}, { immediate: true });
</script>
```

### Q2: カスタムセルレンダリングを実装するには？

**A**: カラム定義でカスタムレンダラーを使用できます。

```tsx
import { DataGrid } from '@hidearea-design/react';
import { Badge, Button } from '@hidearea-design/react';

function CustomRendererGrid() {
  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value, row) => {
        const variant = value === 'active' ? 'success' : 'error';
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    console.log('Edit:', row);
  };

  const handleDelete = (row) => {
    if (confirm('Are you sure?')) {
      console.log('Delete:', row);
    }
  };

  return <DataGrid columns={columns} data={data} />;
}
```

### Q3: 選択された行のデータを取得するには？

**A**: `selection-change`イベントを使用して選択された行のデータを取得できます。

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useState } from 'react';

function SelectableGrid() {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (event) => {
    const selectedIds = event.detail.selectedRows;
    const selected = data.filter(row => selectedIds.includes(row.id));
    setSelectedRows(selected);
    console.log('Selected rows:', selected);
  };

  const handleBulkAction = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one row');
      return;
    }
    console.log('Performing bulk action on:', selectedRows);
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Button onClick={handleBulkAction} disabled={selectedRows.length === 0}>
          Bulk Action ({selectedRows.length} selected)
        </Button>
      </div>
      <DataGrid
        columns={columns}
        data={data}
        selectable
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
}
```

**Vue での例**:
```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <HaButton @click="handleBulkAction" :disabled="selectedRows.length === 0">
        Bulk Action ({{ selectedRows.length }} selected)
      </HaButton>
    </div>
    <HaDataGrid
      :columns="columns"
      :data="data"
      selectable
      @selection-change="handleSelectionChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DataGrid as HaDataGrid, Button as HaButton } from '@hidearea-design/vue';

const selectedRows = ref([]);

const handleSelectionChange = (event) => {
  const selectedIds = event.detail.selectedRows;
  selectedRows.value = data.filter(row => selectedIds.includes(row.id));
  console.log('Selected rows:', selectedRows.value);
};

const handleBulkAction = () => {
  if (selectedRows.value.length === 0) {
    alert('Please select at least one row');
    return;
  }
  console.log('Performing bulk action on:', selectedRows.value);
};
</script>
```

### Q4: ソートとページネーションを同時に使用するには？

**A**: サーバーサイドでソートとページネーションを処理するのが最適です。

```tsx
import { DataGrid } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function SortablePagedGrid() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const pageSize = 20;

  useEffect(() => {
    fetchData(currentPage, sortBy, sortOrder);
  }, [currentPage, sortBy, sortOrder]);

  const fetchData = async (page: number, sort: string, order: 'asc' | 'desc') => {
    const response = await fetch(
      `/api/data?page=${page}&size=${pageSize}&sort=${sort}&order=${order}`
    );
    const result = await response.json();
    setData(result.items);
  };

  const handleSort = (event) => {
    const { column, order } = event.detail;
    setSortBy(column);
    setSortOrder(order);
    setCurrentPage(1); // ソート変更時は最初のページに戻る
  };

  return (
    <DataGrid
      columns={columns}
      data={data}
      pageSize={pageSize}
      currentPage={currentPage}
      sortable
      onPageChange={(page) => setCurrentPage(page)}
      onSort={handleSort}
    />
  );
}
```

### Q5: DataGridの高さを固定してスクロール可能にするには？

**A**: CSSで高さを設定し、オーバーフローをスクロールに設定します。

```html
<style>
  .fixed-height-grid {
    height: 600px;
    overflow: auto;
  }

  /* ヘッダーを固定する場合 */
  .fixed-height-grid ha-datagrid {
    display: flex;
    flex-direction: column;
  }

  .fixed-height-grid ha-datagrid::part(header) {
    position: sticky;
    top: 0;
    z-index: 10;
    background: white;
  }
</style>

<div class="fixed-height-grid">
  <ha-datagrid id="grid"></ha-datagrid>
</div>
```

**React での例**:
```tsx
import { DataGrid } from '@hidearea-design/react';

function FixedHeightGrid() {
  return (
    <div style={{ height: '600px', overflow: 'auto' }}>
      <DataGrid
        columns={columns}
        data={data}
        style={{
          '--datagrid-header-position': 'sticky',
          '--datagrid-header-top': '0',
          '--datagrid-header-z-index': '10',
          '--datagrid-header-bg': 'white',
        }}
      />
    </div>
  );
}
```

### Q6: エクスポート機能を実装するには？

**A**: データをCSVやExcel形式でエクスポートする機能を実装できます。

```tsx
import { DataGrid } from '@hidearea-design/react';
import { Button } from '@hidearea-design/react';

function ExportableGrid() {
  const exportToCSV = () => {
    const headers = columns.map(col => col.label).join(',');
    const rows = data.map(row =>
      columns.map(col => {
        const value = row[col.key];
        // 値にカンマや改行が含まれる場合はクォートで囲む
        return typeof value === 'string' && (value.includes(',') || value.includes('\n'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(',')
    ).join('\n');

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  const exportToJSON = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.json';
    link.click();
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <Button onClick={exportToCSV}>Export to CSV</Button>
        <Button onClick={exportToJSON}>Export to JSON</Button>
      </div>
      <DataGrid columns={columns} data={data} />
    </div>
  );
}
```

## 関連コンポーネント

- [Grid](/components/grid) - グリッドレイアウトコンポーネント
- [Button](/components/button) - アクションボタン
- [Badge](/components/badge) - ステータス表示

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { DataGridProps, DataGridColumn, DataGridSortDirection } from '@hidearea-design/core';

/**
 * DataGridコンポーネントのプロパティ
 */
interface DataGridProps {
  /**
   * 縞模様の行を表示
   * @default false
   */
  striped?: boolean;

  /**
   * テーブルに罫線を表示
   * @default false
   */
  bordered?: boolean;

  /**
   * 行のホバーエフェクトを有効化
   * @default false
   */
  hoverable?: boolean;

  /**
   * 行選択機能を有効化
   * @default false
   */
  selectable?: boolean;

  /**
   * 1ページあたりの行数
   * @default 10
   */
  pageSize?: number;

  /**
   * 現在のページ番号（1始まり）
   * @default 1
   */
  currentPage?: number;

  /**
   * 総アイテム数（ページネーション計算用）
   */
  totalItems?: number;

  /**
   * ローディング状態
   * @default false
   */
  loading?: boolean;

  /**
   * ソート変更時のイベントハンドラ
   */
  onSortChange?: (event: CustomEvent<{ sortKey: string; sortDirection: DataGridSortDirection }>) => void;

  /**
   * 選択変更時のイベントハンドラ
   */
  onSelectionChange?: (event: CustomEvent<{ selectedRows: number[] }>) => void;

  /**
   * ページ変更時のイベントハンドラ
   */
  onPageChange?: (event: CustomEvent<{ currentPage: number; pageSize: number }>) => void;
}

/**
 * カラム定義
 */
interface DataGridColumn<T = any> {
  /**
   * データオブジェクト内のキー（必須）
   */
  key: string;

  /**
   * 列ヘッダーに表示するラベル（必須）
   */
  label: string;

  /**
   * ソート機能を有効化
   * @default false
   */
  sortable?: boolean;

  /**
   * 列の幅（CSS値）
   * @example '100px', '20%', 'auto'
   */
  width?: string;

  /**
   * カスタムセルレンダラー（React/Vueのみ）
   * @param value - セルの値
   * @param row - 行データ全体
   * @param rowIndex - 行インデックス
   */
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode | VNode;
}

/**
 * ソート方向
 */
type DataGridSortDirection = 'asc' | 'desc' | null;

/**
 * DataGridメソッド
 */
interface DataGridMethods {
  /**
   * カラム定義を設定
   * @param columns - カラム定義の配列
   */
  setColumns(columns: DataGridColumn[]): void;

  /**
   * データを設定
   * @param data - 表示するデータの配列
   */
  setData(data: any[]): void;

  /**
   * 選択された行のインデックス配列を取得
   * @returns 選択された行のインデックス配列（0始まり）
   */
  getSelectedRows(): number[];

  /**
   * すべての選択をクリア
   */
  clearSelection(): void;

  /**
   * 特定の行を選択
   * @param rowIndex - 行インデックス（0始まり）
   */
  selectRow(rowIndex: number): void;

  /**
   * 特定の行の選択を解除
   * @param rowIndex - 行インデックス（0始まり）
   */
  deselectRow(rowIndex: number): void;

  /**
   * 現在のソート状態を取得
   * @returns ソートキーと方向を含むオブジェクト
   */
  getSortState(): { sortKey: string | null; sortDirection: DataGridSortDirection };
}

/**
 * カスタムイベント型定義
 */
interface DataGridEvents {
  'sort-change': CustomEvent<{
    sortKey: string;
    sortDirection: DataGridSortDirection;
  }>;

  'selection-change': CustomEvent<{
    selectedRows: number[];
  }>;

  'page-change': CustomEvent<{
    currentPage: number;
    pageSize: number;
  }>;
}
```

### 使用例

**TypeScript with React:**

```typescript
import { DataGrid, type DataGridColumn } from '@hidearea-design/react';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
}

function UserGrid() {
  const columns: DataGridColumn<User>[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'default'}>
          {value}
        </Badge>
      ),
    },
  ];

  const [data, setData] = useState<User[]>([]);

  return (
    <DataGrid
      columns={columns}
      data={data}
      striped
      hoverable
      selectable
      pageSize={20}
      onSortChange={(e) => console.log(e.detail)}
      onSelectionChange={(e) => console.log(e.detail.selectedRows)}
    />
  );
}
```

**Web Components (Vanilla JavaScript):**

```typescript
const grid = document.querySelector('ha-datagrid') as HTMLElement & DataGridMethods;

// カラム設定
grid.setColumns([
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
]);

// データ設定
grid.setData([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

// イベントリスナー登録
grid.addEventListener('sort-change', (e: DataGridEvents['sort-change']) => {
  const { sortKey, sortDirection } = e.detail;
  console.log(`Sorted by ${sortKey} in ${sortDirection} order`);
});

// 選択された行を取得
const selectedRows = grid.getSelectedRows();
console.log('Selected row indices:', selectedRows);
```

## 将来の拡張機能

- カラムのリサイズ
- カラムの並び替え（ドラッグ&ドロップ）
- 高度なフィルタリング機能（複数条件、カスタムフィルター）
- 編集可能なセル（インラインエディット）
- 仮想スクロール（大量データの効率的な表示）
- エクスポート機能（CSV, Excel, PDF）
- カスタムセルレンダラー（より柔軟なカスタマイズ）
- グループ化機能（行のグループ化と集計）
- ツリーグリッド（階層データの表示）
