# Phase 3.5: React/Vue ラッパー補完完了レポート

**作成日**: 2025-12-01
**ステータス**: ✅ 完了
**PR**: #10 - https://github.com/hardlitchi/hidearea-design/pull/10

---

## 概要

Phase 3で実装した5つのフォームコンポーネントに対して、React と Vue のフレームワークラッパーを追加実装しました。これにより、全16コンポーネントに対して React/Vue ラッパーが揃い、フレームワークサポート率が100%となりました。

---

## 実装コンポーネント

### 対象コンポーネント（Phase 3）

| # | コンポーネント | React | Vue | 説明 |
|---|--------------|-------|-----|------|
| 7 | **FormGroup** | ✅ | ✅ | フォームフィールドコンテナ |
| 8 | **Select** | ✅ | ✅ | ドロップダウン選択 |
| 9 | **Radio** | ✅ | ✅ | ラジオボタン |
| 10 | **Textarea** | ✅ | ✅ | 複数行テキスト入力 |
| 11 | **Switch** | ✅ | ✅ | トグルスイッチ |

---

## React ラッパー実装

### 実装パターン

すべてのReactラッパーは以下のパターンで統一されています：

```typescript
export const ComponentName = forwardRef<HTMLElement, ComponentProps>(
  ({ prop1, prop2, ...props }, _ref) => {
    const elementRef = useRef<HaComponentElement>(null);

    // プロパティ同期
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // プロパティを設定
      element.prop1 = prop1;
      element.prop2 = prop2;
    }, [prop1, prop2]);

    // イベントリスナー
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const handleEvent = (e: Event) => {
        // イベント処理
      };

      element.addEventListener('event', handleEvent);
      return () => {
        element.removeEventListener('event', handleEvent);
      };
    }, [onEvent]);

    return <ha-component ref={elementRef as any} {...props} />;
  }
);
```

### 実装ファイル

#### 1. FormGroup.tsx
- **ファイルサイズ**: 138行
- **主要機能**:
  - label、helperText、errorText プロパティ
  - required、error、disabled 状態管理
  - label、helper-text、error-text スロット対応
  - React.ReactNode によるスロットコンテンツ

```typescript
export interface FormGroupProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  labelContent?: React.ReactNode;
  helperTextContent?: React.ReactNode;
  errorTextContent?: React.ReactNode;
  children?: React.ReactNode;
}
```

#### 2. Select.tsx
- **ファイルサイズ**: 164行
- **主要機能**:
  - variant (default, filled, outlined)
  - size (sm, md, lg)
  - value 双方向バインディング
  - onChange イベント（value 引数）
  - CustomEvent<{ value: string }> 処理

```typescript
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
}
```

#### 3. Radio.tsx
- **ファイルサイズ**: 169行
- **主要機能**:
  - checked 状態管理
  - onChange イベント（checked 引数）
  - label、description スロット
  - size (sm, md, lg)

```typescript
export interface RadioProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  size?: 'sm' | 'md' | 'lg';
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  labelContent?: React.ReactNode;
  descriptionContent?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}
```

#### 4. Textarea.tsx
- **ファイルサイズ**: 212行
- **主要機能**:
  - variant (default, filled, outlined)
  - size (sm, md, lg)
  - value 双方向バインディング
  - onInput と onChange 両イベント対応
  - rows、resize、maxlength、minlength 属性
  - setAttribute による属性設定（rows、maxlength、minlength）

```typescript
export interface TextareaProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange' | 'onInput'> {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  name?: string;
  maxlength?: number;
  minlength?: number;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
}
```

#### 5. Switch.tsx
- **ファイルサイズ**: 169行
- **主要機能**:
  - checked 状態管理
  - onChange イベント（checked 引数）
  - label、description スロット
  - size (sm, md, lg)

```typescript
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  size?: 'sm' | 'md' | 'lg';
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  labelContent?: React.ReactNode;
  descriptionContent?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}
```

### React パッケージ更新

**packages/react/src/index.ts** を更新：

```typescript
export { FormGroup } from './FormGroup';
export type { FormGroupProps } from './FormGroup';

export { Select } from './Select';
export type { SelectProps } from './Select';

export { Radio } from './Radio';
export type { RadioProps } from './Radio';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';
```

---

## Vue ラッパー実装

### 実装パターン

