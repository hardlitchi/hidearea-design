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

Cardコンポーネントは、WCAG 2.1 AAに準拠し、コンテンツコンテナのアクセシビリティ要件を満たしています。

### ARIAサポート

Cardコンポーネントで使用されるARIA属性：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="article"` | card要素 | 独立したコンテンツセクションであることを示す（デフォルト） |
| `role="region"` | card要素 | ランドマークとして使用する場合（`aria-label`必須） |
| `role="button"` | card要素 | クリッカブルなカードの場合に設定 |
| `tabindex="0"` | card要素 | キーボードフォーカス可能（クリッカブルカードの場合） |
| `aria-label` | card要素 | カードの目的を説明（クリッカブルカードで必須） |
| `aria-labelledby` | card要素 | カード内の見出しIDを参照 |
| `aria-describedby` | card要素 | カードの説明テキストIDを参照 |
| `aria-pressed` | card要素 | トグル可能なカードの状態（true/false） |

### キーボードナビゲーション

#### 通常のカード（静的コンテンツ）

| キー | 動作 |
|-----|------|
| `Tab` | カード内のフォーカス可能要素へ移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |

#### クリッカブルカード（インタラクティブ）

| キー | 動作 |
|-----|------|
| `Tab` | カード自体にフォーカス |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |
| `Enter` | カードをアクティベート（クリック） |
| `Space` | カードをアクティベート（クリック） |

### スクリーンリーダーの対応

Cardコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例

**通常のカード**:
```
「記事、商品カード」
「商品名、見出しレベル3」
「商品の説明、テキスト」
（"Article, Product card"）
（"Product name, heading level 3"）
（"Product description, text"）
```

**クリッカブルカード（role="button"）**:
```
「商品の詳細を表示、ボタン」
「商品名、見出しレベル3」
「商品の説明」
（"View product details, button"）
（"Product name, heading level 3"）
（"Product description"）
```

**リンクでラップされたカード**:
```
「商品ページへ移動、リンク」
「商品名、見出しレベル3」
「商品の説明」
（"Navigate to product page, link"）
（"Product name, heading level 3"）
（"Product description"）
```

**ランドマークとしてのカード**:
```
「ユーザー統計、ランドマーク」
「総売上、見出しレベル3」
「1,234,567円」
（"User statistics, landmark"）
（"Total sales, heading level 3"）
（"1,234,567 yen"）
```

**トグル可能なカード**:
```
「カードを展開、トグルボタン、押されていない」
（"Expand card, toggle button, not pressed"）

「カードを折りたたむ、トグルボタン、押されている」
（"Collapse card, toggle button, pressed"）
```

### フォーカス管理

```css
/* 通常のカード - フォーカス不要 */
ha-card {
  /* フォーカススタイルなし */
}

/* クリッカブルカード - フォーカスインジケーター */
ha-card[role="button"]:focus,
ha-card[tabindex="0"]:focus {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  ha-card[role="button"]:focus {
    outline-width: 3px;
  }
}

/* 強制カラーモード対応 */
@media (forced-colors: active) {
  ha-card[role="button"]:focus {
    outline-color: Highlight;
  }
}
```

### クリッカブルカードの実装パターン

#### パターン1: リンクでラップ（推奨）

```html
<!-- ✓✓ Best: SEOとアクセシビリティに最適 -->
<a href="/product/123" style="text-decoration: none; color: inherit;">
  <ha-card>
    <h3>商品名</h3>
    <p>商品の説明</p>
  </ha-card>
</a>
```

**スクリーンリーダー読み上げ**:
```
「商品ページへ移動、リンク、商品名、商品の説明」
（"Navigate to product page, link, Product name, Product description"）
```

#### パターン2: role="button"（JavaScriptアクション用）

```html
<!-- ✓ Good: JavaScriptアクションの場合 -->
<ha-card
  role="button"
  tabindex="0"
  aria-label="商品の詳細を表示"
  @click="viewDetails"
  @keydown.enter="viewDetails"
  @keydown.space.prevent="viewDetails"
  style="cursor: pointer;"
>
  <h3>商品名</h3>
  <p>商品の説明</p>
</ha-card>
```

**React での実装**:
```tsx
import { Card } from '@hidearea-design/react';

function ClickableCard() {
  const handleClick = () => console.log('Clicked');
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label="商品の詳細を表示"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: 'pointer' }}
    >
      <h3>商品名</h3>
      <p>商品の説明</p>
    </Card>
  );
}
```

#### パターン3: カード内に個別のアクション（推奨）

```html
<!-- ✓✓ Best: 複数アクションがある場合 -->
<ha-card>
  <h3>商品名</h3>
  <p>商品の説明</p>
  <ha-stack direction="horizontal" gap="2">
    <ha-button variant="primary" aria-label="商品をカートに追加">カートに追加</ha-button>
    <ha-button variant="outline" aria-label="商品の詳細を表示">詳細</ha-button>
  </ha-stack>
