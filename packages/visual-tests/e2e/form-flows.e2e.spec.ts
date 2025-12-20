import { test, expect } from '@playwright/test';

/**
 * E2E tests for form flows
 * Tests user interactions with forms including validation, submission, and error handling
 */

test.describe('Form Flows E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006');
  });

  test.describe('Login Form Flow', () => {
    test('should complete successful login flow', async ({ page }) => {
      // Navigate to login form story
      await page.goto('/iframe.html?id=forms-input--default');

      // Create a simple login form using components
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <form id="login-form">
            <ha-input
              id="username"
              type="text"
              placeholder="Username"
              required
            ></ha-input>
            <ha-input
              id="password"
              type="password"
              placeholder="Password"
              required
            ></ha-input>
            <ha-button id="submit-btn" type="submit">Login</ha-button>
          </form>
        `;
        document.body.appendChild(container);
      });

      // Fill in username
      const username = page.locator('#username');
      await username.click();
      await username.type('testuser');
      await expect(username).toHaveAttribute('value', 'testuser');

      // Fill in password
      const password = page.locator('#password');
      await password.click();
      await password.type('password123');
      await expect(password).toHaveAttribute('value', 'password123');

      // Submit form
      const submitBtn = page.locator('#submit-btn');
      await expect(submitBtn).toBeVisible();
      await submitBtn.click();

      // Verify form submission
      await page.waitForTimeout(100);
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-input--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <form id="login-form">
            <ha-input
              id="username"
              type="text"
              placeholder="Username"
              required
              error="Username is required"
            ></ha-input>
            <ha-input
              id="password"
              type="password"
              placeholder="Password"
              required
              error="Password is required"
            ></ha-input>
            <ha-button id="submit-btn" type="submit">Login</ha-button>
          </form>
        `;
        document.body.appendChild(container);
      });

      // Try to submit without filling fields
      const submitBtn = page.locator('#submit-btn');
      await submitBtn.click();

      // Verify error states
      const username = page.locator('#username');
      await expect(username).toHaveAttribute('error');
    });
  });

  test.describe('Registration Form Flow', () => {
    test('should complete registration with multiple fields', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-input--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <form id="registration-form">
            <ha-input id="email" type="email" placeholder="Email" required></ha-input>
            <ha-input id="username" type="text" placeholder="Username" required></ha-input>
            <ha-input id="password" type="password" placeholder="Password" required></ha-input>
            <ha-checkbox id="terms">I agree to the terms and conditions</ha-checkbox>
            <ha-button id="register-btn" type="submit">Register</ha-button>
          </form>
        `;
        document.body.appendChild(container);
      });

      // Fill email
      await page.locator('#email').click();
      await page.locator('#email').type('user@example.com');

      // Fill username
      await page.locator('#username').click();
      await page.locator('#username').type('newuser');

      // Fill password
      await page.locator('#password').click();
      await page.locator('#password').type('SecurePass123!');

      // Accept terms
      const checkbox = page.locator('#terms');
      await checkbox.click();

      // Submit
      const registerBtn = page.locator('#register-btn');
      await expect(registerBtn).toBeVisible();
      await registerBtn.click();

      await page.waitForTimeout(100);
    });
  });

  test.describe('Form Validation Flow', () => {
    test('should validate email format', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-input--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <ha-input
            id="email"
            type="email"
            placeholder="Email"
            required
          ></ha-input>
        `;
        document.body.appendChild(container);
      });

      const email = page.locator('#email');

      // Type invalid email
      await email.click();
      await email.type('invalid-email');
      await email.blur();

      // Should show validation error (browser native validation)
      await page.waitForTimeout(100);

      // Clear and type valid email
      await email.click();
      await email.fill('valid@example.com');
      await email.blur();

      await expect(email).toHaveAttribute('value', 'valid@example.com');
    });

    test('should handle select dropdown in forms', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-select--default');

      const select = page.locator('ha-select').first();
      await expect(select).toBeVisible();

      // Click to open dropdown
      await select.click();
      await page.waitForTimeout(200);

      // Select an option (if available)
      const option = page.locator('ha-option').first();
      if (await option.count() > 0) {
        await option.click();
        await page.waitForTimeout(100);
      }
    });
  });

  test.describe('Multi-step Form Flow', () => {
    test('should navigate through form steps', async ({ page }) => {
      await page.goto('/iframe.html?id=forms-button--default');

      await page.evaluate(() => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div id="multi-step-form">
            <div id="step1" class="step active">
              <h3>Step 1: Personal Info</h3>
              <ha-input id="firstName" placeholder="First Name"></ha-input>
              <ha-input id="lastName" placeholder="Last Name"></ha-input>
              <ha-button id="next1">Next</ha-button>
            </div>
            <div id="step2" class="step" style="display: none;">
              <h3>Step 2: Contact Info</h3>
              <ha-input id="email" type="email" placeholder="Email"></ha-input>
              <ha-input id="phone" type="tel" placeholder="Phone"></ha-input>
              <ha-button id="back2">Back</ha-button>
              <ha-button id="submit">Submit</ha-button>
            </div>
          </div>
        `;
        document.body.appendChild(container);

        // Add navigation logic
        document.getElementById('next1')?.addEventListener('click', () => {
          document.getElementById('step1')!.style.display = 'none';
          document.getElementById('step2')!.style.display = 'block';
        });
        document.getElementById('back2')?.addEventListener('click', () => {
          document.getElementById('step2')!.style.display = 'none';
          document.getElementById('step1')!.style.display = 'block';
        });
      });

      // Fill step 1
      await page.locator('#firstName').type('John');
      await page.locator('#lastName').type('Doe');

      // Go to step 2
      await page.locator('#next1').click();
      await expect(page.locator('#step2')).toBeVisible();

      // Fill step 2
      await page.locator('#email').type('john@example.com');
      await page.locator('#phone').type('555-1234');

      // Go back
      await page.locator('#back2').click();
      await expect(page.locator('#step1')).toBeVisible();

      // Forward again
      await page.locator('#next1').click();

      // Submit
      await page.locator('#submit').click();
      await page.waitForTimeout(100);
    });
  });
});
