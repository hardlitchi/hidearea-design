# FormGroup

> Form group component for organizing form fields with labels and descriptions

**Tag**: `<ha-form-group>`

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
| `label` | `string` | `undefined` |  | Form group label |
| `description` | `string` | `undefined` |  | Helper text |
| `error` | `boolean` | `false` |  | Shows error state |
| `errorMessage` | `string` | `undefined` |  | Error message to display |
| `required` | `boolean` | `false` |  | Shows required indicator |

## Events

This component emits no custom events.

## Slots

| Name | Description |
|------|-------------|
| `default` | Form field content |
| `label` | Custom label content |
| `description` | Custom description content |

## Examples

### Basic Usage

Form group with input

```html
<ha-form-group label="Email" description="We'll never share your email" required>
  <ha-input type="email" placeholder="email@example.com"></ha-input>
</ha-form-group>
```

---

### With Error

Form group showing error state

```html
<ha-form-group label="Username" error error-message="Username is already taken">
  <ha-input value="john"></ha-input>
</ha-form-group>
```

## Accessibility

### ARIA Roles

No specific roles defined.

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-describedby`
- `aria-invalid`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-form-group-label`
- `--component-form-group-description`
- `--state-error-text`

### Spacing

- `--spacing-xs`
- `--spacing-sm`

### Typography

- `--text-body-default-fontSize`
- `--text-body-small-fontSize`
- `--font-weight-medium`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
