# Design Tokens

Hidearea Design System uses a comprehensive design token system to maintain consistency across all components and enable easy theming.

## Table of Contents

- [Overview](#overview)
- [Token Architecture](#token-architecture)
- [Color Tokens](#color-tokens)
- [Spacing Tokens](#spacing-tokens)
- [Typography Tokens](#typography-tokens)
- [Border & Shadow Tokens](#border--shadow-tokens)
- [Animation Tokens](#animation-tokens)
- [Semantic Tokens](#semantic-tokens)
- [Component Tokens](#component-tokens)
- [Using Tokens](#using-tokens)
- [Custom Theming](#custom-theming)

---

## Overview

Design tokens are named entities that store visual design attributes. They provide a single source of truth for design decisions and enable consistent styling across the entire design system.

### Benefits

- **Consistency**: Unified visual language
- **Maintainability**: Update values in one place
- **Theming**: Easy light/dark mode switching
- **Scalability**: Add new themes without changing components
- **Type Safety**: CSS custom properties with fallbacks

### Token Levels

Hidearea Design uses a three-tier token architecture:

1. **Base Tokens**: Raw values (colors, sizes)
2. **Semantic Tokens**: Purpose-based tokens (primary, background)
3. **Component Tokens**: Component-specific tokens (button-background)

---

## Token Architecture

### Base Tokens
Raw, primitive values:
```css
--color-blue-500: #3b82f6;
--spacing-4: 1rem;
--font-size-base: 16px;
```

### Semantic Tokens
Purpose-based, reference base tokens:
```css
--color-primary: var(--color-blue-600);
--color-background-surface: var(--color-white);
--spacing-md: var(--spacing-4);
```

### Component Tokens
Component-specific, reference semantic tokens:
```css
--component-button-primary-background: var(--color-primary);
--component-button-padding: var(--spacing-md);
```

---

## Color Tokens

### Base Color Palette

Complete color scales from 50 (lightest) to 900 (darkest):

#### Gray Scale
```css
--color-gray-50: #fafafa;   /* Lightest */
--color-gray-100: #f5f5f5;
--color-gray-200: #e5e5e5;
--color-gray-300: #d4d4d4;
--color-gray-400: #a3a3a3;
--color-gray-500: #737373;  /* Mid-tone */
--color-gray-600: #525252;
--color-gray-700: #404040;
--color-gray-800: #262626;
--color-gray-900: #171717;  /* Darkest */
```

#### Blue (Primary)
```css
--color-blue-50: #eff6ff;
--color-blue-100: #dbeafe;
--color-blue-200: #bfdbfe;
--color-blue-300: #93c5fd;
--color-blue-400: #60a5fa;
--color-blue-500: #3b82f6;  /* Base */
--color-blue-600: #2563eb;  /* Primary */
--color-blue-700: #1d4ed8;
--color-blue-800: #1e40af;
--color-blue-900: #1e3a8a;
```

#### Other Colors
- **Green**: Success states (#22c55e base)
- **Red**: Error/danger states (#ef4444 base)
- **Yellow**: Warning states (#eab308 base)
- **Purple**: Info/accent (#a855f7 base)
- **Cyan**: Additional accent (#06b6d4 base)

### Semantic Color Tokens

#### Text Colors
```css
--color-text-primary: #171717;        /* Main text (21:1 contrast) */
--color-text-secondary: #525252;      /* Secondary text (7:1 contrast) */
--color-text-tertiary: #737373;       /* Disabled/placeholder (4.5:1) */
--color-text-inverse: #ffffff;        /* Text on dark backgrounds */
--color-text-link: var(--color-blue-600);
--color-text-link-hover: var(--color-blue-700);
```

#### Background Colors
```css
--color-background-primary: #ffffff;
--color-background-secondary: #f5f5f5;
--color-background-tertiary: #e5e5e5;
--color-background-surface: #ffffff;
--color-background-overlay: rgba(0, 0, 0, 0.5);
```

#### State Colors
```css
--color-success: var(--color-green-600);
--color-success-background: var(--color-green-50);
--color-warning: var(--color-yellow-600);
--color-warning-background: var(--color-yellow-50);
--color-error: var(--color-red-600);
--color-error-background: var(--color-red-50);
--color-info: var(--color-blue-600);
--color-info-background: var(--color-blue-50);
```

#### Border Colors
```css
--color-border-default: #d4d4d4;      /* 3:1 contrast */
--color-border-strong: #a3a3a3;
--color-border-subtle: #e5e5e5;
--color-border-focus: var(--color-blue-500);
```

### Contrast Ratios

All color combinations meet WCAG AA standards:

| Token | Background | Contrast | WCAG |
|-------|------------|----------|------|
| `text-primary` | `background-primary` | 21:1 | AAA ✅ |
| `text-secondary` | `background-primary` | 7:1 | AAA ✅ |
| `text-tertiary` | `background-primary` | 4.5:1 | AA ✅ |
| `border-default` | `background-primary` | 3:1 | AA ✅ |

---

## Spacing Tokens

### Base Spacing Scale

Based on 0.25rem (4px) increments:

```css
--spacing-0: 0;
--spacing-px: 1px;
--spacing-0-5: 0.125rem;  /* 2px */
--spacing-1: 0.25rem;      /* 4px */
--spacing-2: 0.5rem;       /* 8px */
--spacing-3: 0.75rem;      /* 12px */
--spacing-4: 1rem;         /* 16px */
--spacing-5: 1.25rem;      /* 20px */
--spacing-6: 1.5rem;       /* 24px */
--spacing-8: 2rem;         /* 32px */
--spacing-10: 2.5rem;      /* 40px */
--spacing-12: 3rem;        /* 48px */
--spacing-16: 4rem;        /* 64px */
--spacing-20: 5rem;        /* 80px */
--spacing-24: 6rem;        /* 96px */
```

### Semantic Spacing

```css
--spacing-xs: var(--spacing-1);    /* 4px - Tight spacing */
--spacing-sm: var(--spacing-2);    /* 8px - Compact spacing */
--spacing-md: var(--spacing-4);    /* 16px - Default spacing */
--spacing-lg: var(--spacing-6);    /* 24px - Loose spacing */
--spacing-xl: var(--spacing-8);    /* 32px - Extra loose */
--spacing-2xl: var(--spacing-12);  /* 48px - Section spacing */
```

### Usage Guidelines

| Token | Use Case | Example |
|-------|----------|---------|
| `xs` (4px) | Icon spacing, tight gaps | Badge padding |
| `sm` (8px) | Component padding | Chip padding |
| `md` (16px) | Default padding/margin | Button padding |
| `lg` (24px) | Card padding | Modal padding |
| `xl` (32px) | Section spacing | Page margins |
| `2xl` (48px) | Major sections | Hero padding |

---

## Typography Tokens

### Font Families

```css
--font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI",
                     Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-mono: "SF Mono", Monaco, "Cascadia Code",
                     "Roboto Mono", Consolas, monospace;
```

### Font Sizes

```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights

```css
--line-height-none: 1;
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
--line-height-loose: 2;
```

### Text Styles

Predefined text style combinations:

```css
/* Headings */
--text-heading-1-fontSize: var(--font-size-4xl);
--text-heading-1-lineHeight: var(--line-height-tight);
--text-heading-1-fontWeight: var(--font-weight-bold);

--text-heading-2-fontSize: var(--font-size-3xl);
--text-heading-2-lineHeight: var(--line-height-tight);
--text-heading-2-fontWeight: var(--font-weight-bold);

/* Body */
--text-body-default-fontSize: var(--font-size-base);
--text-body-default-lineHeight: var(--line-height-normal);
--text-body-default-fontWeight: var(--font-weight-normal);

--text-body-small-fontSize: var(--font-size-sm);
--text-body-small-lineHeight: var(--line-height-normal);
--text-body-small-fontWeight: var(--font-weight-normal);
```

---

## Border & Shadow Tokens

### Border Radius

```css
--border-radius-none: 0;
--border-radius-sm: 0.125rem;  /* 2px */
--border-radius-md: 0.25rem;   /* 4px */
--border-radius-lg: 0.5rem;    /* 8px */
--border-radius-xl: 0.75rem;   /* 12px */
--border-radius-2xl: 1rem;     /* 16px */
--border-radius-full: 9999px;  /* Fully rounded */
```

### Border Widths

```css
--border-width-0: 0;
--border-width-1: 1px;
--border-width-2: 2px;
--border-width-4: 4px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
```

---

## Animation Tokens

### Durations

```css
--animation-duration-fast: 150ms;
--animation-duration-normal: 300ms;
--animation-duration-slow: 500ms;
```

### Easing Functions

```css
--animation-easing-linear: linear;
--animation-easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--animation-easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
--animation-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Transitions

```css
--transition-fast: all 150ms ease-in-out;
--transition-normal: all 300ms ease-in-out;
--transition-slow: all 500ms ease-in-out;
```

---

## Semantic Tokens

Semantic tokens provide meaning-based naming:

### Interactive States

```css
/* Hover */
--color-interactive-hover-background: var(--color-gray-100);

/* Active/Pressed */
--color-interactive-active-background: var(--color-gray-200);

/* Focus */
--color-interactive-focus-outline: var(--color-blue-500);
--color-interactive-focus-outline-width: 2px;
--color-interactive-focus-outline-offset: 2px;

/* Disabled */
--color-interactive-disabled-background: var(--color-gray-100);
--color-interactive-disabled-text: var(--color-gray-400);
```

### Form States

```css
--color-form-valid-border: var(--color-success);
--color-form-valid-background: var(--color-success-background);

--color-form-invalid-border: var(--color-error);
--color-form-invalid-background: var(--color-error-background);

--color-form-focus-border: var(--color-border-focus);
```

---

## Component Tokens

Each component has its own set of tokens:

### Button Example

```css
/* Primary Variant */
--component-button-primary-background-default: var(--color-primary);
--component-button-primary-background-hover: var(--color-blue-700);
--component-button-primary-background-active: var(--color-blue-800);
--component-button-primary-text-default: var(--color-white);
--component-button-primary-border-default: transparent;

/* Sizes */
--component-button-padding-small: var(--spacing-2) var(--spacing-3);
--component-button-padding-medium: var(--spacing-3) var(--spacing-5);
--component-button-padding-large: var(--spacing-4) var(--spacing-6);

/* Typography */
--component-button-fontSize: var(--font-size-base);
--component-button-fontWeight: var(--font-weight-medium);
```

### Input Example

```css
--component-input-background: var(--color-white);
--component-input-border-color: var(--color-border-default);
--component-input-border-color-focus: var(--color-border-focus);
--component-input-padding: var(--spacing-3) var(--spacing-4);
--component-input-fontSize: var(--font-size-base);
--component-input-borderRadius: var(--border-radius-md);
```

---

## Using Tokens

### In CSS

```css
.my-component {
  /* Use semantic tokens */
  color: var(--color-text-primary);
  background: var(--color-background-surface);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  /* Transitions */
  transition: var(--transition-fast);
}

.my-component:hover {
  background: var(--color-interactive-hover-background);
}
```

### In JavaScript

```javascript
// Get token value
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// Set token value
document.documentElement.style.setProperty(
  '--color-primary',
  '#3b82f6'
);
```

### In Components

```html
<ha-button style="
  --component-button-primary-background-default: #9333ea;
  --component-button-padding-medium: 1rem 2rem;
">
  Custom Styled Button
</ha-button>
```

---

## Custom Theming

### Creating a Custom Theme

1. **Override base tokens**:
```css
:root {
  --color-blue-600: #your-brand-color;
  --font-family-sans: 'Your Brand Font', sans-serif;
}
```

2. **Override semantic tokens**:
```css
:root {
  --color-primary: #your-brand-color;
  --color-text-primary: #your-text-color;
}
```

3. **Override component tokens**:
```css
:root {
  --component-button-primary-background-default: #your-button-color;
  --component-button-borderRadius: 0.5rem;
}
```

### Dark Mode

Use the `data-theme="dark"` attribute:

```css
[data-theme="dark"] {
  --color-text-primary: #ffffff;
  --color-text-secondary: #d4d4d4;
  --color-background-primary: #171717;
  --color-background-surface: #262626;
  --color-border-default: #404040;
}
```

Toggle dark mode:
```javascript
document.documentElement.setAttribute('data-theme', 'dark');
```

### Theme Switcher Component

```html
<ha-theme-switcher variant="toggle"></ha-theme-switcher>
```

---

## Token Reference

### Complete Token List

For a complete list of all available tokens, see:
- [Base Tokens](../../packages/tokens/src/)
- [Semantic Tokens](../../packages/tokens/src/semantic/)
- [Component Tokens](../../packages/tokens/src/components/)

### Token Naming Convention

Tokens follow the format: `--{category}-{property}-{variant}-{state}`

Examples:
```css
--color-text-primary           /* category-property-variant */
--component-button-primary-background-hover  /* component-variant-property-state */
--spacing-md                   /* category-size */
```

---

## Best Practices

### 1. Use Semantic Tokens
✅ **Do**: `color: var(--color-text-primary);`
❌ **Don't**: `color: var(--color-gray-900);`

### 2. Avoid Hardcoded Values
✅ **Do**: `padding: var(--spacing-md);`
❌ **Don't**: `padding: 16px;`

### 3. Use Component Tokens for Components
✅ **Do**: `background: var(--component-button-primary-background-default);`
❌ **Don't**: `background: var(--color-blue-600);`

### 4. Respect the Token Hierarchy
- Base tokens → Semantic tokens → Component tokens
- Each level references the level above it

### 5. Test Contrast Ratios
Always verify color combinations meet WCAG standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

---

## Resources

### Tools
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [CSS Custom Properties Browser Support](https://caniuse.com/css-variables)

### Further Reading
- [Accessibility Guide](./accessibility-guide.md)
- [Component API Reference](../api/README.md)
- [Migration Guide](./migration-guide.md)

---

**Note**: Tokens are automatically generated from source files in `packages/tokens/src/`. To regenerate, run `pnpm build` in the tokens package.
