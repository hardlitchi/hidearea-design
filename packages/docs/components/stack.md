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

Stack コンポーネントは WCAG 2.1 AA 基準に準拠し、レイアウトの視覚的順序と DOM 順序を一致させてアクセシビリティを確保します。

### DOM順序とフォーカス順序

Stack は flexbox ベースですが、DOM 順序とフォーカス順序を一致させることで、スクリーンリーダーとキーボードナビゲーションの一貫性を保ちます。

```html
<!-- ✓ 推奨: DOM 順序とビジュアル順序が一致 -->
<ha-stack direction="horizontal" gap="2">
  <ha-button>最初</ha-button>  <!-- タブ順序: 1 -->
  <ha-button>2番目</ha-button>   <!-- タブ順序: 2 -->
  <ha-button>最後</ha-button>    <!-- タブ順序: 3 -->
</ha-stack>

<!-- ❌ 避ける: CSS で視覚的順序を逆転（アクセシビリティ問題） -->
<ha-stack direction="horizontal" gap="2" style="flex-direction: row-reverse;">
  <ha-button>最後</ha-button>    <!-- DOM: 1, 視覚: 3 -->
  <ha-button>2番目</ha-button>   <!-- DOM: 2, 視覚: 2 -->
  <ha-button>最初</ha-button>  <!-- DOM: 3, 視覚: 1 -->
</ha-stack>
```

### キーボードナビゲーション

Stack 内のインタラクティブ要素は自然なタブ順序でフォーカス可能です。

```html
<ha-stack direction="vertical" gap="4">
  <!-- フォーカス順序: 1 → 2 → 3 → 4 → 5 -->
  <ha-input label="名前" />         <!-- 1 -->
  <ha-input label="メール" />       <!-- 2 -->
  <ha-textarea label="メッセージ" /><!-- 3 -->
  <ha-stack direction="horizontal" gap="2" justify="end">
    <ha-button variant="outline">キャンセル</ha-button>  <!-- 4 -->
    <ha-button variant="primary">送信</ha-button>        <!-- 5 -->
  </ha-stack>
</ha-stack>
```

**キーボード操作**:
- `Tab`: 次のフォーカス可能要素へ移動
- `Shift + Tab`: 前のフォーカス可能要素へ移動
- `Enter` / `Space`: フォーカス中の要素を操作

### スクリーンリーダー

Stack は構造的なコンポーネントであり、スクリーンリーダーは DOM 順序に従ってコンテンツを読み上げます。

```html
<ha-stack direction="vertical" gap="3">
  <h1>記事タイトル</h1>
  <p>公開日: 2025年1月15日</p>
  <p>記事の本文がここに入ります...</p>
  <ha-stack direction="horizontal" gap="2">
    <ha-button variant="outline">共有</ha-button>
    <ha-button variant="primary">いいね</ha-button>
  </ha-stack>
</ha-stack>
```

**スクリーンリーダーの読み上げ順序** (NVDA/JAWS/VoiceOver):
1. "見出しレベル1、記事タイトル"
2. "公開日: 2025年1月15日"
3. "記事の本文がここに入ります..."
4. "ボタン、共有"
5. "ボタン、いいね"

### ランドマークロールとの組み合わせ

Stack を適切なランドマークロールを持つ要素内で使用することで、スクリーンリーダーのナビゲーション効率を向上させます。

```html
<nav aria-label="メインナビゲーション">
  <ha-stack direction="horizontal" gap="4" align="center">
    <a href="/">ホーム</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </ha-stack>
</nav>

<main>
  <ha-stack direction="vertical" gap="6">
    <article>
      <h1>記事タイトル</h1>
      <p>記事本文...</p>
    </article>
  </ha-stack>
</main>
```

### ARIA属性の適切な使用

Stack 自体には ARIA 属性は必要ありませんが、内部要素には適切な ARIA 属性を設定します。

```html
<!-- ツールバー -->
<ha-stack direction="horizontal" gap="2" role="toolbar" aria-label="編集ツール">
  <ha-button aria-label="太字">
    <strong>B</strong>
  </ha-button>
  <ha-button aria-label="イタリック">
    <em>I</em>
  </ha-button>
  <ha-button aria-label="下線">
    <u>U</u>
  </ha-button>
</ha-stack>

<!-- タブリスト -->
<ha-stack direction="horizontal" gap="1" role="tablist" aria-label="設定タブ">
  <ha-button role="tab" aria-selected="true" aria-controls="general-panel">
    一般
  </ha-button>
  <ha-button role="tab" aria-selected="false" aria-controls="privacy-panel">
    プライバシー
  </ha-button>
  <ha-button role="tab" aria-selected="false" aria-controls="security-panel">
    セキュリティ
  </ha-button>
</ha-stack>
```

