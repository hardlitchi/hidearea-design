/**
 * Base styles for all components
 * Imports CSS variables from @hidearea-design/tokens
 *
 * IMPORTANT: CSS variables are inherited in Shadow DOM automatically.
 * We don't need to redeclare them - they're available from the host document.
 *
 * The two-tier CSS variable system in tokens package ensures:
 * 1. :root defines semantic tokens like --background-primary
 * 2. [data-theme] defines theme-specific values like --theme-background-primary  
 * 3. Semantic tokens reference theme tokens: --background-primary: var(--theme-background-primary, fallback)
 * 4. When data-theme changes on :root, theme tokens change automatically
 * 5. Shadow DOM components inherit the computed values from the host document
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
