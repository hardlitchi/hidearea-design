# Badge (バッジ) コンポーネント

**カテゴリ:** Data Display
**ファイル:** `src/css/components/data-display/badge.css`
**ステータス:** ✅ 実装済み

---

## 概要

Badgeコンポーネントは、ステータス、通知数、ラベルなどの小さな情報を表示するための視覚的な要素です。
3つのサイズ、6つの色バリアント、3つのスタイルバリアント（標準、アウトライン、ソフト）、
そしてPill形状やDot形状をサポートしています。

### 用途

- ステータスインジケーター（オンライン/オフライン、完了/保留中など）
- 通知カウント（未読メッセージ数など）
- ラベルやタグ
- カテゴリ表示
- アイテムの分類や状態表示

---

## バリアント

### 1. Primary (プライマリ)

ブランドカラーを使用した目立つバッジです。重要な情報や主要なステータスに使用します。

**使用場面:**
- 新機能のラベル
- プレミアムバッジ
- 重要なステータス表示

### 2. Secondary (セカンダリ)

グレー系の落ち着いた色のバッジです。一般的な情報表示に使用します。

**使用場面:**
- 通常のステータス
- カテゴリラベル
- 一般的な情報

### 3. Success (成功)

成功や完了を示すグリーン系のバッジです。

**使用場面:**
- 完了ステータス
- オンライン状態
- 承認済み表示

### 4. Warning (警告)

注意を引く必要がある情報を示すイエロー/オレンジ系のバッジです。

**使用場面:**
- 保留中ステータス
- 注意が必要な項目
- 期限が近い通知

### 5. Error (エラー)

エラーや問題を示すレッド系のバッジです。

**使用場面:**
- エラーステータス
- オフライン状態
- 却下された項目

### 6. Info (情報)

情報を示すブルー系のバッジです。

**使用場面:**
- 情報通知
- ヘルプバッジ
- 補足情報

---

## スタイルバリアント

### Standard (標準)

背景色が塗られた標準スタイルです。最も視認性が高く、デフォルトのバリアントです。

### Outlined (アウトライン)

背景が透明で枠線のみのスタイルです。控えめな表示に適しています。

### Soft (ソフト)

淡い背景色と濃いテキスト色を使用したスタイルです。柔らかい印象を与えます。

---

## サイズ

### Small (sm)
- パディング: `0.125rem 0.5rem` (2px 8px)
- フォントサイズ: `var(--font-size-xs)` (0.75rem)
- ボーダー半径: `var(--border-radius-sm)`
- 最小高さ: `1.25rem` (20px)

### Medium (md) - デフォルト
- パディング: `0.25rem 0.625rem` (4px 10px)
- フォントサイズ: `var(--font-size-sm)` (0.875rem)
- ボーダー半径: `var(--border-radius-md)`
- 最小高さ: `1.5rem` (24px)

### Large (lg)
- パディング: `0.375rem 0.75rem` (6px 12px)
- フォントサイズ: `var(--font-size-base)` (1rem)
- ボーダー半径: `var(--border-radius-md)`
- 最小高さ: `1.75rem` (28px)

---

## 特殊な形状

### Pill (ピル)

完全に角丸の形状です。より柔らかく親しみやすい印象を与えます。

- Small: `border-radius: 0.625rem` (10px)
- Medium: `border-radius: 0.75rem` (12px)
- Large: `border-radius: 0.875rem` (14px)

### Dot (ドット)

円形のインジケーターです。テキストを表示せず、色のみで状態を示します。

- Small: `0.375rem × 0.375rem` (6px × 6px)
- Medium: `0.5rem × 0.5rem` (8px × 8px)
- Large: `0.625rem × 0.625rem` (10px × 10px)

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-badge variant="primary" size="md">
  <span class="badge badge--primary badge--md">New</span>
</ha-badge>

<ha-badge variant="success" size="sm">
  <span class="badge badge--success badge--sm">完了</span>
</ha-badge>

<ha-badge variant="warning" size="lg">
  <span class="badge badge--warning badge--lg">保留中</span>
