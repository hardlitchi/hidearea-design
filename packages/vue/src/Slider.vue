<template>
  <ha-slider
    ref="elementRef"
    :min="min"
    :max="max"
    :step="step"
    :value="value"
    :range="range"
    :range-start="rangeStart"
    :range-end="rangeEnd"
    :orientation="orientation"
    :disabled="disabled"
    :readonly="readonly"
    :show-marks="showMarks"
    :show-tooltip="showTooltip"
    :marks="marks?.join(',')"
    @slider-change="handleSliderChange"
    @slider-input="handleSliderInput"
    v-bind="$attrs"
  >
    <slot />
  </ha-slider>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { HaSlider as HaSliderElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface SliderProps {
  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Current value (single mode)
   */
  value?: number;

  /**
   * Enable range mode
   * @default false
   */
  range?: boolean;

  /**
   * Range start value
   */
  rangeStart?: number;

  /**
   * Range end value
   */
  rangeEnd?: number;

  /**
   * Slider orientation
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Readonly state
   * @default false
   */
  readonly?: boolean;

  /**
   * Show marks on the track
   * @default false
   */
  showMarks?: boolean;

  /**
   * Show tooltip with current value
   * @default false
   */
  showTooltip?: boolean;

  /**
   * Label text
   */
  label?: string;

  /**
   * Mark positions
   */
  marks?: number[];
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  range: false,
  orientation: 'horizontal',
  disabled: false,
  readonly: false,
  showMarks: false,
  showTooltip: false,
});

const emit = defineEmits<{
  'slider-change': [event: { value: number | { start: number; end: number } }];
  'slider-input': [event: { value: number | { start: number; end: number } }];
}>();

const elementRef = ref<HaSliderElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set initial properties
  element.min = props.min;
  element.max = props.max;
  element.step = props.step;
  element.orientation = props.orientation;
  element.disabled = props.disabled;
  element.readonly = props.readonly;
  element.showMarks = props.showMarks;
  element.showTooltip = props.showTooltip;

  if (props.range) {
    element.range = true;
    if (props.rangeStart !== undefined) {
      element.rangeStart = props.rangeStart;
    }
    if (props.rangeEnd !== undefined) {
      element.rangeEnd = props.rangeEnd;
    }
  } else {
    if (props.value !== undefined) {
      element.value = props.value;
    }
  }

  if (props.label) {
    element.setAttribute('label', props.label);
  }

  if (props.marks) {
    element.marks = props.marks;
  }
});

// Watch for prop changes
watch(
  () => props.min,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.min = newValue;
    }
  }
);

watch(
  () => props.max,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.max = newValue;
    }
  }
);

watch(
  () => props.step,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.step = newValue;
    }
  }
);

watch(
  () => props.value,
  (newValue) => {
    if (elementRef.value && !props.range && newValue !== undefined) {
      elementRef.value.value = newValue;
    }
  }
);

watch(
  () => props.rangeStart,
  (newValue) => {
    if (elementRef.value && props.range && newValue !== undefined) {
      elementRef.value.rangeStart = newValue;
    }
  }
);

watch(
  () => props.rangeEnd,
  (newValue) => {
    if (elementRef.value && props.range && newValue !== undefined) {
      elementRef.value.rangeEnd = newValue;
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
  () => props.readonly,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.readonly = newValue;
    }
  }
);

watch(
  () => props.showMarks,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.showMarks = newValue;
    }
  }
);

watch(
  () => props.showTooltip,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.showTooltip = newValue;
    }
  }
);

// Event handlers
const handleSliderChange = (e: Event) => {
  const customEvent = e as CustomEvent<{
    value: number | { start: number; end: number };
  }>;
  emit('slider-change', customEvent.detail);
};

const handleSliderInput = (e: Event) => {
  const customEvent = e as CustomEvent<{
    value: number | { start: number; end: number };
  }>;
  emit('slider-input', customEvent.detail);
};

// Expose methods
defineExpose({
  getValue: () => elementRef.value?.getValue() ?? null,
  setValue: (value: number | { start: number; end: number }) =>
    elementRef.value?.setValue(value),
  reset: () => elementRef.value?.reset(),
});
</script>
