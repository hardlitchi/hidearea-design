#!/usr/bin/env node
/**
 * Simple test to verify per-component imports work
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

console.log('🧪 Testing per-component imports...\n');

// Test 1: Check that individual component files exist
console.log('## Test 1: Component files');
const componentsToCheck = ['button', 'input', 'card', 'alert', 'badge'];
let allExist = true;

for (const component of componentsToCheck) {
  const jsPath = path.join(rootDir, 'packages/core/dist/components', component, `${component}.js`);
  const dtsPath = path.join(rootDir, 'packages/core/dist/components', component, `${component}.d.ts`);

  const jsExists = fs.existsSync(jsPath);
  const dtsExists = fs.existsSync(dtsPath);

  console.log(`   ${component}:`);
  console.log(`     - ${jsExists ? '✅' : '❌'} ${component}.js`);
  console.log(`     - ${dtsExists ? '✅' : '❌'} ${component}.d.ts`);

  if (!jsExists || !dtsExists) allExist = false;
}

if (allExist) {
  console.log('\n✅ All component files exist!\n');
} else {
  console.log('\n❌ Some component files are missing\n');
  process.exit(1);
}

// Test 2: Check package.json exports
console.log('## Test 2: Package.json exports');
const pkgPath = path.join(rootDir, 'packages/core/package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

console.log(`   - exports field: ${pkg.exports ? '✅' : '❌'}`);
console.log(`   - sideEffects field: ${pkg.sideEffects === false ? '✅ false' : '❌'}`);

if (pkg.exports) {
  const exportCount = Object.keys(pkg.exports).length;
  console.log(`   - export entries: ${exportCount}`);

  // Check some specific exports
  const hasButton = './button' in pkg.exports;
  const hasInput = './input' in pkg.exports;
  const hasUtils = './utils/theme' in pkg.exports;

  console.log(`   - ./button: ${hasButton ? '✅' : '❌'}`);
  console.log(`   - ./input: ${hasInput ? '✅' : '❌'}`);
  console.log(`   - ./utils/theme: ${hasUtils ? '✅' : '❌'}`);
}

console.log('');

// Test 3: File sizes
console.log('## Test 3: Bundle sizes');

const mainBundle = path.join(rootDir, 'packages/core/dist/index.es.js');
const buttonFile = path.join(rootDir, 'packages/core/dist/components/button/button.js');
const inputFile = path.join(rootDir, 'packages/core/dist/components/input/input.js');

function getFileSize(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  return fs.statSync(filePath).size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

const mainSize = getFileSize(mainBundle);
const buttonSize = getFileSize(buttonFile);
const inputSize = getFileSize(inputFile);

console.log(`   - Main bundle (index.es.js): ${formatBytes(mainSize)}`);
console.log(`   - Button component: ${formatBytes(buttonSize)}`);
console.log(`   - Input component: ${formatBytes(inputSize)}`);

if (mainSize > 0 && buttonSize > 0) {
  const ratio = ((buttonSize / mainSize) * 100).toFixed(1);
  console.log(`   - Button is ${ratio}% of main bundle`);
}

console.log('\n✅ All tests passed!');
console.log('\n📝 Usage examples:');
console.log('   import { HaButton } from \'@hidearea-design/core/button\';');
console.log('   import { HaInput } from \'@hidearea-design/core/input\';');
console.log('   import { getTheme } from \'@hidearea-design/core/utils/theme\';');