</ha-badge>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/data-display/badge.css">
</head>
<body>
  <!-- 標準バッジ -->
  <span class="ha-badge">
    <span class="badge badge--primary badge--md">
      <span class="badge__content">New</span>
    </span>
  </span>

  <!-- サイズバリエーション -->
  <span class="ha-badge">
    <span class="badge badge--success badge--sm">
      <span class="badge__content">小</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--success badge--md">
      <span class="badge__content">中</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--success badge--lg">
      <span class="badge__content">大</span>
    </span>
  </span>

  <!-- カラーバリエーション -->
  <span class="ha-badge">
    <span class="badge badge--primary badge--md">
      <span class="badge__content">Primary</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--secondary badge--md">
      <span class="badge__content">Secondary</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--success badge--md">
      <span class="badge__content">Success</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--warning badge--md">
      <span class="badge__content">Warning</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--error badge--md">
      <span class="badge__content">Error</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--info badge--md">
      <span class="badge__content">Info</span>
    </span>
  </span>

  <!-- アウトラインバリエーション -->
  <span class="ha-badge">
    <span class="badge badge--outlined badge--primary badge--md">
      <span class="badge__content">Outlined</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--outlined badge--success badge--md">
      <span class="badge__content">成功</span>
    </span>
  </span>

  <!-- ソフトバリエーション -->
  <span class="ha-badge">
    <span class="badge badge--soft badge--primary badge--md">
      <span class="badge__content">Soft</span>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--soft badge--error badge--md">
      <span class="badge__content">エラー</span>
    </span>
  </span>

  <!-- Pill形状 -->
  <span class="ha-badge">
    <span class="badge badge--pill badge--primary badge--md">
      <span class="badge__content">Pill Shape</span>
    </span>
  </span>

  <!-- Dot形状 -->
  <span class="ha-badge">
    <span class="badge badge--dot badge--success badge--md"></span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--dot badge--error badge--md"></span>
  </span>

  <!-- アイコン付きバッジ -->
  <span class="ha-badge">
    <span class="badge badge--success badge--md">
      <span class="badge__icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="badge__content">完了</span>
    </span>
  </span>

  <!-- 削除可能なバッジ -->
  <span class="ha-badge">
    <span class="badge badge--primary badge--md">
      <span class="badge__content">JavaScript</span>
      <button class="badge__remove" type="button" aria-label="削除">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </span>
  </span>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { badgeStyles } from '@hidearea-design/tokens/styles/badge';

// React例
function Badge({ variant = 'primary', size = 'md', outlined = false, soft = false, pill = false, dot = false, icon, onRemove, children }) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    outlined && 'badge--outlined',
    soft && 'badge--soft',
    pill && 'badge--pill',
    dot && 'badge--dot'
  ].filter(Boolean).join(' ');

  return (
    <span className="ha-badge">
      <span className={classes}>
        {icon && <span className="badge__icon">{icon}</span>}
        {!dot && <span className="badge__content">{children}</span>}
        {onRemove && (
          <button
            className="badge__remove"
            type="button"
            aria-label="削除"
            onClick={onRemove}
          >
            ×
          </button>
        )}
      </span>
    </span>
  );
}

// 使用例
<Badge variant="primary" size="md">New</Badge>
<Badge variant="success" size="sm" outlined>完了</Badge>
<Badge variant="warning" pill>警告</Badge>
<Badge variant="error" dot />
<Badge variant="info" icon={<CheckIcon />}>確認済み</Badge>
<Badge variant="primary" onRemove={() => console.log('removed')}>タグ</Badge>
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
  <span class="ha-badge">
    <span class="badge badge--primary badge--md">
      <span class="badge__content">New</span>
    </span>
  </span>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `primary` \| `secondary` \| `success` \| `warning` \| `error` \| `info` | `primary` | バッジの色バリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | バッジのサイズ |
| `outlined` | boolean | `false` | アウトラインスタイルを適用 |
| `soft` | boolean | `false` | ソフトスタイルを適用 |
| `pill` | boolean | `false` | Pill形状を適用 |
| `dot` | boolean | `false` | Dot形状を適用 |

---

## クラス構成