### レスポンシブアクセシビリティ

レスポンシブレイアウトでは、モバイルとデスクトップで異なる Stack 方向を使用しますが、DOM 順序は常に一貫性を保ちます。

```tsx
import { Stack, Card } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ResponsiveAccessibleStack() {
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');

  useEffect(() => {
    const updateDirection = () => {
      setDirection(window.innerWidth >= 768 ? 'horizontal' : 'vertical');
    };
    updateDirection();
    window.addEventListener('resize', updateDirection);
    return () => window.removeEventListener('resize', updateDirection);
  }, []);

  return (
    <Stack direction={direction} gap="4">
      {/* DOM 順序は常に一貫 */}
      <Card>カード 1 (最初にフォーカス)</Card>
      <Card>カード 2</Card>
      <Card>カード 3 (最後にフォーカス)</Card>
    </Stack>
  );
}
```

### フォーカス管理のベストプラクティス

```html
<!-- ✓ 推奨: スキップリンクで長いナビゲーションをスキップ -->
<a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>

<nav aria-label="メインナビゲーション">
  <ha-stack direction="horizontal" gap="4">
    <a href="/">ホーム</a>
    <a href="/products">商品</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </ha-stack>
</nav>

<main id="main-content" tabindex="-1">
  <ha-stack direction="vertical" gap="6">
    <h1>メインコンテンツ</h1>
    <p>コンテンツ...</p>
  </ha-stack>
</main>
```

### セマンティック HTML との組み合わせ

```html
<!-- フォーム -->
<form>
  <ha-stack direction="vertical" gap="4">
    <fieldset>
      <legend>個人情報</legend>
      <ha-stack direction="vertical" gap="3">
        <ha-input label="名前" required />
        <ha-input label="メールアドレス" type="email" required />
      </ha-stack>
    </fieldset>

    <ha-stack direction="horizontal" gap="2" justify="end">
      <ha-button type="button" variant="outline">キャンセル</ha-button>
      <ha-button type="submit" variant="primary">送信</ha-button>
    </ha-stack>
  </ha-stack>
</form>

<!-- リスト -->
<ul style="list-style: none; padding: 0;">
  <ha-stack direction="vertical" gap="2">
    <li><a href="/item1">アイテム 1</a></li>
    <li><a href="/item2">アイテム 2</a></li>
    <li><a href="/item3">アイテム 3</a></li>
  </ha-stack>
</ul>
```

## スタイルのカスタマイズ

Stack コンポーネントは、デザイントークンとカスタムCSS変数を使用して柔軟にカスタマイズできます。

### デザイントークン

Stack コンポーネントで使用される主要なデザイントークン：

```css
:root {
  /* ギャップサイズ */
  --stack-gap-1: var(--space-1); /* 4px */
  --stack-gap-2: var(--space-2); /* 8px */
  --stack-gap-3: var(--space-3); /* 12px */
  --stack-gap-4: var(--space-4); /* 16px (デフォルト) */
  --stack-gap-5: var(--space-5); /* 20px */
  --stack-gap-6: var(--space-6); /* 24px */
}
```

### カスタムCSS変数

Stack のスタイルをカスタマイズするためのCSS変数：

```css
ha-stack {
  /* ギャップ */
  --stack-gap: var(--space-4); /* 16px */

  /* パディング */
  --stack-padding: 0;

  /* 背景色 */
  --stack-background: transparent;

  /* ボーダー */
  --stack-border-width: 0;
  --stack-border-color: transparent;
  --stack-border-radius: 0;
}

/* カスタムギャップ */
ha-stack.tight {
  --stack-gap: var(--space-1); /* 4px */
}

ha-stack.spacious {
  --stack-gap: var(--space-8); /* 32px */
}

/* 背景とパディング付きスタック */
ha-stack.card-stack {
  --stack-background: var(--color-surface-0);
  --stack-padding: var(--space-4);
  --stack-border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}
```

### Shadow DOMパーツ

Stack は Shadow DOM を使用しており、`::part()` セレクタでスタイルをカスタマイズできます：

