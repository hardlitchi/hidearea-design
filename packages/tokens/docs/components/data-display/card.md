# Card (カード) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/components/data-display/card.yaml`
**ステータス:** ✅ 実装済み (Phase 3)

---

## 概要

Cardコンポーネントは、関連するコンテンツをグループ化し、視覚的に分離して表示するコンテナです。3つの状態（default, hover, selected）をサポートし、インタラクティブなコンテンツ表示に最適です。

### 用途

- コンテンツのグループ化
- 商品カード
- ユーザープロフィール表示
- ダッシュボードウィジェット
- 記事プレビュー
- 選択可能なオプション表示

---

## 状態

### 1. Default (デフォルト)

通常の表示状態です。

**使用場面:**
- 静的なコンテンツ表示
- 情報の整理
- デフォルトの表示状態

**トークンプレフィックス:** `component.card.background.default`, `component.card.border.default`

### 2. Hover (ホバー)

マウスオーバー時の状態です。

**使用場面:**
- インタラクティブなカード
- クリック可能なカード
- ホバーフィードバック

**トークンプレフィックス:** `component.card.background.hover`, `component.card.border.hover`

### 3. Selected (選択)

カードが選択されている状態です。

**使用場面:**
- 選択されたオプション
- アクティブなカード
- フォーカス状態

**トークンプレフィックス:** `component.card.background.selected`, `component.card.border.selected`

---

## トークン一覧

### Background (背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.card.background.default` | `{background.primary}` | デフォルト状態の背景色 |
| `component.card.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.card.background.selected` | `{primary.subtle}` | 選択時の背景色 |

### Border (ボーダー色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.card.border.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.card.border.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.card.border.selected` | `{primary.default}` | 選択時のボーダー色 |

---

## 使用例

### HTML/CSS

```html
<!-- ベーシックカード -->
<div
  class="card"
  style="
    background: var(--component-card-background-default);
    border: 1px solid var(--component-card-border-default);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  "
>
  <h3>カードタイトル</h3>
  <p>カードのコンテンツがここに入ります。</p>
</div>

<!-- インタラクティブなカード -->
<div
  class="card card--interactive"
  style="
    background: var(--component-card-background-default);
    border: 1px solid var(--component-card-border-default);
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s ease;
    cursor: pointer;
  "
  onmouseover="this.style.background='var(--component-card-background-hover)'; this.style.borderColor='var(--component-card-border-hover)'"
  onmouseout="this.style.background='var(--component-card-background-default)'; this.style.borderColor='var(--component-card-border-default)'"
>
  <h3>クリック可能なカード</h3>
  <p>ホバーで色が変わります。</p>
</div>

<!-- 選択されたカード -->
<div
  class="card card--selected"
  style="
    background: var(--component-card-background-selected);
    border: 2px solid var(--component-card-border-selected);
    border-radius: 8px;
    padding: 16px;
  "
>
  <h3>選択済み</h3>
  <p>このカードは選択されています。</p>
</div>

<!-- 画像付きカード -->
<div
  class="card"
  style="
    background: var(--component-card-background-default);
    border: 1px solid var(--component-card-border-default);
    border-radius: 8px;
    overflow: hidden;
  "
>
  <img src="image.jpg" alt="カード画像" style="width: 100%; height: 200px; object-fit: cover;">
  <div style="padding: 16px;">
    <h3>商品名</h3>
    <p>商品の説明文がここに入ります。</p>
    <button class="button button--primary">詳細を見る</button>
  </div>
</div>

<!-- ヘッダーとフッター付きカード -->
<div
  class="card"
  style="
    background: var(--component-card-background-default);
    border: 1px solid var(--component-card-border-default);
    border-radius: 8px;
    overflow: hidden;
  "
>
  <div class="card__header" style="padding: 16px; border-bottom: 1px solid var(--component-card-border-default);">
    <h3 style="margin: 0;">カードヘッダー</h3>
  </div>
  <div class="card__body" style="padding: 16px;">
    <p>メインコンテンツがここに入ります。</p>
  </div>
  <div class="card__footer" style="padding: 16px; border-top: 1px solid var(--component-card-border-default);">
    <button class="button">キャンセル</button>
    <button class="button button--primary">保存</button>
  </div>
</div>
```

