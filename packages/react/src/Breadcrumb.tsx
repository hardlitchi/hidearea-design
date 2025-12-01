import React, { forwardRef, useEffect, useRef } from 'react';
import type { HaBreadcrumb as HaBreadcrumbElement } from '@hidearea-design/core';
import '@hidearea-design/core';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: 'slash' | 'chevron' | 'arrow' | 'dot';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = 'slash', size = 'md', children, ...props }, _ref) => {
    const elementRef = useRef<HaBreadcrumbElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.separator = separator;
      element.size = size;
    }, [separator, size]);

    return (
      <ha-breadcrumb ref={elementRef as any} {...props}>
        {children}
      </ha-breadcrumb>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-breadcrumb': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-breadcrumb-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
