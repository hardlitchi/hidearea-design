# Skeleton

ローディングプレースホルダーコンポーネント。コンテンツが読み込まれる前に表示する視覚的なプレースホルダーを提供します。3つのバリアントと3つのアニメーションタイプをサポートします。

## 基本的な使い方

```html
<ha-skeleton></ha-skeleton>
```

## バリアント

3種類のバリアントが利用可能です：

### Text（テキスト）

テキストコンテンツのプレースホルダー。

```html
<ha-skeleton variant="text"></ha-skeleton>
```

### Circular（円形）

アバターやアイコンのプレースホルダー。

```html
<ha-skeleton variant="circular" width="64px" height="64px"></ha-skeleton>
```

### Rectangular（矩形）

カードや画像のプレースホルダー。

```html
<ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
```

## アニメーション

3種類のアニメーションが利用可能です：

### Pulse（パルス）

デフォルトのアニメーション。フェードイン・アウトの繰り返し。

```html
<ha-skeleton animation="pulse"></ha-skeleton>
```

### Wave（波）

波のように流れるアニメーション。

```html
<ha-skeleton animation="wave"></ha-skeleton>
```

### None（なし）

アニメーションなし。静的なプレースホルダー。

```html
<ha-skeleton animation="none"></ha-skeleton>
```

## サイズ

カスタムサイズを指定できます：

```html
<ha-skeleton width="200px" height="20px"></ha-skeleton>
<ha-skeleton width="100%" height="300px"></ha-skeleton>
<ha-skeleton width="80px" height="80px"></ha-skeleton>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'text' \| 'circular' \| 'rectangular'` | `'text'` | バリアント |
| `animation` | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | アニメーション |
| `width` | `string` | - | 幅（CSS値） |
| `height` | `string` | - | 高さ（CSS値） |

## React

```tsx
import { Skeleton } from '@hidearea-design/react';

function App() {
  return (
    <Skeleton variant="text" animation="pulse" width="100%" height="20px" />
  );
}
```

## Vue

```vue
<template>
  <HaSkeleton variant="text" animation="pulse" width="100%" height="20px" />
</template>

<script setup>
import { Skeleton as HaSkeleton } from '@hidearea-design/vue';
</script>
```

## 使用例

### ユーザープロフィール

```tsx
import { Skeleton } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string;
}

function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: '山田太郎',
        email: 'yamada@example.com',
        avatar: '/avatar.jpg',
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Skeleton variant="circular" width="64px" height="64px" />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="40%" height="24px" style={{ marginBottom: '0.5rem' }} />
          <Skeleton variant="text" width="60%" height="16px" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <img src={user!.avatar} alt={user!.name} style={{ width: '64px', height: '64px', borderRadius: '50%' }} />
      <div>
        <h3>{user!.name}</h3>
        <p>{user!.email}</p>
      </div>
    </div>
  );
}
```

### カードリスト

```tsx
import { Skeleton, Card } from '@hidearea-design/react';

function CardListSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <Skeleton variant="rectangular" width="100%" height="200px" style={{ marginBottom: '1rem' }} />
          <Skeleton variant="text" width="80%" height="24px" style={{ marginBottom: '0.5rem' }} />
          <Skeleton variant="text" width="100%" height="16px" style={{ marginBottom: '0.5rem' }} />
          <Skeleton variant="text" width="60%" height="16px" />
        </Card>
      ))}
    </div>
  );
}
```

### テーブルローディング

```tsx
import { Skeleton } from '@hidearea-design/react';

function TableSkeleton() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '12px', textAlign: 'left' }}>
            <Skeleton width="80px" height="16px" />
          </th>
          <th style={{ padding: '12px', textAlign: 'left' }}>
            <Skeleton width="100px" height="16px" />
          </th>
          <th style={{ padding: '12px', textAlign: 'left' }}>
            <Skeleton width="60px" height="16px" />
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, i) => (
          <tr key={i}>
            <td style={{ padding: '12px' }}>
              <Skeleton width="120px" height="16px" />
            </td>
            <td style={{ padding: '12px' }}>
              <Skeleton width="200px" height="16px" />
            </td>
            <td style={{ padding: '12px' }}>
              <Skeleton width="80px" height="16px" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### ブログ記事

```html
<ha-card>
  <ha-skeleton variant="rectangular" width="100%" height="300px" style="margin-bottom: 1rem;"></ha-skeleton>
  <ha-skeleton variant="text" width="90%" height="32px" style="margin-bottom: 1rem;"></ha-skeleton>
  <ha-skeleton variant="text" width="100%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
  <ha-skeleton variant="text" width="100%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
  <ha-skeleton variant="text" width="70%" height="20px"></ha-skeleton>
