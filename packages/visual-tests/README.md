# Visual Regression Testing

Visual regression testing for Hidearea Design System using Playwright.

## Overview

This package provides visual regression testing to ensure that UI changes don't introduce unintended visual bugs. Tests capture screenshots of components in various states and compare them against baseline images.

## Features

- ✅ **Multi-browser testing**: Chromium, Firefox, WebKit
- ✅ **Responsive testing**: Desktop, tablet, mobile viewports
- ✅ **Dark theme testing**: Automatic dark mode snapshots
- ✅ **State testing**: Hover, focus, disabled, error states
- ✅ **CI/CD ready**: GitHub Actions integration
- ✅ **Storybook integration**: Tests run against Storybook stories

## Installation

```bash
# Install dependencies
npm install --workspace=@hidearea-design/visual-tests

# Install Playwright browsers
npx playwright install
```

## Usage

### Run all tests

```bash
npm run test --workspace=@hidearea-design/visual-tests
```

### Run tests in UI mode

```bash
npm run test:ui --workspace=@hidearea-design/visual-tests
```

### Update snapshots

```bash
npm run test:update --workspace=@hidearea-design/visual-tests
```

### Run tests for specific browser

```bash
npm run test:chromium --workspace=@hidearea-design/visual-tests
npm run test:firefox --workspace=@hidearea-design/visual-tests
npm run test:webkit --workspace=@hidearea-design/visual-tests
```

### Debug tests

```bash
npm run test:debug --workspace=@hidearea-design/visual-tests
```

### View test report

```bash
npm run report --workspace=@hidearea-design/visual-tests
```

## Test Structure

```
packages/visual-tests/
├── tests/
│   ├── button.visual.spec.ts      # Button component tests
│   ├── input.visual.spec.ts       # Input component tests
│   ├── modal.visual.spec.ts       # Modal component tests
│   └── ...                        # Other component tests
├── playwright.config.ts           # Playwright configuration
└── package.json
```

## Writing Visual Tests

### Basic test structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Visual Regression', () => {
  test('renders correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-component--default');

    const component = page.locator('ha-component');
    await expect(component).toBeVisible();

    await expect(page).toHaveScreenshot('component-default.png');
  });
});
```

### Testing different states

```typescript
test('hover state renders correctly', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--primary');

  const button = page.locator('ha-button');
  await button.hover();

  await expect(page).toHaveScreenshot('button-hover.png');
});

test('focus state renders correctly', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--primary');

  const button = page.locator('ha-button');
  await button.focus();

  await expect(page).toHaveScreenshot('button-focus.png');
});
```

### Testing dark theme

```typescript
test('dark theme renders correctly', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--primary');

  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  await expect(page).toHaveScreenshot('button-dark-theme.png');
});
```

### Testing mobile viewport

```typescript
test('mobile viewport renders correctly', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/iframe.html?id=components-modal--default');

  await expect(page).toHaveScreenshot('modal-mobile.png', {
    fullPage: true,
  });
});
```

## Best Practices

### 1. Wait for animations

```typescript
await page.waitForTimeout(300); // Wait for animation to complete
await expect(page).toHaveScreenshot('component.png');
```

### 2. Use consistent viewport sizes

Tests use consistent viewport sizes defined in `playwright.config.ts`:
- Desktop: 1280x720
- Mobile: Device-specific (Pixel 5, iPhone 12)
- Tablet: iPad Pro

### 3. Name snapshots descriptively

```typescript
// Good
await expect(page).toHaveScreenshot('button-primary-hover.png');

// Bad
await expect(page).toHaveScreenshot('test1.png');
```

### 4. Test critical states

Always test:
- Default state
- Hover state (desktop)
- Focus state
- Disabled state
- Error state
- Dark theme
- Mobile viewport (for responsive components)

### 5. Use fullPage for overlays

```typescript
// For modals, drawers, tooltips
await expect(page).toHaveScreenshot('modal.png', {
  fullPage: true,
});
```

## Snapshot Management

### Baseline snapshots

Baseline snapshots are stored in `tests/<component>.visual.spec.ts-snapshots/`:

```
tests/
└── button.visual.spec.ts-snapshots/
    ├── button-default-chromium-darwin.png
    ├── button-primary-chromium-darwin.png
    └── ...
```

### Updating snapshots

When intentional UI changes are made:

```bash
npm run test:update --workspace=@hidearea-design/visual-tests
```

### Reviewing failed tests

```bash
# View HTML report with visual diffs
npm run report --workspace=@hidearea-design/visual-tests
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Visual Regression Tests

on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run visual tests
        run: npm run test --workspace=@hidearea-design/visual-tests

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: packages/visual-tests/test-results/
```

## Configuration

### Playwright Config

Key settings in `playwright.config.ts`:

```typescript
{
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
  },
}
```

## Troubleshooting

### Tests fail on different OS

Snapshots are OS-specific. Use consistent OS for CI:

```yaml
runs-on: ubuntu-latest  # Always use same OS
```

### Flaky tests

Add explicit waits:

```typescript
await page.waitForLoadState('networkidle');
await page.waitForTimeout(300);
```

### Storybook not starting

Check port availability:

```bash
lsof -i :6006
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Visual Comparison Documentation](https://playwright.dev/docs/test-snapshots)
- [Best Practices](https://playwright.dev/docs/best-practices)
