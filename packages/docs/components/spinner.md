# Spinner

ローディングインジケーターコンポーネント。3つのバリアントと5つのサイズをサポートします。

## 基本的な使い方

```html
<ha-spinner></ha-spinner>
```

## バリアント

3種類のバリアントが利用可能です：

### Circular（円形）

```html
<ha-spinner variant="circular"></ha-spinner>
```

### Dots（ドット）

```html
<ha-spinner variant="dots"></ha-spinner>
```

### Pulse（パルス）

```html
<ha-spinner variant="pulse"></ha-spinner>
```

## サイズ

5種類のサイズが利用可能です：

```html
<ha-spinner size="xs"></ha-spinner>
<ha-spinner size="sm"></ha-spinner>
<ha-spinner size="md"></ha-spinner>
<ha-spinner size="lg"></ha-spinner>
<ha-spinner size="xl"></ha-spinner>
```

## カラー

```html
<ha-spinner color="primary"></ha-spinner>
<ha-spinner color="secondary"></ha-spinner>
<ha-spinner color="success"></ha-spinner>
<ha-spinner color="warning"></ha-spinner>
<ha-spinner color="error"></ha-spinner>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'circular' \| 'dots' \| 'pulse'` | `'circular'` | バリアント |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | サイズ |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | カラー |

## React

```tsx
import { Spinner } from '@hidearea-design/react';

function App() {
  return (
    <Spinner variant="circular" size="lg" color="primary" />
  );
}
```

## Vue

```vue
<template>
  <HaSpinner variant="circular" size="lg" color="primary" />
</template>

<script setup>
import { Spinner as HaSpinner } from '@hidearea-design/vue';
</script>
```

## 使用例

### ローディング状態

```tsx
import { Spinner, Card, Stack } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function DataLoader() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setData({ title: 'データ' });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Card>
        <Stack direction="vertical" gap="3" align="center">
          <Spinner size="lg" />
          <p>読み込み中...</p>
        </Stack>
      </Card>
    );
  }

  return (
    <Card>
      <h3>{data.title}</h3>
    </Card>
  );
}
```

### ボタンローディング

```tsx
import { Button, Spinner } from '@hidearea-design/react';
import { useState } from 'react';

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button variant="primary" onClick={handleClick} disabled={loading}>
      {loading && <Spinner size="sm" color="white" style={{ marginRight: '8px' }} />}
      {loading ? '処理中...' : '送信'}
    </Button>
  );
}
```

### ページローディング

```html
<div style="display: flex; align-items: center; justify-content: center; min-height: 400px;">
  <ha-stack direction="vertical" gap="3" align="center">
    <ha-spinner size="xl" variant="circular"></ha-spinner>
    <h3>ページを読み込み中...</h3>
  </ha-stack>
</div>
```

### カード内ローディング

```html
<ha-card>
  <ha-stack direction="vertical" gap="3" align="center" style="padding: 40px;">
    <ha-spinner variant="dots" size="lg"></ha-spinner>
    <p>データを取得中...</p>
  </ha-stack>
</ha-card>
```

### オーバーレイローディング

```tsx
import { Spinner } from '@hidearea-design/react';

function LoadingOverlay({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Spinner size="xl" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <LoadingOverlay loading={loading} />
      <button onClick={() => setLoading(!loading)}>
        ローディング切り替え
      </button>
    </>
  );
}
```

### インラインローディング

```html
<p>
  データを読み込み中
  <ha-spinner size="xs" variant="dots" style="margin-left: 8px; vertical-align: middle;"></ha-spinner>
</p>
```

### テーブルローディング

```tsx
import { Spinner, Stack } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

interface Data {
  id: number;
  name: string;
}

function DataTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { id: 1, name: 'アイテム1' },
        { id: 2, name: 'アイテム2' },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>名前</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={2} style={{ textAlign: 'center', padding: '40px' }}>
              <Stack direction="vertical" gap="2" align="center">
                <Spinner variant="circular" />
                <p>読み込み中...</p>
              </Stack>
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
```

### 複数スピナー

```html
<ha-stack direction="horizontal" gap="4" align="center">
  <ha-spinner variant="circular" size="sm"></ha-spinner>
  <ha-spinner variant="dots" size="sm"></ha-spinner>
  <ha-spinner variant="pulse" size="sm"></ha-spinner>
</ha-stack>
```

### カラーバリエーション

```html
<ha-stack direction="horizontal" gap="3">
  <ha-spinner color="primary"></ha-spinner>
  <ha-spinner color="success"></ha-spinner>
  <ha-spinner color="warning"></ha-spinner>
  <ha-spinner color="error"></ha-spinner>
</ha-stack>
```

### コンテンツ置き換え

```tsx
import { Spinner, Card, Button } from '@hidearea-design/react';
import { useState } from 'react';

function ContentLoader() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);

  const loadContent = () => {
    setLoading(true);
    setContent(null);

    setTimeout(() => {
      setContent('ここにコンテンツが表示されます。');
      setLoading(false);
    }, 2000);
  };

  return (
    <Card>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner variant="circular" size="lg" />
          <p style={{ marginTop: '16px' }}>読み込み中...</p>
        </div>
      ) : content ? (
        <div>
          <p>{content}</p>
          <Button variant="outline" onClick={loadContent}>
            再読み込み
          </Button>
        </div>
      ) : (
        <div>
          <p>コンテンツを読み込んでください。</p>
          <Button variant="primary" onClick={loadContent}>
            読み込む
          </Button>
        </div>
      )}
    </Card>
  );
}
```

## アクセシビリティ

- `role="status"` が自動的に設定されます
- `aria-label` を設定して目的を明示することを推奨します
- `aria-live="polite"` で状態変化を通知します

```html
<ha-spinner aria-label="ページを読み込み中"></ha-spinner>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-spinner {
  --spinner-color: var(--color-primary-500);
  --spinner-size: 40px;
  --spinner-border-width: 3px;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 特徴 |
|-----------|------|------|
| `circular` | 一般的なローディング | 円形アニメーション |
| `dots` | 軽量なローディング | ドットアニメーション |
| `pulse` | 控えめなローディング | パルスアニメーション |

## Progress との使い分け

- **Spinner を使用**: 処理時間が不明な場合、読み込み中
- **Progress を使用**: 処理の進捗が数値で表せる場合

```html
<!-- Spinner: 処理時間不明 -->
<ha-spinner></ha-spinner>

<!-- Progress: 進捗が分かる -->
<ha-progress value="50" max="100"></ha-progress>
```
