# Select

ドロップダウン選択フィールド。optgroup をサポートします。

## 基本的な使い方

```html
<ha-select>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
  <option value="3">オプション3</option>
</ha-select>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-select size="sm">
  <option>Small</option>
</ha-select>

<ha-select size="md">
  <option>Medium</option>
</ha-select>

<ha-select size="lg">
  <option>Large</option>
</ha-select>
```

## 状態

### Disabled

```html
<ha-select disabled>
  <option>選択できません</option>
</ha-select>
```

### Required

```html
<ha-select required>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
</ha-select>
```

### Error

```html
<ha-select error>
  <option value="">選択してください</option>
  <option value="1">オプション1</option>
</ha-select>
```

## フルワイド

```html
<ha-select full-width>
  <option>フルワイド</option>
</ha-select>
```

## optgroup

```html
<ha-select>
  <option value="">選択してください</option>
  <optgroup label="フルーツ">
    <option value="apple">りんご</option>
    <option value="banana">バナナ</option>
    <option value="orange">オレンジ</option>
  </optgroup>
  <optgroup label="野菜">
    <option value="carrot">にんじん</option>
    <option value="potato">じゃがいも</option>
    <option value="tomato">トマト</option>
  </optgroup>
</ha-select>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `value` | `string` | `''` | 選択値 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須項目 |
| `error` | `boolean` | `false` | エラー状態 |
| `full-width` | `boolean` | `false` | フルワイド表示 |
| `name` | `string` | `''` | フォーム名 |
| `multiple` | `boolean` | `false` | 複数選択 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `change` | 選択が変更された時 | `CustomEvent<string>` |
| `focus` | フォーカスされた時 | `FocusEvent` |
| `blur` | フォーカスが外れた時 | `FocusEvent` |

## React

```tsx
import { Select } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [country, setCountry] = useState('');

  return (
    <Select
      value={country}
      onChange={(e) => setCountry(e.target.value)}
      fullWidth
    >
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
      <option value="uk">イギリス</option>
    </Select>
  );
}
```

## Vue

```vue
<template>
  <HaSelect v-model="country" full-width>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </HaSelect>
</template>

<script setup>
import { ref } from 'vue';
import { Select as HaSelect } from '@hidearea-design/vue';

const country = ref('');
</script>
```

## 使用例

### FormGroup と組み合わせる

```html
<ha-form-group label="国" required>
  <ha-select name="country" required full-width>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
    <option value="uk">イギリス</option>
  </ha-select>
</ha-form-group>
```

### カテゴリ別選択

```html
<ha-form-group label="商品カテゴリ">
  <ha-select full-width>
    <option value="">選択してください</option>
    <optgroup label="電化製品">
      <option value="pc">パソコン</option>
      <option value="smartphone">スマートフォン</option>
      <option value="tablet">タブレット</option>
    </optgroup>
    <optgroup label="家具">
      <option value="desk">デスク</option>
      <option value="chair">チェア</option>
      <option value="shelf">シェルフ</option>
    </optgroup>
  </ha-select>
</ha-form-group>
```

### 複数選択

```html
<ha-select multiple size="5" full-width>
  <option value="design">デザイン</option>
  <option value="development">開発</option>
  <option value="marketing">マーケティング</option>
  <option value="sales">営業</option>
  <option value="support">サポート</option>
