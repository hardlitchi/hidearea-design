import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import TimePicker from './TimePicker.vue';
import { HaTimePicker } from '@hidearea-design/core';

// Register the custom element globally for testing environments
if (!customElements.get('ha-time-picker')) {
  customElements.define('ha-time-picker', HaTimePicker);
}

describe('TimePicker (Vue Wrapper)', () => {
  it('should render the ha-time-picker web component', () => {
    const wrapper = mount(TimePicker);
    expect(wrapper.find('ha-time-picker').exists()).toBe(true);
  });

  it('should pass props to the web component', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        value: '10:00:00',
        format: '12',
        showSeconds: true,
        hourStep: 2,
        minuteStep: 15,
        secondStep: 30,
        minTime: '08:00',
        maxTime: '18:00',
        disabledHours: [1, 2, 3],
        disabledMinutes: [0, 1],
        inline: true,
        placeholder: 'Select time',
        label: 'Time',
        helperText: 'Helper',
        disabled: true,
        required: true,
        error: true,
        readonly: true,
        errorText: 'Error',
        showNowButton: true,
        showClearButton: true,
      },
    });

    const webComponent = wrapper.find('ha-time-picker').element as HaTimePicker;

    expect(webComponent.getValue()).toBe('10:00:00');
    expect(webComponent.format).toBe('12');
    expect(webComponent.showSeconds).toBe(true);
    expect(webComponent.hourStep).toBe(2);
    expect(webComponent.minuteStep).toBe(15);
    expect(webComponent.secondStep).toBe(30);
    expect(webComponent.minTime).toBe('08:00');
    expect(webComponent.maxTime).toBe('18:00');
    expect(webComponent.disabledHours).toEqual([1, 2, 3]);
    expect(webComponent.disabledMinutes).toEqual([0, 1]);
    expect(webComponent.inline).toBe(true);
    expect(webComponent.getAttribute('placeholder')).toBe('Select time');
    expect(webComponent.getAttribute('label')).toBe('Time');
    expect(webComponent.getAttribute('helper-text')).toBe('Helper');
    expect(webComponent.disabled).toBe(true);
    expect(webComponent.required).toBe(true);
    expect(webComponent.error).toBe(true);
    expect(webComponent.readonly).toBe(true);
    expect(webComponent.getAttribute('error-text')).toBe('Error');
    expect(webComponent.showNowButton).toBe(true);
    expect(webComponent.showClearButton).toBe(true);
  });

  it('should emit time-select event', async () => {
    const wrapper = mount(TimePicker);
    const eventDetail = {
      value: '10:30',
      hour: 10,
      minute: 30,
      second: 0,
      period: 'AM',
    };
    const event = new CustomEvent('time-select', { detail: eventDetail });

    const webComponent = wrapper.find('ha-time-picker').element;
    webComponent.dispatchEvent(event);

    expect(wrapper.emitted('time-select')).toHaveLength(1);
    expect(wrapper.emitted('time-select')![0][0]).toEqual(eventDetail);
  });

  it('should expose public methods via expose', () => {
    const wrapper = mount(TimePicker);
    const vm = wrapper.vm as unknown as {
      getValue: () => string | null;
      setValue: (value: string) => void;
      clear: () => void;
      open: () => void;
      close: () => void;
      toggle: () => void;
      setNow: () => void;
      setTime: (hour: number, minute: number, second?: number) => void;
      validate: () => boolean;
      isTimeDisabled: (hour: number, minute: number, second?: number) => boolean;
    };

    const webComponent = wrapper.find('ha-time-picker').element as HaTimePicker;
    webComponent.getValue = vi.fn(() => '10:30');
    webComponent.setValue = vi.fn();
    webComponent.clear = vi.fn();
    webComponent.open = vi.fn();
    webComponent.close = vi.fn();
    webComponent.toggle = vi.fn();
    webComponent.setNow = vi.fn();
    webComponent.setTime = vi.fn();
    webComponent.validate = vi.fn(() => true);
    webComponent.isTimeDisabled = vi.fn(() => false);

    vm.getValue();
    expect(webComponent.getValue).toHaveBeenCalled();

    vm.setValue('11:00');
    expect(webComponent.setValue).toHaveBeenCalledWith('11:00');

    vm.clear();
    expect(webComponent.clear).toHaveBeenCalled();

    vm.open();
    expect(webComponent.open).toHaveBeenCalled();

    vm.close();
    expect(webComponent.close).toHaveBeenCalled();

    vm.toggle();
    expect(webComponent.toggle).toHaveBeenCalled();

    vm.setNow();
    expect(webComponent.setNow).toHaveBeenCalled();

    vm.setTime(12, 0);
    expect(webComponent.setTime).toHaveBeenCalledWith(12, 0, undefined);

    vm.validate();
    expect(webComponent.validate).toHaveBeenCalled();

    vm.isTimeDisabled(10, 30);
    expect(webComponent.isTimeDisabled).toHaveBeenCalledWith(10, 30, undefined);
  });
});
