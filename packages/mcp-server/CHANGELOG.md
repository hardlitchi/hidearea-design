# @hidearea-design/mcp-server

## 0.3.0

### Minor Changes

- 185b385: Initial npm publication of @hidearea-design/mcp-server

  This release includes:
  - Complete MCP server implementation with 15 tools
  - Component search and detail retrieval
  - HTML to component conversion
  - Semantic token suggestions
  - Component validation and accessibility guidance
  - Form generation capabilities
  - Theme token management
  - Comprehensive documentation (README, USAGE_GUIDE, PUBLISHING)
  - CLI support via `hidearea-mcp` command
  - Full TypeScript support with type definitions

  Ready for npm publication and integration with AI coding assistants.

## 0.2.0

### Minor Changes

- 9d4d3f8: Initial public release of hidearea-design v0.1.0

  This is the first public release of hidearea-design, a modern Web Components library with comprehensive design tokens and theming support.

  ## Features

  ### Core Package (@hidearea-design/core)
  - 37 production-ready Web Components
  - Full TypeScript support with type definitions
  - Shadow DOM with CSS custom properties
  - Comprehensive test coverage (>80%)
  - Accessibility support (ARIA attributes, keyboard navigation)

  **Components:**
  - Form Controls: Button, Input, Textarea, Checkbox, Radio, Switch, Select, Slider, ColorPicker, DatePicker, TimePicker, FileUpload, FormGroup
  - Data Display: Avatar, Badge, Chip, Card, Table, DataGrid, List, Accordion
  - Feedback: Alert, Progress, Spinner, Skeleton, Toast
  - Navigation: Breadcrumb, Tabs, Pagination, Menu
  - Layout: Container, Stack, Grid
  - Overlay: Modal, Drawer, Tooltip
  - Utility: ThemeSwitcher

  ### Tokens Package (@hidearea-design/tokens)
  - Comprehensive design token system
  - Semantic tokens for consistent theming
  - Light and dark mode support
  - CSS custom properties
  - Component-specific style exports

  ### Framework Wrappers
  - React wrapper components (@hidearea-design/react)
  - Vue wrapper components (@hidearea-design/vue)

  ### Developer Tools
  - MCP Server for Claude Code integration (@hidearea-design/mcp-server)
  - Component search and usage assistance
  - Semantic token suggestions

  ## Infrastructure
  - Monorepo with pnpm workspaces
  - Vite-based build system
  - Vitest for testing
  - Storybook for component catalog
  - VitePress documentation site
  - GitHub Pages deployment

  ## Documentation
  - Complete API documentation
  - Usage examples and code samples
  - Accessibility guidelines
  - Design token reference
  - Theme customization guide
  - 3 sample applications (Component Showcase, Login Form, Dashboard)

### Patch Changes

- Updated dependencies [9d4d3f8]
  - @hidearea-design/core@0.1.0
