// Get computed CSS variables
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Update token display
function updateTokenDisplay() {
  const tokens = [
    { id: 'bg-primary', name: '--background-primary' },
    { id: 'fg-primary', name: '--foreground-primary' },
    { id: 'border-default', name: '--border-default' }
  ];

  tokens.forEach(({ id, name }) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = getCSSVariable(name) || 'N/A';
    }
  });

  // Update current tokens list
  const currentTokensList = document.getElementById('current-tokens');
  if (currentTokensList) {
    const tokenValues = [
      { name: '--primary-default', value: getCSSVariable('--primary-default') },
      { name: '--success-default', value: getCSSVariable('--success-default') },
      { name: '--error-default', value: getCSSVariable('--error-default') },
      { name: '--background-primary', value: getCSSVariable('--background-primary') },
      { name: '--foreground-primary', value: getCSSVariable('--foreground-primary') },
    ];

    currentTokensList.innerHTML = tokenValues.map(({ name, value }) => `
      <div class="token-item">
        <span class="token-name">${name}</span>
        <span class="token-value">${value || 'N/A'}</span>
      </div>
    `).join('');
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
  updateActiveButton(theme);
  updateSystemSchemeDisplay();
  updateTokenDisplay();
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme !== 'system') {
    localStorage.setItem('theme', theme);
  }
  updateTokenDisplay();
}

function updateActiveButton(theme) {
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  if (theme === 'system') {
    document.getElementById('system-theme')?.classList.add('active');
  } else {
    const activeBtn = document.querySelector(`[data-theme="${theme}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  }
}

function updateSystemSchemeDisplay() {
  const systemScheme = document.getElementById('system-scheme');
  if (systemScheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    systemScheme.textContent = prefersDark ? 'ダーク' : 'ライト';
    systemScheme.style.fontWeight = '600';
    systemScheme.style.color = prefersDark ?
      'var(--primary-default)' :
      'var(--warning-default)';
  }
}

// Theme Toggle Buttons
document.querySelectorAll('[data-theme]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const theme = e.currentTarget.getAttribute('data-theme');
    setTheme(theme);
    updateActiveButton(theme);
  });
});

// System Theme Button
const systemThemeBtn = document.getElementById('system-theme');
if (systemThemeBtn) {
  systemThemeBtn.addEventListener('click', () => {
    localStorage.removeItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    setTheme(systemTheme);
    updateActiveButton('system');
  });
}

// System Theme Change Detection
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (e) => {
  updateSystemSchemeDisplay();

  // Only auto-switch if user is using system theme
  if (!localStorage.getItem('theme')) {
    const theme = e.matches ? 'dark' : 'light';
    setTheme(theme);
  }
});

// Re-calculate token values when window resizes (for responsive tokens if any)
window.addEventListener('resize', () => {
  updateTokenDisplay();
});

// Initialize
initTheme();

// Log for debugging
console.log('Theme Demo Initialized');
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Saved theme:', localStorage.getItem('theme'));
console.log('System prefers dark:', darkModeMediaQuery.matches);
