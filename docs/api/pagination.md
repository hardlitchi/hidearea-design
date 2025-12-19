# Pagination

> Pagination component for navigating through pages of content

**Tag**: `<ha-pagination>`

**Category**: Navigation

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
| `currentPage` | `number` | `1` |  | Current active page |
| `totalPages` | `number` | `undefined` | ✅ | Total number of pages |
| `siblingCount` | `number` | `1` |  | Number of siblings shown on each side |
| `showFirstLast` | `boolean` | `true` |  | Show first/last page buttons |
| `disabled` | `boolean` | `false` |  | Disable pagination |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ page: number }` | Emitted when page changes |

### Usage

```javascript
const element = document.querySelector('ha-pagination');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple pagination

```html
<ha-pagination :current-page="1" :total-pages="10"></ha-pagination>
```

---

### Without First/Last

Pagination without first/last buttons

```html
<ha-pagination :current-page="5" :total-pages="20" :show-first-last="false"></ha-pagination>
```

## Accessibility

### ARIA Roles

- `navigation`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate pages |
| `Enter` | Select page |

### ARIA Attributes

- `aria-label`
- `aria-current`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-pagination-background`
- `--component-pagination-active`
- `--component-pagination-text`

### Spacing

- `--spacing-sm`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
