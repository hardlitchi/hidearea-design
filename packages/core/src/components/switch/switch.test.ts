import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaSwitch } from './switch';

describe('HaSwitch', () => {
  beforeEach(async () => {
    if (!customElements.get('ha-switch')) {
      customElements.define('ha-switch', HaSwitch);
    }
    await waitForCustomElement('ha-switch');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-switch')).toBe(HaSwitch);
    });

    it('should create an instance', () => {
      const switchElem = document.createElement('ha-switch') as HaSwitch;
      expect(switchElem).toBeInstanceOf(HaSwitch);
      expect(switchElem).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
      expect(switchElem.shadowRoot).not.toBeNull();
      document.body.removeChild(switchElem);
    });
  });

  describe('Default Values', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should have default size as md', () => {
      expect(switchElem.size).toBe('md');
    });

    it('should not be checked by default', () => {
      expect(switchElem.checked).toBe(false);
    });

    it('should not be disabled by default', () => {
      expect(switchElem.disabled).toBe(false);
    });
  });

  describe('Attributes and Properties', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should update size property', () => {
      switchElem.size = 'lg';
      expect(switchElem.size).toBe('lg');
      expect(switchElem.getAttribute('size')).toBe('lg');
    });

    it('should update checked property', () => {
      switchElem.checked = true;
      expect(switchElem.checked).toBe(true);
      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.checked).toBe(true);
    });

    it('should update disabled property', () => {
      switchElem.disabled = true;
      expect(switchElem.disabled).toBe(true);
      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.disabled).toBe(true);
    });

    it('should update required property', () => {
      switchElem.required = true;
      expect(switchElem.required).toBe(true);
      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.required).toBe(true);
    });

    it('should update error property', () => {
      switchElem.error = true;
      expect(switchElem.error).toBe(true);
      expect(switchElem.hasAttribute('error')).toBe(true);
    });

    it('should update name property', () => {
      switchElem.name = 'test-switch';
      expect(switchElem.name).toBe('test-switch');
      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.name).toBe('test-switch');
    });

    it('should update value property', () => {
      switchElem.value = 'test-value';
      expect(switchElem.value).toBe('test-value');
      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.value).toBe('test-value');
    });

    it('should update label property', () => {
      switchElem.label = 'Test Label';
      expect(switchElem.label).toBe('Test Label');
      expect(switchElem.getAttribute('label')).toBe('Test Label');
    });

    it('should update description property', () => {
      switchElem.description = 'Test Description';
      expect(switchElem.description).toBe('Test Description');
      expect(switchElem.getAttribute('description')).toBe('Test Description');
    });

    it('should remove name attribute when set to null', () => {
      switchElem.name = 'test-name';
      expect(switchElem.hasAttribute('name')).toBe(true);
      switchElem.name = null;
      expect(switchElem.hasAttribute('name')).toBe(false);
    });

    it('should remove value attribute when set to null', () => {
      switchElem.value = 'test-value';
      expect(switchElem.hasAttribute('value')).toBe(true);
      switchElem.value = null;
      expect(switchElem.hasAttribute('value')).toBe(false);
    });

    it('should remove label attribute when set to null', () => {
      switchElem.label = 'Test Label';
      expect(switchElem.hasAttribute('label')).toBe(true);
      switchElem.label = null;
      expect(switchElem.hasAttribute('label')).toBe(false);
    });

    it('should remove description attribute when set to null', () => {
      switchElem.description = 'Test Description';
      expect(switchElem.hasAttribute('description')).toBe(true);
      switchElem.description = null;
      expect(switchElem.hasAttribute('description')).toBe(false);
    });

    it('should remove error attribute when set to false', () => {
      switchElem.error = true;
      expect(switchElem.hasAttribute('error')).toBe(true);
      switchElem.error = false;
      expect(switchElem.hasAttribute('error')).toBe(false);
    });

    it('should remove disabled attribute when set to false', () => {
      switchElem.disabled = true;
      expect(switchElem.hasAttribute('disabled')).toBe(true);
      switchElem.disabled = false;
      expect(switchElem.hasAttribute('disabled')).toBe(false);
    });

    it('should remove required attribute when set to false', () => {
      switchElem.required = true;
      expect(switchElem.hasAttribute('required')).toBe(true);
      switchElem.required = false;
      expect(switchElem.hasAttribute('required')).toBe(false);
    });

    it('should remove checked attribute when set to false', () => {
      switchElem.checked = true;
      expect(switchElem.hasAttribute('checked')).toBe(true);
      switchElem.checked = false;
      expect(switchElem.hasAttribute('checked')).toBe(false);
    });
  });

  describe('Toggle Behavior', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should toggle checked state when clicked', () => {
      expect(switchElem.checked).toBe(false);

      const container = queryShadow(switchElem, '.switch-container') as HTMLDivElement;
      container.click();

      expect(switchElem.checked).toBe(true);

      container.click();
      expect(switchElem.checked).toBe(false);
    });

    it('should not toggle when disabled', () => {
      switchElem.disabled = true;
      expect(switchElem.checked).toBe(false);

      const container = queryShadow(switchElem, '.switch-container') as HTMLDivElement;
      container.click();

      expect(switchElem.checked).toBe(false);
    });
  });

  describe('Events', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should emit change event when toggled', async () => {
      const changeSpy = vi.fn();
      switchElem.addEventListener('change', changeSpy);

      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      internalInput.click();
      internalInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(changeSpy).toHaveBeenCalled();
    });

    it('should emit input event when toggled', async () => {
      const inputSpy = vi.fn();
      switchElem.addEventListener('input', inputSpy);

      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      internalInput.click();
      internalInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(inputSpy).toHaveBeenCalled();
    });

    it('should include checked state in event detail', async () => {
      const changeSpy = vi.fn();
      switchElem.addEventListener('change', changeSpy);

      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      // Manually set checked to ensure it's in the correct state
      internalInput.checked = true;
      internalInput.dispatchEvent(new Event('change', { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 0));
      expect(changeSpy).toHaveBeenCalled();

      const callArg = changeSpy.mock.calls[0][0];
      expect(callArg.detail.checked).toBe(true);
    });

    it('should include value in event detail', async () => {
      switchElem.value = 'test-value';
      const changeSpy = vi.fn();
      switchElem.addEventListener('change', changeSpy);

      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
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
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should support checkValidity()', () => {
      expect(typeof switchElem.checkValidity).toBe('function');
      expect(switchElem.checkValidity()).toBe(true);
    });

    it('should support reportValidity()', () => {
      expect(typeof switchElem.reportValidity).toBe('function');
      expect(switchElem.reportValidity()).toBe(true);
    });

    it('should support setCustomValidity()', () => {
      expect(typeof switchElem.setCustomValidity).toBe('function');
      switchElem.setCustomValidity('Custom error');
      expect(switchElem.checkValidity()).toBe(false);
    });
  });

  describe('Focus Management', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should support focus()', () => {
      expect(typeof switchElem.focus).toBe('function');
      switchElem.focus();
      expect(document.activeElement).toBe(switchElem);
    });

    it('should support blur()', () => {
      expect(typeof switchElem.blur).toBe('function');
      switchElem.focus();
      switchElem.blur();
      expect(document.activeElement).not.toBe(switchElem);
    });
  });

  describe('Accessibility', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should set role="switch" on internal input', () => {
      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.getAttribute('role')).toBe('switch');
    });

    it('should set ARIA attributes on internal input', () => {
      switchElem.disabled = true;
      switchElem.required = true;
      switchElem.error = true;
      switchElem.checked = true;

      const internalInput = queryShadow(switchElem, 'input') as HTMLInputElement;
      expect(internalInput.getAttribute('aria-disabled')).toBe('true');
      expect(internalInput.getAttribute('aria-required')).toBe('true');
      expect(internalInput.getAttribute('aria-invalid')).toBe('true');
      expect(internalInput.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('Sizes', () => {
    let switchElem: HaSwitch;

    beforeEach(() => {
      switchElem = document.createElement('ha-switch') as HaSwitch;
      document.body.appendChild(switchElem);
    });

    afterEach(() => {
      document.body.removeChild(switchElem);
    });

    it('should support small size', () => {
      switchElem.size = 'sm';
      expect(switchElem.getAttribute('size')).toBe('sm');
    });

    it('should support medium size', () => {
      switchElem.size = 'md';
      expect(switchElem.getAttribute('size')).toBe('md');
    });

    it('should support large size', () => {
      switchElem.size = 'lg';
      expect(switchElem.getAttribute('size')).toBe('lg');
    });
  });
});
