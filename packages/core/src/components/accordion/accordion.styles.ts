export const accordionStyles = `
  :host {
    display: block;
    --ha-accordion-border-color: var(--ha-color-neutral-3);
    --ha-accordion-item-padding: var(--ha-spacing-4);
    --ha-accordion-header-bg: var(--ha-color-neutral-1);
    --ha-accordion-header-hover-bg: var(--ha-color-neutral-2);
  }

  .accordion {
    border: 1px solid var(--ha-accordion-border-color);
    border-radius: var(--ha-border-radius-base);
    overflow: hidden;
  }

  .accordion-item {
    border-bottom: 1px solid var(--ha-accordion-border-color);
  }

  .accordion-item:last-child {
    border-bottom: none;
  }

  .accordion-item__header {
    width: 100%;
    padding: var(--ha-accordion-item-padding);
    background-color: var(--ha-accordion-header-bg);
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: var(--ha-font-size-base);
    font-weight: var(--ha-font-weight-medium);
    color: var(--ha-color-neutral-9);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color var(--ha-transition-duration-base) var(--ha-transition-timing-ease);
  }

  .accordion-item__header:hover:not(:disabled) {
    background-color: var(--ha-accordion-header-hover-bg);
  }

  .accordion-item__header:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .accordion-item__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    margin-left: var(--ha-spacing-2);
    transition: transform var(--ha-transition-duration-base) var(--ha-transition-timing-ease);
    font-size: 0.75em;
  }

  .accordion-item--open .accordion-item__icon {
    transform: rotate(180deg);
  }

  .accordion-item__content {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--ha-transition-duration-slow) var(--ha-transition-timing-ease);
  }

  .accordion-item__content > ::slotted(*) {
    padding: var(--ha-accordion-item-padding);
    display: block;
  }

  .accordion-item--disabled {
    opacity: 0.5;
  }
`;
