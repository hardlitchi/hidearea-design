export const chipStyles = `
  :host {
    display: inline-flex;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--component-chip-icon-gap, 0.25rem);
    height: var(--component-chip-size-medium-height, 2rem);
    padding: 0 var(--component-chip-size-medium-padding-horizontal, 0.75rem);
    background: var(--component-chip-default-background-default, var(--background-tertiary));
    color: var(--component-chip-default-text, var(--foreground-primary));
    font-size: var(--component-chip-size-medium-fontSize, 0.875rem);
    font-weight: var(--component-chip-fontWeight, 500);
    line-height: var(--component-chip-lineHeight, 1.25);
    border: var(--component-chip-border-width, 1px) solid var(--component-chip-default-border-color, var(--border-default));
    border-radius: var(--component-chip-border-radius, 9999px);
    cursor: default;
    user-select: none;
    white-space: nowrap;
    transition: var(--component-chip-interactive-transition-properties, background-color, color, border-color) 
                var(--component-chip-interactive-transition-duration, 150ms) 
                var(--component-chip-interactive-transition-timing, ease);
  }

  .chip__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--component-chip-size-medium-iconSize, 1rem);
    height: var(--component-chip-size-medium-iconSize, 1rem);
    color: var(--component-chip-icon-color, currentColor);
  }

  .chip__text {
    flex: 1;
  }

  .chip__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--component-chip-close-size-medium, 1.25rem);
    height: var(--component-chip-close-size-medium, 1.25rem);
    margin-left: var(--component-chip-close-gap, 0.25rem);
    padding: var(--component-chip-close-padding, 0.25rem);
    background: transparent;
    border: none;
    border-radius: var(--component-chip-close-borderRadius, 50%);
    color: var(--component-chip-close-color-default, currentColor);
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .chip__close:hover {
    background: var(--component-chip-close-background-hover, rgba(0, 0, 0, 0.1));
    color: var(--component-chip-close-color-hover, var(--foreground-primary));
  }

  /* Sizes */
  :host([size="small"]) .chip {
    height: var(--component-chip-size-small-height, 1.5rem);
    padding: 0 var(--component-chip-size-small-padding-horizontal, 0.5rem);
    font-size: var(--component-chip-size-small-fontSize, 0.75rem);
  }

  :host([size="small"]) .chip__icon {
    width: var(--component-chip-size-small-iconSize, 0.875rem);
    height: var(--component-chip-size-small-iconSize, 0.875rem);
  }

  :host([size="small"]) .chip__close {
    width: var(--component-chip-close-size-small, 1rem);
    height: var(--component-chip-close-size-small, 1rem);
  }

  :host([size="large"]) .chip {
    height: var(--component-chip-size-large-height, 2.5rem);
    padding: 0 var(--component-chip-size-large-padding-horizontal, 1rem);
    font-size: var(--component-chip-size-large-fontSize, 1rem);
  }

  :host([size="large"]) .chip__icon {
    width: var(--component-chip-size-large-iconSize, 1.25rem);
    height: var(--component-chip-size-large-iconSize, 1.25rem);
  }

  :host([size="large"]) .chip__close {
    width: var(--component-chip-close-size-large, 1.5rem);
    height: var(--component-chip-close-size-large, 1.5rem);
  }

  /* Color variants */
  :host([color="primary"]) .chip {
    background: var(--component-chip-primary-background-default, var(--primary-subtle));
    color: var(--component-chip-primary-text-default, var(--primary-default));
    border-color: var(--component-chip-primary-border-color, var(--primary-default));
  }

  :host([color="primary"]:hover) .chip {
    background: var(--component-chip-primary-background-hover, var(--primary-default));
    color: var(--component-chip-primary-text-hover, var(--foreground-inverse));
  }

  :host([color="success"]) .chip {
    background: var(--component-chip-success-background-default, var(--success-subtle));
    color: var(--component-chip-success-text-default, var(--success-default));
  }

  :host([color="success"]:hover) .chip {
    background: var(--component-chip-success-background-hover, var(--success-default));
    color: var(--component-chip-success-text-hover, var(--foreground-inverse));
  }

  :host([color="warning"]) .chip {
    background: var(--component-chip-warning-background-default, var(--warning-subtle));
    color: var(--component-chip-warning-text-default, var(--warning-default));
  }

  :host([color="warning"]:hover) .chip {
    background: var(--component-chip-warning-background-hover, var(--warning-default));
    color: var(--component-chip-warning-text-hover, var(--foreground-inverse));
  }

  :host([color="error"]) .chip {
    background: var(--component-chip-error-background-default, var(--error-subtle));
    color: var(--component-chip-error-text-default, var(--error-default));
  }

  :host([color="error"]:hover) .chip {
    background: var(--component-chip-error-background-hover, var(--error-default));
    color: var(--component-chip-error-text-hover, var(--foreground-inverse));
  }

  :host([color="info"]) .chip {
    background: var(--component-chip-info-background-default, var(--info-subtle));
    color: var(--component-chip-info-text-default, var(--info-default));
  }

  :host([color="info"]:hover) .chip {
    background: var(--component-chip-info-background-hover, var(--info-default));
    color: var(--component-chip-info-text-hover, var(--foreground-inverse));
  }

  /* Interactive state */
  :host([interactive]) .chip {
    cursor: var(--component-chip-interactive-cursor, pointer);
  }

  /* Disabled state */
  :host([disabled]) .chip {
    opacity: var(--component-chip-disabled-opacity, 0.5);
    cursor: var(--component-chip-disabled-cursor, not-allowed);
    pointer-events: none;
  }

  /* Focus state */
  :host(:focus-visible) .chip {
    outline: var(--component-chip-focus-ring-width, 2px) solid var(--component-chip-focus-ring-color, var(--primary-default));
    outline-offset: var(--component-chip-focus-ring-offset, 2px);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .chip,
    .chip__close {
      transition: none;
    }
  }
`;
