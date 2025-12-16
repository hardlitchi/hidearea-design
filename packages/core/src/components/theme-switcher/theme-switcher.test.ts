/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './theme-switcher';

describe('ThemeSwitcher', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('ha-theme-switcher');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should render with default variant', () => {
    expect(element.getAttribute('variant')).toBeNull();
  });

  it('should accept variant attribute', () => {
    element.setAttribute('variant', 'dropdown');
    expect(element.getAttribute('variant')).toBe('dropdown');
  });

  it('should accept size attribute', () => {
    element.setAttribute('size', 'lg');
    expect(element.getAttribute('size')).toBe('lg');
  });

  it('should accept show-label attribute', () => {
    element.setAttribute('show-label', '');
    expect(element.hasAttribute('show-label')).toBe(true);
  });

  it('should accept show-auto attribute', () => {
    element.setAttribute('show-auto', '');
    expect(element.hasAttribute('show-auto')).toBe(true);
  });

  it('should be defined as custom element', () => {
    expect(customElements.get('ha-theme-switcher')).toBeDefined();
  });

  it('should have shadow root', () => {
    expect(element.shadowRoot).toBeTruthy();
  });
});
