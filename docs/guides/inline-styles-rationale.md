# Inline Styles Rationale

## Overview

This document explains the rationale for using inline styles in certain components of the Hidearea Design System, specifically for dynamic values that cannot be efficiently expressed through static CSS.

## Components Using Inline Styles

### 1. Slider Component (`ha-slider`)

**Location**: `packages/core/src/components/slider/slider.ts`

**Usage**: Dynamic positioning of slider elements based on runtime values

**Inline Styles**:
- **Fill position/size**: `left`, `width`, `bottom`, `height` - determined by current value(s)
- **Thumb position**: `left` or `bottom` - determined by current value(s)

**Rationale**:
- Values are calculated dynamically based on user interaction
- Positions are percentages derived from `min`, `max`, `step`, and current `value`
- Range mode requires two independent thumb positions
- Using CSS custom properties would add unnecessary complexity without significant benefit
- Direct style assignment provides optimal performance during dragging operations

**Example**:
```typescript
const valuePercent = this.valueToPercent(this._value);
thumbsHtml = `
  <div class="slider__thumb"
       style="${this.orientation === 'horizontal' ? `left: ${valuePercent}%` : `bottom: ${valuePercent}%`}">
  </div>
`;
```

### 2. Color Picker Component (`ha-color-picker`)

**Location**: `packages/core/src/components/color-picker/color-picker.ts`

**Usage**: Dynamic color gradients and cursor positioning based on HSV values

**Inline Styles**:
- **Palette background**: Gradient from white to current hue color
- **Palette cursor**: `left`, `top` - based on saturation and value
- **Hue cursor**: `left` - based on hue (0-360°)
- **Alpha cursor**: `left` - based on alpha (0-1)
- **Alpha slider background**: Gradient from transparent to current color

**Rationale**:
- Color values are computed in real-time from HSV model
- Gradients must reflect current hue selection
- Cursor positions calculated from color component values
- CSS custom properties would require frequent updates with no performance gain
- Direct style manipulation provides smooth color selection experience

**Example**:
```typescript
const hueColor = `hsl(${this._hue}, 100%, 50%)`;
const paletteX = this._saturation; // 0-100%
const paletteY = 100 - this._value; // 0-100%

innerHTML = `
  <style>
    .palette {
      background: linear-gradient(to right, #fff, ${hueColor}),
                  linear-gradient(to top, #000, transparent);
    }
    .palette-cursor {
      left: calc(${paletteX}% - 6px);
      top: calc(${paletteY}% - 6px);
    }
  </style>
`;
```

## Alternative Approaches Considered

### CSS Custom Properties

**Considered**:
```typescript
// Set CSS variables instead of inline styles
element.style.setProperty('--slider-fill-width', `${percent}%`);
```

**Rejected because**:
- Adds indirection without clarity benefit
- Same number of DOM operations
- More verbose code
- Harder to debug (variables hidden in DevTools)
- No performance improvement

### CSS Classes

**Considered**:
Generate multiple CSS classes for different positions

**Rejected because**:
- Would require thousands of classes for smooth positioning
- Not feasible for continuous value ranges
- Poor performance due to class switching
- Inflexible for arbitrary step values

## Best Practices

When inline styles are appropriate:
1. ✅ Values computed from user interaction
2. ✅ Continuous ranges (not discrete states)
3. ✅ Performance-critical animations/dragging
4. ✅ Mathematical calculations required
5. ✅ Values coupled to component logic

When to avoid inline styles:
1. ❌ Static values that could be in CSS
2. ❌ Theme-related colors/spacing
3. ❌ Layout properties that don't change
4. ❌ Accessibility-related styles
5. ❌ Responsive breakpoints

## Design Token Migration

These components will **not** be migrated to use design tokens for their dynamic positioning and color calculations, as:
- Design tokens are for static design decisions
- Runtime calculations belong in component logic
- Current implementation follows Web Components best practices

However, these components **do** use design tokens for:
- Static colors (backgrounds, borders, text)
- Spacing (padding, margins, gaps)
- Border radius
- Transition timing
- Font properties

## Conclusion

The use of inline styles in Slider and Color Picker components is intentional and represents the most appropriate technical solution for handling dynamic, user-driven values. This approach:
- Maintains clear separation between static design (CSS/tokens) and dynamic behavior (JavaScript)
- Provides optimal performance for interactive components
- Follows Web Components standards and best practices
- Keeps code maintainable and debuggable

## References

- [Web Components Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [CSS Custom Properties for Dynamic Values](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Performance: Style vs. CSS Variables](https://nolanlawson.com/2021/08/23/css-variable-performance/)

---

**Last Updated**: 2025-12-19
**Status**: Accepted
**Decision Owners**: Design System Team
