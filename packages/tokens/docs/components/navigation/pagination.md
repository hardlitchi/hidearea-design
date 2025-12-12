# Pagination (ページネーション) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/css/components/navigation/pagination.css`
**ステータス:** ✅ 実装済み

---

## 概要

ページネーションコンポーネントは、大量のコンテンツを複数のページに分割して表示するためのナビゲーション要素です。
3つのバリアント（full, simple, compact）と、3つのサイズ（sm, md, lg）をサポートしています。

### 用途

- テーブルのページ切り替え
- 検索結果の表示
- ブログ記事の一覧
- 商品カタログの閲覧

---

## バリアント

### 1. Full (フル)

全ページ番号、前後ボタン、最初/最後へのボタンを含む完全なページネーションです。

**使用場面:**
- デスクトップの広い画面
- 重要なデータテーブル
- ページ数が多いコンテンツ

### 2. Simple (シンプル)

前後ボタンと現在のページ情報のみを表示するシンプルなバリアントです。

**使用場面:**
- モバイル画面
- サイドバーやカード内
- スペースが限られた場所

### 3. Compact (コンパクト)

前後ボタンとページ番号のみを表示し、最初/最後へのボタンを省略したバリアントです。

**使用場面:**
- 中規模の画面
- ページ数が少ない場合
- バランスの取れた表示が必要な場合

---

## サイズ

### Small (sm)
- ボタンサイズ: `28px × 28px`
- フォントサイズ: `12px`
- パディング: `0 8px`

### Medium (md) - デフォルト
- ボタンサイズ: `36px × 36px`
- フォントサイズ: `14px`
- パディング: `0 12px`

### Large (lg)
- ボタンサイズ: `44px × 44px`
- フォントサイズ: `16px`
- パディング: `0 16px`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- フルページネーション -->
<ha-pagination
  current="1"
  total="10"
  variant="full"
  size="md"
>
</ha-pagination>

<!-- シンプルページネーション -->
<ha-pagination
  current="1"
  total="10"
  variant="simple"
>
</ha-pagination>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/navigation/pagination.css">
</head>
<body>
  <!-- フルページネーション -->
  <nav class="ha-pagination" aria-label="ページネーション" role="navigation">
    <div class="container">
      <button class="button first" aria-label="最初のページ" disabled>
        <svg>...</svg>
      </button>
      <button class="button prev" aria-label="前のページ" disabled>
        <svg>...</svg>
      </button>

      <button class="button page active" aria-label="ページ1" aria-current="page">1</button>
      <button class="button page" aria-label="ページ2へ">2</button>
      <button class="button page" aria-label="ページ3へ">3</button>
      <span class="ellipsis" aria-hidden="true">...</span>
      <button class="button page" aria-label="ページ10へ">10</button>

      <button class="button next" aria-label="次のページ">
        <svg>...</svg>
      </button>
      <button class="button last" aria-label="最後のページ">
        <svg>...</svg>
      </button>
    </div>
  </nav>

  <!-- シンプルページネーション -->
  <nav class="ha-pagination" variant="simple" aria-label="ページネーション">
    <div class="container">
      <button class="button prev" aria-label="前のページ" disabled>前へ</button>
      <span class="info" aria-live="polite">1 / 10 ページ</span>
      <button class="button next" aria-label="次のページ">次へ</button>
    </div>
  </nav>

  <!-- コンパクトページネーション -->
  <nav class="ha-pagination" variant="compact" size="sm">
    <div class="container">
      <button class="button prev" disabled>
        <svg>...</svg>
      </button>
      <button class="button page active" aria-current="page">1</button>
      <button class="button page">2</button>
      <button class="button page">3</button>
      <span class="ellipsis">...</span>
      <button class="button page">8</button>
      <button class="button next">
        <svg>...</svg>
      </button>
    </div>
  </nav>

  <!-- 小サイズページネーション -->
  <nav class="ha-pagination" size="sm">
    <div class="container">
      <button class="button page active">1</button>
      <button class="button page">2</button>
      <button class="button page">3</button>
    </div>
  </nav>

  <!-- 大サイズページネーション -->
  <nav class="ha-pagination" size="lg">
    <div class="container">
      <button class="button page active">1</button>
      <button class="button page">2</button>
      <button class="button page">3</button>
    </div>
  </nav>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/html/navigation/pagination.css';