</ha-select>
```

## アクセシビリティ

Selectコンポーネントは、WCAG 2.1 AAに準拠し、WAI-ARIA Listboxパターンに従っています。

### ARIAサポート

Selectコンポーネントは自動的にARIA属性を適用します：

| ARIA属性 | 要素 | 説明 |
|---------|------|------|
| `role="listbox"` | select要素 | リストボックスであることを示す（ブラウザのネイティブselect要素はロールが暗黙的） |
| `role="option"` | option要素 | 選択肢であることを示す（暗黙的） |
| `role="group"` | optgroup要素 | オプショングループであることを示す（暗黙的） |
| `aria-disabled="true"` | select要素 | `disabled`属性が設定されている場合 |
| `aria-required="true"` | select要素 | `required`属性が設定されている場合 |
| `aria-invalid="true"` | select要素 | `error`属性が設定されている場合 |
| `aria-label` | select要素 | ラベルがない場合は設定を推奨 |
| `aria-describedby` | select要素 | エラーメッセージやヘルパーテキストのIDを参照 |
| `aria-labelledby` | select要素 | Form Groupが自動的にラベルと関連付け |

### キーボードナビゲーション

#### セレクトフィールド（閉じている時）

| キー | 動作 |
|-----|------|
| `Tab` | Selectにフォーカスを移動 |
| `Shift + Tab` | 前のフォーカス可能要素へ移動 |
| `Space` / `Enter` | ドロップダウンを開く |
| `Arrow Down` | ドロップダウンを開き、次のオプションへ |
| `Arrow Up` | ドロップダウンを開き、前のオプションへ |
| `文字キー` | その文字で始まる最初のオプションに移動 |

#### ドロップダウン（開いている時）

| キー | 動作 |
|-----|------|
| `Arrow Down` | 次のオプションに移動（最後の場合は最初へループ） |
| `Arrow Up` | 前のオプションに移動（最初の場合は最後へループ） |
| `Home` | 最初のオプションに移動 |
| `End` | 最後のオプションに移動 |
| `Page Down` | 10個先のオプションに移動（または最後） |
| `Page Up` | 10個前のオプションに移動（または最初） |
| `Enter` | 現在のオプションを選択してドロップダウンを閉じる |
| `Space` | 現在のオプションを選択（multipleモードの場合） |
| `Escape` | ドロップダウンを閉じる（変更をキャンセル） |
| `文字キー` | その文字で始まるオプションに順次移動（タイプアヘッド） |

#### 複数選択モード

| キー | 動作 |
|-----|------|
| `Space` | 現在のオプションを選択/解除（トグル） |
| `Shift + Arrow Down/Up` | 選択範囲を拡張（連続選択） |
| `Ctrl + A` (Windows) / `Cmd + A` (Mac) | すべてのオプションを選択 |

### スクリーンリーダーの対応

Selectコンポーネントは主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）で適切に読み上げられます。

#### 読み上げ例（Form Groupと組み合わせた場合）

**初期フォーカス時**:
```
「国を選択、リストボックス、必須、選択してください」
（"Country selection, listbox, required, Please select"）
```

**オプション選択時**:
```
「日本、5個中2番目」
（"Japan, 2 of 5"）
```

**エラー状態の場合**:
```
「国を選択、リストボックス、必須、無効な入力、国を選択してください」
（"Country selection, listbox, required, invalid entry, Please select a country"）
```

**optgroup使用時**:
```
「フルーツ、グループ」
「りんご、フルーツグループ内、3個中1番目」
（"Fruits, group"）
（"Apple, 1 of 3 in Fruits group"）
```

**複数選択モード**:
```
「部門、リストボックス、複数選択、5個中2個選択済み」
（"Department, listbox, multiple selection, 2 of 5 selected"）
```

#### ライブリージョン

プログラムで選択肢が変更された場合、スクリーンリーダーに通知する必要があります：

```html
<ha-form-group label="都道府県">
  <ha-select id="prefecture" name="prefecture">
    <option value="">選択してください</option>
    <!-- 動的に更新される選択肢 -->
  </ha-select>
</ha-form-group>

<!-- ライブリージョンで変更を通知 -->
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
  選択肢が更新されました。47個の都道府県が利用可能です。
</div>
```

### フォームラベルとの関連付け

アクセシビリティのため、Selectには必ずラベルを関連付けてください：

```html
<!-- ✓ Good: Form Groupを使用（推奨） -->
<ha-form-group label="国を選択" required helper-text="居住国を選んでください">
  <ha-select name="country" required>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
  </ha-select>
</ha-form-group>

<!-- ✓ Good: HTMLラベルを使用 -->
<label for="country-select">国を選択</label>
<ha-select id="country-select" name="country">
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</ha-select>

<!-- ✓ Good: aria-labelを使用（ラベル要素がない場合） -->
<ha-select name="country" aria-label="国を選択">
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</ha-select>

<!-- ✗ Avoid: ラベルなし（アクセシビリティ違反） -->
<ha-select name="country">
  <option value="">選択してください</option>
</ha-select>
```

### エラーメッセージとの関連付け

エラーメッセージは`aria-describedby`で関連付けます：

```html
<ha-form-group
  label="国を選択"
  required
  error="国を選択してください"
