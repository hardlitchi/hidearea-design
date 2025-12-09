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

Breadcrumb コンポーネントは WCAG 2.1 AA 基準に準拠し、すべてのユーザーがナビゲーション構造を理解できるようにします。

### ARIAサポート

Breadcrumb コンポーネントは WAI-ARIA の Breadcrumb パターンに準拠しており、以下のARIA属性をサポートします：

```html
<ha-breadcrumb aria-label="パンくずリスト">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item aria-current="page">詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

| ARIA属性 | 説明 | 設定値 |
|---------|------|-------|
| `role` | ナビゲーション領域を示す | `navigation` (自動設定) |
| `aria-label` | ナビゲーションの目的を説明 | `breadcrumb` または `パンくずリスト` (推奨) |
| `aria-current` | 現在のページを示す | `page` (最後のアイテムに自動設定) |

### キーボード操作

Breadcrumbは標準的なリンクナビゲーションを提供します：

| キー | 動作 |
|-----|------|
| `Tab` | 次のパンくずリストアイテムへフォーカス移動 |
| `Shift + Tab` | 前のパンくずリストアイテムへフォーカス移動 |
| `Enter` / `Space` | フォーカス中のリンクを開く |

### スクリーンリーダー

スクリーンリーダーは以下のように読み上げます：

```html
<ha-breadcrumb aria-label="パンくずリスト">
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
  <ha-breadcrumb-item aria-current="page">詳細</ha-breadcrumb-item>
</ha-breadcrumb>
```

**読み上げ例**：
- 「パンくずリスト ナビゲーション」
- 「ホーム リンク」
- 「セパレーター」
- 「商品 リンク」
- 「セパレーター」
- 「詳細 現在のページ」

### フォーカス管理

適切なフォーカス順序を維持するために、リンク可能なアイテムのみがフォーカス可能です：

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';

function AccessibleBreadcrumb() {
  return (
    <Breadcrumb aria-label="ページナビゲーション">
      {/* フォーカス可能（リンク） */}
      <BreadcrumbItem href="/">ホーム</BreadcrumbItem>

      {/* フォーカス可能（リンク） */}
      <BreadcrumbItem href="/products">商品</BreadcrumbItem>

      {/* フォーカス不可（現在のページ） */}
      <BreadcrumbItem aria-current="page">詳細</BreadcrumbItem>
    </Breadcrumb>
  );
}
```

### 長いパンくずリストのアクセシビリティ

長いパンくずリストを省略する場合も、スクリーンリーダーには完全なパスを提供してください：

```tsx
import { Breadcrumb, BreadcrumbItem, Menu, MenuItem } from '@hidearea-design/react';
import { useState } from 'react';

function CollapsedBreadcrumb() {
  const [isExpanded, setIsExpanded] = useState(false);

  const items = [
    { href: '/', label: 'ホーム' },
    { href: '/products', label: '商品' },
    { href: '/products/electronics', label: '電化製品' },
    { href: '/products/electronics/computers', label: 'コンピュータ' },
    { href: '/products/electronics/computers/laptops', label: 'ノートパソコン' },
    { label: 'MacBook Pro' },
  ];

  // 視覚的には省略
  if (!isExpanded && items.length > 4) {
    return (
      <Breadcrumb aria-label="ページナビゲーション">
        <BreadcrumbItem href={items[0].href}>
          {items[0].label}
        </BreadcrumbItem>

        {/* 省略されたアイテム */}
        <Menu
          trigger={
            <BreadcrumbItem
              as="button"
              onClick={() => setIsExpanded(true)}
              aria-label="省略されたパスを表示"
            >
              ...
            </BreadcrumbItem>
          }
        >
          {items.slice(1, -2).map((item, index) => (
            <MenuItem key={index} href={item.href}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        <BreadcrumbItem href={items[items.length - 2].href}>
          {items[items.length - 2].label}
        </BreadcrumbItem>

        <BreadcrumbItem aria-current="page">
          {items[items.length - 1].label}
        </BreadcrumbItem>

        {/* スクリーンリーダー用の完全なパス */}
        <div
          role="navigation"
          aria-label="完全なパンくずリスト"
          style={{ position: 'absolute', left: '-10000px' }}
        >
          {items.map((item, index) => (
            <span key={index}>
              {index > 0 && ' > '}
              {item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb aria-label="ページナビゲーション">
      {items.map((item, index) => (
        <BreadcrumbItem
          key={index}
          href={item.href}
          aria-current={!item.href ? 'page' : undefined}
        >
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
```

