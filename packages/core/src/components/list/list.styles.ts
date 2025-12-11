export const listStyles = `
  :host {
    display: block;
  }

  .list {
    background: var(--component-list-container-background, var(--background-primary));
    padding: var(--component-list-container-padding, 0);
    border-radius: var(--component-list-container-borderRadius, var(--border-radius-md, 0.375rem));
    display: flex;
    flex-direction: column;
    gap: var(--component-list-container-gap, 0);
  }

  /* Divided variant */
  .list--divided ::slotted(ha-list-item:not(:last-child)) {
    border-bottom: var(--component-list-divider-width, 1px) solid var(--component-list-divider-color, var(--border-default));
  }
`;

export const listItemStyles = `
  :host {
    display: block;
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: var(--component-list-icon-gap, 0.75rem);
    padding: var(--component-list-item-padding-vertical-default, 0.75rem) var(--component-list-item-padding-horizontal, 1rem);
    background: var(--component-list-item-background-default, transparent);
    color: var(--component-list-item-text-default, var(--foreground-primary));
    font-size: var(--component-list-item-text-fontSize, 1rem);
    line-height: var(--component-list-item-text-lineHeight, 1.5);
    border-radius: var(--component-list-item-border-radius, var(--border-radius-md, 0.375rem));
    transition: background-color var(--component-list-interactive-transition-duration, 150ms) var(--component-list-interactive-transition-timing, ease),
                color var(--component-list-interactive-transition-duration, 150ms) var(--component-list-interactive-transition-timing, ease);
    cursor: default;
    user-select: none;
  }

  .list-item__prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .list-item__prefix ::slotted(*) {
    width: var(--component-list-icon-size-default, 1.25rem);
    height: var(--component-list-icon-size-default, 1.25rem);
    color: var(--component-list-icon-color, var(--foreground-secondary));
  }

  .list-item__content {
    flex: 1;
    min-width: 0;
  }

  .list-item__suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Interactive state */
  :host([interactive]) .list-item {
    cursor: var(--component-list-interactive-cursor, pointer);
  }

  :host([interactive]:hover) .list-item {
    background: var(--component-list-item-background-hover, var(--background-secondary));
  }

  :host([interactive]:active) .list-item {
    background: var(--component-list-item-background-active, var(--background-tertiary));
  }

  /* Selected state */
  :host([selected]) .list-item {
    background: var(--component-list-item-background-selected, var(--primary-subtle));
    color: var(--component-list-item-text-selected, var(--primary-default));
  }

  /* Disabled state */
  :host([disabled]) .list-item {
    opacity: var(--component-list-disabled-opacity, 0.5);
    cursor: var(--component-list-disabled-cursor, not-allowed);
    pointer-events: none;
  }

  /* Focus state */
  :host(:focus-visible) .list-item {
    outline: var(--component-list-focus-ring-width, 2px) solid var(--component-list-focus-ring-color, var(--primary-default));
    outline-offset: var(--component-list-focus-ring-offset, 2px);
  }

  /* Density variants - set via CSS custom properties from parent */
  :host {
    --list-item-padding-vertical: var(--component-list-item-padding-vertical-default, 0.75rem);
  }

  .list-item {
    padding-top: var(--list-item-padding-vertical);
    padding-bottom: var(--list-item-padding-vertical);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .list-item {
      transition: none;
    }
  }
`;

export const listDividerStyles = `
  :host {
    display: block;
  }

  .list-divider {
    height: var(--component-list-divider-width, 1px);
    background: var(--component-list-divider-color, var(--border-default));
    margin: var(--spacing-2, 0.5rem) 0;
  }
`;
