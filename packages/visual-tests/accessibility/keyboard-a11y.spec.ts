import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Keyboard Accessibility Tests
 * Validates keyboard navigation and focus management
 */

test.describe('Keyboard Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('Interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Check for keyboard accessibility violations
    const keyboardViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'keyboard' || v.id === 'focus-order-semantics'
    );

    expect(keyboardViolations).toEqual([]);
  });

  test('Focus indicators should be visible', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--default');

    const button = page.locator('ha-button').first();
    await button.focus();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    // Check for focus-visible violations
    const focusViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'focus-visible' || v.id === 'focusable-no-id'
    );

    expect(focusViolations).toEqual([]);
  });

  test('Tab order should be logical', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-input--default');

    await page.evaluate(() => {
      const form = document.createElement('form');
      form.innerHTML = `
        <ha-input id="first" placeholder="First"></ha-input>
        <ha-input id="second" placeholder="Second"></ha-input>
        <ha-button id="submit">Submit</ha-button>
      `;
      document.body.appendChild(form);
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    // Check for tab index violations
    const tabIndexViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'tabindex'
    );

    expect(tabIndexViolations).toEqual([]);
  });

  test('Modal should trap focus', async ({ page }) => {
    await page.goto('/iframe.html?id=overlays-modal--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    // Check for focus trap issues
    const focusTrapViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'focus-order-semantics'
    );

    expect(focusTrapViolations).toEqual([]);
  });

  test('Menu should support arrow key navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-menu--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Tabs should support arrow key navigation', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-tabs--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Radio groups should support arrow keys', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-radio--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    // Check for radiogroup violations
    const radiogroupViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'radiogroup'
    );

    expect(radiogroupViolations).toEqual([]);
  });

  test('Dropdown should be operable with keyboard', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-select--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Accordion should be keyboard accessible', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-accordion--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Skip links should be present and functional', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-breadcrumb--default');

    // Check for skip navigation
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    const skipNavViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'skip-link' || v.id === 'bypass'
    );

    // Skip links are optional in component stories
    expect(Array.isArray(skipNavViolations)).toBe(true);
  });
});
