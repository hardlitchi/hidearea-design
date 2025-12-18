# Slider (スライダー) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/slider.css`
**ステータス:** ✅ 実装済み

---

## 概要

Sliderコンポーネントは、ユーザーがドラッグ操作で数値を選択するためのインターフェースです。単一値の選択と範囲選択の両方に対応し、水平・垂直方向のレイアウト、マーク表示、ツールチップなど、豊富な機能を提供します。

### 用途

- 数値入力（音量、明るさなど）
- 範囲選択（価格帯、日付範囲など）
- フィルター設定
- 設定値の調整
- パラメータのチューニング

---

## モード

### 1. 単一値モード（デフォルト）

単一の値を選択します。最も一般的な使用方法です。

**使用場面:**
- 音量調整
- 明るさ設定
- ズームレベル
- 進捗表示

### 2. 範囲選択モード

2つのつまみを使用して範囲を選択します。

**使用場面:**
- 価格帯フィルター
- 日付範囲選択
- 数値範囲フィルター

---

## 方向

### 水平（デフォルト）

左から右への標準的なスライダー。

**特徴:**
- 幅: 100%（親要素に追従）
- トラック高さ: 6px
- つまみサイズ: 18px

### 垂直

下から上への垂直スライダー。

**特徴:**
- 高さ: 200px（デフォルト）
- トラック幅: 6px
- つまみサイズ: 18px

**使用場面:**
- 縦長のパネル
- サイドバーのコントロール
- 特殊なUIレイアウト

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/slider.css">
</head>
<body>
  <!-- 基本的なスライダー -->
  <ha-slider min="0" max="100" value="50"></ha-slider>

  <!-- ラベル付き -->
  <ha-slider
    min="0"
    max="100"
    value="50"
    label="音量">
  </ha-slider>

  <!-- ステップ指定 -->
  <ha-slider
    min="0"
    max="100"
    value="50"
    step="10"
    label="明るさ (10刻み)">
  </ha-slider>

  <!-- ツールチップ表示 -->
  <ha-slider
    min="0"
    max="100"
    value="50"
    show-tooltip
    label="ズームレベル">
  </ha-slider>

  <!-- マーク表示 -->
  <ha-slider
    min="0"
    max="100"
    value="50"
    step="25"
    show-marks
    label="進捗">
  </ha-slider>

  <!-- 範囲選択 -->
  <ha-slider
    min="0"
    max="1000"
    range
    range-start="200"
    range-end="800"
    label="価格帯 ($)">
  </ha-slider>

  <!-- 垂直スライダー -->
  <ha-slider
    min="0"
    max="100"
    value="50"
    orientation="vertical"
    label="縦スライダー">
  </ha-slider>

  <!-- 無効状態 -->
  <ha-slider
    min="0"
    max="100"
    value="50"
    disabled
    label="無効">
  </ha-slider>

  <!-- 読み取り専用 -->
  <ha-slider
    min="0"
    max="100"
    value="75"
    readonly
    label="読み取り専用">
  </ha-slider>
</body>
</html>
```

### Pattern 3: React/Vue (TypeScript)

```typescript
import { sliderStyles } from '@hidearea-design/tokens/styles';