</ha-card>
```

### リスト

```html
<ha-stack direction="vertical" gap="3">
  <div style="display: flex; gap: 1rem; align-items: center;">
    <ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
    <div style="flex: 1;">
      <ha-skeleton variant="text" width="60%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
      <ha-skeleton variant="text" width="40%" height="16px"></ha-skeleton>
    </div>
  </div>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
    <div style="flex: 1;">
      <ha-skeleton variant="text" width="50%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
      <ha-skeleton variant="text" width="30%" height="16px"></ha-skeleton>
    </div>
  </div>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
    <div style="flex: 1;">
      <ha-skeleton variant="text" width="70%" height="20px" style="margin-bottom: 0.5rem;"></ha-skeleton>
      <ha-skeleton variant="text" width="50%" height="16px"></ha-skeleton>
    </div>
  </div>
</ha-stack>
```

### コメントセクション

```tsx
import { Skeleton } from '@hidearea-design/react';

function CommentsSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem' }}>
          <Skeleton variant="circular" width="40px" height="40px" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="30%" height="16px" style={{ marginBottom: '0.5rem' }} />
            <Skeleton variant="text" width="100%" height="14px" style={{ marginBottom: '0.25rem' }} />
            <Skeleton variant="text" width="80%" height="14px" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 画像ギャラリー

```html
<ha-grid columns="4" gap="4">
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
</ha-grid>
```

### ダッシュボード統計

```tsx
import { Skeleton, Card, Grid } from '@hidearea-design/react';

function DashboardSkeleton() {
  return (
    <Grid columns="3" gap="4">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <Skeleton variant="text" width="40%" height="16px" style={{ marginBottom: '1rem' }} />
          <Skeleton variant="text" width="60%" height="32px" style={{ marginBottom: '0.5rem' }} />
          <Skeleton variant="text" width="30%" height="14px" />
        </Card>
      ))}
    </Grid>
  );
}
```

### フォームフィールド

```html
<ha-stack direction="vertical" gap="4">
  <div>
    <ha-skeleton variant="text" width="100px" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
    <ha-skeleton variant="rectangular" width="100%" height="40px"></ha-skeleton>
  </div>
  <div>
    <ha-skeleton variant="text" width="120px" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
    <ha-skeleton variant="rectangular" width="100%" height="40px"></ha-skeleton>
  </div>
  <div>
    <ha-skeleton variant="text" width="80px" height="16px" style="margin-bottom: 0.5rem;"></ha-skeleton>
    <ha-skeleton variant="rectangular" width="100%" height="120px"></ha-skeleton>
  </div>
</ha-stack>
```

### アニメーション比較

```html
<ha-stack direction="vertical" gap="4">
  <div>
    <p>Pulse Animation</p>
    <ha-skeleton animation="pulse" width="100%" height="40px"></ha-skeleton>
  </div>
  <div>
    <p>Wave Animation</p>
    <ha-skeleton animation="wave" width="100%" height="40px"></ha-skeleton>
  </div>
  <div>
    <p>No Animation</p>
    <ha-skeleton animation="none" width="100%" height="40px"></ha-skeleton>
  </div>
</ha-stack>
```

## アクセシビリティ

Skeleton コンポーネントは WCAG 2.1 AA 基準に準拠し、すべてのユーザーがローディング状態を認識できるようにします。

### ARIAサポート

Skeleton コンポーネントは以下のARIA属性をサポートします：

```html
<ha-skeleton
  role="status"
  aria-busy="true"
  aria-live="polite"
  aria-label="コンテンツを読み込み中"
></ha-skeleton>
```

| ARIA属性 | 説明 | 設定値 |
|---------|------|-------|
| `role` | ローディングプレースホルダーの役割 | `status` (推奨) |
| `aria-busy` | 処理中状態を示す | `true` (自動設定) |
| `aria-live` | 状態変化の通知レベル | `polite` (自動設定) |
| `aria-label` | ローディングの目的を説明 | 推奨：読み込み内容を明示 |
| `aria-hidden` | スクリーンリーダーから隠す | `true` (テキスト説明がある場合) |

