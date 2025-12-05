# DatePicker

カレンダーUIを持つ日付選択コンポーネントです。単一、範囲、複数日付の選択に対応し、日付の制限やローカライゼーションもサポートします。

## 基本的な使い方

日付を選択するためのシンプルなカレンダーUIです。

```html
<ha-date-picker label="日付を選択" helper-text="日付を選択してください"></ha-date-picker>
```

## 選択モード

`mode` 属性で、単一、範囲、複数日付の選択モードを切り替えることができます。

### 単一選択 (Single)

デフォルトのモードです。一つの日付のみを選択できます。

```html
<ha-date-picker mode="single" label="単一選択"></ha-date-picker>
```

### 範囲選択 (Range)

開始日と終了日の範囲を選択できます。

```html
<ha-date-picker mode="range" label="範囲選択"></ha-date-picker>
```

### 複数選択 (Multiple)

複数の日付を個別に選択できます。

```html
<ha-date-picker mode="multiple" label="複数選択"></ha-date-picker>
```

## 日付の制限

`min-date`, `max-date`, `disabled-dates`, `disabled-days-of-week` 属性を使って、選択可能な日付を制限できます。

### 最小・最大日付

`min-date` および `max-date` 属性で、選択可能な日付の範囲を制限します。

```html
<ha-date-picker
  min-date="2024-01-01"
  max-date="2024-12-31"
  label="2024年のみ選択可能"
  helper-text="2024年内の日付のみ選択できます"
></ha-date-picker>
```

### 無効な特定の日付

`disabled-dates` プロパティ（配列）を使用して、特定の複数の日付を選択不可にできます。

```html
<ha-date-picker
  .disabledDates="${[new Date('2025-01-01'), new Date('2025-01-10')]}"
  label="特定日を無効化"
  helper-text="1月1日と1月10日は選択できません"
></ha-date-picker>
```

::: warning 注意
`disabled-dates` は属性ではなくプロパティとして設定する必要があります。React や Vue のラッパーでは自動的にプロパティとして渡されます。
:::

### 無効な曜日

`disabled-days-of-week` プロパティ（配列 `0=日曜日, 6=土曜日`）を使用して、特定の曜日を選択不可にできます。

```html
<ha-date-picker
  .disabledDaysOfWeek="${[0, 6]}"
  label="週末を無効化"
  helper-text="土曜日と日曜日は選択できません"
></ha-date-picker>
```

::: warning 注意
`disabled-days-of-week` も属性ではなくプロパティとして設定する必要があります。
:::

## ローカライゼーション

`locale` 属性と `first-day-of-week` 属性で、表示言語と週の開始曜日を設定できます。

```html
<ha-date-picker
  locale="ja"
  first-day-of-week="1"
  label="日本語ロケール (月曜始まり)"
  helper-text="カレンダーが日本語で表示され、月曜日が週の始まりになります"
></ha-date-picker>
```

## インライン表示

`inline` 属性を追加すると、カレンダーが常に入力フィールドの下に表示されます。

```html
<ha-date-picker inline label="インライン表示"></ha-date-picker>
```

## その他の表示オプション

### 週番号の表示

`show-week-numbers` 属性で週番号を表示します。

```html
<ha-date-picker show-week-numbers inline label="週番号表示"></ha-date-picker>
```

### 今日ボタンとクリアボタン

`show-today-button` と `show-clear-button` 属性で、それぞれ「今日」ボタンと「クリア」ボタンを表示します。

```html
<ha-date-picker show-today-button show-clear-button label="ボタン付きカレンダー"></ha-date-picker>
```

## 状態

### Disabled

`disabled` 属性を追加すると、コンポーネントが無効になり操作できなくなります。

```html
<ha-date-picker disabled label="無効な日付ピッカー"></ha-date-picker>
```

### Required

`required` 属性を追加すると、日付選択が必須であることを示します。

```html
<ha-date-picker required label="必須日付ピッカー"></ha-date-picker>
```

### Readonly

`readonly` 属性を追加すると、入力フィールドは読み取り専用になります。カレンダーからの選択は可能です。

```html
<ha-date-picker readonly value="2025-01-15" label="読み取り専用日付ピッカー"></ha-date-picker>
```

### Error

`error` 属性と `error-text` 属性を使用すると、エラー状態とエラーメッセージを表示できます。

