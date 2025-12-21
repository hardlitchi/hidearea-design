# Hidearea Design System - Next.js Example

This example demonstrates how to integrate Hidearea Design System into a Next.js application using the App Router.

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript support
- ✅ Hidearea Design System integration
- ✅ React wrapper components
- ✅ Design tokens (CSS custom properties)
- ✅ Server-side rendering compatible
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
cd examples/nextjs-example
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## Project Structure

```
nextjs-example/
├── app/
│   ├── layout.tsx          # Root layout with Hidearea Design System CSS
│   ├── page.tsx            # Home page with button examples
│   ├── components/         # Component showcase page
│   │   └── page.tsx
│   ├── forms/              # Form examples with validation
│   │   └── page.tsx
│   └── globals.css         # Global styles and design tokens import
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## Integration Details

### 1. Installing Dependencies

The example uses workspace dependencies from the monorepo:

```json
{
  "dependencies": {
    "@hidearea-design/core": "workspace:*",
    "@hidearea-design/react": "workspace:*",
    "@hidearea-design/tokens": "workspace:*"
  }
}
```

For a standalone project, install from npm:

```bash
npm install @hidearea-design/core @hidearea-design/react @hidearea-design/tokens
```

### 2. Next.js Configuration

Configure Next.js to transpile the design system packages in `next.config.ts`:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@hidearea-design/core',
    '@hidearea-design/react',
    '@hidearea-design/tokens',
  ],
};

export default nextConfig;
```

### 3. Importing Styles

Import design tokens in `app/globals.css`:

```css
/* Import Hidearea Design System tokens */
@import '@hidearea-design/tokens/css/variables';
```

**Note**: Component styles are automatically included with Web Components via Shadow DOM.

### 4. Using Components

Import and use React wrapper components:

```tsx
'use client';

import { Button, Input, Card } from '@hidearea-design/react';

export default function MyPage() {
  return (
    <div>
      <Button variant="primary">Click Me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

**Note**: Components use client-side interactivity, so you need the `'use client'` directive.

### 5. Using Design Tokens

Access design tokens via CSS custom properties:

```tsx
<div style={{
  padding: 'var(--ha-spacing-4)',
  backgroundColor: 'var(--ha-color-background-secondary)',
  borderRadius: 'var(--ha-border-radius-md)',
  color: 'var(--ha-color-text-primary)'
}}>
  Content styled with design tokens
</div>
```

## Available Pages

- **Home** (`/`) - Introduction and button examples
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

All components are fully typed with TypeScript. You get:

- Type-safe props
- IntelliSense in your IDE
- Compile-time error checking

```tsx
import { Button } from '@hidearea-design/react';

// TypeScript will autocomplete variant options
<Button variant="primary" size="md">
  Click Me
</Button>
```

## Best Practices

### 1. Use Design Tokens

Always prefer design tokens over hard-coded values:

```tsx
// ✅ Good
<div style={{ padding: 'var(--ha-spacing-4)' }}>

// ❌ Avoid
<div style={{ padding: '16px' }}>
```

### 2. Client Components

Components with interactivity need the `'use client'` directive:

```tsx
'use client';

import { Button } from '@hidearea-design/react';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  // ...
}
```

### 3. Server Components

For static content, use Server Components (default in Next.js App Router):

```tsx
// No 'use client' directive needed
export default function StaticPage() {
  return (
    <div style={{
      padding: 'var(--ha-spacing-4)',
      color: 'var(--ha-color-text-primary)'
    }}>
      Static content using design tokens
    </div>
  );
}
```

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

The design system is optimized for Next.js:

- **Tree-shaking**: Only imported components are bundled
- **CSS optimization**: Minimal CSS bundle size
- **Code splitting**: Automatic code splitting per page

## Known Limitations

### Static Export / SSR

Web Components require the browser's `HTMLElement` API, which is not available during server-side rendering or static site generation. This example is configured with `output: 'export'` for static HTML generation, but **production builds are currently not supported** due to this limitation.

**Workaround**: Use the development server only:

```bash
pnpm dev
```

For production use cases:
- Consider using a framework with client-side rendering only (Vite, Create React App)
- Wait for enhanced Web Components SSR support in Next.js
- Use React-only components instead of Web Components wrappers

## Troubleshooting

### Components not rendering

Make sure you've:
1. Imported the CSS in `globals.css`
2. Added `transpilePackages` in `next.config.ts`
3. Used `'use client'` for interactive components

### Styles not applying

Ensure the CSS imports are in the correct order:

```css
/* Tokens first */
@import '@hidearea-design/tokens/dist/css/variables.css';

/* Then component styles */
@import '@hidearea-design/core/dist/hidearea-design.css';
```

### TypeScript errors

Make sure all dependencies are installed:

```bash
pnpm install
```

## Learn More

- [Hidearea Design System Documentation](../../packages/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## License

MIT
