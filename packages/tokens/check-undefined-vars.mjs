import fs from 'fs';
import path from 'path';

// Read variables.css to get all defined variables
const variablesPath = 'build/css/variables.css';
const variablesContent = fs.readFileSync(variablesPath, 'utf-8');
const definedVars = new Set();
const varDefRegex = /^\s*(--[a-z0-9-]+):/gm;
let match;
while ((match = varDefRegex.exec(variablesContent)) !== null) {
  definedVars.add(match[1]);
}

console.log(`✓ Found ${definedVars.size} defined CSS variables\n`);

// Scan all CSS files for var() references and local definitions
const cssDir = 'build/css/components';
const usedVars = new Map(); // varName -> [files using it]
const localVars = new Set(); // variables defined within CSS files
const varUsageRegex = /var\((--[a-z0-9-]+)(?:,|\))/g;

function scanDirectory(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(prefix, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath, relativePath);
    } else if (entry.name.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf-8');

      // Find local variable definitions in this CSS file
      let defMatch;
      while ((defMatch = varDefRegex.exec(content)) !== null) {
        localVars.add(defMatch[1]);
      }

      // Find variable usages
      let match;
      while ((match = varUsageRegex.exec(content)) !== null) {
        const varName = match[1];
        if (!usedVars.has(varName)) {
          usedVars.set(varName, []);
        }
        if (!usedVars.get(varName).includes(relativePath)) {
          usedVars.get(varName).push(relativePath);
        }
      }
    }
  }
}

scanDirectory(cssDir);

console.log(`✓ Scanned component CSS files\n`);

// Find undefined variables (excluding local CSS variables)
const undefinedVars = [];
for (const [varName, files] of usedVars.entries()) {
  if (!definedVars.has(varName) && !localVars.has(varName)) {
    undefinedVars.push({ varName, files });
  }
}

if (undefinedVars.length === 0) {
  console.log('✅ All CSS variables are properly defined!\n');
} else {
  console.log(`❌ Found ${undefinedVars.length} undefined CSS variables:\n`);

  for (const { varName, files } of undefinedVars) {
    console.log(`\n🔴 ${varName}`);
    console.log('   Used in:');
    for (const file of files) {
      console.log(`   - ${file}`);
    }
  }
}
