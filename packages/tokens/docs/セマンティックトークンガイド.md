# Semantic Tokens

Comprehensive guide to the semantic design tokens in the Hidearea Design System.

## Overview

Semantic tokens provide a layer of abstraction over base design tokens, mapping design intent to specific use cases. They make it easier to maintain consistent design patterns and enable theme switching.

## Token Categories

### 1. Component Tokens

Component-specific tokens for common UI elements.

#### Button

```css
/* Primary Button */
var(--component-button-primary-background-default)
var(--component-button-primary-background-hover)
var(--component-button-primary-background-active)
var(--component-button-primary-background-disabled)
var(--component-button-primary-text-default)
var(--component-button-primary-text-disabled)
var(--component-button-primary-border-default)

/* Secondary Button */
var(--component-button-secondary-background-default)
var(--component-button-secondary-background-hover)
var(--component-button-secondary-text-default)

/* Ghost Button */
var(--component-button-ghost-background-hover)
var(--component-button-ghost-text-default)

/* Danger Button */
var(--component-button-danger-background-default)
var(--component-button-danger-text-default)
```

#### Input

```css
var(--component-input-background-default)
var(--component-input-background-disabled)
var(--component-input-background-readonly)
var(--component-input-text-default)
var(--component-input-text-placeholder)
var(--component-input-border-default)
var(--component-input-border-hover)
var(--component-input-border-focus)
var(--component-input-border-error)
var(--component-input-border-success)
```

#### Card

```css
var(--component-card-background-default)
var(--component-card-background-hover)
var(--component-card-background-selected)
var(--component-card-border-default)
var(--component-card-border-hover)
var(--component-card-border-selected)
```

#### Badge

```css
/* Available variants: primary, success, warning, error, info, neutral */
var(--component-badge-primary-background)
var(--component-badge-primary-text)
var(--component-badge-success-background)
var(--component-badge-success-text)
```

#### Alert

```css
/* Available variants: success, warning, error, info */
var(--component-alert-success-background)
var(--component-alert-success-text)
var(--component-alert-success-border)
var(--component-alert-success-icon)
```

#### Table

```css
var(--component-table-header-background)
var(--component-table-header-text)
var(--component-table-row-background-default)
var(--component-table-row-background-hover)
var(--component-table-row-background-selected)
var(--component-table-row-background-striped)
var(--component-table-border-default)
```

#### Navigation

```css
var(--component-navigation-background-default)
var(--component-navigation-background-active)
var(--component-navigation-text-default)
var(--component-navigation-text-active)
var(--component-navigation-text-hover)
```

#### Modal & Tooltip

```css
var(--component-modal-background-default)
var(--component-modal-background-overlay)
var(--component-modal-border-default)
var(--component-tooltip-background-default)
var(--component-tooltip-text-default)
```

### 2. State Tokens

Tokens for interactive states.

```css
/* Focus */
var(--state-focus-ring-color)
var(--state-focus-ring-width)
var(--state-focus-ring-offset)

/* Disabled */
var(--state-disabled-opacity)
var(--state-disabled-cursor)

/* Hover Elevation */
var(--state-hover-elevation-small)
var(--state-hover-elevation-medium)
var(--state-hover-elevation-large)

/* Active */
var(--state-active-scale)

/* Loading */
var(--state-loading-opacity)

/* Status States */
var(--state-success-color)
var(--state-success-background)
var(--state-success-border)
var(--state-warning-color)
var(--state-error-color)
var(--state-info-color)

/* Selected */
var(--state-selected-background)
var(--state-selected-border)

/* Readonly */
var(--state-readonly-background)
var(--state-readonly-cursor)
```

### 3. Surface Tokens

Tokens for different surface levels and elevations.

