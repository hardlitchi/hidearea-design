# Toast

> Toast notification component for temporary messages

**Tag**: `<ha-toast>`

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
| `variant` | `'info' | 'success' | 'warning' | 'danger'` | `'info'` |  | Toast type |
| `duration` | `number` | `3000` |  | Auto-dismiss duration in ms (0 = no auto-dismiss) |
| `position` | `'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'` | `'top-right'` |  | Toast position |
| `closable` | `boolean` | `true` |  | Show close button |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-close` | `{}` | Emitted when toast is closed |

### Usage

```javascript
const element = document.querySelector('ha-toast');
element.addEventListener('ha-close', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Toast content |

## Examples

### Basic Usage

Show toast notification

```html
<ha-toast variant="success">
  Changes saved successfully!
</ha-toast>
```

---

### Custom Duration

Toast with custom duration

```html
<ha-toast variant="info" duration="5000">
  This message will stay for 5 seconds.
</ha-toast>
```

## Accessibility

### ARIA Roles

- `status`
- `alert`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close toast |

### ARIA Attributes

- `aria-live`
- `aria-atomic`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-toast-background`
- `--component-toast-text`

### Spacing

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
