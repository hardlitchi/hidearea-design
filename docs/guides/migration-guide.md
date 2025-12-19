# Migration Guide

This guide provides practical examples for migrating from other UI libraries to Hidearea Design System, as well as upgrading between versions.

## Table of Contents

- [Migrating from Plain HTML](#migrating-from-plain-html)
- [Migrating from Bootstrap](#migrating-from-bootstrap)
- [Migrating from Material-UI](#migrating-from-material-ui)
- [Framework-Specific Migration](#framework-specific-migration)
- [Version Upgrades](#version-upgrades)

---

## Migrating from Plain HTML

### Basic Form

**Before (Plain HTML):**
```html
<form>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required>
  </div>

  <button type="submit">Login</button>
</form>
```

**After (Hidearea Design):**
```html
<form>
  <ha-form-group label="Email" required>
    <ha-input
      type="email"
      name="email"
      placeholder="Enter your email"
      required>
    </ha-input>
  </ha-form-group>

  <ha-form-group label="Password" required>
    <ha-input
      type="password"
      name="password"
      placeholder="Enter your password"
      required>
    </ha-input>
  </ha-form-group>

  <ha-button type="submit" variant="primary">Login</ha-button>
</form>
```

### Modal Dialog

**Before (Plain HTML + JavaScript):**
```html
<div class="modal" id="myModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Modal Title</h2>
    <p>Modal content here</p>
  </div>
</div>

<script>
  const modal = document.getElementById('myModal');
  const closeBtn = document.querySelector('.close');

  closeBtn.onclick = () => modal.style.display = 'none';
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
</script>
```

**After (Hidearea Design):**
```html
<ha-button id="openBtn">Open Modal</ha-button>

<ha-modal id="myModal" title="Modal Title">
  <p>Modal content here</p>
  <div slot="footer">
    <ha-button variant="secondary" id="cancelBtn">Cancel</ha-button>
    <ha-button variant="primary" id="confirmBtn">Confirm</ha-button>
  </div>
</ha-modal>

<script>
  const modal = document.getElementById('myModal');
  document.getElementById('openBtn').addEventListener('click', () => {
    modal.open();
  });

  document.getElementById('cancelBtn').addEventListener('click', () => {
    modal.close();
  });
</script>
```

---

## Migrating from Bootstrap

### Alerts

**Before (Bootstrap):**
```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Your changes have been saved.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

**After (Hidearea Design):**
```html
<ha-alert variant="success" closable>
  <strong>Success!</strong> Your changes have been saved.
</ha-alert>
```

### Buttons

**Before (Bootstrap):**
```html
<button type="button" class="btn btn-primary btn-lg">Large Button</button>
<button type="button" class="btn btn-outline-secondary" disabled>Disabled</button>
```

**After (Hidearea Design):**
```html
<ha-button variant="primary" size="large">Large Button</ha-button>
<ha-button variant="secondary" outline disabled>Disabled</ha-button>
```

### Cards

**Before (Bootstrap):**
```html
<div class="card">
  <div class="card-header">
    Card Header
  </div>
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <p class="card-text">Card content goes here.</p>
    <a href="#" class="btn btn-primary">Action</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
```

**After (Hidearea Design):**
```html
<ha-card>
  <div slot="header">Card Header</div>
  <div slot="title">Card Title</div>
  <p>Card content goes here.</p>
  <ha-button variant="primary">Action</ha-button>
  <div slot="footer">2 days ago</div>
</ha-card>
```

### Grid System

**Before (Bootstrap):**
```html
<div class="container">
  <div class="row">
    <div class="col-md-4">Column 1</div>
    <div class="col-md-4">Column 2</div>
    <div class="col-md-4">Column 3</div>
  </div>
</div>
```

**After (Hidearea Design):**
```html
<ha-container>
  <ha-grid columns="3" gap="md">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </ha-grid>
</ha-container>
```

---

## Migrating from Material-UI

### Text Fields

**Before (Material-UI React):**
```jsx
import TextField from '@mui/material/TextField';

<TextField
  label="Username"
  variant="outlined"
  required
  helperText="Enter your username"
  error={hasError}
/>
```

**After (Hidearea Design React):**
```jsx
import { FormGroup, Input } from '@hidearea-design/react';

<FormGroup
  label="Username"
  required
  helperText="Enter your username"
  error={hasError ? "Invalid username" : undefined}
>
  <Input
    name="username"
    placeholder="Enter your username"
  />
</FormGroup>
```

### Checkboxes

**Before (Material-UI React):**
```jsx
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

<FormControlLabel
  control={<Checkbox checked={checked} onChange={handleChange} />}
  label="Accept terms and conditions"
/>
```

**After (Hidearea Design React):**
```jsx
import { Checkbox } from '@hidearea-design/react';

<Checkbox
  checked={checked}
  onChange={(e) => handleChange(e.target.checked)}
  label="Accept terms and conditions"
/>
```

### Buttons with Icons

**Before (Material-UI React):**
```jsx
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

<Button variant="contained" endIcon={<SendIcon />}>
  Send
</Button>
```

**After (Hidearea Design React):**
```jsx
import { Button } from '@hidearea-design/react';

<Button variant="primary">
  Send
  <svg slot="suffix" width="16" height="16" viewBox="0 0 16 16">
    {/* Icon SVG path */}
  </svg>
</Button>
```

---

## Framework-Specific Migration

### React

**Setup:**
```jsx
// Before: Import from other library
import { Button, Input } from 'other-ui-library';

// After: Import from Hidearea Design
import { Button, Input } from '@hidearea-design/react';
```

**Event Handling:**
```jsx
// Hidearea Design uses native web component events
import { Input } from '@hidearea-design/react';

function MyComponent() {
  const handleChange = (e) => {
    console.log('Value:', e.target.value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      onInput={handleChange}
    />
  );
}
```

### Vue 3

**Setup:**
```js
// main.js
import { createApp } from 'vue';
import HideareaDesignVue from '@hidearea-design/vue';
import App from './App.vue';

const app = createApp(App);

// Option 1: Install all components globally
app.use(HideareaDesignVue);

// Option 2: Import individual components
import { Button, Input } from '@hidearea-design/vue';
app.component('HaButton', Button);
app.component('HaInput', Input);

app.mount('#app');
```

**Component Usage:**
```vue
<template>
  <HaFormGroup label="Email" required>
    <HaInput
      v-model="email"
      type="email"
      placeholder="Enter your email"
      @change="handleChange"
    />
  </HaFormGroup>

  <HaButton @click="submit" variant="primary">
    Submit
  </HaButton>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

const handleChange = (e) => {
  console.log('Email:', e.target.value);
};

const submit = () => {
  console.log('Submitted:', email.value);
};
</script>
```

### Vanilla JavaScript

**Setup:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@hidearea-design/core/dist/index.css">
</head>
<body>
  <ha-button id="myButton" variant="primary">Click Me</ha-button>

  <script type="module">
    import '@hidearea-design/core';

    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
      console.log('Button clicked!');
    });
  </script>
</body>
</html>
```

---

## Version Upgrades

### Breaking Changes by Version

#### v0.1.0 → v0.2.0 (Future)

Stay tuned for migration guides when new versions are released.

### Deprecation Warnings

Hidearea Design follows semantic versioning. When features are deprecated:

1. **Minor version**: Deprecation warnings are added
2. **Next major version**: Deprecated features are removed

Always check the CHANGELOG.md for deprecation notices and upgrade paths.

---

## Common Migration Patterns

### Form Validation

**Pattern:**
```html
<ha-form-group
  label="Email"
  required
  error="Please enter a valid email"
>
  <ha-input
    type="email"
    name="email"
    required
    invalid
  />
</ha-form-group>
```

### Loading States

**Pattern:**
```html
<ha-button variant="primary" loading disabled>
  Processing...
</ha-button>

<!-- Or use spinner separately -->
<ha-spinner size="small"></ha-spinner>
```

### Responsive Design

**Pattern:**
```html
<ha-grid
  columns="1"
  columns-sm="2"
  columns-md="3"
  columns-lg="4"
  gap="md"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ha-grid>
```

---

## Tips for Smooth Migration

### 1. Start Small
Begin with simple components like buttons and inputs before tackling complex layouts.

### 2. Use Type Safety
If using TypeScript, import types for better development experience:
```typescript
import type { ButtonProps, InputProps } from '@hidearea-design/react';
```

### 3. Test Incrementally
Migrate one page or component at a time and test thoroughly.

### 4. Check Accessibility
Hidearea Design components are built with accessibility in mind, but always verify:
- Keyboard navigation works
- Screen readers announce correctly
- Color contrast meets WCAG standards

### 5. Review Design Tokens
Familiarize yourself with available design tokens for consistent theming:
```css
/* Use design tokens instead of hardcoded values */
.custom-element {
  color: var(--color-text-primary);
  background: var(--color-background-surface);
  padding: var(--spacing-md);
}
```

---

## Getting Help

- **Documentation**: Check component-specific docs for detailed API reference
- **Examples**: See `docs/guides/examples.md` for more code samples
- **Issues**: Report migration difficulties on GitHub
- **Community**: Join discussions for migration support

---

## Next Steps

After completing your migration:

1. Review [Accessibility Guide](./accessibility-guide.md) for best practices
2. Explore [Design Tokens](../tokens/README.md) for theming
3. Check [Examples](./examples.md) for advanced patterns
