'use client';

'use client';

import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Alert,
} from '@hidearea-design/react';
import Link from 'next/link';
import { useState, FormEvent } from 'react';

export default function FormsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false,
    plan: 'basic',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.country) newErrors.country = 'Please select a country';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        country: '',
        message: '',
        newsletter: false,
        plan: 'basic',
      });
    }, 3000);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
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
          Form Example
        </h1>
        <p style={{
          fontSize: 'var(--ha-font-size-lg)',
          color: 'var(--ha-color-text-secondary)'
        }}>
          Complete form implementation with validation
        </p>
      </header>

      <main>
        {submitted && (
          <Alert
            variant="success"
            title="Success!"
            style={{ marginBottom: 'var(--ha-spacing-6)' }}
          >
            Your form has been submitted successfully. Thank you!
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'var(--ha-color-background-secondary)',
          padding: 'var(--ha-spacing-6)',
          borderRadius: 'var(--ha-border-radius-lg)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ha-spacing-5)'
          }}>
            {/* Name Field */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-2)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Full Name <span style={{ color: 'var(--ha-color-danger)' }}>*</span>
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onInput={(e: any) => updateField('name', e.target.value)}
                error={!!errors.name}
              />
              {errors.name && (
                <span style={{
                  display: 'block',
                  marginTop: 'var(--ha-spacing-1)',
                  fontSize: 'var(--ha-font-size-sm)',
                  color: 'var(--ha-color-danger)'
                }}>
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-2)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Email Address <span style={{ color: 'var(--ha-color-danger)' }}>*</span>
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onInput={(e: any) => updateField('email', e.target.value)}
                error={!!errors.email}
              />
              {errors.email && (
                <span style={{
                  display: 'block',
                  marginTop: 'var(--ha-spacing-1)',
                  fontSize: 'var(--ha-font-size-sm)',
                  color: 'var(--ha-color-danger)'
                }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Country Select */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-2)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Country <span style={{ color: 'var(--ha-color-danger)' }}>*</span>
              </label>
              <Select
                value={formData.country}
                onChange={(e: any) => updateField('country', e.target.value)}
                error={!!errors.country}
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
                <option value="jp">Japan</option>
                <option value="other">Other</option>
              </Select>
              {errors.country && (
                <span style={{
                  display: 'block',
                  marginTop: 'var(--ha-spacing-1)',
                  fontSize: 'var(--ha-font-size-sm)',
                  color: 'var(--ha-color-danger)'
                }}>
                  {errors.country}
                </span>
              )}
            </div>

            {/* Plan Selection */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-3)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Select Plan
              </label>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ha-spacing-2)'
              }}>
                <Radio
                  name="plan"
                  value="basic"
                  checked={formData.plan === 'basic'}
                  onChange={(e: any) => updateField('plan', e.target.value)}
                  label="Basic Plan - Free"
                />
                <Radio
                  name="plan"
                  value="pro"
                  checked={formData.plan === 'pro'}
                  onChange={(e: any) => updateField('plan', e.target.value)}
                  label="Pro Plan - $9.99/month"
                />
                <Radio
                  name="plan"
                  value="enterprise"
                  checked={formData.plan === 'enterprise'}
                  onChange={(e: any) => updateField('plan', e.target.value)}
                  label="Enterprise Plan - Custom pricing"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: 'var(--ha-spacing-2)',
                fontWeight: 'var(--ha-font-weight-medium)'
              }}>
                Message <span style={{ color: 'var(--ha-color-danger)' }}>*</span>
              </label>
              <Textarea
                placeholder="Tell us about your project..."
                rows={5}
                value={formData.message}
                onInput={(e: any) => updateField('message', e.target.value)}
                error={!!errors.message}
              />
              {errors.message && (
                <span style={{
                  display: 'block',
                  marginTop: 'var(--ha-spacing-1)',
                  fontSize: 'var(--ha-font-size-sm)',
                  color: 'var(--ha-color-danger)'
                }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Newsletter Checkbox */}
            <div>
              <Checkbox
                checked={formData.newsletter}
                onChange={(e: any) => updateField('newsletter', e.target.checked)}
                label="Subscribe to newsletter for updates and tips"
              />
            </div>

            {/* Submit Button */}
            <div style={{
              display: 'flex',
              gap: 'var(--ha-spacing-3)',
              marginTop: 'var(--ha-spacing-2)'
            }}>
              <Button
                type="submit"
                variant="primary"
              >
                Submit Form
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    country: '',
                    message: '',
                    newsletter: false,
                    plan: 'basic',
                  });
                  setErrors({});
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </form>

        {/* Form State Display */}
        <div style={{
          marginTop: 'var(--ha-spacing-8)',
          padding: 'var(--ha-spacing-4)',
          backgroundColor: 'var(--ha-color-background-tertiary)',
          borderRadius: 'var(--ha-border-radius-md)',
          fontSize: 'var(--ha-font-size-sm)'
        }}>
          <h3 style={{
            fontSize: 'var(--ha-font-size-lg)',
            fontWeight: 'var(--ha-font-weight-semibold)',
            marginBottom: 'var(--ha-spacing-3)'
          }}>
            Current Form State
          </h3>
          <pre style={{
            overflow: 'auto',
            padding: 'var(--ha-spacing-3)',
            backgroundColor: 'var(--ha-color-background-primary)',
            borderRadius: 'var(--ha-border-radius-sm)'
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
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
          <Link href="/components" style={{ color: 'var(--ha-color-primary)' }}>
            Components
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
