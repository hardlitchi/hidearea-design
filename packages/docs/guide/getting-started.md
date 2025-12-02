# クイックスタート

Hidearea Designを使い始めるための簡単なガイドです。

## インストール

お好みのパッケージマネージャーでインストールできます：

::: code-group

```bash [npm]
npm install @hidearea-design/core
```

```bash [pnpm]
pnpm add @hidearea-design/core
```

```bash [yarn]
yarn add @hidearea-design/core
```

:::

## 基本的な使い方

### Vanilla JavaScript / TypeScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>Hidearea Design Example</title>
</head>
<body>
  <ha-button variant="primary">クリック</ha-button>

  <script type="module">
    import '@hidearea-design/core';
  </script>
</body>
</html>
```

### React

Reactプロジェクトで使用する場合：

```bash
npm install @hidearea-design/react
```

```jsx
import { Button, Input, Card } from '@hidearea-design/react';

function App() {
  const [value, setValue] = useState('');

  return (
    <Card>
      <h2>サインアップ</h2>
      <Input
        placeholder="メールアドレス"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="primary">送信</Button>
    </Card>
  );
}
```

### Vue 3

Vueプロジェクトで使用する場合：

```bash
npm install @hidearea-design/vue
```

```vue
<template>
  <HaCard>
    <h2>サインアップ</h2>
    <HaInput
      v-model="email"
      placeholder="メールアドレス"
    />
    <HaButton variant="primary">送信</HaButton>
  </HaCard>
</template>

<script setup>
import { ref } from 'vue';
import { Card as HaCard, Input as HaInput, Button as HaButton } from '@hidearea-design/vue';

const email = ref('');
</script>
```

## CSS変数のインポート

デザイントークン（CSS変数）を使用する場合：

```js
import '@hidearea-design/tokens/build/css/variables.css';
```

または、個別にインポート：

```css
@import '@hidearea-design/tokens/build/css/variables.css';
```

## TypeScript サポート

TypeScriptプロジェクトでは、自動的に型定義が利用可能です：

```tsx
import type { ButtonProps } from '@hidearea-design/react';

const MyButton: React.FC<ButtonProps> = ({ variant, size, children }) => {
  return <Button variant={variant} size={size}>{children}</Button>;
};
```

## 次のステップ

- [デザイントークン](/guide/design-tokens) - デザインシステムの詳細
- [コンポーネント一覧](/components/overview) - 利用可能なコンポーネント
- [React ガイド](/guide/react) - React での詳細な使い方
- [Vue ガイド](/guide/vue) - Vue での詳細な使い方