### キーボード操作

Skeletonは視覚的なプレースホルダーであり、キーボード操作は提供されません。フォーカスを受け取らず、スクリーンリーダーによる読み上げに対応しています。

### スクリーンリーダー

スクリーンリーダーに対して適切な情報を提供するには、2つのアプローチがあります：

#### アプローチ1: aria-labelを使用

```html
<div>
  <ha-skeleton
    variant="circular"
    width="64px"
    height="64px"
    aria-label="ユーザープロフィールを読み込み中"
  ></ha-skeleton>
  <ha-skeleton
    variant="text"
    width="80%"
    height="20px"
    aria-label="ユーザー名を読み込み中"
  ></ha-skeleton>
</div>
```

**読み上げ例**：「ユーザープロフィールを読み込み中」「ユーザー名を読み込み中」

#### アプローチ2: コンテナにaria-labelを設定（推奨）

```tsx
import { Skeleton } from '@hidearea-design/react';

function UserProfileSkeleton() {
  return (
    <div
      role="status"
      aria-label="ユーザープロフィールを読み込み中"
      aria-live="polite"
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Skeleton variant="circular" width="64px" height="64px" aria-hidden="true" />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="80%" height="20px" aria-hidden="true" />
          <Skeleton variant="text" width="60%" height="16px" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
```

**読み上げ例**：「ユーザープロフィールを読み込み中」

**理由**: 複数のSkeletonを使用する場合、個々のSkeletonにラベルを付けるのではなく、コンテナ全体に1つのラベルを付ける方が、スクリーンリーダーユーザーにとって分かりやすくなります。

### ライブリージョンの使用

Skeletonからコンテンツへの切り替え時に、適切な通知を提供します：

```tsx
import { Skeleton } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function AccessibleContentLoader() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('コンテンツを読み込み中...');

  useEffect(() => {
    if (loading) {
      setStatusMessage('コンテンツを読み込み中...');
    } else if (data) {
      setStatusMessage('コンテンツの読み込みが完了しました');
    }
  }, [loading, data]);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div role="status" aria-label="コンテンツを読み込み中">
          <Skeleton variant="rectangular" width="100%" height="200px" aria-hidden="true" />
          <Skeleton variant="text" width="80%" height="24px" aria-hidden="true" />
          <Skeleton variant="text" width="100%" height="16px" aria-hidden="true" />
        </div>
      ) : (
        <div>
          <h2>{data.title}</h2>
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
    </div>
  );
}
```

### レイアウトシフトの防止

Skeletonの主な目的の1つは、コンテンツ読み込み時のレイアウトシフトを防ぐことです。これはアクセシビリティにも重要です：

```tsx
import { Skeleton, Card } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ArticleCard({ id }: { id: number }) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle(id).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [id]);

  // Skeleton and real content have the same dimensions
  return (
    <Card style={{ minHeight: '400px' }}>
      {loading ? (
        <div role="status" aria-label="記事を読み込み中">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="200px"
            aria-hidden="true"
            style={{ marginBottom: '16px' }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height="24px"
            aria-hidden="true"
            style={{ marginBottom: '12px' }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height="16px"
            aria-hidden="true"
            style={{ marginBottom: '8px' }}
          />
          <Skeleton
            variant="text"
            width="70%"
            height="16px"
            aria-hidden="true"
          />
        </div>
      ) : (
        <>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '12px' }}>{article.title}</h3>
          <p>{article.excerpt}</p>
        </>
      )}
    </Card>
  );
}
```

### 装飾的なSkeleton

視覚的なフィードバックのみが必要で、テキストで十分な説明がある場合：

```tsx
import { Skeleton } from '@hidearea-design/react';

function DecorativeSkeleton() {
  return (
    <div>
      <p role="status" aria-live="polite">
        ユーザープロフィールを読み込んでいます。しばらくお待ちください。
      </p>
      <div aria-hidden="true">
        <Skeleton variant="circular" width="64px" height="64px" />
        <Skeleton variant="text" width="80%" height="20px" />
        <Skeleton variant="text" width="60%" height="16px" />
      </div>
    </div>
  );
}
```

