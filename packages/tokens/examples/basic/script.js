// ========================================
// Overlay Utilities
// ========================================

/**
 * Calculate optimal position to prevent overflow
 * @param {DOMRect} triggerRect - Bounding rectangle of trigger element
 * @param {number} elementWidth - Width of element to position
 * @param {number} elementHeight - Height of element to position
 * @param {number} offset - Offset from trigger (default: 8px)
 * @returns {{top: number, left: number}} Calculated position
 */
function calculateSafePosition(triggerRect, elementWidth, elementHeight, offset = 8) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Default position: below trigger, aligned to left
  let top = triggerRect.bottom + scrollTop + offset;
  let left = triggerRect.left + scrollLeft;

  // Check right overflow
  if (left + elementWidth > scrollLeft + viewportWidth) {
    // Align to right edge of trigger instead
    left = triggerRect.right + scrollLeft - elementWidth;
  }

  // Ensure not too far left
  if (left < scrollLeft + 16) {
    left = scrollLeft + 16;
  }

  // Check bottom overflow
  if (top + elementHeight > scrollTop + viewportHeight) {
    // Position above trigger instead
    top = triggerRect.top + scrollTop - elementHeight - offset;
  }

  // Ensure not too far top
  if (top < scrollTop + 16) {
    top = scrollTop + 16;
  }

  return { top, left };
}

/**
 * Handle animation lifecycle for overlay elements
 * @param {HTMLElement} element - Element to animate
 * @param {string} baseClass - Base class name (e.g., 'dialog', 'drawer')
 * @param {number} duration - Animation duration in ms
 */
function handleEnterAnimation(element, baseClass, duration) {
  element.classList.add(`${baseClass}-entering`);
  setTimeout(() => {
    element.classList.remove(`${baseClass}-entering`);
  }, duration);
}

/**
 * Handle exit animation and cleanup
 * @param {HTMLElement} element - Element to animate and remove
 * @param {string} baseClass - Base class name (e.g., 'dialog', 'drawer')
 * @param {Function} onComplete - Callback after animation completes
 */
function handleExitAnimation(element, baseClass, onComplete) {
  element.classList.add(`${baseClass}-exiting`);

  const handleAnimationEnd = () => {
    element.removeEventListener('animationend', handleAnimationEnd);
    if (onComplete) onComplete();
  };

  element.addEventListener('animationend', handleAnimationEnd);
}

/**
 * Setup escape key handler for overlay
 * @param {Function} closeCallback - Function to call when Escape is pressed
 * @returns {Function} Cleanup function to remove event listener
 */
function setupEscapeKey(closeCallback) {
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeCallback();
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('keydown', handleEscape);
  };

  document.addEventListener('keydown', handleEscape);
  return cleanup;
}

/**
 * Setup click outside handler for overlay
 * @param {HTMLElement} element - Element to detect clicks outside of
 * @param {HTMLElement} trigger - Trigger element to exclude from detection
 * @param {Function} closeCallback - Function to call when clicking outside
 * @returns {Function} Cleanup function to remove event listener
 */
function setupClickOutside(element, trigger, closeCallback) {
  const handleClickOutside = (e) => {
    if (!element.contains(e.target) && e.target !== trigger) {
      closeCallback();
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener('click', handleClickOutside);
  };

  // Delay to avoid immediate triggering
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return cleanup;
}

/**
 * Focus element with delay to ensure visibility
 * @param {HTMLElement} element - Element to focus
 * @param {number} delay - Delay in ms (default: 50ms)
 */
function focusElement(element, delay = 50) {
  if (element) {
    setTimeout(() => element.focus(), delay);
  }
}

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const theme = savedTheme || systemTheme;

  setTheme(theme);
  updateThemeLabel(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function updateThemeLabel(theme) {
  const label = document.querySelector('.theme-label');
  if (label) {
    label.textContent = theme === 'light' ? 'ライト' : 'ダーク';
  }
}

// Theme Toggle Button
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    updateThemeLabel(next);
  });
}

// System Theme Change Detection
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-switch if user hasn't manually set a theme
  if (!localStorage.getItem('theme')) {
    const theme = e.matches ? 'dark' : 'light';
    setTheme(theme);
    updateThemeLabel(theme);
  }
});

// Modal Management
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.querySelector('.modal-close');
const cancelModalBtn = document.getElementById('cancel-modal');
const confirmModalBtn = document.getElementById('confirm-modal');

function openModal() {
  if (modal) {
    modal.style.display = 'flex';
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    // Focus trap
    closeModalBtn?.focus();
  }
}

function closeModal() {
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    openModalBtn?.focus();
  }
}

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (cancelModalBtn) {
  cancelModalBtn.addEventListener('click', closeModal);
}

if (confirmModalBtn) {
  confirmModalBtn.addEventListener('click', () => {
    console.log('Modal confirmed');
    closeModal();
  });
}

// Close modal when clicking overlay
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
    closeModal();
  }
});

// Menu Management
const menuTrigger = document.getElementById('menu-trigger');
const demoMenu = document.getElementById('demo-menu');

