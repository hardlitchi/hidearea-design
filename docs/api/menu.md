# Menu

> Menu component for displaying lists of actions or options

**Tag**: `<ha-menu>`

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
| `open` | `boolean` | `false` |  | Whether menu is open |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-select` | `{ value: string }` | Emitted when menu item is selected |
| `ha-open` | `{}` | Emitted when menu opens |
| `ha-close` | `{}` | Emitted when menu closes |

### Usage

```javascript
const element = document.querySelector('ha-menu');
element.addEventListener('ha-select', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Menu items |
| `trigger` | Element that triggers the menu |

## Examples

### Basic Usage

Simple dropdown menu

```html
<ha-menu>
  <ha-button slot="trigger">Actions</ha-button>
  <ha-menu-item value="edit">Edit</ha-menu-item>
  <ha-menu-item value="duplicate">Duplicate</ha-menu-item>
  <ha-menu-item value="delete">Delete</ha-menu-item>
</ha-menu>
```

## Accessibility

### ARIA Roles

- `menu`
- `menuitem`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate items |
| `Enter/Space` | Select item |
| `Escape` | Close menu |

### ARIA Attributes

- `aria-haspopup`
- `aria-expanded`
- `aria-activedescendant`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-menu-background`
- `--component-menu-item-hover`

### Spacing

- `--spacing-sm`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`
- `--surface-overlay-elevation`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
