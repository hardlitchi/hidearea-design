export const badgeStyles = `
  :host {
    display: inline-flex;
    font-family: var(--ha-font-family-base);
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--ha-spacing-1);
    font-weight: var(--ha-font-weight-medium);
    line-height: 1;
    border: 1px solid transparent;
    white-space: nowrap;
    vertical-align: middle;
    transition: all var(--ha-transition-duration-normal) var(--ha-transition-timing-default);
  }

  /* Sizes */
  .badge--sm {
    padding: 0.125rem 0.5rem;
    font-size: var(--ha-font-size-xs);
    border-radius: var(--ha-border-radius-sm);
    min-height: 1.25rem;
  }

  .badge--md {
    padding: 0.25rem 0.625rem;
    font-size: var(--ha-font-size-sm);
    border-radius: var(--ha-border-radius-md);
    min-height: 1.5rem;
  }

  .badge--lg {
    padding: 0.375rem 0.75rem;
    font-size: var(--ha-font-size-base);
    border-radius: var(--ha-border-radius-md);
    min-height: 1.75rem;
  }

  /* Pill shape */
  .badge--pill.badge--sm {
    border-radius: 0.625rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .badge--pill.badge--md {
    border-radius: 0.75rem;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
  }

  .badge--pill.badge--lg {
    border-radius: 0.875rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  /* Dot variant */
  .badge--dot {
    padding: 0;
    width: 0.5rem;
    height: 0.5rem;
    min-height: 0;
    border-radius: 50%;
  }

  .badge--dot.badge--sm {
    width: 0.375rem;
    height: 0.375rem;
  }

  .badge--dot.badge--md {
    width: 0.5rem;
    height: 0.5rem;
  }

  .badge--dot.badge--lg {
    width: 0.625rem;
    height: 0.625rem;
  }

  .badge--dot .badge__content,
  .badge--dot .badge__icon,
  .badge--dot .badge__remove {
    display: none;
  }

  /* Color Variants */
  .badge--primary {
    background-color: var(--ha-color-primary-500);
    color: white;
    border-color: var(--ha-color-primary-600);
  }

  .badge--secondary {
    background-color: var(--ha-color-neutral-500);
    color: white;
    border-color: var(--ha-color-neutral-600);
  }

  .badge--success {
    background-color: var(--ha-color-success-500);
    color: white;
    border-color: var(--ha-color-success-600);
  }

  .badge--warning {
    background-color: var(--ha-color-warning-500);
    color: white;
    border-color: var(--ha-color-warning-600);
  }

  .badge--error {
    background-color: var(--ha-color-error-500);
    color: white;
    border-color: var(--ha-color-error-600);
  }

  .badge--info {
    background-color: var(--ha-color-info-500);
    color: white;
    border-color: var(--ha-color-info-600);
  }

  /* Outlined variants */
  .badge--outlined.badge--primary {
    background-color: transparent;
    color: var(--ha-color-primary-700);
    border-color: var(--ha-color-primary-500);
  }

  .badge--outlined.badge--secondary {
    background-color: transparent;
    color: var(--ha-color-neutral-700);
    border-color: var(--ha-color-neutral-500);
  }

  .badge--outlined.badge--success {
    background-color: transparent;
    color: var(--ha-color-success-700);
    border-color: var(--ha-color-success-500);
  }

  .badge--outlined.badge--warning {
    background-color: transparent;
    color: var(--ha-color-warning-700);
    border-color: var(--ha-color-warning-500);
  }

  .badge--outlined.badge--error {
    background-color: transparent;
    color: var(--ha-color-error-700);
    border-color: var(--ha-color-error-500);
  }

  .badge--outlined.badge--info {
    background-color: transparent;
    color: var(--ha-color-info-700);
    border-color: var(--ha-color-info-500);
  }

  /* Soft variants */
  .badge--soft.badge--primary {
    background-color: var(--ha-color-primary-50);
    color: var(--ha-color-primary-700);
    border-color: var(--ha-color-primary-200);
  }

  .badge--soft.badge--secondary {
    background-color: var(--ha-color-neutral-50);
    color: var(--ha-color-neutral-700);
    border-color: var(--ha-color-neutral-200);
  }

  .badge--soft.badge--success {
    background-color: var(--ha-color-success-50);
    color: var(--ha-color-success-700);
    border-color: var(--ha-color-success-200);
  }

  .badge--soft.badge--warning {
    background-color: var(--ha-color-warning-50);
    color: var(--ha-color-warning-700);
    border-color: var(--ha-color-warning-200);
  }

  .badge--soft.badge--error {
    background-color: var(--ha-color-error-50);
    color: var(--ha-color-error-700);
    border-color: var(--ha-color-error-200);
  }

  .badge--soft.badge--info {
    background-color: var(--ha-color-info-50);
    color: var(--ha-color-info-700);
    border-color: var(--ha-color-info-200);
  }

  /* Icon */
  .badge__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .badge__icon svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

  .badge--sm .badge__icon svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  .badge--md .badge__icon svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .badge--lg .badge__icon svg {
    width: 1rem;
    height: 1rem;
  }

  /* Content */
  .badge__content {
    display: inline-flex;
    align-items: center;
  }

  /* Remove button */
  .badge__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: none;
    border: none;
    padding: 0;
    margin-left: var(--ha-spacing-1);
    cursor: pointer;
    color: currentColor;
    opacity: 0.7;
    transition: opacity var(--ha-transition-duration-normal) var(--ha-transition-timing-default);
  }

  .badge__remove:hover {
    opacity: 1;
  }

  .badge__remove:focus {
    outline: 2px solid currentColor;
    outline-offset: 1px;
    border-radius: var(--ha-border-radius-sm);
    opacity: 1;
  }

  .badge__remove svg {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }

  .badge--sm .badge__remove svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  .badge--md .badge__remove svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .badge--lg .badge__remove svg {
    width: 1rem;
    height: 1rem;
  }
`;
