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

- `aria-busy="true"` が自動的に設定されます
- `aria-live="polite"` で状態変化を通知します
- スクリーンリーダーに対してローディング状態を適切に伝えます

```html
<ha-skeleton aria-label="コンテンツを読み込み中"></ha-skeleton>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-skeleton {
  --ha-skeleton-bg: #e5e7eb;
  --ha-skeleton-wave-color: rgba(255, 255, 255, 0.4);
  --ha-skeleton-border-radius: 0.25rem;
}
```

### CSS Parts

`skeleton` パートを使用してスタイルをカスタマイズできます：

```css
ha-skeleton::part(skeleton) {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  border-radius: 8px;
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

## ベストプラクティス

1. **実際のコンテンツに近い形状を使用**: ユーザーが期待するレイアウトを反映
2. **適切なアニメーションを選択**: コンテンツの性質に合わせて選択
3. **レイアウトシフトを防ぐ**: 実際のコンテンツと同じサイズを指定
4. **複雑すぎるSkeletonは避ける**: シンプルな形状で十分な場合が多い
5. **ローディング時間が短い場合はSpinnerを検討**: 0.5秒以下ならSpinnerの方が適切な場合も

## レスポンシブデザイン

```html
<!-- モバイル: 1カラム、PC: 3カラム -->
<ha-grid columns="1" md-columns="3" gap="4">
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
  <ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
</ha-grid>
```
