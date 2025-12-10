#!/usr/bin/env node

/**
 * Bundle Size Measurement Script
 *
 * Measures the size of built files and generates a report.
 * No external dependencies - uses only Node.js built-in modules.
 *
 * Features:
 * - Measures raw and gzipped sizes
 * - Generates JSON and human-readable reports
 * - Compares with previous measurements
 * - Checks against size budgets
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const REPORTS_DIR = path.join(ROOT_DIR, '.performance');
const REPORT_FILE = path.join(REPORTS_DIR, 'bundle-size.json');
const HISTORY_FILE = path.join(REPORTS_DIR, 'bundle-size-history.json');
const CONFIG_FILE = path.join(ROOT_DIR, '.performance.config.mjs');

// Load performance budgets from config file
let SIZE_BUDGETS = {};
try {
  const config = await import(`file://${CONFIG_FILE}`);
  SIZE_BUDGETS = config.default.budgets || {};
} catch (error) {
  console.warn('⚠️  Could not load .performance.config.mjs, using fallback budgets');
  // Fallback budgets if config file doesn't exist
  SIZE_BUDGETS = {
    'js/index.js': {
      raw: 150 * 1024,     // 150 KB (Phase 4 target)
      gzip: 30 * 1024,     // 30 KB
    },
    'css/variables.css': {
      raw: 150 * 1024,     // 150 KB
      gzip: 25 * 1024,     // 25 KB
    },
    'scss/variables.scss': {
      raw: 150 * 1024,     // 150 KB
      gzip: 25 * 1024,     // 25 KB
    },
  };
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Get gzipped size of a file
 */
function getGzippedSize(filePath) {
  const content = fs.readFileSync(filePath);
  const gzipped = zlib.gzipSync(content, { level: 9 });
  return gzipped.length;
}

/**
 * Get file size information
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  const gzipSize = getGzippedSize(filePath);

  return {
    path: path.relative(BUILD_DIR, filePath),
    raw: stats.size,
    gzip: gzipSize,
    rawFormatted: formatBytes(stats.size),
    gzipFormatted: formatBytes(gzipSize),
  };
}

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

/**
 * Check if file size exceeds budget
 */
function checkBudget(fileInfo) {
  const relativePath = fileInfo.path;
  const budget = SIZE_BUDGETS[relativePath];

  if (!budget) {
    return { passed: true, message: 'No budget defined' };
  }

  const rawExceeded = fileInfo.raw > budget.raw;
  const gzipExceeded = fileInfo.gzip > budget.gzip;

  if (rawExceeded || gzipExceeded) {
    const messages = [];
    if (rawExceeded) {
      messages.push(
        `Raw size ${fileInfo.rawFormatted} exceeds budget ${formatBytes(budget.raw)}`
      );
    }
    if (gzipExceeded) {
      messages.push(
        `Gzipped size ${fileInfo.gzipFormatted} exceeds budget ${formatBytes(budget.gzip)}`
      );
    }
    return { passed: false, message: messages.join(', ') };
  }

  return { passed: true, message: 'Within budget' };
}

/**
 * Compare with previous measurements
 */
function compareWithPrevious(currentSizes, previousSizes) {
  if (!previousSizes) {
    return null;
  }

  const comparison = {};

  currentSizes.forEach((current) => {
    const previous = previousSizes.find((p) => p.path === current.path);
    if (!previous) {
      comparison[current.path] = { status: 'new' };
      return;
    }

    const rawDiff = current.raw - previous.raw;
    const gzipDiff = current.gzip - previous.gzip;
    const rawPercent = ((rawDiff / previous.raw) * 100).toFixed(2);
    const gzipPercent = ((gzipDiff / previous.gzip) * 100).toFixed(2);

    comparison[current.path] = {
      status: 'changed',
      raw: {
        diff: rawDiff,
        diffFormatted: formatBytes(Math.abs(rawDiff)),
        percent: rawPercent,
        direction: rawDiff > 0 ? 'increased' : rawDiff < 0 ? 'decreased' : 'unchanged',
      },
      gzip: {
        diff: gzipDiff,
        diffFormatted: formatBytes(Math.abs(gzipDiff)),
        percent: gzipPercent,
        direction: gzipDiff > 0 ? 'increased' : gzipDiff < 0 ? 'decreased' : 'unchanged',
      },
    };
  });

  return comparison;
}

/**
 * Generate human-readable report
 */