| クラス | 説明 |
|--------|------|
| `.ha-badge` | 外側のラッパークラス |
| `.badge` | 基本バッジクラス（必須） |
| `.badge--sm` | 小サイズ |
| `.badge--md` | 中サイズ（デフォルト） |
| `.badge--lg` | 大サイズ |
| `.badge--primary` | プライマリカラー |
| `.badge--secondary` | セカンダリカラー |
| `.badge--success` | 成功カラー |
| `.badge--warning` | 警告カラー |
| `.badge--error` | エラーカラー |
| `.badge--info` | 情報カラー |
| `.badge--outlined` | アウトラインスタイル |
| `.badge--soft` | ソフトスタイル |
| `.badge--pill` | Pill形状 |
| `.badge--dot` | Dot形状 |
| `.badge__content` | バッジテキストコンテンツ |
| `.badge__icon` | アイコンコンテナ |
| `.badge__remove` | 削除ボタン |

---

## CSS変数

バッジコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連

#### Primary
- `--primary-default` - プライマリカラー背景
- `--primary-default` - プライマリカラー枠線
- `white` - テキストカラー

#### Secondary
- `--foreground-secondary` - セカンダリ背景
- `--foreground-primary` - セカンダリ枠線
- `white` - テキストカラー

#### Success
- `--success-default` - 成功カラー背景
- `--success-default` - 成功カラー枠線
- `white` - テキストカラー

#### Warning
- `--warning-default` - 警告カラー背景
- `--warning-default` - 警告カラー枠線
- `white` - テキストカラー

#### Error
- `--error-default` - エラーカラー背景
- `--error-default` - エラーカラー枠線
- `white` - テキストカラー

#### Info
- `--info-default` - 情報カラー背景
- `--info-default` - 情報カラー枠線
- `white` - テキストカラー

### Outlined バリアント色

Outlinedスタイルでは背景が透明になり、枠線とテキストに色が適用されます:

- `--primary-default` - Primary文字色と枠線
- `--foreground-primary` - Secondary文字色
- `--border-default` - Secondary枠線
- `--success-default` - Success文字色と枠線
- `--warning-default` - Warning文字色と枠線
- `--error-default` - Error文字色と枠線
- `--info-default` - Info文字色と枠線

### Soft バリアント色

Softスタイルでは淡い背景と濃いテキストが適用されます（※実装では各色に対して同じトークンが使用されているため、要調整の可能性があります）:

- `--primary-default` - Primary背景・文字色・枠線
- `--background-tertiary` - Secondary背景
- `--foreground-primary` - Secondary文字色
- `--border-default` - Secondary枠線
- `--success-default` - Success背景・文字色・枠線
- `--warning-default` - Warning背景・文字色・枠線
- `--error-default` - Error背景・文字色・枠線
- `--info-default` - Info背景・文字色・枠線

### スペーシング
- `--spacing-1` - 0.25rem (アイコンとテキストの間隔)
- `--font-family-sans` - サンセリフフォント

### タイポグラフィ
- `--font-size-xs` - 0.75rem (sm)
- `--font-size-sm` - 0.875rem (md)
- `--font-size-base` - 1rem (lg)
- `--font-weight-medium` - 500

### ボーダー
- `--border-radius-sm` - 小サイズ角丸
- `--border-radius-md` - 中・大サイズ角丸
- `1px` - ボーダー幅

### アニメーション
- `--animation-duration-base` - 200ms (トランジション時間)

---

## アクセシビリティ

### セマンティックHTML

バッジは主に視覚的な情報を提供するため、適切なセマンティックHTMLを使用してください。

```html
<!-- ステータス表示の場合 -->
<span class="ha-badge">
  <span class="badge badge--success badge--md" role="status" aria-label="完了状態">
    <span class="badge__content">完了</span>
  </span>
</span>

<!-- 通知カウントの場合 -->
<button aria-label="通知 3件未読">
  <span>通知</span>
  <span class="ha-badge">
    <span class="badge badge--error badge--sm">
      <span class="badge__content">3</span>
    </span>
  </span>
</button>

<!-- Dotバッジの場合（状態を示す） -->
<div>
  <span class="ha-badge">
    <span class="badge badge--dot badge--success badge--md"
          role="img"
          aria-label="オンライン">
    </span>
  </span>
  <span>ユーザー名</span>
</div>
```

