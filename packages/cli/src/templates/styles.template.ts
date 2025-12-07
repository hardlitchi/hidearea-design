export const stylesTemplate = (kebabName: string) => `import { baseStyles } from "../../styles/base";

export const ${kebabName}Styles = \`
\${baseStyles}

:host {
  display: inline-block;
}

.container {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3);
  background: var(--background-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  color: var(--foreground-primary);
  transition: all var(--animation-duration-base) ease;
}

.container[data-variant="primary"] {
  background: var(--primary-default);
  color: var(--foreground-inverse);
  border-color: var(--primary-default);
}

.container[data-variant="secondary"] {
  background: var(--secondary-default);
  color: var(--foreground-inverse);
  border-color: var(--secondary-default);
}

.container.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.container:hover:not(.disabled) {
  border-color: var(--primary-default);
}

.container:focus-within {
  outline: 2px solid var(--primary-default);
  outline-offset: 2px;
}
\`;
`;
