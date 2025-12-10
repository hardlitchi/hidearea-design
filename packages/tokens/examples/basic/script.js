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

// Initialize theme on page load
initTheme();

// Log current theme for debugging
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Available CSS variables:', {
  primaryDefault: getComputedStyle(document.documentElement).getPropertyValue('--primary-default'),
  backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background-primary'),
  foregroundColor: getComputedStyle(document.documentElement).getPropertyValue('--foreground-primary'),
});
