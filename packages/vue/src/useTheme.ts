import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { getTheme, getEffectiveTheme, setTheme as setCoreTheme, onThemeChange, type Theme } from '@hidearea-design/core';

export interface UseThemeReturn {
  theme: Ref<Theme>;
  effectiveTheme: Ref<'light' | 'dark'>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Vue composable for managing theme (light/dark mode)
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTheme } from '@hidearea-design/vue';
 *
 * const { theme, effectiveTheme, setTheme, toggleTheme } = useTheme();
 * </script>
 *
 * <template>
 *   <div>
 *     <p>Current theme: {{ effectiveTheme }}</p>
 *     <button @click="toggleTheme">Toggle Theme</button>
 *     <button @click="() => setTheme('auto')">Auto</button>
 *   </div>
 * </template>
 * ```
 */
export function useTheme(): UseThemeReturn {
  const theme = ref<Theme>(getTheme());
  const effectiveTheme = ref<'light' | 'dark'>(getEffectiveTheme());

  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    // Listen for theme changes
    unsubscribe = onThemeChange((newEffectiveTheme) => {
      effectiveTheme.value = newEffectiveTheme;
      theme.value = getTheme();
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  const setTheme = (newTheme: Theme) => {
    setCoreTheme(newTheme);
    theme.value = newTheme;
    effectiveTheme.value = getEffectiveTheme(newTheme);
  };

  const toggleTheme = () => {
    const next = effectiveTheme.value === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return {
    theme,
    effectiveTheme,
    setTheme,
    toggleTheme,
  };
}
