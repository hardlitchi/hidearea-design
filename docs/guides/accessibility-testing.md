# アクセシビリティテストガイド

このガイドでは、hidearea-designコンポーネントのアクセシビリティテストの書き方と実行方法について説明します。

## 概要

hidearea-designは、すべてのコンポーネントでWCAG 2.1 AA準拠を目指しています。アクセシビリティテストには以下のツールを使用しています：

- **axe-core**: 自動アクセシビリティテスト
- **Vitest**: ユニットテストフレームワーク
- **happy-dom**: テスト用DOM環境
- **Storybook addon-a11y**: ビジュアルアクセシビリティチェック

## テストユーティリティ

`packages/core/src/test-utils/accessibility.ts` に、アクセシビリティテスト用のユーティリティ関数が用意されています。

### expectNoA11yViolations()

axe-coreを使用して要素にアクセシビリティ違反がないことを確認します。

```typescript
import { expectNoA11yViolations } from '../../test-utils/accessibility';

it('should have no accessibility violations', async () => {
  const button = document.createElement('ha-button');
  button.textContent = 'Click me';
  document.body.appendChild(button);

  await expectNoA11yViolations(button);

  document.body.removeChild(button);
});
```

### testA11y()

axe-coreを実行して結果を返します（エラーをスローしません）。

```typescript
import { testA11y } from '../../test-utils/accessibility';

it('should return accessibility results', async () => {
  const element = document.createElement('ha-button');
  document.body.appendChild(element);

  const results = await testA11y(element);

  console.log(`Found ${results.violations.length} violations`);
  console.log(`Passed ${results.passes.length} rules`);

  document.body.removeChild(element);
});
```

### カスタムルール設定

特定のルールを無効化したり、カスタム設定を行うことができます：

```typescript
await expectNoA11yViolations(element, {
  disabledRules: ['color-contrast'], // 色のコントラストチェックを無効化
});

// または、より詳細な設定
await testA11y(element, {
  rules: {
    'color-contrast': { enabled: false },
    'aria-required-children': { enabled: true },
  },
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa'],
  },
});
```

## その他のユーティリティ関数

### ARIA属性の検証

```typescript
import { hasValidAriaAttributes } from '../../test-utils/accessibility';

const { valid, errors } = hasValidAriaAttributes(element);

if (!valid) {
  console.error('ARIA attribute errors:', errors);
}
```

### キーボードアクセシビリティ

```typescript
import { isKeyboardAccessible } from '../../test-utils/accessibility';

const accessible = isKeyboardAccessible(element);
expect(accessible).toBe(true);
```

### アクセシブルネーム

```typescript
import { hasAccessibleName } from '../../test-utils/accessibility';

const hasName = hasAccessibleName(element);
expect(hasName).toBe(true);
```

### 色のコントラスト比

```typescript
import { getContrastRatio, meetsContrastAA, meetsContrastAAA } from '../../test-utils/accessibility';

const ratio = getContrastRatio('#000000', '#ffffff');
console.log(`Contrast ratio: ${ratio}`); // 21

const meetsAA = meetsContrastAA('#666666', '#ffffff');
expect(meetsAA).toBe(true);
```

### フォーカス可能な要素の取得

```typescript
import { getFocusableElements } from '../../test-utils/accessibility';

const focusableElements = getFocusableElements(container);
expect(focusableElements.length).toBeGreaterThan(0);
```

### キーボードイベントのシミュレーション

```typescript
import { simulateKeyPress } from '../../test-utils/accessibility';

simulateKeyPress(element, 'Enter');
simulateKeyPress(element, 'Space');
simulateKeyPress(element, 'ArrowDown', { shiftKey: true });
```

## コンポーネントテストの例

### Button コンポーネント

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { expectNoA11yViolations } from '../../test-utils/accessibility';
import { HaButton } from './button';

