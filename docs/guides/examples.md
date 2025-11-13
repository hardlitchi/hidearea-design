# Usage Examples

Complete examples showing common patterns and use cases with hidearea-design components.

## Table of Contents

- [Login Form](#login-form)
- [Registration Form](#registration-form)
- [Search Interface](#search-interface)
- [Settings Panel](#settings-panel)
- [Modal Dialog](#modal-dialog)

## Login Form

### React Example

```tsx
import { useState } from 'react';
import '@hidearea-design/tokens/dist/tokens.css';
import { Input, Button, Checkbox } from '@hidearea-design/react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      // API call
      await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <h2>Login</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          fullWidth
          required
          error={!!errors.email}
          value={formData.email}
          onInput={(e) => {
            setFormData({ ...formData, email: e.detail.value });
            setErrors({ ...errors, email: '' });
          }}
        />
        {errors.email && (
          <p style={{ color: 'var(--ha-color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          fullWidth
          required
          error={!!errors.password}
          value={formData.password}
          onInput={(e) => {
            setFormData({ ...formData, password: e.detail.value });
            setErrors({ ...errors, password: '' });
          }}
        />
        {errors.password && (
          <p style={{ color: 'var(--ha-color-error)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.password}
          </p>
        )}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Checkbox
          checked={formData.remember}
          onChange={(e) => setFormData({ ...formData, remember: e.detail.checked })}
        >
          Remember me
        </Checkbox>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}

export default LoginForm;
```

### Vue Example

```vue
<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2>Login</h2>

    <div class="form-group">
      <label for="email">Email</label>
      <HaInput
        id="email"
        v-model="formData.email"
        type="email"
        placeholder="email@example.com"
        full-width
        required
        :error="!!errors.email"
        @input="errors.email = ''"
      />
      <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <HaInput
        id="password"
        v-model="formData.password"
        type="password"
        placeholder="Enter your password"
        full-width
        required
        :error="!!errors.password"
        @input="errors.password = ''"
      />
      <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
    </div>

    <div class="form-group">
      <HaCheckbox v-model="formData.remember">
        Remember me
      </HaCheckbox>
    </div>

    <HaButton
      type="submit"
      variant="primary"
      full-width
      :loading="loading"
      :disabled="loading"
    >
      {{ loading ? 'Logging in...' : 'Login' }}
    </HaButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import '@hidearea-design/tokens/dist/tokens.css';
import { HaInput, HaButton, HaCheckbox } from '@hidearea-design/vue';

const formData = reactive({
  email: '',
  password: '',
  remember: false
});

const errors = reactive<Record<string, string>>({});
const loading = ref(false);

const validate = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Email is invalid';
  }

  if (!formData.password) {
    newErrors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  loading.value = true;
  try {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    console.log('Login successful');
  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.error-message {
  color: var(--ha-color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
```

## Registration Form

```tsx
// React
import { useState } from 'react';
import { Input, Button, Checkbox } from '@hidearea-design/react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Username"
        fullWidth
        error={!!errors.username}
        onInput={(e) => setFormData({ ...formData, username: e.detail.value })}
      />

      <Input
        type="email"
        placeholder="Email"
        fullWidth
        error={!!errors.email}
        onInput={(e) => setFormData({ ...formData, email: e.detail.value })}
      />

      <Input
        type="password"
        placeholder="Password"
        fullWidth
        error={!!errors.password}
        onInput={(e) => setFormData({ ...formData, password: e.detail.value })}
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        fullWidth
        error={!!errors.confirmPassword}
        onInput={(e) => setFormData({ ...formData, confirmPassword: e.detail.value })}
      />

      <Checkbox
        required
        error={!!errors.terms}
        checked={formData.terms}
        onChange={(e) => setFormData({ ...formData, terms: e.detail.checked })}
      >
        I agree to the <a href="/terms">Terms and Conditions</a>
      </Checkbox>

      <Button type="submit" variant="primary" fullWidth>
        Register
      </Button>
    </form>
  );
}
```

## Search Interface

```tsx
// React
import { useState, useEffect } from 'react';
import { Input, Button } from '@hidearea-design/react';

function SearchInterface() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        fullWidth
        value={query}
        onInput={(e) => setQuery(e.detail.value)}
      >
        <svg slot="prefix" width="20" height="20" viewBox="0 0 20 20">
          <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
      </Input>

      {loading && <p>Searching...</p>}

      <div>
        {results.map(result => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Settings Panel

```tsx
// React
import { useState } from 'react';
import { Checkbox, Button } from '@hidearea-design/react';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    newsletter: true,
    updates: false
  });

  const allNotifications = Object.values(settings).every(Boolean);
  const someNotifications = Object.values(settings).some(Boolean) && !allNotifications;

  const toggleAll = () => {
    const newValue = !allNotifications;
    setSettings({
      emailNotifications: newValue,
      pushNotifications: newValue,
      smsNotifications: newValue,
      newsletter: newValue,
      updates: newValue
    });
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <div style={{ maxWidth: '500px' }}>
      <h2>Notification Settings</h2>

      <Checkbox
        checked={allNotifications}
        indeterminate={someNotifications}
        onChange={toggleAll}
        size="lg"
      >
        <strong>Enable all notifications</strong>
      </Checkbox>

      <div style={{ marginLeft: '2rem' }}>
        <Checkbox
          checked={settings.emailNotifications}
          onChange={(e) => setSettings({ ...settings, emailNotifications: e.detail.checked })}
        >
          Email notifications
          <span slot="description">Receive updates via email</span>
        </Checkbox>

        <Checkbox
          checked={settings.pushNotifications}
          onChange={(e) => setSettings({ ...settings, pushNotifications: e.detail.checked })}
        >
          Push notifications
          <span slot="description">Get instant updates on your device</span>
        </Checkbox>

        <Checkbox
          checked={settings.smsNotifications}
          onChange={(e) => setSettings({ ...settings, smsNotifications: e.detail.checked })}
        >
          SMS notifications
          <span slot="description">Receive text messages for important updates</span>
        </Checkbox>

        <Checkbox
          checked={settings.newsletter}
          onChange={(e) => setSettings({ ...settings, newsletter: e.detail.checked })}
        >
          Newsletter
          <span slot="description">Weekly digest of updates and news</span>
        </Checkbox>

        <Checkbox
          checked={settings.updates}
          onChange={(e) => setSettings({ ...settings, updates: e.detail.checked })}
        >
          Product updates
          <span slot="description">Learn about new features and improvements</span>
        </Checkbox>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="outline">
          Reset
        </Button>
      </div>
    </div>
  );
}
```

## Best Practices

### Form Validation

1. **Validate on blur and submit**: Check fields when user leaves them and on form submission
2. **Clear errors on input**: Remove error messages as user types
3. **Show specific error messages**: Tell users exactly what's wrong
4. **Use native validation**: Leverage HTML5 validation attributes

### Loading States

1. **Show loading indicators**: Use loading prop on buttons during async operations
2. **Disable during loading**: Prevent multiple submissions
3. **Provide feedback**: Update button text to show progress

### Accessibility

1. **Use proper labels**: Associate labels with inputs
2. **Provide descriptions**: Use description slots for additional context
3. **Indicate required fields**: Use required attribute and visual indicators
4. **Keyboard navigation**: Ensure all interactions work with keyboard

### Performance

1. **Debounce search**: Delay API calls during typing
2. **Lazy load options**: Load select options on demand
3. **Optimize re-renders**: Use React.memo or Vue's reactive system wisely

## Related Documentation

- [Component API Reference](../components/README.md)
- [Customization Guide](./customization.md)
- [Accessibility Guide](./accessibility.md)
