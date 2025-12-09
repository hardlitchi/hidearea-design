# Component-by-Component Refactoring Plan

**Project:** Hidearea Design System Tokens
**Date:** 2025-12-09
**Status:** Planning Phase

---

## Overview

This document outlines the detailed refactoring plan for each component in the design token system. Each component will be addressed in a separate PR following the phased approach defined in the Comprehensive Review Report.

---

## Phase 1: Foundation (Week 1-2)

### PR #1: Base/Colors - Add Missing Gray Shades

**Priority:** Critical
**Estimated Effort:** 2 hours
**Breaking Changes:** None

#### Current State
- `aliases.json` references `gray.25`, `gray.750`, `gray.950`
- These tokens don't exist in `base/colors.yaml`
- Causes broken references in build

#### Changes
Add to `src/base/colors.yaml`:
```yaml
gray:
  25:
    value: "#fcfcfc"
    comment: "ほぼ白に近いグレー - 微細な背景の区別に使用"
  # ... existing shades ...
  750:
    value: "#3a3a3a"
    comment: "濃いグレー - ダークモードの中間色"
  950:
    value: "#0a0a0a"
    comment: "ほぼ黒に近いグレー - ダークモードの最暗背景"
```

#### Testing
- [ ] Build succeeds without errors
- [ ] CSS output includes new tokens
- [ ] No broken references in output
- [ ] Type definitions generated

---

### PR #2: Build - Standardize File Format (JSON to YAML)

**Priority:** Critical
**Estimated Effort:** 4 hours
**Breaking Changes:** None (output unchanged)

#### Current State
- Base tokens: YAML
- Semantic tokens: JSON
- Themes: YAML
- Inconsistent commenting capabilities

#### Changes

1. Convert semantic JSON files to YAML:
   - `src/semantic/colors.json` → `colors.yaml`
   - `src/semantic/typography.json` → `typography.yaml`
   - `src/semantic/components.json` → `components.yaml`
   - `src/semantic/surfaces.json` → `surfaces.yaml`
   - `src/semantic/states.json` → `states.yaml`
   - `src/semantic/layout.json` → `layout.yaml`
   - `src/semantic/interactions.json` → `interactions.yaml`
   - `src/semantic/aliases.json` → `aliases.yaml`

2. Update `config.mjs`:
   ```javascript
   source: [
     'src/base/**/*.yaml',
     'src/semantic/**/*.yaml',
     'src/themes/**/*.yaml'
   ]
   ```

3. Add comprehensive comments to all tokens

#### Migration Script
```javascript
// scripts/json-to-yaml.mjs
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const files = [
  'src/semantic/colors.json',
  'src/semantic/typography.json',
  'src/semantic/components.json',
  'src/semantic/surfaces.json',
  'src/semantic/states.json',
  'src/semantic/layout.json',
  'src/semantic/interactions.json',
  'src/semantic/aliases.json'
];

files.forEach(file => {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const yamlPath = file.replace('.json', '.yaml');
  fs.writeFileSync(yamlPath, YAML.stringify(json, { indent: 2 }));
  fs.unlinkSync(file); // Remove old JSON file
  console.log(`Converted ${file} to ${yamlPath}`);
});
```

#### Testing
- [ ] All tokens converted successfully
- [ ] Build output unchanged (diff CSS/JS files)
- [ ] No missing tokens
- [ ] Comments preserved/added

---

### PR #3: Semantic - Fix Token References

**Priority:** Critical
**Estimated Effort:** 3 hours
**Breaking Changes:** None

#### Current State
- Inconsistent use of `.value` suffix in references
- Example: `{color.white.value}` vs `{color.white}`
- Confusing for contributors

#### Changes

1. Update all theme files to remove `.value` suffix:

**Before:**
```yaml
theme:
  light:
    background:
      primary:
        value: "{color.white.value}"
```

**After:**
```yaml
theme:
  light:
    background:
      primary:
        value: "{color.white}"
```

2. Files to update:
   - `src/themes/light/colors.yaml`
   - `src/themes/dark/colors.yaml`

3. Add validation transform to catch future issues:
```javascript
// In config.mjs
StyleDictionary.registerTransform({
  name: 'validate/no-value-suffix',
  type: 'value',
  matcher: (token) => typeof token.value === 'string',
  transformer: (token) => {
    if (token.value.includes('.value}')) {
      throw new Error(
        `Token ${token.path.join('.')} contains .value suffix in reference: ${token.value}`
      );
    }
    return token.value;
  }
});
```

