import React, { forwardRef, useEffect, useRef } from 'react';
import type { HaSelect as HaSelectElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Select variant
   * @default "default"
   */
  variant?: 'default' | 'filled' | 'outlined';

  /**
   * Select size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Selected value
   */
  value?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Required state
   * @default false
   */
  required?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Full width select
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Select name
   */
  name?: string;

  /**
   * Option elements
   */
  children?: React.ReactNode;

  /**
   * Change event handler
   */
  onChange?: (value: string) => void;
}

/**
 * Select component
 *
 * A React wrapper for the `ha-select` web component.
 *
 * @example
 * ```tsx
 * <Select value="option1">
 *   <option value="option1">Option 1</option>
 *   <option value="option2">Option 2</option>
 * </Select>
 * ```
 */
export const Select = forwardRef<HTMLElement, SelectProps>(
  (
    {
      variant = 'default',
      size = 'md',
      value,
      placeholder,
      disabled = false,
      required = false,
      error = false,
      fullWidth = false,
      name,
      children,
      onChange,
      ...props
    },
    _ref
  ) => {
    const elementRef = useRef<HaSelectElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.size = size;
      if (value !== undefined) {
        element.value = value;
      }
      if (placeholder) {
        element.placeholder = placeholder;
      }
      element.disabled = disabled;
      element.required = required;
      element.error = error;
      element.fullWidth = fullWidth;
      if (name) {
        element.name = name;
      }
    }, [variant, size, value, placeholder, disabled, required, error, fullWidth, name]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onChange) return;

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ value: string }>;
        onChange(customEvent.detail.value);
      };

      element.addEventListener('change', handleChange);

      return () => {
        element.removeEventListener('change', handleChange);
      };
    }, [onChange]);

    return (
      <ha-select
        ref={elementRef as any}
        {...props}
      >
        {children}
      </ha-select>
    );
  }
);

Select.displayName = 'Select';

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-select': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