## スタイルのカスタマイズ

Skeleton コンポーネントのスタイルは、デザイントークン、CSS変数、Shadow DOMパーツを使用してカスタマイズできます。

### デザイントークン

Skeleton コンポーネントは以下のセマンティックトークンを使用します：

```css
:root {
  /* 背景色 */
  --skeleton-bg: var(--color-gray-200);
  --skeleton-wave-color: rgba(255, 255, 255, 0.4);

  /* 角丸 */
  --skeleton-border-radius-text: var(--radius-sm);
  --skeleton-border-radius-circular: 50%;
  --skeleton-border-radius-rectangular: var(--radius-md);

  /* アニメーション */
  --skeleton-animation-duration: 1.5s;
  --skeleton-pulse-opacity-min: 0.5;
  --skeleton-pulse-opacity-max: 1;
}
```

### カスタムCSS変数

CSS変数を使用して、個別のSkeletonコンポーネントをカスタマイズできます：

```html
<ha-skeleton
  variant="text"
  style="
    --skeleton-bg: #e0e0e0;
    --skeleton-border-radius: 8px;
    --skeleton-animation-duration: 2s;
  "
></ha-skeleton>
```

### グラデーション背景

グラデーションを使用したカスタム背景：

```tsx
import { Skeleton } from '@hidearea-design/react';

function GradientSkeleton() {
  return (
    <Skeleton
      variant="rectangular"
      width="100%"
      height="200px"
      style={{
        '--skeleton-bg': 'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)'
      } as React.CSSProperties}
    />
  );
}
```

### Shadow DOMパーツ

`::part()` セレクターを使用して、Shadow DOM内の特定の要素をスタイリングできます：

```css
/* Skeletonの基本スタイリング */
ha-skeleton::part(skeleton) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Text バリアント */
ha-skeleton[variant="text"]::part(skeleton) {
  border-radius: 4px;
  height: 1em;
}

/* Circular バリアント */
ha-skeleton[variant="circular"]::part(skeleton) {
  border-radius: 50%;
}

/* Rectangular バリアント */
ha-skeleton[variant="rectangular"]::part(skeleton) {
  border-radius: 8px;
}
```

### カスタムアニメーション

アニメーション速度や動きをカスタマイズできます：

```css
/* カスタムパルスアニメーション */
@keyframes custom-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

ha-skeleton[animation="pulse"]::part(skeleton) {
  animation: custom-pulse 2s ease-in-out infinite;
}

/* カスタムウェーブアニメーション */
@keyframes custom-wave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

ha-skeleton[animation="wave"]::part(skeleton)::after {
  animation: custom-wave 2s linear infinite;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.6),
    transparent
  );
}
```

### テーマ別のカスタマイズ

ダークモード対応のSkeleton：

```css
/* ライトモード */
ha-skeleton {
  --skeleton-bg: var(--color-gray-200);
  --skeleton-wave-color: rgba(255, 255, 255, 0.4);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  ha-skeleton {
    --skeleton-bg: var(--color-gray-700);
    --skeleton-wave-color: rgba(255, 255, 255, 0.1);
  }
}
```

## バリアント別の使い分け

| バリアント | 用途 | 推奨サイズ |
|-----------|------|----------|
| `text` | テキストコンテンツ | 幅100%, 高さ16-24px |
| `circular` | アバター、アイコン | 正方形（例: 40x40px） |
| `rectangular` | 画像、カード | 用途に応じて自由 |

## アニメーション別の使い分け

| アニメーション | 用途 | 特徴 |
|--------------|------|------|
| `pulse` | 一般的なローディング | 控えめで柔らかい印象 |
| `wave` | 動的なローディング | 明確な進行感を演出 |
| `none` | 静的プレースホルダー | パフォーマンス重視 |

## Spinner との使い分け

- **Skeleton を使用**: コンテンツの構造を事前に見せたい場合、レイアウトシフトを防ぎたい場合
- **Spinner を使用**: シンプルなローディング表示、処理時間が短い場合

```html
<!-- Skeleton: コンテンツ構造を維持 -->
<div>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="text" width="80%" height="24px"></ha-skeleton>
</div>

<!-- Spinner: シンプルなローディング -->
<div style="text-align: center; padding: 40px;">
  <ha-spinner></ha-spinner>
</div>
```