#### Testing
- [ ] All references validated
- [ ] Build succeeds
- [ ] Output unchanged
- [ ] Validation catches new issues

---

### PR #4: Theme - Add Dark Mode Enhancements

**Priority:** High
**Estimated Effort:** 4 hours
**Breaking Changes:** None (additions only)

#### Current State
- Only colors are themed
- Dark mode shadows too light
- No elevated surfaces for dark mode

#### Changes

1. Add shadow overrides to `src/themes/dark/colors.yaml`:
```yaml
theme:
  dark:
    # ... existing colors ...

    # Shadows (darker for visibility on dark backgrounds)
    shadow:
      sm:
        value: "0 1px 2px 0 rgba(0, 0, 0, 0.5)"
        comment: "小さな影 - ダークモード用"
      base:
        value: "0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)"
      md:
        value: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)"
      lg:
        value: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)"
      xl:
        value: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)"
      "2xl":
        value: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
```

2. Add elevated surfaces:
```yaml
theme:
  dark:
    surface:
      elevated:
        value: "{color.gray.800}"
        comment: "カードやモーダルなどの浮いた要素の背景"
      overlay:
        value: "{color.gray.750}"
        comment: "オーバーレイ要素の背景"
```

#### Testing
- [ ] Dark mode shadows visible
- [ ] Elevated surfaces distinguishable
- [ ] No visual regressions
- [ ] Light theme unchanged

---

## Phase 2: Semantic Layer Enhancement (Week 3-6)

### PR #5: Semantic/Colors - Cleanup and Enhancement

**Priority:** High
**Estimated Effort:** 3 hours
**Breaking Changes:** Yes (remove `neutral` alias)

#### Current Issues
- `neutral` is redundant with `gray`
- `secondary` maps to `gray` (should be `purple`)
- Missing action colors
- Missing feedback colors

#### Changes

1. Remove `neutral` alias from `src/semantic/colors.yaml`:
```yaml
# DELETE THIS:
# neutral:
#   50: { value: "{color.gray.50}" }
#   ...
```

2. Fix `secondary` mapping:
```yaml
color:
  secondary:
    50: { value: "{color.purple.50}" }
    100: { value: "{color.purple.100}" }
    # ... all purple shades
```

3. Add action colors:
```yaml
color:
  action:
    primary:
      value: "{color.primary.500}"
      comment: "主要なアクション（ボタン、リンクなど）"
    secondary:
      value: "{color.secondary.500}"
      comment: "二次的なアクション"
    destructive:
      value: "{color.error.500}"
      comment: "破壊的なアクション（削除など）"
    subtle:
      value: "{color.gray.700}"
      comment: "控えめなアクション（キャンセルなど）"
```

4. Add feedback colors:
```yaml
color:
  feedback:
    success:
      value: "{color.success.500}"
      comment: "成功メッセージ"
    warning:
      value: "{color.warning.500}"
      comment: "警告メッセージ"
    error:
      value: "{color.error.500}"
      comment: "エラーメッセージ"
    info:
      value: "{color.info.500}"
      comment: "情報メッセージ"
```

#### Migration Guide
```markdown
**Breaking Changes:**
- `color.neutral.*` removed → Use `color.gray.*` instead
- `color.secondary.*` now maps to purple → Use `color.gray.*` for neutral secondary colors

**Migration:**
```diff
- var(--color-neutral-500)
+ var(--color-gray-500)

- var(--color-secondary-500)  /* If you wanted gray */
+ var(--color-gray-500)

- var(--color-secondary-500)  /* If you wanted purple */
+ var(--color-secondary-500)  /* No change needed */
```
```

#### Testing
- [ ] Build succeeds
- [ ] All new tokens in output
- [ ] Removed tokens not in output
- [ ] Documentation updated

---

### PR #6: Semantic/Typography - Add Responsive Tokens

**Priority:** High
**Estimated Effort:** 4 hours
**Breaking Changes:** None (additions only)

#### Current Issues
- No responsive typography
- Inconsistent structure across text styles
- Missing `fontFamily` in some styles
- Link visited color conflicts with brand purple

#### Changes

