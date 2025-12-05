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
