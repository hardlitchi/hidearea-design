/**
 * Base styles for all components
 * Imports CSS variables from @hidearea-design/tokens
 */

export const baseStyles = `
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
`;
