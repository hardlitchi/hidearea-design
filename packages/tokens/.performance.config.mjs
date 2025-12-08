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
      raw: 50 * 1024, // 50 KB
      gzip: 15 * 1024, // 15 KB
      description: 'JavaScript tokens export',
    },
    'css/variables.css': {
      raw: 100 * 1024, // 100 KB
      gzip: 20 * 1024, // 20 KB
      description: 'CSS variables',
    },
    'scss/variables.scss': {
      raw: 100 * 1024, // 100 KB
      gzip: 20 * 1024, // 20 KB
      description: 'SCSS variables',
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
