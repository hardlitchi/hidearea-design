'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

// Dynamic import to avoid SSR issues with Web Components (HTMLElement not defined)
const Button = dynamic(() => import('@hidearea-design/react').then(mod => mod.Button), { ssr: false });

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'var(--ha-spacing-8)'
    }}>
      <header style={{ marginBottom: 'var(--ha-spacing-8)' }}>
        <h1 style={{
          fontSize: 'var(--ha-font-size-4xl)',
          fontWeight: 'var(--ha-font-weight-bold)',
          marginBottom: 'var(--ha-spacing-4)'
        }}>
          Hidearea Design System
        </h1>
        <p style={{
          fontSize: 'var(--ha-font-size-lg)',
          color: 'var(--ha-color-text-secondary)'
        }}>
          Next.js Integration Example
        </p>
      </header>

      <main>
        <section style={{ marginBottom: 'var(--ha-spacing-8)' }}>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Getting Started
          </h2>
          <p style={{
            marginBottom: 'var(--ha-spacing-4)',
            lineHeight: '1.6'
          }}>
            This example demonstrates how to integrate Hidearea Design System into a Next.js application
            using the App Router. All components are fully typed with TypeScript and optimized for
            server-side rendering.
          </p>
        </section>

        <section style={{ marginBottom: 'var(--ha-spacing-8)' }}>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Interactive Example
          </h2>

          <div style={{
            padding: 'var(--ha-spacing-6)',
            backgroundColor: 'var(--ha-color-background-secondary)',
            borderRadius: 'var(--ha-border-radius-lg)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            <p style={{
              marginBottom: 'var(--ha-spacing-4)',
              fontSize: 'var(--ha-font-size-lg)'
            }}>
              Count: <strong>{count}</strong>
            </p>

            <div style={{
              display: 'flex',
              gap: 'var(--ha-spacing-3)',
              flexWrap: 'wrap'
            }}>
              <Button
                variant="primary"
                onClick={() => setCount(count + 1)}
              >
                Increment
              </Button>

              <Button
                variant="secondary"
                onClick={() => setCount(count - 1)}
              >
                Decrement
              </Button>

              <Button
                variant="outline"
                onClick={() => setCount(0)}
              >
                Reset
              </Button>

              <Button
                variant="danger"
                onClick={() => setCount(0)}
                disabled={count === 0}
              >
                Clear
              </Button>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 'var(--ha-spacing-8)' }}>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Button Variants
          </h2>

          <div style={{
            display: 'flex',
            gap: 'var(--ha-spacing-3)',
            flexWrap: 'wrap',
            marginBottom: 'var(--ha-spacing-6)'
          }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="primary">Primary 2</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="secondary">Secondary 2</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          <h3 style={{
            fontSize: 'var(--ha-font-size-xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-3)',
            marginTop: 'var(--ha-spacing-6)'
          }}>
            Button Sizes
          </h3>

          <div style={{
            display: 'flex',
            gap: 'var(--ha-spacing-3)',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </section>

        <section>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Design Tokens
          </h2>

          <p style={{
            marginBottom: 'var(--ha-spacing-4)',
            lineHeight: '1.6'
          }}>
            This example uses Hidearea Design System tokens for consistent spacing, typography,
            colors, and other design properties. Tokens are available as CSS custom properties
            and can be used throughout your application.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--ha-spacing-4)'
          }}>
            <div style={{
              padding: 'var(--ha-spacing-4)',
              backgroundColor: 'var(--ha-color-primary)',
              borderRadius: 'var(--ha-border-radius-md)',
              color: 'white'
            }}>
              Primary Color
            </div>
            <div style={{
              padding: 'var(--ha-spacing-4)',
              backgroundColor: 'var(--ha-color-secondary)',
              borderRadius: 'var(--ha-border-radius-md)',
              color: 'white'
            }}>
              Secondary Color
            </div>
            <div style={{
              padding: 'var(--ha-spacing-4)',
              backgroundColor: 'var(--ha-color-success)',
              borderRadius: 'var(--ha-border-radius-md)',
              color: 'white'
            }}>
              Success Color
            </div>
            <div style={{
              padding: 'var(--ha-spacing-4)',
              backgroundColor: 'var(--ha-color-danger)',
              borderRadius: 'var(--ha-border-radius-md)',
              color: 'white'
            }}>
              Danger Color
            </div>
          </div>
        </section>
      </main>

      <footer style={{
        marginTop: 'var(--ha-spacing-12)',
        paddingTop: 'var(--ha-spacing-8)',
        borderTop: '1px solid var(--ha-color-border-primary)',
        color: 'var(--ha-color-text-secondary)',
        textAlign: 'center'
      }}>
        <p>Built with Hidearea Design System</p>
      </footer>
    </div>
  );
}
