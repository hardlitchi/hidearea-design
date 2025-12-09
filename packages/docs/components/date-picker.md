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
```

## アクセシビリティ

DatePicker コンポーネントは WCAG 2.1 AA 基準に準拠し、すべてのユーザーが日付を選択できるようにします。

### ARIA サポート

DatePicker は WAI-ARIA Date Picker パターンに従い、適切な ARIA 属性を自動設定します。

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="button"` | 入力フィールド | カレンダーを開くボタンであることを示す |
| `role="dialog"` | カレンダーポップアップ | ダイアログであることを示す |
| `role="grid"` | カレンダーグリッド | グリッドであることを示す |
| `role="gridcell"` | 日付セル | グリッドセルであることを示す |
| `aria-label` | カレンダー | 「カレンダーを選択」を示す |
| `aria-selected` | 選択された日付セル | 選択状態を示す |
| `aria-disabled` | 無効な日付セル | 無効状態を示す |
| `aria-current="date"` | 今日の日付セル | 今日であることを示す |

### キーボードナビゲーション

**入力フィールド**:

| キー | 動作 |
|-----|------|
| `Enter` / `Space` | カレンダーを開く |
| `Escape` | カレンダーを閉じる |
| `Tab` | 次のフォーカス可能要素へ移動 |

**カレンダーグリッド（開いている時）**:

| キー | 動作 |
|-----|------|
| `Arrow Up` | 1週間前の日付へ移動 |
| `Arrow Down` | 1週間後の日付へ移動 |
| `Arrow Left` | 1日前の日付へ移動 |
| `Arrow Right` | 1日後の日付へ移動 |
| `Home` | 現在の週の最初の日（日曜または月曜）へ移動 |
| `End` | 現在の週の最後の日（土曜または日曜）へ移動 |
| `Page Up` | 前の月へ移動 |
| `Page Down` | 次の月へ移動 |
| `Shift + Page Up` | 前の年へ移動 |
| `Shift + Page Down` | 次の年へ移動 |
| `Enter` / `Space` | フォーカス中の日付を選択 |
| `Escape` | カレンダーを閉じる |
| `Tab` | カレンダー内の次のフォーカス可能要素（ボタンなど）へ移動 |

### スクリーンリーダー

DatePicker はスクリーンリーダーに最適化された情報を提供します。

**入力フィールドの読み上げ** (NVDA/JAWS):
- 未選択時: "日付を選択、編集可能、コンボボックス"
- 選択後: "2025年1月15日、編集可能、コンボボックス"

**カレンダーグリッドの読み上げ**:
- カレンダーを開く: "カレンダーダイアログ、2025年1月"
- 日付にフォーカス: "1月15日水曜日"
- 今日の日付: "1月15日水曜日、今日"
- 選択された日付: "1月15日水曜日、選択済み"
- 無効な日付: "1月20日月曜日、無効"

**範囲選択モードの読み上げ**:
- 開始日選択: "範囲の開始日、1月10日"
- 終了日選択: "範囲の終了日、1月20日、1月10日から1月20日まで選択"

### ライブリージョン

```html
<!-- 動的な変更を通知 -->
<div aria-live="polite" aria-atomic="true">
  <!-- 日付選択時: "2025年1月15日が選択されました" -->
  <!-- 月変更時: "2025年2月のカレンダーを表示中" -->
  <!-- クリア時: "選択された日付がクリアされました" -->
</div>
```

### ラベルとヘルパーテキスト

```html
<ha-date-picker
  label="予約日"
  helper-text="宿泊開始日を選択してください"
  required
  aria-describedby="date-help"
>
  <span id="date-help" hidden>
    選択可能な日付は本日から30日以内です
  </span>
</ha-date-picker>
```

### エラー状態のアクセシビリティ

```html
<ha-date-picker
  label="生年月日"
  error
  error-text="有効な生年月日を入力してください"
  aria-invalid="true"
  aria-errormessage="birthdate-error"
>
  <span id="birthdate-error" role="alert">
    有効な生年月日を入力してください
  </span>
</ha-date-picker>
```

## スタイルのカスタマイズ

DatePicker コンポーネントは、デザイントークンとカスタムCSS変数を使用してカスタマイズできます。

