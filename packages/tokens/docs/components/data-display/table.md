# Table (テーブル) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/components/data-display/table.yaml`
**ステータス:** ✅ 実装済み (Phase 3)

---

## 概要

Tableコンポーネントは、構造化されたデータを行と列で整理して表示するコンポーネントです。ヘッダー、複数の行状態（default, hover, selected, striped）をサポートし、大量のデータを見やすく表示します。

### 用途

- データの一覧表示
- 比較表
- レポート表示
- ユーザーリスト
- 商品カタログ
- 統計データ表示

---

## 要素と状態

### Header (ヘッダー)

テーブルの列見出しを表示する領域です。

**使用場面:**
- 列のラベル表示
- ソート機能のトリガー
- データの分類表示

**トークンプレフィックス:** `component.table.header.*`

### Row - Default (行 - デフォルト)

通常のデータ行です。

**使用場面:**
- 標準的なデータ表示
- 初期状態の行

**トークンプレフィックス:** `component.table.row.background.default`

### Row - Hover (行 - ホバー)

マウスオーバー時の行です。

**使用場面:**
- ユーザーがカーソルを合わせた行
- インタラクティブなテーブル
- 行の識別

**トークンプレフィックス:** `component.table.row.background.hover`

### Row - Selected (行 - 選択)

選択された行です。

**使用場面:**
- ユーザーが選択した行
- アクティブな行
- フォーカス状態

**トークンプレフィックス:** `component.table.row.background.selected`

### Row - Striped (行 - ストライプ)

交互に色を変えた行（ゼブラストライプ）です。

**使用場面:**
- 行の識別を容易にする
- 大量データの可読性向上
- 視覚的な区別

**トークンプレフィックス:** `component.table.row.background.striped`

---

## トークン一覧

### Header (ヘッダー)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.table.header.background` | `{background.secondary}` | ヘッダー背景色 |
| `component.table.header.text` | `{foreground.secondary}` | ヘッダーテキスト色 |

### Row (行)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.table.row.background.default` | `{background.primary}` | デフォルト行背景色 |
| `component.table.row.background.hover` | `{background.secondary}` | ホバー時行背景色 |
| `component.table.row.background.selected` | `{primary.subtle}` | 選択時行背景色 |
| `component.table.row.background.striped` | `{background.tertiary}` | ストライプ行背景色 |

### Border (ボーダー)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.table.border.default` | `{border.default}` | テーブルボーダー色 |

---

## 使用例

### HTML/CSS

