import React, { forwardRef } from "react";
import type { HaGrid as HaGridElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface GridProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Number of columns
   * @default "12"
   */
  columns?: string;

  /**
   * Gap size (0-12)
   * @default "4"
   */
  gap?: string;

  /**
   * Row gap size (0-12)
   */
  rowGap?: string;

  /**
   * Column gap size (0-12)
   */
  columnGap?: string;

  /**
   * Align items
   */
  alignItems?: "start" | "center" | "end" | "stretch";

  /**
   * Justify items
   */
  justifyItems?: "start" | "center" | "end" | "stretch";

  /**
   * Grid items
   */
  children?: React.ReactNode;
}

/**
 * Grid component
 *
 * A React wrapper for the `ha-grid` web component.
 *
 * @example
 * ```tsx
 * <Grid columns="3" gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HaGridElement, GridProps>(
  (
    {
      columns,
      gap,
      rowGap,
      columnGap,
      alignItems,
      justifyItems,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <ha-grid
        ref={ref}
        columns={columns}
        gap={gap}
        row-gap={rowGap}
        column-gap={columnGap}
        align-items={alignItems}
        justify-items={justifyItems}
        {...props}
      >
        {children}
      </ha-grid>
    );
  },
);

Grid.displayName = "Grid";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-grid": React.DetailedHTMLProps<
        React.HTMLAttributes<HaGridElement>,
        HaGridElement
      > & {
        columns?: string;
        gap?: string;
        "row-gap"?: string;
        "column-gap"?: string;
        "align-items"?: string;
        "justify-items"?: string;
        ref?: React.Ref<HaGridElement>;
      };
    }
  }
}
