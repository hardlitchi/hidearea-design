import { baseStyles } from '../../styles/base';

export const textareaStyles = `
  ${baseStyles}

  :host {
    display: inline-block;
    width: 100%;
  }

  .textarea-wrapper {
    position: relative;
    display: inline-flex;
    width: 100%;
    font-family: var(--font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  textarea {
    /* Reset */
    margin: 0;
    border: none;
    background: none;
    font-family: inherit;
    outline: none;

    /* Layout */
    flex: 1;
    width: 100%;
    min-width: 0;
    resize: vertical;

    /* Typography */
    font-family: var(--font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-weight: var(--font-weight-regular, 400);
    line-height: var(--font-line-height-normal, 1.5);
    color: var(--color-gray-900, #111827);

    /* Transitions */
    transition:
      border-color var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease),
      box-shadow var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease);
  }

  textarea::placeholder {
    color: var(--color-gray-400, #9ca3af);
  }

  textarea:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: var(--color-gray-50, #f9fafb);
    resize: none;
  }

  textarea:read-only {
    cursor: default;
  }

  /* Variant: Default (Outlined) */
  :host([variant="default"]) .textarea-wrapper,
  .textarea-wrapper {
    border: var(--border-width-1, 1px) solid var(--color-gray-300, #d1d5db);
    background-color: var(--color-white, #ffffff);
  }

  :host([variant="default"]) textarea:focus,
  textarea:focus {
    outline: none;
  }

  :host([variant="default"]) .textarea-wrapper:focus-within {
    border-color: var(--theme-light-primary-default, #3b82f6);
    box-shadow: 0 0 0 3px var(--theme-light-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  :host([variant="default"]) textarea:hover:not(:disabled):not(:focus) ~ .textarea-wrapper,
  :host([variant="default"]) .textarea-wrapper:has(textarea:hover:not(:disabled):not(:focus)) {
    border-color: var(--color-gray-400, #9ca3af);
  }

  /* Variant: Filled */
  :host([variant="filled"]) .textarea-wrapper {
    border: var(--border-width-1, 1px) solid transparent;
    background-color: var(--color-gray-100, #f3f4f6);
  }

  :host([variant="filled"]) .textarea-wrapper:focus-within {
    background-color: var(--color-white, #ffffff);
    border-color: var(--theme-light-primary-default, #3b82f6);
    box-shadow: 0 0 0 3px var(--theme-light-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  /* Variant: Outlined */
  :host([variant="outlined"]) .textarea-wrapper {
    border: var(--border-width-2, 2px) solid var(--color-gray-300, #d1d5db);
    background-color: var(--color-white, #ffffff);
  }

  :host([variant="outlined"]) .textarea-wrapper:focus-within {
    border-color: var(--theme-light-primary-default, #3b82f6);
  }

  /* Size: Small */
  :host([size="sm"]) textarea {
    font-size: var(--font-size-sm, 0.875rem);
    padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
    min-height: 80px;
  }

  :host([size="sm"]) .textarea-wrapper {
    border-radius: var(--border-radius-md, 0.375rem);
  }

  /* Size: Medium (default) */
  :host([size="md"]) textarea,
  :host(:not([size])) textarea {
    font-size: var(--font-size-base, 1rem);
    padding: var(--spacing-2-5, 0.625rem) var(--spacing-3-5, 0.875rem);
    min-height: 100px;
  }

  :host([size="md"]) .textarea-wrapper,
  :host(:not([size])) .textarea-wrapper {
    border-radius: var(--border-radius-md, 0.375rem);
  }

  /* Size: Large */
  :host([size="lg"]) textarea {
    font-size: var(--font-size-lg, 1.125rem);
    padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
    min-height: 120px;
  }

  :host([size="lg"]) .textarea-wrapper {
    border-radius: var(--border-radius-lg, 0.5rem);
  }

  /* Error state */
  :host([error]) .textarea-wrapper {
    border-color: var(--color-red-500, #ef4444);
  }

  :host([error]) .textarea-wrapper:focus-within {
    border-color: var(--color-red-500, #ef4444);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }

  /* Full width */
  :host([full-width]) {
    width: 100%;
  }

  /* Resize options */
  :host([resize="none"]) textarea {
    resize: none;
  }

  :host([resize="both"]) textarea {
    resize: both;
  }

  :host([resize="horizontal"]) textarea {
    resize: horizontal;
  }

  :host([resize="vertical"]) textarea,
  :host(:not([resize])) textarea {
    resize: vertical;
  }
`;