if (menuTrigger && demoMenu) {
  let isMenuOpen = false;

  menuTrigger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    demoMenu.style.display = isMenuOpen ? 'block' : 'none';
    menuTrigger.textContent = isMenuOpen ? 'メニューを閉じる' : 'メニューを開く';
    menuTrigger.setAttribute('aria-expanded', isMenuOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMenuOpen && !menuTrigger.contains(e.target) && !demoMenu.contains(e.target)) {
      isMenuOpen = false;
      demoMenu.style.display = 'none';
      menuTrigger.textContent = 'メニューを開く';
      menuTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
      demoMenu.style.display = 'none';
      menuTrigger.textContent = 'メニューを開く';
      menuTrigger.setAttribute('aria-expanded', 'false');
      menuTrigger.focus();
    }
  });
}

// ========================================
// Dialog Component
// ========================================

const DIALOG_ANIMATION_DURATION = 200;

/**
 * Create and display a dialog
 * @param {string} type - Dialog type ('confirmation', 'warning', 'destructive')
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @returns {HTMLElement} Dialog overlay element
 */
function createDialog(type, title, message) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'dialog-title');

  // Create dialog
  const dialog = document.createElement('div');
  dialog.className = `dialog dialog-${type}`;
  dialog.style.cssText = 'background: var(--background-primary); border-radius: var(--border-radius-lg); padding: 1.5rem; max-width: 400px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);';

  dialog.innerHTML = `
    <h3 id="dialog-title" style="margin: 0 0 1rem 0; color: var(--foreground-primary);">${title}</h3>
    <p style="margin: 0 0 1.5rem 0; color: var(--foreground-secondary);">${message}</p>
    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <button class="btn btn-secondary dialog-cancel">キャンセル</button>
      <button class="btn btn-primary dialog-confirm">確認</button>
    </div>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Handle enter animations
  handleEnterAnimation(overlay, 'dialog', DIALOG_ANIMATION_DURATION);
  handleEnterAnimation(dialog, 'dialog', DIALOG_ANIMATION_DURATION);

  // Focus management
  const cancelButton = dialog.querySelector('.dialog-cancel');
  focusElement(cancelButton);

  // Close function
  const close = (animate = true) => {
    cleanupEscape();
    if (animate) {
      handleExitAnimation(overlay, 'dialog', () => overlay.remove());
      handleExitAnimation(dialog, 'dialog', null);
    } else {
      overlay.remove();
    }
  };

  // Event handlers
  const cleanupEscape = setupEscapeKey(close);

  cancelButton.addEventListener('click', () => close());
  dialog.querySelector('.dialog-confirm').addEventListener('click', () => {
    console.log(`${type} dialog confirmed`);
    close();
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return overlay;
}

document.getElementById('open-confirmation-dialog')?.addEventListener('click', () => {
  createDialog('confirmation', '確認', 'この操作を実行してもよろしいですか？');
});

document.getElementById('open-warning-dialog')?.addEventListener('click', () => {
  createDialog('warning', '警告', '注意が必要な操作です。続行しますか？');
});

document.getElementById('open-destructive-dialog')?.addEventListener('click', () => {
  createDialog('destructive', '削除確認', 'このアイテムを削除します。この操作は取り消せません。');
});

// ========================================
// Drawer Component
// ========================================

const DRAWER_ANIMATION_DURATION = 200;
const DRAWER_POSITION_STYLES = {
  left: 'position: fixed; top: 0; left: 0; bottom: 0; width: 320px;',
  right: 'position: fixed; top: 0; right: 0; bottom: 0; width: 320px;',
  bottom: 'position: fixed; left: 0; right: 0; bottom: 0; height: 320px;'
};

/**
 * Create and display a drawer
 * @param {string} position - Drawer position ('left', 'right', 'bottom')
 * @returns {HTMLElement} Drawer overlay element
 */
function createDrawer(position) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000;';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'drawer-title');

  // Create drawer
  const drawer = document.createElement('div');
  drawer.className = `drawer drawer-${position}`;
  drawer.style.cssText = `${DRAWER_POSITION_STYLES[position]} background: var(--background-primary); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); padding: 1.5rem;`;

  drawer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3 id="drawer-title" style="margin: 0; color: var(--foreground-primary);">${position}からのドロワー</h3>
      <button class="btn btn-ghost drawer-close" style="padding: 0.25rem 0.5rem;" aria-label="閉じる">&times;</button>
    </div>
    <p style="color: var(--foreground-secondary);">ドロワーのコンテンツがここに表示されます。</p>
  `;

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  // Handle enter animations
  handleEnterAnimation(overlay, 'drawer', DRAWER_ANIMATION_DURATION);
  handleEnterAnimation(drawer, 'drawer', DRAWER_ANIMATION_DURATION);

  // Focus management
  const closeButton = drawer.querySelector('.drawer-close');
  focusElement(closeButton);

  // Close function
  const close = (animate = true) => {
    cleanupEscape();
    if (animate) {
      handleExitAnimation(overlay, 'drawer', () => overlay.remove());
      handleExitAnimation(drawer, 'drawer', null);
    } else {
      overlay.remove();
    }
  };

  // Event handlers
  const cleanupEscape = setupEscapeKey(close);

  closeButton.addEventListener('click', () => close());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return overlay;
}

document.getElementById('open-drawer-left')?.addEventListener('click', () => createDrawer('left'));
document.getElementById('open-drawer-right')?.addEventListener('click', () => createDrawer('right'));
document.getElementById('open-drawer-bottom')?.addEventListener('click', () => createDrawer('bottom'));