```html
<!-- ベーシックテーブル -->
<table
  class="table"
  style="
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--component-table-border-default);
  "
>
  <thead style="background: var(--component-table-header-background);">
    <tr>
      <th style="padding: 12px; text-align: left; color: var(--component-table-header-text); font-weight: 600;">名前</th>
      <th style="padding: 12px; text-align: left; color: var(--component-table-header-text); font-weight: 600;">メール</th>
      <th style="padding: 12px; text-align: left; color: var(--component-table-header-text); font-weight: 600;">役割</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: var(--component-table-row-background-default); border-top: 1px solid var(--component-table-border-default);">
      <td style="padding: 12px;">山田太郎</td>
      <td style="padding: 12px;">yamada@example.com</td>
      <td style="padding: 12px;">管理者</td>
    </tr>
    <tr style="background: var(--component-table-row-background-default); border-top: 1px solid var(--component-table-border-default);">
      <td style="padding: 12px;">佐藤花子</td>
      <td style="padding: 12px;">sato@example.com</td>
      <td style="padding: 12px;">編集者</td>
    </tr>
  </tbody>
</table>

<!-- ストライプテーブル -->
<table class="table table--striped" style="width: 100%; border-collapse: collapse;">
  <thead style="background: var(--component-table-header-background);">
    <tr>
      <th style="padding: 12px; text-align: left; color: var(--component-table-header-text);">商品名</th>
      <th style="padding: 12px; text-align: right; color: var(--component-table-header-text);">価格</th>
      <th style="padding: 12px; text-align: right; color: var(--component-table-header-text);">在庫</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background: var(--component-table-row-background-default);">
      <td style="padding: 12px;">商品A</td>
      <td style="padding: 12px; text-align: right;">¥1,200</td>
      <td style="padding: 12px; text-align: right;">50</td>
    </tr>
    <tr style="background: var(--component-table-row-background-striped);">
      <td style="padding: 12px;">商品B</td>
      <td style="padding: 12px; text-align: right;">¥2,400</td>
      <td style="padding: 12px; text-align: right;">32</td>
    </tr>
    <tr style="background: var(--component-table-row-background-default);">
      <td style="padding: 12px;">商品C</td>
      <td style="padding: 12px; text-align: right;">¥800</td>
      <td style="padding: 12px; text-align: right;">100</td>
    </tr>
  </tbody>
</table>

<!-- 選択可能なテーブル -->
<table class="table table--selectable" style="width: 100%; border-collapse: collapse;">
  <thead style="background: var(--component-table-header-background);">
    <tr>
      <th style="padding: 12px; width: 40px;">
        <input type="checkbox" aria-label="すべて選択">
      </th>
      <th style="padding: 12px; text-align: left;">タスク</th>
      <th style="padding: 12px; text-align: left;">ステータス</th>
    </tr>
  </thead>
  <tbody>
    <tr
      class="table__row"
      style="background: var(--component-table-row-background-selected); border-top: 1px solid var(--component-table-border-default);"
    >
      <td style="padding: 12px;">
        <input type="checkbox" checked aria-label="タスクを選択">
      </td>
      <td style="padding: 12px;">レポート作成</td>
      <td style="padding: 12px;">完了</td>
    </tr>
    <tr
      class="table__row"
      style="background: var(--component-table-row-background-default); border-top: 1px solid var(--component-table-border-default);"
    >
      <td style="padding: 12px;">
        <input type="checkbox" aria-label="タスクを選択">
      </td>
      <td style="padding: 12px;">会議準備</td>
      <td style="padding: 12px;">進行中</td>
    </tr>
  </tbody>
</table>
```

### CSS Classes

```css
/* ベーススタイル */
.table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--component-table-border-default);
  font-size: 14px;
}

/* ヘッダー */
.table thead {
  background: var(--component-table-header-background);
}

.table th {
  padding: 12px;
  text-align: left;
  color: var(--component-table-header-text);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid var(--component-table-border-default);
}

/* 行 */
.table tbody tr {
  background: var(--component-table-row-background-default);
  border-top: 1px solid var(--component-table-border-default);
  transition: background-color 0.15s ease;
}

.table tbody tr:hover {
  background: var(--component-table-row-background-hover);
}

.table tbody tr.selected {
  background: var(--component-table-row-background-selected);
}

/* セル */
.table td {
  padding: 12px;
  vertical-align: middle;
}

/* ストライプテーブル */
.table--striped tbody tr:nth-child(even) {
  background: var(--component-table-row-background-striped);
}

.table--striped tbody tr:nth-child(even):hover {
  background: var(--component-table-row-background-hover);
}

/* ボーダーレステーブル */
.table--borderless {
  border: none;
}

.table--borderless th,
.table--borderless td {
  border: none;
}

/* コンパクトテーブル */
.table--compact th,
.table--compact td {
  padding: 8px;
}

/* レスポンシブテーブル */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* ソート可能なヘッダー */
.table th.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 28px;
}

.table th.sortable:hover {
  background: var(--component-table-row-background-hover);
}

.table th.sortable::after {
  content: '↕';
  position: absolute;
  right: 8px;
  opacity: 0.5;
}

.table th.sortable.asc::after {
  content: '↑';
  opacity: 1;
}

.table th.sortable.desc::after {
  content: '↓';
  opacity: 1;
}

/* テキスト配置 */
.table .text-left { text-align: left; }
.table .text-center { text-align: center; }
.table .text-right { text-align: right; }
```

