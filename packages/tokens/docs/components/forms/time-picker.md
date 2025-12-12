# Time Picker (時刻選択) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/time-picker.css`
**ステータス:** ✅ 実装済み

---

## 概要

Time Pickerコンポーネントは、ユーザーが時刻を選択するための直感的なUIを提供します。12時間形式（AM/PM）と24時間形式の両方をサポートし、ポップアップ形式とインライン形式の表示が可能です。

### 用途

- イベントやミーティングの時刻設定
- 予約システムの時刻入力
- スケジュール管理
- アラーム設定
- 営業時間の設定

---

## 機能

### 1. 入力フィールド

時刻を表示・選択するためのクリック可能な入力フィールド。

**特徴:**
- 高さ: `40px`
- 時計アイコン付き
- ドロップダウントグルアイコン
- フォーカス時のアウトライン表示
- プレースホルダーサポート

### 2. 時刻選択パネル

時・分・秒（オプション）を選択するためのドロップダウンパネル。

**特徴:**
- 最大幅: `280px`
- スクロール可能なカラム表示
- 時間・分・AM/PMの独立したカラム
- シャドウ付きオーバーレイ
- 最大高さ: `300px`

### 3. スクロール可能なカラム

時間と分を個別に選択できるスクロールリスト。

**特徴:**
- スムーズなスクロール動作
- 選択された値の強調表示
- ホバーエフェクト
- カスタムスクロールバー（Webkit）

### 4. クイックアクション

「現在時刻」と「クリア」ボタンでの素早い操作。

**特徴:**
- 現在時刻の自動入力
- 選択のクリア機能
- ボタンスタイルの統一

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/time-picker.css">
</head>
<body>
  <!-- 基本的な使用（12時間形式） -->
  <div class="ha-time-picker container">
    <label>開始時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        type="text"
        class="input"
        placeholder="時刻を選択"
        readonly
      >
      <span class="toggle">▼</span>
    </div>

    <div class="panel">
      <div class="columns">
        <div class="column">
          <div class="column-header">時</div>
          <div class="column-items">
            <div class="item">01</div>
            <div class="item">02</div>
            <div class="item">03</div>
            <div class="item">04</div>
            <div class="item">05</div>
            <div class="item">06</div>
            <div class="item">07</div>
            <div class="item">08</div>
            <div class="item selected">09</div>
            <div class="item">10</div>
            <div class="item">11</div>
            <div class="item">12</div>
          </div>
        </div>

        <div class="column">
          <div class="column-header">分</div>
          <div class="column-items">
            <div class="item selected">00</div>
            <div class="item">15</div>
            <div class="item">30</div>
            <div class="item">45</div>
          </div>
        </div>

        <div class="column period-column">
          <div class="column-header">午前/午後</div>
          <div class="period-toggle">
            <button class="period-button active">AM</button>
            <button class="period-button">PM</button>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="now-button">現在時刻</button>
        <button class="clear-button">クリア</button>
      </div>
    </div>
  </div>

  <!-- 24時間形式 -->
  <div class="ha-time-picker container">
    <label>終了時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        type="text"
        class="input"
        placeholder="HH:mm"
        readonly
      >
      <span class="toggle">▼</span>
    </div>

    <div class="panel">
      <div class="columns">
        <div class="column">
          <div class="column-header">時</div>
          <div class="column-items">
            <div class="item">00</div>
            <div class="item">01</div>
            <div class="item">02</div>
            <!-- ... 23まで ... -->
            <div class="item">23</div>
          </div>
        </div>

        <div class="column">
          <div class="column-header">分</div>
          <div class="column-items">
            <div class="item">00</div>
            <div class="item">01</div>
            <div class="item">02</div>
            <!-- ... 59まで ... -->
            <div class="item">59</div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="now-button">現在時刻</button>
        <button class="clear-button">クリア</button>
      </div>
    </div>
  </div>

  <!-- インライン表示 -->
  <div class="ha-time-picker container inline">
    <label>アラーム時刻</label>
    <div class="panel">
      <!-- パネル内容は上記と同じ -->
    </div>
    <p class="helper-text">毎日この時刻にアラームが鳴ります</p>
  </div>

  <!-- エラー状態 -->
  <div class="ha-time-picker container error">
    <label>ミーティング時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        type="text"
        class="input"
        placeholder="時刻を選択"
        aria-invalid="true"
        readonly
      >
      <span class="toggle">▼</span>
    </div>
    <p class="error-text">時刻を選択してください</p>
  </div>

  <!-- 無効状態 -->
  <div class="ha-time-picker container disabled">
    <label>登録時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        type="text"
        class="input"
        value="09:30 AM"
        disabled
      >
      <span class="toggle">▼</span>
    </div>
    <p class="helper-text">登録時刻は変更できません</p>
  </div>

  <!-- 読み取り専用 -->
  <div class="ha-time-picker container readonly">
    <label>作成時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        type="text"
        class="input"
        value="14:45"
        readonly
      >
    </div>
  </div>

  <!-- 秒付き（24時間形式） -->
  <div class="ha-time-picker container">
    <label>正確な時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        type="text"
        class="input"
        placeholder="HH:mm:ss"
        readonly
      >
      <span class="toggle">▼</span>
    </div>

    <div class="panel">
      <div class="columns">
        <div class="column">
          <div class="column-header">時</div>
          <div class="column-items">
            <!-- 時のリスト -->
          </div>
        </div>

        <div class="column">
          <div class="column-header">分</div>
          <div class="column-items">
            <!-- 分のリスト -->
          </div>
        </div>

        <div class="column">
          <div class="column-header">秒</div>
          <div class="column-items">
            <div class="item">00</div>
            <div class="item">01</div>
            <!-- ... 59まで ... -->
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="now-button">現在時刻</button>
        <button class="clear-button">クリア</button>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `inline` | クラス: `inline` | - | インライン表示（ポップアップではなく常時表示） |
