# Toast (トースト) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/css/components/feedback/toast.css`, `src/css/components/feedback/toast-container.css`
**ステータス:** ✅ 実装済み

---

## 概要

トーストコンポーネントは、ユーザーに一時的な通知メッセージを表示するためのフィードバック要素です。
4つのバリアント（info, success, warning, error）をサポートし、
自動消去、手動削除、アクションボタンなどの機能を提供します。

### 用途

- 操作の成功/失敗の通知
- システムメッセージの表示
- 非同期処理の完了通知
- ユーザーへの軽量なフィードバック

---

## バリアント

### 1. Info (情報)

一般的な情報メッセージを表示します。青色のアクセントカラーを使用します。

**使用場面:**
- 一般的なお知らせ
- システム情報の通知
- ヒントやTips

### 2. Success (成功)

操作が正常に完了したことを通知します。緑色のアクセントカラーを使用します。

**使用場面:**
- 保存成功の通知
- データ送信完了
- タスク完了の通知

### 3. Warning (警告)

注意が必要な状況を通知します。黄色/オレンジ色のアクセントカラーを使用します。

**使用場面:**
- 注意喚起
- 一時的なエラー
- 警告メッセージ

### 4. Error (エラー)

エラーや失敗を通知します。赤色のアクセントカラーを使用します。

**使用場面:**
- 操作失敗の通知
- バリデーションエラー
- システムエラー

---

## 機能

### Dismissible (削除可能)

ユーザーが手動でトーストを閉じることができます。閉じるボタンが表示されます。

### Auto-dismiss (自動消去)

指定した時間後に自動的にトーストが消えます。プログレスバーで残り時間を視覚化できます。

### With Actions (アクション付き)

トースト内にアクションボタンを配置できます。「元に戻す」「詳細を見る」などの操作を提供します。

---

## Toast Container

トーストを表示する位置を管理するコンテナコンポーネントです。

### 配置オプション

- `top-left` - 左上
- `top-center` - 上中央
- `top-right` - 右上（デフォルト）
- `bottom-left` - 左下
- `bottom-center` - 下中央
- `bottom-right` - 右下

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- トーストコンテナの設置 -->
<ha-toast-container position="top-right"></ha-toast-container>

<!-- 各種バリアントのトースト -->
<ha-toast variant="info">
  <div class="container">
    <div class="icon">ℹ️</div>
    <div class="content">
      <div class="message">これは情報メッセージです</div>
    </div>
    <button class="close-button">×</button>
  </div>
</ha-toast>

<ha-toast variant="success">
  <div class="container">
    <div class="icon">✓</div>
    <div class="content">
      <div class="message">保存に成功しました</div>
    </div>
    <button class="close-button">×</button>
    <div class="progress">
      <div class="progress-bar"></div>
    </div>
  </div>
</ha-toast>

<ha-toast variant="warning">
  <div class="container">
    <div class="icon">⚠</div>
    <div class="content">
      <div class="message">注意が必要です</div>
    </div>
    <button class="close-button">×</button>
  </div>
</ha-toast>

<ha-toast variant="error">
  <div class="container">
    <div class="icon">✕</div>
    <div class="content">
      <div class="message">エラーが発生しました</div>
    </div>
    <button class="close-button">×</button>
  </div>
</ha-toast>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/feedback/toast.css">
</head>
<body>
  <!-- トーストコンテナ -->
  <div class="ha-toast-container" data-position="top-right">
    <!-- 情報トースト -->
    <div class="ha-toast" variant="info" role="alert" aria-live="polite">
      <div class="container">
        <div class="icon">ℹ️</div>
        <div class="content">
          <div class="message">新しい通知があります</div>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
      </div>
    </div>

    <!-- 成功トースト（プログレスバー付き） -->
    <div class="ha-toast" variant="success" role="alert" aria-live="polite">
      <div class="container">
        <div class="icon">✓</div>
        <div class="content">
          <div class="message">ファイルがアップロードされました</div>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
        <div class="progress">
          <div class="progress-bar" style="width: 100%; transition-duration: 5s;"></div>
        </div>
      </div>
    </div>

    <!-- アクション付きトースト -->
    <div class="ha-toast" variant="warning" role="alert" aria-live="polite">
      <div class="container">
        <div class="icon">⚠</div>
        <div class="content">
          <div class="message">アイテムを削除しました</div>
        </div>
        <div class="action">
          <button>元に戻す</button>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
      </div>
    </div>

    <!-- エラートースト -->
    <div class="ha-toast" variant="error" role="alert" aria-live="assertive">
      <div class="container">
        <div class="icon">✕</div>
        <div class="content">
          <div class="message">接続に失敗しました。再試行してください。</div>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import { toastStyles } from '@hidearea-design/tokens/styles/toast';

