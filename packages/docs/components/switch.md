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

- `role="switch"` が自動的に設定されます
- `aria-checked` 属性で状態が管理されます
- `disabled` 属性が設定されている場合、`aria-disabled="true"` が自動的に設定されます
- キーボード操作に対応しています（Space キー）
- ラベルとの関連付けをサポートしています

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-switch {
  --switch-width: 44px;
  --switch-height: 24px;
  --switch-padding: 2px;
  --switch-bg: var(--color-gray-300);
  --switch-checked-bg: var(--color-primary-500);
  --switch-thumb-size: 20px;
}
```
