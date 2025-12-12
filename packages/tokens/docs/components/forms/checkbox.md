# Checkbox Component

**Category:** Forms
**File:** `src/css/components/forms/checkbox.css`
**Status:** ✅ Implemented

---

## Overview

The Checkbox component is a form element that allows users to select zero or more options from a set of choices. Unlike radio buttons, checkboxes allow independent selection of multiple items and support three states: unchecked, checked, and indeterminate (partially selected).

### Use Cases

- Accepting terms and conditions
- Multiple selection filters
- Marking tasks as complete
- Enabling/disabling optional features
- Bulk actions on lists (select all/deselect all patterns)
- Consent for data collection

---

## Sizes

### Small (sm)

Compact checkbox for space-constrained areas.

**Dimensions:**
- Box: 16px × 16px
- Icon: 12px × 12px
- Label font-size: 0.875rem

**Use Cases:**
- Embedded in tables
- Dense form layouts
- Sidebar settings
- Compact lists

```html
<div class="ha-checkbox" size="sm">
  <input type="checkbox" id="small-check">
  <span class="label">Small checkbox</span>
</div>
```

### Medium (md) - Default

Standard size checkbox used in most interfaces.

**Dimensions:**
- Box: 20px × 20px
- Icon: 14px × 14px
- Label font-size: 1rem

**Use Cases:**
- Standard forms
- Settings pages
- List selection
- Regular forms and dialogs

```html
<div class="ha-checkbox" size="md">
  <input type="checkbox" id="medium-check">
  <span class="label">Medium checkbox</span>
</div>
```

### Large (lg)

Larger checkbox for enhanced visibility and accessibility.

**Dimensions:**
- Box: 24px × 24px
- Icon: 16px × 16px
- Label font-size: 1.125rem

**Use Cases:**
- Important consent items
- Mobile interfaces
- Accessibility requirements
- Large touch targets

```html
<div class="ha-checkbox" size="lg">
  <input type="checkbox" id="large-check">
  <span class="label">Large checkbox</span>
</div>
```

---

## States

### Unchecked (Default)

The default state of an unselected checkbox. Shows a bordered box with no check mark.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="unchecked">
  <span class="label">Unchecked option</span>
</div>
```

**Visual Properties:**
- Border color: `--border-default`
- Background: `--background-primary`
- Cursor: pointer

### Checked

Selected state displaying a checkmark icon.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="checked" checked>
  <span class="label">Checked option</span>
</div>
```

**Visual Properties:**
- Background: `--primary-default`
- Border color: `--primary-default`
- Icon color: `--foreground-inverse`
- Icon displayed

### Hover

Mouse hover state on an unselected checkbox.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="hover">
  <span class="label">Hover me</span>
</div>
```

**Visual Properties:**
- Border color: `--border-strong`
- Smooth transition (200ms)

### Checked + Hover

Mouse hover state on a selected checkbox.

**Visual Properties:**
- Background: `--primary-hover`
- Border color: `--primary-hover`
- Icon remains visible

### Focus

Keyboard focus state with visible focus ring.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="focus" tabindex="0">
  <span class="label">Keyboard focused</span>
</div>
```

**Visual Properties:**
- Outline: 2px solid `--primary-default`
- Outline offset: 2px
- Meets WCAG 2.1 AA contrast requirements

### Disabled

Non-interactive state for unavailable options.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="disabled" disabled>
  <span class="label">Disabled option</span>
</div>
```

**Visual Properties:**
- Opacity: 0.6
- Cursor: not-allowed
- Label color: `--foreground-secondary`

### Checked + Disabled

Selected but non-interactive checkbox.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="checked-disabled" checked disabled>
  <span class="label">Selected but disabled</span>
</div>
```

### Indeterminate

Partially selected state, typically used in parent/child hierarchies where only some children are selected.

```html
<div class="ha-checkbox">
  <input type="checkbox" id="indeterminate">
  <span class="label">Select all</span>
</div>

<script>
  document.getElementById('indeterminate').indeterminate = true;
</script>
```

**Visual Properties:**
- Background: `--primary-default`
- Border color: `--primary-default`
- Icon displayed (dash/minus mark)

### Error

Validation error state indicating invalid selection.

```html
<div class="ha-checkbox" error>
  <input type="checkbox" id="error">
  <span class="label">Required checkbox</span>
</div>
<span class="description">This field is required</span>
```

