# List

> List component for displaying a collection of items

**Tag**: `<ha-list>`

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
| `variant` | `'default' | 'bordered' | 'divided'` | `'default'` |  | List style variant |
| `hoverable` | `boolean` | `false` |  | Add hover effect |
| `clickable` | `boolean` | `false` |  | Make items clickable |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-item-click` | `{ item: any, index: number }` | Emitted when item is clicked |

### Usage

```javascript
const element = document.querySelector('ha-list');
element.addEventListener('ha-item-click', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | List items |

## Examples

### Basic Usage

Simple list

```html
<ha-list>
  <ha-list-item>Item 1</ha-list-item>
  <ha-list-item>Item 2</ha-list-item>
  <ha-list-item>Item 3</ha-list-item>
</ha-list>
```

---

### Divided List

List with dividers

```html
<ha-list variant="divided" hoverable>
  <ha-list-item>
    <h4>Title</h4>
    <p>Description text</p>
  </ha-list-item>
  <ha-list-item>
    <h4>Another Title</h4>
    <p>More description</p>
  </ha-list-item>
</ha-list>
```

## Accessibility

### ARIA Roles

- `list`
- `listitem`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate items |
| `Enter` | Select item (if clickable) |

### ARIA Attributes

- `aria-label`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-list-item-background`
- `--component-list-item-hover`
- `--component-list-border`

### Spacing

- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
