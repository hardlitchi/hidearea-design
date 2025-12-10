# Switch (スイッチ) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/components/forms/switch.yaml`
**ステータス:** ✅ 実装済み (Phase 4)

---

## 概要

スイッチコンポーネントは、オン/オフの状態を切り替えるインタラクティブなトグルスイッチです。設定の有効/無効化や即座に反映される状態変更に適しています。

### 用途

- 設定のオン/オフ切り替え
- 通知の有効/無効化
- 機能の即座な切り替え
- ダークモードの切り替え
- 表示/非表示の制御

---

## サイズバリアント

### 1. Small (小)

コンパクトな場所で使用する小さいスイッチです。

**トラックサイズ:** 32px × 18px (2rem × 1.125rem)
**つまみサイズ:** 14px (0.875rem)

**使用場面:**
- 密集した設定画面
- テーブル内の切り替え
- コンパクトなUI

**トークン:**
- `component.switch.track.width.small`
- `component.switch.track.height.small`
- `component.switch.thumb.size.small`

### 2. Default (デフォルト)

標準サイズのスイッチです。最も一般的に使用されます。

**トラックサイズ:** 44px × 24px (2.75rem × 1.5rem)
**つまみサイズ:** 20px (1.25rem)

**使用場面:**
- 通常の設定画面
- フォーム内の切り替え
- 一般的なUI

**トークン:**
- `component.switch.track.width.default`
- `component.switch.track.height.default`
- `component.switch.thumb.size.default`

### 3. Large (大)

視認性を高めたい場合に使用する大きなスイッチです。

**トラックサイズ:** 56px × 32px (3.5rem × 2rem)
**つまみサイズ:** 28px (1.75rem)

**使用場面:**
- 重要な設定項目
- モバイルUI
- 高齢者向けインターフェース

**トークン:**
- `component.switch.track.width.large`
- `component.switch.track.height.large`
- `component.switch.thumb.size.large`

---

## 状態

### Off (オフ)
スイッチがオフの通常状態です。

### Off + Hover (オフ + ホバー)
オフ状態でマウスカーソルがスイッチ上にある状態です。

### On (オン)
スイッチがオンの状態です。つまみが右側に移動し、トラックの色が変わります。

### On + Hover (オン + ホバー)
オン状態でマウスカーソルがスイッチ上にある状態です。

### Focus (フォーカス)
キーボードフォーカスがある状態で、フォーカスリングが表示されます。

### Disabled + Off (無効 + オフ)
オフ状態で操作できない状態です。

### Disabled + On (無効 + オン)
オン状態で操作できない状態です。

---

## トークン一覧

### Track Size (トラックサイズ)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.track.width.default` | `2.75rem` | トラックのデフォルト幅 (44px) |
| `component.switch.track.width.small` | `2rem` | トラックの小さい幅 (32px) |
| `component.switch.track.width.large` | `3.5rem` | トラックの大きい幅 (56px) |
| `component.switch.track.height.default` | `1.5rem` | トラックのデフォルト高さ (24px) |
| `component.switch.track.height.small` | `1.125rem` | トラックの小さい高さ (18px) |
| `component.switch.track.height.large` | `2rem` | トラックの大きい高さ (32px) |

### Track Background (トラック背景色)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.background.off.default` | `{border.default}` | オフ状態のデフォルト背景色 |
| `component.switch.background.off.hover` | `{border.strong}` | オフ状態でホバー時の背景色 |
| `component.switch.background.off.disabled` | `{background.tertiary}` | オフ状態で無効時の背景色 |
| `component.switch.background.on.default` | `{primary.default}` | オン状態のデフォルト背景色 |
| `component.switch.background.on.hover` | `{primary.hover}` | オン状態でホバー時の背景色 |
| `component.switch.background.on.disabled` | `{border.default}` | オン状態で無効時の背景色 |

