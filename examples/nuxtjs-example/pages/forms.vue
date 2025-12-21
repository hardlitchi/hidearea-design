<template>
  <div class="container">
    <header style="margin-bottom: var(--ha-spacing-8)">
      <NuxtLink
        to="/"
        style="
          color: var(--ha-color-primary);
          margin-bottom: var(--ha-spacing-4);
          display: inline-block;
        "
      >
        ← Back to Home
      </NuxtLink>
      <h1
        style="
          font-size: var(--ha-font-size-4xl);
          font-weight: var(--ha-font-weight-bold);
          margin-bottom: var(--ha-spacing-4);
        "
      >
        Form Example
      </h1>
      <p
        style="
          font-size: var(--ha-font-size-lg);
          color: var(--ha-color-text-secondary);
        "
      >
        Complete form implementation with validation
      </p>
    </header>

    <main>
      <ha-alert
        v-if="submitted"
        variant="success"
        title="Success!"
        style="margin-bottom: var(--ha-spacing-6)"
      >
        Your form has been submitted successfully. Thank you!
      </ha-alert>

      <form
        @submit.prevent="handleSubmit"
        style="
          background-color: var(--ha-color-background-secondary);
          padding: var(--ha-spacing-6);
          border-radius: var(--ha-border-radius-lg);
        "
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: var(--ha-spacing-5);
          "
        >
          <!-- Name Field -->
          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-2);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Full Name
              <span style="color: var(--ha-color-danger)">*</span>
            </label>
            <ha-input
              type="text"
              placeholder="John Doe"
              :value="formData.name"
              @input="updateField('name', ($event.target as HTMLInputElement).value)"
              :error="!!errors.name"
            />
            <span
              v-if="errors.name"
              style="
                display: block;
                margin-top: var(--ha-spacing-1);
                font-size: var(--ha-font-size-sm);
                color: var(--ha-color-danger);
              "
            >
              {{ errors.name }}
            </span>
          </div>

          <!-- Email Field -->
          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-2);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Email Address
              <span style="color: var(--ha-color-danger)">*</span>
            </label>
            <ha-input
              type="email"
              placeholder="john@example.com"
              :value="formData.email"
              @input="updateField('email', ($event.target as HTMLInputElement).value)"
              :error="!!errors.email"
            />
            <span
              v-if="errors.email"
              style="
                display: block;
                margin-top: var(--ha-spacing-1);
                font-size: var(--ha-font-size-sm);
                color: var(--ha-color-danger);
              "
            >
              {{ errors.email }}
            </span>
          </div>

          <!-- Country Select -->
          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-2);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Country
              <span style="color: var(--ha-color-danger)">*</span>
            </label>
            <ha-select
              :value="formData.country"
              @change="updateField('country', ($event.target as HTMLSelectElement).value)"
              :error="!!errors.country"
            >
              <option value="">Select a country</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="jp">Japan</option>
              <option value="other">Other</option>
            </ha-select>
            <span
              v-if="errors.country"
              style="
                display: block;
                margin-top: var(--ha-spacing-1);
                font-size: var(--ha-font-size-sm);
                color: var(--ha-color-danger);
              "
            >
              {{ errors.country }}
            </span>
          </div>

          <!-- Plan Selection -->
          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-3);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Select Plan
            </label>
            <div
              style="
                display: flex;
                flex-direction: column;
                gap: var(--ha-spacing-2);
              "
            >
              <ha-radio
                name="plan"
                value="basic"
                :checked="formData.plan === 'basic'"
                @change="updateField('plan', ($event.target as HTMLInputElement).value)"
                label="Basic Plan - Free"
              />
              <ha-radio
                name="plan"
                value="pro"
                :checked="formData.plan === 'pro'"
                @change="updateField('plan', ($event.target as HTMLInputElement).value)"
                label="Pro Plan - $9.99/month"
              />
              <ha-radio
                name="plan"
                value="enterprise"
                :checked="formData.plan === 'enterprise'"
                @change="updateField('plan', ($event.target as HTMLInputElement).value)"
                label="Enterprise Plan - Custom pricing"
              />
            </div>
          </div>

          <!-- Message Textarea -->
          <div>
            <label
              style="
                display: block;
                margin-bottom: var(--ha-spacing-2);
                font-weight: var(--ha-font-weight-medium);
              "
            >
              Message
              <span style="color: var(--ha-color-danger)">*</span>
            </label>
            <ha-textarea
              placeholder="Tell us about your project..."
              rows="5"
              :value="formData.message"
              @input="updateField('message', ($event.target as HTMLTextAreaElement).value)"
              :error="!!errors.message"
            />
            <span
              v-if="errors.message"
              style="
                display: block;
                margin-top: var(--ha-spacing-1);
                font-size: var(--ha-font-size-sm);
                color: var(--ha-color-danger);
              "
            >
              {{ errors.message }}
            </span>
          </div>

          <!-- Newsletter Checkbox -->
          <div>
            <ha-checkbox
              :checked="formData.newsletter"
              @change="updateField('newsletter', ($event.target as HTMLInputElement).checked)"
              label="Subscribe to newsletter for updates and tips"
            />
          </div>

          <!-- Submit Button -->
          <div
            style="
              display: flex;
              gap: var(--ha-spacing-3);
              margin-top: var(--ha-spacing-2);
            "
          >
            <ha-button type="submit" variant="primary"> Submit Form </ha-button>
            <ha-button type="button" variant="outline" @click="resetForm">
              Reset
            </ha-button>
          </div>
        </div>
      </form>

      <!-- Form State Display -->
      <div
        style="
          margin-top: var(--ha-spacing-8);
          padding: var(--ha-spacing-4);
          background-color: var(--ha-color-background-tertiary);
          border-radius: var(--ha-border-radius-md);
          font-size: var(--ha-font-size-sm);
        "
      >
        <h3
          style="
            font-size: var(--ha-font-size-lg);
            font-weight: var(--ha-font-weight-semibold);
            margin-bottom: var(--ha-spacing-3);
          "
        >
          Current Form State
        </h3>
        <pre
          style="
            overflow: auto;
            padding: var(--ha-spacing-3);
            background-color: var(--ha-color-background-primary);
            border-radius: var(--ha-border-radius-sm);
          "
        >{{ JSON.stringify(formData, null, 2) }}</pre>
      </div>
    </main>

    <footer
      style="
        margin-top: var(--ha-spacing-12);
        padding-top: var(--ha-spacing-8);
        border-top: 1px solid var(--ha-color-border-primary);
        text-align: center;
      "
    >
      <div style="margin-bottom: var(--ha-spacing-4)">
        <NuxtLink to="/" style="color: var(--ha-color-primary)">
          Home
        </NuxtLink>
        |
        <NuxtLink to="/components" style="color: var(--ha-color-primary)">
          Components
        </NuxtLink>
      </div>
      <p style="color: var(--ha-color-text-secondary)">
        Built with Hidearea Design System
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
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

