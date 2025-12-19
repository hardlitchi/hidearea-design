# Button

> A customizable button component with multiple variants and sizes

**Tag**: `<ha-button>`

**Category**: Form Controls

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
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'` | `'primary'` |  | Visual style variant |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | Button size |
| `disabled` | `boolean` | `false` |  | Disables the button |
| `loading` | `boolean` | `false` |  | Shows loading state |
| `fullWidth` | `boolean` | `false` |  | Makes button full width |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-click` | `{ originalEvent: MouseEvent }` | Emitted when button is clicked |

### Usage

```javascript
const element = document.querySelector('ha-button');
element.addEventListener('ha-click', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Button content |
| `prefix` | Content before button text (e.g., icon) |
| `suffix` | Content after button text |

## Examples

### Basic Usage

Simple button with text

```html
<ha-button>Click me</ha-button>
```

---

### With Variant

Different button styles

```html
<ha-button variant="primary">Primary</ha-button>
<ha-button variant="secondary">Secondary</ha-button>
<ha-button variant="outline">Outline</ha-button>
```

---

### With Icon

Button with icon prefix

```html
<ha-button>
  <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"/>
  </svg>
  Star
</ha-button>
```

---

### Loading State

Button with loading indicator

```html
<ha-button loading>Loading...</ha-button>
```

---

### Disabled State

Disabled button

```html
<ha-button disabled>Disabled</ha-button>
```

## Accessibility

### ARIA Roles

- `button`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` | Activates button |
| `Space` | Activates button |

### ARIA Attributes

- `aria-disabled`
- `aria-pressed (for toggle buttons)`
- `aria-label`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-button-primary-background-default`
- `--component-button-primary-text-default`
- `--component-button-primary-border-default`

### Spacing

- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`

### Typography

- `--text-body-default-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
