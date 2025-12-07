export const listStyles = `
  :host {
    display: block;
    --ha-list-border-color: var(--color-neutral-300);
    --ha-list-item-padding: var(--spacing-3);
    --ha-list-item-hover-bg: var(--foreground-inverse);
    --ha-list-item-active-bg: var(--primary-default);
    --ha-list-item-active-color: var(--primary-default);
  }

  .list {
    display: flex;
    flex-direction: column;
  }

  .list--bordered {
    border: 1px solid var(--ha-list-border-color);
    border-radius: var(--border-radius-base);
  }

  .list--divided .list-item:not(:last-child) {
    border-bottom: 1px solid var(--ha-list-border-color);
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: var(--ha-list-item-padding);
    color: var(--foreground-primary);
    transition: background-color var(--animation-duration-fast) ease;
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
    margin-right: var(--spacing-3);
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
    margin-left: var(--spacing-3);
  }

  .list-item__suffix:empty {
    display: none;
  }

  .list-divider {
    height: 1px;
    background-color: var(--ha-list-border-color);
    margin: var(--spacing-2) 0;
  }
`;
