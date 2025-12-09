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

Spinner コンポーネントは WCAG 2.1 AA 基準に準拠し、すべてのユーザーが読み込み状態を認識できるようにします。

### ARIAサポート

Spinner コンポーネントは WAI-ARIA のステータスパターンに準拠しており、以下のARIA属性をサポートします：

```html
<ha-spinner
  role="status"
  aria-label="ページを読み込み中"
  aria-live="polite"
  aria-busy="true"
></ha-spinner>
```

| ARIA属性 | 説明 | 設定値 |
|---------|------|-------|
| `role` | ローディング状態を示す役割 | `status` (自動設定) |
| `aria-label` | ローディングの目的を説明 | 必須：処理内容を明示 |
| `aria-live` | 状態変化の通知レベル | `polite` (自動設定) |
| `aria-busy` | 処理中状態を示す | `true` (推奨) |
| `aria-hidden` | 装飾用スピナーを非表示 | `true` (装飾用のみ) |

### キーボード操作

スピナーは視覚的なインジケーターであり、キーボード操作は提供されません。フォーカスを受け取らず、スクリーンリーダーによる読み上げに対応しています。

### スクリーンリーダー

スクリーンリーダーは以下のように読み上げます：

```html
<!-- 基本的な読み込み -->
<ha-spinner aria-label="データを読み込み中"></ha-spinner>
```

**読み上げ例**：「データを読み込み中」

```html
<!-- ボタン内のローディング -->
<ha-button disabled>
  <ha-spinner size="sm" aria-label="送信中"></ha-spinner>
  送信中...
</ha-button>
```

**読み上げ例**：「送信中... ボタン 無効」

```html
<!-- 装飾用スピナー（テキストで説明済み） -->
<div>
  <ha-spinner aria-hidden="true"></ha-spinner>
  <span role="status" aria-live="polite">ページを読み込み中...</span>
</div>
```

**読み上げ例**：「ページを読み込み中...」

### フォーカス管理

スピナー表示時は、関連するコンテンツやボタンを適切に無効化し、ユーザーの操作を制限してください：

```tsx
import { Spinner, Button, Stack } from '@hidearea-design/react';
import { useState } from 'react';

function AccessibleLoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleSubmit}
      disabled={loading}
      aria-busy={loading}
    >
      {loading && (
        <Spinner
          size="sm"
          aria-label="データを送信中"
          style={{ marginRight: '8px' }}
        />
      )}
      {loading ? '送信中...' : '送信'}
    </Button>
  );
}
```

### ライブリージョンの使用

ローディング状態の変化をスクリーンリーダーに通知するには、適切なライブリージョンを使用します：

```tsx
import { Spinner, Card } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function AccessibleDataLoader() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('データを読み込み中...');

  useEffect(() => {
    if (loading) {
      setStatusMessage('データを読み込み中...');
    } else if (data) {
      setStatusMessage('データの読み込みが完了しました');
    }
  }, [loading, data]);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return (
    <Card>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner size="lg" aria-label="データを読み込み中" />
          <p>{statusMessage}</p>
        </div>
      ) : (
        <div>
          <h3>{data.title}</h3>
          <p>{data.content}</p>
        </div>
      )}
      {/* スクリーンリーダー用の状態通知 */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', left: '-10000px' }}
      >
        {statusMessage}
      </div>
    </Card>
  );
}
```

### 装飾用スピナー

テキストで十分な説明がある場合、スピナーを装飾として扱い、スクリーンリーダーから隠すことができます：

```tsx
import { Spinner } from '@hidearea-design/react';

function DecorativeSpinner() {
  return (
    <div>
      {/* スピナーは装飾用として非表示 */}
      <Spinner aria-hidden="true" />
      {/* テキストで状態を説明 */}
      <p role="status" aria-live="polite">
        データを読み込み中です。しばらくお待ちください。
      </p>
    </div>
  );
}
```

### タイムアウトと代替手段の提供

長時間のローディングには、タイムアウトやキャンセルオプションを提供してください：

