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

// Dialog Management
function createDialog(type, title, message) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';

  const dialog = document.createElement('div');
  dialog.className = `dialog dialog-${type}`;
  dialog.style.cssText = 'background: var(--background-primary); border-radius: var(--border-radius-lg); padding: 1.5rem; max-width: 400px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);';

  dialog.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; color: var(--foreground-primary);">${title}</h3>
    <p style="margin: 0 0 1.5rem 0; color: var(--foreground-secondary);">${message}</p>
    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <button class="btn btn-secondary dialog-cancel">キャンセル</button>
      <button class="btn btn-primary dialog-confirm">確認</button>
    </div>
  `;

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  const close = () => {
    overlay.remove();
  };

  dialog.querySelector('.dialog-cancel').addEventListener('click', close);
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

// Drawer Management
function createDrawer(position) {
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000;';

  const drawer = document.createElement('div');
  drawer.className = `drawer drawer-${position}`;

  const positionStyles = {
    left: 'position: fixed; top: 0; left: 0; bottom: 0; width: 320px; transform: translateX(0);',
    right: 'position: fixed; top: 0; right: 0; bottom: 0; width: 320px; transform: translateX(0);',
    bottom: 'position: fixed; left: 0; right: 0; bottom: 0; height: 320px; transform: translateY(0);'
  };

  drawer.style.cssText = `${positionStyles[position]} background: var(--background-primary); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); padding: 1.5rem;`;

  drawer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3 style="margin: 0; color: var(--foreground-primary);">${position}からのドロワー</h3>
      <button class="btn btn-ghost drawer-close" style="padding: 0.25rem 0.5rem;">&times;</button>
    </div>
    <p style="color: var(--foreground-secondary);">ドロワーのコンテンツがここに表示されます。</p>
  `;

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  const close = () => {
    overlay.remove();
  };

  drawer.querySelector('.drawer-close').addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return overlay;
}

document.getElementById('open-drawer-left')?.addEventListener('click', () => createDrawer('left'));
document.getElementById('open-drawer-right')?.addEventListener('click', () => createDrawer('right'));
document.getElementById('open-drawer-bottom')?.addEventListener('click', () => createDrawer('bottom'));

// Popover Management
function createPopover(trigger) {
  // 既存のポップオーバーがあれば削除
  const existing = document.querySelector('.popover');
  if (existing) existing.remove();

  const popover = document.createElement('div');
  popover.className = 'popover';
  // より明示的なスタイル（デバッグ用に背景色を強制）
  popover.style.cssText = 'position: absolute; background: white; border: 2px solid #3b82f6; border-radius: 8px; padding: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); z-index: 1100; max-width: 320px; min-width: 200px; opacity: 1 !important; visibility: visible !important; display: block !important;';

  popover.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; border-bottom: 1px solid #e5e5e5; padding-bottom: 0.5rem; opacity: 1;">
      <strong style="color: #171717; font-size: 1rem; opacity: 1;">ポップオーバータイトル</strong>
      <button class="popover-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #737373; line-height: 1; opacity: 1;">&times;</button>
    </div>
    <p style="margin: 0; color: #525252; font-size: 0.875rem; line-height: 1.5; opacity: 1;">ポップオーバーのコンテンツがここに表示されます。クリックしてアクションを実行できます。</p>
    <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #e5e5e5; opacity: 1;">
      <button class="btn btn-primary" style="font-size: 0.875rem; padding: 0.5rem 1rem; opacity: 1;">アクション</button>
    </div>
  `;

  document.body.appendChild(popover);

  const rect = trigger.getBoundingClientRect();
  // スクロール位置を考慮した絶対位置を計算
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  popover.style.top = `${rect.bottom + scrollTop + 8}px`;
  popover.style.left = `${rect.left + scrollLeft}px`;

  console.log('Popover created at:', {
    top: popover.style.top,
    left: popover.style.left,
    scrollTop,
    scrollLeft,
    rectBottom: rect.bottom,
    rectLeft: rect.left
  });

  const close = () => {
    popover.remove();
    console.log('Popover closed');
  };

  popover.querySelector('.popover-close').addEventListener('click', close);

  const handleClickOutside = (e) => {
    if (!popover.contains(e.target) && e.target !== trigger) {
      close();
      document.removeEventListener('click', handleClickOutside);
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return popover;
}

document.getElementById('popover-trigger')?.addEventListener('click', function(e) {
  e.stopPropagation();
  console.log('Popover trigger clicked');
  createPopover(this);
});

// Dropdown Management
function createDropdown(trigger) {
  // 既存のドロップダウンがあれば削除
  const existing = document.querySelector('.dropdown');
  if (existing) existing.remove();

  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown';
  // より明示的なスタイル（デバッグ用）
  dropdown.style.cssText = 'position: absolute; background: white; border: 1px solid #e5e5e5; border-radius: 6px; padding: 0.25rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); z-index: 1100; min-width: 200px; opacity: 1 !important; visibility: visible !important; display: block !important;';

  dropdown.innerHTML = `
    <div class="dropdown-item" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: #171717; transition: background-color 0.15s; opacity: 1;">📄 オプション 1</div>
    <div class="dropdown-item" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: #171717; transition: background-color 0.15s; opacity: 1;">⚙️ オプション 2</div>
    <div class="dropdown-item" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: #171717; transition: background-color 0.15s; opacity: 1;">🗑️ オプション 3</div>
  `;

  document.body.appendChild(dropdown);

  const rect = trigger.getBoundingClientRect();
  // スクロール位置を考慮した絶対位置を計算
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  dropdown.style.top = `${rect.bottom + scrollTop + 4}px`;
  dropdown.style.left = `${rect.left + scrollLeft}px`;

  console.log('Dropdown created at:', {
    top: dropdown.style.top,
    left: dropdown.style.left,
    scrollTop,
    scrollLeft,
    rectBottom: rect.bottom,
    rectLeft: rect.left
  });

  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = '#f5f5f5';
    });
    item.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
    });
    item.addEventListener('click', function() {
      console.log('Selected:', this.textContent);
      dropdown.remove();
    });
  });

  const handleClickOutside = (e) => {
    if (!dropdown.contains(e.target) && e.target !== trigger) {
      dropdown.remove();
      document.removeEventListener('click', handleClickOutside);
      console.log('Dropdown closed');
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return dropdown;
}

document.getElementById('dropdown-trigger')?.addEventListener('click', function(e) {
  e.stopPropagation();
  console.log('Dropdown trigger clicked');
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
