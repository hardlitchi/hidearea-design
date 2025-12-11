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

// Dialog Management with Animation and Accessibility
function createDialog(type, title, message) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay dialog-entering';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'dialog-title');

  const dialog = document.createElement('div');
  dialog.className = `dialog dialog-${type} dialog-entering`;
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

  // アニメーション後にenteringクラスを削除
  setTimeout(() => {
    overlay.classList.remove('dialog-entering');
    dialog.classList.remove('dialog-entering');
  }, 200);

  // 最初のボタンにフォーカス
  const cancelButton = dialog.querySelector('.dialog-cancel');
  setTimeout(() => cancelButton?.focus(), 50);

  const close = (animate = true) => {
    if (animate) {
      overlay.classList.add('dialog-exiting');
      dialog.classList.add('dialog-exiting');
      setTimeout(() => overlay.remove(), 200);
    } else {
      overlay.remove();
    }
  };

  // Escキーで閉じる
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

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

// Drawer Management with Animation and Accessibility
function createDrawer(position) {
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay drawer-entering';
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 1000;';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'drawer-title');

  const drawer = document.createElement('div');
  drawer.className = `drawer drawer-${position} drawer-entering`;

  const positionStyles = {
    left: 'position: fixed; top: 0; left: 0; bottom: 0; width: 320px;',
    right: 'position: fixed; top: 0; right: 0; bottom: 0; width: 320px;',
    bottom: 'position: fixed; left: 0; right: 0; bottom: 0; height: 320px;'
  };

  drawer.style.cssText = `${positionStyles[position]} background: var(--background-primary); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); padding: 1.5rem;`;

  drawer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3 id="drawer-title" style="margin: 0; color: var(--foreground-primary);">${position}からのドロワー</h3>
      <button class="btn btn-ghost drawer-close" style="padding: 0.25rem 0.5rem;" aria-label="閉じる">&times;</button>
    </div>
    <p style="color: var(--foreground-secondary);">ドロワーのコンテンツがここに表示されます。</p>
  `;

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  // アニメーション後にenteringクラスを削除
  setTimeout(() => {
    overlay.classList.remove('drawer-entering');
    drawer.classList.remove('drawer-entering');
  }, 200);

  // 閉じるボタンにフォーカス
  const closeButton = drawer.querySelector('.drawer-close');
  setTimeout(() => closeButton?.focus(), 50);

  const close = (animate = true) => {
    if (animate) {
      overlay.classList.add('drawer-exiting');
      drawer.classList.add('drawer-exiting');
      setTimeout(() => overlay.remove(), 200);
    } else {
      overlay.remove();
    }
  };

  // Escキーで閉じる
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  closeButton.addEventListener('click', () => close());
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return overlay;
}

document.getElementById('open-drawer-left')?.addEventListener('click', () => createDrawer('left'));
document.getElementById('open-drawer-right')?.addEventListener('click', () => createDrawer('right'));
document.getElementById('open-drawer-bottom')?.addEventListener('click', () => createDrawer('bottom'));

// Popover Management with Animation and Accessibility
function createPopover(trigger) {
  // 既存のポップオーバーがあれば削除
  const existing = document.querySelector('.popover');
  if (existing) existing.remove();

  const popover = document.createElement('div');
  popover.className = 'popover popover-entering';
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

  // スクロール位置を考慮した絶対位置を計算
  const rect = trigger.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  popover.style.top = `${rect.bottom + scrollTop + 8}px`;
  popover.style.left = `${rect.left + scrollLeft}px`;

  // アニメーション後にenteringクラスを削除
  setTimeout(() => {
    popover.classList.remove('popover-entering');
  }, 150);

  const close = (animate = true) => {
    if (animate) {
      popover.classList.add('popover-exiting');
      setTimeout(() => popover.remove(), 150);
    } else {
      popover.remove();
    }
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  };

  // Escキーで閉じる
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      close();
    }
  };
  document.addEventListener('keydown', handleEscape);

  popover.querySelector('.popover-close').addEventListener('click', () => close());

  const handleClickOutside = (e) => {
    if (!popover.contains(e.target) && e.target !== trigger) {
      close();
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

  return popover;
}

document.getElementById('popover-trigger')?.addEventListener('click', function(e) {
  e.stopPropagation();
  createPopover(this);
});

// Dropdown Management with Animation and Accessibility
function createDropdown(trigger) {
  // 既存のドロップダウンがあれば削除
  const existing = document.querySelector('.dropdown');
  if (existing) existing.remove();

  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown dropdown-entering';
  dropdown.style.cssText = 'position: absolute; background: var(--component-dropdown-container-background); border: var(--component-dropdown-container-border-width) solid var(--component-dropdown-container-border-color); border-radius: var(--component-dropdown-container-border-radius); padding: var(--component-dropdown-container-padding-vertical) var(--component-dropdown-container-padding-horizontal); box-shadow: var(--component-dropdown-container-shadow); z-index: var(--component-dropdown-z-index); min-width: var(--component-dropdown-container-min-width);';
  dropdown.setAttribute('role', 'menu');
  dropdown.setAttribute('aria-orientation', 'vertical');

  dropdown.innerHTML = `
    <div class="dropdown-item" role="menuitem" tabindex="0" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: var(--foreground-primary); transition: background-color 0.15s;">📄 オプション 1</div>
    <div class="dropdown-item" role="menuitem" tabindex="0" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: var(--foreground-primary); transition: background-color 0.15s;">⚙️ オプション 2</div>
    <div class="dropdown-item" role="menuitem" tabindex="0" style="padding: 0.75rem 1rem; cursor: pointer; border-radius: 4px; color: var(--foreground-primary); transition: background-color 0.15s;">🗑️ オプション 3</div>
  `;

  document.body.appendChild(dropdown);

  // スクロール位置を考慮した絶対位置を計算
  const rect = trigger.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  dropdown.style.top = `${rect.bottom + scrollTop + 4}px`;
  dropdown.style.left = `${rect.left + scrollLeft}px`;

  // アニメーション後にenteringクラスを削除
  setTimeout(() => {
    dropdown.classList.remove('dropdown-entering');
  }, 150);

  // 最初のアイテムにフォーカス
  const firstItem = dropdown.querySelector('.dropdown-item');
  setTimeout(() => firstItem?.focus(), 50);

  const close = (animate = true) => {
    if (animate) {
      dropdown.classList.add('dropdown-exiting');
      setTimeout(() => dropdown.remove(), 150);
    } else {
      dropdown.remove();
    }
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  };

  // Escキーで閉じる、矢印キーでナビゲーション
  const items = Array.from(dropdown.querySelectorAll('.dropdown-item'));
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      close();
      trigger.focus();
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
  document.addEventListener('keydown', handleEscape);

  dropdown.querySelectorAll('.dropdown-item').forEach(item => {
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

  const handleClickOutside = (e) => {
    if (!dropdown.contains(e.target) && e.target !== trigger) {
      close();
    }
  };

  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);

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
