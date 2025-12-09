# Switch

トグルスイッチコンポーネント。ON/OFF 状態の切り替えに使用します。

## 基本的な使い方

```html
<ha-switch>通知を有効化</ha-switch>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-switch size="sm">Small</ha-switch>
<ha-switch size="md">Medium</ha-switch>
<ha-switch size="lg">Large</ha-switch>
```

## 状態

### Checked

```html
<ha-switch checked>有効</ha-switch>
```

### Disabled

```html
<ha-switch disabled>無効状態</ha-switch>
<ha-switch checked disabled>有効（無効状態）</ha-switch>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `checked` | `boolean` | `false` | チェック状態 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | フォーム値 |
| `name` | `string` | `''` | フォーム名 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | チェック状態が変更された時 | `CustomEvent<boolean>` |

## React

```tsx
import { Switch } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    >
      通知を有効化
    </Switch>
  );
}
```

## Vue

```vue
<template>
  <HaSwitch v-model="enabled">
    通知を有効化
  </HaSwitch>
</template>

<script setup>
import { ref } from 'vue';
import { Switch as HaSwitch } from '@hidearea-design/vue';

const enabled = ref(false);
</script>
```

## 使用例

### 設定パネル

```html
<ha-card>
  <h3>通知設定</h3>

  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ha-switch checked>メール通知</ha-switch>
    <ha-switch>プッシュ通知</ha-switch>
    <ha-switch checked>SMS通知</ha-switch>
  </div>
</ha-card>
```

### FormGroup と組み合わせる

```html
<ha-form-group
  label="プライバシー設定"
  helper-text="プロフィールの公開設定を変更できます"
>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <ha-switch name="public_profile" checked>
      プロフィールを公開
    </ha-switch>
    <ha-switch name="show_email">
      メールアドレスを表示
    </ha-switch>
    <ha-switch name="show_activity" checked>
      アクティビティを表示
    </ha-switch>
  </div>
</ha-form-group>
```

### 説明付きスイッチ

```html
<div style="display: flex; align-items: center; gap: 12px;">
  <ha-switch id="dark-mode"></ha-switch>
  <label for="dark-mode">
    <strong>ダークモード</strong>
    <div style="font-size: 12px; color: var(--color-gray-600);">
      テーマをダークモードに変更します
    </div>
  </label>
</div>
```

### 動的な設定

```tsx
import { Switch, Card, Stack } from '@hidearea-design/react';
import { useState } from 'react';

function SettingsPanel() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    newsletter: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Card>
      <h3>通知設定</h3>
      <Stack direction="vertical" gap="4">
        <Switch
          checked={settings.emailNotifications}
          onChange={() => handleToggle('emailNotifications')}
        >
          メール通知
        </Switch>
        <Switch
          checked={settings.pushNotifications}
          onChange={() => handleToggle('pushNotifications')}
        >
          プッシュ通知
        </Switch>
        <Switch
          checked={settings.smsNotifications}
          onChange={() => handleToggle('smsNotifications')}
        >
          SMS通知
        </Switch>
        <Switch
          checked={settings.newsletter}
          onChange={() => handleToggle('newsletter')}
        >
          ニュースレター
        </Switch>
      </Stack>
    </Card>
  );
}
```

### 条件付き有効化

```tsx
import { Switch, Alert } from '@hidearea-design/react';
import { useState } from 'react';

