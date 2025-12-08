# Storybook Addons Configuration

This document describes the Storybook addons configured for the Hidearea Design System and how to use them effectively.

## Configured Addons

### 1. **Accessibility (a11y) Addon** ✅

**Package**: `@storybook/addon-a11y`  
**Purpose**: Automated accessibility testing in Storybook

#### Features

- ✅ **WCAG 2.1 AA Compliance**: Automatically checks for WCAG 2.1 AA violations
- ✅ **Real-time Testing**: Tests run automatically as you interact with components
- ✅ **Visual Feedback**: Highlights accessibility issues directly in the canvas
- ✅ **Detailed Reports**: Provides actionable feedback for fixing issues

#### Configuration

Located in `.storybook/preview.ts`:

```typescript
a11y: {
  config: {
    rules: [
      { id: 'color-contrast', enabled: true },
      { id: 'label', enabled: true },
      { id: 'button-name', enabled: true },
      { id: 'link-name', enabled: true },
      { id: 'aria-allowed-attr', enabled: true },
      { id: 'aria-required-attr', enabled: true },
      { id: 'aria-valid-attr-value', enabled: true },
      { id: 'aria-valid-attr', enabled: true },
      { id: 'tabindex', enabled: true },
    ],
  },
  options: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  },
  manual: false,
}
```

#### Usage

1. Open any story in Storybook
2. Click the "Accessibility" tab in the addon panel
3. View detected violations, passes, and incomplete tests
4. Click on a violation to see:
   - Description of the issue
   - Which element has the problem
   - How to fix it
   - Related WCAG criteria

#### Best Practices

- **Fix violations immediately**: Don't let accessibility debt accumulate
- **Test all states**: Hover, focus, disabled, error states
- **Use semantic HTML**: Proper element types reduce violations
- **Add ARIA when needed**: But prefer semantic HTML first

---

### 2. **Viewport Addon** ✅

**Built-in**: Storybook Core  
**Purpose**: Responsive design testing across different screen sizes

#### Features

- ✅ **7 Predefined Viewports**: Mobile to Ultra Wide
- ✅ **Quick Switching**: One-click viewport changes
- ✅ **Orientation Support**: Portrait and landscape modes
- ✅ **Custom Viewports**: Easily add project-specific sizes

#### Configured Viewports

| Name | Width × Height | Type | Use Case |
|------|----------------|------|----------|
| Mobile | 375px × 667px | mobile | iPhone SE, 8 |
| Mobile Landscape | 667px × 375px | mobile | Landscape mode |
| Tablet | 768px × 1024px | tablet | iPad |
| Tablet Landscape | 1024px × 768px | tablet | iPad landscape |
| Desktop | 1280px × 800px | desktop | Standard desktop |
| Wide Desktop | 1920px × 1080px | desktop | Full HD |
| Ultra Wide | 2560px × 1440px | desktop | 2K displays |

#### Usage

1. Click the viewport toolbar icon in Storybook
2. Select a viewport from the dropdown
3. Component automatically resizes
4. Test responsive behavior

#### Testing Responsive Components

```typescript
// Example story with viewport-specific rendering
export const ResponsiveCard: Story = {
  args: {
    title: 'Responsive Card',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};
```

---

### 3. **Controls Addon** ✅

**Built-in**: Storybook Core (part of essentials)  
**Purpose**: Interactive prop editing

#### Features

- ✅ **Type-Based Controls**: Automatically infers control types
- ✅ **Live Editing**: Change props in real-time
- ✅ **Expanded View**: All controls visible by default
- ✅ **Alphabetical Sorting**: Easy to find controls

#### Configuration

```typescript
controls: {
  matchers: {
    color: /(background|color)$/i,
    date: /Date$/i,
  },
  expanded: true,  // Show all controls expanded
  sort: 'alpha',   // Alphabetical order
}
```

#### Usage

1. Open any story
2. View the "Controls" tab in the addon panel
3. Modify props using the interactive controls:
   - **Text**: String inputs
   - **Number**: Number inputs with increment/decrement
   - **Boolean**: Toggle switches
   - **Select**: Dropdown menus
   - **Radio**: Radio button groups
   - **Color**: Color picker
   - **Date**: Date picker

#### Advanced Control Types

```typescript
export const Button: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    onClick: { action: 'clicked' },
  },
};
```

---

### 4. **Docs Addon** ⚠️

**Built-in**: Storybook Core (part of essentials)  
**Purpose**: Automatic documentation generation  
**Status**: Limited support for Web Components in Storybook 10

#### Important Note

The autodocs feature is **not fully supported** for Web Components in Storybook 10.1.2. The automatic documentation generation can cause rendering errors:

```
TypeError: i.renderer is not a function
```

**Current Status:**
- ❌ Autodocs disabled to prevent errors
- ✅ Manual MDX documentation works
- ✅ Story examples still displayed
- ⏳ Waiting for full Web Components support

#### Configuration

```typescript
// Currently disabled in main.ts
// docs: {
//   autodocs: "tag",  // Not supported for Web Components yet
// },
```

