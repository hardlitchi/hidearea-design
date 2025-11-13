# Buttonコンポーネント実装 - 完了

## 概要

最初のコンポーネントとしてButtonを実装しました。Web Component + React + Vue 3の3つのフレームワークをサポートしています。

**完了日時**: 2025-11-13

---

## 実装内容

### 1. Web Component (`@hidearea-design/core`)

#### ファイル構成

```
packages/core/src/
├── components/
│   └── button/
│       ├── button.ts          # ボタンコンポーネント本体
│       ├── button.styles.ts   # スタイル定義
│       └── index.ts           # エクスポート
├── styles/
│   └── base.ts                # ベーススタイル
└── index.ts                   # パッケージエントリポイント
```

#### 機能

- **Custom Element**: `<ha-button>`
- **Shadow DOM**: スタイルのカプセル化
- **Attributes/Properties**:
  - `variant`: primary, secondary, outline, ghost, danger
  - `size`: sm, md, lg
  - `disabled`: 無効化状態
  - `loading`: ローディング状態（スピナー表示）
  - `full-width`: 全幅表示
  - `type`: button, submit, reset

- **アクセシビリティ**:
  - ARIA属性（`aria-disabled`, `aria-busy`）
  - キーボードフォーカス管理
  - フォーカス表示（`focus-visible`）

- **スタイル**:
  - デザイントークンを使用
  - CSS Custom Properties対応
  - トランジションアニメーション
  - ホバー・アクティブ状態

---

### 2. React ラッパー (`@hidearea-design/react`)

#### ファイル構成

```
packages/react/src/
├── Button.tsx     # Reactコンポーネント
└── index.ts       # エクスポート
```

#### 機能

- **forwardRef**: ref による focus/blur 制御
- **TypeScript**: 完全な型定義
- **Props**: Web Component の属性をReactのpropsとして提供
- **JSX サポート**: `ha-button` のTypeScript型定義

#### 使用例

```tsx
import { Button } from '@hidearea-design/react';

function App() {
  return (
    <Button
      variant="primary"
      size="md"
      onClick={() => console.log('clicked')}
    >
      Click me
    </Button>
  );
}
```

---

### 3. Vue ラッパー (`@hidearea-design/vue`)

#### ファイル構成

```
packages/vue/src/
├── Button.vue     # Vueコンポーネント
└── index.ts       # エクスポート + プラグイン
```

#### 機能

- **Composition API**: Vue 3の最新API使用
- **TypeScript**: 完全な型定義
- **Props**: Web Component の属性をVueのpropsとして提供
- **defineExpose**: focus/blur メソッドの公開
- **Vue Plugin**: アプリ全体へのインストール機能

#### 使用例

```vue
<template>
  <Button
    variant="primary"
    size="md"
    @click="handleClick"
  >
    Click me
  </Button>
</template>

<script setup>
import { Button } from '@hidearea-design/vue';

const handleClick = () => {
  console.log('clicked');
};
</script>
```

---

## ビルド設定

### Vite設定

各パッケージに `vite.config.ts` を作成：

- **core**: UMD + ESM ビルド
- **react**: UMD + ESM ビルド、React外部化
- **vue**: UMD + ESM ビルド、Vue外部化

### TypeScript設定

各パッケージに `tsconfig.json` を作成：

- ルートの `tsconfig.json` を継承
- 型定義ファイル（`.d.ts`）の生成
- 宣言マップ（`.d.ts.map`）の生成

---

## ビルド出力

### @hidearea-design/core

```
dist/
├── index.es.js      (8.04 KB)
├── index.umd.js     (7.80 KB)
├── index.d.ts       (型定義)
└── *.map            (ソースマップ)
```

---

## スタイルの特徴

### デザイントークンの使用

全てのスタイルはデザイントークンを参照：

```css
background-color: var(--theme-light-primary-default, #3b82f6);
padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
border-radius: var(--border-radius-md, 0.375rem);
font-size: var(--font-size-base, 1rem);
transition: background-color var(--animation-duration-base, 200ms);
```

### バリアント

- **Primary**: プライマリカラー、白テキスト
- **Secondary**: セカンダリカラー、白テキスト
- **Outline**: 透明背景、ボーダーあり
- **Ghost**: 透明背景、ボーダーなし
- **Danger**: エラーカラー、白テキスト