### セマンティックHTML

Breadcrumbは適切なセマンティックHTMLを使用します：

```html
<!-- 適切なセマンティック構造 -->
<nav role="navigation" aria-label="パンくずリスト">
  <ol>
    <li><a href="/">ホーム</a></li>
    <li><a href="/products">商品</a></li>
    <li aria-current="page">詳細</li>
  </ol>
</nav>
```

### モバイルアクセシビリティ

モバイルでタッチターゲットのサイズを確保してください：

```css
/* 最小44x44pxのタッチターゲット */
ha-breadcrumb-item::part(link) {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: 8px 4px;
}
```

## スタイルのカスタマイズ

Breadcrumb コンポーネントのスタイルは、デザイントークン、CSS変数、Shadow DOMパーツを使用してカスタマイズできます。

### デザイントークン

```css
:root {
  /* 間隔 */
  --breadcrumb-gap: var(--space-2);
  --breadcrumb-item-padding: var(--space-1) var(--space-2);

  /* フォント */
  --breadcrumb-font-size: var(--font-size-sm);
  --breadcrumb-font-weight: var(--font-weight-normal);

  /* カラー */
  --breadcrumb-item-color: var(--color-gray-600);
  --breadcrumb-item-hover-color: var(--color-primary-600);
  --breadcrumb-item-current-color: var(--color-gray-900);
  --breadcrumb-separator-color: var(--color-gray-400);
}
```

### カスタムCSS変数

```html
<ha-breadcrumb
  separator="chevron"
  style="
    --breadcrumb-gap: 12px;
    --breadcrumb-font-size: 16px;
    --breadcrumb-item-color: #4a5568;
  "
>
  <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
  <ha-breadcrumb-item>商品</ha-breadcrumb-item>
</ha-breadcrumb>
```

### Shadow DOMパーツ

```css
/* Breadcrumbコンテナ */
ha-breadcrumb::part(base) {
  padding: 12px 0;
  border-bottom: 1px solid var(--color-gray-200);
}

/* Breadcrumbアイテムのリンク */
ha-breadcrumb-item::part(link) {
  text-decoration: underline;
  transition: color 0.2s ease;
}

ha-breadcrumb-item::part(link):hover {
  color: var(--color-primary-700);
  text-decoration: none;
}

/* 現在のページ */
ha-breadcrumb-item[aria-current="page"]::part(text) {
  font-weight: 600;
  color: var(--color-gray-900);
}

/* セパレーター */
ha-breadcrumb-item::part(separator) {
  color: var(--color-gray-400);
  font-size: 0.875em;
  margin: 0 8px;
}
```

### ダークモード対応

```css
@media (prefers-color-scheme: dark) {
  ha-breadcrumb {
    --breadcrumb-item-color: var(--color-gray-400);
    --breadcrumb-item-hover-color: var(--color-primary-400);
    --breadcrumb-item-current-color: var(--color-gray-100);
    --breadcrumb-separator-color: var(--color-gray-600);
  }
}
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 最後のアイテムはリンクなし

```tsx
// Good: 現在のページはリンクにしない
<Breadcrumb>
  <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products">商品</BreadcrumbItem>
  <BreadcrumbItem>詳細</BreadcrumbItem> {/* リンクなし */}
</Breadcrumb>
```

```tsx
// Bad: 現在のページにもリンク
<Breadcrumb>
  <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products">商品</BreadcrumbItem>
  <BreadcrumbItem href="/products/123">詳細</BreadcrumbItem>
</Breadcrumb>
```

**理由**: 現在のページへのリンクは不要で、ユーザーを混乱させます。

#### 階層を明確に保つ

```tsx
// Good: 適切な階層（5階層）
<Breadcrumb>
  <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products">商品</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics">電化製品</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics/computers">コンピュータ</BreadcrumbItem>
  <BreadcrumbItem>MacBook Pro</BreadcrumbItem>
