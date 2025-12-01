import { describe, it, expect, beforeEach, vi } from 'vitest';
import { waitForCustomElement, queryShadow } from '../../../vitest.setup';
import { HaCard } from './card';

describe('HaCard', () => {
  beforeEach(async () => {
    // Ensure the custom element is registered
    if (!customElements.get('ha-card')) {
      customElements.define('ha-card', HaCard);
    }
    await waitForCustomElement('ha-card');
  });

  describe('Component Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('ha-card')).toBe(HaCard);
    });

    it('should create an instance', () => {
      const card = document.createElement('ha-card') as HaCard;
      expect(card).toBeInstanceOf(HaCard);
      expect(card).toBeInstanceOf(HTMLElement);
    });

    it('should render with shadow DOM', () => {
      const card = document.createElement('ha-card') as HaCard;
      document.body.appendChild(card);
      expect(card.shadowRoot).not.toBeNull();
      document.body.removeChild(card);
    });
  });

  describe('Attributes and Properties', () => {
    let card: HaCard;

    beforeEach(() => {
      card = document.createElement('ha-card') as HaCard;
      document.body.appendChild(card);
    });

    afterEach(() => {
      document.body.removeChild(card);
    });

    it('should have default variant as default', () => {
      expect(card.variant).toBe('default');
    });

    it('should have default padding as md', () => {
      expect(card.padding).toBe('md');
    });

    it('should not be hoverable by default', () => {
      expect(card.hoverable).toBe(false);
    });

    it('should not be clickable by default', () => {
      expect(card.clickable).toBe(false);
    });

    it('should update variant property', () => {
      card.variant = 'elevated';
      expect(card.variant).toBe('elevated');
      expect(card.getAttribute('variant')).toBe('elevated');
    });

    it('should update padding property', () => {
      card.padding = 'lg';
      expect(card.padding).toBe('lg');
      expect(card.getAttribute('padding')).toBe('lg');
    });

    it('should update hoverable property', () => {
      card.hoverable = true;
      expect(card.hoverable).toBe(true);
      expect(card.hasAttribute('hoverable')).toBe(true);
    });

    it('should update clickable property', () => {
      card.clickable = true;
      expect(card.clickable).toBe(true);
      expect(card.hasAttribute('clickable')).toBe(true);
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.variant = 'default';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--default');

      document.body.removeChild(card);
    });

    it('should render outlined variant', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.variant = 'outlined';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--outlined');

      document.body.removeChild(card);
    });

    it('should render elevated variant', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.variant = 'elevated';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--elevated');

      document.body.removeChild(card);
    });
  });

  describe('Padding', () => {
    it('should render with none padding', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.padding = 'none';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--padding-none');

      document.body.removeChild(card);
    });

    it('should render with sm padding', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.padding = 'sm';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--padding-sm');

      document.body.removeChild(card);
    });

    it('should render with md padding', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.padding = 'md';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--padding-md');

      document.body.removeChild(card);
    });

    it('should render with lg padding', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.padding = 'lg';
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--padding-lg');

      document.body.removeChild(card);
    });
  });

  describe('Hoverable', () => {
    it('should not have hoverable class when hoverable is false', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.hoverable = false;
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).not.toContain('card--hoverable');

      document.body.removeChild(card);
    });

    it('should have hoverable class when hoverable is true', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.hoverable = true;
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--hoverable');

      document.body.removeChild(card);
    });
  });

  describe('Clickable', () => {
    it('should not have clickable class when clickable is false', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.clickable = false;
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).not.toContain('card--clickable');

      document.body.removeChild(card);
    });

    it('should have clickable class when clickable is true', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.clickable = true;
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--clickable');

      document.body.removeChild(card);
    });

    it('should emit card-click event when clicked and clickable is true', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.clickable = true;
      document.body.appendChild(card);

      const clickHandler = vi.fn();
      card.addEventListener('card-click', clickHandler);

      const cardElement = queryShadow(card, '.card') as HTMLElement;
      cardElement.click();

      expect(clickHandler).toHaveBeenCalled();

      document.body.removeChild(card);
    });

    it('should not emit card-click event when clicked and clickable is false', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.clickable = false;
      document.body.appendChild(card);

      const clickHandler = vi.fn();
      card.addEventListener('card-click', clickHandler);

      const cardElement = queryShadow(card, '.card') as HTMLElement;
      cardElement.click();

      expect(clickHandler).not.toHaveBeenCalled();

      document.body.removeChild(card);
    });
  });

  describe('Content', () => {
    it('should render body content', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.textContent = 'Card content';
      document.body.appendChild(card);

      expect(card.textContent).toContain('Card content');

      document.body.removeChild(card);
    });

    it('should render with media slot', () => {
      const card = document.createElement('ha-card') as HaCard;
      const mediaDiv = document.createElement('div');
      mediaDiv.setAttribute('slot', 'media');
      mediaDiv.textContent = 'Media content';
      card.appendChild(mediaDiv);
      document.body.appendChild(card);

      const mediaSlot = queryShadow(card, 'slot[name="media"]');
      expect(mediaSlot).not.toBeNull();

      document.body.removeChild(card);
    });

    it('should render with header slot', () => {
      const card = document.createElement('ha-card') as HaCard;
      const headerDiv = document.createElement('div');
      headerDiv.setAttribute('slot', 'header');
      headerDiv.textContent = 'Header content';
      card.appendChild(headerDiv);
      document.body.appendChild(card);

      const headerSlot = queryShadow(card, 'slot[name="header"]');
      expect(headerSlot).not.toBeNull();

      document.body.removeChild(card);
    });

    it('should render with footer slot', () => {
      const card = document.createElement('ha-card') as HaCard;
      const footerDiv = document.createElement('div');
      footerDiv.setAttribute('slot', 'footer');
      footerDiv.textContent = 'Footer content';
      card.appendChild(footerDiv);
      document.body.appendChild(card);

      const footerSlot = queryShadow(card, 'slot[name="footer"]');
      expect(footerSlot).not.toBeNull();

      document.body.removeChild(card);
    });
  });

  describe('Parts', () => {
    it('should expose parts for styling', () => {
      const card = document.createElement('ha-card') as HaCard;
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '[part="card"]');
      const mediaElement = queryShadow(card, '[part="media"]');
      const headerElement = queryShadow(card, '[part="header"]');
      const bodyElement = queryShadow(card, '[part="body"]');
      const footerElement = queryShadow(card, '[part="footer"]');

      expect(cardElement).not.toBeNull();
      expect(mediaElement).not.toBeNull();
      expect(headerElement).not.toBeNull();
      expect(bodyElement).not.toBeNull();
      expect(footerElement).not.toBeNull();

      document.body.removeChild(card);
    });
  });

  describe('Combined Properties', () => {
    it('should combine variant, padding, hoverable, and clickable classes', () => {
      const card = document.createElement('ha-card') as HaCard;
      card.variant = 'elevated';
      card.padding = 'lg';
      card.hoverable = true;
      card.clickable = true;
      document.body.appendChild(card);

      const cardElement = queryShadow(card, '.card');
      expect(cardElement?.className).toContain('card--elevated');
      expect(cardElement?.className).toContain('card--padding-lg');
      expect(cardElement?.className).toContain('card--hoverable');
      expect(cardElement?.className).toContain('card--clickable');

      document.body.removeChild(card);
    });
  });
});
