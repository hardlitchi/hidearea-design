# Shadow DOM Theme Solution - Two-Tier CSS Variables (Hybrid Approach Phase 1)

**Date**: 2025-12-07
**Status**: ✅ Implemented
**Related**: Phase 9 Accessibility Improvements, Storybook Theme Toggle Issue

## Problem Summary

Storybook theme toggle was not working for Web Components because Shadow DOM creates a style isolation boundary that blocks CSS variable inheritance from `:root`.

```
User clicks theme toggle
  ↓
setTheme('dark') called
  ↓
document.documentElement.setAttribute('data-theme', 'dark')
  ↓
CSS: [data-theme="dark"] { --background-primary: #171717; }
  ↓
❌ Shadow DOM boundary blocks CSS variable inheritance
  ↓
Components still use old values
```

## Solution: Two-Tier CSS Variable Structure (Option 1)

Implemented a two-tier CSS variable architecture that allows Shadow DOM components to inherit theme changes while maintaining future extensibility for custom themes.

### Architecture

```css
/* BEFORE (didn't work with Shadow DOM) */
:root {
  --color-white: #ffffff;
  --color-gray-900: #171717;
}

[data-theme="light"] {
  --background-primary: #ffffff;
  --text-primary: #171717;
}

[data-theme="dark"] {
  --background-primary: #171717;
  --text-primary: #fafafa;
}
```

```css
/* AFTER (works with Shadow DOM) */
:root {
  /* Base tokens (always inherited) */
  --color-white: #ffffff;
  --color-gray-900: #171717;

  /* Semantic tokens - two-tier structure */
  --background-primary: var(--theme-background-primary, #ffffff);
  --text-primary: var(--theme-text-primary, #171717);
}

[data-theme="light"] {
  /* Theme-specific intermediate variables */
  --theme-background-primary: #ffffff;
  --theme-text-primary: #171717;
}

[data-theme="dark"] {
  /* Theme-specific intermediate variables */
  --theme-background-primary: #171717;
  --theme-text-primary: #fafafa;
}
```

### How It Works

1. **`:root` semantic tokens** are defined using `var(--theme-*, fallback)`
2. **Shadow DOM** inherits these `:root` variables automatically
3. **`[data-theme]` selectors** define intermediate `--theme-*` variables
4. When theme changes, intermediate variables update → `:root` variables react → Shadow DOM sees changes

### Key Benefits

✅ **Shadow DOM Compatible**: CSS variables in `:root` cross Shadow DOM boundary
✅ **Backward Compatible**: Existing components continue to work
✅ **Fallback Values**: Default theme (light) values built into `:root`
✅ **Future-Ready**: Prepared for Phase 2 (adoptedStyleSheets for custom themes)

## Implementation Details

### Modified Files

#### `packages/tokens/config.mjs`

Created new formatter `css/variables-themes-two-tier`:

```javascript
StyleDictionary.registerFormat({
  name: 'css/variables-themes-two-tier',
  format: function({ dictionary }) {
    // 1. Collect base tokens (colors, spacing, etc.)
    // 2. Collect light theme tokens → create semantic vars with fallbacks
    // 3. Collect dark theme tokens → create intermediate vars

    // Generate structure:
    // :root { base + semantics }
    // [data-theme="light"] { intermediates }
    // [data-theme="dark"] { intermediates }
  }
});
```

**Key Logic**:
- Light theme tokens generate both semantic vars (`:root`) and intermediate vars (`[data-theme="light"]`)
- Dark theme tokens only generate intermediate vars (`[data-theme="dark"]`)
- Base tokens (non-theme) added directly to `:root`

#### `packages/tokens/build/css/variables.css`

**Structure** (252 lines → 405 lines):

