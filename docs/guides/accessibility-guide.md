# Accessibility Guide

Hidearea Design System is built with accessibility as a core principle. This guide provides best practices and implementation details for creating accessible web applications.

## Table of Contents

- [Overview](#overview)
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Color and Contrast](#color-and-contrast)
- [Component-Specific Guidelines](#component-specific-guidelines)
- [Testing Accessibility](#testing-accessibility)
- [Common Patterns](#common-patterns)

---

## Overview

### Accessibility Standards

Hidearea Design System follows:
- **WCAG 2.1 Level AA** compliance
- **WAI-ARIA 1.2** authoring practices
- **Section 508** requirements

### Core Principles

1. **Perceivable**: Content is available to all users
2. **Operable**: Users can interact via keyboard and assistive tech
3. **Understandable**: Clear, consistent interface and behavior
4. **Robust**: Works with current and future assistive technologies

---

## WCAG Compliance

### Success Criteria Coverage

| Level | Coverage | Status |
|-------|----------|--------|
| A | 100% | ✅ Compliant |
| AA | 100% | ✅ Compliant |
| AAA | Partial | 🚧 In Progress |

### Key Requirements Met

#### 1.4.3 Contrast (Minimum) - Level AA
All text and interactive elements meet minimum contrast ratios:
- **Normal text**: 4.5:1
- **Large text**: 3:1
- **UI components**: 3:1

#### 2.1.1 Keyboard - Level A
All functionality is available via keyboard:
```html
<!-- Tab navigation works out of the box -->
<ha-button>Accessible via Tab</ha-button>
<ha-input label="Accessible via Tab" />

<!-- Custom focus management -->
<ha-modal id="modal">
  <!-- Focus trapped within modal when open -->
  <ha-button>Button in Modal</ha-button>
</ha-modal>
```

#### 4.1.2 Name, Role, Value - Level A
All components have proper ARIA attributes:
```html
<!-- Semantic roles -->
<ha-button role="button">Action</ha-button>

<!-- Accessible names -->
<ha-input aria-label="Search" placeholder="Search..." />

<!-- State information -->
<ha-checkbox checked aria-checked="true">Accepted</ha-checkbox>
```

---

## Keyboard Navigation

### Standard Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` | Activate button/link |
| `Space` | Activate button/toggle checkbox |
| `Esc` | Close modal/drawer/dropdown |
| `Arrow Keys` | Navigate within component (tabs, menus, etc.) |

### Focus Management

#### Focus Indicators
All components have visible focus indicators:
```css
/* Focus styles are built-in */
ha-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

#### Focus Trapping
Modals and drawers automatically trap focus:
```html
<ha-modal id="dialog" open>
  <!-- Focus cycles within these elements -->
  <ha-input label="Name" />
  <ha-button>Save</ha-button>
  <ha-button>Cancel</ha-button>
</ha-modal>
```

#### Skip Links
Implement skip links for better navigation:
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<main id="main-content">
  <!-- Main content here -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

---

## Screen Reader Support

### Semantic HTML

Always use semantic elements:
```html
<!-- Good: Semantic structure -->
<nav aria-label="Main navigation">
  <ha-menu>
    <ha-menu-item>Home</ha-menu-item>
    <ha-menu-item>About</ha-menu-item>
  </ha-menu>
</nav>

<main>
  <ha-card>
    <h2 slot="title">Article Title</h2>
    <p>Article content...</p>
  </ha-card>
</main>
```

### ARIA Labels

#### aria-label
Provide accessible names when visual labels aren't sufficient:
```html
<!-- Icon-only button -->
<ha-button aria-label="Close dialog">
  <svg><!-- X icon --></svg>
</ha-button>

<!-- Search input -->
<ha-input
  type="search"
  aria-label="Search products"
  placeholder="Search..."
/>
```

#### aria-labelledby
Reference existing text as the label:
```html
<h2 id="dialog-title">Confirm Action</h2>
<ha-modal aria-labelledby="dialog-title">
  <p>Are you sure you want to proceed?</p>
</ha-modal>
```

#### aria-describedby
Provide additional context:
```html
<ha-form-group
  label="Password"
  helper-text="Must be at least 8 characters"
>
  <ha-input
    type="password"
    aria-describedby="password-hint"
  />
</ha-form-group>
<span id="password-hint" class="sr-only">
  Must contain uppercase, lowercase, and numbers
</span>
```

### Live Regions

Announce dynamic changes:
```html
<!-- Polite announcements (non-interrupting) -->
<div aria-live="polite" aria-atomic="true">
  <!-- Updated content announced after current speech -->
</div>

<!-- Assertive announcements (interrupting) -->
<div aria-live="assertive" aria-atomic="true">
  <!-- Critical updates announced immediately -->
</div>
```

Example with Toast:
```html
<ha-toast
  variant="success"
  aria-live="polite"
  role="status"
>
  Changes saved successfully
</ha-toast>
```

### Screen Reader Only Text

Hide content visually but keep it accessible:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Usage:
```html
<ha-button>
  Delete
  <span class="sr-only">user account</span>
</ha-button>
<!-- Announces: "Delete user account" -->
```

---

## Color and Contrast

### Contrast Ratios

Hidearea Design tokens ensure proper contrast:
```css
/* Text on background */
--color-text-primary: #1a1a1a;      /* 15.8:1 on white */
--color-text-secondary: #666666;    /* 5.7:1 on white */

/* Interactive elements */
--color-primary: #0066cc;           /* 4.5:1 on white */
--color-primary-hover: #0052a3;     /* 5.9:1 on white */

/* Borders and separators */
--color-border: #d1d5db;            /* 3:1 on white */
```

### Don't Rely on Color Alone

Always provide additional indicators:
```html
<!-- Bad: Color only -->
<ha-alert variant="error">
  Error occurred
</ha-alert>

<!-- Good: Icon + Color -->
<ha-alert variant="error">
  <svg slot="prefix"><!-- Error icon --></svg>
  Error occurred: Invalid email format
</ha-alert>

<!-- Form validation -->
<ha-form-group
  label="Email"
  error="Please enter a valid email"
  required
>
  <ha-input
    type="email"
    invalid
    aria-invalid="true"
  />
</ha-form-group>
```

### Color Blind Accessibility

Test with color blindness simulators and ensure:
- Red/green combinations have sufficient brightness difference
- Important information isn't conveyed by color alone
- Use patterns, icons, or text alongside color

---

## Component-Specific Guidelines

### Buttons

```html
<!-- Text buttons -->
<ha-button variant="primary">
  Save Changes
</ha-button>

<!-- Icon buttons need labels -->
<ha-button variant="ghost" aria-label="Delete item">
  <svg><!-- Trash icon --></svg>
</ha-button>

<!-- Loading state -->
<ha-button loading disabled aria-busy="true">
  Processing...
</ha-button>
```

### Forms

```html
<form>
  <!-- Always use labels -->
  <ha-form-group label="Full Name" required>
    <ha-input
      name="name"
      required
      aria-required="true"
    />
  </ha-form-group>

  <!-- Error states -->
  <ha-form-group
    label="Email"
    error="Please enter a valid email address"
  >
    <ha-input
      type="email"
      invalid
      aria-invalid="true"
      aria-describedby="email-error"
    />
  </ha-form-group>
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>

  <!-- Fieldsets for groups -->
  <fieldset>
    <legend>Notification Preferences</legend>
    <ha-checkbox name="email">Email notifications</ha-checkbox>
    <ha-checkbox name="sms">SMS notifications</ha-checkbox>
  </fieldset>
</form>
```

### Modals and Dialogs

```html
<ha-modal
  id="confirmDialog"
  title="Confirm Action"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title" slot="title">Delete Account</h2>
  <p id="dialog-description">
    This action cannot be undone. Are you sure?
  </p>

  <div slot="footer">
    <ha-button variant="secondary">Cancel</ha-button>
    <ha-button variant="danger">Delete</ha-button>
  </div>
</ha-modal>

<script>
// Focus management
const modal = document.getElementById('confirmDialog');
const previousFocus = document.activeElement;

modal.addEventListener('close', () => {
  // Return focus to trigger element
  previousFocus?.focus();
});
</script>
```

### Tables

```html
<ha-table>
  <table>
    <caption>User List</caption>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">John Doe</th>
        <td>john@example.com</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </table>
</ha-table>
```

### Tabs

```html
<ha-tabs>
  <ha-tab-item
    slot="tabs"
    panel="panel1"
    role="tab"
    aria-selected="true"
  >
    Profile
  </ha-tab-item>
  <ha-tab-item
    slot="tabs"
    panel="panel2"
    role="tab"
    aria-selected="false"
  >
    Settings
  </ha-tab-item>

  <ha-tab-panel id="panel1" role="tabpanel">
    Profile content
  </ha-tab-panel>
  <ha-tab-panel id="panel2" role="tabpanel">
    Settings content
  </ha-tab-panel>
</ha-tabs>
```

---

## Testing Accessibility

### Automated Testing

Use the built-in accessibility test utilities:
```typescript
import { expectNoA11yViolations } from '@hidearea-design/core/test-utils';

it('should have no accessibility violations', async () => {
  const button = document.createElement('ha-button');
  button.textContent = 'Click me';
  document.body.appendChild(button);

  await expectNoA11yViolations(button);
});
```

### Manual Testing Checklist

- [ ] Navigate entire page using only keyboard
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check color contrast with tools
- [ ] Verify focus indicators are visible
- [ ] Test with browser zoom at 200%
- [ ] Check responsive behavior on mobile
- [ ] Verify form validation messages are announced

### Testing Tools

1. **axe DevTools**: Browser extension for automated checks
2. **Lighthouse**: Built into Chrome DevTools
3. **WAVE**: Web accessibility evaluation tool
4. **Screen Readers**:
   - Windows: NVDA (free), JAWS
   - macOS: VoiceOver (built-in)
   - Linux: Orca

---

## Common Patterns

### Loading States

```html
<!-- Button loading -->
<ha-button loading disabled aria-busy="true">
  <span aria-live="polite">Loading...</span>
</ha-button>

<!-- Content loading -->
<div role="status" aria-live="polite" aria-busy="true">
  <ha-spinner></ha-spinner>
  <span class="sr-only">Loading content...</span>
</div>
```

### Error Messages

```html
<!-- Inline validation -->
<ha-form-group
  label="Username"
  error="Username is already taken"
>
  <ha-input
    invalid
    aria-invalid="true"
    aria-describedby="username-error"
  />
</ha-form-group>
<div id="username-error" role="alert" aria-live="assertive">
  Username is already taken
</div>

<!-- Toast notification -->
<ha-toast
  variant="error"
  role="alert"
  aria-live="assertive"
>
  Failed to save changes
</ha-toast>
```

### Progressive Disclosure

```html
<!-- Accordion -->
<ha-accordion>
  <ha-accordion-item
    aria-expanded="false"
    aria-controls="panel1"
  >
    <span slot="title">Section 1</span>
    <div id="panel1">Hidden content until expanded</div>
  </ha-accordion-item>
</ha-accordion>

<!-- Expandable details -->
<details>
  <summary>
    <ha-button variant="ghost">Show more</ha-button>
  </summary>
  <p>Additional content...</p>
</details>
```

### Data Tables with Sorting

```html
<ha-table>
  <table>
    <thead>
      <tr>
        <th scope="col">
          <ha-button
            variant="ghost"
            aria-sort="ascending"
            aria-label="Sort by name, ascending"
          >
            Name
          </ha-button>
        </th>
      </tr>
    </thead>
  </table>
</ha-table>
```

---

## Resources

### Guidelines and Standards
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508](https://www.section508.gov/)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Further Reading
- [Accessibility Testing Guide](./accessibility-testing.md)
- [Inline Styles Rationale](./inline-styles-rationale.md)
- [Migration Guide](./migration-guide.md)

---

## Getting Help

If you encounter accessibility issues:

1. Check component documentation for ARIA attributes
2. Review this guide for common patterns
3. Report issues on GitHub with:
   - Component name
   - Screen reader and browser used
   - Expected vs actual behavior
4. Join community discussions for support
