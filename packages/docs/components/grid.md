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

Grid コンポーネントは WCAG 2.1 AA 基準に準拠し、視覚的なグリッドレイアウトとDOM順序を一致させてアクセシビリティを確保します。

### DOM順序とビジュアル順序

Grid は CSS Grid ベースですが、DOM 順序とビジュアル順序を一致させることで、スクリーンリーダーとキーボードナビゲーションの一貫性を保ちます。

```html
<!-- ✓ 推奨: DOM 順序とビジュアル順序が一致 -->
<ha-grid columns="3" gap="4">
  <ha-card>カード 1 (左上)</ha-card>      <!-- DOM: 1, 視覚: 1 -->
  <ha-card>カード 2 (中央上)</ha-card>    <!-- DOM: 2, 視覚: 2 -->
  <ha-card>カード 3 (右上)</ha-card>      <!-- DOM: 3, 視覚: 3 -->
  <ha-card>カード 4 (左下)</ha-card>      <!-- DOM: 4, 視覚: 4 -->
  <ha-card>カード 5 (中央下)</ha-card>    <!-- DOM: 5, 視覚: 5 -->
  <ha-card>カード 6 (右下)</ha-card>      <!-- DOM: 6, 視覚: 6 -->
</ha-grid>

<!-- ❌ 避ける: CSS で視覚的順序を変更 -->
<ha-grid columns="3" gap="4" style="direction: rtl;">
  <!-- DOM順序と視覚順序が不一致になる可能性 -->
</ha-grid>
```

### キーボードナビゲーション

Grid 内のインタラクティブ要素は自然なタブ順序（左から右、上から下）でフォーカス可能です。

```html
<ha-grid columns="3" gap="4">
  <!-- フォーカス順序: 1 → 2 → 3 → 4 → 5 → 6 -->
  <ha-card>
    <h3>カード 1</h3>
    <ha-button>詳細</ha-button>  <!-- フォーカス: 1 -->
  </ha-card>
  <ha-card>
    <h3>カード 2</h3>
    <ha-button>詳細</ha-button>  <!-- フォーカス: 2 -->
  </ha-card>
  <ha-card>
    <h3>カード 3</h3>
    <ha-button>詳細</ha-button>  <!-- フォーカス: 3 -->
  </ha-card>
</ha-grid>
```

**キーボード操作**:
- `Tab`: 次のフォーカス可能要素へ移動（左から右、上から下）
- `Shift + Tab`: 前のフォーカス可能要素へ移動
- `Enter` / `Space`: フォーカス中の要素を操作

### スクリーンリーダー

Grid は構造的なコンポーネントであり、スクリーンリーダーは DOM 順序に従ってコンテンツを読み上げます。

```html
<ha-grid columns="2" gap="4">
  <ha-card>
    <h3>売上</h3>
    <p>¥1,234,567</p>
  </ha-card>
  <ha-card>
    <h3>訪問者数</h3>
    <p>12,345人</p>
  </ha-card>
  <ha-card>
    <h3>コンバージョン率</h3>
    <p>3.45%</p>
  </ha-card>
  <ha-card>
    <h3>平均注文額</h3>
    <p>¥8,900</p>
  </ha-card>
</ha-grid>
```

**スクリーンリーダーの読み上げ順序** (NVDA/JAWS/VoiceOver):
1. "見出しレベル3、売上"
2. "1,234,567円"
3. "見出しレベル3、訪問者数"
4. "12,345人"
5. "見出しレベル3、コンバージョン率"
6. "3.45パーセント"
7. "見出しレベル3、平均注文額"
8. "8,900円"

### ARIA属性の適切な使用

Grid 自体には ARIA 属性は必要ありませんが、内部要素には適切な ARIA 属性を設定します。

