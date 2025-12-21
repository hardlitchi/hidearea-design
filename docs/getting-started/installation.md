# インストール

## 必要要件

- Node.js 18.x 以上
- npm, yarn, または pnpm パッケージマネージャー

## インストール方法

### npm を使用

```bash
# コア Web Components をインストール
npm install @hidearea-design/core

# React ラッパーをインストール
npm install @hidearea-design/react

# Vue ラッパーをインストール
npm install @hidearea-design/vue

# デザイントークンをインストール
npm install @hidearea-design/tokens
```

### pnpm を使用

```bash
pnpm add @hidearea-design/core
pnpm add @hidearea-design/react
pnpm add @hidearea-design/vue
pnpm add @hidearea-design/tokens
```

### yarn を使用

```bash
yarn add @hidearea-design/core
yarn add @hidearea-design/react
yarn add @hidearea-design/vue
yarn add @hidearea-design/tokens
```

## パッケージ概要

### @hidearea-design/core

コア Web Components パッケージです。任意の JavaScript フレームワークまたはバニラ JS で動作します。

**機能:**

- フレームワーク非依存の Web Components
- Shadow DOM カプセル化
- CSS カスタムプロパティによるカスタマイズ可能
- 完全な TypeScript サポート
- デフォルトでアクセシブル（WCAG AA 準拠）

### @hidearea-design/react

完全な TypeScript サポート付きの React ラッパーコンポーネントです。

**機能:**

- ネイティブな React コンポーネント API
- Forward refs サポート
- 完全な TypeScript 定義
- React 18+ 互換

### @hidearea-design/vue

Composition API サポート付きの Vue 3 ラッパーコンポーネントです。

**機能:**

- Vue 3 Composition API
- v-model サポート
- 完全な TypeScript 定義
- テンプレート型チェック

### @hidearea-design/tokens

色、スペーシング、タイポグラフィなどのデザイントークンです。

**機能:**

- CSS カスタムプロパティ
- JavaScript/TypeScript エクスポート
- Style Dictionary ベース
- 一貫したデザイン言語

## クイックスタート

### バニラ JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="node_modules/@hidearea-design/tokens/dist/tokens.css"
    />
  </head>
  <body>
    <ha-button variant="primary">クリックしてください</ha-button>

    <script type="module">
      import "@hidearea-design/core";

      const button = document.querySelector("ha-button");
      button.addEventListener("click", () => {
        console.log("ボタンがクリックされました！");
      });
    </script>
  </body>
</html>
```

### React

```tsx
import "@hidearea-design/tokens/dist/tokens.css";
import { Button } from "@hidearea-design/react";

function App() {
  return (
    <Button variant="primary" onClick={() => console.log("クリックされました！")}>
      クリックしてください
    </Button>
  );
}

export default App;
```

### Vue 3

```vue
<template>
  <HaButton variant="primary" @click="handleClick"> クリックしてください </HaButton>
</template>

<script setup lang="ts">
import "@hidearea-design/tokens/dist/tokens.css";
import { HaButton } from "@hidearea-design/vue";

const handleClick = () => {
  console.log("クリックされました！");
};
</script>
```

## CSS セットアップ

アプリケーションにデザイントークンの CSS をインポートします：

```js
// メインエントリーファイルで
import "@hidearea-design/tokens/dist/tokens.css";
```

または HTML でリンクします：

```html
<link rel="stylesheet" href="path/to/@hidearea-design/tokens/dist/tokens.css" />
```

## TypeScript 設定

TypeScript を使用する場合、`tsconfig.json` に以下を含めてください：

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "types": [
      "@hidearea-design/core",
      "@hidearea-design/react",
      "@hidearea-design/vue"
    ]
  }
}
```

## 次のステップ

- [コンポーネント API リファレンス](../api/README.md)
- [使用例](../guides/examples.md)
- [デザイントークン](../guides/design-tokens.md)
- [アクセシビリティガイド](../guides/accessibility-guide.md)
