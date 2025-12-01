import React, { forwardRef, useEffect, useRef } from 'react';
import type { HaRadio as HaRadioElement } from '@hidearea-design/core';

// Import the web component
import '@hidearea-design/core';

export interface RadioProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * Radio size
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Checked state
   * @default false
   */
  checked?: boolean;

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
   * Radio name
   */
  name?: string;

  /**
   * Radio value
   */
  value?: string;

  /**
   * Label text
   */
  label?: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Custom label content
   */
  labelContent?: React.ReactNode;

  /**
   * Custom description content
   */
  descriptionContent?: React.ReactNode;

  /**
   * Change event handler
   */
  onChange?: (checked: boolean) => void;
}

/**
 * Radio component
 *
 * A React wrapper for the `ha-radio` web component.
 *
 * @example
 * ```tsx
 * <Radio name="option" value="1" label="Option 1" />
 * ```
 */
export const Radio = forwardRef<HTMLElement, RadioProps>(
  (
    {
      size = 'md',
      checked = false,
      disabled = false,
      required = false,
      error = false,
      name,
      value,
      label,
      description,
      labelContent,
      descriptionContent,
      onChange,
      ...props
    },
    _ref
  ) => {
    const elementRef = useRef<HaRadioElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set properties
      element.size = size;
      element.checked = checked;
      element.disabled = disabled;
      element.required = required;
      element.error = error;
      if (name) {
        element.name = name;
      }
      if (value) {
        element.value = value;
      }
      if (label) {
        element.label = label;
      }
      if (description) {
        element.description = description;
      }
    }, [size, checked, disabled, required, error, name, value, label, description]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onChange) return;

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ checked: boolean }>;
        onChange(customEvent.detail.checked);
      };

      element.addEventListener('change', handleChange);

      return () => {
        element.removeEventListener('change', handleChange);
      };
    }, [onChange]);

    return (
      <ha-radio
        ref={elementRef as any}
        {...props}
      >
        {labelContent && <span slot="label">{labelContent}</span>}
        {descriptionContent && <span slot="description">{descriptionContent}</span>}
      </ha-radio>
    );
  }
);

Radio.displayName = 'Radio';

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ha-radio': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
