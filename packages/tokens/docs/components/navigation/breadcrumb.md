# Breadcrumb (パンくずリスト) コンポーネント

**カテゴリ:** Navigation
**ファイル:** `src/css/components/navigation/breadcrumb.css`
**ステータス:** ✅ 実装済み

---

## 概要

パンくずリストコンポーネントは、ユーザーの現在位置を階層的に表示するナビゲーション要素です。
4つのセパレータースタイル（slash, chevron, dot, arrow）と、3つのサイズ（sm, md, lg）をサポートしています。

### 用途

- サイトの階層構造の表示
- ユーザーの現在位置の明示
- 上位階層への簡単なナビゲーション
- SEO向上のための構造化データ

---

## セパレータータイプ

### 1. Slash (スラッシュ) - デフォルト

スラッシュ（/）で項目を区切るスタイルです。最も一般的なパンくずリストの表示方法です。

**使用場面:**
- 標準的なWebサイト
- ファイルシステム風のナビゲーション
- シンプルなデザイン

### 2. Chevron (シェブロン)

右向き矢印（›）で項目を区切るスタイルです。視覚的な流れを強調します。

**使用場面:**
- モダンなUIデザイン
- 明確な方向性が必要な場合
- eコマースサイト

### 3. Dot (ドット)

ドット（•）で項目を区切るスタイルです。控えめで洗練された印象を与えます。

**使用場面:**
- ミニマルなデザイン
- 視覚的な区切りを抑えたい場合
- ブログや記事サイト

### 4. Arrow (矢印)

矢印（→）で項目を区切るスタイルです。明確な進行方向を示します。

**使用場面:**
- フロー型のナビゲーション
- プロセスの表示
- チュートリアルやウィザード

---

## サイズ

### Small (sm)
- フォントサイズ: `0.875rem`
- ギャップ: `0.25rem`

### Medium (md) - デフォルト
- フォントサイズ: `1rem`
- ギャップ: `0.5rem`

### Large (lg)
- フォントサイズ: `1.125rem`
- ギャップ: `0.75rem`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- スラッシュセパレーター -->
<ha-breadcrumb separator="slash" size="md">
  <ha-breadcrumb-item>
    <a href="/">ホーム</a>
  </ha-breadcrumb-item>
  <ha-breadcrumb-item>
    <a href="/products">商品</a>
  </ha-breadcrumb-item>
  <ha-breadcrumb-item current>
    <span>カテゴリ</span>
  </ha-breadcrumb-item>
</ha-breadcrumb>

<!-- シェブロンセパレーター -->
<ha-breadcrumb separator="chevron">
  <ha-breadcrumb-item>
    <a href="/">ホーム</a>
  </ha-breadcrumb-item>
  <ha-breadcrumb-item current>
    <span>現在のページ</span>
  </ha-breadcrumb-item>
</ha-breadcrumb>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/navigation/breadcrumb.css">
</head>
<body>
  <!-- 基本的なパンくずリスト（スラッシュ） -->
  <nav class="ha-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb size-md">
      <li class="ha-breadcrumb-item">
        <a href="/" class="breadcrumb-item">ホーム</a>
        <span class="separator separator-slash"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <a href="/products" class="breadcrumb-item">商品</a>
        <span class="separator separator-slash"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <span class="breadcrumb-item current" aria-current="page">電化製品</span>
      </li>
    </ol>
  </nav>

  <!-- シェブロンセパレーター -->
  <nav class="ha-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb size-md">
      <li class="ha-breadcrumb-item">
        <a href="/" class="breadcrumb-item">ホーム</a>
        <span class="separator separator-chevron"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <a href="/docs" class="breadcrumb-item">ドキュメント</a>
        <span class="separator separator-chevron"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <a href="/docs/components" class="breadcrumb-item">コンポーネント</a>
        <span class="separator separator-chevron"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <span class="breadcrumb-item current" aria-current="page">ボタン</span>
      </li>
    </ol>
  </nav>

  <!-- ドットセパレーター -->
  <nav class="ha-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb size-sm">
      <li class="ha-breadcrumb-item">
        <a href="/" class="breadcrumb-item">ホーム</a>
        <span class="separator separator-dot"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <a href="/blog" class="breadcrumb-item">ブログ</a>
        <span class="separator separator-dot"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <span class="breadcrumb-item current" aria-current="page">記事タイトル</span>
      </li>
    </ol>
  </nav>

  <!-- 矢印セパレーター -->
  <nav class="ha-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb size-lg">
      <li class="ha-breadcrumb-item">
        <a href="/" class="breadcrumb-item">ステップ1</a>
        <span class="separator separator-arrow"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <a href="/step2" class="breadcrumb-item">ステップ2</a>
        <span class="separator separator-arrow"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <span class="breadcrumb-item current" aria-current="page">ステップ3</span>
      </li>
    </ol>
  </nav>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/html/navigation/breadcrumb.css';

