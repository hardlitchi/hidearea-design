# Storybook Testing Guide

Hidearea Design SystemにおけるStorybookを使用した包括的なテスト戦略。ビジュアルリグレッションテストとインタラクションテストの実装ガイド。

## 目次

- [概要](#概要)
- [現在のテスト構成](#現在のテスト構成)
- [インタラクションテスト](#インタラクションテスト)
- [ビジュアルリグレッションテスト](#ビジュアルリグレッションテスト)
- [アクセシビリティテスト](#アクセシビリティテスト)
- [CI/CD統合](#cicd統合)
- [ベストプラクティス](#ベストプラクティス)

## 概要

### テスト戦略

Hidearea Design Systemは3層のテスト戦略を採用しています：

```
┌─────────────────────────────────────────┐
│  1. インタラクションテスト                │
│  - ユーザーイベントのシミュレーション      │
│  - 状態変化の検証                        │
│  - フォーム送信                          │
└─────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  2. ビジュアルリグレッションテスト        │
│  - スクリーンショット比較                │
│  - レスポンシブテスト                    │
│  - テーマバリアント                      │
└─────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  3. アクセシビリティテスト                │
│  - WCAG 2.1 AA準拠                      │
│  - コントラスト比                        │
│  - ARIAラベル                           │
└─────────────────────────────────────────┘
```

### 使用ツール

- **Storybook 10.1.10**: コンポーネントカタログ
- **@storybook/test**: インタラクションテスト
- **Playwright**: ビジュアルリグレッション
- **@storybook/addon-a11y**: アクセシビリティ検証

## 現在のテスト構成

### Storybook設定

**packages/storybook/.storybook/main.ts**

```typescript
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  core: {
    disableTelemetry: true,
  },
};

export default config;
```

### ストーリーの構造

**CSF 3形式（Component Story Format 3.0）**

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../core/src/components/button/button';

interface Args {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
  label: string;
}

const meta: Meta<Args> = {
  title: 'Components/Button',
  component: 'ha-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Button',
  },
  render: (args) => html`
    <ha-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}">
      ${args.label}
    </ha-button>
  `,
};
```

### 現在のカバレッジ

- **ストーリー数**: 37
- **コンポーネント数**: 25+
- **インタラクションテスト**: 0（未実装）
- **ビジュアルテスト**: 3コンポーネント（Button, Input, Modal）

## インタラクションテスト

### セットアップ

インタラクションテストを有効にするには、`@storybook/test`パッケージが必要です：

```bash
cd packages/storybook
pnpm add -D @storybook/test
```

### 基本パターン

#### パターン1: クリックイベントのテスト

```typescript
import { expect, userEvent, within } from '@storybook/test';

export const ClickableButton: Story = {
  args: {
    variant: 'primary',
    label: 'Click Me',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Find button', async () => {
      const button = canvas.getByText('Click Me');
      await expect(button).toBeInTheDocument();
    });

    await step('Click button', async () => {
      const button = canvas.getByText('Click Me');
      await userEvent.click(button);
    });

    await step('Verify click was registered', async () => {
      // カスタムイベントが発火されたことを確認
      // または状態変化を確認
    });
  },
};
```

#### パターン2: フォーム入力のテスト

```typescript
export const FormInput: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
  },
  render: (args) => html`
    <ha-input
      type="${args.type}"
      placeholder="${args.placeholder}"
      id="test-input">
    </ha-input>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Type in input field', async () => {
      const input = canvas.getByPlaceholderText('Enter your name');
      await userEvent.type(input, 'John Doe');
      await expect(input).toHaveValue('John Doe');
    });

    await step('Clear input field', async () => {
      const input = canvas.getByPlaceholderText('Enter your name');
      await userEvent.clear(input);
      await expect(input).toHaveValue('');
    });
  },
};
```

#### パターン3: モーダルの開閉テスト

```typescript
export const ModalInteraction: Story = {
  render: () => html`
    <ha-button id="open-modal">Open Modal</ha-button>
    <ha-modal id="test-modal">
      <h2 slot="header">Modal Title</h2>
      <p>Modal content</p>
      <ha-button slot="footer" id="close-modal">Close</ha-button>
    </ha-modal>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open modal', async () => {
      const openButton = canvas.getByText('Open Modal');
      await userEvent.click(openButton);

      // モーダルが表示されていることを確認
      const modal = canvasElement.querySelector('#test-modal');
      await expect(modal).toHaveAttribute('open');
    });

    await step('Close modal', async () => {
      const closeButton = canvas.getByText('Close');
      await userEvent.click(closeButton);

      // モーダルが閉じていることを確認
      const modal = canvasElement.querySelector('#test-modal');
      await expect(modal).not.toHaveAttribute('open');
    });
  },
};
```

#### パターン4: フォームバリデーションテスト

```typescript
export const FormValidation: Story = {
  render: () => html`
    <form id="test-form">
      <ha-form-group
        label="Email"
        error-text="Please enter a valid email">
        <ha-input
          type="email"
          name="email"
          required
          id="email-input">
        </ha-input>
      </ha-form-group>

      <ha-button type="submit">Submit</ha-button>
    </form>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submit empty form', async () => {
      const submitButton = canvas.getByText('Submit');
      await userEvent.click(submitButton);

      // バリデーションエラーが表示されることを確認
      const input = canvasElement.querySelector('#email-input');
      await expect(input).toHaveAttribute('error');
    });

    await step('Enter invalid email', async () => {
      const input = canvasElement.querySelector('#email-input');
      await userEvent.type(input as HTMLElement, 'invalid-email');

      const submitButton = canvas.getByText('Submit');
      await userEvent.click(submitButton);

      await expect(input).toHaveAttribute('error');
    });

    await step('Enter valid email', async () => {
      const input = canvasElement.querySelector('#email-input');
      await userEvent.clear(input as HTMLElement);
      await userEvent.type(input as HTMLElement, 'test@example.com');

      await expect(input).not.toHaveAttribute('error');
    });
  },
};
```

#### パターン5: タブ切り替えテスト

```typescript
export const TabsInteraction: Story = {
  render: () => html`
    <ha-tabs active="tab1" id="test-tabs">
      <ha-tab-item value="tab1">Tab 1</ha-tab-item>
      <ha-tab-item value="tab2">Tab 2</ha-tab-item>
      <ha-tab-item value="tab3">Tab 3</ha-tab-item>
    </ha-tabs>

    <ha-tab-panel value="tab1">Panel 1</ha-tab-panel>
    <ha-tab-panel value="tab2">Panel 2</ha-tab-panel>
    <ha-tab-panel value="tab3">Panel 3</ha-tab-panel>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Click second tab', async () => {
      const tab2 = canvas.getByText('Tab 2');
      await userEvent.click(tab2);

      const tabs = canvasElement.querySelector('#test-tabs');
      await expect(tabs).toHaveAttribute('active', 'tab2');
    });

    await step('Verify panel visibility', async () => {
      const panel1 = canvas.getByText('Panel 1');
      const panel2 = canvas.getByText('Panel 2');

      // Panel 2が表示され、Panel 1が非表示
      await expect(panel2).toBeVisible();
      await expect(panel1).not.toBeVisible();
    });
  },
};
```

### キーボードナビゲーションテスト

```typescript
export const KeyboardNavigation: Story = {
  render: () => html`
    <ha-tabs active="tab1">
      <ha-tab-item value="tab1">Tab 1</ha-tab-item>
      <ha-tab-item value="tab2">Tab 2</ha-tab-item>
      <ha-tab-item value="tab3">Tab 3</ha-tab-item>
    </ha-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Focus first tab', async () => {
      const tab1 = canvas.getByText('Tab 1');
      tab1.focus();
      await expect(tab1).toHaveFocus();
    });

    await step('Navigate with arrow keys', async () => {
      await userEvent.keyboard('{ArrowRight}');
      const tab2 = canvas.getByText('Tab 2');
      await expect(tab2).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      const tab3 = canvas.getByText('Tab 3');
      await expect(tab3).toHaveFocus();
    });

    await step('Navigate with Home/End keys', async () => {
      await userEvent.keyboard('{Home}');
      const tab1 = canvas.getByText('Tab 1');
      await expect(tab1).toHaveFocus();

      await userEvent.keyboard('{End}');
      const tab3 = canvas.getByText('Tab 3');
      await expect(tab3).toHaveFocus();
    });
  },
};
```

### テストランナーの実行

```bash
# インタラクションテストを実行
pnpm test-storybook

# 特定のストーリーをテスト
pnpm test-storybook --grep="Button.*Primary"

# ウォッチモード
pnpm test-storybook --watch
```

## ビジュアルリグレッションテスト

### 現在の構成

**packages/visual-tests/playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Tablet',
      use: { ...devices['iPad Pro'] },
    },
  ],

  webServer: {
    command: 'pnpm storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
  },
});
```

### ビジュアルテストの作成

#### 基本パターン

```typescript
import { test, expect } from '@playwright/test';

