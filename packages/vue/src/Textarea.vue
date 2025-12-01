<template>
  <ha-textarea
    :ref="elementRef"
    :variant="variant"
    :size="size"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :error="error"
    :rows="rows"
    :resize="resize"
    :name="name"
    :maxlength="maxlength"
    :minlength="minlength"
    v-bind="$attrs"
    @input="handleInput"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaTextarea as HaTextareaElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface TextareaProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  name?: string;
  maxlength?: number;
  minlength?: number;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  variant: 'default',
  size: 'md',
  modelValue: '',
  rows: 3,
  resize: 'vertical',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [value: string];
  change: [value: string];
}>();

const elementRef = ref<HaTextareaElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  element.variant = props.variant;
  element.size = props.size;
  if (props.modelValue) element.value = props.modelValue;
  if (props.placeholder) element.placeholder = props.placeholder;
  element.disabled = props.disabled;
  element.readonly = props.readonly;
  element.required = props.required;
  element.error = props.error;
  element.rows = props.rows;
  element.resize = props.resize;
  if (props.name) element.name = props.name;
  if (props.maxlength !== undefined) element.maxlength = props.maxlength;
  if (props.minlength !== undefined) element.minlength = props.minlength;
});

const handleInput = (e: Event) => {
  const customEvent = e as CustomEvent<{ value: string }>;
  const value = customEvent.detail.value;
  emit('update:modelValue', value);
  emit('input', value);
};

const handleChange = (e: Event) => {
  const customEvent = e as CustomEvent<{ value: string }>;
  emit('change', customEvent.detail.value);
};
</script>