## パフォーマンス

- Skeletonは軽量で、複数配置してもパフォーマンスへの影響は最小限です
- アニメーションは CSS のみで実装されており、JavaScript のオーバーヘッドはありません
- `animation="none"` を使用すると、アニメーションのコストをゼロにできます

## よくある質問

### 実際のコンテンツとSkeletonのサイズを一致させるにはどうすればよいですか？

Skeletonと実際のコンテンツに同じ寸法を設定し、レイアウトシフトを防ぎます：

**React の例**:
```tsx
import { Skeleton } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ArticlePreview({ id }: { id: number }) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  // 共通のスタイル定義
  const imageStyle = { width: '100%', height: '200px', marginBottom: '16px', objectFit: 'cover' as const };
  const titleStyle = { fontSize: '24px', marginBottom: '12px', lineHeight: '1.2' };
  const excerptStyle = { fontSize: '16px', lineHeight: '1.5' };

  useEffect(() => {
    fetchArticle(id).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      {loading ? (
        <div role="status" aria-label="記事を読み込み中">
          <Skeleton variant="rectangular" width="100%" height="200px" aria-hidden="true" style={{ marginBottom: '16px' }} />
          <Skeleton variant="text" width="90%" height="24px" aria-hidden="true" style={{ marginBottom: '12px' }} />
          <Skeleton variant="text" width="100%" height="16px" aria-hidden="true" style={{ marginBottom: '4px' }} />
          <Skeleton variant="text" width="70%" height="16px" aria-hidden="true" />
        </div>
      ) : (
        <>
          <img src={article.image} alt={article.title} style={imageStyle} />
          <h2 style={titleStyle}>{article.title}</h2>
          <p style={excerptStyle}>{article.excerpt}</p>
        </>
      )}
    </div>
  );
}
```

**Vue の例**:
```vue
<template>
  <div>
    <div v-if="loading" role="status" aria-label="記事を読み込み中">
      <HaSkeleton
        variant="rectangular"
        width="100%"
        height="200px"
        aria-hidden="true"
        :style="{ marginBottom: '16px' }"
      />
      <HaSkeleton
        variant="text"
        width="90%"
        height="24px"
        aria-hidden="true"
        :style="{ marginBottom: '12px' }"
      />
      <HaSkeleton
        variant="text"
        width="100%"
        height="16px"
        aria-hidden="true"
        :style="{ marginBottom: '4px' }"
      />
      <HaSkeleton
        variant="text"
        width="70%"
        height="16px"
        aria-hidden="true"
      />
    </div>
    <div v-else>
      <img :src="article.image" :alt="article.title" :style="imageStyle" />
      <h2 :style="titleStyle">{{ article.title }}</h2>
      <p :style="excerptStyle">{{ article.excerpt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Skeleton as HaSkeleton } from '@hidearea-design/vue';

const loading = ref(true);
const article = ref(null);

const imageStyle = { width: '100%', height: '200px', marginBottom: '16px', objectFit: 'cover' };
const titleStyle = { fontSize: '24px', marginBottom: '12px', lineHeight: '1.2' };
const excerptStyle = { fontSize: '16px', lineHeight: '1.5' };

onMounted(async () => {
  article.value = await fetchArticle(props.id);
  loading.value = false;
});
</script>
```

### リスト全体にSkeletonを表示するにはどうすればよいですか？

配列を使用して複数のSkeletonアイテムを表示します：

**React の例**:
```tsx
import { Skeleton } from '@hidearea-design/react';

function UserListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div role="status" aria-label="ユーザーリストを読み込み中">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
          }}
          aria-hidden="true"
        >
          <Skeleton variant="circular" width="48px" height="48px" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height="20px" style={{ marginBottom: '8px' }} />
            <Skeleton variant="text" width="40%" height="16px" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Vue の例**:
```vue
<template>
  <div role="status" aria-label="ユーザーリストを読み込み中">
    <div
      v-for="index in count"
      :key="index"
      :style="itemStyle"
      aria-hidden="true"
    >
      <HaSkeleton variant="circular" width="48px" height="48px" />
      <div :style="{ flex: 1 }">
        <HaSkeleton variant="text" width="60%" height="20px" :style="{ marginBottom: '8px' }" />
        <HaSkeleton variant="text" width="40%" height="16px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skeleton as HaSkeleton } from '@hidearea-design/vue';

