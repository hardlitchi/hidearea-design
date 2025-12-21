import { lazy, Suspense, useState } from 'react';
import { Button, Alert } from '@hidearea-design/react';

// Lazy load heavy components
const HeavyDataGrid = lazy(() => import('../components/HeavyDataGrid'));
const HeavyChart = lazy(() => import('../components/HeavyChart'));

export default function LazyLoading() {
  const [showDataGrid, setShowDataGrid] = useState(false);
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <section className="section">
        <h2 className="section-title">Lazy Loading</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Lazy loading allows you to split your code into smaller chunks and load them only when
          needed. This reduces the initial bundle size and improves first load performance.
        </p>

        <Alert variant="success" style={{ marginBottom: 'var(--ha-spacing-4)' }}>
          This page demonstrates lazy loading with React.lazy() and Suspense. Heavy components are
          only loaded when you click the buttons below.
        </Alert>
      </section>

      <section className="section">
        <h2 className="section-title">Implementation</h2>

        <div className="code-block">
          {`// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Live Demo</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Click the buttons below to dynamically load heavy components. Open your browser's Network
          tab to see the chunks being loaded on demand.
        </p>

        <div style={{ display: 'flex', gap: 'var(--ha-spacing-3)', marginBottom: 'var(--ha-spacing-6)' }}>
          <Button
            variant="primary"
            onClick={() => setShowDataGrid(!showDataGrid)}
          >
            {showDataGrid ? 'Hide' : 'Load'} Data Grid
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? 'Hide' : 'Load'} Chart
          </Button>
        </div>

        {showDataGrid && (
          <Suspense
            fallback={
              <div style={{ padding: 'var(--ha-spacing-6)', backgroundColor: 'var(--ha-color-background-secondary)', borderRadius: 'var(--ha-border-radius-md)', textAlign: 'center' }}>
                Loading Data Grid...
              </div>
            }
          >
            <HeavyDataGrid />
          </Suspense>
        )}

        {showChart && (
          <div style={{ marginTop: 'var(--ha-spacing-4)' }}>
            <Suspense
              fallback={
                <div style={{ padding: 'var(--ha-spacing-6)', backgroundColor: 'var(--ha-color-background-secondary)', borderRadius: 'var(--ha-border-radius-md)', textAlign: 'center' }}>
                  Loading Chart...
                </div>
              }
            >
              <HeavyChart />
            </Suspense>
          </div>
        )}
      </section>

      <section className="section">
        <h2 className="section-title">Benefits</h2>
        <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
          <li><strong>Reduced Initial Bundle Size:</strong> Only load what's needed initially</li>
          <li><strong>Faster Initial Load:</strong> Users can interact sooner</li>
          <li><strong>Better Resource Utilization:</strong> Load components as they're needed</li>
          <li><strong>Improved Caching:</strong> Smaller chunks cache more efficiently</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">Best Practices</h2>
        <div style={{ backgroundColor: 'var(--ha-color-background-secondary)', padding: 'var(--ha-spacing-6)', borderRadius: 'var(--ha-border-radius-lg)' }}>
          <ol style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
            <li>Lazy load routes and pages first</li>
            <li>Lazy load heavy components (charts, editors, etc.)</li>
            <li>Provide meaningful loading fallbacks</li>
            <li>Preload critical routes on hover or idle time</li>
            <li>Monitor bundle sizes with tools like vite-bundle-visualizer</li>
            <li>Don't over-split - balance between requests and chunk size</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">When to Use</h2>
        <Alert variant="info">
          Use lazy loading for:
          <ul style={{ marginTop: 'var(--ha-spacing-2)', marginLeft: 'var(--ha-spacing-6)' }}>
            <li>Routes and pages</li>
            <li>Heavy third-party libraries</li>
            <li>Modal dialogs and overlays</li>
            <li>Complex visualizations (charts, graphs)</li>
            <li>Rich text editors</li>
            <li>Features behind feature flags</li>
          </ul>
        </Alert>
      </section>
    </div>
  );
}
