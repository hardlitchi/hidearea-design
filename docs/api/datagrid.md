# DataGrid

> Advanced data grid component with sorting, filtering, and pagination

**Tag**: `<ha-datagrid>`

**Category**: Data Display

## Table of Contents

- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Examples](#examples)
- [Accessibility](#accessibility)
- [Design Tokens](#design-tokens)

---

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `data` | `Array<Record<string, any>>` | `undefined` | ✅ | Grid data |
| `columns` | `Array<Column>` | `undefined` | ✅ | Column definitions |
| `sortable` | `boolean` | `true` |  | Enable column sorting |
| `filterable` | `boolean` | `false` |  | Enable column filtering |
| `paginate` | `boolean` | `false` |  | Enable pagination |
| `pageSize` | `number` | `10` |  | Items per page |
| `selectable` | `boolean` | `false` |  | Enable row selection |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-sort` | `{ column: string, direction: "asc" | "desc" }` | Emitted when sorted |
| `ha-filter` | `{ filters: Record<string, any> }` | Emitted when filtered |
| `ha-page-change` | `{ page: number }` | Emitted when page changes |
| `ha-selection-change` | `{ selectedRows: Array<any> }` | Emitted when selection changes |

### Usage

```javascript
const element = document.querySelector('ha-datagrid');
element.addEventListener('ha-sort', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Custom cell content |

## Examples

### Basic Usage

DataGrid with sorting and pagination

```html
<ha-datagrid
  :data="products"
  :columns="columns"
  sortable
  paginate
  :page-size="20"
></ha-datagrid>
```

## Accessibility

### ARIA Roles

- `grid`
- `rowgroup`
- `row`
- `columnheader`
- `gridcell`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate cells |
| `Enter` | Edit cell |
| `Tab` | Move focus |

### ARIA Attributes

- `aria-sort`
- `aria-rowcount`
- `aria-colcount`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-datagrid-header-background`
- `--component-datagrid-border`
- `--component-datagrid-row-hover`

### Spacing

- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-default-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-md`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
