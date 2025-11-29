# Checkbox

A customizable checkbox component with support for indeterminate state.

## Import

```js
// Web Component
import '@hidearea-design/core';

// React
import { Checkbox } from '@hidearea-design/react';

// Vue
import { HaCheckbox } from '@hidearea-design/vue';
```

## Basic Usage

### Vanilla JavaScript

```html
<ha-checkbox label="Accept terms"></ha-checkbox>
```

### React

```tsx
<Checkbox>Accept terms</Checkbox>
```

### Vue

```vue
<HaCheckbox v-model="accepted">Accept terms</HaCheckbox>
```

## Sizes

```html
<ha-checkbox size="sm" label="Small"></ha-checkbox>
<ha-checkbox size="md" label="Medium"></ha-checkbox>
<ha-checkbox size="lg" label="Large"></ha-checkbox>
```

## States

### Checked

```html
<ha-checkbox checked label="Checked"></ha-checkbox>
```

### Indeterminate

```html
<ha-checkbox indeterminate label="Indeterminate"></ha-checkbox>
```

### Disabled

```html
<ha-checkbox disabled label="Disabled"></ha-checkbox>
<ha-checkbox checked disabled label="Checked & Disabled"></ha-checkbox>
```

### Required

```html
<ha-checkbox required label="Required field"></ha-checkbox>
```

### Error

```html
<ha-checkbox error label="Invalid selection"></ha-checkbox>
```

## With Description

```html
<ha-checkbox
  label="Enable notifications"
  description="Receive updates about your account activity"
></ha-checkbox>
```

## Using Slots

```html
<ha-checkbox>
  <strong>I agree to the</strong>
  <a href="/terms">Terms and Conditions</a>
</ha-checkbox>

<ha-checkbox>
  Enable notifications
  <span slot="description">
    Get email updates about your account
  </span>
</ha-checkbox>
```

## Events

```js
// Vanilla JS
const checkbox = document.querySelector('ha-checkbox');

checkbox.addEventListener('change', (e) => {
  console.log('Checked:', e.detail.checked);
});

checkbox.addEventListener('input', (e) => {
  console.log('Input event:', e.detail.checked);
});

// React
<Checkbox
  onChange={(e) => console.log('Checked:', e.detail.checked)}
>
  Accept terms
</Checkbox>

// Vue
<HaCheckbox
  v-model="checked"
  @change="handleChange"
>
  Accept terms
</HaCheckbox>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `error` | `boolean` | `false` | Error state |
| `name` | `string` | `''` | Checkbox name attribute |
| `value` | `string` | `'on'` | Checkbox value |
| `label` | `string` | `''` | Label text (alternative to slot) |
| `description` | `string` | `''` | Description text (alternative to slot) |

### Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focuses the checkbox |
| `blur()` | Removes focus from the checkbox |
| `checkValidity()` | Checks if checkbox is valid |
| `reportValidity()` | Reports validity to user |
| `setCustomValidity(message)` | Sets custom validation message |

### Slots

| Slot | Description |
|------|-------------|
| (default) | Checkbox label content |
| `description` | Description content |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ checked: boolean }` | Fired when checked state changes |
| `input` | `{ checked: boolean }` | Fired when checked state changes |

### CSS Parts

| Part | Description |
|------|-------------|
| `checkbox-container` | Container element |
| `checkbox-box` | Visual checkbox box |
| `checkbox-icon` | Check/indeterminate icon |
| `label` | Label element |
| `description` | Description element |

## Examples

### Checkbox Group

```tsx
// React
import { useState } from 'react';
import { Checkbox } from '@hidearea-design/react';

function CheckboxGroup() {
  const [selected, setSelected] = useState<string[]>([]);

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter(v => v !== value));
    }
  };

  return (
    <div>
      {options.map(option => (
        <Checkbox
          key={option}
          value={option}
          checked={selected.includes(option)}
          onChange={(e) => handleChange(option, e.detail.checked)}
        >
          {option}
        </Checkbox>
      ))}
    </div>
  );
}
```

### Select All with Indeterminate

```tsx
// React
import { useState, useEffect } from 'react';
import { Checkbox } from '@hidearea-design/react';

function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every(item => item.checked);
  const someChecked = items.some(item => item.checked) && !allChecked;

  const toggleAll = () => {
    const newChecked = !allChecked;
    setItems(items.map(item => ({ ...item, checked: newChecked })));
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
      >
        Select All
      </Checkbox>
      <div style={{ marginLeft: '24px' }}>
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={item.checked}
            onChange={() => toggleItem(item.id)}
          >
            {item.label}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
```

### Form Validation

```html
<form>
  <ha-checkbox required name="terms">
    I agree to the terms and conditions
  </ha-checkbox>
  <ha-button type="submit">Submit</ha-button>
</form>

<script>
  const form = document.querySelector('form');
  const checkbox = form.querySelector('ha-checkbox');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkbox.checkValidity()) {
      checkbox.reportValidity();
      return;
    }

    console.log('Form submitted');
  });
</script>
```

## Accessibility

- Uses native checkbox input for full keyboard support
- Proper ARIA attributes automatically applied
- `aria-disabled` set when disabled
- `aria-required` set when required
- `aria-invalid` set when error state is active
- `aria-checked` reflects checked/indeterminate state
- Label and description properly associated

## Best Practices

1. **Always provide labels**: Use clear, descriptive labels
2. **Group related checkboxes**: Use fieldsets for related options
3. **Use indeterminate wisely**: Only for "select all" or partial selections
4. **Indicate required fields**: Use required attribute
5. **Provide validation feedback**: Use error state with clear messages

## Related Components

- [Button](./button.md)
- [Input](./input.md)
