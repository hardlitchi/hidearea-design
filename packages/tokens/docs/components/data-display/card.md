# Card (カード) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/card.css`
**ステータス:** ✅ 実装済み

---

## 概要

Cardコンポーネントは、関連するコンテンツをグループ化して表示する汎用的なコンテナです。
複数のバリアント（default, outlined, elevated）と、インタラクティブな動作（hoverable, clickable）をサポートしています。

### 用途

- コンテンツのグループ化と視覚的な分離
- 商品カードやユーザープロフィール表示
- ダッシュボードウィジェット
- 記事プレビュー
- 選択可能なオプション表示
- 情報の階層的な整理

---

## バリアント

### 1. Default (デフォルト)

通常の表示状態です。控えめなボーダーで区切られたシンプルなカードです。

**使用場面:**
- 静的なコンテンツ表示
- 情報の整理
- デフォルトの表示状態

**スタイル:**
- ボーダー: 1px solid `--border-subtle`
- 背景: `--background-primary`
- シャドウ: なし

### 2. Outlined (アウトライン)

太めのボーダーで強調されたカードです。境界線がより明確です。

**使用場面:**
- 重要な情報の強調
- グループ化されたカードセット
- 視覚的な分離が必要な場合

**スタイル:**
- ボーダー: 2px solid `--border-default`
- 背景: `--background-primary`
- シャドウ: なし

### 3. Elevated (高さ付き)

シャドウで浮いた印象を与えるカードです。最も目立つバリアントです。

**使用場面:**
- 重要なコンテンツの強調
- モーダル風の表示
- カードを背景から浮かせたい場合

**スタイル:**
- ボーダー: 1px solid `--border-subtle`
- 背景: `--background-primary`
- シャドウ: `--shadow-md`

---

## モディファイア

### Hoverable (ホバー可能)

マウスホバー時に視覚的なフィードバックを提供します。

**効果:**
- ホバー時に上に移動（translateY: -2px）
- ボーダー色の変化
- シャドウの追加または強化

**バリアント別の挙動:**
- Default: ボーダーが `--border-default` に変化、`--shadow-sm` を追加
- Outlined: ボーダーが `--border-strong` に変化、`--shadow-sm` を追加
- Elevated: シャドウが `--shadow-lg` に強化

### Clickable (クリック可能)

カード全体がクリック可能であることを示します。

**効果:**
- カーソルがポインターに変化
- クリック時に移動が元に戻る（translateY: 0）

---

## パディングバリアント

カードの内部スペーシングを制御します。

### None (なし)
- パディング: `0`
- 用途: 画像やフルブリードコンテンツ

### Small (sm)
- パディング: `var(--spacing-3)` (0.75rem)
- 用途: コンパクトなカード

### Medium (md) - 推奨
- パディング: `var(--spacing-4)` (1rem)
- 用途: 標準的なカード

### Large (lg)
- パディング: `var(--spacing-6)` (1.5rem)
- 用途: ゆったりとしたカード

---

## カード構造

### Media (メディア)
画像や動画を表示するセクションです。

**特徴:**
- 幅100%
- パディングなし
- 空の場合は非表示

### Header (ヘッダー)
カードのタイトルやアクションボタンを配置します。

**特徴:**
- フレックスレイアウト（横並び、space-between）
- gap: `var(--spacing-3)`
- 空の場合は非表示

### Body (本体)
メインコンテンツを表示します。

**特徴:**
- flex: 1（残りのスペースを占有）
- 空の場合は非表示

### Footer (フッター)
アクションボタンや補足情報を配置します。

**特徴:**
- フレックスレイアウト（横並び）
- gap: `var(--spacing-3)`
- 空の場合は非表示

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-card variant="default" padding="md">
  <div slot="media">
    <img src="image.jpg" alt="カード画像">
  </div>
  <div slot="header">
    <h3>カードタイトル</h3>
  </div>
  <div slot="body">
    <p>カードの本文がここに入ります。</p>
  </div>
  <div slot="footer">
    <button>キャンセル</button>
    <button>保存</button>
  </div>