// React例
function Toast({ variant = 'info', message, onClose, showProgress = false, action }) {
  return (
    <div className="ha-toast" data-variant={variant} role="alert" aria-live="polite">
      <div className="container">
        <div className="icon">{getIcon(variant)}</div>
        <div className="content">
          <div className="message">{message}</div>
        </div>
        {action && <div className="action">{action}</div>}
        <button className="close-button" onClick={onClose} aria-label="閉じる">×</button>
        {showProgress && (
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
        )}
      </div>
    </div>
  );
}

// 使用例
<ToastContainer position="top-right">
  <Toast variant="success" message="保存しました" onClose={handleClose} showProgress={true} />
  <Toast
    variant="warning"
    message="削除しました"
    action={<button>元に戻す</button>}
    onClose={handleClose}
  />
</ToastContainer>
```

### Pattern 4: JavaScript API

```javascript
// トーストマネージャーの使用例
class ToastManager {
  constructor(position = 'top-right') {
    this.container = document.querySelector('.ha-toast-container');
    this.container.dataset.position = position;
  }

  show(message, variant = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = 'ha-toast';
    toast.setAttribute('variant', variant);
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', variant === 'error' ? 'assertive' : 'polite');

    toast.innerHTML = `
      <div class="container">
        <div class="icon">${this.getIcon(variant)}</div>
        <div class="content">
          <div class="message">${message}</div>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
        ${duration > 0 ? `
          <div class="progress">
            <div class="progress-bar" style="width: 100%; transition-duration: ${duration}ms;"></div>
          </div>
        ` : ''}
      </div>
    `;

    this.container.appendChild(toast);

    // 閉じるボタンのイベント
    toast.querySelector('.close-button').addEventListener('click', () => {
      this.dismiss(toast);
    });

    // 自動消去
    if (duration > 0) {
      setTimeout(() => {
        const progressBar = toast.querySelector('.progress-bar');
        if (progressBar) progressBar.style.width = '0%';
      }, 10);

      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  }

  dismiss(toast) {
    toast.setAttribute('closing', '');
    setTimeout(() => toast.remove(), 200);
  }

  getIcon(variant) {
    const icons = {
      info: 'ℹ️',
      success: '✓',
      warning: '⚠',
      error: '✕'
    };
    return icons[variant] || icons.info;
  }
}

// 使用例
const toastManager = new ToastManager('top-right');
toastManager.show('保存しました', 'success', 3000);
toastManager.show('エラーが発生しました', 'error', 0); // 自動消去なし
```

---

## 属性

### Toast

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `info` \| `success` \| `warning` \| `error` | `info` | トーストのバリアント |
| `closing` | - | - | 閉じるアニメーション中の状態 |

### Toast Container

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `position` | `top-left` \| `top-center` \| `top-right` \| `bottom-left` \| `bottom-center` \| `bottom-right` | `top-right` | トーストの表示位置 |

---

## CSS変数

トーストコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--color-white` - 背景色
- `--color-gray-200` - ボーダーカラー
- `--color-gray-600` - 閉じるボタンのカラー
- `--color-gray-900` - メッセージテキストカラー
- `--color-info-300`, `--color-info-500` - Info バリアントカラー
- `--color-success-300`, `--color-success-500` - Success バリアントカラー
- `--color-warning-300`, `--color-warning-500` - Warning バリアントカラー
- `--color-error-300`, `--color-error-500` - Error バリアントカラー

### レイアウト
- `--toast-padding` - 16px (内部パディング)
- `--toast-min-width` - 300px (最小幅)
- `--toast-max-width` - 500px (最大幅)
- `--toast-gap` - 12px (トースト間の間隔)
- `--toast-container-padding` - 16px (コンテナパディング)

### ボーダー
- `--radius-base` - 4px (小要素の角丸)
- `--radius-lg` - 8px (トースト本体の角丸)

### アニメーション
- `--duration-base` - 200ms (スライドアニメーション)
- `--duration-fast` - 150ms (ホバーアニメーション)
- `--ease-out`, `--ease-in` - アニメーションイージング

### その他
- `--shadow-lg` - トーストのシャドウ
- `--toast-container-z-index` - 9999 (重ね順)

---

## アクセシビリティ

### ARIA属性

トーストコンポーネントは適切なARIA属性を使用してアクセシビリティを確保します:

```html
<!-- 一般的な通知 -->
<div class="ha-toast" variant="info" role="alert" aria-live="polite">
  <div class="container">
    <div class="icon">ℹ️</div>
    <div class="content">
      <div class="message">新しいメッセージがあります</div>
    </div>
    <button class="close-button" aria-label="通知を閉じる">×</button>
  </div>
</div>

<!-- 重要なエラー通知 -->
<div class="ha-toast" variant="error" role="alert" aria-live="assertive">
  <div class="container">
    <div class="icon">✕</div>
    <div class="content">
      <div class="message">保存に失敗しました</div>
    </div>
    <button class="close-button" aria-label="通知を閉じる">×</button>
  </div>
</div>

<!-- アクション付き通知 -->
<div class="ha-toast" variant="warning" role="alert" aria-live="polite">
  <div class="container">
    <div class="icon">⚠</div>
    <div class="content">
      <div class="message" id="toast-msg-1">メッセージを削除しました</div>
    </div>
    <div class="action">
      <button aria-describedby="toast-msg-1">元に戻す</button>
    </div>
    <button class="close-button" aria-label="通知を閉じる">×</button>
  </div>
</div>
```

### ARIA Live Regions

- `aria-live="polite"` - 一般的な通知（info, success, warning）に使用
- `aria-live="assertive"` - 重要なエラー通知に使用
- `role="alert"` - すべてのトーストに設定

### キーボード操作

- **Tab**: 閉じるボタンやアクションボタンにフォーカス
- **Enter/Space**: フォーカスされたボタンを実行
- **Escape**: トーストを閉じる（JavaScript実装が必要）

### スクリーンリーダー対応

```javascript
// スクリーンリーダー向けの読み上げ順序を考慮
function announceToast(message, variant) {
  const announcement = `${getVariantLabel(variant)}: ${message}`;
  // aria-live領域に追加することで自動的に読み上げられる
}

function getVariantLabel(variant) {
  const labels = {
    info: '情報',
    success: '成功',
    warning: '警告',
    error: 'エラー'
  };
  return labels[variant] || '通知';
}
```

---

## ベストプラクティス

### ✅ 推奨

1. **適切なバリアントの選択**
   - ユーザーの操作結果に応じた適切な色を使用

2. **簡潔なメッセージ**
   - 1〜2行程度の短いメッセージを使用

3. **適切な自動消去時間**
   - 一般的な通知: 3〜5秒
   - 重要な通知: 自動消去しない、またはより長い時間

4. **過度な使用を避ける**
   - 重要な通知のみトーストを使用

```html
<!-- 成功通知 - 短いメッセージ、自動消去 -->
<div class="ha-toast" variant="success" role="alert" aria-live="polite">
  <div class="container">
    <div class="icon">✓</div>
    <div class="content">
      <div class="message">保存しました</div>
    </div>
    <button class="close-button" aria-label="閉じる">×</button>
    <div class="progress">
      <div class="progress-bar" style="transition-duration: 3s;"></div>
    </div>
  </div>
</div>

<!-- エラー通知 - 閉じるボタンのみ、自動消去なし -->
<div class="ha-toast" variant="error" role="alert" aria-live="assertive">
  <div class="container">
    <div class="icon">✕</div>
    <div class="content">
      <div class="message">ネットワークエラー: 接続を確認してください</div>
    </div>
    <button class="close-button" aria-label="閉じる">×</button>
  </div>
</div>

<!-- アクション付き - 元に戻す操作を提供 -->
<div class="ha-toast" variant="warning" role="alert" aria-live="polite">
  <div class="container">
    <div class="icon">⚠</div>
    <div class="content">
      <div class="message">5件のメッセージを削除しました</div>
    </div>
    <div class="action">
      <button>元に戻す</button>
    </div>
    <button class="close-button" aria-label="閉じる">×</button>
  </div>
</div>
```

### ❌ 非推奨

1. **長すぎるメッセージ**
   - トーストは簡潔な通知用。詳細はモーダルを使用

2. **同時に多数のトーストを表示**
   - ユーザーを混乱させる

3. **重要な情報を自動消去**
   - エラーメッセージは手動で閉じられるようにする

```html
<!-- 長すぎるメッセージ -->
<div class="ha-toast" variant="info">
  <div class="container">
    <div class="content">
      <div class="message">
        この操作を実行すると、データベース内のすべてのレコードが更新されます。
        この処理は取り消すことができませんので、十分に注意してください。
        続行する前に必ずバックアップを取得してください。
      </div>
    </div>
  </div>
</div>

<!-- エラーを自動消去してしまう -->
<div class="ha-toast" variant="error">
  <div class="container">
    <div class="icon">✕</div>
    <div class="content">
      <div class="message">支払いに失敗しました</div>
    </div>
    <div class="progress">
      <div class="progress-bar" style="transition-duration: 3s;"></div>
    </div>
  </div>
</div>
```

---

## テーマ対応

全てのトーストトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-toast-container" data-position="top-right">
    <div class="ha-toast" variant="success" role="alert" aria-live="polite">
      <div class="container">
        <div class="icon">✓</div>
        <div class="content">
          <div class="message">保存しました</div>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
      </div>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-toast-container" data-position="top-right">
    <div class="ha-toast" variant="success" role="alert" aria-live="polite">
      <div class="container">
        <div class="icon">✓</div>
        <div class="content">
          <div class="message">保存しました</div>
        </div>
        <button class="close-button" aria-label="閉じる">×</button>
      </div>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Alert](./alert.md) - 静的な警告メッセージ
- [Modal](../overlays/modal.md) - より詳細な情報を表示
- [Snackbar](./snackbar.md) - モバイル向けの通知

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)

---

**最終更新:** 2025-12-12
