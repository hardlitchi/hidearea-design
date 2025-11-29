import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaStack } from './stack';

describe('HaStack', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-stack')) {
      customElements.define('ha-stack', HaStack);
    }
    await waitForCustomElement('ha-stack');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-stack')).toBe(HaStack);
    });

    it('should create an instance', () => {
      const stack = document.createElement('ha-stack') as HaStack;
      expect(stack).toBeInstanceOf(HaStack);
      expect(stack).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
      expect(stack.shadowRoot).not.toBeNull();
      document.body.removeChild(stack);
    });
  });

  describe('Attributes and Properties', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should have default direction as vertical', () => {
      expect(stack.direction).toBe('vertical');
    });

    it('should have default gap as 4', () => {
      expect(stack.gap).toBe('4');
    });

    it('should update direction property', () => {
      stack.direction = 'horizontal';
      expect(stack.direction).toBe('horizontal');
      expect(stack.getAttribute('direction')).toBe('horizontal');
    });

    it('should update direction attribute', () => {
      stack.setAttribute('direction', 'horizontal');
      expect(stack.direction).toBe('horizontal');
    });

    it('should update gap property', () => {
      stack.gap = '8';
      expect(stack.gap).toBe('8');
      expect(stack.getAttribute('gap')).toBe('8');
    });

    it('should update gap attribute', () => {
      stack.setAttribute('gap', '2');
      expect(stack.gap).toBe('2');
    });

    it('should update align property', () => {
      stack.align = 'center';
      expect(stack.align).toBe('center');
      expect(stack.getAttribute('align')).toBe('center');
    });

    it('should update align attribute', () => {
      stack.setAttribute('align', 'start');
      expect(stack.align).toBe('start');
    });

    it('should remove align when set to null', () => {
      stack.align = 'center';
      stack.align = null;
      expect(stack.align).toBeNull();
      expect(stack.hasAttribute('align')).toBe(false);
    });

    it('should update justify property', () => {
      stack.justify = 'center';
      expect(stack.justify).toBe('center');
      expect(stack.getAttribute('justify')).toBe('center');
    });

    it('should update justify attribute', () => {
      stack.setAttribute('justify', 'start');
      expect(stack.justify).toBe('start');
    });

    it('should remove justify when set to null', () => {
      stack.justify = 'center';
      stack.justify = null;
      expect(stack.justify).toBeNull();
      expect(stack.hasAttribute('justify')).toBe(false);
    });

    it('should update wrap property', () => {
      stack.wrap = true;
      expect(stack.wrap).toBe(true);
      expect(stack.hasAttribute('wrap')).toBe(true);
    });

    it('should update wrap attribute', () => {
      stack.setAttribute('wrap', '');
      expect(stack.wrap).toBe(true);
    });

    it('should remove wrap when set to false', () => {
      stack.wrap = true;
      stack.wrap = false;
      expect(stack.wrap).toBe(false);
      expect(stack.hasAttribute('wrap')).toBe(false);
    });
  });

  describe('Direction Variants', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should support vertical direction', () => {
      stack.direction = 'vertical';
      expect(stack.getAttribute('direction')).toBe('vertical');
    });

    it('should support horizontal direction', () => {
      stack.direction = 'horizontal';
      expect(stack.getAttribute('direction')).toBe('horizontal');
    });
  });

  describe('Alignment Variants', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should support align values', () => {
      const values = ['start', 'center', 'end', 'stretch'];
      values.forEach((value) => {
        stack.align = value;
        expect(stack.getAttribute('align')).toBe(value);
      });
    });

    it('should support justify values', () => {
      const values = [
        'start',
        'center',
        'end',
        'space-between',
        'space-around',
        'space-evenly',
      ];
      values.forEach((value) => {
        stack.justify = value;
        expect(stack.getAttribute('justify')).toBe(value);
      });
    });
  });

  describe('Gap Variants', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should support gap values from 0 to 12', () => {
      for (let i = 0; i <= 12; i++) {
        stack.gap = String(i);
        expect(stack.getAttribute('gap')).toBe(String(i));
      }
    });
  });

  describe('Shadow DOM Structure', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should have a stack div with part attribute', () => {
      const stackDiv = queryShadow(stack, '[part="stack"]') as HTMLDivElement;
      expect(stackDiv).toBeTruthy();
      expect(stackDiv.tagName).toBe('DIV');
    });

    it('should have a slot element', () => {
      const slot = queryShadow(stack, 'slot');
      expect(slot).toBeTruthy();
    });

    it('should render slotted content', () => {
      const content = document.createElement('div');
      content.textContent = 'Stack item';
      stack.appendChild(content);

      // Wait for slot assignment
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(stack.textContent).toContain('Stack item');
          resolve(undefined);
        }, 0);
      });
    });

    it('should apply display flex to stack element', () => {
      const stackDiv = queryShadow(stack, '[part="stack"]') as HTMLDivElement;
      const computedStyle = window.getComputedStyle(stackDiv);
      expect(computedStyle.display).toBe('flex');
    });
  });

  describe('Stack Styles', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should apply gap based on gap attribute', () => {
      stack.gap = '8';
      const stackDiv = queryShadow(stack, '[part="stack"]') as HTMLDivElement;
      expect(stackDiv.style.gap).toContain('spacing-8');
    });

    it('should update gap when attribute changes', () => {
      stack.gap = '4';
      let stackDiv = queryShadow(stack, '[part="stack"]') as HTMLDivElement;
      expect(stackDiv.style.gap).toContain('spacing-4');

      stack.gap = '6';
      stackDiv = queryShadow(stack, '[part="stack"]') as HTMLDivElement;
      expect(stackDiv.style.gap).toContain('spacing-6');
    });
  });

  describe('Accessibility', () => {
    let stack: HaStack;

    beforeEach(() => {
      stack = document.createElement('ha-stack') as HaStack;
      document.body.appendChild(stack);
    });

    afterEach(() => {
      document.body.removeChild(stack);
    });

    it('should be accessible as a generic layout container', () => {
      // Stack should not have specific ARIA roles
      // It's a layout component
      expect(stack.getAttribute('role')).toBeNull();
    });
  });
});
