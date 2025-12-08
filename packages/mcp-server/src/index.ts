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
  COMPONENTS,
  COMPONENT_CATEGORIES,
  findComponent,
  searchComponents,
  getComponentsByCategory,
} from "./components-metadata.js";

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
            COMPONENTS.map((c) => ({
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
                  getComponentsByCategory(cat).map((c) => ({
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
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_components": {
      const { query } = args as { query: string };
      const results = searchComponents(query);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                query,
                count: results.length,
                results: results.map((c) => ({
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
      const comp = findComponent(component);

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
      const comp = findComponent(component);

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
        ? comp.examples.filter((e) => e.title.toLowerCase().includes(variant.toLowerCase()))
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
