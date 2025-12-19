# Drawer

> Drawer component for side panel content

**Tag**: `<ha-drawer>`

**Category**: Overlay

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
| `open` | `boolean` | `false` |  | Whether drawer is open |
| `position` | `'left' | 'right' | 'top' | 'bottom'` | `'right'` |  | Drawer position |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Drawer size |
| `title` | `string` | `undefined` |  | Drawer title |
| `closeOnOverlay` | `boolean` | `true` |  | Close when clicking overlay |
| `closeOnEscape` | `boolean` | `true` |  | Close when pressing Escape |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-open` | `{}` | Emitted when drawer opens |
| `ha-close` | `{}` | Emitted when drawer closes |

### Usage

```javascript
const element = document.querySelector('ha-drawer');
element.addEventListener('ha-open', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Drawer content |
| `header` | Custom header content |
| `footer` | Drawer footer |

## Examples

### Basic Usage

Simple drawer

```html
<ha-drawer title="Settings" open>
  <p>Drawer content goes here</p>
</ha-drawer>
```

---

### Left Position

Drawer from left side

```html
<ha-drawer position="left" title="Menu" open>
  <ha-menu>
    <ha-menu-item>Home</ha-menu-item>
    <ha-menu-item>About</ha-menu-item>
  </ha-menu>
</ha-drawer>
```

## Accessibility

### ARIA Roles

- `dialog`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close drawer |
| `Tab` | Navigate focusable elements |

### ARIA Attributes

- `aria-modal`
- `aria-labelledby`
- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-drawer-background`
- `--component-drawer-overlay`

### Spacing

- `--spacing-lg`

### Typography

- `--text-heading-h3-fontSize`
- `--font-weight-bold`

### Other

- `--surface-overlay-elevation`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