```html
<ha-date-picker
  error
  error-text="無効な日付が選択されました。"
  label="エラー状態"
></ha-date-picker>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `mode` | `'single' \| 'range' \| 'multiple'` | `'single'` | 日付選択モード |
| `value` | `string \| Date` | `''` | 選択された日付 (ISO 8601形式またはDateオブジェクト) |
| `format` | `string` | `'YYYY-MM-DD'` | 日付表示フォーマット |
| `min-date` | `string \| Date` | `''` | 最小選択可能日付 |
| `max-date` | `string \| Date` | `''` | 最大選択可能日付 |
| `disabledDates` | `(string \| Date)[]` | `[]` | 無効化する特定の日付の配列 |
| `disabledDaysOfWeek` | `number[]` | `[]` | 無効化する曜日の配列 (0=日曜, 6=土曜) |
| `locale` | `string` | `'en'` | カレンダーのロケール |
| `first-day-of-week` | `0 \| 1` | `0` | 週の開始曜日 (0=日曜, 1=月曜) |
| `inline` | `boolean` | `false` | カレンダーを常時表示するか |
| `show-week-numbers` | `boolean` | `false` | 週番号を表示するか |
| `show-today-button` | `boolean` | `false` | 「今日」ボタンを表示するか |
| `show-clear-button` | `boolean` | `false` | 「クリア」ボタンを表示するか |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須フィールド |
| `error` | `boolean` | `false` | エラー状態 |
| `readonly` | `boolean` | `false` | 読み取り専用状態 |
| `placeholder` | `string` | `'Select date'` | 入力フィールドのプレースホルダー |
| `label` | `string` | `''` | コンポーネントのラベル |
| `helper-text` | `string` | `''` | ヘルパーテキスト |
| `error-text` | `string` | `''` | エラーメッセージ |

## イベント

| イベント | ペイロード | 説明 |
|---|---|---|
| `date-select` | `{ value?: Date; startDate?: Date; endDate?: Date; dates?: Date[]; }` | 日付が選択された時 |
| `date-clear` | `void` | 日付がクリアされた時 |
| `month-change` | `{ year: number; month: number; }` | 表示月が変更された時 |
| `calendar-open` | `void` | カレンダーが開かれた時 |
| `calendar-close` | `void` | カレンダーが閉じられた時 |

## メソッド (Public API)

コンポーネントインスタンスを通して、以下のメソッドを直接呼び出すことができます。

| メソッド | 説明 |
|---|---|
| `getValue(): Date \| null` | 現在選択されている日付を取得します。 |
| `setValue(value: Date \| string): void` | 日付を設定します。 |
| `clear(): void` | 選択された日付をクリアします。 |
| `open(): void` | カレンダーを開きます。 |
| `close(): void` | カレンダーを閉じます。 |
| `toggle(): void` | カレンダーの開閉状態を切り替えます。 |
| `goToToday(): void` | 表示月を今日の日付に移動します。 |
| `goToMonth(year: number, month: number): void` | 指定された年月の表示に移動します。 |
| `nextMonth(): void` | 次の月に移動します。 |
| `previousMonth(): void` | 前の月に移動します。 |
| `validate(): boolean` | 現在の状態がバリデーションルールを満たしているか確認します。 |
| `isDateDisabled(date: Date): boolean` | 指定された日付が無効化されているか確認します。 |

## React

```tsx
import { useState, useRef } from 'react';
import { DatePicker, DatePickerRef } from '@hidearea-design/react';

