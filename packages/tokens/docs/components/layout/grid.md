# Grid (グリッド) コンポーネント

**カテゴリ:** Layout
**ファイル:** `src/css/components/layout/grid.css`
**ステータス:** ✅ 実装済み

---

## 概要

グリッドコンポーネントは、CSS Grid レイアウトを使用した強力で柔軟な2次元レイアウトシステムです。
行と列を使用してコンテンツを整理し、レスポンシブなグリッドレイアウトを簡単に作成できます。

### 用途

- カードグリッドレイアウト
- ダッシュボードレイアウト
- ギャラリー表示
- 複雑な2次元レイアウト
- レスポンシブグリッド

---

## アライメント

### Align Items (垂直方向の配置)

グリッドアイテムを垂直方向にどのように配置するかを制御します。

#### Start (上揃え)
**使用場面:**
- カードの上部を揃える
- テキストを上から配置
- ヘッダーの配置

#### Center (中央揃え)
**使用場面:**
- アイコンや画像の中央配置
- 垂直方向の中央揃えが必要な場合
- モーダル内のコンテンツ

#### End (下揃え)
**使用場面:**
- フッターの配置
- ボタンを下部に揃える
- 価格表示の下揃え

#### Stretch (伸縮)
**使用場面:**
- 高さを均等にする
- フル高さのカード
- デフォルト動作

---

### Justify Items (水平方向の配置)

グリッドアイテムを水平方向にどのように配置するかを制御します。

#### Start (左揃え)
**使用場面:**
- テキストの左揃え
- アイコンの左配置
- デフォルト配置

#### Center (中央揃え)
**使用場面:**
- コンテンツの中央配置
- アイコンや画像の中央揃え
- 対称的なレイアウト

#### End (右揃え)
**使用場面:**
- 価格や数値の右揃え
- アクションボタンの右配置
- RTL対応

#### Stretch (伸縮)
**使用場面:**
- 幅を均等にする
- フル幅のアイテム
- デフォルト動作

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-grid align-items="start" justify-items="stretch">
  <div part="grid" style="grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <div>アイテム 1</div>
    <div>アイテム 2</div>
    <div>アイテム 3</div>
    <div>アイテム 4</div>
    <div>アイテム 5</div>
    <div>アイテム 6</div>
  </div>
</ha-grid>

<!-- 2カラムグリッド -->
<ha-grid align-items="center" justify-items="center">
  <div part="grid" style="grid-template-columns: repeat(2, 1fr); gap: 2rem;">
    <div>左カラム</div>
    <div>右カラム</div>
  </div>
</ha-grid>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/layout/grid.css">
</head>
<body>
  <!-- 3カラムグリッド -->
  <div class="ha-grid" align-items="start" justify-items="stretch">
    <div part="grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
      <div style="background: var(--background-secondary); padding: 1rem;">
        <h3>カード 1</h3>
        <p>コンテンツ</p>
      </div>
      <div style="background: var(--background-secondary); padding: 1rem;">
        <h3>カード 2</h3>
        <p>コンテンツ</p>
      </div>
      <div style="background: var(--background-secondary); padding: 1rem;">
        <h3>カード 3</h3>
        <p>コンテンツ</p>
      </div>
    </div>
  </div>

  <!-- レスポンシブグリッド (auto-fit) -->
  <div class="ha-grid" align-items="stretch" justify-items="stretch">
    <div part="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
      <div style="background: var(--background-secondary); padding: 1rem;">アイテム 1</div>
      <div style="background: var(--background-secondary); padding: 1rem;">アイテム 2</div>
      <div style="background: var(--background-secondary); padding: 1rem;">アイテム 3</div>
      <div style="background: var(--background-secondary); padding: 1rem;">アイテム 4</div>
    </div>
  </div>

  <!-- 中央揃えグリッド -->
  <div class="ha-grid" align-items="center" justify-items="center">
    <div part="grid" style="grid-template-columns: repeat(4, 100px); gap: 2rem; min-height: 200px;">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </div>

  <!-- 複雑なグリッドレイアウト -->
  <div class="ha-grid" align-items="start" justify-items="stretch">
    <div part="grid" style="
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 1rem;
      min-height: 400px;
    ">
      <div style="grid-column: 1 / -1; background: var(--primary-default); color: white; padding: 1rem;">
        ヘッダー
      </div>
      <div style="background: var(--background-secondary); padding: 1rem;">
        サイドバー左
      </div>
      <div style="background: var(--background-primary); padding: 1rem;">
        メインコンテンツ
      </div>
      <div style="background: var(--background-secondary); padding: 1rem;">
        サイドバー右
      </div>
      <div style="grid-column: 1 / -1; background: var(--background-secondary); padding: 1rem;">
        フッター
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/html/layout/grid.css';

