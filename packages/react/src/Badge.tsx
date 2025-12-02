import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type { HaBadge as HaBadgeElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Badge variant
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";

  /**
   * Badge style variant
   * @default "filled"
   */
  styleVariant?: "filled" | "outlined" | "soft";

  /**
   * Badge size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Pill-shaped badge
   * @default false
   */
  pill?: boolean;

  /**
   * Dot-only badge (no content)
   * @default false
   */
  dot?: boolean;

  /**
   * Show remove button
   * @default false
   */
  removable?: boolean;

  /**
   * Badge content
   */
  children?: React.ReactNode;

  /**
   * Callback when remove button is clicked
   */
  onRemove?: () => void;
}

export interface BadgeRef {
  remove: () => void;
}

/**
 * Badge component
 *
 * A React wrapper for the `ha-badge` web component.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" pill removable>Tag</Badge>
 * ```
 */
export const Badge = forwardRef<BadgeRef, BadgeProps>(
  (
    {
      variant = "primary",
      styleVariant = "filled",
      size = "md",
      pill = false,
      dot = false,
      removable = false,
      children,
      onRemove,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HaBadgeElement>(null);

    useImperativeHandle(ref, () => ({
      remove: () => elementRef.current?.remove(),
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.styleVariant = styleVariant;
      element.size = size;
      element.pill = pill;
      element.dot = dot;
      element.removable = removable;
    }, [variant, styleVariant, size, pill, dot, removable]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onRemove) return;

      const handleRemove = () => {
        onRemove();
      };

      element.addEventListener("badge-remove", handleRemove);

      return () => {
        element.removeEventListener("badge-remove", handleRemove);
      };
    }, [onRemove]);

    return (
      <ha-badge ref={elementRef} {...props}>
        {children}
      </ha-badge>
    );
  },
);

Badge.displayName = "Badge";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-badge": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