function MyDatePickerComponent() {
  const datePickerRef = useRef<DatePickerRef>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [rangeStart, setRangeStart] = useState<Date | undefined>(undefined);
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>(undefined);
  const [multipleDates, setMultipleDates] = useState<Date[]>([]);

  const handleSingleDateSelect = (detail: any) => {
    setSelectedDate(detail.value);
    console.log('Single date selected:', detail.value);
  };

  const handleRangeDateSelect = (detail: any) => {
    setRangeStart(detail.startDate);
    setRangeEnd(detail.endDate);
    console.log('Range selected:', detail.startDate, detail.endDate);
  };

  const handleMultipleDateSelect = (detail: any) => {
    setMultipleDates(detail.dates);
    console.log('Multiple dates selected:', detail.dates);
  };

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const disabledSpecificDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), // Today + 2 days
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), // Today + 5 days
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>単一選択モード</h3>
      <DatePicker
        label="日付を選択"
        value={selectedDate}
        onDateSelect={handleSingleDateSelect}
        showClearButton
      />

      <h3>範囲選択モード</h3>
      <DatePicker
        mode="range"
        label="日付範囲を選択"
        onDateSelect={handleRangeDateSelect}
        showClearButton
      />
      <p>選択範囲: {rangeStart?.toLocaleDateString()} - {rangeEnd?.toLocaleDateString()}</p>

      <h3>複数選択モード</h3>
      <DatePicker
        mode="multiple"
        label="複数の日付を選択"
        onDateSelect={handleMultipleDateSelect}
        showClearButton
      />
      <p>選択された日付: {multipleDates.map(d => d.toLocaleDateString()).join(', ')}</p>

      <h3>日付制限付き</h3>
      <DatePicker
        label="日付制限付き"
        minDate={today}
        maxDate={nextWeek}
        disabledDaysOfWeek={[0, 6]} // 週末を無効化
        disabledDates={disabledSpecificDates} // 特定の日付を無効化
        helperText="今日から1週間以内、かつ平日のみ選択可能"
      />

      <h3>インライン表示 & 日本語ロケール</h3>
      <DatePicker
        inline
        locale="ja"
        firstDayOfWeek={1}
        label="インラインカレンダー"
        showWeekNumbers
        showTodayButton
        showClearButton
      />

      <button onClick={() => datePickerRef.current?.open()}>
        カレンダーを開く (Ref)
      </button>
      <button onClick={() => datePickerRef.current?.clear()}>
        クリア (Ref)
      </button>
    </div>
  );
}
```

## Vue

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <h3>単一選択モード</h3>
    <DatePicker
      label="日付を選択"
      :value="selectedDate"
      @date-select="handleSingleDateSelect"
      show-clear-button
    />

    <h3>範囲選択モード</h3>
    <DatePicker
      mode="range"
      label="日付範囲を選択"
      @date-select="handleRangeDateSelect"
      show-clear-button
    />
    <p>選択範囲: {{ rangeStart?.toLocaleDateString() }} - {{ rangeEnd?.toLocaleDateString() }}</p>

    <h3>複数選択モード</h3>
    <DatePicker
      mode="multiple"
      label="複数の日付を選択"
      @date-select="handleMultipleDateSelect"
      show-clear-button
    />
    <p>選択された日付: {{ multipleDates.map(d => d.toLocaleDateString()).join(', ') }}</p>

    <h3>日付制限付き</h3>
    <DatePicker
      label="日付制限付き"
      :min-date="today"
      :max-date="nextWeek"
      :disabled-days-of-week="[0, 6]" <!-- 週末を無効化 -->
      :disabled-dates="disabledSpecificDates" <!-- 特定の日付を無効化 -->
      helper-text="今日から1週間以内、かつ平日のみ選択可能"
    />

    <h3>インライン表示 & 日本語ロケール</h3>
    <DatePicker
      inline
      locale="ja"
      :first-day-of-week="1"
      label="インラインカレンダー"
      show-week-numbers
      show-today-button
      show-clear-button
    />

    <button @click="datePickerRef?.open()">
      カレンダーを開く (Ref)
    </button>
    <button @click="datePickerRef?.clear()">
      クリア (Ref)
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker, type DatePickerRef } from '@hidearea-design/vue';

const datePickerRef = ref<DatePickerRef | null>(null);
const selectedDate = ref<Date | undefined>(undefined);
const rangeStart = ref<Date | undefined>(undefined);
const rangeEnd = ref<Date | undefined>(undefined);
const multipleDates = ref<Date[]>([]);

const handleSingleDateSelect = (detail: any) => {
  selectedDate.value = detail.value;
  console.log('Single date selected:', detail.value);
};

const handleRangeDateSelect = (detail: any) => {
  rangeStart.value = detail.startDate;
  rangeEnd.value = detail.endDate;
  console.log('Range selected:', detail.startDate, detail.endDate);
};

const handleMultipleDateSelect = (detail: any) => {
  multipleDates.value = detail.dates;
  console.log('Multiple dates selected:', detail.dates);
};

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const disabledSpecificDates = [
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), // Today + 2 days
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), // Today + 5 days
];
</script>