### デザイントークン

```css
:root {
  /* 入力フィールド */
  --date-picker-input-bg: var(--color-surface-0);
  --date-picker-input-border: var(--color-border-default);
  --date-picker-input-focus-border: var(--color-primary-500);

  /* カレンダー */
  --date-picker-calendar-bg: var(--color-surface-0);
  --date-picker-calendar-border: var(--color-border-subtle);
  --date-picker-calendar-shadow: var(--shadow-lg);

  /* 日付セル */
  --date-picker-cell-hover-bg: var(--color-surface-100);
  --date-picker-cell-selected-bg: var(--color-primary-500);
  --date-picker-cell-selected-color: var(--color-surface-0);
  --date-picker-cell-today-border: var(--color-primary-500);
  --date-picker-cell-disabled-color: var(--color-text-disabled);

  /* 範囲選択 */
  --date-picker-range-bg: var(--color-primary-50);
  --date-picker-range-hover-bg: var(--color-primary-100);
}
```

### Shadow DOM パーツ

```css
/* カレンダーポップアップ */
ha-date-picker::part(calendar) {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
}

/* ヘッダー（年月表示） */
ha-date-picker::part(header) {
  background-color: var(--color-primary-500);
  color: var(--color-surface-0);
  padding: var(--space-4);
}

/* 日付セル */
ha-date-picker::part(day-cell) {
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

ha-date-picker::part(day-cell):hover {
  transform: scale(1.1);
}

/* 選択された日付 */
ha-date-picker::part(selected-day) {
  background-color: var(--color-primary-600);
  font-weight: var(--font-weight-bold);
}

/* 今日の日付 */
ha-date-picker::part(today) {
  border: 2px solid var(--color-primary-500);
}

/* ボタン */
ha-date-picker::part(nav-button) {
  border-radius: var(--radius-full);
}
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 1. 明確なラベルとヘルパーテキスト

```html
<ha-date-picker
  label="宿泊開始日"
  helper-text="チェックイン可能な日付を選択してください"
  required
></ha-date-picker>
```

**理由**: ユーザーが何を入力すべきか明確に理解できる。

#### 2. 適切な日付制限

```html
<ha-date-picker
  label="予約日"
  min-date="2025-01-01"
  max-date="2025-12-31"
  helper-text="2025年内の日付を選択してください"
></ha-date-picker>
```

**理由**: 無効な日付選択を防ぎ、ユーザーエラーを減少。

#### 3. 範囲選択での開始/終了の明確化

```tsx
<DatePicker
  mode="range"
  label="宿泊期間"
  helperText="チェックイン日とチェックアウト日を選択"
  onDateSelect={(detail) => {
    console.log(`${detail.startDate} から ${detail.endDate}`);
  }}
/>
```

**理由**: 範囲の意味をユーザーが理解しやすい。

### ✗ 避けるべき使い方

#### 1. ラベルなしの使用

```html
<!-- ❌ 避ける -->
<ha-date-picker placeholder="日付を選択"></ha-date-picker>
```

**理由**: アクセシビリティとユーザビリティが低下。

**代替案**:
```html
<!-- ✓ 推奨 -->
<ha-date-picker
  label="予約日"
  placeholder="YYYY-MM-DD"
></ha-date-picker>
```

#### 2. 過度に制限された日付範囲

```html
<!-- ❌ 避ける: 本日のみ選択可能 -->
<ha-date-picker
  min-date="2025-01-15"
  max-date="2025-01-15"
></ha-date-picker>
```

**理由**: ユーザーに選択肢がなく、UXが悪い。

## よくある質問

### 1. 日付フォーマットを変更するには？

`format` プロパティを使用して日付表示フォーマットを変更できます：

```tsx
<DatePicker
  label="生年月日"
  format="DD/MM/YYYY"
  locale="ja"
/>
```

### 2. デフォルトで今日の日付を選択するには？

`value` プロパティに今日の日付を設定します：

```tsx
<DatePicker
  label="日付"
  value={new Date()}
/>
```

### 3. 過去の日付を無効化するには？

`min-date` を今日の日付に設定します：

```tsx
<DatePicker
  label="予約日"
  minDate={new Date()}
  helperText="本日以降の日付を選択してください"