### React

```tsx
import React, { useState } from 'react';

interface Column<T> {
  key: keyof T;
  header: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  striped?: boolean;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  compact?: boolean;
}

export function Table<T extends { id: string | number }>({
  data,
  columns,
  striped = false,
  selectable = false,
  onSelectionChange,
  compact = false,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map(row => row.id));
      setSelectedRows(allIds);
      onSelectionChange?.(data);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string | number, checked: boolean) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedRows(newSelection);
    const selected = data.filter(row => newSelection.has(row.id));
    onSelectionChange?.(selected);
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const modifier = sortDirection === 'asc' ? 1 : -1;
      if (aVal < bVal) return -1 * modifier;
      if (aVal > bVal) return 1 * modifier;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  return (
    <div className="table-responsive">
      <table
        className={`table ${striped ? 'table--striped' : ''} ${compact ? 'table--compact' : ''}`}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid var(--component-table-border-default)',
        }}
      >
        <thead style={{ background: 'var(--component-table-header-background)' }}>
          <tr>
            {selectable && (
              <th style={{ width: '40px', padding: compact ? '8px' : '12px' }}>
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="すべて選択"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={column.sortable ? 'sortable' : ''}
                onClick={() => column.sortable && handleSort(column.key)}
                style={{
                  padding: compact ? '8px' : '12px',
                  textAlign: column.align || 'left',
                  color: 'var(--component-table-header-text)',
                  fontWeight: 600,
                  cursor: column.sortable ? 'pointer' : 'default',
                }}
              >
                {column.header}
                {column.sortable && sortColumn === column.key && (
                  <span style={{ marginLeft: '4px' }}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => {
            const isSelected = selectedRows.has(row.id);
            const bgColor = isSelected
              ? 'var(--component-table-row-background-selected)'
              : striped && index % 2 === 1
              ? 'var(--component-table-row-background-striped)'
              : 'var(--component-table-row-background-default)';

            return (
              <tr
                key={row.id}
                className={isSelected ? 'selected' : ''}
                style={{
                  background: bgColor,
                  borderTop: '1px solid var(--component-table-border-default)',
                }}
              >
                {selectable && (
                  <td style={{ padding: compact ? '8px' : '12px' }}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectRow(row.id, e.target.checked)}
                      aria-label="行を選択"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    style={{
                      padding: compact ? '8px' : '12px',
                      textAlign: column.align || 'left',
                    }}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// 使用例
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export default function Example() {
  const users: User[] = [
    { id: 1, name: '山田太郎', email: 'yamada@example.com', role: '管理者', status: 'active' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com', role: '編集者', status: 'active' },
    { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', role: 'ユーザー', status: 'inactive' },
  ];

  const columns: Column<User>[] = [
    { key: 'name', header: '名前', sortable: true },
    { key: 'email', header: 'メールアドレス', sortable: true },
    { key: 'role', header: '役割' },
    {
      key: 'status',
      header: 'ステータス',
      render: (value) => (
        <span className={`badge badge--${value === 'active' ? 'success' : 'neutral'}`}>
          {value === 'active' ? 'アクティブ' : '非アクティブ'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <Table
        data={users}
        columns={columns}
        striped
        selectable
        onSelectionChange={(selected) => console.log('Selected:', selected)}
      />
    </div>
  );
}
```

---

## アクセシビリティ

### セマンティックHTML

適切なテーブル要素を使用します。

```html
<table>
  <caption>ユーザー一覧</caption>
  <thead>
    <tr>
      <th scope="col">名前</th>
      <th scope="col">メール</th>
      <th scope="col">役割</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">山田太郎</th>
      <td>yamada@example.com</td>
      <td>管理者</td>
    </tr>
  </tbody>
</table>
```

### ARIA属性

