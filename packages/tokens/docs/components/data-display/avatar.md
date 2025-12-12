# Avatar (アバター) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/avatar.css`
**ステータス:** ✅ 実装済み

---

## 概要

アバターコンポーネントは、ユーザーやエンティティを視覚的に表現するための画像やアイコン、イニシャルを表示する要素です。
6つのサイズ（xs, sm, md, lg, xl, 2xl）と、3つの形状（circle, rounded, square）をサポートしています。

### 用途

- ユーザープロフィール表示
- コメントやチャットのユーザーアイコン
- チームメンバーリスト
- アバターグループ（複数ユーザー表示）

---

## バリアント

### 1. 画像アバター

ユーザーの写真やプロフィール画像を表示します。

**使用場面:**
- ユーザープロフィール
- コメント投稿者
- チャットメッセージ

### 2. イニシャルアバター

ユーザー名のイニシャルを大文字で表示します。

**使用場面:**
- 画像が未設定のユーザー
- フォールバック表示
- シンプルな識別表示

### 3. アイコンアバター

アイコンを使用したアバター表示です。

**使用場面:**
- デフォルトユーザーアイコン
- システムアカウント
- 汎用的なプレースホルダー

### 4. インタラクティブアバター

クリック可能なアバターで、ホバー効果を持ちます。

**使用場面:**
- プロフィールへのリンク
- ユーザー詳細モーダルトリガー
- 選択可能なユーザーリスト

---

## サイズ

### Extra Small (xs)
- サイズ: `24px × 24px`
- フォントサイズ: `0.625rem`
- 用途: コンパクトなリスト

### Small (sm)
- サイズ: `32px × 32px`
- フォントサイズ: `0.75rem`
- 用途: インラインコメント

### Medium (md) - デフォルト
- サイズ: `40px × 40px`
- フォントサイズ: `0.875rem`
- 用途: 標準的な表示

### Large (lg)
- サイズ: `48px × 48px`
- フォントサイズ: `1rem`
- 用途: 目立たせたい表示

### Extra Large (xl)
- サイズ: `64px × 64px`
- フォントサイズ: `1.25rem`
- 用途: プロフィールページ

### 2X Large (2xl)
- サイズ: `80px × 80px`
- フォントサイズ: `1.5rem`
- 用途: ヘッダー・大型表示

---

## 形状

### Circle (circle) - デフォルト
完全な円形のアバターです。最も一般的な形状です。

### Rounded (rounded)
角が丸い四角形のアバターです。

### Square (square)
完全な四角形のアバターです。

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- 画像アバター -->
<ha-avatar size="md" shape="circle">
  <img src="/user-photo.jpg" alt="User Name" />
</ha-avatar>

<!-- イニシャルアバター -->
<ha-avatar size="md" color="primary">
  <span>JD</span>
</ha-avatar>

<!-- アイコンアバター -->
<ha-avatar size="lg" shape="rounded">
  <svg>...</svg>
</ha-avatar>

<!-- ステータス付きアバター -->
<ha-avatar size="md" status="online">
  <img src="/user.jpg" alt="User" />
</ha-avatar>

<!-- インタラクティブアバター -->
<ha-avatar size="md" interactive>
  <img src="/user.jpg" alt="User" />
</ha-avatar>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/avatar.css">
</head>
<body>
  <!-- 画像アバター -->
  <div class="ha-avatar" size="md" shape="circle">
    <div class="container">
      <img class="image" src="/user-photo.jpg" alt="User Name" />
    </div>
  </div>

  <!-- イニシャルアバター -->
  <div class="ha-avatar" size="md" color="primary">
    <div class="container">
      <span class="initials">JD</span>
    </div>
  </div>

  <!-- アイコンアバター -->
  <div class="ha-avatar" size="lg" shape="rounded">
    <div class="container">
      <div class="icon">
        <svg>...</svg>
      </div>
    </div>
  </div>

  <!-- ステータス付きアバター -->
  <div class="ha-avatar" size="md" status="online">
    <div class="container">
      <img class="image" src="/user.jpg" alt="User" />
      <div class="status"></div>
    </div>
  </div>

  <!-- インタラクティブアバター -->
  <div class="ha-avatar" size="md" interactive>
    <div class="container">
      <img class="image" src="/user.jpg" alt="User" />
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { avatarStyles, avatarHtmlStyles } from '@hidearea-design/tokens/styles/avatar';

