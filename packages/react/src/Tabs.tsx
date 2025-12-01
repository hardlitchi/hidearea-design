import React, { forwardRef, useEffect, useRef } from 'react';
import type { HaTabs as HaTabsElement } from '@hidearea-design/core';
import '@hidearea-design/core';

export interface TabsProps extends React.HTMLAttributes<HTMLElement> {
  value?: string;
  variant?: 'default' | 'outlined' | 'pills';
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  onTabChange?: (value: string, oldValue: string) => void;
  children?: React.ReactNode;
}

export const Tabs = forwardRef<HTMLElement, TabsProps>(
  ({ value, variant = 'default', size = 'md', align = 'start', onTabChange, children, ...props }, _ref) => {
    const elementRef = useRef<HaTabsElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      if (value) element.value = value;
      element.variant = variant;
      element.size = size;
      element.align = align;
    }, [value, variant, size, align]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ value: string; oldValue: string }>;
        if (onTabChange) {
          onTabChange(customEvent.detail.value, customEvent.detail.oldValue);
        }
      };

      if (onTabChange) {
        element.addEventListener('tab-change', handleChange);
      }

      return () => {
        if (onTabChange) {
          element.removeEventListener('tab-change', handleChange);
        }
      };
    }, [onTabChange]);

    return (
      <ha-tabs ref={elementRef as any} {...props}>
        {children}
      </ha-tabs>
    );
  }
);

Tabs.displayName = 'Tabs';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-tabs': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-tab-item': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'ha-tab-panel': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
