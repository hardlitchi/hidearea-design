# Hidearea Design System - Remix Example

This example demonstrates how to integrate the Hidearea Design System into a Remix application.

## Features

- **Server-Side Rendering**: Fully SSR-compatible components
- **React Wrapper Components**: Seamless integration with Remix
- **Design Tokens**: CSS custom properties for consistent theming
- **TypeScript**: Full type safety with TypeScript
- **Remix Loaders**: Server-side data loading demonstration
- **Form Validation**: Complete form handling examples
- **Component Showcase**: All major components demonstrated

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
remix-example/
├── app/
│   ├── routes/
│   │   ├── _index.tsx        # Home page with interactive examples
│   │   ├── components.tsx    # Component showcase
│   │   ├── forms.tsx         # Form validation examples
│   │   └── loader-demo.tsx   # Remix loader demonstration
│   ├── root.tsx              # Root layout with CSS imports
│   └── styles.css            # Global styles and utilities
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Configuration

### 1. Vite Configuration

The `vite.config.ts` file includes configuration to ensure the design system packages are properly bundled for SSR:

```typescript
import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [remix()],
  ssr: {
    noExternal: [
      '@hidearea-design/core',
      '@hidearea-design/react',
      '@hidearea-design/tokens',
    ],
  },
});
```

The `ssr.noExternal` configuration ensures that the design system packages are bundled with your application rather than treated as external dependencies, which is necessary for SSR compatibility.

### 2. CSS Import

In `app/root.tsx`, the design tokens CSS is imported using Remix's `links` function:

```typescript
import tokensStyles from '@hidearea-design/tokens/css/variables?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tokensStyles },
  { rel: 'stylesheet', href: styles },
];
```

The `?url` suffix tells Vite to provide the file URL rather than its contents.

## Usage

### Basic Components

Import components from `@hidearea-design/react`:

```tsx
import { Button, Input, Alert } from '@hidearea-design/react';

function MyComponent() {
  return (
    <>
      <Button variant="primary">Click me</Button>
      <Input type="text" placeholder="Enter text..." />
      <Alert variant="success">Success message</Alert>
    </>
  );
}
```

### Using Remix Loaders

Remix loaders enable server-side data fetching before rendering:

```tsx
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: LoaderFunctionArgs) {
  const data = await fetchData();
  return json({ data });
}

export default function MyRoute() {
  const { data } = useLoaderData<typeof loader>();

  return <div>{/* Use data here */}</div>;
}
```

See `app/routes/loader-demo.tsx` for a complete example.

### Form Handling

Remix provides powerful form handling capabilities. Here's a basic example:

```tsx
import { Button, Input } from '@hidearea-design/react';
import { useState } from 'react';

export default function MyForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={formData.name}
        onInput={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
      />
      <Button type="submit" variant="primary">Submit</Button>
    </form>
  );
}
```

For a complete example with validation, see `app/routes/forms.tsx`.

## Available Components

### Buttons
- **Variants**: primary, secondary, danger, outline, ghost
- **Sizes**: small, medium, large
- **States**: default, disabled, loading

### Form Elements
- **Input**: Text, email, password, number, etc.
- **Select**: Dropdown selection
- **Checkbox**: Boolean input
- **Radio**: Single choice from options
- **Textarea**: Multi-line text input

### Feedback
- **Alert**: Info, success, warning, error messages
- **Badge**: Status indicators and labels
- **Tooltip**: Contextual help text

### Layout
- **Card**: Content containers with header/footer slots

## Design Tokens

The design system provides CSS custom properties for consistent styling:

```css
/* Colors */
var(--ha-color-primary)
var(--ha-color-background-primary)
var(--ha-color-text-primary)
var(--ha-color-border-primary)

/* Spacing */
var(--ha-spacing-1)  /* 4px */
var(--ha-spacing-2)  /* 8px */
var(--ha-spacing-4)  /* 16px */
var(--ha-spacing-8)  /* 32px */

/* Typography */
var(--ha-font-family-base)
var(--ha-font-size-base)
var(--ha-font-weight-medium)

/* Borders */
var(--ha-border-radius-sm)
var(--ha-border-radius-md)
var(--ha-border-radius-lg)

/* Shadows */
var(--ha-shadow-sm)
var(--ha-shadow-md)
var(--ha-shadow-lg)
```

## TypeScript Support

All components have full TypeScript definitions. The example uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler"
  }
}
```

## Building for Production

To build the application for production:

```bash
pnpm build
```

This creates a production-ready build in the `build/` directory.

To start the production server:

```bash
pnpm start
```

## Remix-Specific Features

### Server-Side Rendering (SSR)

The Hidearea Design System is fully compatible with Remix's SSR capabilities. Components render correctly on both server and client.

### Progressive Enhancement

Remix's progressive enhancement works seamlessly with the design system. Forms work without JavaScript, and components enhance when JavaScript loads.

### Code Splitting

Remix automatically splits code by route. The design system components are only loaded when needed.

## Troubleshooting

### Components Not Rendering

If components don't render:

1. Ensure you've imported CSS in `root.tsx`:
   ```typescript
   import tokensStyles from '@hidearea-design/tokens/css/variables?url';
   ```

2. Check that `ssr.noExternal` includes design system packages in `vite.config.ts`

3. Verify workspace dependencies are installed:
   ```bash
   pnpm install
   ```

### TypeScript Errors

If you encounter TypeScript errors:

1. Ensure `@hidearea-design/react` is properly installed
2. Check that `tsconfig.json` has `strict: true`
3. Restart your TypeScript server in your editor

### Build Errors

If the build fails:

1. Clear the `.cache` directory: `rm -rf .cache`
2. Clear the `build` directory: `rm -rf build`
3. Reinstall dependencies: `pnpm install`
4. Try building again: `pnpm build`

### Event Handler Types

For Web Component events in TypeScript, use `currentTarget` instead of `target`:

```typescript
// Correct
<Input onInput={(e) => setValue(e.currentTarget.value)} />

// Avoid
<Input onInput={(e) => setValue(e.target.value)} />
```

## Best Practices

### 1. Use Design Tokens

Always use design tokens instead of hardcoded values:

```tsx
// Good
<div style={{ padding: 'var(--ha-spacing-4)' }}>

// Avoid
<div style={{ padding: '16px' }}>
```

### 2. Leverage Server-Side Rendering

Use Remix loaders to fetch data on the server:

```tsx
export async function loader() {
  const data = await fetchData();
  return json({ data });
}
```

### 3. Type Your Forms

Define interfaces for form data and errors:

```typescript
interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}
```

### 4. Handle Validation

Implement client-side validation for better UX:

```typescript
const validateForm = (): boolean => {
  const errors: FormErrors = {};

  if (!formData.name) {
    errors.name = 'Name is required';
  }

  return Object.keys(errors).length === 0;
};
```

## Examples Included

This repository includes several examples:

1. **Home Page** (`app/routes/_index.tsx`)
   - Interactive counter with state management
   - Navigation to other examples
   - Feature overview

2. **Component Showcase** (`app/routes/components.tsx`)
   - All major components demonstrated
   - Various states and variants
   - Interactive examples

3. **Form Examples** (`app/routes/forms.tsx`)
   - Complete form with validation
   - Error handling
   - State management
   - TypeScript types

4. **Loader Demo** (`app/routes/loader-demo.tsx`)
   - Server-side data loading
   - Type-safe loaders
   - SSR demonstration

## Learn More

- [Hidearea Design System Documentation](../../README.md)
- [Remix Documentation](https://remix.run/docs)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

This example is part of the Hidearea Design System monorepo.
