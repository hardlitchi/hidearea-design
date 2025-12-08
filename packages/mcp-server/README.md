# @hidearea-design/mcp-server

Model Context Protocol (MCP) server for Hidearea Design System. Provides AI-powered assistance for component usage, semantic token selection, and HTML conversion.

## Features

### 🔍 Resources

- **Component List**: Browse all available components
- **Component Categories**: Organized component catalog
- **Semantic Tokens**: Design token reference

### 🛠️ Tools

- **search_components**: Find components by name, description, or category
- **get_component_details**: Get comprehensive component documentation
- **get_usage_example**: Retrieve code examples for any component
- **suggest_semantic_tokens**: Get token recommendations for CSS properties
- **convert_html_to_components**: Transform HTML to Hidearea components

## Installation

```bash
npm install @hidearea-design/mcp-server
```

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hidearea-design": {
      "command": "node",
      "args": ["/path/to/hidearea-design/packages/mcp-server/build/index.js"]
    }
  }
}
```

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Test locally
npm start
```

## Tools Reference

### search_components

Search for components:

```typescript
{
  "query": "button" // Search term
}
```

**Returns**: List of matching components with names, tags, and descriptions.

### get_component_details

Get full component documentation:

```typescript
{
  "component": "Button" // or "ha-button"
}
```

**Returns**: Complete component info including props, events, slots, examples, accessibility, and tokens.

### get_usage_example

Get code examples:

```typescript
{
  "component": "Button",
  "variant": "icon" // optional
}
```

**Returns**: Relevant code examples for the component.

### suggest_semantic_tokens

Get token suggestions for CSS:

```typescript
{
  "property": "background-color",
  "context": "button" // optional
}
```

**Returns**: Recommended semantic tokens and their CSS variable names.

### convert_html_to_components

Convert HTML to components:

```typescript
{
  "html": "<button class=\"primary\">Click</button>"
}
```

**Returns**: Converted code using Hidearea components.

## Resources

### hidearea://components/list

Returns JSON list of all components.

### hidearea://components/categories

Returns component categories with organized component lists.

### hidearea://tokens/semantic

Returns available semantic design tokens.

## Examples

### Finding a Component

Ask Claude:
> "Search for a button component in Hidearea Design System"

Claude will use `search_components` to find it.

### Getting Component Details

> "Show me how to use the Button component with all its props"

Claude will use `get_component_details` to get full documentation.

### Converting HTML

> "Convert this HTML button to use Hidearea components: `<button class=\"primary\">Save</button>`"

Claude will use `convert_html_to_components` to transform it.

### Token Recommendations

> "What semantic tokens should I use for a card background?"

Claude will use `suggest_semantic_tokens` to recommend appropriate tokens.

## Component Categories

- **Form Controls**: Button, Input, Checkbox, Radio, Select, Textarea, etc.
- **Data Display**: Table, Badge, Avatar, Tag, etc.
- **Feedback**: Alert, Toast, Modal, Spinner, Progress, etc.
- **Navigation**: Tabs, Breadcrumb, Pagination, etc.
- **Layout**: Card, Divider, Container, etc.
- **Overlay**: Drawer, Tooltip, Popover, etc.

## Architecture

The MCP server exposes:

1. **Resources**: Static data about components and tokens
2. **Tools**: Interactive functions for search, conversion, and recommendations

All component metadata is structured and type-safe, ensuring accurate AI responses.

### Metadata Architecture

Component metadata is now distributed across the codebase:

- **Type Definitions**: `@hidearea-design/core/src/types/metadata.ts`
- **Component Metadata**: Each component has its own `metadata.ts` file (e.g., `packages/core/src/components/button/metadata.ts`)
- **Aggregation**: `packages/core/scripts/collect-metadata.mjs` collects all metadata at build time
- **Generated Index**: `packages/core/src/metadata-index.ts` (auto-generated, do not edit)
- **MCP Server**: Imports metadata from `@hidearea-design/core/metadata`

This distributed architecture:
- Co-locates metadata with component source code
- Makes it easier to maintain and update
- Ensures metadata stays in sync with implementations
- Reduces duplication across packages

## License

MIT
