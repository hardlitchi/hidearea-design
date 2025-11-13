import { baseStyles } from '../../styles/base';

export const buttonStyles = `
  ${baseStyles}

  :host {
    display: inline-block;
  }

  button {
    /* Reset */
    margin: 0;
    border: none;
    background: none;
    font-family: inherit;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-2, 0.5rem);

    /* Typography */
    font-family: var(--font-family-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    font-weight: var(--font-weight-medium, 500);
    line-height: var(--font-line-height-normal, 1.5);
    text-decoration: none;
    white-space: nowrap;

    /* Transitions */
    transition:
      background-color var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease),
      border-color var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease),
      color var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease),
      box-shadow var(--animation-duration-base, 200ms) var(--animation-easing-ease, ease),
      transform var(--animation-duration-fast, 150ms) var(--animation-easing-ease, ease);
  }

  button:focus {
    outline: none;
  }

  button:focus-visible {
    outline: 2px solid var(--theme-light-primary-default, #3b82f6);
    outline-offset: 2px;
  }

  button:active:not(:disabled) {
    transform: scale(0.98);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Variant: Primary */
  :host([variant="primary"]) button {
    background-color: var(--theme-light-primary-default, #3b82f6);
    color: var(--color-white, #ffffff);
    border: var(--border-width-1, 1px) solid transparent;
  }

  :host([variant="primary"]) button:hover:not(:disabled) {
    background-color: var(--theme-light-primary-hover, #2563eb);
  }

  :host([variant="primary"]) button:active:not(:disabled) {
    background-color: var(--theme-light-primary-active, #1d4ed8);
  }

  /* Variant: Secondary */
  :host([variant="secondary"]) button {
    background-color: var(--theme-light-secondary-default, #a855f7);
    color: var(--color-white, #ffffff);
    border: var(--border-width-1, 1px) solid transparent;
  }

  :host([variant="secondary"]) button:hover:not(:disabled) {
    background-color: var(--theme-light-secondary-hover, #9333ea);
  }

  :host([variant="secondary"]) button:active:not(:disabled) {
    background-color: var(--theme-light-secondary-active, #7e22ce);
  }

  /* Variant: Outline */
  :host([variant="outline"]) button {
    background-color: transparent;
    color: var(--theme-light-primary-default, #3b82f6);
    border: var(--border-width-1, 1px) solid var(--theme-light-primary-default, #3b82f6);
  }

  :host([variant="outline"]) button:hover:not(:disabled) {
    background-color: var(--theme-light-primary-subtle, #eff6ff);
  }

  :host([variant="outline"]) button:active:not(:disabled) {
    background-color: var(--color-blue-100, #dbeafe);
  }

  /* Variant: Ghost */
  :host([variant="ghost"]) button {
    background-color: transparent;
    color: var(--theme-light-primary-default, #3b82f6);
    border: var(--border-width-1, 1px) solid transparent;
  }

  :host([variant="ghost"]) button:hover:not(:disabled) {
    background-color: var(--theme-light-primary-subtle, #eff6ff);
  }

  :host([variant="ghost"]) button:active:not(:disabled) {
    background-color: var(--color-blue-100, #dbeafe);
  }

  /* Variant: Danger */
  :host([variant="danger"]) button {
    background-color: var(--theme-light-error-default, #ef4444);
    color: var(--color-white, #ffffff);
    border: var(--border-width-1, 1px) solid transparent;
  }

  :host([variant="danger"]) button:hover:not(:disabled) {
    background-color: var(--theme-light-error-hover, #dc2626);
  }

  :host([variant="danger"]) button:active:not(:disabled) {
    background-color: var(--theme-light-error-active, #b91c1c);
  }

  /* Size: Small */
  :host([size="sm"]) button {
    padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
    font-size: var(--font-size-sm, 0.875rem);
    border-radius: var(--border-radius-base, 0.25rem);
    min-height: 32px;
  }

  /* Size: Medium (default) */
  :host([size="md"]) button,
  button {
    padding: var(--spacing-2-5, 0.625rem) var(--spacing-4, 1rem);
    font-size: var(--font-size-base, 1rem);
    border-radius: var(--border-radius-md, 0.375rem);
    min-height: 40px;
  }

  /* Size: Large */
  :host([size="lg"]) button {
    padding: var(--spacing-3, 0.75rem) var(--spacing-6, 1.5rem);
    font-size: var(--font-size-lg, 1.125rem);
    border-radius: var(--border-radius-lg, 0.5rem);
    min-height: 48px;
  }

  /* Full width */
  :host([full-width]) {
    display: block;
    width: 100%;
  }

  :host([full-width]) button {
    width: 100%;
  }

  /* Loading state */
  :host([loading]) button {
    position: relative;
    color: transparent;
    pointer-events: none;
  }

  :host([loading]) button::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-right-color: transparent;
    animation: button-loading-spin 0.6s linear infinite;
  }

  @keyframes button-loading-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
