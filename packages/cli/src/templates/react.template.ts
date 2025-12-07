export const reactTemplate = (PascalName: string, kebabName: string) => `import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import type { Ha${PascalName} as Ha${PascalName}Element } from "@hidearea-design/core";

// Import the web component
import "@hidearea-design/core";

export interface ${PascalName}Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * Component variant
   * @default "default"
   */
  variant?: string;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Content
   */
  children?: React.ReactNode;
}

export interface ${PascalName}Ref {
  focus: () => void;
  blur: () => void;
}

/**
 * ${PascalName} component (React wrapper)
 */
export const ${PascalName} = forwardRef<${PascalName}Ref, ${PascalName}Props>(
  ({ variant = "default", disabled = false, children, ...props }, ref) => {
    const elementRef = useRef<Ha${PascalName}Element>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Sync props to element
      element.variant = variant;
      element.disabled = disabled;
    }, [variant, disabled]);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      blur: () => elementRef.current?.blur(),
    }));

    return React.createElement(
      "ha-${kebabName}",
      {
        ref: elementRef,
        ...props,
      },
      children
    );
  }
);

${PascalName}.displayName = "${PascalName}";
`;
