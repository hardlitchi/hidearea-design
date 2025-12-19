/**
 * Bundle Size Regression Test
 * Ensures bundle sizes stay within acceptable limits
 */

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '../../dist');

interface BundleSizeLimit {
  file: string;
  maxSize: number; // in KB
  description: string;
}

// Define maximum bundle size limits
const BUNDLE_SIZE_LIMITS: BundleSizeLimit[] = [
  {
    file: 'index.js',
    maxSize: 450, // 450 KB uncompressed
    description: 'Main ES bundle',
  },
  {
    file: 'index.umd.js',
    maxSize: 400, // 400 KB uncompressed
    description: 'Main UMD bundle',
  },
];

// Define per-component size limits
const COMPONENT_SIZE_LIMITS = {
  small: 15, // Simple components like Button, Badge
  medium: 30, // Components like Input, Card
  large: 50, // Complex components like DataGrid, DatePicker
};

function getFileSize(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    return stats.size / 1024; // Convert to KB
  } catch {
    return 0;
  }
}

function getAllComponentFiles(): string[] {
  const componentsPath = path.join(distPath, 'components');

  if (!fs.existsSync(componentsPath)) {
    return [];
  }

  const files: string[] = [];
  const componentDirs = fs.readdirSync(componentsPath, { withFileTypes: true });

  for (const dir of componentDirs) {
    if (dir.isDirectory()) {
      const componentFile = path.join(componentsPath, dir.name, `${dir.name}.js`);
      if (fs.existsSync(componentFile)) {
        files.push(componentFile);
      }
    }
  }

  return files;
}

describe('Bundle Size Regression', () => {
  describe('Main Bundles', () => {
    it.each(BUNDLE_SIZE_LIMITS)(
      'should keep $description under $maxSize KB',
      ({ file, maxSize, description }) => {
        const filePath = path.join(distPath, file);
        const actualSize = getFileSize(filePath);

        expect(actualSize).toBeGreaterThan(0);
        expect(actualSize).toBeLessThanOrEqual(maxSize);

        // Log actual size for monitoring
        console.log(`  ${description}: ${actualSize.toFixed(2)} KB / ${maxSize} KB`);
      }
    );
  });

  describe('Per-Component Bundles', () => {
    it('should generate individual component bundles', () => {
      const componentFiles = getAllComponentFiles();
      expect(componentFiles.length).toBeGreaterThan(0);
      console.log(`  Found ${componentFiles.length} component bundles`);
    });

    it('should keep component bundles within reasonable limits', () => {
      const componentFiles = getAllComponentFiles();
      const oversizedComponents: Array<{ name: string; size: number }> = [];

      for (const componentFile of componentFiles) {
        const size = getFileSize(componentFile);
        const componentName = path.basename(path.dirname(componentFile));

        // Most components should be under 30 KB
        // Allow some large components (DataGrid, DatePicker, ColorPicker, TimePicker)
        const isComplexComponent = [
          'datagrid',
          'date-picker',
          'color-picker',
          'time-picker',
          'file-upload',
        ].includes(componentName);

        const sizeLimit = isComplexComponent
          ? COMPONENT_SIZE_LIMITS.large
          : COMPONENT_SIZE_LIMITS.medium;

        if (size > sizeLimit) {
          oversizedComponents.push({ name: componentName, size });
        }
      }

      if (oversizedComponents.length > 0) {
        console.log('  Oversized components:');
        oversizedComponents.forEach(({ name, size }) => {
          console.log(`    - ${name}: ${size.toFixed(2)} KB`);
        });
      }

      // Allow up to 5 components to exceed limits (for complex components)
      expect(oversizedComponents.length).toBeLessThanOrEqual(5);
    });

    it('should have small bundle sizes for simple components', () => {
      const simpleComponents = ['button', 'badge', 'chip', 'spinner'];
      const componentsPath = path.join(distPath, 'components');

      for (const componentName of simpleComponents) {
        const componentFile = path.join(componentsPath, componentName, `${componentName}.js`);

        if (fs.existsSync(componentFile)) {
          const size = getFileSize(componentFile);
          expect(size).toBeLessThanOrEqual(COMPONENT_SIZE_LIMITS.small);
          console.log(`  ${componentName}: ${size.toFixed(2)} KB`);
        }
      }
    });
  });

  describe('Bundle Growth Monitoring', () => {
    it('should track total bundle size', () => {
      const mainBundleSize = getFileSize(path.join(distPath, 'index.js'));
      const totalComponentsSize = getAllComponentFiles().reduce(
        (sum, file) => sum + getFileSize(file),
        0
      );

      console.log('\n  Bundle Size Summary:');
      console.log(`    Main bundle: ${mainBundleSize.toFixed(2)} KB`);
      console.log(`    All components: ${totalComponentsSize.toFixed(2)} KB`);
      console.log(`    Average per component: ${(totalComponentsSize / getAllComponentFiles().length).toFixed(2)} KB`);

      // Store metrics for future comparison
      const metrics = {
        timestamp: new Date().toISOString(),
        mainBundleSize,
        totalComponentsSize,
        componentCount: getAllComponentFiles().length,
      };

      const metricsPath = path.join(__dirname, 'bundle-metrics.json');
      const existingMetrics = fs.existsSync(metricsPath)
        ? JSON.parse(fs.readFileSync(metricsPath, 'utf-8'))
        : [];

      existingMetrics.push(metrics);

      // Keep only last 10 entries
      if (existingMetrics.length > 10) {
        existingMetrics.shift();
      }

      fs.writeFileSync(metricsPath, JSON.stringify(existingMetrics, null, 2));
    });
  });
});
