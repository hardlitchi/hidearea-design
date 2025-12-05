<template>
  <ha-checkbox
    ref="elementRef"
    :size="size"
    :checked="modelValue"
    :indeterminate="indeterminate"
    :disabled="disabled"
    :required="required"
    :error="error"
    :name="name"
    :value="value"
    :label="label"
    :description="description"
    @change="handleChange"
    @input="handleInput"
    v-bind="$attrs"
  >
    <slot />
  </ha-checkbox>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { HaCheckbox as HaCheckboxElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface CheckboxProps {
  /**
   * Checkbox size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Checked state (for v-model)
   */
  modelValue?: boolean;

  /**
   * Indeterminate state
   * @default false
   */
  indeterminate?: boolean;

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
   * Checkbox name
   */
  name?: string;

  /**
   * Checkbox value
   */
  value?: string;

  /**
   * Checkbox label
   */
  label?: string;

  /**
   * Checkbox description
   */
  description?: string;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'md',
  modelValue: false,
  indeterminate: false,
  disabled: false,
  required: false,
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [checked: boolean, event: Event];
  input: [checked: boolean, event: Event];
}>();

const elementRef = ref<HaCheckboxElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set initial properties
  element.size = props.size;
  element.checked = props.modelValue;
  element.indeterminate = props.indeterminate;
  element.disabled = props.disabled;
  element.required = props.required;
  element.error = props.error;
  if (props.name) {
    element.name = props.name;
  }
  if (props.value) {
    element.value = props.value;
  }
  if (props.label) {
    element.setAttribute('label', props.label);
  }
  if (props.description) {
    element.setAttribute('description', props.description);
  }
});

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (elementRef.value && elementRef.value.checked !== newValue) {
      elementRef.value.checked = newValue;
    }
  }
);

watch(
  () => props.indeterminate,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.indeterminate = newValue;
    }
  }
);

// Event handlers
const handleChange = (e: Event) => {
  const customEvent = e as CustomEvent<{ checked: boolean; originalEvent: Event }>;
  const checked = customEvent.detail.checked;
  emit('update:modelValue', checked);
  emit('change', checked, customEvent.detail.originalEvent);
};

const handleInput = (e: Event) => {
  const customEvent = e as CustomEvent<{ checked: boolean; originalEvent: Event }>;
  emit('input', customEvent.detail.checked, customEvent.detail.originalEvent);
};

// Expose methods
defineExpose({
  focus: () => elementRef.value?.focus(),
  blur: () => elementRef.value?.blur(),
  checkValidity: () => elementRef.value?.checkValidity() ?? false,
  reportValidity: () => elementRef.value?.reportValidity() ?? false,
  setCustomValidity: (message: string) => elementRef.value?.setCustomValidity(message),
  getChecked: () => elementRef.value?.checked ?? false,
  setChecked: (checked: boolean) => {
    if (elementRef.value) {
      elementRef.value.checked = checked;
    }
  },
  getIndeterminate: () => elementRef.value?.indeterminate ?? false,
  setIndeterminate: (indeterminate: boolean) => {
    if (elementRef.value) {
      elementRef.value.indeterminate = indeterminate;
    }
  },
});
</script>