```html
<!-- 商品グリッド -->
<section aria-label="商品一覧">
  <ha-grid columns="3" gap="4">
    <article aria-labelledby="product-1-title">
      <h3 id="product-1-title">商品 1</h3>
      <img src="product1.jpg" alt="商品 1 の画像" />
      <p>¥1,000</p>
      <ha-button aria-label="商品 1 をカートに追加">カートに追加</ha-button>
    </article>
    <article aria-labelledby="product-2-title">
      <h3 id="product-2-title">商品 2</h3>
      <img src="product2.jpg" alt="商品 2 の画像" />
      <p>¥2,000</p>
      <ha-button aria-label="商品 2 をカートに追加">カートに追加</ha-button>
    </article>
  </ha-grid>
</section>
```

### レスポンシブアクセシビリティ

レスポンシブグリッドでは、すべてのビューポートサイズでコンテンツが読みやすく、操作可能であることを確保します。

```html
<!-- モバイルファーストアプローチ -->
<ha-grid columns="1" md-columns="2" lg-columns="3" gap="4">
  <ha-card>
    <h3>カード 1</h3>
    <p>モバイル: 1カラム（縦に並ぶ）</p>
    <p>タブレット: 2カラム</p>
    <p>デスクトップ: 3カラム</p>
  </ha-card>
  <ha-card>
    <h3>カード 2</h3>
    <p>すべてのデバイスで読みやすく、タップ/クリック可能</p>
  </ha-card>
  <ha-card>
    <h3>カード 3</h3>
    <p>44x44px 最小タッチターゲットを維持</p>
  </ha-card>
</ha-grid>
```

### セマンティック HTML との組み合わせ

```html
<!-- ブログ記事グリッド -->
<section aria-label="最新記事">
  <h2>最新記事</h2>
  <ha-grid columns="1" md-columns="2" lg-columns="3" gap="4">
    <article>
      <header>
        <h3>記事タイトル 1</h3>
        <time datetime="2025-01-15">2025年1月15日</time>
      </header>
      <p>記事の要約...</p>
      <footer>
        <a href="/articles/1">続きを読む</a>
      </footer>
    </article>
    <article>
      <header>
        <h3>記事タイトル 2</h3>
        <time datetime="2025-01-14">2025年1月14日</time>
      </header>
      <p>記事の要約...</p>
      <footer>
        <a href="/articles/2">続きを読む</a>
      </footer>
    </article>
  </ha-grid>
</section>
```

### フォーカス管理のベストプラクティス

```html
<!-- 商品グリッド with フォーカストラップ -->
<div role="region" aria-label="商品セクション">
  <h2 id="products-heading">おすすめ商品</h2>
  <ha-grid columns="3" gap="4" aria-labelledby="products-heading">
    <ha-card tabindex="0">
      <h3>商品 1</h3>
      <p>説明...</p>
      <ha-stack direction="horizontal" gap="2">
        <ha-button variant="outline">詳細</ha-button>
        <ha-button variant="primary">購入</ha-button>
      </ha-stack>
    </ha-card>
    <!-- 他の商品カード -->
  </ha-grid>
</div>
```

### 複数行にまたがるアイテムのアクセシビリティ

```html
<!-- ダッシュボードレイアウト -->
<ha-grid columns="3" gap="4">
  <!-- メインチャート (2行 x 2列) -->
  <div style="grid-column: span 2; grid-row: span 2;" role="region" aria-label="売上チャート">
    <ha-card>
      <h2>売上推移</h2>
      <div role="img" aria-label="過去30日間の売上推移グラフ">
        <!-- グラフコンテンツ -->
      </div>
    </ha-card>
  </div>

  <!-- サイドバー統計 -->
  <ha-card>
    <h3>今日の売上</h3>
    <p aria-live="polite">¥123,456</p>
  </ha-card>
  <ha-card>
    <h3>訪問者数</h3>
    <p aria-live="polite">1,234人</p>
  </ha-card>
</ha-grid>
```

### リスト vs グリッド

適切なセマンティックパターンを選択：

