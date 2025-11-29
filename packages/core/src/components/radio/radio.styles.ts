export const radioStyles = `
  :host {
    display: inline-flex;
    align-items: flex-start;
    cursor: pointer;
    user-select: none;
    font-family: var(--font-family-base, system-ui, -apple-system, sans-serif);
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .radio-container {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2, 0.5rem);
    position: relative;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
  }

  .radio-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid var(--color-neutral-400, #9ca3af);
    background-color: var(--color-background, #ffffff);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  /* Size variants */
  :host([size="sm"]) .radio-circle {
    width: 16px;
    height: 16px;
  }

  :host([size="md"]) .radio-circle,
  :host(:not([size])) .radio-circle {
    width: 20px;
    height: 20px;
  }

  :host([size="lg"]) .radio-circle {
    width: 24px;
    height: 24px;
  }

  /* Inner dot */
  .radio-dot {
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: var(--color-primary-600, #4f46e5);
    transition: all 0.2s ease;
  }

  :host([size="sm"]) .radio-dot {
    width: 8px;
    height: 8px;
  }

  :host([size="md"]) .radio-dot,
  :host(:not([size])) .radio-dot {
    width: 10px;
    height: 10px;
  }

  :host([size="lg"]) .radio-dot {
    width: 12px;
    height: 12px;
  }

  /* Checked state */
  :host([checked]) .radio-circle {
    border-color: var(--color-primary-600, #4f46e5);
    background-color: var(--color-background, #ffffff);
  }

  :host(:not([checked])) .radio-dot {
    width: 0;
    height: 0;
  }

  /* Focus state */
  input:focus-visible + .radio-circle {
    outline: 2px solid var(--color-primary-600, #4f46e5);
    outline-offset: 2px;
  }

  /* Hover state */
  :host(:not([disabled])):hover .radio-circle {
    border-color: var(--color-primary-500, #6366f1);
  }

  /* Disabled state */
  :host([disabled]) .radio-circle {
    border-color: var(--color-neutral-300, #d1d5db);
    background-color: var(--color-neutral-100, #f3f4f6);
  }

  :host([disabled][checked]) .radio-dot {
    background-color: var(--color-neutral-400, #9ca3af);
  }

  /* Error state */
  :host([error]) .radio-circle {
    border-color: var(--color-danger-600, #dc2626);
  }

  :host([error][checked]) .radio-circle {
    border-color: var(--color-danger-600, #dc2626);
  }

  :host([error][checked]) .radio-dot {
    background-color: var(--color-danger-600, #dc2626);
  }

  /* Label wrapper */
  .label-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1, 0.25rem);
  }

  .label {
    display: block;
    font-size: var(--font-size-base, 1rem);
    font-weight: var(--font-weight-normal, 400);
    color: var(--color-text-primary, #1a1a1a);
    line-height: var(--line-height-normal, 1.5);
  }

  :host([size="sm"]) .label {
    font-size: var(--font-size-sm, 0.875rem);
  }

  :host([size="lg"]) .label {
    font-size: var(--font-size-lg, 1.125rem);
  }

  :host([disabled]) .label {
    color: var(--color-text-disabled, #9ca3af);
  }

  .description {
    display: none;
    font-size: var(--font-size-sm, 0.875rem);
    color: var(--color-text-secondary, #6b7280);
    line-height: var(--line-height-normal, 1.5);
  }

  :host([description]) .description,
  .description:not(:empty) {
    display: block;
  }

  :host([disabled]) .description {
    color: var(--color-text-disabled, #9ca3af);
  }

  :host([error]) .label,
  :host([error]) .description {
    color: var(--color-danger-700, #b91c1c);
  }
`;
