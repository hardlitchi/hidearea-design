# TimePicker

時刻を選択するための汎用的なコンポーネントです。12時間/24時間表示、秒の表示、分単位の刻み設定、時刻の制限に対応します。

## 基本的な使い方

時刻を選択するためのシンプルな入力フィールドです。

```html
<ha-time-picker label="時刻を選択" helper-text="時刻を選択してください"></ha-time-picker>
```

## 12時間/24時間表示

`format` 属性で時刻の表示形式を切り替えられます。デフォルトは`"24"`です。

### 24時間表示 (デフォルト)

```html
<ha-time-picker format="24" label="24時間表示"></ha-time-picker>
```

### 12時間表示

`format="12"`を設定すると、AM/PMの切り替えも可能になります。

```html
<ha-time-picker format="12" label="12時間表示"></ha-time-picker>
```

## 秒の表示

`show-seconds` 属性を追加すると、秒の選択も可能になります。

```html
<ha-time-picker show-seconds label="秒を含む時刻選択"></ha-time-picker>
```

## 刻み設定

`hour-step`, `minute-step`, `second-step` 属性で、それぞれの単位の増減ステップを設定できます。

```html
<ha-time-picker minute-step="15" label="15分刻み"></ha-time-picker>
```

## 時刻の制限

`min-time`, `max-time` 属性で選択可能な時刻の範囲を制限できます。`disabled-hours`, `disabled-minutes` 属性で特定の時間や分を選択不可にできます。

### 最小・最大時刻

```html
<ha-time-picker
  min-time="09:00"
  max-time="17:00"
  label="営業時間内"
  helper-text="午前9時から午後5時まで選択可能"
></ha-time-picker>
```

### 特定の時間を無効化

`disabled-hours` および `disabled-minutes` 属性で、特定の時間や分を選択不可にできます。属性値はカンマ区切りの文字列で指定します。

```html
<ha-time-picker
  disabled-hours="12,13"
  label="ランチ時間をスキップ"
  helper-text="12時と13時は選択できません"
></ha-time-picker>
```

## ボタンの表示

`show-now-button` と `show-clear-button` 属性で、「現在時刻」ボタンと「クリア」ボタンを表示します。

```html
<ha-time-picker show-now-button show-clear-button label="ボタン付き時刻選択"></ha-time-picker>
```

## インライン表示

`inline` 属性を追加すると、時刻選択パネルが常に入力フィールドの下に表示されます。

```html
<ha-time-picker inline label="インライン表示"></ha-time-picker>
```

## 状態

### Disabled

`disabled` 属性を追加すると、コンポーネントが無効になり操作できなくなります。

```html
<ha-time-picker disabled label="無効な時刻ピッカー"></ha-time-picker>
```

### Required

`required` 属性を追加すると、時刻選択が必須であることを示します。

```html
<ha-time-picker required label="必須時刻ピッカー"></ha-time-picker>
```

### Readonly

`readonly` 属性を追加すると、入力フィールドは読み取り専用になります。時刻選択パネルからの選択は可能です。

```html
<ha-time-picker readonly value="14:30" label="読み取り専用時刻ピッカー"></ha-time-picker>
```

### Error

`error` 属性と `error-text` 属性を使用すると、エラー状態とエラーメッセージを表示できます。

```html
<ha-time-picker
  error
  error-text="無効な時刻が選択されました。"
  label="エラー状態"
></ha-time-picker>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `value` | `string` | `''` | 時刻の値（`HH:mm`または`HH:mm:ss`形式） |
| `format` | `'12' \| '24'` | `'24'` | 時刻の表示形式 |
| `show-seconds` | `boolean` | `false` | 秒の選択ピッカーを表示するか |
| `hour-step` | `number` | `1` | 時間の増減ステップ |
| `minute-step` | `number` | `1` | 分の増減ステップ |
| `second-step` | `number` | `1` | 秒の増減ステップ |
| `min-time` | `string` | `''` | 最小選択可能時刻 |
| `max-time` | `string` | `''` | 最大選択可能時刻 |
| `disabled-hours` | `number[]` | `[]` | 無効化する時間の配列 |
| `disabled-minutes` | `number[]` | `[]` | 無効化する分の配列 |
| `inline` | `boolean` | `false` | 時刻選択パネルを常時表示するか |
| `placeholder` | `string` | `'Select time'` | 入力フィールドのプレースホルダー |
| `label` | `string` | `''` | コンポーネントのラベル |
| `helper-text` | `string` | `''` | ヘルパーテキスト |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須フィールド |
| `error` | `boolean` | `false` | エラー状態 |
| `readonly` | `boolean` | `false` | 読み取り専用状態 |
| `error-text` | `string` | `''` | エラーメッセージ |
| `show-now-button` | `boolean` | `false` | 「現在時刻」ボタンを表示するか |
| `show-clear-button` | `boolean` | `false` | 「クリア」ボタンを表示するか |

## イベント

| イベント | ペイロード | 説明 |
|---|---|---|
| `time-select` | `{ value: string; hour: number; minute: number; second?: number; period?: 'AM' \| 'PM'; }` | 時刻が選択された時 |
| `time-clear` | `void` | 時刻がクリアされた時 |
| `picker-open` | `void` | ピッカーが開かれた時 |
| `picker-close` | `void` | ピッカーが閉じられた時 |

## メソッド (Public API)

コンポーネントインスタンスを通して、以下のメソッドを直接呼び出すことができます。

| メソッド | 説明 |
|---|---|
| `getValue(): string \| null` | 現在選択されている時刻を取得します。 |
| `setValue(value: string): void` | 時刻を設定します。 |
| `clear(): void` | 選択された時刻をクリアします。 |
| `open(): void` | ピッカーを開きます。 |
| `close(): void` | ピッカーを閉じます。 |
| `toggle(): void` | ピッカーの開閉状態を切り替えます。 |
| `setNow(): void` | 現在時刻を設定します。 |
| `setTime(hour: number, minute: number, second?: number): void` | 指定された時刻を設定します。 |
| `validate(): boolean` | 現在の状態がバリデーションルールを満たしているか確認します。 |
| `isTimeDisabled(hour: number, minute: number, second?: number): boolean` | 指定された時刻が無効化されているか確認します。 |

## React

```tsx
import { useState, useRef } from 'react';
import { TimePicker, TimePickerRef } from '@hidearea-design/react';