```css
/* Base Surfaces */
var(--surface-base-background)
var(--surface-base-elevation)
var(--surface-raised-background)
var(--surface-raised-elevation)
var(--surface-overlay-background)
var(--surface-overlay-elevation)
var(--surface-sunken-background)
var(--surface-sunken-elevation)

/* Surface Levels */
var(--surface-level-0-background)
var(--surface-level-0-elevation)
var(--surface-level-1-background)
var(--surface-level-1-elevation)
var(--surface-level-2-background)
var(--surface-level-2-elevation)
var(--surface-level-3-background)
var(--surface-level-3-elevation)

/* Interactive Surfaces */
var(--surface-interactive-default-background)
var(--surface-interactive-default-border)
var(--surface-interactive-hover-background)
var(--surface-interactive-hover-border)
var(--surface-interactive-hover-elevation)
var(--surface-interactive-active-background)
var(--surface-interactive-active-border)
```

### 4. Text & Typography Tokens

Semantic text styling for different content types.

```css
/* Headings */
var(--text-heading-h1-fontSize)
var(--text-heading-h1-fontWeight)
var(--text-heading-h1-lineHeight)
var(--text-heading-h1-color)
/* h2, h3, h4, h5, h6 follow same pattern */

/* Body Text */
var(--text-body-large-fontSize)
var(--text-body-large-lineHeight)
var(--text-body-large-color)
var(--text-body-default-fontSize)
var(--text-body-default-lineHeight)
var(--text-body-default-color)
var(--text-body-small-fontSize)
var(--text-body-small-lineHeight)
var(--text-body-small-color)

/* Caption */
var(--text-caption-fontSize)
var(--text-caption-lineHeight)
var(--text-caption-color)

/* Label */
var(--text-label-fontSize)
var(--text-label-fontWeight)
var(--text-label-lineHeight)
var(--text-label-color)

/* Helper Text */
var(--text-helper-fontSize)
var(--text-helper-lineHeight)
var(--text-helper-color)

/* Code */
var(--text-code-inline-fontSize)
var(--text-code-inline-fontFamily)
var(--text-code-inline-background)
var(--text-code-inline-color)
var(--text-code-inline-padding)
var(--text-code-inline-borderRadius)
var(--text-code-block-fontSize)
var(--text-code-block-fontFamily)
var(--text-code-block-background)
var(--text-code-block-color)
var(--text-code-block-padding)
var(--text-code-block-borderRadius)

/* Links */
var(--text-link-default-color)
var(--text-link-default-textDecoration)
var(--text-link-hover-color)
var(--text-link-visited-color)
```

### 5. Layout Tokens

Tokens for consistent layout patterns.

```css
/* Container */
var(--layout-container-maxWidth-sm)
var(--layout-container-maxWidth-md)
var(--layout-container-maxWidth-lg)
var(--layout-container-maxWidth-xl)
var(--layout-container-maxWidth-2xl)
var(--layout-container-padding-mobile)
var(--layout-container-padding-tablet)
var(--layout-container-padding-desktop)

/* Section */
var(--layout-section-padding-small)
var(--layout-section-padding-medium)
var(--layout-section-padding-large)

/* Grid */
var(--layout-grid-gap-small)
var(--layout-grid-gap-medium)
var(--layout-grid-gap-large)
var(--layout-grid-columns-mobile)
var(--layout-grid-columns-tablet)
var(--layout-grid-columns-desktop)

/* Stack (vertical spacing) */
var(--layout-stack-gap-tight)
var(--layout-stack-gap-default)
var(--layout-stack-gap-relaxed)
var(--layout-stack-gap-loose)

/* Inline (horizontal spacing) */
var(--layout-inline-gap-tight)
var(--layout-inline-gap-default)
var(--layout-inline-gap-relaxed)
```

### 6. Interaction Tokens

Tokens for animations and transitions.