function generateTextReport(report) {
  const lines = [];

  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('                    BUNDLE SIZE REPORT                     ');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');

  // Summary
  lines.push('SUMMARY');
  lines.push('─────────────────────────────────────────────────────────');
  lines.push(`Total Files: ${report.files.length}`);
  lines.push(`Total Raw Size: ${formatBytes(report.totalSize.raw)}`);
  lines.push(`Total Gzipped Size: ${formatBytes(report.totalSize.gzip)}`);
  lines.push(`Timestamp: ${new Date(report.timestamp).toLocaleString()}`);
  lines.push('');

  // File details
  lines.push('FILE DETAILS');
  lines.push('─────────────────────────────────────────────────────────');
  report.files.forEach((file) => {
    const budgetCheck = checkBudget(file);
    const status = budgetCheck.passed ? '✓' : '✗';

    lines.push(`${status} ${file.path}`);
    lines.push(`  Raw:    ${file.rawFormatted.padEnd(15)} Budget: ${SIZE_BUDGETS[file.path]?.raw ? formatBytes(SIZE_BUDGETS[file.path].raw) : 'N/A'}`);
    lines.push(`  Gzipped: ${file.gzipFormatted.padEnd(15)} Budget: ${SIZE_BUDGETS[file.path]?.gzip ? formatBytes(SIZE_BUDGETS[file.path].gzip) : 'N/A'}`);

    if (!budgetCheck.passed) {
      lines.push(`  ⚠️  ${budgetCheck.message}`);
    }

    // Show comparison if available
    if (report.comparison && report.comparison[file.path]) {
      const comp = report.comparison[file.path];
      if (comp.status === 'new') {
        lines.push(`  📦 New file`);
      } else if (comp.status === 'changed') {
        if (comp.raw.direction !== 'unchanged') {
          const arrow = comp.raw.direction === 'increased' ? '↑' : '↓';
          lines.push(`  ${arrow} Raw: ${comp.raw.diffFormatted} (${comp.raw.percent}%)`);
        }
        if (comp.gzip.direction !== 'unchanged') {
          const arrow = comp.gzip.direction === 'increased' ? '↑' : '↓';
          lines.push(`  ${arrow} Gzipped: ${comp.gzip.diffFormatted} (${comp.gzip.percent}%)`);
        }
      }
    }
    lines.push('');
  });

  // Budget summary
  const budgetResults = report.files.map(checkBudget);
  const passed = budgetResults.filter((r) => r.passed).length;
  const failed = budgetResults.filter((r) => !r.passed).length;

  lines.push('BUDGET COMPLIANCE');
  lines.push('─────────────────────────────────────────────────────────');
  lines.push(`Passed: ${passed}/${report.files.length}`);
  if (failed > 0) {
    lines.push(`Failed: ${failed}/${report.files.length}`);
    lines.push('');
    lines.push('⚠️  Some files exceed their size budgets!');
  } else {
    lines.push('');
    lines.push('✓ All files within budget limits');
  }
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');

  return lines.join('\n');
}

/**
 * Main function
 */
function main() {
  console.log('📊 Measuring bundle sizes...\n');

  // Ensure reports directory exists
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  // Get all files in build directory
  const allFiles = getAllFiles(BUILD_DIR);
  const fileSizes = allFiles.map(getFileSize);

  // Calculate total size
  const totalSize = {
    raw: fileSizes.reduce((sum, file) => sum + file.raw, 0),
    gzip: fileSizes.reduce((sum, file) => sum + file.gzip, 0),
  };

  // Load previous measurements
  let previousSizes = null;
  if (fs.existsSync(REPORT_FILE)) {
    try {
      const previousReport = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf-8'));
      previousSizes = previousReport.files;
    } catch (error) {
      console.warn('⚠️  Could not load previous measurements');
    }
  }

  // Compare with previous
  const comparison = compareWithPrevious(fileSizes, previousSizes);

  // Create report
  const report = {
    timestamp: new Date().toISOString(),
    files: fileSizes,
    totalSize,
    budgets: SIZE_BUDGETS,
    comparison,
  };

  // Save report
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));
  console.log(`✓ Report saved to ${path.relative(ROOT_DIR, REPORT_FILE)}`);

  // Update history
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch (error) {
      // Ignore invalid history file
    }
  }

  history.push({
    timestamp: report.timestamp,
    totalSize: report.totalSize,
  });

  // Keep only last 100 entries
  if (history.length > 100) {
    history = history.slice(-100);
  }

  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));

  // Generate and display text report
  const textReport = generateTextReport(report);
  console.log(textReport);

  // Exit with error if budget exceeded
  const budgetResults = fileSizes.map(checkBudget);
  const failed = budgetResults.filter((r) => !r.passed).length;

  if (failed > 0) {
    process.exit(1);
  }
}

main();