### Border (ボーダー)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.border.width` | `{border.width.1}` | ボーダーの幅 |
| `component.switch.border.color.off` | `{border.default}` | オフ状態のボーダー色 |
| `component.switch.border.color.on` | `{primary.default}` | オン状態のボーダー色 |
| `component.switch.border.color.disabled` | `{border.subtle}` | 無効時のボーダー色 |

### Border Radius (角丸)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.borderRadius.track` | `{border.radius.full}` | トラックの角丸（完全な楕円） |
| `component.switch.borderRadius.thumb` | `{border.radius.full}` | つまみの角丸（完全な円） |

### Thumb (つまみ)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.thumb.size.default` | `1.25rem` | つまみのデフォルトサイズ (20px) |
| `component.switch.thumb.size.small` | `0.875rem` | つまみの小さいサイズ (14px) |
| `component.switch.thumb.size.large` | `1.75rem` | つまみの大きいサイズ (28px) |
| `component.switch.thumb.background.default` | `{background.primary}` | つまみのデフォルト背景色 |
| `component.switch.thumb.background.disabled` | `{foreground.tertiary}` | 無効時のつまみ背景色 |
| `component.switch.thumb.shadow` | `{shadow.sm}` | つまみの影 |
| `component.switch.thumb.offset` | `0.125rem` | トラック端からのつまみオフセット (2px) |

### Focus Ring (フォーカスリング)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.focusRing.width` | `3px` | フォーカスリングの幅 |
| `component.switch.focusRing.offset` | `2px` | フォーカスリングのオフセット |
| `component.switch.focusRing.color.default` | `{primary.subtle}` | フォーカスリングの色 |

### Label (ラベル)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.label.fontSize` | `{font.size.base}` | ラベルのフォントサイズ |
| `component.switch.label.fontWeight` | `{font.weight.normal}` | ラベルのフォントウェイト |
| `component.switch.label.color.default` | `{foreground.primary}` | ラベルのデフォルト色 |
| `component.switch.label.color.disabled` | `{foreground.tertiary}` | 無効時のラベル色 |
| `component.switch.label.spacing` | `{spacing.2}` | スイッチとラベルの間隔 |

### Helper Text (ヘルパーテキスト)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.helper.fontSize` | `{font.size.sm}` | ヘルパーテキストのフォントサイズ |
| `component.switch.helper.color.default` | `{foreground.secondary}` | ヘルパーテキストのデフォルト色 |
| `component.switch.helper.color.error` | `{error.default}` | エラー時のヘルパーテキスト色 |
| `component.switch.helper.spacing` | `{spacing.2}` | ラベルとヘルパーテキストの間隔 |

### Icon (アイコン - オプション)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.icon.size.default` | `0.75rem` | アイコンのデフォルトサイズ (12px) |
| `component.switch.icon.size.small` | `0.625rem` | アイコンの小さいサイズ (10px) |
| `component.switch.icon.size.large` | `1rem` | アイコンの大きいサイズ (16px) |
| `component.switch.icon.color.off` | `{foreground.tertiary}` | オフ状態のアイコン色 |
| `component.switch.icon.color.on` | `{foreground.inverse}` | オン状態のアイコン色 |

### Transition (トランジション)

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.switch.transition.duration` | `{animation.duration.base}` | トランジションの時間 |
| `component.switch.transition.timing` | `{animation.easing.ease}` | トランジションのイージング |
| `component.switch.transition.properties` | `background-color, border-color, transform, box-shadow` | トランジション対象のプロパティ |

---

## 使用例

### HTML

```html
<!-- 基本的なスイッチ -->
<div class="switch-group">
  <label class="switch-label">
    <input type="checkbox" class="switch-input" checked>
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-text">通知を有効にする</span>
  </label>
  <span class="switch-helper">新しいメッセージの通知を受け取ります</span>
</div>

<!-- 小サイズ -->
<label class="switch-label">
  <input type="checkbox" class="switch-input switch-small">
  <span class="switch-track switch-track-small">
    <span class="switch-thumb switch-thumb-small"></span>
  </span>
  <span class="switch-text">コンパクト設定</span>
