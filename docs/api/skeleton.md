# Skeleton

> Skeleton loader component for displaying placeholder content during loading

**Tag**: `<ha-skeleton>`

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
| `variant` | `'text' | 'circular' | 'rectangular'` | `'text'` |  | Skeleton shape |
| `width` | `string | number` | `undefined` |  | Skeleton width |
| `height` | `string | number` | `undefined` |  | Skeleton height |
| `animated` | `boolean` | `true` |  | Animated pulse effect |

## Events

This component emits no custom events.

## Slots

This component has no slots.

## Examples

### Text Skeleton

Loading skeleton for text

```html
<ha-skeleton variant="text"></ha-skeleton>
<ha-skeleton variant="text" width="80%"></ha-skeleton>
<ha-skeleton variant="text" width="60%"></ha-skeleton>
```

---

### Circular Skeleton

Loading skeleton for avatars

```html
<ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
```

---

### Rectangular Skeleton

Loading skeleton for images/cards

```html
<ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
```

## Accessibility

### ARIA Roles

- `status`

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-busy`
- `aria-live`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-skeleton-background`
- `--component-skeleton-highlight`

### Other

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
