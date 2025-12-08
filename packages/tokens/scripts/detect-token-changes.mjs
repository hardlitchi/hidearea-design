#!/usr/bin/env node

/**
 * Token Change Detection
 *
 * Detects changes in design tokens between git commits.
 * Used for automated deployment and versioning.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function git(command) {
  try {
    return execSync(`git ${command}`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch {
    return '';
  }
}

function getFileAtRef(ref, filePath) {
  try {
    return execSync(`git show ${ref}:${filePath}`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  } catch {
    return null;
  }
}

function parseJSON(content) {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

function getChangedFiles(fromRef, toRef) {
  const output = git(`diff --name-only ${fromRef}..${toRef}`);
  if (!output) return [];

  return output
    .split('\n')
    .filter(file => file.startsWith('packages/tokens/src/'))
    .map(file => file.replace('packages/tokens/', ''))
    .filter(file => file.endsWith('.json') || file.endsWith('.yaml') || file.endsWith('.yml'));
}

function flattenObject(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;

    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === 'object' && value.value !== undefined) {
      result[newKey] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenObject(value, newKey));
    }
  }

  return result;
}

function compareTokens(oldTokens, newTokens) {
  const changes = {
    added: [],
    removed: [],
    modified: [],
  };

  const oldFlat = flattenObject(oldTokens);
  const newFlat = flattenObject(newTokens);

  for (const [path, newToken] of Object.entries(newFlat)) {
    const oldToken = oldFlat[path];

    if (!oldToken) {
      changes.added.push({
        path,
        value: newToken.value,
        type: newToken.type,
        comment: newToken.comment,
      });
    } else if (JSON.stringify(oldToken.value) !== JSON.stringify(newToken.value)) {
      changes.modified.push({
        path,
        oldValue: oldToken.value,
        newValue: newToken.value,
        type: newToken.type,
        comment: newToken.comment,
      });
    }
  }

  for (const [path, oldToken] of Object.entries(oldFlat)) {
    if (!newFlat[path]) {
      changes.removed.push({
        path,
        value: oldToken.value,
        type: oldToken.type,
        comment: oldToken.comment,
      });
    }
  }

  return changes;
}

function analyzeChanges(fromRef, toRef) {
  const changedFiles = getChangedFiles(fromRef, toRef);

  const analysis = {
    summary: {
      totalFiles: changedFiles.length,
      added: 0,
      removed: 0,
      modified: 0,
    },
    files: {},
    breaking: [],
    fromRef,
    toRef,
  };

  for (const file of changedFiles) {
    const oldContent = getFileAtRef(fromRef, `packages/tokens/${file}`);
    const newContent = getFileAtRef(toRef, `packages/tokens/${file}`);

    if (!oldContent && !newContent) continue;

    const fileChanges = {
      status: oldContent && newContent ? 'modified' : oldContent ? 'deleted' : 'added',
      changes: { added: [], removed: [], modified: [] },
    };

    if (oldContent && newContent) {
      const oldTokens = parseJSON(oldContent);
      const newTokens = parseJSON(newContent);

      if (oldTokens && newTokens) {
        fileChanges.changes = compareTokens(oldTokens, newTokens);
      }
    } else if (newContent) {
      const newTokens = parseJSON(newContent);
      if (newTokens) {
        const flat = flattenObject(newTokens);
        fileChanges.changes.added = Object.entries(flat).map(([path, token]) => ({
          path,
          value: token.value,
          type: token.type,
          comment: token.comment,
        }));
      }
    } else if (oldContent) {
      const oldTokens = parseJSON(oldContent);
      if (oldTokens) {
        const flat = flattenObject(oldTokens);
        fileChanges.changes.removed = Object.entries(flat).map(([path, token]) => ({
          path,
          value: token.value,
          type: token.type,
          comment: token.comment,
        }));
      }
    }

    analysis.files[file] = fileChanges;
    analysis.summary.added += fileChanges.changes.added.length;
    analysis.summary.removed += fileChanges.changes.removed.length;
    analysis.summary.modified += fileChanges.changes.modified.length;

    for (const removed of fileChanges.changes.removed) {
      analysis.breaking.push({
        type: 'removed',
        file,
        token: removed.path,
        reason: 'Token was removed',
      });
    }
  }

  return analysis;
}

function determineVersionBump(analysis) {
  if (analysis.breaking.length > 0) return 'major';
  if (analysis.summary.added > 0) return 'minor';
  if (analysis.summary.modified > 0) return 'patch';
  return 'none';
}

function formatMarkdown(analysis) {
  const lines = [];

  lines.push('# Token Changes Report\n');
  lines.push(`**From:** \`${analysis.fromRef}\``);
  lines.push(`**To:** \`${analysis.toRef}\`\n`);
  lines.push('## Summary\n');
  lines.push(`- **Files Changed:** ${analysis.summary.totalFiles}`);
  lines.push(`- **Tokens Added:** ${analysis.summary.added}`);
  lines.push(`- **Tokens Modified:** ${analysis.summary.modified}`);
  lines.push(`- **Tokens Removed:** ${analysis.summary.removed}`);
  lines.push(`- **Version Bump:** \`${determineVersionBump(analysis)}\`\n`);

  if (analysis.breaking.length > 0) {
    lines.push('## ⚠️ Breaking Changes\n');
    for (const breaking of analysis.breaking) {
      lines.push(`- **${breaking.file}**: \`${breaking.token}\``);
      lines.push(`  - ${breaking.reason}\n`);
    }
  }

  return lines.join('\n');
}

function formatText(analysis) {
  console.log('\n' + '='.repeat(60));
  console.log('Token Changes Report');
  console.log('='.repeat(60) + '\n');
  console.log(`From: ${analysis.fromRef}`);
  console.log(`To: ${analysis.toRef}\n`);
  console.log('Summary:');
  console.log(`  Files Changed: ${analysis.summary.totalFiles}`);
  console.log(`  Tokens Added: ${analysis.summary.added}`);
  console.log(`  Tokens Modified: ${analysis.summary.modified}`);
  console.log(`  Tokens Removed: ${analysis.summary.removed}`);
  console.log(`  Version Bump: ${determineVersionBump(analysis)}\n`);

  if (analysis.breaking.length > 0) {
    console.log('⚠️  Breaking Changes:');
    for (const breaking of analysis.breaking) {
      console.log(`  ${breaking.file}: ${breaking.token}`);
      console.log(`    ${breaking.reason}`);
    }
    console.log('');
  }

  console.log('='.repeat(60) + '\n');
}

// Main
const args = process.argv.slice(2);
const options = {
  from: 'main',
  to: 'HEAD',
  format: 'text',
};

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--from' && args[i + 1]) {
    options.from = args[i + 1];
    i++;
  } else if (args[i] === '--to' && args[i + 1]) {
    options.to = args[i + 1];
    i++;
  } else if (args[i] === '--format' && args[i + 1]) {
    options.format = args[i + 1];
    i++;
  } else if (args[i] === '--help') {
    console.log(`
Token Change Detection

Usage:
  node scripts/detect-token-changes.mjs [options]

Options:
  --from <ref>      Starting git reference (default: main)
  --to <ref>        Ending git reference (default: HEAD)
  --format <type>   Output format: text, json, markdown (default: text)
  --help            Show this help message
`);
    process.exit(0);
  }
}

try {
  const analysis = analyzeChanges(options.from, options.to);

  if (options.format === 'json') {
    console.log(JSON.stringify(analysis, null, 2));
  } else if (options.format === 'markdown') {
    console.log(formatMarkdown(analysis));
  } else {
    formatText(analysis);
  }

  process.exit(analysis.summary.totalFiles > 0 ? 0 : 1);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
