// Import styles from tokens
import '@hidearea-design/tokens/css';

// Import components
import '@hidearea-design/core/components/button';
import '@hidearea-design/core/components/input';
import '@hidearea-design/core/components/checkbox';
import '@hidearea-design/core/components/card';
import '@hidearea-design/core/components/alert';

// Import theme utilities
import { setTheme, initTheme } from '@hidearea-design/core';

// Initialize theme
initTheme();

// Theme switcher
document.getElementById('light-theme')?.addEventListener('click', () => {
  setTheme('light');
});

document.getElementById('dark-theme')?.addEventListener('click', () => {
  setTheme('dark');
});

// Form validation
const form = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

// Validation functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function showError(element, message) {
  element.textContent = message;
  element.classList.add('show');
}

function hideError(element) {
  element.textContent = '';
  element.classList.remove('show');
}

// Clear errors on input
emailInput?.addEventListener('ha-input', () => {
  hideError(emailError);
  emailInput.removeAttribute('error');
});

passwordInput?.addEventListener('ha-input', () => {
  hideError(passwordError);
  passwordInput.removeAttribute('error');
});

// Form submission
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  hideError(emailError);
  hideError(passwordError);
  emailInput.removeAttribute('error');
  passwordInput.removeAttribute('error');

  // Get values
  const email = emailInput.value;
  const password = passwordInput.value;
  const remember = document.getElementById('remember').checked;

  // Validate
  let hasError = false;

  if (!email) {
    showError(emailError, 'メールアドレスを入力してください');
    emailInput.setAttribute('error', '');
    hasError = true;
  } else if (!validateEmail(email)) {
    showError(emailError, '有効なメールアドレスを入力してください');
    emailInput.setAttribute('error', '');
    hasError = true;
  }

  if (!password) {
    showError(passwordError, 'パスワードを入力してください');
    passwordInput.setAttribute('error', '');
    hasError = true;
  } else if (!validatePassword(password)) {
    showError(passwordError, 'パスワードは8文字以上である必要があります');
    passwordInput.setAttribute('error', '');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  // Show loading state
  submitBtn.setAttribute('loading', '');
  submitBtn.setAttribute('disabled', '');

  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success
    console.log('Login successful', { email, password, remember });

    // In a real app, you would redirect here
    alert('ログインに成功しました！');

    // Reset form
    form.reset();
  } catch (error) {
    console.error('Login failed:', error);
    showError(passwordError, 'ログインに失敗しました。もう一度お試しください。');
  } finally {
    // Remove loading state
    submitBtn.removeAttribute('loading');
    submitBtn.removeAttribute('disabled');
  }
});

// Demo: Auto-fill for testing
if (window.location.search.includes('demo=1')) {
  setTimeout(() => {
    emailInput.value = 'demo@example.com';
    emailInput.dispatchEvent(new CustomEvent('ha-input', {
      detail: { value: 'demo@example.com' }
    }));

    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new CustomEvent('ha-input', {
      detail: { value: 'password123' }
    }));
  }, 100);
}