</ha-card>
```

**スクリーンリーダー読み上げ**:
```
「記事」
「商品名、見出しレベル3」
「商品の説明」
「商品をカートに追加、ボタン」
「商品の詳細を表示、ボタン」
```

### セマンティックHTML

カード内では適切な見出しレベルと構造を使用：

```html
<!-- ✓ Good: セマンティックな構造 -->
<ha-card>
  <article>
    <header>
      <h2>メインタイトル</h2>
      <p style="color: var(--color-text-secondary); font-size: 14px;">
        投稿日: 2024年12月9日
      </p>
    </header>
    <p>記事の本文...</p>
    <footer>
      <a href="/article/123">続きを読む</a>
    </footer>
  </article>
</ha-card>

<!-- ✗ Bad: divのみ -->
<ha-card>
  <div style="font-size: 24px; font-weight: bold;">タイトル</div>
  <div style="font-size: 12px; color: gray;">2024年12月9日</div>
  <div>本文</div>
  <div>続きを読む</div>
</ha-card>
```

### カードグリッドのアクセシビリティ

```html
<!-- ✓ Good: ランドマークとして明示 -->
<section aria-label="商品一覧">
  <h2>おすすめ商品</h2>
  <ha-grid columns="1" md-columns="2" lg-columns="3" gap="4">
    <ha-card>
      <h3>商品1</h3>
      <p>説明1</p>
    </ha-card>
    <ha-card>
      <h3>商品2</h3>
      <p>説明2</p>
    </ha-card>
    <ha-card>
      <h3>商品3</h3>
      <p>説明3</p>
    </ha-card>
  </ha-grid>
</section>
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* Card */
var(--component-card-background-default)
var(--component-card-background-hover)
var(--component-card-background-selected)
var(--component-card-border-default)
var(--component-card-border-hover)
var(--component-card-border-selected)

