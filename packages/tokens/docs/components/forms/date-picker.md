# Date Picker (日付選択) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/date-picker.css`
**ステータス:** ✅ 実装済み

---

## 概要

Date Pickerコンポーネントは、ユーザーが日付を選択するためのカレンダーUIを提供します。ポップアップ形式とインライン形式の両方をサポートし、単一日付選択と日付範囲選択に対応しています。

### 用途

- イベント日時の選択
- 予約システムの日付入力
- フィルタリング用の期間指定
- スケジュール管理
- 日付範囲の選択（開始日〜終了日）

---

## 機能

### 1. 入力フィールド

日付を表示・選択するためのクリック可能な入力フィールド。

**特徴:**
- 高さ: `40px`
- パディング: `0.5rem 0.75rem`
- カレンダーアイコン付き
- フォーカス時のビジュアルフィードバック
- プレースホルダーサポート

### 2. カレンダーポップアップ

日付選択のためのドロップダウンカレンダー。

**特徴:**
- 最小幅: `280px`
- シャドウ付きオーバーレイ
- スムーズなアニメーション（フェード+スライド）
- 月・年ナビゲーション
- 週の曜日表示

### 3. 日付セル

カレンダー内の個々の日付。

**特徴:**
- サイズ: `36px × 36px`
- ホバーエフェクト
- 今日の日付の強調表示（ボーダー）
- 選択された日付の強調表示（背景色）
- 他の月の日付は半透明表示

### 4. 日付範囲選択

開始日と終了日を選択する範囲モード。

**特徴:**
- 範囲内の日付を背景色で表示
- 開始日と終了日に角丸適用
- ホバー時のプレビュー

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/date-picker.css">
</head>
<body>
  <!-- 基本的な使用 -->
  <div class="ha-date-picker date-picker">
    <label class="date-picker__label">予約日</label>
    <div class="date-picker__input-wrapper">
      <input
        type="text"
        class="date-picker__input"
        placeholder="日付を選択"
        readonly
      >
      <svg class="date-picker__icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
      </svg>
    </div>

    <div class="date-picker__calendar date-picker__calendar--open">
      <div class="date-picker__header">
        <button class="date-picker__nav-button" aria-label="前の月">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
          </svg>
        </button>
        <div class="date-picker__month-year">2025年 1月</div>
        <button class="date-picker__nav-button" aria-label="次の月">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
          </svg>
        </button>
      </div>

      <div class="date-picker__weekdays">
        <div class="date-picker__weekday">日</div>
        <div class="date-picker__weekday">月</div>
        <div class="date-picker__weekday">火</div>
        <div class="date-picker__weekday">水</div>
        <div class="date-picker__weekday">木</div>
        <div class="date-picker__weekday">金</div>
        <div class="date-picker__weekday">土</div>
      </div>

      <div class="date-picker__days">
        <button class="date-picker__day date-picker__day--outside">29</button>
        <button class="date-picker__day date-picker__day--outside">30</button>
        <button class="date-picker__day date-picker__day--outside">31</button>
        <button class="date-picker__day">1</button>
        <button class="date-picker__day">2</button>
        <button class="date-picker__day">3</button>
        <button class="date-picker__day">4</button>
        <button class="date-picker__day">5</button>
        <button class="date-picker__day date-picker__day--today">6</button>
        <button class="date-picker__day">7</button>
        <button class="date-picker__day date-picker__day--selected">8</button>
        <!-- ... 他の日付 ... -->
      </div>

      <div class="date-picker__footer">
        <button class="date-picker__footer-button">キャンセル</button>
        <button class="date-picker__footer-button date-picker__footer-button--primary">選択</button>
      </div>
    </div>
  </div>

  <!-- インライン表示 -->
  <div class="ha-date-picker date-picker date-picker--inline" inline>
    <div class="date-picker__calendar date-picker__calendar--open">
      <!-- カレンダー内容は上記と同じ -->
    </div>
  </div>

  <!-- エラー状態 -->
  <div class="ha-date-picker date-picker date-picker--error">
    <label class="date-picker__label">チェックイン日</label>
    <div class="date-picker__input-wrapper">
      <input
        type="text"
        class="date-picker__input"
        placeholder="日付を選択"
        aria-invalid="true"
        readonly
      >
      <svg class="date-picker__icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
      </svg>
    </div>
    <span class="date-picker__error-text">日付を選択してください</span>
  </div>

  <!-- 日付範囲選択 -->
  <div class="ha-date-picker date-picker">
    <label class="date-picker__label">滞在期間</label>
    <div class="date-picker__input-wrapper">
      <input
        type="text"
        class="date-picker__input"
        placeholder="開始日 - 終了日"
        readonly
      >
      <svg class="date-picker__icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
      </svg>
    </div>

    <div class="date-picker__calendar date-picker__calendar--open">
      <!-- ヘッダーと曜日は同じ -->

      <div class="date-picker__days">
        <button class="date-picker__day date-picker__day--selected date-picker__day--range-start">10</button>
        <button class="date-picker__day date-picker__day--in-range">11</button>
        <button class="date-picker__day date-picker__day--in-range">12</button>
        <button class="date-picker__day date-picker__day--selected date-picker__day--range-end">13</button>
        <!-- ... 他の日付 ... -->
      </div>
    </div>
  </div>

  <!-- 無効状態 -->
  <div class="ha-date-picker date-picker">
    <label class="date-picker__label">登録日</label>
    <div class="date-picker__input-wrapper">
      <input
        type="text"
        class="date-picker__input"
        value="2025/01/01"
        disabled
      >
      <svg class="date-picker__icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
      </svg>
    </div>
    <span class="date-picker__helper-text">この日付は変更できません</span>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `inline` | `boolean` | `false` | インライン表示（ポップアップではなく常時表示） |

