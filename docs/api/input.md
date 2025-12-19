# Input

> Text input field with validation and various types

**Tag**: `<ha-input>`

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
| `type` | `'text' | 'email' | 'password' | 'number' | 'tel' | 'url'` | `'text'` |  | Input type |
| `value` | `string` | `''` |  | Input value |
| `placeholder` | `string` | `undefined` |  | Placeholder text |
| `disabled` | `boolean` | `false` |  | Disables the input |
| `readonly` | `boolean` | `false` |  | Makes input read-only |
| `required` | `boolean` | `false` |  | Makes input required |
| `error` | `boolean` | `false` |  | Shows error state |
| `label` | `string` | `undefined` |  | Input label |
| `description` | `string` | `undefined` |  | Help text |
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
const element = document.querySelector('ha-input');
element.addEventListener('ha-input', (event) => {
  console.log(event.detail);
});
```

## Slots

This component has no slots.

## Examples

### Basic Usage

Simple text input

```html
<ha-input label="Name" placeholder="Enter your name"></ha-input>
```

---

### With Error

Input with error state

```html
<ha-input label="Email" type="email" error error-message="Please enter a valid email"></ha-input>
```

---

### Disabled

Disabled input

```html
<ha-input label="Username" value="johndoe" disabled></ha-input>
```

## Accessibility

### ARIA Roles

- `textbox`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Tab` | Move focus |
| `Type` | Enter text |

### ARIA Attributes

- `aria-label`
- `aria-required`
- `aria-invalid`
- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-input-background`
- `--component-input-border`
- `--component-input-text`
- `--state-error-border`

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
