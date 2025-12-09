# Container

コンテンツのコンテナコンポーネント。6種類の最大幅をサポートします。

## 基本的な使い方

```html
<ha-container>
  <p>コンテンツ</p>
</ha-container>
```

## 最大幅

6種類の最大幅が利用可能です：

### sm (640px)

```html
<ha-container max-width="sm">
  <p>Small container (640px)</p>
</ha-container>
```

### md (768px)

```html
<ha-container max-width="md">
  <p>Medium container (768px)</p>
</ha-container>
```

### lg (1024px)

```html
<ha-container max-width="lg">
  <p>Large container (1024px)</p>
</ha-container>
```

### xl (1280px)

```html
<ha-container max-width="xl">
  <p>Extra Large container (1280px)</p>
</ha-container>
```

### 2xl (1536px)

```html
<ha-container max-width="2xl">
  <p>2X Large container (1536px)</p>
</ha-container>
```

### full

```html
<ha-container max-width="full">
  <p>Full width container</p>
</ha-container>
```

## パディング

```html
<!-- パディングあり（デフォルト） -->
<ha-container padding>
  <p>パディング付きコンテナ</p>
</ha-container>

<!-- パディングなし -->
<ha-container padding="false">
  <p>パディングなしコンテナ</p>
</ha-container>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `max-width` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | 最大幅 |
| `padding` | `boolean` | `true` | パディングの有無 |

## React

```tsx
import { Container } from '@hidearea-design/react';

function App() {
  return (
    <Container maxWidth="lg">
      <h1>タイトル</h1>
      <p>コンテンツ</p>
    </Container>
  );
}
```

## Vue

```vue
<template>
  <HaContainer max-width="lg">
    <h1>タイトル</h1>
    <p>コンテンツ</p>
  </HaContainer>
</template>

<script setup>
import { Container as HaContainer } from '@hidearea-design/vue';
</script>
```

## 使用例

### ページレイアウト

```html
<ha-container max-width="xl">
  <header>
    <h1>Hidearea Design</h1>
    <nav>
      <a href="/">ホーム</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <h2>コンテンツ</h2>
    <p>ページのメインコンテンツ</p>
  </main>

  <footer>
    <p>&copy; 2025 Hidearea Design</p>
  </footer>
</ha-container>
```

### セクション別のコンテナ

```html
<!-- ヒーローセクション: フルワイド -->
<ha-container max-width="full" padding="false">
  <div style="background: var(--color-primary-500); padding: 60px 0; color: white; text-align: center;">
    <h1>Welcome to Hidearea Design</h1>
    <p>モダンなWebコンポーネントライブラリ</p>
  </div>
</ha-container>

<!-- メインコンテンツ: lg -->
<ha-container max-width="lg">
  <h2>特徴</h2>
  <p>デザイントークン駆動、TypeScript完全対応</p>
</ha-container>

<!-- フッター: xl -->
<ha-container max-width="xl">
  <footer>
    <p>&copy; 2025 Hidearea Design</p>
  </footer>
</ha-container>
```

### ネストされたコンテナ

```html
<ha-container max-width="2xl">
  <ha-container max-width="lg">
    <h1>タイトル</h1>
    <p>中央寄せされたコンテンツ</p>
  </ha-container>
</ha-container>
```

### Grid との組み合わせ

```html
<ha-container max-width="xl">
  <ha-grid columns="3" gap="4">
    <ha-card>Card 1</ha-card>
    <ha-card>Card 2</ha-card>
    <ha-card>Card 3</ha-card>
  </ha-grid>
</ha-container>
```

### Stack との組み合わせ

```html
<ha-container max-width="md">
  <ha-stack direction="vertical" gap="4">
    <h1>タイトル</h1>
    <p>段落1</p>
    <p>段落2</p>
    <ha-button variant="primary">アクション</ha-button>
  </ha-stack>
</ha-container>
```

### レスポンシブレイアウト

```tsx
import { Container, Grid, Card } from '@hidearea-design/react';

