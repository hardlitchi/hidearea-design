# Container (コンテナ) コンポーネント

**カテゴリ:** Layout
**ファイル:** `src/css/components/layout/container.css`
**ステータス:** ✅ 実装済み

---

## 概要

コンテナコンポーネントは、コンテンツを中央に配置し、最大幅を制御するためのレスポンシブレイアウトコンポーネントです。
異なる画面サイズに応じて適切な幅とパディングを提供し、読みやすく整理されたレイアウトを実現します。

### 用途

- ページコンテンツの中央配置
- レスポンシブな最大幅の制御
- 一貫したパディングの適用
- ブレークポイントに応じたレイアウト調整
- セクション区切りの作成

---

## サイズバリアント

### Small (sm)
- 最大幅: `640px`
- ブレークポイント: `var(--breakpoint-sm)`

**使用場面:**
- モバイル中心のコンテンツ
- フォームページ
- シンプルな記事レイアウト

### Medium (md)
- 最大幅: `768px`
- ブレークポイント: `var(--breakpoint-md)`

**使用場面:**
- タブレット向けレイアウト
- 標準的な記事幅
- ダッシュボード

### Large (lg)
- 最大幅: `1024px`
- ブレークポイント: `var(--breakpoint-lg)`

**使用場面:**
- デスクトップレイアウト
- 広いコンテンツエリア
- ダッシュボードやアプリケーション

### Extra Large (xl)
- 最大幅: `1280px`
- ブレークポイント: `var(--breakpoint-xl)`

**使用場面:**
- 大画面デスクトップ
- 複雑なダッシュボード
- データテーブル

### 2XL (2xl)
- 最大幅: `1536px`
- ブレークポイント: `var(--breakpoint-2xl)`

**使用場面:**
- ワイドスクリーン
- 大規模なデータ表示
- マルチカラムレイアウト

### Full (full)
- 最大幅: `100%`

**使用場面:**
- フルワイドセクション
- ヒーローイメージ
- バックグラウンド付きセクション

---

## パディングバリアント

### None
- パディング: `0`

**使用場面:**
- カスタムパディングを適用する場合
- 子要素で個別にパディングを制御

### Small (sm)
- パディング: `1rem` (`var(--spacing-4)`)

**使用場面:**
- コンパクトなレイアウト
- モバイルデバイス
- カード内のコンテナ

### Medium (md)
- パディング: `1.5rem` (`var(--spacing-6)`)

**使用場面:**
- 標準的なレイアウト
- バランスの取れたスペース
- デスクトップ表示

### Large (lg)
- パディング: `2rem` (`var(--spacing-8)`)

**使用場面:**
- 広々としたレイアウト
- ランディングページ
- 大画面デバイス

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-container max-width="lg" centered padding="md">
  <div part="container">
    <h1>ページタイトル</h1>
    <p>コンテンツがここに表示されます。</p>
  </div>
</ha-container>

<!-- フルワイドコンテナ -->
<ha-container max-width="full" padding="none">
  <div part="container">
    <img src="hero.jpg" alt="ヒーロー画像">
  </div>
</ha-container>

<!-- 小サイズコンテナ -->
<ha-container max-width="sm" centered padding="sm">
  <div part="container">
    <form>...</form>
  </div>
</ha-container>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/layout/container.css">
</head>
<body>
  <!-- 中央配置の標準コンテナ -->
  <div class="ha-container" max-width="lg" centered padding="md">
    <div part="container">
      <h1>ページタイトル</h1>
      <p>このコンテンツは最大1024pxの幅で中央に配置されます。</p>
    </div>
  </div>

  <!-- 小サイズのフォームコンテナ -->
  <div class="ha-container" max-width="sm" centered padding="sm">
    <div part="container">
      <form>
        <h2>ログインフォーム</h2>
        <input type="email" placeholder="メールアドレス">
        <input type="password" placeholder="パスワード">
        <button type="submit">ログイン</button>
      </form>
    </div>
  </div>

  <!-- フルワイドセクション -->
  <div class="ha-container" max-width="full" padding="none">
    <div part="container">
      <img src="banner.jpg" alt="バナー画像" style="width: 100%;">
    </div>
  </div>

  <!-- 2XLサイズのダッシュボード -->
  <div class="ha-container" max-width="2xl" centered padding="lg">
    <div part="container">
      <h1>ダッシュボード</h1>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div>カード1</div>
        <div>カード2</div>
        <div>カード3</div>
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/html/layout/container.css';

// React例
function Container({ maxWidth = 'lg', centered = true, padding = 'md', children }) {
  return (
    <div
      className="ha-container"
      max-width={maxWidth}
      {...(centered ? { centered: '' } : {})}
      padding={padding}
    >
      <div part="container">
        {children}
      </div>
    </div>
  );
}