すべてのVueラッパーは以下のパターンで統一されています：

```vue
<script setup lang="ts">
import { ref, onMounted, withDefaults, defineEmits } from 'vue';
import type { HaComponent as HaComponentElement } from '@hidearea-design/core';

export interface ComponentProps {
  prop1?: string;
  prop2?: boolean;
}

const props = withDefaults(defineProps<ComponentProps>(), {
  prop1: 'default',
  prop2: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  event: [value: string];
}>();

const elementRef = ref<HaComponentElement | null>(null);

onMounted(() => {
  const element = elementRef.value;
  if (!element) return;

  // プロパティ同期
  element.prop1 = props.prop1;
  element.prop2 = props.prop2;

  // イベントリスナー
  element.addEventListener('event', (e: Event) => {
    const customEvent = e as CustomEvent<{ value: string }>;
    emit('event', customEvent.detail.value);
  });
});
</script>

<template>
  <ha-component :ref="elementRef" v-bind="$attrs">
    <slot />
  </ha-component>
</template>
```

### 実装ファイル

#### 1. FormGroup.vue
- **ファイルサイズ**: 96行
- **主要機能**:
  - Composition API
  - label、helper-text、error-text 名前付きスロット
  - required、error、disabled 状態管理

#### 2. Select.vue
- **ファイルサイズ**: 127行
- **主要機能**:
  - v-model 対応（modelValue prop + update:modelValue emit）
  - change イベント emission
  - variant、size プロパティ
  - デフォルトスロット（option要素）

```typescript
export interface SelectProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  name?: string;
}

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();
```

#### 3. Radio.vue
- **ファイルサイズ**: 77行
- **主要機能**:
  - checked 状態
  - change イベント emission
  - label、description スロット

#### 4. Textarea.vue
- **ファイルサイズ**: 96行
- **主要機能**:
  - v-model 対応
  - input と change イベント両方 emission
  - rows、resize プロパティ
  - variant、size プロパティ

```typescript
export interface TextareaProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  name?: string;
  maxlength?: number;
  minlength?: number;
}

const emit = defineEmits<{
  'update:modelValue': [value: string];
  input: [value: string];
  change: [value: string];
}>();
```

#### 5. Switch.vue
- **ファイルサイズ**: 77行
- **主要機能**:
  - checked 状態
  - change イベント emission
  - label、description スロット

### Vue パッケージ更新

**packages/vue/src/index.ts** を更新：

```typescript
import FormGroup from './FormGroup.vue';
import Select from './Select.vue';
import Radio from './Radio.vue';
import Textarea from './Textarea.vue';
import Switch from './Switch.vue';

export {
  Button, Input, Checkbox,
  Container, Grid, Stack,
  Alert, Badge, Card, Progress, Spinner,
  FormGroup, Select, Radio, Textarea, Switch
};

// Vue plugin
export default {
  install(app: App) {
    // ... existing components ...
    app.component('HaFormGroup', FormGroup);
    app.component('HaSelect', Select);
    app.component('HaRadio', Radio);
    app.component('HaTextarea', Textarea);
    app.component('HaSwitch', Switch);
  },
};
```

**packages/vue/src/types.ts** を更新：

```typescript
export interface FormGroupProps { /* ... */ }
export interface SelectProps { /* ... */ }
export interface RadioProps { /* ... */ }
export interface TextareaProps { /* ... */ }
export interface SwitchProps { /* ... */ }
```

---

## ビルド結果

### React パッケージ

```
✓ 25 modules transformed.
dist/index.es.js  38.11 kB │ gzip: 9.77 kB │ map: 136.01 kB
dist/index.umd.js  25.24 kB │ gzip: 8.45 kB │ map: 132.10 kB
✓ built in 381ms
```

### Vue パッケージ

```
✓ 33 modules transformed.
dist/index.es.js  27.15 kB │ gzip: 4.41 kB │ map: 55.67 kB
dist/index.umd.js  20.32 kB │ gzip: 4.13 kB │ map: 53.58 kB
✓ built in 521ms
```

---

## 技術的な詳細

### TypeScript サポート

すべてのラッパーに完全な TypeScript 型定義を提供：

- **React**: 各コンポーネントに `Props` インターフェース
- **Vue**: `types.ts` にすべてのプロパティインターフェース
- **エクスポート**: 型定義も名前付きエクスポート

### イベント処理

