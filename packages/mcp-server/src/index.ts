#!/usr/bin/env node

/**
 * Hidearea Design System MCP Server
 *
 * Provides AI-powered assistance for using Hidearea Design System components
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
  ALL_COMPONENT_METADATA,
  findComponentMetadata,
  searchComponentMetadata,
  getComponentMetadataByCategory,
} from "@hidearea-design/core/metadata";
import type { ComponentCategory, ComponentMetadata, ComponentExample } from "@hidearea-design/core/types/metadata";

// Component categories
const COMPONENT_CATEGORIES: ComponentCategory[] = [
  "Form Controls",
  "Data Display",
  "Feedback",
  "Navigation",
  "Layout",
  "Overlay",
  "Utility",
];

// Create MCP server instance
const server = new Server(
  {
    name: "@hidearea-design/mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

//
// RESOURCES
//

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "hidearea://components/list",
        name: "Component List",
        description: "List of all available Hidearea Design System components",
        mimeType: "application/json",
      },
      {
        uri: "hidearea://components/categories",
        name: "Component Categories",
        description: "List of component categories",
        mimeType: "application/json",
      },
      {
        uri: "hidearea://tokens/semantic",
        name: "Semantic Tokens",
        description: "Available semantic design tokens",
        mimeType: "application/json",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri.toString();

  if (uri === "hidearea://components/list") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            ALL_COMPONENT_METADATA.map((c: ComponentMetadata) => ({
              name: c.name,
              tagName: c.tagName,
              description: c.description,
              category: c.category,
            })),
            null,
            2
          ),
        },
      ],
    };
  }

  if (uri === "hidearea://components/categories") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              categories: COMPONENT_CATEGORIES,
              componentsByCategory: Object.fromEntries(
                COMPONENT_CATEGORIES.map((cat) => [
                  cat,
                  getComponentMetadataByCategory(cat).map((c: ComponentMetadata) => ({
                    name: c.name,
                    tagName: c.tagName,
                  })),
                ])
              ),
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (uri === "hidearea://tokens/semantic") {
    // Dynamically generate component tokens from component metadata
    const componentTokens: Record<string, { colors: string[]; spacing: string[]; typography: string[]; other: string[] }> = {};

    for (const comp of ALL_COMPONENT_METADATA) {
      if (comp.tokens) {
        componentTokens[comp.name.toLowerCase()] = {
          colors: comp.tokens.colors || [],
          spacing: comp.tokens.spacing || [],
          typography: comp.tokens.typography || [],
          other: comp.tokens.other || [],
        };
      }
    }

    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              component: componentTokens,
              state: {
                focus: ["state-focus-ring-color", "state-focus-ring-width", "state-focus-ring-offset"],
                hover: ["state-hover-overlay", "state-hover-background"],
                disabled: ["state-disabled-opacity", "state-disabled-cursor"],
                active: ["state-active-background", "state-active-scale"],
              },
              surface: {
                levels: ["surface-base-background", "surface-raised-background", "surface-overlay-background", "surface-sunken-background"],
                elevation: ["surface-card-elevation", "surface-modal-elevation", "surface-overlay-elevation"],
              },
              interaction: {
                transition: ["interaction-transition-fast-duration", "interaction-transition-normal-duration", "interaction-transition-slow-duration"],
              },
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

//
// TOOLS
//

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_components",
        description: "Search for components by name, description, or category",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query (component name, tag, or description)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_component_details",
        description: "Get detailed information about a specific component",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Component name or tag name (e.g., 'Button' or 'ha-button')",
            },
          },
          required: ["component"],
        },
      },
      {
        name: "get_usage_example",
        description: "Get usage examples for a component",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Component name",
            },
            variant: {
              type: "string",
              description: "Optional: specific variant or use case",
            },
          },
          required: ["component"],
        },
      },
      {
        name: "suggest_semantic_tokens",
        description: "Suggest appropriate semantic tokens for a given style property",
        inputSchema: {
          type: "object",
          properties: {
            property: {
              type: "string",
              description: "CSS property (e.g., 'background-color', 'padding', 'font-size')",
            },
            context: {
              type: "string",
              description: "Optional: context or component type",
            },
          },
          required: ["property"],
        },
      },
      {
        name: "convert_html_to_components",
        description: "Convert plain HTML to Hidearea Design System components",
        inputSchema: {
          type: "object",
          properties: {
            html: {
              type: "string",
              description: "HTML code to convert",
            },
          },
          required: ["html"],
        },
      },
      {
        name: "validate_component_usage",
        description: "Validate component props, events, and usage patterns",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Component name or tag name",
            },
            props: {
              type: "object",
              description: "Props to validate (key-value pairs)",
            },
          },
          required: ["component", "props"],
        },
      },
      {
        name: "get_accessibility_guidance",
        description: "Get accessibility best practices and ARIA guidance for a component",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Component name",
            },
            scenario: {
              type: "string",
              description: "Optional: specific use case or scenario",
            },
          },
          required: ["component"],
        },
      },
      {
        name: "check_token_compatibility",
        description: "Check color contrast and token compatibility for accessibility",
        inputSchema: {
          type: "object",
          properties: {
            background: {
              type: "string",
              description: "Background color token",
            },
            foreground: {
              type: "string",
              description: "Foreground/text color token",
            },
          },
          required: ["background", "foreground"],
        },
      },
      {
        name: "get_related_components",
        description: "Get components that are commonly used together with a specific component",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Component name",
            },
          },
          required: ["component"],
        },
      },
      {
        name: "compare_components",
        description: "Compare two or more components to understand their differences and use cases",
        inputSchema: {
          type: "object",
          properties: {
            components: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Array of component names to compare (2-4 components)",
            },
          },
          required: ["components"],
        },
      },
      {
        name: "suggest_layout",
        description: "Suggest appropriate layout components based on content description",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "Description of the content to be laid out",
            },
            constraints: {
              type: "string",
              description: "Optional: Any layout constraints (e.g., 'mobile-first', 'responsive')",
            },
          },
          required: ["content"],
        },
      },
      {
        name: "generate_form",
        description: "Generate a complete form with validation based on field descriptions",
        inputSchema: {
          type: "object",
          properties: {
            fields: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "Field name",
                  },
                  type: {
                    type: "string",
                    description: "Field type (text, email, password, number, date, select, checkbox, textarea)",
                  },
                  label: {
                    type: "string",
                    description: "Field label",
                  },
                  required: {
                    type: "boolean",
                    description: "Whether field is required",
                  },
                  options: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                    description: "Options for select fields",
                  },
                },
                required: ["name", "type", "label"],
              },
              description: "Array of field definitions",
            },
            submitLabel: {
              type: "string",
              description: "Submit button label (default: 'Submit')",
            },
          },
          required: ["fields"],
        },
      },
      {
        name: "get_theme_tokens",
        description: "Get theme-specific design tokens for customization",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Token category (colors, spacing, typography, effects, all)",
            },
            component: {
              type: "string",
              description: "Optional: Filter tokens for a specific component",
            },
          },
          required: ["category"],
        },
      },
      {
        name: "get_migration_guide",
        description: "Get migration guidance for upgrading between versions",
        inputSchema: {
          type: "object",
          properties: {
            fromVersion: {
              type: "string",
              description: "Current version (e.g., '1.0.0')",
            },
            toVersion: {
              type: "string",
              description: "Target version (e.g., '2.0.0')",
            },
            component: {
              type: "string",
              description: "Optional: Get migration guide for specific component",
            },
          },
          required: ["fromVersion", "toVersion"],
        },
      },
      {
        name: "generate_storybook_story",
        description: "Generate Storybook story code for a component",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Component name",
            },
            variants: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Optional: Specific variants to include",
            },
          },
          required: ["component"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_components": {
      const { query } = args as { query: string };
      const results = searchComponentMetadata(query);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                query,
                count: results.length,
                results: results.map((c: ComponentMetadata) => ({
                  name: c.name,
                  tagName: c.tagName,
                  description: c.description,
                  category: c.category,
                })),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_component_details": {
      const { component } = args as { component: string };
      const comp = findComponentMetadata(component);

      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${component}" not found. Try searching with: search_components`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(comp, null, 2),
          },
        ],
      };
    }

    case "get_usage_example": {
      const { component, variant } = args as { component: string; variant?: string };
      const comp = findComponentMetadata(component);

      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${component}" not found.`,
            },
          ],
        };
      }

      const examples = variant
        ? comp.examples.filter((e: ComponentExample) => e.title.toLowerCase().includes(variant.toLowerCase()))
        : comp.examples;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                component: comp.name,
                tagName: comp.tagName,
                examples,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "suggest_semantic_tokens": {
      const { property, context } = args as { property: string; context?: string };

      const suggestions: Record<string, string[]> = {
        "background-color": [
          "component-button-primary-background-default",
          "component-card-background-default",
          "surface-base-background",
        ],
        color: ["component-button-primary-text-default", "text-body-default-color"],
        padding: ["spacing-sm", "spacing-md", "spacing-lg"],
        margin: ["spacing-xs", "spacing-sm", "spacing-md"],
        "font-size": [
          "text-body-default-fontSize",
          "text-heading-h1-fontSize",
          "font-size-base",
        ],
        "font-weight": ["font-weight-normal", "font-weight-medium", "font-weight-bold"],
        "border-radius": ["border-radius-sm", "border-radius-md", "border-radius-lg"],
        "box-shadow": ["surface-raised-elevation", "surface-overlay-elevation"],
      };

      const tokens = suggestions[property.toLowerCase()] || [];

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                property,
                context,
                suggestions: tokens,
                usage: tokens.map((token) => `var(--${token})`),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "convert_html_to_components": {
      const { html } = args as { html: string };

      let converted = html;
      const conversions: string[] = [];

      // Helper function to parse HTML attributes
      const parseAttributes = (attrString: string): Record<string, string> => {
        const attrs: Record<string, string> = {};
        const attrRegex = /(\w+)(?:="([^"]*)")?/g;
        let match;
        while ((match = attrRegex.exec(attrString)) !== null) {
          attrs[match[1]] = match[2] || '';
        }
        return attrs;
      };

      // Get all components with converters
      const componentsWithConverters = ALL_COMPONENT_METADATA.filter((c: ComponentMetadata) => c.htmlConverter);

      // Helper function to create regex from pattern
      const createRegex = (pattern: string): RegExp | null => {
        // Extract tag name from pattern
        const tagMatch = pattern.match(/<(\w+)/);
        if (!tagMatch) return null;

        const tag = tagMatch[1];

        // Self-closing tags (input, img, br, hr, etc.)
        const selfClosingTags = ['input', 'img', 'br', 'hr', 'progress'];
        if (selfClosingTags.includes(tag)) {
          // Match any attributes that appear in the pattern
          if (pattern.includes('type=')) {
            const typeMatch = pattern.match(/type="([^"]*)"/);
            if (typeMatch) {
              return new RegExp(`<${tag}([^>]*type="${typeMatch[1]}"[^>]*)>`, 'gi');
            }
          }
          if (pattern.includes('role=')) {
            const roleMatch = pattern.match(/role="([^"]*)"/);
            if (roleMatch) {
              return new RegExp(`<${tag}([^>]*role="${roleMatch[1]}"[^>]*)>`, 'gi');
            }
          }
          return new RegExp(`<${tag}([^>]*)>`, 'gi');
        }

        // Paired tags (div, button, etc.)
        // Handle patterns with role or class attributes
        if (pattern.includes('role="')) {
          const roleMatch = pattern.match(/role="([^"]*)"/);
          if (roleMatch) {
            return new RegExp(`<${tag}([^>]*role="${roleMatch[1]}"[^>]*)>(.*?)<\/${tag}>`, 'gis');
          }
        }
        if (pattern.includes('class="')) {
          const classMatch = pattern.match(/class="([^"]*)"/);
          if (classMatch) {
            return new RegExp(`<${tag}([^>]*class="[^"]*${classMatch[1]}[^"]*"[^>]*)>(.*?)<\/${tag}>`, 'gis');
          }
        }
        if (pattern.includes('aria-label')) {
          return new RegExp(`<${tag}([^>]*aria-label[^>]*)>(.*?)<\/${tag}>`, 'gis');
        }

        // Default: match tag with any attributes and content
        return new RegExp(`<${tag}([^>]*)>(.*?)<\/${tag}>`, 'gis');
      };

      // Build conversion patterns for each component
      for (const comp of componentsWithConverters) {
        if (!comp.htmlConverter) continue;

        for (const pattern of comp.htmlConverter.patterns) {
          const regex = createRegex(pattern);
          if (!regex) continue;

          converted = converted.replace(regex, (match, attrs, content = '') => {
            const attributes = parseAttributes(attrs);
            const result = comp.htmlConverter!.convert(match, attributes, content);
            conversions.push(`${comp.name}: ${match.substring(0, 50)}...`);
            return result;
          });
        }
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                original: html,
                converted,
                conversions: conversions.length,
                componentsUsed: [...new Set(conversions.map(c => c.split(':')[0]))],
                note: "Converted using component-specific converters. Manual adjustments may be needed for complex cases.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "validate_component_usage": {
      const { component, props } = args as { component: string; props: Record<string, any> };
      const comp = findComponentMetadata(component);

      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  valid: false,
                  errors: [`Component '${component}' not found`],
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const errors: string[] = [];
      const warnings: string[] = [];

      // Validate each provided prop
      for (const [propName, propValue] of Object.entries(props)) {
        const propDef = comp.props.find((p) => p.name === propName);

        if (!propDef) {
          warnings.push(`Prop '${propName}' is not defined for ${comp.name}`);
          continue;
        }

        // Check required props
        if (propDef.required && (propValue === undefined || propValue === null)) {
          errors.push(`Required prop '${propName}' is missing`);
        }

        // Type validation for specific patterns
        if (propDef.type.includes("|")) {
          // Union type - check if value is one of the options
          const validValues = propDef.type
            .split("|")
            .map((v) => v.trim().replace(/'/g, ""));

          if (!validValues.includes(String(propValue))) {
            errors.push(
              `Invalid value '${propValue}' for prop '${propName}'. Valid values: ${validValues.join(", ")}`
            );
          }
        }

        // Boolean validation
        if (propDef.type === "boolean" && typeof propValue !== "boolean") {
          warnings.push(`Prop '${propName}' expects boolean, got ${typeof propValue}`);
        }

        // Number validation
        if (propDef.type === "number" && typeof propValue !== "number") {
          warnings.push(`Prop '${propName}' expects number, got ${typeof propValue}`);
        }
      }

      // Check for missing required props
      for (const propDef of comp.props) {
        if (propDef.required && !(propDef.name in props)) {
          errors.push(`Required prop '${propDef.name}' is missing`);
        }
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                component: comp.name,
                valid: errors.length === 0,
                errors,
                warnings,
                validatedProps: Object.keys(props),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_accessibility_guidance": {
      const { component, scenario } = args as { component: string; scenario?: string };
      const comp = findComponentMetadata(component);

      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: `Component '${component}' not found`,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const guidance = {
        component: comp.name,
        scenario: scenario || "general usage",
        roles: comp.accessibility.roles,
        keyboardSupport: comp.accessibility.keyboardSupport,
        ariaAttributes: comp.accessibility.ariaAttributes,
        bestPractices: [] as string[],
        wcagGuidelines: [] as string[],
      };

      // Add specific guidance based on component type
      if (comp.category === "Form Controls") {
        guidance.bestPractices.push(
          "Always provide visible labels or aria-label",
          "Ensure focus indicators are visible",
          "Provide clear error messages with aria-describedby"
        );
        guidance.wcagGuidelines.push(
          "WCAG 3.3.2: Labels or Instructions",
          "WCAG 2.4.7: Focus Visible",
          "WCAG 3.3.1: Error Identification"
        );
      }

      if (comp.category === "Overlay") {
        guidance.bestPractices.push(
          "Trap focus within the overlay when open",
          "Return focus to trigger element on close",
          "Support Escape key to close",
          "Use aria-modal for modal dialogs"
        );
        guidance.wcagGuidelines.push(
          "WCAG 2.4.3: Focus Order",
          "WCAG 2.1.2: No Keyboard Trap"
        );
      }

      if (comp.category === "Navigation") {
        guidance.bestPractices.push(
          "Use semantic navigation landmarks",
          "Provide skip links for keyboard users",
          "Indicate current page/location with aria-current"
        );
        guidance.wcagGuidelines.push(
          "WCAG 2.4.1: Bypass Blocks",
          "WCAG 2.4.8: Location"
        );
      }

      if (comp.name === "Button" && scenario?.includes("icon")) {
        guidance.bestPractices.push(
          "Icon-only buttons must have aria-label",
          "Consider adding a tooltip for clarification"
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(guidance, null, 2),
          },
        ],
      };
    }

    case "check_token_compatibility": {
      const { background, foreground } = args as { background: string; foreground: string };

      // Simplified contrast checking (in real implementation, would calculate actual contrast ratios)
      const contrastChecks = {
        background,
        foreground,
        compatibility: "unknown" as "good" | "warning" | "poor" | "unknown",
        contrastRatio: "Unable to calculate (needs actual color values)" as string,
        wcagAA: "unknown" as "pass" | "fail" | "unknown",
        wcagAAA: "unknown" as "pass" | "fail" | "unknown",
        recommendations: [] as string[],
      };

      // Pattern-based heuristics
      const bgIsLight = background.includes("50") || background.includes("100") || background.includes("white");
      const fgIsLight = foreground.includes("50") || foreground.includes("100") || foreground.includes("white");
      const bgIsDark = background.includes("900") || background.includes("950") || background.includes("black");
      const fgIsDark = foreground.includes("900") || foreground.includes("950") || foreground.includes("black");

      if ((bgIsLight && fgIsDark) || (bgIsDark && fgIsLight)) {
        contrastChecks.compatibility = "good";
        contrastChecks.contrastRatio = "Estimated: High (>7:1)";
        contrastChecks.wcagAA = "pass";
        contrastChecks.wcagAAA = "pass";
        contrastChecks.recommendations.push("Good contrast combination");
      } else if ((bgIsLight && fgIsLight) || (bgIsDark && fgIsDark)) {
        contrastChecks.compatibility = "poor";
        contrastChecks.contrastRatio = "Estimated: Low (<3:1)";
        contrastChecks.wcagAA = "fail";
        contrastChecks.wcagAAA = "fail";
        contrastChecks.recommendations.push(
          "Low contrast detected",
          `Consider using darker text if background is '${background}'`,
          "Ensure minimum 4.5:1 ratio for normal text (WCAG AA)",
          "Ensure minimum 7:1 ratio for normal text (WCAG AAA)"
        );
      } else {
        contrastChecks.compatibility = "warning";
        contrastChecks.contrastRatio = "Estimated: Medium (3-7:1)";
        contrastChecks.wcagAA = "unknown";
        contrastChecks.wcagAAA = "fail";
        contrastChecks.recommendations.push(
          "Contrast may be borderline",
          "Test with actual color values",
          "Consider increasing contrast for better readability"
        );
      }

      contrastChecks.recommendations.push(
        "Note: This is a heuristic check. Use actual color values for precise contrast calculation.",
        "Tools: https://webaim.org/resources/contrastchecker/"
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(contrastChecks, null, 2),
          },
        ],
      };
    }

    case "get_related_components": {
      const { component } = args as { component: string };
      const comp = findComponentMetadata(component);

      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: `Component '${component}' not found`,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Define common component relationships
      const relationships: Record<string, { related: string[]; reason: string }[]> = {
        Modal: [
          { related: ["Button"], reason: "For action buttons in modal footer" },
          { related: ["FormGroup", "Input"], reason: "For forms within modals" },
          { related: ["Alert"], reason: "For displaying warnings or errors" },
        ],
        Drawer: [
          { related: ["Button"], reason: "For trigger and action buttons" },
          { related: ["List", "Menu"], reason: "Common content for navigation drawers" },
        ],
        Form: [
          { related: ["FormGroup"], reason: "For organizing form fields" },
          { related: ["Input", "Select", "Textarea", "Checkbox", "Radio"], reason: "Form input controls" },
          { related: ["Button"], reason: "For submit and cancel actions" },
          { related: ["Alert"], reason: "For form-level error messages" },
        ],
        Table: [
          { related: ["Pagination"], reason: "For paginating table data" },
          { related: ["Badge"], reason: "For status indicators in cells" },
          { related: ["Button"], reason: "For row actions" },
          { related: ["Checkbox"], reason: "For row selection" },
        ],
        Card: [
          { related: ["Button"], reason: "For card actions" },
          { related: ["Badge"], reason: "For status or category indicators" },
          { related: ["Avatar"], reason: "For user or entity representation" },
        ],
        DataGrid: [
          { related: ["Pagination"], reason: "For navigating large datasets" },
          { related: ["Select", "Input"], reason: "For filtering data" },
          { related: ["Button"], reason: "For bulk actions" },
        ],
      };

      // Get category-based recommendations
      const categoryRelated: string[] = [];
      if (comp.category === "Form Controls") {
        categoryRelated.push("FormGroup", "Button", "Alert");
      } else if (comp.category === "Overlay") {
        categoryRelated.push("Button");
      } else if (comp.category === "Data Display") {
        categoryRelated.push("Pagination", "Badge", "Spinner");
      }

      const specific = relationships[comp.name] || [];
      const result = {
        component: comp.name,
        category: comp.category,
        relatedComponents: specific,
        categoryRecommendations: categoryRelated.filter(
          (c) => !specific.some((s) => s.related.includes(c))
        ),
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case "compare_components": {
      const { components } = args as { components: string[] };

      if (components.length < 2) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: "At least 2 components are required for comparison",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const componentData = components.map((name) => {
        const comp = findComponentMetadata(name);
        if (!comp) {
          return { name, found: false };
        }
        return {
          name: comp.name,
          tagName: comp.tagName,
          category: comp.category,
          description: comp.description,
          propsCount: comp.props.length,
          eventsCount: comp.events.length,
          slotsCount: comp.slots?.length || 0,
          found: true,
        };
      });

      const notFound = componentData.filter((c) => !c.found);
      if (notFound.length > 0) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: `Components not found: ${notFound.map((c) => c.name).join(", ")}`,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Add specific comparisons for common pairs
      const insights: string[] = [];
      const componentNames = components.map((c) => c.toLowerCase());

      if (componentNames.includes("modal") && componentNames.includes("drawer")) {
        insights.push(
          "Modal: Center-screen overlay, blocks interaction with page, best for critical decisions",
          "Drawer: Side panel, can allow page interaction, best for navigation or secondary content"
        );
      }

      if (componentNames.includes("button") && componentNames.includes("link")) {
        insights.push(
          "Button: For actions (submit, save, delete), triggers JavaScript events",
          "Link: For navigation, changes URL, semantic <a> tag"
        );
      }

      if (componentNames.includes("select") && componentNames.includes("radio")) {
        insights.push(
          "Select: Compact, good for 5+ options, hides options until opened",
          "Radio: Shows all options, better for 2-5 options, easier to scan"
        );
      }

      if (componentNames.includes("checkbox") && componentNames.includes("switch")) {
        insights.push(
          "Checkbox: For selecting items from a list, multiple selections",
          "Switch: For on/off states, immediate effect, single toggle"
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                components: componentData,
                insights: insights.length > 0 ? insights : ["No specific insights for this combination"],
                recommendation: "Choose based on user context and interaction patterns",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "suggest_layout": {
      const { content, constraints } = args as { content: string; constraints?: string };

      const suggestions: any = {
        content,
        constraints: constraints || "none specified",
        recommendations: [],
      };

      const lowerContent = content.toLowerCase();

      // Detect layout patterns
      if (lowerContent.includes("grid") || lowerContent.includes("cards") || lowerContent.includes("gallery")) {
        suggestions.recommendations.push({
          component: "Grid",
          reason: "Perfect for card layouts and responsive galleries",
          example: `<ha-grid columns="3" gap="md">
  <ha-card>Item 1</ha-card>
  <ha-card>Item 2</ha-card>
  <ha-card>Item 3</ha-card>
</ha-grid>`,
        });
      }

      if (lowerContent.includes("list") || lowerContent.includes("items") || lowerContent.includes("menu")) {
        suggestions.recommendations.push({
          component: "Stack",
          reason: "Ideal for vertical lists with consistent spacing",
          example: `<ha-stack direction="vertical" gap="sm">
  <ha-list-item>Item 1</ha-list-item>
  <ha-list-item>Item 2</ha-list-item>
</ha-stack>`,
        });
      }

      if (lowerContent.includes("form") || lowerContent.includes("input")) {
        suggestions.recommendations.push({
          component: "Stack + FormGroup",
          reason: "Forms need vertical stacking with proper field grouping",
          example: `<ha-stack direction="vertical" gap="md">
  <ha-form-group label="Name" required>
    <ha-input></ha-input>
  </ha-form-group>
  <ha-form-group label="Email">
    <ha-input type="email"></ha-input>
  </ha-form-group>
</ha-stack>`,
        });
      }

      if (lowerContent.includes("sidebar") || lowerContent.includes("main content")) {
        suggestions.recommendations.push({
          component: "Container + Grid",
          reason: "Two-column layout with sidebar and main content area",
          example: `<ha-container>
  <ha-grid columns="2" gap="lg">
    <aside>Sidebar content</aside>
    <main>Main content</main>
  </ha-grid>
</ha-container>`,
        });
      }

      if (lowerContent.includes("header") || lowerContent.includes("footer") || lowerContent.includes("center")) {
        suggestions.recommendations.push({
          component: "Container",
          reason: "Centers content and constrains maximum width",
          example: `<ha-container max-width="lg">
  <header>Header content</header>
  <main>Main content</main>
  <footer>Footer content</footer>
</ha-container>`,
        });
      }

      if (suggestions.recommendations.length === 0) {
        suggestions.recommendations.push({
          component: "Container + Stack",
          reason: "General-purpose layout for most content",
          example: `<ha-container>
  <ha-stack direction="vertical" gap="lg">
    <!-- Your content here -->
  </ha-stack>
</ha-container>`,
        });
      }

      // Add responsive considerations if mentioned
      if (constraints?.includes("mobile") || constraints?.includes("responsive")) {
        suggestions.responsiveNotes = [
          "Use Grid with responsive column counts: :columns=\"{ sm: 1, md: 2, lg: 3 }\"",
          "Stack direction can be changed based on screen size",
          "Container automatically adapts to viewport width",
        ];
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(suggestions, null, 2),
          },
        ],
      };
    }

    case "generate_form": {
      const { fields, submitLabel } = args as {
        fields: Array<{
          name: string;
          type: string;
          label: string;
          required?: boolean;
          options?: string[];
        }>;
        submitLabel?: string;
      };

      // Map field types to Hidearea components
      const componentMap: Record<string, string> = {
        text: "ha-input",
        email: "ha-input",
        password: "ha-input",
        number: "ha-input",
        date: "ha-date-picker",
        select: "ha-select",
        checkbox: "ha-checkbox",
        textarea: "ha-textarea",
      };

      // Generate form code
      let formCode = `<form>\n`;

      for (const field of fields) {
        const component = componentMap[field.type] || "ha-input";
        const requiredAttr = field.required ? " required" : "";

        formCode += `  <ha-form-group\n`;
        formCode += `    label="${field.label}"\n`;
        if (field.required) {
          formCode += `    required\n`;
        }
        formCode += `  >\n`;

        if (field.type === "select" && field.options) {
          formCode += `    <${component} name="${field.name}"${requiredAttr}>\n`;
          for (const option of field.options) {
            formCode += `      <option value="${option.toLowerCase()}">${option}</option>\n`;
          }
          formCode += `    </${component}>\n`;
        } else if (field.type === "checkbox") {
          formCode += `    <${component} name="${field.name}"${requiredAttr}>${field.label}</${component}>\n`;
        } else if (field.type === "textarea") {
          formCode += `    <${component} name="${field.name}"${requiredAttr} placeholder="Enter ${field.label.toLowerCase()}"></${component}>\n`;
        } else if (field.type === "date") {
          formCode += `    <${component} name="${field.name}"${requiredAttr} placeholder="Select ${field.label.toLowerCase()}"></${component}>\n`;
        } else {
          const typeAttr = field.type === "text" ? "" : ` type="${field.type}"`;
          formCode += `    <${component} name="${field.name}"${typeAttr}${requiredAttr} placeholder="Enter ${field.label.toLowerCase()}"></${component}>\n`;
        }

        formCode += `  </ha-form-group>\n\n`;
      }

      formCode += `  <ha-button type="submit" variant="primary">${submitLabel || "Submit"}</ha-button>\n`;
      formCode += `</form>`;

      // Generate validation example
      const validationCode = `// Form validation example
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Validate required fields
  ${fields
    .filter((f) => f.required)
    .map((f) => `if (!data.${f.name}) {\n    alert('${f.label} is required');\n    return;\n  }`)
    .join("\n  ")}

  // Submit form data
  console.log('Form submitted:', data);
});`;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                formCode,
                validationCode,
                fieldsCount: fields.length,
                components: [...new Set(fields.map((f) => componentMap[f.type] || "ha-input"))],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_theme_tokens": {
      const { category, component } = args as {
        category: string;
        component?: string;
      };

      // If component is specified, get tokens from component metadata
      if (component) {
        const comp = findComponentMetadata(component);
        if (!comp) {
          return {
            content: [
              {
                type: "text",
                text: `Component "${component}" not found.`,
              },
            ],
          };
        }

        const tokens = comp.tokens;
        const result: Record<string, string[]> = {};

        if (category === "all" || category === "colors") {
          result.colors = tokens.colors || [];
        }
        if (category === "all" || category === "spacing") {
          result.spacing = tokens.spacing || [];
        }
        if (category === "all" || category === "typography") {
          result.typography = tokens.typography || [];
        }
        if (category === "all" || category === "effects") {
          result.other = tokens.other || [];
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  component: comp.name,
                  category,
                  tokens: result,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Return general theme tokens by category
      const themeTokens: Record<string, Record<string, string[]>> = {
        colors: {
          brand: ["color-brand-50", "color-brand-100", "color-brand-200", "color-brand-500", "color-brand-900"],
          neutral: ["color-neutral-50", "color-neutral-100", "color-neutral-500", "color-neutral-900"],
          semantic: ["color-success", "color-warning", "color-error", "color-info"],
          state: ["state-hover-overlay", "state-focus-ring", "state-disabled-opacity"],
        },
        spacing: {
          scale: ["spacing-xs", "spacing-sm", "spacing-md", "spacing-lg", "spacing-xl", "spacing-2xl"],
          component: ["spacing-input-padding", "spacing-button-padding"],
        },
        typography: {
          fontSize: ["text-body-small-fontSize", "text-body-default-fontSize", "text-body-large-fontSize"],
          fontWeight: ["font-weight-regular", "font-weight-medium", "font-weight-bold"],
          lineHeight: ["text-body-lineHeight", "text-heading-lineHeight"],
        },
        effects: {
          borderRadius: ["border-radius-sm", "border-radius-md", "border-radius-lg", "border-radius-full"],
          shadow: ["surface-card-elevation", "surface-modal-elevation", "surface-overlay-elevation"],
          animation: ["interaction-transition-fast-duration", "interaction-transition-normal-duration"],
        },
      };

      let result: Record<string, string[]> = {};

      if (category === "all") {
        for (const [cat, tokens] of Object.entries(themeTokens)) {
          result[cat] = Object.values(tokens).flat();
        }
      } else if (themeTokens[category]) {
        result = themeTokens[category];
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                category,
                tokens: result,
                usage: "Use CSS variables: var(--token-name)",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_migration_guide": {
      const { fromVersion, toVersion, component } = args as {
        fromVersion: string;
        from: string;
        toVersion: string;
        component?: string;
      };

      // Since this is a new project, provide template migration guide
      const migrationGuide: Record<string, any> = {
        from: fromVersion,
        to: toVersion,
        breaking: [] as string[],
        deprecated: [] as string[],
        new: [] as string[],
        steps: [] as string[],
      };

      // Component-specific migration
      if (component) {
        const comp = findComponentMetadata(component);
        if (!comp) {
          return {
            content: [
              {
                type: "text",
                text: `Component "${component}" not found.`,
              },
            ],
          };
        }

        migrationGuide.component = comp.name;
        migrationGuide.message = `Migration guide for ${comp.name} from ${fromVersion} to ${toVersion}`;
        migrationGuide.steps = [
          `1. Review ${comp.name} props and ensure all required props are provided`,
          `2. Check for any deprecated event handlers and update to new event names`,
          `3. Update any custom CSS to use the latest design tokens`,
          `4. Test component behavior in your application`,
        ];
      } else {
        // General migration guide
        migrationGuide.message = `Migration guide from ${fromVersion} to ${toVersion}`;
        migrationGuide.steps = [
          "1. Update package version: npm install @hidearea-design/core@" + toVersion,
          "2. Review breaking changes and deprecated features",
          "3. Update component props and events according to the changelog",
          "4. Update design tokens if there were token naming changes",
          "5. Run tests and verify component behavior",
          "6. Update Storybook stories if applicable",
        ];
        migrationGuide.note =
          "For detailed changelog, visit: https://github.com/hardlitchi/hidearea-design/releases";
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(migrationGuide, null, 2),
          },
        ],
      };
    }

    case "generate_storybook_story": {
      const { component, variants } = args as {
        component: string;
        variants?: string[];
      };

      const comp = findComponentMetadata(component);
      if (!comp) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${component}" not found.`,
            },
          ],
        };
      }

      // Generate Storybook story code
      const storyCode = `import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../src/components/${comp.name.toLowerCase()}/${comp.tagName}.js';

const meta: Meta = {
  title: 'Components/${comp.category}/${comp.name}',
  component: '${comp.tagName}',
  tags: ['autodocs'],
  argTypes: {
${comp.props
  .map((prop) => {
    const argType: string[] = [];
    argType.push(`    ${prop.name}: {`);
    argType.push(`      description: '${prop.description}',`);
    if (prop.type.includes("|")) {
      const options = prop.type
        .split("|")
        .map((v) => v.trim().replace(/'/g, ""))
        .filter((v) => v !== "string" && v !== "boolean" && v !== "number");
      if (options.length > 0) {
        argType.push(`      control: { type: 'select' },`);
        argType.push(`      options: [${options.map((o) => `'${o}'`).join(", ")}],`);
      }
    }
    if (prop.default) {
      argType.push(`      defaultValue: ${prop.default},`);
    }
    argType.push(`    },`);
    return argType.join("\n");
  })
  .join("\n")}
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html\`
    <${comp.tagName}
${comp.props
  .slice(0, 3)
  .map((prop) => `      ${prop.name}="\${args.${prop.name}}"`)
  .join("\n")}
    >
      ${comp.slots && comp.slots.find((s) => s.name === "default") ? "Content" : ""}
    </${comp.tagName}>
  \`,
  args: {
${comp.props
  .filter((prop) => prop.default)
  .slice(0, 3)
  .map((prop) => `    ${prop.name}: ${prop.default},`)
  .join("\n")}
  },
};
`;

      // Generate variant stories if examples exist
      const variantStories = comp.examples
        .filter((ex) => !variants || variants.includes(ex.title))
        .map((ex) => {
          const storyName = ex.title.replace(/\s+/g, "");
          return `
export const ${storyName}: Story = {
  render: () => html\`
    ${ex.code.split("\n").join("\n    ")}
  \`,
};`;
        })
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                component: comp.name,
                storyCode: storyCode + variantStories,
                examples: comp.examples.length,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Hidearea Design System MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