// React例
function Grid({
  alignItems = 'stretch',
  justifyItems = 'stretch',
  columns = 3,
  gap = '1rem',
  children,
  ...props
}) {
  return (
    <div
      className="ha-grid"
      align-items={alignItems}
      justify-items={justifyItems}
    >
      <div
        part="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: gap,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

// 使用例
function App() {
  return (
    <>
      {/* 3カラムグリッド */}
      <Grid columns={3} gap="1.5rem" alignItems="start">
        <Card>カード 1</Card>
        <Card>カード 2</Card>
        <Card>カード 3</Card>
      </Grid>

      {/* レスポンシブグリッド */}
      <div className="ha-grid" align-items="stretch">
        <div
          part="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {items.map(item => (
            <Card key={item.id}>{item.content}</Card>
          ))}
        </div>
      </div>
    </>
  );
}
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
  <div class="ha-grid" align-items="start" justify-items="stretch">
    <div part="grid" style="grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <div>アイテム</div>
      <div>アイテム</div>
      <div>アイテム</div>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `align-items` | `start` \| `center` \| `end` \| `stretch` | `stretch` | グリッドアイテムの垂直方向の配置 |
| `justify-items` | `start` \| `center` \| `end` \| `stretch` | `stretch` | グリッドアイテムの水平方向の配置 |

---

## インラインスタイル属性

Grid コンポーネントは、`part="grid"` 要素にインラインスタイルで以下を指定します:

### Grid Template Columns (カラム定義)
```css
/* 固定カラム数 */
grid-template-columns: repeat(3, 1fr);

/* レスポンシブ (auto-fit) */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

/* レスポンシブ (auto-fill) */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

/* カスタムサイズ */
grid-template-columns: 200px 1fr 200px;
```

### Grid Template Rows (行定義)
```css
/* 自動行 */
grid-template-rows: auto;

/* 固定行高さ */
grid-template-rows: 100px 200px 100px;

/* 柔軟な行 */
grid-template-rows: auto 1fr auto;
```

### Gap (間隔)
```css
/* 統一された間隔 */
gap: 1rem;
gap: var(--spacing-4);

/* 行と列で異なる間隔 */
gap: 1rem 2rem; /* row-gap column-gap */
row-gap: 1rem;
column-gap: 2rem;
```

---

## CSS変数

グリッドコンポーネントは構造的なコンポーネントのため、専用のCSS変数は少ないですが、
間隔の制御にスペーシングトークンを使用できます:

### スペーシング
- `--spacing-1` - 0.25rem
- `--spacing-2` - 0.5rem
- `--spacing-3` - 0.75rem
- `--spacing-4` - 1rem
- `--spacing-5` - 1.25rem
- `--spacing-6` - 1.5rem
- `--spacing-8` - 2rem

### 使用例

```html
<div class="ha-grid">
  <div part="grid" style="
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
  ">
    <div>アイテム</div>
  </div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **レスポンシブグリッドの使用**
   - `auto-fit`や`auto-fill`で自動調整
   - `minmax()`で最小/最大幅を指定

2. **適切なギャップ**
   - コンテンツに応じた間隔を設定
   - スペーシングトークンを使用

3. **セマンティックなHTML**
   - グリッドアイテムに意味のある要素を使用
   - リストには`ul`/`li`を検討

4. **一貫性のあるアライメント**
   - ページ全体で統一されたアライメントルール

```html
<!-- 適切な使用例 -->
<!-- レスポンシブカードグリッド -->
<div class="ha-grid" align-items="stretch">
  <div part="grid" style="
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-6);
  ">
    <article style="background: var(--background-secondary); padding: var(--spacing-4);">
      <h3>記事タイトル 1</h3>
      <p>記事の概要...</p>
      <a href="#">続きを読む</a>
    </article>
    <article style="background: var(--background-secondary); padding: var(--spacing-4);">
      <h3>記事タイトル 2</h3>
      <p>記事の概要...</p>
      <a href="#">続きを読む</a>
    </article>
    <article style="background: var(--background-secondary); padding: var(--spacing-4);">
      <h3>記事タイトル 3</h3>
      <p>記事の概要...</p>
      <a href="#">続きを読む</a>
    </article>
  </div>
</div>

