# Hidearea Design System - Custom Themes Example

This example demonstrates how to create and apply custom themes to Hidearea Design System. Learn how to override design tokens, create theme variants, and implement dark mode support.

## Features

- ✅ 3 Pre-built Custom Themes (Corporate, Ocean, Forest)
- ✅ Dark Mode Support for Each Theme
- ✅ Interactive Theme Switcher
- ✅ Live Token Value Display
- ✅ Component Showcase with Theme Variations
- ✅ TypeScript Support
- ✅ Vite Development Server

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
cd examples/custom-themes
pnpm dev
```

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

### Build

Build the application for production:

```bash
pnpm build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

## Project Structure

```
custom-themes/
├── src/
│   ├── themes/
│   │   ├── corporate.css    # Corporate theme (light & dark)
│   │   ├── ocean.css        # Ocean theme (light & dark)
│   │   └── forest.css       # Forest theme (light & dark)
│   ├── main.ts              # App logic and theme manager
│   └── style.css            # App-specific styles
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

## Creating Custom Themes

### 1. Understanding Design Tokens

Hidearea Design System uses CSS custom properties (CSS variables) for all design tokens. These can be overridden to create custom themes.

Key token categories:
- **Colors**: Primary, secondary, success, danger, warning, info
- **Backgrounds**: Primary, secondary, tertiary
- **Text**: Primary, secondary, tertiary
- **Borders**: Primary, secondary
- **Shadows**: sm, md, lg

### 2. Theme File Structure

Create a new CSS file in `src/themes/` for your custom theme:

```css
/**
 * My Custom Theme
 * Description of the theme
 */

:root[data-theme="my-theme"] {
  /* Primary Colors */
  --ha-color-primary: #your-color;
  --ha-color-primary-hover: #your-hover-color;
  --ha-color-primary-active: #your-active-color;

  /* ... other token overrides ... */
}

/* Dark Mode Variant (optional) */
:root[data-theme="my-theme-dark"] {
  --ha-color-primary: #your-dark-mode-color;
  /* ... other dark mode overrides ... */
}
```

### 3. Available Tokens to Override

#### Color Tokens

```css
/* Primary Brand Color */
--ha-color-primary
--ha-color-primary-hover
--ha-color-primary-active

/* Secondary Brand Color */
--ha-color-secondary
--ha-color-secondary-hover
--ha-color-secondary-active

/* Semantic Colors */
--ha-color-success
--ha-color-danger
--ha-color-warning
--ha-color-info

/* Background Colors */
--ha-color-background-primary
--ha-color-background-secondary
--ha-color-background-tertiary

/* Text Colors */
--ha-color-text-primary
--ha-color-text-secondary
--ha-color-text-tertiary

/* Border Colors */
--ha-color-border-primary
--ha-color-border-secondary
```

#### Shadow Tokens

```css
--ha-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--ha-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--ha-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

You can customize shadows to match your theme's color scheme or intensity preferences.

### 4. Applying Themes

Themes are applied via the `data-theme` attribute on the root HTML element:

```typescript
// Set theme
document.documentElement.setAttribute('data-theme', 'ocean');

// Remove theme (use default)
document.documentElement.removeAttribute('data-theme');
```

### 5. Theme Persistence

Save the user's theme preference:

```typescript
// Save to localStorage
localStorage.setItem('selected-theme', 'ocean');

// Load from localStorage
const savedTheme = localStorage.getItem('selected-theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}
```

## Example Themes

### Corporate Theme

**Use case**: Business applications, enterprise software, professional tools

