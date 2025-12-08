#!/usr/bin/env node

/**
 * Figma Token Synchronization Tool
 *
 * Syncs design tokens between Figma and Style Dictionary format.
 * Supports both Figma REST API and manual JSON export.
 *
 * Usage:
 *   # Sync from Figma API (requires FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY)
 *   node scripts/figma-sync.mjs --api
 *
 *   # Import from exported Figma Variables JSON
 *   node scripts/figma-sync.mjs --import path/to/figma-variables.json
 *
 *   # Validate existing tokens against Figma format
 *   node scripts/figma-sync.mjs --validate
 *
 * @module figma-sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Configuration
const CONFIG = {
  figmaApiUrl: 'https://api.figma.com/v1',
  outputDir: path.join(ROOT_DIR, 'src', 'figma-sync'),
  backupDir: path.join(ROOT_DIR, '.figma-backups'),
  tokenMappingFile: path.join(ROOT_DIR, '.figma-token-mapping.json'),
};

// Color logging utilities
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

/**
 * Fetch data from Figma REST API
 * @param {string} endpoint - API endpoint path
 * @param {string} token - Figma access token
 * @returns {Promise<Object>} API response
 */
function fetchFromFigma(endpoint, token) {
  return new Promise((resolve, reject) => {
    const url = `${CONFIG.figmaApiUrl}${endpoint}`;

    const options = {
      headers: {
        'X-Figma-Token': token,
      },
    };

    https.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Failed to parse JSON response: ${error.message}`));
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });
  });
}

/**
 * Fetch variables from Figma API
 * @param {string} fileKey - Figma file key
 * @param {string} token - Figma access token
 * @returns {Promise<Object>} Variables and collections
 */
async function fetchFigmaVariables(fileKey, token) {
  logInfo('Fetching variables from Figma API...');

  try {
    const response = await fetchFromFigma(`/files/${fileKey}/variables/local`, token);

    if (response.status !== 200) {
      throw new Error(`API returned status ${response.status}`);
    }

    const { variables, variableCollections } = response.meta;

    logSuccess(`Fetched ${Object.keys(variables).length} variables from ${Object.keys(variableCollections).length} collections`);

    return { variables, variableCollections };
  } catch (error) {
    throw new Error(`Failed to fetch from Figma API: ${error.message}`);
  }
}

/**
 * Convert Figma variable type to Style Dictionary type
 * @param {string} figmaType - Figma resolvedType
 * @returns {string} Style Dictionary type
 */
function mapFigmaTypeToSDType(figmaType) {
  const typeMap = {
    'COLOR': 'color',
    'FLOAT': 'number',
    'STRING': 'string',
    'BOOLEAN': 'boolean',
  };

  return typeMap[figmaType] || 'string';
}

/**
 * Convert Figma RGBA color to hex
 * @param {Object} rgba - Figma RGBA color {r, g, b, a}
 * @returns {string} Hex color string
 */
function rgbaToHex(rgba) {
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;

  // Include alpha if not fully opaque
  if (rgba.a !== undefined && rgba.a < 1) {
    return `${hex}${toHex(rgba.a)}`;
  }

  return hex;
}

/**
 * Resolve Figma variable value (handles aliases)
 * @param {*} value - Figma variable value
 * @param {Object} variables - All variables for alias resolution
 * @returns {*} Resolved value
 */
function resolveFigmaValue(value, variables) {
  // Handle alias references
  if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
    const aliasedVar = variables[value.id];
    if (aliasedVar) {
      // Return Style Dictionary reference format
      const aliasPath = aliasedVar.name.split('/').join('.');
      return `{${aliasPath}}`;
    }
    return null;
  }

  // Handle color values
  if (value && typeof value === 'object' && value.r !== undefined) {
    return rgbaToHex(value);
  }

  // Handle primitive values
  return value;
}

/**
 * Transform Figma variables to Style Dictionary format
 * @param {Object} variables - Figma variables
 * @param {Object} variableCollections - Figma variable collections
 * @returns {Object} Style Dictionary tokens by collection
 */
function transformFigmaToStyleDictionary(variables, variableCollections) {
  logInfo('Transforming Figma variables to Style Dictionary format...');

  const tokensByCollection = {};

  // Process each collection
  for (const [collectionId, collection] of Object.entries(variableCollections)) {
    const collectionName = collection.name.toLowerCase().replace(/\s+/g, '-');
    const tokens = {};

    // Get variables in this collection
    const collectionVars = Object.values(variables).filter(
      (v) => v.variableCollectionId === collectionId
    );

    logInfo(`  Processing collection: ${collection.name} (${collectionVars.length} variables)`);

    // Transform each variable
    for (const variable of collectionVars) {
      // Parse variable name path (e.g., "color/primary/500" -> ["color", "primary", "500"])
      const nameParts = variable.name.split('/').map(part =>
        part.trim().toLowerCase().replace(/\s+/g, '-')
      );

      // Get the default mode value
      const defaultModeId = collection.defaultModeId;
      const value = variable.valuesByMode[defaultModeId];
      const resolvedValue = resolveFigmaValue(value, variables);

      if (resolvedValue === null) {
        logWarning(`    Skipping variable "${variable.name}" - could not resolve value`);
        continue;
      }

      // Build nested token object
      let current = tokens;
      for (let i = 0; i < nameParts.length - 1; i++) {
        const part = nameParts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }

      // Set the final value
      const finalKey = nameParts[nameParts.length - 1];
      current[finalKey] = {
        value: resolvedValue,
        type: mapFigmaTypeToSDType(variable.resolvedType),
      };

      if (variable.description) {
        current[finalKey].comment = variable.description;
      }

      // Store Figma metadata for reverse sync
      current[finalKey].$figma = {
        id: variable.id,
        key: variable.key,
        collectionId: collectionId,
      };
    }

    tokensByCollection[collectionName] = {
      name: collection.name,
      tokens,
      modes: collection.modes,
      $figma: {
        id: collectionId,
        key: collection.key,
      },
    };
  }

  logSuccess(`Transformed ${Object.keys(tokensByCollection).length} collections`);

  return tokensByCollection;
}

/**
 * Import tokens from Figma Variables JSON export
 * @param {string} jsonPath - Path to Figma variables JSON file
 * @returns {Object} Transformed tokens
 */
function importFromFigmaJson(jsonPath) {
  logInfo(`Importing tokens from ${jsonPath}...`);

  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // Check if it's a Figma API response format
    if (data.meta && data.meta.variables && data.meta.variableCollections) {
      return transformFigmaToStyleDictionary(
        data.meta.variables,
        data.meta.variableCollections
      );
    }

    // Check if it's already extracted
    if (data.variables && data.variableCollections) {
      return transformFigmaToStyleDictionary(
        data.variables,
        data.variableCollections
      );
    }

    throw new Error('Unrecognized JSON format. Expected Figma Variables API response.');
  } catch (error) {
    throw new Error(`Failed to import JSON: ${error.message}`);
  }
}

/**
 * Create backup of current tokens
 * @param {string} sourceDir - Directory to backup
 */
function createBackup(sourceDir) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(CONFIG.backupDir, timestamp);

  logInfo(`Creating backup at ${backupPath}...`);

  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }

  fs.mkdirSync(backupPath, { recursive: true });

  // Copy all JSON/YAML files
  const files = fs.readdirSync(sourceDir);
  let count = 0;

  for (const file of files) {
    if (file.endsWith('.json') || file.endsWith('.yaml') || file.endsWith('.yml')) {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(backupPath, file);

      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        count++;
      }
    }
  }

  logSuccess(`Backed up ${count} files to ${backupPath}`);
}

/**
 * Write transformed tokens to files
 * @param {Object} tokensByCollection - Tokens organized by collection
 */
function writeTokens(tokensByCollection) {
  logInfo('Writing tokens to files...');

  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  let fileCount = 0;

  for (const [collectionName, collectionData] of Object.entries(tokensByCollection)) {
    const fileName = `${collectionName}.json`;
    const filePath = path.join(CONFIG.outputDir, fileName);

    const output = {
      $description: `Synced from Figma: ${collectionData.name}`,
      $figma: collectionData.$figma,
      ...collectionData.tokens,
    };

    fs.writeFileSync(filePath, JSON.stringify(output, null, 2), 'utf-8');
    logSuccess(`  Wrote ${fileName}`);
    fileCount++;
  }

  logSuccess(`Wrote ${fileCount} token files to ${CONFIG.outputDir}`);
}

/**
 * Validate token structure
 * @param {Object} tokens - Tokens to validate
 * @returns {Object} Validation results
 */
function validateTokens(tokens) {
  const errors = [];
  const warnings = [];

  function validateTokenValue(token, path) {
    if (!token.value) {
      errors.push(`Missing value at ${path}`);
    }

    if (token.type === 'color') {
      const value = token.value;
      // Check if it's a valid hex color or reference
      if (typeof value === 'string') {
        if (!value.startsWith('#') && !value.startsWith('{')) {
          warnings.push(`Unexpected color format at ${path}: ${value}`);
        }
      }
    }
  }

  function traverse(obj, currentPath = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue; // Skip metadata

      const newPath = currentPath ? `${currentPath}.${key}` : key;

      if (value && typeof value === 'object' && value.value !== undefined) {
        // This is a token
        validateTokenValue(value, newPath);
      } else if (value && typeof value === 'object') {
        // This is a group
        traverse(value, newPath);
      }
    }
  }

  traverse(tokens);

  return { errors, warnings };
}

/**
 * Main sync function
 * @param {Object} options - Sync options
 */
async function sync(options) {
  log('\n' + '='.repeat(60), colors.bright);
  log('Figma Token Synchronization', colors.bright + colors.cyan);
  log('='.repeat(60) + '\n', colors.bright);

  try {
    let tokensByCollection;

    if (options.api) {
      // Sync from Figma API
      const token = process.env.FIGMA_ACCESS_TOKEN;
      const fileKey = process.env.FIGMA_FILE_KEY;

      if (!token || !fileKey) {
        throw new Error(
          'FIGMA_ACCESS_TOKEN and FIGMA_FILE_KEY environment variables are required for API sync'
        );
      }

      const { variables, variableCollections } = await fetchFigmaVariables(fileKey, token);
      tokensByCollection = transformFigmaToStyleDictionary(variables, variableCollections);

    } else if (options.import) {
      // Import from JSON file
      tokensByCollection = importFromFigmaJson(options.import);

    } else {
      throw new Error('Please specify --api or --import <file>');
    }

    // Validate tokens
    logInfo('\nValidating tokens...');
    let hasErrors = false;

    for (const [collectionName, collectionData] of Object.entries(tokensByCollection)) {
      const { errors, warnings } = validateTokens(collectionData.tokens);

      if (errors.length > 0) {
        logError(`Collection "${collectionName}" has ${errors.length} errors:`);
        errors.forEach(err => logError(`  - ${err}`));
        hasErrors = true;
      }

      if (warnings.length > 0) {
        logWarning(`Collection "${collectionName}" has ${warnings.length} warnings:`);
        warnings.forEach(warn => logWarning(`  - ${warn}`));
      }

      if (errors.length === 0 && warnings.length === 0) {
        logSuccess(`Collection "${collectionName}" is valid`);
      }
    }

    if (hasErrors) {
      throw new Error('Validation failed. Please fix errors before continuing.');
    }

    // Create backup
    if (fs.existsSync(CONFIG.outputDir)) {
      createBackup(CONFIG.outputDir);
    }

    // Write tokens
    writeTokens(tokensByCollection);

    log('\n' + '='.repeat(60), colors.bright);
    logSuccess('Token synchronization completed successfully!');
    log('='.repeat(60) + '\n', colors.bright);

    logInfo('Next steps:');
    logInfo('1. Review the generated tokens in: ' + CONFIG.outputDir);
    logInfo('2. Integrate with your existing tokens in src/base/');
    logInfo('3. Run: npm run build to regenerate CSS variables');

  } catch (error) {
    log('\n' + '='.repeat(60), colors.bright);
    logError('Synchronization failed!');
    logError(error.message);
    log('='.repeat(60) + '\n', colors.bright);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  api: args.includes('--api'),
  import: args.includes('--import') ? args[args.indexOf('--import') + 1] : null,
  validate: args.includes('--validate'),
};

if (args.includes('--help') || args.length === 0) {
  console.log(`
Figma Token Synchronization Tool

Usage:
  node scripts/figma-sync.mjs [options]

Options:
  --api                 Sync from Figma REST API (requires env vars)
  --import <file>       Import from Figma Variables JSON export
  --validate            Validate token structure only
  --help                Show this help message

Environment Variables (for --api):
  FIGMA_ACCESS_TOKEN    Your Figma personal access token
  FIGMA_FILE_KEY        The file key from your Figma file URL

Examples:
  # Sync from Figma API
  FIGMA_ACCESS_TOKEN=xxx FIGMA_FILE_KEY=yyy node scripts/figma-sync.mjs --api

  # Import from JSON export
  node scripts/figma-sync.mjs --import ./figma-export.json

  # Validate only
  node scripts/figma-sync.mjs --validate
`);
  process.exit(0);
}

// Run sync
sync(options);