// ========================================
// Popover Component
// ========================================

const POPOVER_ANIMATION_DURATION = 150;

/**
 * Create and display a popover
 * @param {HTMLElement} trigger - Element that triggered the popover
 * @returns {HTMLElement} Popover element
 */
function createPopover(trigger) {
  // Remove existing popover
  const existing = document.querySelector('.popover');
  if (existing) existing.remove();

  // Create popover
  const popover = document.createElement('div');
  popover.className = 'popover';
  popover.style.cssText = 'position: absolute; background: var(--component-popover-background-default); border: var(--component-popover-border-width) solid var(--component-popover-border-color); border-radius: var(--component-popover-border-radius); padding: var(--component-popover-padding); box-shadow: var(--component-popover-shadow); z-index: var(--component-popover-z-index); max-width: var(--component-popover-max-width); min-width: var(--component-popover-min-width);';
  popover.setAttribute('role', 'tooltip');
  popover.setAttribute('aria-live', 'polite');

  popover.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-default); padding-bottom: 0.5rem;">
      <strong style="color: var(--foreground-primary); font-size: 1rem;">ポップオーバータイトル</strong>
      <button class="popover-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--foreground-tertiary); line-height: 1;" aria-label="閉じる">&times;</button>
    </div>
    <p style="margin: 0; color: var(--foreground-secondary); font-size: 0.875rem; line-height: 1.5;">ポップオーバーのコンテンツがここに表示されます。クリックしてアクションを実行できます。</p>
    <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-default);">
      <button class="btn btn-primary" style="font-size: 0.875rem; padding: 0.5rem 1rem;">アクション</button>
    </div>
  `;

  document.body.appendChild(popover);

  // Smart positioning with overflow prevention
  const rect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const position = calculateSafePosition(rect, popoverRect.width, popoverRect.height, 8);
  popover.style.top = `${position.top}px`;
  popover.style.left = `${position.left}px`;

  // Handle enter animation
  handleEnterAnimation(popover, 'popover', POPOVER_ANIMATION_DURATION);

  // Close function
  const close = (animate = true) => {
    cleanupEscape();
    cleanupClickOutside();
    if (animate) {
      handleExitAnimation(popover, 'popover', () => popover.remove());
    } else {
      popover.remove();
    }
  };

  // Event handlers
  const cleanupEscape = setupEscapeKey(close);
  const cleanupClickOutside = setupClickOutside(popover, trigger, close);

  popover.querySelector('.popover-close').addEventListener('click', () => close());

  return popover;
}

document.getElementById('popover-trigger')?.addEventListener('click', function(e) {
  e.stopPropagation();
  createPopover(this);
});

// ========================================
// Dropdown Component
// ========================================

const DROPDOWN_ANIMATION_DURATION = 150;

/**
 * Setup keyboard navigation for dropdown items
 * @param {HTMLElement[]} items - Array of dropdown items
 * @param {HTMLElement} trigger - Trigger element to return focus to
 * @param {Function} closeCallback - Callback to close dropdown
 * @returns {Function} Cleanup function
 */
function setupDropdownKeyboardNav(items, trigger, closeCallback) {
  const handleKeyNav = (e) => {
    if (e.key === 'Escape') {
      closeCallback();
      trigger.focus();
      cleanup();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentIndex = items.indexOf(document.activeElement);
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentIndex = items.indexOf(document.activeElement);
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    }
  };

  const cleanup = () => {
    document.removeEventListener('keydown', handleKeyNav);
  };

  document.addEventListener('keydown', handleKeyNav);
  return cleanup;
}

/**
 * Create and display a dropdown menu
 * @param {HTMLElement} trigger - Element that triggered the dropdown
 * @returns {HTMLElement} Dropdown element
 */
function createDropdown(trigger) {
  // Remove existing dropdown
  const existing = document.querySelector('.dropdown');
  if (existing) existing.remove();

  // Create dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  dropdown.style.cssText = 'position: absolute; background: var(--component-dropdown-container-background); border: var(--component-dropdown-container-border-width) solid var(--component-dropdown-container-border-color); border-radius: var(--component-dropdown-container-border-radius); padding: var(--component-dropdown-container-padding-vertical) var(--component-dropdown-container-padding-horizontal); box-shadow: var(--component-dropdown-container-shadow); z-index: var(--component-dropdown-z-index); min-width: var(--component-dropdown-container-min-width);';
  dropdown.setAttribute('role', 'menu');
  dropdown.setAttribute('aria-orientation', 'vertical');

  dropdown.innerHTML = `
    <div class="dropdown-item" role="menuitem" tabindex="0" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: var(--foreground-primary); transition: background-color 0.15s;">📄 オプション 1</div>
    <div class="dropdown-item" role="menuitem" tabindex="0" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: var(--foreground-primary); transition: background-color 0.15s;">⚙️ オプション 2</div>
    <div class="dropdown-item" role="menuitem" tabindex="0" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: var(--foreground-primary); transition: background-color 0.15s;">🗑️ オプション 3</div>
  `;

  document.body.appendChild(dropdown);

  // Smart positioning with overflow prevention
  const rect = trigger.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  const position = calculateSafePosition(rect, dropdownRect.width, dropdownRect.height, 4);
  dropdown.style.top = `${position.top}px`;
  dropdown.style.left = `${position.left}px`;

  // Handle enter animation
  handleEnterAnimation(dropdown, 'dropdown', DROPDOWN_ANIMATION_DURATION);

  // Focus first item
  const firstItem = dropdown.querySelector('.dropdown-item');
  focusElement(firstItem);

  // Close function
  const close = (animate = true) => {
    cleanupKeyNav();
    cleanupClickOutside();
    if (animate) {
      handleExitAnimation(dropdown, 'dropdown', () => dropdown.remove());
    } else {
      dropdown.remove();
    }
  };

  // Setup keyboard navigation
  const items = Array.from(dropdown.querySelectorAll('.dropdown-item'));
  const cleanupKeyNav = setupDropdownKeyboardNav(items, trigger, close);
  const cleanupClickOutside = setupClickOutside(dropdown, trigger, close);

  // Setup item interactions
  items.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'var(--component-dropdown-item-background-hover)';
    });
    item.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
    });
    item.addEventListener('click', function() {
      console.log('Selected:', this.textContent);
      close();
    });
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        console.log('Selected:', this.textContent);
        close();
      }
    });
  });

  return dropdown;
}

document.getElementById('dropdown-trigger')?.addEventListener('click', function(e) {
  e.stopPropagation();
  createDropdown(this);
});

// ========================================
// Tabs Component
// ========================================

/**
 * Initialize tabs with keyboard navigation and ARIA support
 * @param {HTMLElement} tabsContainer - Container element with .tabs class
 */
function initializeTabs(tabsContainer) {
  const tabsList = tabsContainer.querySelector('.tabs-list');
  const tabs = Array.from(tabsList.querySelectorAll('.tab:not([disabled])'));
  const panels = Array.from(tabsContainer.querySelectorAll('.tab-panel'));

  if (tabs.length === 0) return;

  // Set ARIA attributes
  tabsList.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    const tabId = `tab-${Date.now()}-${index}`;
    const panelId = `panel-${Date.now()}-${index}`;

    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', tabId);
    tab.setAttribute('tabindex', tab.classList.contains('tab-active') ? '0' : '-1');

    if (panels[index]) {
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('id', panelId);
      panels[index].setAttribute('aria-labelledby', tabId);
      tab.setAttribute('aria-controls', panelId);
    }

    tab.setAttribute('aria-selected', tab.classList.contains('tab-active') ? 'true' : 'false');
  });

  // Activate tab function
  const activateTab = (tab) => {
    const index = tabs.indexOf(tab);
    if (index === -1) return;

    // Deactivate all tabs and panels
    tabs.forEach(t => {
      t.classList.remove('tab-active');
      t.setAttribute('tabindex', '-1');
      t.setAttribute('aria-selected', 'false');
    });

    panels.forEach(p => {
      p.classList.remove('tab-panel-active');
    });

    // Activate selected tab and panel
    tab.classList.add('tab-active');
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-selected', 'true');
    tab.focus();

    if (panels[index]) {
      panels[index].classList.add('tab-panel-active');
    }
  };

  // Click handler
  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
  });

  // Keyboard navigation
  tabsList.addEventListener('keydown', (e) => {
    const currentIndex = tabs.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) nextIndex = tabs.length - 1;
        activateTab(tabs[nextIndex]);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= tabs.length) nextIndex = 0;
        activateTab(tabs[nextIndex]);
        break;

      case 'Home':
        e.preventDefault();
        activateTab(tabs[0]);
        break;

      case 'End':
        e.preventDefault();
        activateTab(tabs[tabs.length - 1]);
        break;
    }
  });
}

// Initialize all tabs on page
document.querySelectorAll('.tabs').forEach(initializeTabs);

// ========================================
// Toast Component
// ========================================

const TOAST_ANIMATION_DURATION = 200;
const TOAST_AUTO_DISMISS_DELAY = 5000;

/**
 * Create and show a toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, warning, info)
 * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
 * @returns {HTMLElement} Toast element
 */
function showToast(message, type = 'info', duration = TOAST_AUTO_DISMISS_DELAY) {
  // Create or get toast container
  let container = document.querySelector('.toast-container-live');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container-live';
    container.style.cssText = `
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      pointer-events: none;
    `;
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }

  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    pointer-events: auto;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity ${TOAST_ANIMATION_DURATION}ms, transform ${TOAST_ANIMATION_DURATION}ms;
  `;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  toast.innerHTML = `
    <div class="toast-content" style="display: flex; align-items: center; gap: 0.75rem;">
      <span class="toast-icon" style="font-size: 1.25rem; line-height: 1;">${icons[type] || icons.info}</span>
      <span>${message}</span>
    </div>
    <button class="toast-close" aria-label="閉じる" style="background: none; border: none; color: inherit; font-size: 1.5rem; line-height: 1; cursor: pointer; padding: 0; margin-left: 1rem; opacity: 0.7; transition: opacity 0.15s;">×</button>
  `;

  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  });

  // Close function
  const close = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';

    setTimeout(() => {
      toast.remove();
      // Remove container if empty
      if (container.children.length === 0) {
        container.remove();
      }
    }, TOAST_ANIMATION_DURATION);
  };

  // Close button handler
  const closeButton = toast.querySelector('.toast-close');
  closeButton.addEventListener('click', close);

  // Auto-dismiss
  if (duration > 0) {
    setTimeout(close, duration);
  }

  return toast;
}

