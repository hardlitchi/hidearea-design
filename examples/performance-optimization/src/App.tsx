import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button } from '@hidearea-design/react';
import Home from './pages/Home';

// Lazy load pages for code splitting
const LazyLoading = lazy(() => import('./pages/LazyLoading'));
const BundleSize = lazy(() => import('./pages/BundleSize'));
const TreeShaking = lazy(() => import('./pages/TreeShaking'));
const Caching = lazy(() => import('./pages/Caching'));

function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--ha-spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--ha-font-size-4xl)', fontWeight: 'var(--ha-font-weight-bold)', marginBottom: 'var(--ha-spacing-2)' }}>
          Performance Optimization
        </h1>
        <p style={{ fontSize: 'var(--ha-font-size-lg)', color: 'var(--ha-color-text-secondary)', marginBottom: 'var(--ha-spacing-6)' }}>
          Best practices and techniques for optimizing Hidearea Design System
        </p>

        <nav className="nav">
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Link to="/lazy-loading">
            <Button variant="outline">Lazy Loading</Button>
          </Link>
          <Link to="/bundle-size">
            <Button variant="outline">Bundle Size</Button>
          </Link>
          <Link to="/tree-shaking">
            <Button variant="outline">Tree Shaking</Button>
          </Link>
          <Link to="/caching">
            <Button variant="outline">Caching</Button>
          </Link>
        </nav>
      </header>

      <Suspense
        fallback={
          <div style={{ padding: 'var(--ha-spacing-8)', textAlign: 'center' }}>
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lazy-loading" element={<LazyLoading />} />
          <Route path="/bundle-size" element={<BundleSize />} />
          <Route path="/tree-shaking" element={<TreeShaking />} />
          <Route path="/caching" element={<Caching />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