function ConditionalSwitch() {
  const [isPremium, setIsPremium] = useState(false);
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  return (
    <div>
      <Switch
        checked={isPremium}
        onChange={(e) => setIsPremium(e.target.checked)}
      >
        プレミアムプラン
      </Switch>

      <Switch
        checked={advancedFeatures}
        onChange={(e) => setAdvancedFeatures(e.target.checked)}
        disabled={!isPremium}
      >
        高度な機能
      </Switch>

      {!isPremium && (
        <Alert variant="info" style={{ marginTop: '8px' }}>
          高度な機能を使用するにはプレミアムプランが必要です
        </Alert>
      )}
    </div>
  );
}
```

## Checkbox との違い

Switch は ON/OFF の明確な状態切り替えに使用します：

- **Switch を使用**: 設定の有効/無効、機能の ON/OFF
- **Checkbox を使用**: 複数選択、同意確認、リスト項目の選択

```html
<!-- 設定の切り替え: Switch -->
<ha-switch>ダークモード</ha-switch>
<ha-switch>自動保存</ha-switch>

<!-- 同意や選択: Checkbox -->
<ha-checkbox>利用規約に同意する</ha-checkbox>
<ha-checkbox>ニュースレターを受け取る</ha-checkbox>
```

## アクセシビリティ

### ARIAサポート

`<ha-switch>` コンポーネントは、WCAG 2.1 AA基準に準拠したアクセシビリティ機能を提供します。

- **role**: `switch` （自動設定）
- **aria-checked**: スイッチの状態を表します
  - `true`: オン（有効）
  - `false`: オフ（無効）
- **aria-disabled**: `disabled` 属性が設定されている場合、自動的に `true` に設定
- **aria-required**: `required` 属性が設定されている場合、自動的に `true` に設定
- **aria-labelledby**: ラベルとの関連付けを自動管理

### キーボード操作

| キー | アクション |
|------|----------|
| `Tab` | フォーカス移動 |
| `Shift + Tab` | 逆方向にフォーカス移動 |
| `Space` | スイッチの状態をトグル（オン⇔オフ） |
| `Enter` | スイッチの状態をトグル（オン⇔オフ） |

### スクリーンリーダー

`<ha-switch>` は主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます：

- スイッチの役割（トグルスイッチ）
- 現在の状態（オン/オフ）
- ラベルテキスト
- 無効状態
- 必須フィールド

### フォームラベルの関連付け

```html
<!-- Good ✓: スロットでラベルを提供 -->
<ha-switch name="darkMode">
  ダークモードを有効化
</ha-switch>

<!-- Good ✓: aria-label で明示的にラベル -->
<ha-switch name="notifications" aria-label="通知を有効にする"></ha-switch>

<!-- Good ✓: ha-form-group と組み合わせ -->
<ha-form-group label="プライバシー設定">
  <ha-switch name="publicProfile">プロフィールを公開</ha-switch>
  <ha-switch name="showEmail">メールアドレスを表示</ha-switch>
</ha-form-group>

<!-- Good ✓: 説明付きラベル -->
<div>
  <ha-switch id="autosave"></ha-switch>
  <label for="autosave">
    <strong>自動保存</strong>
    <p style="font-size: 12px; color: var(--color-gray-600);">
      編集内容を自動的に保存します
    </p>
  </label>
</div>

<!-- Bad ✗: ラベルなし -->
<ha-switch name="setting"></ha-switch>
```

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* カラー */
var(--component-switch-background-off)
var(--component-switch-background-on)
var(--component-switch-background-disabled)
var(--component-switch-thumb-color)
var(--component-switch-border-color)

/* サイズ */
var(--component-switch-width-sm)     /* 36px */
var(--component-switch-width-md)     /* 44px */
var(--component-switch-width-lg)     /* 52px */
var(--component-switch-height-sm)    /* 20px */
var(--component-switch-height-md)    /* 24px */
var(--component-switch-height-lg)    /* 28px */
var(--component-switch-thumb-size-sm)  /* 16px */
var(--component-switch-thumb-size-md)  /* 20px */
var(--component-switch-thumb-size-lg)  /* 24px */

/* スペーシング */
var(--spacing-xs)  /* スイッチとラベル間 */

/* その他 */
var(--state-focus-ring-color)
var(--state-focus-ring-width)
var(--state-disabled-opacity)
var(--transition-duration-normal)  /* スムーズなアニメーション */
```