// React例
function Breadcrumb({ items, separator = 'slash', size = 'md' }) {
  const separatorClass = `separator-${separator}`;

  return (
    <nav className="ha-breadcrumb" aria-label="breadcrumb">
      <ol className={`breadcrumb size-${size}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="ha-breadcrumb-item">
              {item.href && !isLast ? (
                <a href={item.href} className="breadcrumb-item">
                  {item.label}
                </a>
              ) : (
                <span
                  className={`breadcrumb-item ${isLast ? 'current' : ''}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={`separator ${separatorClass}`}></span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// 使用例
<Breadcrumb
  separator="chevron"
  size="md"
  items={[
    { label: 'ホーム', href: '/' },
    { label: '商品', href: '/products' },
    { label: '電化製品', href: '/products/electronics' },
    { label: 'ノートパソコン' }, // 現在のページ（hrefなし）
  ]}
/>
```

### Pattern 4: 構造化データ付き（SEO最適化）

```html
<nav class="ha-breadcrumb" aria-label="breadcrumb">
  <ol class="breadcrumb size-md" itemscope itemtype="https://schema.org/BreadcrumbList">
    <li class="ha-breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" class="breadcrumb-item" itemprop="item">
        <span itemprop="name">ホーム</span>
      </a>
      <meta itemprop="position" content="1" />
      <span class="separator separator-slash"></span>
    </li>
    <li class="ha-breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/products" class="breadcrumb-item" itemprop="item">
        <span itemprop="name">商品</span>
      </a>
      <meta itemprop="position" content="2" />
      <span class="separator separator-slash"></span>
    </li>
    <li class="ha-breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <span class="breadcrumb-item current" aria-current="page" itemprop="item">
        <span itemprop="name">電化製品</span>
      </span>
      <meta itemprop="position" content="3" />
    </li>
  </ol>
</nav>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `separator` | `slash` \| `chevron` \| `dot` \| `arrow` | `slash` | セパレーターのスタイル |
| `size` | `sm` \| `md` \| `lg` | `md` | パンくずリストのサイズ |
| `current` | `boolean` | `false` | 現在のページを示す（breadcrumb-item） |

---

## CSS変数

パンくずリストコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--primary-default` - ホバー時のリンク色
- `--foreground-primary` - 現在のページのテキスト色
- `--color-neutral-400` - セパレーターの色
- `--color-neutral-600` - リンクのデフォルト色

### スペーシング
- `--spacing-1` - 0.25rem (小ギャップ)
- `--spacing-2` - 0.5rem (中ギャップ)
- `--spacing-3` - 0.75rem (大ギャップ)

### フォント
- `--font-size-sm` - 0.875rem
- `--font-size-base` - 1rem
- `--font-size-lg` - 1.125rem
- `--font-weight-medium` - 500

### ボーダー
- `--border-radius-sm` - 小角丸（フォーカス時）

### アニメーション
- `--animation-duration-base` - 200ms
- `--animation-easing-ease` - ease

---

## アクセシビリティ

- `<nav>`要素で囲み、`aria-label="breadcrumb"`を指定
- `<ol>`リストで階層構造を表現
- `aria-current="page"`で現在のページを示す
- リンクには明確なテキストを使用
- 構造化データ（Schema.org）でSEOを向上

```html
<!-- アクセシビリティの良い例 -->
<nav class="ha-breadcrumb" aria-label="パンくずリスト" role="navigation">
  <ol class="breadcrumb">
    <li class="ha-breadcrumb-item">
      <a href="/" class="breadcrumb-item" aria-label="ホームページへ移動">
        ホーム
      </a>
      <span class="separator separator-slash" aria-hidden="true"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <a href="/products" class="breadcrumb-item" aria-label="商品一覧へ移動">
        商品
      </a>
      <span class="separator separator-slash" aria-hidden="true"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <span
        class="breadcrumb-item current"
        aria-current="page"
        aria-label="現在のページ: 電化製品"
      >
        電化製品
      </span>
    </li>
  </ol>
</nav>
```

### キーボード操作

- **Tab**: 次のリンクにフォーカス
- **Shift + Tab**: 前のリンクにフォーカス
- **Enter**: リンクを開く

### スクリーンリーダー対応

```html
<!-- セパレーターを非表示 -->
<span class="separator separator-slash" aria-hidden="true"></span>

<!-- 視覚的には省略されたパスも提供 -->
<nav class="ha-breadcrumb" aria-label="breadcrumb">
  <span class="sr-only">現在の場所: </span>
  <ol class="breadcrumb">
    <!-- パンくずアイテム -->
  </ol>
</nav>
```

---

## ベストプラクティス

### ✅ 推奨

1. **階層の明確化**
   - サイトの階層構造を正確に反映
   - 論理的な順序でリンクを配置

2. **現在のページを明示**
   - 最後の項目は非リンク
   - `aria-current="page"`を使用

3. **適切な省略**
   - 深い階層では中間を省略可能
   - ただし重要な階層は残す

4. **SEO最適化**
   - 構造化データを追加
   - 意味のあるテキストを使用

```html
<!-- 適切なパンくずリスト -->
<nav class="ha-breadcrumb" aria-label="breadcrumb">
  <ol class="breadcrumb size-md">
    <li class="ha-breadcrumb-item">
      <a href="/" class="breadcrumb-item">ホーム</a>
      <span class="separator separator-chevron"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <a href="/electronics" class="breadcrumb-item">電化製品</a>
      <span class="separator separator-chevron"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <a href="/electronics/computers" class="breadcrumb-item">コンピューター</a>
      <span class="separator separator-chevron"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <span class="breadcrumb-item current" aria-current="page">
        ノートパソコン
      </span>
    </li>
  </ol>
</nav>
```

### ❌ 非推奨

1. **現在のページをリンクにする**
   - 混乱を招く
   - アクセシビリティの問題

2. **階層が深すぎる**
   - 5-7レベル以内に抑える
   - 必要に応じて省略

3. **不明確なラベル**
   - 「ページ1」「カテゴリ」などは避ける
   - 具体的な名称を使用

```html
<!-- 現在のページがリンク（非推奨） -->
<li class="ha-breadcrumb-item">
  <a href="/current" class="breadcrumb-item current">現在のページ</a>
</li>

<!-- 階層が深すぎる（非推奨） -->
<nav class="ha-breadcrumb" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li>ホーム</li>
    <li>レベル1</li>
    <li>レベル2</li>
    <li>レベル3</li>
    <li>レベル4</li>
    <li>レベル5</li>
    <li>レベル6</li>
    <li>レベル7</li>
    <li>レベル8</li>
  </ol>
</nav>

<!-- 不明確なラベル（非推奨） -->
<li class="ha-breadcrumb-item">
  <a href="/cat1" class="breadcrumb-item">カテゴリ1</a>
</li>
```

---

## バリエーション

### アイコン付きホーム

```html
<li class="ha-breadcrumb-item">
  <a href="/" class="breadcrumb-item">
    <svg width="16" height="16"><!-- ホームアイコン --></svg>
    <span>ホーム</span>
  </a>
  <span class="separator separator-chevron"></span>
</li>
```

### 省略パンくずリスト

```html
<nav class="ha-breadcrumb" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="ha-breadcrumb-item">
      <a href="/" class="breadcrumb-item">ホーム</a>
      <span class="separator separator-slash"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <button class="breadcrumb-item" aria-label="省略された階層を表示">
        ...
      </button>
      <span class="separator separator-slash"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <a href="/products/electronics/computers" class="breadcrumb-item">
        コンピューター
      </a>
      <span class="separator separator-slash"></span>
    </li>
    <li class="ha-breadcrumb-item">
      <span class="breadcrumb-item current" aria-current="page">
        ノートパソコン
      </span>
    </li>
  </ol>
</nav>
```

---

## テーマ対応

全てのパンくずリストトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <nav class="ha-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="ha-breadcrumb-item">
        <a href="/" class="breadcrumb-item">ホーム</a>
        <span class="separator separator-slash"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <span class="breadcrumb-item current" aria-current="page">
          現在のページ
        </span>
      </li>
    </ol>
  </nav>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <nav class="ha-breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="ha-breadcrumb-item">
        <a href="/" class="breadcrumb-item">ホーム</a>
        <span class="separator separator-slash"></span>
      </li>
      <li class="ha-breadcrumb-item">
        <span class="breadcrumb-item current" aria-current="page">
          現在のページ
        </span>
      </li>
    </ol>
  </nav>
</html>
```

---

## 関連コンポーネント

- [Tabs](./tabs.md) - タブナビゲーション
- [Menu](./menu.md) - ドロップダウンメニュー
- [Pagination](./pagination.md) - ページネーション

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