function MyTimePickerComponent() {
  const timePickerRef = useRef<TimePickerRef>(null);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);

  const handleTimeSelect = (detail: any) => {
    setSelectedTime(detail.value);
    console.log('Time selected:', detail.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>基本的な時刻選択</h3>
      <TimePicker
        label="時刻を選択"
        value={selectedTime}
        onTimeSelect={handleTimeSelect}
        showClearButton
      />
      <p>選択された時刻: {selectedTime}</p>

      <h3>12時間表示と秒付き</h3>
      <TimePicker
        format="12"
        showSeconds
        label="午前/午後と秒付き"
        helperText="12時間形式で秒も選択できます"
      />

      <h3>15分刻みと制限</h3>
      <TimePicker
        minuteStep={15}
        minTime="09:00"
        maxTime="17:00"
        disabledHours={[12]}
        label="予約時刻"
        helperText="午前9時から午後5時まで、12時は選択不可"
      />

      <h3>インライン表示と「現在時刻」ボタン</h3>
      <TimePicker
        inline
        showNowButton
        label="インライン時刻ピッカー"
      />

      <button onClick={() => timePickerRef.current?.open()}>
        ピッカーを開く (Ref)
      </button>
      <button onClick={() => timePickerRef.current?.setNow()}>
        現在時刻に設定 (Ref)
      </button>
    </div>
  );
}
```

## Vue

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <h3>基本的な時刻選択</h3>
    <TimePicker
      label="時刻を選択"
      :value="selectedTime"
      @time-select="handleTimeSelect"
      show-clear-button
    />
    <p>選択された時刻: {{ selectedTime }}</p>

    <h3>12時間表示と秒付き</h3>
    <TimePicker
      format="12"
      show-seconds
      label="午前/午後と秒付き"
      helper-text="12時間形式で秒も選択できます"
    />

    <h3>15分刻みと制限</h3>
    <TimePicker
      :minute-step="15"
      min-time="09:00"
      max-time="17:00"
      :disabled-hours="[12]"
      label="予約時刻"
      helper-text="午前9時から午後5時まで、12時は選択不可"
    />

    <h3>インライン表示と「現在時刻」ボタン</h3>
    <TimePicker
      inline
      show-now-button
      label="インライン時刻ピッカー"
    />

    <button @click="timePickerRef?.open()">
      ピッカーを開く (Ref)
    </button>
    <button @click="timePickerRef?.setNow()">
      現在時刻に設定 (Ref)
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TimePicker, type TimePickerRef } from '@hidearea-design/vue';

const timePickerRef = ref<TimePickerRef | null>(null);
const selectedTime = ref<string | undefined>(undefined);

const handleTimeSelect = (detail: any) => {
  selectedTime.value = detail.value;
  console.log('Time selected:', detail.value);
};
</script>

## アクセシビリティ

Time Pickerコンポーネントは、WCAG 2.1 AAに準拠し、時刻選択UIのアクセシビリティベストプラクティスに従っています。

### ARIAサポート

Time Pickerコンポーネントは自動的にARIA属性を適用します：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="combobox"` | 入力フィールド | コンボボックスであることを示す |
| `role="dialog"` | 時刻選択パネル | ダイアログであることを示す |
| `role="spinbutton"` | 時/分/秒の入力 | スピンボタンであることを示す |
| `aria-label` | 入力フィールド | フィールドの目的を説明 |
| `aria-labelledby` | 時刻選択パネル | パネルのラベルを参照 |
| `aria-expanded` | 入力フィールド | パネルの開閉状態を示す（true/false） |
| `aria-haspopup="dialog"` | 入力フィールド | ダイアログを開くことを示す |
| `aria-disabled="true"` | 入力フィールド | `disabled`属性が設定されている場合 |
| `aria-required="true"` | 入力フィールド | `required`属性が設定されている場合 |
| `aria-invalid="true"` | 入力フィールド | `error`属性が設定されている場合 |
| `aria-describedby` | 入力フィールド | ヘルパーテキストやエラーメッセージのIDを参照 |
| `aria-valuenow` | スピンボタン | 現在の値（時/分/秒） |
| `aria-valuemin` | スピンボタン | 最小値 |
| `aria-valuemax` | スピンボタン | 最大値 |
| `aria-valuetext` | スピンボタン | 値のテキスト表現（"14時"など） |

### キーボードナビゲーション

