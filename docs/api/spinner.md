# Spinner

> Loading spinner component for indicating progress

**Tag**: `<ha-spinner>`

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
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Spinner size |
| `color` | `string` | `undefined` |  | Spinner color |

## Events

This component emits no custom events.

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple spinner

```html
<ha-spinner></ha-spinner>
```

---

### Different Sizes

Various spinner sizes

```html
<ha-spinner size="small"></ha-spinner>
<ha-spinner size="medium"></ha-spinner>
<ha-spinner size="large"></ha-spinner>
```

## Accessibility

### ARIA Roles

- `status`

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-label`
- `aria-live`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-spinner-color`

### Other

- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
