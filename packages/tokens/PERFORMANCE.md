# Performance Monitoring

This document describes the performance monitoring system for the Design Tokens package.

## Overview

The performance monitoring system tracks bundle sizes, monitors trends, and ensures that the package stays within defined performance budgets. This helps maintain fast load times and optimal user experience.

## Features

- **Bundle Size Measurement**: Tracks raw and gzipped sizes of all built files
- **Performance Budgets**: Enforces size limits to prevent performance regression
- **Trend Analysis**: Monitors size changes over time
- **Automated Reporting**: Generates detailed performance reports
- **CI/CD Integration**: Automatically runs on every build

## Quick Start

### Running Performance Checks

```bash
# Build the package first
npm run build

# Measure bundle sizes
npm run perf:bundle

# Generate full performance report
npm run perf:report

# Or run both at once
npm run perf
```

### Understanding the Output

The performance check will output:

1. **Bundle Size Report**: Shows raw and gzipped sizes for each file
2. **Budget Compliance**: Indicates whether files are within budget
3. **Performance Score**: Overall performance rating (0-100)
4. **Recommendations**: Actionable suggestions for improvement

## Performance Budgets

Current performance budgets are defined in `.performance.config.mjs`:

| File | Raw Size Budget | Gzipped Budget | Description |
|------|----------------|----------------|-------------|
| `js/index.js` | 50 KB | 15 KB | JavaScript tokens export |
| `css/variables.css` | 100 KB | 20 KB | CSS variables |
| `scss/variables.scss` | 100 KB | 20 KB | SCSS variables |

### Why These Budgets?

- **JavaScript (50 KB / 15 KB gzipped)**: Design tokens are typically small. This budget allows for comprehensive token sets while remaining lightweight.
- **CSS/SCSS (100 KB / 20 KB gzipped)**: CSS variables can be more verbose but compress well. This budget accommodates a large design system.

### Modifying Budgets

To adjust performance budgets, edit `.performance.config.mjs`:

```javascript
export default {
  budgets: {
    'js/index.js': {
      raw: 60 * 1024,  // 60 KB
      gzip: 18 * 1024, // 18 KB
    },
  },
};
```

## CI/CD Integration

Performance monitoring is automatically integrated into the CI/CD pipeline via GitHub Actions.

### What Happens on Each Build

1. Package is built
2. Bundle sizes are measured
3. Performance report is generated
4. Results are uploaded as artifacts (retained for 30 days)
5. On pull requests, a comment is added with the performance report

### Viewing CI Performance Reports

1. Go to the GitHub Actions run
2. Click on the "Performance Monitoring" job
3. Download the "performance-reports" artifact
4. Or view the PR comment for a summary

### Budget Failures

If a file exceeds its performance budget:

- The CI build will **fail**
- The report will highlight which files exceeded their budgets
- Recommendations will be provided for reducing file size

## Performance Reports

### Report Files

All performance reports are saved to the `.performance/` directory:

- `bundle-size.json`: Raw bundle size data
- `bundle-size-history.json`: Historical size data (last 100 builds)
- `performance-report.md`: Human-readable report with recommendations

### Report Contents

#### Bundle Size Report (`bundle-size.json`)

```json
{
  "timestamp": "2025-12-08T12:14:52.000Z",
  "files": [
    {
      "path": "js/index.js",
      "raw": 15360,
      "gzip": 2920,
      "rawFormatted": "15.00 KB",
      "gzipFormatted": "2.85 KB"
    }
  ],
  "totalSize": {
    "raw": 42110,
    "gzip": 7330
  },
  "budgets": { ... },
  "comparison": { ... }
}
```

#### Performance Report (`performance-report.md`)

Includes:

- **Performance Score**: Overall rating (0-100)
- **Summary**: Total files, sizes, compression ratio, trends
- **File Details**: Individual file sizes and budget status
- **Budget Compliance**: Detailed budget usage for each file
- **Size History**: Last 10 builds with size changes
- **Recommendations**: Actionable suggestions for improvement

## Performance Score

The performance score (0-100) is calculated based on:

- How close each file is to its budget
- Files at or under budget score 100
- Files 2x over budget score 0
- Linear scaling in between

