# Tabs

> Tabs component for organizing content into different views

**Tag**: `<ha-tabs>`

**Category**: Navigation

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
| `value` | `string` | `undefined` |  | Active tab value |
| `variant` | `'default' | 'pills' | 'underline'` | `'default'` |  | Tab style variant |

## Events

| Name | Detail | Description |
|------|--------|-------------|
| `ha-change` | `{ value: string }` | Emitted when active tab changes |

### Usage

```javascript
const element = document.querySelector('ha-tabs');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## Slots

| Name | Description |
|------|-------------|
| `default` | Tab and panel elements |

## Examples

### Basic Usage

Simple tabs

```html
<ha-tabs>
  <ha-tab value="profile">Profile</ha-tab>
  <ha-tab value="settings">Settings</ha-tab>
  <ha-tab value="notifications">Notifications</ha-tab>

  <ha-tab-panel value="profile">Profile content</ha-tab-panel>
  <ha-tab-panel value="settings">Settings content</ha-tab-panel>
  <ha-tab-panel value="notifications">Notifications content</ha-tab-panel>
</ha-tabs>
```

---

### Pills Variant

Tabs with pills style

```html
<ha-tabs variant="pills">
  <ha-tab value="overview">Overview</ha-tab>
  <ha-tab value="analytics">Analytics</ha-tab>
</ha-tabs>
```

## Accessibility

### ARIA Roles

- `tablist`
- `tab`
- `tabpanel`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Arrow keys` | Navigate between tabs |
| `Home` | First tab |
| `End` | Last tab |

### ARIA Attributes

- `aria-selected`
- `aria-controls`
- `aria-labelledby`

## Design Tokens

This component uses the following design tokens:

### Colors

- `--component-tabs-border`
- `--component-tabs-active`
- `--component-tabs-text`

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