#### 入力フィールド（パネル閉じている時）

| キー | 動作 |
|-----|------|
| `Tab` | 入力フィールドにフォーカスを移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |
| `Space` / `Enter` | 時刻選択パネルを開く |
| `Arrow Down` | 時刻選択パネルを開く |
| `Escape` | パネルを閉じる（開いている場合） |

#### 時刻選択パネル（開いている時）

| キー | 動作 |
|-----|------|
| `Tab` | 次のコントロール（時→分→秒→AM/PM→ボタン）へ移動 |
| `Shift + Tab` | 前のコントロールへ移動 |
| `Arrow Up` | 現在のフィールドの値を増加（ステップに応じて） |
| `Arrow Down` | 現在のフィールドの値を減少（ステップに応じて） |
| `Page Up` | 値を大きく増加（時間の場合+5、分の場合+15） |
| `Page Down` | 値を大きく減少（時間の場合-5、分の場合-15） |
| `Home` | フィールドの最小値に設定 |
| `End` | フィールドの最大値に設定 |
| `Enter` | 現在の時刻を確定してパネルを閉じる |
| `Escape` | パネルを閉じる（変更をキャンセル） |
| `数字キー (0-9)` | 直接数値を入力 |

#### ボタン操作

| キー | 動作 |
|-----|------|
| `Enter` / `Space` | フォーカス中のボタンを実行 |

### スクリーンリーダーの対応

Time Pickerコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例

**入力フィールドフォーカス時**:
```
「時刻を選択、コンボボックス、閉じています、14:30」
（"Select time, combobox, collapsed, 14:30"）
```

**パネルを開いた時**:
```
「時刻を選択、ダイアログ、時刻選択パネル、14時30分」
（"Select time, dialog, Time picker panel, 14 hours 30 minutes"）
```

**時間フィールドにフォーカス時**:
```
「時、スピンボタン、14、0から23の範囲」
（"Hour, spinbutton, 14, minimum 0, maximum 23"）
```

**時間を変更した時**:
```
「15時」
（"15 hours"）
```

**必須フィールドの場合**:
```
「時刻を選択、コンボボックス、必須、閉じています」
（"Select time, combobox, required, collapsed"）
```

**エラー状態の場合**:
```
「時刻を選択、コンボボックス、無効な入力、無効な時刻が選択されました」
（"Select time, combobox, invalid entry, Invalid time selected"）
```

**12時間表示でAM/PM変更時**:
```
「午後、ボタン、2個中2番目」
（"PM, button, 2 of 2"）
```

**現在時刻ボタン**:
```
「現在時刻、ボタン」
（"Current time, button"）
```

#### ライブリージョン

時刻が変更された場合、スクリーンリーダーに通知されます：

```html
<ha-time-picker
  label="開始時刻"
  show-clear-button
  show-now-button
></ha-time-picker>

<!-- Time Pickerが自動的に生成するライブリージョン -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  時刻が14時30分に変更されました
</div>
```

### ラベルとの関連付け

Time Pickerには必ずラベルを設定してください：

```html
<!-- ✓ Good: label属性を使用（推奨） -->
<ha-time-picker
  label="開始時刻"
  helper-text="勤務開始時刻を選択してください"
  required
></ha-time-picker>

<!-- ✓ Good: aria-labelを使用 -->
<ha-time-picker
  aria-label="開始時刻"
  required
></ha-time-picker>

<!-- ✗ Avoid: ラベルなし（アクセシビリティ違反） -->
<ha-time-picker required></ha-time-picker>
```

### エラーメッセージとの関連付け

エラーメッセージは`aria-describedby`で自動的に関連付けられます：

```html
<ha-time-picker
  label="開始時刻"
  required
  error
  error-text="開始時刻を選択してください"
></ha-time-picker>

<!-- Time Pickerが生成するマークアップ（簡略化） -->
<label id="time-label">開始時刻 *</label>
<input
  role="combobox"
  aria-labelledby="time-label"
  aria-describedby="time-error"
  aria-invalid="true"
  aria-required="true"
/>
<div id="time-error" role="alert">開始時刻を選択してください</div>
```

### フォーカスインジケーター

キーボードユーザーのために、フォーカス状態が明確に表示されます：

```css
/* デフォルトのフォーカススタイル */
ha-time-picker:focus-within {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* パネル内のスピンボタンフォーカス */
ha-time-picker::part(spinbutton):focus {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: -2px;
  background-color: var(--color-primary-50);
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  ha-time-picker:focus-within {
    outline-width: 3px;
  }
}
```

### 無効化された時刻の通知

無効化された時刻を選択しようとすると、スクリーンリーダーに通知されます：

```html
<ha-time-picker
  label="予約時刻"
  min-time="09:00"
  max-time="17:00"
  disabled-hours="12"
  helper-text="12時（ランチタイム）は選択できません"
></ha-time-picker>

<!-- 無効な時刻を選択しようとした時 -->
<div role="alert" aria-live="assertive">
  12時は選択できません。別の時刻を選んでください。
</div>
```

## スタイルのカスタマイズ

### デザイントークン

Time Pickerコンポーネントは以下のデザイントークンを使用します：

