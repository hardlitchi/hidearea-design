# Modal

> Modal dialog component for displaying content in an overlay

**Tag**: `<ha-modal>`

**Category**: Feedback

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
| `open` | `boolean` | `false` |  | Whether modal is open |
| `size` | `'small' | 'medium' | 'large' | 'fullscreen'` | `'medium'` |  | Modal size |
| `title` | `string` | `undefined` |  | Modal title |
| `closeOnOverlay` | `boolean` | `true` |  | Close when clicking overlay |
| `closeOnEscape` | `boolean` | `true` |  | Close when pressing Escape |
| `closable` | `boolean` | `true` |  | Show close button |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-open` | `{}` | Emitted when modal opens |
| `ha-close` | `{}` | Emitted when modal closes |

### Usage

```javascript
const element = document.querySelector('ha-modal');
element.addEventListener('ha-open', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Modal content |
| `header` | Custom header content |
| `footer` | Modal footer (usually buttons) |

## Examples

### Basic Usage

Simple modal

```html
<ha-modal title="Confirm Action" open>
  Are you sure you want to continue?
  <div slot="footer">
    <ha-button variant="outline">Cancel</ha-button>
    <ha-button variant="primary">Confirm</ha-button>
  </div>
</ha-modal>
```

---

### Large Modal

Modal with large size

```html
<ha-modal title="Details" size="large" open>
  <p>Modal content goes here...</p>
</ha-modal>
```

## Accessibility

### ARIA Roles

- `dialog`
- `alertdialog`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close modal |
| `Tab` | Navigate focusable elements |

### ARIA Attributes

- `aria-modal`
- `aria-labelledby`
- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-modal-background`
- `--component-modal-overlay`

### Spacing

- `--spacing-lg`
- `--spacing-xl`

### Typography

- `--text-heading-h3-fontSize`
- `--font-weight-bold`

### Other

- `--border-radius-lg`
- `--surface-overlay-elevation`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
