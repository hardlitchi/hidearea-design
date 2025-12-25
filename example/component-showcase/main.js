// Import styles from tokens
import '@hidearea-design/tokens/css';

// Import all components for showcase
import '@hidearea-design/core/components/button';
import '@hidearea-design/core/components/input';
import '@hidearea-design/core/components/textarea';
import '@hidearea-design/core/components/checkbox';
import '@hidearea-design/core/components/radio';
import '@hidearea-design/core/components/switch';
import '@hidearea-design/core/components/avatar';
import '@hidearea-design/core/components/badge';
import '@hidearea-design/core/components/chip';
import '@hidearea-design/core/components/card';
import '@hidearea-design/core/components/alert';
import '@hidearea-design/core/components/progress';
import '@hidearea-design/core/components/spinner';
import '@hidearea-design/core/components/breadcrumb';
import '@hidearea-design/core/components/tabs';
import '@hidearea-design/core/components/pagination';
import '@hidearea-design/core/components/container';
import '@hidearea-design/core/components/stack';
import '@hidearea-design/core/components/accordion';
import '@hidearea-design/core/components/theme-switcher';

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
