#!/usr/bin/env node

/**
 * JSON to YAML Conversion Script
 *
 * Converts semantic token JSON files to YAML format with:
 * - Better readability
 * - Comment support
 * - Consistent formatting
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tokensDir = path.resolve(__dirname, '..');

// Files to convert
const files = [
  'src/semantic/colors.json',
  'src/semantic/typography.json',
  'src/semantic/components.json',
  'src/semantic/surfaces.json',
  'src/semantic/states.json',
  'src/semantic/layout.json',
  'src/semantic/interactions.json',
  'src/semantic/aliases.json'
];

console.log('🔄 Converting JSON files to YAML...\n');

let converted = 0;
let errors = 0;

files.forEach(file => {
  const jsonPath = path.join(tokensDir, file);
  const yamlPath = jsonPath.replace('.json', '.yaml');

  try {
    // Check if file exists
    if (!fs.existsSync(jsonPath)) {
      console.log(`⚠️  Skipped: ${file} (not found)`);
      return;
    }

    // Read JSON
    const jsonContent = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(jsonContent);

    // Convert to YAML with custom options
    const yamlContent = YAML.stringify(data, {
      indent: 2,
      lineWidth: 0, // Don't wrap lines
      minContentWidth: 0,
      sortMapEntries: false // Preserve order
    });

    // Write YAML
    fs.writeFileSync(yamlPath, yamlContent, 'utf8');

    // Delete old JSON file
    fs.unlinkSync(jsonPath);

    console.log(`✅ Converted: ${file} → ${path.basename(yamlPath)}`);
    converted++;
  } catch (error) {
    console.error(`❌ Failed: ${file}`);
    console.error(`   Error: ${error.message}`);
    errors++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Converted: ${converted} files`);
console.log(`   Errors: ${errors} files`);

if (errors > 0) {
  console.log('\n⚠️  Some files failed to convert. Please check the errors above.');
  process.exit(1);
}

console.log('\n✨ All files converted successfully!');
console.log('\n💡 Next steps:');
console.log('   1. Review the generated YAML files');
console.log('   2. Add comments where needed');
console.log('   3. Run: npm run build');
console.log('   4. Verify output is unchanged');