| `disabled` | クラス: `disabled` | - | 無効状態（選択不可） |
| `readonly` | クラス: `readonly` | - | 読み取り専用（表示のみ） |
| `error` | クラス: `error` | - | エラー状態の表示 |

---

## CSS変数

```css
/* サイズ */
--time-picker-width: 280px;                             /* コンポーネントの幅 */
--time-picker-input-height: 40px;                       /* 入力フィールドの高さ */
--time-picker-input-padding: var(--spacing-2);          /* 入力フィールドのパディング */
--time-picker-panel-width: 280px;                       /* パネルの幅 */
--time-picker-panel-max-height: 300px;                  /* パネルの最大高さ */

/* 色 */
--time-picker-input-bg: var(--background-primary);      /* 入力背景色 */
--time-picker-input-color: var(--foreground-primary);   /* 入力テキスト色 */
--time-picker-panel-bg: var(--background-primary);      /* パネル背景色 */
--time-picker-error-border: var(--error-default);       /* エラーボーダー色 */
--time-picker-error-color: var(--error-default);        /* エラーテキスト色 */

/* アイテム */
--time-picker-item-padding: var(--spacing-2);           /* アイテムパディング */
--time-picker-item-hover-bg: var(--primary-default);    /* ホバー背景色 */
--time-picker-item-selected-bg: var(--primary-default); /* 選択時背景色 */
--time-picker-item-selected-color: var(--primary-default); /* 選択時テキスト色 */
--time-picker-item-disabled-color: var(--foreground-primary); /* 無効時テキスト色 */
--time-picker-item-disabled-bg: transparent;            /* 無効時背景色 */

/* その他 */
--time-picker-border-radius: var(--border-radius-md);   /* 角丸 */
--time-picker-panel-shadow: var(--shadow-lg);           /* パネルシャドウ */
```

---

## レスポンシブ対応

### モバイル最適化 (@media max-width: 640px)

```css
/* パネル幅の調整 */
パネル幅: 100%
最大幅: calc(100vw - 32px)

/* カラムアイテムの高さ削減 */
カラムアイテムの最大高さ: 160px
```

---

## アクセシビリティ

### ARIA属性の使用