const formData = ref<FormData>({
  name: '',
  email: '',
  country: '',
  message: '',
  newsletter: false,
  plan: 'basic',
});

const errors = ref<FormErrors>({});
const submitted = ref(false);

const updateField = (field: keyof FormData, value: any) => {
  formData.value = { ...formData.value, [field]: value };
  // Clear error for this field
  if (errors.value[field as keyof FormErrors]) {
    const newErrors = { ...errors.value };
    delete newErrors[field as keyof FormErrors];
    errors.value = newErrors;
  }
};

const handleSubmit = () => {
  // Simple validation
  const newErrors: FormErrors = {};
  if (!formData.value.name) newErrors.name = 'Name is required';
  if (!formData.value.email) newErrors.email = 'Email is required';
  if (!formData.value.country) newErrors.country = 'Please select a country';
  if (!formData.value.message) newErrors.message = 'Message is required';

  if (Object.keys(newErrors).length > 0) {
    errors.value = newErrors;
    return;
  }

  errors.value = {};
  submitted.value = true;

  // Reset form after 3 seconds
  setTimeout(() => {
    submitted.value = false;
    resetForm();
  }, 3000);
};

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    country: '',
    message: '',
    newsletter: false,
    plan: 'basic',
  };
  errors.value = {};
};
</script>
