# Pagination (ページネーション) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/components/navigation/pagination.yaml`
**ステータス:** ✅ 実装済み (Phase 4 Option C)

---

## 概要

ページネーションコンポーネントは、大量のコンテンツを複数のページに分割し、ユーザーがページ間を効率的に移動できるようにするナビゲーション要素です。複数のバリアント（default, simple, rounded）と、サイズバリアント（small, default, large）をサポートしています。

### 用途

- テーブルやリストの複数ページ表示
- 検索結果の分割表示
- ブログ記事一覧
- プロダクトカタログ

---

## バリアント

### 1. Default (デフォルト) - ボーダー付き

標準的なページネーションスタイル。ボーダーで各ページボタンを区切ります。

**使用場面:**
- 標準的なテーブル
- リスト表示
- 管理画面

**特徴:**
- 明確なボーダー
- アクティブページは塗りつぶし

### 2. Simple (シンプル) - ボーダーなし

ミニマルなスタイル。ボーダーがなく軽量な見た目です。

**使用場面:**
- モダンなUI
- ミニマルなデザイン
- モバイルアプリ

**特徴:**
- ボーダーなし
- ホバー時に背景色変化

### 3. Rounded (丸型)

完全な円形のページボタン。

**使用場面:**
- プレミアムなデザイン
- 視覚的に際立たせたい場合

**特徴:**
- border-radius: full (完全な円)
- モダンな外観

---

## サイズバリアント

### Small (小)

コンパクトなスペースに適したサイズ。

- サイズ: 32px × 32px
- フォントサイズ: 0.75rem (12px)
- アイコンサイズ: 0.75rem

### Default (デフォルト)

標準的なサイズ。

- サイズ: 40px × 40px
- フォントサイズ: 0.875rem (14px)
- アイコンサイズ: 1rem

### Large (大)

タッチデバイスに適した大きなサイズ。

- サイズ: 48px × 48px
- フォントサイズ: 1rem (16px)
- アイコンサイズ: 1.25rem

---

## トークン一覧

### コンテナ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.container.gap` | `{spacing.2}` | アイテム間の間隔 (0.5rem) |
| `component.pagination.container.justifyContent` | `center` | アイテムの配置 |

### ページアイテム

#### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.item.size.default` | `{spacing.10}` | デフォルトサイズ (2.5rem/40px) |
| `component.pagination.item.size.small` | `{spacing.8}` | 小サイズ (2rem/32px) |
| `component.pagination.item.size.large` | `{spacing.12}` | 大サイズ (3rem/48px) |

#### 角丸

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.item.borderRadius` | `{border.radius.md}` | アイテムの角丸 (0.375rem) |

#### タイポグラフィ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.item.fontSize.default` | `{font.size.sm}` | デフォルトのフォントサイズ |
| `component.pagination.item.fontSize.small` | `{font.size.xs}` | 小サイズのフォントサイズ |
| `component.pagination.item.fontSize.large` | `{font.size.base}` | 大サイズのフォントサイズ |
| `component.pagination.item.fontWeight.default` | `{font.weight.medium}` | デフォルトのフォントウェイト |
| `component.pagination.item.fontWeight.active` | `{font.weight.semibold}` | アクティブページのフォントウェイト |
| `component.pagination.item.lineHeight` | `{font.lineHeight.none}` | アイテムの行高 |

#### 背景色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.item.background.default` | `transparent` | デフォルトの背景色 |
| `component.pagination.item.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.pagination.item.background.active` | `{primary.default}` | アクティブページの背景色 |
| `component.pagination.item.background.disabled` | `transparent` | 無効状態の背景色 |

#### テキスト色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.item.text.default` | `{foreground.secondary}` | デフォルトのテキスト色 |
| `component.pagination.item.text.hover` | `{foreground.primary}` | ホバー時のテキスト色 |
| `component.pagination.item.text.active` | `{foreground.inverse}` | アクティブページのテキスト色 |
| `component.pagination.item.text.disabled` | `{foreground.tertiary}` | 無効状態のテキスト色 |

#### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.item.border.width` | `{border.width.1}` | ボーダーの幅 |
| `component.pagination.item.border.color.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.pagination.item.border.color.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.pagination.item.border.color.active` | `{primary.default}` | アクティブページのボーダー色 |

### ナビゲーションボタン（前へ/次へ）

#### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.nav.size.default` | `{spacing.10}` | デフォルトサイズ |
| `component.pagination.nav.size.small` | `{spacing.8}` | 小サイズ |
| `component.pagination.nav.size.large` | `{spacing.12}` | 大サイズ |

