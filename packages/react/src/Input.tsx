import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import type { HaInput as HaInputElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface InputProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onInput' | 'onFocus' | 'onBlur' | 'prefix' | 'suffix'> {
  /**
   * Input variant
   * @default "default"
   */
  variant?: 'default' | 'filled' | 'outlined';

  /**
   * Input size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Input type
   * @default "text"
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

  /**
   * Input value
   */
  value?: string;

  /**
   * Input placeholder
   */
  placeholder?: string;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Readonly state
   * @default false
   */
  readonly?: boolean;

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
   * Full width input
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Input name
   */
  name?: string;

  /**
   * Autocomplete attribute
   */
  autocomplete?: string;

  /**
   * Maximum length
   */
  maxlength?: number;

  /**
   * Minimum length
   */
  minlength?: number;

  /**
   * Validation pattern
   */
  pattern?: string;

  /**
   * Minimum value (for number type)
   */
  min?: number;

  /**
   * Maximum value (for number type)
   */
  max?: number;

  /**
   * Step value (for number type)
   */
  step?: number;

  /**
   * Input event handler
   */
  onInput?: (value: string, event: Event) => void;

  /**
   * Change event handler
   */
  onChange?: (value: string, event: Event) => void;

  /**
   * Focus event handler
   */
  onFocus?: (event: Event) => void;

  /**
   * Blur event handler
   */
  onBlur?: (event: Event) => void;

  /**
   * Prefix content
   */
  prefix?: React.ReactNode;

  /**
   * Suffix content
   */
  suffix?: React.ReactNode;

  /**
   * Input content
   */
  children?: React.ReactNode;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => void;
  checkValidity: () => boolean;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

/**
 * Input component
 *
 * A React wrapper for the `ha-input` web component.
 *
 * @example
 * ```tsx
 * <Input
 *   variant="outlined"
 *   placeholder="Enter your name"
 *   onInput={(value) => console.log(value)}
 * />
 * ```
 */
export const Input = forwardRef<InputRef, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      type = 'text',
      value,
      placeholder,
      disabled = false,
      readonly = false,
      required = false,
      error = false,
      fullWidth = false,
      name,
      autocomplete,
      maxlength,
      minlength,
      pattern,
      min,
      max,
      step,
      onInput,
      onChange,
      onFocus,
      onBlur,
      prefix,
      suffix,
      children,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      select: () => elementRef.current?.select(),
      setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') =>
        elementRef.current?.setSelectionRange(start, end, direction),
      checkValidity: () => elementRef.current?.checkValidity() ?? false,
      reportValidity: () => elementRef.current?.reportValidity() ?? false,
      setCustomValidity: (message: string) => elementRef.current?.setCustomValidity(message),
      getValue: () => elementRef.current?.value ?? '',
      setValue: (value: string) => {
        if (elementRef.current) {
          elementRef.current.value = value;
        }
      },
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.variant = variant;
      element.size = size;
      element.type = type;
      if (value !== undefined) {
        element.value = value;
      }
      if (placeholder !== undefined) {
        element.placeholder = placeholder;
      }
      element.disabled = disabled;
      element.readonly = readonly;
      element.required = required;
      element.error = error;
      element.fullWidth = fullWidth;
      if (name !== undefined) {
        element.name = name;
      }
      if (autocomplete !== undefined) {
        element.setAttribute('autocomplete', autocomplete);
      }
      if (maxlength !== undefined) {
        element.setAttribute('maxlength', String(maxlength));
      }
      if (minlength !== undefined) {
        element.setAttribute('minlength', String(minlength));
      }
      if (pattern !== undefined) {
        element.setAttribute('pattern', pattern);
      }
      if (min !== undefined) {
        element.setAttribute('min', String(min));
      }
      if (max !== undefined) {
        element.setAttribute('max', String(max));
      }
      if (step !== undefined) {
        element.setAttribute('step', String(step));
      }
    }, [
      variant,
      size,
      type,
      value,
      placeholder,
      disabled,
      readonly,
      required,
      error,
      fullWidth,
      name,
      autocomplete,
      maxlength,
      minlength,
      pattern,
      min,
      max,
      step,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleInput = (e: Event) => {
        const customEvent = e as CustomEvent<{ value: string; originalEvent: Event }>;
        onInput?.(customEvent.detail.value, customEvent.detail.originalEvent);
      };

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ value: string; originalEvent: Event }>;
        onChange?.(customEvent.detail.value, customEvent.detail.originalEvent);
      };

      const handleFocus = (e: Event) => {
        const customEvent = e as CustomEvent<{ originalEvent: Event }>;
        onFocus?.(customEvent.detail.originalEvent);
      };

      const handleBlur = (e: Event) => {
        const customEvent = e as CustomEvent<{ originalEvent: Event }>;
        onBlur?.(customEvent.detail.originalEvent);
      };

      if (onInput) {
        element.addEventListener('input', handleInput);
      }
      if (onChange) {
        element.addEventListener('change', handleChange);
      }
      if (onFocus) {
        element.addEventListener('focus', handleFocus);
      }
      if (onBlur) {
        element.addEventListener('blur', handleBlur);
      }

      return () => {
        element.removeEventListener('input', handleInput);
        element.removeEventListener('change', handleChange);
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
      };
    }, [onInput, onChange, onFocus, onBlur]);

    return (
      <ha-input ref={elementRef} {...props}>
        {prefix && <span slot="prefix">{prefix}</span>}
        {suffix && <span slot="suffix">{suffix}</span>}
        {children}
      </ha-input>
    );
  }
);

Input.displayName = 'Input';

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-input': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