1. Add responsive heading tokens:
```yaml
text:
  heading:
    h1:
      fontSize:
        mobile:
          value: "{font.size.2xl}"
          comment: "モバイル: 24px"
        tablet:
          value: "{font.size.3xl}"
          comment: "タブレット: 30px"
        desktop:
          value: "{font.size.4xl}"
          comment: "デスクトップ: 36px"
      fontWeight: { value: "{font.weight.bold}" }
      lineHeight: { value: "{font.lineHeight.tight}" }
      fontFamily: { value: "{font.family.sans}" }
      color: { value: "{color.gray.900}" }

    h2:
      fontSize:
        mobile: { value: "{font.size.xl}" }
        tablet: { value: "{font.size.2xl}" }
        desktop: { value: "{font.size.3xl}" }
      fontWeight: { value: "{font.weight.bold}" }
      lineHeight: { value: "{font.lineHeight.tight}" }
      fontFamily: { value: "{font.family.sans}" }
      color: { value: "{color.gray.900}" }

    # ... h3-h6 similar pattern
```

2. Standardize all text styles with complete properties:
```yaml
text:
  body:
    large:
      fontSize: { value: "{font.size.lg}" }
      fontWeight: { value: "{font.weight.normal}" }
      lineHeight: { value: "{font.lineHeight.relaxed}" }
      fontFamily: { value: "{font.family.sans}" }
      color: { value: "{color.gray.700}" }
```

3. Fix link visited color:
```yaml
text:
  link:
    visited:
      color: { value: "{color.primary.800}" }  # Darker primary instead of purple
```

4. Use semantic tokens in code blocks:
```yaml
text:
  code:
    inline:
      fontSize: { value: "{font.size.sm}" }
      fontFamily: { value: "{font.family.mono}" }
      background: { value: "{surface.raised.background}" }
      color: { value: "{color.foreground.primary}" }
      padding: { value: "{spacing.1} {spacing.2}" }
      borderRadius: { value: "{border.radius.sm}" }

    block:
      fontSize: { value: "{font.size.sm}" }
      fontFamily: { value: "{font.family.mono}" }
      background: { value: "{color.gray.900}" }
      color: { value: "{color.gray.100}" }
      padding: { value: "{spacing.4}" }
      borderRadius: { value: "{border.radius.md}" }
```

#### Usage Example
```css
/* CSS */
.heading-1 {
  font-size: var(--text-heading-h1-font-size-mobile);
}

@media (min-width: 768px) {
  .heading-1 {
    font-size: var(--text-heading-h1-font-size-tablet);
  }
}

@media (min-width: 1024px) {
  .heading-1 {
    font-size: var(--text-heading-h1-font-size-desktop);
  }
}
```

#### Testing
- [ ] All text styles have complete properties
- [ ] Responsive tokens generate correctly
- [ ] Code blocks use semantic tokens
- [ ] Link colors accessible in both themes

---

### PR #7: Semantic/Surfaces - Add Glass Morphism

**Priority:** Medium
**Estimated Effort:** 3 hours
**Breaking Changes:** None

#### Changes

1. Convert literal values to token references:
```yaml
surface:
  sunken:
    background: { value: "{color.gray.50}" }
    elevation: { value: "{shadow.inner}" }  # Use token instead of literal
```

2. Add glass morphism tokens:
```yaml
surface:
  glass:
    light:
      background:
        value: "rgba(255, 255, 255, 0.8)"
        comment: "半透明な白背景"
      backdropFilter:
        value: "blur(10px) saturate(180%)"
        comment: "背景ブラー効果"
      border:
        value: "1px solid rgba(255, 255, 255, 0.3)"
        comment: "控えめなボーダー"

    dark:
      background:
        value: "rgba(23, 23, 23, 0.8)"
        comment: "半透明な黒背景"
      backdropFilter:
        value: "blur(10px) saturate(180%)"
        comment: "背景ブラー効果"
      border:
        value: "1px solid rgba(255, 255, 255, 0.1)"
        comment: "控えめなボーダー"
```

#### Testing
- [ ] Glass effect renders correctly
- [ ] Cross-browser compatibility
- [ ] Performance acceptable

---

### PR #8: Semantic/States - Add Focus Visible

**Priority:** High (Accessibility)
**Estimated Effort:** 3 hours
**Breaking Changes:** None

#### Changes

