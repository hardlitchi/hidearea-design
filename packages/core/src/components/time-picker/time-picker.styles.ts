export const styles = `
  :host {
    display: inline-block;
    width: var(--ha-time-picker-width, 280px);
    font-family: var(--ha-font-family, system-ui, -apple-system, sans-serif);
    font-size: var(--ha-font-size-base, 14px);
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
    margin-bottom: var(--ha-spacing-1, 4px);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--ha-color-text, #1f2937);
    font-size: var(--ha-font-size-sm, 13px);
  }

  /* Input Wrapper */
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ha-spacing-2, 8px);
    height: var(--ha-time-picker-input-height, 40px);
    padding: var(--ha-time-picker-input-padding, var(--ha-spacing-2, 8px));
    background: var(--ha-time-picker-input-bg, var(--ha-color-background, #ffffff));
    border: var(--ha-time-picker-input-border, 1px solid var(--ha-color-border, #d1d5db));
    border-radius: var(--ha-time-picker-border-radius, var(--ha-border-radius, 6px));
    cursor: pointer;
    transition: all 0.2s;
  }

  .input-wrapper:hover {
    border-color: var(--ha-color-primary, #3b82f6);
  }

  .input-wrapper:focus-within {
    outline: 2px solid var(--ha-color-primary-200, #bfdbfe);
    outline-offset: 2px;
  }

  .container.disabled .input-wrapper {
    background: var(--ha-color-background-disabled, #f3f4f6);
    border-color: var(--ha-color-border-disabled, #e5e7eb);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .container.error .input-wrapper {
    border-color: var(--ha-time-picker-error-border, var(--ha-color-error, #ef4444));
  }

  .container.readonly .input-wrapper {
    background: var(--ha-color-background-readonly, #f9fafb);
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
    color: var(--ha-time-picker-input-color, var(--ha-color-text, #1f2937));
    font-size: inherit;
    font-family: inherit;
    outline: none;
    cursor: pointer;
  }

  .input::placeholder {
    color: var(--ha-color-text-placeholder, #9ca3af);
  }

  .container.disabled .input {
    cursor: not-allowed;
  }

  /* Toggle */
  .toggle {
    font-size: 12px;
    color: var(--ha-color-text-secondary, #6b7280);
    flex-shrink: 0;
    transition: transform 0.2s;
  }

  /* Panel */
  .panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    width: var(--ha-time-picker-panel-width, 280px);
    max-height: var(--ha-time-picker-panel-max-height, 300px);
    background: var(--ha-time-picker-panel-bg, var(--ha-color-surface, #ffffff));
    border: 1px solid var(--ha-color-border, #d1d5db);
    border-radius: var(--ha-time-picker-border-radius, var(--ha-border-radius, 6px));
    box-shadow: var(--ha-time-picker-panel-shadow, var(--ha-shadow-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1)));
    overflow: hidden;
  }

  .container.inline .panel {
    position: static;
    box-shadow: none;
  }

  /* Columns */
  .columns {
    display: flex;
    border-bottom: 1px solid var(--ha-color-border, #d1d5db);
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .column:not(:last-child) {
    border-right: 1px solid var(--ha-color-border, #d1d5db);
  }

  .period-column {
    flex: 0.8;
  }

  /* Column Header */
  .column-header {
    padding: var(--ha-spacing-2, 8px);
    text-align: center;
    font-weight: var(--ha-font-weight-medium, 500);
    font-size: var(--ha-font-size-xs, 12px);
    color: var(--ha-color-text-secondary, #6b7280);
    background: var(--ha-color-background, #f9fafb);
    border-bottom: 1px solid var(--ha-color-border, #d1d5db);
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
    background: var(--ha-color-background, #f9fafb);
  }

  .column-items::-webkit-scrollbar-thumb {
    background: var(--ha-color-border, #d1d5db);
    border-radius: 3px;
  }

  .column-items::-webkit-scrollbar-thumb:hover {
    background: var(--ha-color-text-secondary, #6b7280);
  }

  /* Item */
  .item {
    padding: var(--ha-time-picker-item-padding, var(--ha-spacing-2, 8px));
    text-align: center;
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
    user-select: none;
  }

  .item:hover:not(.disabled) {
    background: var(--ha-time-picker-item-hover-bg, var(--ha-color-primary-50, #eff6ff));
  }

  .item.selected {
    background: var(--ha-time-picker-item-selected-bg, var(--ha-color-primary, #3b82f6));
    color: var(--ha-time-picker-item-selected-color, var(--ha-color-primary-contrast, #ffffff));
    font-weight: var(--ha-font-weight-medium, 500);
  }

  .item.disabled {
    color: var(--ha-time-picker-item-disabled-color, var(--ha-color-text-disabled, #d1d5db));
    background: var(--ha-time-picker-item-disabled-bg, transparent);
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Period Toggle */
  .period-toggle {
    display: flex;
    flex-direction: column;
    padding: var(--ha-spacing-2, 8px);
    gap: var(--ha-spacing-1, 4px);
  }

  .period-button {
    padding: var(--ha-spacing-2, 8px);
    border: 1px solid var(--ha-color-border, #d1d5db);
    border-radius: var(--ha-border-radius-sm, 4px);
    background: var(--ha-color-background, #ffffff);
    color: var(--ha-color-text, #1f2937);
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: all 0.15s;
  }

  .period-button:hover {
    background: var(--ha-color-primary-50, #eff6ff);
    border-color: var(--ha-color-primary, #3b82f6);
  }

  .period-button.active {
    background: var(--ha-color-primary, #3b82f6);
    color: var(--ha-color-primary-contrast, #ffffff);
    border-color: var(--ha-color-primary, #3b82f6);
    font-weight: var(--ha-font-weight-medium, 500);
  }

  /* Actions */
  .actions {
    display: flex;
    gap: var(--ha-spacing-2, 8px);
    padding: var(--ha-spacing-2, 8px);
    border-top: 1px solid var(--ha-color-border, #d1d5db);
  }

  .now-button,
  .clear-button {
    flex: 1;
    padding: var(--ha-spacing-2, 8px);
    border: 1px solid var(--ha-color-border, #d1d5db);
    border-radius: var(--ha-border-radius-sm, 4px);
    background: var(--ha-color-background, #ffffff);
    color: var(--ha-color-text, #1f2937);
    font-family: inherit;
    font-size: var(--ha-font-size-sm, 13px);
    cursor: pointer;
    transition: all 0.15s;
  }

  .now-button:hover,
  .clear-button:hover {
    background: var(--ha-color-primary-50, #eff6ff);
    border-color: var(--ha-color-primary, #3b82f6);
    color: var(--ha-color-primary, #3b82f6);
  }

  .now-button:active,
  .clear-button:active {
    transform: scale(0.98);
  }

  /* Helper Text */
  .helper-text {
    margin-top: var(--ha-spacing-1, 4px);
    font-size: var(--ha-font-size-xs, 12px);
    color: var(--ha-color-text-secondary, #6b7280);
  }

  /* Error Text */
  .error-text {
    margin-top: var(--ha-spacing-1, 4px);
    font-size: var(--ha-font-size-xs, 12px);
    color: var(--ha-time-picker-error-color, var(--ha-color-error, #ef4444));
  }

  /* Disabled State */
  .container.disabled label {
    color: var(--ha-color-text-disabled, #9ca3af);
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
