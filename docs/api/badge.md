# Badge

> Small label for displaying status, counts, or categories

**Tag**: `<ha-badge>`

**Category**: Data Display

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
| `variant` | `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'` | `'primary'` |  | Badge color variant |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Badge size |
| `dot` | `boolean` | `false` |  | Show as dot indicator |
| `pill` | `boolean` | `false` |  | Pill-shaped badge |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Badge content |

## Examples

### Basic Usage

Simple badges

```html
<ha-badge>Default</ha-badge>
<ha-badge variant="success">Success</ha-badge>
<ha-badge variant="warning">Warning</ha-badge>
```

---

### Pill Badge

Pill-shaped badges

```html
<ha-badge pill>99+</ha-badge>
```

---

### Dot Indicator

Dot badge for notifications

```html
<ha-badge dot variant="danger"></ha-badge>
```

## Accessibility

### ARIA Roles

- `status`

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-label`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-badge-primary-background`
- `--component-badge-primary-text`

### Spacing

- `--spacing-xs`
- `--spacing-sm`

### Typography

- `--text-body-small-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-sm`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
