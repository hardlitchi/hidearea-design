// Import styles from tokens
import '@hidearea-design/tokens/css';

// Import components
import '@hidearea-design/core/components/button';
import '@hidearea-design/core/components/card';
import '@hidearea-design/core/components/avatar';
import '@hidearea-design/core/components/badge';
import '@hidearea-design/core/components/checkbox';
import '@hidearea-design/core/components/theme-switcher';

// Import theme utilities
import { initTheme } from '@hidearea-design/core';

// Initialize theme (theme-switcher component handles switching)
initTheme();

// Task checkbox handlers
document.querySelectorAll('.task-item ha-checkbox').forEach(checkbox => {
  checkbox.addEventListener('ha-change', (e) => {
    const taskItem = checkbox.closest('.task-item');
    const taskMeta = taskItem.querySelector('.task-meta');

    if (e.detail.checked) {
      taskMeta.textContent = '完了';
      taskItem.style.opacity = '0.6';
    } else {
      // Restore original text (you'd want to store this somewhere in a real app)
      taskItem.style.opacity = '1';
    }
  });
});

// Sidebar navigation
document.querySelectorAll('.sidebar-menu-item a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove active class from all links
    document.querySelectorAll('.sidebar-menu-item a').forEach(l => {
      l.classList.remove('active');
    });

    // Add active class to clicked link
    link.classList.add('active');

    console.log('Navigate to:', link.getAttribute('href'));
  });
});
