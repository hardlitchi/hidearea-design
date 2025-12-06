/**
 * Accessibility Testing Utilities
 * Helpers for testing component accessibility with axe-core
 */

import { run as axeRun, type RunOptions, type AxeResults } from 'axe-core';

export interface A11yTestOptions extends RunOptions {
  /**
   * Rules to disable for this test
   */
  disabledRules?: string[];
}

/**
 * Run axe accessibility tests on an element
 */
export async function testA11y(
  element: HTMLElement,
  options: A11yTestOptions = {}
): Promise<AxeResults> {
  const { disabledRules = [], ...axeOptions } = options;

  // Configure axe rules
  const runOptions: RunOptions = {
    ...axeOptions,
    rules: {
      ...axeOptions.rules,
    },
  };

  // Disable specified rules
  disabledRules.forEach((ruleId) => {
    runOptions.rules![ruleId] = { enabled: false };
  });

  // Run axe
  const results = await axeRun(element, runOptions);

  return results;
}

/**
 * Assert that element has no accessibility violations
 */
export async function expectNoA11yViolations(
  element: HTMLElement,
  options: A11yTestOptions = {}
): Promise<void> {
  const results = await testA11y(element, options);

  if (results.violations.length > 0) {
    const violationMessages = results.violations
      .map((violation) => {
        const nodes = violation.nodes
          .map((node) => {
            return `  - ${node.html}\n    ${node.failureSummary}`;
          })
          .join('\n');

        return `[${violation.id}] ${violation.description}\n${violation.help}\n${violation.helpUrl}\nAffected nodes:\n${nodes}`;
      })
      .join('\n\n');

    throw new Error(
      `Expected no accessibility violations but found ${results.violations.length}:\n\n${violationMessages}`
    );
  }
}

/**
 * Check if element has proper ARIA attributes
 */
export function hasValidAriaAttributes(element: HTMLElement): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for invalid ARIA attributes
  const attributes = element.getAttributeNames();
  const ariaAttributes = attributes.filter((attr) => attr.startsWith('aria-'));

  ariaAttributes.forEach((attr) => {
    const value = element.getAttribute(attr);

    // Check for empty values
    if (!value || value.trim() === '') {
      errors.push(`${attr} has empty value`);
    }

    // Check for specific attribute patterns
    switch (attr) {
      case 'aria-labelledby':
      case 'aria-describedby':
      case 'aria-controls':
        // Should reference valid IDs
        const ids = value!.split(' ');
        ids.forEach((id) => {
          if (!document.getElementById(id)) {
            errors.push(`${attr} references non-existent ID: ${id}`);
          }
        });
        break;

      case 'aria-checked':
      case 'aria-pressed':
      case 'aria-selected':
        // Should be true, false, or mixed
        if (!['true', 'false', 'mixed'].includes(value!)) {
          errors.push(`${attr} has invalid value: ${value}`);
        }
        break;

      case 'aria-expanded':
      case 'aria-hidden':
      case 'aria-disabled':
      case 'aria-readonly':
      case 'aria-required':
      case 'aria-multiselectable':
        // Should be true or false
        if (!['true', 'false'].includes(value!)) {
          errors.push(`${attr} has invalid boolean value: ${value}`);
        }
        break;

      case 'aria-level':
      case 'aria-valuemin':
      case 'aria-valuemax':
      case 'aria-valuenow':
      case 'aria-colcount':
      case 'aria-rowcount':
      case 'aria-colindex':
      case 'aria-rowindex':
        // Should be numeric
        if (isNaN(Number(value))) {
          errors.push(`${attr} has invalid numeric value: ${value}`);
        }
        break;

      case 'aria-live':
        // Should be off, polite, or assertive
        if (!['off', 'polite', 'assertive'].includes(value!)) {
          errors.push(`${attr} has invalid value: ${value}`);
        }
        break;
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  // Interactive elements should be focusable
  const interactiveTags = [
    'BUTTON',
    'A',
    'INPUT',
    'SELECT',
    'TEXTAREA',
  ];

  if (interactiveTags.includes(element.tagName)) {
    const tabIndex = element.getAttribute('tabindex');
    return tabIndex !== '-1';
  }

  // Elements with role should have appropriate tabindex
  const role = element.getAttribute('role');
  const interactiveRoles = [
    'button',
    'link',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'tab',
    'option',
    'radio',
    'checkbox',
    'switch',
    'slider',
  ];

  if (role && interactiveRoles.includes(role)) {
    const tabIndex = element.getAttribute('tabindex');
    return tabIndex === '0' || parseInt(tabIndex || '', 10) >= 0;
  }

  return true;
}

/**
 * Check if element has accessible name
 */
export function hasAccessibleName(element: HTMLElement): boolean {
  // Check aria-label
  if (element.hasAttribute('aria-label')) {
    const label = element.getAttribute('aria-label');
    return !!(label && label.trim().length > 0);
  }

  // Check aria-labelledby
  if (element.hasAttribute('aria-labelledby')) {
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
      const ids = labelledBy.split(' ');
      return ids.every((id) => {
        const labelElement = document.getElementById(id);
        return labelElement && labelElement.textContent?.trim();
      });
    }
  }

  // Check associated label (for form elements)
  if (element instanceof HTMLInputElement && element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label && label.textContent?.trim()) {
      return true;
    }
  }

  // Check text content
  const textContent = element.textContent?.trim();
  if (textContent && textContent.length > 0) {
    return true;
  }

  // Check alt text for images
  if (element instanceof HTMLImageElement) {
    const alt = element.getAttribute('alt');
    return alt !== null; // alt="" is valid for decorative images
  }

  return false;
}

/**
 * Check color contrast ratio
 */
export function getContrastRatio(
  foreground: string,
  background: string
): number {
  const fg = parseColor(foreground);
  const bg = parseColor(background);

  const fgLuminance = getRelativeLuminance(fg);
  const bgLuminance = getRelativeLuminance(bg);

  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Parse color string to RGB
 */
function parseColor(color: string): { r: number; g: number; b: number } {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  const imageData = ctx.getImageData(0, 0, 1, 1);
  const [r, g, b] = imageData.data;

  return { r, g, b };
}

/**
 * Calculate relative luminance
 */
function getRelativeLuminance(rgb: {
  r: number;
  g: number;
  b: number;
}): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Check if contrast ratio meets WCAG AA standards
 */
export function meetsContrastAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 3 : 4.5;
  return ratio >= requiredRatio;
}

/**
 * Check if contrast ratio meets WCAG AAA standards
 */
export function meetsContrastAAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 4.5 : 7;
  return ratio >= requiredRatio;
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(
  container: HTMLElement
): HTMLElement[] {
  const selectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])',
  ].join(',');

  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(selectors)
  );

  return elements.filter((el) => {
    return (
      el.offsetParent !== null &&
      !el.hasAttribute('aria-hidden') &&
      el.getAttribute('tabindex') !== '-1'
    );
  });
}

/**
 * Simulate keyboard navigation
 */
export function simulateKeyPress(
  element: HTMLElement,
  key: string,
  options: KeyboardEventInit = {}
): void {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });

  element.dispatchEvent(event);

  // Also dispatch keyup
  const keyupEvent = new KeyboardEvent('keyup', {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });

  element.dispatchEvent(keyupEvent);
}

/**
 * Wait for element to receive focus
 */
export async function waitForFocus(
  element: HTMLElement,
  timeout: number = 1000
): Promise<void> {
  if (document.activeElement === element) {
    return;
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Element did not receive focus within timeout'));
    }, timeout);

    element.addEventListener(
      'focus',
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true }
    );

    element.focus();
  });
}
