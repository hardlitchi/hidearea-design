// Custom Elements のポリフィル設定
// happy-dom は Custom Elements をサポートしているため、特別な設定は不要

// グローバル型定義の追加
import { expect } from 'vitest';

// カスタムマッチャーを追加する場合はここで定義
// 例: expect.extend({ toBeInTheDocument })

// Web Components の登録を待つヘルパー関数
export async function waitForCustomElement(tagName: string): Promise<void> {
  if (customElements.get(tagName)) {
    return;
  }

  await customElements.whenDefined(tagName);
}

// Shadow DOM 内の要素を取得するヘルパー関数
export function getShadowRoot(element: Element): ShadowRoot | null {
  return element.shadowRoot;
}

// Shadow DOM 内の要素をクエリするヘルパー関数
export function queryShadow(element: Element, selector: string): Element | null {
  const shadowRoot = getShadowRoot(element);
  return shadowRoot ? shadowRoot.querySelector(selector) : null;
}

// Shadow DOM 内の全要素をクエリするヘルパー関数
export function queryShadowAll(element: Element, selector: string): Element[] {
  const shadowRoot = getShadowRoot(element);
  return shadowRoot ? Array.from(shadowRoot.querySelectorAll(selector)) : [];
}