```css
/* Stack ラッパー */
ha-stack::part(stack) {
  background-color: var(--color-surface-50);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

/* 垂直スタック */
ha-stack[direction="vertical"]::part(stack) {
  border-left: 4px solid var(--color-primary-500);
}

/* 水平スタック */
ha-stack[direction="horizontal"]::part(stack) {
  border-bottom: 2px solid var(--color-border-subtle);
}
```

### 方向別スタイル

```css
/* 垂直スタック */
ha-stack[direction="vertical"] {
  --stack-gap: var(--space-4);
}

ha-stack[direction="vertical"]::part(stack) {
  border-left: 2px solid var(--color-primary-200);
  padding-left: var(--space-4);
}

/* 水平スタック */
ha-stack[direction="horizontal"] {
  --stack-gap: var(--space-2);
}

ha-stack[direction="horizontal"]::part(stack) {
  background-color: var(--color-surface-100);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
}
```

### レスポンシブスタイル

ビューポートサイズに応じて異なるギャップを設定：

```css
ha-stack {
  --stack-gap: var(--space-2); /* 8px (モバイル) */
}

/* タブレット */
@media (min-width: 768px) {
  ha-stack {
    --stack-gap: var(--space-4); /* 16px */
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  ha-stack {
    --stack-gap: var(--space-6); /* 24px */
  }
}
```

### ダークモード対応

ダークモードでの Stack スタイル：

```css
/* ライトモード */
:root {
  --stack-background: var(--color-surface-0);
  --stack-border-color: var(--color-border-subtle);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  :root {
    --stack-background: var(--color-surface-900);
    --stack-border-color: var(--color-border-subtle-dark);
  }
}

ha-stack.themed::part(stack) {
  background-color: var(--stack-background);
  border: 1px solid var(--stack-border-color);
}
```

### カスタムテーマ

Stack のカスタムテーマ例：

```css
/* ツールバーテーマ */
ha-stack.toolbar {
  --stack-background: var(--color-surface-100);
  --stack-gap: var(--space-1);
  padding: var(--space-2);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
}

ha-stack.toolbar::part(stack) {
  background: linear-gradient(
    180deg,
    var(--color-surface-50) 0%,
    var(--color-surface-100) 100%
  );
}

/* アラートスタック */
ha-stack.alert {
  --stack-background: var(--color-warning-50);
  --stack-gap: var(--space-3);
  padding: var(--space-4);
  border-left: 4px solid var(--color-warning-500);
  border-radius: var(--radius-md);
}

/* カードスタック */
ha-stack.card {
  --stack-gap: var(--space-4);
  background-color: var(--color-surface-0);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 1. 適切な方向の選択

```html
<!-- ボタングループ: horizontal -->
<ha-stack direction="horizontal" gap="2">
  <ha-button variant="primary">保存</ha-button>
  <ha-button variant="outline">キャンセル</ha-button>
</ha-stack>

<!-- フォーム: vertical -->
<ha-stack direction="vertical" gap="4">
  <ha-input label="名前" />
  <ha-input label="メールアドレス" />
  <ha-button variant="primary">送信</ha-button>
</ha-stack>
```

**理由**: 方向はコンテンツの性質に合わせて選択し、ユーザーの視線の流れを自然にする。

#### 2. 一貫したギャップの使用

```html
<!-- アプリケーション全体で一貫したギャップ -->
<ha-stack direction="vertical" gap="4">
  <section>
    <h2>セクション1</h2>
    <ha-stack direction="vertical" gap="3">
      <p>段落1</p>
      <p>段落2</p>
    </ha-stack>
  </section>

  <section>
    <h2>セクション2</h2>
    <ha-stack direction="vertical" gap="3">
      <p>段落1</p>
      <p>段落2</p>
    </ha-stack>
  </section>
</ha-stack>
```

**理由**: 一貫したギャップでビジュアル階層を明確にし、ユーザーエクスペリエンスを向上。

#### 3. セマンティックHTMLとの組み合わせ

```html
<!-- リスト -->
<ul style="list-style: none; padding: 0;">
  <ha-stack direction="vertical" gap="2">
    <li><a href="/item1">アイテム 1</a></li>
    <li><a href="/item2">アイテム 2</a></li>
    <li><a href="/item3">アイテム 3</a></li>
  </ha-stack>
</ul>

<!-- ナビゲーション -->
<nav aria-label="メインナビゲーション">
  <ha-stack direction="horizontal" gap="4">
    <a href="/">ホーム</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </ha-stack>
