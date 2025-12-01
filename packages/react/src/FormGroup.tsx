import React, { forwardRef, useEffect, useRef } from 'react';
import type { HaFormGroup as HaFormGroupElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface FormGroupProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label text
   */
  label?: string;

  /**
   * Helper text shown below the input
   */
  helperText?: string;

  /**
   * Error text shown when error is true
   */
  errorText?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom label content
   */
  labelContent?: React.ReactNode;

  /**
   * Custom helper text content
   */
  helperTextContent?: React.ReactNode;

  /**
   * Custom error text content
   */
  errorTextContent?: React.ReactNode;

  /**
   * Form control content
   */
  children?: React.ReactNode;
}

/**
 * FormGroup component
 *
 * A React wrapper for the `ha-form-group` web component.
 *
 * @example
 * ```tsx
 * <FormGroup label="Email" required>
 *   <Input type="email" />
 * </FormGroup>
 * ```
 */
export const FormGroup = forwardRef<HTMLElement, FormGroupProps>(
  (
    {
      label,
      helperText,
      errorText,
      required = false,
      error = false,
      disabled = false,
      labelContent,
      helperTextContent,
      errorTextContent,
      children,
      ...props
    },
    _ref
  ) => {
    const elementRef = useRef<HaFormGroupElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      if (label) {
        element.label = label;
      }
      if (helperText) {
        element.helperText = helperText;
      }
      if (errorText) {
        element.errorText = errorText;
      }
      element.required = required;
      element.error = error;
      element.disabled = disabled;
    }, [label, helperText, errorText, required, error, disabled]);

    return (
      <ha-form-group
        ref={elementRef as any}
        {...props}
      >
        {labelContent && <span slot="label">{labelContent}</span>}
        {children}
        {helperTextContent && <span slot="helper-text">{helperTextContent}</span>}
        {errorTextContent && <span slot="error-text">{errorTextContent}</span>}
      </ha-form-group>
    );
  }
);

FormGroup.displayName = 'FormGroup';

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-form-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
