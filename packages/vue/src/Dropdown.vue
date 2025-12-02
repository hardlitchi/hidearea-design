<template>
  <ha-dropdown ref="dropdownRef" :class="className">
    <slot />
  </ha-dropdown>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

interface DropdownProps {
  placement?: string;
  trigger?: string;
  open?: boolean;
  className?: string;
}

interface HaDropdownElement extends HTMLElement {
  placement: string;
  triggerMode: string;
  open: boolean;
}

const props = defineProps<DropdownProps>();
const emit = defineEmits<{
  open: [];
  close: [];
}>();

const dropdownRef = ref<HaDropdownElement | null>(null);

onMounted(() => {
  const element = dropdownRef.value;
  if (!element) return;

  element.addEventListener('open', () => {
    emit('open');
  });

  element.addEventListener('close', () => {
    emit('close');
  });

  if (props.placement) {
    element.placement = props.placement;
  }

  if (props.trigger) {
    element.triggerMode = props.trigger;
  }

  if (typeof props.open === 'boolean') {
    element.open = props.open;
  }
});

watch(
  () => props.placement,
  (newValue) => {
    if (dropdownRef.value && newValue) {
      dropdownRef.value.placement = newValue;
    }
  }
);

watch(
  () => props.trigger,
  (newValue) => {
    if (dropdownRef.value && newValue) {
      dropdownRef.value.triggerMode = newValue;
    }
  }
);

watch(
  () => props.open,
  (newValue) => {
    if (dropdownRef.value && typeof newValue === 'boolean') {
      dropdownRef.value.open = newValue;
    }
  }
);
</script>
