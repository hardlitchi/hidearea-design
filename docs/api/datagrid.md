# DataGrid（データグリッド）

> ソート、フィルタリング、ページネーション機能を備えた高度なデータグリッドコンポーネント

**タグ**: `<ha-datagrid>`

**カテゴリー**: Data Display

## 目次

- [プロパティ](#プロパティ)
- [イベント](#イベント)
- [スロット](#スロット)
- [使用例](#使用例)
- [アクセシビリティ](#アクセシビリティ)
- [デザイントークン](#デザイントークン)

---

## プロパティ

| 名前 | 型 | デフォルト | 必須 | 説明 |
|------|------|---------|----------|-------------|
| `data` | `Array<Record<string, any>>` | `undefined` | ✅ | グリッドデータ |
| `columns` | `Array<Column>` | `undefined` | ✅ | カラム定義 |
| `sortable` | `boolean` | `true` |  | カラムのソートを有効化 |
| `filterable` | `boolean` | `false` |  | カラムのフィルタリングを有効化 |
| `paginate` | `boolean` | `false` |  | ページネーションを有効化 |
| `pageSize` | `number` | `10` |  | 1ページあたりのアイテム数 |
| `selectable` | `boolean` | `false` |  | 行の選択を有効化 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-sort` | `{ column: string, direction: "asc" | "desc" }` | ソート時に発火 |
| `ha-filter` | `{ filters: Record<string, any> }` | フィルタリング時に発火 |
| `ha-page-change` | `{ page: number }` | ページ変更時に発火 |
| `ha-selection-change` | `{ selectedRows: Array<any> }` | 選択変更時に発火 |

### 使い方

```javascript
const element = document.querySelector('ha-datagrid');
element.addEventListener('ha-sort', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | カスタムセルコンテンツ |

## 使用例

### 基本的な使い方

ソートとページネーション付きDataGrid

```html
<ha-datagrid
  :data="products"
  :columns="columns"
  sortable
  paginate
  :page-size="20"
></ha-datagrid>
```

## アクセシビリティ

### ARIA ロール

- `grid`
- `rowgroup`
- `row`
- `columnheader`
- `gridcell`

### キーボードサポート

| キー | アクション |
|-----|--------|
| `矢印キー` | セルを移動 |
| `Enter` | セルを編集 |
| `Tab` | フォーカスを移動 |

### ARIA 属性

- `aria-sort`
- `aria-rowcount`
- `aria-colcount`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### 色

- `--component-datagrid-header-background`
- `--component-datagrid-border`
- `--component-datagrid-row-hover`

### 間隔

- `--spacing-sm`
- `--spacing-md`

### タイポグラフィ

- `--text-body-default-fontSize`
- `--font-weight-medium`

### その他

- `--border-radius-md`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
