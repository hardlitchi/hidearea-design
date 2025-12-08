# @hidearea-design/tokens

Design tokens for the Hidearea Design System.

## Overview

This package contains design tokens that define the visual design language of the Hidearea Design System. It includes both **base tokens** (foundational values) and **semantic tokens** (context-specific values).

## Installation

```bash
npm install @hidearea-design/tokens
```

## Usage

### JavaScript/TypeScript

```javascript

import { colors, spacing, typography } from '@hidearea-design/tokens';

console.log(colors.primary[500]); // #3B82F6
console.log(spacing.md); // 16px
console.log(typography.fontSize.base); // 16px
```

### CSS

```css
@import '@hidearea-design/tokens/css';

.my-element {
  /* Base tokens */
  color: var(--color-primary-500);
  padding: var(--spacing-4);
  font-size: var(--font-size-base);

  /* Semantic tokens */
  background: var(--component-button-primary-background-default);
  border: 1px solid var(--component-button-primary-border-default);
}

.my-element:hover {
  background: var(--component-button-primary-background-hover);
}
```

### SCSS

```scss
@import '@hidearea-design/tokens/scss';

.my-element {
  color: $ha-color-primary-500;
  padding: $ha-spacing-md;
  font-size: $ha-font-size-base;
}
```

## Available Tokens

- **Colors**: Primary, secondary, neutral, semantic colors
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Consistent spacing scale
- **Borders**: Border widths, radii
- **Shadows**: Box shadows for depth
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering scale
- **Animations**: Timing functions and durations

  color: $color-primary-500;
  padding: $spacing-4;
  font-size: $font-size-base;
}
```

## Token Categories

### Base Tokens

Foundation design tokens that define the core visual language:

- **Colors**: Primary, secondary, neutral, semantic colors (blue, gray, red, etc.)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Consistent spacing scale (0-96)
- **Borders**: Border widths, radii
- **Shadows**: Box shadows for depth
- **Breakpoints**: Responsive design breakpoints
- **Animations**: Timing functions and durations

### Semantic Tokens

Context-specific tokens that map design intent to specific use cases:

- **Component Tokens**: Button, Input, Card, Badge, Alert, Table, Navigation, Modal, Tooltip
- **State Tokens**: Focus, hover, disabled, loading, success, warning, error
- **Surface Tokens**: Base, raised, overlay, sunken, interactive
- **Text Tokens**: Headings (h1-h6), body, caption, label, helper, code, links
- **Layout Tokens**: Container, section, grid, stack, inline
- **Interaction Tokens**: Transitions, animations, cursors

See [SEMANTIC-TOKENS.md](./SEMANTIC-TOKENS.md) for complete documentation.

## Theme Support

Tokens automatically adapt to light and dark themes:

```html
<!-- Light theme (default) -->
<body data-theme="light">
  <button class="button-primary">Click me</button>
</body>

<!-- Dark theme -->
<body data-theme="dark">
  <button class="button-primary">Click me</button>
</body>
```

Components using semantic tokens will automatically update their appearance.

## Development

### Build

```bash
npm run build
```

### Automated Deployment

Design tokens are automatically deployed when changes are merged to main:

```bash
# Detect changes locally
npm run changes

# JSON/Markdown output
npm run changes:json
npm run changes:markdown
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete documentation.

### Figma Token Synchronization

Sync design tokens between Figma and Style Dictionary:

```bash
# Sync from Figma API (Enterprise accounts)
npm run figma:sync

# Import from Figma Variables JSON export
npm run figma:import path/to/figma-export.json

# Validate token structure
npm run figma:validate
```

See [FIGMA-SYNC.md](./FIGMA-SYNC.md) for complete documentation on:
- Setup and configuration
- Figma API integration
- Token transformation
- Workflow automation
- Troubleshooting

### Performance Monitoring

This package includes comprehensive performance monitoring to ensure optimal bundle sizes.

```bash
# Measure bundle sizes
npm run perf:bundle

# Generate performance report
npm run perf:report

# Run both
npm run perf
```

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed documentation on performance monitoring, budgets, and best practices.