```css
:root {
  /* Base tokens: 1-251 */
  --animation-duration-fast: 150ms;
  --color-white: #ffffff;
  --spacing-4: 1rem;
  /* ... */

  /* Semantic tokens with two-tier structure: 252-300 */
  --background-primary: var(--theme-background-primary, #ffffff);
  --text-primary: var(--theme-text-primary, #171717);
  --surface-primary: var(--theme-surface-primary, #ffffff);
  /* ... */
}

[data-theme="light"] {
  /* Intermediate variables: 304-352 */
  --theme-background-primary: #ffffff;
  --theme-text-primary: #171717;
  --theme-surface-primary: #ffffff;
  /* ... */
}

[data-theme="dark"] {
  /* Intermediate variables: 356-404 */
  --theme-background-primary: #171717;
  --theme-text-primary: #fafafa;
  --theme-surface-primary: #262626;
  /* ... */
}
```

### Testing

Created `packages/tokens/test-theme.html` to verify:

1. **Regular DOM elements** use semantic tokens (`--text-primary`)
2. **Shadow DOM component** uses semantic tokens
3. **Theme switching** updates both regular DOM and Shadow DOM simultaneously
4. **CSS variable inspection** shows computed values for debugging

**Test Results**: ✅ Both regular DOM and Shadow DOM update when theme changes

## Hybrid Approach Roadmap

### Phase 1: Two-Tier CSS Variables (✅ Completed)

**Status**: Implemented
**Use Case**: Built-in themes (light, dark, high-contrast)
**Files Modified**:
- `packages/tokens/config.mjs` - New formatter
- `packages/tokens/build/css/variables.css` - Two-tier structure
- `packages/tokens/test-theme.html` - Verification test

**Performance**:
- Fast theme switching (CSS variable updates only)
- No JavaScript required for built-in themes
- Works with Shadow DOM

### Phase 2: adoptedStyleSheets API (🔮 Future)

**Status**: Planned (not yet implemented)
**Use Case**: Custom themes generated dynamically
**Trigger**: When user requests custom theme functionality

**Implementation Plan**:

```typescript
// packages/core/src/utils/theme.ts (future extension)

interface CustomTheme {
  name: string;
  tokens: Record<string, string>;
}

function applyCustomTheme(theme: CustomTheme) {
  // Generate CSS with custom token values
  const cssText = generateCustomThemeCSS(theme.tokens);

  // Create CSSStyleSheet
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);

  // Apply to all Shadow Roots
  document.adoptedStyleSheets = [sheet];

  // Notify all components
  const components = document.querySelectorAll('[data-ha-component]');
  components.forEach(component => {
    if (component.shadowRoot) {
      component.shadowRoot.adoptedStyleSheets = [sheet];
    }
  });
}
```

**Why Not Now?**:
1. Current requirement is 3-5 fixed themes (light, dark, high-contrast)
2. Two-tier approach handles this efficiently
3. adoptedStyleSheets adds complexity without immediate benefit
4. Can add later without breaking changes

## Migration Notes

### For Component Authors

**No changes required!** Components continue using semantic tokens:

```typescript
// button.styles.ts
export const buttonStyles = `
  button {
    background: var(--primary-default);  /* Still works! */
    color: var(--text-inverse);          /* Still works! */
    border-color: var(--border-primary); /* Still works! */
  }
`;
```

### For Theme Authors (Future)

When adding new themes:

1. **Add theme JSON** in `packages/tokens/src/themes/`:
   ```json
   {
     "theme": {
       "high-contrast": {
         "background": {
           "primary": { "value": "#000000" }
         }
       }
     }
   }
   ```

2. **Rebuild tokens**: `npm run build` in `packages/tokens`

3. **No component changes needed** - they automatically use new theme

## References

- **Original Issue**: Storybook theme toggle not working
- **Root Cause**: Shadow DOM CSS variable inheritance limitation
- **Solution Options Analyzed**: 4 approaches (Option 1 selected)
- **Related PRs**:
  - PR #19/21: Phase 1 Accessibility Improvements
  - (Next PR): Shadow DOM Theme Solution

## Next Steps

1. ✅ Verify Storybook theme toggle works with new structure
2. ⏳ Create PR for two-tier CSS variable implementation
3. ⏳ Add high-contrast theme (third built-in theme)
4. 🔮 Monitor user requests for custom theme features → triggers Phase 2

---

**Implementation Complexity**: Low
**Browser Compatibility**: All modern browsers (CSS custom properties)
**Breaking Changes**: None
**Performance Impact**: Negligible (CSS variable lookups)
