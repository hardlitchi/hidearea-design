import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type { HaButton as HaButtonElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Button variant
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";

  /**
   * Button size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button type
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * Button content
   */
  children?: React.ReactNode;
}

export interface ButtonRef {
  focus: () => void;
  blur: () => void;
}

/**
 * Button component
 *
 * A React wrapper for the `ha-button` web component.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      type = "button",
      children,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HaButtonElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.size = size;
      element.disabled = disabled;
      element.loading = loading;
      element.fullWidth = fullWidth;
      element.setAttribute("type", type);
    }, [variant, size, disabled, loading, fullWidth, type]);

    return (
      <ha-button ref={elementRef} {...props}>
        {children}
      </ha-button>
    );
  },
);

Button.displayName = "Button";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
