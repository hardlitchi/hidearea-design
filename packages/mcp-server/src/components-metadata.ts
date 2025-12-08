/**
 * Component Metadata
 * Structured information about all Hidearea Design System components
 */

export interface ComponentMetadata {
  name: string;
  tagName: string;
  description: string;
  category: string;
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

export const COMPONENTS: ComponentMetadata[] = [
  {
    name: "Button",
    tagName: "ha-button",
    description: "A customizable button component with multiple variants and sizes",
    category: "Form Controls",
    props: [
      { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'", default: "'primary'", required: false, description: "Visual style variant" },
      { name: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", required: false, description: "Button size" },
      { name: "disabled", type: "boolean", default: "false", required: false, description: "Disables the button" },
      { name: "loading", type: "boolean", default: "false", required: false, description: "Shows loading state" },
      { name: "fullWidth", type: "boolean", default: "false", required: false, description: "Makes button full width" },
    ],
    events: [
      { name: "ha-click", detail: "{ originalEvent: MouseEvent }", description: "Emitted when button is clicked" },
    ],
    slots: [
      { name: "default", description: "Button content" },
      { name: "prefix", description: "Content before button text (e.g., icon)" },
      { name: "suffix", description: "Content after button text" },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "Simple button with text",
        code: `<ha-button>Click me</ha-button>`,
      },
      {
        title: "With Variant",
        description: "Different button styles",
        code: `<ha-button variant="primary">Primary</ha-button>
<ha-button variant="secondary">Secondary</ha-button>
<ha-button variant="outline">Outline</ha-button>`,
      },
      {
        title: "With Icon",
        description: "Button with icon prefix",
        code: `<ha-button>
  <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"/>
  </svg>
  Star
</ha-button>`,
      },
    ],
    accessibility: {
      roles: ["button"],
      keyboardSupport: ["Enter - Activates button", "Space - Activates button"],
      ariaAttributes: ["aria-disabled", "aria-pressed (for toggle buttons)"],
    },
    tokens: {
      colors: ["component-button-primary-background", "component-button-primary-text", "component-button-primary-border"],
      spacing: ["spacing-sm", "spacing-md", "spacing-lg"],
      typography: ["text-body-default-fontSize", "font-weight-medium"],
      other: ["border-radius-md", "interaction-transition-fast-duration"],
    },
  },
  {
    name: "Input",
    tagName: "ha-input",
    description: "Text input field with validation and various types",
    category: "Form Controls",
    props: [
      { name: "type", type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", default: "'text'", required: false, description: "Input type" },
      { name: "value", type: "string", default: "''", required: false, description: "Input value" },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text" },
      { name: "disabled", type: "boolean", default: "false", required: false, description: "Disables the input" },
      { name: "readonly", type: "boolean", default: "false", required: false, description: "Makes input read-only" },
      { name: "required", type: "boolean", default: "false", required: false, description: "Makes input required" },
      { name: "error", type: "boolean", default: "false", required: false, description: "Shows error state" },
      { name: "label", type: "string", required: false, description: "Input label" },
      { name: "description", type: "string", required: false, description: "Help text" },
      { name: "errorMessage", type: "string", required: false, description: "Error message to display" },
    ],
    events: [
      { name: "ha-input", detail: "{ value: string }", description: "Emitted on input" },
      { name: "ha-change", detail: "{ value: string }", description: "Emitted on change (blur)" },
      { name: "ha-focus", detail: "{}", description: "Emitted on focus" },
      { name: "ha-blur", detail: "{}", description: "Emitted on blur" },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "Simple text input",
        code: `<ha-input label="Name" placeholder="Enter your name"></ha-input>`,
      },
      {
        title: "With Validation",
        description: "Input with error state",
        code: `<ha-input
  label="Email"
  type="email"
  error
  errorMessage="Please enter a valid email"
></ha-input>`,
      },
    ],
    accessibility: {
      roles: ["textbox"],
      keyboardSupport: ["Standard text input keyboard shortcuts"],
      ariaAttributes: ["aria-label", "aria-describedby", "aria-invalid", "aria-required"],
    },
    tokens: {
      colors: ["component-input-background", "component-input-border", "component-input-text"],
      spacing: ["spacing-sm", "spacing-md"],
      typography: ["text-body-default-fontSize"],
      other: ["border-radius-md", "state-focus-ring-color"],
    },
  },
  {
    name: "Card",
    tagName: "ha-card",
    description: "Container component for grouping related content",
    category: "Layout",
    props: [
      { name: "variant", type: "'filled' | 'outlined' | 'elevated'", default: "'filled'", required: false, description: "Card style variant" },
      { name: "padding", type: "'none' | 'small' | 'medium' | 'large'", default: "'medium'", required: false, description: "Internal padding" },
      { name: "hoverable", type: "boolean", default: "false", required: false, description: "Adds hover effect" },
    ],
    events: [],
    slots: [
      { name: "default", description: "Card content" },
      { name: "header", description: "Card header content" },
      { name: "footer", description: "Card footer content" },
    ],
    examples: [
      {
        title: "Basic Card",
        description: "Simple card with content",
        code: `<ha-card>
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  <p>Card content goes here</p>
  <div slot="footer">
    <ha-button variant="primary">Action</ha-button>
  </div>
</ha-card>`,
      },
    ],
    accessibility: {
      roles: ["article", "region"],
      keyboardSupport: [],
      ariaAttributes: ["aria-labelledby", "aria-describedby"],
    },
    tokens: {
      colors: ["component-card-background", "component-card-border"],
      spacing: ["spacing-md", "spacing-lg"],
      typography: [],
      other: ["border-radius-lg", "surface-raised-elevation"],
    },
  },
];

export const COMPONENT_CATEGORIES = [
  "Form Controls",
  "Data Display",
  "Feedback",
  "Navigation",
  "Layout",
  "Overlay",
] as const;

export function findComponent(query: string): ComponentMetadata | undefined {
  const lowerQuery = query.toLowerCase();
  return COMPONENTS.find(
    (c) =>
      c.name.toLowerCase() === lowerQuery ||
      c.tagName.toLowerCase() === lowerQuery ||
      c.description.toLowerCase().includes(lowerQuery)
  );
}

export function searchComponents(query: string): ComponentMetadata[] {
  const lowerQuery = query.toLowerCase();
  return COMPONENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.tagName.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery)
  );
}

export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return COMPONENTS.filter((c) => c.category === category);
}