### CSS Classes

```css
/* ベーススタイル */
.card {
  background: var(--component-card-background-default);
  border: 1px solid var(--component-card-border-default);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

/* インタラクティブなカード */
.card--interactive {
  cursor: pointer;
}

.card--interactive:hover {
  background: var(--component-card-background-hover);
  border-color: var(--component-card-border-hover);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card--interactive:active {
  transform: translateY(0);
}

/* 選択されたカード */
.card--selected {
  background: var(--component-card-background-selected);
  border: 2px solid var(--component-card-border-selected);
  padding: 15px; /* border分を調整 */
}

/* カードヘッダー */
.card__header {
  padding: 16px;
  border-bottom: 1px solid var(--component-card-border-default);
}

.card__header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

/* カードボディ */
.card__body {
  padding: 16px;
}

/* カードフッター */
.card__footer {
  padding: 16px;
  border-top: 1px solid var(--component-card-border-default);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* カード画像 */
.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* コンパクトカード */
.card--compact {
  padding: 12px;
}

/* グリッドレイアウト */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

/* 横並びカード */
.card--horizontal {
  display: flex;
  flex-direction: row;
}

.card--horizontal .card__image {
  width: 200px;
  height: auto;
  flex-shrink: 0;
}

.card--horizontal .card__body {
  flex: 1;
}
```

### React

```tsx
import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  interactive = false,
  selected = false,
  onClick,
  header,
  footer,
  image,
  imageAlt,
  className = '',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getBackgroundColor = () => {
    if (selected) return 'var(--component-card-background-selected)';
    if (interactive && isHovered) return 'var(--component-card-background-hover)';
    return 'var(--component-card-background-default)';
  };

  const getBorderColor = () => {
    if (selected) return 'var(--component-card-border-selected)';
    if (interactive && isHovered) return 'var(--component-card-border-hover)';
    return 'var(--component-card-border-default)';
  };

  return (
    <div
      className={`card ${interactive ? 'card--interactive' : ''} ${selected ? 'card--selected' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      style={{
        background: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: selected ? '2px' : '1px',
        padding: selected ? '15px' : '16px',
        cursor: interactive ? 'pointer' : 'default',
      }}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt || ''}
          className="card__image"
          style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '16px' }}
        />
      )}
      {header && (
        <div className="card__header" style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid ${getBorderColor()}` }}>
          {header}
        </div>
      )}
      <div className="card__body">
        {title && <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{title}</h3>}
        {children}
      </div>
      {footer && (
        <div className="card__footer" style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${getBorderColor()}` }}>
          {footer}
        </div>
      )}
    </div>
  );
};

// 使用例
export default function Example() {
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

  return (
    <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
      <Card title="シンプルなカード">
        <p>これは基本的なカードコンポーネントです。</p>
      </Card>

      <Card
        title="インタラクティブなカード"
        interactive
        selected={selectedCard === 1}
        onClick={() => setSelectedCard(1)}
      >
        <p>クリックして選択できます。</p>
      </Card>

      <Card
        image="https://via.placeholder.com/400x200"
        imageAlt="サンプル画像"
        title="画像付きカード"
      >
        <p>画像を含むカードです。</p>
      </Card>

      <Card
        header={<h3 style={{ margin: 0 }}>カードヘッダー</h3>}
        footer={
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="button">キャンセル</button>
            <button className="button button--primary">保存</button>
          </div>
        }
      >
        <p>ヘッダーとフッター付きのカードです。</p>
      </Card>
    </div>
  );
}
```

---

## アクセシビリティ

### セマンティックHTML

カードがインタラクティブな場合、適切な要素とARIA属性を使用します。

```html
<!-- クリック可能なカード（リンク） -->
<a
  href="/details"
  class="card card--interactive"
  style="text-decoration: none; color: inherit; display: block;"
>
  <h3>記事タイトル</h3>
  <p>記事の説明文...</p>
</a>