```tsx
import { Spinner, Button, Stack, Alert } from '@hidearea-design/react';
import { useState, useEffect, useRef } from 'react';

function LoadingWithTimeout() {
  const [loading, setLoading] = useState(false);
  const [timeout, setTimeout] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const startLoading = () => {
    setLoading(true);
    setTimeout(false);

    // 30秒後にタイムアウト
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setTimeout(true);
    }, 30000);
  };

  const cancel = () => {
    setLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div>
      {loading ? (
        <Stack direction="vertical" gap="3" align="center">
          <Spinner size="lg" aria-label="データを読み込み中" />
          <p>データを読み込み中...</p>
          <Button variant="outline" onClick={cancel}>
            キャンセル
          </Button>
        </Stack>
      ) : timeout ? (
        <Alert variant="error">
          読み込みがタイムアウトしました。もう一度お試しください。
        </Alert>
      ) : (
        <Button variant="primary" onClick={startLoading}>
          読み込む
        </Button>
      )}
    </div>
  );
}
```

## スタイルのカスタマイズ

Spinner コンポーネントのスタイルは、デザイントークン、CSS変数、Shadow DOMパーツを使用してカスタマイズできます。

### デザイントークン

Spinner コンポーネントは以下のセマンティックトークンを使用します：

```css
:root {
  /* サイズ */
  --spinner-size-xs: 16px;
  --spinner-size-sm: 20px;
  --spinner-size-md: 24px;
  --spinner-size-lg: 32px;
  --spinner-size-xl: 48px;

  /* カラー */
  --spinner-color-primary: var(--color-primary-500);
  --spinner-color-secondary: var(--color-gray-500);
  --spinner-color-success: var(--color-success-500);
  --spinner-color-warning: var(--color-warning-500);
  --spinner-color-error: var(--color-error-500);

  /* アニメーション */
  --spinner-animation-duration: 1s;
  --spinner-border-width: 2px;
}
```

### カスタムCSS変数

CSS変数を使用して、個別のSpinnerコンポーネントをカスタマイズできます：

```html
<ha-spinner
  style="
    --spinner-color: #667eea;
    --spinner-size: 40px;
    --spinner-border-width: 3px;
    --spinner-animation-duration: 0.8s;
  "
></ha-spinner>
```

### カスタムカラー

グラデーションや独自のカラーを使用できます：

```tsx
import { Spinner } from '@hidearea-design/react';

function CustomColorSpinner() {
  return (
    <Spinner
      style={{
        '--spinner-color': 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
      } as React.CSSProperties}
    />
  );
}
```

### Shadow DOMパーツ

`::part()` セレクターを使用して、Shadow DOM内の特定の要素をスタイリングできます：

```css
/* Circular バリアントのスピナー */
ha-spinner[variant="circular"]::part(spinner) {
  border-color: rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-width: 3px;
}

/* Dots バリアントのドット */
ha-spinner[variant="dots"]::part(dot) {
  background-color: #667eea;
  width: 8px;
  height: 8px;
}

/* Pulse バリアントのパルス */
ha-spinner[variant="pulse"]::part(pulse) {
  background-color: #667eea;
  opacity: 0.8;
}
```

### カスタムアニメーション

アニメーション速度や動きをカスタマイズできます：

```css
@keyframes custom-spin {
  0% {
    transform: rotate(0deg);
    border-top-color: #667eea;
  }
  50% {
    border-top-color: #764ba2;
  }
  100% {
    transform: rotate(360deg);
    border-top-color: #667eea;
  }
}

ha-spinner[variant="circular"]::part(spinner) {
  animation: custom-spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
```

### テーマ別のカスタマイズ

ダークモード対応のスピナー：

```css
/* ライトモード */
ha-spinner {
  --spinner-color-primary: var(--color-primary-500);
  --spinner-color-secondary: var(--color-gray-500);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  ha-spinner {
    --spinner-color-primary: var(--color-primary-400);
    --spinner-color-secondary: var(--color-gray-400);
  }
}
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 明確なラベルを提供する

```tsx
// Good: ローディングの目的を明示
<Spinner aria-label="データを読み込み中" />
```

```tsx
// Bad: ラベルなし
<Spinner />
```

**理由**: スクリーンリーダーユーザーが何が読み込まれているのかを理解できません。`aria-label` で処理内容を明示してください。

#### ローディング中はUIを無効化する

```tsx
// Good: ローディング中はボタンを無効化
<Button disabled={loading} aria-busy={loading}>
  {loading && <Spinner size="sm" aria-label="送信中" />}
  {loading ? '送信中...' : '送信'}
</Button>
```

```tsx
// Bad: ローディング中でもボタンが有効
<Button onClick={handleSubmit}>
  {loading && <Spinner size="sm" />}
  送信
