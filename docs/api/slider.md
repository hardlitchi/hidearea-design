# Slider

> Slider component for selecting numeric values from a range

**Tag**: `<ha-slider>`

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
| `value` | `number` | `0` |  | Current value |
| `min` | `number` | `0` |  | Minimum value |
| `max` | `number` | `100` |  | Maximum value |
| `step` | `number` | `1` |  | Step increment |
| `disabled` | `boolean` | `false` |  | Disables the slider |
| `label` | `string` | `undefined` |  | Slider label |
| `showValue` | `boolean` | `true` |  | Show current value |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: number }` | Emitted when value changes |
| `ha-input` | `{ value: number }` | Emitted during dragging |

### Usage

```javascript
const element = document.querySelector('ha-slider');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple slider

```html
<ha-slider label="Volume" value="50"></ha-slider>
```

---

### Custom Range

Slider with custom min/max

```html
<ha-slider label="Temperature" min="-20" max="40" value="20"></ha-slider>
```

---

### With Step

Slider with step increment

```html
<ha-slider label="Rating" min="0" max="5" step="0.5" value="3.5"></ha-slider>
```

## Accessibility

### ARIA Roles

- `slider`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Adjust value |
| `Home` | Set to minimum |
| `End` | Set to maximum |
| `Page Up/Down` | Large increment/decrement |

### ARIA Attributes

- `aria-valuenow`
- `aria-valuemin`
- `aria-valuemax`
- `aria-disabled`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-slider-track`
- `--component-slider-fill`
- `--component-slider-thumb`

### Spacing

- `--spacing-sm`

### Typography

- `--text-body-small-fontSize`

### Other

- `--border-radius-full`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
