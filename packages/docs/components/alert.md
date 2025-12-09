# Alert

通知メッセージコンポーネント。4つのバリアントと3つのスタイルをサポートします。

## 基本的な使い方

```html
<ha-alert>これは通常のアラートです</ha-alert>
```

## バリアント

4種類のバリアントが利用可能です：

### Info

```html
<ha-alert variant="info">情報メッセージ</ha-alert>
```

### Success

```html
<ha-alert variant="success">成功メッセージ</ha-alert>
```

### Warning

```html
<ha-alert variant="warning">警告メッセージ</ha-alert>
```

### Error

```html
<ha-alert variant="error">エラーメッセージ</ha-alert>
```

## スタイル

3種類のスタイルが利用可能です：

### Filled（塗りつぶし）

```html
<ha-alert variant="info" style-type="filled">塗りつぶしスタイル</ha-alert>
```

### Outlined（アウトライン）

```html
<ha-alert variant="info" style-type="outlined">アウトラインスタイル</ha-alert>
```

### Soft（ソフト）

```html
<ha-alert variant="info" style-type="soft">ソフトスタイル</ha-alert>
```

## 閉じるボタン

```html
<ha-alert closable>閉じるボタン付き</ha-alert>
```

## タイトル

```html
<ha-alert variant="info" title="お知らせ">
  新しい機能が追加されました。詳細はドキュメントをご確認ください。
</ha-alert>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | バリアント |
| `style-type` | `'filled' \| 'outlined' \| 'soft'` | `'soft'` | スタイルタイプ |
| `title` | `string` | `''` | タイトル |
| `closable` | `boolean` | `false` | 閉じるボタンの表示 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `close` | 閉じるボタンがクリックされた時 | `CustomEvent` |

## React

```tsx
import { Alert } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) return null;

  return (
    <Alert
      variant="success"
      closable
      onClose={() => setShowAlert(false)}
    >
      操作が成功しました
    </Alert>
  );
}
```

## Vue

```vue
<template>
  <HaAlert
    v-if="showAlert"
    variant="success"
    closable
    @close="showAlert = false"
  >
    操作が成功しました
  </HaAlert>
</template>

<script setup>
import { ref } from 'vue';
import { Alert as HaAlert } from '@hidearea-design/vue';

const showAlert = ref(true);
</script>
```

## 使用例

### 情報通知

```html
<ha-alert variant="info" title="新機能のお知らせ">
  バージョン2.0がリリースされました。新しい機能をお試しください。
</ha-alert>
```

### 成功メッセージ

```html
<ha-alert variant="success" closable>
  アカウントが正常に作成されました。
</ha-alert>
```

### 警告メッセージ

```html
<ha-alert variant="warning" title="注意">
  この操作は元に戻せません。続行してもよろしいですか？
</ha-alert>
```

### エラーメッセージ

```html
<ha-alert variant="error" title="エラーが発生しました" closable>
  <p>以下のエラーを修正してください：</p>
  <ul>
    <li>メールアドレスが無効です</li>
    <li>パスワードは8文字以上である必要があります</li>
  </ul>
</ha-alert>
```

### フォームバリデーション

```tsx
import { Alert, FormGroup, Input, Button } from '@hidearea-design/react';
import { useState } from 'react';

function FormWithValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.includes('@')) {
      setError('有効なメールアドレスを入力してください');
      return;
    }

    setSuccess('登録が完了しました');
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="error" closable onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" closable onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <FormGroup label="メールアドレス" required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </FormGroup>

      <Button type="submit" variant="primary">登録</Button>
    </form>
  );
}
```

### 自動非表示

```tsx
import { Alert } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function AutoDismissAlert() {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000); // 5秒後に非表示

    return () => clearTimeout(timer);
  }, []);

  if (!showAlert) return null;

  return (
    <Alert variant="success" closable onClose={() => setShowAlert(false)}>
      保存しました（5秒後に自動で閉じます）
    </Alert>
  );
}
```

### スタイル別の使い分け

```html
<!-- Filled: 重要な通知 -->
<ha-alert variant="error" style-type="filled" title="重要">
  システムメンテナンスのため、本日22:00-24:00はサービスを停止します。
</ha-alert>

<!-- Outlined: 標準的な通知 -->
<ha-alert variant="info" style-type="outlined">
  新しいメッセージが届いています。
</ha-alert>

<!-- Soft: 補足情報 -->
<ha-alert variant="info" style-type="soft">
  ヒント: Ctrl+Sで保存できます。
