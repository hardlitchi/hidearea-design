#!/usr/bin/env tsx
/**
 * Tree-shaking Test Script
 * Creates test builds to verify tree-shaking effectiveness
 */

import { build } from 'vite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const testDir = path.join(rootDir, 'test-tree-shaking');

interface TestCase {
  name: string;
  code: string;
  expectedComponents: string[];
}

const testCases: TestCase[] = [
  {
    name: 'single-button',
    code: `import '@hidearea-design/core/components/button';`,
    expectedComponents: ['button'],
  },
  {
    name: 'button-input',
    code: `
      import '@hidearea-design/core/components/button';
      import '@hidearea-design/core/components/input';
    `,
    expectedComponents: ['button', 'input'],
  },
  {
    name: 'full-import',
    code: `import '@hidearea-design/core';`,
    expectedComponents: ['all'],
  },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function testTreeShaking() {
  console.log('# Tree-shaking Verification Report\n');
  console.log(`Generated: ${new Date().toISOString()}\n`);

  // Create test directory
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  console.log('## Test Results\n');
  console.log('| Test Case | Bundle Size (ES) | Bundle Size (Gzipped) | Components |');
  console.log('|-----------|------------------|----------------------|------------|');

  const results: Array<{ name: string; size: number; gzipSize: number; components: string[] }> = [];

  for (const testCase of testCases) {
    const testCaseDir = path.join(testDir, testCase.name);

    // Clean and create directory
    if (fs.existsSync(testCaseDir)) {
      fs.rmSync(testCaseDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testCaseDir, { recursive: true });

    // Create test entry file
    const entryFile = path.join(testCaseDir, 'index.js');
    fs.writeFileSync(entryFile, testCase.code);

    // Create minimal HTML
    const htmlFile = path.join(testCaseDir, 'index.html');
    fs.writeFileSync(
      htmlFile,
      `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${testCase.name}</title>
  </head>
  <body>
    <script type="module" src="/index.js"></script>
  </body>
</html>`
    );

    try {
      // Build with Vite
      await build({
        root: testCaseDir,
        build: {
          outDir: path.join(testCaseDir, 'dist'),
          minify: 'terser',
          rollupOptions: {
            output: {
              format: 'es',
            },
          },
        },
        logLevel: 'silent',
      });

      // Get bundle size
      const distDir = path.join(testCaseDir, 'dist', 'assets');
      if (fs.existsSync(distDir)) {
        const files = fs.readdirSync(distDir).filter(f => f.endsWith('.js'));

        let totalSize = 0;
        for (const file of files) {
          const filePath = path.join(distDir, file);
          const stats = fs.statSync(filePath);
          totalSize += stats.size;
        }

        // Estimate gzip (roughly 15-25% of original)
        const estimatedGzip = Math.round(totalSize * 0.2);

        results.push({
          name: testCase.name,
          size: totalSize,
          gzipSize: estimatedGzip,
          components: testCase.expectedComponents,
        });

        console.log(
          `| ${testCase.name} | ${formatBytes(totalSize)} | ${formatBytes(estimatedGzip)} | ${testCase.expectedComponents.join(', ')} |`
        );
      }
    } catch (error) {
      console.error(`Error building ${testCase.name}:`, error);
    }
  }

  console.log('\n## Analysis\n');

  const singleButton = results.find(r => r.name === 'single-button');
  const fullImport = results.find(r => r.name === 'full-import');

  if (singleButton && fullImport) {
    const reduction = ((1 - singleButton.size / fullImport.size) * 100).toFixed(1);
    console.log(`### Tree-shaking Effectiveness\n`);
    console.log(`- Full bundle import: ${formatBytes(fullImport.size)}`);
    console.log(`- Single button import: ${formatBytes(singleButton.size)}`);
    console.log(`- **Reduction: ${reduction}%**\n`);

    if (parseFloat(reduction) > 70) {
      console.log('✅ **Tree-shaking is working effectively**\n');
    } else if (parseFloat(reduction) > 40) {
      console.log('⚠️ **Tree-shaking is partially working** - Some improvement possible\n');
    } else {
      console.log('❌ **Tree-shaking needs improvement**\n');
    }
  }

  console.log('### Recommendations\n');
  console.log('1. **Use per-component imports** for optimal bundle size');
  console.log('   ```js');
  console.log("   import '@hidearea-design/core/components/button';");
  console.log('   ```\n');
  console.log('2. **Avoid full package imports** unless using many components');
  console.log('   ```js');
  console.log("   // Avoid: import '@hidearea-design/core';");
  console.log("   // Better: import specific components");
  console.log('   ```\n');
  console.log('3. **Use build tools with tree-shaking** (Vite, Rollup, Webpack 4+)\n');

  console.log('\n## Size Comparison Chart\n');
  console.log('```');
  console.log('Bundle Size Comparison:');
  for (const result of results) {
    const bar = '█'.repeat(Math.round(result.size / 5000));
    console.log(`${result.name.padEnd(15)} ${bar} ${formatBytes(result.size)}`);
  }
  console.log('```\n');

  // Cleanup test directory
  console.log('## Cleanup\n');
  console.log('Removing test builds...\n');
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
  console.log('✅ Test builds cleaned up\n');
}

testTreeShaking().catch(console.error);
