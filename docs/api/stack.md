# Stack

> Stack layout component for arranging items vertically or horizontally

**Tag**: `<ha-stack>`

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
| `direction` | `'horizontal' | 'vertical'` | `'vertical'` |  | Stack direction |
| `gap` | `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` | `'md'` |  | Gap between items |
| `align` | `'start' | 'center' | 'end' | 'stretch'` | `'start'` |  | Alignment of items |
| `justify` | `'start' | 'center' | 'end' | 'between' | 'around'` | `'start'` |  | Justification of items |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Stack items |

## Examples

### Vertical Stack

Items stacked vertically

```html
<ha-stack direction="vertical" gap="md">
  <ha-button>Button 1</ha-button>
  <ha-button>Button 2</ha-button>
  <ha-button>Button 3</ha-button>
</ha-stack>
```

---

### Horizontal Stack

Items arranged horizontally

```html
<ha-stack direction="horizontal" gap="sm" align="center">
  <ha-avatar></ha-avatar>
  <div>
    <h4>John Doe</h4>
    <p>john@example.com</p>
  </div>
</ha-stack>
```

## Accessibility

### ARIA Roles

No specific roles defined.

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

No specific ARIA attributes required.

## Design Tokens

This component uses the following design tokens:

### Spacing

- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`
- `--spacing-xl`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