>
  <ha-select name="country" required error>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </ha-select>
</ha-form-group>

<!-- Form Groupは自動的に以下のようなマークアップを生成 -->
<label id="country-label" for="country-select">国を選択 *</label>
<ha-select
  id="country-select"
  name="country"
  required
  error
  aria-labelledby="country-label"
  aria-describedby="country-error"
  aria-invalid="true"
>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</ha-select>
<div id="country-error" role="alert">国を選択してください</div>
```

### optgroupのアクセシビリティ

optgroupを使用する場合、グループラベルがスクリーンリーダーで読み上げられます：

```html
<ha-form-group label="商品カテゴリ">
  <ha-select name="category" full-width>
    <option value="">選択してください</option>
    <optgroup label="電化製品">
      <option value="pc">パソコン</option>
      <option value="smartphone">スマートフォン</option>
      <option value="tablet">タブレット</option>
    </optgroup>
    <optgroup label="家具">
      <option value="desk">デスク</option>
      <option value="chair">チェア</option>
    </optgroup>
  </ha-select>
</ha-form-group>
```

**スクリーンリーダー読み上げ**:
```
「電化製品、グループ」
「パソコン、電化製品グループ内、3個中1番目」
「スマートフォン、電化製品グループ内、3個中2番目」
```

### フォーカスインジケーター

キーボードユーザーのために、フォーカス状態が明確に表示されます：

```css
/* デフォルトのフォーカススタイル */
ha-select:focus-within {
  outline: 2px solid var(--state-focus-ring-color);
  outline-offset: 2px;
}

/* ハイコントラストモード対応 */
@media (prefers-contrast: high) {
  ha-select:focus-within {
    outline-width: 3px;
  }
}
```

### 複数選択のアクセシビリティ

複数選択モードでは、選択数をスクリーンリーダーに通知します：

```html
<ha-form-group label="部門（複数選択可）">
  <ha-select multiple name="departments" size="5">
    <option value="design">デザイン</option>
    <option value="dev">開発</option>
    <option value="marketing">マーケティング</option>
    <option value="sales">営業</option>
    <option value="support">サポート</option>
  </ha-select>
</ha-form-group>

<!-- 選択数を通知するライブリージョン -->
<div role="status" aria-live="polite" class="sr-only">
  5個中2個選択済み
</div>
```

## スタイルのカスタマイズ

### デザイントークン

Selectコンポーネントは以下のデザイントークンを使用します：

```css
/* Select (Input トークンを共有) */
var(--component-input-background-default)      /* 背景色（通常） */
var(--component-input-background-disabled)     /* 背景色（無効） */
var(--component-input-text-default)            /* テキスト色 */
var(--component-input-text-placeholder)        /* プレースホルダー色 */
var(--component-input-border-default)          /* ボーダー色（通常） */
var(--component-input-border-hover)            /* ボーダー色（ホバー） */
var(--component-input-border-focus)            /* ボーダー色（フォーカス） */
var(--component-input-border-error)            /* ボーダー色（エラー） */

/* スペーシング */
var(--spacing-xs)                              /* Padding（極小・sm） */
var(--spacing-sm)                              /* Padding（小・md） */
var(--spacing-md)                              /* Padding（中・lg） */
var(--spacing-lg)                              /* Gap */

/* タイポグラフィ */
var(--text-body-sm-fontSize)                   /* フォントサイズ（sm） */
var(--text-body-default-fontSize)              /* フォントサイズ（md） */
var(--text-body-lg-fontSize)                   /* フォントサイズ（lg） */
var(--text-body-default-lineHeight)            /* 行高 */

/* ボーダーと角丸 */
var(--border-radius-sm)                        /* 角丸（sm） */
var(--border-radius-md)                        /* 角丸（md） */
var(--border-radius-lg)                        /* 角丸（lg） */
var(--border-width-thin)                       /* ボーダー幅 */

/* インタラクション */
var(--interaction-transition-fast-duration)    /* トランジション速度 */
var(--state-focus-ring-color)                  /* フォーカスリング色 */
var(--state-focus-ring-width)                  /* フォーカスリング幅 */