describe('HaButton - Accessibility', () => {
  let button: HaButton;

  beforeEach(() => {
    button = document.createElement('ha-button') as HaButton;
    button.textContent = 'Click me';
  });

  afterEach(() => {
    if (button.parentNode) {
      button.parentNode.removeChild(button);
    }
  });

  it('should have no accessibility violations (default state)', async () => {
    document.body.appendChild(button);
    await expectNoA11yViolations(button);
  });

  it('should have no accessibility violations (all variants)', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;

    for (const variant of variants) {
      button.variant = variant;
      document.body.appendChild(button);
      await expectNoA11yViolations(button);
      document.body.removeChild(button);
    }
  });

  it('should have no accessibility violations (disabled state)', async () => {
    button.disabled = true;
    document.body.appendChild(button);
    await expectNoA11yViolations(button);
  });

  it('should be keyboard accessible', () => {
    document.body.appendChild(button);
    expect(button.tabIndex).toBeGreaterThanOrEqual(0);
  });

  it('should have accessible name', () => {
    document.body.appendChild(button);
    expect(button.textContent?.trim()).toBe('Click me');
  });

  it('should indicate disabled state to assistive technology', () => {
    button.disabled = true;
    document.body.appendChild(button);

    const shadowButton = button.shadowRoot?.querySelector('button');
    expect(shadowButton?.hasAttribute('disabled')).toBe(true);
    expect(shadowButton?.getAttribute('aria-disabled')).toBe('true');
  });
});
```

### Input コンポーネント

```typescript
describe('HaInput - Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const input = document.createElement('ha-input');
    input.setAttribute('label', 'Email');
    input.setAttribute('type', 'email');
    document.body.appendChild(input);

    await expectNoA11yViolations(input);

    document.body.removeChild(input);
  });

  it('should associate label with input', () => {
    const input = document.createElement('ha-input');
    input.setAttribute('label', 'Email');
    document.body.appendChild(input);

    const shadowLabel = input.shadowRoot?.querySelector('label');
    const shadowInput = input.shadowRoot?.querySelector('input');

    expect(shadowLabel?.getAttribute('for')).toBe(shadowInput?.id);

    document.body.removeChild(input);
  });

  it('should indicate required fields', () => {
    const input = document.createElement('ha-input');
    input.setAttribute('required', '');
    document.body.appendChild(input);

    const shadowInput = input.shadowRoot?.querySelector('input');
    expect(shadowInput?.hasAttribute('required')).toBe(true);
    expect(shadowInput?.getAttribute('aria-required')).toBe('true');

    document.body.removeChild(input);
  });

  it('should announce validation errors', () => {
    const input = document.createElement('ha-input');
    input.setAttribute('error', 'Invalid email');
    document.body.appendChild(input);

    const shadowInput = input.shadowRoot?.querySelector('input');
    const errorMessage = input.shadowRoot?.querySelector('.error-message');

    expect(shadowInput?.getAttribute('aria-invalid')).toBe('true');
    expect(shadowInput?.getAttribute('aria-describedby')).toBe(errorMessage?.id);

    document.body.removeChild(input);
  });
});
```

## テストの実行

### すべてのテストを実行

```bash
pnpm test
```

### 特定のコンポーネントのテストを実行

```bash
pnpm test button
```

### カバレッジレポートを生成

```bash
pnpm test:coverage
```

### ウォッチモードで実行

```bash
pnpm test --watch
```

## Storybookでのアクセシビリティチェック

Storybookには`@storybook/addon-a11y`が統合されています。

1. Storybookを起動:
```bash
pnpm --filter @hidearea-design/storybook dev
```

2. ブラウザで http://localhost:6006 を開く

3. 任意のストーリーを選択

4. "Accessibility" タブをクリックして違反を確認

## ベストプラクティス

### 1. すべての状態をテスト

コンポーネントのすべての状態（デフォルト、ホバー、フォーカス、無効化、エラーなど）でアクセシビリティテストを実行してください。

```typescript
const states = [
  { name: 'default', setup: () => {} },
  { name: 'disabled', setup: (el) => { el.disabled = true } },
  { name: 'error', setup: (el) => { el.error = 'Error message' } },
];

for (const state of states) {
  it(`should have no violations (${state.name})`, async () => {
    const element = createElement();
    state.setup(element);
    document.body.appendChild(element);

    await expectNoA11yViolations(element);

    document.body.removeChild(element);
  });
}
```

### 2. ARIA属性の適切な使用

- ネイティブHTML要素を優先する
- ARIA属性は必要な場合のみ使用
- `aria-label`、`aria-labelledby`、`aria-describedby`を適切に設定

### 3. キーボードナビゲーション

すべてのインタラクティブ要素がキーボードでアクセス可能であることを確認：

```typescript
it('should be keyboard accessible', () => {
  // Enterキーでアクション実行
  simulateKeyPress(element, 'Enter');
  expect(actionCallback).toHaveBeenCalled();

  // Spaceキーでアクション実行
  simulateKeyPress(element, 'Space');
  expect(actionCallback).toHaveBeenCalled();

  // Escapeキーでダイアログクローズ
  simulateKeyPress(dialog, 'Escape');
  expect(dialog.open).toBe(false);
});
```

### 4. フォーカス管理

- フォーカスの可視化
- フォーカストラップ（モーダル、ドロワー）
- フォーカスの復元

```typescript
it('should trap focus in modal', () => {
  const modal = document.createElement('ha-modal');
  modal.open = true;
  document.body.appendChild(modal);

  const focusableElements = getFocusableElements(modal);
  expect(focusableElements.length).toBeGreaterThan(0);

  // 最初の要素にフォーカス
  focusableElements[0].focus();
  expect(document.activeElement).toBe(focusableElements[0]);

  document.body.removeChild(modal);
});
```

### 5. 色のコントラスト

```typescript
it('should meet color contrast requirements', () => {
  const element = document.createElement('ha-button');
  element.variant = 'primary';
  document.body.appendChild(element);

  const button = element.shadowRoot?.querySelector('button');
  const styles = window.getComputedStyle(button!);

  const fg = styles.color;
  const bg = styles.backgroundColor;

  expect(meetsContrastAA(fg, bg)).toBe(true);

  document.body.removeChild(element);
});
```

## よくある問題と解決方法

### color-contrast 違反

**問題:** 背景色とテキスト色のコントラスト比が不十分

**解決:**
- WCAG AA: 通常テキスト 4.5:1、大きいテキスト 3:1
- WCAG AAA: 通常テキスト 7:1、大きいテキスト 4.5:1

### aria-required-children 違反

**問題:** ARIA ロールに必要な子要素が不足

**解決:**
```typescript
// NG: <div role="list"></div>
// OK:
<div role="list">
  <div role="listitem">Item 1</div>
  <div role="listitem">Item 2</div>
</div>
```

### label 違反

**問題:** フォーム要素にラベルがない

**解決:**
```typescript
// NG: <input />
// OK:
<label for="email">Email</label>
<input id="email" />

// または
<input aria-label="Email" />
```

### button-name 違反

**問題:** ボタンにアクセシブルネームがない

**解決:**
```typescript
// NG: <button><icon /></button>
// OK:
<button aria-label="Close">
  <icon />
</button>

// または
<button>
  <icon />
  <span>Close</span>
</button>
```

## 参考リンク

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## CI/CDでの自動化

GitHub Actionsで自動的にアクセシビリティテストを実行：

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm test -- --run
        env:
          CI: true

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## まとめ

アクセシビリティは、すべてのユーザーにとって重要な機能です。継続的にテストを実行し、改善を続けることで、より包括的なコンポーネントライブラリを構築できます。
