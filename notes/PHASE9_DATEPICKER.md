# DatePicker Component Implementation Plan

**作成日**: 2025-12-05
**担当**: Phase 9 Part 2
**優先度**: 高

---

## 概要

カレンダーUIを持つ日付選択コンポーネントを実装します。

### 主な機能

1. **カレンダーUI**
   - 月表示カレンダー
   - 前月/次月ナビゲーション
   - 年・月選択
   - 今日の日付ハイライト

2. **日付範囲選択**
   - 単一日付選択
   - 範囲選択（開始日～終了日）
   - 複数日付選択

3. **制限機能**
   - 最小日付（minDate）
   - 最大日付（maxDate）
   - 無効化日付（disabledDates）
   - 無効化曜日（disabledDaysOfWeek）

4. **ローカライゼーション**
   - 曜日名、月名の多言語対応
   - 週の開始曜日設定（日曜/月曜）
   - 日付フォーマット設定

5. **キーボードナビゲーション**
   - 矢印キーで日付移動
   - Enter/Spaceで選択
   - Escapeで閉じる
   - Tab/Shift+Tabでフォーカス移動

6. **アクセシビリティ**
   - ARIAラベル完備
   - スクリーンリーダー対応
   - フォーカス管理

---

## API設計

### Props / Attributes

```typescript
interface DatePickerProps {
  // 基本
  value?: string | Date;           // 選択された日付 (ISO 8601形式)
  mode?: 'single' | 'range' | 'multiple'; // 選択モード
  format?: string;                 // 日付フォーマット (デフォルト: 'YYYY-MM-DD')

  // 制限
  minDate?: string | Date;         // 最小日付
  maxDate?: string | Date;         // 最大日付
  disabledDates?: (string | Date)[]; // 無効化日付
  disabledDaysOfWeek?: number[];   // 無効化曜日 (0=日曜, 6=土曜)

  // ローカライゼーション
  locale?: string;                 // ロケール (デフォルト: 'en')
  firstDayOfWeek?: 0 | 1;         // 週の開始曜日 (0=日曜, 1=月曜)

  // UI制御
  inline?: boolean;                // インライン表示
  showWeekNumbers?: boolean;       // 週番号表示
  showTodayButton?: boolean;       // 今日ボタン表示
  showClearButton?: boolean;       // クリアボタン表示

  // 状態
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  readonly?: boolean;

  // スタイル
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
}
```

### Events

```typescript
// 日付選択時
interface DateSelectEvent {
  value: string | Date;           // 単一選択時
  startDate?: string | Date;      // 範囲選択時の開始日
  endDate?: string | Date;        // 範囲選択時の終了日
  dates?: (string | Date)[];      // 複数選択時
}

// 月変更時
interface MonthChangeEvent {
  year: number;
  month: number; // 0-11
}

// カレンダー開閉時
interface ToggleEvent {
  isOpen: boolean;
}
```

イベント一覧:
- `date-select` - 日付選択時
- `date-clear` - 日付クリア時
- `month-change` - 月変更時
- `calendar-open` - カレンダー表示時
- `calendar-close` - カレンダー非表示時

### Public Methods

```typescript
class DatePicker {
  // 値の取得・設定
  getValue(): string | Date | null;
  setValue(value: string | Date): void;
  clear(): void;

  // カレンダー制御
  open(): void;
  close(): void;
  toggle(): void;

  // ナビゲーション
  goToToday(): void;
  goToMonth(year: number, month: number): void;
  nextMonth(): void;
  previousMonth(): void;

  // 検証
  validate(): boolean;
  isDateDisabled(date: Date): boolean;
}
```

---

## CSS Parts（カスタマイズ可能な要素）

```css
::part(container)          /* 全体コンテナ */
::part(input)              /* 入力フィールド */
::part(calendar)           /* カレンダー全体 */
::part(header)             /* カレンダーヘッダー */
::part(nav-button)         /* 前月/次月ボタン */
::part(month-year-select)  /* 月・年選択 */
::part(weekdays)           /* 曜日ヘッダー */
::part(days)               /* 日付グリッド */
::part(day)                /* 各日付セル */
::part(day--today)         /* 今日の日付 */
::part(day--selected)      /* 選択された日付 */
::part(day--disabled)      /* 無効化日付 */
::part(day--in-range)      /* 範囲内日付 */
::part(footer)             /* カレンダーフッター */
::part(today-button)       /* 今日ボタン */
::part(clear-button)       /* クリアボタン */
```

---

## CSS Custom Properties

