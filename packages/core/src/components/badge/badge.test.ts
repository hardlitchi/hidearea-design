import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaBadge } from './badge';

describe('HaBadge', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-badge')) {
      customElements.define('ha-badge', HaBadge);
    }
    await waitForCustomElement('ha-badge');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-badge')).toBe(HaBadge);
    });

    it('should create an instance', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      expect(badge).toBeInstanceOf(HaBadge);
      expect(badge).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      document.body.appendChild(badge);
      expect(badge.shadowRoot).not.toBeNull();
      document.body.removeChild(badge);
    });
  });

  describe('Attributes and Properties', () => {
    let badge: HaBadge;

    beforeEach(() => {
      badge = document.createElement('ha-badge') as HaBadge;
      document.body.appendChild(badge);
    });

    afterEach(() => {
      document.body.removeChild(badge);
    });

    it('should have default variant as primary', () => {
      expect(badge.variant).toBe('primary');
    });

    it('should have default styleVariant as filled', () => {
      expect(badge.styleVariant).toBe('filled');
    });

    it('should have default size as md', () => {
      expect(badge.size).toBe('md');
    });

    it('should not be pill by default', () => {
      expect(badge.pill).toBe(false);
    });

    it('should not be dot by default', () => {
      expect(badge.dot).toBe(false);
    });

    it('should not be removable by default', () => {
      expect(badge.removable).toBe(false);
    });

    it('should update variant property', () => {
      badge.variant = 'success';
      expect(badge.variant).toBe('success');
      expect(badge.getAttribute('variant')).toBe('success');
    });

    it('should update styleVariant property', () => {
      badge.styleVariant = 'outlined';
      expect(badge.styleVariant).toBe('outlined');
      expect(badge.getAttribute('style-variant')).toBe('outlined');
    });

    it('should update size property', () => {
      badge.size = 'lg';
      expect(badge.size).toBe('lg');
      expect(badge.getAttribute('size')).toBe('lg');
    });

    it('should update pill property', () => {
      badge.pill = true;
      expect(badge.pill).toBe(true);
      expect(badge.hasAttribute('pill')).toBe(true);
    });

    it('should update dot property', () => {
      badge.dot = true;
      expect(badge.dot).toBe(true);
      expect(badge.hasAttribute('dot')).toBe(true);
    });

    it('should update removable property', () => {
      badge.removable = true;
      expect(badge.removable).toBe(true);
      expect(badge.hasAttribute('removable')).toBe(true);
    });
  });

  describe('Variants', () => {
    it('should render primary variant', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.variant = 'primary';
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).toContain('badge--primary');

      document.body.removeChild(badge);
    });

    it('should render all color variants', () => {
      const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const;

      variants.forEach(variant => {
        const badge = document.createElement('ha-badge') as HaBadge;
        badge.variant = variant;
        document.body.appendChild(badge);

        const badgeElement = queryShadow(badge, '.badge');
        expect(badgeElement?.className).toContain(`badge--${variant}`);

        document.body.removeChild(badge);
      });
    });
  });

  describe('Style Variants', () => {
    it('should render filled style (default)', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.styleVariant = 'filled';
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      // Filled doesn't add extra class
      expect(badgeElement?.className).not.toContain('badge--filled');

      document.body.removeChild(badge);
    });

    it('should render outlined style', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.styleVariant = 'outlined';
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).toContain('badge--outlined');

      document.body.removeChild(badge);
    });

    it('should render soft style', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.styleVariant = 'soft';
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).toContain('badge--soft');

      document.body.removeChild(badge);
    });
  });

  describe('Sizes', () => {
    it('should render all sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      sizes.forEach(size => {
        const badge = document.createElement('ha-badge') as HaBadge;
        badge.size = size;
        document.body.appendChild(badge);

        const badgeElement = queryShadow(badge, '.badge');
        expect(badgeElement?.className).toContain(`badge--${size}`);

        document.body.removeChild(badge);
      });
    });
  });

  describe('Pill Shape', () => {
    it('should apply pill class when pill is true', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.pill = true;
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).toContain('badge--pill');

      document.body.removeChild(badge);
    });

    it('should not apply pill class when pill is false', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.pill = false;
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).not.toContain('badge--pill');

      document.body.removeChild(badge);
    });
  });

  describe('Dot Badge', () => {
    it('should apply dot class when dot is true', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.dot = true;
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).toContain('badge--dot');

      document.body.removeChild(badge);
    });

    it('should not apply dot class when dot is false', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.dot = false;
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).not.toContain('badge--dot');

      document.body.removeChild(badge);
    });
  });

  describe('Removable', () => {
    it('should not show remove button when removable is false', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.removable = false;
      document.body.appendChild(badge);

      const removeButton = queryShadow(badge, '.badge__remove') as HTMLElement;
      expect(removeButton?.style.display).toBe('none');

      document.body.removeChild(badge);
    });

    it('should show remove button when removable is true', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.removable = true;
      document.body.appendChild(badge);

      const removeButton = queryShadow(badge, '.badge__remove') as HTMLElement;
      expect(removeButton?.style.display).toBe('flex');

      document.body.removeChild(badge);
    });

    it('should emit badge-remove event when remove button is clicked', async () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.removable = true;
      document.body.appendChild(badge);

      const removeHandler = vi.fn();
      badge.addEventListener('badge-remove', removeHandler);

      const removeButton = queryShadow(badge, '.badge__remove') as HTMLButtonElement;
      removeButton.click();

      expect(removeHandler).toHaveBeenCalled();
    });

    it('should remove element when remove button is clicked (default behavior)', async () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.removable = true;
      document.body.appendChild(badge);

      expect(document.body.contains(badge)).toBe(true);

      const removeButton = queryShadow(badge, '.badge__remove') as HTMLButtonElement;
      removeButton.click();

      // Wait for next tick
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(document.body.contains(badge)).toBe(false);
    });

    it('should call remove() method programmatically', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.removable = true;
      document.body.appendChild(badge);

      const removeHandler = vi.fn();
      badge.addEventListener('badge-remove', removeHandler);

      badge.remove();

      // Element should be removed from DOM
      expect(document.body.contains(badge)).toBe(false);
    });
  });

  describe('Content', () => {
    it('should render text content', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.textContent = 'Badge Text';
      document.body.appendChild(badge);

      expect(badge.textContent).toContain('Badge Text');

      document.body.removeChild(badge);
    });
  });

  describe('Icon', () => {
    it('should hide icon container when no icon is slotted', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      document.body.appendChild(badge);

      const iconContainer = queryShadow(badge, '.badge__icon') as HTMLElement;
      expect(iconContainer?.style.display).toBe('none');

      document.body.removeChild(badge);
    });

    it('should show icon container when icon is slotted', async () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      const icon = document.createElement('svg');
      icon.setAttribute('slot', 'icon');
      badge.appendChild(icon);
      document.body.appendChild(badge);

      // Wait for slotchange event
      await new Promise(resolve => setTimeout(resolve, 0));

      const iconContainer = queryShadow(badge, '.badge__icon') as HTMLElement;
      expect(iconContainer?.style.display).not.toBe('none');

      document.body.removeChild(badge);
    });
  });

  describe('Parts', () => {
    it('should expose parts for styling', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '[part="badge"]');
      const iconElement = queryShadow(badge, '[part="icon"]');
      const contentElement = queryShadow(badge, '[part="content"]');
      const removeElement = queryShadow(badge, '[part="remove"]');

      expect(badgeElement).not.toBeNull();
      expect(iconElement).not.toBeNull();
      expect(contentElement).not.toBeNull();
      expect(removeElement).not.toBeNull();

      document.body.removeChild(badge);
    });
  });

  describe('Combined Properties', () => {
    it('should apply multiple classes correctly', () => {
      const badge = document.createElement('ha-badge') as HaBadge;
      badge.variant = 'success';
      badge.styleVariant = 'soft';
      badge.size = 'lg';
      badge.pill = true;
      document.body.appendChild(badge);

      const badgeElement = queryShadow(badge, '.badge');
      expect(badgeElement?.className).toContain('badge--success');
      expect(badgeElement?.className).toContain('badge--soft');
      expect(badgeElement?.className).toContain('badge--lg');
      expect(badgeElement?.className).toContain('badge--pill');

      document.body.removeChild(badge);
    });
  });
});
