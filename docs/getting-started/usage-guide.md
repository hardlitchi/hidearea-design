# 使い方ガイド

hidearea-designデザインシステムの基本的な使い方を説明します。

## 目次

- [基本概念](#基本概念)
- [トークンの使用](#トークンの使用)
- [コンポーネントの使用](#コンポーネントの使用)
- [テーマのカスタマイズ](#テーマのカスタマイズ)
- [スタイルのオーバーライド](#スタイルのオーバーライド)

## 基本概念

hidearea-designは3層のアーキテクチャで構成されています：

```
┌─────────────────────────┐
│   アプリケーション       │
├─────────────────────────┤
│   Web Components        │ ← @hidearea-design/core
├─────────────────────────┤
│   Component Styles      │ ← @hidearea-design/tokens/styles
├─────────────────────────┤
│   Design Tokens         │ ← @hidearea-design/tokens
└─────────────────────────┘
```

### レイヤーの役割

1. **Design Tokens** - 色、サイズ、スペーシングなどの基本値
2. **Component Styles** - コンポーネント固有のスタイル定義
3. **Web Components** - ロジックとHTML構造

この分離により、スタイルを変更せずにロジックを変更したり、その逆が可能になります。

## トークンの使用

### CSSでトークンを使用

```css
.my-component {
  /* 色のトークン */
  color: var(--foreground-default);
  background: var(--background-default);

  /* スペーシングのトークン */
  padding: var(--spacing-4);
  margin: var(--spacing-2);

  /* タイポグラフィのトークン */
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-base);

  /* ボーダー半径 */
  border-radius: var(--radius-md);

  /* シャドウ */
  box-shadow: var(--shadow-md);
}
```

### JavaScriptでトークンを使用

```javascript
import { tokens } from '@hidearea-design/tokens';

// トークン値にアクセス
console.log(tokens.colors.primary.default);
console.log(tokens.spacing[4]);
console.log(tokens.typography.fontSize.base);
```

### 利用可能なトークンカテゴリ

- **colors** - ブランドカラー、セマンティックカラー
- **spacing** - マージン、パディング用の値
- **typography** - フォントサイズ、ウェイト、行の高さ
- **radius** - ボーダー半径
- **shadow** - ドロップシャドウ
- **animation** - アニメーション時間とイージング

詳細は [デザイントークンガイド](../guides/design-tokens.md) を参照してください。

## コンポーネントの使用

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    // トークンCSSをインポート
    import '@hidearea-design/tokens/css';

    // 使用するコンポーネントをインポート
    import '@hidearea-design/core/components/button';
    import '@hidearea-design/core/components/input';
    import '@hidearea-design/core/components/card';
  </script>
</head>
<body>
  <ha-card>
    <div slot="header">
      <h2>ログイン</h2>
    </div>

    <ha-input
      label="メールアドレス"
      type="email"
      required>
    </ha-input>

    <ha-input
      label="パスワード"
      type="password"
      required>
    </ha-input>

    <ha-button variant="primary" full-width>
      ログイン
    </ha-button>
  </ha-card>

  <script>
    // イベントリスナーの設定
    const button = document.querySelector('ha-button');
    button.addEventListener('click', () => {
      console.log('Button clicked!');
    });

    // 入力値の取得
    const inputs = document.querySelectorAll('ha-input');
    inputs.forEach(input => {
      input.addEventListener('ha-input', (e) => {
        console.log('Input value:', e.detail.value);
      });
    });
  </script>
</body>
</html>
```

### React

```tsx
import { useState } from 'react';
import '@hidearea-design/tokens/css';
import { Card, Input, Button } from '@hidearea-design/react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Submit:', { email, password });
  };

  return (
    <Card>
      <div slot="header">
        <h2>ログイン</h2>
      </div>

      <Input
        label="メールアドレス"
        type="email"
        value={email}
        onInput={(e) => setEmail(e.detail.value)}
        required
      />

      <Input
        label="パスワード"
        type="password"
        value={password}
        onInput={(e) => setPassword(e.detail.value)}
        required
      />

      <Button
        variant="primary"
        fullWidth
        onClick={handleSubmit}
      >
        ログイン
      </Button>
    </Card>
  );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { ref } from 'vue';
import '@hidearea-design/tokens/css';
import { HaCard, HaInput, HaButton } from '@hidearea-design/vue';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  console.log('Submit:', { email: email.value, password: password.value });
};
</script>

<template>
  <HaCard>
    <template #header>
      <h2>ログイン</h2>
    </template>

    <HaInput
      v-model="email"
      label="メールアドレス"
      type="email"
      required
    />

    <HaInput
      v-model="password"
      label="パスワード"
      type="password"
      required
    />

    <HaButton
      variant="primary"
      full-width
      @click="handleSubmit"
    >
      ログイン
    </HaButton>
  </HaCard>
</template>
```

## テーマのカスタマイズ

### ライト/ダークモードの切り替え

```javascript
import { setTheme, initTheme } from '@hidearea-design/core';

// ユーザーの設定を初期化（localStorage から読み込み）
initTheme();

// ライトモードに切り替え
setTheme('light');

// ダークモードに切り替え
setTheme('dark');

// システム設定に従う
setTheme('auto');
```

### カスタムテーマの作成

独自のテーマを作成するには、CSSカスタムプロパティをオーバーライドします：

```css
/* custom-theme.css */
:root {
  /* プライマリカラーのカスタマイズ */
  --primary-default: #ff6b35;
  --primary-hover: #ff8555;
  --primary-active: #e55a2e;

  /* フォントのカスタマイズ */
  --font-family-sans: 'Inter', sans-serif;
  --font-size-base: 16px;

  /* ボーダー半径のカスタマイズ */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
}

/* ダークモード用のカスタマイズ */
[data-theme="dark"] {
  --background-default: #1a1a1a;
  --foreground-default: #f5f5f5;
}
```

使用方法：

```html
<head>
  <link rel="stylesheet" href="node_modules/@hidearea-design/tokens/css" />
  <link rel="stylesheet" href="./custom-theme.css" />
</head>
```

## スタイルのオーバーライド

### CSS Parts を使用

多くのコンポーネントは CSS Parts を公開しており、外部から特定の部分をスタイリングできます：

```css
/* ボタンの内部要素をカスタマイズ */
ha-button::part(button) {
  border-radius: 20px;
  text-transform: uppercase;
}

/* インプットのラベルをカスタマイズ */
ha-input::part(label) {
  font-weight: 700;
  color: #333;
}

/* カードのヘッダーをカスタマイズ */
ha-card::part(header) {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
}
```

### CSS Variables を使用

コンポーネント固有のCSS変数を使用してスタイルを調整：

```css
ha-button {
  --button-padding-horizontal: 2rem;
  --button-padding-vertical: 1rem;
  --button-font-size: 18px;
}

ha-input {
  --input-border-radius: 8px;
  --input-border-width: 2px;
}
```

### ホストスタイリング

`:host` セレクタを使用して、コンポーネント自体のスタイルを変更：

```css
ha-card {
  display: block;
  max-width: 500px;
  margin: 2rem auto;
}

ha-button[variant="primary"] {
  width: 100%;
}
```

## ベストプラクティス

### 1. トークンを優先する

ハードコードされた値の代わりに、常にデザイントークンを使用：

```css
/* ❌ 悪い例 */
.my-button {
  background: #3b82f6;
  padding: 12px 24px;
  border-radius: 6px;
}

/* ✅ 良い例 */
.my-button {
  background: var(--primary-default);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-md);
}
```

### 2. セマンティックな命名

トークンは用途に基づいて選択：

```css
/* ❌ 悪い例 - 色名で選択 */
.error-message {
  color: var(--red-500);
}

/* ✅ 良い例 - セマンティックな名前 */
.error-message {
  color: var(--foreground-danger);
}
```

### 3. コンポーネントの段階的な読み込み

使用するコンポーネントのみをインポート：

```javascript
// ❌ 悪い例 - すべてをインポート
import '@hidearea-design/core';

// ✅ 良い例 - 必要なものだけ
import '@hidearea-design/core/components/button';
import '@hidearea-design/core/components/input';
```

### 4. アクセシビリティを忘れない

```html
<!-- ラベルを常に提供 -->
<ha-input label="メールアドレス" required></ha-input>

<!-- ARIA属性を適切に使用 -->
<ha-button aria-label="閉じる" icon-only>
  <ha-icon name="close"></ha-icon>
</ha-button>
```

## 次のステップ

- [実用例](../guides/examples.md) - 実際のユースケース
- [コンポーネントリファレンス](../api/README.md) - 全コンポーネントのAPI
- [アクセシビリティガイド](../guides/accessibility-guide.md) - アクセシブルな実装方法
- [デザイントークン](../guides/design-tokens.md) - トークンシステムの詳細
