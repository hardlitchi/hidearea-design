import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type { HaDrawer as HaDrawerElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface DrawerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Drawer open state
   * @default false
   */
  open?: boolean;

  /**
   * Drawer placement
   * @default "right"
   */
  placement?: "left" | "right" | "top" | "bottom";

  /**
   * Drawer size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Show backdrop overlay
   * @default true
   */
  overlay?: boolean;

  /**
   * Close on backdrop click
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Close on Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Drawer content
   */
  children?: React.ReactNode;

  /**
   * Callback when drawer is opened
   */
  onOpen?: () => void;

  /**
   * Callback when drawer is closed
   */
  onClose?: () => void;

  /**
   * Callback when backdrop is clicked
   */
  onBackdropClick?: () => void;
}

export interface DrawerRef {
  element: HaDrawerElement | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Drawer component
 *
 * A React wrapper for the `ha-drawer` web component.
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} placement="right" onClose={() => setIsOpen(false)}>
 *   <div slot="header">Drawer Title</div>
 *   <p>Drawer content goes here.</p>
 *   <div slot="footer">
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </div>
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<DrawerRef, DrawerProps>(
  (
    {
      open,
      placement = "right",
      size = "md",
      overlay = true,
      closeOnBackdrop = true,
      closeOnEscape = true,
      children,
      onOpen,
      onClose,
      onBackdropClick,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaDrawerElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
        open: () => elementRef.current?.open(),
        close: () => elementRef.current?.close(),
        toggle: () => elementRef.current?.toggle(),
      }),
      []
    );

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleOpen = () => {
        onOpen?.();
      };

      const handleClose = () => {
        onClose?.();
      };

      const handleBackdropClick = () => {
        onBackdropClick?.();
      };

      element.addEventListener("drawer-open", handleOpen);
      element.addEventListener("drawer-close", handleClose);
      element.addEventListener("backdrop-click", handleBackdropClick);

      return () => {
        element.removeEventListener("drawer-open", handleOpen);
        element.removeEventListener("drawer-close", handleClose);
        element.removeEventListener("backdrop-click", handleBackdropClick);
      };
    }, [onOpen, onClose, onBackdropClick]);

    return (
      <ha-drawer
        ref={elementRef}
        {...(open && { open: "" })}
        placement={placement}
        size={size}
        {...(overlay && { overlay: "" })}
        {...(closeOnBackdrop && { "close-on-backdrop": "" })}
        {...(closeOnEscape && { "close-on-escape": "" })}
        {...props}
      >
        {children}
      </ha-drawer>
    );
  }
);

Drawer.displayName = "Drawer";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-drawer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          placement?: string;
          size?: string;
        },
        HTMLElement
      >;
    }
  }
}
