import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import type { HaCheckbox as HaCheckboxElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onInput'> {
  /**
   * Checkbox size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Checked state
   * @default false
   */
  checked?: boolean;

  /**
   * Indeterminate state
   * @default false
   */
  indeterminate?: boolean;

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
   * Checkbox name
   */
  name?: string;

  /**
   * Checkbox value
   */
  value?: string;

  /**
   * Checkbox label
   */
  label?: string;

  /**
   * Checkbox description
   */
  description?: string;

  /**
   * Change event handler
   */
  onChange?: (checked: boolean, event: Event) => void;

  /**
   * Input event handler
   */
  onInput?: (checked: boolean, event: Event) => void;

  /**
   * Label content
   */
  children?: React.ReactNode;

  /**
   * Description content (alternative to description prop)
   */
  descriptionSlot?: React.ReactNode;
}

export interface CheckboxRef {
  focus: () => void;
  blur: () => void;
  checkValidity: () => boolean;
  reportValidity: () => boolean;
  setCustomValidity: (message: string) => void;
  getChecked: () => boolean;
  setChecked: (checked: boolean) => void;
  getIndeterminate: () => boolean;
  setIndeterminate: (indeterminate: boolean) => void;
}

/**
 * Checkbox component
 *
 * A React wrapper for the `ha-checkbox` web component.
 *
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onChange={(checked) => setIsChecked(checked)}
 * >
 *   Accept terms and conditions
 * </Checkbox>
 * ```
 */
export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  (
    {
      size = 'md',
      checked = false,
      indeterminate = false,
      disabled = false,
      required = false,
      error = false,
      name,
      value,
      label,
      description,
      onChange,
      onInput,
      children,
      descriptionSlot,
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HaCheckboxElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
      checkValidity: () => elementRef.current?.checkValidity() ?? false,
      reportValidity: () => elementRef.current?.reportValidity() ?? false,
      setCustomValidity: (message: string) => elementRef.current?.setCustomValidity(message),
      getChecked: () => elementRef.current?.checked ?? false,
      setChecked: (checked: boolean) => {
        if (elementRef.current) {
          elementRef.current.checked = checked;
        }
      },
      getIndeterminate: () => elementRef.current?.indeterminate ?? false,
      setIndeterminate: (indeterminate: boolean) => {
        if (elementRef.current) {
          elementRef.current.indeterminate = indeterminate;
        }
      },
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.size = size;
      element.checked = checked;
      element.indeterminate = indeterminate;
      element.disabled = disabled;
      element.required = required;
      element.error = error;
      if (name !== undefined) {
        element.name = name;
      }
      if (value !== undefined) {
        element.value = value;
      }
      if (label !== undefined) {
        element.setAttribute('label', label);
      }
      if (description !== undefined) {
        element.setAttribute('description', description);
      }
    }, [size, checked, indeterminate, disabled, required, error, name, value, label, description]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ checked: boolean; originalEvent: Event }>;
        onChange?.(customEvent.detail.checked, customEvent.detail.originalEvent);
      };

      const handleInput = (e: Event) => {
        const customEvent = e as CustomEvent<{ checked: boolean; originalEvent: Event }>;
        onInput?.(customEvent.detail.checked, customEvent.detail.originalEvent);
      };

      if (onChange) {
        element.addEventListener('change', handleChange);
      }
      if (onInput) {
        element.addEventListener('input', handleInput);
      }

      return () => {
        element.removeEventListener('change', handleChange);
        element.removeEventListener('input', handleInput);
      };
    }, [onChange, onInput]);

    return (
      <ha-checkbox ref={elementRef} {...props}>
        {children}
        {descriptionSlot && <span slot="description">{descriptionSlot}</span>}
      </ha-checkbox>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-checkbox': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
