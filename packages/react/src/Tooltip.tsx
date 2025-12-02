import React, { forwardRef, useEffect, useRef } from "react";
import type { HaTooltip as HaTooltipElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  /**
   * Tooltip content text
   */
  content?: string;

  /**
   * Tooltip placement
   * @default "top"
   */
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";

  /**
   * Trigger type
   * @default "hover"
   */
  trigger?: "hover" | "focus" | "click";

  /**
   * Tooltip variant
   * @default "default"
   */
  variant?: "default" | "dark" | "light";

  /**
   * Tooltip size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Show arrow indicator
   * @default false
   */
  showArrow?: boolean;

  /**
   * Show delay in milliseconds
   * @default 200
   */
  delay?: number;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom tooltip content (JSX)
   */
  contentElement?: React.ReactNode;

  /**
   * Show event handler
   */
  onShow?: () => void;

  /**
   * Hide event handler
   */
  onHide?: () => void;

  /**
   * Trigger element (children)
   */
  children?: React.ReactNode;
}

/**
 * Tooltip component
 *
 * A React wrapper for the `ha-tooltip` web component.
 *
 * @example
 * ```tsx
 * <Tooltip content="Helpful information">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  (
    {
      content,
      placement = "top",
      trigger = "hover",
      variant = "default",
      size = "md",
      showArrow = false,
      delay = 200,
      disabled = false,
      contentElement,
      onShow,
      onHide,
      children,
      ...props
    },
    _ref,
  ) => {
    const elementRef = useRef<HaTooltipElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      if (content) {
        element.content = content;
      }
      element.placement = placement;
      element.triggerMode = trigger;
      element.variant = variant;
      element.size = size;
      element.showArrow = showArrow;
      element.delay = delay;
      element.disabled = disabled;
    }, [
      content,
      placement,
      trigger,
      variant,
      size,
      showArrow,
      delay,
      disabled,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleShow = () => {
        if (onShow) {
          onShow();
        }
      };

      const handleHide = () => {
        if (onHide) {
          onHide();
        }
      };

      if (onShow) {
        element.addEventListener("show", handleShow);
      }
      if (onHide) {
        element.addEventListener("hide", handleHide);
      }

      return () => {
        if (onShow) {
          element.removeEventListener("show", handleShow);
        }
        if (onHide) {
          element.removeEventListener("hide", handleHide);
        }
      };
    }, [onShow, onHide]);

    return (
      <ha-tooltip ref={elementRef as any} {...props}>
        {children}
        {contentElement && <div slot="content">{contentElement}</div>}
      </ha-tooltip>
    );
  },
);

Tooltip.displayName = "Tooltip";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-tooltip": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