</ha-card>

<ha-card variant="elevated" hoverable clickable>
  <div slot="body">
    <h3>クリック可能なカード</h3>
    <p>ホバーとクリックに反応します。</p>
  </div>
</ha-card>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/card.css">
</head>
<body>
  <!-- デフォルトカード -->
  <div class="ha-card">
    <div class="card card--default card--padding-md">
      <div class="card__body">
        <h3>シンプルなカード</h3>
        <p>これは基本的なカードです。</p>
      </div>
    </div>
  </div>

  <!-- アウトラインカード -->
  <div class="ha-card">
    <div class="card card--outlined card--padding-md">
      <div class="card__header">
        <h3>カードタイトル</h3>
        <button>...</button>
      </div>
      <div class="card__body">
        <p>アウトラインで強調されたカードです。</p>
      </div>
    </div>
  </div>

  <!-- 高さ付きカード -->
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">
      <div class="card__body">
        <h3>浮いたカード</h3>
        <p>シャドウで浮き上がって見えます。</p>
      </div>
    </div>
  </div>

  <!-- ホバー可能なカード -->
  <div class="ha-card">
    <div class="card card--default card--hoverable card--padding-md">
      <div class="card__body">
        <h3>ホバー可能</h3>
        <p>マウスを乗せると反応します。</p>
      </div>
    </div>
  </div>

  <!-- クリック可能なカード -->
  <div class="ha-card" tabindex="0">
    <div class="card card--elevated card--hoverable card--clickable card--padding-md">
      <div class="card__body">
        <h3>クリック可能</h3>
        <p>カード全体がクリックできます。</p>
      </div>
    </div>
  </div>

  <!-- 画像付きカード -->
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">
      <div class="card__media">
        <img src="image.jpg" alt="カード画像">
      </div>
      <div class="card__header">
        <h3>商品名</h3>
      </div>
      <div class="card__body">
        <p>商品の説明文がここに入ります。</p>
      </div>
      <div class="card__footer">
        <button>カートに追加</button>
      </div>
    </div>
  </div>

  <!-- フル構成のカード -->
  <div class="ha-card">
    <div class="card card--outlined card--padding-md">
      <div class="card__media">
        <img src="hero.jpg" alt="ヒーロー画像">
      </div>
      <div class="card__header">
        <h3>記事タイトル</h3>
        <span>2025-12-12</span>
      </div>
      <div class="card__body">
        <p>記事の内容がここに表示されます。簡潔で読みやすい説明文。</p>
      </div>
      <div class="card__footer">
        <button>共有</button>
        <button>保存</button>
      </div>
    </div>
  </div>

  <!-- パディングなしカード（画像フルブリード） -->
  <div class="ha-card">
    <div class="card card--default card--padding-none">
      <div class="card__media">
        <img src="fullwidth.jpg" alt="フル幅画像">
      </div>
    </div>
  </div>

  <!-- 小さなパディング -->
  <div class="ha-card">
    <div class="card card--default card--padding-sm">
      <div class="card__body">
        <p>コンパクトなカード</p>
      </div>
    </div>
  </div>

  <!-- 大きなパディング -->
  <div class="ha-card">
    <div class="card card--elevated card--padding-lg">
      <div class="card__body">
        <h2>ゆったりとしたカード</h2>
        <p>大きなパディングで余白が多めです。</p>
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { cardStyles } from '@hidearea-design/tokens/styles/card';

// React例
function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  media,
  header,
  children,
  footer,
  onClick,
  ...props
}) {
  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hoverable && 'card--hoverable',
    clickable && 'card--clickable'
  ].filter(Boolean).join(' ');

  return (
    <div className="ha-card" tabIndex={clickable ? 0 : undefined} {...props}>
      <div className={classes} onClick={onClick}>
        {media && <div className="card__media">{media}</div>}
        {header && <div className="card__header">{header}</div>}
        <div className="card__body">{children}</div>
        {footer && <div className="card__footer">{footer}</div>}
      </div>
    </div>
  );
}

