import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getTheme,
  getEffectiveTheme,
  setTheme,
  toggleTheme,
  initTheme,
  onThemeChange,
} from './theme';

describe('Theme Utilities', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Reset document theme
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('getTheme', () => {
    it('should return "auto" by default', () => {
      expect(getTheme()).toBe('auto');
    });

    it('should return stored theme from localStorage', () => {
      localStorage.setItem('ha-theme', 'dark');
      expect(getTheme()).toBe('dark');
    });

    it('should return "auto" for invalid theme', () => {
      localStorage.setItem('ha-theme', 'invalid');
      expect(getTheme()).toBe('auto');
    });
  });

  describe('getEffectiveTheme', () => {
    it('should return light or dark for auto theme based on system preference', () => {
      const theme = getEffectiveTheme('auto');
      expect(['light', 'dark']).toContain(theme);
    });

    it('should return light for light theme', () => {
      expect(getEffectiveTheme('light')).toBe('light');
    });

    it('should return dark for dark theme', () => {
      expect(getEffectiveTheme('dark')).toBe('dark');
    });
  });

  describe('setTheme', () => {
    it('should store theme in localStorage', () => {
      setTheme('dark');
      expect(localStorage.getItem('ha-theme')).toBe('dark');
    });

    it('should set data-theme attribute on document', () => {
      setTheme('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should emit theme-change event', () => {
      return new Promise<void>((resolve) => {
        window.addEventListener(
          'theme-change',
          (e: Event) => {
            const event = e as CustomEvent;
            expect(event.detail.theme).toBe('dark');
            expect(event.detail.effective).toBe('dark');
            resolve();
          },
          { once: true }
        );

        setTheme('dark');
      });
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      setTheme('light');
      toggleTheme();
      expect(getTheme()).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      setTheme('dark');
      toggleTheme();
      expect(getTheme()).toBe('light');
    });

    it('should toggle based on effective theme when current is auto', () => {
      setTheme('auto');
      const effectiveBefore = getEffectiveTheme('auto');
      toggleTheme();
      const expected = effectiveBefore === 'light' ? 'dark' : 'light';
      expect(getTheme()).toBe(expected);
    });
  });

  describe('initTheme', () => {
    it('should set data-theme attribute based on current theme', () => {
      localStorage.setItem('ha-theme', 'dark');
      initTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should use auto theme by default', () => {
      initTheme();
      const theme = document.documentElement.getAttribute('data-theme');
      expect(['light', 'dark']).toContain(theme);
    });
  });

  describe('onThemeChange', () => {
    it('should call callback when theme changes', () => {
      return new Promise<void>((resolve) => {
        const callback = vi.fn((effective) => {
          expect(effective).toBe('dark');
          cleanup(); // Clean up immediately after callback
          resolve();
        });

        const cleanup = onThemeChange(callback);
        setTheme('dark');
      });
    });

    it('should return cleanup function', async () => {
      const callback = vi.fn();
      const cleanup = onThemeChange(callback);

      expect(typeof cleanup).toBe('function');

      // Set theme should trigger callback
      setTheme('dark');
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(callback).toHaveBeenCalledTimes(1);

      // Cleanup
      cleanup();

      // Set theme should not trigger callback after cleanup
      setTheme('light');
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
