export const alertStyles = `
  :host {
    display: block;
    font-family: var(--ha-font-family-base);
  }

  .alert {
    display: flex;
    align-items: flex-start;
    gap: var(--ha-spacing-3);
    padding: var(--ha-spacing-4);
    border-radius: var(--ha-border-radius-md);
    font-size: var(--ha-font-size-sm);
    line-height: var(--ha-line-height-normal);
    position: relative;
  }

  /* Variants - Filled */
  .alert--filled.alert--info {
    background-color: var(--ha-color-info-500);
    color: white;
    border: 1px solid var(--ha-color-info-600);
  }

  .alert--filled.alert--success {
    background-color: var(--ha-color-success-500);
    color: white;
    border: 1px solid var(--ha-color-success-600);
  }

  .alert--filled.alert--warning {
    background-color: var(--ha-color-warning-500);
    color: white;
    border: 1px solid var(--ha-color-warning-600);
  }

  .alert--filled.alert--error {
    background-color: var(--ha-color-error-500);
    color: white;
    border: 1px solid var(--ha-color-error-600);
  }

  /* Variants - Outlined */
  .alert--outlined.alert--info {
    background-color: transparent;
    color: var(--ha-color-info-700);
    border: 1px solid var(--ha-color-info-500);
  }

  .alert--outlined.alert--success {
    background-color: transparent;
    color: var(--ha-color-success-700);
    border: 1px solid var(--ha-color-success-500);
  }

  .alert--outlined.alert--warning {
    background-color: transparent;
    color: var(--ha-color-warning-700);
    border: 1px solid var(--ha-color-warning-500);
  }

  .alert--outlined.alert--error {
    background-color: transparent;
    color: var(--ha-color-error-700);
    border: 1px solid var(--ha-color-error-500);
  }

  /* Variants - Soft */
  .alert--soft.alert--info {
    background-color: var(--ha-color-info-50);
    color: var(--ha-color-info-700);
    border: 1px solid var(--ha-color-info-200);
  }

  .alert--soft.alert--success {
    background-color: var(--ha-color-success-50);
    color: var(--ha-color-success-700);
    border: 1px solid var(--ha-color-success-200);
  }

  .alert--soft.alert--warning {
    background-color: var(--ha-color-warning-50);
    color: var(--ha-color-warning-700);
    border: 1px solid var(--ha-color-warning-200);
  }

  .alert--soft.alert--error {
    background-color: var(--ha-color-error-50);
    color: var(--ha-color-error-700);
    border: 1px solid var(--ha-color-error-200);
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
    font-weight: var(--ha-font-weight-semibold);
    margin: 0 0 var(--ha-spacing-1) 0;
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
    transition: opacity var(--ha-transition-duration-normal) var(--ha-transition-timing-default);
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
    border-radius: var(--ha-border-radius-sm);
  }

  .alert__close svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  /* Actions slot */
  .alert__actions {
    display: flex;
    gap: var(--ha-spacing-2);
    margin-top: var(--ha-spacing-2);
  }

  .alert__actions:empty {
    display: none;
  }
`;