// Add toast demo buttons
document.querySelectorAll('.toast-container .toast-close').forEach(btn => {
  btn.addEventListener('click', function() {
    const toast = this.closest('.toast');
    toast.style.opacity = '0';
    setTimeout(() => toast.style.opacity = '1', 300);
  });
});

// ========================================
// Menu Component
// ========================================

const MENU_ANIMATION_DURATION = 150;

/**
 * Setup keyboard navigation for menu items
 * @param {HTMLElement[]} items - Array of menu items
 * @param {Function} closeCallback - Callback to close menu
 * @returns {Function} Cleanup function
 */
function setupMenuKeyboardNav(items, closeCallback) {
  const handleKeyNav = (e) => {
    const currentIndex = items.indexOf(document.activeElement);

    switch (e.key) {
      case 'Escape':
        closeCallback();
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex === -1) {
          items[0]?.focus();
        } else {
          const nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex].focus();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex === -1) {
          items[items.length - 1]?.focus();
        } else {
          const prevIndex = (currentIndex - 1 + items.length) % items.length;
          items[prevIndex].focus();
        }
        break;

      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;

      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (currentIndex !== -1) {
          items[currentIndex].click();
        }
        break;
    }
  };

  const cleanup = () => {
    document.removeEventListener('keydown', handleKeyNav);
  };

  document.addEventListener('keydown', handleKeyNav);
  return cleanup;
}

