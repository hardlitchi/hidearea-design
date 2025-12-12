# Switch Component

**Category:** Forms
**CSS File:** `src/css/components/forms/switch.css`
**Status:** ✅ Implemented

---

## Overview

The Switch component is an interactive toggle control that allows users to switch between two states: on and off. It's ideal for settings that take effect immediately, such as enabling notifications, toggling dark mode, or controlling feature visibility. Unlike checkboxes, switches are designed for instant state changes without requiring form submission.

### Use Cases

- Toggle settings on/off (notifications, dark mode, features)
- Enable/disable functionality with immediate effect
- Control application settings and preferences
- Switch between two options (e.g., between views)
- Display/hide content on demand
- Feature flags and experimental options

### Key Features

- **Three size variants**: sm, md (default), lg
- **Multiple states**: checked/unchecked, disabled, error, hover, focus
- **Smooth animations**: 200ms transitions for track and thumb
- **Accessibility**: Full ARIA support with `role="switch"` and `aria-checked`
- **Keyboard support**: Spacebar and Enter to toggle
- **Label support**: Built-in label and description text

---

## Size Variants

### Small (sm)

A compact switch for space-constrained layouts.

**Dimensions:**
- Track: 32px × 18px (2rem × 1.125rem)
- Thumb: 14px diameter
- Thumb displacement: 14px

**Use cases:**
- Compact settings screens
- Table cell toggles
- Sidebar preferences
- Mobile views

**CSS:**
```css
:host([size="sm"]) .switch-track {
  width: 32px;
  height: 18px;
  padding: 2px;
}

:host([size="sm"]) .switch-thumb {
  width: 14px;
  height: 14px;
}

:host([checked][size="sm"]) .switch-thumb {
  transform: translateX(14px);
}
```

### Medium (md) - Default

The standard switch size, most commonly used across applications.

**Dimensions:**
- Track: 40px × 22px (2.5rem × 1.375rem)
- Thumb: 18px diameter
- Thumb displacement: 18px

**Use cases:**
- Standard settings forms
- General UI layouts
- Most common implementations
- Default for all components

**CSS:**
```css
:host([size="md"]) .switch-track,
:host(:not([size])) .switch-track {
  width: 40px;
  height: 22px;
  padding: 2px;
}

:host([size="md"]) .switch-thumb,
:host(:not([size])) .switch-thumb {
  width: 18px;
  height: 18px;
}

:host([checked][size="md"]) .switch-thumb,
:host([checked]:not([size])) .switch-thumb {
  transform: translateX(18px);
}
```

### Large (lg)

A prominent switch for important settings or accessibility needs.

**Dimensions:**
- Track: 48px × 26px (3rem × 1.625rem)
- Thumb: 20px diameter
- Thumb displacement: 22px

**Use cases:**
- High-visibility settings
- Mobile applications
- Accessibility requirements
- Primary settings screens

**CSS:**
```css
:host([size="lg"]) .switch-track {
  width: 48px;
  height: 26px;
  padding: 3px;
}

:host([size="lg"]) .switch-thumb {
  width: 20px;
  height: 20px;
}

:host([checked][size="lg"]) .switch-thumb {
  transform: translateX(22px);
}
```

---

## States

### Unchecked (Off)

The default state where the switch is toggled off.

**Styling:**
- Track background: `var(--color-neutral-300, #d1d5db)` - light gray
- Thumb position: left (0px offset)
- Cursor: pointer
- Opacity: 100%

### Checked (On)

The switch is toggled on and active.

**Styling:**
- Track background: `var(--color-primary-600, #4f46e5)` - primary blue
- Thumb position: right (displaced by track width - thumb width - padding)
- Cursor: pointer
- Opacity: 100%

### Hover

Hovering over an enabled switch shows visual feedback.

**Styling:**
- Track opacity: 0.9 (reduces opacity for feedback)
- Applies to both checked and unchecked states
- Only applies when not disabled

**CSS:**
```css
:host(:not([disabled])):hover .switch-track {
  opacity: 0.9;
}
```

