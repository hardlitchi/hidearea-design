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

// Initialize theme on page load
initTheme();

// Log current theme for debugging
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Available CSS variables:', {
  primaryDefault: getComputedStyle(document.documentElement).getPropertyValue('--primary-default'),
  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background-primary'),
  foregroundColor: getComputedStyle(document.documentElement).getPropertyValue('--foreground-primary'),
});
