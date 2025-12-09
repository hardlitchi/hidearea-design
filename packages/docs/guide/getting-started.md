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

## ダークモード

Hidearea Designは自動的にダークモードをサポートします：

```html
<!-- Vanilla JS -->
<script type="module">
  import { setTheme, getTheme, toggleTheme } from '@hidearea-design/core';

  // テーマ設定（'light' | 'dark' | 'auto'）
  setTheme('dark');

  // 現在のテーマ取得
  console.log(getTheme()); // 'dark'

  // テーマ切り替え
  toggleTheme();
</script>
```

### React

```tsx
import { useTheme } from '@hidearea-design/react';

function ThemeToggle() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      現在: {theme}
    </Button>
  );
}
```

### Vue

```vue
<template>
  <HaButton @click="toggleTheme">
    現在: {{ theme }}
  </HaButton>
</template>

<script setup>
import { useTheme } from '@hidearea-design/vue';
import { Button as HaButton } from '@hidearea-design/vue';

const { theme, setTheme, toggleTheme } = useTheme();
</script>
```

## よくある使用例

### ログインフォーム

```jsx
import { Button, Input, Card, FormGroup } from '@hidearea-design/react';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ログイン処理...
    setLoading(false);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>ログイン</h2>

        <FormGroup label="メールアドレス" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
        </FormGroup>

        <FormGroup label="パスワード" required>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
        >
          ログイン
        </Button>
      </form>
    </Card>
  );
}
```

### データテーブル

```jsx
import { Table, Badge, Button } from '@hidearea-design/react';

function UserTable({ users }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>名前</th>
          <th>メール</th>
          <th>ステータス</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <Badge variant={user.active ? 'success' : 'default'}>
                {user.active ? 'アクティブ' : '非アクティブ'}
              </Badge>
            </td>
            <td>
              <Button size="sm" variant="outline">編集</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
```

## トラブルシューティング

### Web Componentsが認識されない

**問題**: `<ha-button>` などの要素が認識されない

**解決策**:
```js
// Web Componentsを確実にインポート
import '@hidearea-design/core';

// または特定のコンポーネントのみ
import '@hidearea-design/core/components/button';
```

### TypeScript型定義が見つからない

**問題**: TypeScriptで型エラーが出る

**解決策**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@hidearea-design/react"],
    "moduleResolution": "bundler"
  }
}
```

### ReactでWeb Componentsが正しく動作しない

**問題**: プロパティが正しく設定されない

**解決策**: Reactラッパーを使用してください：
```jsx
// ❌ 直接使用（動作しない可能性）
<ha-button variant="primary">クリック</ha-button>

// ✅ Reactラッパー使用
import { Button } from '@hidearea-design/react';
<Button variant="primary">クリック</Button>
```

### スタイルが適用されない

**問題**: コンポーネントのスタイルが表示されない

**解決策**:
```js
// デザイントークンをインポート
import '@hidearea-design/tokens/build/css/variables.css';

// コンポーネントライブラリをインポート
import '@hidearea-design/core';
```

### Viteでビルドエラーが出る

**問題**: `Cannot find module` エラー

**解決策**:
```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['@hidearea-design/core', '@hidearea-design/react']
  }
}
```

### SSR環境での使用

**問題**: Next.jsやNuxtでエラーが出る

**解決策**:
```jsx
// Next.js - dynamic import使用
import dynamic from 'next/dynamic';

const Button = dynamic(
  () => import('@hidearea-design/react').then(mod => mod.Button),
  { ssr: false }
);
```

## パフォーマンス最適化

### Tree Shaking

個別にコンポーネントをインポートしてバンドルサイズを削減：

```js
// ❌ 全てインポート（大きい）
import { Button, Input, Card, ... } from '@hidearea-design/react';

// ✅ 必要なものだけインポート（小さい）
import { Button } from '@hidearea-design/react/Button';
import { Input } from '@hidearea-design/react/Input';
```

### 遅延ロード

使用するまでコンポーネントをロードしない：

```jsx
// React
const Modal = lazy(() => import('@hidearea-design/react').then(m => ({ default: m.Modal })));

// Vue
const Modal = defineAsyncComponent(() =>
  import('@hidearea-design/vue').then(m => m.Modal)
);
```

## 次のステップ

- [デザイントークン](/guide/design-tokens) - デザインシステムの詳細
- [React ガイド](/guide/react) - React での詳細な使い方
- [Vue ガイド](/guide/vue) - Vue での詳細な使い方
- [Button コンポーネント](/components/button) - 最もよく使われるコンポーネント
- [Input コンポーネント](/components/input) - フォーム入力コンポーネント
