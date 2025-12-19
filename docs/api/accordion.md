# Accordion

> Accordion component for collapsible content sections

**Tag**: `<ha-accordion>`

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
| `multiple` | `boolean` | `false` |  | Allow multiple panels to be open |
| `collapsible` | `boolean` | `true` |  | Allow panels to be collapsed |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ openPanels: string[] }` | Emitted when panels are opened/closed |

### Usage

```javascript
const element = document.querySelector('ha-accordion');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Accordion panels |

## Examples

### Basic Usage

Simple accordion

```html
<ha-accordion>
  <ha-accordion-panel value="panel1" title="Section 1">
    <p>Content for section 1</p>
  </ha-accordion-panel>
  <ha-accordion-panel value="panel2" title="Section 2">
    <p>Content for section 2</p>
  </ha-accordion-panel>
</ha-accordion>
```

---

### Multiple Open

Allow multiple panels open

```html
<ha-accordion multiple>
  <ha-accordion-panel value="a" title="Panel A">Content A</ha-accordion-panel>
  <ha-accordion-panel value="b" title="Panel B">Content B</ha-accordion-panel>
</ha-accordion>
```

## Accessibility

### ARIA Roles

- `region`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter/Space` | Toggle panel |
| `Arrow keys` | Navigate panels |

### ARIA Attributes

- `aria-expanded`
- `aria-controls`
- `aria-labelledby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-accordion-header-background`
- `--component-accordion-border`

### Spacing

- `--spacing-md`

### Typography

- `--text-body-default-fontSize`
- `--font-weight-medium`

### Other

- `--border-radius-md`

---

**Related**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