```css
/* Input関連（入力フィールド） */
var(--component-input-background-default)      /* 背景色（通常） */
var(--component-input-background-disabled)     /* 背景色（無効） */
var(--component-input-text-default)            /* テキスト色 */
var(--component-input-border-default)          /* ボーダー色（通常） */
var(--component-input-border-hover)            /* ボーダー色（ホバー） */
var(--component-input-border-focus)            /* ボーダー色（フォーカス） */
var(--component-input-border-error)            /* ボーダー色（エラー） */

/* パネル関連 */
var(--color-surface-overlay)                   /* パネル背景 */
var(--elevation-shadow-lg)                     /* パネル影 */
var(--border-radius-lg)                        /* パネル角丸 */

/* スピンボタン関連 */
var(--color-interactive-default)               /* ボタン色（通常） */
var(--color-interactive-hover)                 /* ボタン色（ホバー） */
var(--color-interactive-active)                /* ボタン色（アクティブ） */
var(--color-interactive-disabled)              /* ボタン色（無効） */

/* スペーシング */
var(--spacing-xs)                              /* 極小スペース */
var(--spacing-sm)                              /* 小スペース */
var(--spacing-md)                              /* 中スペース */
var(--spacing-lg)                              /* 大スペース */

/* タイポグラフィ */
var(--text-body-default-fontSize)              /* フォントサイズ */
var(--text-body-lg-fontSize)                   /* 大きめフォントサイズ */
var(--text-body-default-lineHeight)            /* 行高 */
var(--font-family-base)                        /* フォントファミリー */

/* インタラクション */
var(--interaction-transition-fast-duration)    /* トランジション速度 */
var(--state-focus-ring-color)                  /* フォーカスリング色 */
var(--state-focus-ring-width)                  /* フォーカスリング幅 */
```

### カスタムCSS変数

CSS変数を使用してスタイルをカスタマイズできます：

```css
/* 基本的なカスタマイズ */
ha-time-picker {
  --time-picker-input-padding: 10px 12px;
  --time-picker-input-border-radius: 6px;
  --time-picker-input-font-size: 14px;
  --time-picker-panel-background: var(--color-white);
  --time-picker-panel-border-radius: 8px;
  --time-picker-spinbutton-width: 60px;
  --time-picker-spinbutton-height: 48px;
}

/* パネルのカスタマイズ */
ha-time-picker {
  --time-picker-panel-padding: 16px;
  --time-picker-panel-gap: 12px;
  --time-picker-panel-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* スピンボタンのカスタマイズ */
ha-time-picker {
  --time-picker-spinbutton-background: var(--color-gray-50);
  --time-picker-spinbutton-border: 1px solid var(--color-gray-300);
  --time-picker-spinbutton-border-radius: 4px;
  --time-picker-spinbutton-font-size: 18px;
  --time-picker-spinbutton-font-weight: 500;
}

/* ボタンのカスタマイズ */
ha-time-picker {
  --time-picker-button-padding: 8px 16px;
  --time-picker-button-border-radius: 4px;
  --time-picker-button-font-size: 14px;
}
```

### Shadow DOMパーツ

Shadow DOMの`::part()`セレクターを使用して、より詳細なスタイルのカスタマイズが可能です：

| Part名 | 説明 |
|--------|------|
| `input` | 入力フィールド全体 |
| `panel` | 時刻選択パネル全体 |
| `spinbutton` | 時/分/秒のスピンボタン |
| `hour` | 時間スピンボタン |
| `minute` | 分スピンボタン |
| `second` | 秒スピンボタン |
| `period` | AM/PMトグルボタン |
| `separator` | コロン（:）区切り文字 |
| `now-button` | 現在時刻ボタン |
| `clear-button` | クリアボタン |
| `arrow-button` | 増減矢印ボタン |