**Score Interpretation:**

- **90-100**: 🟢 Excellent - All files well within budget
- **70-89**: 🟡 Good - Most files within budget
- **50-69**: 🟠 Fair - Some files approaching budget
- **0-49**: 🔴 Poor - Multiple files over budget

## Best Practices

### 1. Monitor Performance Regularly

Run performance checks after making changes:

```bash
npm run build && npm run perf
```

### 2. Review Trends

Check the size history in the performance report to identify gradual growth:

```bash
npm run perf:report
# Check the "Size History" section
```

### 3. Investigate Budget Failures

If a file exceeds its budget:

1. Review recent changes to tokens
2. Check for duplicate or unused tokens
3. Consider if the budget needs adjustment (rare)
4. Optimize token structure if possible

### 4. Keep History

The system automatically maintains a history of the last 100 builds. This helps identify:

- Gradual size increases
- Sudden jumps in file size
- Impact of specific changes

### 5. Set Appropriate Budgets

Budgets should be:

- **Realistic**: Based on actual usage and requirements
- **Strict enough**: To prevent performance regression
- **Not too tight**: Allow room for growth and new features

## Troubleshooting

### Performance Check Fails

If `npm run perf:bundle` fails:

1. Ensure the package is built: `npm run build`
2. Check that build artifacts exist in `build/` directory
3. Review error messages for specific issues

### Budget Exceeded

If a file exceeds its budget:

1. Check the performance report for specific files
2. Review recommendations for reducing size
3. Consider if the budget needs adjustment
4. Investigate recent changes that may have increased size

### Missing Reports

If reports are not generated:

1. Ensure `.performance/` directory exists (created automatically)
2. Check file permissions
3. Review console output for errors

## Technical Details

### Implementation

The performance monitoring system uses:

- **Node.js built-in modules only**: No external dependencies
- **fs**: File system operations
- **zlib**: Gzip compression for size calculation
- **path**: File path utilities

### File Size Calculation

1. **Raw Size**: Direct file size from `fs.statSync()`
2. **Gzipped Size**: Compressed using `zlib.gzipSync()` with level 9 compression
3. **Comparison**: Current sizes compared with previous measurements

### Data Storage

- **JSON Format**: All data stored in JSON for easy parsing
- **History Retention**: Last 100 builds kept automatically
- **Timestamps**: ISO 8601 format for consistent date handling

## Integration with Other Tools

### GitHub Actions

The performance monitoring is integrated into the CI workflow at `.github/workflows/ci.yml`.

Key features:

- Runs after build job completes
- Uploads reports as artifacts
- Comments on PRs with performance summary
- Fails CI if budgets are exceeded

### Future Integrations

Planned integrations:

- **Lighthouse CI**: Core Web Vitals measurement
- **Bundle Analyzer**: Visual bundle composition
- **Performance Dashboard**: Historical trends visualization

## Metrics Reference

### Bundle Size Metrics

- **Raw Size**: Uncompressed file size (bytes)
- **Gzipped Size**: Compressed size with gzip level 9 (bytes)
- **Compression Ratio**: Percentage reduction from compression

### Performance Budgets

Performance budgets are defined per-file and include:

- **Raw Budget**: Maximum uncompressed size
- **Gzip Budget**: Maximum compressed size
- **Description**: Purpose of the file

### Trend Metrics

- **Increasing**: Size growing over last 5 builds
- **Decreasing**: Size shrinking over last 5 builds
- **Stable**: No significant change over last 5 builds

## Contributing

When contributing to the design tokens:

1. Run performance checks before committing
2. Ensure all files stay within budget
3. If adding many new tokens, consider budget impact
4. Include performance report in PR description

## Related Documentation

- [Bundle Size Report](.performance/bundle-size.json) - Latest size data
- [Performance Report](.performance/performance-report.md) - Latest full report
- [Configuration](.performance.config.mjs) - Performance settings
- [CI/CD Workflow](../../.github/workflows/ci.yml) - Automated checks

## Support

For issues or questions about performance monitoring:

1. Check this documentation
2. Review the performance report for recommendations
3. Check GitHub Actions logs for CI failures
4. Open an issue with performance report attached
