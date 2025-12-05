import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TimePicker, TimePickerRef } from './TimePicker';
import { HaTimePicker } from '@hidearea-design/core';
import { queryShadow } from '../../core/vitest.setup';

// Register the custom element globally for testing environments if not already
if (!customElements.get('ha-time-picker')) {
  customElements.define('ha-time-picker', HaTimePicker);
}

describe('TimePicker (React Wrapper)', () => {
  it('should render the web component', () => {
    const { container } = render(<TimePicker />);
    const webComponent = container.querySelector('ha-time-picker') as HaTimePicker;
    expect(webComponent).toBeInTheDocument();
  });

  it('should pass properties to the web component', async () => {
    const { container } = render(
      <TimePicker
        value="10:00"
        format="12"
        showSeconds
        hourStep={2}
        minuteStep={15}
        secondStep={30}
        minTime="08:00"
        maxTime="18:00"
        disabledHours={[1, 2, 3]}
        disabledMinutes={[0, 1]}
        inline
        placeholder="Select time"
        label="Time"
        helperText="Helper"
        disabled
        required
        error
        readonly
        errorText="Error"
        showNowButton
        showClearButton
      />
    );
    const webComponent = container.querySelector('ha-time-picker') as HaTimePicker;

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
    expect(webComponent.placeholder).toBe('Select time');
    expect(webComponent.disabled).toBe(true);
    expect(webComponent.required).toBe(true);
    expect(webComponent.error).toBe(true);
    expect(webComponent.readonly).toBe(true);
    expect(webComponent.showNowButton).toBe(true);
    expect(webComponent.showClearButton).toBe(true);
    
    await waitFor(() => {
        expect(queryShadow(webComponent, 'label')?.textContent).toBe('Time');
        expect(queryShadow(webComponent, '.helper-text')).toBeNull(); // Should not be visible when error is true
        expect(queryShadow(webComponent, '.error-text')?.textContent).toBe('Error');
    });
  });

  it('should handle onTimeSelect event', async () => {
    const handleTimeSelect = vi.fn();
    const { container } = render(<TimePicker onTimeSelect={handleTimeSelect} />);
    const webComponent = container.querySelector('ha-time-picker') as HaTimePicker;

    const eventDetail = {
      value: '10:30',
      hour: 10,
      minute: 30,
      second: 0,
      period: 'AM',
    };
    const event = new CustomEvent('time-select', { detail: eventDetail });

    fireEvent(webComponent, event);

    expect(handleTimeSelect).toHaveBeenCalledTimes(1);
    expect(handleTimeSelect).toHaveBeenCalledWith(eventDetail);
  });

  it('should expose public methods via ref', () => {
    const ref = React.createRef<TimePickerRef>();
    const { container } = render(<TimePicker ref={ref} />);
    const webComponent = container.querySelector('ha-time-picker') as HaTimePicker;

    // Mock web component methods
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

    ref.current?.getValue();
    expect(webComponent.getValue).toHaveBeenCalled();

    ref.current?.setValue('11:00');
    expect(webComponent.setValue).toHaveBeenCalledWith('11:00');

    ref.current?.clear();
    expect(webComponent.clear).toHaveBeenCalled();

    ref.current?.open();
    expect(webComponent.open).toHaveBeenCalled();

    ref.current?.close();
    expect(webComponent.close).toHaveBeenCalled();

    ref.current?.toggle();
    expect(webComponent.toggle).toHaveBeenCalled();

    ref.current?.setNow();
    expect(webComponent.setNow).toHaveBeenCalled();

    ref.current?.setTime(12, 0);
    expect(webComponent.setTime).toHaveBeenCalledWith(12, 0, undefined);

    ref.current?.validate();
    expect(webComponent.validate).toHaveBeenCalled();

    ref.current?.isTimeDisabled(10, 30);
    expect(webComponent.isTimeDisabled).toHaveBeenCalledWith(10, 30, undefined);
  });
});