// Web Component として使用
const SliderExample = () => {
  const handleChange = (e: CustomEvent) => {
    console.log('Value changed:', e.detail.value);
  };

  const handleInput = (e: CustomEvent) => {
    console.log('Dragging:', e.detail.value);
  };

  return (
    <div>
      {/* 単一値 */}
      <ha-slider
        min="0"
        max="100"
        value="50"
        label="音量"
        show-tooltip
        onSliderChange={handleChange}
        onSliderInput={handleInput}
      />

      {/* 範囲選択 */}
      <ha-slider
        min="0"
        max="1000"
        range
        rangeStart="200"
        rangeEnd="800"
        label="価格帯"
        onSliderChange={handleChange}
      />
    </div>
  );
};
```

---

## 属性

| 属性 | 型 | デフォルト | 説明 |
|------|------|-----------|------|
| `min` | number | `0` | 最小値 |
| `max` | number | `100` | 最大値 |
| `value` | number | `0` | 現在値（単一値モード） |
| `step` | number | `1` | ステップ値 |
| `range` | boolean | `false` | 範囲選択モードを有効化 |
| `range-start` | number | `0` | 範囲の開始値 |
| `range-end` | number | `100` | 範囲の終了値 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 方向 |
| `label` | string | - | ラベルテキスト |
| `show-marks` | boolean | `false` | マークを表示 |
| `marks` | string | - | カスタムマーク位置（カンマ区切り） |
| `show-tooltip` | boolean | `false` | ツールチップを表示 |
| `disabled` | boolean | `false` | 無効状態 |
| `readonly` | boolean | `false` | 読み取り専用 |

---

## イベント

| イベント名 | タイミング | Detail |
|-----------|----------|--------|
| `slider-change` | 値が確定したとき（マウスアップ） | `{ value: number }` または `{ start: number, end: number }` |
| `slider-input` | ドラッグ中（リアルタイム） | `{ value: number }` または `{ start: number, end: number }` |

---

## カスタマイズ可能なトークン

### トラック

- `--component-slider-track-height`: トラック高さ（デフォルト: 6px）
- `--component-slider-track-background`: トラック背景色
- `--component-slider-track-radius`: トラック角丸

### フィル（選択範囲）

- `--component-slider-fill-background`: フィル背景色

### つまみ（サム）

- `--component-slider-thumb-size`: サイズ（デフォルト: 18px）
- `--component-slider-thumb-background`: 背景色
- `--component-slider-thumb-border-width`: ボーダー幅
- `--component-slider-thumb-border-color`: ボーダー色
- `--component-slider-thumb-shadow`: 影
- `--component-slider-thumb-shadow-hover`: ホバー時の影
- `--component-slider-thumb-scale-hover`: ホバー時の拡大率（デフォルト: 1.1）

### ラベル

- `--component-slider-label-font-size`: フォントサイズ
- `--component-slider-label-font-weight`: フォントウェイト
- `--component-slider-label-color`: テキスト色
- `--component-slider-label-margin-bottom`: 下マージン

### マーク

- `--component-slider-mark-size`: マークサイズ（デフォルト: 4px）
- `--component-slider-mark-color`: マーク色
- `--component-slider-mark-active-color`: アクティブなマークの色

### ツールチップ

- `--component-slider-tooltip-background`: 背景色
- `--component-slider-tooltip-color`: テキスト色
- `--component-slider-tooltip-padding`: パディング
- `--component-slider-tooltip-font-size`: フォントサイズ
- `--component-slider-tooltip-radius`: 角丸
- `--component-slider-tooltip-offset`: つまみからのオフセット

### 間隔

- `--component-slider-spacing-padding-vertical`: 垂直パディング
- `--component-slider-spacing-padding-horizontal`: 水平パディング

### 垂直スライダー

- `--component-slider-vertical-height`: デフォルト高さ（200px）
- `--component-slider-vertical-padding-vertical`: 垂直パディング
- `--component-slider-vertical-padding-horizontal`: 水平パディング

### 状態

- `--component-slider-disabled-opacity`: 無効時の不透明度
- `--component-slider-disabled-cursor`: 無効時のカーソル

---

## アクセシビリティ

### キーボード操作

- **Tab**: フォーカス移動
- **矢印キー（←/→）**: 値の増減（水平）
- **矢印キー（↑/↓）**: 値の増減（垂直）
- **Home**: 最小値に移動
- **End**: 最大値に移動
- **Page Up/Down**: 大きな増減（step × 10）

### ARIA属性

- `role="slider"`: スライダーロール
- `aria-label`: ラベル
- `aria-valuemin`: 最小値
- `aria-valuemax`: 最大値
- `aria-valuenow`: 現在値
- `aria-valuetext`: テキスト表現
- `aria-disabled`: 無効状態
- `aria-readonly`: 読み取り専用状態
- `aria-orientation`: 方向

### スクリーンリーダー

現在の値、最小値、最大値が適切にアナウンスされます。

---

## ベストプラクティス

### デザイン

1. **適切な範囲設定**
   - min/max を意味のある範囲に設定
   - step を適切な粒度に調整

2. **ラベルの提供**
   - 常にラベルを表示
   - 単位を明示（%, px, $ など）

3. **視覚的フィードバック**
   - show-tooltip でリアルタイムフィードバック
   - show-marks で目安を提供

### 実装

1. **イベントハンドリング**
   - `slider-change`: 最終的な値の保存
   - `slider-input`: リアルタイムプレビュー

2. **パフォーマンス**
   - ドラッグ中の頻繁な更新に注意
   - デバウンス/スロットル処理を検討

3. **バリデーション**
   - min/max 範囲外の値を防ぐ
   - step に合わない値を丸める

4. **範囲選択**
   - start/end の順序を検証
   - 交差しないよう制御

---

## 関連コンポーネント

- **Input**: テキストでの数値入力
- **Color Picker**: カラー値の調整
- **Range Input**: ネイティブHTML5 range

---

## 技術仕様

### ブラウザサポート

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

### タッチデバイス対応

- タッチ操作完全対応
- 44px 以上のタッチターゲット確保
- スワイプジェスチャー対応

### パフォーマンス

- 60fps のスムーズなドラッグ
- GPU アクセラレーション活用

---

## 使用例

### 音量コントロール

```html
<ha-slider
  min="0"
  max="100"
  value="70"
  label="音量"
  show-tooltip
  aria-label="音量調整">
</ha-slider>
```

### 価格帯フィルター

```html
<ha-slider
  min="0"
  max="10000"
  range
  range-start="2000"
  range-end="8000"
  step="100"
  label="価格帯 (円)"
  show-marks>
</ha-slider>
```

### 進捗表示（読み取り専用）

```html
<ha-slider
  min="0"
  max="100"
  value="75"
  label="ダウンロード進捗"
  readonly
  show-tooltip>
</ha-slider>
```

---

## 変更履歴

- **v0.1.0** (2025-12-19): 初回リリース
  - 単一値・範囲選択モード
  - 水平・垂直方向対応
  - マーク・ツールチップ機能
  - キーボード操作フルサポート
  - アクセシビリティ対応
