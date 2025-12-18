# Color Picker (カラーピッカー) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/color-picker.css`
**ステータス:** ✅ 実装済み

---

## 概要

Color Pickerコンポーネントは、ユーザーが視覚的に色を選択するためのインターフェースです。HSV色空間ベースのパレット、色相スライダー、アルファ（透明度）スライダー、カラースウォッチなどの機能を提供します。

### 用途

- 色の選択
- テーマカスタマイズ
- デザインツール
- カラースキーム設定
- 背景色・テキスト色の設定

---

## 機能

### 1. カラーパレット

HSV色空間を使用した2Dカラーパレット。彩度（Saturation）と明度（Value）を選択できます。

**特徴:**
- 200px × 280px のパレット領域
- ドラッグ操作でリアルタイム選択
- 現在選択中の位置を示すカーソル

### 2. 色相スライダー

0°から360°の色相を選択するための水平スライダー。

**スタイル:**
- 虹色グラデーション（赤 → 黄 → 緑 → シアン → 青 → マゼンタ → 赤）
- 12px の高さ
- カーソル表示

### 3. アルファスライダー

色の透明度を0（完全透明）から1（完全不透明）まで選択可能。

**スタイル:**
- チェッカーボードパターン背景
- 現在色のグラデーション
- カーソル表示

### 4. カラープレビュー & 入力

選択中の色をプレビュー表示し、16進数カラーコードで編集可能。

**特徴:**
- 40px × 40px のプレビューボックス
- チェッカーボード背景（透明度表示）
- HEX/RGB/HSL形式対応

### 5. カラースウォッチ

事前定義された色のリストから素早く選択可能。

**スタイル:**
- グリッドレイアウト（auto-fill）
- 24px × 24px のスウォッチサイズ
- ホバー効果

---

## 使用方法

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/color-picker.css">
</head>
<body>
  <!-- 基本的なカラーピッカー -->
  <ha-color-picker value="#3b82f6"></ha-color-picker>

  <!-- アルファチャンネル付き -->
  <ha-color-picker value="#3b82f680" show-alpha></ha-color-picker>

  <!-- 入力欄表示 -->
  <ha-color-picker value="#3b82f6" show-input></ha-color-picker>

  <!-- スウォッチ付き -->
  <ha-color-picker
    value="#3b82f6"
    show-swatches
    swatches="#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6">
  </ha-color-picker>

  <!-- 完全版 -->
  <ha-color-picker
    value="#3b82f6"
    format="hex"
    show-alpha
    show-input
    show-swatches
    swatches="#000000,#ffffff,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ec4899">
  </ha-color-picker>

  <!-- 無効状態 -->
  <ha-color-picker value="#3b82f6" disabled></ha-color-picker>

  <!-- 読み取り専用 -->
  <ha-color-picker value="#3b82f6" readonly></ha-color-picker>
</body>
</html>
```

### Pattern 3: React/Vue (TypeScript)

```typescript
import { colorPickerStyles } from '@hidearea-design/tokens/styles';

// Web Component として使用
const ColorPickerExample = () => {
  const handleColorChange = (e: CustomEvent) => {
    console.log('Selected color:', e.detail.value);
  };

  return (
    <ha-color-picker
      value="#3b82f6"
      show-alpha
      show-input
      onColorChange={handleColorChange}
    />
  );
};
```

---

## 属性

| 属性 | 型 | デフォルト | 説明 |
|------|------|-----------|------|
| `value` | string | `#000000` | 現在の色値（HEX/RGB/HSL） |
| `format` | `'hex' \| 'rgb' \| 'hsl'` | `'hex'` | 色の出力形式 |
| `show-alpha` | boolean | `false` | アルファスライダーを表示 |
| `show-input` | boolean | `false` | 入力欄とプレビューを表示 |
| `show-swatches` | boolean | `false` | スウォッチを表示 |
| `swatches` | string | - | カンマ区切りの色リスト |
| `disabled` | boolean | `false` | 無効状態 |
| `readonly` | boolean | `false` | 読み取り専用 |