### カスタムCSS変数

Shadow DOM外部からカスタマイズ可能なCSS変数：

```css
ha-switch {
  /* サイズ調整 */
  --switch-width: 44px;
  --switch-height: 24px;
  --switch-thumb-size: 20px;
  --switch-padding: 2px;

  /* カラー */
  --switch-bg: var(--color-gray-300);
  --switch-bg-hover: var(--color-gray-400);
  --switch-checked-bg: var(--color-primary-500);
  --switch-checked-bg-hover: var(--color-primary-600);
  --switch-thumb-color: white;
  --switch-border-color: transparent;

  /* レイアウト */
  --switch-gap: 8px;  /* スイッチとラベル間 */

  /* フォーカスリング */
  --switch-focus-ring-color: var(--color-primary-300);
  --switch-focus-ring-width: 2px;
  --switch-focus-ring-offset: 2px;

  /* アニメーション */
  --switch-transition-duration: 200ms;
  --switch-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Shadow DOMパーツ

`::part()` を使用してShadow DOM内部のスタイルをカスタマイズ：

```css
/* スイッチトラック（背景） */
ha-switch::part(track) {
  border: 2px solid var(--color-gray-400);
  border-radius: 100px;
}

/* スイッチサム（丸い部分） */
ha-switch::part(thumb) {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 200ms ease;
}

/* ラベルテキスト */
ha-switch::part(label) {
  font-weight: 500;
  color: var(--color-gray-800);
}

/* ホバー状態 */
ha-switch:hover::part(track) {
  background-color: var(--color-gray-400);
}

/* オン状態 */
ha-switch[checked]::part(track) {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

ha-switch[checked]:hover::part(track) {
  background-color: var(--color-primary-600);
}

/* オン状態のサム位置 */
ha-switch[checked]::part(thumb) {
  transform: translateX(calc(var(--switch-width) - var(--switch-thumb-size) - var(--switch-padding) * 2));
}
```

## ベストプラクティス

### Do's ✓

- **即座に反映される設定に使用**: ユーザーの操作で即座に設定が変わる場合にスイッチを使用
- **明確なラベル**: オン/オフの意味が明確なラベルテキストを提供
- **適切なデフォルト状態**: 最も一般的または安全な状態を初期値に設定
- **状態変化の視覚的フィードバック**: アニメーションで状態変化を明確に表現
- **説明テキストの追加**: 必要に応じて設定の詳細説明を提供

```html
<!-- Good ✓: 明確なラベルと説明 -->
<ha-form-group label="通知設定">
  <ha-switch name="emailNotifications" checked>
    <div>
      <strong>メール通知</strong>
      <p style="font-size: 12px; color: var(--color-gray-600);">
        重要な更新をメールで受け取ります
      </p>
    </div>
  </ha-switch>
  <ha-switch name="pushNotifications">
    <div>
      <strong>プッシュ通知</strong>
      <p style="font-size: 12px; color: var(--color-gray-600);">
        リアルタイムで通知を受け取ります
      </p>
    </div>
  </ha-switch>
</ha-form-group>
```

### Don'ts ✗

- **Checkboxの代わりに使用しない**: 同意や選択にはCheckboxを使用
- **フォーム送信が必要な設定**: 送信ボタンが必要な設定にはCheckboxを使用
- **曖昧なラベル**: 「有効化」「オン」だけのラベルは避ける（何を有効化するのか明示）
- **過度な数のスイッチ**: 5個以上のスイッチが並ぶ場合はUIパターンを再検討

```html
<!-- Bad ✗: Checkboxで十分なケース -->
<ha-switch name="terms">利用規約に同意する</ha-switch>
<!-- 同意確認には ha-checkbox を使用 -->

<!-- Bad ✗: フォーム送信が必要 -->
<form>
  <ha-switch name="subscribe">ニュースレター購読</ha-switch>
  <button type="submit">保存</button>
</form>
<!-- この場合は ha-checkbox を使用 -->

<!-- Bad ✗: 曖昧なラベル -->
<ha-switch>有効化</ha-switch>
<!-- 何を有効化するのか明示する -->

<!-- Good ✓: 明確なラベル -->
<ha-switch>ダークモードを有効化</ha-switch>
```

## よくある質問

### スイッチの状態をプログラムで変更するには？

ReactとVueでstate/refを更新することで状態を変更できます。

**React:**
```tsx
import { Switch } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const enableDarkMode = () => {
    setDarkMode(true);
    // ダークモードのテーマを適用
    document.body.classList.add('dark');
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setDarkMode(isChecked);
    document.body.classList.toggle('dark', isChecked);
  };

  return (
    <div>
      <Switch checked={darkMode} onChange={handleToggle}>
        ダークモード
      </Switch>
      <button onClick={enableDarkMode}>ダークモードを有効化</button>
    </div>
  );
}
```

**Vue:**
```vue
<template>
  <div>
    <HaSwitch v-model="darkMode" @change="handleToggle">
      ダークモード
    </HaSwitch>
    <button @click="enableDarkMode">ダークモードを有効化</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Switch as HaSwitch } from '@hidearea-design/vue';

