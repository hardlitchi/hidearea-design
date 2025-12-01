<template>
  <ha-form-group
    :ref="elementRef"
    :label="label"
    :helper-text="helperText"
    :error-text="errorText"
    :required="required"
    :error="error"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots['helper-text']" #helper-text>
      <slot name="helper-text" />
    </template>
    <template v-if="$slots['error-text']" #error-text>
      <slot name="error-text" />
    </template>
  </ha-form-group>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaFormGroup as HaFormGroupElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface FormGroupProps {
  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text shown below the input
   */
  helperText?: string;

  /**
   * Error text shown when error is true
   */
  errorText?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<FormGroupProps>(), {
  label: '',
  helperText: '',
  errorText: '',
  required: false,
  error: false,
  disabled: false,
});

const elementRef = ref<HaFormGroupElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set properties
  if (props.label) {
    element.label = props.label;
  }
  if (props.helperText) {
    element.helperText = props.helperText;
  }
  if (props.errorText) {
    element.errorText = props.errorText;
  }
  element.required = props.required;
  element.error = props.error;
  element.disabled = props.disabled;
});
</script>