</ha-alert>
```

## アクセシビリティ

### ARIAサポート

Alert コンポーネントは、WCAG 2.1 AA に準拠したアクセシビリティ機能を提供します：

- **role="alert"**: 重要な情報や緊急性の高いメッセージに自動的に設定されます
- **aria-live**: スクリーンリーダーが即座に読み上げるようにマークされます
- **aria-atomic="true"**: メッセージ全体を一度に読み上げます
- **aria-label**: 閉じるボタンには "閉じる" というラベルが自動的に設定されます

```html
<!-- Good ✓: バリアントに応じて適切なroleが設定される -->
<ha-alert variant="error" role="alert">
  エラーが発生しました。再度お試しください。
</ha-alert>

<!-- Good ✓: 情報提供にはaria-live="polite"も適切 -->
<ha-alert variant="info" aria-live="polite">
  新しい通知が1件あります。
</ha-alert>
```

### キーボード操作

| キー | アクション |
|------|----------|
| `Tab` | 閉じるボタンにフォーカス移動 |
| `Shift + Tab` | 前の要素にフォーカス移動 |
| `Enter` / `Space` | 閉じるボタンを押して Alert を閉じる |
| `Escape` | Alert を閉じる（closable が true の場合） |

### スクリーンリーダー

主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）での動作：

1. **Alert の表示時**:
   - "アラート: [メッセージ内容]" と即座に読み上げられます
   - タイトルがある場合は "アラート: [タイトル]、[メッセージ内容]" と読み上げられます

2. **閉じるボタン**:
   - "閉じる ボタン" と読み上げられます
   - フォーカス時は "閉じる ボタン、フォーカス中" と読み上げられます

3. **バリアント別の読み上げ**:
   ```html
   <!-- Error: "エラー アラート: 入力内容にエラーがあります" -->
   <ha-alert variant="error">入力内容にエラーがあります</ha-alert>

   <!-- Success: "成功 アラート: 保存が完了しました" -->
   <ha-alert variant="success">保存が完了しました</ha-alert>
   ```

### フォーカス管理

```tsx
// Good ✓: エラー発生時にAlertにフォーカスを移動
import { Alert } from '@hidearea-design/react';
import { useRef, useEffect } from 'react';

function FormWithAlert() {
  const [error, setError] = useState('');
  const alertRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (error && alertRef.current) {
      // エラーメッセージにフォーカスを移動
      alertRef.current.focus();
    }
  }, [error]);

  return (
    <>
      {error && (
        <Alert
          ref={alertRef}
          variant="error"
          closable
          onClose={() => setError('')}
          tabIndex={-1} // プログラムでのフォーカスを可能にする
        >
          {error}
        </Alert>
      )}
      {/* フォーム内容 */}
    </>
  );
}
```

## スタイルのカスタマイズ

### デザイントークン

Alert コンポーネントは、デザインシステムのセマンティックトークンを使用しています：

**バリアント別のカラートークン:**

- **Info**: `--ha-color-info-*`
- **Success**: `--ha-color-success-*`
- **Warning**: `--ha-color-warning-*`
- **Error**: `--ha-color-error-*`

**スタイルタイプ別の適用:**

```css
/* Filled */
--ha-alert-filled-bg: var(--ha-color-{variant}-500);
--ha-alert-filled-color: var(--ha-color-white);
--ha-alert-filled-border: none;

/* Outlined */
--ha-alert-outlined-bg: transparent;
--ha-alert-outlined-color: var(--ha-color-{variant}-700);
--ha-alert-outlined-border: 1px solid var(--ha-color-{variant}-500);

