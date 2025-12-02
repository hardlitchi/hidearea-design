import React, { forwardRef, useEffect, useRef } from "react";
import type { HaSwitch as HaSwitchElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Switch size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

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
   * Switch name
   */
  name?: string;

  /**
   * Switch value
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
 * Switch component
 *
 * A React wrapper for the `ha-switch` web component.
 *
 * @example
 * ```tsx
 * <Switch checked label="Enable notifications" />
 * ```
 */
export const Switch = forwardRef<HTMLElement, SwitchProps>(
  (
    {
      size = "md",
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
    _ref,
  ) => {
    const elementRef = useRef<HaSwitchElement>(null);

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
    }, [
      size,
      checked,
      disabled,
      required,
      error,
      name,
      value,
      label,
      description,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !onChange) return;

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ checked: boolean }>;
        onChange(customEvent.detail.checked);
      };

      element.addEventListener("change", handleChange);

      return () => {
        element.removeEventListener("change", handleChange);
      };
    }, [onChange]);

    return (
      <ha-switch ref={elementRef as any} {...props}>
        {labelContent && <span slot="label">{labelContent}</span>}
        {descriptionContent && (
          <span slot="description">{descriptionContent}</span>
        )}
      </ha-switch>
    );
  },
);

Switch.displayName = "Switch";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-switch": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
