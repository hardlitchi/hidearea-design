export const fileUploadStyles = `
  :host {
    display: block;

    /* Size variables */
    --ha-fileupload-min-height: 120px;
    --ha-fileupload-padding: var(--ha-spacing-4, 1rem);
    --ha-fileupload-gap: var(--ha-spacing-3, 0.75rem);

    /* Color variables */
    --ha-fileupload-bg: var(--ha-color-neutral-50, #f9fafb);
    --ha-fileupload-border-color: var(--ha-color-neutral-300, #d1d5db);
    --ha-fileupload-border-width: 2px;
    --ha-fileupload-border-radius: var(--ha-radius-md, 0.375rem);
    --ha-fileupload-text-color: var(--ha-color-neutral-600, #4b5563);

    /* Drag state */
    --ha-fileupload-drag-bg: var(--ha-color-primary-50, #eff6ff);
    --ha-fileupload-drag-border-color: var(--ha-color-primary-500, #3b82f6);

    /* Error state */
    --ha-fileupload-error-border-color: var(--ha-color-error-500, #ef4444);
    --ha-fileupload-error-text-color: var(--ha-color-error-700, #b91c1c);

    /* File item */
    --ha-fileupload-item-padding: var(--ha-spacing-2, 0.5rem);
    --ha-fileupload-item-gap: var(--ha-spacing-2, 0.5rem);
    --ha-fileupload-item-bg: var(--ha-color-neutral-100, #f3f4f6);
    --ha-fileupload-item-border-radius: var(--ha-radius-sm, 0.25rem);

    /* Preview */
    --ha-fileupload-preview-size: 48px;

    /* Icon */
    --ha-fileupload-icon-size: 48px;
    --ha-fileupload-icon-color: var(--ha-color-neutral-400, #9ca3af);
  }

  .file-upload {
    display: flex;
    flex-direction: column;
    gap: var(--ha-fileupload-gap);
    width: 100%;
  }

  .file-upload__label {
    display: block;
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--ha-color-neutral-700, #374151);
    margin-bottom: 0.25rem;
  }

  .file-upload__label .required {
    color: var(--ha-color-error-500, #ef4444);
    margin-left: 0.125rem;
  }

  .file-upload__dropzone {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--ha-fileupload-min-height);
    padding: var(--ha-fileupload-padding);
    background-color: var(--ha-fileupload-bg);
    border: var(--ha-fileupload-border-width) dashed var(--ha-fileupload-border-color);
    border-radius: var(--ha-fileupload-border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
  }

  .file-upload__dropzone:hover:not(.file-upload--disabled .file-upload__dropzone) {
    border-color: var(--ha-color-primary-400, #60a5fa);
    background-color: var(--ha-color-primary-25, #f0f9ff);
  }

  .file-upload__dropzone:focus-visible {
    border-color: var(--ha-color-primary-500, #3b82f6);
    box-shadow: 0 0 0 3px var(--ha-color-primary-100, #dbeafe);
  }

  .file-upload__dropzone--dragging {
    border-color: var(--ha-fileupload-drag-border-color);
    background-color: var(--ha-fileupload-drag-bg);
    border-style: solid;
  }

  .file-upload__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .file-upload__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    pointer-events: none;
  }

  .file-upload__icon {
    width: var(--ha-fileupload-icon-size);
    height: var(--ha-fileupload-icon-size);
    color: var(--ha-fileupload-icon-color);
  }

  .file-upload__placeholder {
    margin: 0;
    font-size: 0.875rem;
    color: var(--ha-fileupload-text-color);
    text-align: center;
  }

  /* File list */
  .file-upload__file-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .file-upload__file-item {
    display: flex;
    align-items: center;
    gap: var(--ha-fileupload-item-gap);
    padding: var(--ha-fileupload-item-padding);
    background-color: var(--ha-fileupload-item-bg);
    border-radius: var(--ha-fileupload-item-border-radius);
    border: 1px solid transparent;
  }

  .file-upload__file-item--error {
    border-color: var(--ha-fileupload-error-border-color);
    background-color: var(--ha-color-error-50, #fef2f2);
  }

  .file-upload__file-preview {
    width: var(--ha-fileupload-preview-size);
    height: var(--ha-fileupload-preview-size);
    object-fit: cover;
    border-radius: var(--ha-radius-sm, 0.25rem);
    flex-shrink: 0;
  }

  .file-upload__file-icon {
    width: var(--ha-fileupload-preview-size);
    height: var(--ha-fileupload-preview-size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--ha-color-neutral-200, #e5e7eb);
    border-radius: var(--ha-radius-sm, 0.25rem);
    color: var(--ha-color-neutral-500, #6b7280);
    flex-shrink: 0;
  }

  .file-upload__file-icon svg {
    width: 24px;
    height: 24px;
  }

  .file-upload__file-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  .file-upload__file-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--ha-color-neutral-900, #111827);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-upload__file-size {
    font-size: 0.75rem;
    color: var(--ha-color-neutral-500, #6b7280);
  }

  .file-upload__file-error {
    font-size: 0.75rem;
    color: var(--ha-fileupload-error-text-color);
  }

  .file-upload__remove-button {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--ha-radius-sm, 0.25rem);
    color: var(--ha-color-neutral-500, #6b7280);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
  }

  .file-upload__remove-button:hover {
    background-color: var(--ha-color-neutral-200, #e5e7eb);
    color: var(--ha-color-neutral-700, #374151);
  }

  .file-upload__remove-button:focus-visible {
    outline: 2px solid var(--ha-color-primary-500, #3b82f6);
    outline-offset: 2px;
  }

  .file-upload__remove-button svg {
    width: 16px;
    height: 16px;
  }

  /* Helper and error text */
  .file-upload__helper-text {
    margin: 0;
    font-size: 0.75rem;
    color: var(--ha-color-neutral-500, #6b7280);
  }

  .file-upload__error-message,
  .file-upload__error {
    margin: 0;
    font-size: 0.75rem;
    color: var(--ha-fileupload-error-text-color);
  }

  /* Variants */
  .file-upload--compact .file-upload__dropzone {
    min-height: 80px;
    padding: var(--ha-spacing-3, 0.75rem);
  }

  .file-upload--compact .file-upload__icon {
    width: 32px;
    height: 32px;
  }

  .file-upload--compact .file-upload__placeholder {
    font-size: 0.8125rem;
  }

  .file-upload--button .file-upload__dropzone {
    min-height: auto;
    padding: var(--ha-spacing-2, 0.5rem) var(--ha-spacing-4, 1rem);
    background-color: var(--ha-color-primary-500, #3b82f6);
    border: 2px solid var(--ha-color-primary-500, #3b82f6);
    border-style: solid;
    border-radius: var(--ha-radius-md, 0.375rem);
  }

  .file-upload--button .file-upload__dropzone:hover:not(.file-upload--disabled .file-upload__dropzone) {
    background-color: var(--ha-color-primary-600, #2563eb);
    border-color: var(--ha-color-primary-600, #2563eb);
  }

  .file-upload--button .file-upload__content {
    flex-direction: row;
  }

  .file-upload--button .file-upload__icon {
    width: 20px;
    height: 20px;
    color: white;
  }

  .file-upload--button .file-upload__placeholder {
    color: white;
    font-weight: 500;
  }

  /* Disabled state */
  .file-upload--disabled .file-upload__dropzone {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Error state */
  .file-upload--error .file-upload__dropzone {
    border-color: var(--ha-fileupload-error-border-color);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .file-upload__dropzone {
      min-height: 100px;
      padding: var(--ha-spacing-3, 0.75rem);
    }

    .file-upload__icon {
      width: 40px;
      height: 40px;
    }

    .file-upload__placeholder {
      font-size: 0.8125rem;
    }

    .file-upload__file-preview,
    .file-upload__file-icon {
      width: 40px;
      height: 40px;
    }
  }
`;
