# Input

A flexible input component with multiple types, variants, and validation support.

## Import

```js
// Web Component
import "@hidearea-design/core";

// React
import { Input } from "@hidearea-design/react";

// Vue
import { HaInput } from "@hidearea-design/vue";
```

## Basic Usage

### Vanilla JavaScript

```html
<ha-input placeholder="Enter your name"></ha-input>
```

### React

```tsx
<Input placeholder="Enter your name" />
```

### Vue

```vue
<HaInput v-model="name" placeholder="Enter your name" />
```

## Input Types

```html
<ha-input type="text" placeholder="Text input"></ha-input>
<ha-input type="email" placeholder="email@example.com"></ha-input>
<ha-input type="password" placeholder="Password"></ha-input>
<ha-input type="number" placeholder="123"></ha-input>
<ha-input type="tel" placeholder="Phone number"></ha-input>
<ha-input type="url" placeholder="https://example.com"></ha-input>
<ha-input type="search" placeholder="Search..."></ha-input>
```

## Variants

```html
<ha-input variant="default" placeholder="Default"></ha-input>
<ha-input variant="filled" placeholder="Filled"></ha-input>
<ha-input variant="outlined" placeholder="Outlined"></ha-input>
```

## Sizes

```html
<ha-input size="sm" placeholder="Small"></ha-input>
<ha-input size="md" placeholder="Medium"></ha-input>
<ha-input size="lg" placeholder="Large"></ha-input>
```

## States

### Disabled

```html
<ha-input disabled placeholder="Disabled input"></ha-input>
```

### Readonly

```html
<ha-input readonly value="Read-only value"></ha-input>
```

### Required

```html
<ha-input required placeholder="Required field"></ha-input>
```

### Error

```html
<ha-input error placeholder="Invalid input"></ha-input>
```

### Full Width

```html
<ha-input full-width placeholder="Full width input"></ha-input>
```

## With Prefix/Suffix

```html
<ha-input placeholder="Enter amount">
  <span slot="prefix">$</span>
</ha-input>

<ha-input placeholder="Enter domain">
  <span slot="suffix">.com</span>
</ha-input>
```

## Validation

### HTML5 Validation

```html
<ha-input
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  minlength="5"
  maxlength="50"
></ha-input>
```

### Number Validation

```html
<ha-input type="number" min="0" max="100" step="5"></ha-input>
```

## Events

```js
// Vanilla JS
const input = document.querySelector('ha-input');

input.addEventListener('input', (e) => {
  console.log('Input value:', e.detail.value);
});

input.addEventListener('change', (e) => {
  console.log('Changed:', e.detail.value);
});

input.addEventListener('focus', (e) => {
  console.log('Input focused');
});

input.addEventListener('blur', (e) => {
  console.log('Input blurred');
});

// React
<Input
  onInput={(e) => console.log(e.detail.value)}
  onChange={(e) => console.log(e.detail.value)}
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
/>

// Vue
<HaInput
  v-model="value"
  @input="handleInput"
  @change="handleChange"
  @focus="handleFocus"
  @blur="handleBlur"
/>
```

## API Reference

### Properties

| Property       | Type                                                                        | Default     | Description                 |
| -------------- | --------------------------------------------------------------------------- | ----------- | --------------------------- |
| `variant`      | `'default' \| 'filled' \| 'outlined'`                                       | `'default'` | Visual style variant        |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`      | Input size                  |
| `type`         | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'`    | Input type                  |
| `value`        | `string`                                                                    | `''`        | Input value                 |
| `placeholder`  | `string`                                                                    | `''`        | Placeholder text            |
| `disabled`     | `boolean`                                                                   | `false`     | Disabled state              |
| `readonly`     | `boolean`                                                                   | `false`     | Readonly state              |
| `required`     | `boolean`                                                                   | `false`     | Required field              |
| `error`        | `boolean`                                                                   | `false`     | Error state                 |
| `fullWidth`    | `boolean`                                                                   | `false`     | Full width input            |
| `name`         | `string`                                                                    | `''`        | Input name attribute        |
| `autocomplete` | `string`                                                                    | `''`        | Autocomplete attribute      |
| `maxlength`    | `number`                                                                    | -           | Maximum length              |
| `minlength`    | `number`                                                                    | -           | Minimum length              |
| `pattern`      | `string`                                                                    | -           | Validation pattern          |
| `min`          | `number`                                                                    | -           | Minimum value (number type) |
| `max`          | `number`                                                                    | -           | Maximum value (number type) |
| `step`         | `number`                                                                    | -           | Step value (number type)    |

### Methods

| Method                                      | Description                    |
| ------------------------------------------- | ------------------------------ |
| `focus()`                                   | Focuses the input              |
| `blur()`                                    | Removes focus from the input   |
| `select()`                                  | Selects all input text         |
| `setSelectionRange(start, end, direction?)` | Sets text selection range      |
| `checkValidity()`                           | Checks if input is valid       |
| `reportValidity()`                          | Reports validity to user       |
| `setCustomValidity(message)`                | Sets custom validation message |

### Slots

| Slot     | Description          |
| -------- | -------------------- |
| `prefix` | Content before input |
| `suffix` | Content after input  |

### Events

| Event    | Detail              | Description                                     |
| -------- | ------------------- | ----------------------------------------------- |
| `input`  | `{ value: string }` | Fired when value changes                        |
| `change` | `{ value: string }` | Fired when input loses focus after value change |
| `focus`  | -                   | Fired when input gains focus                    |
| `blur`   | -                   | Fired when input loses focus                    |

## Examples

### Form with Validation

```tsx
// React
import { useState } from "react";
import { Input, Button } from "@hidearea-design/react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector("ha-input");

    if (!input.checkValidity()) {
      setError(true);
      input.reportValidity();
      return;
    }

    console.log("Valid email:", email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        required
        error={error}
        placeholder="email@example.com"
        onInput={(e) => {
          setEmail(e.detail.value);
          setError(false);
        }}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
```

### Search Input with Icon

```html
<ha-input type="search" placeholder="Search...">
  <span slot="prefix">
    <svg><!-- search icon --></svg>
  </span>
</ha-input>
```

### Currency Input

```html
<ha-input type="number" step="0.01" min="0">
  <span slot="prefix">$</span>
  <span slot="suffix">USD</span>
</ha-input>
```

## Accessibility

- Proper ARIA attributes automatically applied
- `aria-disabled` set when disabled
- `aria-readonly` set when readonly
- `aria-required` set when required
- `aria-invalid` set when error state is active
- Label association via standard form practices
- Keyboard navigation fully supported

## Best Practices

1. **Always use labels**: Associate inputs with labels for accessibility
2. **Provide validation feedback**: Use error state with descriptive messages
3. **Use appropriate types**: Email for emails, tel for phones, etc.
4. **Set autocomplete**: Help users fill forms faster
5. **Indicate required fields**: Use required attribute and visual indicators

## Related Components

- [Button](./button.md)
- [Checkbox](./checkbox.md)
