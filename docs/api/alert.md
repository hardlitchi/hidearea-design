# Alert

> Alert component for displaying important messages and notifications

**Tag**: `<ha-alert>`

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
| `variant` | `'info' | 'success' | 'warning' | 'danger'` | `'info'` |  | Alert type |
| `title` | `string` | `undefined` |  | Alert title |
| `closable` | `boolean` | `false` |  | Show close button |
| `icon` | `boolean` | `true` |  | Show icon |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-close` | `{}` | Emitted when alert is closed |

### Usage

```javascript
const element = document.querySelector('ha-alert');
element.addEventListener('ha-close', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Alert content |
| `icon` | Custom icon |

## Examples

### Basic Usage

Different alert variants

```html
<ha-alert variant="info">This is an informational message</ha-alert>
<ha-alert variant="success">Operation completed successfully</ha-alert>
<ha-alert variant="warning">Please be careful</ha-alert>
<ha-alert variant="danger">An error occurred</ha-alert>
```

---

### With Title

Alert with title

```html
<ha-alert variant="warning" title="Warning">
  This action cannot be undone.
</ha-alert>
```

---

### Closable Alert

Alert with close button

```html
<ha-alert variant="info" closable>
  This alert can be dismissed.
</ha-alert>
```

## Accessibility

### ARIA Roles

- `alert`
- `status`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close alert (if closable) |

### ARIA Attributes

- `aria-live`
- `aria-atomic`
- `aria-label`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-alert-info-background`
- `--component-alert-info-border`
- `--component-alert-info-text`

### Spacing

- `--spacing-md`

### Typography

- `--text-body-default-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-md`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
