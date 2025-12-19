# Progress

> Progress bar component for showing completion status

**Tag**: `<ha-progress>`

**Category**: Feedback

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
| `value` | `number` | `0` |  | Current value (0-100) |
| `max` | `number` | `100` |  | Maximum value |
| `variant` | `'default' | 'success' | 'warning' | 'danger'` | `'default'` |  | Progress bar color variant |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Progress bar size |
| `showValue` | `boolean` | `false` |  | Show percentage text |
| `indeterminate` | `boolean` | `false` |  | Indeterminate loading state |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-complete` | `{}` | Emitted when progress reaches 100% |

### Usage

```javascript
const element = document.querySelector('ha-progress');
element.addEventListener('ha-complete', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple progress bar

```html
<ha-progress value="60"></ha-progress>
```

---

### With Value Display

Progress bar showing percentage

```html
<ha-progress value="75" show-value></ha-progress>
```

---

### Indeterminate

Indeterminate progress

```html
<ha-progress indeterminate></ha-progress>
```

## Accessibility

### ARIA Roles

- `progressbar`

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-valuenow`
- `aria-valuemin`
- `aria-valuemax`
- `aria-label`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-progress-background`
- `--component-progress-fill`

### Typography

- `--text-body-small-fontSize`

### Other

- `--border-radius-full`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