1. Flatten and expand focus tokens:
```yaml
state:
  focus:
    outline:
      value: "2px solid {color.primary.500}"
      comment: "フォーカス時のアウトライン"
    outlineOffset:
      value: "2px"
      comment: "アウトラインのオフセット"
    ring:
      color: { value: "{color.primary.500}" }
      width: { value: "2px" }
      offset: { value: "2px" }
      style: { value: "solid" }

  focusVisible:
    outline:
      value: "2px solid {color.primary.500}"
      comment: "キーボードフォーカス時のみ表示"
    outlineOffset:
      value: "2px"
```

2. Add pressed state:
```yaml
state:
  pressed:
    scale: { value: "0.95" }
    opacity: { value: "0.9" }
    transition: { value: "{interaction.transition.fast}" }
```

3. Add loading animation reference:
```yaml
state:
  loading:
    opacity: { value: "0.6" }
    cursor: { value: "wait" }
    animation:
      name: { value: "pulse" }
      duration: { value: "{animation.duration.slow}" }
      timing: { value: "{animation.easing.easeInOut}" }
      iteration: { value: "infinite" }
```

#### Testing
- [ ] Focus visible works with keyboard only
- [ ] Pressed state animates smoothly
- [ ] Loading animation loops correctly

---

### PR #9: Semantic/Layout - Add Safe Areas

**Priority:** Medium
**Estimated Effort:** 2 hours
**Breaking Changes:** None

#### Changes

1. Align responsive naming with breakpoints:
```yaml
layout:
  container:
    padding:
      sm: { value: "{spacing.4}" }   # 640px
      md: { value: "{spacing.6}" }   # 768px
      lg: { value: "{spacing.8}" }   # 1024px
      xl: { value: "{spacing.12}" }  # 1280px
```

2. Add safe area insets:
```yaml
layout:
  safeArea:
    top:
      value: "env(safe-area-inset-top, 0)"
      comment: "デバイスの上部セーフエリア（ノッチ対応）"
    right:
      value: "env(safe-area-inset-right, 0)"
      comment: "デバイスの右部セーフエリア"
    bottom:
      value: "env(safe-area-inset-bottom, 0)"
      comment: "デバイスの下部セーフエリア（ホームインジケーター対応）"
    left:
      value: "env(safe-area-inset-left, 0)"
      comment: "デバイスの左部セーフエリア"
```

3. Add flexbox gap tokens:
```yaml
layout:
  gap:
    xs: { value: "{spacing.1}" }
    sm: { value: "{spacing.2}" }
    md: { value: "{spacing.4}" }
    lg: { value: "{spacing.6}" }
    xl: { value: "{spacing.8}" }
```

#### Testing
- [ ] Safe areas work on iOS devices
- [ ] Gap tokens apply correctly

---

### PR #10: Semantic/Interactions - Complete Animations

**Priority:** Medium
**Estimated Effort:** 4 hours
**Breaking Changes:** None

#### Changes

1. Add keyframe definitions:
```yaml
interaction:
  keyframes:
    fadeIn:
      value: |
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      comment: "フェードイン"

    fadeOut:
      value: |
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

    slideInUp:
      value: |
        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

    slideInDown:
      value: |
        @keyframes slideInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

    scaleIn:
      value: |
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

    pulse:
      value: |
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

    spin:
      value: |
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
```

2. Complete animation definitions:
```yaml
interaction:
  animation:
    fadeIn:
      keyframes: { value: "fadeIn" }
      duration: { value: "{animation.duration.base}" }
      timing: { value: "{animation.easing.easeIn}" }
      fillMode: { value: "forwards" }

    fadeOut:
      keyframes: { value: "fadeOut" }
      duration: { value: "{animation.duration.base}" }
      timing: { value: "{animation.easing.easeOut}" }
      fillMode: { value: "forwards" }

    # ... etc
```

3. Add utility interaction tokens:
```yaml
interaction:
  scrollBehavior:
    smooth:
      value: "smooth"
      comment: "スムーズスクロール"
    auto:
      value: "auto"
      comment: "通常のスクロール"

  userSelect:
    none:
      value: "none"
      comment: "選択不可"
    text:
      value: "text"
      comment: "テキスト選択可"
    all:
      value: "all"
      comment: "全選択"

  pointerEvents:
    auto:
      value: "auto"
      comment: "通常のポインタイベント"
    none:
      value: "none"
      comment: "ポインタイベント無効"
```