### Disabled

The switch cannot be interacted with.

**Styling (Unchecked + Disabled):**
- Track background: `var(--color-neutral-200, #e5e7eb)` - lighter gray
- Label color: `var(--color-text-disabled, #9ca3af)` - disabled gray
- Cursor: not-allowed
- Host opacity: 0.6

**Styling (Checked + Disabled):**
- Track background: `var(--color-neutral-400, #9ca3af)` - medium gray
- Label color: `var(--color-text-disabled, #9ca3af)`
- Cursor: not-allowed
- Host opacity: 0.6

**CSS:**
```css
:host([disabled]) {
  cursor: not-allowed;
  opacity: 0.6;
}

:host([disabled]) .switch-track {
  background-color: var(--color-neutral-200, #e5e7eb);
}

:host([disabled][checked]) .switch-track {
  background-color: var(--color-neutral-400, #9ca3af);
}

:host([disabled]) .label {
  color: var(--color-text-disabled, #9ca3af);
}
```

### Focus

Keyboard focus state with visible focus ring.

**Styling:**
- Outline: 2px solid primary color `#4f46e5`
- Outline offset: 2px
- Applies only to keyboard focus, not mouse click

**CSS:**
```css
input:focus-visible + .switch-track {
  outline: 2px solid var(--color-primary-600, #4f46e5);
  outline-offset: 2px;
}
```

### Error

Indicates a validation error or invalid state.

**Styling (Unchecked + Error):**
- Track background: `var(--color-danger-200, #fecaca)` - light red
- Label color: `var(--color-danger-700, #b91c1c)` - dark red
- Description color: `var(--color-danger-700, #b91c1c)`

**Styling (Checked + Error):**
- Track background: `var(--color-danger-600, #dc2626)` - medium red
- Label color: `var(--color-danger-700, #b91c1c)`
- Description color: `var(--color-danger-700, #b91c1c)`

**CSS:**
```css
:host([error]) .switch-track {
  background-color: var(--color-danger-600, #dc2626);
}

:host([error]:not([checked])) .switch-track {
  background-color: var(--color-danger-200, #fecaca);
}

:host([error]) .label {
  color: var(--color-danger-700, #b91c1c);
}

:host([error]) .description {
  color: var(--color-danger-700, #b91c1c);
}
```

---

## HTML Structure & Attributes

### Basic Structure

```html
<ha-switch></ha-switch>
```

### With Label

```html
<ha-switch label="Enable notifications"></ha-switch>
```

### With Description

```html
<ha-switch
  label="Dark mode"
  description="Automatically switch at sunset">
</ha-switch>
```

### Size Variants

```html
<!-- Small -->
<ha-switch size="sm" label="Compact setting"></ha-switch>

<!-- Medium (default) -->
<ha-switch label="Standard setting"></ha-switch>
<ha-switch size="md" label="Standard setting"></ha-switch>

<!-- Large -->
<ha-switch size="lg" label="Important setting"></ha-switch>
```

### State Examples

```html
<!-- Checked/Enabled -->
<ha-switch checked label="Notifications enabled"></ha-switch>

<!-- Disabled (unchecked) -->
<ha-switch disabled label="Unavailable feature"></ha-switch>

<!-- Disabled (checked) -->
<ha-switch checked disabled label="Locked setting"></ha-switch>

<!-- Error state -->
<ha-switch error label="Invalid configuration"></ha-switch>

<!-- Error with description -->
<ha-switch
  error
  label="Required setting"
  description="This setting must be enabled">
</ha-switch>
```

### Combined Examples

```html
<!-- Small, checked, with label -->
<ha-switch size="sm" checked label="Mobile notifications"></ha-switch>

<!-- Large, disabled, with description -->
<ha-switch
  size="lg"
  disabled
  label="Beta features"
  description="Coming soon">
</ha-switch>

<!-- Error with all options -->
<ha-switch
  size="md"
  error
  label="Required acceptance"
  description="You must accept this to continue">
</ha-switch>
```