```css
/* 入力フィールドのカスタマイズ */
ha-time-picker::part(input) {
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* パネルのカスタマイズ */
ha-time-picker::part(panel) {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid var(--color-gray-200);
}

/* スピンボタンのカスタマイズ */
ha-time-picker::part(spinbutton) {
  font-family: 'Roboto Mono', monospace;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary-600);
}

ha-time-picker::part(spinbutton):hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-400);
}

ha-time-picker::part(spinbutton):focus {
  background-color: var(--color-primary-100);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

/* 時/分/秒の個別カスタマイズ */
ha-time-picker::part(hour) {
  color: var(--color-blue-600);
}

ha-time-picker::part(minute) {
  color: var(--color-green-600);
}

ha-time-picker::part(second) {
  color: var(--color-orange-600);
}

/* 区切り文字のカスタマイズ */
ha-time-picker::part(separator) {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-gray-400);
}

/* AM/PMボタンのカスタマイズ */
ha-time-picker::part(period) {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  font-weight: 600;
  border-radius: 20px;
  padding: 6px 16px;
}

/* 矢印ボタンのカスタマイズ */
ha-time-picker::part(arrow-button) {
  color: var(--color-gray-600);
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

ha-time-picker::part(arrow-button):hover {
  background-color: var(--color-gray-100);
  color: var(--color-primary-600);
}

/* 現在時刻・クリアボタンのカスタマイズ */
ha-time-picker::part(now-button),
ha-time-picker::part(clear-button) {
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### ダークモードのサポート

ダークモードに対応したスタイルを定義できます：

```css
/* ライトモード（デフォルト） */
ha-time-picker {
  --time-picker-input-background: var(--color-white);
  --time-picker-input-text: var(--color-gray-900);
  --time-picker-input-border: var(--color-gray-300);
  --time-picker-panel-background: var(--color-white);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  ha-time-picker {
    --time-picker-input-background: var(--color-gray-800);
    --time-picker-input-text: var(--color-gray-100);
    --time-picker-input-border: var(--color-gray-600);
    --time-picker-panel-background: var(--color-gray-800);
  }

  ha-time-picker::part(input) {
    color-scheme: dark;
  }

  ha-time-picker::part(panel) {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  ha-time-picker::part(spinbutton) {
    background-color: var(--color-gray-700);
    border-color: var(--color-gray-600);
    color: var(--color-gray-100);
  }

  ha-time-picker::part(spinbutton):hover {
    background-color: var(--color-gray-600);
  }
}
```

### カスタムテーマ

特定のユースケース向けのカスタムテーマを作成できます：

```css
/* コンパクトテーマ */
ha-time-picker.time-picker-compact {
  --time-picker-input-padding: 6px 10px;
  --time-picker-input-font-size: 13px;
  --time-picker-spinbutton-width: 48px;
  --time-picker-spinbutton-height: 40px;
  --time-picker-panel-padding: 12px;
}

/* ラージテーマ */
ha-time-picker.time-picker-large {
  --time-picker-input-padding: 14px 16px;
  --time-picker-input-font-size: 18px;
  --time-picker-spinbutton-width: 80px;
  --time-picker-spinbutton-height: 60px;
  --time-picker-panel-padding: 24px;
}

ha-time-picker.time-picker-large::part(spinbutton) {
  font-size: 28px;
}

/* ミニマルテーマ */
ha-time-picker.time-picker-minimal::part(input) {
  border: none;
  border-bottom: 2px solid var(--color-gray-300);
  border-radius: 0;
  background-color: transparent;
  padding-left: 0;
}

ha-time-picker.time-picker-minimal::part(input):focus {
  border-bottom-color: var(--color-primary-500);
  outline: none;
}

/* カラフルテーマ */
ha-time-picker.time-picker-colorful::part(hour) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

ha-time-picker.time-picker-colorful::part(minute) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
}

ha-time-picker.time-picker-colorful::part(second) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
}
```

### CSSカスタムプロパティインターフェース

TypeScript型定義：

```typescript
interface TimePickerCSSCustomProperties {
  '--time-picker-input-padding'?: string;
  '--time-picker-input-border-radius'?: string;
  '--time-picker-input-font-size'?: string;
  '--time-picker-input-background'?: string;
  '--time-picker-input-text'?: string;
  '--time-picker-input-border'?: string;
  '--time-picker-panel-background'?: string;
  '--time-picker-panel-border-radius'?: string;
  '--time-picker-panel-padding'?: string;
  '--time-picker-panel-gap'?: string;
  '--time-picker-panel-shadow'?: string;
  '--time-picker-spinbutton-width'?: string;
  '--time-picker-spinbutton-height'?: string;
  '--time-picker-spinbutton-background'?: string;
  '--time-picker-spinbutton-border'?: string;
  '--time-picker-spinbutton-border-radius'?: string;
  '--time-picker-spinbutton-font-size'?: string;
  '--time-picker-spinbutton-font-weight'?: string;
  '--time-picker-button-padding'?: string;
  '--time-picker-button-border-radius'?: string;
  '--time-picker-button-font-size'?: string;
}
```

## ベストプラクティス

### Do's ✓

#### 1. 適切な時刻フォーマットを選択する

ユーザーの地域やコンテキストに応じて12時間/24時間表示を選択します。

```html
<!-- ✓ Good: 地域に応じた表示 -->
<!-- 日本: 24時間表示 -->
<ha-time-picker format="24" label="開始時刻"></ha-time-picker>

<!-- アメリカ: 12時間表示 -->
<ha-time-picker format="12" label="Start Time"></ha-time-picker>
```

**理由**: ユーザーが慣れ親しんだフォーマットを使用することで、入力エラーを減らし、UXを向上させます。

#### 2. 適切なステップ値を設定する

ユースケースに応じて適切な刻み幅を設定します。

```html
<!-- ✓ Good: 予約システムで15分刻み -->
<ha-time-picker
  minute-step="15"
  label="予約時刻"
  helper-text="15分単位で選択できます"
></ha-time-picker>

<!-- ✓ Good: 勤怠管理で5分刻み -->
<ha-time-picker
  minute-step="5"
  label="出勤時刻"
></ha-time-picker>
```

**理由**: 適切なステップ値により、ユーザーの選択を簡略化し、システムの要件を満たします。

#### 3. 時刻の制限を明示する

`min-time`と`max-time`を使用して、選択可能な時刻範囲を制限します。

```html
<!-- ✓ Good: 営業時間内に制限 -->
<ha-time-picker
  min-time="09:00"
  max-time="17:00"
  label="来店予約時刻"
  helper-text="営業時間: 午前9時〜午後5時"
></ha-time-picker>
```

**理由**: 無効な時刻の選択を防ぎ、ユーザーに選択可能な範囲を明確に伝えます。

#### 4. ラベルとヘルパーテキストを提供する

フィールドの目的と制約を明確に伝えます。

```html
<!-- ✓ Good -->
<ha-time-picker
  label="開始時刻"
  helper-text="勤務開始時刻を選択してください（午前9時〜午後6時）"
  min-time="09:00"
  max-time="18:00"
  required
