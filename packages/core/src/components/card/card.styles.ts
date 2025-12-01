export const cardStyles = `
  :host {
    display: block;
    font-family: var(--ha-font-family-base);
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--ha-color-white, #ffffff);
    border-radius: var(--ha-border-radius-lg);
    overflow: hidden;
    transition: all var(--ha-transition-duration-normal) var(--ha-transition-timing-default);
  }

  /* Variants */
  .card--default {
    border: 1px solid var(--ha-color-neutral-200);
  }

  .card--outlined {
    border: 2px solid var(--ha-color-neutral-300);
  }

  .card--elevated {
    border: 1px solid var(--ha-color-neutral-100);
    box-shadow: var(--ha-shadow-md);
  }

  /* Hoverable */
  .card--hoverable:hover {
    transform: translateY(-2px);
  }

  .card--hoverable.card--default:hover {
    border-color: var(--ha-color-neutral-300);
    box-shadow: var(--ha-shadow-sm);
  }

  .card--hoverable.card--outlined:hover {
    border-color: var(--ha-color-neutral-400);
    box-shadow: var(--ha-shadow-sm);
  }

  .card--hoverable.card--elevated:hover {
    box-shadow: var(--ha-shadow-lg);
  }

  /* Clickable */
  .card--clickable {
    cursor: pointer;
  }

  .card--clickable:active {
    transform: translateY(0);
  }

  /* Media */
  .card__media {
    width: 100%;
    display: block;
  }

  .card__media:empty {
    display: none;
  }

  .card__media ::slotted(img),
  .card__media ::slotted(video) {
    width: 100%;
    height: auto;
    display: block;
  }

  /* Header */
  .card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--ha-spacing-3);
  }

  .card__header:empty {
    display: none;
  }

  /* Body */
  .card__body {
    flex: 1;
  }

  .card__body:empty {
    display: none;
  }

  /* Footer */
  .card__footer {
    display: flex;
    align-items: center;
    gap: var(--ha-spacing-3);
  }

  .card__footer:empty {
    display: none;
  }

  /* Padding variants */
  .card--padding-none .card__header,
  .card--padding-none .card__body,
  .card--padding-none .card__footer {
    padding: 0;
  }

  .card--padding-sm .card__header,
  .card--padding-sm .card__body,
  .card--padding-sm .card__footer {
    padding: var(--ha-spacing-3);
  }

  .card--padding-md .card__header,
  .card--padding-md .card__body,
  .card--padding-md .card__footer {
    padding: var(--ha-spacing-4);
  }

  .card--padding-lg .card__header,
  .card--padding-lg .card__body,
  .card--padding-lg .card__footer {
    padding: var(--ha-spacing-6);
  }

  /* Media doesn't have padding */
  .card__media {
    padding: 0 !important;
  }

  /* Adjust spacing between sections */
  .card__header:not(:empty) + .card__body:not(:empty) {
    padding-top: 0;
  }

  .card__body:not(:empty) + .card__footer:not(:empty) {
    padding-top: 0;
  }

  .card__media:not(:empty) + .card__header:not(:empty) {
    padding-top: var(--ha-spacing-4);
  }

  .card__media:not(:empty) + .card__body:not(:empty) {
    padding-top: var(--ha-spacing-4);
  }
`;
