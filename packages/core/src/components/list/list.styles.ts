export const listStyles = `
  :host {
    display: block;
    --ha-list-border-color: var(--ha-color-neutral-3);
    --ha-list-item-padding: var(--ha-spacing-3);
    --ha-list-item-hover-bg: var(--ha-color-neutral-1);
    --ha-list-item-active-bg: var(--ha-color-primary-1);
    --ha-list-item-active-color: var(--ha-color-primary-6);
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .list--bordered {
    border: 1px solid var(--ha-list-border-color);
    border-radius: var(--ha-border-radius-base);
  }

  .list--divided .list-item:not(:last-child) {
    border-bottom: 1px solid var(--ha-list-border-color);
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: var(--ha-list-item-padding);
    color: var(--ha-color-neutral-9);
    transition: background-color var(--ha-transition-duration-fast) var(--ha-transition-timing-ease);
  }

  .list--hoverable .list-item:not(.list-item--disabled):hover {
    background-color: var(--ha-list-item-hover-bg);
    cursor: pointer;
  }

  .list-item--active {
    background-color: var(--ha-list-item-active-bg);
    color: var(--ha-list-item-active-color);
  }

  .list-item--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .list-item__prefix {
    display: flex;
    align-items: center;
    margin-right: var(--ha-spacing-3);
  }

  .list-item__prefix:empty {
    display: none;
  }

  .list-item__content {
    flex: 1;
    min-width: 0;
  }

  .list-item__suffix {
    display: flex;
    align-items: center;
    margin-left: var(--ha-spacing-3);
  }

  .list-item__suffix:empty {
    display: none;
  }

  .list-divider {
    height: 1px;
    background-color: var(--ha-list-border-color);
    margin: var(--ha-spacing-2) 0;
  }
`;