></ha-time-picker>
```

**理由**: ユーザーがフィールドの目的を理解し、正しい値を入力しやすくなります。

#### 5. エラーメッセージを分かりやすく表示する

具体的なエラー理由と解決方法を示します。

```html
<!-- ✓ Good -->
<ha-time-picker
  label="終了時刻"
  error
  error-text="終了時刻は開始時刻（14:00）より後に設定してください"
></ha-time-picker>
```

**理由**: ユーザーが問題を理解し、適切に修正できます。

#### 6. 現在時刻ボタンを提供する

現在時刻が有効な選択肢の場合、`show-now-button`を使用します。

```html
<!-- ✓ Good: タイムスタンプ記録 -->
<ha-time-picker
  label="完了時刻"
  show-now-button
  show-clear-button
></ha-time-picker>
```

**理由**: ユーザーが手動で入力する手間を省き、入力を簡素化します。

### Don'ts ✗

#### 1. ラベルなし

アクセシビリティのため必ずラベルを設定します。

```html
<!-- ✗ Bad -->
<ha-time-picker required></ha-time-picker>

<!-- ✓ Good -->
<ha-time-picker label="開始時刻" required></ha-time-picker>
```

**理由**: スクリーンリーダーユーザーがフィールドの目的を理解できません。

#### 2. 不適切なステップ値

過度に細かいステップは使いづらくなります。

```html
<!-- ✗ Bad: 1分刻みは多すぎる（コンテキストによる） -->
<ha-time-picker
  minute-step="1"
  label="予約時刻"
></ha-time-picker>

<!-- ✓ Good: 15分刻みが適切 -->
<ha-time-picker
  minute-step="15"
  label="予約時刻"
></ha-time-picker>
```

**理由**: 細かすぎるステップは、ユーザーが目的の時刻を選択するのに時間がかかります。

**代替案**: ユースケースに応じて、5分、10分、15分、30分などの適切なステップを選択してください。

#### 3. 秒の表示が不要なのに表示する

秒が必要ないユースケースでは表示しません。

```html
<!-- ✗ Bad: 予約システムで秒は不要 -->
<ha-time-picker
  show-seconds
  label="予約時刻"
></ha-time-picker>

<!-- ✓ Good: 秒を省略 -->
<ha-time-picker label="予約時刻"></ha-time-picker>
```

**理由**: 不要な情報はユーザーを混乱させ、入力を複雑にします。

**代替案**: タイムスタンプ記録やログシステムなど、秒単位の精度が必要な場合のみ`show-seconds`を使用してください。

#### 4. 不明確な時刻制限

制限がある場合はヘルパーテキストで明示します。

```html
<!-- ✗ Bad: 制限が不明 -->
<ha-time-picker
  min-time="09:00"
  max-time="17:00"
  label="予約時刻"
></ha-time-picker>

<!-- ✓ Good: 制限を明示 -->
<ha-time-picker
  min-time="09:00"
  max-time="17:00"
  label="予約時刻"
  helper-text="選択可能時間: 午前9時〜午後5時"
></ha-time-picker>
```

**理由**: ユーザーは制限があることに気付かず、無効な時刻を選択しようとして混乱します。

#### 5. インライン表示の濫用

インライン表示は特定のユースケースでのみ使用します。

```html
<!-- ✗ Bad: フォーム内で常時表示は場所を取りすぎる -->
<form>
  <ha-time-picker inline label="開始時刻"></ha-time-picker>
  <ha-time-picker inline label="終了時刻"></ha-time-picker>
  <!-- 他のフィールド... -->
</form>

<!-- ✓ Good: 通常のポップアップ表示 -->
<form>
  <ha-time-picker label="開始時刻"></ha-time-picker>
  <ha-time-picker label="終了時刻"></ha-time-picker>
  <!-- 他のフィールド... -->
</form>
```

**理由**: インライン表示は画面スペースを大きく消費します。

**代替案**: ダッシュボードやカレンダーアプリなど、時刻選択が主要な機能である場合にのみ`inline`を使用してください。

## よくある質問

### 開始時刻と終了時刻の整合性を確保するには？

開始時刻に基づいて終了時刻の最小値を動的に設定します：

```tsx
// React
import { useState } from 'react';

function TimeRangeForm() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [endTimeError, setEndTimeError] = useState('');

  const handleStartTimeChange = (detail: any) => {
    setStartTime(detail.value);
    // 終了時刻が開始時刻より前の場合、エラー
    if (endTime && endTime <= detail.value) {
      setEndTimeError('終了時刻は開始時刻より後に設定してください');
    } else {
      setEndTimeError('');
    }
  };

  const handleEndTimeChange = (detail: any) => {
    setEndTime(detail.value);
    // 終了時刻が開始時刻より前の場合、エラー
    if (startTime && detail.value <= startTime) {
      setEndTimeError('終了時刻は開始時刻より後に設定してください');
    } else {
      setEndTimeError('');
    }
  };

  return (
    <Stack gap="4">
      <TimePicker
        label="開始時刻"
        value={startTime}
        onTimeSelect={handleStartTimeChange}
        required
      />
      <TimePicker
        label="終了時刻"
        value={endTime}
        minTime={startTime || undefined}
        onTimeSelect={handleEndTimeChange}
        error={!!endTimeError}
        errorText={endTimeError}
        required
      />
    </Stack>
  );
}
```

```vue
<!-- Vue -->
<template>
  <HaStack gap="4">
    <HaTimePicker
      label="開始時刻"
      :value="startTime"
      @time-select="handleStartTimeChange"
      required
    />
    <HaTimePicker
      label="終了時刻"
      :value="endTime"
      :min-time="startTime || undefined"
      @time-select="handleEndTimeChange"
      :error="!!endTimeError"
      :error-text="endTimeError"
      required
    />
  </HaStack>