// 使用例
<Card variant="elevated" padding="md" hoverable clickable>
  <h3>商品カード</h3>
  <p>商品の説明文</p>
</Card>

<Card
  variant="outlined"
  padding="md"
  media={<img src="product.jpg" alt="商品" />}
  header={<h3>商品名</h3>}
  footer={
    <>
      <button>詳細</button>
      <button>購入</button>
    </>
  }
>
  <p>商品の詳細情報</p>
</Card>
```

### Pattern 4: 統合CSS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/all.css">
</head>
<body>
  <!-- 全コンポーネントが利用可能 -->
  <div class="ha-card">
    <div class="card card--elevated card--hoverable card--clickable card--padding-md">
      <div class="card__body">
        <h3>カードタイトル</h3>
        <p>カードの内容</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `default` \| `outlined` \| `elevated` | `default` | カードのスタイルバリアント |
| `padding` | `none` \| `sm` \| `md` \| `lg` | `md` | カード内部のパディング |
| `hoverable` | boolean | `false` | ホバー時の視覚効果を有効化 |
| `clickable` | boolean | `false` | クリック可能なスタイルを適用 |

---

## CSS変数

Cardコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--background-primary` - カードの背景色
- `--border-subtle` - 控えめなボーダーカラー
- `--border-default` - デフォルトボーダーカラー
- `--border-strong` - 強調ボーダーカラー
- `--primary-default` - フォーカス時のアウトライン色

### スペーシング
- `--spacing-3` - 0.75rem (小パディング、gap)
- `--spacing-4` - 1rem (中パディング)
- `--spacing-5` - 1.25rem (タッチデバイス用中パディング)
- `--spacing-6` - 1.5rem (大パディング)
- `--spacing-8` - 2rem (タッチデバイス用大パディング)
- `--spacing-responsive-sm` - clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)
- `--spacing-responsive-md` - clamp(1rem, 0.8rem + 1vw, 1.5rem)

### ボーダー
- `--border-radius-lg` - カードの角丸

### シャドウ
- `--shadow-sm` - 小シャドウ（ホバー時）
- `--shadow-md` - 中シャドウ（elevated）
- `--shadow-lg` - 大シャドウ（elevated + hover）

### アニメーション
- `--animation-duration-base` - 200ms（トランジション時間）

### タッチターゲット
- `--touch-target-minimum` - 44px（クリック可能カードの最小高さ）

---

## アクセシビリティ

### セマンティックHTML

カードの用途に応じて適切なHTML要素を使用します。

```html
<!-- 記事カード -->
<article class="ha-card">
  <div class="card card--default card--padding-md">
    <div class="card__header">
      <h3>記事タイトル</h3>
      <time datetime="2025-12-12">2025年12月12日</time>
    </div>
    <div class="card__body">
      <p>記事の要約がここに入ります。</p>
    </div>
  </div>
</article>

<!-- クリック可能なカード（リンク） -->
<a href="/details" class="ha-card" style="text-decoration: none; color: inherit;">
  <div class="card card--elevated card--hoverable card--clickable card--padding-md">
    <div class="card__body">
      <h3>詳細ページへ</h3>
      <p>クリックして詳細を表示</p>
    </div>
  </div>
</a>

<!-- 選択可能なカード -->
<div class="ha-card" role="option" aria-selected="false" tabindex="0">
  <div class="card card--outlined card--hoverable card--clickable card--padding-md">
    <div class="card__body">
      <h3>オプション 1</h3>
      <p>このオプションを選択できます</p>
    </div>
  </div>
</div>
```

### キーボード操作

