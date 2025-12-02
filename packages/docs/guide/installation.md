# インストール

Hidearea Designのインストール方法を説明します。

## パッケージマネージャーでインストール

### npm

```bash
npm install @hidearea-design/core
```

### pnpm

```bash
pnpm add @hidearea-design/core
```

### yarn

```bash
yarn add @hidearea-design/core
```

## フレームワーク別のインストール

### React

```bash
npm install @hidearea-design/react @hidearea-design/core
```

### Vue

```bash
npm install @hidearea-design/vue @hidearea-design/core
```

## デザイントークンのインストール

CSS変数やJavaScript/TypeScript定数として使用できます：

```bash
npm install @hidearea-design/tokens
```

## CDN経由での使用

CDNから直接読み込むこともできます（開発環境のみ推奨）：

```html
<script type="module">
  import 'https://esm.sh/@hidearea-design/core';
</script>
```

## ソースからのビルド

リポジトリをクローンしてビルド：

```bash
git clone https://github.com/hardlitchi/hidearea-design.git
cd hidearea-design
pnpm install
pnpm build
```

## パッケージ構成

プロジェクトは以下のパッケージで構成されています：

### @hidearea-design/core
Web Componentsの本体。すべてのコンポーネントの実装が含まれます。

**サイズ**: ES 166.20 kB / UMD 146.36 kB

### @hidearea-design/react
React用のラッパーコンポーネント。

**サイズ**: ES 42.52 kB / UMD 28.49 kB

### @hidearea-design/vue
Vue 3用のラッパーコンポーネント。

**サイズ**: ES 33.93 kB / UMD 25.47 kB

### @hidearea-design/tokens
デザイントークン（CSS変数、JavaScript定数）。

### @hidearea-design/storybook
Storybookカタログ（開発用）。

## 必要な環境

- **Node.js**: 18.x 以上
- **ブラウザ**: モダンブラウザ（ES2020サポート）

## TypeScript設定

TypeScriptプロジェクトで使用する場合、`tsconfig.json`で以下を確認してください：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx", // Reactの場合
    "types": ["vite/client"]
  }
}
```

## 次のステップ

インストールが完了したら、[クイックスタート](/guide/getting-started)で使い方を確認してください。
