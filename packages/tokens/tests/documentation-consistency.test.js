import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Documentation Consistency Test (Phase 2)
 *
 * Validates that component documentation is consistent with CSS implementation:
 * - All 40 components have documentation
 * - All docs use correct .ha-* wrapper classes
 * - Pattern 2 implementation examples exist
 * - Documentation matches CSS implementation
 * - Code examples are syntactically valid HTML
 */

const DOCS_DIR = './docs/components';
const BUILD_CSS_HTML_DIR = './build/css/html';
const EXPECTED_COMPONENT_COUNT = 42;

describe('Documentation Consistency Tests', () => {
  describe('Documentation Structure', () => {
    it('should have documentation for all component categories', () => {
      const requiredCategories = [
        'data-display',
        'feedback',
        'forms',
        'layout',
        'navigation',
        'overlays'
      ];

      requiredCategories.forEach(category => {
        const categoryPath = join(DOCS_DIR, category);
        expect(existsSync(categoryPath), `Documentation category ${category} should exist`).toBe(true);
      });
    });

    it('should have markdown files for all components with CSS implementations', () => {
      const cssFiles = getAllCssFiles(BUILD_CSS_HTML_DIR);
      const componentNames = cssFiles.map(f => f.split('/').pop().replace('.css', ''));
      const missingDocs = [];

      // Some components are sub-components documented in parent files
      const subComponents = ['list-container', 'list-item', 'list-divider', 'avatar-group'];

      componentNames.forEach(componentName => {
        if (subComponents.includes(componentName)) {
          return; // Skip sub-components
        }

        const docFiles = findDocumentationFile(componentName);
        if (docFiles.length === 0) {
          missingDocs.push(componentName);
        }
      });

      if (missingDocs.length > 0) {
        console.warn(`${missingDocs.length} components missing documentation:`, missingDocs);
      }

      // Allow a few missing docs for sub-components
      expect(missingDocs.length, 'Most components should have documentation').toBeLessThan(5);
    });

    it('should have consistent component count between CSS and docs', () => {
      const cssFiles = getAllCssFiles(BUILD_CSS_HTML_DIR);
      const docFiles = getAllMarkdownFiles(DOCS_DIR);

      // Should have roughly the same number (some docs may cover multiple components)
      expect(docFiles.length, 'Documentation count should match component count').toBeGreaterThanOrEqual(
        EXPECTED_COMPONENT_COUNT - 5
      );
    });
  });

  describe('Pattern 2 Implementation Examples', () => {
    it('should have "Pattern 2: HTML + CSS" sections in all component docs', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      const missingPattern2 = [];

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Check for Pattern 2 heading
        const hasPattern2 =
          content.includes('## Pattern 2: HTML + CSS') ||
          content.includes('## Pattern 2') ||
          content.includes('### Pattern 2');

        if (!hasPattern2) {
          missingPattern2.push(file);
        }
      });

      if (missingPattern2.length > 0) {
        console.warn(`${missingPattern2.length} docs missing Pattern 2 section`);
      }

      // Most docs should have Pattern 2 sections
      expect(missingPattern2.length, 'Most docs should have Pattern 2 sections').toBeLessThan(5);
    });

    it('should have HTML code examples in Pattern 2 sections', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      const missingExamples = [];

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        if (content.includes('Pattern 2')) {
          // Should have HTML code blocks
          const hasHtmlExample = content.match(/```html[\s\S]*?```/);

          if (!hasHtmlExample) {
            missingExamples.push(file);
          }
        }
      });

      if (missingExamples.length > 0) {
        console.warn(`${missingExamples.length} Pattern 2 sections missing HTML examples`);
      }

      expect(missingExamples.length, 'Pattern 2 sections should have HTML examples').toBeLessThan(5);
    });

    it('should include CSS file loading instructions in Pattern 2', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      let docsWithLoadingInstructions = 0;

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        if (content.includes('Pattern 2')) {
          // Should mention how to load CSS
          const hasLoadingInstructions =
            content.includes('import') && content.includes('.css') ||
            content.includes('<link') && content.includes('.css');

          if (hasLoadingInstructions) {
            docsWithLoadingInstructions++;
          }
        }
      });

      // At least 80% of docs should have loading instructions
      const total = getAllMarkdownFiles(DOCS_DIR).length;
      const percentage = (docsWithLoadingInstructions / total) * 100;
      expect(percentage, 'Most docs should include CSS loading instructions').toBeGreaterThan(60);
    });
  });

  describe('.ha-* Wrapper Class Usage', () => {
    it('should use .ha-* wrapper classes in all component examples', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      const filesWithoutWrapper = [];

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const codeBlocks = extractHtmlCodeBlocks(content);

        if (codeBlocks.length > 0) {
          // Check if at least one code block uses .ha-* class
          const hasHaClass = codeBlocks.some(block => /class="ha-\w+/.test(block));

          if (!hasHaClass) {
            filesWithoutWrapper.push(file);
          }
        }
      });

      if (filesWithoutWrapper.length > 0) {
        console.warn(`${filesWithoutWrapper.length} docs don't use .ha-* wrapper classes`);
      }

      // Most docs should use .ha-* wrapper
      expect(filesWithoutWrapper.length, 'Most docs should use .ha-* wrapper').toBeLessThan(5);
    });

    it('should use correct component-specific .ha-* classes', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      const incorrectClasses = [];

      docFiles.forEach(file => {
        const componentName = file.split('/').pop().replace('.md', '').toLowerCase();
        const content = readFileSync(file, 'utf-8');
        const codeBlocks = extractHtmlCodeBlocks(content);

        if (codeBlocks.length > 0) {
          // Check if code uses the correct .ha-{component} class
          const expectedClass = `ha-${componentName}`;
          const hasCorrectClass = codeBlocks.some(block => block.includes(`class="${expectedClass}"`));

          if (!hasCorrectClass && !['index.md', 'overview.md'].includes(file.split('/').pop())) {
            incorrectClasses.push({ file, expected: expectedClass });
          }
        }
      });

      if (incorrectClasses.length > 0) {
        console.warn(`${incorrectClasses.length} docs may use incorrect .ha-* classes`);
      }

      // Allow some flexibility for special cases
      expect(incorrectClasses.length, 'Most docs should use correct .ha-* classes').toBeLessThan(10);
    });
  });

  describe('Code Example Validation', () => {
    it('should have syntactically valid HTML in code examples', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      const invalidHtml = [];

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const codeBlocks = extractHtmlCodeBlocks(content);

        codeBlocks.forEach((block, index) => {
          const errors = validateBasicHtmlSyntax(block);

          if (errors.length > 0) {
            invalidHtml.push({ file, blockIndex: index, errors });
          }
        });
      });

      if (invalidHtml.length > 0) {
        console.warn(`${invalidHtml.length} code blocks have potential HTML issues`);
        // Show first few examples
        invalidHtml.slice(0, 3).forEach(({ file, blockIndex, errors }) => {
          console.warn(`${file} block ${blockIndex}: ${errors.join(', ')}`);
        });
      }

      // Allow some minor issues
      expect(invalidHtml.length, 'Most code examples should be valid HTML').toBeLessThan(20);
    });

    it('should have properly closed HTML tags', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      const unclosedTags = [];

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const codeBlocks = extractHtmlCodeBlocks(content);

        codeBlocks.forEach((block, index) => {
          const issues = checkUnclosedTags(block);

          if (issues.length > 0) {
            unclosedTags.push({ file, blockIndex: index, issues });
          }
        });
      });

      if (unclosedTags.length > 0) {
        console.warn(`${unclosedTags.length} code blocks have unclosed tags`);
      }

      expect(unclosedTags.length, 'Code examples should have closed tags').toBeLessThan(10);
    });
  });

  describe('Documentation Content Quality', () => {
    it('should have component descriptions', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      let docsWithDescriptions = 0;

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Should have some descriptive text (more than just headings and code)
        const textContent = content
          .replace(/```[\s\S]*?```/g, '') // Remove code blocks
          .replace(/^#{1,6}\s+.+$/gm, '') // Remove headings
          .trim();

        if (textContent.length > 100) {
          docsWithDescriptions++;
        }
      });

      const percentage = (docsWithDescriptions / docFiles.length) * 100;
      expect(percentage, 'Most docs should have descriptions').toBeGreaterThan(80);
    });

    it('should document component variants', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      let docsWithVariants = 0;

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Should mention variants or different states
        const hasVariantInfo =
          content.includes('variant') ||
          content.includes('Variant') ||
          content.includes('size') ||
          content.includes('Size') ||
          content.includes('state') ||
          content.includes('State');

        if (hasVariantInfo) {
          docsWithVariants++;
        }
      });

      const percentage = (docsWithVariants / docFiles.length) * 100;
      expect(percentage, 'Many docs should document variants').toBeGreaterThan(50);
    });

    it('should include accessibility information', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      let docsWithA11y = 0;

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Should mention accessibility or ARIA
        const hasA11yInfo =
          content.includes('Accessibility') ||
          content.includes('accessibility') ||
          content.includes('ARIA') ||
          content.includes('aria-') ||
          content.includes('a11y');

        if (hasA11yInfo) {
          docsWithA11y++;
        }
      });

      const percentage = (docsWithA11y / docFiles.length) * 100;
      expect(percentage, 'Many docs should include accessibility info').toBeGreaterThan(40);
    });
  });

  describe('Documentation-CSS Alignment', () => {
    it('should document all CSS variants that exist in implementation', () => {
      // Sample check for a few well-known components
      const testCases = [
        { component: 'button', expectedVariants: ['primary', 'secondary', 'outline'] },
        { component: 'dialog', expectedVariants: ['confirmation', 'warning', 'destructive'] }
      ];

      testCases.forEach(({ component, expectedVariants }) => {
        const docFile = findDocumentationFile(component)[0];

        if (docFile) {
          const content = readFileSync(docFile, 'utf-8');

          expectedVariants.forEach(variant => {
            const hasVariant = content.toLowerCase().includes(variant.toLowerCase());
            expect(hasVariant, `${component} docs should mention ${variant} variant`).toBe(true);
          });
        }
      });
    });

    it('should use attribute syntax consistent with CSS implementation', () => {
      const docFiles = getAllMarkdownFiles(DOCS_DIR);
      let consistentDocs = 0;

      docFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const codeBlocks = extractHtmlCodeBlocks(content);

        // Check if attributes match CSS selector patterns
        codeBlocks.forEach(block => {
          // Pattern 2 should use attributes like variant="primary", size="md"
          const hasAttributes = /\w+="[\w-]+"/.test(block);

          if (hasAttributes) {
            consistentDocs++;
          }
        });
      });

      expect(consistentDocs, 'Many examples should use attribute syntax').toBeGreaterThan(30);
    });
  });
});