#### React
- `CustomEvent<T>` 型キャスト
- イベントハンドラーは値を直接受け取る（`onChange(value)` など）
- `Omit<React.HTMLAttributes, 'onChange'>` で型競合回避

#### Vue
- `defineEmits` でイベント型定義
- v-model 用に `update:modelValue` イベント
- カスタムイベント（`change`、`input` など）も emission

### スロット処理

#### React
- `children` prop でデフォルトスロット
- 名前付きスロットは専用 prop（例: `labelContent`）
- `<span slot="name">{content}</span>` で Web Component スロットへ渡す

#### Vue
- テンプレートの `<slot />` でデフォルトスロット
- `<template #slot-name>` で名前付きスロット
- `$slots['slot-name']` で条件付きレンダリング

### 属性 vs プロパティ

一部の Web Component プロパティは setter がないため、`setAttribute` を使用：

**Textarea の例**:
```typescript
// React
element.setAttribute('rows', rows.toString());
element.setAttribute('maxlength', maxlength.toString());
element.setAttribute('minlength', minlength.toString());
```

これは `HaTextarea` クラスに `rows`、`maxlength`、`minlength` の public setter がないためです。

---

## Git 履歴

### ブランチ
- `feature/phase3-react-vue-wrappers`

### コミット
```
43ed060 feat: Add React and Vue wrappers for Phase 3 form components

Add framework wrappers for FormGroup, Select, Radio, Textarea, and Switch
components to provide seamless integration with React and Vue applications.

React wrappers:
- FormGroup: Wrapper with label, helper-text, and error-text slots
- Select: Wrapper with change event handling
- Radio: Wrapper with checked state management
- Textarea: Wrapper with input/change events and attribute support
- Switch: Wrapper with toggle functionality

Vue wrappers:
- FormGroup: Template-based wrapper with named slots
- Select: v-model support with change events
- Radio: Change event emission
- Textarea: v-model support with input/change events
- Switch: Change event emission

All wrappers follow established patterns:
- React: forwardRef + useEffect for property sync + event listeners
- Vue: Composition API + onMounted + defineEmits
- Full TypeScript support with exported prop interfaces

13 files changed, 1417 insertions(+), 1 deletion(-)
```

### プルリクエスト
**PR #10**: https://github.com/hardlitchi/hidearea-design/pull/10

---

## 統計

### ファイル変更
- **変更ファイル**: 13ファイル
- **追加行**: 1,417行
- **削除行**: 1行

### コンポーネント数
- **React ラッパー追加**: 5コンポーネント
- **Vue ラッパー追加**: 5コンポーネント
- **総ラッパー数**: React 16/16、Vue 16/16（100%）

### コードサイズ
- **React 平均**: 約170行/コンポーネント
- **Vue 平均**: 約95行/コンポーネント
- **総追加コード**: 約1,400行

---

## 次のステップ

### Phase 5: ナビゲーションコンポーネント

次のフェーズでは、ナビゲーション関連のコンポーネントを実装します：

1. **Tabs** - タブナビゲーション
2. **Menu/Dropdown** - ドロップダウンメニュー
3. **Breadcrumb** - パンくずリスト
4. **Tooltip** - ツールチップ

各コンポーネントについて：
- Web Component 実装
- Storybook ストーリー
- ユニットテスト
- React ラッパー
- Vue ラッパー
- TypeScript 型定義

---

## まとめ

Phase 3.5 では、Phase 3 で実装した5つのフォームコンポーネントに対して React と Vue のフレームワークラッパーを追加実装しました。

### 成果
- ✅ 5つの React ラッパー実装
- ✅ 5つの Vue ラッパー実装
- ✅ 完全な TypeScript サポート
- ✅ 一貫したパターンとアーキテクチャ
- ✅ すべてのビルドが成功
- ✅ **フレームワークサポート率 100%達成**

### 技術的ハイライト
- forwardRef パターン（React）
- Composition API パターン（Vue）
- v-model サポート（Vue）
- カスタムイベント処理
- スロットシステム
- setAttribute による属性制御

これにより、React と Vue のどちらの環境でも、全16コンポーネントがネイティブと同様の使い心地で利用できるようになりました。

---

**完了日**: 2025-12-01
**ステータス**: ✅ 完了
**次のフェーズ**: Phase 5 - ナビゲーションコンポーネント
