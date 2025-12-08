import type { ComponentMetadata } from '../../types/metadata.js';

export const metadata: ComponentMetadata = {
  name: 'FileUpload',
  tagName: 'ha-file-upload',
  description: 'File upload component for selecting and uploading files',
  category: 'Form Controls',
  props: [
    { name: 'accept', type: 'string', required: false, description: 'Accepted file types (e.g., "image/*")' },
    { name: 'multiple', type: 'boolean', default: 'false', required: false, description: 'Allow multiple file selection' },
    { name: 'maxSize', type: 'number', required: false, description: 'Maximum file size in bytes' },
    { name: 'maxFiles', type: 'number', required: false, description: 'Maximum number of files' },
    { name: 'disabled', type: 'boolean', default: 'false', required: false, description: 'Disables the file upload' },
    { name: 'dragDrop', type: 'boolean', default: 'true', required: false, description: 'Enable drag and drop' },
    { name: 'label', type: 'string', required: false, description: 'Upload label' },
  ],
  events: [
    { name: 'ha-change', detail: '{ files: FileList }', description: 'Emitted when files are selected' },
    { name: 'ha-error', detail: '{ error: string }', description: 'Emitted when validation fails' },
  ],
  slots: [
    { name: 'default', description: 'Custom upload area content' },
  ],
  examples: [
    {
      title: 'Basic Usage',
      description: 'Simple file upload',
      code: `<ha-file-upload label="Upload files" accept="image/*"></ha-file-upload>`,
    },
    {
      title: 'Multiple Files',
      description: 'Upload multiple files with drag and drop',
      code: `<ha-file-upload
  label="Upload images"
  multiple
  :max-files="5"
  accept="image/*"
  drag-drop
></ha-file-upload>`,
    },
  ],
  accessibility: {
    roles: ['button'],
    keyboardSupport: ['Enter/Space - Open file dialog'],
    ariaAttributes: ['aria-label', 'aria-describedby'],
  },
  tokens: {
    colors: ['component-file-upload-background', 'component-file-upload-border', 'component-file-upload-hover'],
    spacing: ['spacing-md', 'spacing-lg'],
    typography: ['text-body-default-fontSize'],
    other: ['border-radius-md'],
  },
};
