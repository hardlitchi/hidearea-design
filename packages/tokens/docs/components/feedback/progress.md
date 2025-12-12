# Progress (プログレスバー) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/components/feedback/progress.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

プログレスコンポーネントは、タスクやプロセスの進行状況を視覚的に表示します。線形バーまたは円形で進捗を示します。

### 用途

- ファイルアップロードの進捗
- フォーム完了度の表示
- ページ読み込み状態
- タスク完了率の可視化
- スキルレベルの表示

---

## サイズバリアント

### Small (小)
**高さ:** 4px
**用途:** コンパクトな表示、カード内

### Default (デフォルト)
**高さ:** 8px
**用途:** 一般的な進捗表示

### Large (大)
**高さ:** 12px
**用途:** 強調したい進捗、メイン表示

---

## 色バリアント

### Default (プライマリー)
通常の進捗を示します。

### Success (成功)
完了した進捗を示します。

### Warning (警告)
注意が必要な進捗を示します。

### Error (エラー)
問題がある進捗を示します。

### Info (情報)
情報提供の進捗を示します。

---

## 主要トークン

### トラック（背景）
- `track.background` - トラック背景色
- `track.height.small/default/large` - 高さ
- `track.borderRadius` - 完全な楕円

### フィル（進行バー）
- `fill.background.default` - プライマリー色
- `fill.success/warning/error/info` - 状態別色

### ラベル
- `label.fontSize` - 14px
- `label.fontWeight` - 500
- `label.spacing` - バーとの間隔

### アニメーション
- `transition.duration` - 200ms
- `transition.timing` - ease
- スムーズな進捗更新

---

## 使用例

### HTML

```html
<div class="progress-group">
  <label class="progress-label">アップロード中 (75%)</label>
  <div class="progress">
    <div class="progress-fill" style="width: 75%"></div>
  </div>
  <span class="progress-percentage">75%</span>
</div>
```

### React

```tsx
interface ProgressProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'default' | 'large';
  label?: string;
  showPercentage?: boolean;
}

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'default',
  label,
  showPercentage = false
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="progress-group">
      {label && <label className="progress-label">{label}</label>}
      <div className={`progress progress-${size}`}>
        <div
          className={`progress-fill progress-fill-${variant}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showPercentage && (
        <span className="progress-percentage">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
```

---

## アクセシビリティ

- **role="progressbar"** 必須
- **aria-valuenow** - 現在の値
- **aria-valuemin** - 最小値（通常0）
- **aria-valuemax** - 最大値（通常100）
- **aria-label** - ラベルがない場合

```html
<div
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="アップロード進捗"
>
  <div style="width: 75%"></div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

- パーセンテージを表示
- 適切なラベル
- リアルタイム更新
- 完了時にSuccessバリアント
- アニメーションでスムーズに

### ❌ 非推奨

- 不正確な進捗表示
- 更新頻度が高すぎる
- ラベルなしの使用
- 長時間100%で停止

---

## バリエーション

### 不確定プログレス

進捗が不明な場合のアニメーション：

```css
.progress-indeterminate .progress-fill {
  width: 30%;
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}
```

### ストライプ付き

視覚的な動きを追加：

```css
.progress-striped .progress-fill {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}
```

---

## 関連コンポーネント

- [Spinner](./spinner.md) - ローディング表示
- [Skeleton](./skeleton.md) - コンテンツプレースホルダー

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
