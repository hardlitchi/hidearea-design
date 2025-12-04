import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import type { HaDataGrid as HaDataGridElement, DataGridColumn, DataGridRow } from "@hidearea-design/core";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-datagrid": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        ref?: React.Ref<HaDataGridElement>;
        striped?: string | undefined;
        bordered?: string | undefined;
        hoverable?: string | undefined;
        selectable?: string | undefined;
        "page-size"?: number;
        "current-page"?: number;
      }, HTMLElement>;
    }
  }
}

export interface DataGridProps extends React.HTMLAttributes<HTMLElement> {
  columns?: DataGridColumn[];
  data?: DataGridRow[];
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  pageSize?: number;
  currentPage?: number;
  onSortChange?: (event: CustomEvent) => void;
  onSelectionChange?: (event: CustomEvent) => void;
  onPageChange?: (event: CustomEvent) => void;
}

export interface DataGridRef {
  element: HaDataGridElement | null;
  getSelectedRows: () => number[];
  clearSelection: () => void;
}

export const DataGrid = forwardRef<DataGridRef, DataGridProps>(
  (
    {
      columns,
      data,
      striped,
      bordered,
      hoverable,
      selectable,
      pageSize,
      currentPage,
      onSortChange,
      onSelectionChange,
      onPageChange,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaDataGridElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
        getSelectedRows: () => elementRef.current?.getSelectedRows() || [],
        clearSelection: () => elementRef.current?.clearSelection(),
      }),
      []
    );

    useEffect(() => {
      if (elementRef.current && columns) {
        elementRef.current.setColumns(columns);
      }
    }, [columns]);

    useEffect(() => {
      if (elementRef.current && data) {
        elementRef.current.setData(data);
      }
    }, [data]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleSortChange = (e: Event) => {
        onSortChange?.(e as CustomEvent);
      };

      const handleSelectionChange = (e: Event) => {
        onSelectionChange?.(e as CustomEvent);
      };

      const handlePageChange = (e: Event) => {
        onPageChange?.(e as CustomEvent);
      };

      if (onSortChange) {
        element.addEventListener("sort-change", handleSortChange);
      }
      if (onSelectionChange) {
        element.addEventListener("selection-change", handleSelectionChange);
      }
      if (onPageChange) {
        element.addEventListener("page-change", handlePageChange);
      }

      return () => {
        if (onSortChange) {
          element.removeEventListener("sort-change", handleSortChange);
        }
        if (onSelectionChange) {
          element.removeEventListener("selection-change", handleSelectionChange);
        }
        if (onPageChange) {
          element.removeEventListener("page-change", handlePageChange);
        }
      };
    }, [onSortChange, onSelectionChange, onPageChange]);

    return (
      <ha-datagrid
        ref={elementRef}
        striped={striped ? "" : undefined}
        bordered={bordered ? "" : undefined}
        hoverable={hoverable ? "" : undefined}
        selectable={selectable ? "" : undefined}
        page-size={pageSize}
        current-page={currentPage}
        {...props}
      />
    );
  }
);

DataGrid.displayName = "DataGrid";
