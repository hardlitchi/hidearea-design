# Grid

グリッドレイアウトコンポーネント。12カラムシステムまたはカスタムカラム数をサポートします。

## 基本的な使い方

```html
<ha-grid columns="3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>
```

## カラム数

```html
<!-- 2カラム -->
<ha-grid columns="2">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-grid>

<!-- 3カラム -->
<ha-grid columns="3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>

<!-- 4カラム -->
<ha-grid columns="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</ha-grid>
```

## ギャップ

6種類のギャップサイズが利用可能です：

```html
<ha-grid columns="3" gap="2">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>
```

ギャップサイズ：

- `1`: 4px
- `2`: 8px (デフォルト)
- `3`: 12px
- `4`: 16px
- `5`: 20px
- `6`: 24px

## レスポンシブ

異なる画面サイズで異なるカラム数を設定できます：

```html
<ha-grid columns="1" md-columns="2" lg-columns="3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `columns` | `number \| string` | `12` | カラム数 |
| `gap` | `'1' \| '2' \| '3' \| '4' \| '5' \| '6'` | `'2'` | ギャップサイズ |
| `md-columns` | `number \| string` | - | タブレット用カラム数 |
| `lg-columns` | `number \| string` | - | デスクトップ用カラム数 |

## React

```tsx
import { Grid, Card } from '@hidearea-design/react';

function App() {
  return (
    <Grid columns="3" gap="4">
      <Card>Card 1</Card>
      <Card>Card 2</Card>
      <Card>Card 3</Card>
    </Grid>
  );
}
```

## Vue

```vue
<template>
  <HaGrid :columns="3" gap="4">
    <HaCard>Card 1</HaCard>
    <HaCard>Card 2</HaCard>
    <HaCard>Card 3</HaCard>
  </HaGrid>
</template>

<script setup>
import { Grid as HaGrid, Card as HaCard } from '@hidearea-design/vue';
</script>
```

## 使用例

### カードグリッド

```html
<ha-grid columns="3" gap="4">
  <ha-card>
    <h3>カード1</h3>
    <p>コンテンツ</p>
  </ha-card>
  <ha-card>
    <h3>カード2</h3>
    <p>コンテンツ</p>
  </ha-card>
  <ha-card>
    <h3>カード3</h3>
    <p>コンテンツ</p>
  </ha-card>
</ha-grid>
```

### レスポンシブグリッド

```html
<!-- モバイル: 1カラム, タブレット: 2カラム, デスクトップ: 4カラム -->
<ha-grid columns="1" md-columns="2" lg-columns="4" gap="4">
  <ha-card>Item 1</ha-card>
  <ha-card>Item 2</ha-card>
  <ha-card>Item 3</ha-card>
  <ha-card>Item 4</ha-card>
</ha-grid>
```

### 商品一覧

```tsx
import { Grid, Card, Button, Badge } from '@hidearea-design/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Grid columns="1" mdColumns="2" lgColumns="4" gap="4">
      {products.map((product) => (
        <Card key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>¥{product.price.toLocaleString()}</p>
          {product.inStock ? (
            <Badge variant="success">在庫あり</Badge>
          ) : (
            <Badge variant="error">在庫なし</Badge>
          )}
          <Button variant="primary" fullWidth disabled={!product.inStock}>
            カートに追加
          </Button>
        </Card>
      ))}
    </Grid>
  );
}
```

### ダッシュボード

```html
<ha-container max-width="xl">
  <h1>ダッシュボード</h1>

  <!-- 統計カード -->
  <ha-grid columns="1" md-columns="2" lg-columns="4" gap="4">
    <ha-card>
      <h3>総売上</h3>
      <p style="font-size: 24px; font-weight: bold;">¥1,234,567</p>
    </ha-card>
    <ha-card>
      <h3>訪問者数</h3>
      <p style="font-size: 24px; font-weight: bold;">12,345</p>
    </ha-card>
    <ha-card>
      <h3>コンバージョン率</h3>
      <p style="font-size: 24px; font-weight: bold;">3.45%</p>
    </ha-card>
    <ha-card>
      <h3>平均注文額</h3>
      <p style="font-size: 24px; font-weight: bold;">¥8,900</p>
    </ha-card>
  </ha-grid>

  <!-- メインコンテンツ -->
  <ha-grid columns="1" lg-columns="3" gap="4" style="margin-top: 24px;">
    <div style="grid-column: span 2;">
      <ha-card>
        <h2>売上グラフ</h2>
        <!-- グラフコンテンツ -->
      </ha-card>
    </div>
    <div>
      <ha-card>
        <h2>最近の注文</h2>
        <!-- 注文リスト -->
      </ha-card>
    </div>
  </ha-grid>
</ha-container>
```

### フォームレイアウト

```html
<ha-form-group label="住所情報">
  <ha-grid columns="1" md-columns="2" gap="3">
    <ha-input placeholder="郵便番号" full-width></ha-input>
    <ha-input placeholder="都道府県" full-width></ha-input>
    <div style="grid-column: span 2;">
      <ha-input placeholder="市区町村" full-width></ha-input>
    </div>
    <div style="grid-column: span 2;">
      <ha-input placeholder="番地" full-width></ha-input>
    </div>
  </ha-grid>
</ha-form-group>
```

### ギャラリー

```html
<ha-grid columns="2" md-columns="3" lg-columns="4" gap="2">
  <img src="image1.jpg" alt="Image 1" style="width: 100%; border-radius: 8px;">
  <img src="image2.jpg" alt="Image 2" style="width: 100%; border-radius: 8px;">
  <img src="image3.jpg" alt="Image 3" style="width: 100%; border-radius: 8px;">
  <img src="image4.jpg" alt="Image 4" style="width: 100%; border-radius: 8px;">
  <img src="image5.jpg" alt="Image 5" style="width: 100%; border-radius: 8px;">
  <img src="image6.jpg" alt="Image 6" style="width: 100%; border-radius: 8px;">
</ha-grid>
```

## アクセシビリティ

- セマンティックHTMLとして機能します
- グリッドアイテムは自動的に適切な順序で配置されます
- スクリーンリーダーは通常のDOM順で読み上げます

## スタイルのカスタマイズ

CSS変数とCSS Gridプロパティを使用してカスタマイズできます：

```css
ha-grid {
  /* カスタムギャップ */
  --grid-gap: 20px;
}

/* 子要素のスパン */
ha-grid > :first-child {
  grid-column: span 2;
}

ha-grid > :nth-child(2) {
  grid-row: span 2;
}
```

## CSS Grid との違い

このコンポーネントは CSS Grid のラッパーです。より高度なレイアウトが必要な場合は、CSS Grid を直接使用することもできます：

```html
<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
  <div>メインコンテンツ</div>
  <div>サイドバー</div>
</div>
```

## ブレークポイント

レスポンシブプロパティのブレークポイント：

| プロパティ | 最小幅 |
|-----------|--------|
| `columns` | 0px (デフォルト) |
| `md-columns` | 768px |
| `lg-columns` | 1024px |