test.describe('Button Visual Tests', () => {
  test('should match primary button snapshot', async ({ page }) => {
    // ストーリーに移動
    await page.goto('/iframe.html?id=components-button--primary');

    // コンポーネントを取得
    const button = page.locator('ha-button');

    // スナップショットと比較
    await expect(button).toHaveScreenshot('button-primary.png');
  });

  test('should match all button variants', async ({ page }) => {
    const variants = ['primary', 'secondary', 'ghost', 'danger'];

    for (const variant of variants) {
      await page.goto(`/iframe.html?id=components-button--${variant}`);
      const button = page.locator('ha-button');
      await expect(button).toHaveScreenshot(`button-${variant}.png`);
    }
  });
});
```

#### レスポンシブテスト

```typescript
test.describe('Responsive Visual Tests', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`should match card layout on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/iframe.html?id=components-card--default');

      const card = page.locator('ha-card');
      await expect(card).toHaveScreenshot(`card-${viewport.name}.png`);
    });
  }
});
```

#### 状態テスト

```typescript
test.describe('Button State Visual Tests', () => {
  test('should match hover state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary');

    const button = page.locator('ha-button');

    // ホバー状態
    await button.hover();
    await expect(button).toHaveScreenshot('button-primary-hover.png');
  });

  test('should match focus state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary');

    const button = page.locator('ha-button');

    // フォーカス状態
    await button.focus();
    await expect(button).toHaveScreenshot('button-primary-focus.png');
  });

  test('should match disabled state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled');

    const button = page.locator('ha-button');
    await expect(button).toHaveScreenshot('button-disabled.png');
  });
});
```

#### テーマバリアントテスト

```typescript
test.describe('Theme Visual Tests', () => {
  const themes = ['light', 'dark'];

  for (const theme of themes) {
    test(`should match button in ${theme} theme`, async ({ page }) => {
      await page.goto('/iframe.html?id=components-button--primary');

      // テーマを切り替え
      await page.evaluate((theme) => {
        document.documentElement.setAttribute('data-theme', theme);
      }, theme);

      // レンダリング待機
      await page.waitForTimeout(100);

      const button = page.locator('ha-button');
      await expect(button).toHaveScreenshot(`button-${theme}.png`);
    });
  }
});
```

### ビジュアルテストの実行

```bash
# すべてのビジュアルテストを実行
pnpm test:visual

# 特定のブラウザのみ
pnpm test:visual --project=chromium

# スナップショットを更新
pnpm test:visual --update-snapshots

# UIモードで実行
pnpm test:visual --ui
```

## アクセシビリティテスト

### Storybook Addon A11y

**自動検証項目:**
- カラーコントラスト比（WCAG AA/AAA）
- 代替テキスト
- フォームラベル
- ARIA属性
- キーボードナビゲーション
- フォーカス管理

### ストーリーでのA11yテスト

```typescript
export const AccessibleButton: Story = {
  args: {
    variant: 'primary',
    label: 'Accessible Button',
  },
  parameters: {
    a11y: {
      // 特定のルールを無効化
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export const IconOnlyButton: Story = {
  render: () => html`
    <ha-button
      variant="primary"
      aria-label="Delete item">
      <ha-icon name="trash"></ha-icon>
    </ha-button>
  `,
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true, // ボタン名の検証を有効化
          },
        ],
      },
    },
  },
};
```

### Playwrightでのアクセシビリティテスト

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('should not have accessibility violations', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?id=components-modal--default');

    const modal = page.locator('ha-modal');

    // ARIA属性の検証
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
  });
});
```

## CI/CD統合

### GitHub Actions設定

**ビジュアルリグレッションワークフロー**

```yaml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Install dependencies
        run: pnpm install

      - name: Build packages
        run: pnpm build

      - name: Install Playwright
        run: pnpm --filter @hidearea-design/visual-tests exec playwright install --with-deps

      - name: Run visual tests
        run: pnpm --filter @hidearea-design/visual-tests test

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: packages/visual-tests/playwright-report/
          retention-days: 30

      - name: Upload test artifacts
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: packages/visual-tests/test-results/
          retention-days: 30
