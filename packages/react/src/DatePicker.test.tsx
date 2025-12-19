import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker, DatePickerRef } from './DatePicker';
import { HaDatePicker } from '@hidearea-design/core';
import { queryShadow } from '../../core/vitest.setup';

// Register the custom element globally for testing environments if not already
if (!customElements.get('ha-date-picker')) {
  customElements.define('ha-date-picker', HaDatePicker);
}

describe('DatePicker (React Wrapper)', () => {
  it('should render the web component', () => {
    const { container } = render(<DatePicker />);
    const webComponent = container.querySelector('ha-date-picker') as HaDatePicker;
    expect(webComponent).toBeInTheDocument();
  });

  it('should pass properties to the web component', async () => {
    const { container } = render(
      <DatePicker
        mode="range"
        minDate="2024-01-01"
        maxDate="2024-12-31"
        locale="ja"
        firstDayOfWeek={1}
        inline
        disabled
        required
        error={false} // Corrected: Should be false to render helperText
        readonly
        placeholder="Select Date"
        label="Date"
        helperText="Helper"
        errorText="Error"
      />
    );
    const webComponent = container.querySelector('ha-date-picker') as HaDatePicker;

    expect(webComponent.mode).toBe('range');
    expect(webComponent.minDate?.toISOString().split('T')[0]).toBe('2024-01-01');
    expect(webComponent.maxDate?.toISOString().split('T')[0]).toBe('2024-12-31');
    expect(webComponent.locale).toBe('ja');
    expect(webComponent.firstDayOfWeek).toBe(1);
    expect(webComponent.inline).toBe(true);
    expect(webComponent.disabled).toBe(true);
    expect(webComponent.required).toBe(true);
    expect(webComponent.error).toBe(false); // Check for false
    expect(webComponent.readonly).toBe(true);
    expect(webComponent.placeholder).toBe('Select Date');

    await waitFor(() => {
      expect(queryShadow(webComponent, '.date-picker__label')?.textContent).toBe('Date');
      expect(queryShadow(webComponent, '.date-picker__helper-text')?.textContent).toBe('Helper');
      expect(queryShadow(webComponent, '.date-picker__error-text')).toBeNull(); // Error text should not be visible when error is false
    });
  });

  it('should handle onDateSelect event', async () => {
    const handleDateSelect = vi.fn();
    const { container } = render(<DatePicker onDateSelect={handleDateSelect} />);
    const webComponent = container.querySelector('ha-date-picker') as HaDatePicker;

    const date = new Date('2024-07-15T00:00:00.000Z');
    const event = new CustomEvent('date-select', { detail: { value: date } });

    fireEvent(webComponent, event);

    expect(handleDateSelect).toHaveBeenCalledTimes(1);
    expect(handleDateSelect).toHaveBeenCalledWith({ value: date });
  });

  it('should expose public methods via ref', () => {
    const ref = React.createRef<DatePickerRef>();
    const { container } = render(<DatePicker ref={ref} />);
    const webComponent = container.querySelector('ha-date-picker') as HaDatePicker;

    // Mock web component methods
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

    ref.current?.getValue();
    expect(webComponent.getValue).toHaveBeenCalled();

    ref.current?.setValue(new Date());
    expect(webComponent.setValue).toHaveBeenCalled();

    ref.current?.clear();
    expect(webComponent.clear).toHaveBeenCalled();

    ref.current?.open();
    expect(webComponent.open).toHaveBeenCalled();

    ref.current?.close();
    expect(webComponent.close).toHaveBeenCalled();

    ref.current?.toggle();
    expect(webComponent.toggle).toHaveBeenCalled();

    ref.current?.goToToday();
    expect(webComponent.goToToday).toHaveBeenCalled();

    ref.current?.goToMonth(2024, 6);
    expect(webComponent.goToMonth).toHaveBeenCalledWith(2024, 6);

    ref.current?.nextMonth();
    expect(webComponent.nextMonth).toHaveBeenCalled();

    ref.current?.previousMonth();
    expect(webComponent.previousMonth).toHaveBeenCalled();

    ref.current?.validate();
    expect(webComponent.validate).toHaveBeenCalled();

    ref.current?.isDateDisabled(new Date());
    expect(webComponent.isDateDisabled).toHaveBeenCalled();
  });

  it('should pass disabledDates and disabledDaysOfWeek to the web component', async () => {
    // Use UTC to avoid timezone-dependent test failures
    const disabledDates = [
      new Date(Date.UTC(2024, 6, 1)), // July 1, 2024 UTC
      new Date(Date.UTC(2024, 6, 5))  // July 5, 2024 UTC
    ];
    const disabledDaysOfWeek = [0, 6]; // Sunday and Saturday

    const { container } = render(
      <DatePicker
        disabledDates={disabledDates}
        disabledDaysOfWeek={disabledDaysOfWeek}
      />
    );

    const webComponent = container.querySelector('ha-date-picker') as HaDatePicker;
    // Compare by date string to avoid timezone issues
    const expectedDates = disabledDates.map(d => d.toDateString());
    const actualDates = webComponent.disabledDates.map(d => d.toDateString());
    expect(actualDates).toEqual(expectedDates);
    expect(webComponent.disabledDaysOfWeek).toEqual(disabledDaysOfWeek);
  });

  it('should render errorText when error is true', async () => {
    const { container } = render(
      <DatePicker
        error={true}
        errorText="This is an error"
      />
    );
    const webComponent = container.querySelector('ha-date-picker') as HaDatePicker;
    await waitFor(() => {
      expect(queryShadow(webComponent, '.date-picker__error-text')?.textContent).toBe('This is an error');
    });
    expect(queryShadow(webComponent, '.date-picker__helper-text')).toBeNull();
  });
});