// React例
function Avatar({ size = 'md', shape = 'circle', src, initials, children, ...props }) {
  return (
    <div className="ha-avatar" data-size={size} data-shape={shape} {...props}>
      <div className="container">
        {src ? (
          <img className="image" src={src} alt={props.alt || ''} />
        ) : initials ? (
          <span className="initials">{initials}</span>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

// 使用例
<Avatar size="md" src="/user.jpg" alt="John Doe" />
<Avatar size="lg" initials="JD" color="primary" />
<Avatar size="sm" shape="rounded" interactive />
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
  <div class="ha-avatar" size="md">
    <div class="container">
      <img class="image" src="/user.jpg" alt="User" />
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` | `md` | アバターのサイズ |
| `shape` | `circle` \| `rounded` \| `square` | `circle` | アバターの形状 |
| `color` | `default` \| `primary` \| `success` \| `warning` \| `error` \| `info` | `default` | イニシャル背景色 |
| `status` | `online` \| `offline` \| `away` \| `busy` | - | ステータスインジケーター |
| `interactive` | boolean | `false` | クリック可能な状態 |

---

## CSS変数

アバターコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### サイズ関連
- `--component-avatar-size-xs` - 24px
- `--component-avatar-size-sm` - 32px
- `--component-avatar-size-md` - 40px
- `--component-avatar-size-lg` - 48px
- `--component-avatar-size-xl` - 64px
- `--component-avatar-size-2xl` - 80px

### フォントサイズ
- `--component-avatar-fontSize-xs` - 0.625rem
- `--component-avatar-fontSize-sm` - 0.75rem
- `--component-avatar-fontSize-md` - 0.875rem
- `--component-avatar-fontSize-lg` - 1rem
- `--component-avatar-fontSize-xl` - 1.25rem
- `--component-avatar-fontSize-2xl` - 1.5rem

### 色関連
- `--component-avatar-background-default` - デフォルト背景
- `--component-avatar-background-primary` - プライマリ背景
- `--component-avatar-background-success` - 成功背景
- `--component-avatar-background-warning` - 警告背景
- `--component-avatar-background-error` - エラー背景
- `--component-avatar-background-info` - 情報背景
- `--component-avatar-text-default` - デフォルトテキスト
- `--component-avatar-text-onColor` - カラー上のテキスト

### ボーダー・形状
- `--component-avatar-borderRadius-circle` - 50% (円形)
- `--component-avatar-borderRadius-rounded` - 0.5rem (角丸)
- `--component-avatar-borderRadius-square` - 0 (四角)
- `--component-avatar-border-width` - 2px
- `--component-avatar-border-color` - ボーダー色

### ステータス
- `--component-avatar-status-background-online` - オンライン色
- `--component-avatar-status-background-offline` - オフライン色
- `--component-avatar-status-background-away` - 離席色
- `--component-avatar-status-background-busy` - 取り込み中色

### インタラクティブ
- `--component-avatar-hover-opacity` - 0.8
- `--component-avatar-hover-scale` - 1.05
- `--component-avatar-hover-transition-duration` - 200ms

---

## アクセシビリティ

- `img`要素には必ず`alt`属性を設定
- イニシャルやアイコンのみの場合は`aria-label`で説明を提供
- インタラクティブな場合は適切なロール（`button`、`link`）を使用
- キーボードでフォーカス可能にする

```html
<!-- 画像アバター -->
<div class="ha-avatar" size="md">
  <div class="container">
    <img class="image" src="/user.jpg" alt="John Doe のプロフィール写真" />
  </div>
</div>

<!-- イニシャルアバター -->
<div class="ha-avatar" size="md" role="img" aria-label="John Doe">
  <div class="container">
    <span class="initials" aria-hidden="true">JD</span>
  </div>
</div>

<!-- クリック可能なアバター -->
<button class="ha-avatar" size="md" interactive aria-label="プロフィールを表示">
  <div class="container">
    <img class="image" src="/user.jpg" alt="" />
  </div>
</button>

<!-- リンクとしてのアバター -->
<a href="/profile" class="ha-avatar" size="md" interactive>
  <div class="container">
    <img class="image" src="/user.jpg" alt="John Doe のプロフィールへ" />
  </div>
</a>
```

### キーボード操作

インタラクティブなアバターの場合:
- **Tab**: アバターにフォーカス
- **Enter/Space**: アクションを実行
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- ステータス付きアバター -->
<div class="ha-avatar" size="md" status="online" role="img" aria-label="John Doe (オンライン)">
  <div class="container">
    <img class="image" src="/user.jpg" alt="" />
    <div class="status" aria-hidden="true"></div>
  </div>
</div>

<!-- グループアバター -->
<div role="group" aria-label="チームメンバー">
  <div class="ha-avatar" size="sm"><div class="container">...</div></div>
  <div class="ha-avatar" size="sm"><div class="container">...</div></div>
  <div class="ha-avatar" size="sm"><div class="container">...</div></div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なサイズの選択**
   - コンテキストに応じて適切なサイズを使用
   - 同じコンテキストでは一貫したサイズを維持

2. **画像の最適化**
   - 適切な解像度の画像を使用（2x対応）
   - 画像の読み込みエラーに対するフォールバックを用意

3. **アクセシビリティの確保**
   - 必ず代替テキストを提供
   - インタラクティブな場合は適切なロールを設定

4. **ステータスの明確化**
   - ステータスインジケーターには適切な色を使用
   - ツールチップで詳細情報を提供

```html
<!-- 良い例: 適切なサイズとalt属性 -->
<div class="ha-avatar" size="md">
  <div class="container">
    <img class="image" src="/user.jpg" alt="John Doe" />
  </div>
</div>

<!-- 良い例: イニシャルのフォールバック -->
<div class="ha-avatar" size="md" color="primary" role="img" aria-label="John Doe">
  <div class="container">
    <span class="initials">JD</span>
  </div>
</div>

<!-- 良い例: ステータス付き -->
<div class="ha-avatar" size="md" status="online" role="img" aria-label="John Doe (オンライン)">
  <div class="container">
    <img class="image" src="/user.jpg" alt="" />
    <div class="status"></div>
  </div>
</div>
```

### ❌ 非推奨

1. **alt属性の省略**
   - アクセシビリティを損なう

2. **過度に大きい画像の使用**
   - パフォーマンスに影響

3. **コンテキストに合わないサイズ**
   - UI全体の統一感を損なう

```html
<!-- 悪い例: alt属性なし -->
<div class="ha-avatar" size="md">
  <div class="container">
    <img class="image" src="/user.jpg" />
  </div>
</div>

<!-- 悪い例: 大きすぎる画像 -->
<div class="ha-avatar" size="sm">
  <div class="container">
    <img class="image" src="/huge-photo-5000x5000.jpg" alt="User" />
  </div>
</div>

<!-- 悪い例: サイズの不統一 -->
<div style="display: flex; gap: 8px;">
  <div class="ha-avatar" size="xs"><div class="container">...</div></div>
  <div class="ha-avatar" size="lg"><div class="container">...</div></div>
  <div class="ha-avatar" size="md"><div class="container">...</div></div>
</div>
```

---

## テーマ対応

全てのアバタートークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-avatar" size="md" color="primary">
    <div class="container">
      <span class="initials">JD</span>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-avatar" size="md" color="primary">
    <div class="container">
      <span class="initials">JD</span>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Chip](./chip.md) - アバターをチップと組み合わせる
- [Badge](./badge.md) - 通知バッジとの組み合わせ
- [Card](../layout/card.md) - カード内でのユーザー表示

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)

---

**最終更新:** 2025-12-12
