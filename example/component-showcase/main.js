// Import styles from tokens
import '@hidearea-design/tokens/css';

// Import all components for showcase
import '@hidearea-design/core/button';
import '@hidearea-design/core/input';
import '@hidearea-design/core/textarea';
import '@hidearea-design/core/checkbox';
import '@hidearea-design/core/radio';
import '@hidearea-design/core/switch';
import '@hidearea-design/core/avatar';
import '@hidearea-design/core/badge';
import '@hidearea-design/core/chip';
import '@hidearea-design/core/card';
import '@hidearea-design/core/alert';
import '@hidearea-design/core/progress';
import '@hidearea-design/core/spinner';
import '@hidearea-design/core/breadcrumb';
import '@hidearea-design/core/tabs';
import '@hidearea-design/core/pagination';
import '@hidearea-design/core/container';
import '@hidearea-design/core/stack';
import '@hidearea-design/core/accordion';
import '@hidearea-design/core/theme-switcher';

// Import theme utilities
import { initTheme } from '@hidearea-design/core';

// Initialize theme (theme-switcher component handles switching)
initTheme();

// Handle chip removal
document.querySelectorAll('ha-chip[removable]').forEach(chip => {
  chip.addEventListener('ha-remove', () => {
    chip.remove();
  });
});

// Handle tab switching
document.querySelectorAll('ha-tabs').forEach(tabs => {
  const tabItems = tabs.querySelectorAll('ha-tab-item');
  const tabPanels = tabs.querySelectorAll('ha-tab-panel');

  tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs and panels
      tabItems.forEach(t => t.removeAttribute('active'));
      tabPanels.forEach(p => p.removeAttribute('active'));

      // Add active to clicked tab and corresponding panel
      tab.setAttribute('active', '');
      tabPanels[index]?.setAttribute('active', '');
    });
  });
});

// Demo: Show code on hover (optional enhancement)
document.querySelectorAll('.component-demo').forEach(demo => {
  demo.addEventListener('dblclick', () => {
    const code = demo.innerHTML;
    console.log('Component HTML:', code);
  });
});
