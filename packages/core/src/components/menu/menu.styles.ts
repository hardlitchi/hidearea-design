export const dropdownStyles = `
  :host {
    display: inline-block;
    position: relative;
  }

  .trigger {
    display: inline-block;
  }

  .menu-container {
    position: fixed;
    z-index: 9999;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--ha-transition-base), visibility var(--ha-transition-base);
  }

  .menu-container.open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  @keyframes menu-fade-in {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .menu-container.open {
    animation: menu-fade-in var(--ha-transition-base);
  }
`;

export const menuStyles = `
  :host {
    display: block;
  }

  .menu {
    background: white;
    border: 1px solid var(--ha-color-neutral-200);
    border-radius: var(--ha-border-radius-base);
    box-shadow: var(--ha-shadow-lg);
    padding: var(--ha-spacing-1) 0;
    min-width: 200px;
    max-width: 320px;
  }

  /* Sizes */
  .menu.size-sm {
    min-width: 160px;
    font-size: var(--ha-font-size-sm);
  }

  .menu.size-md {
    min-width: 200px;
    font-size: var(--ha-font-size-base);
  }

  .menu.size-lg {
    min-width: 240px;
    font-size: var(--ha-font-size-base);
  }
`;

export const menuItemStyles = `
  :host {
    display: block;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: var(--ha-spacing-2);
    padding: var(--ha-spacing-2) var(--ha-spacing-4);
    color: var(--ha-color-neutral-700);
    cursor: pointer;
    transition: all var(--ha-transition-base);
    text-decoration: none;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    font-size: inherit;
    font-family: inherit;
  }

  .menu-item:hover:not(:disabled) {
    background-color: var(--ha-color-primary-50);
    color: var(--ha-color-primary-700);
  }

  .menu-item:focus-visible {
    outline: 2px solid var(--ha-color-primary-500);
    outline-offset: -2px;
    background-color: var(--ha-color-primary-50);
    color: var(--ha-color-primary-700);
  }

  .menu-item:disabled {
    color: var(--ha-color-neutral-400);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .menu-item.danger {
    color: var(--ha-color-error-600);
  }

  .menu-item.danger:hover:not(:disabled) {
    background-color: var(--ha-color-error-50);
    color: var(--ha-color-error-700);
  }

  .icon-slot {
    display: inline-flex;
    flex-shrink: 0;
  }

  .content {
    flex: 1;
  }

  /* Sizes */
  :host([size="sm"]) .menu-item {
    padding: var(--ha-spacing-1) var(--ha-spacing-3);
    font-size: var(--ha-font-size-sm);
  }

  :host([size="lg"]) .menu-item {
    padding: var(--ha-spacing-3) var(--ha-spacing-5);
    font-size: var(--ha-font-size-base);
  }
`;

export const menuDividerStyles = `
  :host {
    display: block;
  }

  .divider {
    height: 1px;
    background-color: var(--ha-color-neutral-200);
    margin: var(--ha-spacing-1) 0;
  }
`;
