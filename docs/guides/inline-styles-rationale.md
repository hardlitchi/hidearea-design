# インラインスタイルの使用理由

## 概要

このドキュメントでは、Hidearea Design システムの特定のコンポーネントでインラインスタイルを使用する理由を説明します。特に、静的な CSS では効率的に表現できない動的な値に対してです。

## インラインスタイルを使用するコンポーネント

### 1. Slider コンポーネント（`ha-slider`）

**場所**: `packages/core/src/components/slider/slider.ts`

**使用方法**: 実行時の値に基づくスライダー要素の動的配置

**インラインスタイル**:
- **フィル位置/サイズ**: `left`、`width`、`bottom`、`height` - 現在の値によって決定
- **サム位置**: `left` または `bottom` - 現在の値によって決定

**理由**:
- 値はユーザーインタラクションに基づいて動的に計算される
- 位置は `min`、`max`、`step`、現在の `value` から導出されるパーセンテージ
- 範囲モードでは2つの独立したサム位置が必要
- CSS カスタムプロパティを使用すると、大きな利益なしに不必要な複雑さが増す
- 直接的なスタイル割り当てにより、ドラッグ操作中の最適なパフォーマンスを提供

**例**:
```typescript
const valuePercent = this.valueToPercent(this._value);
thumbsHtml = `
  <div class="slider__thumb"
       style="${this.orientation === 'horizontal' ? `left: ${valuePercent}%` : `bottom: ${valuePercent}%`}">
  </div>
`;
```

### 2. Color Picker コンポーネント（`ha-color-picker`）

**場所**: `packages/core/src/components/color-picker/color-picker.ts`

**使用方法**: HSV 値に基づく動的なカラーグラデーションとカーソル配置

**インラインスタイル**:
- **パレット背景**: 白から現在の色相へのグラデーション
- **パレットカーソル**: `left`、`top` - 彩度と明度に基づく
- **色相カーソル**: `left` - 色相（0-360°）に基づく
- **アルファカーソル**: `left` - アルファ（0-1）に基づく
- **アルファスライダー背景**: 透明から現在の色へのグラデーション

**理由**:
- 色の値は HSV モデルからリアルタイムで計算される
- グラデーションは現在の色相選択を反映する必要がある
- カーソル位置は色コンポーネント値から計算される
- CSS カスタムプロパティでは、パフォーマンス向上なしに頻繁な更新が必要
- 直接的なスタイル操作により、スムーズな色選択体験を提供

**例**:
```typescript
const hueColor = `hsl(${this._hue}, 100%, 50%)`;
const paletteX = this._saturation; // 0-100%
const paletteY = 100 - this._value; // 0-100%

innerHTML = `
  <style>
    .palette {
      background: linear-gradient(to right, #fff, ${hueColor}),
                  linear-gradient(to top, #000, transparent);
    }
    .palette-cursor {
      left: calc(${paletteX}% - 6px);
      top: calc(${paletteY}% - 6px);
    }
  </style>
`;
```

## 検討した代替アプローチ

### CSS カスタムプロパティ

**検討内容**:
```typescript
// インラインスタイルの代わりに CSS 変数を設定
element.style.setProperty('--slider-fill-width', `${percent}%`);
```

**却下された理由**:
- 明確性の利点なしに間接性を追加
- 同じ数の DOM 操作
- より冗長なコード
- デバッグが難しい（変数が DevTools で隠れる）
- パフォーマンス向上なし

### CSS クラス

**検討内容**:
異なる位置に対して複数の CSS クラスを生成

**却下された理由**:
- スムーズな配置には数千のクラスが必要
- 連続的な値範囲には実現不可能
- クラス切り替えによるパフォーマンス低下
- 任意のステップ値に対して柔軟性がない

## ベストプラクティス

インラインスタイルが適切な場合:
1. ✅ ユーザーインタラクションから計算される値
2. ✅ 連続的な範囲（離散的な状態ではない）
3. ✅ パフォーマンスが重要なアニメーション/ドラッグ
4. ✅ 数学的計算が必要
5. ✅ コンポーネントロジックに結合された値

インラインスタイルを避けるべき場合:
1. ❌ CSS に配置できる静的な値
2. ❌ テーマ関連の色/スペーシング
3. ❌ 変更されないレイアウトプロパティ
4. ❌ アクセシビリティ関連のスタイル
5. ❌ レスポンシブブレークポイント

## デザイントークンへの移行

これらのコンポーネントは、動的な配置と色計算に関してデザイントークンを使用するように移行**されません**。理由は以下の通りです:
- デザイントークンは静的なデザイン決定のため
- 実行時の計算はコンポーネントロジックに属する
- 現在の実装は Web Components のベストプラクティスに従っている

ただし、これらのコンポーネントは以下のためにデザイントークンを**使用しています**:
- 静的な色（背景、ボーダー、テキスト）
- スペーシング（パディング、マージン、ギャップ）
- ボーダー半径
- トランジションタイミング
- フォントプロパティ

## 結論

Slider と Color Picker コンポーネントでのインラインスタイルの使用は意図的であり、動的でユーザー駆動の値を処理するための最も適切な技術的ソリューションを表しています。このアプローチは:
- 静的デザイン（CSS/トークン）と動的振る舞い（JavaScript）の明確な分離を維持
- インタラクティブコンポーネントに最適なパフォーマンスを提供
- Web Components の標準とベストプラクティスに従う
- コードを保守可能でデバッグ可能に保つ

## 参考資料

- [Web Components ベストプラクティス](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [動的な値に対する CSS カスタムプロパティ](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [パフォーマンス: スタイル vs. CSS 変数](https://nolanlawson.com/2021/08/23/css-variable-performance/)

---

**最終更新**: 2025-12-19
**ステータス**: 承認済み
**決定責任者**: デザインシステムチーム
