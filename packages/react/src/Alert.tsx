import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type { HaAlert as HaAlertElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface AlertProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Alert variant
   * @default "info"
   */
  variant?: "info" | "success" | "warning" | "error";

  /**
   * Alert style variant
   * @default "soft"
   */
  styleVariant?: "filled" | "outlined" | "soft";

  /**
   * Alert title
   */
  title?: string;

  /**
   * Show close button
   * @default false
   */
  closable?: boolean;

  /**
   * Show icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Alert content
   */
  children?: React.ReactNode;

  /**
   * Callback when alert is closed
   */
  onClose?: () => void;
}

export interface AlertRef {
  close: () => void;
}

/**
 * Alert component
 *
 * A React wrapper for the `ha-alert` web component.
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success" closable>
 *   Your action was completed successfully.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<AlertRef, AlertProps>(
  (
    {
      variant = "info",
      styleVariant = "soft",
      title,
      closable = false,
      showIcon = true,
      children,
      onClose,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HaAlertElement>(null);

    useImperativeHandle(ref, () => ({
      close: () => elementRef.current?.close(),
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.styleVariant = styleVariant;
      if (title) {
        element.title = title;
      }
      element.closable = closable;
      element.showIcon = showIcon;
    }, [variant, styleVariant, title, closable, showIcon]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onClose) return;

      const handleClose = () => {
        onClose();
      };

      element.addEventListener("alert-close", handleClose);

      return () => {
        element.removeEventListener("alert-close", handleClose);
      };
    }, [onClose]);

    return (
      <ha-alert ref={elementRef} {...props}>
        {children}
      </ha-alert>
    );
  },
);

Alert.displayName = "Alert";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-alert": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
