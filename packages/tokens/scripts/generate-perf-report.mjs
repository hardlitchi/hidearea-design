#!/usr/bin/env node

/**
 * Performance Report Generator
 *
 * Generates a comprehensive performance report including:
 * - Bundle size trends
 * - Performance metrics over time
 * - Budget compliance status
 * - Recommendations
 *
 * No external dependencies - uses only Node.js built-in modules.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const REPORTS_DIR = path.join(ROOT_DIR, '.performance');
const BUNDLE_SIZE_FILE = path.join(REPORTS_DIR, 'bundle-size.json');
const HISTORY_FILE = path.join(REPORTS_DIR, 'bundle-size-history.json');
const OUTPUT_FILE = path.join(REPORTS_DIR, 'performance-report.md');

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
 * Calculate trend (increasing, decreasing, stable)
 */
function calculateTrend(history, key = 'raw') {
  if (!history || history.length < 2) {
    return 'N/A';
  }

  const recent = history.slice(-5);
  const values = recent.map((h) => h.totalSize[key]);

  let increasing = 0;
  let decreasing = 0;

  for (let i = 1; i < values.length; i++) {
    if (values[i] > values[i - 1]) increasing++;
    if (values[i] < values[i - 1]) decreasing++;
  }

  if (increasing > decreasing) return '↗️ Increasing';
  if (decreasing > increasing) return '↘️ Decreasing';
  return '→ Stable';
}

/**
 * Get performance score (0-100)
 */
function getPerformanceScore(bundleSize) {
  const files = bundleSize.files;
  const budgets = bundleSize.budgets;

  let totalScore = 0;
  let fileCount = 0;

  files.forEach((file) => {
    const budget = budgets[file.path];
    if (!budget) return;

    fileCount++;

    // Score based on how close to budget (100 = at or under budget, 0 = 2x over budget)
    const rawScore = Math.max(0, 100 - ((file.raw - budget.raw) / budget.raw) * 100);
    const gzipScore = Math.max(0, 100 - ((file.gzip - budget.gzip) / budget.gzip) * 100);

    totalScore += (rawScore + gzipScore) / 2;
  });

  return fileCount > 0 ? Math.round(totalScore / fileCount) : 100;
}

/**
 * Generate recommendations
 */