---

## Attributes Table

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `checked` | boolean | false | Whether the switch is in the on/checked state |
| `disabled` | boolean | false | Disables interaction with the switch |
| `size` | string | "md" | Size variant: "sm", "md", or "lg" |
| `label` | string | - | Text label displayed next to switch |
| `description` | string | - | Optional helper/description text below |
| `error` | boolean | false | Shows error state styling |
| `name` | string | - | Form field name attribute |
| `value` | string | "on" | Value when checked in forms |
| `aria-checked` | string | "false" | Automatically updated ARIA attribute |
| `aria-label` | string | - | Accessible label if visible label unavailable |
| `aria-describedby` | string | - | ID of element describing the switch |

---

## CSS Custom Properties

The switch component uses these CSS variables (defined in your design token system):

```css
/* Colors */
--color-neutral-200: #e5e7eb;      /* Disabled track (off) */
--color-neutral-300: #d1d5db;      /* Default track (off) */
--color-neutral-400: #9ca3af;      /* Disabled track (on) */
--color-primary-600: #4f46e5;      /* Primary/checked track */
--color-danger-200: #fecaca;       /* Error track (off) */
--color-danger-600: #dc2626;       /* Error track (on) */
--color-danger-700: #b91c1c;       /* Error text */
--color-background: #ffffff;       /* Thumb background */
--color-text-primary: #1a1a1a;     /* Label text */
--color-text-secondary: #6b7280;   /* Description text */
--color-text-disabled: #9ca3af;    /* Disabled text */

/* Spacing */
--spacing-1: 0.25rem;              /* Label/description gap */
--spacing-3: 0.75rem;              /* Switch/label gap */

/* Typography */
--font-family-base: system-ui, -apple-system, sans-serif;
--font-size-base: 1rem;            /* Label font size */
--font-size-sm: 0.875rem;          /* Description font size */
--font-size-lg: 1.125rem;          /* Large label font size */
--font-weight-normal: 400;         /* Label weight */

/* Effects */
--line-height-normal: 1.5;         /* Text line height */
```

---

## Accessibility

### ARIA Attributes

The switch component automatically manages these ARIA attributes:

- **`role="switch"`** - Identifies the component as a switch control
- **`aria-checked`** - Always reflects the current state (true/false)
- **`aria-label`** - Provides accessible name when visible label unavailable
- **`aria-describedby`** - Links to description/error text
- **`aria-disabled`** - Set when disabled

### ARIA Examples

```html
<!-- Basic switch with accessible label -->
<ha-switch
  checked
  label="Enable notifications"
  aria-label="Enable notifications">
</ha-switch>

<!-- With description for context -->
<ha-switch
  checked
  label="Dark mode"
  description="System will automatically switch at sunset"
  aria-describedby="dark-mode-description">
</ha-switch>

<!-- Error with accessible error message -->
<ha-switch
  error
  label="Accept terms"
  description="You must accept to continue"
  aria-invalid="true"
  aria-describedby="terms-error">
</ha-switch>

<!-- Programmatically labeled -->
<span id="wifi-label">WiFi</span>
<ha-switch
  aria-labelledby="wifi-label">
</ha-switch>
```

### Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Focus the switch component |
| **Shift + Tab** | Move focus backward |
| **Space** | Toggle switch on/off |
| **Enter** | Toggle switch on/off (alternative) |

### Focus Management

- Switch receives focus on Tab
- Visual focus ring appears (2px outline, 2px offset)
- Focus ring color matches primary color (`#4f46e5`)
- Focus visible only on keyboard focus (not mouse click)

### Color Contrast

All states meet WCAG AA standards:
- Text on backgrounds: 4.5:1 minimum
- Focus rings: 3:1 minimum against background
- Error states: 4.5:1 minimum

### Screen Reader Support