const darkMode = ref(false);

const handleToggle = () => {
  document.body.classList.toggle('dark', darkMode.value);
};

const enableDarkMode = () => {
  darkMode.value = true;
  document.body.classList.add('dark');
};
</script>
```

### 複数のスイッチを管理するには？

オブジェクトまたはMapを使用して複数のスイッチ状態を管理できます。

```tsx
import { Switch } from '@hidearea-design/react';
import { useState } from 'react';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  newsletter: boolean;
}

function NotificationPanel() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: true,
    push: false,
    sms: false,
    newsletter: true,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
  };

  return (
    <div>
      <Switch
        checked={settings.email}
        onChange={() => handleToggle('email')}
      >
        メール通知
      </Switch>
      <Switch
        checked={settings.push}
        onChange={() => handleToggle('push')}
      >
        プッシュ通知
      </Switch>
      <Switch
        checked={settings.sms}
        onChange={() => handleToggle('sms')}
      >
        SMS通知
      </Switch>
      <Switch
        checked={settings.newsletter}
        onChange={() => handleToggle('newsletter')}
      >
        ニュースレター
      </Switch>
      <button onClick={saveSettings}>設定を保存</button>
    </div>
  );
}
```

### スイッチ切り替え時に確認ダイアログを表示するには？

非同期処理や確認ダイアログを含むスイッチ操作を実装できます。

```tsx
import { Switch } from '@hidearea-design/react';
import { useState } from 'react';