const props = withDefaults(defineProps<{ count?: number }>(), {
  count: 5,
});

const itemStyle = {
  display: 'flex',
  gap: '1rem',
  padding: '1rem',
  borderBottom: '1px solid #e5e7eb',
};
</script>
```

### SkeletonとSpinnerの使い分けはどうすればよいですか？

コンテンツの構造とローディング時間に基づいて選択します：

**Skeleton を使用する場合**:
- コンテンツの構造を事前に表示したい
- レイアウトシフトを防ぎたい
- ローディング時間が1秒以上
- 複数のコンテンツ要素がある

```tsx
import { Skeleton } from '@hidearea-design/react';

// 複雑な構造のコンテンツ
function ProductCard() {
  return (
    <div role="status" aria-label="商品を読み込み中">
      <Skeleton variant="rectangular" width="100%" height="200px" aria-hidden="true" />
      <Skeleton variant="text" width="80%" height="24px" aria-hidden="true" />
      <Skeleton variant="text" width="100%" height="16px" aria-hidden="true" />
      <Skeleton variant="text" width="30%" height="20px" aria-hidden="true" />
    </div>
  );
}
```

**Spinner を使用する場合**:
- シンプルなローディング表示で十分
- ローディング時間が短い（1秒未満）
- 単一の処理やアクション

```tsx
import { Spinner } from '@hidearea-design/react';

// シンプルなローディング
function QuickAction() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Spinner aria-label="データを保存中" />
      <p>保存中...</p>
    </div>
  );
}
```

### 動的な幅のSkeletonを作成するにはどうすればよいですか？

ランダムな幅を使用して、よりリアルなSkeletonを作成できます：

**React の例**:
```tsx
import { Skeleton } from '@hidearea-design/react';

function TextLineSkeleton({ lines = 3 }: { lines?: number }) {
  // ランダムな幅を生成（70-100%）
  const widths = Array.from({ length: lines }, () =>
    `${Math.floor(Math.random() * 30) + 70}%`
  );

  return (
    <div role="status" aria-label="テキストを読み込み中">
      {widths.map((width, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={width}
          height="16px"
          aria-hidden="true"
          style={{ marginBottom: index < widths.length - 1 ? '8px' : 0 }}
        />
      ))}
    </div>
  );
}
```

**Vue の例**:
```vue
<template>
  <div role="status" aria-label="テキストを読み込み中">
    <HaSkeleton
      v-for="(width, index) in widths"
      :key="index"
      variant="text"
      :width="width"
      height="16px"
      aria-hidden="true"
      :style="{ marginBottom: index < widths.length - 1 ? '8px' : 0 }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Skeleton as HaSkeleton } from '@hidearea-design/vue';

const props = withDefaults(defineProps<{ lines?: number }>(), {
  lines: 3,
});

const widths = computed(() =>
  Array.from({ length: props.lines }, () =>
    `${Math.floor(Math.random() * 30) + 70}%`
  )
);
</script>
```

## 関連コンポーネント

- [Spinner](/components/spinner) - シンプルなローディング表示
- [Progress](/components/progress) - 進捗が数値で表せる場合の読み込み表示
- [Card](/components/card) - Skeletonを配置するコンテナ

## API リファレンス

### Props

Skeleton コンポーネントは以下のプロパティをサポートします：

```typescript
interface SkeletonProps {
  /**
   * Skeletonのバリアント
   * @default 'text'
   */
  variant?: 'text' | 'circular' | 'rectangular';

  /**
   * Skeletonのアニメーション
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';

  /**
   * Skeletonの幅（CSS値）
   */
  width?: string;

  /**
   * Skeletonの高さ（CSS値）
   */
  height?: string;

  /**
   * ローディングの目的を説明するラベル（アクセシビリティ用）
   * 複数のSkeletonを使用する場合はコンテナに設定を推奨
   */
  'aria-label'?: string;

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
   * 装飾用Skeletonとしてスクリーンリーダーから隠す
   * @default false
   */
  'aria-hidden'?: boolean;
}
```

### CSS Variables

Skeleton コンポーネントで使用できるCSS変数：

```typescript
interface SkeletonCSSVariables {
  /**
   * Skeletonの背景色
   * @default var(--color-gray-200)
   */
  '--skeleton-bg': string;

