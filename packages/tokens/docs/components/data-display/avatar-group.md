# Avatar Group (アバターグループ) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/avatar-group.css`
**ステータス:** ✅ 実装済み

---

## 概要

Avatar Groupコンポーネントは、複数のアバターを視覚的にグループ化して表示するためのコンポーネントです。
チームメンバー、参加者リスト、共同編集者などを表示する際に使用します。
3つのレイアウト（stack, grid, list）と、最大表示数制限機能（+3など）をサポートしています。

### 用途

- チームメンバーの一覧表示
- ドキュメントの共同編集者表示
- イベントの参加者リスト
- プロジェクトのアサイン表示
- ソーシャルメディアの「いいね」ユーザー表示

---

## レイアウトバリアント

### 1. Stack (スタック) - デフォルト

アバターを重ねて表示するレイアウトです。最もコンパクトで、多くのアバターを省スペースで表示できます。

**特徴:**
- アバターが30%重なり合う
- 右から左へ逆順に配置（最後のアバターが最前面）
- ホバー時に上に浮き上がるアニメーション
- 白い境界線とシャドウで各アバターを区別

**使用場面:**
- スペースが限られている場合
- 多数のメンバーを表示する場合
- ツールバーやヘッダーでの表示

### 2. Grid (グリッド)

アバターをグリッド状に配置するレイアウトです。各アバターが独立して表示されます。

**特徴:**
- 8pxの間隔で配置
- 折り返し表示に対応
- 各アバターが重ならない
- クリーンで読みやすい

**使用場面:**
- 詳細なメンバー一覧
- プロフィールページ
- ダッシュボード

### 3. List (リスト)

アバターを水平方向に並べて表示するレイアウトです。

**特徴:**
- 8pxの間隔で配置
- 折り返しなし
- シンプルで直線的

**使用場面:**
- ナビゲーションバー
- 横長のスペース
- 少数のメンバー表示

---

## サイズバリアント

Avatar Groupコンポーネントは、子要素のAvatarと連携して以下のサイズをサポートしています：

| サイズ | アバター直径 | フォントサイズ | 用途 |
|--------|-------------|---------------|------|
| `xs` | 24px | 10px | アイコンサイズ、コンパクト表示 |
| `sm` | 32px | 12px | リスト内、ツールバー |
| `md` | 40px | 14px | 標準サイズ（デフォルト） |
| `lg` | 48px | 16px | カード、プロフィール |
| `xl` | 64px | 20px | ヘッダー、大きな表示 |
| `2xl` | 96px | 28px | メインプロフィール |

---

## Max表示機能

多数のアバターがある場合、最大表示数を制限し、残りを"+N"のインジケーターで表示できます。

**機能:**
- 指定数を超えるアバターを非表示
- 残りの数を表示（例: +3, +12）
- max-indicatorクラスで自動スタイリング
- レイアウトに応じた配置調整

---

## 使用方法

### Pattern 1: Stack Layout (推奨)

```html
<div class="ha-avatar-group" layout="stack" size="md">
  <div class="container">
    <div class="ha-avatar" size="md">
      <img src="/user1.jpg" alt="ユーザー1" class="avatar-image">
    </div>
    <div class="ha-avatar" size="md">
      <img src="/user2.jpg" alt="ユーザー2" class="avatar-image">
    </div>
    <div class="ha-avatar" size="md">
      <img src="/user3.jpg" alt="ユーザー3" class="avatar-image">
    </div>
    <div class="max-indicator">+5</div>
  </div>
</div>
```

### Pattern 2: Grid Layout

```html
<div class="ha-avatar-group" layout="grid" size="sm">
  <div class="container">
    <div class="ha-avatar" size="sm">
      <div class="avatar-initials">AB</div>
    </div>
    <div class="ha-avatar" size="sm">
      <div class="avatar-initials">CD</div>
    </div>
    <div class="ha-avatar" size="sm">
      <div class="avatar-initials">EF</div>
    </div>
    <div class="ha-avatar" size="sm">
      <div class="avatar-initials">GH</div>
    </div>
  </div>
</div>
```

