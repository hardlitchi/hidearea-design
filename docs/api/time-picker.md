# TimePicker

> Time picker component for selecting time values

**Tag**: `<ha-time-picker>`

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
| `value` | `string` | `undefined` |  | Selected time value (HH:mm format) |
| `format` | `'12h' | '24h'` | `'24h'` |  | Time format |
| `disabled` | `boolean` | `false` |  | Disables the time picker |
| `placeholder` | `string` | `undefined` |  | Placeholder text |
| `label` | `string` | `undefined` |  | Time picker label |
| `step` | `number` | `1` |  | Minute step increment |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | Emitted when time changes |

### Usage

```javascript
const element = document.querySelector('ha-time-picker');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple time picker

```html
<ha-time-picker label="Select time" placeholder="HH:mm"></ha-time-picker>
```

---

### 12-hour Format

Time picker with AM/PM

```html
<ha-time-picker label="Appointment time" format="12h"></ha-time-picker>
```

---

### With Step

Time picker with 15-minute intervals

```html
<ha-time-picker label="Meeting time" :step="15"></ha-time-picker>
```

## Accessibility

### ARIA Roles

- `button`
- `listbox`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Adjust time |
| `Enter` | Confirm selection |
| `Escape` | Close picker |

### ARIA Attributes

- `aria-label`
- `aria-expanded`
- `aria-activedescendant`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-time-picker-background`
- `--component-time-picker-selected`
- `--component-time-picker-text`

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
