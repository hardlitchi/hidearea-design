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

- セマンティックHTMLとして機能します
- `role` 属性は自動的には設定されません（必要に応じて手動で設定）
- ランドマークロールが必要な場合は、`role="main"` などを明示的に設定してください

```html
<ha-container max-width="lg" role="main">
  <h1>メインコンテンツ</h1>
</ha-container>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-container {
  --container-padding: 16px;
}

/* レスポンシブパディング */
@media (min-width: 768px) {
  ha-container {
    --container-padding: 24px;
  }
}
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
