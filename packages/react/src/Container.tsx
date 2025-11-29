import React, { forwardRef } from 'react';
import type { HaContainer as HaContainerElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Maximum width
   * @default "lg"
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Center the container horizontally
   * @default false
   */
  centered?: boolean;

  /**
   * Padding size
   * @default "md"
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Container content
   */
  children?: React.ReactNode;
}

/**
 * Container component
 *
 * A React wrapper for the `ha-container` web component.
 *
 * @example
 * ```tsx
 * <Container maxWidth="lg" centered>
 *   <p>Content goes here</p>
 * </Container>
 * ```
 */
export const Container = forwardRef<HaContainerElement, ContainerProps>(
  ({ maxWidth, centered, padding, children, ...props }, ref) => {
    return (
      <ha-container
        ref={ref}
        max-width={maxWidth}
        centered={centered || undefined}
        padding={padding}
        {...props}
      >
        {children}
      </ha-container>
    );
  }
);

Container.displayName = 'Container';

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HaContainerElement>,
        HaContainerElement
      > & {
        'max-width'?: string;
        centered?: boolean;
        padding?: string;
        ref?: React.Ref<HaContainerElement>;
      };
    }
  }
}
