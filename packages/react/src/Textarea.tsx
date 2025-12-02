import React, { forwardRef, useEffect, useRef } from "react";
import type { HaTextarea as HaTextareaElement } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface TextareaProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "onInput"> {
  /**
   * Textarea variant
   * @default "default"
   */
  variant?: "default" | "filled" | "outlined";

  /**
   * Textarea size
   * @default "md"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Textarea value
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
   * Number of rows
   * @default 3
   */
  rows?: number;

  /**
   * Resize behavior
   * @default "vertical"
   */
  resize?: "none" | "both" | "horizontal" | "vertical";

  /**
   * Textarea name
   */
  name?: string;

  /**
   * Maximum length
   */
  maxlength?: number;

  /**
   * Minimum length
   */
  minlength?: number;

  /**
   * Input event handler
   */
  onInput?: (value: string) => void;

  /**
   * Change event handler
   */
  onChange?: (value: string) => void;
}

/**
 * Textarea component
 *
 * A React wrapper for the `ha-textarea` web component.
 *
 * @example
 * ```tsx
 * <Textarea rows={4} placeholder="Enter your message..." />
 * ```
 */
export const Textarea = forwardRef<HTMLElement, TextareaProps>(
  (
    {
      variant = "default",
      size = "md",
      value,
      placeholder,
      disabled = false,
      readonly = false,
      required = false,
      error = false,
      rows = 3,
      resize = "vertical",
      name,
      maxlength,
      minlength,
      onInput,
      onChange,
      ...props
    },
    _ref,
  ) => {
    const elementRef = useRef<HaTextareaElement>(null);

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
      element.readonly = readonly;
      element.required = required;
      element.error = error;
      element.setAttribute("rows", rows.toString());
      element.resize = resize;
      if (name) {
        element.name = name;
      }
      if (maxlength !== undefined) {
        element.setAttribute("maxlength", maxlength.toString());
      }
      if (minlength !== undefined) {
        element.setAttribute("minlength", minlength.toString());
      }
    }, [
      variant,
      size,
      value,
      placeholder,
      disabled,
      readonly,
      required,
      error,
      rows,
      resize,
      name,
      maxlength,
      minlength,
    ]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleInput = (e: Event) => {
        const customEvent = e as CustomEvent<{ value: string }>;
        if (onInput) {
          onInput(customEvent.detail.value);
        }
      };

      const handleChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ value: string }>;
        if (onChange) {
          onChange(customEvent.detail.value);
        }
      };

      if (onInput) {
        element.addEventListener("input", handleInput);
      }
      if (onChange) {
        element.addEventListener("change", handleChange);
      }

      return () => {
        if (onInput) {
          element.removeEventListener("input", handleInput);
        }
        if (onChange) {
          element.removeEventListener("change", handleChange);
        }
      };
    }, [onInput, onChange]);

    return <ha-textarea ref={elementRef as any} {...props} />;
  },
);

Textarea.displayName = "Textarea";

// Add TypeScript support for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ha-textarea": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
