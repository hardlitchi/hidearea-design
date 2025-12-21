import { useState } from 'react';
import { Link } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';
import { Button } from '@hidearea-design/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Hidearea Design System - Remix Example' },
    {
      name: 'description',
      content: 'Example integration of Hidearea Design System with Remix',
    },
  ];
};

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: 'var(--ha-spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--ha-font-size-4xl)', fontWeight: 'var(--ha-font-weight-bold)', marginBottom: 'var(--ha-spacing-2)' }}>
          Hidearea Design System
        </h1>
        <p style={{ fontSize: 'var(--ha-font-size-lg)', color: 'var(--ha-color-text-secondary)' }}>
          Remix Integration Example
        </p>
      </header>

      <section className="section">
        <h2 className="section-title">Welcome</h2>
        <p style={{ marginBottom: 'var(--ha-spacing-4)', lineHeight: 1.6 }}>
          This example demonstrates how to integrate the Hidearea Design System into a Remix application.
          The design system provides a comprehensive set of components and design tokens for building
          modern web applications.
        </p>

        <div style={{ marginBottom: 'var(--ha-spacing-6)' }}>
          <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)', marginBottom: 'var(--ha-spacing-3)' }}>
            Interactive Counter
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ha-spacing-4)' }}>
            <Button variant="primary" onClick={() => setCount(count + 1)}>
              Increment
            </Button>
            <Button variant="secondary" onClick={() => setCount(count - 1)}>
              Decrement
            </Button>
            <Button variant="outline" onClick={() => setCount(0)}>
              Reset
            </Button>
            <span style={{ fontSize: 'var(--ha-font-size-2xl)', fontWeight: 'var(--ha-font-weight-bold)' }}>
              Count: {count}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Explore Examples</h2>
        <div className="button-group">
          <Link to="/components">
            <Button variant="primary">Component Showcase</Button>
          </Link>
          <Link to="/forms">
            <Button variant="secondary">Form Examples</Button>
          </Link>
          <Link to="/loader-demo">
            <Button variant="outline">Loader Demo</Button>
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Features</h2>
        <ul style={{ lineHeight: 2, marginLeft: 'var(--ha-spacing-6)' }}>
          <li>Modern Web Components built with Lit</li>
          <li>React wrapper components for seamless integration</li>
          <li>Comprehensive design token system</li>
          <li>TypeScript support with full type definitions</li>
          <li>Remix-optimized configuration</li>
          <li>Server-side rendering compatible</li>
        </ul>
      </section>
    </div>
  );
}