```html
<!-- Announces "Dark mode switch, checked" -->
<ha-switch checked label="Dark mode"></ha-switch>

<!-- Announces with additional context -->
<ha-switch
  label="Notifications"
  description="Receive push notifications for new messages"
  aria-describedby="notif-help">
</ha-switch>

<!-- Clear error communication -->
<ha-switch
  error
  label="Accept terms"
  aria-invalid="true"
  description="This field is required to continue">
</ha-switch>
```

---

## Usage Examples

### Basic HTML Implementation

```html
<!-- Simple on/off switch -->
<div class="form-group">
  <ha-switch
    id="notifications"
    label="Enable notifications"
    checked>
  </ha-switch>
</div>

<!-- Disabled switch -->
<div class="form-group">
  <ha-switch
    id="beta-features"
    label="Beta features"
    disabled>
  </ha-switch>
</div>

<!-- With description text -->
<div class="form-group">
  <ha-switch
    id="dark-mode"
    label="Dark mode"
    description="Reduces eye strain in low-light environments">
  </ha-switch>
</div>

<!-- Size variations -->
<div class="form-group">
  <label>Small</label>
  <ha-switch size="sm" label="Compact view"></ha-switch>
</div>

<div class="form-group">
  <label>Medium (default)</label>
  <ha-switch label="Standard setting"></ha-switch>
</div>

<div class="form-group">
  <label>Large</label>
  <ha-switch size="lg" label="Important option"></ha-switch>
</div>
```

### Styled Form Integration

```html
<!-- Settings form with switches -->
<form class="settings-form">
  <fieldset>
    <legend>Notification Settings</legend>

    <div class="setting-group">
      <ha-switch
        id="email-notif"
        label="Email notifications"
        checked
        description="Receive email digests of activity">
      </ha-switch>
    </div>

    <div class="setting-group">
      <ha-switch
        id="push-notif"
        label="Push notifications"
        description="Get instant alerts on your device">
      </ha-switch>
    </div>

    <div class="setting-group">
      <ha-switch
        id="sms-notif"
        label="SMS notifications"
        description="Receive text message alerts">
      </ha-switch>
    </div>
  </fieldset>

  <fieldset>
    <legend>Display Settings</legend>

    <div class="setting-group">
      <ha-switch
        id="dark-mode"
        label="Dark mode"
        description="Easy on the eyes">
      </ha-switch>
    </div>

    <div class="setting-group">
      <ha-switch
        id="compact-view"
        size="sm"
        label="Compact layout"
        description="Condensed view to see more content">
      </ha-switch>
    </div>
  </fieldset>

  <button type="submit">Save Settings</button>
</form>

<style>
  .settings-form {
    max-width: 500px;
    margin: 2rem 0;
  }

  fieldset {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  legend {
    font-weight: 600;
    padding: 0 0.5rem;
  }

  .setting-group {
    margin-bottom: 1.5rem;
  }

  .setting-group:last-child {
    margin-bottom: 0;
  }
</style>
```

### Error Handling

```html
<!-- Validation error example -->
<form id="requirements-form">
  <fieldset>
    <legend>Requirements</legend>

    <div class="form-field">
      <ha-switch
        id="terms"
        label="I accept the terms and conditions"
        error
        description="You must accept our terms to continue">
      </ha-switch>
      <span id="terms-error" class="error-message">
        This field is required
      </span>
    </div>

    <div class="form-field">
      <ha-switch
        id="privacy"
        label="I accept the privacy policy"
        error
        description="Your privacy is important to us">
      </ha-switch>
      <span id="privacy-error" class="error-message">
        This field is required
      </span>
    </div>
  </fieldset>

  <button type="submit">Continue</button>
</form>

<style>
  .form-field {
    margin-bottom: 2rem;
  }

  .form-field ha-switch {
    display: block;
    margin-bottom: 0.5rem;
  }

  .error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: block;
  }
</style>
```

---

## Best Practices

### When to Use Switch

Use a Switch when:

1. **Immediate Effect** - The change takes effect instantly without form submission
   - Example: Toggle notifications, enable/disable features

