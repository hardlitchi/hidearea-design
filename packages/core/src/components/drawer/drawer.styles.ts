export const drawerStyles = `
  :host {
    --drawer-width-sm: 256px;
    --drawer-width-md: 320px;
    --drawer-width-lg: 400px;
    --drawer-height-sm: 256px;
    --drawer-height-md: 320px;
    --drawer-height-lg: 400px;
    --drawer-bg: var(--foreground-inverse);
    --drawer-shadow: var(--shadow-lg);
    --drawer-z-index: 1000;
    --drawer-backdrop-bg: rgba(0, 0, 0, 0.5);
  }

  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--drawer-backdrop-bg);
    z-index: var(--drawer-z-index);
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--animation-duration-base) ease,
                visibility 0s linear var(--animation-duration-base);
  }

  .drawer-backdrop--show {
    opacity: 1;
    visibility: visible;
    transition: opacity var(--animation-duration-base) ease,
                visibility 0s linear 0s;
  }

  .drawer {
    position: fixed;
    background-color: var(--drawer-bg);
    box-shadow: var(--drawer-shadow);
    z-index: calc(var(--drawer-z-index) + 1);
    display: flex;
    flex-direction: column;
    transition: transform var(--animation-duration-slow) ease;
  }

  /* Placement: Left */
  .drawer--placement-left {
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
  }

  .drawer--placement-left.drawer--open {
    transform: translateX(0);
  }

  /* Placement: Right */
  .drawer--placement-right {
    top: 0;
    right: 0;
    height: 100%;
    transform: translateX(100%);
  }

  .drawer--placement-right.drawer--open {
    transform: translateX(0);
  }

  /* Placement: Top */
  .drawer--placement-top {
    top: 0;
    left: 0;
    width: 100%;
    transform: translateY(-100%);
  }

  .drawer--placement-top.drawer--open {
    transform: translateY(0);
  }

  /* Placement: Bottom */
  .drawer--placement-bottom {
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
  }

  .drawer--placement-bottom.drawer--open {
    transform: translateY(0);
  }

  /* Sizes for left/right placement */
  .drawer--placement-left.drawer--size-sm,
  .drawer--placement-right.drawer--size-sm {
    width: var(--drawer-width-sm);
  }

  .drawer--placement-left.drawer--size-md,
  .drawer--placement-right.drawer--size-md {
    width: var(--drawer-width-md);
  }

  .drawer--placement-left.drawer--size-lg,
  .drawer--placement-right.drawer--size-lg {
    width: var(--drawer-width-lg);
  }

  /* Sizes for top/bottom placement */
  .drawer--placement-top.drawer--size-sm,
  .drawer--placement-bottom.drawer--size-sm {
    height: var(--drawer-height-sm);
  }

  .drawer--placement-top.drawer--size-md,
  .drawer--placement-bottom.drawer--size-md {
    height: var(--drawer-height-md);
  }

  .drawer--placement-top.drawer--size-lg,
  .drawer--placement-bottom.drawer--size-lg {
    height: var(--drawer-height-lg);
  }

  .drawer__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-4);
    border-bottom: 1px solid var(--color-neutral-300);
  }

  .drawer__close {
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    color: var(--color-neutral-600);
    padding: var(--spacing-1);
    margin: calc(var(--spacing-1) * -1);
    transition: color var(--animation-duration-fast) ease;
  }

  .drawer__close:hover {
    color: var(--foreground-primary);
  }

  .drawer__body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-4);
  }

  .drawer__footer {
    padding: var(--spacing-4);
    border-top: 1px solid var(--color-neutral-300);
  }

  /* Hide empty slots */
  .drawer__header:not(:has(::slotted([slot="header"]))) {
    display: flex;
  }

  .drawer__footer:not(:has(::slotted([slot="footer"]))) {
    display: none;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .drawer__overlay,
    .drawer__panel {
      animation: none;
      transition: none;
    }
  }
`;