// 使用例
function App() {
  return (
    <>
      <Container maxWidth="lg" centered padding="md">
        <h1>メインコンテンツ</h1>
        <p>テキストコンテンツ</p>
      </Container>

      <Container maxWidth="sm" centered padding="sm">
        <form>
          <input type="text" placeholder="名前" />
          <button type="submit">送信</button>
        </form>
      </Container>

      <Container maxWidth="full" padding="none">
        <img src="hero.jpg" alt="ヒーロー" />
      </Container>
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
  <div class="ha-container" max-width="lg" centered padding="md">
    <div part="container">
      <h1>ページタイトル</h1>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `max-width` | `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `full` | - | コンテナの最大幅 |
| `centered` | boolean | - | コンテナを中央配置 |
| `padding` | `none` \| `sm` \| `md` \| `lg` | - | コンテナのパディング |

---

## CSS変数

コンテナコンポーネントは以下のCSS変数(デザイントークン)を使用しています:

### ブレークポイント
- `--breakpoint-sm` - 640px (Small)
- `--breakpoint-md` - 768px (Medium)
- `--breakpoint-lg` - 1024px (Large)
- `--breakpoint-xl` - 1280px (Extra Large)
- `--breakpoint-2xl` - 1536px (2XL)

### スペーシング
- `--spacing-4` - 1rem (Small padding)
- `--spacing-6` - 1.5rem (Medium padding)
- `--spacing-8` - 2rem (Large padding)

### カスタマイズ例

```css
/* カスタムブレークポイント */
.ha-container {
  --breakpoint-lg: 1200px;
}

/* カスタムパディング */
.ha-container[padding="custom"] [part="container"] {
  padding: var(--spacing-10);
}
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なサイズ選択**
   - コンテンツタイプに応じた最大幅を選択
   - テキスト中心のページには`sm`または`md`
   - 複雑なレイアウトには`lg`以上

2. **中央配置の使用**
   - ほとんどの場合`centered`属性を使用
   - 視覚的なバランスを保つ

3. **一貫したパディング**
   - ページ全体で同じパディングサイズを使用
   - デバイスサイズに応じて調整

4. **ネストの活用**
   - 外側にフルワイドコンテナ、内側に制限付きコンテナ

```html
<!-- 適切な使用例 -->
<!-- テキストコンテンツ -->
<div class="ha-container" max-width="md" centered padding="md">
  <div part="container">
    <article>
      <h1>記事タイトル</h1>
      <p>読みやすい幅で表示されます。</p>
    </article>
  </div>
</div>

<!-- ダッシュボード -->
<div class="ha-container" max-width="xl" centered padding="lg">
  <div part="container">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      <div>カード1</div>
      <div>カード2</div>
      <div>カード3</div>
    </div>
  </div>
</div>

<!-- ネストされたコンテナ -->
<div class="ha-container" max-width="full" padding="none">
  <div part="container" style="background: var(--background-secondary);">
    <div class="ha-container" max-width="lg" centered padding="md">
      <div part="container">
        <h2>セクションタイトル</h2>
      </div>
    </div>
  </div>
</div>
```

### ❌ 非推奨

1. **過度に小さいコンテナ**
   - 広いコンテンツに小さすぎるサイズを使用

2. **中央配置なし**
   - `centered`属性を忘れると左寄せになる

3. **パディングの欠如**
   - エッジにコンテンツが張り付く

```html
<!-- 避けるべき例 -->
<!-- 広いコンテンツに小さすぎるコンテナ -->
<div class="ha-container" max-width="sm">
  <div part="container">
    <table style="width: 1000px;">...</table>
  </div>
</div>

<!-- 中央配置されていない -->
<div class="ha-container" max-width="lg" padding="md">
  <div part="container">
    <h1>左寄せになってしまう</h1>
  </div>
</div>

<!-- パディングがない -->
<div class="ha-container" max-width="lg" centered>
  <div part="container">
    <p>画面端に張り付いてしまう</p>
  </div>
</div>
```

---

## レスポンシブパターン

### モバイルファースト

```html
<!-- モバイルでは小さく、デスクトップで大きく -->
<div class="ha-container" max-width="lg" centered padding="sm">
  <div part="container">
    <h1>レスポンシブコンテンツ</h1>
  </div>
</div>

<style>
  @media (min-width: 768px) {
    .ha-container {
      --spacing-4: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .ha-container {
      --spacing-4: 2rem;
    }
  }
</style>
```

### セクション区切り

```html
<!-- ヒーローセクション -->
<div class="ha-container" max-width="full" padding="none">
  <div part="container" style="background: var(--primary-default); color: white; padding: 4rem 2rem;">
    <div class="ha-container" max-width="lg" centered>
      <div part="container">
        <h1>ようこそ</h1>
      </div>
    </div>
  </div>
</div>

<!-- コンテンツセクション -->
<div class="ha-container" max-width="lg" centered padding="md">
  <div part="container">
    <h2>主要コンテンツ</h2>
    <p>テキスト...</p>
  </div>
</div>

<!-- フッターセクション -->
<div class="ha-container" max-width="full" padding="none">
  <div part="container" style="background: var(--background-secondary); padding: 2rem;">
    <div class="ha-container" max-width="xl" centered>
      <div part="container">
        <footer>フッター内容</footer>
      </div>
    </div>
  </div>
</div>
```

---

## バリエーション

### 背景色付きコンテナ

```html
<div class="ha-container" max-width="full" padding="none">
  <div part="container" style="background: var(--background-secondary);">
    <div class="ha-container" max-width="lg" centered padding="lg">
      <div part="container">
        <h2>背景付きセクション</h2>
      </div>
    </div>
  </div>
</div>
```

### グリッドレイアウトとの組み合わせ

```html
<div class="ha-container" max-width="xl" centered padding="md">
  <div part="container">
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
      <main>
        <h1>メインコンテンツ</h1>
        <p>テキスト...</p>
      </main>
      <aside>
        <h2>サイドバー</h2>
        <nav>...</nav>
      </aside>
    </div>
  </div>
</div>
```

---

## テーマ対応

コンテナコンポーネントは構造的な役割のため、色に関するテーマはありませんが、
背景色やボーダーを追加する場合はテーマ対応のトークンを使用してください。

```html
<div class="ha-container" max-width="lg" centered padding="md">
  <div part="container" style="background: var(--background-primary); border: 1px solid var(--border-default);">
    <h1>テーマ対応コンテナ</h1>
  </div>
</div>
```

---

## 関連コンポーネント

- [Grid](./grid.md) - グリッドレイアウトシステム
- [Stack](./stack.md) - フレックスボックスベースのスタックレイアウト
- [Card](../data-display/card.md) - カードコンポーネント

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
