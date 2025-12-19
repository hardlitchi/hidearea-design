# Radio

> Radio button for selecting a single option from a group

**Tag**: `<ha-radio>`

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
| `checked` | `boolean` | `false` |  | Whether the radio is selected |
| `value` | `string` | `undefined` | ✅ | Value of the radio button |
| `name` | `string` | `undefined` | ✅ | Name attribute for grouping radios |
| `disabled` | `boolean` | `false` |  | Disables the radio button |
| `required` | `boolean` | `false` |  | Makes radio required |
| `label` | `string` | `undefined` |  | Radio label |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | Emitted when radio is selected |

### Usage

```javascript
const element = document.querySelector('ha-radio');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Radio label content |

## Examples

### Basic Usage

Radio button group

```html
<ha-radio name="size" value="small" label="Small"></ha-radio>
<ha-radio name="size" value="medium" label="Medium" checked></ha-radio>
<ha-radio name="size" value="large" label="Large"></ha-radio>
```

---

### Disabled State

Disabled radio button

```html
<ha-radio name="option" value="disabled" label="Disabled option" disabled></ha-radio>
```

## Accessibility

### ARIA Roles

- `radio`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate between radio buttons in group |
| `Space` | Select radio button |

### ARIA Attributes

- `aria-checked`
- `aria-disabled`
- `aria-required`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-radio-background`
- `--component-radio-border`
- `--component-radio-dot`

### Spacing

- `--spacing-sm`

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