```html
<!-- リストとして扱うべき場合 -->
<ul style="list-style: none; padding: 0;">
  <ha-grid columns="3" gap="4">
    <li>
      <ha-card>アイテム 1</ha-card>
    </li>
    <li>
      <ha-card>アイテム 2</ha-card>
    </li>
    <li>
      <ha-card>アイテム 3</ha-card>
    </li>
  </ha-grid>
</ul>

<!-- 独立したセクションとして扱う場合 -->
<ha-grid columns="3" gap="4">
  <section aria-labelledby="section-1">
    <h3 id="section-1">セクション 1</h3>
    <p>コンテンツ...</p>
  </section>
  <section aria-labelledby="section-2">
    <h3 id="section-2">セクション 2</h3>
    <p>コンテンツ...</p>
  </section>
</ha-grid>
```

## スタイルのカスタマイズ

Grid コンポーネントは、デザイントークンとカスタムCSS変数、CSS Grid プロパティを使用して柔軟にカスタマイズできます。

### デザイントークン

Grid コンポーネントで使用される主要なデザイントークン：

```css
:root {
  /* ギャップサイズ */
  --grid-gap-1: var(--space-1); /* 4px */
  --grid-gap-2: var(--space-2); /* 8px (デフォルト) */
  --grid-gap-3: var(--space-3); /* 12px */
  --grid-gap-4: var(--space-4); /* 16px */
  --grid-gap-5: var(--space-5); /* 20px */
  --grid-gap-6: var(--space-6); /* 24px */

  /* ブレークポイント */
  --grid-breakpoint-md: 768px;
  --grid-breakpoint-lg: 1024px;
}
```

### カスタムCSS変数

Grid のスタイルをカスタマイズするためのCSS変数：

```css
ha-grid {
  /* ギャップ */
  --grid-gap: var(--space-2); /* 8px */
  --grid-row-gap: var(--space-2); /* 8px */
  --grid-column-gap: var(--space-2); /* 8px */

  /* カラム */
  --grid-columns: 12;
  --grid-auto-flow: row;
}

/* カスタムギャップ */
ha-grid.tight {
  --grid-gap: var(--space-1); /* 4px */
}

ha-grid.spacious {
  --grid-gap: var(--space-6); /* 24px */
}

/* 行と列で異なるギャップ */
ha-grid.asymmetric {
  --grid-row-gap: var(--space-2); /* 8px */
  --grid-column-gap: var(--space-4); /* 16px */
}
```

### Shadow DOMパーツ

Grid は Shadow DOM を使用しており、`::part()` セレクタでスタイルをカスタマイズできます：

```css
/* Grid ラッパー */
ha-grid::part(grid) {
  background-color: var(--color-surface-50);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

/* 特定のカラム数のグリッド */
ha-grid[columns="3"]::part(grid) {
  background-color: var(--color-surface-100);
}
```

### グリッドアイテムのカスタマイズ

子要素に対して CSS Grid プロパティを使用：

```css
/* 最初の要素を2カラム分に */
ha-grid > :first-child {
  grid-column: span 2;
}

/* 2番目の要素を2行分に */
ha-grid > :nth-child(2) {
  grid-row: span 2;
}

/* 特定の位置に配置 */
ha-grid > :nth-child(3) {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}

/* すべてのアイテムの最小高さ */
ha-grid > * {
  min-height: 200px;
}
```

### レスポンシブカスタマイズ

ビューポートサイズに応じて異なるスタイルを適用：

```css
ha-grid {
  --grid-gap: var(--space-2); /* 8px (モバイル) */
}

/* タブレット */
@media (min-width: 768px) {
  ha-grid {
    --grid-gap: var(--space-4); /* 16px */
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  ha-grid {
    --grid-gap: var(--space-6); /* 24px */
  }
}

/* カスタムブレークポイント */
@media (min-width: 1440px) {
  ha-grid[columns="3"] {
    --grid-columns: 4; /* 大画面では4カラムに */
  }
}
```

### ダークモード対応

ダークモードでの Grid スタイル：