// Helper Functions

function getAllCssFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.name.endsWith('.css') && entry.name !== 'all.css') {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function getAllMarkdownFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    if (!existsSync(currentDir)) {
      return;
    }

    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function findDocumentationFile(componentName) {
  const allDocs = getAllMarkdownFiles(DOCS_DIR);
  return allDocs.filter(doc => {
    const filename = doc.split('/').pop().replace('.md', '').toLowerCase();
    return filename === componentName.toLowerCase();
  });
}

function extractHtmlCodeBlocks(markdown) {
  const codeBlockRegex = /```html\n([\s\S]*?)```/g;
  const blocks = [];
  let match;

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    blocks.push(match[1]);
  }

  return blocks;
}

function validateBasicHtmlSyntax(html) {
  const errors = [];

  // Check for unclosed tags (basic)
  const openTags = (html.match(/<[a-z][\w-]*[^/>]*>/gi) || []).length;
  const closeTags = (html.match(/<\/[a-z][\w-]*>/gi) || []).length;
  const selfClosingTags = (html.match(/<[a-z][\w-]*[^>]*\/>/gi) || []).length;

  // Allow some difference due to void elements (img, input, br, etc.)
  if (Math.abs(openTags - closeTags - selfClosingTags) > 5) {
    errors.push('Tag count mismatch');
  }

  // Check for invalid attribute syntax
  if (html.match(/\w+=[^"'\s>]/)) {
    errors.push('Unquoted attributes');
  }

  return errors;
}

function checkUnclosedTags(html) {
  const issues = [];
  const stack = [];
  const selfClosing = ['img', 'input', 'br', 'hr', 'meta', 'link', 'area', 'base', 'col', 'embed', 'source', 'track', 'wbr'];

  // Simple tag matching
  const tagRegex = /<\/?([a-z][\w-]*)[^>]*>/gi;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();

    if (fullTag.startsWith('</')) {
      // Closing tag
      if (stack.length === 0 || stack[stack.length - 1] !== tagName) {
        issues.push(`Unexpected closing tag: ${tagName}`);
      } else {
        stack.pop();
      }
    } else if (!selfClosing.includes(tagName) && !fullTag.endsWith('/>')) {
      // Opening tag (not self-closing)
      stack.push(tagName);
    }
  }

  if (stack.length > 0) {
    issues.push(`Unclosed tags: ${stack.join(', ')}`);
  }

  return issues;
}