function generateRecommendations(bundleSize, history) {
  const recommendations = [];

  // Check for files over budget
  bundleSize.files.forEach((file) => {
    const budget = bundleSize.budgets[file.path];
    if (!budget) return;

    if (file.raw > budget.raw) {
      const excess = ((file.raw - budget.raw) / budget.raw * 100).toFixed(1);
      recommendations.push({
        severity: 'warning',
        message: `\`${file.path}\` exceeds raw size budget by ${excess}%`,
        suggestion: 'Consider removing unused tokens or optimizing the output format',
      });
    }

    if (file.gzip > budget.gzip) {
      const excess = ((file.gzip - budget.gzip) / budget.gzip * 100).toFixed(1);
      recommendations.push({
        severity: 'warning',
        message: `\`${file.path}\` exceeds gzipped size budget by ${excess}%`,
        suggestion: 'Gzipped size is high - check for repetitive patterns or consider minification',
      });
    }
  });

  // Check for growth trend
  if (history && history.length >= 5) {
    const recent = history.slice(-5);
    const oldest = recent[0].totalSize.gzip;
    const newest = recent[recent.length - 1].totalSize.gzip;
    const growth = ((newest - oldest) / oldest * 100);

    if (growth > 10) {
      recommendations.push({
        severity: 'info',
        message: `Bundle size has grown ${growth.toFixed(1)}% over the last 5 builds`,
        suggestion: 'Monitor token additions and consider auditing for unused or duplicate tokens',
      });
    }
  }

  // General best practices
  if (recommendations.length === 0) {
    recommendations.push({
      severity: 'success',
      message: 'All files are within budget limits',
      suggestion: 'Keep monitoring bundle size with each build to maintain performance',
    });
  }

  return recommendations;
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport(bundleSize, history) {
  const lines = [];
  const timestamp = new Date(bundleSize.timestamp).toLocaleString();
  const score = getPerformanceScore(bundleSize);

  // Header
  lines.push('# Performance Report');
  lines.push('');
  lines.push(`**Generated:** ${timestamp}`);
  lines.push(`**Performance Score:** ${score}/100`);
  lines.push('');

  // Score badge
  let scoreBadge = '🟢 Excellent';
  if (score < 90) scoreBadge = '🟡 Good';
  if (score < 70) scoreBadge = '🟠 Fair';
  if (score < 50) scoreBadge = '🔴 Poor';
  lines.push(`**Status:** ${scoreBadge}`);
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Total Files | ${bundleSize.files.length} |`);
  lines.push(`| Total Raw Size | ${formatBytes(bundleSize.totalSize.raw)} |`);
  lines.push(`| Total Gzipped Size | ${formatBytes(bundleSize.totalSize.gzip)} |`);
  lines.push(`| Compression Ratio | ${((1 - bundleSize.totalSize.gzip / bundleSize.totalSize.raw) * 100).toFixed(1)}% |`);

  if (history && history.length > 0) {
    lines.push(`| Trend (Last 5 builds) | ${calculateTrend(history, 'gzip')} |`);
  }

  lines.push('');

  // File Details
  lines.push('## File Details');
  lines.push('');
  lines.push('| File | Raw Size | Gzipped | Budget Status |');
  lines.push('|------|----------|---------|---------------|');

  bundleSize.files.forEach((file) => {
    const budget = bundleSize.budgets[file.path];
    let status = '✓ OK';

    if (budget) {
      if (file.raw > budget.raw || file.gzip > budget.gzip) {
        status = '✗ Over Budget';
      }
    } else {
      status = 'ℹ️ No Budget';
    }

    lines.push(`| \`${file.path}\` | ${file.rawFormatted} | ${file.gzipFormatted} | ${status} |`);
  });

  lines.push('');

  // Budget Details
  lines.push('## Budget Compliance');
  lines.push('');

  bundleSize.files.forEach((file) => {
    const budget = bundleSize.budgets[file.path];
    if (!budget) return;

    lines.push(`### \`${file.path}\``);
    lines.push('');
    lines.push('| Type | Current | Budget | Usage |');
    lines.push('|------|---------|--------|-------|');

    const rawUsage = ((file.raw / budget.raw) * 100).toFixed(1);
    const rawStatus = file.raw <= budget.raw ? '✓' : '✗';
    lines.push(`| ${rawStatus} Raw | ${file.rawFormatted} | ${formatBytes(budget.raw)} | ${rawUsage}% |`);

    const gzipUsage = ((file.gzip / budget.gzip) * 100).toFixed(1);
    const gzipStatus = file.gzip <= budget.gzip ? '✓' : '✗';
    lines.push(`| ${gzipStatus} Gzipped | ${file.gzipFormatted} | ${formatBytes(budget.gzip)} | ${gzipUsage}% |`);

    lines.push('');
  });

  // Historical Trend
  if (history && history.length > 1) {
    lines.push('## Size History');
    lines.push('');
    lines.push('Last 10 builds:');
    lines.push('');
    lines.push('| Build | Date | Raw Size | Gzipped Size | Change |');
    lines.push('|-------|------|----------|--------------|--------|');

    const recentHistory = history.slice(-10);
    recentHistory.forEach((entry, index) => {
      const date = new Date(entry.timestamp).toLocaleDateString();
      let change = '-';

      if (index > 0) {
        const prevSize = recentHistory[index - 1].totalSize.gzip;
        const currentSize = entry.totalSize.gzip;
        const diff = currentSize - prevSize;
        const diffPercent = ((diff / prevSize) * 100).toFixed(2);

        if (diff > 0) {
          change = `+${formatBytes(diff)} (+${diffPercent}%)`;
        } else if (diff < 0) {
          change = `-${formatBytes(Math.abs(diff))} (${diffPercent}%)`;
        } else {
          change = 'No change';
        }
      }

      lines.push(
        `| ${index + 1} | ${date} | ${formatBytes(entry.totalSize.raw)} | ${formatBytes(entry.totalSize.gzip)} | ${change} |`
      );
    });

    lines.push('');
  }

  // Recommendations
  const recommendations = generateRecommendations(bundleSize, history);

  lines.push('## Recommendations');
  lines.push('');

  recommendations.forEach((rec) => {
    let icon = 'ℹ️';
    if (rec.severity === 'warning') icon = '⚠️';
    if (rec.severity === 'error') icon = '❌';
    if (rec.severity === 'success') icon = '✅';

    lines.push(`${icon} **${rec.message}**`);
    lines.push('');
    lines.push(`   ${rec.suggestion}`);
    lines.push('');
  });

  // Footer
  lines.push('---');
  lines.push('');
  lines.push('*This report is automatically generated by the performance monitoring system.*');
  lines.push('');

  return lines.join('\n');
}

/**
 * Main function
 */
function main() {
  console.log('📈 Generating performance report...\n');

  // Check if bundle size report exists
  if (!fs.existsSync(BUNDLE_SIZE_FILE)) {
    console.error('❌ Bundle size report not found. Run `npm run perf:bundle` first.');
    process.exit(1);
  }

  // Load bundle size data
  const bundleSize = JSON.parse(fs.readFileSync(BUNDLE_SIZE_FILE, 'utf-8'));

  // Load history if available
  let history = null;
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
    } catch (error) {
      console.warn('⚠️  Could not load history data');
    }
  }

  // Generate markdown report
  const markdownReport = generateMarkdownReport(bundleSize, history);

  // Ensure reports directory exists
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  // Save report
  fs.writeFileSync(OUTPUT_FILE, markdownReport);

  console.log(`✓ Performance report saved to ${path.relative(ROOT_DIR, OUTPUT_FILE)}`);
  console.log('');

  // Display summary
  const score = getPerformanceScore(bundleSize);
  let scoreBadge = '🟢 Excellent';
  if (score < 90) scoreBadge = '🟡 Good';
  if (score < 70) scoreBadge = '🟠 Fair';
  if (score < 50) scoreBadge = '🔴 Poor';

  console.log('Performance Summary:');
  console.log(`  Score: ${score}/100 (${scoreBadge})`);
  console.log(`  Total Size: ${formatBytes(bundleSize.totalSize.gzip)} (gzipped)`);
  console.log('');
}

main();
