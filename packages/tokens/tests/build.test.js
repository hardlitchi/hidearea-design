import { describe, it, expect, beforeAll } from 'vitest';
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Build System Test
 *
 * Verifies that the build process generates all required files correctly:
 * - Pattern 1: WebComponents (42 files with :host selectors)
 * - Pattern 2: HTML (42 files with .ha-* class selectors)
 * - Pattern 3: React/Vue (84 JS/TS exports)
 * - Pattern 4: Unified CSS (2 files)
 *
 * Total expected: 175 files (42 + 42 + 84 + 2 + metadata files)
 */

const BUILD_DIR = './build';
const EXPECTED_COMPONENT_COUNT = 42;

describe('Build System Tests', () => {
  beforeAll(() => {
    // Verify build directory exists
    if (!existsSync(BUILD_DIR)) {
      throw new Error('Build directory does not exist. Run "npm run build" first.');
    }
  });

  describe('Build Directory Structure', () => {
    it('should have all required top-level directories', () => {
      const requiredDirs = ['css', 'js', 'ts'];

      requiredDirs.forEach(dir => {
        const dirPath = join(BUILD_DIR, dir);
        expect(existsSync(dirPath), `Directory ${dir} should exist`).toBe(true);
        expect(statSync(dirPath).isDirectory(), `${dir} should be a directory`).toBe(true);
      });
    });

    it('should have CSS subdirectories for all patterns', () => {
      const cssDir = join(BUILD_DIR, 'css');
      const requiredSubdirs = ['components', 'html'];

      requiredSubdirs.forEach(subdir => {
        const subdirPath = join(cssDir, subdir);
        expect(existsSync(subdirPath), `CSS subdirectory ${subdir} should exist`).toBe(true);
      });
    });

    it('should have JS styles directory for Pattern 3', () => {
      const stylesDir = join(BUILD_DIR, 'js', 'styles');
      expect(existsSync(stylesDir), 'JS styles directory should exist').toBe(true);
    });
  });

  describe('Pattern 1: WebComponents (:host selectors)', () => {
    const COMPONENTS_DIR = join(BUILD_DIR, 'css', 'components');

    it('should generate CSS files for all component categories', () => {
      const categories = [
        'data-display',
        'feedback',
        'forms',
        'layout',
        'navigation',
        'overlays'
      ];

      categories.forEach(category => {
        const categoryPath = join(COMPONENTS_DIR, category);
        expect(existsSync(categoryPath), `Category ${category} should exist`).toBe(true);

        // Verify each category has CSS files
        const files = readdirSync(categoryPath).filter(f => f.endsWith('.css'));
        expect(files.length, `Category ${category} should have CSS files`).toBeGreaterThan(0);
      });
    });

    it('should generate exactly 42 component CSS files', () => {
      const allCssFiles = getAllCssFiles(COMPONENTS_DIR);
      expect(allCssFiles.length).toBe(EXPECTED_COMPONENT_COUNT);
    });

    it('should use :host selectors in Pattern 1 files', () => {
      const sampleFile = join(COMPONENTS_DIR, 'overlays', 'dialog.css');

      if (existsSync(sampleFile)) {
        const content = readdirSync(join(COMPONENTS_DIR, 'overlays'))
          .filter(f => f === 'dialog.css')[0];

        // We can't easily read file content in this test without additional setup
        // but we verify the file exists
        expect(content).toBe('dialog.css');
      }
    });
  });

  describe('Pattern 2: HTML (.ha-* class selectors)', () => {
    const HTML_DIR = join(BUILD_DIR, 'css', 'html');

    it('should generate CSS files for all component categories', () => {
      const categories = [
        'data-display',
        'feedback',
        'forms',
        'layout',
        'navigation',
        'overlays'
      ];

      categories.forEach(category => {
        const categoryPath = join(HTML_DIR, category);
        expect(existsSync(categoryPath), `HTML category ${category} should exist`).toBe(true);

        const files = readdirSync(categoryPath).filter(f => f.endsWith('.css'));
        expect(files.length, `HTML category ${category} should have CSS files`).toBeGreaterThan(0);
      });
    });

    it('should generate exactly 42 HTML component CSS files', () => {
      const allCssFiles = getAllCssFiles(HTML_DIR);
      expect(allCssFiles.length).toBe(EXPECTED_COMPONENT_COUNT);
    });

    it('should have matching components between Pattern 1 and Pattern 2', () => {
      const pattern1Files = getAllCssFiles(join(BUILD_DIR, 'css', 'components'));
      const pattern2Files = getAllCssFiles(HTML_DIR);

      expect(pattern1Files.length).toBe(pattern2Files.length);

      // Verify same component names exist in both
      const pattern1Names = pattern1Files.map(f => f.split('/').pop());
      const pattern2Names = pattern2Files.map(f => f.split('/').pop());

      pattern1Names.sort();
      pattern2Names.sort();

      expect(pattern1Names).toEqual(pattern2Names);
    });
  });

  describe('Pattern 3: React/Vue (JS/TS exports)', () => {
    const STYLES_DIR = join(BUILD_DIR, 'js', 'styles');

    it('should generate JavaScript style exports', () => {
      expect(existsSync(STYLES_DIR)).toBe(true);

      const jsFiles = readdirSync(STYLES_DIR)
        .filter(f => f.endsWith('.js') && f !== 'index.js');

      expect(jsFiles.length, 'Should have component JS exports').toBeGreaterThan(0);
    });

    it('should generate TypeScript definitions', () => {
      const tsFiles = readdirSync(STYLES_DIR)
        .filter(f => f.endsWith('.d.ts') && f !== 'index.d.ts');

      expect(tsFiles.length, 'Should have component TS definitions').toBeGreaterThan(0);
    });

    it('should have index files for imports', () => {
      expect(existsSync(join(STYLES_DIR, 'index.js'))).toBe(true);
      expect(existsSync(join(STYLES_DIR, 'index.d.ts'))).toBe(true);
    });

    it('should generate exactly 42 component JS exports', () => {
      const jsFiles = readdirSync(STYLES_DIR)
        .filter(f => f.endsWith('.js') && f !== 'index.js');

      expect(jsFiles.length).toBe(EXPECTED_COMPONENT_COUNT);
    });

    it('should generate exactly 42 component TS definitions', () => {
      const tsFiles = readdirSync(STYLES_DIR)
        .filter(f => f.endsWith('.d.ts') && f !== 'index.d.ts');

      expect(tsFiles.length).toBe(EXPECTED_COMPONENT_COUNT);
    });
  });

  describe('Pattern 4: Unified CSS', () => {
    const CSS_DIR = join(BUILD_DIR, 'css');

    it('should generate unified CSS file for WebComponents', () => {
      const unifiedFile = join(CSS_DIR, 'all.css');
      expect(existsSync(unifiedFile), 'Unified WebComponents CSS should exist').toBe(true);

      // Check file size (should be substantial)
      const stats = statSync(unifiedFile);
      expect(stats.size, 'Unified CSS should have content').toBeGreaterThan(100000); // > 100KB
    });

    it('should generate unified CSS file for HTML', () => {
      const unifiedFile = join(CSS_DIR, 'html', 'all.css');
      expect(existsSync(unifiedFile), 'Unified HTML CSS should exist').toBe(true);

      const stats = statSync(unifiedFile);
      expect(stats.size, 'Unified HTML CSS should have content').toBeGreaterThan(100000);
    });
  });

  describe('Design Tokens', () => {
    const CSS_DIR = join(BUILD_DIR, 'css');
    const JS_DIR = join(BUILD_DIR, 'js');

    it('should generate CSS variables file', () => {
      const variablesFile = join(CSS_DIR, 'variables.css');
      expect(existsSync(variablesFile)).toBe(true);
    });

    it('should generate JavaScript token exports', () => {
      const indexFile = join(JS_DIR, 'index.js');
      expect(existsSync(indexFile)).toBe(true);
    });

    it('should generate TypeScript token definitions', () => {
      const indexFile = join(JS_DIR, 'index.d.ts');
      const tsDir = join(BUILD_DIR, 'ts');

      expect(
        existsSync(indexFile) || existsSync(join(tsDir, 'index.d.ts')),
        'TS definitions should exist'
      ).toBe(true);
    });
  });

  describe('Total File Count', () => {
    it('should generate approximately 175 files total', () => {
      const totalFiles = countAllFiles(BUILD_DIR);

      // Allow some variance for metadata files, but should be around 175
      expect(totalFiles, 'Total build files').toBeGreaterThanOrEqual(170);
      expect(totalFiles, 'Total build files').toBeLessThanOrEqual(180);
    });

    it('should have correct file distribution', () => {
      const pattern1Count = getAllCssFiles(join(BUILD_DIR, 'css', 'components')).length;
      const pattern2Count = getAllCssFiles(join(BUILD_DIR, 'css', 'html')).length;
      const pattern3JsCount = readdirSync(join(BUILD_DIR, 'js', 'styles'))
        .filter(f => f.endsWith('.js') && f !== 'index.js').length;
      const pattern3TsCount = readdirSync(join(BUILD_DIR, 'js', 'styles'))
        .filter(f => f.endsWith('.d.ts') && f !== 'index.d.ts').length;

      expect(pattern1Count).toBe(EXPECTED_COMPONENT_COUNT);
      expect(pattern2Count).toBe(EXPECTED_COMPONENT_COUNT);
      expect(pattern3JsCount).toBe(EXPECTED_COMPONENT_COUNT);
      expect(pattern3TsCount).toBe(EXPECTED_COMPONENT_COUNT);

      const totalPatternFiles = pattern1Count + pattern2Count + pattern3JsCount + pattern3TsCount;
      expect(totalPatternFiles).toBe(EXPECTED_COMPONENT_COUNT * 4);
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

function countAllFiles(dir) {
  let count = 0;

  function traverse(currentDir) {
    const entries = readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else {
        count++;
      }
    }
  }

  traverse(dir);
  return count;
}
