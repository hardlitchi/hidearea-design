<template>
  <ha-date-picker
    ref="elementRef"
    :mode="mode"
    :value="value"
    :format="format"
    :min-date="minDate"
    :max-date="maxDate"
    :disabled-dates="disabledDates"
    :disabled-days-of-week="disabledDaysOfWeek"
    :locale="locale"
    :first-day-of-week="firstDayOfWeek"
    :inline="inline"
    :show-week-numbers="showWeekNumbers"
    :show-today-button="showTodayButton"
    :show-clear-button="showClearButton"
    :disabled="disabled"
    :required="required"
    :error="error"
    :readonly="readonly"
    :placeholder="placeholder"
    :label="label"
    :helper-text="helperText"
    :error-text="errorText"
    @date-select="handleDateSelect"
    @date-clear="handleDateClear"
    @month-change="handleMonthChange"
    @calendar-open="handleCalendarOpen"
    @calendar-close="handleCalendarClose"
    v-bind="$attrs"
  >
    <slot />
  </ha-date-picker>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type {
  HaDatePicker as HaDatePickerElement,
  DatePickerMode,
  DatePickerDate,
} from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface DatePickerProps {
  /**
   * Selection mode
   * @default "single"
   */
  mode?: DatePickerMode;

  /**
   * Selected date value
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
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  mode: 'single',
  format: 'YYYY-MM-DD',
  locale: 'en',
  firstDayOfWeek: 0,
  inline: false,
  showWeekNumbers: false,
  showTodayButton: false,
  showClearButton: false,
  disabled: false,
  required: false,
  error: false,
  readonly: false,
  disabledDates: () => [],
  disabledDaysOfWeek: () => [],
});

const emit = defineEmits<{
  'date-select': [event: {
    value?: Date;
    startDate?: Date;
    endDate?: Date;
    dates?: Date[];
  }];
  'date-clear': [];
  'month-change': [year: number, month: number];
  'calendar-open': [];
  'calendar-close': [];
}>();

const elementRef = ref<HaDatePickerElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set initial properties
  element.mode = props.mode;
  element.format = props.format;
  element.locale = props.locale;
  element.firstDayOfWeek = props.firstDayOfWeek;
  element.inline = props.inline;
  element.showWeekNumbers = props.showWeekNumbers;
  element.showTodayButton = props.showTodayButton;
  element.showClearButton = props.showClearButton;
  element.disabled = props.disabled;
  element.required = props.required;
  element.error = props.error;
  element.readonly = props.readonly;

  if (props.value) {
    element.setAttribute(
      'value',
      typeof props.value === 'string' ? props.value : props.value.toISOString()
    );
  }
  if (props.minDate) {
    element.minDate =
      typeof props.minDate === 'string' ? new Date(props.minDate) : props.minDate;
  }
  if (props.maxDate) {
    element.maxDate =
      typeof props.maxDate === 'string' ? new Date(props.maxDate) : props.maxDate;
  }
  if (props.placeholder) {
    element.setAttribute('placeholder', props.placeholder);
  }
  if (props.label) {
    element.setAttribute('label', props.label);
  }
  if (props.helperText) {
    element.setAttribute('helper-text', props.helperText);
  }
  if (props.errorText) {
    element.setAttribute('error-text', props.errorText);
  }
  if (props.disabledDates) {
    element.disabledDates = props.disabledDates;
  }
  if (props.disabledDaysOfWeek) {
    element.disabledDaysOfWeek = props.disabledDaysOfWeek;
  }
});

// Watch for prop changes
watch(
  () => props.mode,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.mode = newValue;
    }
  }
);

watch(
  () => props.disabled,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.disabled = newValue;
    }
  }
);

watch(
  () => props.required,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.required = newValue;
    }
  }
);

watch(
  () => props.error,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.error = newValue;
    }
  }
);

watch(
  () => props.readonly,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.readonly = newValue;
    }
  }
);

watch(
  () => props.inline,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.inline = newValue;
    }
  }
);

watch(
  () => props.disabledDates,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.disabledDates = newValue;
    }
  },
  { deep: true }
);

watch(
  () => props.disabledDaysOfWeek,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.disabledDaysOfWeek = newValue;
    }
  },
  { deep: true }
);

// Event handlers
const handleDateSelect = (e: Event) => {
  const customEvent = e as CustomEvent<{
    value?: Date;
    startDate?: Date;
    endDate?: Date;
    dates?: Date[];
  }>;
  emit('date-select', customEvent.detail);
};

const handleDateClear = () => {
  emit('date-clear');
};

const handleMonthChange = (e: Event) => {
  const customEvent = e as CustomEvent<{ year: number; month: number }>;
  emit('month-change', customEvent.detail.year, customEvent.detail.month);
};

const handleCalendarOpen = () => {
  emit('calendar-open');
};

const handleCalendarClose = () => {
  emit('calendar-close');
};

// Expose methods
defineExpose({
  getValue: () => elementRef.value?.getValue() ?? null,
  setValue: (value: Date | string) => elementRef.value?.setValue(value),
  clear: () => elementRef.value?.clear(),
  open: () => elementRef.value?.open(),
  close: () => elementRef.value?.close(),
  toggle: () => elementRef.value?.toggle(),
  goToToday: () => elementRef.value?.goToToday(),
  goToMonth: (year: number, month: number) => elementRef.value?.goToMonth(year, month),
  nextMonth: () => elementRef.value?.nextMonth(),
  previousMonth: () => elementRef.value?.previousMonth(),
  validate: () => elementRef.value?.validate() ?? false,
  isDateDisabled: (date: Date) => elementRef.value?.isDateDisabled(date) ?? false,
});
</script>
