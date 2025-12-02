# Card

コンテンツカードコンポーネント。3つのバリアントとカスタマイズ可能なパディングをサポートします。

## 基本的な使い方

```html
<ha-card>
  <h3>カードタイトル</h3>
  <p>カードのコンテンツ</p>
</ha-card>
```

## バリアント

3種類のバリアントが利用可能です：

### Default

```html
<ha-card variant="default">
  <h3>デフォルト</h3>
  <p>標準的なカードスタイル</p>
</ha-card>
```

### Outlined

```html
<ha-card variant="outlined">
  <h3>アウトライン</h3>
  <p>ボーダー付きカード</p>
</ha-card>
```

### Elevated

```html
<ha-card variant="elevated">
  <h3>エレベーテッド</h3>
  <p>シャドウ付きカード</p>
</ha-card>
```

## パディング

```html
<!-- パディングあり（デフォルト） -->
<ha-card padding>
  <p>パディング付きカード</p>
</ha-card>

<!-- パディングなし -->
<ha-card padding="false">
  <p>パディングなしカード</p>
</ha-card>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'default' \| 'outlined' \| 'elevated'` | `'default'` | バリアント |
| `padding` | `boolean` | `true` | パディングの有無 |

## React

```tsx
import { Card, Button } from '@hidearea-design/react';

function App() {
  return (
    <Card variant="elevated">
      <h3>カードタイトル</h3>
      <p>カードのコンテンツ</p>
      <Button variant="primary">アクション</Button>
    </Card>
  );
}
```

## Vue

```vue
<template>
  <HaCard variant="elevated">
    <h3>カードタイトル</h3>
    <p>カードのコンテンツ</p>
    <HaButton variant="primary">アクション</HaButton>
  </HaCard>
</template>

<script setup>
import { Card as HaCard, Button as HaButton } from '@hidearea-design/vue';
</script>
```

## 使用例

### シンプルなカード

```html
<ha-card>
  <h3>タイトル</h3>
  <p>これはシンプルなカードです。</p>
</ha-card>
```

### 画像付きカード

```html
<ha-card padding="false">
  <img src="image.jpg" alt="Image" style="width: 100%; border-radius: 8px 8px 0 0;">
  <div style="padding: 16px;">
    <h3>画像付きカード</h3>
    <p>美しい風景の写真</p>
  </div>
</ha-card>
```

### プロフィールカード

```html
<ha-card variant="elevated">
  <ha-stack direction="vertical" gap="3" align="center">
    <img src="avatar.jpg" alt="Avatar" style="width: 80px; height: 80px; border-radius: 50%;">
    <h3>山田 太郎</h3>
    <p style="color: var(--color-gray-600);">ソフトウェアエンジニア</p>
    <ha-stack direction="horizontal" gap="2">
      <ha-button variant="primary" size="sm">フォロー</ha-button>
      <ha-button variant="outline" size="sm">メッセージ</ha-button>
    </ha-stack>
  </ha-stack>
</ha-card>
```

### 商品カード

```tsx
import { Card, Button, Badge, Stack } from '@hidearea-design/react';

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

function ProductCard({ name, price, image, inStock }: ProductCardProps) {
  return (
    <Card variant="outlined" padding={false}>
      <img src={image} alt={name} style={{ width: '100%' }} />
      <Stack direction="vertical" gap="2" style={{ padding: '16px' }}>
        <h3>{name}</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
          ¥{price.toLocaleString()}
        </p>
        {inStock ? (
          <Badge variant="success">在庫あり</Badge>
        ) : (
          <Badge variant="error">在庫なし</Badge>
        )}
        <Button variant="primary" fullWidth disabled={!inStock}>
          カートに追加
        </Button>
      </Stack>
    </Card>
  );
}
```

### 統計カード

```html
<ha-card variant="elevated">
  <ha-stack direction="vertical" gap="2">
    <p style="color: var(--color-gray-600); font-size: 14px;">総売上</p>
    <h2 style="font-size: 32px; margin: 0;">¥1,234,567</h2>
    <p style="color: var(--color-success-500); font-size: 14px;">
      ↑ 12.5% 前月比
    </p>
  </ha-stack>
</ha-card>
```

