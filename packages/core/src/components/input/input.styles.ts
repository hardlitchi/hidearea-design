import { baseStyles } from "../../styles/base";

export const inputStyles = `
  ${baseStyles}

  :host {
    display: inline-block;
    width: 100%;
  }

  .input-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    font-family: var(--font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  input {
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

  input::placeholder {
    color: var(--color-gray-400, #9ca3af);
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: var(--color-gray-50, #f9fafb);
  }

  input:read-only {
    cursor: default;
  }

  /* Prefix and Suffix slots */
  .prefix,
  .suffix {
    display: inline-flex;
    align-items: center;
    color: var(--color-gray-500, #6b7280);
  }

  .prefix {
    margin-right: var(--spacing-2, 0.5rem);
  }

  .suffix {
    margin-left: var(--spacing-2, 0.5rem);
  }

  /* Variant: Default (Outlined) */
  :host([variant="default"]) .input-wrapper,
  .input-wrapper {
    border: var(--border-width-1, 1px) solid var(--color-gray-300, #d1d5db);
    background-color: var(--color-white, #ffffff);
  }

  :host([variant="default"]) input:focus,
  input:focus {
    outline: none;
  }

  :host([variant="default"]) .input-wrapper:focus-within {
    border-color: var(--theme-light-primary-default, #3b82f6);
    box-shadow: 0 0 0 3px var(--theme-light-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  :host([variant="default"]) input:hover:not(:disabled):not(:focus) ~ .input-wrapper,
  :host([variant="default"]) .input-wrapper:has(input:hover:not(:disabled):not(:focus)) {
    border-color: var(--color-gray-400, #9ca3af);
  }

  /* Variant: Filled */
  :host([variant="filled"]) .input-wrapper {
    border: var(--border-width-1, 1px) solid transparent;
    background-color: var(--color-gray-100, #f3f4f6);
  }

  :host([variant="filled"]) .input-wrapper:focus-within {
    border-color: var(--theme-light-primary-default, #3b82f6);
    background-color: var(--color-white, #ffffff);
    box-shadow: 0 0 0 3px var(--theme-light-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  :host([variant="filled"]) .input-wrapper:has(input:hover:not(:disabled):not(:focus)) {
    background-color: var(--color-gray-200, #e5e7eb);
  }

  /* Variant: Outlined */
  :host([variant="outlined"]) .input-wrapper {
    border: var(--border-width-2, 2px) solid var(--color-gray-300, #d1d5db);
    background-color: var(--color-white, #ffffff);
  }

  :host([variant="outlined"]) .input-wrapper:focus-within {
    border-color: var(--theme-light-primary-default, #3b82f6);
    box-shadow: 0 0 0 3px var(--theme-light-primary-subtle, rgba(59, 130, 246, 0.1));
  }

  :host([variant="outlined"]) .input-wrapper:has(input:hover:not(:disabled):not(:focus)) {
    border-color: var(--color-gray-400, #9ca3af);
  }

  /* Size: Small */
  :host([size="sm"]) .input-wrapper {
    padding: var(--spacing-1-5, 0.375rem) var(--spacing-2-5, 0.625rem);
    border-radius: var(--border-radius-base, 0.25rem);
    min-height: 32px;
  }

  :host([size="sm"]) input {
    font-size: var(--font-size-sm, 0.875rem);
  }

  /* Size: Medium (default) */
  :host([size="md"]) .input-wrapper,
  .input-wrapper {
    padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
    border-radius: var(--border-radius-md, 0.375rem);
    min-height: 40px;
  }

  :host([size="md"]) input,
  input {
    font-size: var(--font-size-base, 1rem);
  }

  /* Size: Large */
  :host([size="lg"]) .input-wrapper {
    padding: var(--spacing-2-5, 0.625rem) var(--spacing-4, 1rem);
    border-radius: var(--border-radius-lg, 0.5rem);
    min-height: 48px;
  }

  :host([size="lg"]) input {
    font-size: var(--font-size-lg, 1.125rem);
  }

  /* Error state */
  :host([error]) .input-wrapper {
    border-color: var(--theme-light-error-default, #ef4444);
  }

  :host([error]) .input-wrapper:focus-within {
    border-color: var(--theme-light-error-default, #ef4444);
    box-shadow: 0 0 0 3px var(--theme-light-error-subtle, rgba(239, 68, 68, 0.1));
  }

  /* Full width */
  :host([full-width]) {
    width: 100%;
  }

  :host([full-width]) .input-wrapper {
    width: 100%;
  }

  /* Required indicator */
  :host([required])::after {
    content: ' *';
    color: var(--theme-light-error-default, #ef4444);
  }
`;
