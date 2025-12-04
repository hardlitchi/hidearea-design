import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type {
  HaAccordion as HaAccordionElement,
  HaAccordionItem as HaAccordionItemElement,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface AccordionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Allow multiple items to be open simultaneously
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Allow all items to be collapsed
   * @default false
   */
  collapsible?: boolean;

  /**
   * Accordion items
   */
  children?: React.ReactNode;
}

export interface AccordionRef {
  element: HaAccordionElement | null;
}

/**
 * Accordion component
 *
 * A React wrapper for the `ha-accordion` web component.
 *
 * @example
 * ```tsx
 * <Accordion allowMultiple>
 *   <AccordionItem header="Section 1">
 *     <p>Content for section 1</p>
 *   </AccordionItem>
 *   <AccordionItem header="Section 2">
 *     <p>Content for section 2</p>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export const Accordion = forwardRef<AccordionRef, AccordionProps>(
  ({ allowMultiple, collapsible, children, ...props }, ref) => {
    const elementRef = useRef<HaAccordionElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
      }),
      []
    );

    return (
      <ha-accordion
        ref={elementRef}
        {...(allowMultiple && { "allow-multiple": "" })}
        {...(collapsible && { collapsible: "" })}
        {...props}
      >
        {children}
      </ha-accordion>
    );
  }
);

Accordion.displayName = "Accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Item open state
   * @default false
   */
  open?: boolean;

  /**
   * Disable the item
   * @default false
   */
  disabled?: boolean;

  /**
   * Header text
   */
  header?: string;

  /**
   * Item content
   */
  children?: React.ReactNode;

  /**
   * Callback when item is toggled
   */
  onToggle?: (open: boolean) => void;

  /**
   * Callback when item is opened
   */
  onOpen?: () => void;

  /**
   * Callback when item is closed
   */
  onClose?: () => void;
}

export interface AccordionItemRef {
  element: HaAccordionItemElement | null;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

/**
 * Accordion Item component
 *
 * A React wrapper for the `ha-accordion-item` web component.
 *
 * @example
 * ```tsx
 * <AccordionItem header="Section Title" open>
 *   <p>Section content goes here.</p>
 * </AccordionItem>
 * ```
 */
export const AccordionItem = forwardRef<AccordionItemRef, AccordionItemProps>(
  ({ open, disabled, header, children, onToggle, onOpen, onClose, ...props }, ref) => {
    const elementRef = useRef<HaAccordionItemElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
        toggle: () => elementRef.current?.toggle(),
        open: () => elementRef.current?.open(),
        close: () => elementRef.current?.close(),
      }),
      []
    );

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleToggle = (e: Event) => {
        const customEvent = e as CustomEvent;
        onToggle?.(customEvent.detail.open);
      };

      const handleOpen = () => {
        onOpen?.();
      };

      const handleClose = () => {
        onClose?.();
      };

      element.addEventListener("accordion-toggle", handleToggle);
      element.addEventListener("accordion-open", handleOpen);
      element.addEventListener("accordion-close", handleClose);

      return () => {
        element.removeEventListener("accordion-toggle", handleToggle);
        element.removeEventListener("accordion-open", handleOpen);
        element.removeEventListener("accordion-close", handleClose);
      };
    }, [onToggle, onOpen, onClose]);

    return (
      <ha-accordion-item
        ref={elementRef}
        {...(open && { open: "" })}
        {...(disabled && { disabled: "" })}
        {...(header && { header })}
        {...props}
      >
        {children}
      </ha-accordion-item>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-accordion": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ha-accordion-item": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
