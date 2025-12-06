import { useState, useEffect } from 'react';
import { getTheme, getEffectiveTheme, setTheme as setCoreTheme, onThemeChange, type Theme } from '@hidearea-design/core';

export interface UseThemeReturn {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * React hook for managing theme (light/dark mode)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, effectiveTheme, setTheme, toggleTheme } = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {effectiveTheme}</p>
 *       <button onClick={toggleTheme}>Toggle Theme</button>
 *       <button onClick={() => setTheme('auto')}>Auto</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(() => getTheme());
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(() => getEffectiveTheme());

  useEffect(() => {
    // Listen for theme changes
    const unsubscribe = onThemeChange((newEffectiveTheme) => {
      setEffectiveTheme(newEffectiveTheme);
      setThemeState(getTheme());
    });

    return unsubscribe;
  }, []);

  const setTheme = (newTheme: Theme) => {
    setCoreTheme(newTheme);
    setThemeState(newTheme);
    setEffectiveTheme(getEffectiveTheme(newTheme));
  };

  const toggleTheme = () => {
    const next = effectiveTheme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return {
    theme,
    effectiveTheme,
    setTheme,
    toggleTheme,
  };
}
