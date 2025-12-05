import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type {
  HaDatePicker as HaDatePickerElement,
  DatePickerMode,
  DatePickerDate,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Selection mode
   * @default "single"
   */
  mode?: DatePickerMode;

  /**
   * Selected date value (ISO 8601 format)
   */
  value?: string | Date;

  /**
   * Date format
   * @default "YYYY-MM-DD"
   */
  format?: string;

  /**
   * Minimum selectable date
   */
  minDate?: string | Date;

  /**
   * Maximum selectable date
   */
  maxDate?: string | Date;

  /**
   * Disabled dates
   */
  disabledDates?: (string | Date)[];

  /**
   * Disabled days of week (0=Sunday, 6=Saturday)
   */
  disabledDaysOfWeek?: number[];

  /**
   * Locale for date formatting
   * @default "en"
  */
  locale?: string;

  /**
   * First day of week (0=Sunday, 1=Monday)
   * @default 0
   */
  firstDayOfWeek?: 0 | 1;

  /**
   * Display inline (always visible)
   * @default false
   */
  inline?: boolean;

  /**
   * Show week numbers
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Show today button
   * @default false
   */
  showTodayButton?: boolean;

  /**
   * Show clear button
   * @default false
   */
  showClearButton?: boolean;

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
   * Error message
   */
  errorText?: string;

  /**
   * Date select event handler
   */
  onDateSelect?: (event: {
    value?: Date;
    startDate?: Date;
    endDate?: Date;
    dates?: Date[];
  }) => void;

  /**
   * Date clear event handler
   */
  onDateClear?: () => void;

  /**
   * Month change event handler
   */
  onMonthChange?: (year: number, month: number) => void;

  /**
   * Calendar open event handler
   */
  onCalendarOpen?: () => void;

  /**
   * Calendar close event handler
   */
  onCalendarClose?: () => void;
}

export interface DatePickerRef {
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
}

/**
 * DatePicker component
 *
 * A React wrapper for the `ha-date-picker` web component.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={selectedDate}
 *   onDateSelect={(e) => setSelectedDate(e.value)}
 *   minDate={new Date()}
 * />
 * ```
 */
export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      mode = "single",
      value,
      format = "YYYY-MM-DD",
      minDate,
      maxDate,
      disabledDates,
      disabledDaysOfWeek,
      locale = "en",
      firstDayOfWeek = 0,
      inline = false,
      showWeekNumbers = false,
      showTodayButton = false,
      showClearButton = false,
      disabled = false,
      required = false,
      error = false,
      readonly = false,
      placeholder,
      label,
      helperText,
      errorText,
      onDateSelect,
      onDateClear,
      onMonthChange,
      onCalendarOpen,
      onCalendarClose,
      ...restProps
    },
    ref
  ) => {
    const elementRef = useRef<HaDatePickerElement>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => elementRef.current?.getValue() ?? null,
      setValue: (value: Date | string) => elementRef.current?.setValue(value),
      clear: () => elementRef.current?.clear(),
      open: () => elementRef.current?.open(),
      close: () => elementRef.current?.close(),
      toggle: () => elementRef.current?.toggle(),
      goToToday: () => elementRef.current?.goToToday(),
      goToMonth: (year: number, month: number) =>
        elementRef.current?.goToMonth(year, month),
      nextMonth: () => elementRef.current?.nextMonth(),
      previousMonth: () => elementRef.current?.previousMonth(),
      validate: () => elementRef.current?.validate() ?? false,
      isDateDisabled: (date: Date) =>
        elementRef.current?.isDateDisabled(date) ?? false,
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.mode = mode;
      element.format = format;
      element.locale = locale;
      element.firstDayOfWeek = firstDayOfWeek;
      element.inline = inline;
      element.showWeekNumbers = showWeekNumbers;
      element.showTodayButton = showTodayButton;
      element.showClearButton = showClearButton;
      element.disabled = disabled;
      element.required = required;
      element.error = error;
      element.readonly = readonly;

      if (value !== undefined) {
        element.setAttribute(
          "value",
          typeof value === "string" ? value : value.toISOString()
        );
      }
      if (minDate !== undefined) {
        element.minDate =
          typeof minDate === "string" ? new Date(minDate) : minDate;
      }
      if (maxDate !== undefined) {
        element.maxDate =
          typeof maxDate === "string" ? new Date(maxDate) : maxDate;
      }
      if (disabledDates) {
        element.disabledDates = disabledDates.map(d => typeof d === 'string' ? new Date(d) : d);
      }
      if (disabledDaysOfWeek) {
        element.disabledDaysOfWeek = disabledDaysOfWeek;
      }
    }, [
      mode,
      value,
      format,
      minDate,
      maxDate,
      disabledDates,
      disabledDaysOfWeek,
      locale,
      firstDayOfWeek,
      inline,
      showWeekNumbers,
      showTodayButton,
      showClearButton,
      disabled,
      required,
      error,
      readonly,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleDateSelect = (e: Event) => {
        const customEvent = e as CustomEvent<{
          value?: Date;
          startDate?: Date;
          endDate?: Date;
          dates?: Date[];
        }>;
        onDateSelect?.(customEvent.detail);
      };

      const handleDateClear = () => {
        onDateClear?.();
      };

      const handleMonthChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ year: number; month: number }>;
        onMonthChange?.(customEvent.detail.year, customEvent.detail.month);
      };

      const handleCalendarOpen = () => {
        onCalendarOpen?.();
      };

      const handleCalendarClose = () => {
        onCalendarClose?.();
      };

      element.addEventListener("date-select", handleDateSelect);
      element.addEventListener("date-clear", handleDateClear);
      element.addEventListener("month-change", handleMonthChange);
      element.addEventListener("calendar-open", handleCalendarOpen);
      element.addEventListener("calendar-close", handleCalendarClose);

      return () => {
        element.removeEventListener("date-select", handleDateSelect);
        element.removeEventListener("date-clear", handleDateClear);
        element.removeEventListener("month-change", handleMonthChange);
        element.removeEventListener("calendar-open", handleCalendarOpen);
        element.removeEventListener("calendar-close", handleCalendarClose);
      };
    }, [onDateSelect, onDateClear, onMonthChange, onCalendarOpen, onCalendarClose]);

    return <ha-date-picker
      ref={elementRef}
      label={label}
      placeholder={placeholder}
      helper-text={helperText}
      error-text={errorText}
      {...restProps}
    />;
  }
);

DatePicker.displayName = "DatePicker";

// Export types
export type { DatePickerMode, DatePickerDate };