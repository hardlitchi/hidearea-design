#!/usr/bin/env tsx

/**
 * Generate API documentation from component metadata
 */

import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE_DIR = join(__dirname, '../packages/core/src/components');
const DOCS_DIR = join(__dirname, '../docs/api');

interface PropMetadata {
  name: string;
  type: string;
  default?: string;
  required: boolean;
  description: string;
}

interface EventMetadata {
  name: string;
  detail?: string;
  description: string;
}

interface SlotMetadata {
  name: string;
  description: string;
}

interface ExampleMetadata {
  title: string;
  description: string;
  code: string;
}

interface AccessibilityMetadata {
  roles: string[];
  keyboardSupport: string[];
  ariaAttributes: string[];
}

interface TokensMetadata {
  colors?: string[];
  spacing?: string[];
  typography?: string[];
  other?: string[];
}

interface ComponentMetadata {
  name: string;
  tagName: string;
  description: string;
  category: string;
  props: PropMetadata[];
  events: EventMetadata[];
  slots: SlotMetadata[];
  examples: ExampleMetadata[];
  accessibility: AccessibilityMetadata;
  tokens?: TokensMetadata;
  cssProperties?: Array<{
    name: string;
    description: string;
    default?: string;
  }>;
  parts?: Array<{
    name: string;
    description: string;
  }>;
}

