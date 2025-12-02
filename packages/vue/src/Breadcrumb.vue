<script setup lang="ts">
import { ref, onMounted, withDefaults } from 'vue';
import type { HaBreadcrumb as HaBreadcrumbElement } from '@hidearea-design/core';
import '@hidearea-design/core';

export interface BreadcrumbProps {
  separator?: 'slash' | 'chevron' | 'arrow' | 'dot';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: 'slash',
  size: 'md',
});

const elementRef = ref<HaBreadcrumbElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  element.separator = props.separator;
  element.size = props.size;
});
</script>

<template>
  <ha-breadcrumb :ref="elementRef" :separator="separator" :size="size" v-bind="$attrs">
    <slot />
  </ha-breadcrumb>
</template>
