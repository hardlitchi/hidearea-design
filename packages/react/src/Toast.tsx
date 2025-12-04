import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type {
  HaToast as HaToastElement,
  HaToastContainer as HaToastContainerElement,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ToastProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Toast variant
   * @default "info"
   */
  variant?: "info" | "success" | "warning" | "error";

  /**
   * Toast message
   */
  message?: string;

  /**
   * Show close button
   * @default true
   */
  closable?: boolean;

  /**
   * Auto-close duration in milliseconds (0 to disable)
   * @default 5000
   */
  duration?: number;

  /**
   * Show progress bar
   * @default false
   */
  showProgress?: boolean;

  /**
   * Toast content
   */
  children?: React.ReactNode;

  /**
   * Callback when toast is closed
   */
  onClose?: () => void;
}

export interface ToastRef {
  close: () => void;
}

/**
 * Toast component
 *
 * A React wrapper for the `ha-toast` web component.
 *
 * @example
 * ```tsx
 * <Toast variant="success" message="Operation successful!" closable />
 * ```
 */
export const Toast = forwardRef<ToastRef, ToastProps>(
  (
    {
      variant = "info",
      message,
      closable = true,
      duration = 5000,
      showProgress = false,
      children,
      onClose,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HaToastElement>(null);

    useImperativeHandle(ref, () => ({
      close: () => elementRef.current?.close(),
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.setAttribute("variant", variant);
      if (message) {
        element.setAttribute("message", message);
      }
      if (closable) {
        element.setAttribute("closable", "");
      } else {
        element.removeAttribute("closable");
      }
      element.setAttribute("duration", duration.toString());
      if (showProgress) {
        element.setAttribute("show-progress", "");
      } else {
        element.removeAttribute("show-progress");
      }
    }, [variant, message, closable, duration, showProgress]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onClose) return;

      const handleClose = () => {
        onClose();
      };

      element.addEventListener("toast-close", handleClose);

      return () => {
        element.removeEventListener("toast-close", handleClose);
      };
    }, [onClose]);

    return (
      <ha-toast ref={elementRef} {...props}>
        {children}
      </ha-toast>
    );
  },
);

Toast.displayName = "Toast";

export interface ToastContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Toast container position
   * @default "top-right"
   */
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

  /**
   * Container content
   */
  children?: React.ReactNode;
}

/**
 * ToastContainer component
 *
 * A React wrapper for the `ha-toast-container` web component.
 *
 * @example
 * ```tsx
 * <ToastContainer position="top-right">
 *   <Toast variant="success" message="Success!" />
 * </ToastContainer>
 * ```
 */
export const ToastContainer = forwardRef<HTMLElement, ToastContainerProps>(
  ({ position = "top-right", children, ...props }, ref) => {
    const elementRef = useRef<HaToastContainerElement>(null);

    useImperativeHandle(ref, () => elementRef.current!);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.setAttribute("position", position);
    }, [position]);

    return (
      <ha-toast-container ref={elementRef} {...props}>
        {children}
      </ha-toast-container>
    );
  },
);

ToastContainer.displayName = "ToastContainer";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-toast": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ha-toast-container": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