</nav>
```

**理由**: セマンティックHTMLでアクセシビリティとSEOを向上。

#### 4. レスポンシブ方向の切り替え

```tsx
import { Stack, Card } from '@hidearea-design/react';
import { useMediaQuery } from '@hidearea-design/hooks';

function ResponsiveStack() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Stack direction={isMobile ? 'vertical' : 'horizontal'} gap="4">
      <Card>カード 1</Card>
      <Card>カード 2</Card>
      <Card>カード 3</Card>
    </Stack>
  );
}
```

**理由**: デバイスに応じた最適なレイアウトでユーザビリティを向上。

### ✗ 避けるべき使い方

#### 1. CSS での視覚的順序の逆転

```html
<!-- ❌ 避ける: flex-direction: row-reverse -->
<ha-stack direction="horizontal" style="flex-direction: row-reverse;">
  <ha-button>3番目</ha-button>  <!-- DOM: 1, 視覚: 3 -->
  <ha-button>2番目</ha-button>  <!-- DOM: 2, 視覚: 2 -->
  <ha-button>1番目</ha-button>  <!-- DOM: 3, 視覚: 1 -->
</ha-stack>
```

**理由**: DOM 順序と視覚的順序が不一致になり、スクリーンリーダーとキーボードナビゲーションに問題が発生。

**代替案**:
```html
<!-- ✓ 推奨: DOM 順序を変更 -->
<ha-stack direction="horizontal" gap="2">
  <ha-button>1番目</ha-button>
  <ha-button>2番目</ha-button>
  <ha-button>3番目</ha-button>
</ha-stack>
```

#### 2. 過度なネスト

```html
<!-- ❌ 避ける: 不要なネスト -->
<ha-stack direction="vertical" gap="4">
  <ha-stack direction="vertical" gap="4">
    <ha-stack direction="vertical" gap="4">
      <p>コンテンツ</p>
    </ha-stack>
  </ha-stack>
</ha-stack>
```

**理由**: DOM 階層が深くなり、パフォーマンスとメンテナンス性が低下。

**代替案**:
```html
<!-- ✓ 推奨: フラットな構造 -->
<ha-stack direction="vertical" gap="4">
  <p>コンテンツ1</p>
  <p>コンテンツ2</p>
  <p>コンテンツ3</p>
</ha-stack>
```

#### 3. Grid が適切な場合に Stack を使用

```html
<!-- ❌ 避ける: 2次元レイアウトに Stack を使用 -->
<ha-stack direction="vertical" gap="4">
  <ha-stack direction="horizontal" gap="4">
    <ha-card>1</ha-card>
    <ha-card>2</ha-card>
    <ha-card>3</ha-card>
  </ha-stack>
  <ha-stack direction="horizontal" gap="4">
    <ha-card>4</ha-card>
    <ha-card>5</ha-card>
    <ha-card>6</ha-card>
  </ha-stack>
</ha-stack>
```

**理由**: Grid を使用すべき2次元レイアウトで Stack を使用すると、コードが冗長になり、レスポンシブ対応が困難。

**代替案**:
```html
<!-- ✓ 推奨: Grid を使用 -->
<ha-grid columns="3" gap="4">
  <ha-card>1</ha-card>
  <ha-card>2</ha-card>
  <ha-card>3</ha-card>
  <ha-card>4</ha-card>
  <ha-card>5</ha-card>
  <ha-card>6</ha-card>
</ha-grid>
```

#### 4. 一貫性のないギャップ

```html
<!-- ❌ 避ける: 同じコンテキストで異なるギャップ -->
<ha-stack direction="vertical" gap="2">
  <h1>タイトル</h1>
  <p>段落1</p>
</ha-stack>

<ha-stack direction="vertical" gap="6">
  <h2>サブタイトル</h2>
  <p>段落2</p>
</ha-stack>
```

**理由**: 一貫性のないギャップでビジュアル階層が不明瞭になる。

**代替案**:
```html
<!-- ✓ 推奨: 一貫したギャップ -->
<ha-stack direction="vertical" gap="4">
  <h1>タイトル</h1>
  <p>段落1</p>

  <h2>サブタイトル</h2>
  <p>段落2</p>
</ha-stack>
```

## よくある質問

### 1. Stack と Grid の使い分けは？

**Stack**: 1方向のシンプルなレイアウトに使用
- ボタングループ
- フォーム（垂直配置）
- ナビゲーションメニュー（水平配置）
- テキストコンテンツ（段落、見出し）

**Grid**: 2次元のレイアウトに使用
- カードグリッド
- 商品一覧
- ダッシュボード
- フォトギャラリー

```html
<!-- Stack: ボタングループ -->
<ha-stack direction="horizontal" gap="2">
  <ha-button>保存</ha-button>
  <ha-button>キャンセル</ha-button>
