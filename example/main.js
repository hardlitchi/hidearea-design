// Import styles from tokens
import '@hidearea-design/tokens/css';

// Import component registration and theme utilities from core
import { setTheme, initTheme } from '@hidearea-design/core';

// Since we are using vite, we can import the components directly.
// The custom elements will be defined automatically.
import '@hidearea-design/core/components/button';
import '@hidearea-design/core/components/checkbox';
import '@hidearea-design/core/components/input';
import '@hidearea-design/core/components/card';
import '@hidearea-design/core/components/alert';

// Theme switcher logic
const lightThemeBtn = document.getElementById('light-theme-btn');
const darkThemeBtn = document.getElementById('dark-theme-btn');

lightThemeBtn.addEventListener('click', () => {
  setTheme('light');
});

darkThemeBtn.addEventListener('click', () => {
  setTheme('dark');
});

// Initialize theme to user's preference or default to light
initTheme();
