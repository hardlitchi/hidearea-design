/**
 * Theme Switcher Web Component
 *
 * A customizable theme switcher component for the Hidearea Design System.
 * Supports toggle button, dropdown, and segmented control layouts.
 *
 * @element ha-theme-switcher
 *
 * @attr {string} variant - Display variant ('toggle' | 'dropdown' | 'segmented') - default: 'toggle'
 * @attr {string} size - Size variant ('sm' | 'md' | 'lg') - default: 'md'
 * @attr {boolean} show-label - Whether to show text labels - default: false
 * @attr {boolean} show-auto - Whether to show auto/system option - default: true
 *
 * @fires theme-change - Fired when theme is changed
 *
 * @example
 * <ha-theme-switcher variant="toggle"></ha-theme-switcher>
 * <ha-theme-switcher variant="dropdown" show-label></ha-theme-switcher>
 * <ha-theme-switcher variant="segmented" show-auto></ha-theme-switcher>
 */

import { getTheme, setTheme, getEffectiveTheme, type Theme } from '../../utils/theme';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      font-family: var(--font-family-base, system-ui, -apple-system, sans-serif);
    }

    .theme-switcher {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2, 0.5rem);
    }

    /* Toggle Button Variant */
    .theme-switcher--toggle button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2, 0.5rem);
      padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
      background: var(--background-secondary, #fafafa);
      border: 1px solid var(--border-default, #e5e5e5);
      border-radius: var(--border-radius-md, 0.375rem);
      color: var(--foreground-primary, #171717);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: var(--font-size-sm, 0.875rem);
    }

    .theme-switcher--toggle button:hover {
      background: var(--background-tertiary, #f5f5f5);
      border-color: var(--border-strong, #d4d4d4);
    }

    .theme-switcher--toggle button:active {
      transform: scale(0.98);
    }

    /* Dropdown Variant */
    .theme-switcher--dropdown {
      position: relative;
    }

    .theme-switcher--dropdown select {
      padding: var(--spacing-2, 0.5rem) var(--spacing-8, 2rem) var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
      background: var(--background-secondary, #fafafa);
      border: 1px solid var(--border-default, #e5e5e5);
      border-radius: var(--border-radius-md, 0.375rem);
      color: var(--foreground-primary, #171717);
      cursor: pointer;
      font-size: var(--font-size-sm, 0.875rem);
      appearance: none;
    }

    .theme-switcher--dropdown select:hover {
      background: var(--background-tertiary, #f5f5f5);
      border-color: var(--border-strong, #d4d4d4);
    }

    /* Segmented Control Variant */
    .theme-switcher--segmented {
      display: inline-flex;
      background: var(--background-secondary, #fafafa);
      border: 1px solid var(--border-default, #e5e5e5);
      border-radius: var(--border-radius-md, 0.375rem);
      padding: var(--spacing-1, 0.25rem);
    }

    .theme-switcher--segmented button {
      padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
      background: transparent;
      border: none;
      border-radius: var(--border-radius-sm, 0.25rem);
      color: var(--foreground-secondary, #525252);
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: var(--font-size-sm, 0.875rem);
    }

    .theme-switcher--segmented button:hover {
      color: var(--foreground-primary, #171717);
    }

    .theme-switcher--segmented button.active {
      background: var(--background-primary, #ffffff);
      color: var(--foreground-primary, #171717);
      box-shadow: var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
    }

    /* Icons */
    .icon {
      display: inline-flex;
      width: 1em;
      height: 1em;
    }

    .icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    /* Size Variants */
    :host([size="sm"]) .theme-switcher--toggle button,
    :host([size="sm"]) .theme-switcher--dropdown select,
    :host([size="sm"]) .theme-switcher--segmented button {
      padding: var(--spacing-1, 0.25rem) var(--spacing-2, 0.5rem);
      font-size: var(--font-size-xs, 0.75rem);
    }

    :host([size="lg"]) .theme-switcher--toggle button,
    :host([size="lg"]) .theme-switcher--dropdown select,
    :host([size="lg"]) .theme-switcher--segmented button {
      padding: var(--spacing-3, 0.75rem) var(--spacing-4, 1rem);
      font-size: var(--font-size-base, 1rem);
    }
  </style>

  <div class="theme-switcher" id="switcher">
    <!-- Content will be dynamically generated -->
  </div>
`;

type Variant = 'toggle' | 'dropdown' | 'segmented';

class ThemeSwitcher extends HTMLElement {
  private _currentTheme: 'light' | 'dark' = 'light';
  private _currentPreference: Theme = 'light';
  private _themeChangeHandler: (e: Event) => void;
  private _handleToggleBound: () => void;
  private _handleSelectBound: (e: Event) => void;
  private _handleSegmentedClickBound: (e: Event) => void;

  static get observedAttributes(): string[] {
    return ['variant', 'size', 'show-label', 'show-auto'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this._currentTheme = getEffectiveTheme();
    this._currentPreference = getTheme();

    // Bind event handlers once in constructor
    this._themeChangeHandler = this._handleThemeChange.bind(this);
    this._handleToggleBound = this._handleToggle.bind(this);
    this._handleSelectBound = this._handleSelect.bind(this);
    this._handleSegmentedClickBound = this._handleSegmentedClick.bind(this);
  }

  connectedCallback(): void {
    this.render();
    this._setupListeners();
  }

  disconnectedCallback(): void {
    this._removeListeners();
  }

  attributeChangedCallback(): void {
    if (this.isConnected) {
      this.render();
    }
  }

  get variant(): Variant {
    return (this.getAttribute('variant') as Variant) || 'toggle';
  }

  get showLabel(): boolean {
    return this.hasAttribute('show-label');
  }

  get showAuto(): boolean {
    return this.hasAttribute('show-auto');
  }

  private _getIcon(theme: string): string {
    const icons: Record<string, string> = {
      light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.5C9.5 17.5 7.5 15.5 7.5 13S9.5 8.5 12 8.5 16.5 10.5 16.5 13 14.5 17.5 12 17.5zM12 7C11.4 7 11 6.6 11 6V3C11 2.4 11.4 2 12 2S13 2.4 13 3V6C13 6.6 12.6 7 12 7zM12 22C11.4 22 11 21.6 11 21V18C11 17.4 11.4 17 12 17S13 17.4 13 18V21C13 21.6 12.6 22 12 22zM19.8 7.8C19.5 7.5 19.5 7 19.8 6.7L21.9 4.6C22.2 4.3 22.7 4.3 23 4.6 23.3 4.9 23.3 5.4 23 5.7L20.9 7.8C20.6 8.1 20.1 8.1 19.8 7.8zM2.7 19.9C2.4 19.6 2.4 19.1 2.7 18.8L4.8 16.7C5.1 16.4 5.6 16.4 5.9 16.7 6.2 17 6.2 17.5 5.9 17.8L3.8 19.9C3.5 20.2 3 20.2 2.7 19.9zM18 13C18 13.6 18.4 14 19 14H22C22.6 14 23 13.6 23 13S22.6 12 22 12H19C18.4 12 18 12.4 18 13zM2 13C2 13.6 2.4 14 3 14H6C6.6 14 7 13.6 7 13S6.6 12 6 12H3C2.4 12 2 12.4 2 13zM18.7 17.8C18.4 17.5 18.4 17 18.7 16.7L20.8 14.6C21.1 14.3 21.6 14.3 21.9 14.6 22.2 14.9 22.2 15.4 21.9 15.7L19.8 17.8C19.5 18.1 19 18.1 18.7 17.8zM4.1 7.8C3.8 7.5 3.8 7 4.1 6.7L6.2 4.6C6.5 4.3 7 4.3 7.3 4.6 7.6 4.9 7.6 5.4 7.3 5.7L5.2 7.8C4.9 8.1 4.4 8.1 4.1 7.8z"/></svg>`,
      dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3C7.03 3 3 7.03 3 12S7.03 21 12 21 21 16.97 21 12C21 11.5 20.96 11.02 20.89 10.55 20.7 11.38 20.33 12.15 19.82 12.82 18.61 14.4 16.65 15.41 14.5 15.41 11.01 15.41 8.17 12.57 8.17 9.08 8.17 6.93 9.18 4.97 10.76 3.76 11.43 3.25 12.2 2.88 13.03 2.69 12.69 2.56 12.35 2.5 12 2.5 11.83 2.5 11.66 2.51 11.5 2.53 11.66 2.51 11.83 2.5 12 2.5 7.31 2.5 3.5 6.31 3.5 11 3.5 15.69 7.31 19.5 12 19.5 16.69 19.5 20.5 15.69 20.5 11 20.5 10.43 20.44 9.88 20.33 9.34 20.44 9.88 20.5 10.43 20.5 11 20.5 12.32 20.39 13.62 20.18 14.88 20.39 13.62 20.5 12.32 20.5 11 20.5 5.76 16.24 1.5 11 1.5 5.76 1.5 1.5 5.76 1.5 11 1.5 16.24 5.76 20.5 11 20.5 11.34 20.5 11.67 20.48 12 20.45 11.67 20.48 11.34 20.5 11 20.5 6.03 20.5 2 16.47 2 11.5 2 6.53 6.03 2.5 11 2.5 12 2.5 12 2.5 12 3z"/></svg>`,
      auto: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3C10.9 3 10 3.9 10 5V8C10 9.1 10.9 10 12 10S14 9.1 14 8V5C14 3.9 13.1 3 12 3zM19 11C17.9 11 17 11.9 17 13S17.9 15 19 15H22C23.1 15 24 14.1 24 13S23.1 11 22 11H19zM5 11H2C0.9 11 0 11.9 0 13S0.9 15 2 15H5C6.1 15 7 14.1 7 13S6.1 11 5 11zM16.5 17.3L19.4 20.2C20.2 21 21.5 21 22.3 20.2S23.3 18.3 22.5 17.5L19.6 14.6C18.8 13.8 17.5 13.8 16.7 14.6S15.7 16.5 16.5 17.3zM16.5 8.7C17.3 9.5 18.6 9.5 19.4 8.7L22.3 5.8C23.1 5 23.1 3.7 22.3 2.9S20.4 1.9 19.6 2.7L16.7 5.6C15.9 6.4 15.9 7.7 16.7 8.5zM7.5 17.3C6.7 16.5 5.4 16.5 4.6 17.3L1.7 20.2C0.9 21 0.9 22.3 1.7 23.1S3.6 24.1 4.4 23.3L7.3 20.4C8.1 19.6 8.1 18.3 7.3 17.5zM7.5 8.7L4.6 5.8C3.8 5 2.5 5 1.7 5.8S0.7 7.7 1.5 8.5L4.4 11.4C5.2 12.2 6.5 12.2 7.3 11.4S8.3 9.5 7.5 8.7zM12 14C10.3 14 9 15.3 9 17V20C9 21.7 10.3 23 12 23S15 21.7 15 20V17C15 15.3 13.7 14 12 14z"/></svg>`
    };
    return icons[theme] || icons.light;
  }

  private _getLabel(theme: string): string {
    const labels: Record<string, string> = {
      light: 'Light',
      dark: 'Dark',
      auto: 'Auto'
    };
    return labels[theme] || labels.light;
  }

  render(): void {
    const switcher = this.shadowRoot!.getElementById('switcher')!;
    switcher.className = `theme-switcher theme-switcher--${this.variant}`;

    if (this.variant === 'toggle') {
      this._renderToggle(switcher);
    } else if (this.variant === 'dropdown') {
      this._renderDropdown(switcher);
    } else if (this.variant === 'segmented') {
      this._renderSegmented(switcher);
    }
  }

  private _renderToggle(container: HTMLElement): void {
    const preference = this._currentPreference;
    const theme = preference === 'auto' ? 'auto' : this._currentTheme;

    container.innerHTML = `
      <button type="button" aria-label="Toggle theme" id="toggle-btn">
        <span class="icon">${this._getIcon(theme)}</span>
        ${this.showLabel ? `<span>${this._getLabel(theme)}</span>` : ''}
      </button>
    `;
  }

  private _renderDropdown(container: HTMLElement): void {
    const preference = this._currentPreference;

    container.innerHTML = `
      <select id="theme-select" aria-label="Select theme">
        <option value="light" ${preference === 'light' ? 'selected' : ''}>
          ${this._getLabel('light')}
        </option>
        <option value="dark" ${preference === 'dark' ? 'selected' : ''}>
          ${this._getLabel('dark')}
        </option>
        ${this.showAuto ? `
          <option value="auto" ${preference === 'auto' ? 'selected' : ''}>
            ${this._getLabel('auto')}
          </option>
        ` : ''}
      </select>
    `;
  }

  private _renderSegmented(container: HTMLElement): void {
    const preference = this._currentPreference;
    const options: Theme[] = ['light', 'dark'];
    if (this.showAuto) options.push('auto');

    container.innerHTML = options.map(theme => `
      <button
        type="button"
        data-theme="${theme}"
        class="${preference === theme ? 'active' : ''}"
        aria-label="${this._getLabel(theme)}"
        aria-pressed="${preference === theme}"
      >
        <span class="icon">${this._getIcon(theme)}</span>
        ${this.showLabel ? `<span>${this._getLabel(theme)}</span>` : ''}
      </button>
    `).join('');
  }

  private _setupListeners(): void {
    // Add UI event listeners
    this._setupUIListeners();

    // Listen for external theme changes (only add once in connectedCallback)
    window.addEventListener('theme-change', this._themeChangeHandler);
  }

  private _setupUIListeners(): void {
    // Remove existing UI listeners first to prevent duplicates
    this._removeUIListeners();

    // Add UI event listeners based on variant
    if (this.variant === 'toggle') {
      const btn = this.shadowRoot!.getElementById('toggle-btn');
      btn?.addEventListener('click', this._handleToggleBound);
    } else if (this.variant === 'dropdown') {
      const select = this.shadowRoot!.getElementById('theme-select') as HTMLSelectElement;
      select?.addEventListener('change', this._handleSelectBound);
    } else if (this.variant === 'segmented') {
      this.shadowRoot!.querySelectorAll('button[data-theme]').forEach(btn => {
        btn.addEventListener('click', this._handleSegmentedClickBound);
      });
    }
  }

  private _removeUIListeners(): void {
    // Remove UI event listeners
    const btn = this.shadowRoot!.getElementById('toggle-btn');
    btn?.removeEventListener('click', this._handleToggleBound);

    const select = this.shadowRoot!.getElementById('theme-select') as HTMLSelectElement;
    select?.removeEventListener('change', this._handleSelectBound);

    this.shadowRoot!.querySelectorAll('button[data-theme]').forEach(btn => {
      btn.removeEventListener('click', this._handleSegmentedClickBound);
    });
  }

  private _removeListeners(): void {
    this._removeUIListeners();
    window.removeEventListener('theme-change', this._themeChangeHandler);
  }

  private _handleToggle(): void {
    const preference = this._currentPreference;

    let newPreference: Theme;
    if (this.showAuto) {
      // Cycle through: light -> dark -> auto -> light
      if (preference === 'light') newPreference = 'dark';
      else if (preference === 'dark') newPreference = 'auto';
      else newPreference = 'light';
    } else {
      // Toggle between light and dark
      newPreference = preference === 'light' ? 'dark' : 'light';
    }

    setTheme(newPreference);
  }

  private _handleSelect(e: Event): void {
    const target = e.target as HTMLSelectElement;
    setTheme(target.value as Theme);
  }

  private _handleSegmentedClick(e: Event): void {
    const target = e.currentTarget as HTMLElement;
    const theme = target.dataset.theme as Theme;
    setTheme(theme);
  }

  private _handleThemeChange(e: Event): void {
    const customEvent = e as CustomEvent<{ theme: Theme; effective: 'light' | 'dark' }>;

    const newTheme = customEvent.detail.effective;
    const newPreference = customEvent.detail.theme;

    // Only update if the theme actually changed
    if (this._currentTheme === newTheme && this._currentPreference === newPreference) {
      return;
    }

    this._currentTheme = newTheme;
    this._currentPreference = newPreference;
    this.render();
    // Re-attach UI listeners to newly rendered elements
    // Use _setupUIListeners to avoid re-adding window listener
    this._setupUIListeners();
  }
}

customElements.define('ha-theme-switcher', ThemeSwitcher);

export default ThemeSwitcher;
