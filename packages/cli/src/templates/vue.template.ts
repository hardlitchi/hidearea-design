export const vueTemplate = (PascalName: string, kebabName: string) => `<template>
  <ha-${kebabName}
    :variant="variant"
    :disabled="disabled"
    ref="elementRef"
  >
    <slot />
  </ha-${kebabName}>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Ha${PascalName} as Ha${PascalName}Element } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ${PascalName}Props {
  /**
   * Component variant
   * @default "default"
   */
  variant?: string;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<${PascalName}Props>(), {
  variant: "default",
  disabled: false,
});

const elementRef = ref<Ha${PascalName}Element>();

// Sync props to element
watch(
  () => [props.variant, props.disabled],
  () => {
    if (!elementRef.value) return;
    elementRef.value.variant = props.variant;
    elementRef.value.disabled = props.disabled;
  },
  { immediate: true }
);

// Expose methods
defineExpose({
  focus: () => elementRef.value?.focus(),
  blur: () => elementRef.value?.blur(),
});
</script>
`;
