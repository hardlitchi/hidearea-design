#!/usr/bin/env tsx
/**
 * Performance Budget Checker
 * Ensures bundle sizes stay within defined budgets
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

interface BudgetRule {
  package: string;
  file: string;
  maxSize: number; // in KB
  type: 'bundle' | 'component' | 'css';
}

interface BudgetViolation {
  rule: BudgetRule;
  actualSize: number;
  exceed: number;
  exceedPercent: number;
}

// Define performance budgets
const BUDGETS: BudgetRule[] = [
  // Main bundles
  {
    package: '@hidearea-design/core',
    file: 'dist/index.js',
    maxSize: 450,
    type: 'bundle',
  },
  {
    package: '@hidearea-design/core',
    file: 'dist/index.umd.js',
    maxSize: 400,
    type: 'bundle',
  },
  {
    package: '@hidearea-design/react',
    file: 'dist/index.js',
    maxSize: 70,
    type: 'bundle',
  },
  {
    package: '@hidearea-design/vue',
    file: 'dist/index.js',
    maxSize: 80,
    type: 'bundle',
  },

  // Critical CSS
  {
    package: '@hidearea-design/tokens',
    file: 'build/css/variables.css',
    maxSize: 100,
    type: 'css',
  },
  {
    package: '@hidearea-design/tokens',
    file: 'build/css/all.css',
    maxSize: 200,
    type: 'css',
  },

  // Individual components (spot checks for commonly used ones)
  {
    package: '@hidearea-design/core',
    file: 'dist/components/button/button.js',
    maxSize: 15,
    type: 'component',
  },
  {
    package: '@hidearea-design/core',
    file: 'dist/components/input/input.js',
    maxSize: 20,
    type: 'component',
  },
  {
    package: '@hidearea-design/core',
    file: 'dist/components/card/card.js',
    maxSize: 20,
    type: 'component',
  },
];

function getFileSize(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    return stats.size / 1024; // Convert to KB
  } catch {
    return -1;
  }
}

function formatBytes(kb: number): string {
  return `${kb.toFixed(2)} KB`;
}

function checkBudget(rule: BudgetRule): BudgetViolation | null {
  const packagePath = rule.package.replace('@hidearea-design/', '');
  const filePath = path.join(rootDir, 'packages', packagePath, rule.file);

  const actualSize = getFileSize(filePath);

  if (actualSize === -1) {
    console.warn(`⚠️  File not found: ${rule.file} (${rule.package})`);
    return null;
  }

  if (actualSize > rule.maxSize) {
    const exceed = actualSize - rule.maxSize;
    const exceedPercent = (exceed / rule.maxSize) * 100;

    return {
      rule,
      actualSize,
      exceed,
      exceedPercent,
    };
  }

  return null;
}

function main() {
  console.log('# Performance Budget Check\n');
  console.log(`Checking ${BUDGETS.length} budget rules...\n`);

  const violations: BudgetViolation[] = [];
  const passed: Array<{ rule: BudgetRule; actualSize: number }> = [];

  for (const rule of BUDGETS) {
    const violation = checkBudget(rule);

    if (violation) {
      violations.push(violation);
    } else {
      const packagePath = rule.package.replace('@hidearea-design/', '');
      const filePath = path.join(rootDir, 'packages', packagePath, rule.file);
      const actualSize = getFileSize(filePath);

      if (actualSize !== -1) {
        passed.push({ rule, actualSize });
      }
    }
  }

  // Report results
  if (violations.length === 0) {
    console.log('✅ All budgets passed!\n');

    console.log('## Budget Status\n');
    console.log('| Package | File | Budget | Actual | Status |');
    console.log('|---------|------|--------|--------|--------|');

    for (const { rule, actualSize } of passed) {
      const usage = (actualSize / rule.maxSize) * 100;
      const status = usage < 80 ? '🟢' : usage < 95 ? '🟡' : '🟠';
      console.log(
        `| ${rule.package} | ${rule.file} | ${formatBytes(rule.maxSize)} | ${formatBytes(actualSize)} (${usage.toFixed(1)}%) | ${status} |`
      );
    }

    process.exit(0);
  }

  // Report violations
  console.log('❌ Budget violations detected!\n');

  console.log('## Violations\n');
  console.log('| Package | File | Budget | Actual | Exceed | % Over |');
  console.log('|---------|------|--------|--------|--------|--------|');

  for (const violation of violations) {
    console.log(
      `| ${violation.rule.package} | ${violation.rule.file} | ${formatBytes(violation.rule.maxSize)} | ${formatBytes(violation.actualSize)} | ${formatBytes(violation.exceed)} | ${violation.exceedPercent.toFixed(1)}% |`
    );
  }

  console.log('\n## Recommendations\n');

  const bundleViolations = violations.filter((v) => v.rule.type === 'bundle');
  const componentViolations = violations.filter((v) => v.rule.type === 'component');
  const cssViolations = violations.filter((v) => v.rule.type === 'css');

  if (bundleViolations.length > 0) {
    console.log('### Bundle Size Issues\n');
    console.log('- Consider implementing code splitting for large components');
    console.log('- Review and optimize dependencies');
    console.log('- Ensure tree-shaking is working correctly\n');
  }

  if (componentViolations.length > 0) {
    console.log('### Component Size Issues\n');
    console.log('- Review component complexity');
    console.log('- Split large components into smaller pieces');
    console.log('- Consider lazy loading for complex features\n');
  }

  if (cssViolations.length > 0) {
    console.log('### CSS Size Issues\n');
    console.log('- Enable PurgeCSS for production builds');
    console.log('- Review unused CSS variables');
    console.log('- Consider splitting CSS by component\n');
  }

  console.log('## Next Steps\n');
  console.log('1. Review the violations above');
  console.log('2. Optimize the affected files');
  console.log('3. Re-run this check to verify improvements');
  console.log('4. Consider updating budgets if current limits are unrealistic\n');

  process.exit(1);
}

main();