/**
 * Create and display a menu
 * @param {HTMLElement} trigger - Element that triggered the menu
 * @returns {HTMLElement} Menu element
 */
function createMenu(trigger) {
  // Remove existing menu
  const existing = document.querySelector('.menu-live');
  if (existing) {
    existing.remove();
    return null;
  }

  // Create menu
  const menu = document.createElement('div');
  menu.className = 'menu menu-live';
  menu.style.cssText = `
    position: absolute;
    background: var(--background-primary);
    border: 1px solid var(--border-primary);
    border-radius: var(--border-radius-md);
    padding: 0.5rem;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    min-width: 200px;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity ${MENU_ANIMATION_DURATION}ms, transform ${MENU_ANIMATION_DURATION}ms;
  `;
  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-orientation', 'vertical');

  menu.innerHTML = `
    <div class="menu-group-header" style="padding: 0.5rem 0.75rem; font-size: 0.75rem; font-weight: 600; color: var(--foreground-secondary); text-transform: uppercase; letter-spacing: 0.05em;">アカウント</div>
    <button class="menu-item" role="menuitem" tabindex="0" style="width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.75rem; background: none; border: none; border-radius: var(--border-radius-sm); cursor: pointer; color: var(--foreground-primary); font-size: 0.875rem; text-align: left; transition: background-color 0.15s;">
      <span class="menu-icon">👤</span>
      <span>プロフィール</span>
      <span class="menu-shortcut" style="margin-left: auto; font-size: 0.75rem; color: var(--foreground-tertiary);">⌘P</span>
    </button>
    <button class="menu-item" role="menuitem" tabindex="0" style="width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.75rem; background: none; border: none; border-radius: var(--border-radius-sm); cursor: pointer; color: var(--foreground-primary); font-size: 0.875rem; text-align: left; transition: background-color 0.15s;">
      <span class="menu-icon">⚙️</span>
      <span>設定</span>
      <span class="menu-shortcut" style="margin-left: auto; font-size: 0.75rem; color: var(--foreground-tertiary);">⌘S</span>
    </button>
    <div class="menu-divider" style="height: 1px; background: var(--border-primary); margin: 0.5rem 0;"></div>
    <div class="menu-group-header" style="padding: 0.5rem 0.75rem; font-size: 0.75rem; font-weight: 600; color: var(--foreground-secondary); text-transform: uppercase; letter-spacing: 0.05em;">アクション</div>
    <button class="menu-item" role="menuitem" tabindex="0" style="width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.75rem; background: none; border: none; border-radius: var(--border-radius-sm); cursor: pointer; color: var(--foreground-primary); font-size: 0.875rem; text-align: left; transition: background-color 0.15s;">
      <span class="menu-icon">📄</span>
      <span>新規作成</span>
    </button>
    <button class="menu-item menu-item-danger" role="menuitem" tabindex="0" style="width: 100%; display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.75rem; background: none; border: none; border-radius: var(--border-radius-sm); cursor: pointer; color: var(--status-error-foreground); font-size: 0.875rem; text-align: left; transition: background-color 0.15s;">
      <span class="menu-icon">🗑️</span>
      <span>削除</span>
    </button>
  `;

  document.body.appendChild(menu);

  // Position menu
  const rect = trigger.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();
  const position = calculateSafePosition(rect, menuRect.width, menuRect.height, 4);
  menu.style.top = `${position.top}px`;
  menu.style.left = `${position.left}px`;

  // Trigger enter animation
  requestAnimationFrame(() => {
    menu.style.opacity = '1';
    menu.style.transform = 'scale(1)';
  });

  // Focus first item
  const firstItem = menu.querySelector('.menu-item');
  setTimeout(() => firstItem?.focus(), 50);

  // Close function
  const close = () => {
    cleanupKeyNav();
    cleanupClickOutside();
    menu.style.opacity = '0';
    menu.style.transform = 'scale(0.95)';
    setTimeout(() => menu.remove(), MENU_ANIMATION_DURATION);
    trigger.focus();
  };

  // Setup keyboard navigation
  const items = Array.from(menu.querySelectorAll('.menu-item'));
  const cleanupKeyNav = setupMenuKeyboardNav(items, close);
  const cleanupClickOutside = setupClickOutside(menu, trigger, close);

  // Setup item interactions
  items.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'var(--background-secondary)';
    });
    item.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
    });
    item.addEventListener('click', function() {
      console.log('Menu item clicked:', this.textContent.trim());
      close();
    });
  });

  return menu;
}

