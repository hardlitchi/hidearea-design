import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Color Contrast Accessibility Tests
 * Validates WCAG 2.1 AA color contrast requirements (4.5:1 for normal text, 3:1 for large text)
 */

test.describe('Color Contrast Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test('Button variants should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--variants');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('ha-button')
      .analyze();

    // Check specifically for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Alert variants should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-alert--variants');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('ha-alert')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Badge variants should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-badge--variants');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('ha-badge')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Chip variants should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-chip--variants');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Toast variants should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=feedback-toast--variants');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Dark theme should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--default');

    // Switch to dark theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    await page.waitForTimeout(200);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Disabled states should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-button--disabled');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .disableRules(['color-contrast']) // Disabled elements are exempt
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Link colors should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=navigation-breadcrumb--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Table text should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=data-display-table--default');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Form labels should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-formgroup--with-label');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });

  test('Error states should meet contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=forms-input--error');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    expect(contrastViolations).toEqual([]);
  });
});
