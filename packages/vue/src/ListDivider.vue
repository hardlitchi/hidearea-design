<template>
  <ha-list-divider ref="elementRef" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { HaListDivider as HaListDividerElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

const elementRef = ref<HaListDividerElement | null>(null);

defineExpose({
  element: elementRef,
});
</script>
