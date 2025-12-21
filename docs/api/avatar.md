# Avatar（アバター）

> プロフィール画像やイニシャルを表示するユーザーアバターコンポーネント

**タグ**: `<ha-avatar>`

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
| `src` | `string` | `undefined` |  | 画像のURL |
| `alt` | `string` | `undefined` |  | 画像の代替テキスト |
| `initials` | `string` | `undefined` |  | 表示するイニシャルテキスト |
| `size` | `'small' | 'medium' | 'large' | 'xlarge'` | `'medium'` |  | アバターのサイズ |
| `shape` | `'circle' | 'square'` | `'circle'` |  | アバターの形状 |

## イベント

| 名前 | 詳細 | 説明 |
|------|--------|-------------|
| `ha-error` | `{ error: Error }` | 画像の読み込みに失敗したときに発火 |

### 使用方法

```javascript
const element = document.querySelector('ha-avatar');
element.addEventListener('ha-error', (event) => {
  console.log(event.detail);
});
```

## スロット

| 名前 | 説明 |
|------|-------------|
| `default` | カスタムアバターコンテンツ（アイコンなど） |

## 使用例

### 画像を使用

画像ソースを指定したアバター

```html
<ha-avatar src="/user.jpg" alt="山田太郎"></ha-avatar>
```

---

### イニシャルを使用

テキストイニシャルを使用したアバター

```html
<ha-avatar initials="山田"></ha-avatar>
```

---

### サイズの種類

様々なアバターサイズ

```html
<ha-avatar size="small" initials="小"></ha-avatar>
<ha-avatar size="medium" initials="中"></ha-avatar>
<ha-avatar size="large" initials="大"></ha-avatar>
```

## アクセシビリティ

### ARIAロール

- `img`

### キーボードサポート

標準的なキーボードナビゲーション

### ARIA属性

- `aria-label`

## デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

### カラー

- `--component-avatar-background`
- `--component-avatar-text`

### タイポグラフィ

- `--text-body-default-fontSize`

### その他

- `--border-radius-full`

---

**関連ドキュメント**:
- [マイグレーションガイド](../guides/migration-guide.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
- [コンポーネント使用例](../guides/examples.md)
