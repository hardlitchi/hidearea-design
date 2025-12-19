#!/usr/bin/env tsx
/**
 * Test per-component imports and measure bundle size reduction
 */

import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from '@rollup/plugin-terser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const testDir = path.join(__dirname, 'bundle-test');

// Ensure test directory exists
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

interface TestCase {
  name: string;
  code: string;
  description: string;
}

const testCases: TestCase[] = [
  {
    name: 'full-import',
    description: 'Full package import (all components)',
    code: `
      import * as HideareaDesign from '@hidearea-design/core';
      const button = document.createElement('ha-button');
      document.body.appendChild(button);
    `
  },
  {
    name: 'named-import-single',
    description: 'Named import - single component (Button)',
    code: `
      import { HaButton } from '@hidearea-design/core';
      const button = document.createElement('ha-button');
      document.body.appendChild(button);
    `
  },
  {
    name: 'per-component-single',
    description: 'Per-component import - single (Button)',
    code: `
      import { HaButton } from '@hidearea-design/core/button';
      const button = document.createElement('ha-button');
      document.body.appendChild(button);
    `
  },
  {
    name: 'named-import-form',
    description: 'Named import - basic form (3 components)',
    code: `
      import { HaButton, HaInput, HaAlert } from '@hidearea-design/core';
      const button = document.createElement('ha-button');
      const input = document.createElement('ha-input');
      const alert = document.createElement('ha-alert');
      document.body.append(button, input, alert);
    `
  },
  {
    name: 'per-component-form',
    description: 'Per-component import - basic form (3 components)',
    code: `
      import { HaButton } from '@hidearea-design/core/button';
      import { HaInput } from '@hidearea-design/core/input';
      import { HaAlert } from '@hidearea-design/core/alert';
      const button = document.createElement('ha-button');
      const input = document.createElement('ha-input');
      const alert = document.createElement('ha-alert');
      document.body.append(button, input, alert);
    `
  },
  {
    name: 'named-import-ui',
    description: 'Named import - common UI (5 components)',
    code: `
      import { HaButton, HaCard, HaBadge, HaAlert, HaSpinner } from '@hidearea-design/core';
      const elements = [
        document.createElement('ha-button'),
        document.createElement('ha-card'),
        document.createElement('ha-badge'),
        document.createElement('ha-alert'),
        document.createElement('ha-spinner')
      ];
      document.body.append(...elements);
    `
  },
  {
    name: 'per-component-ui',
    description: 'Per-component import - common UI (5 components)',
    code: `
      import { HaButton } from '@hidearea-design/core/button';
      import { HaCard } from '@hidearea-design/core/card';
      import { HaBadge } from '@hidearea-design/core/badge';
      import { HaAlert } from '@hidearea-design/core/alert';
      import { HaSpinner } from '@hidearea-design/core/spinner';
      const elements = [
        document.createElement('ha-button'),
        document.createElement('ha-card'),
        document.createElement('ha-badge'),
        document.createElement('ha-alert'),
        document.createElement('ha-spinner')
      ];
      document.body.append(...elements);
    `
  }
];

interface BundleResult {
  name: string;
  description: string;
  size: number;
  gzipSize: number;
}

async function buildBundle(testCase: TestCase): Promise<BundleResult> {
  const inputFile = path.join(testDir, `${testCase.name}.js`);
  const outputFile = path.join(testDir, `${testCase.name}.bundle.js`);

  // Write test code
  fs.writeFileSync(inputFile, testCase.code);

  try {
    // Build with Rollup
    const bundle = await rollup({
      input: inputFile,
      plugins: [
        nodeResolve(),
        terser()
      ],
      external: [] // Include everything
    });

    await bundle.write({
      file: outputFile,
      format: 'esm'
    });

    await bundle.close();

    // Get file sizes
    const content = fs.readFileSync(outputFile);
    const size = content.length;
    const gzipSize = gzipSync(content).length;

    return {
      name: testCase.name,
      description: testCase.description,
      size,
      gzipSize
    };
  } catch (error) {
    console.error(`❌ Failed to build ${testCase.name}:`, error);
    return {
      name: testCase.name,
      description: testCase.description,
      size: 0,
      gzipSize: 0
    };
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

function calculateReduction(baseline: number, current: number): string {
  if (baseline === 0) return '0%';
  const reduction = ((baseline - current) / baseline) * 100;
  return `${reduction.toFixed(1)}%`;
}

async function main() {
  console.log('🧪 Testing per-component imports bundle size reduction...\n');
  console.log('Building test bundles (this may take a moment)...\n');

  const results: BundleResult[] = [];

  for (const testCase of testCases) {
    console.log(`   Building: ${testCase.description}...`);
    const result = await buildBundle(testCase);
    results.push(result);
  }

  // Find baseline (full import)
  const baseline = results.find(r => r.name === 'full-import');
  if (!baseline) {
    console.error('❌ Baseline test case not found');
    return;
  }

  console.log('\n## Results\n');
  console.log('| Test Case | Size | Gzipped | Reduction vs Full |');
  console.log('|-----------|------|---------|-------------------|');

  for (const result of results) {
    const reduction = calculateReduction(baseline.gzipSize, result.gzipSize);
    console.log(
      `| ${result.description} | ${formatBytes(result.size)} | ${formatBytes(result.gzipSize)} | ${reduction} |`
    );
  }

  // Compare named vs per-component
  console.log('\n## Per-Component vs Named Imports\n');
  console.log('| Components | Named Import | Per-Component | Improvement |');
  console.log('|------------|--------------|---------------|-------------|');

  const comparisons = [
    { named: 'named-import-single', perComp: 'per-component-single', desc: '1 component (Button)' },
    { named: 'named-import-form', perComp: 'per-component-form', desc: '3 components (Form)' },
    { named: 'named-import-ui', perComp: 'per-component-ui', desc: '5 components (UI)' }
  ];

  for (const comp of comparisons) {
    const named = results.find(r => r.name === comp.named);
    const perComp = results.find(r => r.name === comp.perComp);

    if (named && perComp) {
      const improvement = calculateReduction(named.gzipSize, perComp.gzipSize);
      console.log(
        `| ${comp.desc} | ${formatBytes(named.gzipSize)} | ${formatBytes(perComp.gzipSize)} | ${improvement} |`
      );
    }
  }

  // Clean up
  console.log('\n🧹 Cleaning up test files...');
  fs.rmSync(testDir, { recursive: true, force: true });

  console.log('\n✅ Test complete!');
  console.log('\n💡 Key Findings:');
  console.log(`   - Full import: ${formatBytes(baseline.gzipSize)}`);

  const singlePerComp = results.find(r => r.name === 'per-component-single');
  if (singlePerComp) {
    const reduction = calculateReduction(baseline.gzipSize, singlePerComp.gzipSize);
    console.log(`   - Single component (per-component): ${formatBytes(singlePerComp.gzipSize)} (${reduction} smaller)`);
  }

  console.log('\n📝 Recommendation:');
  console.log('   Use per-component imports for maximum bundle size optimization!');
}

main().catch(console.error);
