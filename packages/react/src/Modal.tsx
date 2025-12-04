import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type { HaModal as HaModalElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Modal open state
   * @default false
   */
  open?: boolean;

  /**
   * Modal size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  /**
   * Modal variant
   * @default "default"
   */
  variant?: "default" | "centered" | "fullscreen";

  /**
   * Show close button
   * @default true
   */
  closable?: boolean;

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
   * Modal content
   */
  children?: React.ReactNode;

  /**
   * Callback when modal is opened
   */
  onOpen?: () => void;

  /**
   * Callback when modal is closed
   */
  onClose?: () => void;
}

export interface ModalRef {
  element: HaModalElement | null;
}

/**
 * Modal component
 *
 * A React wrapper for the `ha-modal` web component.
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <div slot="header">Modal Title</div>
 *   <p>Modal content goes here.</p>
 *   <div slot="footer">
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </div>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<ModalRef, ModalProps>(
  (
    {
      open = false,
      size = "md",
      variant = "default",
      closable = true,
      closeOnBackdrop = true,
      closeOnEscape = true,
      children,
      onOpen,
      onClose,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HaModalElement>(null);

    useImperativeHandle(ref, () => ({
      element: elementRef.current,
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (open) {
        element.setAttribute("open", "");
      } else {
        element.removeAttribute("open");
      }
    }, [open]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.setAttribute("size", size);
      element.setAttribute("variant", variant);
      if (closable) {
        element.setAttribute("closable", "");
      } else {
        element.removeAttribute("closable");
      }
      if (closeOnBackdrop) {
        element.setAttribute("close-on-backdrop", "");
      } else {
        element.removeAttribute("close-on-backdrop");
      }
      if (closeOnEscape) {
        element.setAttribute("close-on-escape", "");
      } else {
        element.removeAttribute("close-on-escape");
      }
    }, [size, variant, closable, closeOnBackdrop, closeOnEscape]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleOpen = () => {
        onOpen?.();
      };

      const handleClose = () => {
        onClose?.();
      };

      element.addEventListener("modal-open", handleOpen);
      element.addEventListener("modal-close", handleClose);

      return () => {
        element.removeEventListener("modal-open", handleOpen);
        element.removeEventListener("modal-close", handleClose);
      };
    }, [onOpen, onClose]);

    return (
      <ha-modal ref={elementRef} {...props}>
        {children}
      </ha-modal>
    );
  },
);

Modal.displayName = "Modal";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-modal": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
