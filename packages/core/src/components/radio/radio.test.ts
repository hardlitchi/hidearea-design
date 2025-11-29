import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaRadio } from './radio';

describe('HaRadio', () => {
  beforeEach(async () => {
    if (!customElements.get('ha-radio')) {
      customElements.define('ha-radio', HaRadio);
    }
    await waitForCustomElement('ha-radio');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-radio')).toBe(HaRadio);
    });

    it('should create an instance', () => {
      const radio = document.createElement('ha-radio') as HaRadio;
      expect(radio).toBeInstanceOf(HaRadio);
      expect(radio).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
      expect(radio.shadowRoot).not.toBeNull();
      document.body.removeChild(radio);
    });
  });

  describe('Default Values', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should have default size as md', () => {
      expect(radio.size).toBe('md');
    });

    it('should not be checked by default', () => {
      expect(radio.checked).toBe(false);
    });

    it('should not be disabled by default', () => {
      expect(radio.disabled).toBe(false);
    });
  });

  describe('Attributes and Properties', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should update size property', () => {
      radio.size = 'lg';
      expect(radio.size).toBe('lg');
      expect(radio.getAttribute('size')).toBe('lg');
    });

    it('should update checked property', () => {
      radio.checked = true;
      expect(radio.checked).toBe(true);
      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(internalInput.checked).toBe(true);
    });

    it('should update disabled property', () => {
      radio.disabled = true;
      expect(radio.disabled).toBe(true);
      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(internalInput.disabled).toBe(true);
    });

    it('should update required property', () => {
      radio.required = true;
      expect(radio.required).toBe(true);
      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(internalInput.required).toBe(true);
    });

    it('should update error property', () => {
      radio.error = true;
      expect(radio.error).toBe(true);
      expect(radio.hasAttribute('error')).toBe(true);
    });

    it('should update name property', () => {
      radio.name = 'test-group';
      expect(radio.name).toBe('test-group');
      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(internalInput.name).toBe('test-group');
    });

    it('should update value property', () => {
      radio.value = 'test-value';
      expect(radio.value).toBe('test-value');
      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(internalInput.value).toBe('test-value');
    });

    it('should update label property', () => {
      radio.label = 'Test Label';
      expect(radio.label).toBe('Test Label');
      expect(radio.getAttribute('label')).toBe('Test Label');
    });

    it('should update description property', () => {
      radio.description = 'Test Description';
      expect(radio.description).toBe('Test Description');
      expect(radio.getAttribute('description')).toBe('Test Description');
    });
  });

  describe('Radio Group Behavior', () => {
    let radio1: HaRadio;
    let radio2: HaRadio;
    let radio3: HaRadio;

    beforeEach(() => {
      radio1 = document.createElement('ha-radio') as HaRadio;
      radio1.name = 'test-group';
      radio1.value = 'option1';

      radio2 = document.createElement('ha-radio') as HaRadio;
      radio2.name = 'test-group';
      radio2.value = 'option2';

      radio3 = document.createElement('ha-radio') as HaRadio;
      radio3.name = 'test-group';
      radio3.value = 'option3';

      document.body.appendChild(radio1);
      document.body.appendChild(radio2);
      document.body.appendChild(radio3);
    });

    afterEach(() => {
      document.body.removeChild(radio1);
      document.body.removeChild(radio2);
      document.body.removeChild(radio3);
    });

    it('should uncheck other radios in the same group when checked', () => {
      radio1.checked = true;
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);
      expect(radio3.checked).toBe(false);

      radio2.checked = true;
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
      expect(radio3.checked).toBe(false);
    });
  });

  describe('Events', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should emit change event when checked changes', async () => {
      const changeSpy = vi.fn();
      radio.addEventListener('change', changeSpy);

      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      internalInput.click();
      internalInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should emit input event when checked changes', async () => {
      const inputSpy = vi.fn();
      radio.addEventListener('input', inputSpy);

      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      internalInput.click();
      internalInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(inputSpy).toHaveBeenCalled();
    });

    it('should include value in event detail', async () => {
      radio.value = 'test-value';
      const changeSpy = vi.fn();
      radio.addEventListener('change', changeSpy);

      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      internalInput.click();
      internalInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: expect.objectContaining({ value: 'test-value' })
        })
      );
    });
  });

  describe('Validation API', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should support checkValidity()', () => {
      expect(typeof radio.checkValidity).toBe('function');
      expect(radio.checkValidity()).toBe(true);
    });

    it('should support reportValidity()', () => {
      expect(typeof radio.reportValidity).toBe('function');
      expect(radio.reportValidity()).toBe(true);
    });

    it('should support setCustomValidity()', () => {
      expect(typeof radio.setCustomValidity).toBe('function');
      radio.setCustomValidity('Custom error');
      expect(radio.checkValidity()).toBe(false);
    });
  });

  describe('Focus Management', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should support focus()', () => {
      expect(typeof radio.focus).toBe('function');
      radio.focus();
      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(document.activeElement).toBe(radio);
    });

    it('should support blur()', () => {
      expect(typeof radio.blur).toBe('function');
      radio.focus();
      radio.blur();
      expect(document.activeElement).not.toBe(radio);
    });
  });

  describe('Disabled State', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should not change checked state when disabled', () => {
      radio.disabled = true;
      radio.checked = false;

      const container = queryShadow(radio, '.radio-container') as HTMLDivElement;
      container.click();

      expect(radio.checked).toBe(false);
    });
  });

  describe('Accessibility', () => {
    let radio: HaRadio;

    beforeEach(() => {
      radio = document.createElement('ha-radio') as HaRadio;
      document.body.appendChild(radio);
    });

    afterEach(() => {
      document.body.removeChild(radio);
    });

    it('should set ARIA attributes on internal input', () => {
      radio.disabled = true;
      radio.required = true;
      radio.error = true;

      const internalInput = queryShadow(radio, 'input') as HTMLInputElement;
      expect(internalInput.getAttribute('aria-disabled')).toBe('true');
      expect(internalInput.getAttribute('aria-required')).toBe('true');
      expect(internalInput.getAttribute('aria-invalid')).toBe('true');
    });
  });
});
