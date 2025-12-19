# Avatar

> User avatar component for displaying profile pictures or initials

**Tag**: `<ha-avatar>`

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
| `src` | `string` | `undefined` |  | Image source URL |
| `alt` | `string` | `undefined` |  | Alternative text for image |
| `initials` | `string` | `undefined` |  | Text initials to display |
| `size` | `'small' | 'medium' | 'large' | 'xlarge'` | `'medium'` |  | Avatar size |
| `shape` | `'circle' | 'square'` | `'circle'` |  | Avatar shape |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-error` | `{ error: Error }` | Emitted when image fails to load |

### Usage

```javascript
const element = document.querySelector('ha-avatar');
element.addEventListener('ha-error', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Custom avatar content (e.g., icon) |

## Examples

### With Image

Avatar with image source

```html
<ha-avatar src="/user.jpg" alt="John Doe"></ha-avatar>
```

---

### With Initials

Avatar with text initials

```html
<ha-avatar initials="JD"></ha-avatar>
```

---

### Different Sizes

Various avatar sizes

```html
<ha-avatar size="small" initials="S"></ha-avatar>
<ha-avatar size="medium" initials="M"></ha-avatar>
<ha-avatar size="large" initials="L"></ha-avatar>
```

## Accessibility

### ARIA Roles

- `img`

### Keyboard Support

Standard keyboard navigation.

### ARIA Attributes

- `aria-label`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-avatar-background`
- `--component-avatar-text`

### Typography

- `--text-body-default-fontSize`

### Other

- `--border-radius-full`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
