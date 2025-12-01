export const progressStyles = `
  :host {
    display: block;
    width: 100%;
  }

  .progress {
    width: 100%;
    background-color: var(--ha-color-neutral-200);
    border-radius: var(--ha-radius-full);
    overflow: hidden;
    position: relative;
  }

  /* Sizes */
  .progress--sm {
    height: 0.5rem;
  }

  .progress--md {
    height: 0.75rem;
  }

  .progress--lg {
    height: 1rem;
  }

  /* Progress bar */
  .progress__bar {
    height: 100%;
    background-color: var(--ha-color-primary-500);
    transition: width 0.3s ease;
    border-radius: var(--ha-radius-full);
    position: relative;
  }

  /* Color variants */
  .progress__bar--primary {
    background-color: var(--ha-color-primary-500);
  }

  .progress__bar--success {
    background-color: var(--ha-color-success-500);
  }

  .progress__bar--warning {
    background-color: var(--ha-color-warning-500);
  }

  .progress__bar--error {
    background-color: var(--ha-color-error-500);
  }

  .progress__bar--info {
    background-color: var(--ha-color-info-500);
  }

  /* Striped variant */
  .progress__bar--striped {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }

  /* Animated variant */
  .progress__bar--animated {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    animation: progress-stripes 1s linear infinite;
  }

  @keyframes progress-stripes {
    0% {
      background-position: 1rem 0;
    }
    100% {
      background-position: 0 0;
    }
  }

  /* Label */
  .progress__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--ha-spacing-2);
    font-size: var(--ha-font-size-sm);
    color: var(--ha-color-neutral-700);
  }

  .progress__percentage {
    font-weight: var(--ha-font-weight-semibold);
    color: var(--ha-color-neutral-900);
  }
`;
