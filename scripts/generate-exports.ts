#!/usr/bin/env tsx
/**
 * Generate package.json exports field for per-component imports
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

interface ExportEntry {
  types: string;
  import: string;
}

interface ExportsField {
  [key: string]: ExportEntry | { [key: string]: ExportEntry };
}

function generateCoreExports(): ExportsField {
  const componentsDir = path.join(rootDir, 'packages/core/src/components');
  const components = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  const exports: ExportsField = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.js'
    },
    './package.json': './package.json'
  };

  // Add each component
  for (const component of components) {
    exports[`./${component}`] = {
      types: `./dist/components/${component}/${component}.d.ts`,
      import: `./dist/components/${component}/${component}.js`
    };
  }

  // Add utility exports
  exports['./utils/theme'] = {
    types: './dist/utils/theme.d.ts',
    import: './dist/utils/theme.js'
  };

  exports['./metadata'] = {
    types: './dist/metadata-index.d.ts',
    import: './dist/metadata-index.js'
  };

  exports['./types/metadata'] = {
    types: './dist/types/metadata.d.ts',
    import: './dist/types/metadata.js'
  };

  // Keep wildcard for flexibility
  exports['./components/*'] = {
    types: './dist/components/*.d.ts',
    import: './dist/components/*.js'
  };

  return exports;
}

function generateReactExports(): ExportsField {
  const componentsDir = path.join(rootDir, 'packages/core/src/components');
  const components = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  const exports: ExportsField = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.es.js'
    },
    './package.json': './package.json'
  };

  // React wrapper exports each component from the wrapper file
  for (const component of components) {
    // Convert kebab-case to PascalCase for React component names
    const pascalName = component
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    exports[`./${component}`] = {
      types: `./dist/components/${pascalName}.d.ts`,
      import: `./dist/components/${pascalName}.js`
    };
  }

  return exports;
}

function generateVueExports(): ExportsField {
  const componentsDir = path.join(rootDir, 'packages/core/src/components');
  const components = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  const exports: ExportsField = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/index.es.js'
    },
    './package.json': './package.json'
  };

  // Vue wrapper exports
  for (const component of components) {
    const pascalName = component
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    exports[`./${component}`] = {
      types: `./dist/components/${pascalName}.d.ts`,
      import: `./dist/components/${pascalName}.js`
    };
  }

  return exports;
}

function updatePackageJson(packagePath: string, exports: ExportsField) {
  const pkgPath = path.join(rootDir, packagePath, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  pkg.exports = exports;
  pkg.sideEffects = false;

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✅ Updated ${packagePath}/package.json`);
}

function main() {
  console.log('🔧 Generating package.json exports for per-component imports...\n');

  // Generate and update Core package
  const coreExports = generateCoreExports();
  updatePackageJson('packages/core', coreExports);
  console.log(`   Added ${Object.keys(coreExports).length} export entries\n`);

  // Note: React and Vue wrappers would need individual component files first
  // For now, just update their main exports with sideEffects
  const reactPkgPath = path.join(rootDir, 'packages/react/package.json');
  const reactPkg = JSON.parse(fs.readFileSync(reactPkgPath, 'utf-8'));
  reactPkg.sideEffects = false;
  fs.writeFileSync(reactPkgPath, JSON.stringify(reactPkg, null, 2) + '\n');
  console.log('✅ Updated packages/react/package.json (sideEffects only)');

  const vuePkgPath = path.join(rootDir, 'packages/vue/package.json');
  const vuePkg = JSON.parse(fs.readFileSync(vuePkgPath, 'utf-8'));
  vuePkg.sideEffects = false;
  fs.writeFileSync(vuePkgPath, JSON.stringify(vuePkg, null, 2) + '\n');
  console.log('✅ Updated packages/vue/package.json (sideEffects only)');

  console.log('\n✨ Done! Per-component imports are now available.');
  console.log('\nUsage examples:');
  console.log('  import { HaButton } from \'@hidearea-design/core/button\';');
  console.log('  import { HaInput } from \'@hidearea-design/core/input\';');
  console.log('  import { getTheme } from \'@hidearea-design/core/utils/theme\';');
}

main();