- **Tab**: カードにフォーカス（tabindex="0" の場合）
- **Enter/Space**: カードを実行（クリック可能な場合）
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- 選択可能なカードグループ -->
<div role="listbox" aria-label="オプションを選択">
  <div class="ha-card" role="option" aria-selected="true" tabindex="0">
    <div class="card card--outlined card--padding-md">
      <div class="card__body">選択済みオプション</div>
    </div>
  </div>
  <div class="ha-card" role="option" aria-selected="false" tabindex="0">
    <div class="card card--outlined card--padding-md">
      <div class="card__body">未選択オプション</div>
    </div>
  </div>
</div>

<!-- 読み込み中のカード -->
<div class="ha-card" aria-busy="true" aria-live="polite">
  <div class="card card--default card--padding-md">
    <div class="card__body">読み込み中...</div>
  </div>
</div>

<!-- 拡張可能なカード -->
<div class="ha-card" role="button" aria-expanded="false" tabindex="0">
  <div class="card card--outlined card--clickable card--padding-md">
    <div class="card__header">
      <h3>詳細を表示</h3>
      <span>▼</span>
    </div>
  </div>
</div>
```

### フォーカススタイル

```css
.ha-card:focus-visible .card {
  outline: 2px solid var(--primary-default);
  outline-offset: 2px;
}
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なバリアントの選択**
   - 重要度に応じてバリアントを使い分ける
   - Elevatedは特に重要なカードのみに使用

2. **一貫したパディング**
   - 同じコンテキストでは同じパディングを使用
   - レスポンシブ対応を考慮

3. **明確な構造**
   - Header、Body、Footerを適切に使い分ける
   - セマンティックなHTML要素を使用

4. **適切なインタラクション**
   - クリック可能なカードにはhoverableとclickableを併用
   - フォーカス可能な要素にはtabindexを設定

```html
<!-- 適切なバリアント選択 -->
<div class="ha-card">
  <div class="card card--default card--padding-md">
    <div class="card__body">通常の情報</div>
  </div>
</div>

<div class="ha-card">
  <div class="card card--elevated card--padding-md">
    <div class="card__body">重要な情報</div>
  </div>
</div>

<!-- 構造化されたカード -->
<article class="ha-card">
  <div class="card card--outlined card--padding-md">
    <div class="card__header">
      <h3>記事タイトル</h3>
    </div>
    <div class="card__body">
      <p>記事の内容</p>
    </div>
    <div class="card__footer">
      <a href="/read-more">続きを読む</a>
    </div>
  </div>
</article>

<!-- インタラクティブなカード -->
<a href="/product/1" class="ha-card">
  <div class="card card--elevated card--hoverable card--clickable card--padding-md">
    <div class="card__media">
      <img src="product.jpg" alt="商品">
    </div>
    <div class="card__body">
      <h3>商品名</h3>
      <p>¥1,000</p>
    </div>
  </div>
</a>
```

### ❌ 非推奨

1. **過度なElevatedの使用**
   - 全てのカードをElevatedにしない
   - 階層が不明瞭になる

2. **不適切なパディング**
   - カード内で異なるパディングを混在させない
   - 統一感がなくなる

3. **構造の無視**
   - Header、Body、Footerを使わずに直接コンテンツを配置しない
   - メンテナンス性が低下

4. **過度なコンテンツ**
   - カードに長文を詰め込まない
   - 読みやすさを優先

```html
<!-- 全てElevatedにしない -->
<div class="ha-card">
  <div class="card card--elevated card--padding-md">...</div>
</div>
<div class="ha-card">
  <div class="card card--elevated card--padding-md">...</div>
</div>
<div class="ha-card">
  <div class="card card--elevated card--padding-md">...</div>
</div>

<!-- 不統一なパディング -->
<div class="ha-card">
  <div class="card card--default card--padding-sm">...</div>
</div>
<div class="ha-card">
  <div class="card card--default card--padding-lg">...</div>
</div>

<!-- 構造の無視 -->
<div class="ha-card">
  <div class="card card--default card--padding-md">
    <!-- Header、Body、Footerを使わない -->
    <h3>タイトル</h3>
    <p>内容</p>
    <button>アクション</button>
  </div>
</div>

<!-- 長すぎるコンテンツ -->
<div class="ha-card">
  <div class="card card--default card--padding-md">
    <div class="card__body">
      <p>非常に長い文章が続き、カードの高さが不自然に大きくなる...</p>
    </div>
  </div>
</div>
```

