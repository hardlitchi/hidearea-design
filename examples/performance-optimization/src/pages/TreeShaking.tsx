import { Alert } from '@hidearea-design/react';

export default function TreeShaking() {
  return (
    <div>
      <section className="section">
        <h2 className="section-title">Tree Shaking</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Tree shaking eliminates unused code from your bundles. Modern bundlers like Vite
          automatically tree shake ES modules, but you need to structure your imports correctly.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Correct Import Patterns</h2>

        <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginTop: 'var(--ha-spacing-4)', marginBottom: 'var(--ha-spacing-3)', color: 'var(--ha-color-success)' }}>
          ✓ Good - Named Imports
        </h3>
        <div className="code-block">
          {`// Import only what you need
import { Button, Input } from '@hidearea-design/react';

// Tree shaking will remove unused exports`}
        </div>

        <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginTop: 'var(--ha-spacing-6)', marginBottom: 'var(--ha-spacing-3)', color: 'var(--ha-color-error)' }}>
          ✗ Bad - Namespace Import
        </h3>
        <div className="code-block">
          {`// Imports the entire module
import * as Components from '@hidearea-design/react';

// Even if you only use Button, the whole library is bundled`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <Alert variant="info">
          Tree shaking relies on ES module static structure. It analyzes your import/export
          statements at build time and removes code that is never imported.
        </Alert>

        <div style={{ marginTop: 'var(--ha-spacing-6)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
            Requirements for Tree Shaking
          </h3>
          <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li>Use ES modules (import/export)</li>
            <li>Avoid side effects in modules</li>
            <li>Mark packages as side-effect free in package.json</li>
            <li>Use named imports instead of namespace imports</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Design System Tree Shaking</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          The Hidearea Design System is optimized for tree shaking:
        </p>

        <div className="code-block">
          {`// package.json
{
  "sideEffects": false,  // No side effects
  "type": "module",      // ES modules
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "types": "./dist/index.d.ts"
    }
  }
}`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">CSS and Tree Shaking</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          CSS-in-JS solutions like Lit's CSS are automatically scoped and tree-shaken.
          Unused component styles are never included in the bundle.
        </p>

        <Alert variant="success">
          Web Components with Lit automatically include only the styles needed for the
          components you use. No manual CSS purging required!
        </Alert>
      </section>

      <section className="section">
        <h2 className="section-title">Verification</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          To verify tree shaking is working:
        </p>

        <div className="code-block">
          {`# Build your application
npm run build

# Check the bundle size
ls -lh dist/assets/*.js

# Analyze the bundle
npm run analyze`}
        </div>

        <p style={{ marginTop: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          You should see:
        </p>
        <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)', marginTop: 'var(--ha-spacing-2)' }}>
          <li>Smaller bundle sizes for targeted imports</li>
          <li>Unused components not in the bundle</li>
          <li>Clear separation of chunks in bundle visualizer</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Common Pitfalls</h2>
        <div style={{ backgroundColor: 'var(--ha-color-background-secondary)', padding: 'var(--ha-spacing-6)', borderRadius: 'var(--ha-border-radius-lg)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
            Avoid These Patterns
          </h3>
          <ol style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li>Don't use default exports (harder to tree shake)</li>
            <li>Avoid CommonJS modules (require/module.exports)</li>
            <li>Don't have top-level side effects (code that runs on import)</li>
            <li>Avoid barrel exports that re-export everything</li>
            <li>Don't mix ES modules with CommonJS</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Impact</h2>
        <div className="card-grid">
          <div className="metric-card">
            <div className="metric-value">20-40%</div>
            <div className="metric-label">Bundle Size Reduction</div>
            <p style={{ marginTop: 'var(--ha-spacing-2)', fontSize: 'var(--ha-font-size-sm)', lineHeight: 1.5 }}>
              Typical reduction from effective tree shaking
            </p>
          </div>

          <div className="metric-card">
            <div className="metric-value">0.5-2s</div>
            <div className="metric-label">Load Time Improvement</div>
            <p style={{ marginTop: 'var(--ha-spacing-2)', fontSize: 'var(--ha-font-size-sm)', lineHeight: 1.5 }}>
              Faster downloads on 3G connections
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
