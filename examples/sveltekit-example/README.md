# Hidearea Design System - SvelteKit Example

This example demonstrates how to integrate the Hidearea Design System into a SvelteKit application with Svelte 5.

## Features

- **Svelte 5 Runes**: Modern reactive state management with `$state`, `$props`, `$derived`
- **Server-Side Rendering**: Fully SSR-compatible components
- **Web Components**: Native browser Web Components with Lit
- **Design Tokens**: CSS custom properties for consistent theming
- **TypeScript**: Full type safety with TypeScript and SvelteKit's generated types
- **Load Functions**: Server-side data loading demonstration
- **Form Validation**: Complete form handling examples

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
sveltekit-example/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte       # Root layout with Web Components import
│   │   ├── +page.svelte         # Home page with interactive examples
│   │   ├── components/
│   │   │   └── +page.svelte     # Component showcase
│   │   ├── forms/
│   │   │   └── +page.svelte     # Form validation examples
│   │   └── load-demo/
│   │       ├── +page.ts         # Load function
│   │       └── +page.svelte     # Load function demonstration
│   ├── app.html                 # HTML template
│   └── app.css                  # Global styles and design tokens
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

## Configuration

### 1. Vite Configuration

The `vite.config.ts` file includes configuration to ensure the design system packages are properly bundled for SSR:

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@hidearea-design/core', '@hidearea-design/tokens']
	},
	optimizeDeps: {
		include: ['@hidearea-design/core', '@hidearea-design/tokens']
	}
});
```

The `ssr.noExternal` configuration ensures that the design system packages are bundled with your application for SSR compatibility.

### 2. CSS Import

In `src/app.css`, the design tokens CSS is imported:

```css
@import '@hidearea-design/tokens/css/variables';
```

This makes all design tokens available as CSS custom properties throughout your application.

### 3. Web Components Import

In `src/routes/+layout.svelte`, Web Components are imported on the client side:

```svelte
<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	// Import Web Components on client side only
	onMount(async () => {
		await import('@hidearea-design/core');
	});
</script>

<slot />
```

This ensures Web Components are only loaded in the browser, avoiding SSR issues.

## Usage

### Basic Components

Use Web Components directly in your Svelte templates:

```svelte
<script lang="ts">
	let count = $state(0);
</script>

<ha-button variant="primary" onclick={() => count++}>
	Increment
</ha-button>

<ha-input
	type="text"
	placeholder="Enter text..."
	oninput={(e) => value = e.target.value}
/>

<ha-alert variant="success">
	Success message
</ha-alert>
```

### Svelte 5 Runes

This example uses Svelte 5's new runes for state management:

```svelte
<script lang="ts">
	// Reactive state
	let count = $state(0);

	// Props (for components)
	let { data } = $props();

	// Derived state
	let doubled = $derived(count * 2);
</script>
```

### Using Load Functions

SvelteKit load functions enable server-side data fetching before rendering:

```typescript
// src/routes/users/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const data = await fetchData();
	return { data };
};
```

```svelte
<!-- src/routes/users/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#each data.users as user}
		<ha-card>
			<h3>{user.name}</h3>
		</ha-card>
	{/each}
</div>
```

See `src/routes/load-demo/` for a complete example.

### Form Handling

Forms in SvelteKit can use Svelte 5 runes for reactive state:

```svelte
<script lang="ts">
	let formData = $state({ name: '', email: '' });

	function handleSubmit(e: Event) {
		e.preventDefault();
		// Handle form submission
	}
</script>

<form onsubmit={handleSubmit}>
	<ha-input
		type="text"
		value={formData.name}
		oninput={(e) => formData.name = (e.target as HTMLInputElement).value}
	/>
	<ha-button type="submit" variant="primary">Submit</ha-button>
</form>
```

For a complete example with validation, see `src/routes/forms/+page.svelte`.

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
		"moduleResolution": "bundler"
	}
}
```

SvelteKit also generates TypeScript types for your routes in `.svelte-kit/types/`.

## Building for Production

To build the application for production:

```bash
pnpm build
```

This creates a production-ready build in the `build/` directory.

