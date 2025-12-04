import React, { forwardRef, useRef, useImperativeHandle } from "react";
import type { HaTable as HaTableElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface TableProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Enable striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Enable borders
   * @default false
   */
  bordered?: boolean;

  /**
   * Enable row hover effect
   * @default false
   */
  hoverable?: boolean;

  /**
   * Enable compact mode
   * @default false
   */
  compact?: boolean;

  /**
   * Enable full width table
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Table content (thead, tbody, tfoot)
   */
  children?: React.ReactNode;
}

export interface TableRef {
  element: HaTableElement | null;
}

/**
 * Table component
 *
 * A React wrapper for the `ha-table` web component.
 *
 * @example
 * ```tsx
 * <Table striped bordered hoverable>
 *   <thead>
 *     <tr>
 *       <th>Name</th>
 *       <th>Email</th>
 *       <th>Role</th>
 *     </tr>
 *   </thead>
 *   <tbody>
 *     <tr>
 *       <td>John Doe</td>
 *       <td>john@example.com</td>
 *       <td>Admin</td>
 *     </tr>
 *   </tbody>
 * </Table>
 * ```
 */
export const Table = forwardRef<TableRef, TableProps>(
  (
    {
      striped,
      bordered,
      hoverable,
      compact,
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaTableElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
      }),
      []
    );

    return (
      <ha-table
        ref={elementRef}
        {...(striped && { striped: "" })}
        {...(bordered && { bordered: "" })}
        {...(hoverable && { hoverable: "" })}
        {...(compact && { compact: "" })}
        {...(fullWidth && { "full-width": "" })}
        {...props}
      >
        {children}
      </ha-table>
    );
  }
);

Table.displayName = "Table";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
