<template>
  <ha-time-picker
    ref="elementRef"
    :value="value"
    :format="format"
    :show-seconds="showSeconds"
    :hour-step="hourStep"
    :minute-step="minuteStep"
    :second-step="secondStep"
    :min-time="minTime"
    :max-time="maxTime"
    :disabled-hours="disabledHours?.join(',')"
    :disabled-minutes="disabledMinutes?.join(',')"
    :inline="inline"
    :placeholder="placeholder"
    :label="label"
    :helper-text="helperText"
    :disabled="disabled"
    :required="required"
    :error="error"
    :readonly="readonly"
    :error-text="errorText"
    :show-now-button="showNowButton"
    :show-clear-button="showClearButton"
    @time-select="handleTimeSelect"
    @time-clear="handleTimeClear"
    @picker-open="handlePickerOpen"
    @picker-close="handlePickerClose"
    v-bind="$attrs"
  >
    <slot />
  </ha-time-picker>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type {
  HaTimePicker as HaTimePickerElement,
  TimePickerFormat,
  TimePickerPeriod,
} from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface TimePickerProps {
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
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  format: '24',
  showSeconds: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  inline: false,
  disabled: false,
  required: false,
  error: false,
  readonly: false,
  showNowButton: false,
  showClearButton: false,
});

const emit = defineEmits<{
  'time-select': [event: {
    value: string;
    hour: number;
    minute: number;
    second?: number;
    period?: TimePickerPeriod;
  }];
  'time-clear': [];
  'picker-open': [];
  'picker-close': [];
}>();

const elementRef = ref<HaTimePickerElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set initial properties
  element.format = props.format;
  element.showSeconds = props.showSeconds;
  element.hourStep = props.hourStep;
  element.minuteStep = props.minuteStep;
  element.secondStep = props.secondStep;
  element.inline = props.inline;
  element.disabled = props.disabled;
  element.required = props.required;
  element.error = props.error;
  element.readonly = props.readonly;
  element.showNowButton = props.showNowButton;
  element.showClearButton = props.showClearButton;

  if (props.value) {
    element.setAttribute('value', props.value);
  }
  if (props.minTime) {
    element.setAttribute('min-time', props.minTime);
  }
  if (props.maxTime) {
    element.setAttribute('max-time', props.maxTime);
  }
  if (props.disabledHours) {
    element.setAttribute('disabled-hours', props.disabledHours.join(','));
  }
  if (props.disabledMinutes) {
    element.setAttribute('disabled-minutes', props.disabledMinutes.join(','));
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
});

// Watch for prop changes
watch(
  () => props.format,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.format = newValue;
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

// Event handlers
const handleTimeSelect = (e: Event) => {
  const customEvent = e as CustomEvent<{
    value: string;
    hour: number;
    minute: number;
    second?: number;
    period?: TimePickerPeriod;
  }>;
  emit('time-select', customEvent.detail);
};

const handleTimeClear = () => {
  emit('time-clear');
};

const handlePickerOpen = () => {
  emit('picker-open');
};

const handlePickerClose = () => {
  emit('picker-close');
};

// Expose methods
defineExpose({
  getValue: () => elementRef.value?.getValue() ?? null,
  setValue: (value: string) => elementRef.value?.setValue(value),
  clear: () => elementRef.value?.clear(),
  open: () => elementRef.value?.open(),
  close: () => elementRef.value?.close(),
  toggle: () => elementRef.value?.toggle(),
  setNow: () => elementRef.value?.setNow(),
  setTime: (hour: number, minute: number, second?: number) =>
    elementRef.value?.setTime(hour, minute, second),
  validate: () => elementRef.value?.validate() ?? false,
  isTimeDisabled: (hour: number, minute: number, second?: number) =>
    elementRef.value?.isTimeDisabled(hour, minute, second) ?? false,
});
</script>