document.getElementById('menu-trigger')?.addEventListener('click', function(e) {
  e.stopPropagation();
  createMenu(this);
});

// ========================================
// Pagination Component
// ========================================

/**
 * Initialize pagination with state management
 * @param {HTMLElement} paginationContainer - Container element with .pagination class
 * @param {Object} options - Configuration options
 */
function initializePagination(paginationContainer, options = {}) {
  const {
    totalPages = 10,
    currentPage = 1,
    maxVisiblePages = 5,
    onPageChange = (page) => console.log('Page changed to:', page)
  } = options;

  let activePage = currentPage;

  const render = () => {
    // Clear existing content
    paginationContainer.innerHTML = '';

    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-nav';
    prevButton.setAttribute('aria-label', '前のページ');
    prevButton.innerHTML = '<span>‹</span>';
    prevButton.disabled = activePage === 1;
    prevButton.addEventListener('click', () => {
      if (activePage > 1) {
        activePage--;
        render();
        onPageChange(activePage);
      }
    });
    paginationContainer.appendChild(prevButton);

    // Calculate visible page range
    let startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      const firstButton = createPageButton(1);
      paginationContainer.appendChild(firstButton);

      if (startPage > 2) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        ellipsis.style.cssText = 'display: flex; align-items: center; padding: 0 0.5rem; color: var(--foreground-tertiary);';
        paginationContainer.appendChild(ellipsis);
      }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = createPageButton(i);
      paginationContainer.appendChild(pageButton);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.className = 'pagination-ellipsis';
        ellipsis.textContent = '...';
        ellipsis.style.cssText = 'display: flex; align-items: center; padding: 0 0.5rem; color: var(--foreground-tertiary);';
        paginationContainer.appendChild(ellipsis);
      }

      const lastButton = createPageButton(totalPages);
      paginationContainer.appendChild(lastButton);
    }

    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-nav';
    nextButton.setAttribute('aria-label', '次のページ');
    nextButton.innerHTML = '<span>›</span>';
    nextButton.disabled = activePage === totalPages;
    nextButton.addEventListener('click', () => {
      if (activePage < totalPages) {
        activePage++;
        render();
        onPageChange(activePage);
      }
    });
    paginationContainer.appendChild(nextButton);
  };

  function createPageButton(page) {
    const button = document.createElement('button');
    button.className = 'pagination-item';
    button.textContent = page;

    if (page === activePage) {
      button.classList.add('pagination-item-active');
      button.setAttribute('aria-current', 'page');
    }

    button.addEventListener('click', () => {
      if (page !== activePage) {
        activePage = page;
        render();
        onPageChange(activePage);
      }
    });

    return button;
  }

  render();

  return {
    setPage: (page) => {
      if (page >= 1 && page <= totalPages) {
        activePage = page;
        render();
      }
    },
    getCurrentPage: () => activePage
  };
}

// Initialize demo pagination
const demoPagination = document.querySelector('.pagination');
if (demoPagination && !demoPagination.hasAttribute('data-initialized')) {
  demoPagination.setAttribute('data-initialized', 'true');
  initializePagination(demoPagination, {
    totalPages: 10,
    currentPage: 1,
    maxVisiblePages: 5,
    onPageChange: (page) => {
      console.log('Current page:', page);
    }
  });
}

// ========================================
// Progress Component
// ========================================

/**
 * Animated progress bar controller
 * @param {HTMLElement} progressBar - Progress bar container element
 * @param {Object} options - Configuration options
 */
function createAnimatedProgress(progressBar, options = {}) {
  const {
    duration = 2000,
    startValue = 0,
    endValue = 100,
    easing = 'ease-out',
    onUpdate = null,
    onComplete = null
  } = options;

  const fill = progressBar.querySelector('.progress-fill');
  if (!fill) return;

  let currentValue = startValue;
  const startTime = Date.now();

  // Easing functions
  const easings = {
    linear: (t) => t,
    'ease-in': (t) => t * t,
    'ease-out': (t) => t * (2 - t),
    'ease-in-out': (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  };

  const easingFn = easings[easing] || easings.linear;

  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);

    currentValue = startValue + (endValue - startValue) * easedProgress;
    fill.style.width = `${currentValue}%`;

    if (onUpdate) {
      onUpdate(currentValue);
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }

  animate();

  return {
    setProgress: (value) => {
      fill.style.width = `${value}%`;
    },
    getProgress: () => currentValue
  };
}

// ========================================
// Form Validation
// ========================================

/**
 * Real-time form validation
 * @param {HTMLFormElement|HTMLElement} form - Form element or container
 */
