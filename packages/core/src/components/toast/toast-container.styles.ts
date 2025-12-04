export const toastContainerStyles = `
  :host {
    display: block;
    position: fixed;
    z-index: var(--toast-container-z-index, 9999);
    pointer-events: none;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--toast-gap, 12px);
    padding: var(--toast-container-padding, 16px);
    pointer-events: auto;
  }

  /* Positions */
  :host([position="top-left"]) {
    top: 0;
    left: 0;
  }

  :host([position="top-center"]) {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position="top-right"]) {
    top: 0;
    right: 0;
  }

  :host([position="bottom-left"]) {
    bottom: 0;
    left: 0;
  }

  :host([position="bottom-center"]) {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position="bottom-right"]) {
    bottom: 0;
    right: 0;
  }

  /* Reverse order for bottom positions */
  :host([position^="bottom"]) .container {
    flex-direction: column-reverse;
  }
`;
