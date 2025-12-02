# Vue ガイド

Hidearea DesignをVue 3プロジェクトで使用する方法を説明します。

## インストール

```bash
npm install @hidearea-design/vue @hidearea-design/core
```

## 基本的な使い方

### コンポーネントのインポート

```vue
<template>
  <HaCard>
    <h2>サインアップ</h2>
    <HaInput v-model="email" placeholder="メールアドレス" />
    <HaButton variant="primary">送信</HaButton>
  </HaCard>
</template>

<script setup>
import { ref } from 'vue';
import { Card as HaCard, Input as HaInput, Button as HaButton } from '@hidearea-design/vue';

const email = ref('');
</script>
```

### CSS変数の読み込み

`main.ts` でCSS変数を読み込みます：

```ts
import { createApp } from 'vue';
import App from './App.vue';
import '@hidearea-design/tokens/build/css/variables.css';

createApp(App).mount('#app');
```

## グローバル登録

すべてのコンポーネントをグローバルに登録する場合：

```ts
import { createApp } from 'vue';
import App from './App.vue';
import HideareaDesign from '@hidearea-design/vue';

const app = createApp(App);
app.use(HideareaDesign);
app.mount('#app');
```

使用例：

```vue
<template>
  <HaButton variant="primary">Click me</HaButton>
</template>

<!-- <script setup> でインポート不要 -->
```

## TypeScriptサポート

すべてのコンポーネントに完全な型定義があります：

```vue
<script setup lang="ts">
import type { ButtonProps } from '@hidearea-design/vue';
import { Button as HaButton } from '@hidearea-design/vue';

const props = defineProps<ButtonProps>();
</script>
```

## v-model バインディング

### Input、Textarea

```vue
<template>
  <HaInput v-model="email" type="email" placeholder="メールアドレス" />
  <HaTextarea v-model="message" rows="4" placeholder="メッセージ" />
</template>

<script setup>
import { ref } from 'vue';
import { Input as HaInput, Textarea as HaTextarea } from '@hidearea-design/vue';

const email = ref('');
const message = ref('');
</script>
```

### Checkbox、Switch

```vue
<template>
  <HaCheckbox v-model="accepted">利用規約に同意する</HaCheckbox>
  <HaSwitch v-model="enabled">通知を有効化</HaSwitch>
</template>

<script setup>
import { ref } from 'vue';
import { Checkbox as HaCheckbox, Switch as HaSwitch } from '@hidearea-design/vue';

const accepted = ref(false);
const enabled = ref(true);
</script>
```

### Select、Radio

```vue
<template>
  <HaSelect v-model="country">
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
  </HaSelect>

  <HaRadio v-model="plan" value="free">無料プラン</HaRadio>
  <HaRadio v-model="plan" value="pro">プロプラン</HaRadio>
</template>

<script setup>
import { ref } from 'vue';
import { Select as HaSelect, Radio as HaRadio } from '@hidearea-design/vue';

const country = ref('jp');
const plan = ref('free');
</script>
```

## イベントハンドリング

### フォーム送信

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <HaInput v-model="email" type="email" required />
    <HaInput v-model="password" type="password" required />
    <HaButton type="submit" variant="primary">ログイン</HaButton>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { Input as HaInput, Button as HaButton } from '@hidearea-design/vue';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
  console.log({ email: email.value, password: password.value });
};
</script>
```

### カスタムイベント

```vue
<template>
  <HaAlert
    variant="success"
    closable
    @close="handleClose"
  >
    操作が成功しました
  </HaAlert>

  <HaTabs @tab-change="handleTabChange">
    <!-- タブコンテンツ -->
  </HaTabs>
</template>

<script setup>
import { Alert as HaAlert, Tabs as HaTabs } from '@hidearea-design/vue';

const handleClose = () => {
  console.log('Alert closed');
};

const handleTabChange = (value: string) => {
  console.log('Tab changed to:', value);
};
</script>
```

## レイアウトコンポーネント

```vue
<template>
  <HaContainer max-width="lg">
    <HaStack direction="vertical" gap="4">
      <h1>タイトル</h1>

      <HaGrid columns="3" gap="4">
        <HaCard>カード1</HaCard>
        <HaCard>カード2</HaCard>
        <HaCard>カード3</HaCard>
      </HaGrid>
    </HaStack>
  </HaContainer>