function ResponsiveLayout() {
  return (
    <>
      {/* モバイル: sm */}
      <Container maxWidth="sm" className="mobile-only">
        <h1>モバイルレイアウト</h1>
      </Container>

      {/* タブレット: md */}
      <Container maxWidth="md" className="tablet-only">
        <Grid columns="2" gap="4">
          <Card>Card 1</Card>
          <Card>Card 2</Card>
        </Grid>
      </Container>

      {/* デスクトップ: xl */}
      <Container maxWidth="xl" className="desktop-only">
        <Grid columns="4" gap="4">
          <Card>Card 1</Card>
          <Card>Card 2</Card>
          <Card>Card 3</Card>
          <Card>Card 4</Card>
        </Grid>
      </Container>
    </>
  );
}
```

## アクセシビリティ

Container コンポーネントは WCAG 2.1 AA 基準に準拠し、レイアウト構造をアクセシブルに提供します。

### ランドマークロール

Container は構造的なコンポーネントであり、適切なセマンティックランドマークロールを設定することでスクリーンリーダーユーザーのナビゲーションを支援します。

| ランドマークロール | 用途 | 設定例 |
|------------------|------|--------|
| `main` | ページのメインコンテンツ領域 | `<ha-container role="main">` |
| `complementary` | サイドバー、補足情報 | `<ha-container role="complementary">` |
| `contentinfo` | フッター情報 | `<ha-container role="contentinfo">` |
| `banner` | ヘッダー、サイトバナー | `<ha-container role="banner">` |
| `navigation` | ナビゲーション領域 | `<ha-container role="navigation">` |

```html
<!-- メインコンテンツ領域 -->
<ha-container max-width="lg" role="main" aria-label="メインコンテンツ">
  <h1>記事タイトル</h1>
  <p>記事本文...</p>
</ha-container>

<!-- サイドバー -->
<ha-container max-width="md" role="complementary" aria-label="関連情報">
  <h2>関連記事</h2>
  <ul>
    <li><a href="/article1">記事1</a></li>
    <li><a href="/article2">記事2</a></li>
  </ul>
</ha-container>

<!-- フッター -->
<ha-container max-width="xl" role="contentinfo">
  <p>&copy; 2025 Hidearea Design</p>
</ha-container>
```

### スクリーンリーダー

Container はレイアウトコンテナとして、適切なランドマークロールと aria-label を設定することでスクリーンリーダーのナビゲーション効率を向上させます。

**ランドマークナビゲーション例**:
```html
<ha-container max-width="xl" role="banner" aria-label="サイトヘッダー">
  <header>
    <h1>Hidearea Design</h1>
    <nav><!-- ナビゲーション --></nav>
  </header>
</ha-container>

<ha-container max-width="lg" role="main" aria-label="記事コンテンツ">
  <article>
    <h2>記事タイトル</h2>
    <p>記事本文...</p>
  </article>
</ha-container>

<ha-container max-width="md" role="complementary" aria-label="サイドバー">
  <aside>
    <h3>関連情報</h3>
  </aside>
</ha-container>

<ha-container max-width="xl" role="contentinfo" aria-label="フッター情報">
  <footer>
    <p>&copy; 2025</p>
  </footer>
</ha-container>
```

**スクリーンリーダーの読み上げ**:
- NVDA: "メインランドマーク、記事コンテンツ"
- JAWS: "メイン領域、記事コンテンツ"
- VoiceOver: "メイン、記事コンテンツ"

**ランドマークジャンプキー** (NVDA/JAWS):
- `D` キー: 次のランドマークへジャンプ
- `Shift + D` キー: 前のランドマークへジャンプ

### レスポンシブアクセシビリティ

レスポンシブレイアウトでは、すべてのビューポートサイズでコンテンツが読みやすく、操作可能であることを確保します。

```html
<!-- モバイルファーストアプローチ -->
<ha-container max-width="sm" role="main" aria-label="メインコンテンツ">
  <h1>モバイルでも読みやすいタイトル</h1>
  <p style="font-size: var(--font-size-base); line-height: 1.6;">
    十分な行間と文字サイズでアクセシビリティを確保
  </p>
</ha-container>

<!-- タッチターゲット -->
<ha-container max-width="md">
  <ha-stack direction="vertical" gap="4">
    <!-- 44x44px 最小タッチターゲット -->
    <ha-button size="lg" style="min-height: 44px; min-width: 44px;">
      アクション
    </ha-button>
  </ha-stack>
