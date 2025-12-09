# Hidearea Design System MCP Server - Usage Guide

Complete guide for using the Hidearea Design System MCP Server with Claude Desktop and other MCP clients.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Core Features](#core-features)
- [Validation & Quality](#validation--quality)
- [Developer Experience](#developer-experience)
- [Advanced Features](#advanced-features)
- [HTML Conversion](#html-conversion)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

- Node.js 18 or higher
- Claude Desktop (for Claude integration)
- MCP-compatible client

### Install via npm

```bash
npm install @hidearea-design/mcp-server
```

### Build from source

```bash
# Clone the repository
git clone https://github.com/hardlitchi/hidearea-design.git
cd hidearea-design

# Install dependencies
pnpm install

# Build packages
pnpm build

# The MCP server will be available at:
# packages/mcp-server/build/index.js
```

## Configuration

### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "hidearea-design": {
      "command": "node",
      "args": [
        "/absolute/path/to/hidearea-design/packages/mcp-server/build/index.js"
      ]
    }
  }
}
```

### VSCode with Continue

```json
{
  "mcpServers": {
    "hidearea-design": {
      "command": "node",
      "args": [
        "/absolute/path/to/hidearea-design/packages/mcp-server/build/index.js"
      ],
      "env": {}
    }
  }
}
```

### Verify Installation

After configuring, restart your client and verify the server is running:

```bash
# Test the server directly
node /path/to/mcp-server/build/index.js
# Should output: Hidearea Design System MCP Server running on stdio
```

## Core Features

### 1. Component Search

Find components by name, description, or category.

**Example prompts:**
- "Search for a button component"
- "Find components for data display"
- "Show me form control components"

**Tool**: `search_components`

**Response includes:**
- Component name and tag
- Description
- Category
- Count of matching results

### 2. Component Details

Get comprehensive information about a specific component.

**Example prompts:**
- "Show me details about the Button component"
- "How do I use ha-modal?"
- "What props does Input accept?"

**Tool**: `get_component_details`

**Response includes:**
- All props with types and defaults
- Events with detail types
- Slots
- CSS variables
- Examples
- Accessibility info
- Design tokens

### 3. Usage Examples

Get code examples for specific use cases.

**Example prompts:**
- "Show me examples of Button with icons"
- "How do I create a loading state for Modal?"

**Tool**: `get_usage_example`

**Response includes:**
- Code snippets
- Descriptions
- Multiple variants

### 4. Semantic Token Suggestions

Get token recommendations for CSS properties.

**Example prompts:**
- "What tokens should I use for a card background?"
- "Suggest tokens for button padding"

**Tool**: `suggest_semantic_tokens`

**Response includes:**
- Recommended tokens
- Usage context
- Token categories

### 5. HTML to Component Conversion

Convert standard HTML to Hidearea components.

**Example prompts:**
- "Convert this HTML button to a Hidearea button: `<button class=\"primary\">Submit</button>`"
- "Transform this form HTML to use Hidearea components"

**Tool**: `convert_html_to_components`

**Supported conversions:**
- `<button>` → `<ha-button>`
- `<input>` → `<ha-input>`
- `<input type="checkbox">` → `<ha-checkbox>`
- `<input type="radio">` → `<ha-radio>`
- `<select>` → `<ha-select>`
- `<textarea>` → `<ha-textarea>`
- `<input role="switch">` → `<ha-switch>`
- `<div class="card">` → `<ha-card>`

## Validation & Quality

### 1. Component Usage Validation

Validate component props and detect issues.

**Example prompts:**
- "Validate this button: `<ha-button variant='invalid' size='medium'>`"
- "Check if this Input usage is correct"

**Tool**: `validate_component_usage`

**Validates:**
- Required props
- Valid enum values
- Type correctness
- Unknown props (warnings)

**Response includes:**
- Valid/invalid status
- Error messages
- Warning messages
- Validated props list

### 2. Accessibility Guidance

Get WCAG guidelines and ARIA best practices.

**Example prompts:**
- "How should I make this Modal accessible?"
- "What are the accessibility requirements for Button?"
- "Show me keyboard navigation for Tabs"

**Tool**: `get_accessibility_guidance`

**Response includes:**
- ARIA roles
- Keyboard support patterns
- ARIA attributes
- Best practices
- WCAG guidelines
- Category-specific guidance
- Component-specific recommendations

### 3. Token Compatibility Check

Check color contrast and WCAG compliance.

**Example prompts:**
- "Is color-neutral-100 on color-neutral-200 accessible?"
- "Check contrast for error text on warning background"

**Tool**: `check_token_compatibility`

**Response includes:**
- Compatibility assessment
- Estimated contrast ratio
- WCAG AA compliance
- WCAG AAA compliance
- Recommendations

## Developer Experience

### 1. Related Components

Discover components commonly used together.

**Example prompts:**
- "What components work well with Modal?"
- "Show me related components for Table"

**Tool**: `get_related_components`

**Response includes:**
- Related component names
- Relationship reasons
- Category-based recommendations

**Common patterns:**
- Modal: Button, FormGroup, Input, Alert
- Table: Pagination, Badge, Button, Checkbox
- Form: Input, Button, Checkbox, Select, Textarea

### 2. Component Comparison

Compare multiple components to understand differences.

**Example prompts:**
- "What's the difference between Modal and Drawer?"
- "Compare Button and Link components"
- "Should I use Checkbox or Switch?"

**Tool**: `compare_components`

**Response includes:**
- Side-by-side prop comparison
- Use case recommendations
- Key differences
- Special insights for common comparisons

### 3. Layout Suggestions

Get layout recommendations based on content description.

**Example prompts:**
- "I need to display a grid of product cards with filters"
- "Suggest layout for a sidebar navigation"
- "What layout should I use for a settings form?"

**Tool**: `suggest_layout`

**Detected patterns:**
- Grid/gallery → Grid component
- List/menu → Stack component
- Form → Stack + FormGroup
- Sidebar → Container + Grid
- Header/footer → Container

**Response includes:**
- Recommended components
- Code examples
- Responsive notes
- Alternative layouts

## Advanced Features

### 1. Form Generation

Generate complete forms with validation.

**Example prompts:**
- "Create a signup form with email, password, and country selection"
- "Generate a contact form with name, email, and message fields"

**Tool**: `generate_form`

**Supported field types:**
- text, email, password, number, date
- select (with options)
- checkbox, textarea

**Response includes:**
- Complete form HTML code
- Validation JavaScript
- Field count
- Components used

**Example:**

```javascript
{
  "fields": [
    {
      "name": "email",
      "type": "email",
      "label": "Email Address",
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

### 2. Theme Tokens

Get design tokens for customization.

**Example prompts:**
- "Show me all color tokens"
- "What tokens does Button use?"
- "Get spacing tokens for layout"

**Tool**: `get_theme_tokens`

**Categories:**
- colors: Brand, neutral, semantic, state
- spacing: Scale, component-specific
- typography: Font size, weight, line height
- effects: Border radius, shadows, animations

**Response includes:**
- Tokens by category
- Usage instructions
- Component-specific filtering

### 3. Migration Guide

Get upgrade guidance between versions.

**Example prompts:**
- "How do I migrate from 1.0.0 to 2.0.0?"
- "Show me migration guide for Button component"

**Tool**: `get_migration_guide`

**Response includes:**
- Breaking changes
- Deprecated features
- New features
- Step-by-step instructions
- Component-specific guidance
- Changelog links

### 4. Storybook Story Generation

Generate Storybook stories for components.

**Example prompts:**
- "Generate a Storybook story for Card"
- "Create stories for Button with all variants"

**Tool**: `generate_storybook_story`

**Response includes:**
- Complete story code
- Meta configuration
- ArgTypes with controls
- Default story
- Variant stories from examples

## HTML Conversion

The MCP server can convert standard HTML to Hidearea components automatically.

### Supported HTML Elements

#### Buttons
```html
<!-- Input -->
<button class="primary">Submit</button>
<input type="submit" value="Send">

<!-- Output -->
<ha-button variant="primary">Submit</ha-button>
<ha-button type="submit">Send</ha-button>
```

#### Inputs
```html
<!-- Input -->
<input type="email" placeholder="Enter email" required>

<!-- Output -->
<ha-input type="email" placeholder="Enter email" required></ha-input>
```

#### Checkboxes
```html
<!-- Input -->
<input type="checkbox" checked>

<!-- Output -->
<ha-checkbox checked>Label for checkbox</ha-checkbox>
```

#### Radio Buttons
```html
<!-- Input -->
<input type="radio" name="size" value="medium">

<!-- Output -->
<ha-radio name="size" value="medium">Medium</ha-radio>
```

#### Select Dropdowns
```html
<!-- Input -->
<select name="country" required>
  <option value="us">USA</option>
  <option value="uk">UK</option>
</select>

<!-- Output -->
<ha-select name="country" required>
  <option value="us">USA</option>
  <option value="uk">UK</option>
</ha-select>
```

#### Textareas
```html
<!-- Input -->
<textarea placeholder="Enter comments" rows="5"></textarea>

<!-- Output -->
<ha-textarea placeholder="Enter comments" rows="5"></ha-textarea>
```

#### Switches
```html
<!-- Input -->
<input type="checkbox" role="switch" aria-label="Dark mode">

<!-- Output -->
<ha-switch>Dark mode</ha-switch>
```

#### Cards
```html
<!-- Input -->
<div class="card">
  <h3>Card Title</h3>
  <p>Content</p>
</div>

<!-- Output -->
<ha-card>
  <h3>Card Title</h3>
  <p>Content</p>
</ha-card>
```

### Conversion Features

- **Class-based variant detection**: Automatically detects variants from CSS classes
- **Attribute preservation**: Preserves required, disabled, readonly, name, etc.
- **Content preservation**: Maintains inner content and nested elements
- **Label extraction**: Extracts labels from aria-label or generates placeholders

## Best Practices

### 1. Use Semantic Tokens

Always prefer semantic tokens over primitive values:

```html
<!-- Good -->
<ha-button style="--ha-button-bg: var(--component-button-primary-background)">

<!-- Avoid -->
<ha-button style="--ha-button-bg: #3b82f6">
```

### 2. Validate Before Implementation

Use validation tools before implementing components:

```javascript
// Validate your usage first
validate_component_usage({
  component: "Button",
  props: {
    variant: "primary",
    size: "medium"
  }
})
```

### 3. Check Accessibility

Always get accessibility guidance for interactive components:

```javascript
get_accessibility_guidance({
  component: "Modal",
  scenario: "form dialog"
})
```

### 4. Use Related Components

Discover better component combinations:

```javascript
get_related_components({
  component: "Table"
})
// Suggests: Pagination, Badge, Button, Checkbox
```

### 5. Generate Forms Automatically

For complex forms, use the form generator:

```javascript
generate_form({
  fields: [/* your fields */],
  submitLabel: "Submit"
})
```

## Troubleshooting

### Server Not Starting

1. **Check Node.js version**: Requires Node 18+
   ```bash
   node --version
   ```

2. **Verify file path**: Ensure absolute path in config
   ```bash
   ls -la /path/to/mcp-server/build/index.js
   ```

3. **Check permissions**: Ensure file is executable
   ```bash
   chmod +x /path/to/mcp-server/build/index.js
   ```

### Tool Not Found

1. **Restart client**: After config changes, restart Claude Desktop
2. **Check logs**: Look for errors in client logs
3. **Verify installation**: Run server directly to test

### Conversion Issues

1. **Pattern not matching**: Ensure HTML follows standard format
2. **Complex HTML**: May require manual adjustment after conversion
3. **Check supported elements**: See [HTML Conversion](#html-conversion)

### Performance

1. **Large HTML conversions**: Break into smaller chunks
2. **Multiple tools**: Use specific tools instead of broad searches
3. **Cache results**: Client may cache responses

## Resources

- **Documentation**: https://github.com/hardlitchi/hidearea-design
- **Storybook**: Live component examples
- **Issues**: https://github.com/hardlitchi/hidearea-design/issues
- **MCP Protocol**: https://modelcontextprotocol.io

## Support

For questions, issues, or feature requests:

1. Check this usage guide
2. Review the [main README](./README.md)
3. Search existing issues
4. Create a new issue with details

---

**Version**: 0.1.0
**Last Updated**: 2025-12-09
**Total Tools**: 15 (Core: 5, Phase 1: 3, Phase 2: 3, Phase 3: 4)