/* ドロップダウン */
var(--elevation-shadow-md)                     /* ドロップダウン影 */
var(--color-surface-overlay)                   /* ドロップダウン背景 */
```

### カスタムCSS変数

CSS変数を使用してスタイルをカスタマイズできます：

```css
/* 基本的なカスタマイズ */
ha-select {
  --select-padding: 10px 12px;
  --select-border-radius: 6px;
  --select-font-size: 14px;
  --select-border-color: var(--color-gray-300);
  --select-focus-border-color: var(--color-primary-500);
  --select-background: var(--color-white);
  --select-text-color: var(--color-gray-900);
}

/* サイズ別のカスタマイズ */
ha-select[size="sm"] {
  --select-padding: 6px 8px;
  --select-font-size: 13px;
  --select-border-radius: 4px;
}

ha-select[size="lg"] {
  --select-padding: 14px 16px;
  --select-font-size: 16px;
  --select-border-radius: 8px;
}

/* 状態別のカスタマイズ */
ha-select[error] {
  --select-border-color: var(--color-danger-500);
  --select-focus-border-color: var(--color-danger-600);
}

ha-select[disabled] {
  --select-background: var(--color-gray-100);
  --select-text-color: var(--color-gray-400);
  --select-cursor: not-allowed;
  opacity: 0.6;
}
```

### Shadow DOMパーツ

Shadow DOMの`::part()`セレクターを使用して、より詳細なスタイルのカスタマイズが可能です：

| Part名 | 説明 |
|--------|------|
| `select` | select要素全体 |
| `option` | option要素 |
| `optgroup` | optgroup要素 |
| `icon` | ドロップダウンアイコン |

```css
/* select要素のカスタマイズ */
ha-select::part(select) {
  font-family: 'Your Custom Font', sans-serif;
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* フォーカス時のカスタマイズ */
ha-select::part(select):focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  border-color: var(--color-primary-500);
}

/* ホバー時のカスタマイズ */
ha-select::part(select):hover:not(:disabled) {
  border-color: var(--color-primary-400);
  background-color: var(--color-gray-50);
}

/* ドロップダウンアイコンのカスタマイズ */
ha-select::part(icon) {
  color: var(--color-gray-600);
  width: 20px;
  height: 20px;
}

/* option要素のカスタマイズ */
ha-select::part(option):hover {
  background-color: var(--color-primary-50);
}

ha-select::part(option):checked {
  background-color: var(--color-primary-100);
  font-weight: 600;
}

