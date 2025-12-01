export const tabsStyles = `
  :host {
    display: block;
  }

  .tabs-container {
    display: flex;
    flex-direction: column;
    gap: var(--ha-spacing-4);
  }

  .tabs-list {
    display: flex;
    gap: var(--ha-spacing-2);
    border-bottom: 2px solid var(--ha-color-neutral-200);
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .tabs-list::-webkit-scrollbar {
    height: 4px;
  }

  .tabs-list::-webkit-scrollbar-thumb {
    background-color: var(--ha-color-neutral-300);
    border-radius: var(--ha-border-radius-full);
  }

  /* Variants */
  .tabs-list.variant-default {
    border-bottom: 2px solid var(--ha-color-neutral-200);
  }

  .tabs-list.variant-outlined {
    border: 1px solid var(--ha-color-neutral-200);
    border-radius: var(--ha-border-radius-base);
    padding: var(--ha-spacing-1);
    border-bottom-width: 1px;
  }

  .tabs-list.variant-pills {
    border-bottom: none;
    padding: var(--ha-spacing-1);
    background-color: var(--ha-color-neutral-100);
    border-radius: var(--ha-border-radius-base);
  }

  /* Alignment */
  .tabs-list.align-start {
    justify-content: flex-start;
  }

  .tabs-list.align-center {
    justify-content: center;
  }

  .tabs-list.align-end {
    justify-content: flex-end;
  }

  /* Tab panels */
  .tabs-panels {
    display: block;
  }

  ::slotted(ha-tab-item) {
    flex-shrink: 0;
  }
`;

export const tabItemStyles = `
  :host {
    display: inline-flex;
  }

  .tab-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ha-spacing-2);
    padding: var(--ha-spacing-2) var(--ha-spacing-4);
    border: none;
    background: transparent;
    color: var(--ha-color-neutral-600);
    font-size: var(--ha-font-size-base);
    font-weight: var(--ha-font-weight-medium);
    cursor: pointer;
    transition: all var(--ha-transition-base);
    white-space: nowrap;
    position: relative;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
  }

  .tab-item:hover:not(:disabled) {
    color: var(--ha-color-primary-600);
    background-color: var(--ha-color-primary-50);
  }

  .tab-item:focus-visible {
    outline: 2px solid var(--ha-color-primary-500);
    outline-offset: 2px;
    border-radius: var(--ha-border-radius-sm);
  }

  .tab-item.active {
    color: var(--ha-color-primary-600);
    border-bottom-color: var(--ha-color-primary-600);
  }

  .tab-item:disabled {
    color: var(--ha-color-neutral-400);
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Sizes */
  .tab-item.size-sm {
    padding: var(--ha-spacing-1) var(--ha-spacing-3);
    font-size: var(--ha-font-size-sm);
  }

  .tab-item.size-md {
    padding: var(--ha-spacing-2) var(--ha-spacing-4);
    font-size: var(--ha-font-size-base);
  }

  .tab-item.size-lg {
    padding: var(--ha-spacing-3) var(--ha-spacing-5);
    font-size: var(--ha-font-size-lg);
  }

  /* Variant: Outlined */
  :host([variant="outlined"]) .tab-item {
    border: 1px solid transparent;
    border-radius: var(--ha-border-radius-base);
    margin-bottom: 0;
  }

  :host([variant="outlined"]) .tab-item.active {
    border-color: var(--ha-color-primary-500);
    background-color: var(--ha-color-primary-50);
    border-bottom-color: var(--ha-color-primary-500);
  }

  /* Variant: Pills */
  :host([variant="pills"]) .tab-item {
    border-radius: var(--ha-border-radius-full);
    margin-bottom: 0;
    border-bottom: none;
  }

  :host([variant="pills"]) .tab-item.active {
    background-color: var(--ha-color-primary-600);
    color: white;
    border-bottom-color: transparent;
  }

  :host([variant="pills"]) .tab-item:hover:not(:disabled):not(.active) {
    background-color: var(--ha-color-neutral-200);
    color: var(--ha-color-neutral-700);
  }
`;

export const tabPanelStyles = `
  :host {
    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    animation: fadeIn var(--ha-transition-base);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
