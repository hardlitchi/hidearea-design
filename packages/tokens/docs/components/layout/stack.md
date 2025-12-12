# Stack (スタック) コンポーネント

**カテゴリ:** Layout
**ファイル:** `src/css/components/layout/stack.css`
**ステータス:** ✅ 実装済み

---

## 概要

スタックコンポーネントは、Flexboxを使用した1次元レイアウトシステムです。
要素を縦方向または横方向に並べ、間隔や配置を簡単に制御できます。
シンプルなレイアウトや、要素の整列が必要な場面で活躍します。

### 用途

- フォーム要素の縦並び
- ボタングループの横並び
- カードコンテンツの縦配置
- ナビゲーションメニューの横並び
- アイコンとテキストの組み合わせ

---

## Direction (方向)

### Vertical (縦方向)

要素を縦に並べます。デフォルトの動作です。

**使用場面:**
- フォームフィールドの縦並び
- リスト表示
- カードコンテンツの縦配置
- セクションの積み重ね

### Horizontal (横方向)

要素を横に並べます。

**使用場面:**
- ボタングループ
- ナビゲーションメニュー
- タグや badge の横並び
- アイコンとテキストの組み合わせ

---

## Align (交差軸の配置)

Flexboxの`align-items`プロパティに対応し、交差軸方向の配置を制御します。

### Start (開始位置)

**Vertical の場合:** 左揃え
**Horizontal の場合:** 上揃え

**使用場面:**
- テキストの左揃え
- アイコンの上揃え
- デフォルト配置

### Center (中央)

**Vertical の場合:** 中央揃え
**Horizontal の場合:** 垂直中央揃え

**使用場面:**
- アイコンとテキストの垂直中央揃え
- ボタンの中央配置
- モーダル内のコンテンツ

### End (終了位置)

**Vertical の場合:** 右揃え
**Horizontal の場合:** 下揃え

**使用場面:**
- 価格の右揃え
- アクションボタンの右配置
- フッター要素

### Stretch (伸縮)

**使用場面:**
- 幅/高さを均等にする
- フル幅/高さのアイテム
- デフォルト動作

---

## Justify (主軸の配置)

Flexboxの`justify-content`プロパティに対応し、主軸方向の配置を制御します。

### Start (開始位置)

要素を主軸の開始位置に配置します。

**使用場面:**
- デフォルト配置
- 左/上揃え

### Center (中央)

要素を主軸の中央に配置します。

**使用場面:**
- コンテンツの中央配置
- モーダルコンテンツ
- ページ中央のフォーム

### End (終了位置)

要素を主軸の終了位置に配置します。

**使用場面:**
- フッターボタン
- 右/下揃え

### Space Between (両端揃え)

要素間に均等な間隔を配置し、両端に余白を作りません。

**使用場面:**
- ヘッダー (ロゴと メニュー)
- カードフッター (情報とアクション)
- ツールバー

### Space Around (周囲に間隔)

各要素の周囲に均等な間隔を配置します。

**使用場面:**
- ボタングループ
- タグの配置
- アイコンリスト

### Space Evenly (均等間隔)

全ての間隔を均等にします。

**使用場面:**
- 均等配置のボタン
- グリッドのような配置
- ステッパー

---

## Wrap (折り返し)

要素が収まりきらない場合に折り返すかどうかを制御します。

**使用場面:**
- タグの自動折り返し
- レスポンシブボタングループ
- 可変幅のアイテムリスト

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-stack direction="vertical" align="stretch" justify="start">
  <div part="stack" style="gap: 1rem;">
    <div>アイテム 1</div>
    <div>アイテム 2</div>
    <div>アイテム 3</div>
  </div>
</ha-stack>

<!-- 横並びスタック -->
<ha-stack direction="horizontal" align="center" justify="space-between">
  <div part="stack" style="gap: 0.5rem;">
    <button>戻る</button>
    <button>次へ</button>
  </div>
