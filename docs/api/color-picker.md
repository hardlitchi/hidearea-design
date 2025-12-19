# ColorPicker

> Color picker component for selecting colors

**Tag**: `<ha-color-picker>`

**Category**: Form Controls

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
| `value` | `string` | `'#000000'` |  | Selected color value (hex, rgb, hsl) |
| `format` | `'hex' | 'rgb' | 'hsl'` | `'hex'` |  | Color format |
| `disabled` | `boolean` | `false` |  | Disables the color picker |
| `swatches` | `string[]` | `undefined` |  | Predefined color swatches |
| `label` | `string` | `undefined` |  | Color picker label |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | Emitted when color changes |

### Usage

```javascript
const element = document.querySelector('ha-color-picker');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple color picker

```html
<ha-color-picker label="Choose color" value="#3498db"></ha-color-picker>
```

---

### With Swatches

Color picker with predefined swatches

```html
<ha-color-picker
  :swatches="['#e74c3c', '#3498db', '#2ecc71', '#f39c12']"
></ha-color-picker>
```

## Accessibility

### ARIA Roles

- `button`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter/Space` | Open color picker |
| `Arrow keys` | Adjust color |

### ARIA Attributes

- `aria-label`
- `aria-valuetext`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-color-picker-background`
- `--component-color-picker-border`

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