### ARIA属性

```html
<!-- ライブ通知 -->
<span class="ha-badge">
  <span class="badge badge--error badge--sm"
        role="status"
        aria-live="polite"
        aria-atomic="true">
    <span class="badge__content">5</span>
  </span>
</span>

<!-- 削除可能なバッジ -->
<span class="ha-badge">
  <span class="badge badge--primary badge--md">
    <span class="badge__content">タグ</span>
    <button class="badge__remove"
            type="button"
            aria-label="タグを削除">
      ×
    </button>
  </span>
</span>
```

### キーボード操作

削除可能なバッジの場合:

- **Tab**: 削除ボタンにフォーカス
- **Enter/Space**: 削除実行
- **Shift + Tab**: 前の要素にフォーカス

### フォーカススタイル

```css
.badge__remove:focus {
  outline: 2px solid currentColor;
  outline-offset: 1px;
  border-radius: var(--border-radius-sm);
  opacity: 1;
}

.badge__remove:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切な色の選択**
   - ステータスに応じた色を使用（成功=緑、エラー=赤など）

2. **簡潔なテキスト**
   - 短い単語や数値のみを表示

3. **一貫したサイズ**
   - 同じコンテキストでは同じサイズを使用

4. **Dotバッジの適切な使用**
   - オンライン/オフライン状態など、テキスト不要な場合に使用

```html
<!-- 適切な色の使用 -->
<span class="ha-badge">
  <span class="badge badge--success badge--sm">
    <span class="badge__content">完了</span>
  </span>
</span>

<span class="ha-badge">
  <span class="badge badge--error badge--sm">
    <span class="badge__content">エラー</span>
  </span>
</span>

<!-- ステータスインジケーター -->
<div style="display: flex; align-items: center; gap: 0.5rem;">
  <span class="ha-badge">
    <span class="badge badge--dot badge--success badge--md"></span>
  </span>
  <span>オンライン</span>
</div>

<!-- 通知数 -->
<button style="position: relative;">
  メッセージ
  <span class="ha-badge" style="position: absolute; top: -8px; right: -8px;">
    <span class="badge badge--error badge--sm">
      <span class="badge__content">5</span>
    </span>
  </span>
</button>
```

### ❌ 非推奨

1. **長いテキストの使用**
   - バッジは短い情報のみ

2. **不適切な色の使用**
   - 成功にエラーカラーを使用するなど

3. **過度な使用**
   - 1つの要素に複数のバッジを配置しない

```html
<!-- 長すぎるテキスト -->
<span class="ha-badge">
  <span class="badge badge--primary badge--md">
    <span class="badge__content">この長いテキストはバッジには適していません</span>
  </span>
</span>

<!-- 不適切な色の使用 -->
<span class="ha-badge">
  <span class="badge badge--error badge--md">
    <span class="badge__content">成功</span>
  </span>
</span>

<!-- 複数バッジの乱用 -->
<div>
  <span class="ha-badge">
    <span class="badge badge--primary badge--sm">
      <span class="badge__content">New</span>
    </span>
  </span>
  <span class="ha-badge">
    <span class="badge badge--success badge--sm">
      <span class="badge__content">Hot</span>
    </span>
  </span>
  <span class="ha-badge">
    <span class="badge badge--warning badge--sm">
      <span class="badge__content">Sale</span>
    </span>
  </span>
  商品名
</div>
```

---

## 実装例

### 通知バッジ

```html
<style>
.notification-container {
  position: relative;
  display: inline-block;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
}
</style>

<div class="notification-container">
  <button type="button">
    <svg width="24" height="24" viewBox="0 0 24 24">
      <!-- ベルアイコン -->
    </svg>
  </button>
  <span class="ha-badge notification-badge">
    <span class="badge badge--error badge--sm">
      <span class="badge__content">12</span>
    </span>
  </span>
</div>
```

### ユーザーステータス

```html
<style>
.user-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  flex-shrink: 0;
}
</style>

