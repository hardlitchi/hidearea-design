import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { HaSkeleton as HaSkeletonElement } from "@hidearea-design/core";

export interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "text" | "circular" | "rectangular";
  animation?: "pulse" | "wave" | "none";
  width?: string;
  height?: string;
}

export interface SkeletonRef {
  element: HaSkeletonElement | null;
}

export const Skeleton = forwardRef<SkeletonRef, SkeletonProps>(
  ({ variant, animation, width, height, ...props }, ref) => {
    const elementRef = useRef<HaSkeletonElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        element: elementRef.current,
      }),
      []
    );

    return (
      <ha-skeleton
        ref={elementRef}
        variant={variant}
        animation={animation}
        width={width}
        height={height}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-skeleton": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          variant?: string;
          animation?: string;
          width?: string;
          height?: string;
        },
        HTMLElement
      >;
    }
  }
}
