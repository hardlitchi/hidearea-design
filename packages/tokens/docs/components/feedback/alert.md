# Alert (アラート) コンポーネント

**カテゴリ:** Feedback
**ファイル:** `src/css/components/feedback/alert.css`
**ステータス:** ✅ 実装済み

---

## 概要

Alertコンポーネントは、ユーザーに重要な情報、警告、エラー、成功メッセージを伝えるためのフィードバック要素です。3つのスタイルバリアント（filled, outlined, soft）と、4つのセベリティレベル（info, success, warning, error）をサポートしています。

### 用途

- 成功メッセージの表示
- 警告の通知
- エラーメッセージの表示
- 情報の提供
- システムステータスの通知
- フォームバリデーション結果の表示

---

## バリアント

### スタイルバリアント

#### 1. Filled (塗りつぶし) - デフォルト

背景が塗りつぶされたスタイルです。最も目立つデザインで、重要な通知に適しています。

**使用場面:**
- 重要なシステムメッセージ
- 即座に注意を引く必要がある通知
- ページ上部のグローバルアラート

#### 2. Outlined (アウトライン)

背景が透明で、枠線のみのスタイルです。控えめで読みやすいデザインです。

**使用場面:**
- フォーム内の補足情報
- サイドバーやカード内の通知
- 背景との対比が必要な場合

#### 3. Soft (ソフト)

薄い背景色を持つスタイルです。FilledとOutlinedの中間の目立ち具合です。

**使用場面:**
- インラインの通知
- カード内の情報表示
- 長時間表示されるアラート

### セベリティレベル

#### 1. Info (情報)

一般的な情報や補足説明を提供します。

**使用場面:**
- ヒントやTips
- お知らせ
- 補足情報
- システムメンテナンス通知

#### 2. Success (成功)

操作が正常に完了したことを伝えます。

**使用場面:**
- フォーム送信成功
- データ保存完了
- 処理完了通知
- 設定変更の確認

#### 3. Warning (警告)

注意が必要な状況を伝えます。

**使用場面:**
- 重要な変更前の確認
- 潜在的な問題の警告
- 期限切れ間近の通知
- 制限事項の案内

#### 4. Error (エラー)

エラーや問題が発生したことを伝えます。

**使用場面:**
- フォームバリデーションエラー
- システムエラー
- 処理失敗の通知
- アクセス拒否メッセージ

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-alert variant="filled" severity="info">
  <div class="alert">
    <div class="alert__icon">
      <svg><!-- Info icon --></svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">お知らせ</p>
      <p class="alert__message">システムメンテナンスは2025年12月15日に実施されます。</p>
    </div>
  </div>
</ha-alert>

<ha-alert variant="soft" severity="success">
  <div class="alert">
    <div class="alert__icon">
      <svg><!-- Success icon --></svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">成功しました</p>
      <p class="alert__message">データが正常に保存されました。</p>
    </div>
  </div>
</ha-alert>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/components/feedback/alert.css">
</head>
<body>
  <!-- Info アラート (Filled) -->
  <div class="ha-alert">
    <div class="alert alert--filled alert--info">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">お知らせ</p>
        <p class="alert__message">システムメンテナンスは2025年12月15日に実施されます。</p>
      </div>
    </div>
  </div>

  <!-- Success アラート (Soft) -->
  <div class="ha-alert">
    <div class="alert alert--soft alert--success">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">成功しました</p>
        <p class="alert__message">データが正常に保存されました。</p>
      </div>
    </div>
  </div>

  <!-- Warning アラート (Outlined) -->
  <div class="ha-alert">
    <div class="alert alert--outlined alert--warning">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">注意</p>
        <p class="alert__message">この操作は元に戻せません。</p>
      </div>
    </div>
  </div>

  <!-- Error アラート (Filled) -->
  <div class="ha-alert">
    <div class="alert alert--filled alert--error">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">エラー</p>
        <p class="alert__message">データの保存に失敗しました。もう一度お試しください。</p>
      </div>
    </div>
  </div>

  <!-- 閉じるボタン付きアラート -->
  <div class="ha-alert">
    <div class="alert alert--soft alert--info">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">新機能のお知らせ</p>
        <p class="alert__message">アカウント設定に新しいオプションが追加されました。</p>
      </div>
      <button class="alert__close" aria-label="アラートを閉じる">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- アクションボタン付きアラート -->
  <div class="ha-alert">
    <div class="alert alert--outlined alert--warning">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">セッションの期限切れ</p>
        <p class="alert__message">セキュリティのため、セッションの有効期限が近づいています。</p>
        <div class="alert__actions">
          <button class="btn btn-primary">延長する</button>
          <button class="btn btn-secondary">ログアウト</button>
        </div>
      </div>
    </div>
  </div>

  <!-- タイトルなしのシンプルなアラート -->
  <div class="ha-alert">
    <div class="alert alert--soft alert--success">
      <div class="alert__icon">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      </div>
      <div class="alert__content">
        <p class="alert__message">ファイルのアップロードが完了しました。</p>
      </div>
    </div>
  </div>