</template>

<script setup>
import { ref } from 'vue';

const startTime = ref('');
const endTime = ref('');
const endTimeError = ref('');

const handleStartTimeChange = (detail) => {
  startTime.value = detail.value;
  if (endTime.value && endTime.value <= detail.value) {
    endTimeError.value = '終了時刻は開始時刻より後に設定してください';
  } else {
    endTimeError.value = '';
  }
};

const handleEndTimeChange = (detail) => {
  endTime.value = detail.value;
  if (startTime.value && detail.value <= startTime.value) {
    endTimeError.value = '終了時刻は開始時刻より後に設定してください';
  } else {
    endTimeError.value = '';
  }
};
</script>
```

### 時刻を時間単位で計算するには？

選択された時刻から時間を計算して表示します：

```tsx
// React
function TimeCalculator() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const calculateDuration = () => {
    if (!startTime || !endTime) return '';

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    if (durationMinutes <= 0) return '無効な時間範囲';

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}時間${minutes}分`;
  };

  return (
    <Stack gap="4">
      <TimePicker
        label="開始時刻"
        value={startTime}
        onTimeSelect={(d) => setStartTime(d.value)}
      />
      <TimePicker
        label="終了時刻"
        value={endTime}
        onTimeSelect={(d) => setEndTime(d.value)}
      />
      {calculateDuration() && (
        <p>勤務時間: {calculateDuration()}</p>
      )}
    </Stack>
  );
}
```

### 複数のTime Pickerを連動させるには？

複数の時刻フィールドを連動させて、整合性を保ちます：

```tsx
// React: 勤務シフトの例
function ShiftSchedule() {
  const [shift1Start, setShift1Start] = useState('09:00');
  const [shift1End, setShift1End] = useState('');
  const [shift2Start, setShift2Start] = useState('');
  const [shift2End, setShift2End] = useState('');

  // シフト1の終了時刻が変更されたら、シフト2の開始時刻を自動設定
  const handleShift1EndChange = (detail: any) => {
    setShift1End(detail.value);
    if (!shift2Start) {
      setShift2Start(detail.value);
    }
  };

  return (
    <Stack gap="6">
      <div>
        <h4>シフト1</h4>
        <Stack gap="4">
          <TimePicker
            label="開始時刻"
            value={shift1Start}
            onTimeSelect={(d) => setShift1Start(d.value)}
          />
          <TimePicker
            label="終了時刻"
            value={shift1End}
            minTime={shift1Start}
            onTimeSelect={handleShift1EndChange}
          />
        </Stack>
      </div>

      <div>
        <h4>シフト2</h4>
        <Stack gap="4">
          <TimePicker
            label="開始時刻"
            value={shift2Start}
            minTime={shift1End || shift1Start}
            onTimeSelect={(d) => setShift2Start(d.value)}
          />
          <TimePicker
            label="終了時刻"
            value={shift2End}
            minTime={shift2Start}
            onTimeSelect={(d) => setShift2End(d.value)}
          />
        </Stack>
      </div>
    </Stack>
  );
}
```

### 時刻をフォーマット変換するには？

12時間/24時間表示間で時刻を変換します：

```typescript
// 24時間 → 12時間 + AM/PM
function to12HourFormat(time24: string): { time: string; period: 'AM' | 'PM' } {
  const [hour, minute] = time24.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return {
    time: `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    period
  };
}

