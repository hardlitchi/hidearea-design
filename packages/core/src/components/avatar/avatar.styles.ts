export const avatarStyles = `
  :host {
    display: inline-block;
  }

  .container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--component-avatar-size-md, 2.5rem);
    height: var(--component-avatar-size-md, 2.5rem);
    background: var(--component-avatar-background-default, var(--background-tertiary));
    color: var(--component-avatar-text-default, var(--foreground-secondary));
    font-size: var(--component-avatar-fontSize-md, 0.875rem);
    font-weight: var(--font-weight-medium, 500);
    border-radius: var(--component-avatar-borderRadius-circle, 50%);
    border: var(--component-avatar-border-width, 2px) solid var(--component-avatar-border-color, var(--border-default));
    overflow: hidden;
    user-select: none;
    transition: opacity var(--component-avatar-hover-transition-duration, 150ms) ease,
                transform var(--component-avatar-hover-transition-duration, 150ms) ease;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    text-transform: uppercase;
    font-size: inherit;
  }

  .icon {
    width: var(--component-avatar-icon-size-md, 1.25rem);
    height: var(--component-avatar-icon-size-md, 1.25rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .status {
    position: absolute;
    bottom: var(--component-avatar-status-position, 0);
    right: var(--component-avatar-status-position, 0);
    width: var(--component-avatar-status-size-md, 0.625rem);
    height: var(--component-avatar-status-size-md, 0.625rem);
    border-radius: var(--component-avatar-status-borderRadius, 50%);
    border: var(--component-avatar-status-border-width, 2px) solid var(--component-avatar-status-border-color, var(--background-primary));
    background: var(--component-avatar-status-background-offline, var(--foreground-tertiary));
  }

  /* Sizes */
  :host([size="xs"]) .container {
    width: var(--component-avatar-size-xs, 1.5rem);
    height: var(--component-avatar-size-xs, 1.5rem);
    font-size: var(--component-avatar-fontSize-xs, 0.625rem);
  }

  :host([size="xs"]) .icon {
    width: var(--component-avatar-icon-size-xs, 0.875rem);
    height: var(--component-avatar-icon-size-xs, 0.875rem);
  }

  :host([size="xs"]) .status {
    width: var(--component-avatar-status-size-xs, 0.375rem);
    height: var(--component-avatar-status-size-xs, 0.375rem);
  }

  :host([size="sm"]) .container {
    width: var(--component-avatar-size-sm, 2rem);
    height: var(--component-avatar-size-sm, 2rem);
    font-size: var(--component-avatar-fontSize-sm, 0.75rem);
  }

  :host([size="sm"]) .icon {
    width: var(--component-avatar-icon-size-sm, 1rem);
    height: var(--component-avatar-icon-size-sm, 1rem);
  }

  :host([size="sm"]) .status {
    width: var(--component-avatar-status-size-sm, 0.5rem);
    height: var(--component-avatar-status-size-sm, 0.5rem);
  }

  :host([size="md"]) .container {
    width: var(--component-avatar-size-md, 2.5rem);
    height: var(--component-avatar-size-md, 2.5rem);
    font-size: var(--component-avatar-fontSize-md, 0.875rem);
  }

  :host([size="md"]) .icon {
    width: var(--component-avatar-icon-size-md, 1.25rem);
    height: var(--component-avatar-icon-size-md, 1.25rem);
  }

  :host([size="md"]) .status {
    width: var(--component-avatar-status-size-md, 0.625rem);
    height: var(--component-avatar-status-size-md, 0.625rem);
  }

  :host([size="lg"]) .container {
    width: var(--component-avatar-size-lg, 3rem);
    height: var(--component-avatar-size-lg, 3rem);
    font-size: var(--component-avatar-fontSize-lg, 1rem);
  }

  :host([size="lg"]) .icon {
    width: var(--component-avatar-icon-size-lg, 1.5rem);
    height: var(--component-avatar-icon-size-lg, 1.5rem);
  }

  :host([size="lg"]) .status {
    width: var(--component-avatar-status-size-lg, 0.75rem);
    height: var(--component-avatar-status-size-lg, 0.75rem);
  }

  :host([size="xl"]) .container {
    width: var(--component-avatar-size-xl, 4rem);
    height: var(--component-avatar-size-xl, 4rem);
    font-size: var(--component-avatar-fontSize-xl, 1.25rem);
  }

  :host([size="xl"]) .icon {
    width: var(--component-avatar-icon-size-xl, 2rem);
    height: var(--component-avatar-icon-size-xl, 2rem);
  }

  :host([size="xl"]) .status {
    width: var(--component-avatar-status-size-xl, 1rem);
    height: var(--component-avatar-status-size-xl, 1rem);
  }

  :host([size="2xl"]) .container {
    width: var(--component-avatar-size-2xl, 6rem);
    height: var(--component-avatar-size-2xl, 6rem);
    font-size: var(--component-avatar-fontSize-2xl, 2rem);
  }

  :host([size="2xl"]) .icon {
    width: var(--component-avatar-icon-size-2xl, 3rem);
    height: var(--component-avatar-icon-size-2xl, 3rem);
  }

  :host([size="2xl"]) .status {
    width: var(--component-avatar-status-size-2xl, 1.5rem);
    height: var(--component-avatar-status-size-2xl, 1.5rem);
  }

  /* Shapes (backward compatible with variant) */
  :host([shape="square"]) .container,
  :host([variant="square"]) .container {
    border-radius: var(--component-avatar-borderRadius-square, var(--border-radius-sm, 0.25rem));
  }

  :host([shape="rounded"]) .container,
  :host([variant="rounded"]) .container {
    border-radius: var(--component-avatar-borderRadius-rounded, var(--border-radius-lg, 0.5rem));
  }

  :host([shape="circle"]) .container,
  :host([variant="circle"]) .container {
    border-radius: var(--component-avatar-borderRadius-circle, 50%);
  }

  /* Color variants (for initials/icons) */
  :host([color="default"]) .container {
    background: var(--component-avatar-background-default, var(--background-tertiary));
    color: var(--component-avatar-text-default, var(--foreground-secondary));
  }

  :host([color="primary"]) .container {
    background: var(--component-avatar-background-primary, var(--primary-default));
    color: var(--component-avatar-text-onColor, var(--foreground-inverse));
  }

  :host([color="success"]) .container {
    background: var(--component-avatar-background-success, var(--success-default));
    color: var(--component-avatar-text-onColor, var(--foreground-inverse));
  }

  :host([color="warning"]) .container {
    background: var(--component-avatar-background-warning, var(--warning-default));
    color: var(--component-avatar-text-onColor, var(--foreground-inverse));
  }

  :host([color="error"]) .container {
    background: var(--component-avatar-background-error, var(--error-default));
    color: var(--component-avatar-text-onColor, var(--foreground-inverse));
  }

  :host([color="info"]) .container {
    background: var(--component-avatar-background-info, var(--info-default));
    color: var(--component-avatar-text-onColor, var(--foreground-inverse));
  }

  /* Status colors */
  :host([status="online"]) .status {
    background: var(--component-avatar-status-background-online, var(--success-default));
  }

  :host([status="offline"]) .status {
    background: var(--component-avatar-status-background-offline, var(--foreground-tertiary));
  }

  :host([status="away"]) .status {
    background: var(--component-avatar-status-background-away, var(--warning-default));
  }

  :host([status="busy"]) .status {
    background: var(--component-avatar-status-background-busy, var(--error-default));
  }

  /* Interactive state */
  :host([interactive]) .container {
    cursor: pointer;
    box-shadow: var(--component-avatar-shadow-default, 0 1px 3px 0 rgba(0, 0, 0, 0.1));
  }

  :host([interactive]:hover) .container {
    opacity: var(--component-avatar-hover-opacity, 0.8);
    transform: scale(var(--component-avatar-hover-scale, 1.05));
    box-shadow: var(--component-avatar-shadow-hover, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  }

  :host([interactive]:active) .container {
    transform: scale(0.95);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .container {
      transition: none;
    }

    :host([interactive]:hover) .container {
      transform: none;
    }

    :host([interactive]:active) .container {
      transform: none;
    }
  }
`;