function initializeFormValidation(form) {
  const inputs = form.querySelectorAll('input[type="email"], input[type="text"], textarea');

  inputs.forEach(input => {
    const inputGroup = input.closest('.input-group, .textarea-group');
    if (!inputGroup) return;

    const helper = inputGroup.querySelector('.input-helper, .textarea-helper');

    // Store original helper text and state
    const originalHelperText = helper?.textContent || '';
    const originalHelperClasses = helper?.className || '';

    // Validation rules
    const validators = {
      email: (value) => {
        if (!value) return { valid: false, message: 'メールアドレスを入力してください' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
          ? { valid: true }
          : { valid: false, message: '正しいメールアドレスを入力してください' };
      },
      text: (value) => {
        if (!value) return { valid: false, message: 'この項目は必須です' };
        return { valid: true };
      }
    };

    const validate = () => {
      const value = input.value.trim();
      const type = input.type === 'email' ? 'email' : 'text';
      const validator = validators[type];

      if (!validator) return;

      const result = validator(value);

      // Update input styling
      if (value && !result.valid) {
        input.classList.add('input-error', 'textarea-error');
        if (helper) {
          helper.textContent = result.message;
          helper.className = originalHelperClasses.replace(/-error/g, '') + '-error';
        }
      } else {
        input.classList.remove('input-error', 'textarea-error');
        if (helper) {
          helper.textContent = originalHelperText;
          helper.className = originalHelperClasses.replace(/-error/g, '');
        }
      }
    };

    // Validate on blur
    input.addEventListener('blur', validate);

    // Clear error on focus
    input.addEventListener('focus', () => {
      if (input.classList.contains('input-error') || input.classList.contains('textarea-error')) {
        input.classList.remove('input-error', 'textarea-error');
        if (helper) {
          helper.textContent = originalHelperText;
          helper.className = originalHelperClasses.replace(/-error/g, '');
        }
      }
    });
  });
}

// Initialize form validation for demo
const demoForm = document.querySelector('.section');
if (demoForm) {
  initializeFormValidation(demoForm);
}

// ========================================
// Progress Demo Helpers (Global)
// ========================================

/**
 * Animate progress bar (exposed globally for onclick handlers)
 */
window.animateProgress = function(progressId, targetValue, easing = 'ease-out') {
  const progressBar = document.getElementById(progressId);
  const label = document.getElementById(`${progressId}-label`);

  if (!progressBar) return;

  createAnimatedProgress(progressBar, {
    duration: 2000,
    startValue: 0,
    endValue: targetValue,
    easing: easing,
    onUpdate: (value) => {
      if (label) {
        label.textContent = `アニメーション (${Math.round(value)}%)`;
      }
    },
    onComplete: () => {
      console.log('Progress animation complete!');
    }
  });
};

/**
 * Reset progress bar (exposed globally for onclick handlers)
 */
window.resetProgress = function(progressId) {
  const progressBar = document.getElementById(progressId);
  const label = document.getElementById(`${progressId}-label`);
  const fill = progressBar?.querySelector('.progress-fill');

  if (fill) {
    fill.style.width = '0%';
  }

  if (label) {
    label.textContent = 'アニメーション (0%)';
  }
};

// ============================================
// Tooltip Component
// ============================================

const TOOLTIP_DELAY = 200; // ms to show tooltip
const TOOLTIP_OFFSET = 8; // px offset from target

/**
 * Initialize tooltip functionality for an element
 * @param {HTMLElement} trigger - Element that triggers the tooltip
 * @param {Object} options - Configuration options
 */
function initializeTooltip(trigger, options = {}) {
  const {
    content = '',
    position = 'top', // top, bottom, left, right
    delay = TOOLTIP_DELAY,
    offset = TOOLTIP_OFFSET
  } = options;

  let tooltip = null;
  let showTimeout = null;

  const createTooltip = () => {
    tooltip = document.createElement('div');
    tooltip.className = 'tooltip tooltip-live';
    tooltip.textContent = content;
    tooltip.setAttribute('role', 'tooltip');
    tooltip.style.cssText = `
      position: absolute;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      transition: opacity 150ms ease;
    `;
    document.body.appendChild(tooltip);
    return tooltip;
  };

  const positionTooltip = () => {
    if (!tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top, left;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + offset;
        break;
      default:
        top = triggerRect.top - tooltipRect.height - offset;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
    }

    // Keep tooltip within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = offset;
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - offset;
    }
    if (top < 0) top = offset;
    if (top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - tooltipRect.height - offset;
    }

    tooltip.style.top = `${top + window.scrollY}px`;
    tooltip.style.left = `${left + window.scrollX}px`;
  };

  const showTooltip = () => {
    if (!tooltip) createTooltip();
    positionTooltip();
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
    });
  };

  const hideTooltip = () => {
    if (!tooltip) return;
    tooltip.style.opacity = '0';
    setTimeout(() => {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    }, 150);
  };

  // Mouse events
  trigger.addEventListener('mouseenter', () => {
    showTimeout = setTimeout(showTooltip, delay);
  });

  trigger.addEventListener('mouseleave', () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    hideTooltip();
  });

  // Focus events for accessibility
  trigger.addEventListener('focus', () => {
    showTimeout = setTimeout(showTooltip, delay);
  });

  trigger.addEventListener('blur', () => {
    if (showTimeout) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }
    hideTooltip();
  });

  // Cleanup on window resize
  window.addEventListener('resize', () => {
    if (tooltip && tooltip.style.opacity === '1') {
      positionTooltip();
    }
  });

  return {
    show: showTooltip,
    hide: hideTooltip,
    destroy: () => {
      hideTooltip();
      trigger.removeEventListener('mouseenter', showTooltip);
      trigger.removeEventListener('mouseleave', hideTooltip);
    }
  };
}

