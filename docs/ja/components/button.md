# Button（ボタン）

複数のバリエーションと状態を持つ汎用的なボタンコンポーネント。

## インポート

```js
// Web Component
import "@hidearea-design/core";

// React
import { Button } from "@hidearea-design/react";

// Vue
import { HaButton } from "@hidearea-design/vue";
```

## 基本的な使い方

### Vanilla JavaScript

```html
<ha-button variant="primary">クリック</ha-button>
```

### React

```tsx
<Button variant="primary">クリック</Button>
```

### Vue

```vue
<HaButton variant="primary">クリック</HaButton>
```

## バリエーション

ボタンコンポーネントは5つの視覚的バリエーションをサポートします：

```html
<ha-button variant="primary">プライマリー</ha-button>
<ha-button variant="secondary">セカンダリー</ha-button>
<ha-button variant="outline">アウトライン</ha-button>
<ha-button variant="ghost">ゴースト</ha-button>
<ha-button variant="danger">危険</ha-button>
```

## サイズ

3つのサイズオプションが利用可能です：

```html
<ha-button size="sm">小</ha-button>
<ha-button size="md">中</ha-button>
<ha-button size="lg">大</ha-button>
```

## 状態

### 無効化

```html
<ha-button disabled>無効</ha-button>
```

### ローディング

```html
<ha-button loading>読み込み中...</ha-button>
```

### フル幅

```html
<ha-button full-width>フル幅ボタン</ha-button>
```

## ボタンタイプ

```html
<ha-button type="button">ボタン</ha-button>
<ha-button type="submit">送信</ha-button>
<ha-button type="reset">リセット</ha-button>
```

## イベント

### クリックイベント

```js
// Vanilla JS
const button = document.querySelector('ha-button');
button.addEventListener('click', (event) => {
  console.log('ボタンがクリックされました', event.detail);
});

// React
<Button onClick={(event) => console.log('クリック')}>
  クリック
</Button>

// Vue
<HaButton @click="handleClick">クリック</HaButton>
```

## API リファレンス

### プロパティ

| プロパティ  | 型                                                             | デフォルト  | 説明                           |
| ----------- | -------------------------------------------------------------- | ----------- | ------------------------------ |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | 視覚的スタイルのバリエーション |
| `size`      | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | ボタンサイズ                   |
| `disabled`  | `boolean`                                                      | `false`     | 無効状態                       |
| `loading`   | `boolean`                                                      | `false`     | ローディング状態               |
| `fullWidth` | `boolean`                                                      | `false`     | フル幅ボタン                   |
| `type`      | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | ボタンタイプ                   |

### メソッド

| メソッド  | 説明                       |
| --------- | -------------------------- |
| `focus()` | ボタンにフォーカスを当てる |
| `blur()`  | ボタンからフォーカスを外す |

### スロット

| スロット     | 説明         |
| ------------ | ------------ |
| (デフォルト) | ボタンの内容 |

### CSS カスタムプロパティ

| プロパティ                  | デフォルト       | 説明                 |
| --------------------------- | ---------------- | -------------------- |
| `--ha-button-padding-sm`    | `0.5rem 1rem`    | 小ボタンのパディング |
| `--ha-button-padding-md`    | `0.75rem 1.5rem` | 中ボタンのパディング |
| `--ha-button-padding-lg`    | `1rem 2rem`      | 大ボタンのパディング |
| `--ha-button-border-radius` | `0.375rem`       | ボタンの角丸         |
| `--ha-button-transition`    | `all 0.2s ease`  | トランジション効果   |

## 使用例

### アイコン付き

```html
<ha-button variant="primary">
  <svg>...</svg>
  クリック
</ha-button>
```

### フォーム送信ボタン

```html
<form>
  <ha-input name="email" type="email"></ha-input>
  <ha-button type="submit" variant="primary">送信</ha-button>
</form>
```

### ローディング状態

```tsx
// React
const [loading, setLoading] = useState(false);

const handleClick = async () => {
  setLoading(true);
  await someAsyncOperation();
  setLoading(false);
};

<Button loading={loading} onClick={handleClick}>
  変更を保存
</Button>;
```

## アクセシビリティ

- セマンティックな `<button>` 要素を使用
- キーボードナビゲーション対応（Enter と Space キー）
- 適切な ARIA 属性が自動的に適用されます
- 無効時に `aria-disabled` が設定されます
- ローディング時に `aria-busy` が設定されます
- フォーカス管理が組み込まれています

## ベストプラクティス

1. **適切なバリエーションを使用**：主要なアクションにはプライマリー、重要度の低いアクションにはセカンダリーを使用
2. **ローディング状態**：非同期操作中にローディング状態を表示
3. **無効状態**：クリックできないボタンは無効化
4. **ボタンテキスト**：明確でアクション指向のテキストを使用
5. **アイコンの使用**：可読性向上のため、アイコンはテキストの前に配置

## 関連コンポーネント

- [Input](./input.md)
- [Checkbox](./checkbox.md)