/* Soft */
--ha-alert-soft-bg: var(--ha-color-{variant}-50);
--ha-alert-soft-color: var(--ha-color-{variant}-700);
--ha-alert-soft-border: none;
```

### カスタムCSS変数

Alert コンポーネントでカスタマイズ可能な CSS 変数：

```css
ha-alert {
  /* レイアウト */
  --alert-padding: 16px;
  --alert-gap: 12px; /* アイコンとテキストの間隔 */
  --alert-border-radius: var(--ha-radius-md);
  --alert-border-width: 1px;

  /* タイポグラフィ */
  --alert-font-size: var(--ha-font-size-sm);
  --alert-line-height: var(--ha-line-height-normal);
  --alert-title-font-size: var(--ha-font-size-base);
  --alert-title-font-weight: var(--ha-font-weight-semibold);

  /* アイコン */
  --alert-icon-size: 20px;

  /* 閉じるボタン */
  --alert-close-button-size: 20px;
  --alert-close-button-padding: 4px;
  --alert-close-button-hover-bg: rgba(0, 0, 0, 0.1);
}
```

### Shadow DOMパーツ

`::part()` セレクターを使用して Shadow DOM 内の要素をスタイリングできます：

```css
/* Alert全体のコンテナ */
ha-alert::part(alert) {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* アイコン */
ha-alert::part(icon) {
  font-size: 24px;
}

/* タイトル */
ha-alert::part(title) {
  text-transform: uppercase;
}

/* メッセージコンテンツ */
ha-alert::part(content) {
  line-height: 1.6;
}

/* 閉じるボタン */
ha-alert::part(close-button) {
  border-radius: 50%;
}

/* カスタム例: エラーアラートに影を追加 */
ha-alert[variant="error"]::part(alert) {
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}
```

## ベストプラクティス

### Do's ✓

```html
<!-- Good ✓: 具体的で分かりやすいメッセージ -->
<ha-alert variant="error">
  メールアドレスの形式が正しくありません。
</ha-alert>

<!-- Good ✓: アクションが必要な場合はボタンを含める -->
<ha-alert variant="warning" title="確認が必要です">
  <p>アカウントのメール確認がまだ完了していません。</p>
  <ha-button variant="primary" size="sm">確認メールを再送信</ha-button>
</ha-alert>

<!-- Good ✓: 重要度に応じてスタイルタイプを選択 -->
<ha-alert variant="error" style-type="filled" title="緊急">
  システム障害が発生しています。現在復旧作業中です。
</ha-alert>

<ha-alert variant="info" style-type="soft">
  ヒント: キーボードショートカットで操作を高速化できます。
</ha-alert>

<!-- Good ✓: closableで一時的な通知を閉じられるようにする -->
<ha-alert variant="success" closable>
  プロフィールを更新しました。
</ha-alert>
```

### Don'ts ✗

```html
<!-- Bad ✗: 曖昧すぎるメッセージ -->
<ha-alert variant="error">
  エラーが発生しました。
</ha-alert>
<!-- 代わりに: 何のエラーか具体的に記述 -->
<ha-alert variant="error">
  パスワードは8文字以上で、数字と記号を含める必要があります。
</ha-alert>

<!-- Bad ✗: 複数のAlertを同時に表示しすぎる -->
<ha-alert variant="info">お知らせ1</ha-alert>
<ha-alert variant="info">お知らせ2</ha-alert>
<ha-alert variant="info">お知らせ3</ha-alert>
<!-- 代わりに: 1つのAlertにまとめるか、優先度をつけて表示 -->
<ha-alert variant="info" title="お知らせ">
  <ul>
    <li>お知らせ1</li>
    <li>お知らせ2</li>
    <li>お知らせ3</li>
  </ul>
</ha-alert>

<!-- Bad ✗: 重要なメッセージにclosableを使用 -->
<ha-alert variant="error" closable>
  クレジットカード情報の有効期限が切れています。
</ha-alert>
<!-- 代わりに: 重要な情報は閉じられないようにする -->
<ha-alert variant="error" title="アクションが必要です">
  クレジットカード情報の有効期限が切れています。
  <ha-button variant="primary">更新する</ha-button>
</ha-alert>

<!-- Bad ✗: 長すぎるメッセージ -->
<ha-alert variant="info">
  非常に長い説明文が続く...（500文字以上）
</ha-alert>
<!-- 代わりに: 要点を簡潔にまとめ、詳細はリンクで提供 -->
<ha-alert variant="info" title="新機能のお知らせ">
  バージョン2.0がリリースされました。
  <a href="/changelog">詳細はこちら</a>
</ha-alert>
```

## よくある質問

### 複数のAlertを管理するには？

複数の Alert を効率的に管理するには、配列で状態を管理します：

```tsx
import { Alert } from '@hidearea-design/react';
import { useState } from 'react';

interface AlertMessage {
  id: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

function AlertManager() {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = (variant: AlertMessage['variant'], message: string) => {
    const id = Date.now().toString();
    setAlerts(prev => [...prev, { id, variant, message }]);

    // 5秒後に自動削除
    setTimeout(() => {
      removeAlert(id);
    }, 5000);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          variant={alert.variant}
          closable
          onClose={() => removeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}

      {/* 使用例 */}
      <button onClick={() => addAlert('success', '保存しました')}>
        保存
      </button>
    </div>
  );
}
```

Vue での実装例：

```vue
<template>
  <div class="alert-container">
    <HaAlert
      v-for="alert in alerts"
      :key="alert.id"
      :variant="alert.variant"
      closable
      @close="removeAlert(alert.id)"
    >
      {{ alert.message }}
    </HaAlert>

    <button @click="addAlert('success', '保存しました')">保存</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Alert as HaAlert } from '@hidearea-design/vue';

interface AlertMessage {
  id: string;
  variant: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const alerts = ref<AlertMessage[]>([]);

function addAlert(variant: AlertMessage['variant'], message: string) {
  const id = Date.now().toString();
  alerts.value.push({ id, variant, message });

  setTimeout(() => {
    removeAlert(id);
  }, 5000);
}

function removeAlert(id: string) {
  alerts.value = alerts.value.filter(alert => alert.id !== id);
}
</script>
```

### Alert内にアクションボタンを配置するには？

Alert 内に Button を配置して、ユーザーにアクションを促すことができます：

```tsx
import { Alert, Button } from '@hidearea-design/react';

function ActionAlert() {
  const handleConfirm = () => {
    // 確認処理
    console.log('確認しました');
  };

  return (
    <Alert variant="warning" title="未保存の変更があります">
      <p>変更を保存せずに移動しますか？</p>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <Button variant="primary" size="sm" onClick={handleConfirm}>
          保存して移動
        </Button>
        <Button variant="ghost" size="sm">
          保存せずに移動
        </Button>
      </div>
    </Alert>
  );
}
```

### Alert表示時にアニメーションを追加するには？

CSS アニメーションを使用して、Alert の表示・非表示をスムーズにできます：

```css
/* フェードインアニメーション */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

ha-alert {
  animation: fadeIn 0.3s ease-out;
}

/* スライドインアニメーション */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

ha-alert.slide-in {
  animation: slideIn 0.3s ease-out;
}
```

React での実装例（React Transition Group を使用）：

```tsx
import { Alert } from '@hidearea-design/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './alert-animations.css';

function AnimatedAlerts() {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  return (
    <TransitionGroup>
      {alerts.map(alert => (
        <CSSTransition
          key={alert.id}
          timeout={300}
          classNames="alert"
        >
          <Alert
            variant={alert.variant}
            closable
            onClose={() => removeAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
```

```css
/* alert-animations.css */
.alert-enter {
  opacity: 0;
  transform: translateY(-20px);
}

.alert-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
}

.alert-exit {
  opacity: 1;
  transform: translateY(0);
}

.alert-exit-active {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 300ms, transform 300ms;
}
```

### グローバルなAlert通知システムを実装するには？

アプリケーション全体で使用できる Alert 通知システムを実装する例：

```tsx
// alertContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Alert } from '@hidearea-design/react';

interface AlertContextType {
  showAlert: (variant: string, message: string, duration?: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const showAlert = (
    variant: 'info' | 'success' | 'warning' | 'error',
    message: string,
    duration = 5000
  ) => {
    const id = Date.now().toString();
    setAlerts(prev => [...prev, { id, variant, message }]);

    if (duration > 0) {
      setTimeout(() => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
      }, duration);
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <div className="alert-portal">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            closable
            onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
}
```

使用例：

```tsx
// App.tsx
import { AlertProvider } from './alertContext';

function App() {
  return (
    <AlertProvider>
      <YourApp />
    </AlertProvider>
  );
}

// 任意のコンポーネント
import { useAlert } from './alertContext';

function SomeComponent() {
  const { showAlert } = useAlert();

  const handleSave = async () => {
    try {
      await saveData();
      showAlert('success', 'データを保存しました');
    } catch (error) {
      showAlert('error', '保存に失敗しました');
    }
  };

  return <button onClick={handleSave}>保存</button>;
}
```

## 関連コンポーネント

- [Button](/components/button) - Alert内でアクションを実行するボタン
- [Card](/components/card) - Alert と類似したコンテナコンポーネント

## API リファレンス

```typescript
interface AlertProps {
  /**
   * バリアント
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';

  /**
   * スタイルタイプ
   * @default 'soft'
   */
  styleType?: 'filled' | 'outlined' | 'soft';

  /**
   * タイトル
   */
  title?: string;

  /**
   * 閉じるボタンの表示
   * @default false
   */
  closable?: boolean;

  /**
   * Alert が閉じられた時のコールバック
   */
  onClose?: () => void;

  /**
   * カスタムアイコン（デフォルトのバリアント別アイコンを上書き）
   */
  icon?: ReactNode;

  /**
   * アイコンを非表示にする
   * @default false
   */
  hideIcon?: boolean;

  /**
   * カスタムクラス名
   */
  className?: string;

  /**
   * カスタムスタイル
   */
  style?: CSSProperties;

  /**
   * Alert のコンテンツ
   */
  children: ReactNode;
}

interface AlertEvents {
  /**
   * 閉じるボタンがクリックされた時に発火
   */
  close: CustomEvent<void>;
}
```

## トラブルシューティング

### 問題: Alert が表示されない

**原因:**
- コンポーネントの条件レンダリングが正しく動作していない
- CSS の `display: none` や `visibility: hidden` が適用されている

**解決策:**

```tsx
// Bad ✗: 条件が常に false
function BadExample() {
  const [show, setShow] = useState(false); // 初期値が false のまま

  return show && <Alert>メッセージ</Alert>;
}

// Good ✓: 適切な初期値と状態管理
function GoodExample() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // 必要に応じて表示状態を更新
    setShow(true);
  }, []);

  return show && <Alert closable onClose={() => setShow(false)}>メッセージ</Alert>;
}

// Good ✓: デバッグ用にレンダリング状態を確認
function DebugExample() {
  const [show, setShow] = useState(true);

  console.log('Alert show state:', show); // デバッグログ

  return (
    <>
      {show ? (
        <Alert closable onClose={() => setShow(false)}>メッセージ</Alert>
      ) : (
        <p>Alert は非表示です</p>
      )}
    </>
  );
}
```

### 問題: Alert が自動的に閉じない

**原因:**
- `setTimeout` のクリーンアップが正しく行われていない
- コンポーネントの再レンダリングで新しいタイマーが作成されている

**解決策:**

```tsx
// Bad ✗: クリーンアップなし
function BadAutoClose() {
  const [show, setShow] = useState(true);

  setTimeout(() => {
    setShow(false);
  }, 5000);

  return show && <Alert>5秒後に閉じます</Alert>;
}

// Good ✓: useEffect でクリーンアップ
function GoodAutoClose() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    // クリーンアップ関数
    return () => clearTimeout(timer);
  }, []); // 空の依存配列で初回のみ実行

  return show && <Alert closable onClose={() => setShow(false)}>
    5秒後に自動で閉じます
  </Alert>;
}

// Good ✓: カスタムフック化
function useAutoClose(duration: number) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration]);

  return [show, setShow] as const;
}

