# Component Tokens

このディレクトリには、UIコンポーネント固有のデザイントークンを配置します。

## 構造

各コンポーネントは独立したYAMLファイルとして定義されます：

```
src/components/
├── button.yaml          # ボタンコンポーネント
├── input.yaml           # フォーム入力コンポーネント
├── card.yaml            # カードコンポーネント
├── modal.yaml           # モーダル/ダイアログ
├── navigation.yaml      # ナビゲーション
├── table.yaml           # テーブル
├── badge.yaml           # バッジ
├── alert.yaml           # アラート/通知
└── tooltip.yaml         # ツールチップ
```

## 命名規則

```yaml
component:
  {component-name}:
    {variant}:
      {property}:
        {state}:
          value: "{token-reference}"
          comment: "説明文"
```

### 例：ボタンコンポーネント

```yaml
component:
  button:
    primary:
      background:
        default:
          value: "{color.action.primary}"
          comment: "デフォルト背景色"
        hover:
          value: "{color.primary.600}"
          comment: "ホバー時背景色"
```

## 設計原則

### 1. セマンティックトークンへの参照

コンポーネントトークンは、可能な限りセマンティックレイヤーのトークンを参照します：

- ✅ `{color.action.primary}` - セマンティックトークン
- ✅ `{spacing.md}` - セマンティックトークン
- ⚠️ `{color.primary.500}` - 基本トークン（必要な場合のみ）
- ❌ `#3b82f6` - リテラル値（避ける）

### 2. バリアントの定義

各コンポーネントは複数のバリアントを持つことができます：

- **button**: primary, secondary, outline, ghost, destructive
- **input**: text, textarea, select, checkbox, radio, toggle
- **badge**: primary, success, warning, error, info, neutral

### 3. 状態の定義

インタラクティブな要素には状態を定義します：

- **default**: デフォルト状態
- **hover**: ホバー時
- **active**: 押下時
- **focus**: フォーカス時
- **disabled**: 無効時
- **readonly**: 読み取り専用（入力要素）
- **checked**: チェック済み（チェックボックス、ラジオ）

### 4. プロパティの分類

各バリアント/状態には以下のプロパティを定義できます：

#### 色関連
- `background`: 背景色
- `text`: テキスト色
- `border`: ボーダー色
- `icon`: アイコン色

#### スペース関連
- `padding.horizontal`: 横方向パディング
- `padding.vertical`: 縦方向パディング
- `margin`: マージン
- `gap`: 間隔

#### タイポグラフィ関連
- `fontSize`: フォントサイズ
- `fontWeight`: フォントウェイト
- `lineHeight`: 行高

#### ボーダー関連
- `borderRadius`: 角丸
- `borderWidth`: ボーダー幅

#### サイズ関連
- `minHeight`: 最小高さ
- `minWidth`: 最小幅
- `size`: サイズ（正方形要素）

## 移行計画

現在、既存のコンポーネントトークンは `src/semantic/components.yaml` に定義されています。
以下の順序で段階的に移行します：

1. **Phase 3.1**: ディレクトリ構造の準備（このPR）
2. **Phase 3.2**: Button & Input コンポーネント移行
3. **Phase 3.3**: Card, Modal, Tooltip コンポーネント移行
4. **Phase 3.4**: Navigation, Table コンポーネント移行
5. **Phase 3.5**: Badge, Alert コンポーネント移行
6. **Phase 3.6**: 既存の semantic/components.yaml 削除

## 使用例

### ボタンコンポーネントの実装

```tsx
import { tokens } from '@hidearea-design/tokens';

const Button = styled.button`
  /* Primary variant */
  background-color: var(--component-button-primary-background-default);
  color: var(--component-button-primary-text-default);
  padding: var(--component-button-primary-padding-vertical)
           var(--component-button-primary-padding-horizontal);
  border-radius: var(--component-button-primary-border-radius);
  font-size: var(--component-button-primary-font-size);
  font-weight: var(--component-button-primary-font-weight);
  min-height: var(--component-button-primary-min-height);

  /* Hover state */
  &:hover {
    background-color: var(--component-button-primary-background-hover);
  }

  /* Active state */
  &:active {
    background-color: var(--component-button-primary-background-active);
    transform: scale(var(--component-button-state-scale-pressed));
  }

  /* Disabled state */
  &:disabled {
    background-color: var(--component-button-primary-background-disabled);
    color: var(--component-button-primary-text-disabled);
    cursor: var(--component-button-state-cursor-disabled);
    opacity: var(--component-button-state-opacity-disabled);
  }

  /* Transition */
  transition: all var(--component-button-state-transition);
`;
```

## 参照

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Design Tokens W3C Specification](https://design-tokens.github.io/community-group/format/)
- [Hidearea Design System](https://github.com/hardlitchi/hidearea-design)