</Breadcrumb>
```

```tsx
// Bad: 深すぎる階層（8階層）
<Breadcrumb>
  <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products">商品</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics">電化製品</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics/computers">コンピュータ</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics/computers/laptops">ノートパソコン</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics/computers/laptops/apple">Apple</BreadcrumbItem>
  <BreadcrumbItem href="/products/electronics/computers/laptops/apple/macbook-pro">MacBook Pro</BreadcrumbItem>
  <BreadcrumbItem>16インチ</BreadcrumbItem>
</Breadcrumb>
```

**理由**: 深すぎる階層は理解しにくく、モバイルでは表示しきれません。

### ✗ 避けるべき使い方

#### 異なるセパレータを混在させない

```tsx
// Bad: セパレータが混在
<Breadcrumb>
  <BreadcrumbItem href="/" separator="slash">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products" separator="chevron">商品</BreadcrumbItem>
  <BreadcrumbItem separator="arrow">詳細</BreadcrumbItem>
</Breadcrumb>
```

```tsx
// Good: 一貫したセパレータ
<Breadcrumb separator="chevron">
  <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products">商品</BreadcrumbItem>
  <BreadcrumbItem>詳細</BreadcrumbItem>
</Breadcrumb>
```

**代替案**: サイト全体で一貫したセパレータを使用してください。

## よくある質問

### 動的ルートでパンくずリストを生成するにはどうすればよいですか？

React Router や Next.js のルート情報を使用してパンくずリストを自動生成できます：

**React Router の例**:
```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { useLocation } from 'react-router-dom';

function AutoBreadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNameMap: Record<string, string> = {
    '/products': '商品',
    '/products/electronics': '電化製品',
    '/products/electronics/computers': 'コンピュータ',
  };

  return (
    <Breadcrumb separator="chevron" aria-label="パンくずリスト">
      <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
      {pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = breadcrumbNameMap[url] || pathnames[index];

        return (
          <BreadcrumbItem key={url} href={isLast ? undefined : url}>
            {name}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
```

**Next.js の例**:
```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { useRouter } from 'next/router';

function NextBreadcrumb() {
  const router = useRouter();
  const pathnames = router.asPath.split('/').filter(x => x);

  return (
    <Breadcrumb separator="chevron" aria-label="パンくずリスト">
      <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
      {pathnames.map((name, index) => {
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <BreadcrumbItem key={href} href={isLast ? undefined : href}>
            {decodeURIComponent(name)}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
```

### モバイルで長いパンくずリストを省略するにはどうすればよいですか？

レスポンシブ対応で省略記号を使用します：

**React の例**:
```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ResponsiveBreadcrumb({ items }: { items: Array<{ href?: string; label: string }> }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile && items.length > 3) {
    return (
      <Breadcrumb separator="chevron" aria-label="パンくずリスト">
        <BreadcrumbItem href={items[0].href}>
          {items[0].label}
        </BreadcrumbItem>
        <BreadcrumbItem aria-label="省略されたパス">...</BreadcrumbItem>
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
    <Breadcrumb separator="chevron" aria-label="パンくずリスト">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} href={item.href}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
```

### アイコンをパンくずリストアイテムに追加するにはどうすればよいですか？

アイコンとテキストを組み合わせて使用できます：

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { Home, Settings, User } from 'lucide-react';

function IconBreadcrumb() {
  return (
    <Breadcrumb separator="chevron" aria-label="パンくずリスト">
      <BreadcrumbItem href="/">
        <Home size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        ホーム
      </BreadcrumbItem>
      <BreadcrumbItem href="/settings">
        <Settings size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        設定
      </BreadcrumbItem>
      <BreadcrumbItem>
        <User size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        プロフィール
      </BreadcrumbItem>
    </Breadcrumb>
  );
}
```

### パンくずリストのデータをAPIから取得するにはどうすればよいですか？

APIレスポンスを使用してパンくずリストを構築できます：

```tsx
import { Breadcrumb, BreadcrumbItem } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

interface BreadcrumbData {
  label: string;
  href?: string;
}

function ApiBreadcrumb({ productId }: { productId: string }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${productId}/breadcrumbs`)
      .then(res => res.json())
      .then(data => {
        setBreadcrumbs(data);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <Breadcrumb separator="chevron" aria-label="パンくずリスト">
      {breadcrumbs.map((item, index) => (
        <BreadcrumbItem key={index} href={item.href}>
          {item.label}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
```

## 関連コンポーネント

- [Button](/components/button) - パンくずリスト内のアクション
- [Menu](/components/menu) - 省略されたアイテムのドロップダウン
- [Stack](/components/stack) - パンくずリストのレイアウト

## API リファレンス

### Breadcrumb Props

```typescript
interface BreadcrumbProps {
  /**
   * セパレーターのタイプ
   * @default 'slash'
   */
  separator?: 'slash' | 'chevron' | 'arrow';

  /**
   * ナビゲーションのラベル（アクセシビリティ用）
   * @default 'breadcrumb'
   */
  'aria-label'?: string;

  /**
   * 子要素（BreadcrumbItemコンポーネント）
   */
  children: React.ReactNode;
}
```

### BreadcrumbItem Props

```typescript
interface BreadcrumbItemProps {
  /**
   * リンク先URL（指定しない場合は現在のページとして扱われる）
   */
  href?: string;

  /**
   * 個別のセパレーター（親のseparatorをオーバーライド）
   */
  separator?: 'slash' | 'chevron' | 'arrow';

  /**
   * 現在のページを示す
   * @default 自動設定（hrefがない場合）
   */
  'aria-current'?: 'page';

  /**
   * アイテムの内容
   */
  children: React.ReactNode;
}
```

### CSS Variables

```typescript
interface BreadcrumbCSSVariables {
  '--breadcrumb-gap': string;
  '--breadcrumb-font-size': string;
  '--breadcrumb-font-weight': string;
  '--breadcrumb-item-color': string;
  '--breadcrumb-item-hover-color': string;
  '--breadcrumb-item-current-color': string;
  '--breadcrumb-separator-color': string;
  '--breadcrumb-item-padding': string;
}
```

## トラブルシューティング

### 問題: セパレーターが表示されない

**原因**: セパレーターのスタイルが上書きされているか、CSS変数が正しく設定されていない可能性があります。

**解決策**:

```css
/* セパレーターのスタイルを確認 */
ha-breadcrumb-item::part(separator) {
  display: inline;
  margin: 0 8px;
  color: var(--breadcrumb-separator-color, var(--color-gray-400));
}
```

### 問題: 最後のアイテムがリンクとして表示される

**原因**: `href` プロパティが設定されているか、`aria-current` が設定されていない可能性があります。

**解決策**:

```tsx
// 最後のアイテムからhrefを削除
<BreadcrumbItem>現在のページ</BreadcrumbItem>

// または明示的にaria-currentを設定
<BreadcrumbItem aria-current="page">現在のページ</BreadcrumbItem>
```

### 問題: モバイルで表示が崩れる

**原因**: 長いテキストや多くのアイテムが原因でレイアウトが崩れている可能性があります。

**解決策**:

```css
/* テキストの折り返しを防ぐ */
ha-breadcrumb {
  overflow-x: auto;
  white-space: nowrap;
}

/* またはモバイルで省略 */
@media (max-width: 768px) {
  ha-breadcrumb-item:not(:first-child):not(:last-child):not(:nth-last-child(2)) {
    display: none;
  }
}
```

### 問題: スクリーンリーダーで正しく読み上げられない

**原因**: 適切なARIA属性が設定されていない可能性があります。

**解決策**:

```tsx
// aria-labelを設定
<Breadcrumb aria-label="パンくずリスト">
  <BreadcrumbItem href="/">ホーム</BreadcrumbItem>
  <BreadcrumbItem href="/products">商品</BreadcrumbItem>
  <BreadcrumbItem aria-current="page">詳細</BreadcrumbItem>
</Breadcrumb>
```

## セパレータ一覧

| セパレータ | 記号 | 用途 |
|-----------|------|------|
| `slash` | `/` | 一般的、シンプル |
| `chevron` | `>` | モダン、明確 |
| `arrow` | `→` | 方向性を強調 |
