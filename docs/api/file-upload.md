# FileUpload

> File upload component for selecting and uploading files

**Tag**: `<ha-file-upload>`

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
| `accept` | `string` | `undefined` |  | Accepted file types (e.g., "image/*") |
| `multiple` | `boolean` | `false` |  | Allow multiple file selection |
| `maxSize` | `number` | `undefined` |  | Maximum file size in bytes |
| `maxFiles` | `number` | `undefined` |  | Maximum number of files |
| `disabled` | `boolean` | `false` |  | Disables the file upload |
| `dragDrop` | `boolean` | `true` |  | Enable drag and drop |
| `label` | `string` | `undefined` |  | Upload label |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ files: FileList }` | Emitted when files are selected |
| `ha-error` | `{ error: string }` | Emitted when validation fails |

### Usage

```javascript
const element = document.querySelector('ha-file-upload');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Custom upload area content |

## Examples

### Basic Usage

Simple file upload

```html
<ha-file-upload label="Upload files" accept="image/*"></ha-file-upload>
```

---

### Multiple Files

Upload multiple files with drag and drop

```html
<ha-file-upload
  label="Upload images"
  multiple
  :max-files="5"
  accept="image/*"
  drag-drop
></ha-file-upload>
```

## Accessibility

### ARIA Roles

- `button`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter/Space` | Open file dialog |

### ARIA Attributes

- `aria-label`
- `aria-describedby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-file-upload-background`
- `--component-file-upload-border`
- `--component-file-upload-hover`

### Spacing

- `--spacing-md`
- `--spacing-lg`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-md`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
