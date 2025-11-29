export const switchStyles = `
  :host {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-family: var(--font-family-base, system-ui, -apple-system, sans-serif);
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .switch-container {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-3, 0.75rem);
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

  .switch-track {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    background-color: var(--color-neutral-300, #d1d5db);
    transition: background-color 0.2s ease;
    flex-shrink: 0;
    position: relative;
  }

  /* Size variants */
  :host([size="sm"]) .switch-track {
    width: 32px;
    height: 18px;
    padding: 2px;
  }

  :host([size="md"]) .switch-track,
  :host(:not([size])) .switch-track {
    width: 40px;
    height: 22px;
    padding: 2px;
  }

  :host([size="lg"]) .switch-track {
    width: 48px;
    height: 26px;
    padding: 3px;
  }

  /* Thumb */
  .switch-thumb {
    border-radius: 50%;
    background-color: var(--color-background, #ffffff);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }

  :host([size="sm"]) .switch-thumb {
    width: 14px;
    height: 14px;
  }

  :host([size="md"]) .switch-thumb,
  :host(:not([size])) .switch-thumb {
    width: 18px;
    height: 18px;
  }

  :host([size="lg"]) .switch-thumb {
    width: 20px;
    height: 20px;
  }

  /* Checked state */
  :host([checked]) .switch-track {
    background-color: var(--color-primary-600, #4f46e5);
  }

  :host([checked][size="sm"]) .switch-thumb {
    transform: translateX(14px);
  }

  :host([checked][size="md"]) .switch-thumb,
  :host([checked]:not([size])) .switch-thumb {
    transform: translateX(18px);
  }

  :host([checked][size="lg"]) .switch-thumb {
    transform: translateX(22px);
  }

  /* Focus state */
  input:focus-visible + .switch-track {
    outline: 2px solid var(--color-primary-600, #4f46e5);
    outline-offset: 2px;
  }

  /* Hover state */
  :host(:not([disabled])):hover .switch-track {
    opacity: 0.9;
  }

  /* Disabled state */
  :host([disabled]) .switch-track {
    background-color: var(--color-neutral-200, #e5e7eb);
  }

  :host([disabled][checked]) .switch-track {
    background-color: var(--color-neutral-400, #9ca3af);
  }

  /* Error state */
  :host([error]) .switch-track {
    background-color: var(--color-danger-600, #dc2626);
  }

  :host([error]:not([checked])) .switch-track {
    background-color: var(--color-danger-200, #fecaca);
  }

  /* Label */
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

  :host([error]) .label {
    color: var(--color-danger-700, #b91c1c);
  }

  /* Description */
  .label-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1, 0.25rem);
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

  :host([error]) .description {
    color: var(--color-danger-700, #b91c1c);
  }
`;