---

## レスポンシブ対応

### タッチデバイス最適化

タッチデバイスでは自動的にパディングとgapが調整されます。

```css
/* 自動適用される（@media (pointer: coarse)） */
/* タッチデバイスでは: */
- パディング-sm → var(--spacing-4)
- パディング-md → var(--spacing-5)
- パディング-lg → var(--spacing-8)
- gap → var(--spacing-4)
- クリック可能カードの最小高さ: 44px
- ホバー効果は無効化
```

### モバイルレイアウト

```css
/* 640px以下で自動適用される */
/* モバイルでは: */
- Header、Footerが縦並びに変更
- レスポンシブスペーシングを使用
```

### カードグリッド例

```html
<div class="card-grid" style="
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
">
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">...</div>
  </div>
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">...</div>
  </div>
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">...</div>
  </div>
</div>
```

---

## アニメーション

### 縮小モーション対応

`prefers-reduced-motion: reduce`が設定されている場合、アニメーションは自動的に無効化されます。

```css
/* 自動適用される */
@media (prefers-reduced-motion: reduce) {
  /* トランジションなし */
  /* transform効果なし */
}
```

### ホバー非対応デバイス

`hover: none`のデバイスでは、ホバー効果は自動的に無効化されます。

---

## テーマ対応

全てのカードトークンはテーマに対応しています。`data-theme`属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">
      <div class="card__body">ライトモードのカード</div>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-card">
    <div class="card card--elevated card--padding-md">
      <div class="card__body">ダークモードのカード</div>
    </div>
  </div>
</html>
```

---

## バリエーション

### グリッドレイアウト

```html
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
  <div class="ha-card">
    <div class="card card--outlined card--padding-md">
      <div class="card__body">カード 1</div>
    </div>
  </div>
  <div class="ha-card">
    <div class="card card--outlined card--padding-md">
      <div class="card__body">カード 2</div>
    </div>
  </div>
  <div class="ha-card">
    <div class="card card--outlined card--padding-md">
      <div class="card__body">カード 3</div>
    </div>
  </div>
</div>
```

### 横並びカード

```html
<div class="ha-card">
  <div class="card card--default card--padding-md" style="display: flex; flex-direction: row;">
    <div class="card__media" style="width: 200px; flex-shrink: 0;">
      <img src="thumbnail.jpg" alt="サムネイル">
    </div>
    <div class="card__body" style="flex: 1;">
      <h3>横並びカード</h3>
      <p>画像とコンテンツが横に並びます。</p>
    </div>
  </div>
</div>
```

### 商品カード

```html
<div class="ha-card">
  <div class="card card--elevated card--hoverable card--clickable card--padding-none">
    <div class="card__media">
      <img src="product.jpg" alt="商品画像">
    </div>
    <div style="padding: var(--spacing-4);">
      <div class="card__header" style="padding: 0; margin-bottom: var(--spacing-3);">
        <h3 style="margin: 0;">商品名</h3>
        <span>¥1,000</span>
      </div>
      <div class="card__body" style="padding: 0;">
        <p>商品の簡潔な説明文。</p>
      </div>
      <div class="card__footer" style="padding: 0; margin-top: var(--spacing-3);">
        <button>カートに追加</button>
      </div>
    </div>
  </div>
</div>
```

---

## 関連コンポーネント

- [Avatar](./avatar.md) - カード内のユーザー情報表示
- [Chip](./chip.md) - カード内のタグやラベル
- [List](./list.md) - カード内のリスト表示
- [Table](./table.md) - カード内のテーブル表示
- [Button](../layout/button.md) - カード内のアクションボタン

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