```css
:host {
  /* 基本 */
  --ha-datepicker-width: 280px;
  --ha-datepicker-bg: var(--ha-color-white);
  --ha-datepicker-border-color: var(--ha-color-gray-300);
  --ha-datepicker-border-radius: var(--ha-radius-md);
  --ha-datepicker-shadow: var(--ha-shadow-lg);

  /* 入力フィールド */
  --ha-datepicker-input-padding: var(--ha-spacing-sm) var(--ha-spacing-md);
  --ha-datepicker-input-font-size: var(--ha-font-size-base);

  /* カレンダー */
  --ha-datepicker-calendar-padding: var(--ha-spacing-md);
  --ha-datepicker-calendar-gap: var(--ha-spacing-xs);

  /* ヘッダー */
  --ha-datepicker-header-height: 40px;
  --ha-datepicker-header-font-weight: var(--ha-font-weight-semibold);

  /* 日付セル */
  --ha-datepicker-day-size: 36px;
  --ha-datepicker-day-font-size: var(--ha-font-size-sm);
  --ha-datepicker-day-hover-bg: var(--ha-color-gray-100);
  --ha-datepicker-day-selected-bg: var(--ha-color-primary-500);
  --ha-datepicker-day-selected-color: var(--ha-color-white);
  --ha-datepicker-day-today-border-color: var(--ha-color-primary-500);
  --ha-datepicker-day-disabled-opacity: 0.4;
  --ha-datepicker-day-outside-opacity: 0.5;

  /* 範囲選択 */
  --ha-datepicker-range-bg: var(--ha-color-primary-100);
  --ha-datepicker-range-color: var(--ha-color-primary-900);
}
```

---

## テスト項目

### 単体テスト
1. **コンポーネント登録**
   - カスタム要素として登録されているか
   - インスタンス生成できるか
   - Shadow DOM作成されるか

2. **デフォルト値**
   - 初期値が正しいか
   - mode='single'がデフォルトか
   - 現在月が表示されるか

3. **属性・プロパティ**
   - 全属性が正しく設定されるか
   - プロパティ変更で再レンダリングされるか

4. **日付選択**
   - 単一日付選択できるか
   - 範囲選択できるか
   - 複数選択できるか
   - date-selectイベント発火するか

5. **制限機能**
   - minDate以前の日付が無効化されるか
   - maxDate以降の日付が無効化されるか
   - disabledDatesが無効化されるか
   - disabledDaysOfWeekが無効化されるか

6. **ナビゲーション**
   - 前月/次月移動できるか
   - 年・月選択できるか
   - 今日に戻れるか
   - キーボードナビゲーション動作するか

7. **ローカライゼーション**
   - ロケール変更で表示が変わるか
   - 週の開始曜日が変更されるか
   - 日付フォーマットが適用されるか

8. **バリデーション**
   - required時に空でエラーになるか
   - 無効日付選択でエラーになるか

9. **カレンダー開閉**
   - open/close/toggleメソッド動作するか
   - イベント発火するか
   - インライン時は常に表示されるか

10. **エッジケース**
    - うるう年対応
    - 月末日処理
    - タイムゾーン処理
    - 不正な日付入力

### 統合テスト
- React wrapper動作確認
- Vue wrapper動作確認
- フォーム統合テスト

---

## 実装順序

### Phase 1: コア機能
1. ✅ 設計・API定義
2. ⏳ 基本カレンダーUI実装
3. ⏳ 単一日付選択機能
4. ⏳ スタイル実装

### Phase 2: 高度な機能
5. ⏳ 範囲選択・複数選択
6. ⏳ 日付制限機能
7. ⏳ ローカライゼーション
8. ⏳ キーボードナビゲーション

### Phase 3: テスト・ラッパー
9. ⏳ 包括的テスト作成
10. ⏳ React wrapper作成
11. ⏳ Vue wrapper作成
12. ⏳ Storybook stories作成

### Phase 4: 最終調整
13. ⏳ アクセシビリティ最終チェック
14. ⏳ ドキュメント作成
15. ⏳ コミット・プッシュ

---

## 技術的考慮事項

### 日付ライブラリ
- **採用しない**: date-fns, moment.jsなどの外部依存を避ける
- **理由**: バンドルサイズ削減、依存関係最小化
- **実装**: ネイティブDate APIを使用し、必要な機能のみ実装

### カレンダー計算
```typescript
// 月の日数取得
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// 月の最初の日の曜日取得
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

// カレンダーグリッド生成（前月・当月・次月の日付含む）
function generateCalendarGrid(year: number, month: number): Date[][] {
  // 実装...
}
```

### パフォーマンス最適化
- 日付計算結果のメモ化
- 不要な再レンダリング防止
- イベントリスナーの適切な管理

### アクセシビリティ
```html
<div role="dialog" aria-modal="true" aria-label="Choose date">
  <div role="grid" aria-labelledby="month-year">
    <div role="row">
      <button role="gridcell" aria-selected="true" aria-label="January 15, 2025">
        15
      </button>
    </div>
  </div>
</div>
```

---

## 参考実装
- react-datepicker
- vuetify date-picker
- material-ui date-picker
- flatpickr

---

## 成功基準

✅ 全テストPass（目標: 50+テスト）
✅ ビルドエラーなし
✅ React/Vueラッパー動作確認
✅ Storybook完成（目標: 10+ストーリー）
✅ アクセシビリティチェックPass
✅ キーボード操作完全対応
✅ ドキュメント完成