</label>

<!-- 大サイズ -->
<label class="switch-label">
  <input type="checkbox" class="switch-input switch-large" checked>
  <span class="switch-track switch-track-large">
    <span class="switch-thumb switch-thumb-large"></span>
  </span>
  <span class="switch-text">ダークモード</span>
</label>

<!-- 無効状態 -->
<label class="switch-label">
  <input type="checkbox" class="switch-input" disabled>
  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>
  <span class="switch-text">無効なオプション</span>
</label>

<!-- オン状態で無効 -->
<label class="switch-label">
  <input type="checkbox" class="switch-input" checked disabled>
  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>
  <span class="switch-text">ロックされた設定</span>
</label>
```

### CSS

```css
/* スイッチグループ */
.switch-group {
  display: flex;
  flex-direction: column;
  gap: var(--component-switch-label-spacing);
}

/* ラベル */
.switch-label {
  display: inline-flex;
  align-items: center;
  gap: var(--component-switch-label-spacing);
  cursor: pointer;
  font-size: var(--component-switch-label-font-size);
  font-weight: var(--component-switch-label-font-weight);
  color: var(--component-switch-label-color-default);
  user-select: none;
}

.switch-label:has(.switch-input:disabled) {
  color: var(--component-switch-label-color-disabled);
  cursor: not-allowed;
}

/* 非表示のチェックボックス */
.switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* トラック（背景） */
.switch-track {
  position: relative;
  display: inline-block;
  width: var(--component-switch-track-width-default);
  height: var(--component-switch-track-height-default);
  background-color: var(--component-switch-background-off-default);
  border: var(--component-switch-border-width) solid
          var(--component-switch-border-color-off);
  border-radius: var(--component-switch-border-radius-track);
  transition: var(--component-switch-transition-properties)
              var(--component-switch-transition-duration)
              var(--component-switch-transition-timing);
  flex-shrink: 0;
}

.switch-input:hover:not(:disabled) + .switch-track {
  background-color: var(--component-switch-background-off-hover);
}

.switch-input:checked + .switch-track {
  background-color: var(--component-switch-background-on-default);
  border-color: var(--component-switch-border-color-on);
}

.switch-input:checked:hover:not(:disabled) + .switch-track {
  background-color: var(--component-switch-background-on-hover);
}

.switch-input:disabled + .switch-track {
  background-color: var(--component-switch-background-off-disabled);
  border-color: var(--component-switch-border-color-disabled);
}

.switch-input:checked:disabled + .switch-track {
  background-color: var(--component-switch-background-on-disabled);
}

/* つまみ（ハンドル） */
.switch-thumb {
  position: absolute;
  top: var(--component-switch-thumb-offset);
  left: var(--component-switch-thumb-offset);
  width: var(--component-switch-thumb-size-default);
  height: var(--component-switch-thumb-size-default);
  background-color: var(--component-switch-thumb-background-default);
  border-radius: var(--component-switch-border-radius-thumb);
  box-shadow: var(--component-switch-thumb-shadow);
  transition: transform var(--component-switch-transition-duration)
              var(--component-switch-transition-timing);
}

.switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(
    calc(
      var(--component-switch-track-width-default) -
      var(--component-switch-thumb-size-default) -
      var(--component-switch-thumb-offset) * 2
    )
  );
}

.switch-input:disabled + .switch-track .switch-thumb {
  background-color: var(--component-switch-thumb-background-disabled);
}

/* フォーカスリング */
.switch-input:focus + .switch-track {
  outline: none;
  box-shadow: var(--component-switch-thumb-shadow),
              0 0 0 var(--component-switch-focus-ring-offset) transparent,
              0 0 0 calc(var(--component-switch-focus-ring-width) +
                var(--component-switch-focus-ring-offset))
                var(--component-switch-focus-ring-color-default);
}

