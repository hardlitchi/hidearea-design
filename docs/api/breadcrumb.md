# Breadcrumb

> Breadcrumb navigation component for showing current location

**Tag**: `<ha-breadcrumb>`

**Category**: Navigation

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
| `separator` | `string` | `'/'` |  | Separator between items |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Breadcrumb items |

## Examples

### Basic Usage

Simple breadcrumb

```html
<ha-breadcrumb>
  <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
  <ha-breadcrumb-item>Details</ha-breadcrumb-item>
</ha-breadcrumb>
```

---

### Custom Separator

Breadcrumb with custom separator

```html
<ha-breadcrumb separator=">">
  <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
  <ha-breadcrumb-item>Current</ha-breadcrumb-item>
</ha-breadcrumb>
```

## Accessibility

### ARIA Roles

- `navigation`
- `list`
- `listitem`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Navigate links |

### ARIA Attributes

- `aria-label`
- `aria-current`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-breadcrumb-text`
- `--component-breadcrumb-separator`

### Spacing

- `--spacing-sm`

### Typography

- `--text-body-default-fontSize`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
