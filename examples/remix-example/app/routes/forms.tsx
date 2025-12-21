import { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Button, Input, Select, Checkbox, Alert } from '@hidearea-design/react';

export const meta: MetaFunction = () => {
  return [{ title: 'Forms - Remix Example' }];
};

interface FormData {
  name: string;
  email: string;
  country: string;
  message: string;
  newsletter: boolean;
  plan: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  country?: string;
  message?: string;
}

export default function Forms() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false,
    plan: 'basic',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);

    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          country: '',
          message: '',
          newsletter: false,
          plan: 'basic',
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      country: '',
      message: '',
      newsletter: false,
      plan: 'basic',
    });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--ha-spacing-8)' }}>
        <Link to="/">
          <Button variant="ghost">← Back to Home</Button>
        </Link>
        <h1 style={{ fontSize: 'var(--ha-font-size-3xl)', fontWeight: 'var(--ha-font-weight-bold)', marginTop: 'var(--ha-spacing-4)' }}>
          Form Examples
        </h1>
        <p style={{ color: 'var(--ha-color-text-secondary)', marginTop: 'var(--ha-spacing-2)' }}>
          Demonstrating form validation and state management
        </p>
      </header>

      {submitted && (
        <Alert variant="success" style={{ marginBottom: 'var(--ha-spacing-6)' }}>
          Form submitted successfully! Check the console for the submitted data.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <section className="section">
          <h2 className="section-title">Contact Form</h2>

          <div className="form-grid">
            <div>
              <label htmlFor="name">
                Name <span style={{ color: 'var(--ha-color-error)' }}>*</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onInput={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
                invalid={!!errors.name}
              />
              {errors.name && (
                <span style={{ color: 'var(--ha-color-error)', fontSize: 'var(--ha-font-size-sm)', marginTop: 'var(--ha-spacing-1)', display: 'block' }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="email">
                Email <span style={{ color: 'var(--ha-color-error)' }}>*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onInput={(e) => setFormData({ ...formData, email: e.currentTarget.value })}
                invalid={!!errors.email}
              />
              {errors.email && (
                <span style={{ color: 'var(--ha-color-error)', fontSize: 'var(--ha-font-size-sm)', marginTop: 'var(--ha-spacing-1)', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="country">
                Country <span style={{ color: 'var(--ha-color-error)' }}>*</span>
              </label>
              <Select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.currentTarget.value })}
                invalid={!!errors.country}
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="jp">Japan</option>
              </Select>
              {errors.country && (
                <span style={{ color: 'var(--ha-color-error)', fontSize: 'var(--ha-font-size-sm)', marginTop: 'var(--ha-spacing-1)', display: 'block' }}>
                  {errors.country}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="plan">Plan</label>
              <Select
                id="plan"
                value={formData.plan}
                onChange={(e) => setFormData({ ...formData, plan: e.currentTarget.value })}
              >
                <option value="basic">Basic</option>
                <option value="pro">Professional</option>
                <option value="enterprise">Enterprise</option>
              </Select>
            </div>
          </div>

          <div style={{ marginTop: 'var(--ha-spacing-4)' }}>
            <label htmlFor="message">
              Message <span style={{ color: 'var(--ha-color-error)' }}>*</span>
            </label>
            <textarea
              id="message"
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: 'var(--ha-spacing-3)',
                fontFamily: 'var(--ha-font-family-base)',
                fontSize: 'var(--ha-font-size-base)',
                border: `1px solid ${errors.message ? 'var(--ha-color-error)' : 'var(--ha-color-border-primary)'}`,
                borderRadius: 'var(--ha-border-radius-md)',
                backgroundColor: 'var(--ha-color-background-primary)',
                color: 'var(--ha-color-text-primary)',
                resize: 'vertical',
              }}
            />
            {errors.message && (
              <span style={{ color: 'var(--ha-color-error)', fontSize: 'var(--ha-font-size-sm)', marginTop: 'var(--ha-spacing-1)', display: 'block' }}>
                {errors.message}
              </span>
            )}
          </div>

          <div style={{ marginTop: 'var(--ha-spacing-4)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ha-spacing-2)', cursor: 'pointer' }}>
              <Checkbox
                checked={formData.newsletter}
                onChange={(e) => setFormData({ ...formData, newsletter: e.currentTarget.checked })}
              />
              <span>Subscribe to newsletter</span>
            </label>
          </div>

          <div style={{ marginTop: 'var(--ha-spacing-6)', display: 'flex', gap: 'var(--ha-spacing-3)' }}>
            <Button type="submit" variant="primary">
              Submit Form
            </Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </section>
      </form>

      <section className="section" style={{ marginTop: 'var(--ha-spacing-12)' }}>
        <h2 className="section-title">Form State</h2>
        <pre style={{
          backgroundColor: 'var(--ha-color-background-secondary)',
          padding: 'var(--ha-spacing-4)',
          borderRadius: 'var(--ha-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ha-font-size-sm)',
        }}>
          {JSON.stringify({ formData, errors }, null, 2)}
        </pre>
      </section>
    </div>
  );
}
