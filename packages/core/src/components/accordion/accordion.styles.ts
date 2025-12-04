export const accordionStyles = `
  :host {
    display: block;
    box-sizing: border-box;
    --ha-accordion-border-color: var(--ha-color-neutral-3, #e5e5e5);
    --ha-accordion-item-padding: var(--ha-spacing-4, 1rem);
    --ha-accordion-header-bg: var(--ha-color-neutral-1, #ffffff);
    --ha-accordion-header-hover-bg: var(--ha-color-neutral-2, #f5f5f5);
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .accordion {
    border: 1px solid var(--ha-accordion-border-color);
    border-radius: var(--ha-border-radius-base, 4px);
    overflow: hidden;
    background-color: var(--ha-accordion-header-bg);
  }

  .accordion-item {
    border-bottom: 1px solid var(--ha-accordion-border-color);
  }

  .accordion-item:last-child {
    border-bottom: none;
  }

  .accordion-item__header {
    width: 100%;
    padding: var(--ha-accordion-item-padding);
    background-color: var(--ha-accordion-header-bg);
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: var(--ha-font-size-base, 1rem);
    font-weight: var(--ha-font-weight-medium, 500);
    color: var(--ha-color-neutral-9, #333);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color var(--ha-transition-duration-base, 0.2s) var(--ha-transition-timing-ease, ease);

    /* ボタン要素のリセット */
    margin: 0;
    font-family: inherit;
    -webkit-appearance: none;
    appearance: none;
  }

  .accordion-item__header:hover:not(:disabled) {
    background-color: var(--ha-accordion-header-hover-bg);
  }

  /* アクセシビリティ: キーボード操作時のフォーカス表示 */
  .accordion-item__header:focus-visible {
    outline: 2px solid var(--ha-color-primary-1, #005fcc);
    outline-offset: -2px;
    z-index: 1;
  }

  .accordion-item__header:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .accordion-item__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    margin-left: var(--ha-spacing-2, 0.5rem);
    transition: transform var(--ha-transition-duration-base, 0.2s) var(--ha-transition-timing-ease, ease);
    font-size: 0.75em;
    flex-shrink: 0; /* テキストが長くてもアイコンを潰さない */
  }

  .accordion-item--open .accordion-item__icon {
    transform: rotate(180deg);
  }

  .accordion-item__content {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--ha-transition-duration-slow, 0.3s) var(--ha-transition-timing-ease, ease);
    will-change: max-height; /* パフォーマンス最適化 */
  }

  /* コンテンツ内のスロット要素へのスタイル */
  .accordion-item__content > ::slotted(*) {
    padding: var(--ha-accordion-item-padding);
    margin: 0; /* 意図しない余白の重複を防ぐ */
    display: block;
  }

  .accordion-item--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