/* optgroup要素のカスタマイズ */
ha-select::part(optgroup) {
  font-weight: 700;
  font-size: 0.875em;
  color: var(--color-gray-700);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### ダークモードのサポート

ダークモードに対応したスタイルを定義できます：

```css
/* ライトモード（デフォルト） */
ha-select {
  --select-background: var(--color-white);
  --select-text-color: var(--color-gray-900);
  --select-border-color: var(--color-gray-300);
  --select-focus-border-color: var(--color-primary-500);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  ha-select {
    --select-background: var(--color-gray-800);
    --select-text-color: var(--color-gray-100);
    --select-border-color: var(--color-gray-600);
    --select-focus-border-color: var(--color-primary-400);
  }

  ha-select::part(select) {
    color-scheme: dark;
  }

  ha-select::part(option):hover {
    background-color: var(--color-gray-700);
  }

  ha-select::part(option):checked {
    background-color: var(--color-gray-600);
  }
}
```

### カスタムテーマ

特定のユースケース向けのカスタムテーマを作成できます：

```css
/* プライマリテーマ */
ha-select.select-primary::part(select) {
  border-color: var(--color-primary-300);
  background-color: var(--color-primary-50);
}

ha-select.select-primary::part(select):focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
}

/* サクセステーマ */
ha-select.select-success::part(select) {
  border-color: var(--color-success-300);
  background-color: var(--color-success-50);
}

/* フラットテーマ（ボーダーなし） */
ha-select.select-flat::part(select) {
  border: none;
  background-color: var(--color-gray-100);
  border-radius: var(--border-radius-lg);
}

ha-select.select-flat::part(select):hover {
  background-color: var(--color-gray-200);
}

/* ミニマルテーマ */
ha-select.select-minimal::part(select) {
  border: none;
  border-bottom: 2px solid var(--color-gray-300);
  border-radius: 0;
  background-color: transparent;
  padding-left: 0;
}

ha-select.select-minimal::part(select):focus {
  border-bottom-color: var(--color-primary-500);
  outline: none;
}
```

### レスポンシブなカスタマイズ

デバイスサイズに応じてスタイルを変更できます：

```css
/* モバイル: フルワイドで大きめのタップターゲット */
@media (max-width: 768px) {
  ha-select {
    --select-padding: 14px 16px;
    --select-font-size: 16px; /* iOS Safari のズーム防止 */
  }
}

/* タブレット */
@media (min-width: 769px) and (max-width: 1024px) {
  ha-select {
    --select-padding: 10px 12px;
    --select-font-size: 14px;
  }
}

/* デスクトップ */
@media (min-width: 1025px) {
  ha-select {
    --select-padding: 8px 12px;
    --select-font-size: 14px;
  }
}

/* タッチデバイスでは大きめのターゲット */
@media (pointer: coarse) {
  ha-select {
    --select-padding: 14px 16px;
  }
}
```

### CSSカスタムプロパティインターフェース

TypeScript型定義：

```typescript
interface SelectCSSCustomProperties {
  '--select-padding'?: string;
  '--select-border-radius'?: string;
  '--select-font-size'?: string;
  '--select-border-color'?: string;
  '--select-focus-border-color'?: string;
  '--select-background'?: string;
  '--select-text-color'?: string;
  '--select-cursor'?: string;
}
```

## ベストプラクティス

### Do's ✓

#### 1. 最初のoptionは空にする

プレースホルダーとして「選択してください」を使用し、`value=""`を設定します。

```html
<!-- ✓ Good -->
<ha-select name="country" required>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
</ha-select>
```

**理由**: ユーザーが明示的に選択を行う必要があることを明確にし、フォームバリデーションが機能します。

#### 2. optgroupで分類する

選択肢が多い場合はoptgroupでグループ化します。

```html
<!-- ✓ Good -->
<ha-select name="product">
  <option value="">選択してください</option>
  <optgroup label="電化製品">
    <option value="pc">パソコン</option>
    <option value="smartphone">スマートフォン</option>
  </optgroup>
  <optgroup label="家具">
    <option value="desk">デスク</option>
    <option value="chair">チェア</option>
  </optgroup>
</ha-select>
```

**理由**: 選択肢が視覚的に整理され、目的の項目を見つけやすくなります。スクリーンリーダーユーザーにもグループ情報が伝わります。

#### 3. 適切なvalue属性を設定する

意味のある値（IDやコード）を設定します。

```html
<!-- ✓ Good -->
<ha-select name="country">
  <option value="">選択してください</option>
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
  <option value="uk">イギリス</option>
</ha-select>

<!-- ✗ Bad: value属性なし（テキストが値になる） -->
<ha-select name="country">
  <option>選択してください</option>
  <option>日本</option>
  <option>アメリカ</option>
</ha-select>
```

**理由**: value属性がない場合、表示テキストが値になり、翻訳やテキスト変更時に問題が発生します。

#### 4. Form Groupを使用する

ラベルとエラーメッセージを適切に関連付けます。

```html
<!-- ✓ Good -->
<ha-form-group
  label="国を選択"
  required
  helper-text="居住国を選んでください"
  error="国を選択してください"
>
  <ha-select name="country" required>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </ha-select>
</ha-form-group>
```

**理由**: アクセシビリティが向上し、ユーザーがフィールドの目的とエラーを理解しやすくなります。

#### 5. name属性を設定する

フォーム送信時に値を取得できるようにします。

```html
<!-- ✓ Good -->
<form>
  <ha-select name="country">
    <option value="jp">日本</option>
  </ha-select>
  <ha-button type="submit">送信</ha-button>
</form>
```

**理由**: name属性がないと、フォーム送信時に値が含まれません。

#### 6. 選択肢の数を適切に保つ

7〜10個以内の選択肢に収めます。

```html
<!-- ✓ Good: 適切な数の選択肢 -->
<ha-select name="priority">
  <option value="">優先度を選択</option>
  <option value="low">低</option>
  <option value="medium">中</option>
  <option value="high">高</option>
  <option value="urgent">緊急</option>
</ha-select>
```

**理由**: 選択肢が多すぎると、ユーザーが目的の項目を見つけにくくなります。

### Don'ts ✗

#### 1. 選択肢が多すぎる

10個以上の場合は検索機能付きのカスタムコンポーネントを検討します。

```html
<!-- ✗ Bad: 選択肢が多すぎる -->
<ha-select name="country">
  <option value="">選択してください</option>
  <!-- 195カ国の選択肢... -->
</ha-select>
```

**代替案**: オートコンプリート付きのInput、カスタムドロップダウン、または複数ステップのフォームを検討してください。

#### 2. optionにvalue属性がない

ブラウザのデフォルト動作（テキストが値になる）は避けます。

```html
<!-- ✗ Bad -->
<ha-select name="status">
  <option>処理中</option>
  <option>完了</option>
</ha-select>

<!-- ✓ Good -->
<ha-select name="status">
  <option value="">選択してください</option>
  <option value="processing">処理中</option>
  <option value="completed">完了</option>
</ha-select>
```

**理由**: 表示テキストが変更された場合、システムが壊れる可能性があります。

#### 3. ラベルなし

アクセシビリティのため必ずラベルを設定します。

```html
<!-- ✗ Bad -->
<ha-select name="country">
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</ha-select>

<!-- ✓ Good -->
<ha-form-group label="国を選択">
  <ha-select name="country">
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </ha-select>
</ha-form-group>
```

**理由**: スクリーンリーダーユーザーがフィールドの目的を理解できません。

#### 4. 複数選択の濫用

UXが悪いため、Checkboxグループを検討します。

```html
<!-- ✗ Bad: multipleは使いづらい -->
<ha-select multiple name="skills" size="5">
  <option value="js">JavaScript</option>
  <option value="ts">TypeScript</option>
  <option value="react">React</option>
  <option value="vue">Vue</option>
</ha-select>

<!-- ✓ Good: Checkboxグループを使用 -->
<ha-form-group label="スキル">
  <ha-checkbox name="skills" value="js">JavaScript</ha-checkbox>
  <ha-checkbox name="skills" value="ts">TypeScript</ha-checkbox>
  <ha-checkbox name="skills" value="react">React</ha-checkbox>
  <ha-checkbox name="skills" value="vue">Vue</ha-checkbox>
</ha-form-group>
```

**理由**: 複数選択のSelectは、特にモバイルで使いづらく、選択状態が分かりにくいです。

#### 5. デフォルト選択が不明瞭

デフォルト選択がある場合は`selected`属性を明示します。

```html
<!-- ✗ Bad: デフォルト選択が不明 -->
<ha-select name="country">
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
</ha-select>

<!-- ✓ Good: デフォルト選択を明示 -->
<ha-select name="country">
  <option value="">選択してください</option>
  <option value="jp" selected>日本</option>
  <option value="us">アメリカ</option>
</ha-select>
```

**理由**: ユーザーが意図せずデフォルト値を送信する可能性があります。

## よくある質問

### プログラムで選択値を変更するには？

React/Vueでは状態を更新するだけで自動的に反映されます：

```tsx
// React
const [value, setValue] = useState('');
setValue('jp'); // プログラムで値を変更

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
</Select>
```

```vue
<!-- Vue -->
<script setup>
const country = ref('');
country.value = 'jp'; // プログラムで値を変更
</script>

<template>
  <HaSelect v-model="country">
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </HaSelect>
</template>
```

### 動的にoptionを追加/削除するには？

配列をマッピングしてoptionを生成：

```tsx
// React
const countries = [
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
];

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="">選択してください</option>
  {countries.map(country => (
    <option key={country.value} value={country.value}>
      {country.label}
    </option>
  ))}
</Select>
```

```vue
<!-- Vue -->
<script setup>
const countries = [
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
];
</script>

<template>
  <HaSelect v-model="country">
    <option value="">選択してください</option>
    <option
      v-for="c in countries"
      :key="c.value"
      :value="c.value"
    >
      {{ c.label }}
    </option>
  </HaSelect>
</template>
```

### 複数選択の値を取得するには？

`multiple` 属性を使用した場合、選択値は配列になります：

```tsx
// React
const [selectedItems, setSelectedItems] = useState<string[]>([]);

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const options = Array.from(e.target.selectedOptions);
  const values = options.map(option => option.value);
  setSelectedItems(values);
};

<Select multiple value={selectedItems} onChange={handleChange}>
  <option value="design">デザイン</option>
  <option value="dev">開発</option>
  <option value="marketing">マーケティング</option>
</Select>
```

### デフォルト値を設定するには？

`selected` 属性またはコンポーネントの初期状態で設定：

```html
<!-- HTML: selected属性 -->
<ha-select>
  <option value="">選択してください</option>
  <option value="jp" selected>日本</option>
  <option value="us">アメリカ</option>
</ha-select>
```

```tsx
// React: 初期状態で設定
const [country, setCountry] = useState('jp'); // デフォルト値

<Select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
</Select>
```

### APIからoptionを動的に読み込むには？

APIレスポンスをマッピングしてoptionを生成します：

```tsx
// React
import { useState, useEffect } from 'react';

function CountrySelect() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Select disabled><option>読み込み中...</option></Select>;
  }

  return (
    <Select
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      fullWidth
    >
      <option value="">選択してください</option>
      {countries.map(country => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </Select>
  );
}
```

```vue
<!-- Vue -->
<template>
  <HaSelect v-model="selectedCountry" full-width :disabled="loading">
    <option value="">{{ loading ? '読み込み中...' : '選択してください' }}</option>
    <option
      v-for="country in countries"
      :key="country.code"
      :value="country.code"
    >
      {{ country.name }}
    </option>
  </HaSelect>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const countries = ref([]);
const selectedCountry = ref('');
const loading = ref(true);

onMounted(async () => {
  const response = await fetch('/api/countries');
  countries.value = await response.json();
  loading.value = false;
});
</script>
```

### 選択値に応じて他のフィールドを表示/非表示にするには？

条件付きレンダリングを使用します：

```tsx
// React
function ShippingForm() {
  const [country, setCountry] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');

  return (
    <Stack gap="4">
      <FormGroup label="配送先の国" required>
        <Select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
        >
          <option value="">選択してください</option>
          <option value="jp">日本</option>
          <option value="us">アメリカ</option>
          <option value="other">その他</option>
        </Select>
      </FormGroup>

      {/* 日本を選択した場合のみ表示 */}
      {country === 'jp' && (
        <FormGroup label="配送方法" required>
          <Select
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            fullWidth
          >
            <option value="">選択してください</option>
            <option value="standard">通常配送（3-5日）</option>
            <option value="express">速達（1-2日）</option>
          </Select>
        </FormGroup>
      )}

      {/* その他を選択した場合のみ表示 */}
      {country === 'other' && (
        <FormGroup label="国名を入力" required>
          <Input placeholder="国名" fullWidth />
        </FormGroup>
      )}
    </Stack>
  );
}
```

```vue
<!-- Vue -->
<template>
  <HaStack gap="4">
    <HaFormGroup label="配送先の国" required>
      <HaSelect v-model="country" full-width>
        <option value="">選択してください</option>
        <option value="jp">日本</option>
        <option value="us">アメリカ</option>
        <option value="other">その他</option>
      </HaSelect>
    </HaFormGroup>

    <!-- 日本を選択した場合のみ表示 -->
    <HaFormGroup v-if="country === 'jp'" label="配送方法" required>
      <HaSelect v-model="shippingMethod" full-width>
        <option value="">選択してください</option>
        <option value="standard">通常配送（3-5日）</option>
        <option value="express">速達（1-2日）</option>
      </HaSelect>
    </HaFormGroup>

    <!-- その他を選択した場合のみ表示 -->
    <HaFormGroup v-if="country === 'other'" label="国名を入力" required>
      <HaInput placeholder="国名" full-width />
    </HaFormGroup>
  </HaStack>
</template>

<script setup>
import { ref } from 'vue';

const country = ref('');
const shippingMethod = ref('');
</script>
```

### 選択値をリセットするには？

状態を空文字列に設定してリセットします：

```tsx
// React
function FilterForm() {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const resetFilters = () => {
    setCategory('');
    setStatus('');
  };

  return (
    <Stack gap="4">
      <FormGroup label="カテゴリ">
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          <option value="">すべて</option>
          <option value="electronics">電化製品</option>
          <option value="furniture">家具</option>
        </Select>
      </FormGroup>

      <FormGroup label="ステータス">
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <option value="">すべて</option>
          <option value="active">有効</option>
          <option value="inactive">無効</option>
        </Select>
      </FormGroup>

      <Button onClick={resetFilters}>フィルターをリセット</Button>
    </Stack>
  );
}
```

```vue
<!-- Vue -->
<template>
  <HaStack gap="4">
    <HaFormGroup label="カテゴリ">
      <HaSelect v-model="category" full-width>
        <option value="">すべて</option>
        <option value="electronics">電化製品</option>
        <option value="furniture">家具</option>
      </HaSelect>
    </HaFormGroup>

    <HaFormGroup label="ステータス">
      <HaSelect v-model="status" full-width>
        <option value="">すべて</option>
        <option value="active">有効</option>
        <option value="inactive">無効</option>
      </HaSelect>
    </HaFormGroup>

    <HaButton @click="resetFilters">フィルターをリセット</HaButton>
  </HaStack>
</template>

<script setup>
import { ref } from 'vue';

const category = ref('');
const status = ref('');

const resetFilters = () => {
  category.value = '';
  status.value = '';
};
</script>
```

## 関連コンポーネント

- [Input](/components/input) - テキスト入力フィールド
- [Checkbox](/components/checkbox) - チェックボックス（複数選択の代替）
- [Radio](/components/radio) - ラジオボタン（単一選択の代替）
- [Form Group](/components/form-group) - ラベルとエラーメッセージの統合
- [Button](/components/button) - フォーム送信ボタン

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { SelectProps } from '@hidearea-design/core';

interface SelectProps {
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
  multiple?: boolean;
}
```

## トラブルシューティング

### 選択値が変更されない

**問題**: Selectをクリックしても値が更新されない

**解決策**:
Reactの場合、`onChange`イベントハンドラが必要です：

```tsx
// ✓ Good
const [value, setValue] = useState('');
<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="1">オプション1</option>
</Select>

// ✗ Bad: onChange がない
<Select value={value}>
  <option value="1">オプション1</option>
</Select>
```

Vueの場合、`v-model`を使用：

```vue
<!-- ✓ Good -->
<HaSelect v-model="value">
  <option value="1">オプション1</option>
</HaSelect>

<!-- ✗ Bad: v-model がない -->
<HaSelect :value="value">
  <option value="1">オプション1</option>
</HaSelect>
```

### フォーム送信時に値が取得できない

**問題**: フォーム送信時にSelectの値が含まれない

**解決策**:
`name`属性を設定：

```html
<!-- ✓ Good -->
<form @submit="handleSubmit">
  <ha-select name="country">
    <option value="jp">日本</option>
  </ha-select>
  <ha-button type="submit">送信</ha-button>
</form>

<!-- ✗ Bad: name がない -->
<ha-select>
  <option value="jp">日本</option>
</ha-select>
```

### 選択肢が表示されない/見切れる

**問題**: ドロップダウンが画面外に表示される、または見切れる

**解決策**:
1. 親要素の`overflow: hidden`を確認
2. z-indexが低くないか確認
3. ページ下部の場合、上方向に展開されるか確認

```css
/* 親要素のoverflowを調整 */
.form-container {
  overflow: visible; /* hidden → visible */
}

/* z-indexを調整 */
ha-select {
  z-index: 100;
}
```

### 複数選択で全選択/全解除を実装するには？

**問題**: multipleモードで全選択/全解除ボタンを追加したい

**解決策**:

```tsx
const [selected, setSelected] = useState<string[]>([]);
const allValues = ['design', 'dev', 'marketing', 'sales'];

const selectAll = () => setSelected(allValues);
const deselectAll = () => setSelected([]);

<div>
  <Stack direction="horizontal" gap="2">
    <Button size="sm" onClick={selectAll}>全選択</Button>
    <Button size="sm" onClick={deselectAll}>全解除</Button>
  </Stack>
  <Select
    multiple
    value={selected}
    onChange={(e) => {
      const values = Array.from(e.target.selectedOptions).map(o => o.value);
      setSelected(values);
    }}
  >
    <option value="design">デザイン</option>
    <option value="dev">開発</option>
    <option value="marketing">マーケティング</option>
    <option value="sales">営業</option>
  </Select>
</div>
```
