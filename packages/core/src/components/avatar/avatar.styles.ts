export const avatarStyles = `
  :host {
    display: inline-block;
  }

  .container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--avatar-size, 40px);
    height: var(--avatar-size, 40px);
    background: var(--avatar-bg, var(--color-gray-200));
    color: var(--avatar-color, var(--color-gray-700));
    font-size: var(--avatar-font-size, 16px);
    font-weight: var(--avatar-font-weight, 500);
    border-radius: var(--avatar-radius, 50%);
    overflow: hidden;
    user-select: none;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .initials {
    text-transform: uppercase;
  }

  .icon {
    font-size: var(--avatar-icon-size, 20px);
  }

  .status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: var(--avatar-status-size, 12px);
    height: var(--avatar-status-size, 12px);
    border-radius: 50%;
    border: 2px solid var(--avatar-status-border, var(--color-white));
    background: var(--avatar-status-bg, var(--color-gray-400));
  }

  /* Sizes */
  :host([size="xs"]) .container {
    --avatar-size: 24px;
    --avatar-font-size: 10px;
    --avatar-icon-size: 12px;
    --avatar-status-size: 8px;
  }

  :host([size="sm"]) .container {
    --avatar-size: 32px;
    --avatar-font-size: 13px;
    --avatar-icon-size: 16px;
    --avatar-status-size: 10px;
  }

  :host([size="md"]) .container {
    --avatar-size: 40px;
    --avatar-font-size: 16px;
    --avatar-icon-size: 20px;
    --avatar-status-size: 12px;
  }

  :host([size="lg"]) .container {
    --avatar-size: 48px;
    --avatar-font-size: 19px;
    --avatar-icon-size: 24px;
    --avatar-status-size: 14px;
  }

  :host([size="xl"]) .container {
    --avatar-size: 64px;
    --avatar-font-size: 26px;
    --avatar-icon-size: 32px;
    --avatar-status-size: 16px;
  }

  :host([size="2xl"]) .container {
    --avatar-size: 96px;
    --avatar-font-size: 38px;
    --avatar-icon-size: 48px;
    --avatar-status-size: 20px;
  }

  /* Variants */
  :host([variant="square"]) .container {
    border-radius: 0;
  }

  :host([variant="rounded"]) .container {
    border-radius: var(--radius-lg, 8px);
  }

  :host([variant="circle"]) .container {
    border-radius: 50%;
  }

  /* Status colors */
  :host([status="online"]) .status {
    background: var(--color-success-500);
  }

  :host([status="offline"]) .status {
    background: var(--color-gray-400);
  }

  :host([status="away"]) .status {
    background: var(--color-warning-500);
  }

  :host([status="busy"]) .status {
    background: var(--color-error-500);
  }
`;