</ha-container>
```

### セマンティックHTML

Container は div 要素ベースですが、適切なセマンティック要素と組み合わせることで文書構造を明確にします。

```html
<ha-container max-width="lg" role="main">
  <article>
    <header>
      <h1>記事タイトル</h1>
      <time datetime="2025-01-15">2025年1月15日</time>
    </header>

    <section>
      <h2>セクション1</h2>
      <p>内容...</p>
    </section>

    <section>
      <h2>セクション2</h2>
      <p>内容...</p>
    </section>

    <footer>
      <p>著者: Hidearea Design</p>
    </footer>
  </article>
</ha-container>
```

### フォーカス管理

Container 自体はフォーカス可能ではありませんが、内部のインタラクティブ要素のフォーカス順序を論理的に保ちます。

```html
<ha-container max-width="lg">
  <ha-stack direction="vertical" gap="4">
    <!-- フォーカス順序: 1 → 2 → 3 -->
    <ha-input label="名前" tabindex="0" />
    <ha-input label="メールアドレス" tabindex="0" />
    <ha-button tabindex="0">送信</ha-button>
  </ha-stack>
</ha-container>
```

## スタイルのカスタマイズ

Container コンポーネントは、デザイントークンとカスタムCSS変数を使用して柔軟にカスタマイズできます。

### デザイントークン

Container コンポーネントで使用される主要なデザイントークン：

```css
:root {
  /* 最大幅 */
  --container-max-width-sm: 640px;
  --container-max-width-md: 768px;
  --container-max-width-lg: 1024px;
  --container-max-width-xl: 1280px;
  --container-max-width-2xl: 1536px;
  --container-max-width-full: 100%;

  /* パディング */
  --container-padding-x: var(--space-4); /* 16px */
  --container-padding-y: var(--space-0); /* 0px */

  /* レスポンシブパディング */
  --container-padding-mobile: var(--space-4); /* 16px */
  --container-padding-tablet: var(--space-6); /* 24px */
  --container-padding-desktop: var(--space-8); /* 32px */
}
```

### カスタムCSS変数

Container のスタイルをカスタマイズするためのCSS変数：

```css
ha-container {
  /* パディング */
  --container-padding: var(--space-4);
  --container-padding-x: var(--space-4);
  --container-padding-y: var(--space-0);

  /* 最大幅 */
  --container-max-width: 1024px;

  /* マージン */
  --container-margin-x: auto;
  --container-margin-y: 0;
}

/* カスタム最大幅 */
ha-container.custom {
  --container-max-width: 1440px;
}

/* カスタムパディング */
ha-container.tight {
  --container-padding-x: var(--space-2); /* 8px */
}

ha-container.spacious {
  --container-padding-x: var(--space-8); /* 32px */
}
```

### レスポンシブパディング

ビューポートサイズに応じて異なるパディングを設定：

```css
ha-container {
  --container-padding: var(--space-4); /* 16px (モバイル) */
}

