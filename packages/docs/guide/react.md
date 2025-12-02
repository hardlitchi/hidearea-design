# React ガイド

Hidearea DesignをReactプロジェクトで使用する方法を説明します。

## インストール

```bash
npm install @hidearea-design/react @hidearea-design/core
```

## 基本的な使い方

### コンポーネントのインポート

```jsx
import { Button, Input, Card } from '@hidearea-design/react';

function App() {
  return (
    <Card>
      <h2>サインアップ</h2>
      <Input placeholder="メールアドレス" />
      <Button variant="primary">送信</Button>
    </Card>
  );
}
```

### CSS変数の読み込み

`main.tsx` または `App.tsx` でCSS変数を読み込みます：

```tsx
import '@hidearea-design/tokens/build/css/variables.css';
```

## TypeScriptサポート

すべてのコンポーネントに完全な型定義があります：

```tsx
import type { ButtonProps } from '@hidearea-design/react';

const MyButton: React.FC<ButtonProps> = ({ variant = 'primary', children }) => {
  return <Button variant={variant}>{children}</Button>;
};
```

## イベントハンドリング

### フォームコンポーネント

```tsx
import { useState } from 'react';
import { Input, Button } from '@hidearea-design/react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
      />
      <Button type="submit" variant="primary">
        ログイン
      </Button>
    </form>
  );
}
```

### チェックボックスとラジオ

```tsx
import { Checkbox, Radio } from '@hidearea-design/react';

function PreferencesForm() {
  const [newsletter, setNewsletter] = useState(false);
  const [plan, setPlan] = useState('free');

  return (
    <>
      <Checkbox
        checked={newsletter}
        onChange={(e) => setNewsletter(e.target.checked)}
      >
        ニュースレターを受け取る
      </Checkbox>

      <Radio
        name="plan"
        value="free"
        checked={plan === 'free'}
        onChange={(e) => setPlan(e.target.value)}
      >
        無料プラン
      </Radio>
      <Radio
        name="plan"
        value="pro"
        checked={plan === 'pro'}
        onChange={(e) => setPlan(e.target.value)}
      >
        プロプラン
      </Radio>
    </>
  );
}
```

## レイアウトコンポーネント

### Container、Grid、Stack

```tsx
import { Container, Grid, Stack } from '@hidearea-design/react';

function Layout() {
  return (
    <Container maxWidth="lg">
      <Stack direction="vertical" gap="4">
        <h1>タイトル</h1>

        <Grid columns="3" gap="4">
          <Card>カード1</Card>
          <Card>カード2</Card>
          <Card>カード3</Card>
        </Grid>
      </Stack>
    </Container>
  );
}
```

## ナビゲーションコンポーネント

### Tooltip

```tsx
import { Tooltip, Button } from '@hidearea-design/react';

function TooltipExample() {
  return (
    <Tooltip content="ボタンをクリックしてください" placement="top">
      <Button>ホバーしてください</Button>
    </Tooltip>
  );
}
```

### Tabs

```tsx
import { Tabs } from '@hidearea-design/react';

function TabsExample() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <ha-tab-item value="tab1">タブ1</ha-tab-item>
      <ha-tab-item value="tab2">タブ2</ha-tab-item>
      <ha-tab-item value="tab3">タブ3</ha-tab-item>

      <ha-tab-panel value="tab1">
        タブ1のコンテンツ
      </ha-tab-panel>
      <ha-tab-panel value="tab2">
        タブ2のコンテンツ
      </ha-tab-panel>
      <ha-tab-panel value="tab3">
        タブ3のコンテンツ
      </ha-tab-panel>
    </Tabs>
  );
}
```

### Menu/Dropdown

```tsx
import { Dropdown, Menu, MenuItem } from '@hidearea-design/react';

function MenuExample() {
  const handleItemClick = (value: string) => {
    console.log('Clicked:', value);
  };

  return (
    <Dropdown placement="bottom-start">
      <Button slot="trigger">メニュー</Button>

      <Menu onItemClick={handleItemClick}>
        <MenuItem value="edit">編集</MenuItem>
        <MenuItem value="delete" danger>削除</MenuItem>
      </Menu>
    </Dropdown>
  );
}
```

## フィードバックコンポーネント

### Alert

```tsx
import { Alert } from '@hidearea-design/react';

function Alerts() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          closable
          onClose={() => setShowAlert(false)}
        >
          操作が成功しました
        </Alert>
      )}
    </>
  );
}
```

### Progress と Spinner

```tsx
import { Progress, Spinner } from '@hidearea-design/react';

function LoadingStates() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Progress value={progress} max={100} showLabel />

      {loading && <Spinner size="lg" />}
    </>
  );
}
```

## カスタムフック

Web ComponentsのライフサイクルをReactで扱う場合：

```tsx
import { useRef, useEffect } from 'react';

function useWebComponent<T extends HTMLElement>(
  callback: (element: T) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      callback(ref.current);
    }
  }, [callback]);

  return ref;
}

// 使用例
function Example() {
  const tooltipRef = useWebComponent<HaTooltipElement>((el) => {
    el.addEventListener('show', () => console.log('Tooltip shown'));
  });

  return <ha-tooltip ref={tooltipRef}>...</ha-tooltip>;
}
```

## Next.js での使用

Next.js（App Router）で使用する場合、クライアントコンポーネントとして指定：

```tsx
'use client';

import { Button } from '@hidearea-design/react';

export default function MyComponent() {
  return <Button variant="primary">Click me</Button>;
}
```

## Vite での設定

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@hidearea-design/core']
  }
});
```

## トラブルシューティング

### Web Components が認識されない

TypeScriptで`ha-*`要素が認識されない場合、`vite-env.d.ts`に追加：

```ts
/// <reference types="vite/client" />
/// <reference types="@hidearea-design/core" />
```

### スタイルが適用されない

CSS変数が読み込まれているか確認：

```tsx
import '@hidearea-design/tokens/build/css/variables.css';
```