```css
/* ライトモード */
:root {
  --grid-background: var(--color-surface-0);
  --grid-border-color: var(--color-border-subtle);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  :root {
    --grid-background: var(--color-surface-900);
    --grid-border-color: var(--color-border-subtle-dark);
  }
}

ha-grid.themed::part(grid) {
  background-color: var(--grid-background);
  border: 1px solid var(--grid-border-color);
}
```

### カスタムテーマ

Grid のカスタムテーマ例：

```css
/* ダッシュボードグリッド */
ha-grid.dashboard {
  --grid-gap: var(--space-6);
  padding: var(--space-6);
  background: linear-gradient(
    135deg,
    var(--color-surface-50) 0%,
    var(--color-surface-100) 100%
  );
  border-radius: var(--radius-lg);
}

ha-grid.dashboard::part(grid) {
  box-shadow: var(--shadow-md);
}

/* ギャラリーグリッド */
ha-grid.gallery {
  --grid-gap: var(--space-1);
  background-color: var(--color-surface-900);
  padding: var(--space-2);
}

ha-grid.gallery > img {
  border-radius: var(--radius-sm);
  transition: transform 0.2s ease-in-out;
}

ha-grid.gallery > img:hover {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

/* カードグリッド */
ha-grid.card-grid {
  --grid-gap: var(--space-4);
}

ha-grid.card-grid > ha-card {
  border: 1px solid var(--color-border-subtle);
  transition: all 0.2s ease-in-out;
}

ha-grid.card-grid > ha-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary-300);
}
```

### Auto-fit と Auto-fill

CSS Grid の高度な機能を使用：

```css
/* 自動的にフィットするカラム（最小200px） */
ha-grid.auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* 自動的に埋めるカラム（最小150px） */
ha-grid.auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
```

```html
<ha-grid class="auto-fit" gap="4">
  <ha-card>自動フィット 1</ha-card>
  <ha-card>自動フィット 2</ha-card>
  <ha-card>自動フィット 3</ha-card>
</ha-grid>
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 1. レスポンシブファーストアプローチ

```html
<!-- モバイルファースト: 1→2→3カラム -->
<ha-grid columns="1" md-columns="2" lg-columns="3" gap="4">
  <ha-card>カード 1</ha-card>
  <ha-card>カード 2</ha-card>
  <ha-card>カード 3</ha-card>
  <ha-card>カード 4</ha-card>
  <ha-card>カード 5</ha-card>
  <ha-card>カード 6</ha-card>
</ha-grid>
```

**理由**: すべてのデバイスで最適なレイアウトを提供し、モバイルユーザビリティを優先。

#### 2. 一貫したギャップの使用

```html
<!-- アプリケーション全体で一貫したギャップ -->
<ha-grid columns="3" gap="4">
  <ha-card>カード 1</ha-card>
  <ha-card>カード 2</ha-card>
  <ha-card>カード 3</ha-card>
</ha-grid>

<ha-grid columns="2" gap="4">
  <ha-card>カード A</ha-card>
  <ha-card>カード B</ha-card>
</ha-grid>
```

**理由**: 一貫したギャップでビジュアル階層を明確にし、ユーザーエクスペリエンスを向上。

#### 3. セマンティック HTML との組み合わせ

```html
<!-- 商品リスト -->
<ul style="list-style: none; padding: 0;">
  <ha-grid columns="3" gap="4">
    <li>
      <ha-card>商品 1</ha-card>
    </li>
    <li>
      <ha-card>商品 2</ha-card>
    </li>
    <li>
      <ha-card>商品 3</ha-card>
    </li>
  </ha-grid>
</ul>
```

**理由**: セマンティック HTML でアクセシビリティと SEO を向上。

#### 4. 適切なカラム数の選択

```html
<!-- ダッシュボード: 4カラム -->
<ha-grid columns="4" gap="4">
  <ha-card>統計 1</ha-card>
  <ha-card>統計 2</ha-card>
  <ha-card>統計 3</ha-card>
  <ha-card>統計 4</ha-card>
