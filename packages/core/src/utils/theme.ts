/**
 * Theme utilities for managing light/dark mode
 */

export type Theme = 'light' | 'dark' | 'auto';

const THEME_STORAGE_KEY = 'ha-theme';
const THEME_ATTRIBUTE = 'data-theme';

/**
 * Get the current theme from storage or system preference
 */
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';

  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored && (stored === 'light' || stored === 'dark' || stored === 'auto')) {
    return stored;
  }

  return 'auto';
}

/**
 * Get the effective theme (resolve 'auto' to 'light' or 'dark')
 */
export function getEffectiveTheme(theme: Theme = getTheme()): 'light' | 'dark' {
  if (theme === 'auto') {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

/**
 * Set the theme and apply it to the document
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  const effective = getEffectiveTheme(theme);
  document.documentElement.setAttribute(THEME_ATTRIBUTE, effective);

  // Dispatch custom event for listeners
  window.dispatchEvent(new CustomEvent('theme-change', {
    detail: { theme, effective }
  }));
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): void {
  const current = getTheme();
  const effective = getEffectiveTheme(current);
  const next = effective === 'light' ? 'dark' : 'light';
  setTheme(next);
}

/**
 * Initialize theme on page load
 */
export function initTheme(): void {
  if (typeof window === 'undefined') return;

  const theme = getTheme();
  const effective = getEffectiveTheme(theme);
  document.documentElement.setAttribute(THEME_ATTRIBUTE, effective);

  // Listen for system theme changes when in auto mode
  if (theme === 'auto') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      const newEffective = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute(THEME_ATTRIBUTE, newEffective);
      window.dispatchEvent(new CustomEvent('theme-change', {
        detail: { theme: 'auto', effective: newEffective }
      }));
    });
  }
}

/**
 * Add a listener for theme changes
 */
export function onThemeChange(callback: (theme: 'light' | 'dark') => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ theme: Theme; effective: 'light' | 'dark' }>;
    callback(customEvent.detail.effective);
  };

  window.addEventListener('theme-change', handler);

  return () => {
    window.removeEventListener('theme-change', handler);
  };
}
