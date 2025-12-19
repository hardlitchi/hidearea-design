# Card

> Container component for grouping related content

**Tag**: `<ha-card>`

**Category**: Layout

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
| `variant` | `'filled' | 'outlined' | 'elevated'` | `'filled'` |  | Card style variant |
| `padding` | `'none' | 'small' | 'medium' | 'large'` | `'medium'` |  | Internal padding |
| `hoverable` | `boolean` | `false` |  | Adds hover effect |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Card content |
| `header` | Card header content |
| `footer` | Card footer content |

## Examples

### Basic Card

Simple card with content

```html
<ha-card>
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  <p>Card content goes here</p>
  <div slot="footer">
    <ha-button variant="primary">Action</ha-button>
  </div>
</ha-card>
```

## Accessibility

### ARIA Roles

- `article`
- `region`

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-labelledby`
- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-card-background`
- `--component-card-border`

### Spacing

- `--spacing-md`
- `--spacing-lg`

### Other

- `--border-radius-lg`
- `--surface-raised-elevation`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
