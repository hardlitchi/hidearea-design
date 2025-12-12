# Breadcrumb (パンくずリスト) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/components/navigation/breadcrumb.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option C)

---

## 概要

パンくずリストコンポーネントは、ユーザーが現在のページの位置をサイト階層内で理解し、上位階層に簡単に戻れるようにするナビゲーション要素です。複数のセパレータースタイルと、サイズバリアントをサポートしています。

### 用途

- Webサイトの階層ナビゲーション
- ファイルシステムのパス表示
- マルチステップフォームの進行状況表示
- Eコマースサイトのカテゴリナビゲーション

### Phase 4 で追加された機能

- **クリックイベント処理**: リンククリック時のカスタムイベント発行
- **キーボードナビゲーション**: Enter/Spaceキーでのリンク操作
- **動的パス更新**: `updatePath()` メソッドによる動的な階層変更
- **トースト通知統合**: ナビゲーション時の視覚的フィードバック

---

## セパレータースタイル

パンくずリストの区切り文字は、デザインに合わせて選択できます。

### 1. スラッシュ (/) - デフォルト

最も一般的なセパレーター。

```html
<li class="breadcrumb-separator">/</li>
```

**使用場面:**
- 標準的なWebサイト
- ファイルパス表示

### 2. シェブロン (›)

モダンで洗練された見た目。

```html
<li class="breadcrumb-separator">›</li>
```

**使用場面:**
- モダンなUI
- Eコマースサイト

### 3. 矢印 (→)

方向性を強調したい場合。

```html
<li class="breadcrumb-separator">→</li>
```

**使用場面:**
- フロー型のナビゲーション
- チュートリアル

### 4. ドット (·)

ミニマルなデザイン。

```html
<li class="breadcrumb-separator">·</li>
```

**使用場面:**
- シンプルなUI
- スペースが限られている場合

---

## サイズバリアント

### Small (小)

コンパクトなスペースに適したサイズ。

- フォントサイズ: 0.75rem (12px)
- アイコンサイズ: 0.75rem
- アイテム間隔: 0.25rem

### Default (デフォルト)

標準的なサイズ。

- フォントサイズ: 0.875rem (14px)
- アイコンサイズ: 1rem
- アイテム間隔: 0.5rem

### Large (大)

大きめで見やすいサイズ。

- フォントサイズ: 1rem (16px)
- アイコンサイズ: 1.25rem
- アイテム間隔: 0.75rem

---

## トークン一覧

### コンテナ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.container.padding.vertical` | `{spacing.2}` | コンテナの垂直パディング (0.5rem) |
| `component.breadcrumb.container.padding.horizontal` | `{spacing.0}` | コンテナの水平パディング |
| `component.breadcrumb.container.gap` | `{spacing.2}` | アイテム間の間隔 (0.5rem) |

### アイテム

#### テキスト色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.item.text.default` | `{foreground.secondary}` | デフォルトのテキスト色 |
| `component.breadcrumb.item.text.hover` | `{primary.default}` | ホバー時のテキスト色 |
| `component.breadcrumb.item.text.active` | `{foreground.primary}` | 現在のページのテキスト色 |
| `component.breadcrumb.item.text.disabled` | `{foreground.tertiary}` | 無効状態のテキスト色 |

#### タイポグラフィ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.item.fontSize` | `{font.size.sm}` | アイテムのフォントサイズ (0.875rem) |
| `component.breadcrumb.item.fontWeight` | `{font.weight.normal}` | アイテムのフォントウェイト |
| `component.breadcrumb.item.lineHeight` | `{font.lineHeight.normal}` | アイテムの行高 |

#### テキスト装飾

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.item.textDecoration.default` | `none` | デフォルトのテキスト装飾 |
| `component.breadcrumb.item.textDecoration.hover` | `underline` | ホバー時のテキスト装飾 |

#### パディング・角丸

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.item.padding.horizontal` | `{spacing.1}` | アイテムの水平パディング (0.25rem) |
| `component.breadcrumb.item.padding.vertical` | `{spacing.1}` | アイテムの垂直パディング (0.25rem) |
| `component.breadcrumb.item.borderRadius` | `{border.radius.sm}` | アイテムの角丸 |

### セパレーター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.separator.color` | `{foreground.tertiary}` | セパレーターの色 |
| `component.breadcrumb.separator.fontSize` | `{font.size.sm}` | セパレーターのフォントサイズ |
| `component.breadcrumb.separator.margin.horizontal` | `{spacing.2}` | セパレーターの水平マージン (0.5rem) |
| `component.breadcrumb.separator.content.default` | `"/"` | デフォルトのセパレーター |
| `component.breadcrumb.separator.content.chevron` | `"›"` | シェブロンセパレーター |
| `component.breadcrumb.separator.content.arrow` | `"→"` | 矢印セパレーター |
| `component.breadcrumb.separator.content.dot` | `"·"` | ドットセパレーター |

### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.icon.size` | `{spacing.4}` | アイコンのサイズ (1rem) |
| `component.breadcrumb.icon.gap` | `{spacing.2}` | アイコンとテキストの間隔 |
| `component.breadcrumb.icon.color.default` | `{foreground.tertiary}` | デフォルトのアイコン色 |
| `component.breadcrumb.icon.color.hover` | `{primary.default}` | ホバー時のアイコン色 |
| `component.breadcrumb.icon.color.active` | `{foreground.primary}` | アクティブアイテムのアイコン色 |

### ホームアイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.home.size` | `{spacing.4}` | ホームアイコンのサイズ (1rem) |
| `component.breadcrumb.home.color` | `{foreground.secondary}` | ホームアイコンの色 |

### 省略表示

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.ellipsis.color` | `{foreground.secondary}` | 省略記号の色 |
| `component.breadcrumb.ellipsis.padding` | `{spacing.1}` | 省略記号のパディング |
| `component.breadcrumb.ellipsis.cursor` | `pointer` | 省略記号のカーソル |
| `component.breadcrumb.ellipsis.hover.color` | `{primary.default}` | ホバー時の色 |
| `component.breadcrumb.ellipsis.hover.background` | `{background.secondary}` | ホバー時の背景色 |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.breadcrumb.transition.duration` | `{animation.duration.fast}` | トランジションの持続時間 |
| `component.breadcrumb.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.breadcrumb.transition.properties` | `color, background-color` | トランジション対象 |

---

## 使用例

### HTML

```html
<!-- 基本的なパンくずリスト -->
<nav class="breadcrumb" aria-label="パンくずナビゲーション">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">ホーム</a>
    </li>
    <li class="breadcrumb-separator">/</li>
    <li class="breadcrumb-item">
      <a href="/products" class="breadcrumb-link">プロダクト</a>
    </li>
    <li class="breadcrumb-separator">/</li>
    <li class="breadcrumb-item">
      <a href="/products/electronics" class="breadcrumb-link">電子機器</a>
    </li>
    <li class="breadcrumb-separator">/</li>
    <li class="breadcrumb-item breadcrumb-item-active" aria-current="page">
      ラップトップ
    </li>
  </ol>
</nav>

<!-- ホームアイコン付き -->
<nav class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">
        <span class="breadcrumb-icon">🏠</span>
        ホーム
      </a>
    </li>
    <li class="breadcrumb-separator">›</li>
    <li class="breadcrumb-item">
      <a href="/docs" class="breadcrumb-link">ドキュメント</a>
    </li>
    <li class="breadcrumb-separator">›</li>
    <li class="breadcrumb-item breadcrumb-item-active">
      コンポーネント
    </li>
  </ol>
</nav>

<!-- 省略表示付き（長い階層） -->
<nav class="breadcrumb">
  <ol class="breadcrumb-list">
    <li class="breadcrumb-item">
      <a href="/" class="breadcrumb-link">ホーム</a>
    </li>
    <li class="breadcrumb-separator">/</li>
    <li class="breadcrumb-item">
      <button class="breadcrumb-ellipsis" aria-label="省略された階層を表示">
        ...
      </button>
    </li>
    <li class="breadcrumb-separator">/</li>
    <li class="breadcrumb-item">
      <a href="/category" class="breadcrumb-link">カテゴリ</a>
    </li>
    <li class="breadcrumb-separator">/</li>
    <li class="breadcrumb-item breadcrumb-item-active">
      現在のページ
    </li>
  </ol>
</nav>
```

### CSS

```css
.breadcrumb {
  padding: var(--component-breadcrumb-container-padding-vertical)
           var(--component-breadcrumb-container-padding-horizontal);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: var(--component-breadcrumb-container-gap);
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.breadcrumb-link {
  padding: var(--component-breadcrumb-item-padding-vertical)
           var(--component-breadcrumb-item-padding-horizontal);
  font-size: var(--component-breadcrumb-item-font-size);
  font-weight: var(--component-breadcrumb-item-font-weight);
  color: var(--component-breadcrumb-item-text-default);
  text-decoration: var(--component-breadcrumb-item-text-decoration-default);
  border-radius: var(--component-breadcrumb-item-border-radius);
  transition: var(--component-breadcrumb-transition-properties)
              var(--component-breadcrumb-transition-duration)
              var(--component-breadcrumb-transition-timing);
}

.breadcrumb-link:hover {
  color: var(--component-breadcrumb-item-text-hover);
  text-decoration: var(--component-breadcrumb-item-text-decoration-hover);
}

.breadcrumb-item-active {
  color: var(--component-breadcrumb-item-text-active);
  font-weight: var(--component-breadcrumb-item-font-weight);
}

.breadcrumb-separator {
  color: var(--component-breadcrumb-separator-color);
  font-size: var(--component-breadcrumb-separator-font-size);
  user-select: none;
}
```

### React

```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

function Breadcrumb({ items, separator = '/' }: {
  items: BreadcrumbItem[];
  separator?: string;
}) {
  return (
    <nav className="breadcrumb" aria-label="パンくずナビゲーション">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="breadcrumb-item">
              {index === items.length - 1 ? (
                <span
                  className="breadcrumb-item-active"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="breadcrumb-link">
                  {item.label}
                </a>
              )}
            </li>
            {index < items.length - 1 && (
              <li className="breadcrumb-separator">{separator}</li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

// 使用例
<Breadcrumb
  items={[
    { label: 'ホーム', href: '/' },
    { label: 'プロダクト', href: '/products' },
    { label: 'カテゴリ', href: '/products/category' },
    { label: '現在のページ' }
  ]}
  separator="›"
/>
```

