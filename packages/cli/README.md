# @hidearea-design/cli

Component Generator CLI for Hidearea Design System

## Features

✨ **Full Component Generation**
- Web Component (TypeScript)
- Component styles with design tokens
- Comprehensive test suite
- React wrapper with TypeScript
- Vue wrapper with TypeScript
- Storybook stories

🚀 **Best Practices Built-in**
- Shadow DOM architecture
- Accessibility (ARIA attributes)
- Design token integration
- Responsive styling
- Theme support (light/dark)

📦 **Framework Support**
- React (with TypeScript)
- Vue 3 (with TypeScript)
- Vanilla Web Components

## Installation

```bash
# In the monorepo root
cd packages/cli
npm install
npm run build
```

## Usage

### Interactive Mode

```bash
npx ha-gen component
```

This will prompt you for:
- Component name
- Whether to generate React wrapper
- Whether to generate Vue wrapper
- Whether to generate Storybook story

### Command Line Mode

```bash
# Generate full component
npx ha-gen component MyButton

# Skip React wrapper
npx ha-gen component MyButton --skip-react

# Skip Vue wrapper
npx ha-gen component MyButton --skip-vue

# Skip Storybook story
npx ha-gen component MyButton --skip-storybook

# Custom paths
npx ha-gen component MyButton \
  --core-dir ./custom/core \
  --react-dir ./custom/react \
  --vue-dir ./custom/vue \
  --storybook-dir ./custom/storybook
```

### Aliases

```bash
# 'c' is an alias for 'component'
npx ha-gen c MyButton
```

## Generated Files

For a component named `MyButton`, the following files are generated:

### Core Package (`packages/core`)
```
src/components/my-button/
├── my-button.ts          # Web Component implementation
├── my-button.styles.ts   # Component styles
├── my-button.test.ts     # Vitest test suite
└── index.ts              # Export file
```

### React Package (`packages/react`)
```
src/
├── MyButton.tsx          # React wrapper
└── index.ts              # Updated with export
```

### Vue Package (`packages/vue`)
```
src/
├── MyButton.vue          # Vue wrapper
└── index.ts              # Updated with export
```

### Storybook Package (`packages/storybook`)
```
src/stories/
└── MyButton.stories.ts   # Storybook stories
```

## Template Structure

### Web Component Template

- **Shadow DOM** with proper encapsulation
- **Observed attributes** for reactive properties
- **Accessibility** with ARIA attributes
- **Design tokens** integration
- **Lifecycle methods** (connectedCallback, attributeChangedCallback)

### React Wrapper Template

- **forwardRef** for ref support
- **useImperativeHandle** for method exposure
- **TypeScript** props interface
- **Proper synchronization** with web component

### Vue Wrapper Template

- **Composition API** (script setup)
- **TypeScript** props interface
- **Reactive updates** with watchers
- **Method exposure** with defineExpose

### Test Template

- **Component registration** tests
- **Attribute handling** tests
- **Rendering** tests
- **Accessibility** tests
- **Vitest** framework

### Storybook Template

- **Meta configuration** with controls
- **Multiple stories** (Default, Primary, Secondary, Disabled)
- **TypeScript** args interface
- **Autodocs** enabled

## Next Steps After Generation

1. **Customize the component**
   - Add your specific functionality
   - Update styles with component-specific design
   - Enhance accessibility as needed

2. **Write comprehensive tests**
   - Add component-specific test cases
   - Test edge cases and error states
   - Ensure accessibility compliance

3. **Create detailed stories**
   - Add interactive examples
   - Document all props and variants
   - Show usage patterns

4. **Build and test**
   ```bash
   cd packages/core && npm run build
   npm test
   cd ../storybook && npm run dev
   ```

## Design Principles

The generated components follow these principles:

- **Accessibility First**: WCAG 2.1 AA compliant
- **Design Tokens**: Consistent with design system
- **Shadow DOM**: Proper encapsulation
- **Framework Agnostic**: Core web components work everywhere
- **Type Safe**: Full TypeScript support
- **Testable**: Comprehensive test coverage
- **Documented**: Auto-generated documentation

## Contributing

When creating a new component:

1. Use the CLI to generate the boilerplate
2. Follow the existing component patterns
3. Ensure all tests pass
4. Update Storybook documentation
5. Consider accessibility from the start

## License

MIT
