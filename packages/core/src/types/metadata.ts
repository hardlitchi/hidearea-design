/**
 * Component Metadata Types
 * Shared types for component metadata used by MCP server
 */

export interface ComponentMetadata {
  name: string;
  tagName: string;
  description: string;
  category: ComponentCategory;
  props: ComponentProp[];
  events: ComponentEvent[];
  slots?: ComponentSlot[];
  cssVariables?: CSSVariable[];
  examples: ComponentExample[];
  accessibility: AccessibilityInfo;
  tokens: TokenUsage;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  required: boolean;
  description: string;
}

export interface ComponentEvent {
  name: string;
  detail: string;
  description: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface CSSVariable {
  name: string;
  default: string;
  description: string;
}

export interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

export interface AccessibilityInfo {
  roles: string[];
  keyboardSupport: string[];
  ariaAttributes: string[];
}

export interface TokenUsage {
  colors: string[];
  spacing: string[];
  typography: string[];
  other: string[];
}

export type ComponentCategory =
  | 'Form Controls'
  | 'Data Display'
  | 'Feedback'
  | 'Navigation'
  | 'Layout'
  | 'Overlay';