/* サイズバリアント - Small */
.switch-track-small {
  width: var(--component-switch-track-width-small);
  height: var(--component-switch-track-height-small);
}

.switch-thumb-small {
  width: var(--component-switch-thumb-size-small);
  height: var(--component-switch-thumb-size-small);
}

.switch-small:checked + .switch-track-small .switch-thumb-small {
  transform: translateX(
    calc(
      var(--component-switch-track-width-small) -
      var(--component-switch-thumb-size-small) -
      var(--component-switch-thumb-offset) * 2
    )
  );
}

/* サイズバリアント - Large */
.switch-track-large {
  width: var(--component-switch-track-width-large);
  height: var(--component-switch-track-height-large);
}

.switch-thumb-large {
  width: var(--component-switch-thumb-size-large);
  height: var(--component-switch-thumb-size-large);
}

.switch-large:checked + .switch-track-large .switch-thumb-large {
  transform: translateX(
    calc(
      var(--component-switch-track-width-large) -
      var(--component-switch-thumb-size-large) -
      var(--component-switch-thumb-offset) * 2
    )
  );
}

/* ヘルパーテキスト */
.switch-helper {
  font-size: var(--component-switch-helper-font-size);
  color: var(--component-switch-helper-color-default);
  margin-left: calc(
    var(--component-switch-track-width-default) +
    var(--component-switch-label-spacing)
  );
}

.switch-helper-error {
  color: var(--component-switch-helper-color-error);
}
```

### React

```tsx
import React from 'react';

type SwitchSize = 'small' | 'default' | 'large';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  helper?: string;
  disabled?: boolean;
  size?: SwitchSize;
  name?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  helper,
  disabled = false,
  size = 'default',
  name,
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const sizeClass = size !== 'default' ? `switch-${size}` : '';
  const trackSizeClass = size !== 'default' ? `switch-track-${size}` : '';
  const thumbSizeClass = size !== 'default' ? `switch-thumb-${size}` : '';

  return (
    <div className="switch-group">
      <label className="switch-label">
        <input
          type="checkbox"
          className={`switch-input ${sizeClass}`.trim()}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          role="switch"
          aria-checked={checked}
        />
        <span className={`switch-track ${trackSizeClass}`.trim()}>
          <span className={`switch-thumb ${thumbSizeClass}`.trim()}></span>
        </span>
        <span className="switch-text">{label}</span>
      </label>
      {helper && <span className="switch-helper">{helper}</span>}
    </div>
  );
}

// 使用例
const [notifications, setNotifications] = useState(true);
const [darkMode, setDarkMode] = useState(false);

<Switch
  label="通知を有効にする"
  checked={notifications}
  onChange={setNotifications}
  helper="新しいメッセージの通知を受け取ります"
/>

<Switch
  label="ダークモード"
  checked={darkMode}
  onChange={setDarkMode}
  size="large"
/>
```

---

## アクセシビリティ

### キーボード操作

- **Tab**: スイッチにフォーカス
- **Space / Enter**: スイッチのオン/オフを切り替え
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- 基本的なスイッチ -->
<label class="switch-label">
  <input
    type="checkbox"
    class="switch-input"
    role="switch"
    aria-checked="true"
    aria-describedby="switch-helper"
  >
  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>
  <span class="switch-text">通知を有効にする</span>
</label>
<span id="switch-helper" class="switch-helper">
  新しいメッセージの通知を受け取ります
</span>

<!-- ラベルが別の場所にある場合 -->
<span id="theme-label">テーマ設定</span>
<label class="switch-label">
  <input
    type="checkbox"
    class="switch-input"
    role="switch"
    aria-checked="false"
    aria-labelledby="theme-label"
  >
  <span class="switch-track">
    <span class="switch-thumb"></span>
  </span>
</label>
```

### フォーカススタイル

フォーカスリングは WCAG 2.1 のアクセシビリティガイドラインに準拠しています：
- 3px の幅
- 2px のオフセット
- 十分なコントラスト比

