<template>
  <ha-file-upload
    ref="elementRef"
    :variant="variant"
    :multiple="multiple"
    :accept="accept"
    :max-size="maxSize"
    :max-files="maxFiles"
    :disabled="disabled"
    :required="required"
    :error="error"
    :show-file-list="showFileList"
    :show-preview="showPreview"
    :label="label"
    :placeholder="placeholder"
    :drag-drop-text="dragDropText"
    :helper-text="helperText"
    :error-text="errorText"
    @file-select="handleFileSelect"
    @file-remove="handleFileRemove"
    @file-clear="handleFileClear"
    @validation-error="handleValidationError"
    v-bind="$attrs"
  >
    <slot />
  </ha-file-upload>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type {
  HaFileUpload as HaFileUploadElement,
  FileUploadFile,
  FileUploadVariant,
} from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface FileUploadProps {
  /**
   * File upload variant
   * @default "default"
   */
  variant?: FileUploadVariant;

  /**
   * Allow multiple file selection
   * @default false
   */
  multiple?: boolean;

  /**
   * Accepted file types (e.g., "image/*,application/pdf")
   */
  accept?: string;

  /**
   * Maximum file size in bytes
   */
  maxSize?: number;

  /**
   * Maximum number of files
   */
  maxFiles?: number;

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
   * Show file list
   * @default true
   */
  showFileList?: boolean;

  /**
   * Show file preview
   * @default false
   */
  showPreview?: boolean;

  /**
   * Label text
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Drag and drop text
   */
  dragDropText?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Error message
   */
  errorText?: string;
}

const props = withDefaults(defineProps<FileUploadProps>(), {
  variant: 'default',
  multiple: false,
  disabled: false,
  required: false,
  error: false,
  showFileList: true,
  showPreview: false,
});

const emit = defineEmits<{
  'file-select': [
    files: File[],
    validFiles: File[],
    invalidFiles: Array<{ file: File; error: string }>
  ];
  'file-remove': [file: File, remainingFiles: File[]];
  'file-clear': [clearedFiles: File[]];
  'validation-error': [invalidFiles: Array<{ file: File; error: string }>];
}>();

const elementRef = ref<HaFileUploadElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // Set initial properties
  element.variant = props.variant;
  element.multiple = props.multiple;
  element.disabled = props.disabled;
  element.required = props.required;
  element.error = props.error;
  element.showFileList = props.showFileList;
  element.showPreview = props.showPreview;

  if (props.accept) {
    element.setAttribute('accept', props.accept);
  }
  if (props.maxSize !== undefined) {
    element.setAttribute('max-size', String(props.maxSize));
  }
  if (props.maxFiles !== undefined) {
    element.setAttribute('max-files', String(props.maxFiles));
  }
  if (props.label) {
    element.setAttribute('label', props.label);
  }
  if (props.placeholder) {
    element.setAttribute('placeholder', props.placeholder);
  }
  if (props.dragDropText) {
    element.setAttribute('drag-drop-text', props.dragDropText);
  }
  if (props.helperText) {
    element.setAttribute('helper-text', props.helperText);
  }
  if (props.errorText) {
    element.setAttribute('error-text', props.errorText);
  }
});

// Watch for prop changes
watch(
  () => props.variant,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.variant = newValue;
    }
  }
);

watch(
  () => props.multiple,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.multiple = newValue;
    }
  }
);

watch(
  () => props.disabled,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.disabled = newValue;
    }
  }
);

watch(
  () => props.required,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.required = newValue;
    }
  }
);

watch(
  () => props.error,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.error = newValue;
    }
  }
);

watch(
  () => props.showFileList,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.showFileList = newValue;
    }
  }
);

watch(
  () => props.showPreview,
  (newValue) => {
    if (elementRef.value) {
      elementRef.value.showPreview = newValue;
    }
  }
);

// Event handlers
const handleFileSelect = (e: Event) => {
  const customEvent = e as CustomEvent<{
    files: File[];
    validFiles: File[];
    invalidFiles: Array<{ file: File; error: string }>;
  }>;
  emit(
    'file-select',
    customEvent.detail.files,
    customEvent.detail.validFiles,
    customEvent.detail.invalidFiles
  );
};

const handleFileRemove = (e: Event) => {
  const customEvent = e as CustomEvent<{
    file: File;
    remainingFiles: File[];
  }>;
  emit('file-remove', customEvent.detail.file, customEvent.detail.remainingFiles);
};

const handleFileClear = (e: Event) => {
  const customEvent = e as CustomEvent<{ clearedFiles: File[] }>;
  emit('file-clear', customEvent.detail.clearedFiles);
};

const handleValidationError = (e: Event) => {
  const customEvent = e as CustomEvent<{
    invalidFiles: Array<{ file: File; error: string }>;
  }>;
  emit('validation-error', customEvent.detail.invalidFiles);
};

// Expose methods
defineExpose({
  getFiles: () => elementRef.value?.getFiles() ?? [],
  addFiles: (files: File[]) => elementRef.value?.addFiles(files),
  removeFile: (fileOrId: File | string) => elementRef.value?.removeFile(fileOrId),
  clearFiles: () => elementRef.value?.clearFiles(),
  validate: () => elementRef.value?.validate() ?? false,
  openFilePicker: () => elementRef.value?.openFilePicker(),
});
</script>