function ConfirmableSwitch() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;

    // 無効化する場合は確認
    if (!newValue) {
      const confirmed = window.confirm(
        '二要素認証を無効にすると、アカウントのセキュリティが低下します。\n本当に無効にしますか？'
      );

      if (!confirmed) {
        // キャンセルされた場合は状態を戻す
        return;
      }
    }

    // APIリクエスト
    try {
      await fetch('/api/security/2fa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newValue }),
      });

      setTwoFactorAuth(newValue);
    } catch (error) {
      alert('設定の更新に失敗しました');
    }
  };

  return (
    <Switch checked={twoFactorAuth} onChange={handleToggle}>
      二要素認証を有効化
    </Switch>
  );
}
```

### SwitchとCheckboxのどちらを使うべきですか？

用途に応じて使い分けます：

**Switchを使用する場合:**
- 設定の即座の有効/無効切り替え
- システムやアプリの状態制御
- オン/オフが明確な二択

```html
<ha-switch>ダークモード</ha-switch>
<ha-switch>自動保存</ha-switch>
<ha-switch>位置情報を有効化</ha-switch>
```

**Checkboxを使用する場合:**
- フォーム送信が必要な選択
- 複数の項目から選択（複数選択可）
- 同意確認やオプトイン

```html
<ha-checkbox>利用規約に同意する</ha-checkbox>
<ha-checkbox>ニュースレターを受け取る</ha-checkbox>
<ha-checkbox>プライバシーポリシーに同意する</ha-checkbox>
```

**判断基準:**
- 即座に反映されるか？ → Switch
- フォーム送信が必要か？ → Checkbox
- 複数選択可能か？ → Checkbox
- 同意・確認か？ → Checkbox

## 関連コンポーネント

- [Checkbox](/components/checkbox) - 複数選択やフォーム送信用
- [Radio](/components/radio) - 単一選択用ラジオボタン
- [Button](/components/button) - アクション実行用ボタン
- [Form Group](/components/form-group) - フォーム要素のグループ化

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { SwitchProps } from '@hidearea-design/core';

interface SwitchProps {
  /**
   * スイッチの状態（オン/オフ）
   * @default false
   */
  checked?: boolean;

  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;

  /**
   * 必須フィールド
   * @default false
   */
  required?: boolean;

  /**
   * サイズバリアント
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * フォーム送信時の値
   */
  value?: string;

  /**
   * フォームフィールド名
   */
  name?: string;

  /**
   * 状態変更時のイベントハンドラ
   */
  onChange?: (event: CustomEvent<boolean>) => void;
}
```

## トラブルシューティング

### スイッチの状態が変更されない（React）

**問題**: スイッチをクリックしても状態が変わらない

**原因**: `checked` プロパティを制御しているが、`onChange` ハンドラが適切に設定されていない

**解決策**:
```tsx
// Bad ✗: onChange がないため状態が更新されない
<Switch checked={enabled}>通知</Switch>

// Good ✓: onChange で状態を更新
<Switch
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
>
  通知
</Switch>
```

### アニメーションがカクつく

**問題**: スイッチのオン/オフ切り替え時のアニメーションが滑らかでない

**原因**: CSSトランジションが適切に設定されていない、またはブラウザの描画パフォーマンス

**解決策**:
```css
/* GPU アクセラレーションを有効化 */
ha-switch::part(thumb) {
  will-change: transform;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* トランジションの対象を限定 */
ha-switch::part(track) {
  transition: background-color 200ms ease;
}

/* 複雑な計算を避ける */
ha-switch[checked]::part(thumb) {
  transform: translateX(20px); /* 固定値を使用 */
}
```

### 状態がローカルストレージに保存されない

**問題**: ページをリロードするとスイッチの状態が初期値に戻る

**原因**: 状態管理がメモリ内のみで、永続化されていない

**解決策**:
```tsx
import { Switch } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function PersistentSwitch() {
  const [darkMode, setDarkMode] = useState(() => {
    // 初期値をlocalStorageから取得
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // 状態が変わるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)}>
      ダークモード
    </Switch>
  );
}
```

**カスタムフック版:**
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// 使用例
function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  return (
    <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)}>
      ダークモード
    </Switch>
  );
}
```

### フォーム送信時に値が取得できない

**問題**: フォームを送信してもスイッチの値が含まれない

**原因**: `name` 属性が設定されていない、またはスイッチがオフの場合は値が送信されない仕様

**解決策**:
```html
<!-- name 属性を設定 -->
<ha-switch name="notifications" value="enabled">
  通知を有効化
</ha-switch>

<!-- オフの場合も値を送信したい場合はhidden inputを使用 -->
<input type="hidden" name="notifications" value="disabled">
<ha-switch name="notifications" value="enabled">
  通知を有効化
</ha-switch>
```

**JavaScript での取得:**
```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);

  // スイッチがオンの場合のみ値が取得される
  const notifications = formData.get('notifications');
  console.log(notifications); // 'enabled' または null

  // チェック状態をbooleanで取得したい場合
  const isEnabled = notifications === 'enabled';
};
```
