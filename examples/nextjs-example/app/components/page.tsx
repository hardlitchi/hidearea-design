'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

// Dynamic import to avoid SSR issues with Web Components (HTMLElement not defined)
const Button = dynamic(() => import('@hidearea-design/react').then(mod => mod.Button), { ssr: false });
const Input = dynamic(() => import('@hidearea-design/react').then(mod => mod.Input), { ssr: false });
const Card = dynamic(() => import('@hidearea-design/react').then(mod => mod.Card), { ssr: false });
const Badge = dynamic(() => import('@hidearea-design/react').then(mod => mod.Badge), { ssr: false });
const Alert = dynamic(() => import('@hidearea-design/react').then(mod => mod.Alert), { ssr: false });
const Checkbox = dynamic(() => import('@hidearea-design/react').then(mod => mod.Checkbox), { ssr: false });
const Radio = dynamic(() => import('@hidearea-design/react').then(mod => mod.Radio), { ssr: false });
const Switch = dynamic(() => import('@hidearea-design/react').then(mod => mod.Switch), { ssr: false });
const Tooltip = dynamic(() => import('@hidearea-design/react').then(mod => mod.Tooltip), { ssr: false });

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: 'var(--ha-spacing-8)'
    }}>
      <header style={{ marginBottom: 'var(--ha-spacing-8)' }}>
        <Link href="/" style={{
          color: 'var(--ha-color-primary)',
          marginBottom: 'var(--ha-spacing-4)',
          display: 'inline-block'
        }}>
          ← Back to Home
        </Link>
        <h1 style={{
          fontSize: 'var(--ha-font-size-4xl)',
          fontWeight: 'var(--ha-font-weight-bold)',
          marginBottom: 'var(--ha-spacing-4)'
        }}>
          Component Showcase
        </h1>
        <p style={{
          fontSize: 'var(--ha-font-size-lg)',
          color: 'var(--ha-color-text-secondary)'
        }}>
          Explore various components from Hidearea Design System
        </p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ha-spacing-8)' }}>
        {/* Alerts Section */}
        <section>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Alerts
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ha-spacing-3)' }}>
            <Alert variant="info" title="Information">
              This is an informational alert message.
            </Alert>
            <Alert variant="success" title="Success">
              Your changes have been saved successfully!
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review the following items before proceeding.
            </Alert>
            <Alert variant="error" title="Error">
              An error occurred while processing your request.
            </Alert>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Badges
          </h2>
          <div style={{
            display: 'flex',
            gap: 'var(--ha-spacing-3)',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Cards
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--ha-spacing-4)'
          }}>
            <Card>
              <div slot="header">
                <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
                  Card Title
                </h3>
              </div>
              <p>This is a basic card with header and footer.</p>
              <div slot="footer" style={{ display: 'flex', gap: 'var(--ha-spacing-2)', justifyContent: 'flex-end' }}>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="primary" size="sm">Save</Button>
              </div>
            </Card>

            <Card>
              <div slot="header">
                <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
                  Feature Card
                </h3>
              </div>
              <p>Cards can contain any content including other components.</p>
              <div style={{ marginTop: 'var(--ha-spacing-3)' }}>
                <Badge variant="success">New</Badge>
              </div>
            </Card>

            <Card>
              <div slot="header">
                <h3 style={{ fontSize: 'var(--ha-font-size-xl)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
                  Interactive Card
                </h3>
              </div>
              <p style={{ marginBottom: 'var(--ha-spacing-3)' }}>
                Cards work great with other components.
              </p>
              <Input
                placeholder="Enter text..."
                value={inputValue}
                onInput={(e: any) => setInputValue(e.target.value)}
              />
            </Card>
          </div>
        </section>

        {/* Form Controls Section */}
        <section>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Form Controls
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ha-spacing-6)',
            maxWidth: '600px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-2)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Text Input
              </label>
              <Input
                placeholder="Enter your name..."
                value={inputValue}
                onInput={(e: any) => setInputValue(e.target.value)}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-3)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Checkbox
              </label>
              <Checkbox
                checked={checked}
                onChange={(e: any) => setChecked(e.target.checked)}
                label="I agree to the terms and conditions"
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-3)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Radio Buttons
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ha-spacing-2)' }}>
                <Radio
                  name="example"
                  value="option1"
                  checked={selectedRadio === 'option1'}
                  onChange={(e: any) => setSelectedRadio(e.target.value)}
                  label="Option 1"
                />
                <Radio
                  name="example"
                  value="option2"
                  checked={selectedRadio === 'option2'}
                  onChange={(e: any) => setSelectedRadio(e.target.value)}
                  label="Option 2"
                />
                <Radio
                  name="example"
                  value="option3"
                  checked={selectedRadio === 'option3'}
                  onChange={(e: any) => setSelectedRadio(e.target.value)}
                  label="Option 3"
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ha-spacing-3)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                <Switch
                  checked={switchValue}
                  onChange={(e: any) => setSwitchValue(e.target.checked)}
                />
                <span>Enable notifications</span>
              </label>
            </div>
          </div>
        </section>

        {/* Tooltips Section */}
        <section>
          <h2 style={{
            fontSize: 'var(--ha-font-size-2xl)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-4)'
          }}>
            Tooltips
          </h2>
          <div style={{
            display: 'flex',
            gap: 'var(--ha-spacing-4)',
            flexWrap: 'wrap'
          }}>
            <Tooltip content="This is a tooltip on top" placement="top">
              <Button variant="outline">Hover me (top)</Button>
            </Tooltip>
            <Tooltip content="This is a tooltip on the right" placement="right">
              <Button variant="outline">Hover me (right)</Button>
            </Tooltip>
            <Tooltip content="This is a tooltip on the bottom" placement="bottom">
              <Button variant="outline">Hover me (bottom)</Button>
            </Tooltip>
            <Tooltip content="This is a tooltip on the left" placement="left">
              <Button variant="outline">Hover me (left)</Button>
            </Tooltip>
          </div>
        </section>
      </main>

      <footer style={{
        marginTop: 'var(--ha-spacing-12)',
        paddingTop: 'var(--ha-spacing-8)',
        borderTop: '1px solid var(--ha-color-border-primary)',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: 'var(--ha-spacing-4)' }}>
          <Link href="/" style={{ color: 'var(--ha-color-primary)' }}>
            Home
          </Link>
          {' | '}
          <Link href="/forms" style={{ color: 'var(--ha-color-primary)' }}>
            Forms
          </Link>
          {' | '}
          <Link href="/data" style={{ color: 'var(--ha-color-primary)' }}>
            Data Display
          </Link>
        </div>
        <p style={{ color: 'var(--ha-color-text-secondary)' }}>
          Built with Hidearea Design System
        </p>
      </footer>
    </div>
  );
}