---

## CSS変数

```css
/* ベース */
--datepicker-width: 280px;                              /* コンポーネントの幅 */
--datepicker-bg: var(--foreground-inverse);             /* 背景色 */
--datepicker-border-color: var(--border-default);       /* ボーダー色 */
--datepicker-border-radius: var(--border-radius-md);    /* 角丸 */
--datepicker-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); /* シャドウ */

/* 入力フィールド */
--datepicker-input-padding: 0.5rem 0.75rem;             /* パディング */
--datepicker-input-font-size: var(--font-size-base);    /* フォントサイズ */
--datepicker-input-height: 40px;                        /* 高さ */

/* カレンダー */
--datepicker-calendar-padding: 1rem;                    /* パディング */
--datepicker-calendar-gap: 0.25rem;                     /* セル間隔 */

/* ヘッダー */
--datepicker-header-height: 40px;                       /* ヘッダー高さ */
--datepicker-header-font-weight: 600;                   /* フォントウェイト */

/* 日付セル */
--datepicker-day-size: 36px;                            /* セルサイズ */
--datepicker-day-font-size: 0.875rem;                   /* フォントサイズ */
--datepicker-day-hover-bg: var(--border-default);       /* ホバー背景色 */
--datepicker-day-selected-bg: var(--primary-default);   /* 選択時背景色 */
--datepicker-day-selected-color: var(--foreground-inverse); /* 選択時テキスト色 */
--datepicker-day-today-border-color: var(--primary-default); /* 今日のボーダー色 */
--datepicker-day-disabled-opacity: 0.4;                 /* 無効時の透明度 */
--datepicker-day-outside-opacity: 0.5;                  /* 他月の透明度 */

/* 範囲選択 */
--datepicker-range-bg: var(--primary-default);          /* 範囲背景色 */
--datepicker-range-color: var(--primary-default);       /* 範囲テキスト色 */
```

---

## アクセシビリティ

### ARIA属性の使用

