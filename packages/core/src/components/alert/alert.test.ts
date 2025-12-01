import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaAlert } from './alert';

describe('HaAlert', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-alert')) {
      customElements.define('ha-alert', HaAlert);
    }
    await waitForCustomElement('ha-alert');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-alert')).toBe(HaAlert);
    });

    it('should create an instance', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      expect(alert).toBeInstanceOf(HaAlert);
      expect(alert).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      document.body.appendChild(alert);
      expect(alert.shadowRoot).not.toBeNull();
      document.body.removeChild(alert);
    });
  });

  describe('Attributes and Properties', () => {
    let alert: HaAlert;

    beforeEach(() => {
      alert = document.createElement('ha-alert') as HaAlert;
      document.body.appendChild(alert);
    });

    afterEach(() => {
      document.body.removeChild(alert);
    });

    it('should have default variant as info', () => {
      expect(alert.variant).toBe('info');
    });

    it('should have default styleVariant as soft', () => {
      expect(alert.styleVariant).toBe('soft');
    });

    it('should not be closable by default', () => {
      expect(alert.closable).toBe(false);
    });

    it('should show icon by default', () => {
      expect(alert.showIcon).toBe(true);
    });

    it('should update variant property', () => {
      alert.variant = 'success';
      expect(alert.variant).toBe('success');
      expect(alert.getAttribute('variant')).toBe('success');
    });

    it('should update styleVariant property', () => {
      alert.styleVariant = 'filled';
      expect(alert.styleVariant).toBe('filled');
      expect(alert.getAttribute('style-variant')).toBe('filled');
    });

    it('should update title property', () => {
      alert.title = 'Test Title';
      expect(alert.title).toBe('Test Title');
      expect(alert.getAttribute('title')).toBe('Test Title');
    });

    it('should update closable property', () => {
      alert.closable = true;
      expect(alert.closable).toBe(true);
      expect(alert.hasAttribute('closable')).toBe(true);
    });

    it('should update showIcon property', () => {
      alert.showIcon = false;
      expect(alert.showIcon).toBe(false);
      expect(alert.getAttribute('show-icon')).toBe('false');
    });
  });

  describe('Variants', () => {
    it('should render info variant', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.variant = 'info';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--info');

      document.body.removeChild(alert);
    });

    it('should render success variant', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.variant = 'success';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--success');

      document.body.removeChild(alert);
    });

    it('should render warning variant', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.variant = 'warning';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--warning');

      document.body.removeChild(alert);
    });

    it('should render error variant', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.variant = 'error';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--error');

      document.body.removeChild(alert);
    });
  });

  describe('Style Variants', () => {
    it('should render filled style', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.styleVariant = 'filled';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--filled');

      document.body.removeChild(alert);
    });

    it('should render outlined style', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.styleVariant = 'outlined';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--outlined');

      document.body.removeChild(alert);
    });

    it('should render soft style', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.styleVariant = 'soft';
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.className).toContain('alert--soft');

      document.body.removeChild(alert);
    });
  });

  describe('Closable', () => {
    it('should not show close button when closable is false', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.closable = false;
      document.body.appendChild(alert);

      const closeButton = queryShadow(alert, '.alert__close') as HTMLElement;
      expect(closeButton?.style.display).toBe('none');

      document.body.removeChild(alert);
    });

    it('should show close button when closable is true', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeButton = queryShadow(alert, '.alert__close') as HTMLElement;
      expect(closeButton?.style.display).toBe('flex');

      document.body.removeChild(alert);
    });

    it('should emit alert-close event when close button is clicked', async () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeHandler = vi.fn();
      alert.addEventListener('alert-close', closeHandler);

      const closeButton = queryShadow(alert, '.alert__close') as HTMLButtonElement;
      closeButton.click();

      expect(closeHandler).toHaveBeenCalled();
    });

    it('should remove element when close button is clicked (default behavior)', async () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      expect(document.body.contains(alert)).toBe(true);

      const closeButton = queryShadow(alert, '.alert__close') as HTMLButtonElement;
      closeButton.click();

      // Wait for next tick
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.body.contains(alert)).toBe(false);
    });

    it('should call close() method programmatically', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeHandler = vi.fn();
      alert.addEventListener('alert-close', closeHandler);

      alert.close();

      expect(closeHandler).toHaveBeenCalled();
    });
  });

  describe('Icon', () => {
    it('should show icon by default', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      document.body.appendChild(alert);

      const iconContainer = queryShadow(alert, '.alert__icon') as HTMLElement;
      expect(iconContainer?.style.display).not.toBe('none');

      document.body.removeChild(alert);
    });

    it('should hide icon when showIcon is false', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.showIcon = false;
      document.body.appendChild(alert);

      const iconContainer = queryShadow(alert, '.alert__icon') as HTMLElement;
      expect(iconContainer?.style.display).toBe('none');

      document.body.removeChild(alert);
    });

    it('should render default icon for each variant', () => {
      const variants = ['info', 'success', 'warning', 'error'] as const;

      variants.forEach(variant => {
        const alert = document.createElement('ha-alert') as HaAlert;
        alert.variant = variant;
        alert.showIcon = true;
        document.body.appendChild(alert);

        const icon = alert.querySelector('[slot="icon"][data-default]');
        expect(icon).not.toBeNull();
        expect(icon?.innerHTML).toContain('<svg');

        document.body.removeChild(alert);
      });
    });
  });

  describe('Title', () => {
    it('should render title from attribute', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.title = 'Test Title';
      document.body.appendChild(alert);

      const titleElement = queryShadow(alert, '.alert__title') as HTMLElement;
      expect(titleElement?.textContent).toContain('Test Title');
      expect(titleElement?.style.display).not.toBe('none');

      document.body.removeChild(alert);
    });

    it('should hide title when not provided', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      document.body.appendChild(alert);

      const titleElement = queryShadow(alert, '.alert__title') as HTMLElement;
      expect(titleElement?.style.display).toBe('none');

      document.body.removeChild(alert);
    });
  });

  describe('Content', () => {
    it('should render message content', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.textContent = 'This is an alert message';
      document.body.appendChild(alert);

      expect(alert.textContent).toContain('This is an alert message');

      document.body.removeChild(alert);
    });
  });

  describe('Accessibility', () => {
    it('should have role="alert"', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '.alert');
      expect(alertElement?.getAttribute('role')).toBe('alert');

      document.body.removeChild(alert);
    });

    it('should have accessible close button', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      alert.closable = true;
      document.body.appendChild(alert);

      const closeButton = queryShadow(alert, '.alert__close') as HTMLButtonElement;
      expect(closeButton?.getAttribute('aria-label')).toBe('Close alert');
      expect(closeButton?.getAttribute('type')).toBe('button');

      document.body.removeChild(alert);
    });
  });

  describe('Parts', () => {
    it('should expose parts for styling', () => {
      const alert = document.createElement('ha-alert') as HaAlert;
      document.body.appendChild(alert);

      const alertElement = queryShadow(alert, '[part="alert"]');
      const iconElement = queryShadow(alert, '[part="icon"]');
      const contentElement = queryShadow(alert, '[part="content"]');
      const titleElement = queryShadow(alert, '[part="title"]');
      const messageElement = queryShadow(alert, '[part="message"]');
      const closeElement = queryShadow(alert, '[part="close"]');
      const actionsElement = queryShadow(alert, '[part="actions"]');

      expect(alertElement).not.toBeNull();
      expect(iconElement).not.toBeNull();
      expect(contentElement).not.toBeNull();
      expect(titleElement).not.toBeNull();
      expect(messageElement).not.toBeNull();
      expect(closeElement).not.toBeNull();
      expect(actionsElement).not.toBeNull();

      document.body.removeChild(alert);
    });
  });
});