```html
<div class="ha-time-picker container">
  <label for="meeting-time">ミーティング時刻</label>
  <div class="input-wrapper">
    <span class="icon" aria-hidden="true">🕐</span>
    <input
      id="meeting-time"
      type="text"
      class="input"
      placeholder="時刻を選択"
      aria-haspopup="listbox"
      aria-expanded="false"
      aria-label="時刻を選択"
      readonly
    >
    <span class="toggle" aria-hidden="true">▼</span>
  </div>

  <div
    class="panel"
    role="dialog"
    aria-label="時刻選択パネル"
  >
    <div class="columns">
      <div class="column">
        <div class="column-header" id="hour-label">時</div>
        <div
          class="column-items"
          role="listbox"
          aria-labelledby="hour-label"
          tabindex="0"
        >
          <div
            class="item"
            role="option"
            aria-selected="false"
            tabindex="-1"
          >01</div>
          <div
            class="item selected"
            role="option"
            aria-selected="true"
            tabindex="0"
          >09</div>
          <!-- ... -->
        </div>
      </div>

      <div class="column">
        <div class="column-header" id="minute-label">分</div>
        <div
          class="column-items"
          role="listbox"
          aria-labelledby="minute-label"
          tabindex="0"
        >
          <!-- 分のアイテム -->
        </div>
      </div>

      <div class="column period-column">
        <div class="column-header">午前/午後</div>
        <div class="period-toggle" role="radiogroup" aria-label="午前午後選択">
          <button
            class="period-button active"
            role="radio"
            aria-checked="true"
          >AM</button>
          <button
            class="period-button"
            role="radio"
            aria-checked="false"
          >PM</button>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="now-button" aria-label="現在時刻を設定">
        現在時刻
      </button>
      <button class="clear-button" aria-label="選択をクリア">
        クリア
      </button>
    </div>
  </div>
</div>
```

### キーボードナビゲーション

- **Enter/Space**: パネルを開く/項目を選択
- **Escape**: パネルを閉じる
- **矢印上/下**: リスト内の項目間を移動
- **Home**: リストの最初の項目へ移動
- **End**: リストの最後の項目へ移動
- **Tab**: 時・分・AM/PMカラム間の移動

---

## ベストプラクティス

### ✅ 推奨

```html
<!-- ラベルとヘルパーテキストを提供 -->
<div class="ha-time-picker container">
  <label for="alarm-time">アラーム時刻</label>
  <div class="input-wrapper">
    <span class="icon">🕐</span>
    <input
      id="alarm-time"
      type="text"
      class="input"
      placeholder="HH:mm"
      readonly
    >
    <span class="toggle">▼</span>
  </div>
  <p class="helper-text">毎日この時刻にアラームが鳴ります</p>
</div>

<!-- 適切なフォーマットを表示 -->
<input
  type="text"
  class="input"
  placeholder="HH:mm"
  readonly
>

<!-- 12時間形式の場合はAM/PMを明示 -->
<input
  type="text"
  class="input"
  value="09:30 AM"
  readonly
>
```

### ❌ 避けるべき

```html
<!-- ラベルなし -->
<div class="ha-time-picker container">
  <div class="input-wrapper">
    <input type="text" class="input">
  </div>
</div>

<!-- 編集可能な入力フィールド（バリデーションが複雑） -->
<input
  type="text"
  class="input"
  placeholder="時刻を入力"
>

<!-- 不明確なフォーマット -->
<input
  type="text"
  class="input"
  placeholder="時刻"
>

<!-- AM/PMなしの12時間形式 -->
<input
  type="text"
  class="input"
  value="09:30"
>
```

---

## 使用例

### ミーティングスケジューラー

```html
<form>
  <div class="ha-time-picker container">
    <label for="meeting-start">開始時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        id="meeting-start"
        type="text"
        class="input"
        placeholder="時刻を選択"
        aria-required="true"
        readonly
      >
      <span class="toggle">▼</span>
    </div>
  </div>

  <div class="ha-time-picker container">
    <label for="meeting-end">終了時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        id="meeting-end"
        type="text"
        class="input"
        placeholder="時刻を選択"
        aria-required="true"
        readonly
      >
      <span class="toggle">▼</span>
    </div>
    <p class="helper-text">開始時刻より後の時刻を選択してください</p>
  </div>
</form>
```

### 営業時間設定

```html
<fieldset>
  <legend>営業時間</legend>

  <div class="ha-time-picker container">
    <label for="open-time">開店時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        id="open-time"
        type="text"
        class="input"
        value="09:00 AM"
        readonly
      >
      <span class="toggle">▼</span>
    </div>
  </div>

  <div class="ha-time-picker container">
    <label for="close-time">閉店時刻</label>
    <div class="input-wrapper">
      <span class="icon">🕐</span>
      <input
        id="close-time"
        type="text"
        class="input"
        value="06:00 PM"
        readonly
      >
      <span class="toggle">▼</span>
    </div>
  </div>
</fieldset>
```

---

## 関連コンポーネント

- [Form Group](./form-group.md) - フォームグループコンテナ
- [Date Picker](./date-picker.md) - 日付選択
- [Input](./input.md) - テキスト入力フィールド
- [Select](./select.md) - 選択ボックス

---

**最終更新:** 2025-12-12
