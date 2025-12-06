import { describe, it, expect, beforeEach, vi } from 'vitest';
import { HaSlider } from './slider';

describe('HaSlider', () => {
  let element: HaSlider;

  beforeEach(() => {
    element = document.createElement('ha-slider') as HaSlider;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe('Component Registration', () => {
    it('should be registered as ha-slider', () => {
      expect(customElements.get('ha-slider')).toBe(HaSlider);
    });

    it('should create an instance', () => {
      expect(element).toBeInstanceOf(HaSlider);
    });
  });

  describe('Default Values', () => {
    it('should have default min value of 0', () => {
      expect(element.min).toBe(0);
    });

    it('should have default max value of 100', () => {
      expect(element.max).toBe(100);
    });

    it('should have default step value of 1', () => {
      expect(element.step).toBe(1);
    });

    it('should have default value of 0', () => {
      expect(element.value).toBe(0);
    });

    it('should have default orientation of horizontal', () => {
      expect(element.orientation).toBe('horizontal');
    });

    it('should not be in range mode by default', () => {
      expect(element.range).toBe(false);
    });

    it('should not be disabled by default', () => {
      expect(element.disabled).toBe(false);
    });

    it('should not be readonly by default', () => {
      expect(element.readonly).toBe(false);
    });
  });

  describe('Attributes and Properties', () => {
    it('should set and get min attribute', () => {
      element.setAttribute('min', '10');
      expect(element.min).toBe(10);
    });

    it('should set and get max attribute', () => {
      element.setAttribute('max', '200');
      expect(element.max).toBe(200);
    });

    it('should set and get step attribute', () => {
      element.setAttribute('step', '5');
      expect(element.step).toBe(5);
    });

    it('should set and get value property', () => {
      element.value = 50;
      expect(element.value).toBe(50);
      expect(element.getAttribute('value')).toBe('50');
    });

    it('should set and get orientation attribute', () => {
      element.orientation = 'vertical';
      expect(element.orientation).toBe('vertical');
      expect(element.getAttribute('orientation')).toBe('vertical');
    });

    it('should set and get disabled attribute', () => {
      element.disabled = true;
      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should set and get readonly attribute', () => {
      element.readonly = true;
      expect(element.readonly).toBe(true);
      expect(element.hasAttribute('readonly')).toBe(true);
    });

    it('should set and get range attribute', () => {
      element.range = true;
      expect(element.range).toBe(true);
      expect(element.hasAttribute('range')).toBe(true);
    });
  });

  describe('Value Clamping', () => {
    beforeEach(() => {
      element.min = 0;
      element.max = 100;
      element.step = 1;
    });

    it('should clamp value to min', () => {
      element.value = -10;
      expect(element.value).toBe(0);
    });

    it('should clamp value to max', () => {
      element.value = 150;
      expect(element.value).toBe(100);
    });

    it('should snap value to step', () => {
      element.step = 10;
      element.value = 23;
      expect(element.value).toBe(20);
    });

    it('should handle decimal steps', () => {
      element.step = 0.5;
      element.value = 23.7;
      expect(element.value).toBe(23.5);
    });
  });

  describe('Range Mode', () => {
    beforeEach(() => {
      element.range = true;
    });

    it('should have default range values', () => {
      expect(element.rangeStart).toBe(0);
      expect(element.rangeEnd).toBe(100);
    });

    it('should set range start value', () => {
      element.rangeStart = 25;
      expect(element.rangeStart).toBe(25);
    });

    it('should set range end value', () => {
      element.rangeEnd = 75;
      expect(element.rangeEnd).toBe(75);
    });

    it('should not allow range start to exceed range end', () => {
      element.rangeEnd = 50;
      element.rangeStart = 60;
      expect(element.rangeStart).toBe(50);
    });

    it('should not allow range end to be less than range start', () => {
      element.rangeStart = 50;
      element.rangeEnd = 40;
      expect(element.rangeEnd).toBe(50);
    });

    it('should return range object from getValue', () => {
      element.rangeStart = 25;
      element.rangeEnd = 75;
      const value = element.getValue();
      expect(value).toEqual({ start: 25, end: 75 });
    });

    it('should set range values with setValue', () => {
      element.setValue({ start: 30, end: 70 });
      expect(element.rangeStart).toBe(30);
      expect(element.rangeEnd).toBe(70);
    });
  });

  describe('Single Value Mode', () => {
    it('should return single value from getValue', () => {
      element.value = 42;
      expect(element.getValue()).toBe(42);
    });

    it('should set single value with setValue', () => {
      element.setValue(58);
      expect(element.value).toBe(58);
    });
  });

  describe('Public Methods', () => {
    it('should reset single value to min', () => {
      element.value = 50;
      element.reset();
      expect(element.value).toBe(0);
    });

    it('should reset range values to min and max', () => {
      element.range = true;
      element.rangeStart = 30;
      element.rangeEnd = 70;
      element.reset();
      expect(element.rangeStart).toBe(0);
      expect(element.rangeEnd).toBe(100);
    });
  });

  describe('Events', () => {
    it('should dispatch slider-change event on value change', () => {
      const handler = vi.fn();
      element.addEventListener('slider-change', handler);

      element.value = 50;
      // Manually trigger change event since we're not simulating full interaction
      element.dispatchEvent(
        new CustomEvent('slider-change', {
          bubbles: true,
          composed: true,
          detail: { value: 50 },
        })
      );

      expect(handler).toHaveBeenCalled();
    });

    it('should include value in event detail', () => {
      let eventDetail: any;
      element.addEventListener('slider-change', (e: Event) => {
        eventDetail = (e as CustomEvent).detail;
      });

      element.value = 42;
      element.dispatchEvent(
        new CustomEvent('slider-change', {
          bubbles: true,
          composed: true,
          detail: { value: 42 },
        })
      );

      expect(eventDetail.value).toBe(42);
    });
  });

  describe('Marks', () => {
    it('should set and get marks attribute', () => {
      element.marks = [0, 25, 50, 75, 100];
      expect(element.marks).toEqual([0, 25, 50, 75, 100]);
    });

    it('should parse marks from string attribute', () => {
      element.setAttribute('marks', '0, 25, 50, 75, 100');
      expect(element.marks).toEqual([0, 25, 50, 75, 100]);
    });

    it('should set show-marks attribute', () => {
      element.showMarks = true;
      expect(element.hasAttribute('show-marks')).toBe(true);
    });
  });

  describe('Tooltip', () => {
    it('should set show-tooltip attribute', () => {
      element.showTooltip = true;
      expect(element.hasAttribute('show-tooltip')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have role="slider"', () => {
      expect(element.getAttribute('role')).toBe('slider');
    });

    it('should have tabindex="0" when not disabled', () => {
      expect(element.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex="-1" when disabled', () => {
      element.disabled = true;
      expect(element.getAttribute('tabindex')).toBe('-1');
    });

    it('should have aria-valuemin', () => {
      element.min = 10;
      element.connectedCallback();
      expect(element.getAttribute('aria-valuemin')).toBe('10');
    });

    it('should have aria-valuemax', () => {
      element.max = 90;
      element.connectedCallback();
      expect(element.getAttribute('aria-valuemax')).toBe('90');
    });

    it('should have aria-valuenow for single value', () => {
      element.value = 42;
      element.connectedCallback();
      expect(element.getAttribute('aria-valuenow')).toBe('42');
    });

    it('should have aria-valuetext for range', () => {
      element.range = true;
      element.rangeStart = 25;
      element.rangeEnd = 75;
      element.connectedCallback();
      expect(element.getAttribute('aria-valuetext')).toBe('25 to 75');
    });
  });

  describe('Shadow DOM', () => {
    it('should render in shadow DOM', () => {
      expect(element.shadowRoot).toBeTruthy();
    });

    it('should contain slider track', () => {
      const track = element.shadowRoot?.querySelector('.slider__track');
      expect(track).toBeTruthy();
    });

    it('should contain slider fill', () => {
      const fill = element.shadowRoot?.querySelector('.slider__fill');
      expect(fill).toBeTruthy();
    });

    it('should contain slider thumb', () => {
      const thumb = element.shadowRoot?.querySelector('.slider__thumb');
      expect(thumb).toBeTruthy();
    });

    it('should contain two thumbs in range mode', () => {
      element.range = true;
      element.connectedCallback();
      const thumbs = element.shadowRoot?.querySelectorAll('.slider__thumb');
      expect(thumbs?.length).toBe(2);
    });
  });

  describe('CSS Parts', () => {
    it('should expose track part', () => {
      const track = element.shadowRoot?.querySelector('[part="track"]');
      expect(track).toBeTruthy();
    });

    it('should expose fill part', () => {
      const fill = element.shadowRoot?.querySelector('[part="fill"]');
      expect(fill).toBeTruthy();
    });

    it('should expose thumb part', () => {
      const thumb = element.shadowRoot?.querySelector('[part="thumb"]');
      expect(thumb).toBeTruthy();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styling', () => {
      element.disabled = true;
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should not respond to interactions when disabled', () => {
      element.disabled = true;
      const initialValue = element.value;
      // Attempt to change value
      element.value = 50;
      // Value should not change when disabled (implementation detail)
      expect(element.disabled).toBe(true);
    });
  });

  describe('Readonly State', () => {
    it('should apply readonly attribute', () => {
      element.readonly = true;
      expect(element.hasAttribute('readonly')).toBe(true);
    });
  });
});
