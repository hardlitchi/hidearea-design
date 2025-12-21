# Skeleton（スケルトン）

> 読み込み中にプレースホルダーコンテンツを表示するスケルトンローダーコンポーネント

**タグ**: `<ha-skeleton>`

**カテゴリー**: フィードバック

## 目次

- [プロパティ](#プロパティ)
- [イベント](#イベント)
- [スロット](#スロット)
- [使用例](#使用例)
- [アクセシビリティ](#アクセシビリティ)
- [デザイントークン](#デザイントークン)

---

## プロパティ

| 名前 | 型 | デフォルト | 必須 | 説明 |
|------|------|---------|----------|-------------|
| `variant` | `'text' | 'circular' | 'rectangular'` | `'text'` |  | スケルトンの形状 |
| `width` | `string | number` | `undefined` |  | スケルトンの幅 |
| `height` | `string | number` | `undefined` |  | スケルトンの高さ |
| `animated` | `boolean` | `true` |  | アニメーションパルスエフェクト |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

このコンポーネントにはスロットがありません。

## 使用例

### テキストスケルトン

テキスト用の読み込みスケルトン

```html
<ha-skeleton variant="text"></ha-skeleton>
<ha-skeleton variant="text" width="80%"></ha-skeleton>
<ha-skeleton variant="text" width="60%"></ha-skeleton>
```

---

### 円形スケルトン

アバター用の読み込みスケルトン

```html
<ha-skeleton variant="circular" width="48px" height="48px"></ha-skeleton>
```

---

### 矩形スケルトン

画像/カード用の読み込みスケルトン

```html
<ha-skeleton variant="rectangular" width="100%" height="200px"></ha-skeleton>
```

## アクセシビリティ

### ARIAロール

- `status`

### キーボードサポート

標準的なキーボードナビゲーション。

### ARIA属性

- `aria-busy`
- `aria-live`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-skeleton-background`
- `--component-skeleton-highlight`

### その他

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