</Button>
```

**理由**: ローディング中に複数回クリックされるのを防ぎ、ユーザーに処理中であることを明確に示します。

#### 適切なサイズを使用する

```tsx
// Good: コンテキストに応じたサイズ
<Button>
  <Spinner size="sm" /> {/* ボタン内は小さめ */}
  読み込み中
</Button>

<div style={{ padding: '40px', textAlign: 'center' }}>
  <Spinner size="lg" /> {/* ページ全体は大きめ */}
</div>
```

```tsx
// Bad: すべて同じサイズ
<Button>
  <Spinner size="xl" /> {/* ボタンに対して大きすぎる */}
  読み込み中
</Button>
```

**理由**: コンテキストに応じた適切なサイズを使用することで、UIの一貫性とバランスが保たれます。

#### テキストと組み合わせる

```tsx
// Good: スピナーとテキストの組み合わせ
<Stack direction="vertical" gap="2" align="center">
  <Spinner size="lg" aria-label="データを読み込み中" />
  <p>データを読み込み中...</p>
</Stack>
```

```tsx
// Bad: スピナーのみ
<Spinner />
```

**理由**: テキストと組み合わせることで、すべてのユーザーに明確な情報を提供できます。

### ✗ 避けるべき使い方

#### 複数のスピナーを同時に表示しない

```tsx
// Bad: 複数のスピナーが同時に表示
<div>
  <Spinner aria-label="ユーザーデータ読み込み中" />
  <Spinner aria-label="設定読み込み中" />
  <Spinner aria-label="通知読み込み中" />
</div>
```

```tsx
// Good: 単一のスピナーで全体の状態を示す
<Spinner aria-label="データを読み込み中" />
```

**代替案**: 複数の処理がある場合は、Progressコンポーネントを使用して個別の進捗を表示するか、単一のスピナーで全体の状態を示してください。

#### 長時間表示しない

```tsx
// Bad: タイムアウトなし
<Spinner aria-label="処理中" />
```

```tsx
// Good: タイムアウトとエラーハンドリング
function LoadingWithTimeout() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 30000); // 30秒でタイムアウト

    return () => clearTimeout(timeout);
  }, []);

  if (error) {
    return <Alert variant="error">読み込みに失敗しました</Alert>;
  }

  return loading ? <Spinner aria-label="読み込み中" /> : <Content />;
}
```

**代替案**: 長時間のローディングには、タイムアウト、進捗表示、またはキャンセルオプションを提供してください。

#### 装飾として使用しない

```tsx
// Bad: 装飾としてスピナーを使用
<h2>
  <Spinner size="sm" /> セクションタイトル
</h2>
```

```tsx
// Good: 実際の読み込み状態のみで使用
{loading && <Spinner aria-label="セクションを読み込み中" />}
```

**代替案**: スピナーは実際のローディング状態を示す場合のみ使用し、装飾目的では使用しないでください。

#### 進捗が分かる場合は使用しない

```tsx
// Bad: 進捗が分かるのにSpinner
<Spinner aria-label="ファイルアップロード中" />
```

```tsx
// Good: 進捗が分かる場合はProgress
<Progress
  value={uploadProgress}
  max={100}
  aria-label="ファイルアップロード進捗"
  showLabel
/>
```

**代替案**: 処理の進捗が数値で表せる場合は、Progressコンポーネントを使用してください。

## よくある質問

### スピナーをボタンに組み込むにはどうすればよいですか？

ボタン内にスピナーを配置し、ローディング中はボタンを無効化します：

**React の例**:
```tsx
import { Button, Spinner } from '@hidearea-design/react';
import { useState } from 'react';

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await performAction();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading && (
        <Spinner
          size="sm"
          aria-label="処理中"
          style={{ marginRight: '8px' }}
        />
      )}
      {loading ? '処理中...' : '送信'}
    </Button>
  );
}
```

**Vue の例**:
```vue
<template>
  <HaButton
    variant="primary"
    :disabled="loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <HaSpinner
      v-if="loading"
      size="sm"
      aria-label="処理中"
      style="margin-right: 8px;"
    />
    {{ loading ? '処理中...' : '送信' }}
  </HaButton>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button as HaButton, Spinner as HaSpinner } from '@hidearea-design/vue';

const loading = ref(false);

const handleClick = async () => {
  loading.value = true;
  try {
    await performAction();
  } finally {
    loading.value = false;
  }
};
</script>
```

### フルページオーバーレイローディングを実装するにはどうすればよいですか？

固定位置のオーバーレイでスピナーを表示します：

**React の例**:
```tsx
import { Spinner } from '@hidearea-design/react';
import { useState } from 'react';

