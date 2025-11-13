# @hidearea-design/core

Web Components core library for hidearea-design system.

## Installation

```bash
npm install @hidearea-design/core @hidearea-design/tokens
```

## Usage

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/@hidearea-design/tokens/build/css/variables.css">
</head>
<body>
  <ha-button variant="primary" size="md">Click me</ha-button>

  <script type="module">
    import '@hidearea-design/core';

    const button = document.querySelector('ha-button');
    button.addEventListener('click', () => {
      console.log('Button clicked!');
    });
  </script>
</body>
</html>
```

## Components

### Button

A customizable button component with multiple variants and sizes.

#### Attributes

- `variant` - Button style: `primary`, `secondary`, `outline`, `ghost`, `danger` (default: `primary`)
- `size` - Button size: `sm`, `md`, `lg` (default: `md`)
- `disabled` - Disabled state (boolean)
- `loading` - Loading state with spinner (boolean)
- `full-width` - Full width button (boolean)
- `type` - Button type: `button`, `submit`, `reset` (default: `button`)

#### Examples

```html
<!-- Primary button -->
<ha-button variant="primary">Primary</ha-button>

<!-- Secondary button -->
<ha-button variant="secondary">Secondary</ha-button>

<!-- Outline button -->
<ha-button variant="outline">Outline</ha-button>

<!-- Ghost button -->
<ha-button variant="ghost">Ghost</ha-button>

<!-- Danger button -->
<ha-button variant="danger">Danger</ha-button>

<!-- Small button -->
<ha-button size="sm">Small</ha-button>

<!-- Large button -->
<ha-button size="lg">Large</ha-button>

<!-- Disabled button -->
<ha-button disabled>Disabled</ha-button>

<!-- Loading button -->
<ha-button loading>Loading</ha-button>

<!-- Full width button -->
<ha-button full-width>Full Width</ha-button>
```

#### JavaScript API

```javascript
const button = document.querySelector('ha-button');

// Properties
button.variant = 'secondary';
button.size = 'lg';
button.disabled = true;
button.loading = true;
button.fullWidth = true;

// Methods
button.focus();
button.blur();

// Events
button.addEventListener('click', (e) => {
  console.log('Clicked!', e.detail);
});
```

## CSS Custom Properties

All components use CSS custom properties from `@hidearea-design/tokens`. You can customize them:

```css
:root {
  --theme-light-primary-default: #your-color;
  --theme-light-primary-hover: #your-hover-color;
  /* ... */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