#### Testing
- [ ] All animations play correctly
- [ ] Keyframes generated in CSS
- [ ] No performance issues

---

## Phase 3: Component Tokens (Week 7-13)

### Component Token Structure Template

Each component should follow this comprehensive structure:

```yaml
component:
  {componentName}:
    # Sizing
    size:
      small: { ... }
      medium: { ... }
      large: { ... }

    # Spacing
    padding:
      x: { ... }
      y: { ... }
    gap: { ... }

    # Typography
    fontSize: { ... }
    fontWeight: { ... }
    lineHeight: { ... }

    # Colors for each variant
    {variant}:
      background:
        default: { ... }
        hover: { ... }
        focus: { ... }
        active: { ... }
        disabled: { ... }
      text:
        default: { ... }
        disabled: { ... }
      border:
        default: { ... }
        hover: { ... }
        focus: { ... }
        active: { ... }
        disabled: { ... }
      shadow:
        default: { ... }
        hover: { ... }
        focus: { ... }

    # Animation
    transition:
      duration: { ... }
      timing: { ... }
      properties: { ... }
```

---

### PR #11: Component/Button - Complete Enhancement

**Priority:** Critical (Most used component)
**Estimated Effort:** 6 hours
**Breaking Changes:** None (additions only)

#### Current Tokens
- 24 tokens covering 4 variants
- Missing: sizes, focus states, loading, icons

#### Proposed Structure

```yaml
component:
  button:
    # Size variants
    size:
      small:
        height: { value: "{spacing.8}", comment: "32px" }
        paddingX: { value: "{spacing.3}", comment: "12px" }
        paddingY: { value: "{spacing.2}", comment: "8px" }
        fontSize: { value: "{font.size.sm}", comment: "14px" }
        iconSize: { value: "{spacing.4}", comment: "16px" }
        gap: { value: "{spacing.2}", comment: "8px" }

      medium:
        height: { value: "{spacing.10}", comment: "40px" }
        paddingX: { value: "{spacing.4}", comment: "16px" }
        paddingY: { value: "{spacing.2.5}", comment: "10px" }
        fontSize: { value: "{font.size.base}", comment: "16px" }
        iconSize: { value: "{spacing.5}", comment: "20px" }
        gap: { value: "{spacing.2}", comment: "8px" }

      large:
        height: { value: "{spacing.12}", comment: "48px" }
        paddingX: { value: "{spacing.6}", comment: "24px" }
        paddingY: { value: "{spacing.3}", comment: "12px" }
        fontSize: { value: "{font.size.lg}", comment: "18px" }
        iconSize: { value: "{spacing.6}", comment: "24px" }
        gap: { value: "{spacing.3}", comment: "12px" }

    # Common properties
    fontWeight: { value: "{font.weight.medium}" }
    lineHeight: { value: "{font.lineHeight.none}" }
    borderRadius: { value: "{border.radius.md}" }
    borderWidth: { value: "{border.width.1}" }

    # Transition
    transition:
      duration: { value: "{animation.duration.fast}" }
      timing: { value: "{animation.easing.ease}" }
      properties: { value: "background-color, border-color, color, box-shadow, transform" }

    # Primary variant (keep existing + add new)
    primary:
      background:
        default: { value: "{color.primary.500}" }
        hover: { value: "{color.primary.600}" }
        focus: { value: "{color.primary.600}" }
        active: { value: "{color.primary.700}" }
        disabled: { value: "{color.gray.300}" }
      text:
        default: { value: "{color.white}" }
        disabled: { value: "{color.gray.500}" }
      border:
        default: { value: "{color.primary.500}" }
        hover: { value: "{color.primary.600}" }
        focus: { value: "{color.primary.600}" }
        active: { value: "{color.primary.700}" }
        disabled: { value: "{color.gray.300}" }
      shadow:
        default: { value: "none" }
        hover: { value: "{shadow.sm}" }
        focus: { value: "0 0 0 3px {color.primary.100}" }
        active: { value: "none" }

    # Secondary variant (keep existing + add new)
    secondary:
      background:
        default: { value: "transparent" }
        hover: { value: "{color.gray.100}" }
        focus: { value: "{color.gray.100}" }
        active: { value: "{color.gray.200}" }
        disabled: { value: "transparent" }
      text:
        default: { value: "{color.gray.700}" }
        disabled: { value: "{color.gray.400}" }
      border:
        default: { value: "{color.gray.300}" }
        hover: { value: "{color.gray.400}" }
        focus: { value: "{color.gray.400}" }
        active: { value: "{color.gray.500}" }
        disabled: { value: "{color.gray.200}" }
      shadow:
        default: { value: "none" }
        hover: { value: "none" }
        focus: { value: "0 0 0 3px {color.gray.100}" }
        active: { value: "none" }

    # Ghost variant (keep existing + add new)
    ghost:
      background:
        default: { value: "transparent" }
        hover: { value: "{color.gray.100}" }
        focus: { value: "{color.gray.100}" }
        active: { value: "{color.gray.200}" }
        disabled: { value: "transparent" }
      text:
        default: { value: "{color.gray.700}" }
        disabled: { value: "{color.gray.400}" }
      border:
        default: { value: "transparent" }
        hover: { value: "transparent" }
        focus: { value: "transparent" }
        active: { value: "transparent" }
        disabled: { value: "transparent" }
      shadow:
        default: { value: "none" }
        hover: { value: "none" }
        focus: { value: "0 0 0 3px {color.gray.100}" }
        active: { value: "none" }

    # Danger variant (keep existing + add new)
    danger:
      background:
        default: { value: "{color.error.500}" }
        hover: { value: "{color.error.600}" }
        focus: { value: "{color.error.600}" }
        active: { value: "{color.error.700}" }
        disabled: { value: "{color.gray.300}" }
      text:
        default: { value: "{color.white}" }
        disabled: { value: "{color.gray.500}" }
      border:
        default: { value: "{color.error.500}" }
        hover: { value: "{color.error.600}" }
        focus: { value: "{color.error.600}" }
        active: { value: "{color.error.700}" }
        disabled: { value: "{color.gray.300}" }
      shadow:
        default: { value: "none" }
        hover: { value: "{shadow.sm}" }
        focus: { value: "0 0 0 3px {color.error.100}" }
        active: { value: "none" }

    # Loading state
    loading:
      opacity: { value: "0.7" }
      cursor: { value: "wait" }
      spinner:
        size: { value: "{spacing.4}" }
        color: { value: "currentColor" }
        animation: { value: "{interaction.animation.spin}" }

    # Icon-only button
    iconOnly:
      size:
        small: { value: "{spacing.8}" }
        medium: { value: "{spacing.10}" }
        large: { value: "{spacing.12}" }
      padding: { value: "{spacing.0}" }
```

