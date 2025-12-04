import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type {
  HaList as HaListElement,
  HaListItem as HaListItemElement,
  HaListDivider as HaListDividerElement,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ListProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Enable borders around list
   * @default false
   */
  bordered?: boolean;

  /**
   * Enable hover effect on items
   * @default false
   */
  hoverable?: boolean;

  /**
   * Show dividers between items
   * @default false
   */
  divided?: boolean;

  /**
   * List items
   */
  children?: React.ReactNode;
}

export interface ListRef {
  element: HaListElement | null;
}

/**
 * List component
 *
 * A React wrapper for the `ha-list` web component.
 *
 * @example
 * ```tsx
 * <List bordered hoverable>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 *   <ListDivider />
 *   <ListItem>Item 3</ListItem>
 * </List>
 * ```
 */
export const List = forwardRef<ListRef, ListProps>(
  ({ bordered, hoverable, divided, children, ...props }, ref) => {
    const elementRef = useRef<HaListElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
      }),
      []
    );

    return (
      <ha-list
        ref={elementRef}
        {...(bordered && { bordered: "" })}
        {...(hoverable && { hoverable: "" })}
        {...(divided && { divided: "" })}
        {...props}
      >
        {children}
      </ha-list>
    );
  }
);

List.displayName = "List";

export interface ListItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Disable the item
   * @default false
   */
  disabled?: boolean;

  /**
   * Mark item as active
   * @default false
   */
  active?: boolean;

  /**
   * Item content
   */
  children?: React.ReactNode;

  /**
   * Callback when item is clicked
   */
  onClick?: () => void;
}

export interface ListItemRef {
  element: HaListItemElement | null;
}

/**
 * List Item component
 *
 * A React wrapper for the `ha-list-item` web component.
 *
 * @example
 * ```tsx
 * <ListItem active onClick={() => console.log('clicked')}>
 *   <div slot="prefix">🔥</div>
 *   Item content
 *   <div slot="suffix">→</div>
 * </ListItem>
 * ```
 */
export const ListItem = forwardRef<ListItemRef, ListItemProps>(
  ({ disabled, active, children, onClick, ...props }, ref) => {
    const elementRef = useRef<HaListItemElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
      }),
      []
    );

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleClick = () => {
        onClick?.();
      };

      element.addEventListener("list-item-click", handleClick);

      return () => {
        element.removeEventListener("list-item-click", handleClick);
      };
    }, [onClick]);

    return (
      <ha-list-item
        ref={elementRef}
        {...(disabled && { disabled: "" })}
        {...(active && { active: "" })}
        {...props}
      >
        {children}
      </ha-list-item>
    );
  }
);

ListItem.displayName = "ListItem";

export interface ListDividerProps extends React.HTMLAttributes<HTMLElement> {}

export interface ListDividerRef {
  element: HaListDividerElement | null;
}

/**
 * List Divider component
 *
 * A React wrapper for the `ha-list-divider` web component.
 *
 * @example
 * ```tsx
 * <ListDivider />
 * ```
 */
export const ListDivider = forwardRef<ListDividerRef, ListDividerProps>(
  (props, ref) => {
    const elementRef = useRef<HaListDividerElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
      }),
      []
    );

    return <ha-list-divider ref={elementRef} {...props} />;
  }
);

ListDivider.displayName = "ListDivider";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-list": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ha-list-item": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ha-list-divider": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