### インタラクティブカード

```tsx
import { Card, Stack, Button } from '@hidearea-design/react';
import { useState } from 'react';

function InteractiveCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card variant="outlined">
      <Stack direction="vertical" gap="3">
        <h3>カードタイトル</h3>
        <p>
          カードの概要テキスト...
        </p>
        {expanded && (
          <p>
            詳細なコンテンツがここに表示されます。
            追加の情報やデータを含めることができます。
          </p>
        )}
        <Button
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '折りたたむ' : 'もっと見る'}
        </Button>
      </Stack>
    </Card>
  );
}
```

### カードグリッド

```html
<ha-grid columns="1" md-columns="2" lg-columns="3" gap="4">
  <ha-card variant="outlined">
    <h3>カード1</h3>
    <p>コンテンツ1</p>
  </ha-card>
  <ha-card variant="outlined">
    <h3>カード2</h3>
    <p>コンテンツ2</p>
  </ha-card>
  <ha-card variant="outlined">
    <h3>カード3</h3>
    <p>コンテンツ3</p>
  </ha-card>
</ha-grid>
```

### ダッシュボードカード

```html
<ha-container max-width="xl">
  <ha-grid columns="1" md-columns="2" lg-columns="4" gap="4">
    <ha-card variant="elevated">
      <h4>総売上</h4>
      <p style="font-size: 24px; font-weight: bold;">¥1,234,567</p>
    </ha-card>

    <ha-card variant="elevated">
      <h4>訪問者数</h4>
      <p style="font-size: 24px; font-weight: bold;">12,345</p>
    </ha-card>

    <ha-card variant="elevated">
      <h4>コンバージョン率</h4>
      <p style="font-size: 24px; font-weight: bold;">3.45%</p>
    </ha-card>

    <ha-card variant="elevated">
      <h4>平均注文額</h4>
      <p style="font-size: 24px; font-weight: bold;">¥8,900</p>
    </ha-card>
  </ha-grid>
</ha-container>
```

### フォームカード

```html
<ha-card variant="outlined">
  <ha-stack direction="vertical" gap="4">
    <h2>ログイン</h2>

    <ha-form-group label="メールアドレス" required>
      <ha-input type="email" full-width></ha-input>
    </ha-form-group>

    <ha-form-group label="パスワード" required>
      <ha-input type="password" full-width></ha-input>
    </ha-form-group>

    <ha-stack direction="horizontal" gap="2">
      <ha-button variant="primary" full-width>ログイン</ha-button>
    </ha-stack>

    <p style="text-align: center; font-size: 14px;">
      アカウントをお持ちでない方は
      <a href="/signup">こちら</a>
    </p>
  </ha-stack>
</ha-card>
```

### クリッカブルカード

```tsx
import { Card } from '@hidearea-design/react';

function ClickableCard() {
  return (
    <Card
      variant="outlined"
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onClick={() => console.log('Card clicked')}
    >
      <h3>クリック可能なカード</h3>
      <p>ホバーすると浮き上がります</p>
    </Card>
  );
}
```

## アクセシビリティ

- セマンティックな要素として機能します
- クリッカブルなカードの場合は、適切な `role` と `tabindex` を設定してください

```html
<ha-card role="button" tabindex="0">
  <h3>クリッカブルカード</h3>
</ha-card>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-card {
  --card-padding: 20px;
  --card-border-radius: 12px;
  --card-border-color: var(--color-gray-200);
  --card-bg: var(--color-white);
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ホバーエフェクト */
ha-card[variant="outlined"]:hover {
  border-color: var(--color-primary-500);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 特徴 |
|-----------|------|------|
| `default` | 標準的なコンテンツ | シンプル、軽量 |
| `outlined` | 区別が必要なコンテンツ | ボーダー付き |
| `elevated` | 重要なコンテンツ | シャドウで強調 |