</ha-stack>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/layout/stack.css">
</head>
<body>
  <!-- 縦並びスタック (フォーム) -->
  <div class="ha-stack" direction="vertical" align="stretch" justify="start">
    <div part="stack" style="gap: var(--spacing-4);">
      <div>
        <label>名前</label>
        <input type="text" placeholder="山田太郎">
      </div>
      <div>
        <label>メールアドレス</label>
        <input type="email" placeholder="email@example.com">
      </div>
      <div>
        <label>パスワード</label>
        <input type="password" placeholder="パスワード">
      </div>
      <button type="submit">送信</button>
    </div>
  </div>

  <!-- 横並びスタック (ボタングループ) -->
  <div class="ha-stack" direction="horizontal" align="center" justify="end">
    <div part="stack" style="gap: var(--spacing-2);">
      <button>キャンセル</button>
      <button>保存</button>
    </div>
  </div>

  <!-- 中央揃えスタック -->
  <div class="ha-stack" direction="vertical" align="center" justify="center">
    <div part="stack" style="gap: var(--spacing-6); min-height: 400px;">
      <h2>ようこそ</h2>
      <p>テキストメッセージ</p>
      <button>開始</button>
    </div>
  </div>

  <!-- Space-between スタック (ヘッダー) -->
  <div class="ha-stack" direction="horizontal" align="center" justify="space-between">
    <div part="stack" style="gap: 0; padding: var(--spacing-4);">
      <div>
        <h1>ロゴ</h1>
      </div>
      <nav>
        <a href="#">ホーム</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </div>

  <!-- 折り返しスタック (タグ) -->
  <div class="ha-stack" direction="horizontal" align="center" justify="start" wrap>
    <div part="stack" style="gap: var(--spacing-2);">
      <span style="background: var(--background-secondary); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-base);">
        タグ1
      </span>
      <span style="background: var(--background-secondary); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-base);">
        タグ2
      </span>
      <span style="background: var(--background-secondary); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-base);">
        タグ3
      </span>
      <span style="background: var(--background-secondary); padding: 0.25rem 0.5rem; border-radius: var(--border-radius-base);">
        タグ4
      </span>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/html/layout/stack.css';

// React例
function Stack({
  direction = 'vertical',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  gap = '1rem',
  children,
  ...props
}) {
  return (
    <div
      className="ha-stack"
      direction={direction}
      align={align}
      justify={justify}
      {...(wrap ? { wrap: '' } : {})}
    >
      <div part="stack" style={{ gap }} {...props}>
        {children}
      </div>
    </div>
  );
}