// ============================================
// Breadcrumb Component
// ============================================

/**
 * Initialize breadcrumb navigation
 * @param {HTMLElement} breadcrumb - Breadcrumb container element
 */
function initializeBreadcrumb(breadcrumb) {
  const links = breadcrumb.querySelectorAll('.breadcrumb-link');

  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');

      // Emit custom event for navigation
      const navEvent = new CustomEvent('breadcrumb-navigate', {
        detail: {
          href,
          index,
          text: link.textContent.trim()
        }
      });
      breadcrumb.dispatchEvent(navEvent);

      // For demo purposes, show toast notification
      if (window.showToast) {
        showToast(`パンくずナビゲーション: ${link.textContent.trim()}`, 'info', 3000);
      }
    });

    // Keyboard navigation
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });

  return {
    updatePath: (items) => {
      const list = breadcrumb.querySelector('.breadcrumb-list');
      if (!list) return;

      list.innerHTML = '';
      items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'breadcrumb-item';

        if (index === items.length - 1) {
          // Last item (current page)
          li.classList.add('breadcrumb-item-active');
          li.setAttribute('aria-current', 'page');
          li.textContent = item.text;
        } else {
          // Navigation links
          const a = document.createElement('a');
          a.href = item.href || '#';
          a.className = 'breadcrumb-link';
          a.textContent = item.text;
          li.appendChild(a);
        }

        list.appendChild(li);

        // Add separator except for last item
        if (index < items.length - 1) {
          const separator = document.createElement('li');
          separator.className = 'breadcrumb-separator';
          separator.textContent = '/';
          list.appendChild(separator);
        }
      });

      // Re-initialize links
      initializeBreadcrumb(breadcrumb);
    }
  };
}

// ============================================
// Switch Component
// ============================================

/**
 * Initialize switch with enhanced functionality
 * @param {HTMLElement} switchElement - Switch input element
 * @param {Object} options - Configuration options
 */
function initializeSwitch(switchElement, options = {}) {
  const {
    onChange = null,
    animated = true
  } = options;

  const switchGroup = switchElement.closest('.switch-group');
  const track = switchGroup?.querySelector('.switch-track');
  const thumb = switchGroup?.querySelector('.switch-thumb');

  if (!track || !thumb) return;

  // Add animation class if enabled
  if (animated) {
    track.style.transition = 'background-color 200ms ease';
    thumb.style.transition = 'transform 200ms ease';
  }

  const handleChange = (e) => {
    const checked = switchElement.checked;

    // Emit change event
    if (onChange) {
      onChange(checked, switchElement);
    }

    // Emit custom event
    const changeEvent = new CustomEvent('switch-change', {
      detail: { checked, element: switchElement }
    });
    switchElement.dispatchEvent(changeEvent);

    // Update ARIA attributes
    switchElement.setAttribute('aria-checked', checked.toString());
  };

  // Set initial ARIA attributes
  switchElement.setAttribute('role', 'switch');
  switchElement.setAttribute('aria-checked', switchElement.checked.toString());

  // Listen for changes
  switchElement.addEventListener('change', handleChange);

  // Keyboard support (Space to toggle)
  switchElement.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      switchElement.checked = !switchElement.checked;
      handleChange({ target: switchElement });
    }
  });

  return {
    setValue: (value) => {
      switchElement.checked = value;
      handleChange({ target: switchElement });
    },
    getValue: () => switchElement.checked,
    destroy: () => {
      switchElement.removeEventListener('change', handleChange);
    }
  };
}

// Initialize theme on page load
initTheme();

// Initialize all tooltips on page
document.addEventListener('DOMContentLoaded', () => {
  // Tooltip initialization
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  tooltipTriggers.forEach(trigger => {
    const content = trigger.getAttribute('data-tooltip');
    const position = trigger.getAttribute('data-tooltip-position') || 'top';
    initializeTooltip(trigger, { content, position });
  });

  // Breadcrumb initialization
  const breadcrumbs = document.querySelectorAll('.breadcrumb');
  breadcrumbs.forEach(breadcrumb => {
    initializeBreadcrumb(breadcrumb);
  });

  // Switch initialization
  const switches = document.querySelectorAll('.switch-input');
  switches.forEach(switchInput => {
    initializeSwitch(switchInput, {
      onChange: (checked, element) => {
        console.log('Switch changed:', {
          checked,
          label: element.parentElement.querySelector('.switch-text')?.textContent
        });
      }
    });
  });
});

// Log current theme for debugging
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Available CSS variables:', {
  primaryDefault: getComputedStyle(document.documentElement).getPropertyValue('--primary-default'),
  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background-primary'),
  foregroundColor: getComputedStyle(document.documentElement).getPropertyValue('--foreground-primary'),
});
