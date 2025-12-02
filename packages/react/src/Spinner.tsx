import React, { forwardRef, useEffect, useRef } from "react";
import type { HaSpinner as HaSpinnerElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Size of the spinner
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Color variant
   * @default "primary"
   */
  color?: "primary" | "success" | "warning" | "error" | "info" | "neutral";

  /**
   * Spinner style
   * @default "circular"
   */
  variant?: "circular" | "dots" | "pulse";

  /**
   * Animation speed (e.g., "0.8s", "1s", "1.5s")
   * @default "0.8s"
   */
  speed?: string;
}

/**
 * Spinner component
 *
 * A React wrapper for the `ha-spinner` web component.
 *
 * @example
 * ```tsx
 * <Spinner size="lg" color="primary" />
 * ```
 */
export const Spinner = forwardRef<HTMLElement, SpinnerProps>(
  (
    {
      size = "md",
      color = "primary",
      variant = "circular",
      speed = "0.8s",
      ...props
    },
    _ref,
  ) => {
    const elementRef = useRef<HaSpinnerElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.size = size;
      element.color = color;
      element.variant = variant;
      element.speed = speed;
    }, [size, color, variant, speed]);

    return <ha-spinner ref={elementRef as any} {...props} />;
  },
);

Spinner.displayName = "Spinner";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-spinner": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
