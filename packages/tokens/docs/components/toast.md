# Toast (トースト通知) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/components/feedback/toast.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

トーストコンポーネントは、画面の端に一時的に表示される通知メッセージです。ユーザーのアクション結果を非侵襲的に伝えます。

### 用途

- 保存完了の通知
- エラーメッセージの表示
- 警告の表示
- 情報メッセージの配信
- システムステータスの通知

---

## バリアント

### Success (成功)
操作が正常に完了したことを示します。
**トークン:** `component.toast.success.*`

### Error (エラー)
エラーが発生したことを通知します。
**トークン:** `component.toast.error.*`

### Warning (警告)
注意が必要な状況を警告します。
**トークン:** `component.toast.warning.*`

### Info (情報)
一般的な情報を提供します。
**トークン:** `component.toast.info.*`

---

## 主要トークン

### 色
- `background` - 背景色（反転デザイン）
- `text` - テキスト色（白など）
- `border` - ボーダー色
- `icon` - アイコン色

### レイアウト
- `padding.vertical/horizontal` - パディング
- `minWidth/maxWidth` - サイズ制約
- `gap` - 要素間の間隔

### アニメーション
- `transition.duration` - 200ms
- `transition.timing` - ease
- `transition.properties` - opacity, transform

---

## 使用例

### HTML

```html
<div class="toast toast-success">
  <div class="toast-content">
    <svg class="toast-icon">...</svg>
    <span>保存が完了しました</span>
  </div>
  <button class="toast-close">×</button>
</div>
```

### React

```tsx
interface ToastProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ variant, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${variant}`}>
      <div className="toast-content">
        <Icon type={variant} className="toast-icon" />
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
}
```

---

## アクセシビリティ

- **role="status"** または **role="alert"** を使用
- **aria-live="polite"** で読み上げ対応
- 閉じるボタンに **aria-label="閉じる"**
- 十分なコントラスト比（WCAG 2.1）
- キーボードで閉じる操作（Escape キー）

---

## ベストプラクティス

### ✅ 推奨

- 自動消去（3-5秒）
- 画面の隅に配置
- 同時表示は3個まで
- 簡潔なメッセージ
- アイコンで視認性向上

### ❌ 非推奨

- 重要な情報をトーストのみで表示
- 長すぎるメッセージ
- アクション必須の通知
- 永続的な表示

---

## 関連コンポーネント

- [Alert](./alert.md) - 永続的な通知
- [Badge](./badge.md) - ステータス表示

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
