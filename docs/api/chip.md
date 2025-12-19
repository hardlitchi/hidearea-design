# Chip

> Compact element representing an input, attribute, or action

**Tag**: `<ha-chip>`

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
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Chip size |
| `color` | `'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'` | `'default'` |  | Chip color variant |
| `deletable` | `boolean` | `false` |  | Show delete button |
| `interactive` | `boolean` | `false` |  | Make chip interactive (clickable) |
| `disabled` | `boolean` | `false` |  | Disable the chip |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `chip-click` | `{ originalEvent: MouseEvent }` | Emitted when chip is clicked (if interactive) |
| `chip-delete` | `{ chip: HaChip }` | Emitted when delete button is clicked |

### Usage

```javascript
const element = document.querySelector('ha-chip');
element.addEventListener('chip-click', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Chip text content |
| `icon` | Leading icon |

## Examples

### Basic Usage

Simple chips

```html
<ha-chip>Default</ha-chip>
<ha-chip color="primary">Primary</ha-chip>
<ha-chip color="success">Success</ha-chip>
```

---

### Interactive Chip

Clickable chips

```html
<ha-chip interactive>Click me</ha-chip>
```

---

### Deletable Chip

Chips with delete button

```html
<ha-chip deletable>Remove me</ha-chip>
```

---

### Chip with Icon

Chips with leading icon

```html
<ha-chip>
  <svg slot="icon" width="16" height="16">...</svg>
  With Icon
</ha-chip>
```

## Accessibility

### ARIA Roles

- `button`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` |  |
| `Space` |  |

### ARIA Attributes

- `aria-label`
- `aria-disabled`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-chip-default-background`
- `--component-chip-primary-background`

### Spacing

- `--spacing-xs`
- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-small-fontSize`
- `--font-weight-medium`

### Other

- `--radius-full`
- `--component-chip-interactive-transition-properties`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