#### アイコン

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.nav.icon.size.default` | `{spacing.4}` | デフォルトのアイコンサイズ |
| `component.pagination.nav.icon.size.small` | `{spacing.3}` | 小サイズのアイコンサイズ |
| `component.pagination.nav.icon.size.large` | `{spacing.5}` | 大サイズのアイコンサイズ |
| `component.pagination.nav.icon.color.default` | `{foreground.secondary}` | デフォルトのアイコン色 |
| `component.pagination.nav.icon.color.hover` | `{foreground.primary}` | ホバー時のアイコン色 |
| `component.pagination.nav.icon.color.disabled` | `{foreground.tertiary}` | 無効状態のアイコン色 |

#### 背景・ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.nav.background.default` | `transparent` | デフォルトの背景色 |
| `component.pagination.nav.background.hover` | `{background.secondary}` | ホバー時の背景色 |
| `component.pagination.nav.background.disabled` | `transparent` | 無効状態の背景色 |
| `component.pagination.nav.border.color.default` | `{border.default}` | デフォルトのボーダー色 |
| `component.pagination.nav.border.color.hover` | `{border.strong}` | ホバー時のボーダー色 |
| `component.pagination.nav.borderRadius` | `{border.radius.md}` | 角丸 |

### 省略記号（...）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.ellipsis.color` | `{foreground.tertiary}` | 省略記号の色 |
| `component.pagination.ellipsis.fontSize.default` | `{font.size.sm}` | デフォルトのフォントサイズ |
| `component.pagination.ellipsis.fontSize.small` | `{font.size.xs}` | 小サイズのフォントサイズ |
| `component.pagination.ellipsis.fontSize.large` | `{font.size.base}` | 大サイズのフォントサイズ |
| `component.pagination.ellipsis.padding` | `{spacing.2}` | パディング |

### ジャンプ入力

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.jump.input.width` | `{spacing.16}` | 入力フィールドの幅 (4rem) |
| `component.pagination.jump.input.height.default` | `{spacing.10}` | デフォルトの高さ |
| `component.pagination.jump.input.height.small` | `{spacing.8}` | 小サイズの高さ |
| `component.pagination.jump.input.height.large` | `{spacing.12}` | 大サイズの高さ |
| `component.pagination.jump.input.fontSize.default` | `{font.size.sm}` | フォントサイズ |
| `component.pagination.jump.input.padding` | `{spacing.2}` | パディング |
| `component.pagination.jump.input.border` | `1px solid {border.default}` | ボーダー |
| `component.pagination.jump.input.borderRadius` | `{border.radius.md}` | 角丸 |

### ページサイズセレクター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.sizeSelector.gap` | `{spacing.2}` | セレクターとラベルの間隔 |
| `component.pagination.sizeSelector.fontSize` | `{font.size.sm}` | フォントサイズ |
| `component.pagination.sizeSelector.width` | `{spacing.20}` | セレクターの幅 (5rem) |

### 情報表示

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.info.fontSize.default` | `{font.size.sm}` | デフォルトのフォントサイズ |
| `component.pagination.info.fontSize.small` | `{font.size.xs}` | 小サイズのフォントサイズ |
| `component.pagination.info.color` | `{foreground.secondary}` | 情報テキストの色 |
| `component.pagination.info.marginLeft` | `{spacing.4}` | 左マージン (1rem) |

### トランジション

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.transition.duration` | `{animation.duration.fast}` | トランジションの持続時間 |
| `component.pagination.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.pagination.transition.properties` | `background-color, color, border-color` | トランジション対象 |

### コンパクトモード

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.pagination.compact.gap` | `{spacing.1}` | コンパクトモードのアイテム間隔 |
| `component.pagination.compact.maxVisiblePages` | `5` | 表示する最大ページ数 |

---

## 使用例

### HTML

```html
<!-- 基本的なページネーション -->
<nav class="pagination" aria-label="ページネーション">
  <button class="pagination-nav" aria-label="前のページ" disabled>
    <span>‹</span>
  </button>
  <button class="pagination-item pagination-item-active" aria-current="page">1</button>
  <button class="pagination-item">2</button>
  <button class="pagination-item">3</button>
  <button class="pagination-item">4</button>
  <button class="pagination-item">5</button>
  <button class="pagination-nav" aria-label="次のページ">
    <span>›</span>
  </button>
</nav>

<!-- 省略表示付き -->
<nav class="pagination">
  <button class="pagination-nav" aria-label="前のページ">‹</button>
  <button class="pagination-item">1</button>
  <button class="pagination-item pagination-item-active">2</button>
  <button class="pagination-item">3</button>
  <span class="pagination-ellipsis">...</span>
  <button class="pagination-item">10</button>
  <button class="pagination-nav" aria-label="次のページ">›</button>
</nav>

<!-- 情報表示付き -->
<div style="display: flex; align-items: center; gap: 1rem;">
  <nav class="pagination">
    <button class="pagination-nav">‹</button>
    <button class="pagination-item">1</button>
    <button class="pagination-item pagination-item-active">2</button>
    <button class="pagination-item">3</button>
    <button class="pagination-nav">›</button>
  </nav>
  <span class="pagination-info">全30件中 11-20件を表示</span>