**Visual Properties:**
- Border color: `--error-default`
- Focus outline: `--error-default`
- Description color: `--error-default`

---

## HTML Structure

### Basic Implementation

```html
<div class="ha-checkbox">
  <input type="checkbox" id="basic">
  <span class="label">Accept terms and conditions</span>
</div>
```

### With Description

```html
<div class="ha-checkbox">
  <input type="checkbox" id="with-desc">
  <span class="label">Subscribe to newsletter</span>
  <span class="description">Receive weekly updates and news</span>
</div>
```

### With Error State

```html
<div class="ha-checkbox" error>
  <input type="checkbox" id="error-check">
  <span class="label">I agree to the terms</span>
  <span class="description">You must agree to continue</span>
</div>
```

### Checkbox Group

```html
<fieldset>
  <legend>What topics interest you?</legend>

  <div class="ha-checkbox">
    <input type="checkbox" id="tech" name="topics" value="technology">
    <span class="label">Technology</span>
  </div>

  <div class="ha-checkbox">
    <input type="checkbox" id="design" name="topics" value="design">
    <span class="label">Design</span>
  </div>

  <div class="ha-checkbox">
    <input type="checkbox" id="business" name="topics" value="business">
    <span class="label">Business</span>
  </div>
</fieldset>
```

### Parent-Child Select All Pattern

```html
<fieldset>
  <legend>Permissions</legend>

  <!-- Parent checkbox -->
  <div class="ha-checkbox">
    <input type="checkbox" id="all-permissions">
    <span class="label">Select all permissions</span>
  </div>

  <!-- Child checkboxes -->
  <fieldset style="margin-left: 2rem;">
    <div class="ha-checkbox">
      <input type="checkbox" id="perm-read" name="permissions" value="read">
      <span class="label">Read</span>
    </div>

    <div class="ha-checkbox">
      <input type="checkbox" id="perm-write" name="permissions" value="write">
      <span class="label">Write</span>
    </div>

    <div class="ha-checkbox">
      <input type="checkbox" id="perm-delete" name="permissions" value="delete">
      <span class="label">Delete</span>
    </div>
  </fieldset>
</fieldset>

<script>
const parent = document.getElementById('all-permissions');
const children = document.querySelectorAll('input[name="permissions"]');

function updateParentState() {
  const allChecked = Array.from(children).every(child => child.checked);
  const someChecked = Array.from(children).some(child => child.checked);

  parent.checked = allChecked;
  parent.indeterminate = !allChecked && someChecked;
}

parent.addEventListener('change', (e) => {
  children.forEach(child => {
    child.checked = e.target.checked;
  });
});

children.forEach(child => {
  child.addEventListener('change', updateParentState);
});

// Initialize state
updateParentState();
</script>
```

---

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `sm` \| `md` \| `lg` | `md` | Size variant of the checkbox |
| `error` | boolean | `false` | Indicates error state |
| `disabled` | boolean | `false` | Disables the checkbox |
| `checked` | boolean | `false` | Initial checked state |
| `indeterminate` | boolean | `false` | Partially selected state (JS only) |
| `name` | string | — | Input name attribute |
| `value` | string | `on` | Input value attribute |
| `aria-label` | string | — | Accessible label if visual label hidden |
| `aria-describedby` | string | — | ID of description element |
| `aria-invalid` | boolean | — | Indicates invalid state |

---

## CSS Custom Properties

The checkbox component uses the following design tokens:

### Layout
- `--spacing-2` - Gap between checkbox and label (0.5rem)
- `--spacing-1` - Margin for description (0.25rem)

### Border
- `--border-width-2` - Border width (2px)
- `--border-radius-base` - Border radius (0.25rem)
- `--border-default` - Default border color
- `--border-strong` - Hover border color

### Background
- `--background-primary` - Default background

### Colors
- `--primary-default` - Checked/selected color
- `--primary-hover` - Hover state color
- `--error-default` - Error state color
- `--foreground-primary` - Label text color
- `--foreground-secondary` - Description text color
- `--foreground-inverse` - Checkmark color

### Typography
- `--font-family-sans` - Label font family
- `--font-size-sm` - Small text (0.875rem)
- `--font-size-base` - Base text (1rem)
- `--font-size-lg` - Large text (1.125rem)
- `--font-weight-regular` - Label font weight (400)
- `--font-line-height-normal` - Line height (1.5)

