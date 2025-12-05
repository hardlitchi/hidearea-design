<template>
  <ha-select
    ref="elementRef"
    :variant="variant"
    :size="size"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :error="error"
    :full-width="fullWidth"
    :name="name"
    v-bind="$attrs"
    @change="handleChange"
  >
    <slot />
  </ha-select>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaSelect as HaSelectElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface SelectProps {
  /**
   * Select variant
   * @default "default"
   */
  variant?: 'default' | 'filled' | 'outlined';

  /**
   * Select size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Selected value (v-model)
   */
  modelValue?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

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
   * Full width select
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Select name
   */
  name?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  variant: 'default',
  size: 'md',
  modelValue: '',
  placeholder: '',
  disabled: false,
  required: false,
  error: false,
  fullWidth: false,
  name: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

const elementRef = ref<HaSelectElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  element.variant = props.variant;
  element.size = props.size;
  if (props.modelValue) {
    element.value = props.modelValue;
  }
  if (props.placeholder) {
    element.placeholder = props.placeholder;
  }
  element.disabled = props.disabled;
  element.required = props.required;
  element.error = props.error;
  element.fullWidth = props.fullWidth;
  if (props.name) {
    element.name = props.name;
  }
});

const handleChange = (e: Event) => {
  const customEvent = e as CustomEvent<{ value: string }>;
  const value = customEvent.detail.value;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>
