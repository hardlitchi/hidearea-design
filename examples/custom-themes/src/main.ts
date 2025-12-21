import '@hidearea-design/core';
import '@hidearea-design/tokens/css/variables';
import './themes/corporate.css';
import './themes/ocean.css';
import './themes/forest.css';
import './style.css';

// Theme management
type Theme = 'default' | 'corporate' | 'ocean' | 'forest' | 'corporate-dark' | 'ocean-dark' | 'forest-dark';

class ThemeManager {
  private currentTheme: Theme = 'default';

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('selected-theme', theme);
  }

  getTheme(): Theme {
    return this.currentTheme;
  }

  private loadTheme() {
    const saved = localStorage.getItem('selected-theme') as Theme | null;
    if (saved) {
      this.setTheme(saved);
    }
  }
}

const themeManager = new ThemeManager();

// Render the app
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="container">
    <header class="header">
      <h1>Custom Themes Example</h1>
      <p class="subtitle">
        Hidearea Design System - Learn how to create and apply custom themes
      </p>
    </header>

    <main>
      <!-- Theme Selector -->
      <section class="section">
        <h2>Theme Selector</h2>
        <p class="description">
          Choose from our pre-built themes or use the default theme. Each theme demonstrates
          how to customize the design system's color palette and styling.
        </p>

        <div class="theme-grid">
          <div class="theme-card" id="theme-default">
            <div class="theme-preview default-preview"></div>
            <h3>Default Theme</h3>
            <p>The original Hidearea Design System theme</p>
            <ha-button variant="outline" size="sm" data-theme="default">Apply</ha-button>
          </div>

          <div class="theme-card" id="theme-corporate">
            <div class="theme-preview corporate-preview"></div>
            <h3>Corporate Theme</h3>
            <p>Professional navy and gray for business apps</p>
            <ha-button variant="outline" size="sm" data-theme="corporate">Apply</ha-button>
          </div>

          <div class="theme-card" id="theme-ocean">
            <div class="theme-preview ocean-preview"></div>
            <h3>Ocean Theme</h3>
            <p>Calming blues and teals inspired by the sea</p>
            <ha-button variant="outline" size="sm" data-theme="ocean">Apply</ha-button>
          </div>

          <div class="theme-card" id="theme-forest">
            <div class="theme-preview forest-preview"></div>
            <h3>Forest Theme</h3>
            <p>Natural greens and earth tones from nature</p>
            <ha-button variant="outline" size="sm" data-theme="forest">Apply</ha-button>
          </div>
        </div>

        <div class="dark-mode-toggle">
          <ha-switch id="dark-mode-switch"></ha-switch>
          <label for="dark-mode-switch">Enable Dark Mode</label>
        </div>
      </section>

      <!-- Component Showcase -->
      <section class="section">
        <h2>Component Showcase</h2>
        <p class="description">
          See how the current theme affects various components.
        </p>

        <!-- Buttons -->
        <div class="showcase-group">
          <h3>Buttons</h3>
          <div class="button-group">
            <ha-button variant="primary">Primary</ha-button>
            <ha-button variant="secondary">Secondary</ha-button>
            <ha-button variant="danger">Danger</ha-button>
            <ha-button variant="outline">Outline</ha-button>
          </div>
        </div>

        <!-- Alerts -->
        <div class="showcase-group">
          <h3>Alerts</h3>
          <div class="alert-group">
            <ha-alert variant="info" title="Information">
              This is an informational message.
            </ha-alert>
            <ha-alert variant="success" title="Success">
              Operation completed successfully!
            </ha-alert>
            <ha-alert variant="warning" title="Warning">
              Please review this warning.
            </ha-alert>
            <ha-alert variant="error" title="Error">
              An error occurred.
            </ha-alert>
          </div>
        </div>

        <!-- Badges -->
        <div class="showcase-group">
          <h3>Badges</h3>
          <div class="badge-group">
            <ha-badge variant="primary">Primary</ha-badge>
            <ha-badge variant="secondary">Secondary</ha-badge>
            <ha-badge variant="success">Success</ha-badge>
            <ha-badge variant="danger">Danger</ha-badge>
            <ha-badge variant="warning">Warning</ha-badge>
            <ha-badge variant="info">Info</ha-badge>
          </div>
        </div>

        <!-- Form Controls -->
        <div class="showcase-group">
          <h3>Form Controls</h3>
          <div class="form-grid">
            <div>
              <label>Text Input</label>
              <ha-input placeholder="Enter text..."></ha-input>
            </div>
            <div>
              <label>Select</label>
              <ha-select>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </ha-select>
            </div>
          </div>
          <div class="checkbox-group">
            <ha-checkbox label="Checkbox option"></ha-checkbox>
            <ha-switch></ha-switch>
            <span>Switch control</span>
          </div>
        </div>

        <!-- Card -->
        <div class="showcase-group">
          <h3>Card</h3>
          <ha-card>
            <div slot="header">
              <h4>Card Title</h4>
            </div>
            <p>This card demonstrates how the theme affects card styling including backgrounds, borders, and shadows.</p>
            <div slot="footer" class="card-footer">
              <ha-button variant="outline" size="sm">Cancel</ha-button>
              <ha-button variant="primary" size="sm">Save</ha-button>
            </div>
          </ha-card>
        </div>
      </section>

      <!-- Theme Tokens -->
      <section class="section">
        <h2>Active Theme Tokens</h2>
        <p class="description">
          Current CSS custom property values from the active theme.
        </p>
        <div class="tokens-grid" id="tokens-display">
          <!-- Tokens will be populated here -->
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>Built with Hidearea Design System</p>
      <p class="footer-links">
        <a href="https://github.com/hardlitchi/hidearea-design" target="_blank">GitHub</a> |
        <a href="../../packages/docs" target="_blank">Documentation</a>
      </p>
    </footer>
  </div>
