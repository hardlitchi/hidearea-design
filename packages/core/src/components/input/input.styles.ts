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
    color: var(--text-primary);

    /* Transitions */
    transition:
      border-color var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease),
      box-shadow var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease);
  }

  input::placeholder {
    color: var(--text-tertiary);
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: var(--surface-secondary);
  }

  input:read-only {
    cursor: default;
  }

  /* Prefix and Suffix slots */
  .prefix,
  .suffix {
    display: inline-flex;
    align-items: center;
    color: var(--text-secondary);
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
    border: var(--border-width-1, 1px) solid var(--border-primary);
    background-color: var(--surface-primary);
  }

  :host([variant="default"]) input:focus,
  input:focus {
    outline: none;
  }

  :host([variant="default"]) .input-wrapper:focus-within {
    border-color: var(--primary-default);
    box-shadow: 0 0 0 3px var(--primary-subtle);
  }

  :host([variant="default"]) input:hover:not(:disabled):not(:focus) ~ .input-wrapper,
  :host([variant="default"]) .input-wrapper:has(input:hover:not(:disabled):not(:focus)) {
    border-color: var(--text-tertiary);
  }

  /* Variant: Filled */
  :host([variant="filled"]) .input-wrapper {
    border: var(--border-width-1, 1px) solid transparent;
    background-color: var(--surface-secondary);
  }

  :host([variant="filled"]) .input-wrapper:focus-within {
    border-color: var(--primary-default);
    background-color: var(--surface-primary);
    box-shadow: 0 0 0 3px var(--primary-subtle);
  }

  :host([variant="filled"]) .input-wrapper:has(input:hover:not(:disabled):not(:focus)) {
    background-color: var(--surface-tertiary);
  }

  /* Variant: Outlined */
  :host([variant="outlined"]) .input-wrapper {
    border: var(--border-width-2, 2px) solid var(--border-primary);
    background-color: var(--surface-primary);
  }

  :host([variant="outlined"]) .input-wrapper:focus-within {
    border-color: var(--primary-default);
    box-shadow: 0 0 0 3px var(--primary-subtle);
  }

  :host([variant="outlined"]) .input-wrapper:has(input:hover:not(:disabled):not(:focus)) {
    border-color: var(--text-tertiary);
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
    border-color: var(--error-default);
  }

  :host([error]) .input-wrapper:focus-within {
    border-color: var(--error-default);
    box-shadow: 0 0 0 3px var(--error-subtle);
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
    color: var(--error-default);
  }
`;
