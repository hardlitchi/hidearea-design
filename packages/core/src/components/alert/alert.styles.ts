export const alertStyles = `
  :host {
    display: block;
    font-family: var(--font-family-sans);
  }

  .alert {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-3);
    padding: var(--spacing-4);
    border-radius: var(--border-radius-md);
    font-size: var(--font-size-sm);
    line-height: var(--font-line-height-normal);
    position: relative;
  }

  /* Variants - Filled */
  .alert--filled.alert--info {
    background-color: var(--info-default);
    color: var(--foreground-inverse);
    border: 1px solid var(--info-hover);
  }

  .alert--filled.alert--success {
    background-color: var(--success-default);
    color: var(--foreground-inverse);
    border: 1px solid var(--success-hover);
  }

  .alert--filled.alert--warning {
    background-color: var(--warning-default);
    color: var(--foreground-inverse);
    border: 1px solid var(--warning-hover);
  }

  .alert--filled.alert--error {
    background-color: var(--error-default);
    color: var(--foreground-inverse);
    border: 1px solid var(--error-hover);
  }

  /* Variants - Outlined */
  .alert--outlined.alert--info {
    background-color: transparent;
    color: var(--info-default);
    border: 1px solid var(--info-default);
  }

  .alert--outlined.alert--success {
    background-color: transparent;
    color: var(--success-default);
    border: 1px solid var(--success-default);
  }

  .alert--outlined.alert--warning {
    background-color: transparent;
    color: var(--warning-default);
    border: 1px solid var(--warning-default);
  }

  .alert--outlined.alert--error {
    background-color: transparent;
    color: var(--error-default);
    border: 1px solid var(--error-default);
  }

  /* Variants - Soft */
  .alert--soft.alert--info {
    background-color: var(--info-subtle);
    color: var(--info-default);
    border: 1px solid var(--info-default);
  }

  .alert--soft.alert--success {
    background-color: var(--success-subtle);
    color: var(--success-default);
    border: 1px solid var(--success-default);
  }

  .alert--soft.alert--warning {
    background-color: var(--warning-subtle);
    color: var(--warning-default);
    border: 1px solid var(--warning-default);
  }

  .alert--soft.alert--error {
    background-color: var(--error-subtle);
    color: var(--error-default);
    border: 1px solid var(--error-default);
  }

  /* Icon */
  .alert__icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .alert__icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* Content */
  .alert__content {
    flex: 1;
    min-width: 0;
  }

  .alert__title {
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-1) 0;
  }

  .alert__message {
    margin: 0;
  }

  /* Close button */
  .alert__close {
    flex-shrink: 0;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: currentColor;
    opacity: 0.7;
    transition: opacity var(--animation-duration-base) ease;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .alert__close:hover {
    opacity: 1;
  }

  .alert__close:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
  }

  .alert__close svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* Actions slot */
  .alert__actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-2);
  }

  .alert__actions:empty {
    display: none;
  }
`;