</body>
</html>
```

### Pattern 3: React/Vue

```javascript
import '@hidearea-design/tokens/css/variables.css';
import '@hidearea-design/tokens/css/components/feedback/alert.css';

// React例
function Alert({
  variant = 'filled',
  severity = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  actions,
  children
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const icons = {
    info: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
      </svg>
    ),
    success: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
    warning: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
      </svg>
    ),
    error: (
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
      </svg>
    ),
  };

  return (
    <div className="ha-alert">
      <div className={`alert alert--${variant} alert--${severity}`}>
        <div className="alert__icon">
          {icons[severity]}
        </div>
        <div className="alert__content">
          {title && <p className="alert__title">{title}</p>}
          {message && <p className="alert__message">{message}</p>}
          {children}
          {actions && (
            <div className="alert__actions">
              {actions}
            </div>
          )}
        </div>
        {dismissible && (
          <button
            className="alert__close"
            onClick={handleDismiss}
            aria-label="アラートを閉じる"
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// 使用例
export default function Example() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Alert
        variant="filled"
        severity="success"
        title="成功しました"
        message="データが正常に保存されました。"
        dismissible
      />

      <Alert
        variant="outlined"
        severity="warning"
        title="注意"
        message="この操作は元に戻せません。"
      />

      <Alert
        variant="soft"
        severity="error"
        title="エラー"
        message="データの保存に失敗しました。もう一度お試しください。"
        dismissible
      />

      <Alert
        variant="filled"
        severity="info"
        title="お知らせ"
        message="システムメンテナンスは2025年12月15日に実施されます。"
      />

      <Alert
        variant="outlined"
        severity="warning"
        title="セッションの期限切れ"
        message="セキュリティのため、セッションの有効期限が近づいています。"
        actions={
          <>
            <button className="btn btn-primary">延長する</button>
            <button className="btn btn-secondary">ログアウト</button>
          </>
        }
      />
    </div>
  );
}
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `filled` \| `outlined` \| `soft` | `filled` | アラートのスタイルバリアント |
| `severity` | `info` \| `success` \| `warning` \| `error` | `info` | アラートのセベリティレベル |

---

## CSS変数

Alertコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連

#### Info (情報)
- `--info-default` - 情報カラー (ボーダー、テキスト)
- `--info-hover` - 情報ホバーカラー (Filledボーダー)
- `--info-subtle` - 情報サブトルカラー (Soft背景)
- `--foreground-inverse` - 反転テキストカラー (Filledテキスト)

#### Success (成功)
- `--success-default` - 成功カラー (ボーダー、テキスト)
- `--success-hover` - 成功ホバーカラー (Filledボーダー)
- `--success-subtle` - 成功サブトルカラー (Soft背景)

#### Warning (警告)
- `--warning-default` - 警告カラー (ボーダー、テキスト)
- `--warning-hover` - 警告ホバーカラー (Filledボーダー)
- `--warning-subtle` - 警告サブトルカラー (Soft背景)

#### Error (エラー)
- `--error-default` - エラーカラー (ボーダー、テキスト)
- `--error-hover` - エラーホバーカラー (Filledボーダー)
- `--error-subtle` - エラーサブトルカラー (Soft背景)

### スペーシング
- `--spacing-1` - 0.25rem (タイトルとメッセージの間隔)
- `--spacing-2` - 0.5rem (アクションボタンの間隔、アクションの上マージン)
- `--spacing-3` - 0.75rem (アイコン、コンテンツ、閉じるボタンの間隔)
- `--spacing-4` - 1rem (アラート全体のパディング)

### タイポグラフィ
- `--font-family-sans` - サンセリフフォントファミリー
- `--font-size-sm` - 0.875rem (テキストサイズ)
- `--font-line-height-normal` - 1.5 (行の高さ)
- `--font-weight-semibold` - 600 (タイトルの太さ)

### ボーダー
- `--border-radius-md` - 0.375rem (角丸)
- `--border-radius-sm` - 0.25rem (閉じるボタンフォーカス時)

### アニメーション
- `--animation-duration-base` - 200ms (閉じるボタンのホバートランジション)

---

## アクセシビリティ

### ARIA属性

```html
<!-- 静的な重要なアラート -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error" role="alert">
    <div class="alert__icon">
      <svg><!-- Error icon --></svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">エラー</p>
      <p class="alert__message">入力内容に誤りがあります。</p>
    </div>
  </div>
</div>

<!-- 動的に表示される通知 -->
<div class="ha-alert">
  <div
    class="alert alert--soft alert--success"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <div class="alert__icon">
      <svg><!-- Success icon --></svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">保存しました</p>
      <p class="alert__message">変更が正常に保存されました。</p>
    </div>
  </div>
</div>

<!-- 閉じるボタン付き -->
<div class="ha-alert">
  <div class="alert alert--outlined alert--info" role="alert">
    <div class="alert__icon">
      <svg><!-- Info icon --></svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">情報</p>
      <p class="alert__message">新しい機能が追加されました。</p>
    </div>
    <button class="alert__close" aria-label="アラートを閉じる">
      <svg><!-- Close icon --></svg>
    </button>
  </div>
</div>
```

### ARIA Role ガイドライン

| Role | 用途 | aria-live | 説明 |
|------|------|-----------|------|
| `alert` | 重要で即座の注意が必要 | implicit `assertive` | ページロード時から存在するエラーや警告 |
| `status` | 重要度が低い情報 | implicit `polite` | 動的に追加される成功メッセージなど |

### キーボード操作

- **Tab**: 閉じるボタンやアクションボタンにフォーカス
- **Enter/Space**: フォーカスされたボタンを実行
- **Escape**: 閉じるボタンがある場合、アラートを閉じる（JavaScript実装が必要）

### フォーカススタイル

閉じるボタンにはデフォルトでフォーカス可視化スタイルが適用されています:

```css
.alert__close:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}
```

---

## ベストプラクティス

### ✅ 推奨

#### 1. 適切なセベリティレベルの選択

状況に合ったセベリティレベルを使用してください。

```html
<!-- 成功時は success -->
<div class="ha-alert">
  <div class="alert alert--soft alert--success">
    <div class="alert__content">
      <p class="alert__message">保存に成功しました。</p>
    </div>
  </div>
</div>

<!-- エラー時は error -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error">
    <div class="alert__content">
      <p class="alert__message">エラーが発生しました。</p>
    </div>
  </div>
</div>
```

#### 2. 明確で具体的なメッセージ

ユーザーが何が起きたか、どうすればいいかを理解できるメッセージを記述してください。

```html
<!-- Good: 具体的で行動可能 -->
<div class="ha-alert">
  <div class="alert alert--outlined alert--error">
    <div class="alert__icon">
      <svg><!-- Error icon --></svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">メールアドレスが無効です</p>
      <p class="alert__message">有効なメールアドレス形式で入力してください（例: user@example.com）</p>
    </div>
  </div>
</div>

<!-- Bad: 曖昧で不明確 -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error">
    <div class="alert__content">
      <p class="alert__message">エラー</p>
    </div>
  </div>
</div>
```

#### 3. アイコンの使用

視覚的な手がかりとしてアイコンを使用し、色だけに依存しないでください。

```html
<!-- Good: アイコンとテキストの併用 -->
<div class="ha-alert">
  <div class="alert alert--soft alert--warning">
    <div class="alert__icon">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">警告</p>
      <p class="alert__message">この操作は元に戻せません。</p>
    </div>
  </div>
</div>
```

#### 4. 適切な配置

フォームエラーはフォームの上部、グローバルな通知はページの上部に配置してください。

```html
<!-- Good: フォームの上部に配置 -->
<form>
  <div class="ha-alert">
    <div class="alert alert--filled alert--error" role="alert">
      <div class="alert__icon">
        <svg><!-- Error icon --></svg>
      </div>
      <div class="alert__content">
        <p class="alert__title">入力エラーがあります</p>
        <p class="alert__message">以下のフィールドを確認してください。</p>
      </div>
    </div>
  </div>
  <!-- フォームフィールド -->
</form>
```

#### 5. スタイルバリアントの使い分け

重要度と表示場所に応じてスタイルバリアントを選択してください。

```html
<!-- ページ上部の重要な通知: Filled -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error">
    <div class="alert__content">
      <p class="alert__message">システムエラーが発生しました。</p>
    </div>
  </div>
</div>

<!-- カード内の補足情報: Soft -->
<div class="card">
  <div class="ha-alert">
    <div class="alert alert--soft alert--info">
      <div class="alert__content">
        <p class="alert__message">この機能はベータ版です。</p>
      </div>
    </div>
  </div>
</div>

<!-- フォーム内のヘルプテキスト: Outlined -->
<div class="ha-alert">
  <div class="alert alert--outlined alert--info">
    <div class="alert__content">
      <p class="alert__message">パスワードは8文字以上である必要があります。</p>
    </div>
  </div>
</div>
```

### ❌ 非推奨

#### 1. 誤解を招くセベリティレベル

```html
<!-- Bad: 成功メッセージにerrorを使用 -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error">
    <div class="alert__content">
      <p class="alert__message">成功しました</p>
    </div>
  </div>
</div>

<!-- Bad: エラーメッセージにsuccessを使用 -->
<div class="ha-alert">
  <div class="alert alert--soft alert--success">
    <div class="alert__content">
      <p class="alert__message">エラーが発生しました</p>
    </div>
  </div>
</div>
```

#### 2. 色のみに依存

```html
<!-- Bad: アイコンやテキストなしで色だけで伝える -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error">
    <!-- アイコンなし、明確な説明なし -->
  </div>
</div>
```

#### 3. 曖昧なメッセージ

```html
<!-- Bad: 何が起きたか、何をすべきか不明 -->
<div class="ha-alert">
  <div class="alert alert--outlined alert--error">
    <div class="alert__content">
      <p class="alert__message">エラー</p>
    </div>
  </div>
</div>

<!-- Bad: 技術的すぎる詳細 -->
<div class="ha-alert">
  <div class="alert alert--filled alert--error">
    <div class="alert__content">
      <p class="alert__message">Error code 0x80004005: HRESULT exception</p>
    </div>
  </div>
</div>
```

#### 4. 過度な使用

```html
<!-- Bad: 同じページに多数のアラートを表示 -->
<div class="ha-alert">
  <div class="alert alert--filled alert--info">...</div>
</div>
<div class="ha-alert">
  <div class="alert alert--soft alert--warning">...</div>
</div>
<div class="ha-alert">
  <div class="alert alert--outlined alert--success">...</div>
</div>
<div class="ha-alert">
  <div class="alert alert--filled alert--error">...</div>
</div>
<!-- これは多すぎる - 最も重要なアラート1-2個に絞る -->
```

---

## バリエーション

### タイトルなしのシンプルなアラート

短いメッセージの場合、タイトルを省略できます。

```html
<div class="ha-alert">
  <div class="alert alert--soft alert--success">
    <div class="alert__icon">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="alert__content">
      <p class="alert__message">ファイルのアップロードが完了しました。</p>
    </div>
  </div>
</div>
```

### アイコンなしのアラート

アイコンを省略したシンプルなデザインも可能です。

```html
<div class="ha-alert">
  <div class="alert alert--outlined alert--info">
    <div class="alert__content">
      <p class="alert__title">ヒント</p>
      <p class="alert__message">Ctrl+Sでいつでも保存できます。</p>
    </div>
  </div>
</div>
```

### リスト付きアラート

複数のエラーや情報を箇条書きで表示できます。

```html
<div class="ha-alert">
  <div class="alert alert--filled alert--error" role="alert">
    <div class="alert__icon">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="alert__content">
      <p class="alert__title">以下のエラーを修正してください:</p>
      <ul style="margin: 0.5rem 0 0 1.5rem; padding: 0;">
        <li>メールアドレスが無効です</li>
        <li>パスワードは8文字以上である必要があります</li>
        <li>利用規約に同意してください</li>
      </ul>
    </div>
  </div>
</div>
```

### リンク付きアラート

詳細情報へのリンクを含めることができます。

```html
<div class="ha-alert">
  <div class="alert alert--soft alert--info">
    <div class="alert__icon">
      <svg viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="alert__content">
      <p class="alert__message">
        アカウント設定を更新しました。
        <a href="/settings" style="text-decoration: underline; font-weight: 600;">設定を確認</a>
      </p>
    </div>
  </div>
</div>
```

---

## テーマ対応

全てのアラートトークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-alert">
    <div class="alert alert--filled alert--success">
      <div class="alert__content">
        <p class="alert__message">保存しました</p>
      </div>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-alert">
    <div class="alert alert--filled alert--success">
      <div class="alert__content">
        <p class="alert__message">保存しました</p>
      </div>
    </div>
  </div>
</html>
```

---

## 関連コンポーネント

- [Badge](./badge.md) - 小さなステータス表示
- [Toast](./toast.md) - 一時的な通知メッセージ（画面端に表示）
- [Progress](./progress.md) - 進捗状況の表示
- [Spinner](./spinner.md) - ローディング表示
- [Dialog](../overlays/dialog.md) - モーダル形式の重要な確認ダイアログ

---

## 関連ドキュメント

- [アーキテクチャガイド](../../アーキテクチャガイド.md)
- [使用方法ガイド](../../使用方法ガイド.md)
- [コンポーネントリファレンス](../README.md)
- [セマンティックトークンガイド](../../セマンティックトークンガイド.md)

---

**最終更新:** 2025-12-12
