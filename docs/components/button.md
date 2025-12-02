# Button

A versatile button component with multiple variants and states.

## Import

```js
// Web Component
import "@hidearea-design/core";

// React
import { Button } from "@hidearea-design/react";

// Vue
import { HaButton } from "@hidearea-design/vue";
```

## Basic Usage

### Vanilla JavaScript

```html
<ha-button variant="primary">Click me</ha-button>
```

### React

```tsx
<Button variant="primary">Click me</Button>
```

### Vue

```vue
<HaButton variant="primary">Click me</HaButton>
```

## Variants

The button component supports 5 visual variants:

```html
<ha-button variant="primary">Primary</ha-button>
<ha-button variant="secondary">Secondary</ha-button>
<ha-button variant="outline">Outline</ha-button>
<ha-button variant="ghost">Ghost</ha-button>
<ha-button variant="danger">Danger</ha-button>
```

## Sizes

Three size options are available:

```html
<ha-button size="sm">Small</ha-button>
<ha-button size="md">Medium</ha-button>
<ha-button size="lg">Large</ha-button>
```

## States

### Disabled

```html
<ha-button disabled>Disabled</ha-button>
```

### Loading

```html
<ha-button loading>Loading...</ha-button>
```

### Full Width

```html
<ha-button full-width>Full Width Button</ha-button>
```

## Button Types

```html
<ha-button type="button">Button</ha-button>
<ha-button type="submit">Submit</ha-button>
<ha-button type="reset">Reset</ha-button>
```

## Events

### Click Event

```js
// Vanilla JS
const button = document.querySelector('ha-button');
button.addEventListener('click', (event) => {
  console.log('Button clicked', event.detail);
});

// React
<Button onClick={(event) => console.log('Clicked')}>
  Click me
</Button>

// Vue
<HaButton @click="handleClick">Click me</HaButton>
```

## API Reference

### Properties

| Property    | Type                                                           | Default     | Description          |
| ----------- | -------------------------------------------------------------- | ----------- | -------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant |
| `size`      | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Button size          |
| `disabled`  | `boolean`                                                      | `false`     | Disabled state       |
| `loading`   | `boolean`                                                      | `false`     | Loading state        |
| `fullWidth` | `boolean`                                                      | `false`     | Full width button    |
| `type`      | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | Button type          |

### Methods

| Method    | Description                   |
| --------- | ----------------------------- |
| `focus()` | Focuses the button            |
| `blur()`  | Removes focus from the button |

### Slots

| Slot      | Description    |
| --------- | -------------- |
| (default) | Button content |

### CSS Custom Properties

| Property                    | Default          | Description           |
| --------------------------- | ---------------- | --------------------- |
| `--ha-button-padding-sm`    | `0.5rem 1rem`    | Small button padding  |
| `--ha-button-padding-md`    | `0.75rem 1.5rem` | Medium button padding |
| `--ha-button-padding-lg`    | `1rem 2rem`      | Large button padding  |
| `--ha-button-border-radius` | `0.375rem`       | Button border radius  |
| `--ha-button-transition`    | `all 0.2s ease`  | Transition effect     |

## Examples

### With Icon

```html
<ha-button variant="primary">
  <svg>...</svg>
  Click me
</ha-button>
```

### Form Submit Button

```html
<form>
  <ha-input name="email" type="email"></ha-input>
  <ha-button type="submit" variant="primary">Submit</ha-button>
</form>
```

### Loading State

```tsx
// React
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  await someAsyncOperation();
  setLoading(false);
};

<Button loading={loading} onClick={handleClick}>
  Save Changes
</Button>;
```

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation (Enter and Space keys)
- Proper ARIA attributes automatically applied
- `aria-disabled` set when disabled
- `aria-busy` set when loading
- Focus management built-in

## Best Practices

1. **Use appropriate variants**: Primary for main actions, secondary for less important actions
2. **Loading states**: Show loading state during async operations
3. **Disabled state**: Disable buttons that cannot be clicked
4. **Button text**: Use clear, action-oriented text
5. **Icon usage**: Place icons before text for better readability

## Related Components

- [Input](./input.md)
- [Checkbox](./checkbox.md)