```

**インタラクションテストワークフロー**

```yaml
name: Storybook Interaction Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  interaction-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Install dependencies
        run: pnpm install

      - name: Build Storybook
        run: pnpm --filter @hidearea-design/storybook build-storybook --quiet

      - name: Run interaction tests
        run: pnpm --filter @hidearea-design/storybook test-storybook

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: storybook-test-results
          path: packages/storybook/test-results/
```

## ベストプラクティス

### インタラクションテスト

1. **ステップを明確に分割**
   ```typescript
   play: async ({ canvasElement, step }) => {
     await step('Setup', async () => {
       // セットアップ
     });

     await step('Execute action', async () => {
       // アクション実行
     });

     await step('Verify result', async () => {
       // 検証
     });
   },
   ```

2. **適切なセレクタを使用**
   ```typescript
   // ✓ Good: アクセシブルなセレクタ
   canvas.getByRole('button', { name: 'Submit' })
   canvas.getByLabelText('Email')
   canvas.getByText('Welcome')

   // ✗ Bad: 実装詳細に依存
   canvas.querySelector('#submit-btn')
   canvas.querySelector('.email-input')
   ```

3. **非同期処理を適切に待機**
   ```typescript
   await step('Wait for loading', async () => {
     await waitFor(() => {
       expect(canvas.queryByText('Loading...')).not.toBeInTheDocument();
     });
   });
   ```

### ビジュアルテスト

1. **安定したスナップショットを取得**
   ```typescript
   // アニメーション完了を待機
   await page.waitForTimeout(500);

   // フォント読み込みを待機
   await page.evaluate(() => document.fonts.ready);

   // ネットワーク待機
   await page.waitForLoadState('networkidle');
   ```

2. **意味のあるファイル名**
   ```typescript
   // ✓ Good
   await expect(button).toHaveScreenshot('button-primary-hover-light.png');

   // ✗ Bad
   await expect(button).toHaveScreenshot('test1.png');
   ```

3. **マスキングとクリッピング**
   ```typescript
   // 動的コンテンツをマスク
   await expect(page).toHaveScreenshot({
     mask: [page.locator('.timestamp')],
   });

   // 特定の要素のみスナップショット
   await expect(button).toHaveScreenshot({
     clip: { x: 0, y: 0, width: 200, height: 50 },
   });
   ```

### アクセシビリティテスト

1. **すべてのインタラクティブ要素を検証**
2. **キーボードナビゲーションを確認**
3. **スクリーンリーダーでテスト**
4. **カラーコントラストを検証**

## まとめ

Hidearea Design Systemのテスト戦略：

1. **インタラクションテスト**: ユーザー操作を自動化
2. **ビジュアルリグレッション**: UIの見た目を保護
3. **アクセシビリティ**: WCAG準拠を確保

これらを組み合わせることで、高品質なデザインシステムを維持できます。

### 次のステップ

- すべてのストーリーにインタラクションテストを追加
- ビジュアルテストのカバレッジを100%に
- CI/CDパイプラインを最適化
- テストレポートを改善

### 関連ドキュメント

- [Performance Testing Guide](./performance-testing.md)
- [Accessibility Guide](./accessibility-guide.md)
- [Component Pattern Recipes](./component-pattern-recipes.md)
