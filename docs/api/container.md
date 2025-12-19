# Container

> Container component for centering and constraining content width

**Tag**: `<ha-container>`

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
| `maxWidth` | `'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` | `'lg'` |  | Maximum container width |
| `padding` | `boolean` | `true` |  | Apply horizontal padding |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Container content |

## Examples

### Basic Usage

Centered container

```html
<ha-container>
  <p>Content is centered and constrained to max-width</p>
</ha-container>
```

---

### Different Sizes

Various container sizes

```html
<ha-container max-width="sm">Small container</ha-container>
<ha-container max-width="lg">Large container</ha-container>
<ha-container max-width="full">Full width container</ha-container>
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

- `--spacing-md`
- `--spacing-lg`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