<!-- 選択可能なカード（ボタン） -->
<button
  class="card card--interactive"
  role="button"
  aria-pressed="false"
  style="text-align: left; width: 100%;"
>
  <h3>オプション 1</h3>
  <p>このオプションを選択</p>
</button>

<!-- 選択されたカード -->
<div
  class="card card--selected"
  role="option"
  aria-selected="true"
  tabindex="0"
>
  <h3>選択済みオプション</h3>
</div>
```

### キーボード操作

- インタラクティブなカードは`Tab`キーでフォーカス可能
- `Enter`または`Space`キーでアクティブ化
- フォーカスインジケーターを表示

```css
.card--interactive:focus {
  outline: 2px solid var(--component-card-border-selected);
  outline-offset: 2px;
}
```

---

## ベストプラクティス

### 1. 適切な構造化

```html
<!-- Good: セマンティックな構造 -->
<article class="card">
  <header class="card__header">
    <h3>記事タイトル</h3>
    <time datetime="2025-12-12">2025年12月12日</time>
  </header>
  <div class="card__body">
    <p>記事の内容...</p>
  </div>
  <footer class="card__footer">
    <a href="/read-more">続きを読む</a>
  </footer>
</article>

<!-- Bad: 意味のないdivのみ -->
<div class="card">
  <div>記事タイトル</div>
  <div>2025年12月12日</div>
  <div>記事の内容...</div>
</div>
```

### 2. 一貫したサイズ

```html
<!-- Good: グリッドで統一されたサイズ -->
<div class="card-grid">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>

<!-- Bad: 不揃いなサイズ -->
<div class="card" style="width: 200px;">...</div>
<div class="card" style="width: 350px;">...</div>
<div class="card" style="width: 180px;">...</div>
```

### 3. 適切なインタラクション

```html
<!-- Good: クリック可能な領域が明確 -->
<div class="card">
  <h3>商品名</h3>
  <p>説明文</p>
  <a href="/product/1" class="button button--primary">詳細を見る</a>
</div>

<!-- Good: カード全体がクリック可能 -->
<a href="/product/1" class="card card--interactive">
  <h3>商品名</h3>
  <p>説明文</p>
</a>
```

### 4. 適切なコンテンツ量

```html
<!-- Good: 簡潔で読みやすい -->
<div class="card">
  <h3>タイトル</h3>
  <p>2〜3行程度の説明文。簡潔で要点を押さえた内容。</p>
</div>

<!-- Bad: 長すぎる -->
<div class="card">
  <h3>タイトル</h3>
  <p>非常に長い説明文が続きます。カード内に収まらず、
     読みにくくなってしまいます。このような場合は
     「続きを読む」リンクを使用するか、別のレイアウトを
     検討すべきです...</p>
</div>
```

---

## 関連コンポーネント

- **[Modal](./modal.md)** - 詳細情報の表示
- **[List](./list.md)** - リスト形式の表示
- **[Grid](./grid.md)** - グリッドレイアウト
- **[Button](./button.md)** - カード内のアクション

---

## デザインガイドライン

### サイズとスペーシング

- **パディング:** 16px（標準）、12px（コンパクト）
- **ボーダー幅:** 1px（通常）、2px（選択時）
- **ボーダー半径:** 8px
- **シャドウ:** 0 1px 3px rgba(0, 0, 0, 0.1)
- **ホバー時シャドウ:** 0 4px 6px rgba(0, 0, 0, 0.1)

### レイアウト

- カード間の間隔: 16px
- グリッド最小幅: 300px
- 最大幅: コンテナの制約に従う
- 縦横比（画像付き）: 16:9 または 4:3

### トランジション

- ホバーエフェクト: 0.2s ease
- 背景色変化: 0.2s ease
- ボーダー色変化: 0.2s ease
- シャドウ変化: 0.2s ease

### レスポンシブデザイン

```css
/* モバイル */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .card--horizontal {
    flex-direction: column;
  }

  .card--horizontal .card__image {
    width: 100%;
  }
}

/* タブレット */
@media (min-width: 769px) and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* デスクトップ */
@media (min-width: 1025px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
```

---

**最終更新:** 2025-12-12
**バージョン:** 1.0.0
