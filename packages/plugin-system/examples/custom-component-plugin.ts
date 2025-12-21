/**
 * カスタムコンポーネントプラグインの例
 *
 * このプラグインは新しいカスタムコンポーネント "ha-rating" を追加します
 */

import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { createPlugin } from '../src/index.js';

/**
 * 評価（星）コンポーネント
 */
class RatingComponent extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 5;
  @property({ type: Boolean }) readonly = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    .rating {
      display: flex;
      gap: 4px;
    }

    .star {
      font-size: 24px;
      cursor: pointer;
      color: var(--ha-color-border-primary, #ccc);
      transition: color 0.2s;
      user-select: none;
    }

    .star.filled {
      color: var(--ha-color-warning, #fbbf24);
    }

    .star.readonly {
      cursor: default;
    }

    .star:not(.readonly):hover {
      color: var(--ha-color-warning, #fbbf24);
      opacity: 0.8;
    }
  `;

  render() {
    return html`
      <div class="rating">
        ${Array.from({ length: this.max }, (_, i) => i + 1).map(
          star => html`
            <span
              class="star ${star <= this.value ? 'filled' : ''} ${this.readonly ? 'readonly' : ''}"
              @click="${() => !this.readonly && this.handleClick(star)}"
            >
              ${star <= this.value ? '★' : '☆'}
            </span>
          `
        )}
      </div>
    `;
  }

  private handleClick(value: number): void {
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

/**
 * 評価コンポーネントプラグイン
 */
export const ratingPlugin = createPlugin({
  metadata: {
    id: 'rating-component',
    name: 'Rating Component Plugin',
    version: '1.0.0',
    description: '5つ星評価コンポーネントを追加',
    author: 'Hidearea Design System',
  },

  install(context) {
    // コンポーネントを登録
    context.registerComponent('ha-rating', RatingComponent as unknown as CustomElementConstructor);

    context.logger.info('Rating component registered as <ha-rating>');
  },

  onActivate(context) {
    context.logger.info('Rating component plugin activated');
  },

  onDeactivate(context) {
    context.logger.info('Rating component plugin deactivated');
  },
});