2. **Binary Choice** - Only two possible states (on/off)
   - Good: Dark mode on/off
   - Bad: Multiple options between 3+ states

3. **Single Setting** - One independent setting per switch
   - Good: Individual feature toggles
   - Bad: Multiple related options

4. **User Preference** - Settings that users want to change frequently
   - Good: Theme preference, quick toggles
   - Bad: One-time setup steps

### When NOT to Use Switch

1. **Form Submission Required** - Use a Checkbox instead
   - Switches imply immediate action
   - Checkboxes work in forms

2. **Multiple Independent Options** - Use Checkboxes
   - Switches are one toggle
   - Checkboxes support multiple selections

3. **Mutually Exclusive Options** - Use Radio buttons
   - Switches are on/off only
   - Radio buttons select one from many

4. **Uncertain State** - Avoid three-state switches
   - Use a different control
   - Indeterminate state confuses users

### Best Practices

✅ **DO:**

- **Provide clear labels** describing what the on state does
  ```html
  <!-- Clear -->
  <ha-switch label="Enable dark mode"></ha-switch>
  <!-- Good for context -->
  <ha-switch label="Email notifications"></ha-switch>
  ```

- **Add descriptions for complex settings**
  ```html
  <ha-switch
    label="Auto-refresh data"
    description="Automatically refresh content every 5 minutes">
  </ha-switch>
  ```

- **Use appropriate size for context**
  ```html
  <!-- Compact table cells -->
  <ha-switch size="sm" label="Active"></ha-switch>

  <!-- Important settings -->
  <ha-switch size="lg" label="Enable account"></ha-switch>
  ```

- **Set sensible defaults**
  ```html
  <!-- Privacy-friendly default (off) -->
  <ha-switch label="Share analytics"></ha-switch>

  <!-- Convenience default (on) -->
  <ha-switch checked label="Save password"></ha-switch>
  ```

- **Indicate disabled switches clearly**
  ```html
  <!-- Explain why disabled -->
  <ha-switch
    disabled
    label="Beta features"
    description="Upgrade your plan to access">
  </ha-switch>
  ```

❌ **DON'T:**

- **Use vague labels**
  ```html
  <!-- Unclear -->
  <ha-switch label="Setting"></ha-switch>
  <!-- Better -->
  <ha-switch label="Enable notifications"></ha-switch>
  ```

- **Create three-state switches**
  ```javascript
  // Avoid this confusing pattern
  // Use a different control instead
  ```

- **Remove labels for "obvious" switches**
  ```html
  <!-- Bad - not clear what this does -->
  <ha-switch checked></ha-switch>
  <!-- Good -->
  <ha-switch checked label="Dark mode"></ha-switch>
  ```

- **Use for loading states**
  ```html
  <!-- Bad - switch doesn't show loading -->
  <!-- Use a spinner or loading state instead -->
  ```

- **Disable switches without explanation**
  ```html
  <!-- Bad - user confused why disabled -->
  <ha-switch disabled label="Feature"></ha-switch>
  <!-- Good -->
  <ha-switch
    disabled
    label="Premium feature"
    description="Upgrade to unlock">
  </ha-switch>
  ```

---

## Switch vs Checkbox vs Radio

### Switch
- **States:** On/Off only
- **Effect:** Immediate
- **Form:** Optional (works standalone)
- **Interaction:** Toggle one setting
- **Example:** Dark mode, notifications, feature flags

### Checkbox
- **States:** Checked/Unchecked (optional indeterminate)
- **Effect:** Requires form submission
- **Form:** Required for form submission
- **Interaction:** Select multiple independent options
- **Example:** Agreement checkboxes, multi-select filters

### Radio
- **States:** Selected/Unselected (one selected max)
- **Effect:** Requires form submission
- **Form:** Required for form submission
- **Interaction:** Choose one from multiple options
- **Example:** Gender selection, payment method, size choice

### Decision Matrix

