<script setup lang="ts">
import { ref, onMounted, withDefaults } from 'vue';
import type { HaTabs as HaTabsElement } from '@hidearea-design/core';
import '@hidearea-design/core';

export interface TabsProps {
  value?: string;
  variant?: 'default' | 'outlined' | 'pills';
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'default',
  size: 'md',
  align: 'start',
});

const emit = defineEmits<{
  'update:value': [value: string];
  'tab-change': [value: string, oldValue: string];
}>();

const elementRef = ref<HaTabsElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  if (props.value) element.value = props.value;
  element.variant = props.variant;
  element.size = props.size;
  element.align = props.align;

  element.addEventListener('tab-change', (e: Event) => {
    const customEvent = e as CustomEvent<{ value: string; oldValue: string }>;
    emit('update:value', customEvent.detail.value);
    emit('tab-change', customEvent.detail.value, customEvent.detail.oldValue);
  });
});
</script>

<template>
  <ha-tabs ref="elementRef" :value="value" :variant="variant" :size="size" :align="align" v-bind="$attrs">
    <slot />
  </ha-tabs>
</template>
