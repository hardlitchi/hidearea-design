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

- `role="alert"` が自動的に設定されます
- スクリーンリーダーが自動的に読み上げます
- 閉じるボタンには `aria-label="閉じる"` が設定されます
- キーボード操作に対応しています（閉じるボタン）

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-alert {
  --alert-padding: 16px;
  --alert-border-radius: 8px;
  --alert-font-size: 14px;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 例 |
|-----------|------|-----|
| `info` | 情報提供 | お知らせ、ヒント |
| `success` | 成功通知 | 保存完了、登録完了 |
| `warning` | 警告 | 注意喚起、確認メッセージ |
| `error` | エラー | バリデーションエラー、システムエラー |
