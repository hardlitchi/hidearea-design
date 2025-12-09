# @hidearea-design/mcp-server

Model Context Protocol (MCP) server for Hidearea Design System. Provides AI-powered assistance for component usage, semantic token selection, and HTML conversion.

## Features

### 🔍 Resources

- **Component List**: Browse all available components
- **Component Categories**: Organized component catalog
- **Semantic Tokens**: Design token reference

### 🛠️ Tools

**Core Tools:**
- **search_components**: Find components by name, description, or category
- **get_component_details**: Get comprehensive component documentation
- **get_usage_example**: Retrieve code examples for any component
- **suggest_semantic_tokens**: Get token recommendations for CSS properties
- **convert_html_to_components**: Transform HTML to Hidearea components

**Validation & Quality (Phase 1):**
- **validate_component_usage**: Validate props, types, and required attributes
- **get_accessibility_guidance**: Get ARIA roles, keyboard support, and WCAG guidelines
- **check_token_compatibility**: Check color contrast and WCAG compliance

**Developer Experience (Phase 2):**
- **get_related_components**: Discover components commonly used together
- **compare_components**: Compare 2-4 components to understand differences
- **suggest_layout**: Get layout recommendations based on content description

**Advanced Features (Phase 3):** 🆕
- **generate_form**: Generate complete forms with validation based on field definitions
- **get_theme_tokens**: Get theme-specific design tokens for customization
- **get_migration_guide**: Get migration guidance for upgrading between versions
- **generate_storybook_story**: Generate Storybook story code for components

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

### validate_component_usage

Validate component props and usage:

```typescript
{
  "component": "Button",
  "props": {
    "variant": "invalid",
    "size": "medium"
  }
}
```

**Returns**: Validation results with errors and warnings for invalid prop values or missing required props.

### get_accessibility_guidance

Get accessibility best practices:

```typescript
{
  "component": "Modal",
  "scenario": "confirmation dialog" // optional
}
```

**Returns**: ARIA roles, keyboard support, WCAG guidelines, and best practices specific to the component and scenario.

### check_token_compatibility

Check color contrast for accessibility:

```typescript
{
  "background": "color-neutral-50",
  "foreground": "color-neutral-900"
}
```

**Returns**: Contrast ratio estimates, WCAG AA/AAA compliance, and recommendations for improving accessibility.

### get_related_components

Find components commonly used together:

```typescript
{
  "component": "Modal"
}
```

**Returns**: Related components with reasons why they're commonly used together, plus category-based recommendations.

### compare_components

Compare components to understand differences:

```typescript
{
  "components": ["Modal", "Drawer"]
}
```

**Returns**: Side-by-side comparison with specific insights about when to use each component.

### suggest_layout

Get layout suggestions based on content:

```typescript
{
  "content": "a grid of product cards with filters",
  "constraints": "mobile-first"
}
```

**Returns**: Recommended layout components with code examples and responsive considerations.

### generate_form

Generate a complete form with validation:

```typescript
{
  "fields": [
    {
      "name": "email",
      "type": "email",
      "label": "Email Address",
      "required": true
    },
    {
      "name": "password",
      "type": "password",
      "label": "Password",
      "required": true
    },
    {
      "name": "country",
      "type": "select",
      "label": "Country",
      "options": ["USA", "Canada", "UK"]
    }
  ],
  "submitLabel": "Sign Up"
}
```

**Returns**: Complete form code using Hidearea components with validation logic.

### get_theme_tokens

Get theme-specific design tokens:

```typescript
{
  "category": "colors", // or "spacing", "typography", "effects", "all"
  "component": "Button" // optional
}
```

**Returns**: Design tokens for the specified category, optionally filtered by component.

### get_migration_guide

Get migration guidance for version upgrades:

```typescript
{
  "fromVersion": "1.0.0",
  "toVersion": "2.0.0",
  "component": "Button" // optional
}
```

**Returns**: Breaking changes, deprecated features, and step-by-step migration instructions.

### generate_storybook_story

Generate Storybook story code:

```typescript
{
  "component": "Button",
  "variants": ["Basic Usage", "With Icon"] // optional
}
```

**Returns**: Complete Storybook story code with all props, argTypes, and example variants.

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

### Validating Component Usage

> "Check if this button usage is correct: `<ha-button variant='invalid' size='medium'>`"

Claude will use `validate_component_usage` to identify issues.

### Getting Accessibility Guidance

> "How should I implement keyboard navigation for this Modal?"

Claude will use `get_accessibility_guidance` to provide WCAG guidelines and best practices.

### Checking Color Contrast

> "Is color-neutral-100 on color-neutral-200 accessible?"

Claude will use `check_token_compatibility` to verify WCAG compliance.

### Finding Related Components

> "What components work well with Modal?"

Claude will use `get_related_components` to suggest Button, FormGroup, Input, and Alert.

### Comparing Components

> "What's the difference between Modal and Drawer?"

Claude will use `compare_components` to explain use cases for each.

### Getting Layout Suggestions

> "I need to display a grid of product cards with filters, what layout should I use?"

Claude will use `suggest_layout` to recommend Grid and Stack components with examples.

### Generating Forms

> "Create a signup form with email, password, and country selection"

Claude will use `generate_form` to create a complete form with FormGroup, Input, Select, and Button components.

### Getting Theme Tokens

> "What color tokens are available for the Button component?"

Claude will use `get_theme_tokens` to list all color tokens used by Button.

### Migration Guidance

> "How do I migrate from version 1.0.0 to 2.0.0?"

Claude will use `get_migration_guide` to provide step-by-step migration instructions.

### Generating Storybook Stories

> "Generate a Storybook story for the Card component"

Claude will use `generate_storybook_story` to create a complete story with all variants and props.

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
