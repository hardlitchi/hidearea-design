export const formGroupStyles = `
  :host {
    display: block;
    margin-bottom: var(--spacing-4, 1rem);
  }

  .label {
    display: block;
    font-size: var(--font-size-sm, 0.875rem);
    font-weight: var(--font-weight-medium, 500);
    color: var(--color-text-primary, #1a1a1a);
    margin-bottom: var(--spacing-2, 0.5rem);
    cursor: pointer;
  }

  .required-indicator {
    display: none;
    color: var(--color-error, #dc2626);
    margin-left: var(--spacing-1, 0.25rem);
  }

  :host([required]) .required-indicator {
    display: inline;
  }

  .slot-container {
    position: relative;
  }

  .helper-text {
    display: none;
    font-size: var(--font-size-xs, 0.75rem);
    color: var(--color-text-secondary, #6b7280);
    margin-top: var(--spacing-1-5, 0.375rem);
  }

  .error-text {
    display: none;
    font-size: var(--font-size-xs, 0.75rem);
    color: var(--color-error, #dc2626);
    margin-top: var(--spacing-1-5, 0.375rem);
  }

  :host([error]) .label {
    color: var(--color-error, #dc2626);
  }

  :host([disabled]) .label {
    color: var(--color-text-disabled, #9ca3af);
    cursor: not-allowed;
  }

  :host([disabled]) .helper-text {
    color: var(--color-text-disabled, #9ca3af);
  }
`;