</template>

<script setup>
import {
  Container as HaContainer,
  Stack as HaStack,
  Grid as HaGrid,
  Card as HaCard
} from '@hidearea-design/vue';
</script>
```

## ナビゲーションコンポーネント

### Tooltip

```vue
<template>
  <HaTooltip content="ボタンをクリックしてください" placement="top">
    <HaButton>ホバーしてください</HaButton>
  </HaTooltip>
</template>

<script setup>
import { Tooltip as HaTooltip, Button as HaButton } from '@hidearea-design/vue';
</script>
```

### Tabs

```vue
<template>
  <HaTabs v-model="activeTab">
    <ha-tab-item value="tab1">タブ1</ha-tab-item>
    <ha-tab-item value="tab2">タブ2</ha-tab-item>

    <ha-tab-panel value="tab1">
      タブ1のコンテンツ
    </ha-tab-panel>
    <ha-tab-panel value="tab2">
      タブ2のコンテンツ
    </ha-tab-panel>
  </HaTabs>
</template>

<script setup>
import { ref } from 'vue';
import { Tabs as HaTabs } from '@hidearea-design/vue';

const activeTab = ref('tab1');
</script>
```

### Breadcrumb

```vue
<template>
  <HaBreadcrumb separator="chevron">
    <ha-breadcrumb-item href="/">ホーム</ha-breadcrumb-item>
    <ha-breadcrumb-item href="/products">商品</ha-breadcrumb-item>
    <ha-breadcrumb-item current>詳細</ha-breadcrumb-item>
  </HaBreadcrumb>
</template>

<script setup>
import { Breadcrumb as HaBreadcrumb } from '@hidearea-design/vue';
</script>
```

### Menu/Dropdown

```vue
<template>
  <HaDropdown placement="bottom-start">
    <HaButton slot="trigger">メニュー</HaButton>

    <HaMenu @item-click="handleItemClick">
      <HaMenuItem value="edit">編集</HaMenuItem>
      <HaMenuDivider />
      <HaMenuItem value="delete" danger>削除</HaMenuItem>
    </HaMenu>
  </HaDropdown>
</template>

<script setup>
import {
  Dropdown as HaDropdown,
  Menu as HaMenu,
  MenuItem as HaMenuItem,
  MenuDivider as HaMenuDivider,
  Button as HaButton
} from '@hidearea-design/vue';

const handleItemClick = (value: string) => {
  console.log('Clicked:', value);
};
</script>
```

## Composition API パターン

### リアクティブな状態管理

```vue
<template>
  <HaProgress :value="progress" :max="100" show-label />
  <HaButton @click="increment">進める</HaButton>
</template>

<script setup>
import { ref } from 'vue';
import { Progress as HaProgress, Button as HaButton } from '@hidearea-design/vue';

const progress = ref(0);

const increment = () => {
  if (progress.value < 100) {
    progress.value += 10;
  }
};
</script>
```

### Computed プロパティ

```vue
<template>
  <HaBadge :variant="statusVariant">{{ status }}</HaBadge>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Badge as HaBadge } from '@hidearea-design/vue';

const status = ref<'active' | 'inactive'>('active');

const statusVariant = computed(() =>
  status.value === 'active' ? 'success' : 'error'
);
</script>
```

## Nuxt 3 での使用

`plugins/hidearea-design.ts`:

```ts
import HideareaDesign from '@hidearea-design/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HideareaDesign);
});
```

`nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ['@hidearea-design/tokens/build/css/variables.css'],
  build: {
    transpile: ['@hidearea-design/vue']
  }
});
```

## Vite での設定

`vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('ha-')
      }
    }
  })],
  optimizeDeps: {
    include: ['@hidearea-design/core']
  }
});
```

## トラブルシューティング

### Web Components が認識されない

`vite.config.ts` で `isCustomElement` を設定：

```ts
compilerOptions: {
  isCustomElement: (tag) => tag.startsWith('ha-')
}
```

### 型定義が効かない

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@hidearea-design/vue"]
  }
}
```

### スタイルが適用されない

CSS変数が読み込まれているか確認：

```ts
import '@hidearea-design/tokens/build/css/variables.css';
```