---

## イベント

| イベント名 | タイミング | Detail |
|-----------|----------|--------|
| `color-change` | 色が確定したとき | `{ value: string, format: string }` |
| `color-input` | ドラッグ中（リアルタイム） | `{ value: string, format: string }` |

---

## カスタマイズ可能なトークン

### サイズ

- `--component-color-picker-size-width`: コンテナ幅（デフォルト: 280px）
- `--component-color-picker-size-palette-height`: パレット高さ（デフォルト: 200px）
- `--component-color-picker-size-slider-height`: スライダー高さ（デフォルト: 12px）
- `--component-color-picker-size-preview-size`: プレビューサイズ（デフォルト: 40px）
- `--component-color-picker-size-swatch-size`: スウォッチサイズ（デフォルト: 24px）

### カーソル

- `--component-color-picker-cursor-palette-size`: パレットカーソルサイズ（デフォルト: 12px）
- `--component-color-picker-cursor-slider-size`: スライダーカーソルサイズ（デフォルト: 16px）
- `--component-color-picker-cursor-border-color`: カーソルボーダー色（デフォルト: #ffffff）

### 色

- `--component-color-picker-background-default`: コンテナ背景色
- `--component-color-picker-background-disabled`: 無効時の背景色
- `--component-color-picker-border-default`: ボーダー色
- `--component-color-picker-border-focus`: フォーカス時のボーダー色

### 間隔

- `--component-color-picker-spacing-gap`: 要素間のギャップ
- `--component-color-picker-spacing-padding`: コンテナパディング
- `--component-color-picker-spacing-controls-gap`: コントロールギャップ
- `--component-color-picker-spacing-swatch-gap`: スウォッチギャップ

### 角丸

- `--component-color-picker-radius-container`: コンテナ角丸
- `--component-color-picker-radius-palette`: パレット角丸
- `--component-color-picker-radius-preview`: プレビュー角丸
- `--component-color-picker-radius-swatch`: スウォッチ角丸

---

## アクセシビリティ

### キーボード操作

- **Tab**: フォーカス移動
- **矢印キー**: パレット内でカーソル移動（将来実装予定）
- **Enter**: 色の確定

### ARIA属性

- `role="application"`: カラーピッカーコンテナ
- `aria-label`: 各要素に適切なラベル
- `aria-disabled`: 無効状態
- `aria-readonly`: 読み取り専用状態

---

## ベストプラクティス

### デザイン

1. **コンテキストに応じた表示**
   - シンプルな用途: パレットのみ
   - 詳細設定: アルファ + 入力欄 + スウォッチ

2. **スウォッチの活用**
   - ブランドカラーを事前定義
   - 頻繁に使う色を素早く選択可能

3. **フォーマットの選択**
   - Web: HEX形式
   - デザインツール: RGB/HSL形式

### 実装

1. **イベントハンドリング**
   - `color-change`: 最終的な値の保存
   - `color-input`: リアルタイムプレビュー

2. **パフォーマンス**
   - ドラッグ中は`color-input`を使用
   - デバウンス処理を検討

3. **バリデーション**
   - 入力値の形式チェック
   - 無効な値の場合のフォールバック

---

## 関連コンポーネント

- **Input**: テキストでの色入力
- **Select**: プリセット色の選択
- **Slider**: 単一値の調整

---

## 技術仕様

### 色空間

- **内部表現**: HSV (Hue, Saturation, Value)
- **出力形式**: HEX, RGB, HSL

### ブラウザサポート

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

### パフォーマンス

- リアルタイムレンダリング対応
- 60fps のスムーズな操作

---

## 変更履歴

- **v0.1.0** (2025-12-19): 初回リリース
  - HSVベースのカラーパレット
  - 色相・アルファスライダー
  - HEX/RGB/HSL形式サポート
  - スウォッチ機能
