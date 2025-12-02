# Stack

垂直・水平スタックレイアウトコンポーネント。flexbox ベースの柔軟なレイアウトを提供します。

## 基本的な使い方

```html
<ha-stack>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>
```

## 方向

### Vertical（垂直）

```html
<ha-stack direction="vertical">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>
```

### Horizontal（水平）

```html
<ha-stack direction="horizontal">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>
```

## ギャップ

6種類のギャップサイズが利用可能です：

```html
<ha-stack gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>
```

ギャップサイズ：

- `1`: 4px
- `2`: 8px
- `3`: 12px
- `4`: 16px (デフォルト)
- `5`: 20px
- `6`: 24px

## 配置

### Align（交差軸）

```html
<!-- 開始 -->
<ha-stack align="start">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- 中央 -->
<ha-stack align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- 終了 -->
<ha-stack align="end">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- 伸縮 -->
<ha-stack align="stretch">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>
```

### Justify（主軸）

```html
<!-- 開始 -->
<ha-stack justify="start">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- 中央 -->
<ha-stack justify="center">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- 終了 -->
<ha-stack justify="end">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- 均等配置 -->
<ha-stack justify="space-between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>

<ha-stack justify="space-around">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>
```

## 折り返し

```html
<ha-stack wrap>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ha-stack>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | スタック方向 |
| `gap` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6'` | `'4'` | アイテム間のギャップ |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 交差軸の配置 |
| `justify` | `'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around'` | `'start'` | 主軸の配置 |
| `wrap` | `boolean` | `false` | 折り返しの有無 |

## React

```tsx
import { Stack, Button } from '@hidearea-design/react';

function App() {
  return (
    <Stack direction="horizontal" gap="3" align="center">
      <Button variant="primary">保存</Button>
      <Button variant="outline">キャンセル</Button>
      <Button variant="ghost">削除</Button>
    </Stack>
  );
}
```

## Vue

```vue
<template>
  <HaStack direction="horizontal" gap="3" align="center">
    <HaButton variant="primary">保存</HaButton>
    <HaButton variant="outline">キャンセル</HaButton>
    <HaButton variant="ghost">削除</HaButton>
  </HaStack>
</template>

<script setup>
import { Stack as HaStack, Button as HaButton } from '@hidearea-design/vue';
</script>
```

## 使用例

### 垂直スタック

```html
<ha-stack direction="vertical" gap="4">
  <h1>タイトル</h1>
  <p>段落1</p>
  <p>段落2</p>
  <ha-button variant="primary">アクション</ha-button>
</ha-stack>
```

### ボタングループ

```html
<ha-stack direction="horizontal" gap="2">
  <ha-button variant="primary">保存</ha-button>
  <ha-button variant="outline">キャンセル</ha-button>
  <ha-button variant="danger">削除</ha-button>
</ha-stack>
```

### カード内のコンテンツ

```html
<ha-card>
  <ha-stack direction="vertical" gap="3">
    <h2>カードタイトル</h2>
    <p>カードの説明文</p>
    <ha-stack direction="horizontal" gap="2" justify="end">
      <ha-button variant="outline" size="sm">キャンセル</ha-button>
      <ha-button variant="primary" size="sm">確認</ha-button>
    </ha-stack>
  </ha-stack>
</ha-card>
```

### フォームレイアウト

```html
<ha-stack direction="vertical" gap="4">
  <ha-form-group label="お名前" required>
    <ha-input full-width></ha-input>
  </ha-form-group>

  <ha-form-group label="メールアドレス" required>
    <ha-input type="email" full-width></ha-input>
  </ha-form-group>

  <ha-form-group label="メッセージ" required>
    <ha-textarea rows="5" full-width></ha-textarea>
  </ha-form-group>

  <ha-stack direction="horizontal" gap="2" justify="end">
    <ha-button variant="outline">キャンセル</ha-button>
    <ha-button variant="primary" type="submit">送信</ha-button>
  </ha-stack>
</ha-stack>
```

### 中央配置

```html
<ha-stack
  direction="vertical"
  gap="4"
  align="center"
  justify="center"
  style="min-height: 400px;"
>
  <h1>404</h1>
  <p>ページが見つかりません</p>
  <ha-button variant="primary">ホームに戻る</ha-button>
</ha-stack>
```

### ナビゲーションバー

```html
<ha-stack
  direction="horizontal"
  gap="4"
  align="center"
  justify="space-between"
  style="padding: 16px; border-bottom: 1px solid var(--color-gray-200);"
>
  <div style="font-size: 20px; font-weight: bold;">Logo</div>

  <ha-stack direction="horizontal" gap="3">
    <a href="/">ホーム</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </ha-stack>

  <ha-stack direction="horizontal" gap="2">
    <ha-button variant="outline" size="sm">ログイン</ha-button>
    <ha-button variant="primary" size="sm">サインアップ</ha-button>
  </ha-stack>
</ha-stack>
```

### レスポンシブスタック

```tsx
import { Stack, Card } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ResponsiveStack() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap="4">
      <Card>Card 1</Card>
      <Card>Card 2</Card>
      <Card>Card 3</Card>
    </Stack>
  );
}
```

### ネストされたスタック

```html
<ha-stack direction="vertical" gap="4">
  <h1>商品一覧</h1>

  <ha-stack direction="horizontal" gap="2" wrap>
    <ha-badge variant="primary">新着</ha-badge>
    <ha-badge variant="success">セール</ha-badge>
    <ha-badge variant="warning">残りわずか</ha-badge>
  </ha-stack>

  <ha-grid columns="3" gap="4">
    <ha-card>
      <ha-stack direction="vertical" gap="2">
        <img src="product1.jpg" alt="Product 1" />
        <h3>商品1</h3>
        <p>¥1,000</p>
        <ha-button variant="primary" full-width>カートに追加</ha-button>
      </ha-stack>
    </ha-card>
    <!-- 他の商品カード -->
  </ha-grid>
</ha-stack>
```

## アクセシビリティ

- セマンティックHTMLとして機能します
- スクリーンリーダーは通常のDOM順で読み上げます
- キーボードナビゲーションは自然な順序で機能します

## スタイルのカスタマイズ

CSS変数を使用してカスタマイズできます：

```css
ha-stack {
  --stack-gap: 20px;
}

/* 特定のスタックにスタイルを適用 */
ha-stack[direction="horizontal"] {
  padding: 16px;
  background: var(--color-gray-50);
  border-radius: 8px;
}
```

## Grid との使い分け

- **Stack を使用**: 1方向のシンプルなレイアウト、ボタングループ、フォーム
- **Grid を使用**: 2次元のレイアウト、カードグリッド、ダッシュボード

```html
<!-- Stack: 1方向のレイアウト -->
<ha-stack direction="vertical" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>

<!-- Grid: 2次元のレイアウト -->
<ha-grid columns="3" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</ha-grid>
```
