/**
 * Theme Manager Utility
 *
 * Provides utilities for managing theme switching in the Hidearea Design System.
 * Supports light and dark modes with localStorage persistence.
 */

/**
 * Available theme options
 * @type {Object}
 */
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

/**
 * Storage key for theme preference
 * @type {string}
 */
const STORAGE_KEY = 'hidearea-theme';

/**
 * Gets the current theme from the document
 * @returns {string} Current theme ('light' or 'dark')
 */
export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || THEMES.LIGHT;
}

/**
 * Gets the stored theme preference
 * @returns {string|null} Stored theme preference or null if not set
 */
export function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
    return null;
  }
}

/**
 * Stores the theme preference
 * @param {string} theme - Theme to store ('light', 'dark', or 'auto')
 */
export function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to store theme preference:', error);
  }
}

/**
 * Detects system theme preference
 * @returns {string} 'light' or 'dark' based on system preference
 */
export function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }
  return THEMES.LIGHT;
}

/**
 * Resolves the theme to apply based on preference
 * @param {string} preference - Theme preference ('light', 'dark', or 'auto')
 * @returns {string} Resolved theme ('light' or 'dark')
 */
export function resolveTheme(preference) {
  if (preference === THEMES.AUTO) {
    return getSystemTheme();
  }
  return preference === THEMES.DARK ? THEMES.DARK : THEMES.LIGHT;
}

/**
 * Sets the theme on the document
 * @param {string} theme - Theme to apply ('light' or 'dark')
 * @param {boolean} store - Whether to store the preference (default: true)
 */
export function setTheme(theme, store = true) {
  const resolvedTheme = resolveTheme(theme);
  document.documentElement.setAttribute('data-theme', resolvedTheme);

  if (store) {
    storeTheme(theme);
  }

  // Dispatch custom event for theme change
  window.dispatchEvent(new CustomEvent('theme-changed', {
    detail: { theme: resolvedTheme, preference: theme }
  }));
}

/**
 * Toggles between light and dark theme
 */
export function toggleTheme() {
  const current = getCurrentTheme();
  const newTheme = current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
  setTheme(newTheme);
}

/**
 * Initializes the theme system
 * - Applies stored theme or auto-detects system preference
 * - Sets up system theme change listener
 */
export function initializeTheme() {
  const storedPreference = getStoredTheme();
  const preferenceToApply = storedPreference || THEMES.AUTO;

  // Apply theme without storing (already stored or auto)
  setTheme(preferenceToApply, false);

  // Listen for system theme changes
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', (e) => {
        const currentPreference = getStoredTheme();
        if (!currentPreference || currentPreference === THEMES.AUTO) {
          const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
          setTheme(newTheme, false);
        }
      });
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener((e) => {
        const currentPreference = getStoredTheme();
        if (!currentPreference || currentPreference === THEMES.AUTO) {
          const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
          setTheme(newTheme, false);
        }
      });
    }
  }
}

/**
 * Theme Manager Class
 * Provides an object-oriented interface for theme management
 */
export class ThemeManager {
  constructor() {
    this.listeners = new Set();
    this.initialize();
  }

  initialize() {
    initializeTheme();

    // Listen for theme changes
    window.addEventListener('theme-changed', (e) => {
      this.listeners.forEach(callback => callback(e.detail));
    });
  }

  get current() {
    return getCurrentTheme();
  }

  get preference() {
    return getStoredTheme() || THEMES.AUTO;
  }

  set(theme) {
    setTheme(theme);
  }

  toggle() {
    toggleTheme();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
}

// Auto-initialize if not in module context
if (typeof window !== 'undefined' && !window.__HIDEAREA_THEME_INITIALIZED) {
  window.__HIDEAREA_THEME_INITIALIZED = true;
  initializeTheme();
}
