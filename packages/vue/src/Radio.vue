<template>
  <ha-radio
    ref="elementRef"
    :size="size"
    :checked="checked"
    :disabled="disabled"
    :required="required"
    :error="error"
    :name="name"
    :value="value"
    :label="label"
    :description="description"
    v-bind="$attrs"
    @change="handleChange"
  >
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template v-if="$slots.description" #description>
      <slot name="description" />
    </template>
  </ha-radio>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { HaRadio as HaRadioElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface RadioProps {
  size?: 'sm' | 'md' | 'lg';
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
}

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'md',
  checked: false,
  disabled: false,
  required: false,
  error: false,
});

const emit = defineEmits<{
  change: [checked: boolean];
}>();

const elementRef = ref<HaRadioElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  element.size = props.size;
  element.checked = props.checked;
  element.disabled = props.disabled;
  element.required = props.required;
  element.error = props.error;
  if (props.name) element.name = props.name;
  if (props.value) element.value = props.value;
  if (props.label) element.label = props.label;
  if (props.description) element.description = props.description;
});

const handleChange = (e: Event) => {
  const customEvent = e as CustomEvent<{ checked: boolean }>;
  emit('change', customEvent.detail.checked);
};
</script>
