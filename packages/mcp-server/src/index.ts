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
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(
            {
              component: {
                button: ["background", "text", "border"],
                input: ["background", "text", "border"],
                card: ["background", "border"],
              },
              state: {
                focus: ["ring-color", "ring-width", "ring-offset"],
                hover: ["elevation", "background"],
                disabled: ["opacity", "cursor"],
              },
              surface: {
                levels: ["base", "raised", "overlay", "sunken"],
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

      // Simple conversion rules
      let converted = html;

      // Convert buttons
      converted = converted.replace(
        /<button([^>]*)>(.*?)<\/button>/gi,
        (_match, attrs, content) => {
          const className = attrs.match(/class="([^"]*)"/)?.[1] || "";
          let variant = "primary";

          if (className.includes("secondary")) variant = "secondary";
          if (className.includes("outline")) variant = "outline";
          if (className.includes("ghost")) variant = "ghost";

          return `<ha-button variant="${variant}">${content}</ha-button>`;
        }
      );

      // Convert inputs
      converted = converted.replace(
        /<input([^>]*)>/gi,
        (_match, attrs) => {
          const type = attrs.match(/type="([^"]*)"/)?.[1] || "text";
          const placeholder = attrs.match(/placeholder="([^"]*)"/)?.[1] || "";

          return `<ha-input type="${type}" placeholder="${placeholder}"></ha-input>`;
        }
      );

      // Convert divs with card classes
      converted = converted.replace(
        /<div class="card"([^>]*)>(.*?)<\/div>/gis,
        (_match, _attrs, content) => {
          return `<ha-card>${content}</ha-card>`;
        }
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                original: html,
                converted,
                note: "Conversion is basic. Manual adjustments may be needed for complex cases.",
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
