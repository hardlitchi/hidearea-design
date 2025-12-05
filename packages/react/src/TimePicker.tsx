import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type {
  HaTimePicker as HaTimePickerElement,
  TimePickerFormat,
  TimePickerPeriod,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface TimePickerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Time value in HH:mm or HH:mm:ss format
   */
  value?: string;

  /**
   * Time format
   * @default "24"
   */
  format?: TimePickerFormat;

  /**
   * Show seconds picker
   * @default false
   */
  showSeconds?: boolean;

  /**
   * Hour increment step
   * @default 1
   */
  hourStep?: number;

  /**
   * Minute increment step
   * @default 1
   */
  minuteStep?: number;

  /**
   * Second increment step
   * @default 1
   */
  secondStep?: number;

  /**
   * Minimum selectable time
   */
  minTime?: string;

  /**
   * Maximum selectable time
   */
  maxTime?: string;

  /**
   * Disabled hours array
   */
  disabledHours?: number[];

  /**
   * Disabled minutes array
   */
  disabledMinutes?: number[];

  /**
   * Display inline (always visible)
   * @default false
   */
  inline?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Required state
   * @default false
   */
  required?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Readonly state
   * @default false
   */
  readonly?: boolean;

  /**
   * Error message
   */
  errorText?: string;

  /**
   * Show "Now" button
   * @default false
   */
  showNowButton?: boolean;

  /**
   * Show clear button
   * @default false
   */
  showClearButton?: boolean;

  /**
   * Time select event handler
   */
  onTimeSelect?: (event: {
    value: string;
    hour: number;
    minute: number;
    second?: number;
    period?: TimePickerPeriod;
  }) => void;

  /**
   * Time clear event handler
   */
  onTimeClear?: () => void;

  /**
   * Picker open event handler
   */
  onPickerOpen?: () => void;

  /**
   * Picker close event handler
   */
  onPickerClose?: () => void;
}

export interface TimePickerRef {
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
}

/**
 * TimePicker component
 *
 * A React wrapper for the `ha-time-picker` web component.
 *
 * @example
 * ```tsx
 * <TimePicker
 *   value="14:30"
 *   onTimeSelect={(e) => console.log(e.value)}
 *   showNowButton
 * />
 * ```
 */
export const TimePicker = forwardRef<TimePickerRef, TimePickerProps>(
  (
    {
      value,
      format = "24",
      showSeconds = false,
      hourStep = 1,
      minuteStep = 1,
      secondStep = 1,
      minTime,
      maxTime,
      disabledHours,
      disabledMinutes,
      inline = false,
      placeholder,
      label,
      helperText,
      disabled = false,
      required = false,
      error = false,
      readonly = false,
      errorText,
      showNowButton = false,
      showClearButton = false,
      onTimeSelect,
      onTimeClear,
      onPickerOpen,
      onPickerClose,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaTimePickerElement>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => elementRef.current?.getValue() ?? null,
      setValue: (value: string) => elementRef.current?.setValue(value),
      clear: () => elementRef.current?.clear(),
      open: () => elementRef.current?.open(),
      close: () => elementRef.current?.close(),
      toggle: () => elementRef.current?.toggle(),
      setNow: () => elementRef.current?.setNow(),
      setTime: (hour: number, minute: number, second?: number) =>
        elementRef.current?.setTime(hour, minute, second),
      validate: () => elementRef.current?.validate() ?? false,
      isTimeDisabled: (hour: number, minute: number, second?: number) =>
        elementRef.current?.isTimeDisabled(hour, minute, second) ?? false,
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.format = format;
      element.showSeconds = showSeconds;
      element.hourStep = hourStep;
      element.minuteStep = minuteStep;
      element.secondStep = secondStep;
      element.inline = inline;
      element.disabled = disabled;
      element.required = required;
      element.error = error;
      element.readonly = readonly;
      element.showNowButton = showNowButton;
      element.showClearButton = showClearButton;

      if (value !== undefined) {
        element.setAttribute("value", value);
      }
      if (minTime !== undefined) {
        element.setAttribute("min-time", minTime);
      }
      if (maxTime !== undefined) {
        element.setAttribute("max-time", maxTime);
      }
      if (disabledHours !== undefined) {
        element.setAttribute("disabled-hours", disabledHours.join(","));
      }
      if (disabledMinutes !== undefined) {
        element.setAttribute("disabled-minutes", disabledMinutes.join(","));
      }
      if (placeholder) {
        element.setAttribute("placeholder", placeholder);
      }
      if (label) {
        element.setAttribute("label", label);
      }
      if (helperText) {
        element.setAttribute("helper-text", helperText);
      }
      if (errorText) {
        element.setAttribute("error-text", errorText);
      }
    }, [
      value,
      format,
      showSeconds,
      hourStep,
      minuteStep,
      secondStep,
      minTime,
      maxTime,
      disabledHours,
      disabledMinutes,
      inline,
      placeholder,
      label,
      helperText,
      disabled,
      required,
      error,
      readonly,
      errorText,
      showNowButton,
      showClearButton,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleTimeSelect = (e: Event) => {
        const customEvent = e as CustomEvent<{
          value: string;
          hour: number;
          minute: number;
          second?: number;
          period?: TimePickerPeriod;
        }>;
        onTimeSelect?.(customEvent.detail);
      };

      const handleTimeClear = () => {
        onTimeClear?.();
      };

      const handlePickerOpen = () => {
        onPickerOpen?.();
      };

      const handlePickerClose = () => {
        onPickerClose?.();
      };

      element.addEventListener("time-select", handleTimeSelect);
      element.addEventListener("time-clear", handleTimeClear);
      element.addEventListener("picker-open", handlePickerOpen);
      element.addEventListener("picker-close", handlePickerClose);

      return () => {
        element.removeEventListener("time-select", handleTimeSelect);
        element.removeEventListener("time-clear", handleTimeClear);
        element.removeEventListener("picker-open", handlePickerOpen);
        element.removeEventListener("picker-close", handlePickerClose);
      };
    }, [onTimeSelect, onTimeClear, onPickerOpen, onPickerClose]);

    return <ha-time-picker ref={elementRef} {...props} />;
  }
);

TimePicker.displayName = "TimePicker";

// Export types
export type { TimePickerFormat, TimePickerPeriod };
