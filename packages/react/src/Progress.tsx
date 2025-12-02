import React, { forwardRef, useEffect, useRef } from "react";
import type { HaProgress as HaProgressElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Current progress value
   * @default 0
   */
  value?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Progress bar style
   * @default "default"
   */
  variant?: "default" | "striped" | "animated";

  /**
   * Color variant
   * @default "primary"
   */
  color?: "primary" | "success" | "warning" | "error" | "info";

  /**
   * Size of the progress bar
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Show percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Custom label content
   */
  label?: React.ReactNode;

  /**
   * Progress content
   */
  children?: React.ReactNode;
}

/**
 * Progress component
 *
 * A React wrapper for the `ha-progress` web component.
 *
 * @example
 * ```tsx
 * <Progress value={75} showLabel color="success" />
 * ```
 */
export const Progress = forwardRef<HTMLElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = "default",
      color = "primary",
      size = "md",
      showLabel = false,
      label,
      children,
      ...props
    },
    _ref,
  ) => {
    const elementRef = useRef<HaProgressElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.value = value;
      element.max = max;
      element.variant = variant;
      element.color = color;
      element.size = size;
      element.showLabel = showLabel;
    }, [value, max, variant, color, size, showLabel]);

    return (
      <ha-progress ref={elementRef as any} {...props}>
        {label && <span slot="label">{label}</span>}
        {children}
      </ha-progress>
    );
  },
);

Progress.displayName = "Progress";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-progress": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