function FullPageLoader({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      role="dialog"
      aria-modal="true"
      aria-label="読み込み中"
    >
      <Spinner size="xl" aria-label="ページを読み込み中" />
      <p style={{ color: 'white', marginTop: '16px' }}>
        読み込み中です...
      </p>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <FullPageLoader loading={loading} />
      <YourContent />
    </>
  );
}
```

**Vue の例**:
```vue
<template>
  <div>
    <Teleport to="body">
      <div
        v-if="loading"
        role="dialog"
        aria-modal="true"
        aria-label="読み込み中"
        :style="overlayStyle"
      >
        <HaSpinner size="xl" aria-label="ページを読み込み中" />
        <p :style="{ color: 'white', marginTop: '16px' }">
          読み込み中です...
        </p>
      </div>
    </Teleport>
    <YourContent />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Spinner as HaSpinner } from '@hidearea-design/vue';

const loading = ref(false);

const overlayStyle = computed(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}));
</script>
```

### SpinnerとProgressの使い分けはどうすればよいですか？

処理の進捗状況が分かるかどうかで判断します：

**Spinner を使用する場合**:
```tsx
import { Spinner } from '@hidearea-design/react';

// 処理時間が不明な場合
function DataFetcher() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  return loading ? (
    <Spinner aria-label="データを取得中" />
  ) : (
    <DataDisplay />
  );
}
```

**Progress を使用する場合**:
```tsx
import { Progress } from '@hidearea-design/react';

// 進捗が数値で分かる場合
function FileUploader() {
  const [progress, setProgress] = useState(0);

  const upload = async (file: File) => {
    // 進捗を追跡
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await delay(100);
    }
  };

  return (
    <Progress
      value={progress}
      max={100}
      aria-label="ファイルアップロード進捗"
      showLabel
    />
  );
}
```

**判断基準**:
- 進捗が**不明** → Spinner
- 進捗が**数値で表せる** → Progress
- **短時間**の処理 → Spinner (小サイズ)
- **長時間**の処理 → Progress (パーセンテージ表示)

### スピナーの色を動的に変更するにはどうすればよいですか？

状態に応じてカラープロパティを切り替えます：

**React の例**:
```tsx
import { Spinner } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function DynamicColorSpinner() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  const getColor = () => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'primary';
    }
  };

  return (
    <Spinner
      color={getColor()}
      aria-label={`${status === 'loading' ? '読み込み中' : status === 'success' ? '完了' : 'エラー'}`}
    />
  );
}
```

**Vue の例**:
```vue
<template>
  <HaSpinner
    :color="spinnerColor"
    :aria-label="spinnerLabel"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Spinner as HaSpinner } from '@hidearea-design/vue';

type Status = 'loading' | 'success' | 'error';

const status = ref<Status>('loading');

const spinnerColor = computed(() => {
  switch (status.value) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    default:
      return 'primary';
  }
});

const spinnerLabel = computed(() => {
  switch (status.value) {
    case 'loading':
      return '読み込み中';
    case 'success':
      return '完了';
    case 'error':
      return 'エラー';
  }
});
</script>
```

## 関連コンポーネント

- [Progress](/components/progress) - 進捗が数値で表せる場合の読み込み表示
- [Skeleton](/components/skeleton) - コンテンツの読み込み中のプレースホルダー
- [Button](/components/button) - スピナーを組み込むボタン

## API リファレンス

### Props

Spinner コンポーネントは以下のプロパティをサポートします：

```typescript
interface SpinnerProps {
  /**
   * スピナーのバリアント
   * @default 'circular'
   */
  variant?: 'circular' | 'dots' | 'pulse';

  /**
   * スピナーのサイズ
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * スピナーのカラー
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  /**
   * スピナーの目的を説明するラベル（アクセシビリティ用）
   * @required
   */
  'aria-label': string;

  /**
   * ライブリージョンの更新通知レベル
   * @default 'polite'
   */
  'aria-live'?: 'polite' | 'assertive' | 'off';

  /**
   * 処理中状態を示す
   * @default true
   */
  'aria-busy'?: boolean;