#### Usage Example

```typescript
// Button component
<button
  class="button button--primary button--medium"
  style={{
    height: 'var(--component-button-size-medium-height)',
    padding: 'var(--component-button-size-medium-padding-y) var(--component-button-size-medium-padding-x)',
    fontSize: 'var(--component-button-size-medium-font-size)',
    backgroundColor: 'var(--component-button-primary-background-default)',
    color: 'var(--component-button-primary-text-default)',
  }}
>
  <Icon size="var(--component-button-size-medium-icon-size)" />
  Click me
</button>
```

#### Testing
- [ ] All variants render correctly
- [ ] All sizes apply correctly
- [ ] All states transition smoothly
- [ ] Focus ring visible for keyboard
- [ ] Loading state displays spinner
- [ ] Icon-only buttons are square

---

### PR #12: Component/Input - Complete Enhancement

**Priority:** Critical (Most used component)
**Estimated Effort:** 6 hours
**Breaking Changes:** None

#### Proposed Structure

```yaml
component:
  input:
    # Size variants
    size:
      small:
        height: { value: "{spacing.8}" }
        paddingX: { value: "{spacing.3}" }
        paddingY: { value: "{spacing.2}" }
        fontSize: { value: "{font.size.sm}" }

      medium:
        height: { value: "{spacing.10}" }
        paddingX: { value: "{spacing.4}" }
        paddingY: { value: "{spacing.2.5}" }
        fontSize: { value: "{font.size.base}" }

      large:
        height: { value: "{spacing.12}" }
        paddingX: { value: "{spacing.6}" }
        paddingY: { value: "{spacing.3}" }
        fontSize: { value: "{font.size.lg}" }

    # Common properties
    fontWeight: { value: "{font.weight.normal}" }
    lineHeight: { value: "{font.lineHeight.normal}" }
    borderRadius: { value: "{border.radius.md}" }
    borderWidth: { value: "{border.width.1}" }

    # Colors
    background:
      default: { value: "{color.white}" }
      disabled: { value: "{color.gray.100}" }
      readonly: { value: "{color.gray.50}" }
      hover: { value: "{color.white}" }

    text:
      default: { value: "{color.gray.900}" }
      placeholder: { value: "{color.gray.400}" }
      disabled: { value: "{color.gray.500}" }

    border:
      default: { value: "{color.gray.300}" }
      hover: { value: "{color.gray.400}" }
      focus: { value: "{color.primary.500}" }
      focusError: { value: "{color.error.500}" }
      focusSuccess: { value: "{color.success.500}" }
      error: { value: "{color.error.500}" }
      success: { value: "{color.success.500}" }
      disabled: { value: "{color.gray.200}" }

    # Focus ring
    focusRing:
      width: { value: "3px" }
      offset: { value: "0" }
      color:
        default: { value: "{color.primary.100}" }
        error: { value: "{color.error.100}" }
        success: { value: "{color.success.100}" }

    # Icons
    icon:
      size:
        small: { value: "{spacing.4}" }
        medium: { value: "{spacing.5}" }
        large: { value: "{spacing.6}" }
      color:
        default: { value: "{color.gray.500}" }
        error: { value: "{color.error.500}" }
        success: { value: "{color.success.500}" }
      spacing: { value: "{spacing.3}" }

    # Label
    label:
      fontSize: { value: "{font.size.sm}" }
      fontWeight: { value: "{font.weight.medium}" }
      color:
        default: { value: "{color.gray.700}" }
        disabled: { value: "{color.gray.400}" }
      spacing: { value: "{spacing.2}" }
      required:
        color: { value: "{color.error.500}" }

    # Helper text
    helper:
      fontSize: { value: "{font.size.sm}" }
      color:
        default: { value: "{color.gray.500}" }
        error: { value: "{color.error.600}" }
        success: { value: "{color.success.600}" }
      spacing: { value: "{spacing.1.5}" }

    # Transition
    transition:
      duration: { value: "{animation.duration.fast}" }
      timing: { value: "{animation.easing.ease}" }
      properties: { value: "border-color, box-shadow, background-color" }
```