<div class="user-status">
  <span class="ha-badge status-dot">
    <span class="badge badge--dot badge--success badge--md"
          role="img"
          aria-label="オンライン">
    </span>
  </span>
  <span>田中 太郎</span>
</div>

<div class="user-status">
  <span class="ha-badge status-dot">
    <span class="badge badge--dot badge--error badge--md"
          role="img"
          aria-label="オフライン">
    </span>
  </span>
  <span>佐藤 花子</span>
</div>
```

### タグ/ラベル

```html
<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
  <span class="ha-badge">
    <span class="badge badge--pill badge--primary badge--sm">
      <span class="badge__content">JavaScript</span>
      <button class="badge__remove" type="button" aria-label="JavaScriptタグを削除">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--pill badge--primary badge--sm">
      <span class="badge__content">React</span>
      <button class="badge__remove" type="button" aria-label="Reactタグを削除">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </span>
  </span>

  <span class="ha-badge">
    <span class="badge badge--pill badge--primary badge--sm">
      <span class="badge__content">TypeScript</span>
      <button class="badge__remove" type="button" aria-label="TypeScriptタグを削除">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </span>
  </span>
</div>

<script>
document.querySelectorAll('.badge__remove').forEach(button => {
  button.addEventListener('click', (e) => {
    const badge = button.closest('.ha-badge');
    if (badge) {
      badge.style.opacity = '0';
      badge.style.transform = 'scale(0.8)';
      badge.style.transition = 'opacity 200ms ease, transform 200ms ease';
      setTimeout(() => badge.remove(), 200);
    }
  });
});
</script>
```

### ステータスバッジ付きカード

```html
<div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; max-width: 300px;">
  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
    <h3 style="margin: 0; font-size: 1.125rem;">プロジェクト名</h3>
    <span class="ha-badge">
      <span class="badge badge--success badge--sm">
        <span class="badge__content">進行中</span>
      </span>
    </span>
  </div>
  <p style="color: #6b7280; margin: 0;">プロジェクトの説明文...</p>
</div>

<div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; max-width: 300px; margin-top: 1rem;">
  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
    <h3 style="margin: 0; font-size: 1.125rem;">完了したタスク</h3>
    <span class="ha-badge">
      <span class="badge badge--outlined badge--success badge--sm">
        <span class="badge__icon">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="badge__content">完了</span>
      </span>
    </span>
  </div>
  <p style="color: #6b7280; margin: 0;">タスクの説明文...</p>
</div>
```

### 動的バッジの生成

```javascript
function createBadge(text, options = {}) {
  const {
    variant = 'primary',
    size = 'md',
    outlined = false,
    soft = false,
    pill = false,
    dot = false,
    icon = null,
    removable = false,
    onRemove = null
  } = options;

  // 外側のコンテナ
  const container = document.createElement('span');
  container.className = 'ha-badge';

  // バッジ要素
  const badge = document.createElement('span');
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    outlined && 'badge--outlined',
    soft && 'badge--soft',
    pill && 'badge--pill',
    dot && 'badge--dot'
  ].filter(Boolean);
  badge.className = classes.join(' ');

  // アイコン
  if (icon && !dot) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'badge__icon';
    iconSpan.innerHTML = icon;
    badge.appendChild(iconSpan);
  }

  // コンテンツ
  if (!dot) {
    const content = document.createElement('span');
    content.className = 'badge__content';
    content.textContent = text;
    badge.appendChild(content);
  }

  // 削除ボタン
  if (removable && !dot) {
    const removeBtn = document.createElement('button');
    removeBtn.className = 'badge__remove';
    removeBtn.type = 'button';
    removeBtn.setAttribute('aria-label', `${text}を削除`);
    removeBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;

    removeBtn.addEventListener('click', () => {
      if (onRemove) {
        onRemove(container, text);
      } else {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.8)';
        container.style.transition = 'opacity 200ms ease, transform 200ms ease';
        setTimeout(() => container.remove(), 200);
      }
    });

    badge.appendChild(removeBtn);
  }

  container.appendChild(badge);
  return container;
}

// 使用例
const container = document.getElementById('badge-container');

