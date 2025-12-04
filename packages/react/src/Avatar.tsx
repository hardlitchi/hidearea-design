import React, { forwardRef, useEffect, useRef } from "react";
import type {
  HaAvatar as HaAvatarElement,
  HaAvatarGroup as HaAvatarGroupElement,
} from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Avatar size
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Avatar variant
   * @default "circle"
   */
  variant?: "circle" | "square" | "rounded";

  /**
   * Initials to display (overrides auto-generated initials)
   */
  initials?: string;

  /**
   * Status indicator
   */
  status?: "online" | "offline" | "away" | "busy";

  /**
   * Avatar content (icon or custom content)
   */
  children?: React.ReactNode;
}

/**
 * Avatar component
 *
 * A React wrapper for the `ha-avatar` web component.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" size="lg" status="online" />
 * <Avatar alt="John Doe" initials="JD" />
 * <Avatar><UserIcon /></Avatar>
 * ```
 */
export const Avatar = forwardRef<HaAvatarElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = "md",
      variant = "circle",
      initials,
      status,
      children,
      ...props
    },
    ref,
  ) => {
    const elementRef = useRef<HaAvatarElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (src) {
        element.setAttribute("src", src);
      } else {
        element.removeAttribute("src");
      }

      if (alt) {
        element.setAttribute("alt", alt);
      } else {
        element.removeAttribute("alt");
      }

      element.setAttribute("size", size);
      element.setAttribute("variant", variant);

      if (initials) {
        element.setAttribute("initials", initials);
      } else {
        element.removeAttribute("initials");
      }

      if (status) {
        element.setAttribute("status", status);
      } else {
        element.removeAttribute("status");
      }
    }, [src, alt, size, variant, initials, status]);

    return (
      <ha-avatar ref={ref || elementRef} {...props}>
        {children}
      </ha-avatar>
    );
  },
);

Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Maximum number of avatars to display
   * @default 0 (no limit)
   */
  max?: number;

  /**
   * Avatar size (propagated to children)
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

  /**
   * Group layout
   * @default "stack"
   */
  layout?: "stack" | "grid" | "list";

  /**
   * Avatar children
   */
  children?: React.ReactNode;
}

/**
 * AvatarGroup component
 *
 * A React wrapper for the `ha-avatar-group` web component.
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3} size="md" layout="stack">
 *   <Avatar src="/user1.jpg" alt="User 1" />
 *   <Avatar src="/user2.jpg" alt="User 2" />
 *   <Avatar src="/user3.jpg" alt="User 3" />
 *   <Avatar src="/user4.jpg" alt="User 4" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<HaAvatarGroupElement, AvatarGroupProps>(
  ({ max = 0, size = "md", layout = "stack", children, ...props }, ref) => {
    const elementRef = useRef<HaAvatarGroupElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (max > 0) {
        element.setAttribute("max", max.toString());
      } else {
        element.removeAttribute("max");
      }

      element.setAttribute("size", size);
      element.setAttribute("layout", layout);
    }, [max, size, layout]);

    return (
      <ha-avatar-group ref={ref || elementRef} {...props}>
        {children}
      </ha-avatar-group>
    );
  },
);

AvatarGroup.displayName = "AvatarGroup";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-avatar": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "ha-avatar-group": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