#### Testing
- [ ] All sizes render correctly
- [ ] Error/success states visible
- [ ] Focus rings display correctly
- [ ] Icons positioned correctly
- [ ] Label and helper text styled

---

### PR #13: Component/Modal - Complete from Scratch

**Priority:** Critical (Currently 95% incomplete)
**Estimated Effort:** 8 hours
**Breaking Changes:** Complete rewrite

#### Complete Structure

```yaml
component:
  modal:
    # Dimensions
    width:
      small: { value: "400px", comment: "小さなモーダル（確認ダイアログなど）" }
      medium: { value: "600px", comment: "標準モーダル" }
      large: { value: "800px", comment: "大きなモーダル（フォームなど）" }
      xlarge: { value: "1000px", comment: "特大モーダル" }
      fullscreen: { value: "100vw", comment: "フルスクリーン" }

    maxHeight: { value: "90vh", comment: "画面高さの90%" }
    minHeight: { value: "200px" }

    # Spacing
    padding:
      header: { value: "{spacing.6}" }
      body: { value: "{spacing.6}" }
      footer: { value: "{spacing.6}" }

    # Colors
    background:
      default: { value: "{surface.overlay.background}" }
      overlay: { value: "rgba(0, 0, 0, 0.5)" }

    # Borders
    border:
      width: { value: "{border.width.0}" }
      radius: { value: "{border.radius.lg}" }
      color: { value: "{color.border.default}" }

    # Shadows
    shadow:
      default: { value: "{shadow.2xl}" }

    # Z-index
    zIndex:
      overlay: { value: "1000" }
      content: { value: "1001" }

    # Animation
    animation:
      enter:
        duration: { value: "{animation.duration.base}" }
        timing: { value: "{animation.easing.easeOut}" }
        overlay:
          from: { value: "opacity: 0" }
          to: { value: "opacity: 1" }
        content:
          from: { value: "opacity: 0; transform: scale(0.95) translateY(-20px)" }
          to: { value: "opacity: 1; transform: scale(1) translateY(0)" }

      exit:
        duration: { value: "{animation.duration.fast}" }
        timing: { value: "{animation.easing.easeIn}" }
        overlay:
          from: { value: "opacity: 1" }
          to: { value: "opacity: 0" }
        content:
          from: { value: "opacity: 1; transform: scale(1) translateY(0)" }
          to: { value: "opacity: 0; transform: scale(0.95) translateY(-20px)" }

    # Header
    header:
      background: { value: "transparent" }
      borderBottom: { value: "1px solid {color.border.default}" }
      padding: { value: "{component.modal.padding.header}" }

      title:
        fontSize: { value: "{font.size.xl}" }
        fontWeight: { value: "{font.weight.semibold}" }
        lineHeight: { value: "{font.lineHeight.tight}" }
        color: { value: "{color.foreground.primary}" }

      subtitle:
        fontSize: { value: "{font.size.sm}" }
        fontWeight: { value: "{font.weight.normal}" }
        lineHeight: { value: "{font.lineHeight.normal}" }
        color: { value: "{color.foreground.secondary}" }
        marginTop: { value: "{spacing.1}" }

    # Body
    body:
      padding: { value: "{component.modal.padding.body}" }
      maxHeight: { value: "60vh" }
      overflow: { value: "auto" }

    # Footer
    footer:
      background: { value: "{surface.raised.background}" }
      borderTop: { value: "1px solid {color.border.default}" }
      padding: { value: "{component.modal.padding.footer}" }
      gap: { value: "{spacing.3}" }
      justifyContent: { value: "flex-end" }

    # Close Button
    closeButton:
      size: { value: "{spacing.8}" }
      position:
        top: { value: "{spacing.4}" }
        right: { value: "{spacing.4}" }
      background:
        default: { value: "transparent" }
        hover: { value: "{surface.interactive.hover.background}" }
        active: { value: "{surface.interactive.active.background}" }
      color:
        default: { value: "{color.foreground.secondary}" }
        hover: { value: "{color.foreground.primary}" }
      borderRadius: { value: "{border.radius.md}" }
      transition:
        duration: { value: "{animation.duration.fast}" }
        timing: { value: "{animation.easing.ease}" }

    # Overlay
    overlay:
      backdropFilter: { value: "blur(2px)" }
```

