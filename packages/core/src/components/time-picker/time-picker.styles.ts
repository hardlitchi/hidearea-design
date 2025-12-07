export const styles = `
  :host {
    display: inline-block;
    width: var(--time-picker-width, 280px);
    font-family: var(--font-family-sans);
    font-size: var(--font-size-base);
  }

  .container {
    position: relative;
  }

  .container.inline {
    width: auto;
  }

  /* Label */
  label {
    display: block;
    margin-bottom: var(--spacing-1);
    font-weight: var(--font-weight-medium);
    color: var(--foreground-primary);
    font-size: var(--font-size-sm);
  }

  /* Input Wrapper */
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    height: var(--time-picker-input-height, 40px);
    padding: var(--time-picker-input-padding, var(--spacing-2));
    background: var(--time-picker-input-bg, var(--background-primary));
    border: var(--time-picker-input-border, 1px solid var(--border-default));
    border-radius: var(--time-picker-border-radius, var(--border-radius-md));
    cursor: pointer;
    transition: all 0.2s;
  }

  .input-wrapper:hover {
    border-color: var(--primary-default);
  }

  .input-wrapper:focus-within {
    outline: 2px solid var(--primary-default);
    outline-offset: 2px;
  }

  .container.disabled .input-wrapper {
    background: var(--background-primary);
    border-color: var(--border-default);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .container.error .input-wrapper {
    border-color: var(--time-picker-error-border, var(--error-default));
  }

  .container.readonly .input-wrapper {
    background: var(--background-primary);
    cursor: default;
  }

  /* Icon */
  .icon {
    font-size: 18px;
    flex-shrink: 0;
  }

  /* Input */
  .input {
    flex: 1;
    border: none;
    background: transparent;
    color: var(--time-picker-input-color, var(--foreground-primary));
    font-size: inherit;
    font-family: inherit;
    outline: none;
    cursor: pointer;
  }

  .input::placeholder {
    color: var(--foreground-primary);
  }

  .container.disabled .input {
    cursor: not-allowed;
  }

  /* Toggle */
  .toggle {
    font-size: 12px;
    color: var(--foreground-primary);
    flex-shrink: 0;
    transition: transform 0.2s;
  }

  /* Panel */
  .panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    width: var(--time-picker-panel-width, 280px);
    max-height: var(--time-picker-panel-max-height, 300px);
    background: var(--time-picker-panel-bg, var(--background-primary));
    border: 1px solid var(--border-default);
    border-radius: var(--time-picker-border-radius, var(--border-radius-md));
    box-shadow: var(--time-picker-panel-shadow, var(--shadow-lg));
    overflow: hidden;
  }

  .container.inline .panel {
    position: static;
    box-shadow: none;
  }

  /* Columns */
  .columns {
    display: flex;
    border-bottom: 1px solid var(--border-default);
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .column:not(:last-child) {
    border-right: 1px solid var(--border-default);
  }

  .period-column {
    flex: 0.8;
  }

  /* Column Header */
  .column-header {
    padding: var(--spacing-2);
    text-align: center;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xs);
    color: var(--foreground-primary);
    background: var(--background-primary);
    border-bottom: 1px solid var(--border-default);
    text-transform: uppercase;
  }

  /* Column Items */
  .column-items {
    max-height: 200px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .column-items::-webkit-scrollbar {
    width: 6px;
  }

  .column-items::-webkit-scrollbar-track {
    background: var(--background-primary);
  }

  .column-items::-webkit-scrollbar-thumb {
    background: var(--border-default);
    border-radius: 3px;
  }

  .column-items::-webkit-scrollbar-thumb:hover {
    background: var(--foreground-primary);
  }

  /* Item */
  .item {
    padding: var(--time-picker-item-padding, var(--spacing-2));
    text-align: center;
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
    user-select: none;
  }

  .item:hover:not(.disabled) {
    background: var(--time-picker-item-hover-bg, var(--primary-default));
  }

  .item.selected {
    background: var(--time-picker-item-selected-bg, var(--primary-default));
    color: var(--time-picker-item-selected-color, var(--primary-default));
    font-weight: var(--font-weight-medium);
  }

  .item.disabled {
    color: var(--time-picker-item-disabled-color, var(--foreground-primary));
    background: var(--time-picker-item-disabled-bg, transparent);
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Period Toggle */
  .period-toggle {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-2);
    gap: var(--spacing-1);
  }

  .period-button {
    padding: var(--spacing-2);
    border: 1px solid var(--border-default);
    border-radius: var(--border-radius-sm);
    background: var(--background-primary);
    color: var(--foreground-primary);
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: all 0.15s;
  }

  .period-button:hover {
    background: var(--primary-default);
    border-color: var(--primary-default);
  }

  .period-button.active {
    background: var(--primary-default);
    color: var(--primary-default);
    border-color: var(--primary-default);
    font-weight: var(--font-weight-medium);
  }

  /* Actions */
  .actions {
    display: flex;
    gap: var(--spacing-2);
    padding: var(--spacing-2);
    border-top: 1px solid var(--border-default);
  }

  .now-button,
  .clear-button {
    flex: 1;
    padding: var(--spacing-2);
    border: 1px solid var(--border-default);
    border-radius: var(--border-radius-sm);
    background: var(--background-primary);
    color: var(--foreground-primary);
    font-family: inherit;
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all 0.15s;
  }

  .now-button:hover,
  .clear-button:hover {
    background: var(--primary-default);
    border-color: var(--primary-default);
    color: var(--primary-default);
  }

  .now-button:active,
  .clear-button:active {
    transform: scale(0.98);
  }

  /* Helper Text */
  .helper-text {
    margin-top: var(--spacing-1);
    font-size: var(--font-size-xs);
    color: var(--foreground-primary);
  }

  /* Error Text */
  .error-text {
    margin-top: var(--spacing-1);
    font-size: var(--font-size-xs);
    color: var(--time-picker-error-color, var(--error-default));
  }

  /* Disabled State */
  .container.disabled label {
    color: var(--foreground-primary);
  }

  /* Readonly State */
  .container.readonly .toggle {
    display: none;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .panel {
      width: 100%;
      max-width: calc(100vw - 32px);
    }

    .column-items {
      max-height: 160px;
    }
  }
`;
