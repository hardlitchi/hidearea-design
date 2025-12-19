# Checkbox

> Checkbox input for selecting one or multiple options

**Tag**: `<ha-checkbox>`

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
| `checked` | `boolean` | `false` |  | Whether the checkbox is checked |
| `value` | `string` | `undefined` |  | Value of the checkbox |
| `disabled` | `boolean` | `false` |  | Disables the checkbox |
| `indeterminate` | `boolean` | `false` |  | Shows indeterminate state |
| `required` | `boolean` | `false` |  | Makes checkbox required |
| `label` | `string` | `undefined` |  | Checkbox label |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ checked: boolean, value: string }` | Emitted when checkbox state changes |

### Usage

```javascript
const element = document.querySelector('ha-checkbox');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Checkbox label content |

## Examples

### Basic Usage

Simple checkbox

```html
<ha-checkbox label="Accept terms and conditions"></ha-checkbox>
```

---

### Checked State

Pre-checked checkbox

```html
<ha-checkbox label="Subscribe to newsletter" checked></ha-checkbox>
```

---

### Indeterminate State

Checkbox in indeterminate state

```html
<ha-checkbox label="Select all" indeterminate></ha-checkbox>
```

## Accessibility

### ARIA Roles

- `checkbox`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` | Toggle checkbox |

### ARIA Attributes

- `aria-checked`
- `aria-disabled`
- `aria-required`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-checkbox-background`
- `--component-checkbox-border`
- `--component-checkbox-check`

### Spacing

- `--spacing-sm`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-sm`
- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