`;

// Theme switching logic
const themeButtons = app.querySelectorAll<HTMLElement>('ha-button[data-theme]');
const darkModeSwitch = app.querySelector<HTMLElement>('#dark-mode-switch');

let isDarkMode = false;

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.theme as Theme;
    const finalTheme = isDarkMode && theme !== 'default' ? `${theme}-dark` as Theme : theme;
    themeManager.setTheme(finalTheme);
    updateActiveThemeCard();
    updateTokensDisplay();
  });
});

if (darkModeSwitch) {
  darkModeSwitch.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    isDarkMode = target.checked;

    const currentTheme = themeManager.getTheme();
    if (currentTheme === 'default') {
      // Default theme doesn't have dark mode, do nothing
      return;
    }

    // Toggle between light and dark version of current theme
    const baseTheme = currentTheme.replace('-dark', '') as Theme;
    const newTheme = isDarkMode ? `${baseTheme}-dark` as Theme : baseTheme;
    themeManager.setTheme(newTheme);
    updateTokensDisplay();
  });
}

function updateActiveThemeCard() {
  const currentTheme = themeManager.getTheme().replace('-dark', '');
  document.querySelectorAll('.theme-card').forEach((card) => {
    card.classList.remove('active');
  });
  const activeCard = document.querySelector(`#theme-${currentTheme}`);
  if (activeCard) {
    activeCard.classList.add('active');
  }
}

function updateTokensDisplay() {
  const tokensDisplay = document.querySelector('#tokens-display');
  if (!tokensDisplay) return;

  const style = getComputedStyle(document.documentElement);
  const tokens = [
    { name: '--ha-color-primary', label: 'Primary Color' },
    { name: '--ha-color-secondary', label: 'Secondary Color' },
    { name: '--ha-color-success', label: 'Success Color' },
    { name: '--ha-color-danger', label: 'Danger Color' },
    { name: '--ha-color-warning', label: 'Warning Color' },
    { name: '--ha-color-info', label: 'Info Color' },
    { name: '--ha-color-background-primary', label: 'Background Primary' },
    { name: '--ha-color-background-secondary', label: 'Background Secondary' },
    { name: '--ha-color-text-primary', label: 'Text Primary' },
    { name: '--ha-color-border-primary', label: 'Border Primary' },
  ];

  tokensDisplay.innerHTML = tokens
    .map(
      (token) => `
      <div class="token-item">
        <div class="token-preview" style="background-color: ${style.getPropertyValue(token.name).trim()}"></div>
        <div class="token-info">
          <div class="token-name">${token.name}</div>
          <div class="token-value">${style.getPropertyValue(token.name).trim()}</div>
        </div>
      </div>
    `
    )
    .join('');
}

// Initialize
updateActiveThemeCard();
updateTokensDisplay();