</div>

<!-- ジャンプ入力付き -->
<div style="display: flex; align-items: center; gap: 1rem;">
  <nav class="pagination">...</nav>
  <span class="pagination-jump-label">ページへ移動:</span>
  <input type="number" class="pagination-jump-input" min="1" max="10" />
</div>
```

### CSS

```css
.pagination {
  display: flex;
  align-items: center;
  gap: var(--component-pagination-container-gap);
  justify-content: var(--component-pagination-container-justify-content);
}

.pagination-item,
.pagination-nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--component-pagination-item-size-default);
  height: var(--component-pagination-item-size-default);
  padding: 0;
  font-size: var(--component-pagination-item-font-size-default);
  font-weight: var(--component-pagination-item-font-weight-default);
  color: var(--component-pagination-item-text-default);
  background: var(--component-pagination-item-background-default);
  border: var(--component-pagination-item-border-width) solid;
  border-color: var(--component-pagination-item-border-color-default);
  border-radius: var(--component-pagination-item-border-radius);
  cursor: pointer;
  transition: var(--component-pagination-transition-properties)
              var(--component-pagination-transition-duration)
              var(--component-pagination-transition-timing);
}

.pagination-item-active {
  color: var(--component-pagination-item-text-active);
  background: var(--component-pagination-item-background-active);
  border-color: var(--component-pagination-item-border-color-active);
  font-weight: var(--component-pagination-item-font-weight-active);
}

.pagination-item:disabled,
.pagination-nav:disabled {
  color: var(--component-pagination-item-text-disabled);
  cursor: not-allowed;
  opacity: 0.5;
}
```

### React

```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}: PaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (currentPage <= halfVisible + 1) {
      // 先頭付近
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - halfVisible) {
      // 末尾付近
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 中間
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="pagination" aria-label="ページネーション">
      <button
        className="pagination-nav"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページ"
      >
        ‹
      </button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`pagination-item ${
              page === currentPage ? 'pagination-item-active' : ''
            }`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="pagination-ellipsis">
            {page}
          </span>
        )
      )}

      <button
        className="pagination-nav"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページ"
      >
        ›
      </button>
    </nav>
  );
}
```

---

## アクセシビリティ

### ARIA属性

- `aria-label="ページネーション"`: navタグに設定
- `aria-current="page"`: 現在のページボタンに設定
- `aria-label`: ナビゲーションボタンに説明を追加
- `disabled`: 無効なボタン（最初/最後のページ）

### キーボードナビゲーション

実装すべきキーボードショートカット：

- **Tab**: ボタン間を移動
- **Enter/Space**: ページを選択
- **Home**: 最初のページ（オプション）
- **End**: 最後のページ（オプション）

---

## ベストプラクティス

### ページ数の表示

1. **少ないページ数（1-7ページ）**
   - 全てのページを表示

2. **中程度のページ数（8-20ページ）**
   - 現在のページ前後 + 最初/最後
   - 省略記号で中間を表示

3. **多いページ数（20ページ以上）**
   - ジャンプ入力を追加
   - ページサイズセレクターを提供

### 情報表示

```javascript
function getPaginationInfo(currentPage, pageSize, totalItems) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return `全${totalItems}件中 ${start}-${end}件を表示`;
}
```

### URL同期

```javascript
// URLのクエリパラメータと同期
function updateURL(page) {
  const url = new URL(window.location);
  url.searchParams.set('page', page);
  window.history.pushState({}, '', url);
}

// ページ読み込み時に復元
const urlParams = new URLSearchParams(window.location.search);
const initialPage = parseInt(urlParams.get('page')) || 1;
```

### レスポンシブ対応

```css
/* モバイルではコンパクトに */
@media (max-width: 640px) {
  .pagination {
    gap: var(--component-pagination-compact-gap);
  }

  /* 最初/最後と現在のページ周辺のみ表示 */
  .pagination-item:not(:first-of-type):not(:last-of-type):not(.pagination-item-active):not(.pagination-item-active + *):not(* + .pagination-item-active) {
    display: none;
  }
}
```

---

## パフォーマンス最適化

### 仮想スクロール

大量のアイテム（10,000+）がある場合は、仮想スクロールを検討：

```javascript
// 無限スクロールと併用
function InfiniteScrollPagination() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    fetchData(page + 1).then(data => {
      setPage(page + 1);
      setHasMore(data.hasMore);
    });
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
    >
      {items.map(item => <Item key={item.id} {...item} />)}
    </InfiniteScroll>
  );
}
```

---

## 関連コンポーネント

- **Table**: テーブルコンポーネント
- **Breadcrumb**: パンくずリスト
- **Navigation**: ナビゲーションバー

---

**最終更新:** 2025-12-10
**Phase 4 Option C で実装**