</ha-grid>

<!-- 商品一覧: 3カラム -->
<ha-grid columns="3" gap="4">
  <ha-card>商品 1</ha-card>
  <ha-card>商品 2</ha-card>
  <ha-card>商品 3</ha-card>
</ha-grid>

<!-- ブログ記事: 2カラム -->
<ha-grid columns="2" gap="4">
  <article>記事 1</article>
  <article>記事 2</article>
</ha-grid>
```

**理由**: コンテンツタイプに応じた最適なカラム数で読みやすさとユーザビリティを向上。

### ✗ 避けるべき使い方

#### 1. 過度に多いカラム数

```html
<!-- ❌ 避ける: 8カラムは読みにくい -->
<ha-grid columns="8" gap="2">
  <ha-card>1</ha-card>
  <ha-card>2</ha-card>
  <ha-card>3</ha-card>
  <!-- ... -->
</ha-grid>
```

**理由**: カラム数が多すぎるとアイテムが小さくなり、モバイルで読みにくい。

**代替案**:
```html
<!-- ✓ 推奨: レスポンシブで適切なカラム数 -->
<ha-grid columns="2" md-columns="4" lg-columns="6" gap="4">
  <ha-card>1</ha-card>
  <ha-card>2</ha-card>
  <ha-card>3</ha-card>
  <!-- ... -->
</ha-grid>
```

#### 2. 一貫性のないギャップ

```html
<!-- ❌ 避ける: 同じページで異なるギャップ -->
<ha-grid columns="3" gap="2">
  <ha-card>セクション 1</ha-card>
</ha-grid>

<ha-grid columns="3" gap="6">
  <ha-card>セクション 2</ha-card>
</ha-grid>
```

**理由**: 一貫性のないギャップでビジュアル階層が不明瞭になる。

**代替案**:
```html
<!-- ✓ 推奨: 一貫したギャップ -->
<ha-grid columns="3" gap="4">
  <ha-card>セクション 1</ha-card>
  <ha-card>セクション 2</ha-card>
</ha-grid>
```

#### 3. 固定幅のグリッド（レスポンシブ未対応）

```html
<!-- ❌ 避ける: すべてのデバイスで3カラム -->
<ha-grid columns="3" gap="4">
  <ha-card>カード 1</ha-card>
  <ha-card>カード 2</ha-card>
  <ha-card>カード 3</ha-card>
</ha-grid>
```

**理由**: モバイルで3カラムは狭すぎて読みにくい。

**代替案**:
```html
<!-- ✓ 推奨: レスポンシブグリッド -->
<ha-grid columns="1" md-columns="2" lg-columns="3" gap="4">
  <ha-card>カード 1</ha-card>
  <ha-card>カード 2</ha-card>
  <ha-card>カード 3</ha-card>
</ha-grid>
```

#### 4. 1方向のレイアウトに Grid を使用

```html
<!-- ❌ 避ける: 垂直配置に Grid を使用 -->
<ha-grid columns="1" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-grid>
```

**理由**: 1方向のレイアウトには Stack の方が適切でシンプル。

**代替案**:
```html
<!-- ✓ 推奨: Stack を使用 -->
<ha-stack direction="vertical" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ha-stack>
```

## よくある質問

### 1. Grid と Stack の使い分けは？

**Grid**: 2次元のレイアウトに使用
- カードグリッド（商品、ブログ記事）
- ダッシュボード（統計カード）
- フォトギャラリー
- 複雑なダッシュボードレイアウト

**Stack**: 1方向のシンプルなレイアウトに使用
- ボタングループ
- フォーム（垂直配置）
- ナビゲーションメニュー（水平配置）

```html
<!-- Grid: 商品グリッド -->
<ha-grid columns="3" gap="4">
  <ha-card>商品 1</ha-card>
  <ha-card>商品 2</ha-card>
  <ha-card>商品 3</ha-card>
