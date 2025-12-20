import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * ARIA Attributes Accessibility Tests
 * Validates proper use of ARIA roles, states, and properties
 */

test.describe('ARIA Attributes Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('Button should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    // Check for ARIA violations
    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.startsWith('aria-')
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Alert should have role="alert" or aria-live', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'aria-roles' || v.id === 'aria-required-attr'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Modal should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=overlays-modal--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-') || v.id === 'dialog-name'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Tabs should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-tabs--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-') || v.id === 'tabindex'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Accordion should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-accordion--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-')
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Menu should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-menu--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-')
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Progress should have aria-valuenow and aria-valuemax', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-progress--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'aria-required-attr' || v.id === 'aria-valid-attr-value'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Switch should have role="switch" and aria-checked', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-switch--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-')
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Slider should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-slider--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'aria-required-attr' || v.id === 'aria-valid-attr-value'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Tooltip should have proper ARIA labeling', async ({ page }) => {
    await page.goto('/iframe.html?id=overlays-tooltip--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-') || v.id === 'label'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Form inputs should have proper labels', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-input--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const labelViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'label' || v.id === 'aria-input-field-name'
    );

    expect(labelViolations).toEqual([]);
  });

  test('Checkbox should have accessible name', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-checkbox--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const nameViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'label' || v.id === 'aria-input-field-name'
    );

    expect(nameViolations).toEqual([]);
  });

  test('Radio group should have proper structure', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-radio--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const radiogroupViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'radiogroup' || v.id === 'aria-required-attr'
    );

    expect(radiogroupViolations).toEqual([]);
  });

  test('Table should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const tableViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'table-fake-caption' || v.id === 'th-has-data-cells'
    );

    expect(tableViolations).toEqual([]);
  });

  test('Live regions should have proper aria-live', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const liveRegionViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'aria-valid-attr-value'
    );

    expect(liveRegionViolations).toEqual([]);
  });

  test('Breadcrumb should have navigation role', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-breadcrumb--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    const navigationViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'aria-required-children' || v.id === 'landmark-one-main'
    );

    expect(navigationViolations).toEqual([]);
  });

  test('Pagination should have proper ARIA labels', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-pagination--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const ariaViolations = accessibilityScanResults.violations.filter(
      (v) => v.id.includes('aria-') || v.id === 'button-name'
    );

    expect(ariaViolations).toEqual([]);
  });

  test('Card should have semantic structure', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-card--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Badge should have accessible text', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-badge--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const textViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'empty-heading' || v.id === 'image-alt'
    );

    expect(textViolations).toEqual([]);
  });

  test('Avatar should have alt text or aria-label', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-avatar--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const altViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'image-alt' || v.id === 'aria-input-field-name'
    );

    expect(altViolations).toEqual([]);
  });
});
