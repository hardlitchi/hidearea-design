# Switch

> Toggle switch for binary on/off states

**Tag**: `<ha-switch>`

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
| `checked` | `boolean` | `false` |  | Whether the switch is on |
| `disabled` | `boolean` | `false` |  | Disables the switch |
| `required` | `boolean` | `false` |  | Makes switch required |
| `label` | `string` | `undefined` |  | Switch label |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Switch size |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ checked: boolean }` | Emitted when switch state changes |

### Usage

```javascript
const element = document.querySelector('ha-switch');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Switch label content |

## Examples

### Basic Usage

Simple switch

```html
<ha-switch label="Enable notifications"></ha-switch>
```

---

### Checked State

Pre-checked switch

```html
<ha-switch label="Dark mode" checked></ha-switch>
```

---

### Different Sizes

Switch sizes

```html
<ha-switch label="Small" size="small"></ha-switch>
<ha-switch label="Medium" size="medium"></ha-switch>
<ha-switch label="Large" size="large"></ha-switch>
```

## Accessibility

### ARIA Roles

- `switch`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` | Toggle switch |
| `Enter` | Toggle switch |

### ARIA Attributes

- `aria-checked`
- `aria-disabled`
- `aria-required`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-switch-background`
- `--component-switch-handle`
- `--component-switch-checked`

### Spacing

- `--spacing-xs`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-full`
- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