async function getComponentMetadata(componentDir: string): Promise<ComponentMetadata | null> {
  const metadataPath = join(componentDir, 'metadata.ts');

  try {
    // Read metadata file
    const metadataContent = await readFile(metadataPath, 'utf-8');

    // Extract metadata object using regex (simple approach)
    // In production, use TypeScript compiler API
    const metadataMatch = metadataContent.match(/export const metadata[^{]*({[\s\S]*});/);
    if (!metadataMatch) return null;

    // This is a simplified approach - in production you'd use ts-node or esbuild
    // For now, we'll use dynamic import
    const module = await import(metadataPath);
    return module.metadata as ComponentMetadata;
  } catch (error) {
    console.error(`Failed to load metadata from ${componentDir}:`, error);
    return null;
  }
}

function generateMarkdown(metadata: ComponentMetadata): string {
  let md = `# ${metadata.name}\n\n`;
  md += `> ${metadata.description}\n\n`;
  md += `**Tag**: \`<${metadata.tagName}>\`\n\n`;
  md += `**Category**: ${metadata.category}\n\n`;

  // Table of Contents
  md += `## Table of Contents\n\n`;
  md += `- [Props](#props)\n`;
  md += `- [Events](#events)\n`;
  md += `- [Slots](#slots)\n`;
  if (metadata.parts && metadata.parts.length > 0) {
    md += `- [CSS Parts](#css-parts)\n`;
  }
  if (metadata.cssProperties && metadata.cssProperties.length > 0) {
    md += `- [CSS Custom Properties](#css-custom-properties)\n`;
  }
  md += `- [Examples](#examples)\n`;
  md += `- [Accessibility](#accessibility)\n`;
  if (metadata.tokens) {
    md += `- [Design Tokens](#design-tokens)\n`;
  }
  md += `\n---\n\n`;

  // Props
  md += `## Props\n\n`;
  if (!metadata.props || metadata.props.length === 0) {
    md += `This component has no props.\n\n`;
  } else {
    md += `| Name | Type | Default | Required | Description |\n`;
    md += `|------|------|---------|----------|-------------|\n`;
    metadata.props.forEach(prop => {
      md += `| \`${prop.name}\` | \`${prop.type}\` | `;
      md += `\`${prop.default || 'undefined'}\` | `;
      md += `${prop.required ? '✅' : ''} | `;
      md += `${prop.description} |\n`;
    });
    md += `\n`;
  }

  // Events
  md += `## Events\n\n`;
  if (!metadata.events || metadata.events.length === 0) {
    md += `This component emits no custom events.\n\n`;
  } else {
    md += `| Name | Detail | Description |\n`;
    md += `|------|--------|-------------|\n`;
    metadata.events.forEach(event => {
      md += `| \`${event.name}\` | `;
      md += `\`${event.detail || 'void'}\` | `;
      md += `${event.description} |\n`;
    });
    md += `\n`;

    // Event usage example
    md += `### Usage\n\n`;
    md += `\`\`\`javascript\n`;
    md += `const element = document.querySelector('${metadata.tagName}');\n`;
    if (metadata.events[0]) {
      md += `element.addEventListener('${metadata.events[0].name}', (event) => {\n`;
      if (metadata.events[0].detail && metadata.events[0].detail !== 'void') {
        md += `  console.log(event.detail);\n`;
      }
      md += `});\n`;
    }
    md += `\`\`\`\n\n`;
  }

  // Slots
  md += `## Slots\n\n`;
  if (!metadata.slots || metadata.slots.length === 0) {
    md += `This component has no slots.\n\n`;
  } else {
    md += `| Name | Description |\n`;
    md += `|------|-------------|\n`;
    metadata.slots.forEach(slot => {
      md += `| \`${slot.name}\` | ${slot.description} |\n`;
    });
    md += `\n`;
  }

  // CSS Parts
  if (metadata.parts && metadata.parts.length > 0) {
    md += `## CSS Parts\n\n`;
    md += `Exposed parts for custom styling:\n\n`;
    md += `| Part | Description |\n`;
    md += `|------|-------------|\n`;
    metadata.parts.forEach(part => {
      md += `| \`${part.name}\` | ${part.description} |\n`;
    });
    md += `\n`;
    md += `### Usage\n\n`;
    md += `\`\`\`css\n`;
    md += `${metadata.tagName}::part(${metadata.parts[0].name}) {\n`;
    md += `  /* Custom styles */\n`;
    md += `}\n`;
    md += `\`\`\`\n\n`;
  }

  // CSS Custom Properties
  if (metadata.cssProperties && metadata.cssProperties.length > 0) {
    md += `## CSS Custom Properties\n\n`;
    md += `| Property | Description | Default |\n`;
    md += `|----------|-------------|----------|\n`;
    metadata.cssProperties.forEach(prop => {
      md += `| \`${prop.name}\` | ${prop.description} | `;
      md += `\`${prop.default || 'inherited'}\` |\n`;
    });
    md += `\n`;
  }

  // Examples
  md += `## Examples\n\n`;
  if (metadata.examples && metadata.examples.length > 0) {
    metadata.examples.forEach((example, index) => {
      md += `### ${example.title}\n\n`;
      md += `${example.description}\n\n`;
      md += `\`\`\`html\n${example.code}\n\`\`\`\n\n`;
      if (index < metadata.examples.length - 1) {
        md += `---\n\n`;
      }
    });
  } else {
    md += `No examples available.\n\n`;
  }

  // Accessibility
  md += `## Accessibility\n\n`;
  if (metadata.accessibility) {
    md += `### ARIA Roles\n\n`;
    if (metadata.accessibility.roles && metadata.accessibility.roles.length > 0) {
      metadata.accessibility.roles.forEach(role => {
        md += `- \`${role}\`\n`;
      });
    } else {
      md += `No specific roles defined.\n`;
    }
    md += `\n`;

    md += `### Keyboard Support\n\n`;
    if (metadata.accessibility.keyboardSupport && metadata.accessibility.keyboardSupport.length > 0) {
      md += `| Key | Action |\n`;
      md += `|-----|--------|\n`;
      metadata.accessibility.keyboardSupport.forEach(support => {
        const [key, ...action] = support.split(' - ');
        md += `| \`${key.trim()}\` | ${action.join(' - ')} |\n`;
      });
    } else {
      md += `Standard keyboard navigation.\n`;
    }
    md += `\n`;

    md += `### ARIA Attributes\n\n`;
    if (metadata.accessibility.ariaAttributes && metadata.accessibility.ariaAttributes.length > 0) {
      metadata.accessibility.ariaAttributes.forEach(attr => {
        md += `- \`${attr}\`\n`;
      });
    } else {
      md += `No specific ARIA attributes required.\n`;
    }
    md += `\n`;
  }

  // Design Tokens
  if (metadata.tokens) {
    md += `## Design Tokens\n\n`;
    md += `This component uses the following design tokens:\n\n`;

    if (metadata.tokens.colors && metadata.tokens.colors.length > 0) {
      md += `### Colors\n\n`;
      metadata.tokens.colors.forEach(token => {
        md += `- \`--${token}\`\n`;
      });
      md += `\n`;
    }

    if (metadata.tokens.spacing && metadata.tokens.spacing.length > 0) {
      md += `### Spacing\n\n`;
      metadata.tokens.spacing.forEach(token => {
        md += `- \`--${token}\`\n`;
      });
      md += `\n`;
    }

    if (metadata.tokens.typography && metadata.tokens.typography.length > 0) {
      md += `### Typography\n\n`;
      metadata.tokens.typography.forEach(token => {
        md += `- \`--${token}\`\n`;
      });
      md += `\n`;
    }

    if (metadata.tokens.other && metadata.tokens.other.length > 0) {
      md += `### Other\n\n`;
      metadata.tokens.other.forEach(token => {
        md += `- \`--${token}\`\n`;
      });
      md += `\n`;
    }
  }

  // Footer
  md += `---\n\n`;
  md += `**Related**:\n`;
  md += `- [Migration Guide](../guides/migration-guide.md)\n`;
  md += `- [Accessibility Guide](../guides/accessibility-guide.md)\n`;
  md += `- [Component Examples](../guides/examples.md)\n`;

  return md;
}

async function main() {
  console.log('🚀 Generating API documentation...\n');

  // Ensure docs directory exists
  await mkdir(DOCS_DIR, { recursive: true });

  // Get all component directories
  const entries = await readdir(CORE_DIR, { withFileTypes: true });
  const componentDirs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  let successCount = 0;
  let failCount = 0;

  // Generate docs for each component
  for (const componentName of componentDirs) {
    const componentDir = join(CORE_DIR, componentName);

    try {
      const metadata = await getComponentMetadata(componentDir);

      if (!metadata) {
        console.log(`⏭️  Skipped ${componentName} (no metadata)`);
        continue;
      }

      const markdown = generateMarkdown(metadata);
      const outputPath = join(DOCS_DIR, `${componentName}.md`);

      await writeFile(outputPath, markdown, 'utf-8');
      console.log(`✅ Generated ${metadata.name} → ${componentName}.md`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to generate docs for ${componentName}:`, error);
      failCount++;
    }
  }

  // Generate index file
  const indexContent = generateIndexFile(componentDirs);
  await writeFile(join(DOCS_DIR, 'README.md'), indexContent, 'utf-8');
  console.log(`\n✅ Generated API index → README.md`);

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`\n✨ Done!\n`);
}

function generateIndexFile(componentNames: string[]): string {
  let md = `# Component API Reference\n\n`;
  md += `Auto-generated API documentation for all Hidearea Design components.\n\n`;
  md += `## Components\n\n`;

  // Group by category (we'd need to load metadata for this, simplified version:)
  componentNames.sort().forEach(name => {
    const displayName = name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    md += `- [${displayName}](./${name}.md)\n`;
  });

  md += `\n---\n\n`;
  md += `**Note**: This documentation is auto-generated from component metadata files.\n\n`;
  md += `For usage examples and guides, see:\n`;
  md += `- [Getting Started](../getting-started/installation.md)\n`;
  md += `- [Migration Guide](../guides/migration-guide.md)\n`;
  md += `- [Accessibility Guide](../guides/accessibility-guide.md)\n`;
  md += `- [Component Examples](../guides/examples.md)\n`;

  return md;
}

main().catch(console.error);