  /**
   * ウェーブアニメーションの色
   * @default rgba(255, 255, 255, 0.4)
   */
  '--skeleton-wave-color': string;

  /**
   * Skeletonの角丸
   * @default バリアントに応じて設定
   */
  '--skeleton-border-radius': string;

  /**
   * アニメーションの持続時間
   * @default 1.5s
   */
  '--skeleton-animation-duration': string;

  /**
   * パルスアニメーションの最小不透明度
   * @default 0.5
   */
  '--skeleton-pulse-opacity-min': string;

  /**
   * パルスアニメーションの最大不透明度
   * @default 1
   */
  '--skeleton-pulse-opacity-max': string;
}
```

### Parts

Shadow DOM内の要素に `::part()` セレクターでアクセスできます：

```typescript
interface SkeletonParts {
  /**
   * Skeleton要素
   */
  skeleton: HTMLDivElement;
}
```

使用例：

```css
/* Skeletonのスタイリング */
ha-skeleton::part(skeleton) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  border-radius: 8px;
}

/* バリアント別のスタイリング */
ha-skeleton[variant="text"]::part(skeleton) {
  border-radius: 4px;
}

ha-skeleton[variant="circular"]::part(skeleton) {
  border-radius: 50%;
}
```

## トラブルシューティング

### 問題: Skeletonが表示されない

**原因**:

Skeletonのサイズが設定されていない、または親要素が非表示になっている可能性があります。

**解決策**:

1. 明示的にサイズを設定してください：

```tsx
// Bad: サイズ未指定
<Skeleton variant="text" />

// Good: サイズを明示
<Skeleton variant="text" width="100%" height="20px" />
```

2. 親要素のスタイルを確認してください：

```tsx
// 親要素に適切なスタイルを設定
<div style={{ width: '100%', padding: '16px' }}>
  <Skeleton variant="text" width="100%" height="20px" />
</div>
```

### 問題: レイアウトシフトが発生する

**原因**:

Skeletonと実際のコンテンツのサイズが一致していない可能性があります。

**解決策**:

1. Skeletonと実際のコンテンツに同じ寸法を設定してください：

```tsx
// 共通のスタイルを定義
const imageStyle = { width: '100%', height: '200px', marginBottom: '16px' };

// Skeletonで使用
<Skeleton variant="rectangular" width="100%" height="200px" style={{ marginBottom: '16px' }} />

// 実際のコンテンツで使用
<img src={src} alt={alt} style={imageStyle} />
```

2. コンテナに最小高さを設定してください：

```tsx
<div style={{ minHeight: '400px' }}>
  {loading ? (
    <Skeleton variant="rectangular" width="100%" height="400px" />
  ) : (
    <ContentComponent />
  )}
</div>
```

### 問題: アニメーションが滑らかでない

**原因**:

パフォーマンスの問題や、アニメーション設定が適切でない可能性があります。

**解決策**:

1. アニメーションを無効化するか、より軽量なアニメーションを使用してください：

```tsx
// アニメーションなし（最もパフォーマンスが良い）
<Skeleton animation="none" width="100%" height="20px" />

// 軽量なパルスアニメーション
<Skeleton animation="pulse" width="100%" height="20px" />
```

2. Skeletonの数を減らしてください：

```tsx
// Bad: 大量のSkeleton
{Array.from({ length: 100 }).map((_, i) => (
  <Skeleton key={i} variant="text" width="100%" height="20px" />
))}

// Good: 適切な数のSkeleton
{Array.from({ length: 10 }).map((_, i) => (
  <Skeleton key={i} variant="text" width="100%" height="20px" />
))}
```

### 問題: スクリーンリーダーが読み上げない

**原因**:

適切なARIA属性が設定されていない可能性があります。

**解決策**:

1. コンテナに `role="status"` と `aria-label` を設定してください：

```tsx
// Bad: ARIA属性なし
<div>
  <Skeleton variant="text" width="100%" height="20px" />
  <Skeleton variant="text" width="80%" height="16px" />
</div>

