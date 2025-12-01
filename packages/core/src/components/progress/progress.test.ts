import { describe, it, expect, beforeEach } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaProgress } from './progress';

describe('HaProgress', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-progress')) {
      customElements.define('ha-progress', HaProgress);
    }
    await waitForCustomElement('ha-progress');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-progress')).toBe(HaProgress);
    });

    it('should create an instance', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      expect(progress).toBeInstanceOf(HaProgress);
      expect(progress).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      document.body.appendChild(progress);
      expect(progress.shadowRoot).not.toBeNull();
      document.body.removeChild(progress);
    });
  });

  describe('Attributes and Properties', () => {
    let progress: HaProgress;

    beforeEach(() => {
      progress = document.createElement('ha-progress') as HaProgress;
      document.body.appendChild(progress);
    });

    afterEach(() => {
      document.body.removeChild(progress);
    });

    it('should have default value as 0', () => {
      expect(progress.value).toBe(0);
    });

    it('should have default max as 100', () => {
      expect(progress.max).toBe(100);
    });

    it('should have default variant as default', () => {
      expect(progress.variant).toBe('default');
    });

    it('should have default color as primary', () => {
      expect(progress.color).toBe('primary');
    });

    it('should have default size as md', () => {
      expect(progress.size).toBe('md');
    });

    it('should not show label by default', () => {
      expect(progress.showLabel).toBe(false);
    });

    it('should update value property', () => {
      progress.value = 50;
      expect(progress.value).toBe(50);
      expect(progress.getAttribute('value')).toBe('50');
    });

    it('should update max property', () => {
      progress.max = 200;
      expect(progress.max).toBe(200);
      expect(progress.getAttribute('max')).toBe('200');
    });

    it('should update variant property', () => {
      progress.variant = 'striped';
      expect(progress.variant).toBe('striped');
      expect(progress.getAttribute('variant')).toBe('striped');
    });

    it('should update color property', () => {
      progress.color = 'success';
      expect(progress.color).toBe('success');
      expect(progress.getAttribute('color')).toBe('success');
    });

    it('should update size property', () => {
      progress.size = 'lg';
      expect(progress.size).toBe('lg');
      expect(progress.getAttribute('size')).toBe('lg');
    });

    it('should update showLabel property', () => {
      progress.showLabel = true;
      expect(progress.showLabel).toBe(true);
      expect(progress.hasAttribute('show-label')).toBe(true);
    });
  });

  describe('Progress Bar Width', () => {
    it('should set bar width based on value', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 50;
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar') as HTMLElement;
      expect(bar.style.width).toBe('50%');

      document.body.removeChild(progress);
    });

    it('should handle 0 value', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 0;
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar') as HTMLElement;
      expect(bar.style.width).toBe('0%');

      document.body.removeChild(progress);
    });

    it('should handle 100 value', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 100;
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar') as HTMLElement;
      expect(bar.style.width).toBe('100%');

      document.body.removeChild(progress);
    });

    it('should cap value at 100%', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 150;
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar') as HTMLElement;
      expect(bar.style.width).toBe('100%');

      document.body.removeChild(progress);
    });

    it('should handle custom max value', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 50;
      progress.max = 200;
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar') as HTMLElement;
      expect(bar.style.width).toBe('25%');

      document.body.removeChild(progress);
    });
  });

  describe('Sizes', () => {
    it('should render sm size', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.size = 'sm';
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.className).toContain('progress--sm');

      document.body.removeChild(progress);
    });

    it('should render md size', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.size = 'md';
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.className).toContain('progress--md');

      document.body.removeChild(progress);
    });

    it('should render lg size', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.size = 'lg';
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.className).toContain('progress--lg');

      document.body.removeChild(progress);
    });
  });

  describe('Colors', () => {
    it('should render primary color', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.color = 'primary';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--primary');

      document.body.removeChild(progress);
    });

    it('should render success color', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.color = 'success';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--success');

      document.body.removeChild(progress);
    });

    it('should render warning color', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.color = 'warning';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--warning');

      document.body.removeChild(progress);
    });

    it('should render error color', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.color = 'error';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--error');

      document.body.removeChild(progress);
    });

    it('should render info color', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.color = 'info';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--info');

      document.body.removeChild(progress);
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.variant = 'default';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).not.toContain('progress__bar--striped');
      expect(bar?.className).not.toContain('progress__bar--animated');

      document.body.removeChild(progress);
    });

    it('should render striped variant', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.variant = 'striped';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--striped');

      document.body.removeChild(progress);
    });

    it('should render animated variant', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.variant = 'animated';
      document.body.appendChild(progress);

      const bar = queryShadow(progress, '.progress__bar');
      expect(bar?.className).toContain('progress__bar--animated');

      document.body.removeChild(progress);
    });
  });

  describe('Label', () => {
    it('should hide label by default', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      document.body.appendChild(progress);

      const label = queryShadow(progress, '.progress__label') as HTMLElement;
      expect(label?.style.display).toBe('none');

      document.body.removeChild(progress);
    });

    it('should show label when showLabel is true', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.showLabel = true;
      document.body.appendChild(progress);

      const label = queryShadow(progress, '.progress__label') as HTMLElement;
      expect(label?.style.display).toBe('flex');

      document.body.removeChild(progress);
    });

    it('should display percentage', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 75;
      progress.showLabel = true;
      document.body.appendChild(progress);

      const percentage = queryShadow(progress, '.progress__percentage') as HTMLElement;
      expect(percentage?.textContent).toBe('75%');

      document.body.removeChild(progress);
    });

    it('should update percentage when value changes', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 50;
      progress.showLabel = true;
      document.body.appendChild(progress);

      let percentage = queryShadow(progress, '.progress__percentage') as HTMLElement;
      expect(percentage?.textContent).toBe('50%');

      progress.value = 80;
      percentage = queryShadow(progress, '.progress__percentage') as HTMLElement;
      expect(percentage?.textContent).toBe('80%');

      document.body.removeChild(progress);
    });
  });

  describe('Accessibility', () => {
    it('should have role="progressbar"', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.getAttribute('role')).toBe('progressbar');

      document.body.removeChild(progress);
    });

    it('should have aria-valuemin="0"', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.getAttribute('aria-valuemin')).toBe('0');

      document.body.removeChild(progress);
    });

    it('should have aria-valuenow attribute', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 60;
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.getAttribute('aria-valuenow')).toBe('60');

      document.body.removeChild(progress);
    });

    it('should have aria-valuemax attribute', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.max = 100;
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.getAttribute('aria-valuemax')).toBe('100');

      document.body.removeChild(progress);
    });

    it('should update aria attributes when value changes', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      progress.value = 30;
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '.progress');
      expect(progressElement?.getAttribute('aria-valuenow')).toBe('30');

      progress.value = 70;
      expect(progressElement?.getAttribute('aria-valuenow')).toBe('70');

      document.body.removeChild(progress);
    });
  });

  describe('Parts', () => {
    it('should expose parts for styling', () => {
      const progress = document.createElement('ha-progress') as HaProgress;
      document.body.appendChild(progress);

      const progressElement = queryShadow(progress, '[part="progress"]');
      const barElement = queryShadow(progress, '[part="bar"]');
      const labelElement = queryShadow(progress, '[part="label"]');
      const percentageElement = queryShadow(progress, '[part="percentage"]');

      expect(progressElement).not.toBeNull();
      expect(barElement).not.toBeNull();
      expect(labelElement).not.toBeNull();
      expect(percentageElement).not.toBeNull();

      document.body.removeChild(progress);
    });
  });
});
