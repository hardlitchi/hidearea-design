# Table

> Data table component for displaying structured data

**Tag**: `<ha-table>`

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
| `data` | `Array<Record<string, any>>` | `undefined` | ✅ | Table data |
| `columns` | `Array<Column>` | `undefined` | ✅ | Column definitions |
| `sortable` | `boolean` | `false` |  | Enable column sorting |
| `selectable` | `boolean` | `false` |  | Enable row selection |
| `striped` | `boolean` | `false` |  | Striped rows |
| `hoverable` | `boolean` | `false` |  | Hover effect on rows |
| `bordered` | `boolean` | `false` |  | Show borders |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-sort` | `{ column: string, direction: "asc" | "desc" }` | Emitted when column is sorted |
| `ha-select` | `{ selectedRows: Array<any> }` | Emitted when rows are selected |
| `ha-row-click` | `{ row: any, index: number }` | Emitted when row is clicked |

### Usage

```javascript
const element = document.querySelector('ha-table');
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

Simple data table

```html
<ha-table
  :data="users"
  :columns="[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ]"
></ha-table>
```

---

### Sortable Table

Table with sortable columns

```html
<ha-table
  :data="products"
  :columns="columns"
  sortable
  hoverable
></ha-table>
```

## Accessibility

### ARIA Roles

- `table`
- `rowgroup`
- `row`
- `columnheader`
- `cell`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate cells |
| `Tab` | Move to next focusable element |

### ARIA Attributes

- `aria-sort`
- `aria-selected`
- `aria-label`

## Design Tokens

This component uses the following design tokens:

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

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