/* タブレット */
@media (min-width: 768px) {
  ha-container {
    --container-padding: var(--space-6); /* 24px */
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  ha-container {
    --container-padding: var(--space-8); /* 32px */
  }
}

/* ワイドスクリーン */
@media (min-width: 1536px) {
  ha-container {
    --container-padding: var(--space-12); /* 48px */
  }
}
```

### Shadow DOMパーツ

Container は Shadow DOM を使用しており、`::part()` セレクタでスタイルをカスタマイズできます：

```css
/* Container ラッパー */
ha-container::part(container) {
  background-color: var(--color-surface-100);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

/* 特定の max-width のカスタマイズ */
ha-container[max-width="sm"]::part(container) {
  background-color: var(--color-surface-50);
}

/* パディングありの Container */
ha-container[padding]::part(container) {
  border: 1px solid var(--color-border-subtle);
}
```

### ダークモード対応

ダークモードでの Container スタイル：

```css
/* ライトモード */
:root {
  --container-background: var(--color-surface-0);
  --container-border-color: var(--color-border-subtle);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  :root {
    --container-background: var(--color-surface-900);
    --container-border-color: var(--color-border-subtle-dark);
  }
}

ha-container::part(container) {
  background-color: var(--container-background);
  border-color: var(--container-border-color);
}
```

### カスタムテーマ

Container のカスタムテーマ例：

```css
/* プライマリテーマ */
ha-container.theme-primary::part(container) {
  background: linear-gradient(
    135deg,
    var(--color-primary-50) 0%,
    var(--color-primary-100) 100%
  );
  border-left: 4px solid var(--color-primary-500);
  padding-left: var(--space-6);
}

/* サクセステーマ */
ha-container.theme-success::part(container) {
  background-color: var(--color-success-50);
  border: 1px solid var(--color-success-200);
}

/* カードスタイル */
ha-container.card::part(container) {
  background-color: var(--color-surface-0);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
}
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 1. 適切な最大幅の選択

```html
<!-- フォームやテキストコンテンツ: sm または md -->
<ha-container max-width="md">
  <ha-form-group>
    <ha-input label="名前" />
    <ha-input label="メールアドレス" />
    <ha-button variant="primary">送信</ha-button>
  </ha-form-group>
</ha-container>
```

**理由**: 読みやすさを確保し、1行あたりの文字数を適切に保つ（45-75文字が理想）。

#### 2. セマンティックランドマークの設定

```html
<ha-container max-width="lg" role="main" aria-label="メインコンテンツ">
  <article>
    <h1>記事タイトル</h1>
    <p>記事本文...</p>
  </article>
</ha-container>
```

**理由**: スクリーンリーダーユーザーのナビゲーションを支援し、WCAG 2.1準拠を実現。

#### 3. 一貫したパディングの使用

```html
<!-- すべてのセクションで統一されたパディング設定 -->
<ha-container max-width="lg" padding>
  <section>セクション1</section>
</ha-container>

<ha-container max-width="lg" padding>
  <section>セクション2</section>
</ha-container>
```

**理由**: 一貫性のあるレイアウトでユーザーエクスペリエンスを向上。

#### 4. レスポンシブ最大幅の使用

```tsx
import { Container } from '@hidearea-design/react';

function ResponsivePage() {
  return (
    <>
      {/* ヒーロー: フルワイド */}
      <Container maxWidth="full" padding={false}>
        <div className="hero">Hero Content</div>
      </Container>

      {/* メインコンテンツ: lg */}
      <Container maxWidth="lg">
        <article>Main Content</article>
      </Container>
    </>
  );
}
```

**理由**: コンテンツタイプに応じた最適な幅でユーザビリティを向上。

### ✗ 避けるべき使い方

#### 1. 過度なネスト

```html
<!-- ❌ 避ける: 不要なネスト -->
<ha-container max-width="xl">
  <ha-container max-width="lg">
    <ha-container max-width="md">
      <p>コンテンツ</p>
    </ha-container>
  </ha-container>
</ha-container>
```

**理由**: 不要な DOM 階層でパフォーマンスが低下し、スタイル管理が複雑化。

**代替案**:
```html
<!-- ✓ 推奨: 必要最小限のネスト -->
<ha-container max-width="md">
  <p>コンテンツ</p>
</ha-container>
```

#### 2. 一貫性のない最大幅

```html
<!-- ❌ 避ける: セクションごとに異なる幅 -->
<ha-container max-width="sm">
  <section>セクション1</section>
</ha-container>

<ha-container max-width="2xl">
  <section>セクション2</section>
</ha-container>

<ha-container max-width="md">
  <section>セクション3</section>
</ha-container>
```

**理由**: レイアウトが不安定になり、ユーザーの視線が定まらない。

**代替案**:
```html
<!-- ✓ 推奨: 統一された幅 -->
<ha-container max-width="lg">
  <section>セクション1</section>
  <section>セクション2</section>
  <section>セクション3</section>
</ha-container>
```

#### 3. ランドマークロールの欠如

```html
<!-- ❌ 避ける: ランドマークロールなし -->
<ha-container max-width="lg">
  <h1>メインコンテンツ</h1>
  <p>記事本文...</p>
</ha-container>
```

**理由**: スクリーンリーダーユーザーがコンテンツ構造を理解しにくい。

**代替案**:
```html
<!-- ✓ 推奨: 適切なランドマークロール -->
<ha-container max-width="lg" role="main" aria-label="記事コンテンツ">
  <h1>メインコンテンツ</h1>
  <p>記事本文...</p>
</ha-container>
```

#### 4. フルワイドコンテンツのパディング不足

```html
<!-- ❌ 避ける: フルワイドでパディングなし -->
<ha-container max-width="full" padding="false">
  <p style="margin: 0;">テキストが画面端に張り付く</p>
</ha-container>
```

**理由**: モバイルでテキストが画面端に張り付き、読みにくい。

**代替案**:
```html
<!-- ✓ 推奨: 内部にパディング付きコンテナを配置 -->
<ha-container max-width="full" padding="false">
  <div style="background: var(--color-primary-500); padding: 60px 0;">
    <ha-container max-width="lg">
      <p>適切な余白でテキストが読みやすい</p>
    </ha-container>
  </div>
</ha-container>
```

## よくある質問

### 1. レスポンシブレイアウトで異なる最大幅を使用するには？

CSS メディアクエリとカスタムプロパティを組み合わせて実現できます：

```css
/* モバイル: sm */
ha-container.responsive {
  --container-max-width: var(--container-max-width-sm);
}

/* タブレット: md */
@media (min-width: 768px) {
  ha-container.responsive {
    --container-max-width: var(--container-max-width-md);
  }
}

/* デスクトップ: lg */
@media (min-width: 1024px) {
  ha-container.responsive {
    --container-max-width: var(--container-max-width-lg);
  }
}
```

```html
<ha-container class="responsive">
  <p>レスポンシブコンテンツ</p>
</ha-container>
```

### 2. Container 内でフルブリード（全幅）セクションを作成するには？

ネガティブマージンを使用してコンテナの境界を超えるセクションを作成できます：

```tsx
import { Container } from '@hidearea-design/react';

function FullBleedSection() {
  return (
    <Container maxWidth="lg">
      <h1>記事タイトル</h1>
      <p>通常のコンテンツ...</p>

      {/* フルブリードセクション */}
      <div
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          backgroundColor: 'var(--color-primary-50)',
          padding: 'var(--space-8) 0',
        }}
      >
        <Container maxWidth="lg">
          <h2>フルワイドセクション</h2>
          <p>画面全体の幅を使用しながら、内部コンテンツは中央揃え</p>
        </Container>
      </div>

      <p>通常のコンテンツに戻る...</p>
    </Container>
  );
}
```

### 3. Container と Grid/Stack を組み合わせる最適な方法は？

Container をレイアウトの外側、Grid/Stack を内側に配置します：

```tsx
import { Container, Grid, Stack, Card } from '@hidearea-design/react';

function OptimalLayout() {
  return (
    <Container maxWidth="xl" role="main">
      {/* 垂直方向のスタック */}
      <Stack direction="vertical" gap="8">
        <h1>ダッシュボード</h1>

        {/* グリッドレイアウト */}
        <Grid columns="3" gap="4">
          <Card>カード 1</Card>
          <Card>カード 2</Card>
          <Card>カード 3</Card>
        </Grid>

        {/* 水平方向のスタック */}
        <Stack direction="horizontal" gap="4" justify="end">
          <ha-button variant="outline">キャンセル</ha-button>
          <ha-button variant="primary">保存</ha-button>
        </Stack>
      </Stack>
    </Container>
  );
}
```

### 4. 動的にコンテナの最大幅を変更するには？

React の state を使用して動的に制御できます：

```tsx
import { useState } from 'react';
import { Container, Select } from '@hidearea-design/react';

function DynamicContainer() {
  const [maxWidth, setMaxWidth] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'>('lg');

  return (
    <>
      <Container maxWidth="md">
        <Select
          label="コンテナ幅を選択"
          value={maxWidth}
          onChange={(e) => setMaxWidth(e.target.value as any)}
        >
          <option value="sm">Small (640px)</option>
          <option value="md">Medium (768px)</option>
          <option value="lg">Large (1024px)</option>
          <option value="xl">Extra Large (1280px)</option>
          <option value="2xl">2X Large (1536px)</option>
          <option value="full">Full Width</option>
        </Select>
      </Container>

      <Container maxWidth={maxWidth}>
        <div style={{ backgroundColor: 'var(--color-primary-50)', padding: 'var(--space-4)' }}>
          <p>現在の最大幅: {maxWidth}</p>
          <p>このコンテナの幅が動的に変化します。</p>
        </div>
      </Container>
    </>
  );
}
```

## 関連コンポーネント

- [Grid](/components/grid) - グリッドレイアウトコンポーネント
- [Stack](/components/stack) - 垂直/水平スタックレイアウト
- [Card](/components/card) - カードコンテナ

## API リファレンス

### ContainerProps

```typescript
interface ContainerProps {
  /**
   * コンテナの最大幅
   * @default 'lg'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * パディングの有効/無効
   * @default true
   */
  padding?: boolean;

  /**
   * ARIA ランドマークロール
   * @example 'main' | 'complementary' | 'contentinfo' | 'banner' | 'navigation'
   */
  role?: string;

  /**
   * ARIA ラベル（ランドマークロールを使用する場合は推奨）
   */
  'aria-label'?: string;

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
interface ContainerCSSVariables {
  /** コンテナの最大幅 */
  '--container-max-width'?: string;

  /** 水平パディング */
  '--container-padding-x'?: string;

  /** 垂直パディング */
  '--container-padding-y'?: string;

  /** パディング（全方向） */
  '--container-padding'?: string;

  /** 水平マージン */
  '--container-margin-x'?: string;

  /** 垂直マージン */
  '--container-margin-y'?: string;

  /** 背景色 */
  '--container-background'?: string;

  /** ボーダーカラー */
  '--container-border-color'?: string;
}
```

### Shadow DOM Parts

```typescript
interface ContainerParts {
  /** Container ラッパー要素 */
  container: HTMLDivElement;
}
```

使用例：
```css
ha-container::part(container) {
  background-color: var(--color-surface-100);
  border-radius: var(--radius-md);
}
```

## トラブルシューティング

### 1. コンテナが中央揃えされない

**問題**: Container が左寄せになってしまう。

**原因**: 親要素の `display` プロパティが `flex` または `grid` になっている可能性があります。

**解決策**:
```css
/* 親要素のスタイルをリセット */
.parent {
  display: block; /* flex や grid ではなく block を使用 */
}

/* または、Container に明示的にマージンを設定 */
ha-container {
  margin-left: auto;
  margin-right: auto;
}
```

### 2. パディングが適用されない

**問題**: `padding` 属性を設定してもパディングが表示されない。

**原因**: CSS 変数がオーバーライドされているか、属性値が正しくありません。

**解決策**:
```html
<!-- ✓ 正しい: padding 属性を使用（boolean） -->
<ha-container padding>
  <p>パディング付き</p>
</ha-container>

<!-- ✓ 正しい: padding="false" で明示的に無効化 -->
<ha-container padding="false">
  <p>パディングなし</p>
</ha-container>

<!-- ❌ 間違い: padding="true" は無効 -->
<ha-container padding="true">
  <p>パディングが適用されない</p>
</ha-container>
```

CSS 変数を確認：
```css
/* カスタムパディングが設定されていないか確認 */
ha-container {
  --container-padding-x: var(--space-4); /* デフォルト値に戻す */
}
```

### 3. レスポンシブで幅が変わらない

**問題**: ビューポートサイズを変更しても Container の幅が変わらない。

**原因**: CSS カスタムプロパティがメディアクエリより優先されています。

**解決策**:
```css
/* メディアクエリで !important を使用しない */
ha-container.custom {
  --container-max-width: 1024px; /* この設定を削除 */
}

/* 代わりに、max-width 属性を使用 */
```

```html
<!-- HTML 属性で制御 -->
<ha-container max-width="lg">
  <p>レスポンシブコンテンツ</p>
</ha-container>
```

### 4. ネストされた Container の幅が崩れる

**問題**: Container 内に Container をネストすると、内側の Container の幅が期待通りにならない。

**原因**: 親 Container のパディングにより、内側の Container の利用可能幅が制限されています。

**解決策**:
```html
<!-- ✓ 推奨: 外側の Container のパディングを無効化 -->
<ha-container max-width="2xl" padding="false">
  <ha-container max-width="lg">
    <h1>タイトル</h1>
    <p>中央寄せコンテンツ</p>
  </ha-container>
</ha-container>

<!-- または、CSS で調整 -->
<style>
  ha-container.outer {
    --container-padding-x: 0;
  }
</style>

<ha-container max-width="2xl" class="outer">
  <ha-container max-width="lg">
    <h1>タイトル</h1>
    <p>中央寄せコンテンツ</p>
  </ha-container>
</ha-container>
```

## 最大幅の一覧

| サイズ | 最大幅 | 用途 |
|--------|--------|------|
| `sm` | 640px | モバイル、狭いコンテンツ |
| `md` | 768px | タブレット、フォーム |
| `lg` | 1024px | デスクトップ、標準コンテンツ（デフォルト） |
| `xl` | 1280px | ワイドスクリーン、ダッシュボード |
| `2xl` | 1536px | 超ワイドスクリーン |
| `full` | 100% | フルワイド、ヒーローセクション |
