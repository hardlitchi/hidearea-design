# Hidearea Design System - Performance Optimization Example

This example demonstrates performance optimization techniques for applications using the Hidearea Design System.

## Features

- **Lazy Loading**: Code splitting and dynamic imports with React.lazy()
- **Bundle Size Optimization**: Manual chunking, compression, and minification
- **Tree Shaking**: Eliminating unused code from bundles
- **Caching Strategies**: Browser caching, CDN, and service workers
- **Bundle Analysis**: Visualize bundle composition
- **Production Optimizations**: Terser minification, Gzip/Brotli compression

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
```

3. Build for production:

```bash
pnpm build
```

4. Analyze bundle size:

```bash
pnpm build
# Open dist/stats.html in your browser
```

## Project Structure

```
performance-optimization/
├── src/
│   ├── pages/
│   │   ├── Home.tsx              # Overview and metrics
│   │   ├── LazyLoading.tsx       # Lazy loading examples
│   │   ├── BundleSize.tsx        # Bundle optimization
│   │   ├── TreeShaking.tsx       # Tree shaking guide
│   │   └── Caching.tsx           # Caching strategies
│   ├── components/
│   │   ├── HeavyDataGrid.tsx     # Heavy component example
│   │   └── HeavyChart.tsx        # Heavy chart example
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── vite.config.ts                # Optimized Vite config
├── package.json
└── tsconfig.json
```

## Optimization Techniques

### 1. Lazy Loading

Load components only when needed:

```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**Benefits:**
- 40-60% reduction in initial bundle size
- Faster time to interactive
- Better resource utilization

### 2. Manual Chunk Splitting

Configure Vite to split code strategically:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'design-system-core': ['@hidearea-design/core'],
          'design-system-react': ['@hidearea-design/react'],
        },
      },
    },
  },
});
```

**Benefits:**
- Better caching (vendor chunks change less frequently)
- Parallel downloads
- Optimized cache invalidation

### 3. Compression

Enable Gzip and Brotli compression:

```typescript
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    viteCompression({ algorithm: 'gzip', ext: '.gz' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
});
```

**Benefits:**
- 70-80% size reduction
- Faster downloads
- Lower bandwidth costs

### 4. Tree Shaking

Import only what you need:

```tsx
// ✓ Good - Named imports
import { Button, Input } from '@hidearea-design/react';

// ✗ Bad - Namespace import
import * as Components from '@hidearea-design/react';
```

**Benefits:**
- 20-40% bundle size reduction
- Only used code in bundle
- Faster builds

### 5. Minification

Use Terser for aggressive minification:

```typescript
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

**Benefits:**
- Smaller bundle size
- Faster parsing
- Production-ready code

## Performance Metrics

### Expected Results

With all optimizations enabled:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Initial Bundle | ~500KB | ~200KB | 60% |
| Time to Interactive | ~4.5s | ~2.0s | 56% |
| First Contentful Paint | ~2.0s | ~0.8s | 60% |
| Cache Hit Rate | 0% | 95%+ | ∞ |

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTI (Time to Interactive):** < 3.8s
- **TBT (Total Blocking Time):** < 200ms

## Bundle Analysis

After building, analyze your bundle:

```bash
pnpm build
```

Open `dist/stats.html` to see:
- Bundle composition
- Chunk sizes
- Dependency relationships
- Gzip/Brotli sizes

### Interpreting Results

- **Large chunks (>500KB):** Consider splitting further
- **Duplicate dependencies:** Check for version conflicts
- **Unused exports:** Improve tree shaking
- **Large vendors:** Evaluate if necessary

## Caching Configuration

### Nginx

```nginx
# Static assets with content hash
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# HTML files
location / {
  expires -1;
  add_header Cache-Control "no-cache";
}
```

### Apache

```apache
# Static assets
<FilesMatch "\\.(js|css|woff2?)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>

# HTML files
<FilesMatch "\\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

### CDN Configuration

Most CDNs (Cloudflare, CloudFront, Fastly) respect Cache-Control headers automatically.

For best results:
1. Enable automatic compression
2. Set up cache purging
3. Configure edge caching rules
4. Enable HTTP/2 or HTTP/3

## Production Build

Build for production with all optimizations:

```bash
pnpm build
```

This will:
1. Minify code with Terser
2. Split chunks strategically
3. Generate content hashes
4. Create Gzip and Brotli files
5. Generate bundle analysis (stats.html)

### Build Output

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].js.gz
│   ├── index-[hash].js.br
│   ├── react-vendor-[hash].js
│   ├── design-system-core-[hash].js
│   └── ...
├── index.html
└── stats.html              # Bundle analysis
```

## Monitoring Performance

### In Development

Use Vite's built-in performance monitoring:

```bash
pnpm dev
```

Check the terminal for:
- Bundle sizes
- Build times
- Hot reload performance

### In Production

Use browser DevTools:

1. **Network Tab:** Check transfer sizes, caching
2. **Performance Tab:** Record page load, analyze waterfall
3. **Lighthouse:** Run audits for Core Web Vitals
4. **Coverage Tab:** Identify unused code

### Continuous Monitoring

Consider adding:
- **Web Vitals library:** Track real user metrics
- **Bundle size CI:** Fail builds if bundle grows too large
- **Performance budgets:** Set thresholds for key metrics
- **RUM (Real User Monitoring):** Services like DataDog, New Relic

## Best Practices

### 1. Lazy Load Routes

```tsx
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
```

### 2. Preload Critical Routes

```tsx
<link rel="modulepreload" href="/assets/critical-[hash].js" />
```

### 3. Use Content Hashing

Enabled by default in Vite production builds.

### 4. Split Vendor Chunks

```typescript
manualChunks: {
  'vendor': ['react', 'react-dom'],
}
```

### 5. Enable Compression

Use Gzip and Brotli compression plugins.

### 6. Optimize Images

```tsx
<img
  src="image.jpg"
  srcset="image-320w.jpg 320w, image-640w.jpg 640w"
  sizes="(max-width: 320px) 280px, 640px"
  loading="lazy"
  decoding="async"
/>
```

### 7. Use Web Workers

For CPU-intensive tasks:

```tsx
const worker = new Worker('/worker.js');
worker.postMessage(data);
```

### 8. Implement Service Worker

For offline support and advanced caching.

## Common Issues

### Large Bundle Size

**Problem:** Bundle is larger than expected

**Solutions:**
1. Check bundle analysis (stats.html)
2. Verify tree shaking is working
3. Look for duplicate dependencies
4. Consider lazy loading heavy features
5. Remove unused dependencies

### Slow Initial Load

**Problem:** First page load is slow

**Solutions:**
1. Enable lazy loading for routes
2. Split large chunks
3. Enable compression
4. Use CDN for static assets
5. Optimize images

### Poor Cache Hit Rate

**Problem:** Users download assets on every visit

**Solutions:**
1. Verify content hashing is enabled
2. Check cache headers
3. Use CDN
4. Implement service worker
5. Monitor cache performance

## Learn More

- [Vite Build Optimizations](https://vitejs.dev/guide/build.html)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Web Vitals](https://web.dev/vitals/)
- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Hidearea Design System](../../README.md)

## License

This example is part of the Hidearea Design System monorepo.
