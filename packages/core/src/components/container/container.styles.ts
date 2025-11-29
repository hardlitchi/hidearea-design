export const containerStyles = `
  :host {
    display: block;
  }

  [part="container"] {
    width: 100%;
    box-sizing: border-box;
  }

  /* Max Width */
  :host([max-width="sm"]) [part="container"] {
    max-width: var(--breakpoint-sm, 640px);
  }

  :host([max-width="md"]) [part="container"] {
    max-width: var(--breakpoint-md, 768px);
  }

  :host([max-width="lg"]) [part="container"] {
    max-width: var(--breakpoint-lg, 1024px);
  }

  :host([max-width="xl"]) [part="container"] {
    max-width: var(--breakpoint-xl, 1280px);
  }

  :host([max-width="2xl"]) [part="container"] {
    max-width: var(--breakpoint-2xl, 1536px);
  }

  :host([max-width="full"]) [part="container"] {
    max-width: 100%;
  }

  /* Centered */
  :host([centered]) [part="container"] {
    margin-left: auto;
    margin-right: auto;
  }

  /* Padding */
  :host([padding="none"]) [part="container"] {
    padding: 0;
  }

  :host([padding="sm"]) [part="container"] {
    padding: var(--spacing-4, 1rem);
  }

  :host([padding="md"]) [part="container"] {
    padding: var(--spacing-6, 1.5rem);
  }

  :host([padding="lg"]) [part="container"] {
    padding: var(--spacing-8, 2rem);
  }
`;