// 基本バッジ
container.appendChild(createBadge('New', {
  variant: 'primary',
  size: 'sm'
}));

// アウトラインバッジ
container.appendChild(createBadge('完了', {
  variant: 'success',
  size: 'md',
  outlined: true,
  icon: '<svg width="14" height="14"><path d="M11 4L5 10L2 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>'
}));

// 削除可能なPillバッジ
container.appendChild(createBadge('JavaScript', {
  variant: 'primary',
  size: 'sm',
  pill: true,
  removable: true,
  onRemove: (element, text) => {
    console.log(`${text} を削除しました`);
    element.remove();
  }
}));

// Dotバッジ
container.appendChild(createBadge('', {
  variant: 'success',
  size: 'md',
  dot: true
}));
```

---

## テーマ対応

全てのバッジトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <span class="ha-badge">
    <span class="badge badge--primary badge--md">
      <span class="badge__content">New</span>
    </span>
  </span>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <span class="ha-badge">
    <span class="badge badge--primary badge--md">
      <span class="badge__content">New</span>
    </span>
  </span>
</html>
```

---

## 関連コンポーネント

- [Chip](./chip.md) - より大きく、インタラクティブなラベル
- [Avatar](./avatar.md) - ユーザーアバターにバッジを組み合わせる
- [Button](../layout/button.md) - ボタンと組み合わせて通知を表示
- [Card](./card.md) - カードにステータスバッジを追加

---

## バリエーションギャラリー

### サイズ比較

```html
<!-- Small -->
<span class="ha-badge">
  <span class="badge badge--primary badge--sm">
    <span class="badge__content">小</span>
  </span>
</span>

<!-- Medium -->
<span class="ha-badge">
  <span class="badge badge--primary badge--md">
    <span class="badge__content">中</span>
  </span>
</span>

<!-- Large -->
<span class="ha-badge">
  <span class="badge badge--primary badge--lg">
    <span class="badge__content">大</span>
  </span>
</span>
```

### カラー比較

```html
<span class="ha-badge">
  <span class="badge badge--primary badge--md">
    <span class="badge__content">Primary</span>
  </span>
</span>

<span class="ha-badge">
  <span class="badge badge--secondary badge--md">
    <span class="badge__content">Secondary</span>
  </span>
</span>

<span class="ha-badge">
  <span class="badge badge--success badge--md">
    <span class="badge__content">Success</span>
  </span>
</span>

<span class="ha-badge">
  <span class="badge badge--warning badge--md">
    <span class="badge__content">Warning</span>
  </span>
</span>

<span class="ha-badge">
  <span class="badge badge--error badge--md">
    <span class="badge__content">Error</span>
  </span>
</span>

<span class="ha-badge">
  <span class="badge badge--info badge--md">
    <span class="badge__content">Info</span>
  </span>
</span>
```

### スタイル比較

```html
<!-- Standard -->
<span class="ha-badge">
  <span class="badge badge--primary badge--md">
    <span class="badge__content">Standard</span>
  </span>
</span>

<!-- Outlined -->
<span class="ha-badge">
  <span class="badge badge--outlined badge--primary badge--md">
    <span class="badge__content">Outlined</span>
  </span>
</span>

<!-- Soft -->
<span class="ha-badge">
  <span class="badge badge--soft badge--primary badge--md">
    <span class="badge__content">Soft</span>
  </span>
</span>

<!-- Pill -->
<span class="ha-badge">
  <span class="badge badge--pill badge--primary badge--md">
    <span class="badge__content">Pill</span>
  </span>
</span>

<!-- Dot -->
<span class="ha-badge">
  <span class="badge badge--dot badge--primary badge--md"></span>
</span>
```

---

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 変更履歴

- **Phase 4 (2025-12)**: 初回実装
  - 3つのサイズバリアント (sm, md, lg)
  - 6つの色バリアント (primary, secondary, success, warning, error, info)
  - 3つのスタイルバリアント (標準, outlined, soft)
  - Pill形状とDot形状のサポート
  - アイコンサポート
  - 削除可能なバッジ機能
  - トランジションアニメーション
  - アクセシビリティ対応

---

**最終更新:** 2025-12-12
