<template>
  <ha-input
    :ref="elementRef"
    :variant="variant"
    :size="size"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :error="error"
    :full-width="fullWidth"
    :name="name"
    :autocomplete="autocomplete"
    :maxlength="maxlength"
    :minlength="minlength"
    :pattern="pattern"
    :min="min"
    :max="max"
    :step="step"
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    v-bind="$attrs"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </ha-input>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { HaInput as HaInputElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface InputProps {
  /**
   * Input variant
   * @default "default"
   */
  variant?: 'default' | 'filled' | 'outlined';

  /**
   * Input size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Input type
   * @default "text"
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

  /**
   * Input value (for v-model)
   */
  modelValue?: string;

  /**
   * Input placeholder
   */
  placeholder?: string;

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
   * Full width input
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Input name
   */
  name?: string;

  /**
   * Autocomplete attribute
   */
  autocomplete?: string;

  /**
   * Maximum length
   */
  maxlength?: number;

  /**
   * Minimum length
   */
  minlength?: number;

  /**
   * Validation pattern
   */
  pattern?: string;

  /**
   * Minimum value (for number type)
   */
  min?: number;

  /**
   * Maximum value (for number type)
   */
  max?: number;

  /**
   * Step value (for number type)
   */
  step?: number;
}

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'default',
  size: 'md',
  type: 'text',
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  fullWidth: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [value: string, event: Event];
  change: [value: string, event: Event];
  focus: [event: Event];
  blur: [event: Event];
}>();

const elementRef = ref<HaInputElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set initial properties
  element.variant = props.variant;
  element.size = props.size;
  element.type = props.type;
  element.value = props.modelValue || '';
  if (props.placeholder) {
    element.placeholder = props.placeholder;
  }
  element.disabled = props.disabled;
  element.readonly = props.readonly;
  element.required = props.required;
  element.error = props.error;
  element.fullWidth = props.fullWidth;
  if (props.name) {
    element.name = props.name;
  }
  if (props.autocomplete) {
    element.setAttribute('autocomplete', props.autocomplete);
  }
  if (props.maxlength !== undefined) {
    element.setAttribute('maxlength', String(props.maxlength));
  }
  if (props.minlength !== undefined) {
    element.setAttribute('minlength', String(props.minlength));
  }
  if (props.pattern) {
    element.setAttribute('pattern', props.pattern);
  }
  if (props.min !== undefined) {
    element.setAttribute('min', String(props.min));
  }
  if (props.max !== undefined) {
    element.setAttribute('max', String(props.max));
  }
  if (props.step !== undefined) {
    element.setAttribute('step', String(props.step));
  }
});

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (elementRef.value && elementRef.value.value !== newValue) {
      elementRef.value.value = newValue || '';
    }
  }
);

// Event handlers
const handleInput = (e: Event) => {
  const customEvent = e as CustomEvent<{ value: string; originalEvent: Event }>;
  const value = customEvent.detail.value;
  emit('update:modelValue', value);
  emit('input', value, customEvent.detail.originalEvent);
};

const handleChange = (e: Event) => {
  const customEvent = e as CustomEvent<{ value: string; originalEvent: Event }>;
  emit('change', customEvent.detail.value, customEvent.detail.originalEvent);
};

const handleFocus = (e: Event) => {
  const customEvent = e as CustomEvent<{ originalEvent: Event }>;
  emit('focus', customEvent.detail.originalEvent);
};

const handleBlur = (e: Event) => {
  const customEvent = e as CustomEvent<{ originalEvent: Event }>;
  emit('blur', customEvent.detail.originalEvent);
};

// Expose methods
defineExpose({
  focus: () => elementRef.value?.focus(),
  blur: () => elementRef.value?.blur(),
  select: () => elementRef.value?.select(),
  setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') =>
    elementRef.value?.setSelectionRange(start, end, direction),
  checkValidity: () => elementRef.value?.checkValidity() ?? false,
  reportValidity: () => elementRef.value?.reportValidity() ?? false,
  setCustomValidity: (message: string) => elementRef.value?.setCustomValidity(message),
  getValue: () => elementRef.value?.value ?? '',
  setValue: (value: string) => {
    if (elementRef.value) {
      elementRef.value.value = value;
    }
  },
});
</script>
