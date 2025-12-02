import React, { forwardRef, useEffect, useRef } from "react";
import type { HaCard as HaCardElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Card variant
   * @default "default"
   */
  variant?: "default" | "outlined" | "elevated";

  /**
   * Card padding size
   * @default "md"
   */
  padding?: "none" | "sm" | "md" | "lg";

  /**
   * Enable hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Make card clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Card content
   */
  children?: React.ReactNode;

  /**
   * Callback when card is clicked (only when clickable is true)
   */
  onClick?: () => void;
}

/**
 * Card component
 *
 * A React wrapper for the `ha-card` web component.
 *
 * @example
 * ```tsx
 * <Card variant="elevated" hoverable>
 *   <h3>Card Title</h3>
 *   <p>Card content goes here.</p>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hoverable = false,
      clickable = false,
      children,
      onClick,
      ...props
    },
    _ref,
  ) => {
    const elementRef = useRef<HaCardElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.padding = padding;
      element.hoverable = hoverable;
      element.clickable = clickable;
    }, [variant, padding, hoverable, clickable]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onClick) return;

      const handleClick = () => {
        onClick();
      };

      element.addEventListener("card-click", handleClick);

      return () => {
        element.removeEventListener("card-click", handleClick);
      };
    }, [onClick]);

    return (
      <ha-card ref={elementRef as any} {...props}>
        {children}
      </ha-card>
    );
  },
);

Card.displayName = "Card";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-card": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