</ha-stack>

<!-- Grid: カードグリッド -->
<ha-grid columns="3" gap="4">
  <ha-card>Card 1</ha-card>
  <ha-card>Card 2</ha-card>
  <ha-card>Card 3</ha-card>
</ha-grid>
```

### 2. レスポンシブで Stack の方向を動的に変更するには？

React の state とカスタムフックを使用して実現できます：

```tsx
import { Stack, Card } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ResponsiveStack() {
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');

  useEffect(() => {
    const updateDirection = () => {
      setDirection(window.innerWidth >= 768 ? 'horizontal' : 'vertical');
    };

    updateDirection(); // 初期化
    window.addEventListener('resize', updateDirection);
    return () => window.removeEventListener('resize', updateDirection);
  }, []);

  return (
    <Stack direction={direction} gap="4">
      <Card>カード 1</Card>
      <Card>カード 2</Card>
      <Card>カード 3</Card>
    </Stack>
  );
}
```

CSS カスタムプロパティを使用する方法：

```css
/* モバイル: vertical */
ha-stack.responsive {
  flex-direction: column;
}

/* タブレット以上: horizontal */
@media (min-width: 768px) {
  ha-stack.responsive {
    flex-direction: row;
  }
}
```

### 3. Stack で特定のアイテムだけ右寄せにするには？

`margin-left: auto` を使用して柔軟な配置を実現できます：

```html
<ha-stack direction="horizontal" gap="4" align="center">
  <div>左側のコンテンツ</div>
  <div>中央のコンテンツ</div>
  <div style="margin-left: auto;">右側のコンテンツ</div>
</ha-stack>
```

React での実装：

```tsx
import { Stack, Button } from '@hidearea-design/react';

function Toolbar() {
  return (
    <Stack direction="horizontal" gap="4" align="center">
      <h1>タイトル</h1>
      <nav>
        <Stack direction="horizontal" gap="2">
          <a href="/">ホーム</a>
          <a href="/about">About</a>
        </Stack>
      </nav>
      <div style={{ marginLeft: 'auto' }}>
        <Stack direction="horizontal" gap="2">
          <Button variant="outline">ログイン</Button>
          <Button variant="primary">サインアップ</Button>
        </Stack>
      </div>
    </Stack>
  );
}
```

### 4. Stack のアイテムに等幅を設定するには？

`align="stretch"` と CSS の `flex: 1` を組み合わせて実現できます：

```html
<ha-stack direction="horizontal" gap="4" align="stretch">
  <ha-card style="flex: 1;">カード 1（等幅）</ha-card>
  <ha-card style="flex: 1;">カード 2（等幅）</ha-card>
  <ha-card style="flex: 1;">カード 3（等幅）</ha-card>
</ha-stack>
```

React での実装：

```tsx
import { Stack, Card } from '@hidearea-design/react';

function EqualWidthCards() {
  return (
    <Stack direction="horizontal" gap="4" align="stretch">
      {[1, 2, 3].map((num) => (
        <Card key={num} style={{ flex: 1 }}>
          カード {num}（等幅）
        </Card>
      ))}
    </Stack>
  );
}
```

## 関連コンポーネント

- [Grid](/components/grid) - 2次元グリッドレイアウトコンポーネント
- [Container](/components/container) - コンテンツコンテナ
- [Card](/components/card) - カードコンテナ

## API リファレンス

### StackProps

```typescript
interface StackProps {
  /**
   * スタック方向
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * アイテム間のギャップ
   * @default '4'
   */
  gap?: '1' | '2' | '3' | '4' | '5' | '6';

  /**
   * 交差軸の配置
   * @default 'stretch'
   */
  align?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * 主軸の配置
   * @default 'start'
   */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';

  /**
   * 折り返しの有無
   * @default false
   */
  wrap?: boolean;

  /**
   * ARIA ロール（toolbar, tablist など）
   */
  role?: string;

  /**
   * ARIA ラベル（ロールを使用する場合は推奨）
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
interface StackCSSVariables {
  /** アイテム間のギャップ */
  '--stack-gap'?: string;

  /** パディング */
  '--stack-padding'?: string;

  /** 背景色 */
  '--stack-background'?: string;

  /** ボーダー幅 */
  '--stack-border-width'?: string;

