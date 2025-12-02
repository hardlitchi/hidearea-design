# Breadcrumb

パンくずリストコンポーネント。3種類のセパレータをサポートします。

## 基本的な使い方

```html
<ha-breadcrumb>
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

## セパレータ

3種類のセパレータが利用可能です：

### Slash（スラッシュ）

```html
<ha-breadcrumb separator="slash">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

### Chevron（シェブロン）

```html
<ha-breadcrumb separator="chevron">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

### Arrow（矢印）

```html
<ha-breadcrumb separator="arrow">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

## カスタムセパレータ

個別のアイテムに異なるセパレータを設定できます：

```html
<ha-breadcrumb>
  <ha-breadcrumb-item href="/" separator="slash">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products" separator="chevron">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

## プロパティ

### ha-breadcrumb

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `separator` | `'slash' \| 'chevron' \| 'arrow'` | `'slash'` | デフォルトのセパレータ |

### ha-breadcrumb-item

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `href` | `string` | `''` | リンク先URL |
| `separator` | `'slash' \| 'chevron' \| 'arrow'` | - | 個別のセパレータ |

## React

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';

function App() {
  return (
    <Breadcrumb separator="chevron">
      <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
      <BreadcrumbItem href="/products">商品</BreadcrumbItem>
      <BreadcrumbItem href="/products/electronics">電化製品</BreadcrumbItem>
      <BreadcrumbItem>ノートパソコン</BreadcrumbItem>
    </Breadcrumb>
  );
}
```

## Vue

```vue
<template>
  <HaBreadcrumb separator="chevron">
    <HaBreadcrumbItem href="/">ホーム</HaBreadcrumbItem>
    <HaBreadcrumbItem href="/products">商品</HaBreadcrumbItem>
    <HaBreadcrumbItem href="/products/electronics">電化製品</HaBreadcrumbItem>
    <HaBreadcrumbItem>ノートパソコン</HaBreadcrumbItem>
  </HaBreadcrumb>
</template>

<script setup>
import {
  Breadcrumb as HaBreadcrumb,
  BreadcrumbItem as HaBreadcrumbItem,
} from '@hidearea-design/vue';
</script>
```

## 使用例

### シンプルなパンくずリスト

```html
<ha-breadcrumb>
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/blog">ブログ</ha-breadcrumb-item>
  <ha-breadcrumb-item>記事タイトル</ha-breadcrumb-item>
</ha-breadcrumb>
```

### アイコン付き

```html
<ha-breadcrumb separator="chevron">
  <ha-breadcrumb-item href="/">🏠 ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/settings">⚙️ 設定</ha-breadcrumb-item>
  <ha-breadcrumb-item>👤 プロフィール</ha-breadcrumb-item>
</ha-breadcrumb>
```

### 深い階層

```html
<ha-breadcrumb separator="arrow">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products/electronics">電化製品</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products/electronics/computers">コンピュータ</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products/electronics/computers/laptops">ノートパソコン</ha-breadcrumb-item>
  <ha-breadcrumb-item>MacBook Pro</ha-breadcrumb-item>
</ha-breadcrumb>
```

### 動的パンくずリスト

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { useLocation } from 'react-router-dom';

function DynamicBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNames: Record<string, string> = {
    products: '商品',
    electronics: '電化製品',
    computers: 'コンピュータ',
    laptops: 'ノートパソコン',
  };

  return (
    <Breadcrumb separator="chevron">
      <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = breadcrumbNames[name] || name;

        return (
          <BreadcrumbItem
            key={name}
            href={isLast ? undefined : routeTo}
          >
            {displayName}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
```

### ページヘッダーとの組み合わせ

```html
<ha-container max-width="xl">
  <ha-stack direction="vertical" gap="2">
    <ha-breadcrumb separator="chevron">
      <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
      <ha-breadcrumb-item>詳細</ha-breadcrumb-item>
    </ha-breadcrumb>

    <h1>商品詳細</h1>
  </ha-stack>
</ha-container>
```

### カード内のナビゲーション

```html
<ha-card>
  <ha-stack direction="vertical" gap="3">
    <ha-breadcrumb separator="chevron">
      <ha-breadcrumb-item href="/dashboard">ダッシュボード</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/dashboard/settings">設定</ha-breadcrumb-item>
      <ha-breadcrumb-item>アカウント</ha-breadcrumb-item>
    </ha-breadcrumb>

    <h2>アカウント設定</h2>
    <p>アカウント情報を管理します</p>
  </ha-stack>
</ha-card>
```

### レスポンシブ対応

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ResponsiveBreadcrumb() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const items = [
    { href: '/', label: 'ホーム' },
    { href: '/products', label: '商品' },
    { href: '/products/electronics', label: '電化製品' },
    { href: '/products/electronics/computers', label: 'コンピュータ' },
    { label: 'ノートパソコン' },
  ];

  if (isMobile && items.length > 3) {
    // モバイルでは最初と最後の2つだけ表示
    return (
      <Breadcrumb separator="chevron">
        <BreadcrumbItem href={items[0].href}>
          {items[0].label}
        </BreadcrumbItem>
        <BreadcrumbItem>...</BreadcrumbItem>
        <BreadcrumbItem href={items[items.length - 2].href}>
          {items[items.length - 2].label}
        </BreadcrumbItem>
        <BreadcrumbItem>
          {items[items.length - 1].label}
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb separator="chevron">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} href={item.href}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
```

### ドロップダウン付き

```tsx
import { Breadcrumb, BreadcrumbItem, Menu, MenuItem } from '@hidearea-design/react';

function BreadcrumbWithDropdown() {
  return (
    <Breadcrumb separator="chevron">
      <BreadcrumbItem href="/">ホーム</BreadcrumbItem>

      <Menu trigger={<BreadcrumbItem>商品 ▾</BreadcrumbItem>}>
        <MenuItem href="/products/electronics">電化製品</MenuItem>
        <MenuItem href="/products/clothing">衣類</MenuItem>
        <MenuItem href="/products/books">書籍</MenuItem>
      </Menu>

      <BreadcrumbItem>詳細</BreadcrumbItem>
    </Breadcrumb>
  );
}
```

### eコマースサイト

```html
<ha-container max-width="xl">
  <ha-stack direction="vertical" gap="4">
    <ha-breadcrumb separator="arrow">
      <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/products">すべての商品</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/products/electronics">電化製品</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/products/electronics/computers">コンピュータ</ha-breadcrumb-item>
      <ha-breadcrumb-item>MacBook Pro 16インチ</ha-breadcrumb-item>
    </ha-breadcrumb>

    <ha-grid columns="1" lg-columns="2" gap="6">
      <div>
        <img src="product.jpg" alt="Product" style="width: 100%;">
      </div>
      <ha-stack direction="vertical" gap="3">
        <h1>MacBook Pro 16インチ</h1>
        <p style="font-size: 24px; font-weight: bold;">¥298,000</p>
        <p>最新のM3 Proチップを搭載した高性能ノートパソコン</p>
        <ha-button variant="primary" size="lg" full-width>
          カートに追加
        </ha-button>
      </ha-stack>
    </ha-grid>
  </ha-stack>
</ha-container>
```

### ブログ記事

```html
<ha-container max-width="lg">
  <ha-stack direction="vertical" gap="4">
    <ha-breadcrumb separator="slash">
      <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/blog">ブログ</ha-breadcrumb-item>
      <ha-breadcrumb-item href="/blog/technology">テクノロジー</ha-breadcrumb-item>
      <ha-breadcrumb-item>Web Components の始め方</ha-breadcrumb-item>
    </ha-breadcrumb>

    <h1>Web Components の始め方</h1>
    <p style="color: var(--color-gray-600);">
      2025年12月2日 | テクノロジー
    </p>
    <div>
      <!-- 記事コンテンツ -->
    </div>
  </ha-stack>
</ha-container>
```

## アクセシビリティ

- `role="navigation"` が自動的に設定されます
- `aria-label="breadcrumb"` でナビゲーションの目的を示します
- 最後のアイテムには `aria-current="page"` が設定されます
- リンクのないアイテムは `<span>` として表示されます

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-breadcrumb {
  --breadcrumb-gap: 8px;
  --breadcrumb-font-size: 14px;
}

ha-breadcrumb-item {
  --breadcrumb-item-color: var(--color-gray-600);
  --breadcrumb-item-hover-color: var(--color-primary-500);
  --breadcrumb-item-current-color: var(--color-gray-900);
}
```

## セパレータ一覧

| セパレータ | 記号 | 用途 |
|-----------|------|------|
| `slash` | `/` | 一般的、シンプル |
| `chevron` | `>` | モダン、明確 |
| `arrow` | `→` | 方向性を強調 |

## ベストプラクティス

1. **階層を明確に**: 最大5-7階層程度に抑える
2. **最後のアイテムはリンクなし**: 現在のページはリンクにしない
3. **省略を検討**: モバイルでは省略記号（...）を使用
4. **ホームは必須**: 最初のアイテムはホームへのリンク
5. **一貫性**: サイト全体で同じセパレータを使用