// Good: コンテナにARIA属性を設定
<div role="status" aria-label="コンテンツを読み込み中">
  <Skeleton variant="text" width="100%" height="20px" aria-hidden="true" />
  <Skeleton variant="text" width="80%" height="16px" aria-hidden="true" />
</div>
```

2. ライブリージョンを使用してください：

```tsx
<div>
  <div role="status" aria-label="記事を読み込み中">
    <Skeleton variant="rectangular" width="100%" height="200px" aria-hidden="true" />
  </div>
  {/* スクリーンリーダー用の状態通知 */}
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    style={{ position: 'absolute', left: '-10000px' }}
  >
    記事を読み込み中です
  </div>
</div>
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 実際のコンテンツに近い形状を使用

```tsx
// Good: コンテンツの構造を反映
<div role="status" aria-label="プロフィールを読み込み中">
  <Skeleton variant="circular" width="64px" height="64px" aria-hidden="true" />
  <Skeleton variant="text" width="60%" height="24px" aria-hidden="true" />
  <Skeleton variant="text" width="80%" height="16px" aria-hidden="true" />
</div>
```

```tsx
// Bad: コンテンツと異なる形状
<div>
  <Skeleton variant="rectangular" width="100%" height="100px" />
  <Skeleton variant="text" width="100%" height="16px" />
</div>
```

**理由**: ユーザーが期待するレイアウトを反映することで、より良いUXを提供できます。

#### レイアウトシフトを防ぐ

```tsx
// Good: 同じサイズを使用
const imageStyle = { width: '100%', height: '200px' };

{loading ? (
  <Skeleton variant="rectangular" width="100%" height="200px" />
) : (
  <img src={src} style={imageStyle} />
)}
```

```tsx
// Bad: サイズが異なる
{loading ? (
  <Skeleton variant="rectangular" width="100%" height="150px" />
) : (
  <img src={src} style={{ width: '100%', height: '200px' }} />
)}
```

**理由**: レイアウトシフトは、ユーザーエクスペリエンスを損ない、Core Web Vitalsにも悪影響を与えます。

#### 適切なアニメーションを選択

```tsx
// Good: 静的なコンテンツにはpulse
<Skeleton animation="pulse" variant="text" width="100%" height="20px" />

// Good: 動的なコンテンツにはwave
<Skeleton animation="wave" variant="rectangular" width="100%" height="200px" />

// Good: パフォーマンス重視の場合はnone
<Skeleton animation="none" variant="text" width="100%" height="16px" />
```

**理由**: コンテンツの性質とパフォーマンス要件に応じて、適切なアニメーションを選択してください。

### ✗ 避けるべき使い方

#### 複雑すぎるSkeletonは避ける

```tsx
// Bad: 過度に詳細なSkeleton
<div>
  <Skeleton variant="rectangular" width="100%" height="200px" />
  <Skeleton variant="text" width="95%" height="24px" />
  <Skeleton variant="text" width="92%" height="20px" />
  <Skeleton variant="text" width="88%" height="20px" />
  <Skeleton variant="text" width="85%" height="20px" />
  <Skeleton variant="text" width="90%" height="18px" />
  <Skeleton variant="text" width="78%" height="18px" />
</div>
```

```tsx
// Good: シンプルなSkeleton
<div role="status" aria-label="記事を読み込み中">
  <Skeleton variant="rectangular" width="100%" height="200px" aria-hidden="true" />
  <Skeleton variant="text" width="90%" height="24px" aria-hidden="true" />
  <Skeleton variant="text" width="100%" height="20px" aria-hidden="true" />
  <Skeleton variant="text" width="70%" height="20px" aria-hidden="true" />
</div>
```

**代替案**: シンプルな形状で十分な場合が多く、パフォーマンスも向上します。

#### 短時間のローディングにはSpinnerを使用

```tsx
// Bad: 0.5秒以下のローディングにSkeleton
<Skeleton variant="text" width="100%" height="20px" />
```

```tsx
// Good: 短時間のローディングにはSpinner
<Spinner size="sm" aria-label="データを読み込み中" />
```

**代替案**: ローディング時間が0.5秒以下の場合は、Spinnerの方が適切です

## レスポンシブデザイン

```html
<!-- モバイル: 1カラム、PC: 3カラム -->
<ha-grid columns="1" md-columns="3" gap="4">
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
</ha-grid>
```
