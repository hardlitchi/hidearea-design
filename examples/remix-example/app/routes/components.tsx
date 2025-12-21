import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Button, Alert, Badge, Card, Input, Select, Checkbox, Tooltip } from '@hidearea-design/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Components - Remix Example' }];
};

export default function Components() {
  const [textInput, setTextInput] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--ha-spacing-8)' }}>
        <Link to="/">
          <Button variant="ghost">← Back to Home</Button>
        </Link>
        <h1 style={{ fontSize: 'var(--ha-font-size-3xl)', fontWeight: 'var(--ha-font-weight-bold)', marginTop: 'var(--ha-spacing-4)' }}>
          Component Showcase
        </h1>
      </header>

      {/* Buttons */}
      <section className="section">
        <h2 className="section-title">Buttons</h2>
        <div className="button-group">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Alerts */}
      <section className="section">
        <h2 className="section-title">Alerts</h2>
        <div className="alert-group">
          <Alert variant="info">
            This is an informational alert message.
          </Alert>
          <Alert variant="success">
            Operation completed successfully!
          </Alert>
          <Alert variant="warning">
            Please review this warning message.
          </Alert>
          <Alert variant="error">
            An error occurred. Please try again.
          </Alert>
        </div>
      </section>

      {/* Badges */}
      <section className="section">
        <h2 className="section-title">Badges</h2>
        <div className="badge-group">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      {/* Form Elements */}
      <section className="section">
        <h2 className="section-title">Form Elements</h2>
        <div className="form-grid">
          <div>
            <label htmlFor="text-input">Text Input</label>
            <Input
              id="text-input"
              type="text"
              placeholder="Enter text..."
              value={textInput}
              onInput={(e) => setTextInput(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="select-input">Select</label>
            <Select
              id="select-input"
              value={selectValue}
              onChange={(e) => setSelectValue(e.currentTarget.value)}
            >
              <option value="">Choose an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </div>
        </div>
        <div style={{ marginTop: 'var(--ha-spacing-4)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ha-spacing-2)', cursor: 'pointer' }}>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.currentTarget.checked)}
            />
            <span>I agree to the terms and conditions</span>
          </label>
        </div>
      </section>

      {/* Cards */}
      <section className="section">
        <h2 className="section-title">Cards</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--ha-spacing-4)' }}>
          <Card>
            <div slot="header">
              <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
                Card Title
              </h3>
            </div>
            <p style={{ marginBottom: 'var(--ha-spacing-3)' }}>
              This is a card component with a header and footer. Cards are useful for grouping related content.
            </p>
            <div slot="footer" className="card-footer">
              <Button variant="outline" size="small">Cancel</Button>
              <Button variant="primary" size="small">Confirm</Button>
            </div>
          </Card>

          <Card>
            <div slot="header">
              <h3 style={{ fontSize: 'var(--ha-font-size-lg)', fontWeight: 'var(--ha-font-weight-semibold)' }}>
                Another Card
              </h3>
            </div>
            <p>
              Cards can contain any content including text, images, buttons, and other components.
            </p>
          </Card>
        </div>
      </section>

      {/* Tooltips */}
      <section className="section">
        <h2 className="section-title">Tooltips</h2>
        <div style={{ display: 'flex', gap: 'var(--ha-spacing-4)', flexWrap: 'wrap' }}>
          <Tooltip content="This is a tooltip on top">
            <Button variant="primary">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip on the right" placement="right">
            <Button variant="secondary">Hover me (right)</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip on the bottom" placement="bottom">
            <Button variant="outline">Hover me (bottom)</Button>
          </Tooltip>
          <Tooltip content="This is a tooltip on the left" placement="left">
            <Button variant="ghost">Hover me (left)</Button>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}
