# Button（ボタン）

> 複数のバリアントとサイズをサポートするカスタマイズ可能なボタンコンポーネント

**タグ**: `<ha-button>`

**カテゴリ**: フォームコントロール

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
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'` | `'primary'` |  | ボタンのスタイルバリアント |
| `size` | `'small' | 'medium' | 'large'` | `'medium'` |  | ボタンのサイズ |
| `disabled` | `boolean` | `false` |  | ボタンを無効化 |
| `loading` | `boolean` | `false` |  | ローディング状態を表示 |
| `fullWidth` | `boolean` | `false` |  | ボタンを全幅に |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-click` | `{ originalEvent: MouseEvent }` | ボタンがクリックされたときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-button');
element.addEventListener('ha-click', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | ボタンのコンテンツ |
| `prefix` | ボタンテキストの前に表示するコンテンツ（アイコンなど） |
| `suffix` | ボタンテキストの後に表示するコンテンツ |

## 使用例

### 基本的な使い方

シンプルなテキストボタン

```html
<ha-button>クリック</ha-button>
```

---

### バリアント指定

異なるボタンスタイル

```html
<ha-button variant="primary">プライマリ</ha-button>
<ha-button variant="secondary">セカンダリ</ha-button>
<ha-button variant="outline">アウトライン</ha-button>
```

---

### アイコン付き

アイコンプレフィックス付きボタン

```html
<ha-button>
  <svg slot="prefix" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0L10 6H16L11 10L13 16L8 12L3 16L5 10L0 6H6L8 0Z"/>
  </svg>
  スター
</ha-button>
```

---

### ローディング状態

ローディングインジケーター付きボタン

```html
<ha-button loading>読み込み中...</ha-button>
```

---

### 無効状態

無効化されたボタン

```html
<ha-button disabled>無効</ha-button>
```

## アクセシビリティ

### ARIAロール

- `button`

### キーボードサポート

| キー | 動作 |
|-----|--------|
| `Enter` | ボタンを有効化 |
| `Space` | ボタンを有効化 |

### ARIA属性

- `aria-disabled`
- `aria-pressed`（トグルボタンの場合）
- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-button-primary-background-default`
- `--component-button-primary-text-default`
- `--component-button-primary-border-default`

### スペーシング

- `--spacing-sm`
- `--spacing-md`
- `--spacing-lg`

### タイポグラフィ

- `--text-body-default-fontSize`
- `--font-weight-medium`

### その他

- `--border-radius-md`
- `--interaction-transition-fast-duration`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