```html
<!-- ソート可能なテーブル -->
<table role="grid" aria-label="ユーザー一覧">
  <thead>
    <tr role="row">
      <th
        role="columnheader"
        aria-sort="ascending"
        tabindex="0"
      >
        名前
      </th>
    </tr>
  </thead>
</table>

<!-- 選択可能なテーブル -->
<table aria-label="選択可能なタスク一覧">
  <tbody>
    <tr aria-selected="true">
      <td>
        <input type="checkbox" checked aria-label="タスクを選択">
      </td>
      <td>レポート作成</td>
    </tr>
  </tbody>
</table>
```

### キーボード操作

- `Tab`: セル間を移動
- `Arrow keys`: セル間をナビゲート（グリッドの場合）
- `Space`: チェックボックスの切り替え
- `Enter`: ソートの実行

---

## ベストプラクティス

### 1. 適切な見出しの使用

```html
<!-- Good: スコープ属性 -->
<table>
  <thead>
    <tr>
      <th scope="col">名前</th>
      <th scope="col">値</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">項目1</th>
      <td>100</td>
    </tr>
  </tbody>
</table>

<!-- Bad: スコープなし -->
<table>
  <tr>
    <td><strong>名前</strong></td>
    <td><strong>値</strong></td>
  </tr>
</table>
```

### 2. データの適切な配置

```html
<!-- Good: 数値は右揃え -->
<table>
  <tr>
    <td>商品A</td>
    <td style="text-align: right;">¥1,200</td>
    <td style="text-align: right;">50</td>
  </tr>
</table>

<!-- Bad: すべて左揃え -->
<table>
  <tr>
    <td>商品A</td>
    <td>¥1,200</td>
    <td>50</td>
  </tr>
</table>
```

### 3. レスポンシブ対応

```html
<!-- Good: スクロール可能 -->
<div class="table-responsive">
  <table class="table">
    <!-- 多数の列 -->
  </table>
</div>

<!-- モバイルでカード表示 -->
<div class="table-cards">
  <!-- モバイル時はカードレイアウト -->
</div>
```

### 4. 空の状態の処理

```html
<!-- Good: 空の状態を明示 -->
<table class="table">
  <thead>...</thead>
  <tbody>
    <tr>
      <td colspan="3" style="text-align: center; padding: 24px; color: var(--foreground-tertiary);">
        データがありません
      </td>
    </tr>
  </tbody>
</table>
```

---

## 関連コンポーネント

- **[Card](./card.md)** - カード形式のデータ表示
- **[List](./list.md)** - リスト形式の表示
- **[Pagination](./pagination.md)** - ページネーション
- **[Checkbox](./checkbox.md)** - 行選択

---

## デザインガイドライン

### サイズとスペーシング

- **セルパディング:** 12px（標準）、8px（コンパクト）
- **ヘッダーフォントサイズ:** 13px
- **ボディフォントサイズ:** 14px
- **行の高さ:** 最小 44px（タッチターゲット）
- **ボーダー幅:** 1px

### レスポンシブデザイン

```css
/* モバイル（768px未満） */
@media (max-width: 767px) {
  /* カード形式に変換 */
  .table-responsive table,
  .table-responsive thead,
  .table-responsive tbody,
  .table-responsive tr,
  .table-responsive td {
    display: block;
  }

  .table-responsive thead {
    display: none;
  }

  .table-responsive tr {
    margin-bottom: 16px;
    border: 1px solid var(--component-table-border-default);
    border-radius: 8px;
  }

  .table-responsive td {
    text-align: right;
    padding-left: 50%;
    position: relative;
  }

  .table-responsive td::before {
    content: attr(data-label);
    position: absolute;
    left: 12px;
    font-weight: 600;
    text-align: left;
  }
}
```

### パフォーマンス

- 大量データ（100行以上）は仮想スクロールを検討
- ページネーションで分割表示
- 遅延ロードの実装

---

**最終更新:** 2025-12-12
**バージョン:** 1.0.0
