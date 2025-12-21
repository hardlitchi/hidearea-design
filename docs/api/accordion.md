# Accordion（アコーディオン）

> 折りたたみ可能なコンテンツセクション用のアコーディオンコンポーネント

**タグ**: `<ha-accordion>`

**カテゴリ**: データ表示

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
| `multiple` | `boolean` | `false` |  | 複数のパネルを同時に開くことを許可 |
| `collapsible` | `boolean` | `true` |  | パネルを折りたたむことを許可 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-change` | `{ openPanels: string[] }` | パネルの開閉時に発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-accordion');
element.addEventListener('ha-change', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | アコーディオンパネル |

## 使用例

### 基本的な使い方

シンプルなアコーディオン

```html
<ha-accordion>
  <ha-accordion-panel value="panel1" title="セクション 1">
    <p>セクション 1 のコンテンツ</p>
  </ha-accordion-panel>
  <ha-accordion-panel value="panel2" title="セクション 2">
    <p>セクション 2 のコンテンツ</p>
  </ha-accordion-panel>
</ha-accordion>
```

---

### 複数パネルを開く

複数のパネルを同時に開く設定

```html
<ha-accordion multiple>
  <ha-accordion-panel value="a" title="パネル A">コンテンツ A</ha-accordion-panel>
  <ha-accordion-panel value="b" title="パネル B">コンテンツ B</ha-accordion-panel>
</ha-accordion>
```

## アクセシビリティ

### ARIAロール

- `region`

### キーボードサポート

| キー | 動作 |
|-----|--------|
| `Enter/Space` | パネルの開閉を切り替え |
| `矢印キー` | パネル間を移動 |

### ARIA属性

- `aria-expanded`
- `aria-controls`
- `aria-labelledby`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-accordion-header-background`
- `--component-accordion-border`

### スペーシング

- `--spacing-md`

### タイポグラフィ

- `--text-body-default-fontSize`
- `--font-weight-medium`

### その他

- `--border-radius-md`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