### Pattern 3: List Layout

```html
<div class="ha-avatar-group" layout="list" size="lg">
  <div class="container">
    <div class="ha-avatar" size="lg" color="primary">
      <div class="avatar-initials">JK</div>
    </div>
    <div class="ha-avatar" size="lg" color="success">
      <div class="avatar-initials">LM</div>
    </div>
    <div class="ha-avatar" size="lg" color="warning">
      <div class="avatar-initials">NO</div>
    </div>
  </div>
</div>
```

### Pattern 4: Max表示付きStackレイアウト

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/avatar.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/avatar-group.css">
</head>
<body>
  <div class="ha-avatar-group" layout="stack" size="md">
    <div class="container">
      <!-- 最初の3人を表示 -->
      <div class="ha-avatar" size="md">
        <img src="/user1.jpg" alt="山田太郎" class="avatar-image">
      </div>
      <div class="ha-avatar" size="md">
        <img src="/user2.jpg" alt="佐藤花子" class="avatar-image">
      </div>
      <div class="ha-avatar" size="md">
        <img src="/user3.jpg" alt="鈴木一郎" class="avatar-image">
      </div>
      <!-- 残りの人数を表示 -->
      <div class="max-indicator">+12</div>
    </div>
  </div>
</body>
</html>
```

### Pattern 5: React/Vue での使用

```jsx
// React例
function AvatarGroup({ users, max = 5, layout = 'stack', size = 'md' }) {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className="ha-avatar-group" layout={layout} size={size}>
      <div className="container">
        {visibleUsers.map((user) => (
          <div key={user.id} className="ha-avatar" size={size}>
            <img
              src={user.avatar}
              alt={user.name}
              className="avatar-image"
            />
          </div>
        ))}
        {remainingCount > 0 && (
          <div className="max-indicator">+{remainingCount}</div>
        )}
      </div>
    </div>
  );
}

// 使用例
<AvatarGroup
  users={teamMembers}
  max={4}
  layout="stack"
  size="md"
/>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `layout` | `stack` \| `grid` \| `list` | `stack` | レイアウトタイプ |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` | `md` | アバターのサイズ（子要素に適用） |

---

## CSS変数

Avatar Groupコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### サイズ関連
- `--avatar-size` - アバターのサイズ（各サイズバリアントで設定）
- `--avatar-font-size` - max-indicatorのフォントサイズ

### 色関連
- `--foreground-inverse` - 境界線の色
- `--background-tertiary` - max-indicatorの背景色
- `--border-default` - シャドウの色
- `--foreground-secondary` - max-indicatorのテキスト色

### スペーシング
- `--spacing-2` (8px) - grid/listレイアウトのギャップ

### アニメーション
- `--duration-fast` (150ms) - ホバーアニメーションの時間
- `--ease-out` - イージング関数

### カスタマイズ例

```css
/* 重なりの調整 */
.ha-avatar-group[layout="stack"] ::slotted(*) {
  margin-left: calc(var(--avatar-size, 40px) * -0.4); /* より重なる */
}

/* ギャップの調整 */
.ha-avatar-group[layout="grid"] .container {
  gap: var(--spacing-4, 16px); /* より広い間隔 */
}

/* max-indicatorのカスタマイズ */
.max-indicator {
  background: var(--primary-default);
  color: var(--foreground-inverse);
  font-weight: 600;
}
```

---

## アクセシビリティ

### セマンティックHTML

```html
<!-- チーム表示の場合 -->
<div class="ha-avatar-group" layout="stack" size="md" role="group" aria-label="チームメンバー">
  <div class="container">
    <div class="ha-avatar" size="md">
      <img src="/user1.jpg" alt="山田太郎" class="avatar-image">
    </div>
    <div class="ha-avatar" size="md">
      <img src="/user2.jpg" alt="佐藤花子" class="avatar-image">
    </div>
    <div class="max-indicator" aria-label="他12名のメンバー">+12</div>
  </div>
