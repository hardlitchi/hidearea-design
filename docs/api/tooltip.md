# Tooltip

> Tooltip component for displaying contextual information on hover

**Tag**: `<ha-tooltip>`

**Category**: Overlay

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
| `content` | `string` | `undefined` | ✅ | Tooltip content |
| `placement` | `'top' | 'bottom' | 'left' | 'right'` | `'top'` |  | Tooltip placement |
| `trigger` | `'hover' | 'focus' | 'click'` | `'hover'` |  | Trigger behavior |
| `delay` | `number` | `0` |  | Show delay in milliseconds |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-show` | `{}` | Emitted when tooltip shows |
| `ha-hide` | `{}` | Emitted when tooltip hides |

### Usage

```javascript
const element = document.querySelector('ha-tooltip');
element.addEventListener('ha-show', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Element that triggers tooltip |

## Examples

### Basic Usage

Simple tooltip

```html
<ha-tooltip content="This is a tooltip">
  <ha-button>Hover me</ha-button>
</ha-tooltip>
```

---

### Different Placements

Tooltip positioning

```html
<ha-tooltip content="Top tooltip" placement="top">
  <ha-button>Top</ha-button>
</ha-tooltip>
<ha-tooltip content="Bottom tooltip" placement="bottom">
  <ha-button>Bottom</ha-button>
</ha-tooltip>
```

## Accessibility

### ARIA Roles

- `tooltip`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Hide tooltip |

### ARIA Attributes

- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-tooltip-background`
- `--component-tooltip-text`

### Spacing

- `--spacing-xs`
- `--spacing-sm`

### Typography

- `--text-body-small-fontSize`

### Other

- `--border-radius-sm`
- `--surface-overlay-elevation`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
