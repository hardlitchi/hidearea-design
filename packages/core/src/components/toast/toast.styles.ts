export const toastStyles = `
  :host {
    display: block;
    position: relative;
  }

  .container {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: var(--toast-padding, 16px);
    background: var(--toast-bg, var(--color-white));
    border-radius: var(--toast-border-radius, var(--radius-lg, 8px));
    box-shadow: var(--toast-shadow, var(--shadow-lg));
    border: 1px solid var(--toast-border-color, var(--color-gray-200));
    min-width: var(--toast-min-width, 300px);
    max-width: var(--toast-max-width, 500px);
    animation: slideIn var(--duration-base, 200ms) var(--ease-out);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :host([closing]) .container {
    animation: slideOut var(--duration-base, 200ms) var(--ease-in);
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  .icon {
    font-size: 20px;
    line-height: 1;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .message {
    color: var(--toast-message-color, var(--color-gray-900));
    font-size: var(--toast-font-size, 14px);
    line-height: 1.5;
  }

  .action {
    flex-shrink: 0;
  }

  .close-button {
    background: transparent;
    border: none;
    color: var(--toast-close-color, var(--color-gray-600));
    cursor: pointer;
    padding: 4px;
    border-radius: var(--radius-base, 4px);
    font-size: 18px;
    line-height: 1;
    flex-shrink: 0;
    transition: background-color var(--duration-fast, 150ms) var(--ease);
  }

  .close-button:hover {
    background: var(--toast-close-hover-bg, var(--color-gray-100));
  }

  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--toast-progress-bg, var(--color-gray-200));
    border-radius: 0 0 var(--toast-border-radius, var(--radius-lg, 8px))
      var(--toast-border-radius, var(--radius-lg, 8px));
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: var(--toast-progress-color, var(--color-primary-500));
    transition: width linear;
    width: 0;
  }

  /* Variants */
  :host([variant="info"]) .container {
    border-color: var(--color-info-300);
  }

  :host([variant="info"]) .icon {
    color: var(--color-info-500);
  }

  :host([variant="info"]) .progress-bar {
    background: var(--color-info-500);
  }

  :host([variant="success"]) .container {
    border-color: var(--color-success-300);
  }

  :host([variant="success"]) .icon {
    color: var(--color-success-500);
  }

  :host([variant="success"]) .progress-bar {
    background: var(--color-success-500);
  }

  :host([variant="warning"]) .container {
    border-color: var(--color-warning-300);
  }

  :host([variant="warning"]) .icon {
    color: var(--color-warning-500);
  }

  :host([variant="warning"]) .progress-bar {
    background: var(--color-warning-500);
  }

  :host([variant="error"]) .container {
    border-color: var(--color-error-300);
  }

  :host([variant="error"]) .icon {
    color: var(--color-error-500);
  }

  :host([variant="error"]) .progress-bar {
    background: var(--color-error-500);
  }
`;
