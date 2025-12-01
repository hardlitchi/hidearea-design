import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { HaTooltip } from './tooltip';

describe('HaTooltip', () => {
  let tooltip: HaTooltip;

  beforeEach(() => {
    tooltip = document.createElement('ha-tooltip') as HaTooltip;
    document.body.appendChild(tooltip);
  });

  afterEach(() => {
    document.body.removeChild(tooltip);
  });

  describe('Component Registration', () => {
    it('should be defined', () => {
      expect(customElements.get('ha-tooltip')).toBeDefined();
    });

    it('should create an instance', () => {
      expect(tooltip).toBeInstanceOf(HaTooltip);
    });

    it('should have shadow root', () => {
      expect(tooltip.shadowRoot).toBeTruthy();
    });
  });

  describe('Default Attributes', () => {
    it('should have default placement', () => {
      expect(tooltip.placement).toBe('top');
    });

    it('should have default trigger', () => {
      expect(tooltip.triggerMode).toBe('hover');
    });

    it('should have default variant', () => {
      expect(tooltip.variant).toBe('default');
    });

    it('should have default size', () => {
      expect(tooltip.size).toBe('md');
    });

    it('should have default delay', () => {
      expect(tooltip.delay).toBe(200);
    });

    it('should not be disabled by default', () => {
      expect(tooltip.disabled).toBe(false);
    });

    it('should not show arrow by default', () => {
      expect(tooltip.showArrow).toBe(false);
    });
  });

  describe('Content', () => {
    it('should set content attribute', () => {
      tooltip.content = 'Test tooltip';
      expect(tooltip.content).toBe('Test tooltip');
      expect(tooltip.getAttribute('content')).toBe('Test tooltip');
    });

    it('should update content when attribute changes', () => {
      tooltip.setAttribute('content', 'New content');
      expect(tooltip.content).toBe('New content');
    });
  });

  describe('Placement', () => {
    const placements = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    placements.forEach((placement) => {
      it(`should support ${placement} placement`, () => {
        tooltip.placement = placement;
        expect(tooltip.placement).toBe(placement);
        expect(tooltip.getAttribute('placement')).toBe(placement);
      });
    });
  });

  describe('Trigger', () => {
    it('should support hover trigger', () => {
      tooltip.triggerMode = 'hover';
      expect(tooltip.triggerMode).toBe('hover');
    });

    it('should support focus trigger', () => {
      tooltip.triggerMode = 'focus';
      expect(tooltip.triggerMode).toBe('focus');
    });

    it('should support click trigger', () => {
      tooltip.triggerMode = 'click';
      expect(tooltip.triggerMode).toBe('click');
    });
  });

  describe('Variant', () => {
    it('should support default variant', () => {
      tooltip.variant = 'default';
      expect(tooltip.variant).toBe('default');
    });

    it('should support dark variant', () => {
      tooltip.variant = 'dark';
      expect(tooltip.variant).toBe('dark');
    });

    it('should support light variant', () => {
      tooltip.variant = 'light';
      expect(tooltip.variant).toBe('light');
    });
  });

  describe('Size', () => {
    it('should support sm size', () => {
      tooltip.size = 'sm';
      expect(tooltip.size).toBe('sm');
    });

    it('should support md size', () => {
      tooltip.size = 'md';
      expect(tooltip.size).toBe('md');
    });

    it('should support lg size', () => {
      tooltip.size = 'lg';
      expect(tooltip.size).toBe('lg');
    });
  });

  describe('Arrow', () => {
    it('should show arrow when showArrow is true', () => {
      tooltip.showArrow = true;
      expect(tooltip.showArrow).toBe(true);
      expect(tooltip.hasAttribute('show-arrow')).toBe(true);
    });

    it('should hide arrow when showArrow is false', () => {
      tooltip.showArrow = false;
      expect(tooltip.showArrow).toBe(false);
      expect(tooltip.hasAttribute('show-arrow')).toBe(false);
    });
  });

  describe('Delay', () => {
    it('should set delay', () => {
      tooltip.delay = 500;
      expect(tooltip.delay).toBe(500);
      expect(tooltip.getAttribute('delay')).toBe('500');
    });

    it('should parse delay from string', () => {
      tooltip.setAttribute('delay', '300');
      expect(tooltip.delay).toBe(300);
    });
  });

  describe('Disabled', () => {
    it('should be disabled when disabled attribute is set', () => {
      tooltip.disabled = true;
      expect(tooltip.disabled).toBe(true);
      expect(tooltip.hasAttribute('disabled')).toBe(true);
    });

    it('should be enabled when disabled attribute is removed', () => {
      tooltip.disabled = true;
      tooltip.disabled = false;
      expect(tooltip.disabled).toBe(false);
      expect(tooltip.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('Public Methods', () => {
    it('should have showTooltip method', () => {
      expect(typeof tooltip.showTooltip).toBe('function');
    });

    it('should have hideTooltip method', () => {
      expect(typeof tooltip.hideTooltip).toBe('function');
    });

    it('should have toggleTooltip method', () => {
      expect(typeof tooltip.toggleTooltip).toBe('function');
    });
  });

  describe('Events', () => {
    it('should emit show event when tooltip is shown', async () => {
      const showHandler = vi.fn();
      tooltip.addEventListener('show', showHandler);

      tooltip.content = 'Test';
      tooltip.showTooltip();

      // Wait for delay
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(showHandler).toHaveBeenCalled();
    });

    it('should emit hide event when tooltip is hidden', async () => {
      const hideHandler = vi.fn();
      tooltip.addEventListener('hide', hideHandler);

      tooltip.content = 'Test';
      tooltip.showTooltip();

      // Wait for show
      await new Promise((resolve) => setTimeout(resolve, 250));

      tooltip.hideTooltip();

      // Wait for hide
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(hideHandler).toHaveBeenCalled();
    });
  });

  describe('Slots', () => {
    it('should have default slot for trigger element', () => {
      const button = document.createElement('button');
      button.textContent = 'Trigger';
      tooltip.appendChild(button);

      const slot = tooltip.shadowRoot?.querySelector('slot:not([name])');
      expect(slot).toBeTruthy();
    });

    it('should have content slot for custom content', () => {
      const slot = tooltip.shadowRoot?.querySelector('slot[name="content"]');
      expect(slot).toBeTruthy();
    });
  });

  describe('ARIA', () => {
    it('should have role tooltip on content', () => {
      const content = tooltip.shadowRoot?.querySelector('.tooltip-content');
      expect(content?.getAttribute('role')).toBe('tooltip');
    });

    it('should have unique id', () => {
      const content = tooltip.shadowRoot?.querySelector('.tooltip-content');
      expect(content?.id).toBeTruthy();
      expect(content?.id).toMatch(/^tooltip-/);
    });
  });

  describe('CSS Parts', () => {
    it('should expose trigger part', () => {
      const trigger = tooltip.shadowRoot?.querySelector('[part="trigger"]');
      expect(trigger).toBeTruthy();
    });

    it('should expose content part', () => {
      const content = tooltip.shadowRoot?.querySelector('[part="content"]');
      expect(content).toBeTruthy();
    });

    it('should expose arrow part when arrow is shown', () => {
      tooltip.showArrow = true;
      const arrow = tooltip.shadowRoot?.querySelector('[part="arrow"]');
      expect(arrow).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should not show tooltip when disabled', async () => {
      tooltip.disabled = true;
      tooltip.content = 'Test';

      const showHandler = vi.fn();
      tooltip.addEventListener('show', showHandler);

      tooltip.showTooltip();

      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(showHandler).not.toHaveBeenCalled();
    });
  });

  describe('Toggle Method', () => {
    it('should show tooltip when hidden', async () => {
      tooltip.content = 'Test';

      const showHandler = vi.fn();
      tooltip.addEventListener('show', showHandler);

      tooltip.toggleTooltip();

      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(showHandler).toHaveBeenCalled();
    });
  });
});
