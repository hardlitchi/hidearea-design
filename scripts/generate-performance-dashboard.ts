#!/usr/bin/env tsx
/**
 * Generate Performance Dashboard
 * Creates an HTML dashboard showing performance metrics over time
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

interface BundleMetric {
  timestamp: string;
  mainBundleSize: number;
  totalComponentsSize: number;
  componentCount: number;
}

function loadMetrics(): BundleMetric[] {
  const metricsPath = path.join(rootDir, 'packages/core/tests/performance/bundle-metrics.json');

  if (!fs.existsSync(metricsPath)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
}

function generateDashboard(metrics: BundleMetric[]): string {
  const labels = metrics.map((m) => new Date(m.timestamp).toLocaleDateString());
  const mainBundleSizes = metrics.map((m) => m.mainBundleSize.toFixed(2));
  const avgComponentSizes = metrics.map((m) =>
    (m.totalComponentsSize / m.componentCount).toFixed(2)
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performance Dashboard - Hidearea Design</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f7fa;
      padding: 2rem;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    h1 {
      color: #1a202c;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .stat-card h3 {
      color: #718096;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .stat-change {
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .stat-change.positive {
      color: #48bb78;
    }

    .stat-change.negative {
      color: #f56565;
    }

    .stat-change.neutral {
      color: #718096;
    }

    .chart-container {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
    }

    .chart-container h2 {
      color: #2d3748;
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .chart-wrapper {
      position: relative;
      height: 300px;
    }

    .footer {
      text-align: center;
      color: #718096;
      margin-top: 2rem;
      font-size: 0.875rem;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .badge.success {
      background: #c6f6d5;
      color: #22543d;
    }

    .badge.warning {
      background: #feebc8;
      color: #7c2d12;
    }

    .badge.info {
      background: #bee3f8;
      color: #2c5282;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Performance Dashboard</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Main Bundle Size</h3>
        <div class="stat-value">${metrics.length > 0 ? metrics[metrics.length - 1].mainBundleSize.toFixed(2) : '0'} KB</div>
        <div class="stat-change ${metrics.length > 1 ? (metrics[metrics.length - 1].mainBundleSize > metrics[metrics.length - 2].mainBundleSize ? 'negative' : 'positive') : 'neutral'}">
          ${metrics.length > 1 ? `${((metrics[metrics.length - 1].mainBundleSize - metrics[metrics.length - 2].mainBundleSize) / metrics[metrics.length - 2].mainBundleSize * 100).toFixed(2)}% from last run` : 'No previous data'}
        </div>
      </div>

      <div class="stat-card">
        <h3>Component Count</h3>
        <div class="stat-value">${metrics.length > 0 ? metrics[metrics.length - 1].componentCount : '0'}</div>
        <span class="badge info">Total Components</span>
      </div>

      <div class="stat-card">
        <h3>Avg Component Size</h3>
        <div class="stat-value">${metrics.length > 0 ? (metrics[metrics.length - 1].totalComponentsSize / metrics[metrics.length - 1].componentCount).toFixed(2) : '0'} KB</div>
        <span class="badge success">Per Component</span>
      </div>

      <div class="stat-card">
        <h3>Total Components Size</h3>
        <div class="stat-value">${metrics.length > 0 ? metrics[metrics.length - 1].totalComponentsSize.toFixed(2) : '0'} KB</div>
        <span class="badge info">All Components</span>
      </div>
    </div>

    <div class="chart-container">
      <h2>Bundle Size Trend</h2>
      <div class="chart-wrapper">
        <canvas id="bundleSizeChart"></canvas>
      </div>
    </div>

    <div class="chart-container">
      <h2>Average Component Size Trend</h2>
      <div class="chart-wrapper">
        <canvas id="componentSizeChart"></canvas>
      </div>
    </div>

    <div class="footer">
      <p>Generated: ${new Date().toLocaleString()}</p>
      <p>Hidearea Design System - Performance Monitoring</p>
    </div>
  </div>

  <script>
    const labels = ${JSON.stringify(labels)};
    const mainBundleSizes = ${JSON.stringify(mainBundleSizes)};
    const avgComponentSizes = ${JSON.stringify(avgComponentSizes)};

    // Bundle Size Chart
    new Chart(document.getElementById('bundleSizeChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Main Bundle Size (KB)',
          data: mainBundleSizes,
          borderColor: '#4299e1',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' KB';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Size (KB)'
            }
          }
        }
      }
    });

    // Component Size Chart
    new Chart(document.getElementById('componentSizeChart'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Component Size (KB)',
          data: avgComponentSizes,
          borderColor: '#48bb78',
          backgroundColor: 'rgba(72, 187, 120, 0.1)',
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.parsed.y + ' KB';
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Size (KB)'
            }
          }
        }
      }
    });
  </script>
</body>
</html>`;
}

function main() {
  console.log('Generating performance dashboard...\n');

  const metrics = loadMetrics();

  if (metrics.length === 0) {
    console.log('⚠️  No performance metrics found.');
    console.log('Run performance tests first: pnpm --filter @hidearea-design/core test:perf:bundle\n');
    process.exit(1);
  }

  const dashboard = generateDashboard(metrics);
  const outputPath = path.join(rootDir, 'performance-dashboard.html');

  fs.writeFileSync(outputPath, dashboard);

  console.log('✅ Performance dashboard generated successfully!');
  console.log(`📊 Open: ${outputPath}\n`);

  console.log('Latest Metrics:');
  const latest = metrics[metrics.length - 1];
  console.log(`  Timestamp: ${new Date(latest.timestamp).toLocaleString()}`);
  console.log(`  Main Bundle: ${latest.mainBundleSize.toFixed(2)} KB`);
  console.log(`  Components: ${latest.componentCount}`);
  console.log(`  Avg Component Size: ${(latest.totalComponentsSize / latest.componentCount).toFixed(2)} KB`);
  console.log(`  Total Components Size: ${latest.totalComponentsSize.toFixed(2)} KB`);
}

main();
