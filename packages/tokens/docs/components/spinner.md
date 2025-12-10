# Spinner (ローディングスピナー) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/components/feedback/spinner.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

スピナーコンポーネントは、処理中またはデータ読み込み中であることを示す回転アニメーションです。シンプルで汎用的なローディング表示に適しています。

### 用途

- API リクエスト中
- ボタン内のローディング
- ページ遷移中
- データ同期中
- 短時間の処理待ち

---

## サイズバリアント

### Small (小)
**サイズ:** 16px
**ストローク:** 2px
**用途:** ボタン内、インライン表示

### Default (デフォルト)
**サイズ:** 24px
**ストローク:** 3px
**用途:** 一般的なローディング

### Large (大)
**サイズ:** 32px
**ストローク:** 4px
**用途:** カード、セクション

### XLarge (特大)
**サイズ:** 48px
**ストローク:** 5px
**用途:** 全画面ローディング、メイン表示

---

## 色バリアント

### Default (プライマリー)
通常のローディング状態。
**トークン:** `component.spinner.color.default`

### Inverse (反転)
ダークボタン上での使用。
**トークン:** `component.spinner.color.inverse`

### Success (成功)
成功状態の処理中。
**トークン:** `component.spinner.color.success`

### Warning (警告)
警告を伴う処理中。
**トークン:** `component.spinner.color.warning`

### Error (エラー)
エラー処理中（再試行など）。
**トークン:** `component.spinner.color.error`

### Info (情報)
情報の読み込み中。
**トークン:** `component.spinner.color.info`

### Subdued (控えめ)
目立たせたくない場合。
**トークン:** `component.spinner.color.subdued`

---

## 主要トークン

### サイズ
- `size.small/default/large/xlarge`
- `strokeWidth.small/default/large/xlarge`

### 色
- `color.*` - スピナーの色
- `track.color.default/inverse` - トラック色
- `track.opacity` - 0.25

### アニメーション
- `animation.duration` - 0.6s
- `animation.timing` - linear
- `animation.iterations` - infinite

---

## 使用例

### HTML

```html
<!-- 基本的なスピナー -->
<div class="spinner"></div>

<!-- サイズバリアント -->
<div class="spinner spinner-small"></div>
<div class="spinner spinner-large"></div>

<!-- 色バリアント -->
<div class="spinner spinner-success"></div>
<div class="spinner spinner-error"></div>

<!-- ラベル付き -->
<div class="spinner-container">
  <div class="spinner"></div>
  <span class="spinner-label">読み込み中...</span>
</div>
```

### React

```tsx
interface SpinnerProps {
  size?: 'small' | 'default' | 'large' | 'xlarge';
  color?: 'default' | 'inverse' | 'success' | 'warning' | 'error' | 'info' | 'subdued';
  label?: string;
  inline?: boolean;
}

export function Spinner({
  size = 'default',
  color = 'default',
  label,
  inline = false
}: SpinnerProps) {
  const className = [
    'spinner',
    size !== 'default' && `spinner-${size}`,
    color !== 'default' && `spinner-${color}`,
    inline && 'spinner-inline'
  ].filter(Boolean).join(' ');

  if (!label) {
    return (
      <div
        className={className}
        role="status"
        aria-label="読み込み中"
      />
    );
  }

  return (
    <div className="spinner-container">
      <div className={className} role="status" aria-hidden="true" />
      <span className="spinner-label">{label}</span>
    </div>
  );
}

// ボタン内での使用
<button disabled>
  <Spinner size="small" color="inverse" inline />
  <span>処理中...</span>
</button>
```

---

## アクセシビリティ

- **role="status"** - ステータス更新を示す
- **aria-label="読み込み中"** - スクリーンリーダー用
- **aria-live="polite"** - 更新を通知

```html
<div
  className="spinner"
  role="status"
  aria-label="データを読み込んでいます"
  aria-live="polite"
/>
```

ラベルがある場合：

```html
<div className="spinner-container" role="status">
  <div className="spinner" aria-hidden="true" />
  <span>読み込み中...</span>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

- 適切なサイズ選択
- ラベルで状況説明
- aria 属性の使用
- 読み込み完了後は即座に削除
- インラインスピナーは小サイズ

### ❌ 非推奨

- 複数のスピナーを同時表示
- 長時間（30秒以上）表示
- ラベルなしで長時間表示
- 不必要に大きいサイズ
- 過度なアニメーション

---

## パターン

### ボタン内ローディング

```tsx
function LoadingButton({ onClick, loading, children }) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading && <Spinner size="small" color="inverse" inline />}
      {children}
    </button>
  );
}
```

### 全画面オーバーレイ

```tsx
function LoadingOverlay({ show }) {
  if (!show) return null;

  return (
    <div className="spinner-overlay">
      <Spinner size="xlarge" label="読み込み中..." />
    </div>
  );
}

// CSS
.spinner-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--component-spinner-overlay-background);
  backdrop-filter: var(--component-spinner-overlay-backdrop-filter);
}
```

### インラインスピナー

```tsx
<p>
  データを更新中
  <Spinner size="small" inline />
</p>
```

---

## スタイルバリエーション

### ドットスピナー（代替）

3つのドットが順番にアニメーション：

```tsx
function DotsSpinner() {
  return (
    <div className="spinner-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
```

### パルススピナー（代替）

拡大縮小するアニメーション：

```tsx
function PulseSpinner() {
  return <div className="spinner-pulse" />;
}
```

---

## テーマ対応

スピナーの色はテーマに応じて自動調整：

```css
[data-theme="light"] {
  --component-spinner-color-default: var(--primary-default);
  --component-spinner-track-color-default: var(--border-default);
}

[data-theme="dark"] {
  --component-spinner-color-default: var(--primary-default);
  --component-spinner-track-color-default: var(--border-default);
}
```

---

## Spinner vs Skeleton vs Progress

### Spinner を使用する場合
- 短時間の処理（< 3秒）
- 進捗が不明
- ボタン内ローディング
- シンプルな待機表示

### Skeleton を使用する場合
- コンテンツの形状が既知
- 初期ページ読み込み
- リスト・カードの読み込み
- UX を向上させたい

### Progress を使用する場合
- 進捗が明確
- ファイルアップロード
- 長時間の処理
- パーセンテージ表示が必要

---

## 関連コンポーネント

- [Progress](./progress.md) - 進捗バー
- [Skeleton](./skeleton.md) - コンテンツプレースホルダー
- [Toast](./toast.md) - 完了通知

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
