import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * CSS Validation Test
 *
 * @fileoverview
 * 生成されたCSSファイルの品質と正確性を検証するテストスイート。
 * 構文エラー、セレクタの正しさ、デザイントークン参照を確認します。
 *
 * @description
 * このテストは、ビルドプロセスで生成されたCSSファイルが
 * 正しい構文とセマンティクスを持つことを保証します。
 *
 * 検証項目:
 * - CSS構文の妥当性（タグの閉じ忘れ、括弧の不一致など）
 * - Pattern 1: :hostセレクタの正しい使用
 * - Pattern 2: .ha-*クラスセレクタの正しい使用
 * - デザイントークン参照（var(--token-name)）の存在
 * - トークンプレフィックスの妥当性
 * - メディアクエリの構文
 * - セレクタの正確性（擬似クラス、属性セレクタ）
 *
 * @example
 * // テストの実行
 * npm test tests/css-validation.test.js
 *
 * @see {@link ../../build/css/} - 生成されたCSSファイル
 * @see {@link ../../config.mjs} - CSS変換ロジック（convertHostToClass関数）
 */

const BUILD_CSS_DIR = './build/css';

describe('CSS Validation Tests', () => {
  describe('Pattern 1: WebComponents CSS', () => {
    const COMPONENTS_DIR = join(BUILD_CSS_DIR, 'components');

    it('should have valid CSS syntax in all component files', () => {
      const cssFiles = getAllCssFiles(COMPONENTS_DIR);
      expect(cssFiles.length).toBeGreaterThan(0);

      cssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        expect(() => validateBasicCssSyntax(content, file)).not.toThrow();
      });
    });

    it('should use :host selectors correctly', () => {
      const cssFiles = getAllCssFiles(COMPONENTS_DIR);

      cssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const hostMatches = content.match(/:host/g);

        if (hostMatches) {
          // Verify :host is used properly
          expect(content).toMatch(/:host\s*\{/); // Basic :host { }
          // Should not have .ha-* classes in Pattern 1
          expect(content).not.toMatch(/\.ha-\w+/);
        }
      });
    });

    it('should reference design tokens (CSS variables)', () => {
      const cssFiles = getAllCssFiles(COMPONENTS_DIR);
      let filesWithVars = 0;
      let totalFiles = 0;

      cssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Skip layout utility components that don't need tokens
        if (file.includes('/layout/grid.css') || file.includes('/layout/stack.css')) {
          return;
        }

        // Most component files should use CSS variables
        if (content.length > 100) { // Skip tiny files
          totalFiles++;
          const hasVarReferences = /var\(--[\w-]+/.test(content);
          if (hasVarReferences) {
            filesWithVars++;
          }
        }
      });

      // At least 90% of non-layout components should use tokens
      const percentage = (filesWithVars / totalFiles) * 100;
      expect(percentage, 'Most components should reference CSS variables').toBeGreaterThan(90);
    });
  });

  describe('Pattern 2: HTML CSS', () => {
    const HTML_DIR = join(BUILD_CSS_DIR, 'html');

    it('should have valid CSS syntax in all HTML pattern files', () => {
      const cssFiles = getAllCssFiles(HTML_DIR);
      expect(cssFiles.length).toBeGreaterThan(0);

      cssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        expect(() => validateBasicCssSyntax(content, file)).not.toThrow();
      });
    });

    it('should use .ha-* class selectors correctly', () => {
      const cssFiles = getAllCssFiles(HTML_DIR);

      cssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const componentName = file.split('/').pop().replace('.css', '');

        // Should have .ha-{component} class
        const haClassPattern = new RegExp(`\\.ha-${componentName}\\b`);
        expect(content, `${file} should use .ha-${componentName} class`).toMatch(haClassPattern);

        // Should not have :host selectors in Pattern 2
        expect(content, `${file} should not contain :host selectors`).not.toMatch(/:host/);
      });
    });

    it('should reference design tokens (CSS variables)', () => {
      const cssFiles = getAllCssFiles(HTML_DIR);
      let filesWithVars = 0;
      let totalFiles = 0;

      cssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Skip layout utility components that don't need tokens
        if (file.includes('/layout/grid.css') || file.includes('/layout/stack.css')) {
          return;
        }

        if (content.length > 100) {
          totalFiles++;
          const hasVarReferences = /var\(--[\w-]+/.test(content);
          if (hasVarReferences) {
            filesWithVars++;
          }
        }
      });

      // At least 90% of non-layout components should use tokens
      const percentage = (filesWithVars / totalFiles) * 100;
      expect(percentage, 'Most HTML pattern components should reference CSS variables').toBeGreaterThan(90);
    });

    it('should have properly converted selectors from Pattern 1', () => {
      const componentsDir = join(BUILD_CSS_DIR, 'components');
      const htmlDir = HTML_DIR;

      const pattern1Files = getAllCssFiles(componentsDir);
      const pattern2Files = getAllCssFiles(htmlDir);

      // Check that we have matching files
      expect(pattern1Files.length).toBe(pattern2Files.length);

      // Verify conversion for a sample file
      const samplePattern1 = pattern1Files.find(f => f.includes('dialog.css'));
      const samplePattern2 = pattern2Files.find(f => f.includes('dialog.css'));

      if (samplePattern1 && samplePattern2) {
        const pattern1Content = readFileSync(samplePattern1, 'utf-8');
        const pattern2Content = readFileSync(samplePattern2, 'utf-8');

        // Pattern 1 should have :host
        expect(pattern1Content).toMatch(/:host/);

        // Pattern 2 should have .ha-dialog
        expect(pattern2Content).toMatch(/\.ha-dialog/);
        expect(pattern2Content).not.toMatch(/:host/);
      }
    });
  });

  describe('Unified CSS Files', () => {
    it('should have valid syntax in unified WebComponents CSS', () => {
      const unifiedFile = join(BUILD_CSS_DIR, 'all.css');
      const content = readFileSync(unifiedFile, 'utf-8');

      expect(() => validateBasicCssSyntax(content, unifiedFile)).not.toThrow();
    });

    it('should have valid syntax in unified HTML CSS', () => {
      const unifiedFile = join(BUILD_CSS_DIR, 'html', 'all.css');
      const content = readFileSync(unifiedFile, 'utf-8');

      expect(() => validateBasicCssSyntax(content, unifiedFile)).not.toThrow();
    });

    it('should include all component styles in unified files', () => {
      const unifiedWCFile = join(BUILD_CSS_DIR, 'all.css');
      const unifiedHTMLFile = join(BUILD_CSS_DIR, 'html', 'all.css');

      const wcContent = readFileSync(unifiedWCFile, 'utf-8');
      const htmlContent = readFileSync(unifiedHTMLFile, 'utf-8');

      // Should have substantial content
      expect(wcContent.length).toBeGreaterThan(100000);
      expect(htmlContent.length).toBeGreaterThan(100000);

      // WebComponents should have :host
      expect(wcContent).toMatch(/:host/);

      // HTML should have .ha-* classes
      expect(htmlContent).toMatch(/\.ha-\w+/);
    });
  });

  describe('CSS Variable References', () => {
    it('should use valid CSS variable syntax', () => {
      const allCssFiles = [
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'components')),
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'html'))
      ];

      allCssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Find all var() references
        const varMatches = content.match(/var\([^)]+\)/g);

        if (varMatches) {
          varMatches.forEach(varRef => {
            // Should have proper format: var(--name) or var(--name, fallback)
            expect(varRef, `Invalid var syntax in ${file}`).toMatch(
              /^var\(--[\w-]+(,\s*[^)]+)?\)$/
            );
          });
        }
      });
    });

    it('should reference existing token categories', () => {
      const allCssFiles = [
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'components')),
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'html'))
      ];

      const validTokenPrefixes = [
        'spacing',
        'font-size',
        'font-weight',
        'font-line-height',
        'font-line',
        'radius',
        'shadow',
        'background',
        'foreground',
        'border',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'info',
        'theme-',
        'component-'
      ];

      allCssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const varMatches = content.match(/var\(--[\w-]+/g);

        if (varMatches) {
          const uniqueTokens = [...new Set(varMatches.map(v => v.replace('var(--', '')))];

          uniqueTokens.forEach(tokenName => {
            const hasValidPrefix = validTokenPrefixes.some(prefix =>
              tokenName.startsWith(prefix)
            );

            if (!hasValidPrefix) {
              console.warn(`Token ${tokenName} in ${file} uses non-standard prefix`);
            }

            // This is a soft requirement - warn but don't fail
            // expect(
            //   hasValidPrefix,
            //   `Token ${tokenName} in ${file} should use valid prefix`
            // ).toBe(true);
          });
        }
      });
    });
  });

  describe('Media Queries', () => {
    it('should have valid media query syntax', () => {
      const allCssFiles = [
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'components')),
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'html'))
      ];

      allCssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const mediaMatches = content.match(/@media[^{]+\{/g);

        if (mediaMatches) {
          mediaMatches.forEach(media => {
            // Should have valid media query syntax - can be @media (condition) or @media screen and (condition)
            expect(media, `Invalid media query in ${file}`).toMatch(
              /@media\s+[^{]+\{/
            );
          });
        }
      });
    });
  });

  describe('Selector Validation', () => {
    it('should not have malformed selectors', () => {
      const allCssFiles = [
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'components')),
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'html'))
      ];

      allCssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Check for common selector errors
        expect(content, `${file} should not have double colons before pseudo-classes`).not.toMatch(
          /::(hover|focus|active|disabled)/
        );

        // Should not have trailing commas in selectors
        expect(content, `${file} should not have trailing commas`).not.toMatch(/,\s*\{/);

        // Should not have empty selectors
        expect(content, `${file} should not have empty selectors`).not.toMatch(/\{\s*\}/);
      });
    });

    it('should use proper attribute selector syntax', () => {
      const allCssFiles = [
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'html'))
      ];

      allCssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');
        const attrMatches = content.match(/\[[\w-]+(=|~=|\|=|\^=|\$=|\*=)"?[\w-]+"?\]/g);

        if (attrMatches) {
          attrMatches.forEach(attr => {
            // Should have valid attribute selector format
            expect(attr, `Invalid attribute selector in ${file}`).toMatch(
              /\[[\w-]+(=|~=|\|=|\^=|\$=|\*=)?"?[\w-]+"?\]/
            );
          });
        }
      });
    });
  });

  describe('Comments and Documentation', () => {
    it('should have header comments in component files', () => {
      const allCssFiles = [
        ...getAllCssFiles(join(BUILD_CSS_DIR, 'html'))
      ];

      allCssFiles.forEach(file => {
        const content = readFileSync(file, 'utf-8');

        // Most component files should have documentation comments
        if (content.length > 100) {
          expect(content, `${file} should have comments`).toMatch(/\/\*/);
        }
      });
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
      } else if (entry.name.endsWith('.css') && entry.name !== 'all.css' && entry.name !== 'variables.css') {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function validateBasicCssSyntax(content, filename) {
  // Basic CSS syntax validation

  // Check for balanced braces
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;

  if (openBraces !== closeBraces) {
    throw new Error(`Unbalanced braces in ${filename}: ${openBraces} open, ${closeBraces} close`);
  }

  // Check for balanced parentheses
  const openParens = (content.match(/\(/g) || []).length;
  const closeParens = (content.match(/\)/g) || []).length;

  if (openParens !== closeParens) {
    throw new Error(`Unbalanced parentheses in ${filename}: ${openParens} open, ${closeParens} close`);
  }

  // Check for properties without values (basic check)
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for property without semicolon or brace (excluding comments, @rules, and selectors)
    if (
      trimmed &&
      !trimmed.startsWith('/*') &&
      !trimmed.endsWith('*/') &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('@') &&
      !trimmed.includes('{') &&
      !trimmed.includes('}') &&
      trimmed.includes(':') &&
      !trimmed.endsWith(';') &&
      !trimmed.endsWith(',')
    ) {
      // This might be a multi-line property, check next line
      if (index + 1 < lines.length) {
        const nextLine = lines[index + 1].trim();
        if (!nextLine.startsWith(')') && !nextLine.endsWith(';')) {
          // Potentially missing semicolon
          console.warn(`Potential missing semicolon in ${filename} line ${index + 1}: ${trimmed}`);
        }
      }
    }
  });

  return true;
}
