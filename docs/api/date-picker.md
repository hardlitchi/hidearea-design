# DatePicker

> Date picker component for selecting dates

**Tag**: `<ha-date-picker>`

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
| `value` | `string | Date` | `undefined` |  | Selected date value |
| `min` | `string | Date` | `undefined` |  | Minimum selectable date |
| `max` | `string | Date` | `undefined` |  | Maximum selectable date |
| `disabled` | `boolean` | `false` |  | Disables the date picker |
| `placeholder` | `string` | `undefined` |  | Placeholder text |
| `format` | `string` | `'YYYY-MM-DD'` |  | Date format |
| `label` | `string` | `undefined` |  | Date picker label |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: Date }` | Emitted when date changes |

### Usage

```javascript
const element = document.querySelector('ha-date-picker');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple date picker

```html
<ha-date-picker label="Select date" placeholder="Choose a date"></ha-date-picker>
```

---

### With Min/Max

Date picker with date range

```html
<ha-date-picker
  label="Appointment date"
  min="2024-01-01"
  max="2024-12-31"
></ha-date-picker>
```

## Accessibility

### ARIA Roles

- `button`
- `dialog`
- `grid`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate dates |
| `Enter` | Select date |
| `Escape` | Close picker |

### ARIA Attributes

- `aria-label`
- `aria-expanded`
- `aria-selected`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-date-picker-background`
- `--component-date-picker-selected`
- `--component-date-picker-text`

### Spacing

- `--spacing-sm`
- `--spacing-md`

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
