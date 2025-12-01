export const tooltipStyles = `
  :host {
    display: inline-block;
    position: relative;
  }

  .tooltip-trigger {
    display: inline-block;
    cursor: help;
  }

  .tooltip-content {
    position: fixed;
    z-index: 9999;
    padding: var(--ha-spacing-2) var(--ha-spacing-3);
    border-radius: var(--ha-border-radius-base);
    font-size: var(--ha-font-size-sm);
    line-height: var(--ha-line-height-normal);
    white-space: normal;
    word-wrap: break-word;
    max-width: 300px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity var(--ha-transition-base), visibility var(--ha-transition-base);
  }

  .tooltip-content.visible {
    opacity: 1;
    visibility: visible;
  }

  /* Variants */
  .tooltip-content.variant-default {
    background-color: var(--ha-color-neutral-800);
    color: var(--ha-color-neutral-50);
    box-shadow: var(--ha-shadow-md);
  }

  .tooltip-content.variant-dark {
    background-color: var(--ha-color-neutral-900);
    color: var(--ha-color-neutral-50);
    box-shadow: var(--ha-shadow-lg);
  }

  .tooltip-content.variant-light {
    background-color: var(--ha-color-neutral-50);
    color: var(--ha-color-neutral-900);
    border: 1px solid var(--ha-color-neutral-200);
    box-shadow: var(--ha-shadow-md);
  }

  /* Sizes */
  .tooltip-content.size-sm {
    padding: var(--ha-spacing-1) var(--ha-spacing-2);
    font-size: var(--ha-font-size-xs);
    max-width: 200px;
  }

  .tooltip-content.size-md {
    padding: var(--ha-spacing-2) var(--ha-spacing-3);
    font-size: var(--ha-font-size-sm);
    max-width: 300px;
  }

  .tooltip-content.size-lg {
    padding: var(--ha-spacing-3) var(--ha-spacing-4);
    font-size: var(--ha-font-size-base);
    max-width: 400px;
  }

  /* Arrow */
  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  /* Arrow positioning and colors - Top */
  .tooltip-content[data-placement^="top"] .tooltip-arrow {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
  }

  .tooltip-content[data-placement^="top"].variant-default .tooltip-arrow {
    border-color: var(--ha-color-neutral-800) transparent transparent transparent;
  }

  .tooltip-content[data-placement^="top"].variant-dark .tooltip-arrow {
    border-color: var(--ha-color-neutral-900) transparent transparent transparent;
  }

  .tooltip-content[data-placement^="top"].variant-light .tooltip-arrow {
    border-color: var(--ha-color-neutral-50) transparent transparent transparent;
  }

  /* Arrow positioning and colors - Bottom */
  .tooltip-content[data-placement^="bottom"] .tooltip-arrow {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
  }

  .tooltip-content[data-placement^="bottom"].variant-default .tooltip-arrow {
    border-color: transparent transparent var(--ha-color-neutral-800) transparent;
  }

  .tooltip-content[data-placement^="bottom"].variant-dark .tooltip-arrow {
    border-color: transparent transparent var(--ha-color-neutral-900) transparent;
  }

  .tooltip-content[data-placement^="bottom"].variant-light .tooltip-arrow {
    border-color: transparent transparent var(--ha-color-neutral-50) transparent;
  }

  /* Arrow positioning and colors - Left */
  .tooltip-content[data-placement^="left"] .tooltip-arrow {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 0 6px 6px;
  }

  .tooltip-content[data-placement^="left"].variant-default .tooltip-arrow {
    border-color: transparent transparent transparent var(--ha-color-neutral-800);
  }

  .tooltip-content[data-placement^="left"].variant-dark .tooltip-arrow {
    border-color: transparent transparent transparent var(--ha-color-neutral-900);
  }

  .tooltip-content[data-placement^="left"].variant-light .tooltip-arrow {
    border-color: transparent transparent transparent var(--ha-color-neutral-50);
  }

  /* Arrow positioning and colors - Right */
  .tooltip-content[data-placement^="right"] .tooltip-arrow {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-width: 6px 6px 6px 0;
  }

  .tooltip-content[data-placement^="right"].variant-default .tooltip-arrow {
    border-color: transparent var(--ha-color-neutral-800) transparent transparent;
  }

  .tooltip-content[data-placement^="right"].variant-dark .tooltip-arrow {
    border-color: transparent var(--ha-color-neutral-900) transparent transparent;
  }

  .tooltip-content[data-placement^="right"].variant-light .tooltip-arrow {
    border-color: transparent var(--ha-color-neutral-50) transparent transparent;
  }

  /* Animation */
  @keyframes tooltip-fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .tooltip-content.visible {
    animation: tooltip-fade-in var(--ha-transition-base);
  }
`;