<!-- ダッシュボードレイアウト -->
<div class="ha-grid" align-items="start">
  <div part="grid" style="
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    gap: var(--spacing-4);
    min-height: 100vh;
  ">
    <header style="grid-column: 1 / -1;">ヘッダー</header>
    <nav>ナビゲーション</nav>
    <main>メインコンテンツ</main>
  </div>
</div>
```

### ❌ 非推奨

1. **固定ピクセル幅のみ**
   - レスポンシブでないレイアウト

2. **過度に複雑なグリッド**
   - 管理が困難な複雑すぎる定義

3. **ギャップの欠如**
   - アイテム間の余白がない

```html
<!-- 避けるべき例 -->
<!-- 固定幅でレスポンシブでない -->
<div class="ha-grid">
  <div part="grid" style="grid-template-columns: 300px 300px 300px;">
    <div>固定幅アイテム</div>
    <div>固定幅アイテム</div>
    <div>固定幅アイテム</div>
  </div>
</div>

<!-- ギャップがない -->
<div class="ha-grid">
  <div part="grid" style="grid-template-columns: repeat(3, 1fr);">
    <div>詰まっている</div>
    <div>詰まっている</div>
    <div>詰まっている</div>
  </div>
</div>
```

---

## レスポンシブパターン

### Auto-fit (自動フィット)

画面幅に応じて自動的にカラム数が調整されます。

```html
<div class="ha-grid" align-items="stretch">
  <div part="grid" style="
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  ">
    <div>アイテム 1</div>
    <div>アイテム 2</div>
    <div>アイテム 3</div>
    <div>アイテム 4</div>
  </div>
</div>
```

### メディアクエリとの組み合わせ

```html
<div class="ha-grid responsive-grid" align-items="start">
  <div part="grid">
    <div>アイテム 1</div>
    <div>アイテム 2</div>
    <div>アイテム 3</div>
  </div>
</div>

<style>
  .responsive-grid [part="grid"] {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }

  @media (min-width: 768px) {
    .responsive-grid [part="grid"] {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-6);
    }
  }

  @media (min-width: 1024px) {
    .responsive-grid [part="grid"] {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-8);
    }
  }
</style>
```

---

## 高度な使用例

### Holy Grail レイアウト

```html
<div class="ha-grid" align-items="stretch">
  <div part="grid" style="
    grid-template-areas:
      'header header header'
      'nav main aside'
      'footer footer footer';
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    gap: var(--spacing-4);
    min-height: 100vh;
  ">
    <header style="grid-area: header;">ヘッダー</header>
    <nav style="grid-area: nav;">ナビゲーション</nav>
    <main style="grid-area: main;">メインコンテンツ</main>
    <aside style="grid-area: aside;">サイドバー</aside>
    <footer style="grid-area: footer;">フッター</footer>
  </div>
</div>
```

### Masonry 風レイアウト

```html
<div class="ha-grid" align-items="start">
  <div part="grid" style="
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 10px;
    gap: var(--spacing-4);
  ">
    <div style="grid-row: span 20;">高さ200px</div>
    <div style="grid-row: span 30;">高さ300px</div>
    <div style="grid-row: span 15;">高さ150px</div>
    <div style="grid-row: span 25;">高さ250px</div>
  </div>
</div>
```

### カードグリッド with ギャップ制御

```html
<div class="ha-grid" align-items="stretch">
  <div part="grid" style="
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-6);
  ">
    <div style="background: var(--background-secondary); padding: var(--spacing-5); border-radius: var(--border-radius-lg);">
      <h3>製品 1</h3>
      <p>説明文</p>
      <button>詳細</button>
    </div>
    <div style="background: var(--background-secondary); padding: var(--spacing-5); border-radius: var(--border-radius-lg);">
      <h3>製品 2</h3>
      <p>説明文</p>
      <button>詳細</button>
    </div>
  </div>
</div>
```

---

## テーマ対応

グリッドコンポーネントは構造的な役割のため、直接的なテーマはありませんが、
グリッドアイテムの背景色やボーダーにテーマ対応トークンを使用してください。

```html
<div class="ha-grid" align-items="stretch">
  <div part="grid" style="grid-template-columns: repeat(3, 1fr); gap: var(--spacing-4);">
    <div style="background: var(--background-secondary); border: 1px solid var(--border-default); padding: var(--spacing-4);">
      テーマ対応カード
    </div>
  </div>
</div>
```

---

## 関連コンポーネント

- [Container](./container.md) - コンテナコンポーネント
- [Stack](./stack.md) - フレックスボックスベースのスタックレイアウト
- [Card](../data-display/card.md) - グリッド内で使用するカード

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
