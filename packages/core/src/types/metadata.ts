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
  htmlConverter?: HTMLConverter;
}

export interface HTMLConverter {
  /**
   * HTML patterns this converter can handle
   * Examples: ['<button', '<input type="button"']
   */
  patterns: string[];

  /**
   * Convert HTML to Hidearea component
   * @param match - The matched HTML string
   * @param attributes - Parsed HTML attributes
   * @param content - Inner HTML content
   * @returns Converted component HTML
   */
  convert: (match: string, attributes: Record<string, string>, content: string) => string;
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
  | 'Overlay'
  | 'Utility';