</div>
```

### インタラクティブな場合

```html
<div class="ha-avatar-group" layout="stack" size="md" role="list" aria-label="参加者一覧">
  <div class="container">
    <button class="ha-avatar" size="md" aria-label="山田太郎のプロフィールを表示">
      <img src="/user1.jpg" alt="" class="avatar-image">
    </button>
    <button class="ha-avatar" size="md" aria-label="佐藤花子のプロフィールを表示">
      <img src="/user2.jpg" alt="" class="avatar-image">
    </button>
    <button class="max-indicator" aria-label="残り12名を表示">+12</button>
  </div>
</div>
```

### ARIA属性

```html
<!-- ツールチップ付き -->
<div class="ha-avatar-group" layout="stack" size="sm">
  <div class="container">
    <div
      class="ha-avatar"
      size="sm"
      aria-describedby="user1-tooltip"
      tabindex="0"
    >
      <img src="/user1.jpg" alt="ユーザー1" class="avatar-image">
    </div>
    <div id="user1-tooltip" role="tooltip" hidden>
      山田太郎 - プロジェクトマネージャー
    </div>
  </div>
</div>
```

### キーボード操作

インタラクティブな場合:
- **Tab**: 各アバターにフォーカス
- **Enter/Space**: アバターをクリック
- **Shift + Tab**: 前の要素にフォーカス

---

## ベストプラクティス

### ✅ 推奨

1. **適切なレイアウトの選択**
   - 省スペース: Stackレイアウト
   - 詳細表示: GridまたはListレイアウト

2. **Max表示の使用**
   - 4-5個以上のアバターがある場合はmax表示を使用
   - 残りの数を明確に表示

3. **一貫したサイズ**
   - グループ内の全アバターを同じサイズに
   - サイズ属性をグループレベルで指定

4. **適切なalt属性**
   - 各アバターに意味のあるalt属性を追加
   - ユーザー名や役割を含める

```html
<!-- 良い例: 一貫したサイズとalt属性 -->
<div class="ha-avatar-group" layout="stack" size="md" role="group" aria-label="プロジェクトチーム">
  <div class="container">
    <div class="ha-avatar" size="md">
      <img src="/user1.jpg" alt="山田太郎 - プロジェクトマネージャー" class="avatar-image">
    </div>
    <div class="ha-avatar" size="md">
      <img src="/user2.jpg" alt="佐藤花子 - デザイナー" class="avatar-image">
    </div>
    <div class="ha-avatar" size="md">
      <img src="/user3.jpg" alt="鈴木一郎 - エンジニア" class="avatar-image">
    </div>
    <div class="max-indicator" aria-label="他8名のメンバー">+8</div>
  </div>
</div>

<!-- 良い例: GridレイアウトでMax表示 -->
<div class="ha-avatar-group" layout="grid" size="sm">
  <div class="container">
    <div class="ha-avatar" size="sm" color="primary">
      <div class="avatar-initials">YT</div>
    </div>
    <div class="ha-avatar" size="sm" color="success">
      <div class="avatar-initials">SH</div>
    </div>
    <div class="ha-avatar" size="sm" color="warning">
      <div class="avatar-initials">SI</div>
    </div>
    <div class="max-indicator">+15</div>
  </div>