  /** ボーダーカラー */
  '--stack-border-color'?: string;

  /** ボーダー半径 */
  '--stack-border-radius'?: string;
}
```

### Shadow DOM Parts

```typescript
interface StackParts {
  /** Stack ラッパー要素 */
  stack: HTMLDivElement;
}
```

使用例：
```css
ha-stack::part(stack) {
  background-color: var(--color-surface-100);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## トラブルシューティング

### 1. アイテムが意図しない幅/高さになる

**問題**: Stack のアイテムが伸びたり縮んだりして、意図したサイズにならない。

**原因**: `align` プロパティが `stretch` (デフォルト) になっており、アイテムが交差軸方向に伸びています。

**解決策**:
```html
<!-- ❌ 問題: アイテムが垂直方向に伸びる -->
<ha-stack direction="horizontal" gap="4">
  <ha-card>短いコンテンツ</ha-card>
  <ha-card>
    長いコンテンツ<br>
    複数行<br>
    さらに長い
  </ha-card>
</ha-stack>

<!-- ✓ 解決: align="start" で伸びを防ぐ -->
<ha-stack direction="horizontal" gap="4" align="start">
  <ha-card>短いコンテンツ</ha-card>
  <ha-card>
    長いコンテンツ<br>
    複数行<br>
    さらに長い
  </ha-card>
</ha-stack>
```

### 2. ギャップが適用されない

**問題**: `gap` プロパティを設定してもギャップが表示されない。

**原因**: CSS 変数がオーバーライドされているか、ブラウザが CSS Gap をサポートしていない可能性があります。

**解決策**:
```css
/* CSS 変数を確認 */
ha-stack {
  --stack-gap: var(--space-4); /* デフォルト値に戻す */
}

/* または、明示的にギャップを設定 */
ha-stack[gap="4"] {
  gap: 16px !important;
}
```

代替として、マージンを使用：
```css
ha-stack[direction="vertical"] > * + * {
  margin-top: var(--stack-gap, 16px);
}

ha-stack[direction="horizontal"] > * + * {
  margin-left: var(--stack-gap, 16px);
}
```

### 3. レスポンシブで方向が変わらない

**問題**: メディアクエリで方向を変更しても、Stack の方向が変わらない。

**原因**: HTML 属性が CSS より優先されています。

**解決策**:
```html
<!-- ❌ 問題: 属性が固定されている -->
<ha-stack direction="horizontal" class="responsive">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<!-- ✓ 解決1: JavaScript で動的に変更 -->
<ha-stack class="responsive">
  <div>Item 1</div>
  <div>Item 2</div>
</ha-stack>

<script>
  const stack = document.querySelector('ha-stack.responsive');
  const updateDirection = () => {
    stack.setAttribute('direction', window.innerWidth >= 768 ? 'horizontal' : 'vertical');
  };
  updateDirection();
  window.addEventListener('resize', updateDirection);
</script>
```

React での解決:
```tsx
import { Stack } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ResponsiveStack() {
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical');

  useEffect(() => {
    const updateDirection = () => {
      setDirection(window.innerWidth >= 768 ? 'horizontal' : 'vertical');
    };
    updateDirection();
    window.addEventListener('resize', updateDirection);
    return () => window.removeEventListener('resize', updateDirection);
  }, []);

  return (
    <Stack direction={direction} gap="4">
      <div>Item 1</div>
      <div>Item 2</div>
    </Stack>
  );
}
```

### 4. justify="space-between" が効かない

**問題**: `justify="space-between"` を設定しても、アイテムが均等配置されない。

**原因**: Stack の幅が子要素の合計幅と同じため、余白がありません。

**解決策**:
```html
<!-- ❌ 問題: Stack の幅が子要素に合わせて縮む -->
<ha-stack direction="horizontal" justify="space-between" gap="4">
  <ha-button>ボタン1</ha-button>
  <ha-button>ボタン2</ha-button>
</ha-stack>

<!-- ✓ 解決: Stack に明示的な幅を設定 -->
<ha-stack
  direction="horizontal"
  justify="space-between"
  gap="4"
  style="width: 100%;"
>
  <ha-button>ボタン1</ha-button>
  <ha-button>ボタン2</ha-button>
</ha-stack>

<!-- または、親要素で幅を制御 -->
<div style="width: 100%;">
  <ha-stack direction="horizontal" justify="space-between" gap="4">
    <ha-button>ボタン1</ha-button>
    <ha-button>ボタン2</ha-button>
  </ha-stack>
</div>
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
