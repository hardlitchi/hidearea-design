import React, { forwardRef } from "react";
import type { HaStack as HaStackElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Stack direction
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal";

  /**
   * Gap size (0-12)
   * @default "4"
   */
  gap?: string;

  /**
   * Align items
   */
  align?: "start" | "center" | "end" | "stretch";

  /**
   * Justify content
   */
  justify?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around"
    | "space-evenly";

  /**
   * Whether to wrap items
   * @default false
   */
  wrap?: boolean;

  /**
   * Stack items
   */
  children?: React.ReactNode;
}

/**
 * Stack component
 *
 * A React wrapper for the `ha-stack` web component.
 *
 * @example
 * ```tsx
 * <Stack direction="vertical" gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HaStackElement, StackProps>(
  ({ direction, gap, align, justify, wrap, children, ...props }, ref) => {
    return (
      <ha-stack
        ref={ref}
        direction={direction}
        gap={gap}
        align={align}
        justify={justify}
        wrap={wrap || undefined}
        {...props}
      >
        {children}
      </ha-stack>
    );
  },
);

Stack.displayName = "Stack";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-stack": React.DetailedHTMLProps<
        React.HTMLAttributes<HaStackElement>,
        HaStackElement
      > & {
        direction?: string;
        gap?: string;
        align?: string;
        justify?: string;
        wrap?: boolean;
        ref?: React.Ref<HaStackElement>;
      };
    }
  }
}