function AlertWithHook() {
  const [show, setShow] = useAutoClose(5000);

  return show && (
    <Alert closable onClose={() => setShow(false)}>
      5秒後に自動で閉じます
    </Alert>
  );
}
```

### 問題: 複数のAlertが重なって表示される

**原因:**
- Alert のコンテナに適切な CSS が適用されていない
- 位置指定が不適切

**解決策:**

```css
/* Good ✓: Alert コンテナの適切なスタイリング */
.alert-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  pointer-events: none; /* コンテナ自体はクリック不可 */
}

.alert-container > * {
  pointer-events: auto; /* Alert 自体はクリック可能 */
}

/* 中央配置の場合 */
.alert-container-center {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  width: 100%;
  padding: 0 20px;
}
```

```tsx
// React での実装
function AlertStack() {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  return (
    <div className="alert-container">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          variant={alert.variant}
          closable
          onClose={() => removeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}
```

### 問題: Alert内のリンクやボタンがクリックできない

**原因:**
- Alert 全体の `onClick` イベントが伝播している
- CSS の `pointer-events: none` が適用されている

**解決策:**

```tsx
// Good ✓: イベントの伝播を適切に管理
function AlertWithAction() {
  const [show, setShow] = useState(true);

  const handleAlertClick = (e: React.MouseEvent) => {
    // Alert 全体がクリックされた時の処理
    console.log('Alert clicked');
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 伝播を止める
    console.log('Button clicked');
    // ボタン固有の処理
  };

  return show && (
    <Alert variant="warning" onClick={handleAlertClick}>
      <p>アクションが必要です</p>
      <button onClick={handleButtonClick}>実行する</button>
    </Alert>
  );
}
```

```css
/* Good ✓: Alert内の要素に適切なpointer-eventsを設定 */
ha-alert {
  pointer-events: auto;
}

ha-alert::part(content) a,
ha-alert::part(content) button {
  pointer-events: auto;
  cursor: pointer;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 例 | 推奨 style-type |
|-----------|------|-----|----------------|
| `info` | 情報提供 | お知らせ、ヒント、新機能の紹介 | soft, outlined |
| `success` | 成功通知 | 保存完了、登録完了、送信成功 | soft, filled |
| `warning` | 警告 | 注意喚起、確認メッセージ、非推奨機能の通知 | soft, outlined |
| `error` | エラー | バリデーションエラー、システムエラー、必須アクション | filled, soft |
