# Select

> Dropdown select component for choosing from a list of options

**Tag**: `<ha-select>`

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
| `value` | `string | string[]` | `undefined` |  | Selected value(s) |
| `multiple` | `boolean` | `false` |  | Allow multiple selections |
| `disabled` | `boolean` | `false` |  | Disables the select |
| `required` | `boolean` | `false` |  | Makes select required |
| `placeholder` | `string` | `undefined` |  | Placeholder text |
| `label` | `string` | `undefined` |  | Select label |
| `error` | `boolean` | `false` |  | Shows error state |
| `errorMessage` | `string` | `undefined` |  | Error message to display |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: string | string[] }` | Emitted when selection changes |
| `ha-open` | `{}` | Emitted when dropdown opens |
| `ha-close` | `{}` | Emitted when dropdown closes |

### Usage

```javascript
const element = document.querySelector('ha-select');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Option elements |

## Examples

### Basic Usage

Simple select dropdown

```html
<ha-select label="Choose a country" placeholder="Select...">
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="jp">Japan</option>
</ha-select>
```

---

### Multiple Selection

Select with multiple values

```html
<ha-select label="Choose languages" multiple>
  <option value="en">English</option>
  <option value="es">Spanish</option>
  <option value="fr">French</option>
</ha-select>
```

## Accessibility

### ARIA Roles

- `combobox`
- `listbox`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate options |
| `Enter/Space` | Select option |
| `Escape` | Close dropdown |

### ARIA Attributes

- `aria-expanded`
- `aria-haspopup`
- `aria-activedescendant`
- `aria-required`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-select-background`
- `--component-select-border`
- `--component-select-text`

### Spacing

- `--spacing-sm`
- `--spacing-md`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`
- `--surface-overlay-elevation`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