</ha-grid>

<!-- Stack: フォーム -->
<ha-stack direction="vertical" gap="4">
  <ha-input label="名前" />
  <ha-input label="メール" />
  <ha-button>送信</ha-button>
</ha-stack>
```

### 2. グリッドアイテムを複数カラム/行にまたがせるには？

CSS Grid の `grid-column` と `grid-row` プロパティを使用します：

```html
<ha-grid columns="3" gap="4">
  <!-- 2カラムにまたがる -->
  <ha-card style="grid-column: span 2;">
    <h2>大きなカード</h2>
  </ha-card>

  <!-- 1カラム（デフォルト） -->
  <ha-card>
    <h3>小さなカード</h3>
  </ha-card>

  <!-- 3カラム全体にまたがる -->
  <ha-card style="grid-column: span 3;">
    <h2>フルワイドカード</h2>
  </ha-card>

  <!-- 2行にまたがる -->
  <ha-card style="grid-row: span 2;">
    <h3>縦長カード</h3>
  </ha-card>

  <ha-card>通常カード 1</ha-card>
  <ha-card>通常カード 2</ha-card>
</ha-grid>
```

### 3. レスポンシブで動的にカラム数を変更するには？

HTML 属性を使用する方法（推奨）:

```html
<!-- モバイル: 1, タブレット: 2, デスクトップ: 4 -->
<ha-grid columns="1" md-columns="2" lg-columns="4" gap="4">
  <ha-card>カード 1</ha-card>
  <ha-card>カード 2</ha-card>
  <ha-card>カード 3</ha-card>
  <ha-card>カード 4</ha-card>
</ha-grid>
```

CSS メディアクエリを使用する方法：

```css
ha-grid.responsive {
  --grid-columns: 1; /* モバイル */
}

@media (min-width: 768px) {
  ha-grid.responsive {
    --grid-columns: 2; /* タブレット */
  }
}

