# Container（コンテナ）

> コンテンツを中央揃えし、幅を制限するためのコンテナコンポーネント

**タグ**: `<ha-container>`

**カテゴリー**: Layout

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
| `maxWidth` | `'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` | `'lg'` |  | コンテナの最大幅 |
| `padding` | `boolean` | `true` |  | 水平方向のパディングを適用 |

## イベント

このコンポーネントはカスタムイベントを発火しません。

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | コンテナのコンテンツ |

## 使用例

### 基本的な使い方

中央揃えコンテナ

```html
<ha-container>
  <p>コンテンツは中央揃えされ、最大幅に制限されます</p>
</ha-container>
```

---

### 異なるサイズ

様々なコンテナサイズ

```html
<ha-container max-width="sm">小さいコンテナ</ha-container>
<ha-container max-width="lg">大きいコンテナ</ha-container>
<ha-container max-width="full">全幅コンテナ</ha-container>
```

## アクセシビリティ

### ARIA ロール

特定のロールは定義されていません。

### キーボードサポート

標準的なキーボードナビゲーション。

### ARIA 属性

特定の ARIA 属性は必要ありません。

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します:

### 間隔

- `--spacing-md`
- `--spacing-lg`

---

**関連ドキュメント**:
- [Migration Guide](../guides/migration-guide.md)
- [Accessibility Guide](../guides/accessibility-guide.md)
- [Component Examples](../guides/examples.md)
