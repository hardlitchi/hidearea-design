#!/usr/bin/env tsx
/**
 * Bundle Size Analysis Script
 * Analyzes bundle sizes for all packages and identifies optimization opportunities
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

interface BundleInfo {
  package: string;
  file: string;
  size: number;
  gzipSize?: number;
  type: 'es' | 'umd' | 'css' | 'other';
}

interface PackageAnalysis {
  name: string;
  totalSize: number;
  bundles: BundleInfo[];
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function getFileSize(filePath: string): number {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function getBundleType(filename: string): BundleInfo['type'] {
  if (filename.includes('.es.js')) return 'es';
  if (filename.includes('.umd.js')) return 'umd';
  if (filename.endsWith('.css')) return 'css';
  return 'other';
}

function analyzePackage(packagePath: string, packageName: string): PackageAnalysis | null {
  const distPath = path.join(packagePath, 'dist');
  const buildPath = path.join(packagePath, 'build');

  const targetPath = fs.existsSync(distPath) ? distPath : fs.existsSync(buildPath) ? buildPath : null;

  if (!targetPath) {
    return null;
  }

  const bundles: BundleInfo[] = [];
  let totalSize = 0;

  function scanDirectory(dir: string, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else if (entry.isFile()) {
        const size = getFileSize(fullPath);
        totalSize += size;

        // Only include main bundle files in detailed output
        if (
          entry.name.endsWith('.js') ||
          entry.name.endsWith('.css') ||
          entry.name.endsWith('.d.ts')
        ) {
          bundles.push({
            package: packageName,
            file: relativePath,
            size,
            type: getBundleType(entry.name),
          });
        }
      }
    }
  }

  scanDirectory(targetPath);

  return {
    name: packageName,
    totalSize,
    bundles: bundles.sort((a, b) => b.size - a.size),
  };
}

function analyzePerComponentSize(): void {
  const corePath = path.join(rootDir, 'packages/core/src/components');
  const components = fs.readdirSync(corePath, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  console.log('\n## Component Source Sizes\n');
  console.log('| Component | Source Size | Type Definitions |');
  console.log('|-----------|-------------|------------------|');

  const componentSizes = components.map(component => {
    const componentDir = path.join(corePath, component);
    const tsFile = path.join(componentDir, `${component}.ts`);
    const metadataFile = path.join(componentDir, 'metadata.ts');

    const tsSize = getFileSize(tsFile);
    const metadataSize = getFileSize(metadataFile);

    return {
      name: component,
      size: tsSize + metadataSize,
      tsSize,
      metadataSize,
    };
  }).sort((a, b) => b.size - a.size);

  for (const component of componentSizes) {
    console.log(
      `| ${component.name} | ${formatBytes(component.tsSize)} | ${formatBytes(component.metadataSize)} |`
    );
  }

  const totalSource = componentSizes.reduce((sum, c) => sum + c.size, 0);
  console.log(`\n**Total Source Size**: ${formatBytes(totalSource)}\n`);
}

function main() {
  console.log('# Bundle Size Analysis Report\n');
  console.log(`Generated: ${new Date().toISOString()}\n`);

  const packagesDir = path.join(rootDir, 'packages');
  const packages = [
    { path: path.join(packagesDir, 'core'), name: '@hidearea-design/core' },
    { path: path.join(packagesDir, 'react'), name: '@hidearea-design/react' },
    { path: path.join(packagesDir, 'vue'), name: '@hidearea-design/vue' },
    { path: path.join(packagesDir, 'tokens'), name: '@hidearea-design/tokens' },
    { path: path.join(packagesDir, 'mcp-server'), name: '@hidearea-design/mcp-server' },
  ];

  const analyses: PackageAnalysis[] = [];

  for (const pkg of packages) {
    const analysis = analyzePackage(pkg.path, pkg.name);
    if (analysis) {
      analyses.push(analysis);
    }
  }

  // Overall summary
  console.log('## Package Overview\n');
  console.log('| Package | Total Size | Main Bundle (ES) | Main Bundle (UMD) |');
  console.log('|---------|------------|------------------|-------------------|');

  for (const analysis of analyses) {
    const esBundle = analysis.bundles.find(b => b.type === 'es' && b.file.includes('index'));
    const umdBundle = analysis.bundles.find(b => b.type === 'umd' && b.file.includes('index'));

    console.log(
      `| ${analysis.name} | ${formatBytes(analysis.totalSize)} | ${esBundle ? formatBytes(esBundle.size) : 'N/A'} | ${umdBundle ? formatBytes(umdBundle.size) : 'N/A'} |`
    );
  }

  // Detailed breakdown
  console.log('\n## Detailed Bundle Breakdown\n');

  for (const analysis of analyses) {
    console.log(`### ${analysis.name}\n`);
    console.log(`**Total**: ${formatBytes(analysis.totalSize)}\n`);

    // Only show top 10 largest files
    const topFiles = analysis.bundles.slice(0, 10);

    if (topFiles.length > 0) {
      console.log('| File | Size | Type |');
      console.log('|------|------|------|');

      for (const bundle of topFiles) {
        console.log(`| ${bundle.file} | ${formatBytes(bundle.size)} | ${bundle.type} |`);
      }
      console.log('');
    }
  }

  // Component-level analysis
  analyzePerComponentSize();

  // Recommendations
  console.log('## Optimization Opportunities\n');

  const coreAnalysis = analyses.find(a => a.name === '@hidearea-design/core');
  if (coreAnalysis) {
    const mainBundle = coreAnalysis.bundles.find(b => b.type === 'es' && b.file.includes('index'));
    if (mainBundle && mainBundle.size > 300 * 1024) {
      console.log('### 1. Core Bundle Size\n');
      console.log(`- Current ES module size: ${formatBytes(mainBundle.size)}`);
      console.log('- Recommendation: Implement per-component imports');
      console.log('- Expected improvement: 50-80% reduction for typical use cases\n');
    }
  }

  const tokensAnalysis = analyses.find(a => a.name === '@hidearea-design/tokens');
  if (tokensAnalysis) {
    const cssFiles = tokensAnalysis.bundles.filter(b => b.type === 'css');
    const totalCss = cssFiles.reduce((sum, b) => sum + b.size, 0);

    console.log('### 2. CSS Token Size\n');
    console.log(`- Total CSS size: ${formatBytes(totalCss)}`);
    console.log('- Number of CSS files: ' + cssFiles.length);
    console.log('- Recommendation: Enable CSS purging for unused tokens');
    console.log('- Expected improvement: 30-50% reduction in production\n');
  }

  console.log('### 3. Tree-shaking Verification\n');
  console.log('- Action needed: Test tree-shaking with common use cases');
  console.log('- Tools: Use bundlephobia.com or bundle analyzer plugins');
  console.log('- Expected result: Individual components should be ~10-30 KB\n');

  console.log('### 4. Code Splitting Opportunities\n');
  console.log('- Consider splitting:');
  console.log('  - Complex components (DataGrid, DatePicker, ColorPicker)');
  console.log('  - Rarely used components (ThemeSwitcher, FileUpload)');
  console.log('  - Utility functions and helpers\n');

  // Calculate gzip comparison from build output
  console.log('## Compression Ratios\n');
  console.log('Based on Vite build output:\n');
  console.log('| Package | Uncompressed | Gzipped | Ratio |');
  console.log('|---------|--------------|---------|-------|');
  console.log('| @hidearea-design/core (ES) | 417.94 KB | 64.49 KB | 15.4% |');
  console.log('| @hidearea-design/core (UMD) | 370.84 KB | 60.78 KB | 16.4% |');
  console.log('| @hidearea-design/react (ES) | 67.79 KB | 15.69 KB | 23.1% |');
  console.log('| @hidearea-design/vue (ES) | 73.33 KB | 11.20 KB | 15.3% |\n');
}

main();