### Animation
- `--animation-duration-base` - Transition duration (200ms)
- `--animation-easing-ease` - Easing function

---

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus to the checkbox
- **Shift + Tab**: Move focus to previous element
- **Space**: Toggle checkbox state (when focused)
- **Arrow Keys**: In a group (when using proper ARIA roles)

### ARIA Attributes

```html
<!-- With error message -->
<div class="ha-checkbox" error>
  <input
    type="checkbox"
    id="terms"
    aria-invalid="true"
    aria-describedby="error-msg"
  >
  <span class="label">Accept terms</span>
  <span id="error-msg" class="description">This is required</span>
</div>

<!-- In a fieldset group -->
<fieldset>
  <legend>Choose options</legend>
  <div class="ha-checkbox">
    <input type="checkbox" id="opt1" name="options">
    <span class="label">Option 1</span>
  </div>
  <div class="ha-checkbox">
    <input type="checkbox" id="opt2" name="options">
    <span class="label">Option 2</span>
  </div>
</fieldset>

<!-- With aria-label for icon-only checkbox -->
<div class="ha-checkbox">
  <input
    type="checkbox"
    id="favorite"
    aria-label="Add to favorites"
  >
</div>
```

### Focus Indicators

The component provides visible focus indicators:
- 2px solid outline at 2px offset
- Uses `--primary-default` color
- Changes to `--error-default` in error state
- WCAG 2.1 AA compliant contrast ratio

### Screen Reader Support

```html
<!-- Descriptive labels -->
<label for="subscribe">
  <input type="checkbox" id="subscribe">
  Subscribe to our newsletter
</label>

<!-- With additional description -->
<div>
  <label for="subscribe">
    <input type="checkbox" id="subscribe" aria-describedby="subscribe-help">
    Subscribe to our newsletter
  </label>
  <p id="subscribe-help">We send emails once per week</p>
</div>
```

---

## Best Practices

### ✅ Recommended

1. **Always provide labels**
   - Use explicit `<label>` or inline span labels
   - Never rely on title attributes alone

2. **Group related checkboxes**
   - Use `<fieldset>` and `<legend>` for checkbox groups
   - Provides context and structure

3. **Use descriptive labels**
   - Be clear about what selecting the checkbox means
   - Avoid generic labels like "Option 1"

4. **Provide helpful descriptions**
   - Add optional description text for complex choices
   - Use `.description` class for error messages

5. **Size appropriately**
   - Use large (lg) on mobile devices
   - Use small (sm) in dense tables only
   - Default (md) for most forms

6. **Implement parent-child relationships**
   - Use indeterminate state for parent checkboxes
   - Auto-select/deselect children when parent changes

### ❌ Not Recommended

1. **Using radio buttons for multiple selection**
   - Use checkboxes, not radio buttons, for multiple items
   - Radio buttons are only for single selection

2. **Omitting labels**
   - Never have checkbox without associated label
   - Always use proper `<label>` element or equivalent

3. **Pre-selecting checkboxes without user intent**
   - Avoid auto-checking checkboxes (especially consent)
   - Let users make explicit choices

4. **Very long labels**
   - Break into label + description
   - Use line length of 80 characters or less

5. **Disabling without explanation**
   - If disabled, explain why in description
   - Consider enabling with warning instead

6. **Using checkboxes for navigation**
   - Never use to trigger page navigation
   - Use buttons or links instead

---

## Variations

### Select All Pattern

```html
<div class="ha-checkbox">
  <input
    type="checkbox"
    id="select-all"
    aria-label="Select all items"
  >
  <span class="label">Select All</span>
</div>

<div class="ha-checkbox">
  <input type="checkbox" class="item-checkbox">
  <span class="label">Item 1</span>
</div>

<div class="ha-checkbox">
  <input type="checkbox" class="item-checkbox">
  <span class="label">Item 2</span>
</div>

<script>
const selectAll = document.getElementById('select-all');
const items = document.querySelectorAll('.item-checkbox');

selectAll.addEventListener('change', () => {
  items.forEach(item => item.checked = selectAll.checked);
});

items.forEach(item => {
  item.addEventListener('change', () => {
    selectAll.indeterminate =
      Array.from(items).some(i => i.checked) &&
      !Array.from(items).every(i => i.checked);
    selectAll.checked = Array.from(items).every(i => i.checked);
  });
});
</script>
```