/>
```

### 4. 週末のみを選択可能にするには？

`disabled-days-of-week` で平日（月～金）を無効化します：

```tsx
<DatePicker
  label="週末の予定"
  disabledDaysOfWeek={[1, 2, 3, 4, 5]}
  helperText="土曜日または日曜日を選択してください"
/>
```

## 関連コンポーネント

- [Time Picker](/components/time-picker) - 時刻選択コンポーネント
- [Input](/components/input) - テキスト入力コンポーネント
- [Form Group](/components/form-group) - フォームグループコンポーネント

## API リファレンス

### DatePickerProps

```typescript
interface DatePickerProps {
  /** 日付選択モード */
  mode?: 'single' | 'range' | 'multiple';

  /** 選択された日付（ISO 8601形式またはDateオブジェクト） */
  value?: string | Date;

  /** 日付表示フォーマット */
  format?: string;

  /** 最小選択可能日付 */
  minDate?: string | Date;

  /** 最大選択可能日付 */
  maxDate?: string | Date;

  /** 無効化する特定の日付の配列 */
  disabledDates?: (string | Date)[];

  /** 無効化する曜日の配列 (0=日曜, 6=土曜) */
  disabledDaysOfWeek?: number[];

  /** カレンダーのロケール */
  locale?: string;

  /** 週の開始曜日 (0=日曜, 1=月曜) */
  firstDayOfWeek?: 0 | 1;

  /** カレンダーを常時表示するか */
  inline?: boolean;

  /** 週番号を表示するか */
  showWeekNumbers?: boolean;

  /** 「今日」ボタンを表示するか */
  showTodayButton?: boolean;

  /** 「クリア」ボタンを表示するか */
  showClearButton?: boolean;

  /** 無効状態 */
  disabled?: boolean;

  /** 必須フィールド */
  required?: boolean;

  /** エラー状態 */
  error?: boolean;

  /** 読み取り専用状態 */
  readonly?: boolean;

  /** 入力フィールドのプレースホルダー */
  placeholder?: string;

  /** コンポーネントのラベル */
  label?: string;

  /** ヘルパーテキスト */
  helperText?: string;

  /** エラーメッセージ */
  errorText?: string;

  /** 日付選択時のコールバック */
  onDateSelect?: (detail: DateSelectDetail) => void;

  /** 日付クリア時のコールバック */
  onDateClear?: () => void;

  /** 月変更時のコールバック */
  onMonthChange?: (detail: { year: number; month: number }) => void;
}

interface DateSelectDetail {
  value?: Date;
  startDate?: Date;
  endDate?: Date;
  dates?: Date[];
}
```

## トラブルシューティング

### 1. カレンダーが開かない

**問題**: 入力フィールドをクリックしてもカレンダーが開かない。

**原因**: `disabled` または `readonly` 属性が設定されている可能性があります。

**解決策**:
```html
<!-- ✓ 正しい -->
<ha-date-picker label="日付"></ha-date-picker>

<!-- ❌ 間違い -->
<ha-date-picker label="日付" disabled></ha-date-picker>
```

### 2. 日付が選択できない

**問題**: カレンダーで日付をクリックしても選択されない。

**原因**: 日付が `disabledDates` または `disabledDaysOfWeek` で無効化されている可能性があります。

**解決策**:
```tsx
// 無効化設定を確認
<DatePicker
  disabledDates={[]} // 空配列に
  disabledDaysOfWeek={[]} // 空配列に
/>
```

### 3. 日付フォーマットが正しく表示されない

**問題**: 選択した日付のフォーマットが期待と異なる。

**原因**: `format` プロパティが正しく設定されていない。

**解決策**:
```tsx
<DatePicker
  format="YYYY-MM-DD" // ISO 8601形式
  // または
  format="DD/MM/YYYY" // 日/月/年形式
  locale="ja"
/>
```

### 4. 範囲選択で終了日が選択できない

**問題**: 範囲選択モードで開始日を選択後、終了日が選択できない。

**原因**: `maxDate` が開始日より前に設定されている可能性があります。

**解決策**:
```tsx
// maxDate を適切に設定
<DatePicker
  mode="range"
  minDate={new Date()}
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1年後
/>
```
