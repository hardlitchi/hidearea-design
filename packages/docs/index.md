---
layout: home

hero:
  name: "Hidearea Design"
  text: "モダンなWebコンポーネントライブラリ"
  tagline: "Vanilla JS、React、Vue.js対応のデザインシステム"
  actions:
    - theme: brand
      text: はじめる
      link: /guide/getting-started
    - theme: alt
      text: コンポーネント一覧
      link: /components/overview

features:
  - icon: 🎨
    title: デザイントークン
    details: 一貫性のあるデザインシステムをStyle Dictionaryで実現
  - icon: ⚡️
    title: Web Components
    details: フレームワークに依存しない標準的なカスタム要素
  - icon: 🔧
    title: TypeScript完全対応
    details: 型安全な開発体験を提供
  - icon: 📱
    title: レスポンシブ
    details: あらゆるデバイスサイズに対応
  - icon: ♿️
    title: アクセシブル
    details: ARIA属性とキーボード操作をサポート
  - icon: 🧪
    title: 高品質
    details: 1,117のユニットテストで品質を保証
---

## クイックスタート

### インストール

::: code-group

```bash [npm]
npm install @hidearea-design/core
```

```bash [pnpm]
pnpm add @hidearea-design/core
```

```bash [yarn]
yarn add @hidearea-design/core
```

:::

### 使い方

#### Vanilla JavaScript

```js
import '@hidearea-design/core';

// HTMLで使用
<ha-button variant="primary">Click me</ha-button>
```

#### React

```jsx
import { Button } from '@hidearea-design/react';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

#### Vue

```vue
<template>
  <HaButton variant="primary">Click me</HaButton>
</template>

<script setup>
import { Button as HaButton } from '@hidearea-design/vue';
</script>
```

## プロジェクト統計

- **コンポーネント数**: 31個
- **テスト数**: 1,182個（全て成功）
- **Storybookストーリー**: 294個
- **フレームワークサポート**: React、Vue（100% - 31/31コンポーネント）
- **テストカバレッジ**: Lines 87%+, Branches 69%+, Functions 90%+

## コンポーネントカテゴリ

### フォーム（8コンポーネント）
Button, Input, Checkbox, FormGroup, Select, Radio, Textarea, Switch

### レイアウト（3コンポーネント）
Container, Grid, Stack

### フィードバック（6コンポーネント）
Alert, Badge, Card, Progress, Spinner, **Skeleton** ✨

### ナビゲーション（4コンポーネント）
Tooltip, Tabs, Breadcrumb, Menu/Dropdown

### モーダル・通知（4コンポーネント）
Modal, Toast, Pagination, Avatar

### データ表示（5コンポーネント）
Table, Accordion, Drawer, List, **DataGrid** ✨

### Phase 8 完了！
全31コンポーネント実装完了
