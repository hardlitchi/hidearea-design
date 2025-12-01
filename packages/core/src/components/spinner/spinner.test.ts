import { describe, it, expect, beforeEach } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaSpinner } from './spinner';

describe('HaSpinner', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-spinner')) {
      customElements.define('ha-spinner', HaSpinner);
    }
    await waitForCustomElement('ha-spinner');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-spinner')).toBe(HaSpinner);
    });

    it('should create an instance', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      expect(spinner).toBeInstanceOf(HaSpinner);
      expect(spinner).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);
      expect(spinner.shadowRoot).not.toBeNull();
      document.body.removeChild(spinner);
    });
  });

  describe('Attributes and Properties', () => {
    let spinner: HaSpinner;

    beforeEach(() => {
      spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);
    });

    afterEach(() => {
      document.body.removeChild(spinner);
    });

    it('should have default size as md', () => {
      expect(spinner.size).toBe('md');
    });

    it('should have default color as primary', () => {
      expect(spinner.color).toBe('primary');
    });

    it('should have default variant as circular', () => {
      expect(spinner.variant).toBe('circular');
    });

    it('should have default speed as 0.8s', () => {
      expect(spinner.speed).toBe('0.8s');
    });

    it('should update size property', () => {
      spinner.size = 'lg';
      expect(spinner.size).toBe('lg');
      expect(spinner.getAttribute('size')).toBe('lg');
    });

    it('should update color property', () => {
      spinner.color = 'success';
      expect(spinner.color).toBe('success');
      expect(spinner.getAttribute('color')).toBe('success');
    });

    it('should update variant property', () => {
      spinner.variant = 'dots';
      expect(spinner.variant).toBe('dots');
      expect(spinner.getAttribute('variant')).toBe('dots');
    });

    it('should update speed property', () => {
      spinner.speed = '1.5s';
      expect(spinner.speed).toBe('1.5s');
      expect(spinner.getAttribute('speed')).toBe('1.5s');
    });
  });

  describe('Sizes', () => {
    it('should render xs size', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.size = 'xs';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--xs');

      document.body.removeChild(spinner);
    });

    it('should render sm size', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.size = 'sm';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--sm');

      document.body.removeChild(spinner);
    });

    it('should render md size', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.size = 'md';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--md');

      document.body.removeChild(spinner);
    });

    it('should render lg size', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.size = 'lg';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--lg');

      document.body.removeChild(spinner);
    });

    it('should render xl size', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.size = 'xl';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--xl');

      document.body.removeChild(spinner);
    });
  });

  describe('Colors', () => {
    it('should render primary color', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.color = 'primary';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--primary');

      document.body.removeChild(spinner);
    });

    it('should render success color', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.color = 'success';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--success');

      document.body.removeChild(spinner);
    });

    it('should render warning color', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.color = 'warning';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--warning');

      document.body.removeChild(spinner);
    });

    it('should render error color', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.color = 'error';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--error');

      document.body.removeChild(spinner);
    });

    it('should render info color', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.color = 'info';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--info');

      document.body.removeChild(spinner);
    });

    it('should render neutral color', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.color = 'neutral';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--neutral');

      document.body.removeChild(spinner);
    });
  });

  describe('Variants', () => {
    it('should render circular variant', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.variant = 'circular';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--circular');

      document.body.removeChild(spinner);
    });

    it('should render dots variant', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.variant = 'dots';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--dots');

      // Check for dots elements
      const dots = spinner.shadowRoot?.querySelectorAll('.spinner__dot');
      expect(dots?.length).toBe(3);

      document.body.removeChild(spinner);
    });

    it('should render pulse variant', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.variant = 'pulse';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--pulse');

      document.body.removeChild(spinner);
    });
  });

  describe('Speed', () => {
    it('should set custom speed', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.speed = '1.5s';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner') as HTMLElement;
      expect(spinnerElement?.style.getPropertyValue('--spinner-speed')).toBe('1.5s');

      document.body.removeChild(spinner);
    });

    it('should update speed when changed', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner') as HTMLElement;
      expect(spinnerElement?.style.getPropertyValue('--spinner-speed')).toBe('0.8s');

      spinner.speed = '0.4s';
      expect(spinnerElement?.style.getPropertyValue('--spinner-speed')).toBe('0.4s');

      document.body.removeChild(spinner);
    });
  });

  describe('Accessibility', () => {
    it('should have role="status"', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.getAttribute('role')).toBe('status');

      document.body.removeChild(spinner);
    });

    it('should have aria-live="polite"', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.getAttribute('aria-live')).toBe('polite');

      document.body.removeChild(spinner);
    });

    it('should have aria-label', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.getAttribute('aria-label')).toBe('Loading');

      document.body.removeChild(spinner);
    });
  });

  describe('Parts', () => {
    it('should expose parts for styling', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '[part="spinner"]');
      expect(spinnerElement).not.toBeNull();

      document.body.removeChild(spinner);
    });
  });

  describe('Combined Properties', () => {
    it('should combine size, color, and variant classes', () => {
      const spinner = document.createElement('ha-spinner') as HaSpinner;
      spinner.size = 'lg';
      spinner.color = 'success';
      spinner.variant = 'pulse';
      document.body.appendChild(spinner);

      const spinnerElement = queryShadow(spinner, '.spinner');
      expect(spinnerElement?.className).toContain('spinner--lg');
      expect(spinnerElement?.className).toContain('spinner--success');
      expect(spinnerElement?.className).toContain('spinner--pulse');

      document.body.removeChild(spinner);
    });
  });
});