| Need | Control |
|------|---------|
| Immediate effect, on/off | **Switch** |
| Form submission, on/off | **Checkbox** |
| Multiple selections | **Checkbox** |
| One from many options | **Radio** |
| Two options, exclusive | **Radio** or **Switch** |
| Complex workflow | Consider **Select** |

---

## Related Components

- **[Checkbox](./checkbox.md)** - For multiple independent selections
- **[Radio](./radio.md)** - For single selection from multiple options
- **[Input](./input.md)** - For text entry
- **[Select](./select.md)** - For dropdown selections
- **[Button](./button.md)** - For actions and submissions

---

## Troubleshooting

### Switch appears but doesn't toggle

**Issue:** Click doesn't toggle the switch

**Solutions:**
- Ensure component is not disabled: `disabled` attribute not set
- Check JavaScript isn't preventing default: `e.preventDefault()` removed
- Verify `checked` attribute updates: Component should handle this
- Check console for errors: No JS errors blocking interaction

```html
<!-- Correct implementation -->
<ha-switch id="my-switch" label="Works fine"></ha-switch>
```

### Label not displaying

**Issue:** Label text doesn't appear

**Solutions:**
- Check `label` attribute: Ensure attribute is set
- Verify no CSS hiding the label
- Check component supports labels (modern versions do)

```html
<!-- Must use label attribute -->
<ha-switch label="My Setting"></ha-switch>

<!-- Or wrap in a label element -->
<label>
  My Setting
  <ha-switch></ha-switch>
</label>
```

### Size looks wrong

**Issue:** Switch appears too small/large

**Solutions:**
- Verify size attribute: Use "sm", "md", or "lg"
- Check CSS not overriding: No conflicting size CSS
- Inspect computed styles: Verify actual values applied

```html
<!-- Correct size syntax -->
<ha-switch size="sm"></ha-switch>
<ha-switch size="md"></ha-switch>
<ha-switch size="lg"></ha-switch>
```

### Accessibility not working

**Issue:** Screen reader doesn't announce correctly

**Solutions:**
- Ensure label attribute present: Provides accessible name
- Add aria-describedby for descriptions: Needed for description text
- Verify role="switch": Component should set automatically
- Test with screen reader: Use NVDA, JAWS, or VoiceOver

```html
<!-- Fully accessible example -->
<ha-switch
  checked
  label="Dark mode"
  description="Reduce eye strain"
  aria-describedby="dark-mode-help"
  aria-label="Toggle dark mode">
</ha-switch>
<div id="dark-mode-help">
  Automatically switches at sunset
</div>
```

---

## Design Tokens

The Switch component uses these design tokens from your token system. Customize by updating the corresponding CSS variables:

### Layout Tokens
- `spacing-1`: 0.25rem (gaps between elements)
- `spacing-3`: 0.75rem (switch to label gap)

### Color Tokens (Light Theme)
- `color-neutral-200`: #e5e7eb (disabled off)
- `color-neutral-300`: #d1d5db (default off)
- `color-neutral-400`: #9ca3af (disabled on)
- `color-primary-600`: #4f46e5 (checked)
- `color-danger-200`: #fecaca (error off)
- `color-danger-600`: #dc2626 (error on)
- `color-background`: #ffffff (thumb)
- `color-text-primary`: #1a1a1a (labels)
- `color-text-disabled`: #9ca3af (disabled text)

### Typography Tokens
- `font-family-base`: system-ui, -apple-system, sans-serif
- `font-size-base`: 1rem (label)
- `font-size-sm`: 0.875rem (description)
- `font-size-lg`: 1.125rem (large label)
- `font-weight-normal`: 400
- `line-height-normal`: 1.5

### Animation Tokens
- `transition-duration`: 0.2s (smooth toggle)
- `transition-timing`: ease

---

## Browser Support

The Switch component is supported on:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

For older browser support, consider using a polyfill or fallback checkbox element.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-12 | Initial comprehensive documentation |

---

**Last Updated:** 2025-12-12
**Component Status:** Production Ready
**Accessibility Level:** WCAG 2.1 AA Compliant