#### Workaround: Manual MDX Documentation

Create custom `.mdx` files for component documentation:

```mdx
import { Meta, Story, Canvas } from '@storybook/blocks';
import * as ButtonStories from './button.stories';

<Meta of={ButtonStories} />

# Button Component

The Button component provides interactive elements for user actions.

## Examples

### Primary Button

<Canvas of={ButtonStories.Primary} />

### Sizes

<Canvas of={ButtonStories.Small} />
<Canvas of={ButtonStories.Medium} />
<Canvas of={ButtonStories.Large} />

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Button style variant |
| size | string | 'md' | Button size |
| disabled | boolean | false | Disabled state |
```

#### Future Enhancement

Once Storybook improves Web Components support, we can re-enable:
- Automatic props table generation
- Auto-generated documentation
- Table of contents

---
### 5. **Actions Addon** ✅

**Built-in**: Storybook Core (part of essentials)  
**Purpose**: Event handler logging

#### Features

- ✅ **Auto-Detection**: Automatically logs event handlers
- ✅ **Pattern Matching**: Configurable event name patterns
- ✅ **Detailed Logs**: Full event data capture

#### Configuration

```typescript
actions: { 
  argTypesRegex: "^on[A-Z].*"  // Matches onClick, onChange, etc.
}
```

#### Usage

1. Click the "Actions" tab in the addon panel
2. Interact with component (click, change, etc.)
3. View logged actions with:
   - Event name
   - Timestamp
   - Event data/payload

```typescript
export const Interactive: Story = {
  args: {
    onClick: () => console.log('Clicked!'),
    onChange: (e) => console.log('Changed:', e.target.value),
  },
};
```

---

### 6. **Theme Switcher** ✅

**Custom Implementation**  
**Purpose**: Light/Dark theme testing

#### Features

- ✅ **3 Theme Modes**: Light, Dark, Auto
- ✅ **Persisted State**: Theme selection saved
- ✅ **Auto Mode**: Follows system preferences
- ✅ **Real-time Switching**: Instant theme changes

#### Usage

1. Click theme icon in toolbar
2. Select:
   - **Light**: Force light theme
   - **Dark**: Force dark theme
   - **Auto**: Follow system preference

3. All components update immediately

#### Implementation

```typescript
globalTypes: {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'circlehollow' },
        { value: 'dark', title: 'Dark', icon: 'circle' },
        { value: 'auto', title: 'Auto', icon: 'sync' },
      ],
      dynamicTitle: true,
    },
  },
}
```

---

### 7. **Backgrounds Addon** ✅

**Built-in**: Storybook Core (part of essentials)  
**Purpose**: Component testing on different backgrounds

#### Configured Backgrounds

- **Light**: `#ffffff` (default)
- **Dark**: `#171717`
- **Gray**: `#f5f5f5`

#### Usage

1. Click backgrounds icon in toolbar
2. Select background color
3. Test component contrast and visibility

---

## Story Sorting ✅

Stories are automatically sorted in logical order:

```typescript
options: {
  storySort: {
    order: [
      'Introduction',
      'Getting Started',
      'Design Tokens',
      'Components',
      ['Form', 'Layout', 'Data Display', 'Feedback', 'Navigation', 'Utility'],
      'Examples',
    ],
  },
}
```

---

## Best Practices

### Accessibility Testing

1. **Run a11y checks on all stories**
2. **Test all interactive states**
3. **Fix violations immediately**
4. **Document accessibility features**

### Responsive Testing

1. **Test on mobile first**
2. **Check tablet breakpoints**
3. **Verify desktop layout**
4. **Test landscape orientations**

### Documentation

1. **Add `tags: ['autodocs']` to meta**
2. **Write clear descriptions**
3. **Include usage examples**
4. **Document all props**

### Component Testing

1. **Use controls to test edge cases**
2. **Log events with actions**
3. **Test all variants**
4. **Check theme compatibility**

---

## Troubleshooting

### Accessibility tab not showing

- Ensure `@storybook/addon-a11y` is installed
- Check `.storybook/main.ts` includes the addon
- Restart Storybook server

### Viewport not changing

- Check browser zoom is at 100%
- Try refreshing the page
- Verify viewport configuration in preview.ts

### Theme not applying

- Check Shadow DOM components
- Verify CSS custom properties inheritance
- Ensure `initTheme()` is called

### Controls not updating

- Check argTypes configuration
- Verify story args are defined
- Refresh Storybook

---

## Future Enhancements

Potential addons to add in the future:

- **Interactions**: For interaction testing (when Storybook 10 support is available)
- **Measure**: For measuring element dimensions
- **Outline**: For visualizing element boundaries
- **Pseudo States**: For testing :hover, :focus, :active
- **Design Assets**: For design token comparison

---

## Resources

- [Storybook Addons Official Docs](https://storybook.js.org/docs/react/essentials/introduction)
- [A11y Addon Documentation](https://storybook.js.org/addons/@storybook/addon-a11y)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Viewport Addon Guide](https://storybook.js.org/docs/react/essentials/viewport)

