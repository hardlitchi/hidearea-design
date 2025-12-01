export const breadcrumbStyles = `
  :host {
    display: block;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--ha-spacing-2);
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Sizes */
  .breadcrumb.size-sm {
    font-size: var(--ha-font-size-sm);
    gap: var(--ha-spacing-1);
  }

  .breadcrumb.size-md {
    font-size: var(--ha-font-size-base);
    gap: var(--ha-spacing-2);
  }

  .breadcrumb.size-lg {
    font-size: var(--ha-font-size-lg);
    gap: var(--ha-spacing-3);
  }

  ::slotted(ha-breadcrumb-item:not(:last-child))::after {
    content: '';
  }
`;

export const breadcrumbItemStyles = `
  :host {
    display: inline-flex;
    align-items: center;
    gap: var(--ha-spacing-2);
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    gap: var(--ha-spacing-2);
    color: var(--ha-color-neutral-600);
    text-decoration: none;
    transition: color var(--ha-transition-base);
  }

  .breadcrumb-item:hover:not(.current) {
    color: var(--ha-color-primary-600);
  }

  .breadcrumb-item.current {
    color: var(--ha-color-neutral-900);
    font-weight: var(--ha-font-weight-medium);
    cursor: default;
  }

  a.breadcrumb-item {
    cursor: pointer;
  }

  a.breadcrumb-item:focus-visible {
    outline: 2px solid var(--ha-color-primary-500);
    outline-offset: 2px;
    border-radius: var(--ha-border-radius-sm);
  }

  .separator {
    display: inline-flex;
    align-items: center;
    color: var(--ha-color-neutral-400);
    user-select: none;
  }

  /* Separator types */
  .separator.separator-slash::before {
    content: '/';
  }

  .separator.separator-chevron::before {
    content: '›';
    font-size: 1.2em;
  }

  .separator.separator-arrow::before {
    content: '→';
  }

  .separator.separator-dot::before {
    content: '•';
  }

  :host(:last-child) .separator {
    display: none;
  }
`;