### Conditional Checkboxes

```html
<div class="ha-checkbox">
  <input
    type="checkbox"
    id="enable-options"
    aria-controls="conditional-group"
  >
  <span class="label">Enable advanced options</span>
</div>

<fieldset id="conditional-group" disabled>
  <div class="ha-checkbox">
    <input type="checkbox" id="option-a">
    <span class="label">Option A</span>
  </div>

  <div class="ha-checkbox">
    <input type="checkbox" id="option-b">
    <span class="label">Option B</span>
  </div>
</fieldset>

<script>
document.getElementById('enable-options').addEventListener('change', (e) => {
  document.getElementById('conditional-group').disabled = !e.target.checked;
});
</script>
```

### Checkbox with Icon

```html
<div class="ha-checkbox">
  <input type="checkbox" id="icon-check" aria-label="Mark as important">
  <svg class="icon" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
  </svg>
  <span class="label">Mark as important</span>
</div>
```

---

## Theme Support

All checkbox tokens support theme switching via the `data-theme` attribute:

```html
<!-- Light theme -->
<html data-theme="light">
  <div class="ha-checkbox">
    <input type="checkbox" checked>
    <span class="label">Checkbox in light mode</span>
  </div>
</html>

<!-- Dark theme -->
<html data-theme="dark">
  <div class="ha-checkbox">
    <input type="checkbox" checked>
    <span class="label">Checkbox in dark mode</span>
  </div>
</html>
```

---

## Integration Examples

### With Form Validation

```html
<form>
  <div class="ha-checkbox" id="terms-group" error>
    <input
      type="checkbox"
      id="terms"
      required
      aria-describedby="terms-error"
    >
    <span class="label">I agree to the terms of service</span>
    <span id="terms-error" class="description" style="display: none;">
      You must agree to continue
    </span>
  </div>

  <button type="submit">Submit</button>
</form>

<script>
const form = document.querySelector('form');
const termsCheckbox = document.getElementById('terms');
const termsError = document.getElementById('terms-error');
const termsGroup = document.getElementById('terms-group');

form.addEventListener('submit', (e) => {
  if (!termsCheckbox.checked) {
    e.preventDefault();
    termsError.style.display = 'block';
    termsGroup.setAttribute('error', '');
    termsCheckbox.focus();
  }
});

termsCheckbox.addEventListener('change', () => {
  if (termsCheckbox.checked) {
    termsError.style.display = 'none';
    termsGroup.removeAttribute('error');
  }
});
</script>
```

### With React Component

```jsx
import React, { useState } from 'react';

interface CheckboxProps {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox({
  id,
  label,
  description,
  error = false,
  errorMessage,
  size = 'md',
  disabled = false,
  checked = false,
  onChange,
}: CheckboxProps) {
  return (
    <div className="ha-checkbox" size={size} error={error ? '' : undefined}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error}
      />
      <span className="label">{label}</span>
      {(description || error) && (
        <span
          id={error ? `${id}-error` : undefined}
          className="description"
        >
          {error ? errorMessage : description}
        </span>
      )}
    </div>
  );
}

// Usage
function SubscriptionForm() {
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) {
      setTermsError(true);
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox
        id="newsletter"
        label="Subscribe to newsletter"
        description="Receive weekly updates"
        checked={newsletter}
        onChange={setNewsletter}
      />

      <Checkbox
        id="terms"
        label="I agree to the terms of service"
        checked={terms}
        onChange={(checked) => {
          setTerms(checked);
          if (checked) setTermsError(false);
        }}
        error={termsError}
        errorMessage="You must agree to continue"
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

---

## Related Components

- [Radio](./radio.md) - Single selection from mutually exclusive options
- [Switch](./switch.md) - Binary on/off toggle
- [Select](./select.md) - Dropdown selection
- [Input](./input.md) - Text input fields
- [Form Group](./form-group.md) - Group form controls together

---

## Related Documentation

- [Architecture Guide](../architecture.md)
- [Design Tokens](../tokens.md)
- [Component Reference](./README.md)

---

**Last Updated:** 2025-12-12
