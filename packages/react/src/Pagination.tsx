import React, { forwardRef, useEffect, useRef } from "react";

// Import the web component
import "@hidearea-design/core";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Current page number (1-indexed)
   * @default 1
   */
  current?: number;

  /**
   * Total number of items
   */
  total: number;

  /**
   * Number of items per page
   * @default 10
   */
  pageSize?: number;

  /**
   * Pagination variant
   * @default "default"
   */
  variant?: "default" | "rounded" | "simple";

  /**
   * Pagination size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Show quick jumper
   * @default false
   */
  showQuickJumper?: boolean;

  /**
   * Callback when page changes
   */
  onChange?: (page: number) => void;
}

/**
 * Pagination component
 *
 * A React wrapper for the `ha-pagination` web component.
 *
 * @example
 * ```tsx
 * <Pagination
 *   current={currentPage}
 *   total={100}
 *   pageSize={10}
 *   onChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      current = 1,
      total,
      pageSize = 10,
      variant = "default",
      size = "md",
      showQuickJumper = false,
      onChange,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.setAttribute("current", current.toString());
      element.setAttribute("total", total.toString());
      element.setAttribute("page-size", pageSize.toString());
      element.setAttribute("variant", variant);
      element.setAttribute("size", size);
      if (showQuickJumper) {
        element.setAttribute("show-quick-jumper", "");
      } else {
        element.removeAttribute("show-quick-jumper");
      }
    }, [current, total, pageSize, variant, size, showQuickJumper]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onChange) return;

      const handleChange = (event: Event) => {
        const customEvent = event as CustomEvent<{ page: number }>;
        onChange(customEvent.detail.page);
      };

      element.addEventListener("page-change", handleChange);

      return () => {
        element.removeEventListener("page-change", handleChange);
      };
    }, [onChange]);

    return <ha-pagination ref={ref || elementRef} {...props} />;
  },
);

Pagination.displayName = "Pagination";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-pagination": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
