/**
 * Performance Monitoring Configuration
 *
 * This file defines performance budgets and monitoring settings
 * for the Design Tokens package.
 */

export default {
  // Performance budgets (in bytes)
  budgets: {
    'js/index.js': {
      raw: 160 * 1024, // 160 KB (Phase 4 complete: 29 components)
      gzip: 30 * 1024, // 30 KB
      description: 'JavaScript tokens export',
    },
    'css/variables.css': {
      raw: 150 * 1024, // 150 KB (Phase 4 target)
      gzip: 25 * 1024, // 25 KB
      description: 'CSS variables',
    },
    'scss/variables.scss': {
      raw: 150 * 1024, // 150 KB (Phase 4 target)
      gzip: 25 * 1024, // 25 KB
      description: 'SCSS variables',
    },
    'ts/index.d.ts': {
      raw: 200 * 1024, // 200 KB (TypeScript definitions for all tokens)
      gzip: 25 * 1024, // 25 KB gzipped
      description: 'TypeScript type definitions',
    },
  },

  // Alert thresholds
  alerts: {
    // Warn if size increases by more than this percentage
    sizeIncreaseWarning: 10,
    // Error if size increases by more than this percentage
    sizeIncreaseError: 25,
    // Warn if approaching budget (percentage of budget used)
    budgetWarningThreshold: 80,
  },

  // History settings
  history: {
    // Number of builds to keep in history
    maxEntries: 100,
    // Whether to track history
    enabled: true,
  },

  // Reporting settings
  reports: {
    // Generate JSON report
    json: true,
    // Generate Markdown report
    markdown: true,
    // Generate text summary
    text: true,
  },
};