---

## アクセシビリティ

### ARIA属性

- `aria-label="パンくずナビゲーション"`: navタグに設定
- `aria-current="page"`: 現在のページを示すアイテムに設定
- `aria-label`: 省略ボタンに説明を追加

### セマンティックHTML

```html
<nav aria-label="パンくずナビゲーション">
  <ol><!-- 順序付きリスト -->
    <li><!-- リストアイテム -->
      <a href="...">...</a>
    </li>
  </ol>
</nav>
```

### スクリーンリーダー対応

- セパレーターを読み上げさせない: `aria-hidden="true"`
- または視覚的にのみ表示: CSSの`::before`で挿入

```css
.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin: 0 0.5rem;
  color: var(--component-breadcrumb-separator-color);
}
```

---

## ベストプラクティス

### 階層の表示

1. **階層数の制限**
   - モバイル: 3-4階層まで
   - デスクトップ: 5-7階層まで
   - それ以上は省略表示を使用

2. **ラベルの簡潔性**
   - 各アイテムは1-3単語に
   - 長すぎる場合は省略（...）

### 省略表示の実装

```javascript
function collapseBreadcrumb(items, maxItems = 5) {
  if (items.length <= maxItems) return items;

  return [
    items[0], // 最初のアイテム（ホーム）
    { label: '...', onClick: () => showFullPath() }, // 省略
    ...items.slice(-(maxItems - 2)) // 最後の数アイテム
  ];
}
```

### レスポンシブ対応

```css
/* モバイルでは最初と最後のみ表示 */
@media (max-width: 640px) {
  .breadcrumb-item:not(:first-child):not(:last-child),
  .breadcrumb-separator:not(:first-of-type):not(:last-of-type) {
    display: none;
  }

  /* 省略記号を表示 */
  .breadcrumb-item:first-child::after {
    content: '...';
    margin: 0 0.5rem;
  }
}
```

### URL構造との整合性

```javascript
// URLからパンくずを自動生成
function generateBreadcrumbFromURL() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  return segments.map((segment, index) => ({
    label: formatLabel(segment), // 'user-profile' -> 'User Profile'
    href: '/' + segments.slice(0, index + 1).join('/')
  }));
}

function formatLabel(segment) {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
```

---

## パフォーマンス最適化

### 構造化データ（SEO）

検索エンジン向けに構造化データを追加：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "ホーム",
      "item": "https://example.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "プロダクト",
      "item": "https://example.com/products"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "現在のページ"
    }
  ]
}
</script>
```

---

## 関連コンポーネント

- **Tabs**: タブナビゲーション
- **Navigation**: メインナビゲーション
- **Pagination**: ページネーション

---

## よくあるパターン

### Eコマース

```
ホーム > カテゴリ > サブカテゴリ > 商品
```

### ドキュメント

```
🏠 ホーム › ドキュメント › API › コンポーネント
```

### ファイルシステム

```
/ > Users > Documents > Projects > design-system
```

---

## インタラクティブ機能の実装 (Phase 4 改善)

### カスタムイベントの発行

パンくずリンクをクリックすると、`breadcrumb-navigate` イベントが発行されます：

```javascript
function initializeBreadcrumb(breadcrumb) {
  const links = breadcrumb.querySelectorAll('.breadcrumb-link');

  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');

      // カスタムイベントを発行
      const navEvent = new CustomEvent('breadcrumb-navigate', {
        detail: {
          href,
          index,
          text: link.textContent.trim()
        }
      });
      breadcrumb.dispatchEvent(navEvent);
    });
  });
}

// イベントのリスニング
breadcrumb.addEventListener('breadcrumb-navigate', (e) => {
  console.log('Navigate to:', e.detail.href);
  // ルーティング処理などを実装
});
```

### キーボードナビゲーション

Enter キーまたは Space キーでリンクを操作できます：

```javascript
link.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    link.click();
  }
});
```

### 動的パス更新

プログラムから階層パスを更新できます：

```javascript
const breadcrumb = initializeBreadcrumb(document.querySelector('.breadcrumb'));

// パスを動的に更新
breadcrumb.updatePath([
  { text: 'ホーム', href: '/' },
  { text: 'プロダクト', href: '/products' },
  { text: 'カテゴリ', href: '/products/category' },
  { text: '現在のページ' } // 最後の要素はリンクなし
]);
```

### トースト通知との統合

ナビゲーション時に視覚的フィードバックを提供：

```javascript
if (window.showToast) {
  showToast(`パンくずナビゲーション: ${link.textContent.trim()}`, 'info', 3000);
}
```

---

## デモページ

実際の動作は以下のページで確認できます：

https://example.tokens.design.sb.hidearea.net/examples/basic/index.html

---

**最終更新:** 2025-12-11
**Phase 4 Option C で実装、PR #92 で改善**
