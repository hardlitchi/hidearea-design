export const skeletonStyles = `
  :host {
    display: block;
  }

  .skeleton {
    background: var(--ha-skeleton-bg, var(--ha-color-neutral-200, #e5e7eb));
    border-radius: var(--ha-skeleton-border-radius, var(--ha-border-radius-base, 0.25rem));
    position: relative;
    overflow: hidden;
  }

  .skeleton--pulse {
    animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .skeleton--wave::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      var(--ha-skeleton-wave-color, rgba(255, 255, 255, 0.4)),
      transparent
    );
    animation: skeleton-wave 2s linear infinite;
  }

  /* Variants */
  .skeleton--text {
    height: 1em;
    margin-bottom: 0.5em;
  }

  .skeleton--text:last-child {
    width: 80%;
    margin-bottom: 0;
  }

  .skeleton--circular {
    border-radius: 50%;
  }

  .skeleton--rectangular {
    border-radius: 0;
  }

  /* Animations */
  @keyframes skeleton-pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  @keyframes skeleton-wave {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(200%);
    }
  }
`;