#### Testing
- [ ] All sizes work correctly
- [ ] Animations smooth
- [ ] Overlay blocks interaction
- [ ] Close button functional
- [ ] Header/footer sections styled
- [ ] Scroll behavior correct

---

### PR #14-19: Remaining Components

Following similar patterns:

- **PR #14:** Component/Tooltip - Complete from scratch (6 hours)
- **PR #15:** Component/Card - Add missing tokens (5 hours)
- **PR #16:** Component/Badge - Add sizes and icons (4 hours)
- **PR #17:** Component/Alert - Add close button (4 hours)
- **PR #18:** Component/Table - Complete structure (6 hours)
- **PR #19:** Component/Navigation - Complete structure (6 hours)

---

## Phase 4: Advanced Features (Week 14-19)

### PR #20: Accessibility Tokens

**Priority:** High
**Estimated Effort:** 6 hours

Add comprehensive accessibility tokens for:
- High contrast mode
- Touch targets
- Focus indicators
- Screen reader specific tokens

---

### PR #21: Complete Motion System

**Priority:** Medium
**Estimated Effort:** 8 hours

Add all animation keyframes and complete animation system.

---

### PR #22: Platform Outputs (SCSS, iOS, Android)

**Priority:** Low
**Estimated Effort:** 12 hours

Add build outputs for additional platforms.

---

## Summary

**Total PRs:** 22
**Total Estimated Effort:** ~138 hours
**Estimated Timeline:** 16-19 weeks

### Critical Path
1. Foundation fixes (PRs #1-4): **2 weeks**
2. Button & Input (PRs #11-12): **2 weeks**
3. Modal & Tooltip (PRs #13-14): **2 weeks**
4. Remaining components (PRs #15-19): **5 weeks**

**Minimum viable completion:** 11 weeks (Foundation + Critical components)

---

## Next Steps

1. Review and approve this plan
2. Create GitHub issues for each PR
3. Set up project board
4. Assign team members
5. Start with PR #1

---

**End of Refactoring Plan**