## Performance Budgets

Current bundle sizes (with semantic tokens):

| File | Current (Gzipped) | Budget | Usage | Status |
|------|------------------|--------|-------|--------|
| `js/index.js` | 5.11 KB | 15 KB | 34.0% | ✓ OK |
| `css/variables.css` | 5.22 KB | 20 KB | 26.1% | ✓ OK |
| `scss/variables.scss` | N/A | 20 KB | N/A | ✓ OK |

**Performance Score**: 161/100 (🟢 Excellent)

## Documentation

- **[SEMANTIC-TOKENS.md](./SEMANTIC-TOKENS.md)** - Comprehensive semantic tokens guide
- **[PERFORMANCE.md](./PERFORMANCE.md)** - Performance monitoring and optimization
- **[FIGMA-SYNC.md](./FIGMA-SYNC.md)** - Figma token synchronization guide

## Best Practices

### 1. Prefer Semantic Tokens

Use semantic tokens in component styles for better maintainability and theme support:

```css
/* Good ✓ */
.button {
  background: var(--component-button-primary-background-default);
}

/* Avoid ✗ */
.button {
  background: var(--color-blue-500);
}
```

### 2. Use Theme-Aware Tokens

Semantic tokens automatically adapt to themes, reducing code duplication:

```css
/* Automatically works with light/dark themes */
.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
}
```

### 3. Layer Your Tokens

Build a hierarchy from base → semantic → component-specific:

```css
/* Base token */
--color-blue-500: #3B82F6;

/* Semantic token references base */
--component-button-primary-background-default: var(--color-primary-500);

/* Component uses semantic */
.button-primary {
  background: var(--component-button-primary-background-default);
}
```

## Examples

### Button Component

```css
.button {
  /* Layout */
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius-md);

  /* Typography */
  font-size: var(--text-body-default-fontSize);
  font-weight: var(--font-weight-medium);

  /* Interaction */
  transition: all var(--interaction-transition-fast-duration);
  cursor: var(--interaction-cursor-pointer);
}

.button--primary {
  background: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  border: 1px solid var(--component-button-primary-border-default);
}

.button--primary:hover {
  background: var(--component-button-primary-background-hover);
}

.button--primary:focus-visible {
  outline: var(--state-focus-ring-width) solid var(--state-focus-ring-color);
  outline-offset: var(--state-focus-ring-offset);
}

.button--primary:disabled {
  background: var(--component-button-primary-background-disabled);
  opacity: var(--state-disabled-opacity);
  cursor: var(--state-disabled-cursor);
}
```

### Card Component

```css
.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--surface-raised-elevation);
  transition: all var(--interaction-transition-normal-duration);
}

.card:hover {
  background: var(--component-card-background-hover);
  border-color: var(--component-card-border-hover);
  box-shadow: var(--state-hover-elevation-medium);
}

.card--selected {
  background: var(--component-card-background-selected);
  border-color: var(--component-card-border-selected);
}
```

## Token Structure

```
tokens/
├── src/
│   ├── base/              # Base tokens (YAML)
│   │   ├── colors.yaml
│   │   ├── typography.yaml
│   │   ├── spacing.yaml
│   │   └── ...
│   ├── semantic/          # Semantic tokens (JSON)
│   │   ├── components.json
│   │   ├── states.json
│   │   ├── surfaces.json
│   │   ├── typography.json
│   │   ├── layout.json
│   │   ├── interactions.json
│   │   └── aliases.json
│   └── themes/            # Theme overrides
│       ├── light/
│       │   ├── colors.json
│       │   └── semantic.json
│       └── dark/
│           ├── colors.json
│           └── semantic.json
├── build/                 # Generated output
│   ├── css/
│   ├── js/
│   └── ts/
└── .performance/          # Performance reports
```

## Contributing

When adding new tokens:

1. Determine if it should be a base or semantic token
2. Follow existing naming conventions
3. Add theme variants (light/dark) if needed
4. Update documentation
5. Run build and performance checks

```bash
npm run build
npm run perf
```

## License

MIT