To preview the production build:

```bash
pnpm preview
```

## SvelteKit-Specific Features

### Server-Side Rendering (SSR)

The Hidearea Design System is compatible with SvelteKit's SSR. Web Components are loaded client-side only using `onMount`.

### Load Functions

SvelteKit's load functions (both universal and server-side) work seamlessly with the design system. Data is fetched before rendering.

### Progressive Enhancement

Forms work without JavaScript, and components enhance when JavaScript loads.

### Code Splitting

SvelteKit automatically splits code by route. The design system components are only loaded when needed.

### Type Generation

SvelteKit generates TypeScript types for your routes, providing type-safe access to page data.

## Troubleshooting

### Components Not Rendering

If components don't render:

1. Ensure Web Components are imported in `+layout.svelte`:
   ```svelte
   onMount(async () => {
     await import('@hidearea-design/core');
   });
   ```

2. Check that CSS is imported in `app.css`:
   ```css
   @import '@hidearea-design/tokens/css/variables';
   ```

3. Verify `ssr.noExternal` includes design system packages in `vite.config.ts`

4. Verify workspace dependencies are installed:
   ```bash
   pnpm install
   ```

### TypeScript Errors

If you encounter TypeScript errors:

1. Ensure `@hidearea-design/core` is properly installed
2. Run `pnpm check` to verify types
3. Check that generated types exist in `.svelte-kit/types/`
4. Restart your TypeScript server in your editor

### Build Errors

If the build fails:

1. Clear the `.svelte-kit` directory: `rm -rf .svelte-kit`
2. Clear the `build` directory: `rm -rf build`
3. Reinstall dependencies: `pnpm install`
4. Try building again: `pnpm build`

### Event Handler Types

For Web Component events in TypeScript, use type casting:

```svelte
<ha-input
	oninput={(e: Event) => value = (e.target as HTMLInputElement).value}
/>
```

## Best Practices

### 1. Use Design Tokens

Always use design tokens instead of hardcoded values:

```svelte
<!-- Good -->
<div style="padding: var(--ha-spacing-4);">

<!-- Avoid -->
<div style="padding: 16px;">
```

### 2. Leverage Load Functions

Use load functions to fetch data before rendering:

```typescript
export const load: PageLoad = async () => {
	const data = await fetchData();
	return { data };
};
```

### 3. Use Svelte 5 Runes

Prefer Svelte 5 runes over older patterns:

```svelte
<!-- Good: Svelte 5 runes -->
<script lang="ts">
	let count = $state(0);
</script>

<!-- Old: Svelte 4 pattern -->
<script lang="ts">
	let count = 0;
</script>
```

### 4. Type Your Forms

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

### 5. Handle Validation

Implement client-side validation for better UX:

```typescript
function validateForm(): boolean {
	const errors: FormErrors = {};

	if (!formData.name) {
		errors.name = 'Name is required';
	}

	return Object.keys(errors).length === 0;
}
```

## Svelte 5 Features Used

This example showcases Svelte 5's new features:

### Runes
- `$state` - Reactive state
- `$props` - Component props
- `$derived` - Derived state

### Syntax
- `{#each items as item (key)}` - Keyed each blocks
- `{#if condition}` - Conditional rendering
- `bind:value` - Two-way binding

## Examples Included

This repository includes several examples:

1. **Home Page** (`src/routes/+page.svelte`)
   - Interactive counter with Svelte 5 runes
   - Navigation to other examples
   - Feature overview

2. **Component Showcase** (`src/routes/components/+page.svelte`)
   - All major components demonstrated
   - Various states and variants
   - Interactive examples

3. **Form Examples** (`src/routes/forms/+page.svelte`)
   - Complete form with validation
   - Error handling
   - State management with Svelte 5 runes
   - TypeScript types

4. **Load Demo** (`src/routes/load-demo/`)
   - Server-side data loading
   - Type-safe load functions
   - SvelteKit generated types

## Learn More

- [Hidearea Design System Documentation](../../README.md)
- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Svelte 5 Documentation](https://svelte.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

This example is part of the Hidearea Design System monorepo.