// 12時間 + AM/PM → 24時間
function to24HourFormat(time12: string, period: 'AM' | 'PM'): string {
  const [hour, minute] = time12.split(':').map(Number);
  let hour24 = hour;

  if (period === 'AM' && hour === 12) {
    hour24 = 0;
  } else if (period === 'PM' && hour !== 12) {
    hour24 = hour + 12;
  }

  return `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

// 使用例
const result12 = to12HourFormat('14:30'); // { time: '02:30', period: 'PM' }
const result24 = to24HourFormat('02:30', 'PM'); // '14:30'
```

## 関連コンポーネント

- [Date Picker](/components/date-picker) - 日付選択コンポーネント
- [Input](/components/input) - テキスト入力フィールド
- [Form Group](/components/form-group) - フォームフィールドのグループ化
- [Button](/components/button) - ボタンコンポーネント

## APIリファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { TimePickerProps, TimeSelectDetail } from '@hidearea-design/core';

/**
 * Time Picker コンポーネントのプロパティ
 */
interface TimePickerProps {
  /** 時刻の値（HH:mm または HH:mm:ss 形式） */
  value?: string;

  /** 時刻の表示形式 */
  format?: '12' | '24';

  /** 秒の選択ピッカーを表示するか */
  showSeconds?: boolean;

  /** 時間の増減ステップ */
  hourStep?: number;

  /** 分の増減ステップ */
  minuteStep?: number;

  /** 秒の増減ステップ */
  secondStep?: number;

  /** 最小選択可能時刻 */
  minTime?: string;

  /** 最大選択可能時刻 */
  maxTime?: string;

  /** 無効化する時間の配列 */
  disabledHours?: number[];

  /** 無効化する分の配列 */
  disabledMinutes?: number[];

  /** 時刻選択パネルを常時表示するか */
  inline?: boolean;

  /** 入力フィールドのプレースホルダー */
  placeholder?: string;

  /** コンポーネントのラベル */
  label?: string;

  /** ヘルパーテキスト */
  helperText?: string;

  /** 無効状態 */
  disabled?: boolean;

  /** 必須フィールド */
  required?: boolean;

  /** エラー状態 */
  error?: boolean;

  /** 読み取り専用状態 */
  readonly?: boolean;

  /** エラーメッセージ */
  errorText?: string;

  /** 「現在時刻」ボタンを表示するか */
  showNowButton?: boolean;

  /** 「クリア」ボタンを表示するか */
  showClearButton?: boolean;
}

/**
 * time-select イベントの詳細
 */
interface TimeSelectDetail {
  /** 選択された時刻（HH:mm または HH:mm:ss 形式） */
  value: string;

  /** 時間（0-23） */
  hour: number;

  /** 分（0-59） */
  minute: number;

  /** 秒（0-59、showSeconds が true の場合のみ） */
  second?: number;

  /** AM/PM（format が '12' の場合のみ） */
  period?: 'AM' | 'PM';
}

/**
 * Time Picker Ref インターフェース
 */
interface TimePickerRef {
  /** 現在選択されている時刻を取得 */
  getValue(): string | null;

  /** 時刻を設定 */
  setValue(value: string): void;

  /** 選択された時刻をクリア */
  clear(): void;

  /** ピッカーを開く */
  open(): void;

  /** ピッカーを閉じる */
  close(): void;

  /** ピッカーの開閉状態を切り替え */
  toggle(): void;

  /** 現在時刻を設定 */
  setNow(): void;

  /** 指定された時刻を設定 */
  setTime(hour: number, minute: number, second?: number): void;

  /** 現在の状態がバリデーションルールを満たしているか確認 */
  validate(): boolean;

  /** 指定された時刻が無効化されているか確認 */
  isTimeDisabled(hour: number, minute: number, second?: number): boolean;
}
```

## トラブルシューティング

### 時刻が選択できない

**問題**: Time Pickerをクリックしても時刻が選択できない、またはパネルが開かない

**原因**:
1. `disabled`属性が設定されている
2. `min-time`や`max-time`の制約により、選択可能な時刻がない
3. JavaScriptエラーによりコンポーネントが正しく初期化されていない

**解決策**:

```html
<!-- disabled属性を確認 -->
<ha-time-picker label="時刻" disabled></ha-time-picker>
<!-- ✓ disabled を削除 -->
<ha-time-picker label="時刻"></ha-time-picker>

<!-- min-time/max-time を確認 -->
<ha-time-picker min-time="17:00" max-time="09:00" label="時刻"></ha-time-picker>
<!-- ✗ Bad: max-time が min-time より前 -->

<!-- ✓ Good: 正しい範囲設定 -->
<ha-time-picker min-time="09:00" max-time="17:00" label="時刻"></ha-time-picker>
```

ブラウザの開発者コンソールでJavaScriptエラーを確認してください。

### 値が更新されない

**問題**: Time Pickerで時刻を選択しても値が更新されない

**原因**:
1. Reactで`onTimeSelect`イベントハンドラが設定されていない
2. Vueで`v-model`が設定されていない
3. `readonly`属性が設定されている

**解決策**:

```tsx
// React
// ✗ Bad: イベントハンドラなし
<TimePicker value={time} />

// ✓ Good: イベントハンドラあり
const [time, setTime] = useState('');
<TimePicker value={time} onTimeSelect={(d) => setTime(d.value)} />
```

```vue
<!-- Vue -->
<!-- ✗ Bad: v-model なし -->
<HaTimePicker :value="time" />

<!-- ✓ Good: v-model あり -->
<HaTimePicker v-model="time" />
```

### パネルが画面外に表示される

**問題**: 時刻選択パネルが画面外に表示されて見切れる

**原因**:
1. 親要素に`overflow: hidden`が設定されている
2. z-indexが低い
3. ページ下部で表示位置が調整されていない

**解決策**:

```css
/* 親要素のoverflowを確認 */
.form-container {
  overflow: visible; /* hidden → visible */
}

/* z-indexを調整 */
ha-time-picker {
  z-index: 100;
}

/* パネルのz-indexを調整 */
ha-time-picker::part(panel) {
  z-index: 1000;
}
```

### 時刻フォーマットが正しく表示されない

**問題**: 選択した時刻が期待したフォーマットで表示されない

**原因**:
1. `format`属性が正しく設定されていない
2. `value`プロパティのフォーマットが不正

**解決策**:

```html
<!-- ✗ Bad: format が未設定で value が 12時間形式 -->
<ha-time-picker value="02:30 PM"></ha-time-picker>

<!-- ✓ Good: format を明示的に設定 -->
<ha-time-picker format="12" value="14:30"></ha-time-picker>
<!-- または -->
<ha-time-picker format="24" value="14:30"></ha-time-picker>
```

**正しい値のフォーマット**:
- 24時間形式: `"HH:mm"` または `"HH:mm:ss"` (例: `"14:30"` または `"14:30:45"`)
- 12時間形式でも値は24時間形式で渡す: `"14:30"` (表示は自動的に `"02:30 PM"` に変換されます)
