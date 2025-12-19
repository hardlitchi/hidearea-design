# Textarea

> Multi-line text input component

**Tag**: `<ha-textarea>`

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
| `value` | `string` | `''` |  | Textarea value |
| `placeholder` | `string` | `undefined` |  | Placeholder text |
| `disabled` | `boolean` | `false` |  | Disables the textarea |
| `readonly` | `boolean` | `false` |  | Makes textarea read-only |
| `required` | `boolean` | `false` |  | Makes textarea required |
| `rows` | `number` | `3` |  | Number of visible rows |
| `maxlength` | `number` | `undefined` |  | Maximum character length |
| `resize` | `'none' | 'vertical' | 'horizontal' | 'both'` | `'vertical'` |  | Resize behavior |
| `label` | `string` | `undefined` |  | Textarea label |
| `error` | `boolean` | `false` |  | Shows error state |
| `errorMessage` | `string` | `undefined` |  | Error message to display |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-input` | `{ value: string }` | Emitted on input |
| `ha-change` | `{ value: string }` | Emitted on change (blur) |
| `ha-focus` | `{}` | Emitted on focus |
| `ha-blur` | `{}` | Emitted on blur |

### Usage

```javascript
const element = document.querySelector('ha-textarea');
element.addEventListener('ha-input', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple textarea

```html
<ha-textarea label="Comments" placeholder="Enter your comments..."></ha-textarea>
```

---

### With Character Limit

Textarea with maxlength

```html
<ha-textarea label="Bio" maxlength="200" rows="5"></ha-textarea>
```

## Accessibility

### ARIA Roles

- `textbox`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Standard textarea keyboard shortcuts` |  |
| `Tab` | Move focus |

### ARIA Attributes

- `aria-label`
- `aria-required`
- `aria-invalid`
- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-textarea-background`
- `--component-textarea-border`
- `--component-textarea-text`

### Spacing

- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
