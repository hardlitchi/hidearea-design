# Skeleton (スケルトンローダー) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/components/feedback/skeleton.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

スケルトンコンポーネントは、コンテンツ読み込み中のプレースホルダーを表示します。実際のコンテンツの形状を模倣し、体感待ち時間を短縮します。

### 用途

- ページ初期読み込み
- 無限スクロール
- 遅延読み込みコンテンツ
- API データ取得中
- 画像読み込み待機

---

## バリアント

### Text (テキスト)
**高さ:** 16px (default), 14px (small), 20px (large)
**用途:** 段落、リスト項目

### Heading (見出し)
**高さ:** H1: 32px, H2: 28px, H3: 24px, H4: 20px
**用途:** タイトル、見出し

### Avatar (アバター)
**サイズ:** 32px (small), 40px (default), 64px (large)
**形状:** 円形
**用途:** ユーザーアイコン

### Image (画像)
**最小高さ:** 128px
**縦横比:** 16:9, 1:1, 3:4
**用途:** サムネイル、ヒーロー画像

### Button (ボタン)
**高さ:** 32px (small), 40px (default), 48px (large)
**幅:** 96px (small), 128px (default), 160px (large)

### Card (カード)
複数要素の組み合わせ

### List (リスト)
**アイテム高さ:** 48px
**間隔:** 8px

---

## アニメーション

### Pulse (パルス)
不透明度が変化するアニメーション。

**トークン:**
- `pulse.duration` - 1.5s
- `pulse.timing` - ease-in-out
- `pulse.opacity.start/middle/end` - 1 / 0.5 / 1

### Wave (ウェーブ)
左から右に流れるグラデーション。

**トークン:**
- `wave.duration` - 1.5s
- `wave.gradient.start/middle/end`

---

## 主要トークン

### 基本スタイル
- `background.base` - ベース背景色
- `background.highlight` - ハイライト色

### 角丸
- `borderRadius.default` - 6px (通常)
- `borderRadius.small` - 4px
- `borderRadius.large` - 8px
- `borderRadius.full` - 完全な円形

---

## 使用例

### HTML

```html
<!-- テキストスケルトン -->
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-text" style="width: 80%"></div>
<div class="skeleton skeleton-text" style="width: 60%"></div>

<!-- カードスケルトン -->
<div class="skeleton-card">
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton skeleton-heading"></div>
  <div class="skeleton skeleton-text"></div>
  <div class="skeleton skeleton-text" style="width: 90%"></div>
  <div class="skeleton skeleton-button"></div>
</div>

<!-- アバター + テキスト -->
<div class="skeleton-demo">
  <div class="skeleton skeleton-avatar"></div>
  <div class="skeleton-content">
    <div class="skeleton skeleton-text" style="width: 60%"></div>
    <div class="skeleton skeleton-text" style="width: 40%"></div>
  </div>
</div>
```

### React

```tsx
interface SkeletonProps {
  variant?: 'text' | 'heading' | 'avatar' | 'image' | 'button' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  count?: number;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  count = 1
}: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`skeleton skeleton-${variant} skeleton-${animation}`}
      style={{
        ...(width && { width }),
        ...(height && { height })
      }}
    />
  ));

  return count > 1 ? <div className="skeleton-group">{skeletons}</div> : skeletons[0];
}

// 使用例
<Skeleton variant="text" count={3} />
<Skeleton variant="avatar" />
<Skeleton variant="image" width="100%" height="200px" />
```

---

## アクセシビリティ

- **aria-busy="true"** - 読み込み中を示す
- **aria-label="読み込み中"** - スクリーンリーダー用
- **role="status"** - ステータス更新を通知

```html
<div
  className="skeleton-container"
  aria-busy="true"
  aria-label="コンテンツを読み込んでいます"
  role="status"
>
  <div className="skeleton skeleton-text"></div>
  <div className="skeleton skeleton-text"></div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

- 実際のコンテンツの形状に合わせる
- 適切なアニメーション選択
- 読み込み完了後は即座に置換
- 複数行のテキストは適切に配置
- パフォーマンスに配慮

### ❌ 非推奨

- 長時間表示し続ける
- 実際のレイアウトと大きく異なる
- アニメーションが激しすぎる
- エラー時もスケルトン表示
- 小さすぎる要素

---

## パターン

### リストアイテム

```tsx
function SkeletonListItem() {
  return (
    <div className="skeleton-list-item">
      <Skeleton variant="avatar" />
      <div className="skeleton-content">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}
```

### カードグリッド

```tsx
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton variant="image" height="200px" />
      <div className="skeleton-card-body">
        <Skeleton variant="heading" />
        <Skeleton variant="text" count={2} />
        <Skeleton variant="button" />
      </div>
    </div>
  );
}
```

---

## テーマ対応

スケルトンカラーはテーマに応じて自動調整されます：

```yaml
# ライトテーマ
skeleton.background.base: "{background.secondary}"  # 薄いグレー

# ダークテーマ
skeleton.background.base: "{background.secondary}"  # 濃いグレー
```

---

## 関連コンポーネント

- [Spinner](./spinner.md) - シンプルなローディング
- [Progress](./progress.md) - 進捗表示

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
