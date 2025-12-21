# Table（テーブル）

> 構造化されたデータを表示するためのデータテーブルコンポーネント

**Tag**: `<ha-table>`

**Category**: Data Display

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
| `data` | `Array<Record<string, any>>` | `undefined` | ✅ | テーブルデータ |
| `columns` | `Array<Column>` | `undefined` | ✅ | カラム定義 |
| `sortable` | `boolean` | `false` |  | カラムのソートを有効化 |
| `selectable` | `boolean` | `false` |  | 行の選択を有効化 |
| `striped` | `boolean` | `false` |  | ストライプ行 |
| `hoverable` | `boolean` | `false` |  | 行のホバーエフェクト |
| `bordered` | `boolean` | `false` |  | ボーダーを表示 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-sort` | `{ column: string, direction: "asc" | "desc" }` | カラムがソートされたときに発火 |
| `ha-select` | `{ selectedRows: Array<any> }` | 行が選択されたときに発火 |
| `ha-row-click` | `{ row: any, index: number }` | 行がクリックされたときに発火 |

### Usage

```javascript
const element = document.querySelector('ha-table');
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

シンプルなデータテーブル

```html
<ha-table
  :data="users"
  :columns="[
    { key: 'name', label: '名前' },
    { key: 'email', label: 'メール' },
    { key: 'role', label: '役割' }
  ]"
></ha-table>
```

---

### ソート可能なテーブル

ソート可能なカラムを持つテーブル

```html
<ha-table
  :data="products"
  :columns="columns"
  sortable
  hoverable
></ha-table>
```

## アクセシビリティ

### ARIA Roles

- `table`
- `rowgroup`
- `row`
- `columnheader`
- `cell`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | セルを移動 |
| `Tab` | 次のフォーカス可能な要素に移動 |

### ARIA Attributes

- `aria-sort`
- `aria-selected`
- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### Colors

- `--component-table-header-background`
- `--component-table-border`
- `--component-table-row-hover`

### Spacing

- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-default-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-md`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