```css
/* Transitions */
var(--interaction-transition-fast-duration)
var(--interaction-transition-fast-timing)
var(--interaction-transition-normal-duration)
var(--interaction-transition-normal-timing)
var(--interaction-transition-slow-duration)
var(--interaction-transition-slow-timing)

/* Animations */
var(--interaction-animation-fadeIn-duration)
var(--interaction-animation-fadeIn-timing)
var(--interaction-animation-fadeOut-duration)
var(--interaction-animation-fadeOut-timing)
var(--interaction-animation-slideIn-duration)
var(--interaction-animation-slideIn-timing)
var(--interaction-animation-slideOut-duration)
var(--interaction-animation-slideOut-timing)
var(--interaction-animation-scale-duration)
var(--interaction-animation-scale-timing)

/* Cursors */
var(--interaction-cursor-default)
var(--interaction-cursor-pointer)
var(--interaction-cursor-text)
var(--interaction-cursor-move)
var(--interaction-cursor-notAllowed)
var(--interaction-cursor-grab)
var(--interaction-cursor-grabbing)
```

## Usage Examples

### React Component

```tsx
import './styles.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={`button button--${variant}`}>
      {children}
    </button>
  );
}
```

```css
/* styles.css */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--text-body-default-fontSize);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius-md);
  transition: all var(--interaction-transition-fast-duration) var(--interaction-transition-fast-timing);
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

.button--primary:active {
  background: var(--component-button-primary-background-active);
}

.button--primary:disabled {
  background: var(--component-button-primary-background-disabled);
  color: var(--component-button-primary-text-disabled);
  cursor: var(--state-disabled-cursor);
  opacity: var(--state-disabled-opacity);
}

.button--primary:focus-visible {
  outline: var(--state-focus-ring-width) solid var(--state-focus-ring-color);
  outline-offset: var(--state-focus-ring-offset);
}
```

### Theme Switching

Semantic tokens automatically adapt to theme changes:

```html
<!-- Light theme (default) -->
<body data-theme="light">
  <button class="button button--primary">Click me</button>
</body>

<!-- Dark theme -->
<body data-theme="dark">
  <button class="button button--primary">Click me</button>
</body>
```

The button will automatically use appropriate colors for each theme without changing the component code.

## Benefits

### 1. Consistency

Semantic tokens ensure consistent design patterns across your application.

### 2. Maintainability

Changes to design can be made in one place (token definitions) and propagate throughout the application.

### 3. Theme Support

Built-in support for light/dark themes and custom themes.

### 4. Developer Experience

Descriptive token names make it clear what each token is for:
- `--component-button-primary-background-hover` is more descriptive than `--color-blue-600`
- `--text-heading-h1-fontSize` is clearer than `--font-size-4xl`

### 5. Flexibility

Semantic tokens can reference different base tokens in different themes, providing maximum flexibility.

## Best Practices

### 1. Use Semantic Tokens in Components

Always use semantic tokens in component styles instead of base tokens:

```css
/* Good ✓ */
.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
}

/* Avoid ✗ */
.card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
}
```

### 2. Choose the Right Token Category

- **Component tokens**: For specific component styling
- **State tokens**: For interactive states (hover, focus, disabled)
- **Surface tokens**: For backgrounds and elevation
- **Text tokens**: For typography
- **Layout tokens**: For spacing and layout
- **Interaction tokens**: For animations and transitions

### 3. Extend When Needed

If you need a component-specific token that doesn't exist:

```json
{
  "component": {
    "myComponent": {
      "background": {
        "default": { "value": "{color.white}" }
      }
    }
  }
}
```

### 4. Document Custom Tokens

When adding custom semantic tokens, document them with:
- Purpose
- Usage examples
- Related tokens

## Performance

The semantic token system adds approximately **6 KB gzipped** to the bundle size, well within our performance budgets:

- **CSS**: 5.22 KB gzipped (26.1% of 20 KB budget)
- **JS**: 5.11 KB gzipped (34.0% of 15 KB budget)

## Related Documentation

- [Base Tokens](./README.md) - Foundation design tokens
- [Theme System](./PERFORMANCE.md) - Theme switching and customization
- [Performance Monitoring](./PERFORMANCE.md) - Bundle size tracking

## Contributing

When adding new semantic tokens:

1. Determine the appropriate category
2. Follow existing naming conventions
3. Reference base tokens where possible
4. Add theme variants (light/dark)
5. Document the new tokens
6. Test with both themes
7. Run performance checks

```bash
npm run build
npm run perf
```
