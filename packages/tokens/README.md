# @hidearea-design/tokens

Design tokens for the Hidearea Design System.

## Overview

This package contains design tokens that define the visual design language of the Hidearea Design System. Tokens include colors, typography, spacing, and other design primitives.

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
  color: var(--ha-color-primary-500);
  padding: var(--ha-spacing-md);
  font-size: var(--ha-font-size-base);
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

## Development

### Build

```bash
npm run build
```

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

Current bundle sizes and budgets:

| File | Current (Gzipped) | Budget | Status |
|------|------------------|--------|--------|
| `js/index.js` | ~3 KB | 15 KB | ✓ OK |
| `css/variables.css` | ~3 KB | 20 KB | ✓ OK |
| `scss/variables.scss` | N/A | 20 KB | ✓ OK |

## Documentation

- [Performance Monitoring](./PERFORMANCE.md) - Bundle size tracking and optimization

## License

MIT
