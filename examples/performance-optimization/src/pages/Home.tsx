import { Alert } from '@hidearea-design/react';

export default function Home() {
  return (
    <div>
      <section className="section">
        <h2 className="section-title">Overview</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          This example demonstrates various performance optimization techniques when using the
          Hidearea Design System. Each page focuses on a specific optimization strategy with
          practical examples and best practices.
        </p>

        <Alert variant="info">
          Performance optimization is crucial for delivering a great user experience. These
          techniques can significantly reduce load times and improve application responsiveness.
        </Alert>
      </section>

      <section className="section">
        <h2 className="section-title">Optimization Strategies</h2>
        <div className="card-grid">
          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Lazy Loading
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-3)' }}>
              Load components only when needed using React.lazy() and dynamic imports.
              Reduces initial bundle size and improves first load performance.
            </p>
            <div className="metric-value">↓ 40-60%</div>
            <div className="metric-label">Initial Bundle Size Reduction</div>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Bundle Size Optimization
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-3)' }}>
              Minimize bundle size through code splitting, tree shaking, and compression.
              Faster downloads and improved time to interactive.
            </p>
            <div className="metric-value">↓ 30-50%</div>
            <div className="metric-label">Overall Bundle Size Reduction</div>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Tree Shaking
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-3)' }}>
              Eliminate unused code from your bundles. Import only what you need
              to keep bundles lean and efficient.
            </p>
            <div className="metric-value">↓ 20-40%</div>
            <div className="metric-label">Dead Code Elimination</div>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Caching Strategies
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-3)' }}>
              Leverage browser caching and CDN for static assets. Reduce server
              load and improve repeat visit performance.
            </p>
            <div className="metric-value">↑ 80-95%</div>
            <div className="metric-label">Cache Hit Rate</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Performance Metrics</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          When properly optimized, you can expect the following improvements:
        </p>

        <div style={{ backgroundColor: 'var(--ha-color-background-secondary)', padding: 'var(--ha-spacing-6)', borderRadius: 'var(--ha-border-radius-lg)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-4)' }}>
            Core Web Vitals Targets
          </h3>
          <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li><strong>Largest Contentful Paint (LCP):</strong> &lt; 2.5s</li>
            <li><strong>First Input Delay (FID):</strong> &lt; 100ms</li>
            <li><strong>Cumulative Layout Shift (CLS):</strong> &lt; 0.1</li>
            <li><strong>Time to Interactive (TTI):</strong> &lt; 3.8s</li>
            <li><strong>Total Blocking Time (TBT):</strong> &lt; 200ms</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Getting Started</h2>
        <p style={{ lineHeight: 1.6 }}>
          Navigate through the examples using the navigation menu above to learn about each
          optimization technique. Each page includes:
        </p>
        <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)', marginTop: 'var(--ha-spacing-3)' }}>
          <li>Detailed explanation of the technique</li>
          <li>Code examples and implementation</li>
          <li>Performance measurements and benchmarks</li>
          <li>Best practices and common pitfalls</li>
        </ul>
      </section>
    </div>
  );
}
