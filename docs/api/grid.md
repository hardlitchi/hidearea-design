# Grid

> Grid layout component for creating responsive grid layouts

**Tag**: `<ha-grid>`

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
| `columns` | `number | string` | `12` |  | Number of columns or responsive breakpoint object |
| `gap` | `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` | `'md'` |  | Gap between grid items |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Grid items |

## Examples

### Basic Usage

Simple grid layout

```html
<ha-grid columns="3" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>
```

---

### Responsive Grid

Grid with responsive columns

```html
<ha-grid :columns="{ sm: 1, md: 2, lg: 4 }">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ha-grid>
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