### サイズ

- **Small**: 32px高さ、小さいパディング
- **Medium**: 40px高さ、標準パディング（デフォルト）
- **Large**: 48px高さ、大きいパディング

### 状態

- **Hover**: 明るい/暗い色に変化
- **Active**: さらに明るい/暗い色 + スケール縮小（98%）
- **Disabled**: 不透明度50%、カーソル変更
- **Loading**: スピナー表示、ポインターイベント無効

---

## 使用可能なAPI

### Web Component

```javascript
// 属性
<ha-button variant="primary" size="md" disabled loading full-width>

// プロパティ
button.variant = 'secondary';
button.disabled = true;

// メソッド
button.focus();
button.blur();

// イベント
button.addEventListener('click', handler);
```

### React

```tsx
<Button
  variant="primary"
  size="md"
  disabled={false}
  loading={false}
  fullWidth={false}
  type="button"
  onClick={handler}
  ref={buttonRef}
/>

// refを使用
buttonRef.current?.focus();
```

### Vue

```vue
<Button
  variant="primary"
  size="md"
  :disabled="false"
  :loading="false"
  :full-width="false"
  type="button"
  @click="handler"
  ref="buttonRef"
/>

// refを使用
buttonRef.value.focus();
```

---

## テストとデモ

### 今後の実装予定

- ✅ Web Component実装
- ✅ Reactラッパー実装
- ✅ Vueラッパー実装
- ✅ ビルド設定
- ⬜ ユニットテスト（Vitest）
- ⬜ E2Eテスト（Playwright）
- ⬜ Storybookデモ
- ⬜ ドキュメントサイト

---

## 技術的な詳細

### Custom Elements定義

```typescript
export class HaButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading', 'full-width', 'type'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    // ...
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this.updateButtonAttributes();
  }
}

customElements.define('ha-button', HaButton);
```

### Reactラッパーの実装パターン

```tsx
export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const elementRef = useRef<HaButtonElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current?.focus(),
    blur: () => elementRef.current?.blur(),
  }));

  useEffect(() => {
    // プロパティの同期
    element.variant = variant;
    // ...
  }, [variant, /* ... */]);

  return <ha-button ref={elementRef} {...props}>{children}</ha-button>;
});
```

### Vueラッパーの実装パターン

```vue
<script setup lang="ts">
const elementRef = ref<HaButtonElement | null>(null);

onMounted(() => {
  // プロパティの同期
  element.variant = props.variant;
  // ...
});

defineExpose({
  focus: () => elementRef.value?.focus(),
  blur: () => elementRef.value?.blur(),
});
</script>
```

---

## パッケージ間の依存関係

```
@hidearea-design/core
  └── @hidearea-design/tokens

@hidearea-design/react
  ├── @hidearea-design/core
  └── react, react-dom (peer)

@hidearea-design/vue
  ├── @hidearea-design/core
  └── vue (peer)
```

---

## 次のステップ

### フェーズ3: 追加コンポーネント

1. **Input** - テキスト入力
2. **Checkbox** - チェックボックス
3. **Radio** - ラジオボタン
4. **Select** - セレクトボックス

### フェーズ4: 開発環境整備

1. **Storybook設定** - コンポーネントカタログ
2. **Vitest設定** - ユニットテスト
3. **Playwright設定** - E2Eテスト
4. **VitePress設定** - ドキュメントサイト

### フェーズ5: CI/CD

1. **GitHub Actions** - 自動テスト・ビルド
2. **Changesets** - バージョン管理
3. **NPM公開** - パッケージ公開

---

## まとめ

最初のコンポーネントとしてButtonを完全実装しました：

**実装内容**:
- Web Component（Shadow DOM、Custom Element）
- Reactラッパー（forwardRef、TypeScript）
- Vueラッパー（Composition API、TypeScript）
- デザイントークン統合
- アクセシビリティ対応
- ビルド設定（Vite、TypeScript）

**成果物**:
- `@hidearea-design/core` パッケージ
- `@hidearea-design/react` パッケージ
- `@hidearea-design/vue` パッケージ

これでマルチフレームワーク対応のデザインシステムの基盤が完成しました！

---

**作成日時**: 2025-11-13