  /**
   * 装飾用スピナーとしてスクリーンリーダーから隠す
   * @default false
   */
  'aria-hidden'?: boolean;
}
```

### CSS Variables

Spinner コンポーネントで使用できるCSS変数：

```typescript
interface SpinnerCSSVariables {
  /**
   * スピナーのサイズ
   * @default サイズに応じて: 16px (xs) / 20px (sm) / 24px (md) / 32px (lg) / 48px (xl)
   */
  '--spinner-size': string;

  /**
   * スピナーの色
   * @default カラーに応じて設定
   */
  '--spinner-color': string;

  /**
   * スピナーのボーダー幅（circular バリアント）
   * @default 2px
   */
  '--spinner-border-width': string;

  /**
   * アニメーションの持続時間
   * @default 1s
   */
  '--spinner-animation-duration': string;
}
```

### Parts

Shadow DOM内の要素に `::part()` セレクターでアクセスできます：

```typescript
interface SpinnerParts {
  /**
   * Circular バリアントのスピナー要素
   */
  spinner?: HTMLDivElement;

  /**
   * Dots バリアントのドット要素（複数）
   */
  dot?: HTMLDivElement;

  /**
   * Pulse バリアントのパルス要素
   */
  pulse?: HTMLDivElement;
}
```

使用例：

```css
/* Circular バリアント */
ha-spinner[variant="circular"]::part(spinner) {
  border-width: 3px;
  border-color: rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
}

/* Dots バリアント */
ha-spinner[variant="dots"]::part(dot) {
  background-color: #667eea;
}

/* Pulse バリアント */
ha-spinner[variant="pulse"]::part(pulse) {
  background-color: #667eea;
}
```

## トラブルシューティング

### 問題: スピナーが表示されない

**原因**:

スピナーのサイズが0になっているか、親要素が非表示になっている可能性があります。

**解決策**:

1. スピナーのサイズを明示的に設定してください：

```tsx
// サイズを明示的に指定
<Spinner size="md" aria-label="読み込み中" />

// またはカスタムサイズ
<Spinner
  aria-label="読み込み中"
  style={{ '--spinner-size': '32px' } as React.CSSProperties}
/>
```

2. 親要素のスタイルを確認してください：

```tsx
// 親要素に適切な表示スタイルを設定
<div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
  <Spinner aria-label="読み込み中" />
</div>
```

### 問題: スピナーのアニメーションが動かない

**原因**:

CSSアニメーションが無効になっているか、`prefers-reduced-motion` が有効になっている可能性があります。

**解決策**:

1. アニメーションの設定を確認してください：

```css
/* アニメーションが無効化されていないか確認 */
ha-spinner::part(spinner) {
  animation: spin 1s linear infinite;
}

/* reduced-motion に対応 */
@media (prefers-reduced-motion: reduce) {
  ha-spinner::part(spinner) {
    animation-duration: 3s; /* アニメーションを遅くする */
  }
}
```

2. 別のバリアントを試してください：

```tsx
// Circular が動かない場合は Dots や Pulse を試す
<Spinner variant="dots" aria-label="読み込み中" />
```

### 問題: ボタン内のスピナーがレイアウトを崩す

**原因**:

スピナーのサイズがボタンの高さに対して大きすぎる可能性があります。

**解決策**:

1. 適切なサイズを使用してください：

```tsx
// Bad: ボタンに対して大きすぎる
<Button>
  <Spinner size="lg" />
  送信
</Button>

// Good: ボタンに適したサイズ
<Button>
  <Spinner size="sm" style={{ marginRight: '8px' }} aria-label="送信中" />
  送信中
</Button>
```

2. フレックスボックスで配置を調整してください：

```tsx
<Button
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }}
>
  <Spinner size="sm" aria-label="送信中" />
  送信中
</Button>
```

### 問題: スクリーンリーダーがスピナーを読み上げない

**原因**:

適切なARIA属性が設定されていない可能性があります。

**解決策**:

1. `aria-label` を必ず設定してください：

```tsx
// Bad: aria-labelなし
<Spinner />

// Good: aria-labelあり
<Spinner aria-label="データを読み込み中" />
```

2. ライブリージョンを使用してください：

```tsx
// スピナーと一緒にライブリージョンを使用
<div>
  <Spinner aria-label="読み込み中" />
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    style={{ position: 'absolute', left: '-10000px' }}
  >
    データを読み込み中です
  </div>
</div>
```

3. 装飾用スピナーの場合は `aria-hidden` を使用してください：

```tsx
// テキストで説明がある場合
<div>
  <Spinner aria-hidden="true" />
  <p role="status">データを読み込み中...</p>
</div>
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
