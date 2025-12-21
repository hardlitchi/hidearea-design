import { Alert, Badge } from '@hidearea-design/react';

export default function Caching() {
  return (
    <div>
      <section className="section">
        <h2 className="section-title">Caching Strategies</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Effective caching dramatically improves repeat visit performance by avoiding unnecessary
          network requests. This page covers browser caching, CDN strategies, and cache invalidation.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Content Hashing</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Vite automatically generates content hashes for production builds:
        </p>

        <div className="code-block">
          {`// Build output
dist/assets/index-a1b2c3d4.js
dist/assets/vendor-e5f6g7h8.js
dist/assets/design-system-i9j0k1l2.js

// Hash changes only when content changes
// Enables long-term caching with automatic invalidation`}
        </div>

        <Alert variant="success" style={{ marginTop: 'var(--ha-spacing-4)' }}>
          Content hashing allows you to set aggressive cache headers (1 year+) while ensuring
          users always get the latest version when files change.
        </Alert>
      </section>

      <section className="section">
        <h2 className="section-title">Cache Headers</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          Configure your server with appropriate cache headers:
        </p>

        <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
          Static Assets (with hash)
        </h3>
        <div className="code-block">
          {`# Nginx
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Apache
<FilesMatch "\\.(js|css|woff2?)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>`}
        </div>

        <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginTop: 'var(--ha-spacing-6)', marginBottom: 'var(--ha-spacing-3)' }}>
          HTML Files
        </h3>
        <div className="code-block">
          {`# Nginx
location / {
  expires -1;
  add_header Cache-Control "no-cache";
}

# Apache
<FilesMatch "\\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">CDN Configuration</h2>
        <div className="card-grid">
          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Edge Caching
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-2)' }}>
              Serve assets from CDN edge locations close to users.
            </p>
            <Badge variant="success">50-90% faster</Badge>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Cache Prewarming
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-2)' }}>
              Proactively cache popular assets after deployment.
            </p>
            <Badge variant="primary">Instant delivery</Badge>
          </div>

          <div className="metric-card">
            <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
              Automatic Compression
            </h3>
            <p style={{ lineHeight: 1.6, marginBottom: 'var(--ha-spacing-2)' }}>
              CDN automatically serves Brotli/Gzip compressed assets.
            </p>
            <Badge variant="secondary">70-80% smaller</Badge>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Service Worker Caching</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          For advanced caching, use a service worker with Workbox:
        </p>

        <div className="code-block">
          {`import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// Cache design system assets
registerRoute(
  ({ request }) => request.destination === 'script',
  new CacheFirst({
    cacheName: 'design-system-js',
  })
);

// Network first for HTML
registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'pages',
  })
);`}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Cache Strategies</h2>
        <div style={{ backgroundColor: 'var(--ha-color-background-secondary)', padding: 'var(--ha-spacing-6)', borderRadius: 'var(--ha-border-radius-lg)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-4)' }}>
            Common Patterns
          </h3>

          <div style={{ marginBottom: 'var(--ha-spacing-4)' }}>
            <h4 style={{ fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-2)' }}>
              Cache-First
            </h4>
            <p style={{ lineHeight: 1.6 }}>
              Best for: Static assets with content hashing (JS, CSS, fonts, images)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--ha-spacing-4)' }}>
            <h4 style={{ fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-2)' }}>
              Network-First
            </h4>
            <p style={{ lineHeight: 1.6 }}>
              Best for: Dynamic content that needs to be fresh (HTML, API responses)
            </p>
          </div>

          <div style={{ marginBottom: 'var(--ha-spacing-4)' }}>
            <h4 style={{ fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-2)' }}>
              Stale-While-Revalidate
            </h4>
            <p style={{ lineHeight: 1.6 }}>
              Best for: Data that can be slightly stale (user profiles, settings)
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Cache Invalidation</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          With content hashing, cache invalidation is automatic:
        </p>

        <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
          <li>File hash changes when content changes</li>
          <li>HTML references new hashed filename</li>
          <li>Browser requests new file (cache miss)</li>
          <li>Old files remain cached but unused</li>
          <li>CDN purge not required for most cases</li>
        </ul>

        <Alert variant="info" style={{ marginTop: 'var(--ha-spacing-4)' }}>
          Only purge CDN cache for HTML files or when you need to immediately invalidate all users' caches.
        </Alert>
      </section>

      <section className="section">
        <h2 className="section-title">Best Practices</h2>
        <ol style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
          <li>Use content hashing for static assets</li>
          <li>Set long cache times (1 year) for hashed assets</li>
          <li>Never cache HTML files</li>
          <li>Use CDN for global distribution</li>
          <li>Implement service worker for offline support</li>
          <li>Monitor cache hit rates</li>
          <li>Prewarm CDN cache after deployment</li>
          <li>Use HTTP/2 or HTTP/3 for multiplexing</li>
        </ol>
      </section>

      <section className="section">
        <h2 className="section-title">Performance Impact</h2>
        <div className="card-grid">
          <div className="metric-card">
            <div className="metric-value">95%+</div>
            <div className="metric-label">Cache Hit Rate</div>
            <p style={{ marginTop: 'var(--ha-spacing-2)', fontSize: 'var(--ha-font-size-sm)', lineHeight: 1.5 }}>
              With proper configuration
            </p>
          </div>

          <div className="metric-card">
            <div className="metric-value">80-90%</div>
            <div className="metric-label">Bandwidth Savings</div>
            <p style={{ marginTop: 'var(--ha-spacing-2)', fontSize: 'var(--ha-font-size-sm)', lineHeight: 1.5 }}>
              For repeat visitors
            </p>
          </div>

          <div className="metric-card">
            <div className="metric-value">&lt; 100ms</div>
            <div className="metric-label">Cached Load Time</div>
            <p style={{ marginTop: 'var(--ha-spacing-2)', fontSize: 'var(--ha-font-size-sm)', lineHeight: 1.5 }}>
              Near-instant page loads
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
