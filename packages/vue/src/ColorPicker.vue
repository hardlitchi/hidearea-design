<template>
  <ha-color-picker
    ref="elementRef"
    :value="value"
    :format="format"
    :show-alpha="showAlpha"
    :show-input="showInput"
    :show-swatches="showSwatches"
    :swatches="swatches?.join(',')"
    :disabled="disabled"
    :readonly="readonly"
    @color-change="handleColorChange"
    @color-input="handleColorInput"
    v-bind="$attrs"
  >
    <slot />
  </ha-color-picker>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue";
import "@hidearea-design/core";

export interface ColorPickerProps {
  value?: string;
  format?: "hex" | "rgb" | "hsl";
  showAlpha?: boolean;
  showInput?: boolean;
  showSwatches?: boolean;
  swatches?: string[];
  disabled?: boolean;
  readonly?: boolean;
}

interface ColorDetail {
  value: string;
  h: number;
  s: number;
  l: number;
  a: number;
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  value: "#ff0000",
  format: "hex",
  showAlpha: false,
  showInput: false,
  showSwatches: false,
  swatches: () => [],
  disabled: false,
  readonly: false,
});

const emit = defineEmits<{
  (e: "color-change", detail: ColorDetail): void;
  (e: "color-input", detail: ColorDetail): void;
  (e: "update:value", value: string): void;
}>();

const elementRef: Ref<HTMLElement | null> = ref(null);

const handleColorChange = (event: Event) => {
  const customEvent = event as CustomEvent<ColorDetail>;
  emit("color-change", customEvent.detail);
  emit("update:value", customEvent.detail.value);
};

const handleColorInput = (event: Event) => {
  const customEvent = event as CustomEvent<ColorDetail>;
  emit("color-input", customEvent.detail);
};

// Watch for prop changes
watch(
  () => props.value,
  (newValue) => {
    if (elementRef.value && newValue !== undefined) {
      (elementRef.value as any).value = newValue;
    }
  }
);

watch(
  () => props.format,
  (newValue) => {
    if (elementRef.value && newValue) {
      (elementRef.value as any).format = newValue;
    }
  }
);

watch(
  () => props.showAlpha,
  (newValue) => {
    if (elementRef.value) {
      (elementRef.value as any).showAlpha = newValue;
    }
  }
);

watch(
  () => props.showInput,
  (newValue) => {
    if (elementRef.value) {
      (elementRef.value as any).showInput = newValue;
    }
  }
);

watch(
  () => props.showSwatches,
  (newValue) => {
    if (elementRef.value) {
      (elementRef.value as any).showSwatches = newValue;
    }
  }
);

watch(
  () => props.swatches,
  (newValue) => {
    if (elementRef.value && newValue) {
      (elementRef.value as any).swatches = newValue;
    }
  },
  { deep: true }
);

watch(
  () => props.disabled,
  (newValue) => {
    if (elementRef.value) {
      (elementRef.value as any).disabled = newValue;
    }
  }
);

watch(
  () => props.readonly,
  (newValue) => {
    if (elementRef.value) {
      (elementRef.value as any).readonly = newValue;
    }
  }
);

onMounted(() => {
  if (elementRef.value) {
    if (props.value !== undefined) {
      (elementRef.value as any).value = props.value;
    }
    if (props.format) {
      (elementRef.value as any).format = props.format;
    }
    (elementRef.value as any).showAlpha = props.showAlpha;
    (elementRef.value as any).showInput = props.showInput;
    (elementRef.value as any).showSwatches = props.showSwatches;
    if (props.swatches) {
      (elementRef.value as any).swatches = props.swatches;
    }
    (elementRef.value as any).disabled = props.disabled;
    (elementRef.value as any).readonly = props.readonly;
  }
});

defineExpose({
  getValue: () => (elementRef.value as any)?.getValue() ?? null,
  setValue: (value: string) => (elementRef.value as any)?.setValue(value),
  getColor: () => (elementRef.value as any)?.getColor() ?? null,
  setColor: (h: number, s: number, l: number, a: number = 1) =>
    (elementRef.value as any)?.setColor(h, s, l, a),
});
</script>
