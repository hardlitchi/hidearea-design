# Installation

## Requirements

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

## Installation Methods

### Using npm

```bash
# Install core Web Components
npm install @hidearea-design/core

# Install React wrapper
npm install @hidearea-design/react

# Install Vue wrapper
npm install @hidearea-design/vue

# Install design tokens
npm install @hidearea-design/tokens
```

### Using pnpm

```bash
pnpm add @hidearea-design/core
pnpm add @hidearea-design/react
pnpm add @hidearea-design/vue
pnpm add @hidearea-design/tokens
```

### Using yarn

```bash
yarn add @hidearea-design/core
yarn add @hidearea-design/react
yarn add @hidearea-design/vue
yarn add @hidearea-design/tokens
```

## Package Overview

### @hidearea-design/core

The core Web Components package. Works with any JavaScript framework or vanilla JS.

**Features:**

- Framework-agnostic Web Components
- Shadow DOM encapsulation
- Customizable via CSS custom properties
- Full TypeScript support
- Accessible by default (WCAG AA compliant)

### @hidearea-design/react

React wrapper components with full TypeScript support.

**Features:**

- Native React component API
- Forward refs support
- Full TypeScript definitions
- React 18+ compatible

### @hidearea-design/vue

Vue 3 wrapper components with Composition API support.

**Features:**

- Vue 3 Composition API
- v-model support
- Full TypeScript definitions
- Template type checking

### @hidearea-design/tokens

Design tokens for colors, spacing, typography, and more.

**Features:**

- CSS custom properties
- JavaScript/TypeScript exports
- Style Dictionary based
- Consistent design language

## Quick Start

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="node_modules/@hidearea-design/tokens/dist/tokens.css"
    />
  </head>
  <body>
    <ha-button variant="primary">Click me</ha-button>

    <script type="module">
      import "@hidearea-design/core";

      const button = document.querySelector("ha-button");
      button.addEventListener("click", () => {
        console.log("Button clicked!");
      });
    </script>
  </body>
</html>
```

### React

```tsx
import "@hidearea-design/tokens/dist/tokens.css";
import { Button } from "@hidearea-design/react";

function App() {
  return (
    <Button variant="primary" onClick={() => console.log("Clicked!")}>
      Click me
    </Button>
  );
}

export default App;
```

### Vue 3

```vue
<template>
  <HaButton variant="primary" @click="handleClick"> Click me </HaButton>
</template>

<script setup lang="ts">
import "@hidearea-design/tokens/dist/tokens.css";
import { HaButton } from "@hidearea-design/vue";

const handleClick = () => {
  console.log("Clicked!");
};
</script>
```

## CSS Setup

Import the design tokens CSS in your application:

```js
// In your main entry file
import "@hidearea-design/tokens/dist/tokens.css";
```

Or link it in your HTML:

```html
<link rel="stylesheet" href="path/to/@hidearea-design/tokens/dist/tokens.css" />
```

## TypeScript Configuration

If using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "types": [
      "@hidearea-design/core",
      "@hidearea-design/react",
      "@hidearea-design/vue"
    ]
  }
}
```

## Next Steps

- [Component API Reference](../components/README.md)
- [Usage Examples](../guides/examples.md)
- [Customization Guide](../guides/customization.md)
- [Accessibility Guide](../guides/accessibility.md)
