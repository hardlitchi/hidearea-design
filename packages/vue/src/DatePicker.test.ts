import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import DatePicker from './DatePicker.vue';
import { HaDatePicker } from '@hidearea-design/core';

// Register the custom element globally for testing environments
if (!customElements.get('ha-date-picker')) {
  customElements.define('ha-date-picker', HaDatePicker);
}

describe('DatePicker (Vue Wrapper)', () => {
  it('should render the ha-date-picker web component', () => {
    const wrapper = mount(DatePicker);
    expect(wrapper.find('ha-date-picker').exists()).toBe(true);
  });

  it('should pass props to the web component', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        mode: 'range',
        minDate: '2024-01-01',
        maxDate: '2024-12-31',
        locale: 'ja',
        firstDayOfWeek: 1,
        inline: true,
        disabled: true,
        required: true,
        error: true,
        readonly: true,
        placeholder: 'Select Date',
        label: 'Date',
        helperText: 'Helper',
        errorText: 'Error',
      },
    });

    const webComponent = wrapper.find('ha-date-picker').element as HaDatePicker;

    expect(webComponent.mode).toBe('range');
    expect(webComponent.minDate?.toISOString().split('T')[0]).toBe('2024-01-01');
    expect(webComponent.maxDate?.toISOString().split('T')[0]).toBe('2024-12-31');
    expect(webComponent.locale).toBe('ja');
    expect(webComponent.firstDayOfWeek).toBe(1);
    expect(webComponent.inline).toBe(true);
    expect(webComponent.disabled).toBe(true);
    expect(webComponent.required).toBe(true);
    expect(webComponent.error).toBe(true);
    expect(webComponent.readonly).toBe(true);
    expect(webComponent.getAttribute('placeholder')).toBe('Select Date');
    expect(webComponent.getAttribute('label')).toBe('Date');
    expect(webComponent.getAttribute('helper-text')).toBe('Helper');
    expect(webComponent.getAttribute('error-text')).toBe('Error');
  });

  it('should emit date-select event', async () => {
    const wrapper = mount(DatePicker);
    const date = new Date('2024-07-15T00:00:00.000Z');
    const eventDetail = { value: date };
    const event = new CustomEvent('date-select', { detail: eventDetail });

    const webComponent = wrapper.find('ha-date-picker').element;
    webComponent.dispatchEvent(event);

    expect(wrapper.emitted('date-select')).toHaveLength(1);
    expect(wrapper.emitted('date-select')![0][0]).toEqual(eventDetail);
  });

  it('should expose public methods via expose', () => {
    const wrapper = mount(DatePicker);
    const vm = wrapper.vm as unknown as {
      getValue: () => Date | null;
      setValue: (value: Date | string) => void;
      clear: () => void;
      open: () => void;
      close: () => void;
      toggle: () => void;
      goToToday: () => void;
      goToMonth: (year: number, month: number) => void;
      nextMonth: () => void;
      previousMonth: () => void;
      validate: () => boolean;
      isDateDisabled: (date: Date) => boolean;
    };

    const webComponent = wrapper.find('ha-date-picker').element as HaDatePicker;
    webComponent.getValue = vi.fn(() => new Date('2024-07-15'));
    webComponent.setValue = vi.fn();
    webComponent.clear = vi.fn();
    webComponent.open = vi.fn();
    webComponent.close = vi.fn();
    webComponent.toggle = vi.fn();
    webComponent.goToToday = vi.fn();
    webComponent.goToMonth = vi.fn();
    webComponent.nextMonth = vi.fn();
    webComponent.previousMonth = vi.fn();
    webComponent.validate = vi.fn(() => true);
    webComponent.isDateDisabled = vi.fn(() => false);

    vm.getValue();
    expect(webComponent.getValue).toHaveBeenCalled();

    vm.setValue(new Date());
    expect(webComponent.setValue).toHaveBeenCalled();

    vm.clear();
    expect(webComponent.clear).toHaveBeenCalled();

    vm.open();
    expect(webComponent.open).toHaveBeenCalled();

    vm.close();
    expect(webComponent.close).toHaveBeenCalled();

    vm.toggle();
    expect(webComponent.toggle).toHaveBeenCalled();

    vm.goToToday();
    expect(webComponent.goToToday).toHaveBeenCalled();

    vm.goToMonth(2024, 6);
    expect(webComponent.goToMonth).toHaveBeenCalledWith(2024, 6);

    vm.nextMonth();
    expect(webComponent.nextMonth).toHaveBeenCalled();

    vm.previousMonth();
    expect(webComponent.previousMonth).toHaveBeenCalled();

    vm.validate();
    expect(webComponent.validate).toHaveBeenCalled();

    vm.isDateDisabled(new Date());
    expect(webComponent.isDateDisabled).toHaveBeenCalled();
  });

  it('should pass disabledDates and disabledDaysOfWeek to the web component', async () => {
    // Use UTC to avoid timezone-dependent test failures
    const disabledDates = [
      new Date(Date.UTC(2024, 6, 1)), // July 1, 2024 UTC
      new Date(Date.UTC(2024, 6, 5))  // July 5, 2024 UTC
    ];
    const disabledDaysOfWeek = [0, 6]; // Sunday and Saturday

    const wrapper = mount(DatePicker, {
      props: {
        disabledDates: disabledDates,
        disabledDaysOfWeek: disabledDaysOfWeek,
      },
    });

    const webComponent = wrapper.find('ha-date-picker').element as HaDatePicker;
    await wrapper.vm.$nextTick(); // Ensure props are propagated

    // Compare by date string to avoid timezone issues
    const expectedDates = disabledDates.map(d => d.toDateString());
    const actualDates = webComponent.disabledDates.map(d => d.toDateString());
    expect(actualDates).toEqual(expectedDates);
    expect(webComponent.disabledDaysOfWeek).toEqual(disabledDaysOfWeek);
  });
});