// 使用例
function App() {
  return (
    <>
      {/* フォーム */}
      <Stack direction="vertical" gap="1rem">
        <input type="text" placeholder="名前" />
        <input type="email" placeholder="メール" />
        <button>送信</button>
      </Stack>

      {/* ボタングループ */}
      <Stack direction="horizontal" align="center" justify="end" gap="0.5rem">
        <button>キャンセル</button>
        <button>保存</button>
      </Stack>

      {/* アイコンとテキスト */}
      <Stack direction="horizontal" align="center" gap="0.5rem">
        <Icon name="user" />
        <span>ユーザー名</span>
      </Stack>

      {/* カードコンテンツ */}
      <Stack direction="vertical" gap="1.5rem">
        <h3>タイトル</h3>
        <p>本文...</p>
        <Stack direction="horizontal" justify="space-between">
          <span>日付</span>
          <button>詳細</button>
        </Stack>
      </Stack>
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
  <div class="ha-stack" direction="vertical" align="stretch">
    <div part="stack" style="gap: 1rem;">
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
| `direction` | `vertical` \| `horizontal` | `vertical` | スタックの方向 |
| `align` | `start` \| `center` \| `end` \| `stretch` | `stretch` | 交差軸方向の配置 |
| `justify` | `start` \| `center` \| `end` \| `space-between` \| `space-around` \| `space-evenly` | `start` | 主軸方向の配置 |
| `wrap` | boolean | - | 要素の折り返しを有効化 |

---

## インラインスタイル属性

Stack コンポーネントは、`part="stack"` 要素にインラインスタイルで以下を指定します:

### Gap (間隔)

```css
/* 固定値 */
gap: 1rem;
gap: 16px;

/* デザイントークン */
gap: var(--spacing-2);
gap: var(--spacing-4);
gap: var(--spacing-6);

/* 縦横で異なる間隔 */
gap: 1rem 0.5rem; /* row-gap column-gap */
row-gap: 1rem;
column-gap: 0.5rem;
```

---

## CSS変数

スタックコンポーネントで使用できるスペーシングトークン:

### スペーシング
- `--spacing-1` - 0.25rem
- `--spacing-2` - 0.5rem
- `--spacing-3` - 0.75rem
- `--spacing-4` - 1rem
- `--spacing-5` - 1.25rem
- `--spacing-6` - 1.5rem
- `--spacing-8` - 2rem
- `--spacing-10` - 2.5rem

### 使用例

```html
<div class="ha-stack" direction="vertical">
  <div part="stack" style="gap: var(--spacing-4);">
    <div>アイテム</div>
  </div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切な方向の選択**
   - フォームは縦、ボタンは横
   - コンテンツの性質に応じて選択

2. **一貫した間隔**
   - スペーシングトークンを使用
   - デザインシステムに準拠

3. **セマンティックなHTML**
   - リストには`ul`/`li`を使用
   - ナビゲーションには`nav`を使用

4. **適切なアライメント**
   - アイコンとテキストは`align="center"`
   - フォームは`align="stretch"`

```html
<!-- 適切な使用例 -->
<!-- フォームフィールド -->
<div class="ha-stack" direction="vertical" align="stretch">
  <div part="stack" style="gap: var(--spacing-4);">
    <input type="text" placeholder="名前">
    <input type="email" placeholder="メール">
    <textarea placeholder="メッセージ"></textarea>
    <button type="submit">送信</button>
  </div>
</div>

<!-- アイコンとテキストの組み合わせ -->
<div class="ha-stack" direction="horizontal" align="center">
  <div part="stack" style="gap: var(--spacing-2);">
    <svg width="20" height="20">...</svg>
    <span>ユーザー名</span>
  </div>
</div>

<!-- ヘッダーレイアウト -->
<div class="ha-stack" direction="horizontal" align="center" justify="space-between">
  <div part="stack" style="gap: 0; width: 100%; padding: var(--spacing-4);">
    <h1>サイトタイトル</h1>
    <nav>
      <div class="ha-stack" direction="horizontal" align="center">
        <div part="stack" style="gap: var(--spacing-4);">
          <a href="#">ホーム</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </nav>
  </div>
</div>

<!-- カードフッター -->
<div class="ha-stack" direction="horizontal" align="center" justify="space-between">
  <div part="stack" style="gap: var(--spacing-2);">
    <span>2025-12-12</span>
    <button>詳細を見る</button>
  </div>
</div>
```

### ❌ 非推奨

1. **不適切な方向**
   - フォームを横並びにする
   - ボタンを縦並びにする(意図的でない場合)

2. **間隔がない**
   - 要素が詰まりすぎる

3. **過度なネスト**
   - Stack の中に Stack を多重にネスト

```html
<!-- 避けるべき例 -->
<!-- フォームを横並びにしている -->
<div class="ha-stack" direction="horizontal">
  <div part="stack">
    <input type="text">
    <input type="email">
    <button>送信</button>
  </div>
</div>

<!-- 間隔がない -->
<div class="ha-stack" direction="horizontal" align="center">
  <div part="stack">
    <button>ボタン1</button>
    <button>ボタン2</button>
    <button>ボタン3</button>
  </div>
</div>
```

---

## 一般的なパターン

### フォームレイアウト

```html
<div class="ha-stack" direction="vertical" align="stretch">
  <div part="stack" style="gap: var(--spacing-4);">
    <div>
      <label for="name">名前</label>
      <input type="text" id="name" placeholder="山田太郎">
    </div>
    <div>
      <label for="email">メールアドレス</label>
      <input type="email" id="email" placeholder="email@example.com">
    </div>
    <div class="ha-stack" direction="horizontal" align="center" justify="end">
      <div part="stack" style="gap: var(--spacing-2);">
        <button type="button">キャンセル</button>
        <button type="submit">送信</button>
      </div>
    </div>
  </div>
</div>
```

### ナビゲーションバー

```html
<nav>
  <div class="ha-stack" direction="horizontal" align="center" justify="space-between">
    <div part="stack" style="gap: 0; width: 100%; padding: var(--spacing-4);">
      <div>
        <h1>ロゴ</h1>
      </div>
      <div class="ha-stack" direction="horizontal" align="center">
        <div part="stack" style="gap: var(--spacing-6);">
          <a href="#">ホーム</a>
          <a href="#">製品</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  </div>
</nav>
```

### カードコンテンツ

```html
<div style="background: var(--background-secondary); padding: var(--spacing-5); border-radius: var(--border-radius-lg);">
  <div class="ha-stack" direction="vertical" align="stretch">
    <div part="stack" style="gap: var(--spacing-4);">
      <h3>カードタイトル</h3>
      <p>カードの本文がここに表示されます。詳細な情報を含みます。</p>
      <div class="ha-stack" direction="horizontal" align="center" justify="space-between">
        <div part="stack" style="gap: 0;">
          <span style="color: var(--foreground-secondary); font-size: 0.875rem;">2025-12-12</span>
          <button>詳細を見る</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### タグリスト (折り返し)

```html
<div class="ha-stack" direction="horizontal" align="center" justify="start" wrap>
  <div part="stack" style="gap: var(--spacing-2);">
    <span style="background: var(--primary-default); color: white; padding: 0.25rem 0.75rem; border-radius: var(--border-radius-full);">
      JavaScript
    </span>
    <span style="background: var(--primary-default); color: white; padding: 0.25rem 0.75rem; border-radius: var(--border-radius-full);">
      React
    </span>
    <span style="background: var(--primary-default); color: white; padding: 0.25rem 0.75rem; border-radius: var(--border-radius-full);">
      CSS
    </span>
    <span style="background: var(--primary-default); color: white; padding: 0.25rem 0.75rem; border-radius: var(--border-radius-full);">
      HTML
    </span>
  </div>
</div>
```

### モーダルコンテンツ

```html
<div class="ha-stack" direction="vertical" align="stretch">
  <div part="stack" style="gap: var(--spacing-6);">
    <h2>確認</h2>
    <p>この操作を実行してもよろしいですか?</p>
    <div class="ha-stack" direction="horizontal" align="center" justify="end">
      <div part="stack" style="gap: var(--spacing-2);">
        <button>キャンセル</button>
        <button style="background: var(--error-default); color: white;">削除</button>
      </div>
    </div>
  </div>
</div>
```

---

## レスポンシブパターン

### 方向の切り替え

```html
<div class="ha-stack responsive-stack" direction="vertical" align="stretch">
  <div part="stack" style="gap: var(--spacing-4);">
    <div>アイテム 1</div>
    <div>アイテム 2</div>
    <div>アイテム 3</div>
  </div>
</div>

<style>
  @media (min-width: 768px) {
    .responsive-stack {
      direction: horizontal;
    }
    .responsive-stack[part="stack"] {
      gap: var(--spacing-6);
    }
  }
</style>
```

---

## テーマ対応

スタックコンポーネントは構造的な役割のため、直接的なテーマはありませんが、
スタックアイテムの背景色やボーダーにテーマ対応トークンを使用してください。

```html
<div class="ha-stack" direction="vertical">
  <div part="stack" style="gap: var(--spacing-4);">
    <div style="background: var(--background-secondary); padding: var(--spacing-4); border: 1px solid var(--border-default);">
      テーマ対応アイテム
    </div>
  </div>
</div>
```

---

## 関連コンポーネント

- [Container](./container.md) - コンテナコンポーネント
- [Grid](./grid.md) - グリッドレイアウトシステム
- [Button](./button.md) - スタック内で使用するボタン

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
