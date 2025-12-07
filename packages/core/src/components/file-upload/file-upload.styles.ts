export const fileUploadStyles = `
  :host {
    display: block;

    /* Size variables */
    --fileupload-min-height: 120px;
    --fileupload-padding: var(--spacing-4);
    --fileupload-gap: var(--spacing-3);

    /* Color variables */
    --fileupload-bg: var(--color-neutral-50, #f9fafb);
    --fileupload-border-color: var(--color-neutral-300, #d1d5db);
    --fileupload-border-width: 2px;
    --fileupload-border-radius: var(--border-radius-md);
    --fileupload-text-color: var(--color-neutral-600, #4b5563);

    /* Drag state */
    --fileupload-drag-bg: var(--primary-default);
    --fileupload-drag-border-color: var(--primary-default);

    /* Error state */
    --fileupload-error-border-color: var(--error-default);
    --fileupload-error-text-color: var(--error-default);

    /* File item */
    --fileupload-item-padding: var(--spacing-2);
    --fileupload-item-gap: var(--spacing-2);
    --fileupload-item-bg: var(--foreground-inverse);
    --fileupload-item-border-radius: var(--border-radius-sm);

    /* Preview */
    --fileupload-preview-size: 48px;

    /* Icon */
    --fileupload-icon-size: 48px;
    --fileupload-icon-color: var(--color-neutral-400, #9ca3af);
  }

  .file-upload {
    display: flex;
    flex-direction: column;
    gap: var(--fileupload-gap);
    width: 100%;
  }

  .file-upload__label {
    display: block;
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--color-neutral-700, #374151);
    margin-bottom: 0.25rem;
  }

  .file-upload__label .required {
    color: var(--error-default);
    margin-left: 0.125rem;
  }

  .file-upload__dropzone {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: var(--fileupload-min-height);
    padding: var(--fileupload-padding);
    background-color: var(--fileupload-bg);
    border: var(--fileupload-border-width) dashed var(--fileupload-border-color);
    border-radius: var(--fileupload-border-radius);
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
  }

  .file-upload__dropzone:hover:not(.file-upload--disabled .file-upload__dropzone) {
    border-color: var(--primary-default);
    background-color: var(--primary-default);
  }

  .file-upload__dropzone:focus-visible {
    border-color: var(--primary-default);
    box-shadow: 0 0 0 3px var(--primary-default);
  }

  .file-upload__dropzone--dragging {
    border-color: var(--fileupload-drag-border-color);
    background-color: var(--fileupload-drag-bg);
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
    width: var(--fileupload-icon-size);
    height: var(--fileupload-icon-size);
    color: var(--fileupload-icon-color);
  }

  .file-upload__placeholder {
    margin: 0;
    font-size: 0.875rem;
    color: var(--fileupload-text-color);
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
    gap: var(--fileupload-item-gap);
    padding: var(--fileupload-item-padding);
    background-color: var(--fileupload-item-bg);
    border-radius: var(--fileupload-item-border-radius);
    border: 1px solid transparent;
  }

  .file-upload__file-item--error {
    border-color: var(--fileupload-error-border-color);
    background-color: var(--error-default);
  }

  .file-upload__file-preview {
    width: var(--fileupload-preview-size);
    height: var(--fileupload-preview-size);
    object-fit: cover;
    border-radius: var(--border-radius-sm);
    flex-shrink: 0;
  }

  .file-upload__file-icon {
    width: var(--fileupload-preview-size);
    height: var(--fileupload-preview-size);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-neutral-200, #e5e7eb);
    border-radius: var(--border-radius-sm);
    color: var(--color-neutral-500, #6b7280);
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
    color: var(--foreground-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-upload__file-size {
    font-size: 0.75rem;
    color: var(--color-neutral-500, #6b7280);
  }

  .file-upload__file-error {
    font-size: 0.75rem;
    color: var(--fileupload-error-text-color);
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
    border-radius: var(--border-radius-sm);
    color: var(--color-neutral-500, #6b7280);
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 0;
  }

  .file-upload__remove-button:hover {
    background-color: var(--color-neutral-200, #e5e7eb);
    color: var(--color-neutral-700, #374151);
  }

  .file-upload__remove-button:focus-visible {
    outline: 2px solid var(--primary-default);
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
    color: var(--color-neutral-500, #6b7280);
  }

  .file-upload__error-message,
  .file-upload__error {
    margin: 0;
    font-size: 0.75rem;
    color: var(--fileupload-error-text-color);
  }

  /* Variants */
  .file-upload--compact .file-upload__dropzone {
    min-height: 80px;
    padding: var(--spacing-3);
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
    padding: var(--spacing-2) var(--spacing-4);
    background-color: var(--primary-default);
    border: 2px solid var(--primary-default);
    border-style: solid;
    border-radius: var(--border-radius-md);
  }

  .file-upload--button .file-upload__dropzone:hover:not(.file-upload--disabled .file-upload__dropzone) {
    background-color: var(--primary-default);
    border-color: var(--primary-default);
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
    border-color: var(--fileupload-error-border-color);
  }

  /* Responsive */
  @media (max-width: 640px) {
    .file-upload__dropzone {
      min-height: 100px;
      padding: var(--spacing-3);
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