```html
<div class="ha-date-picker date-picker">
  <label class="date-picker__label" for="event-date">イベント日</label>
  <div class="date-picker__input-wrapper">
    <input
      id="event-date"
      type="text"
      class="date-picker__input"
      placeholder="日付を選択"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-label="日付を選択"
      readonly
    >
    <svg class="date-picker__icon" aria-hidden="true">
      <!-- アイコン -->
    </svg>
  </div>

  <div
    class="date-picker__calendar"
    role="dialog"
    aria-label="日付選択カレンダー"
  >
    <div class="date-picker__header">
      <button
        class="date-picker__nav-button"
        aria-label="前の月へ移動"
      >
        <!-- 左矢印アイコン -->
      </button>
      <div class="date-picker__month-year" aria-live="polite">
        2025年 1月
      </div>
      <button
        class="date-picker__nav-button"
        aria-label="次の月へ移動"
      >
        <!-- 右矢印アイコン -->
      </button>
    </div>

    <div class="date-picker__weekdays" role="row">
      <div class="date-picker__weekday" role="columnheader">日</div>
      <!-- ... 他の曜日 ... -->
    </div>

    <div class="date-picker__days" role="grid">
      <button
        class="date-picker__day"
        role="gridcell"
        aria-label="2025年1月1日"
        tabindex="0"
      >1</button>
      <button
        class="date-picker__day date-picker__day--today"
        role="gridcell"
        aria-label="2025年1月6日 今日"
        aria-current="date"
      >6</button>
      <button
        class="date-picker__day date-picker__day--selected"
        role="gridcell"
        aria-label="2025年1月8日 選択済み"
        aria-selected="true"
      >8</button>
      <button
        class="date-picker__day date-picker__day--disabled"
        role="gridcell"
        aria-label="2025年1月15日 選択不可"
        aria-disabled="true"
        disabled
      >15</button>
    </div>
  </div>
</div>
```

### キーボードナビゲーション

- **Enter/Space**: カレンダーを開く/日付を選択
- **Escape**: カレンダーを閉じる
- **矢印キー**: 日付間の移動
- **Home**: 月の最初の日へ移動
- **End**: 月の最後の日へ移動
- **PageUp**: 前の月へ移動
- **PageDown**: 次の月へ移動

---

## ベストプラクティス

### ✅ 推奨

```html
<!-- ラベルとヘルパーテキストを提供 -->
<div class="ha-date-picker date-picker">
  <label class="date-picker__label">チェックイン日</label>
  <div class="date-picker__input-wrapper">
    <input type="text" class="date-picker__input" placeholder="YYYY/MM/DD">
  </div>
  <span class="date-picker__helper-text">
    予約可能な最短日は3日後からです
  </span>
</div>

<!-- 読み取り専用の入力フィールドを使用 -->
<input
  type="text"
  class="date-picker__input"
  readonly
  placeholder="日付を選択"
>

<!-- 適切なフォーマットを表示 -->
<input
  type="text"
  class="date-picker__input"
  value="2025/01/08"
  placeholder="YYYY/MM/DD"
>
```

### ❌ 避けるべき

```html
<!-- ラベルなし -->
<div class="ha-date-picker date-picker">
  <div class="date-picker__input-wrapper">
    <input type="text" class="date-picker__input">
  </div>
</div>

<!-- 編集可能な入力フィールド（バリデーションが複雑） -->
<input
  type="text"
  class="date-picker__input"
  placeholder="日付を入力"
>

<!-- 不明確なフォーマット -->
<input
  type="text"
  class="date-picker__input"
  placeholder="日付"
>
```

---

## 使用例

### イベント予約フォーム

```html
<form>
  <div class="ha-date-picker date-picker">
    <label class="date-picker__label">イベント日</label>
    <div class="date-picker__input-wrapper">
      <input
        type="text"
        class="date-picker__input"
        placeholder="YYYY/MM/DD"
        aria-required="true"
        readonly
      >
      <svg class="date-picker__icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
      </svg>
    </div>
    <span class="date-picker__helper-text">
      イベントは1週間後から予約可能です
    </span>
  </div>
</form>
```

### ホテル予約（日付範囲）

```html
<form>
  <div class="ha-date-picker date-picker">
    <label class="date-picker__label">チェックイン - チェックアウト</label>
    <div class="date-picker__input-wrapper">
      <input
        type="text"
        class="date-picker__input"
        placeholder="開始日 - 終了日"
        readonly
      >
      <svg class="date-picker__icon" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
      </svg>
    </div>
    <span class="date-picker__helper-text">
      最大30泊まで選択できます
    </span>
  </div>
</form>
```

---

## 関連コンポーネント

- [Form Group](./form-group.md) - フォームグループコンテナ
- [Input](./input.md) - テキスト入力フィールド
- [Time Picker](./time-picker.md) - 時刻選択
- [Select](./select.md) - 選択ボックス

---

**最終更新:** 2025-12-12