/* 共通トークン */
var(--spacing-md)              /* パディング（中） */
var(--spacing-lg)              /* パディング（大） */
var(--border-radius-lg)        /* 角丸 */
var(--surface-level-1-background)  /* サーフェスレベル */
var(--surface-level-1-elevation)   /* シャドウ */
var(--interaction-transition-normal-duration)  /* トランジション */
var(--state-hover-elevation-medium)  /* ホバー時のシャドウ */
```

### カスタムCSS変数

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

### スタイルの上書き

Shadow DOMのパーツを使用してスタイルを上書き：

```css
ha-card::part(card) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* バリアント別のカスタマイズ */
ha-card[variant="elevated"]::part(card) {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
```

## バリアント別の使い分け

| バリアント | 用途 | 特徴 |
|-----------|------|------|
| `default` | 標準的なコンテンツ | シンプル、軽量 |
| `outlined` | 区別が必要なコンテンツ | ボーダー付き |
| `elevated` | 重要なコンテンツ | シャドウで強調 |

## ベストプラクティス

### Do's ✓

- **適切な見出しレベルを使用**: カード内でセマンティックなHTML（h2, h3など）を使用
- **一貫したパディング**: 同じグリッド内のカードは同じパディング設定を使用
- **レスポンシブグリッド**: Grid や Container と組み合わせてモバイル対応
- **クリッカブルな場合はリンクを使用**: `<a>` タグでラップするか、適切なARIA属性を設定
- **画像は padding="false"**: 画像をカード全体に表示する場合はパディングを無効化
- **明確なアクション**: カード内のボタンは目的を明確に（"詳細を見る"、"購入する"など）

### Don'ts ✗

- **カード内にカード**: ネストしたカードは視覚的に混乱を招く
- **過度なシャドウ**: elevated バリアントの濫用は避ける
- **長すぎるコンテンツ**: カードは簡潔に。詳細は別ページやモーダルで
- **一貫性のない高さ**: グリッド内のカードは高さを揃える（CSSで調整）
- **クリッカブル領域の不明確さ**: カード全体がクリッカブルか、ボタンのみかを明確に

## よくある質問

### カードをクリッカブルにするベストプラクティスは？

リンクとして機能する場合は `<a>` タグでラップするのが最適：

```html
<!-- Best ✓✓: SEOとアクセシビリティに最適 -->
<a href="/product/123" style="text-decoration: none; color: inherit;">
  <ha-card variant="outlined">
    <h3>商品名</h3>
    <p>説明</p>
  </ha-card>
</a>

<!-- Good ✓: JavaScriptアクションの場合 -->
<ha-card
  role="button"
  tabindex="0"
  aria-label="詳細を表示"
  @click="viewDetails"
  @keydown.enter="viewDetails"
  @keydown.space.prevent="viewDetails"
  style="cursor: pointer;"
>
  <h3>タイトル</h3>
</ha-card>
```

### カードの高さを揃えるには？

CSSの `height` または Grid の `align-items` を使用：

```css
/* 方法1: 固定高さ */
ha-card {
  height: 300px;
}

/* 方法2: Grid の stretch */
ha-grid {
  align-items: stretch;
}

ha-card {
  height: 100%;
}
```

React/Vueの場合：

```tsx
<Grid columns="3" gap="4" style={{ alignItems: 'stretch' }}>
  <Card style={{ height: '100%' }}>...</Card>
  <Card style={{ height: '100%' }}>...</Card>
  <Card style={{ height: '100%' }}>...</Card>
</Grid>
```

### カードに画像を追加する際のベストプラクティスは？

`padding="false"` を使用し、画像部分のみパディングを無効化：

```html
<ha-card padding="false">
  <!-- 画像: パディングなし -->
  <img
    src="image.jpg"
    alt="説明"
    style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0;"
  />
  <!-- コンテンツ: パディング追加 -->
  <div style="padding: 16px;">
    <h3>タイトル</h3>
    <p>説明文</p>
  </div>
</ha-card>
```

### ホバーエフェクトを追加するには？

CSSトランジションとJavaScriptイベントを組み合わせます：

```tsx
// React
<Card
  variant="outlined"
  style={{
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
>
  <h3>ホバーで浮き上がるカード</h3>
</Card>
```

CSS のみの場合：

```css
ha-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

ha-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
```

## 関連コンポーネント

- [Grid](/components/grid) - カードのグリッドレイアウト
- [Container](/components/container) - カードコンテナのレスポンシブ対応
- [Stack](/components/stack) - カード内のコンテンツ配置
- [Button](/components/button) - カード内のアクションボタン
- [Badge](/components/badge) - カード内のステータス表示

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { CardProps } from '@hidearea-design/core';

interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: boolean;
}
```

## トラブルシューティング

### カード内の画像が正しく表示されない

**問題**: 画像がカードからはみ出す、または歪んで表示される

**解決策**:
1. `padding="false"` を設定して画像用のパディングを削除
2. `object-fit: cover` を使用して画像のアスペクト比を維持
3. 画像の幅を `100%` に設定

```html
<!-- ✓ Good -->
<ha-card padding="false">
  <img
    src="image.jpg"
    style="width: 100%; height: 200px; object-fit: cover;"
  />
  <div style="padding: 16px;">
    <h3>タイトル</h3>
  </div>
</ha-card>

<!-- ✗ Bad: padding が有効 -->
<ha-card>
  <img src="image.jpg" style="width: 100%;" />
</ha-card>
```

### グリッド内のカードの高さが揃わない

**問題**: Grid 内の各カードの高さがバラバラになる

**解決策**:
Grid に `align-items: stretch` を設定し、カードに `height: 100%` を設定：

```html
<ha-grid columns="3" gap="4" style="align-items: stretch;">
  <ha-card style="height: 100%;">...</ha-card>
  <ha-card style="height: 100%;">...</ha-card>
  <ha-card style="height: 100%;">...</ha-card>
</ha-grid>
```

### クリッカブルカードがキーボードで操作できない

**問題**: クリックできるが、キーボード（Tab, Enter）で操作できない

**解決策**:
`tabindex="0"` を設定し、Enter/Space キーのイベントハンドラを追加：

```html
<!-- ✓ Good: キーボード対応 -->
<ha-card
  role="button"
  tabindex="0"
  @click="handleClick"
  @keydown.enter="handleClick"
  @keydown.space.prevent="handleClick"
>
  <h3>クリッカブルカード</h3>
</ha-card>

<!-- ✗ Bad: tabindex がない -->
<ha-card role="button" @click="handleClick">
  <h3>クリッカブルカード</h3>
</ha-card>
```

### ダークモードでカードが見えにくい

**問題**: ダークテーマで背景と区別がつかない

**解決策**:
デザイントークンを使用するか、バリアントを調整：

```css
/* カスタムダークモード対応 */
[data-theme="dark"] ha-card {
  --card-bg: var(--surface-level-1-background);
  --card-border-color: var(--color-gray-700);
}
```

または、ダークモードでは `outlined` または `elevated` バリアントを使用：

```tsx
import { useTheme } from '@hidearea-design/react';

function MyCard() {
  const { theme } = useTheme();
  const variant = theme === 'dark' ? 'outlined' : 'default';

  return <Card variant={variant}>...</Card>;
}
```