// React例
function Pagination({ current, total, variant = 'full', size = 'md', onChange }) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // 最初のページ
    if (start > 1) {
      pages.push(
        <button
          key={1}
          className="button page"
          onClick={() => onChange(1)}
          aria-label={`ページ1へ`}
        >
          1
        </button>
      );
      if (start > 2) {
        pages.push(<span key="ellipsis1" className="ellipsis" aria-hidden="true">...</span>);
      }
    }

    // 中間のページ
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={`button page ${i === current ? 'active' : ''}`}
          onClick={() => onChange(i)}
          aria-label={i === current ? `ページ${i}` : `ページ${i}へ`}
          aria-current={i === current ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    // 最後のページ
    if (end < total) {
      if (end < total - 1) {
        pages.push(<span key="ellipsis2" className="ellipsis" aria-hidden="true">...</span>);
      }
      pages.push(
        <button
          key={total}
          className="button page"
          onClick={() => onChange(total)}
          aria-label={`ページ${total}へ`}
        >
          {total}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav
      className="ha-pagination"
      data-variant={variant}
      data-size={size}
      aria-label="ページネーション"
      role="navigation"
    >
      <div className="container">
        {variant === 'full' && (
          <button
            className="button first"
            onClick={() => onChange(1)}
            disabled={current === 1}
            aria-label="最初のページ"
          >
            <FirstPageIcon />
          </button>
        )}

        <button
          className="button prev"
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          aria-label="前のページ"
        >
          {variant === 'simple' ? '前へ' : <PrevIcon />}
        </button>

        {variant === 'simple' ? (
          <span className="info" aria-live="polite">
            {current} / {total} ページ
          </span>
        ) : (
          renderPageNumbers()
        )}

        <button
          className="button next"
          onClick={() => onChange(current + 1)}
          disabled={current === total}
          aria-label="次のページ"
        >
          {variant === 'simple' ? '次へ' : <NextIcon />}
        </button>

        {variant === 'full' && (
          <button
            className="button last"
            onClick={() => onChange(total)}
            disabled={current === total}
            aria-label="最後のページ"
          >
            <LastPageIcon />
          </button>
        )}
      </div>
    </nav>
  );
}

// 使用例
<Pagination
  current={1}
  total={10}
  variant="full"
  size="md"
  onChange={(page) => console.log('ページ変更:', page)}
/>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `full` \| `simple` \| `compact` | `full` | ページネーションのスタイルバリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | ページネーションのサイズ |
| `current` | `number` | `1` | 現在のページ番号 |
| `total` | `number` | - | 総ページ数 |

---

## CSS変数

ページネーションコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### ボタン関連
- `--pagination-button-size` - 36px（デフォルトボタンサイズ）
- `--pagination-button-bg` - transparent（背景色）
- `--pagination-button-border` - var(--color-gray-300)（ボーダー色）
- `--pagination-button-color` - var(--color-gray-700)（テキスト色）
- `--pagination-button-radius` - var(--radius-base, 4px)（角丸）

### ホバー状態
- `--pagination-button-hover-bg` - var(--color-gray-50)
- `--pagination-button-hover-border` - var(--color-primary-500)
- `--pagination-button-hover-color` - var(--color-primary-500)

### アクティブ状態
- `--pagination-active-bg` - var(--color-primary-500)
- `--pagination-active-border` - var(--color-primary-500)
- `--pagination-active-color` - var(--color-white)

### レイアウト
- `--pagination-gap` - 8px（ボタン間のギャップ）
- `--pagination-font-size` - 14px

### アニメーション
- `--duration-fast` - 150ms
- `--ease` - イージング関数

---

## アクセシビリティ

- `role="navigation"`でナビゲーション要素として識別
- `aria-label="ページネーション"`で目的を明示
- `aria-current="page"`で現在のページを示す
- `aria-label`で各ボタンの目的を説明
- `disabled`属性で無効なボタンを示す
- `aria-live="polite"`でページ情報の変更を通知

```html
<!-- アクセシビリティの良い例 -->
<nav class="ha-pagination" aria-label="検索結果のページネーション" role="navigation">
  <div class="container">
    <button
      class="button first"
      aria-label="最初のページへ移動"
      disabled
    >
      最初
    </button>

    <button
      class="button prev"
      aria-label="前のページへ移動"
      disabled
    >
      前へ
    </button>

    <button
      class="button page active"
      aria-label="現在のページ、ページ1"
      aria-current="page"
    >
      1
    </button>

    <button
      class="button page"
      aria-label="ページ2へ移動"
    >
      2
    </button>

    <button
      class="button next"
      aria-label="次のページへ移動"
    >
      次へ
    </button>

    <button
      class="button last"
      aria-label="最後のページへ移動"
    >
      最後
    </button>
  </div>
</nav>

<!-- スクリーンリーダー用の追加情報 -->
<nav class="ha-pagination" aria-label="ページネーション">
  <div class="container">
    <span class="sr-only" aria-live="polite">
      全10ページ中、現在1ページ目を表示しています
    </span>
    <!-- ページネーションボタン -->
  </div>
</nav>
```

### キーボード操作

- **Tab**: 次のボタンにフォーカス
- **Shift + Tab**: 前のボタンにフォーカス
- **Enter/Space**: ボタンを実行してページ移動
- **Home**: 最初のページへ移動（カスタム実装）
- **End**: 最後のページへ移動（カスタム実装）

---

## ベストプラクティス

### ✅ 推奨

1. **適切なバリアントの選択**
   - デスクトップ: Full
   - タブレット: Compact
   - モバイル: Simple

2. **現在位置の明示**
   - アクティブページを明確に表示
   - `aria-current="page"`を使用

3. **無効状態の適切な表示**
   - 最初のページでは前へボタンを無効化
   - 最後のページでは次へボタンを無効化

4. **ページ情報の提供**
   - 総ページ数と現在のページを表示
   - スクリーンリーダー向けの情報も提供

```html
<!-- 適切な実装例 -->
<nav class="ha-pagination" aria-label="ページネーション">
  <div class="container">
    <button class="button prev" disabled aria-label="前のページ">前へ</button>
    <span class="info" aria-live="polite">1 / 10 ページ</span>
    <button class="button next" aria-label="次のページへ">次へ</button>
  </div>
</nav>

<!-- ページ番号付き -->
<nav class="ha-pagination" aria-label="ページネーション">
  <div class="container">
    <button class="button page active" aria-current="page">1</button>
    <button class="button page">2</button>
    <button class="button page">3</button>
  </div>
</nav>
```

### ❌ 非推奨

1. **小さすぎるタッチターゲット**
   - 最小44px×44pxを確保（モバイル）

2. **不明確な現在位置**
   - アクティブページが分かりにくい

3. **無効ボタンの非表示**
   - 無効化して表示を保つ（レイアウトの安定性）

```html
<!-- タッチターゲットが小さすぎる（非推奨） -->
<nav class="ha-pagination" size="sm">
  <button class="button" style="width: 20px; height: 20px;">1</button>
</nav>

<!-- アクティブページが不明確（非推奨） -->
<div class="container">
  <button class="button page">1</button>
  <button class="button page">2</button>
  <button class="button page">3</button>
</div>

<!-- 無効ボタンを非表示（非推奨） -->
<!-- 前へボタンが存在しない -->
<div class="container">
  <button class="button page active">1</button>
  <button class="button next">次へ</button>
</div>
```

---

## バリエーション

### ページジャンプ機能付き

```html
<nav class="ha-pagination">
  <div class="container">
    <button class="button prev">前へ</button>

    <label for="page-input" class="sr-only">ページ番号</label>
    <input
      id="page-input"
      type="number"
      min="1"
      max="10"
      value="1"
      style="width: 60px; text-align: center;"
      aria-label="ページ番号を入力"
    >
    <span>/ 10</span>

    <button class="button next">次へ</button>
  </div>
</nav>
```

### ページサイズ変更機能付き

```html
<nav class="ha-pagination">
  <div class="container">
    <label for="page-size">表示件数:</label>
    <select id="page-size" aria-label="1ページあたりの表示件数">
      <option value="10">10件</option>
      <option value="20">20件</option>
      <option value="50">50件</option>
      <option value="100">100件</option>
    </select>

    <button class="button prev">前へ</button>
    <span class="info">1 / 10 ページ</span>
    <button class="button next">次へ</button>
  </div>
</nav>
```

---

## テーマ対応

全てのページネーショントークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <nav class="ha-pagination">
    <div class="container">
      <button class="button page active">1</button>
    </div>
  </nav>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <nav class="ha-pagination">
    <div class="container">
      <button class="button page active">1</button>
    </div>
  </nav>
</html>
```

---

## 関連コンポーネント

- [Button](../layout/button.md) - ページネーションボタンのベース
- [Table](../data-display/table.md) - テーブルと組み合わせて使用
- [Select](../forms/select.md) - ページサイズ選択

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
