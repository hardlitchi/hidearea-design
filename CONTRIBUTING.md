# Contributing to hidearea-design

Thank you for your interest in contributing to hidearea-design! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project follows a Code of Conduct to ensure a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 10.x or higher
- Git

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/hidearea-design.git
cd hidearea-design
```

3. Install dependencies:

```bash
pnpm install
```

4. Build all packages:

```bash
pnpm build
```

5. Run tests to ensure everything works:

```bash
pnpm test
```

## Development Workflow

### Creating a Branch

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `test/` - Test additions or changes
- `refactor/` - Code refactoring

### Development Commands

```bash
# Start development mode (watch mode)
pnpm dev

# Run tests
pnpm test

# Run tests with UI
pnpm --filter @hidearea-design/core test:ui

# Run linting
pnpm lint

# Build all packages
pnpm build

# Format code
pnpm format
```

### Working on Specific Packages

```bash
# Work on core package
cd packages/core
pnpm dev

# Run tests for specific package
pnpm --filter @hidearea-design/core test

# Build specific package
pnpm --filter @hidearea-design/react build
```

## Project Structure

```
hidearea-design/
├── packages/
│   ├── core/           # Web Components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── react/          # React wrappers
│   ├── vue/            # Vue wrappers
│   ├── tokens/         # Design tokens
│   ├── storybook/      # Component documentation
│   └── docs/           # VitePress documentation
├── docs/               # Markdown documentation
├── .changeset/         # Changesets for versioning
└── .github/            # GitHub Actions workflows
```

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Provide proper type definitions
- Avoid `any` types when possible
- Use interfaces for public APIs

### Web Components

- Follow Web Components best practices
- Use Shadow DOM for encapsulation
- Provide CSS custom properties for theming
- Include proper ARIA attributes

Example component structure:

```typescript
export class HaMyComponent extends HTMLElement {
  static get observedAttributes() {
    return ['prop1', 'prop2'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  // Public API
  get prop1(): string {
    return this.getAttribute('prop1') || '';
  }

  set prop1(value: string) {
    this.setAttribute('prop1', value);
  }

  // Methods
  private render() {
    // Rendering logic
  }
}
```

### React Wrappers

```typescript
export const MyComponent = forwardRef<MyComponentRef, MyComponentProps>(
  ({ prop1, prop2, children, ...props }, ref) => {
    const elementRef = useRef<HaMyComponent>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      // other methods
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.prop1 = prop1;
      element.prop2 = prop2;
    }, [prop1, prop2]);

    return (
      <ha-my-component ref={elementRef} {...props}>
        {children}
      </ha-my-component>
    );
  }
);
```

### Vue Wrappers

```vue
<template>
  <ha-my-component
    ref="componentRef"
    :prop1="prop1"
    :prop2="prop2"
    @custom-event="handleEvent"
  >
    <slot />
  </ha-my-component>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import '@hidearea-design/core';

interface Props {
  prop1?: string;
  prop2?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  prop1: 'default',
  prop2: false
});

const componentRef = ref<HTMLElement | null>(null);

watch(() => props.prop1, (newValue) => {
  if (componentRef.value) {
    (componentRef.value as any).prop1 = newValue;
  }
});
</script>
```

### Code Style

- Use ESLint and Prettier (configured in the project)
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multi-line objects/arrays

Run formatting:

```bash
pnpm format
```

## Testing

### Writing Tests

All new features and bug fixes should include tests.

#### Unit Tests (Core Package)

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { HaMyComponent } from './my-component';

describe('HaMyComponent', () => {
  let component: HaMyComponent;

  beforeEach(() => {
    component = document.createElement('ha-my-component') as HaMyComponent;
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should render with default props', () => {
    expect(component.prop1).toBe('default');
  });

  it('should update when prop changes', () => {
    component.prop1 = 'new value';
    expect(component.prop1).toBe('new value');
  });
});
```

#### React Component Tests

```typescript
import { render } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render with props', () => {
    render(<MyComponent prop1="test">Content</MyComponent>);
    const element = document.querySelector('ha-my-component');
    expect(element).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm --filter @hidearea-design/core test

# Run specific test file
pnpm --filter @hidearea-design/core test src/components/button/button.test.ts
```

### Coverage Requirements

- Minimum 80% coverage for all metrics (lines, functions, branches, statements)
- All new code must include tests
- Update tests when modifying existing code

## Submitting Changes

### Commit Messages

Follow Conventional Commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Maintenance tasks

Examples:

```
feat(button): add loading state
fix(input): correct validation error display
docs: update installation guide
test(checkbox): add indeterminate state tests
```

### Creating a Pull Request

1. Ensure all tests pass:

```bash
pnpm test
pnpm lint
pnpm build
```

2. Create a changeset (for version bumps):

```bash
pnpm changeset
```

Select packages to version and provide a summary of changes.

3. Push your branch:

```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Screenshots/GIFs for UI changes
   - Test results

### Pull Request Checklist

- [ ] Code follows project coding standards
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] Changeset created (if applicable)
- [ ] No linting errors
- [ ] All CI checks passing

## Release Process

Releases are automated using Changesets:

1. Create changesets during development:

```bash
pnpm changeset
```

2. The Release workflow will:
   - Create a "Version Packages" PR
   - Update versions in package.json files
   - Generate CHANGELOG.md entries

3. Merge the "Version Packages" PR to trigger npm publication

### Manual Release (Maintainers Only)

```bash
# Update versions
pnpm changeset version

# Build packages
pnpm build

# Publish to npm
pnpm release
```

## Additional Resources

- [Component API Documentation](./docs/components/README.md)
- [Usage Examples](./docs/guides/examples.md)
- [Project Notes](./notes/README.md)

## Questions?

If you have questions, feel free to:
- Open an issue on GitHub
- Start a discussion in GitHub Discussions
- Reach out to maintainers

Thank you for contributing!
