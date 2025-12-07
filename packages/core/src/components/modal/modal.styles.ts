export const modalStyles = `
  :host {
    display: none;
  }

  :host([open]) {
    display: block;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--modal-z-index, 1000);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--modal-overlay-padding, 16px);
    overflow-y: auto;
    animation: fadeIn var(--duration-base, 200ms) var(--ease-out);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    width: 100%;
    padding: var(--modal-container-padding, 16px 0);
  }

  .dialog {
    background: var(--modal-bg, var(--color-white));
    border-radius: var(--modal-border-radius, var(--radius-lg, 8px));
    box-shadow: var(--modal-shadow, var(--shadow-2xl));
    width: 100%;
    max-width: var(--modal-max-width, 600px);
    max-height: calc(100vh - 32px);
    display: flex;
    flex-direction: column;
    position: relative;
    animation: slideUp var(--duration-base, 200ms) var(--ease-out);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Sizes */
  :host([size="sm"]) .dialog {
    max-width: 400px;
  }

  :host([size="md"]) .dialog {
    max-width: 600px;
  }

  :host([size="lg"]) .dialog {
    max-width: 800px;
  }

  :host([size="xl"]) .dialog {
    max-width: 1200px;
  }

  :host([size="full"]) .dialog {
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
  }

  /* Variants */
  :host([variant="centered"]) .container {
    align-items: center;
  }

  :host([variant="fullscreen"]) .overlay {
    padding: 0;
  }

  :host([variant="fullscreen"]) .container {
    padding: 0;
  }

  :host([variant="fullscreen"]) .dialog {
    max-width: 100vw;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }

  .header {
    padding: var(--modal-header-padding, 20px 24px);
    border-bottom: 1px solid var(--modal-border-color, var(--color-gray-200));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .header-content {
    flex: 1;
    min-width: 0;
  }

  .body {
    padding: var(--modal-body-padding, 24px);
    overflow-y: auto;
    flex: 1;
    min-height: 0;
  }

  .footer {
    padding: var(--modal-footer-padding, 16px 24px);
    border-top: 1px solid var(--modal-border-color, var(--color-gray-200));
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .close-button {
    background: transparent;
    border: none;
    color: var(--modal-close-color, var(--color-gray-600));
    cursor: pointer;
    padding: 8px;
    border-radius: var(--radius-base, 4px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 1;
    transition: background-color var(--duration-fast, 150ms) var(--ease);
    flex-shrink: 0;
  }

  .close-button:hover {
    background: var(--modal-close-hover-bg, var(--color-gray-100));
  }

  .close-button:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  .header:empty {
    display: none;
  }

  .footer:empty {
    display: none;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .modal-overlay,
    .modal-content {
      animation: none;
      transition: none;
    }
  }

  /* Touch device optimization */
  @media (pointer: coarse) {
    /* Fullscreen on small touch devices for better UX */
    .dialog {
      max-width: 100vw;
      max-height: 100vh;
      border-radius: 0;
    }

    /* Increase padding for touch comfort */
    .header {
      padding: var(--spacing-4, 1rem) var(--spacing-4, 1rem);
    }

    .body {
      padding: var(--spacing-4, 1rem);
    }

    .footer {
      padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
    }

    /* Ensure close button meets touch target size */
    .close-button {
      min-width: var(--touch-target-minimum, 44px);
      min-height: var(--touch-target-minimum, 44px);
      padding: var(--spacing-2, 0.5rem);
    }

    /* Remove overlay padding to maximize screen space */
    .overlay {
      padding: 0;
    }

    .container {
      padding: 0;
    }
  }

  /* Hover effects only for devices that support hover */
  @media (hover: none) {
    .close-button:hover {
      background: transparent;
    }
  }

  /* Larger screens - restore dialog layout */
  @media (pointer: coarse) and (min-width: 768px) {
    .dialog {
      max-width: var(--modal-max-width, 600px);
      max-height: calc(100vh - 32px);
      border-radius: var(--modal-border-radius, var(--radius-lg, 8px));
    }

    .overlay {
      padding: var(--modal-overlay-padding, 16px);
    }

    .container {
      padding: var(--modal-container-padding, 16px 0);
    }

    :host([size="sm"]) .dialog {
      max-width: 400px;
    }

    :host([size="md"]) .dialog {
      max-width: 600px;
    }

    :host([size="lg"]) .dialog {
      max-width: 800px;
    }

    :host([size="xl"]) .dialog {
      max-width: 1200px;
    }

    :host([size="full"]) .dialog {
      max-width: calc(100vw - 32px);
      max-height: calc(100vh - 32px);
    }
  }
`;