---

## ベストプラクティス

### ✅ 推奨

1. **即座に反映される操作に使用**
   - スイッチを切り替えたら即座に効果が現れる
   - 保存ボタンなどは不要

2. **明確なラベル**
   - オンの状態で何が起こるか明確に記述
   - 「〜を有効にする」形式が推奨

3. **適切な初期状態**
   - デフォルトは通常オフ
   - 重要な設定はオンの状態で開始

4. **ヘルパーテキスト**
   - 切り替えた時の効果を説明
   - 必要に応じて詳細情報を提供

5. **適切なサイズ**
   - コンテキストに応じたサイズを選択
   - モバイルでは large を検討

### ❌ 非推奨

1. **フォーム送信が必要な操作**
   - 保存が必要な設定は Checkbox を使用
   - 即座に反映されない場合は混乱を招く

2. **複数の選択肢から1つを選ぶ**
   - 排他的な選択には Radio を使用
   - A/B の切り替えのみに使用

3. **ラベルなし**
   - 必ずラベルテキストを提供
   - アイコンだけでは不十分

4. **曖昧な状態表現**
   - オン/オフ以外の状態は避ける
   - 3状態が必要なら別のUIを検討

---

## Switch vs Checkbox

### Switch を使用する場合

- 即座に反映される設定
- オン/オフの2状態のみ
- 単一の設定項目

例: 通知の有効化、ダークモードの切り替え

### Checkbox を使用する場合

- フォーム送信が必要
- 複数の独立した選択肢
- 同意や承認の確認

例: 利用規約への同意、複数選択フィルター

---

## バリエーション

### アイコン付きスイッチ

トラック内にアイコンを表示することで、状態をより明確にできます：

```html
<label class="switch-label">
  <input type="checkbox" class="switch-input switch-with-icon" checked>
  <span class="switch-track">
    <span class="switch-icon-off">✕</span>
    <span class="switch-icon-on">✓</span>
    <span class="switch-thumb"></span>
  </span>
  <span class="switch-text">機能を有効化</span>
</label>
```

```css
.switch-icon-off,
.switch-icon-on {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--component-switch-icon-size-default);
  transition: opacity var(--component-switch-transition-duration);
}

.switch-icon-off {
  left: var(--spacing-2);
  color: var(--component-switch-icon-color-off);
}

.switch-icon-on {
  right: var(--spacing-2);
  color: var(--component-switch-icon-color-on);
  opacity: 0;
}

.switch-input:checked + .switch-track .switch-icon-off {
  opacity: 0;
}

.switch-input:checked + .switch-track .switch-icon-on {
  opacity: 1;
}
```

### ローディング状態

非同期処理中の状態を表現：

```tsx
export function AsyncSwitch({ checked, onChange, loading }) {
  return (
    <label className={`switch-label ${loading ? 'switch-loading' : ''}`}>
      <input
        type="checkbox"
        className="switch-input"
        checked={checked}
        onChange={onChange}
        disabled={loading}
      />
      <span className="switch-track">
        {loading && <span className="switch-spinner"></span>}
        <span className="switch-thumb"></span>
      </span>
    </label>
  );
}
```

---

## テーマ対応

全てのスイッチトークンはテーマに対応しています。`data-theme` 属性の変更で自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <label class="switch-label">
    <input type="checkbox" class="switch-input" checked>
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-text">通知</span>
  </label>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <label class="switch-label">
    <input type="checkbox" class="switch-input" checked>
    <span class="switch-track">
      <span class="switch-thumb"></span>
    </span>
    <span class="switch-text">通知</span>
  </label>
</html>
```

---

## 関連コンポーネント

- [Checkbox](./checkbox.md) - 複数選択用
- [Radio](./radio.md) - 単一選択用
- [Button](./button.md) - アクション実行
- [Select](./select.md) - ドロップダウン選択

---

## 関連ドキュメント

- [アーキテクチャガイド](../アーキテクチャガイド.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