**Color scheme**:
- Primary: Navy Blue (#1e3a8a)
- Secondary: Steel Gray (#475569)
- Success: Professional Green (#059669)
- Background: Clean White/Light Gray

**Characteristics**:
- Conservative and trustworthy
- High contrast for readability
- Subdued shadows for professional appearance

### Ocean Theme

**Use case**: Wellness apps, travel platforms, creative tools

**Color scheme**:
- Primary: Ocean Blue (#0ea5e9)
- Secondary: Teal (#14b8a6)
- Success: Aqua Green (#10b981)
- Background: Light Blue tints

**Characteristics**:
- Calming and serene
- Vibrant accents
- Softer shadows with blue tint

### Forest Theme

**Use case**: Environmental apps, outdoor brands, natural products

**Color scheme**:
- Primary: Forest Green (#059669)
- Secondary: Earth Brown (#92400e)
- Success: Bright Green (#22c55e)
- Background: Light Green tints

**Characteristics**:
- Natural and organic
- Earth tone palette
- Warm, welcoming feel

## Dark Mode Implementation

Each theme can have a dark mode variant:

```css
/* Light Mode */
:root[data-theme="ocean"] {
  --ha-color-background-primary: #f0f9ff;
  --ha-color-text-primary: #0c4a6e;
}

/* Dark Mode */
:root[data-theme="ocean-dark"] {
  --ha-color-background-primary: #082f49;
  --ha-color-text-primary: #e0f2fe;
}
```

### Dark Mode Best Practices

1. **Inverted Backgrounds**: Use dark colors for backgrounds in dark mode
2. **Lighter Text**: Use lighter colors for text to maintain contrast
3. **Adjust Brightness**: Primary colors may need to be brighter in dark mode
4. **Reduce Shadows**: Soften or remove shadows in dark mode
5. **Border Adjustments**: Use lighter borders to maintain definition

## Theme Manager Class

The example includes a `ThemeManager` class for managing themes:

```typescript
class ThemeManager {
  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
  }

  getTheme(): string {
    return localStorage.getItem('selected-theme') || 'default';
  }

  private loadTheme() {
    const saved = localStorage.getItem('selected-theme');
    if (saved) {
      this.setTheme(saved);
    }
  }
}
```

## Integration with Frameworks

### Next.js

```typescript
// app/theme-provider.tsx
'use client';

import { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem('selected-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  return <>{children}</>;
}
```

### Nuxt.js

```vue
<!-- app.vue -->
<script setup lang="ts">
onMounted(() => {
  const saved = localStorage.getItem('selected-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
});
</script>
```

## Best Practices

### 1. Color Contrast

Ensure sufficient contrast between text and backgrounds:
- **WCAG AA**: Minimum 4.5:1 for normal text, 3:1 for large text
- **WCAG AAA**: Minimum 7:1 for normal text, 4.5:1 for large text

Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://accessible-colors.com/)

### 2. Semantic Consistency

Maintain semantic meaning across themes:
- **Success**: Green tones
- **Danger**: Red tones
- **Warning**: Yellow/Orange tones
- **Info**: Blue tones

### 3. Brand Alignment

Align your custom theme with your brand guidelines:
- Use brand colors for primary/secondary
- Match tone and personality
- Consider existing design assets

### 4. Accessibility

- Test with screen readers
- Verify keyboard navigation
- Check focus indicators
- Validate color-blind friendly combinations

### 5. Performance

- Minimize custom token overrides (only override what's needed)
- Use CSS custom properties for runtime theme switching (no rebuild required)
- Consider lazy-loading theme files for large applications

## Troubleshooting

### Theme Not Applying

1. Verify `data-theme` attribute is set on `<html>` element
2. Ensure theme CSS file is imported in `main.ts`
3. Check browser DevTools for CSS loading errors

### Colors Not Changing

1. Verify token names match exactly (including `--ha-` prefix)
2. Check CSS specificity (theme selectors should be specific enough)
3. Ensure no inline styles override theme tokens

### Dark Mode Issues

1. Verify dark theme variant exists (e.g., `ocean-dark`)
2. Check that dark mode toggle updates the theme name correctly
3. Ensure all necessary tokens are overridden in dark variant

## Learn More

- [Hidearea Design System Documentation](../../packages/docs)
- [Design Tokens Documentation](../../packages/tokens)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

## License

MIT
