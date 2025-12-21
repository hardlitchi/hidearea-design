# Hidearea Design System - Nuxt.js Example

This example demonstrates how to integrate Hidearea Design System into a Nuxt.js application with Vue 3 and the Composition API.

## Features

- ✅ Nuxt.js 3 with Vue 3
- ✅ TypeScript support with strict mode
- ✅ Hidearea Design System integration
- ✅ Vue wrapper components (via @hidearea-design/vue)
- ✅ Design tokens (CSS custom properties)
- ✅ SSR compatible Web Components
- ✅ Multiple example pages

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

From the root of the monorepo:

```bash
pnpm install
```

### Development

Run the development server:

```bash
cd examples/nuxtjs-example
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
pnpm build
```

### Generate Static Site

Generate a static site:

```bash
pnpm generate
```

### Preview

Preview the production build:

```bash
pnpm preview
```

## Project Structure

```
nuxtjs-example/
├── assets/
│   └── css/
│       └── main.css          # Global styles and utilities
├── pages/
│   ├── index.vue             # Home page with button examples
│   ├── components.vue        # Component showcase page
│   └── forms.vue             # Form examples with validation
├── app.vue                   # Root component
├── nuxt.config.ts            # Nuxt configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Integration Details

### 1. Installing Dependencies

The example uses workspace dependencies from the monorepo:

```json
{
  "dependencies": {
    "@hidearea-design/core": "workspace:*",
    "@hidearea-design/vue": "workspace:*",
    "@hidearea-design/tokens": "workspace:*"
  }
}
```

For a standalone project, install from npm:

```bash
npm install @hidearea-design/core @hidearea-design/vue @hidearea-design/tokens
```

### 2. Nuxt Configuration

Configure Nuxt.js to import design tokens and optimize dependencies in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  css: [
    '@hidearea-design/tokens/css/variables',
    '~/assets/css/main.css',
  ],

  vite: {
    optimizeDeps: {
      include: [
        '@hidearea-design/core',
        '@hidearea-design/vue',
        '@hidearea-design/tokens',
      ],
    },
  },
});
```

### 3. Importing Web Components

Import Web Components globally in `app.vue`:

```vue
<script setup lang="ts">
import '@hidearea-design/core';
</script>
```

### 4. Using Components in Pages

Use Web Components directly in your Vue templates:

```vue
<template>
  <div>
    <ha-button variant="primary" @click="handleClick">
      Click Me
    </ha-button>
    <ha-input
      placeholder="Enter text..."
      :value="inputValue"
      @input="inputValue = ($event.target as HTMLInputElement).value"
    />
  </div>
</template>

<script setup lang="ts">
const inputValue = ref('');

const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

### 5. Using Design Tokens

Access design tokens via CSS custom properties:

```vue
<template>
  <div :style="{
    padding: 'var(--ha-spacing-4)',
    backgroundColor: 'var(--ha-color-background-secondary)',
    borderRadius: 'var(--ha-border-radius-md)',
    color: 'var(--ha-color-text-primary)'
  }">
    Content styled with design tokens
  </div>
</template>
```

## Available Pages

- **Home** (`/`) - Introduction and button examples with Composition API
- **Components** (`/components`) - Showcase of various components (alerts, badges, cards, form controls, tooltips)
- **Forms** (`/forms`) - Complete form example with validation

## Design Tokens

The design system provides comprehensive design tokens for:

- **Colors**: Primary, secondary, success, danger, warning, backgrounds, text, borders
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl, etc.)
- **Typography**: Font sizes, weights, line heights, font families
- **Border Radius**: Consistent corner rounding
- **Shadows**: Elevation levels
- **Z-index**: Layering system
- **Breakpoints**: Responsive design utilities

Example usage:

```css
.my-element {
  padding: var(--ha-spacing-4);
  font-size: var(--ha-font-size-lg);
  color: var(--ha-color-text-primary);
  background-color: var(--ha-color-background-secondary);
  border-radius: var(--ha-border-radius-md);
  box-shadow: var(--ha-shadow-md);
}
```

## Component Library

All 37 components from Hidearea Design System are available:

### Form Components
- Button, Input, Textarea, Select, Checkbox, Radio, Switch
- DatePicker, TimePicker, ColorPicker, FileUpload
- FormGroup

### Display Components
- Card, Badge, Alert, Avatar, Chip, Skeleton
- Tooltip, Popover, Modal, Drawer

### Navigation Components
- Tabs, Breadcrumb, Pagination, Menu

### Data Components
- Table, DataGrid, List

### Layout Components
- Container, Grid, Stack, Divider

### Feedback Components
- Toast, Progress, Spinner, Loading

### Other Components
- Accordion, Carousel, ThemeSwitcher

## TypeScript Support

All components work seamlessly with TypeScript. Type casting may be needed for event targets:

```vue
<script setup lang="ts">
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
};
</script>
```

## Best Practices

### 1. Use Design Tokens

Always prefer design tokens over hard-coded values:

```vue
<!-- ✅ Good -->
<div :style="{ padding: 'var(--ha-spacing-4)' }">

<!-- ❌ Avoid -->
<div :style="{ padding: '16px' }">
```

### 2. Composition API

Leverage Vue 3's Composition API for reactive state:

```vue
<script setup lang="ts">
const count = ref(0);
const increment = () => count.value++;
</script>
```

### 3. SSR Considerations

Web Components work with Nuxt's SSR. The components are registered globally in `app.vue` and work on both server and client.

### 4. Responsive Design

Use design tokens and CSS media queries:

```css
.container {
  padding: var(--ha-spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--ha-spacing-6);
  }
}
```

## Performance Optimization

The design system is optimized for Nuxt.js:

- **Tree-shaking**: Only imported components are bundled
- **CSS optimization**: Minimal CSS bundle size
- **SSR compatible**: Web Components work with server-side rendering
- **Code splitting**: Automatic code splitting per page
- **Vite optimization**: Dependencies properly optimized in vite config

## Troubleshooting

### Components not rendering

Make sure you've:
1. Imported `@hidearea-design/core` in `app.vue`
2. Added CSS imports in `nuxt.config.ts`
3. Included packages in `vite.optimizeDeps`

### Styles not applying

Ensure the CSS imports are in the correct order in `nuxt.config.ts`:

```typescript
css: [
  '@hidearea-design/tokens/css/variables',  // Tokens first
  '~/assets/css/main.css',                  // Then your styles
],
```

### TypeScript errors

Make sure all dependencies are installed:

```bash
pnpm install
```

Run Nuxt's TypeScript preparation:

```bash
pnpm postinstall
```

### SSR Hydration Issues

If you encounter hydration mismatches, ensure Web Components are imported globally in `app.vue`, not in individual pages.

## Learn More

- [Hidearea Design System Documentation](../../packages/docs)
- [Nuxt.js Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## License

MIT
