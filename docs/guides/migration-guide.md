# 移行ガイド

このガイドは、他の UI ライブラリから Hidearea Design システムへの移行、およびバージョン間のアップグレードに関する実践的な例を提供します。

## 目次

- [プレーン HTML からの移行](#プレーン-html-からの移行)
- [Bootstrap からの移行](#bootstrap-からの移行)
- [Material-UI からの移行](#material-ui-からの移行)
- [フレームワーク固有の移行](#フレームワーク固有の移行)
- [バージョンアップグレード](#バージョンアップグレード)

---

## プレーン HTML からの移行

### 基本フォーム

**移行前（プレーン HTML）:**
```html
<form>
  <div class="form-group">
    <label for="email">メールアドレス</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="password">パスワード</label>
    <input type="password" id="password" name="password" required>
  </div>

  <button type="submit">ログイン</button>
</form>
```

**移行後（Hidearea Design）:**
```html
<form>
  <ha-form-group label="メールアドレス" required>
    <ha-input
      type="email"
      name="email"
      placeholder="メールアドレスを入力"
      required>
    </ha-input>
  </ha-form-group>

  <ha-form-group label="パスワード" required>
    <ha-input
      type="password"
      name="password"
      placeholder="パスワードを入力"
      required>
    </ha-input>
  </ha-form-group>

  <ha-button type="submit" variant="primary">ログイン</ha-button>
</form>
```

### モーダルダイアログ

**移行前（プレーン HTML + JavaScript）:**
```html
<div class="modal" id="myModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>モーダルタイトル</h2>
    <p>モーダルコンテンツはこちら</p>
  </div>
</div>

<script>
  const modal = document.getElementById('myModal');
  const closeBtn = document.querySelector('.close');

  closeBtn.onclick = () => modal.style.display = 'none';
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
</script>
```

**移行後（Hidearea Design）:**
```html
<ha-button id="openBtn">モーダルを開く</ha-button>

<ha-modal id="myModal" title="モーダルタイトル">
  <p>モーダルコンテンツはこちら</p>
  <div slot="footer">
    <ha-button variant="secondary" id="cancelBtn">キャンセル</ha-button>
    <ha-button variant="primary" id="confirmBtn">確認</ha-button>
  </div>
</ha-modal>

<script>
  const modal = document.getElementById('myModal');
  document.getElementById('openBtn').addEventListener('click', () => {
    modal.open();
  });

  document.getElementById('cancelBtn').addEventListener('click', () => {
    modal.close();
  });
</script>
```

---

## Bootstrap からの移行

### アラート

**移行前（Bootstrap）:**
```html
<div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>成功!</strong> 変更が保存されました。
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>
```

**移行後（Hidearea Design）:**
```html
<ha-alert variant="success" closable>
  <strong>成功!</strong> 変更が保存されました。
</ha-alert>
```

### ボタン

**移行前（Bootstrap）:**
```html
<button type="button" class="btn btn-primary btn-lg">大きいボタン</button>
<button type="button" class="btn btn-outline-secondary" disabled>無効</button>
```

**移行後（Hidearea Design）:**
```html
<ha-button variant="primary" size="large">大きいボタン</ha-button>
<ha-button variant="secondary" outline disabled>無効</ha-button>
```

### カード

**移行前（Bootstrap）:**
```html
<div class="card">
  <div class="card-header">
    カードヘッダー
  </div>
  <div class="card-body">
    <h5 class="card-title">カードタイトル</h5>
    <p class="card-text">カードコンテンツはこちらです。</p>
    <a href="#" class="btn btn-primary">アクション</a>
  </div>
  <div class="card-footer text-muted">
    2日前
  </div>
</div>
```

**移行後（Hidearea Design）:**
```html
<ha-card>
  <div slot="header">カードヘッダー</div>
  <div slot="title">カードタイトル</div>
  <p>カードコンテンツはこちらです。</p>
  <ha-button variant="primary">アクション</ha-button>
  <div slot="footer">2日前</div>
</ha-card>
```

### グリッドシステム

**移行前（Bootstrap）:**
```html
<div class="container">
  <div class="row">
    <div class="col-md-4">カラム 1</div>
    <div class="col-md-4">カラム 2</div>
    <div class="col-md-4">カラム 3</div>
  </div>
</div>
```

**移行後（Hidearea Design）:**
```html
<ha-container>
  <ha-grid columns="3" gap="md">
    <div>カラム 1</div>
    <div>カラム 2</div>
    <div>カラム 3</div>
  </ha-grid>
</ha-container>
```

---

## Material-UI からの移行

### テキストフィールド

**移行前（Material-UI React）:**
```jsx
import TextField from '@mui/material/TextField';

<TextField
  label="ユーザー名"
  variant="outlined"
  required
  helperText="ユーザー名を入力してください"
  error={hasError}
/>
```

**移行後（Hidearea Design React）:**
```jsx
import { FormGroup, Input } from '@hidearea-design/react';

<FormGroup
  label="ユーザー名"
  required
  helperText="ユーザー名を入力してください"
  error={hasError ? "無効なユーザー名" : undefined}
>
  <Input
    name="username"
    placeholder="ユーザー名を入力してください"
  />
</FormGroup>
```

### チェックボックス

**移行前（Material-UI React）:**
```jsx
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

<FormControlLabel
  control={<Checkbox checked={checked} onChange={handleChange} />}
  label="利用規約に同意します"
/>
```

**移行後（Hidearea Design React）:**
```jsx
import { Checkbox } from '@hidearea-design/react';

<Checkbox
  checked={checked}
  onChange={(e) => handleChange(e.target.checked)}
  label="利用規約に同意します"
/>
```

### アイコン付きボタン

**移行前（Material-UI React）:**
```jsx
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

<Button variant="contained" endIcon={<SendIcon />}>
  送信
</Button>
```

**移行後（Hidearea Design React）:**
```jsx
import { Button } from '@hidearea-design/react';

<Button variant="primary">
  送信
  <svg slot="suffix" width="16" height="16" viewBox="0 0 16 16">
    {/* アイコン SVG パス */}
  </svg>
</Button>
```

---

## フレームワーク固有の移行

### React

**セットアップ:**
```jsx
// 移行前: 他のライブラリからインポート
import { Button, Input } from 'other-ui-library';

// 移行後: Hidearea Design からインポート
import { Button, Input } from '@hidearea-design/react';
```

**イベント処理:**
```jsx
// Hidearea Design はネイティブ Web コンポーネントイベントを使用
import { Input } from '@hidearea-design/react';

function MyComponent() {
  const handleChange = (e) => {
    console.log('値:', e.target.value);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      onInput={handleChange}
    />
  );
}
```

### Vue 3

**セットアップ:**
```js
// main.js
import { createApp } from 'vue';
import HideareaDesignVue from '@hidearea-design/vue';
import App from './App.vue';

const app = createApp(App);

// オプション 1: すべてのコンポーネントをグローバルにインストール
app.use(HideareaDesignVue);

// オプション 2: 個別のコンポーネントをインポート
import { Button, Input } from '@hidearea-design/vue';
app.component('HaButton', Button);
app.component('HaInput', Input);

app.mount('#app');
```

**コンポーネントの使用:**
```vue
<template>
  <HaFormGroup label="メールアドレス" required>
    <HaInput
      v-model="email"
      type="email"
      placeholder="メールアドレスを入力"
      @change="handleChange"
    />
  </HaFormGroup>

  <HaButton @click="submit" variant="primary">
    送信
  </HaButton>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');

const handleChange = (e) => {
  console.log('メール:', e.target.value);
};

const submit = () => {
  console.log('送信:', email.value);
};
</script>
```

### Vanilla JavaScript

**セットアップ:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@hidearea-design/core/dist/index.css">
</head>
<body>
  <ha-button id="myButton" variant="primary">クリックしてください</ha-button>

  <script type="module">
    import '@hidearea-design/core';

    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
      console.log('ボタンがクリックされました!');
    });
  </script>
</body>
</html>
```

---

## バージョンアップグレード

### バージョン別の破壊的変更

#### v0.1.0 → v0.2.0（今後リリース予定）

新しいバージョンがリリースされたら移行ガイドをご確認ください。

### 非推奨の警告

Hidearea Design はセマンティックバージョニングに従います。機能が非推奨になる場合:

1. **マイナーバージョン**: 非推奨警告が追加される
2. **次のメジャーバージョン**: 非推奨機能が削除される

非推奨の通知とアップグレードパスについては、常に CHANGELOG.md を確認してください。

---

## 一般的な移行パターン

### フォーム検証

**パターン:**
```html
<ha-form-group
  label="メールアドレス"
  required
  error="有効なメールアドレスを入力してください"
>
  <ha-input
    type="email"
    name="email"
    required
    invalid
  />
</ha-form-group>
```

### ローディング状態

**パターン:**
```html
<ha-button variant="primary" loading disabled>
  処理中...
</ha-button>

<!-- またはスピナーを別々に使用 -->
<ha-spinner size="small"></ha-spinner>
```

### レスポンシブデザイン

**パターン:**
```html
<ha-grid
  columns="1"
  columns-sm="2"
  columns-md="3"
  columns-lg="4"
  gap="md"
>
  <div>アイテム 1</div>
  <div>アイテム 2</div>
  <div>アイテム 3</div>
  <div>アイテム 4</div>
</ha-grid>
```

---

## スムーズな移行のためのヒント

### 1. 小さく始める
ボタンや入力などのシンプルなコンポーネントから始めて、複雑なレイアウトに取り組む前に慣れましょう。

### 2. 型安全性を使用
TypeScript を使用している場合は、より良い開発体験のために型をインポートしてください:
```typescript
import type { ButtonProps, InputProps } from '@hidearea-design/react';
```

### 3. 段階的にテスト
一度に1つのページまたはコンポーネントを移行し、徹底的にテストしてください。

### 4. アクセシビリティを確認
Hidearea Design コンポーネントはアクセシビリティを考慮して構築されていますが、常に以下を確認してください:
- キーボードナビゲーションが機能する
- スクリーンリーダーが正しく読み上げる
- 色のコントラストが WCAG 標準を満たす

### 5. デザイントークンを確認
一貫したテーマ設定のために利用可能なデザイントークンに慣れてください:
```css
/* ハードコードされた値の代わりにデザイントークンを使用 */
.custom-element {
  color: var(--color-text-primary);
  background: var(--color-background-surface);
  padding: var(--spacing-md);
}
```

---

## ヘルプ

- **ドキュメント**: 詳細な API リファレンスについては、コンポーネント固有のドキュメントを確認してください
- **例**: より多くのコードサンプルについては `docs/guides/examples.md` を参照してください
- **問題**: 移行の困難について GitHub で報告してください
- **コミュニティ**: 移行サポートのためにディスカッションに参加してください

---

## 次のステップ

移行を完了した後:

1. ベストプラクティスについては[アクセシビリティガイド](./accessibility-guide.md)を確認してください
2. テーマ設定については[デザイントークン](./design-tokens.md)を探索してください
3. 高度なパターンについては[例](./examples.md)を確認してください
