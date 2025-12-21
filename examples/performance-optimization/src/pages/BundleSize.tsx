import { Alert, Badge } from '@hidearea-design/react';

export default function BundleSize() {
  return (
    <div>
      <section className="section">
        <h2 className="section-title">Bundle Size Optimization</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Reducing bundle size is critical for fast load times. This example demonstrates various
          techniques to minimize your application's footprint.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Vite Configuration</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          This project uses an optimized Vite configuration with manual chunk splitting,
          compression, and minification.
        </p>

        <div className="code-block">
          {`export default defineConfig({
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'design-system-core': ['@hidearea-design/core'],
          'design-system-react': ['@hidearea-design/react'],
        },
      },
    },
  },
  plugins: [
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress' }),
  ],
});`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Chunk Splitting Strategy</h2>
        <div className="card-grid">
          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-2)' }}>
              Vendor Chunks
            </h3>
            <p style={{ marginBottom: 'var(--ha-spacing-3)', lineHeight: 1.6 }}>
              Separate React and React DOM into their own chunk for better caching.
            </p>
            <Badge variant="primary">Long-term cache</Badge>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-2)' }}>
              Design System Chunks
            </h3>
            <p style={{ marginBottom: 'var(--ha-spacing-3)', lineHeight: 1.6 }}>
              Split design system packages into separate chunks.
            </p>
            <Badge variant="secondary">Versioned cache</Badge>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-2)' }}>
              Route Chunks
            </h3>
            <p style={{ marginBottom: 'var(--ha-spacing-3)', lineHeight: 1.6 }}>
              Automatic code splitting for each route using lazy loading.
            </p>
            <Badge variant="success">On-demand load</Badge>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Compression</h2>
        <Alert variant="success">
          This build uses both Gzip and Brotli compression to minimize transfer sizes.
          Modern browsers automatically use the best compression available.
        </Alert>

        <div style={{ marginTop: 'var(--ha-spacing-4)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
            Compression Ratios
          </h3>
          <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li><strong>Gzip:</strong> ~70% size reduction</li>
            <li><strong>Brotli:</strong> ~75-80% size reduction (better for static assets)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Minification</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Code is minified using Terser with aggressive settings:
        </p>

        <div className="code-block">
          {`terserOptions: {
  compress: {
    drop_console: true,      // Remove console.log
    drop_debugger: true,     // Remove debugger statements
  },
}`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Bundle Analysis</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          After building, check <code>dist/stats.html</code> to visualize your bundle composition.
        </p>

        <div className="code-block">
          {`# Build the project
npm run build

# The stats.html file will be generated in dist/
# Open it in a browser to see the bundle visualization`}
        </div>

        <Alert variant="info" style={{ marginTop: 'var(--ha-spacing-4)' }}>
          Use vite-bundle-visualizer to identify large dependencies and optimization opportunities.
        </Alert>
      </section>

      <section className="section">
        <h2 className="section-title">Best Practices</h2>
        <div style={{ backgroundColor: 'var(--ha-color-background-secondary)', padding: 'var(--ha-spacing-6)', borderRadius: 'var(--ha-border-radius-lg)' }}>
          <ol style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li>Analyze your bundle regularly</li>
            <li>Set chunk size warning limits</li>
            <li>Split large vendors into separate chunks</li>
            <li>Use compression (Gzip/Brotli)</li>
            <li>Enable minification in production</li>
            <li>Remove source maps from production (or use hidden source maps)</li>
            <li>Monitor bundle size in CI/CD</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