@media (min-width: 1024px) {
  ha-grid.responsive {
    --grid-columns: 4; /* デスクトップ */
  }
}
```

### 4. 自動的にレスポンシブ対応するグリッドを作るには？

CSS Grid の `auto-fit` または `auto-fill` と `minmax()` を使用：

```css
ha-grid.auto-responsive {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

```html
<ha-grid class="auto-responsive" gap="4">
  <ha-card>自動的にフィットするカード 1</ha-card>
  <ha-card>自動的にフィットするカード 2</ha-card>
  <ha-card>自動的にフィットするカード 3</ha-card>
  <ha-card>自動的にフィットするカード 4</ha-card>
</ha-grid>
```

**auto-fit vs auto-fill**:
- `auto-fit`: 利用可能なスペースに合わせてアイテムを拡張
- `auto-fill`: 空のトラックを作成して埋める

## 関連コンポーネント

- [Stack](/components/stack) - 1方向スタックレイアウト
- [Container](/components/container) - コンテンツコンテナ
- [Card](/components/card) - カードコンテナ

## API リファレンス

### GridProps

```typescript
interface GridProps {
  /**
   * カラム数
   * @default 12
   */
  columns?: number | string;

  /**
   * タブレット用カラム数 (768px以上)
   */
  mdColumns?: number | string;

  /**
   * デスクトップ用カラム数 (1024px以上)
   */
  lgColumns?: number | string;

  /**
   * アイテム間のギャップ
   * @default '2'
   */
  gap?: '1' | '2' | '3' | '4' | '5' | '6';

  /**
   * 子要素
   */
  children: React.ReactNode;

  /**
   * カスタムクラス名
   */
  className?: string;

  /**
   * カスタムスタイル
   */
  style?: React.CSSProperties;
}
```

### CSS Variables

```typescript
interface GridCSSVariables {
  /** アイテム間のギャップ */
  '--grid-gap'?: string;

  /** 行方向のギャップ */
  '--grid-row-gap'?: string;

  /** 列方向のギャップ */
  '--grid-column-gap'?: string;

  /** カラム数 */
  '--grid-columns'?: number | string;

  /** グリッドの自動フロー方向 */
  '--grid-auto-flow'?: 'row' | 'column' | 'dense';

  /** 背景色 */
  '--grid-background'?: string;

  /** ボーダーカラー */
  '--grid-border-color'?: string;
}
```

### Shadow DOM Parts

```typescript
interface GridParts {
  /** Grid ラッパー要素 */
  grid: HTMLDivElement;
}
```

使用例：
```css
ha-grid::part(grid) {
  background-color: var(--color-surface-100);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## トラブルシューティング

### 1. グリッドアイテムが意図したサイズにならない

**問題**: グリッドアイテムが伸びたり縮んだりして、意図したサイズにならない。

**原因**: CSS Grid のデフォルト動作により、アイテムが利用可能なスペースに合わせて伸縮します。

**解決策**:
```css
/* アイテムの最小・最大サイズを指定 */
ha-grid > * {
  min-width: 200px;
  max-width: 400px;
}

/* または、固定幅を指定 */
ha-grid > ha-card {
  width: 300px;
}

/* 高さも同様に制御可能 */
ha-grid > * {
  min-height: 250px;
}
```

### 2. レスポンシブブレークポイントが効かない

**問題**: `md-columns` や `lg-columns` を設定しても、カラム数が変わらない。

**原因**: CSS 変数がオーバーライドされているか、属性名が正しくありません。

**解決策**:
```html
<!-- ✓ 正しい: ケバブケース -->
<ha-grid columns="1" md-columns="2" lg-columns="3">
  <ha-card>カード</ha-card>
</ha-grid>

<!-- ❌ 間違い: キャメルケース -->
<ha-grid columns="1" mdColumns="2" lgColumns="3">
  <ha-card>カード</ha-card>
</ha-grid>
```

CSS を確認：
```css
/* カスタム CSS がブレークポイントをオーバーライドしていないか確認 */
ha-grid {
  /* この設定を削除 */
  grid-template-columns: repeat(3, 1fr) !important;
}
```

### 3. ギャップが適用されない

**問題**: `gap` プロパティを設定してもギャップが表示されない。

**原因**: CSS 変数がオーバーライドされているか、ブラウザが CSS Gap をサポートしていない可能性があります。

**解決策**:
```css
/* CSS 変数を確認 */
ha-grid {
  --grid-gap: var(--space-2); /* デフォルト値に戻す */
}

/* または、明示的にギャップを設定 */
ha-grid[gap="4"] {
  gap: 16px !important;
}
```

### 4. グリッドアイテムの順序が意図と異なる

**問題**: グリッドアイテムの表示順序が DOM 順序と異なる。

**原因**: CSS Grid の `order` プロパティや `grid-auto-flow: dense` が使用されている可能性があります。

**解決策**:
```html
<!-- ✓ 推奨: DOM 順序を正しく設定 -->
<ha-grid columns="3" gap="4">
  <ha-card>1番目（左上）</ha-card>
  <ha-card>2番目（中央上）</ha-card>
  <ha-card>3番目（右上）</ha-card>
  <ha-card>4番目（左下）</ha-card>
</ha-grid>

<!-- ❌ 避ける: CSS で順序を変更 -->
<style>
  ha-grid > :first-child {
    order: 4; /* アクセシビリティ問題 */
  }
</style>
```

DOM 順序を変更することが最善の解決策です：
```tsx
// React での動的順序変更
import { Grid, Card } from '@hidearea-design/react';

function DynamicGrid({ items }: { items: Item[] }) {
  // データレベルでソート
  const sortedItems = [...items].sort((a, b) => a.priority - b.priority);

  return (
    <Grid columns="3" gap="4">
      {sortedItems.map((item) => (
        <Card key={item.id}>{item.title}</Card>
      ))}
    </Grid>
  );
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