</div>
```

### ❌ 非推奨

1. **異なるサイズの混在**
   - グループ内でサイズが異なると不統一に見える

2. **多すぎるアバター表示**
   - Max表示を使わず10個以上表示すると煩雑

3. **alt属性の欠如**
   - アクセシビリティが低下

4. **不適切なレイアウト選択**
   - 狭いスペースでGridレイアウトを使用

```html
<!-- サイズが不統一 -->
<div class="ha-avatar-group" layout="stack">
  <div class="container">
    <div class="ha-avatar" size="sm">
      <img src="/user1.jpg" alt="ユーザー1" class="avatar-image">
    </div>
    <div class="ha-avatar" size="lg">
      <img src="/user2.jpg" alt="ユーザー2" class="avatar-image">
    </div>
  </div>
</div>

<!-- Max表示なしで多数のアバター -->
<div class="ha-avatar-group" layout="stack" size="xs">
  <div class="container">
    <!-- 15個のアバター... -->
  </div>
</div>

<!-- alt属性なし -->
<div class="ha-avatar-group" layout="list" size="md">
  <div class="container">
    <div class="ha-avatar" size="md">
      <img src="/user1.jpg" alt="" class="avatar-image">
    </div>
  </div>
</div>
```

---

## バリエーション

### インタラクティブなAvatar Group

```html
<div class="ha-avatar-group" layout="stack" size="md">
  <div class="container">
    <button class="ha-avatar" size="md" onclick="showProfile('user1')">
      <img src="/user1.jpg" alt="山田太郎" class="avatar-image">
    </button>
    <button class="ha-avatar" size="md" onclick="showProfile('user2')">
      <img src="/user2.jpg" alt="佐藤花子" class="avatar-image">
    </button>
    <button class="max-indicator" onclick="showAllMembers()">+8</button>
  </div>
</div>
```

### ステータス付きAvatar Group

```html
<div class="ha-avatar-group" layout="list" size="lg">
  <div class="container">
    <div class="ha-avatar" size="lg" status="online">
      <img src="/user1.jpg" alt="山田太郎（オンライン）" class="avatar-image">
      <span class="status"></span>
    </div>
    <div class="ha-avatar" size="lg" status="away">
      <img src="/user2.jpg" alt="佐藤花子（離席中）" class="avatar-image">
      <span class="status"></span>
    </div>
    <div class="ha-avatar" size="lg" status="offline">
      <img src="/user3.jpg" alt="鈴木一郎（オフライン）" class="avatar-image">
      <span class="status"></span>
    </div>
  </div>
</div>
```

### アニメーション付きStack

```css
/* カスタムアニメーション */
.ha-avatar-group[layout="stack"] ::slotted(*) {
  transition:
    transform var(--duration-fast) var(--ease-out),
    z-index 0s var(--duration-fast);
}

.ha-avatar-group[layout="stack"] ::slotted(*:hover) {
  transform: translateY(-4px) scale(1.05);
  z-index: 100;
  transition:
    transform var(--duration-fast) var(--ease-out),
    z-index 0s 0s;
}
```

---

## レスポンシブ対応

```html
<!-- モバイルではリスト、デスクトップではスタック -->
<div class="ha-avatar-group responsive-layout" layout="stack" size="sm">
  <div class="container">
    <!-- アバター... -->
  </div>
</div>

<style>
@media (max-width: 640px) {
  .ha-avatar-group.responsive-layout {
    /* モバイルではリストレイアウトに切り替え */
  }

  .ha-avatar-group.responsive-layout[layout="stack"] .container {
    flex-direction: row;
  }

  .ha-avatar-group.responsive-layout[layout="stack"] ::slotted(*) {
    margin-left: 0;
    margin-right: var(--spacing-2);
  }
}
</style>
```

---

## テーマ対応

全てのトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-avatar-group" layout="stack" size="md">
    <div class="container">
      <!-- アバター... -->
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-avatar-group" layout="stack" size="md">
    <div class="container">
      <!-- アバター... -->
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Avatar](./avatar.md) - 個別のアバターコンポーネント
- [Badge](./badge.md) - ステータスや通知表示
- [Card](./card.md) - アバターグループを含むカード表示
- [Tooltip](../overlays/tooltip.md) - アバターにツールチップを追加

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
