# Tooltip

ツールチップコンポーネント。12種類の配置オプションと3つのトリガーモードをサポートします。

## 基本的な使い方

```html
<ha-tooltip content="ツールチップのテキスト">
  <ha-button>ホバーしてください</ha-button>
</ha-tooltip>
```

## 配置

12種類の配置オプションが利用可能です：

```html
<ha-tooltip content="上" placement="top">
  <ha-button>上</ha-button>
</ha-tooltip>

<ha-tooltip content="右" placement="right">
  <ha-button>右</ha-button>
</ha-tooltip>

<ha-tooltip content="下" placement="bottom">
  <ha-button>下</ha-button>
</ha-tooltip>

<ha-tooltip content="左" placement="left">
  <ha-button>左</ha-button>
</ha-tooltip>
```

### 詳細な配置

```html
<ha-tooltip content="上・開始" placement="top-start">
  <ha-button>上・開始</ha-button>
</ha-tooltip>

<ha-tooltip content="上・終了" placement="top-end">
  <ha-button>上・終了</ha-button>
</ha-tooltip>

<ha-tooltip content="右・開始" placement="right-start">
  <ha-button>右・開始</ha-button>
</ha-tooltip>

<ha-tooltip content="右・終了" placement="right-end">
  <ha-button>右・終了</ha-button>
</ha-tooltip>

<ha-tooltip content="下・開始" placement="bottom-start">
  <ha-button>下・開始</ha-button>
</ha-tooltip>

<ha-tooltip content="下・終了" placement="bottom-end">
  <ha-button>下・終了</ha-button>
</ha-tooltip>

<ha-tooltip content="左・開始" placement="left-start">
  <ha-button>左・開始</ha-button>
</ha-tooltip>

<ha-tooltip content="左・終了" placement="left-end">
  <ha-button>左・終了</ha-button>
</ha-tooltip>
```

## トリガー

3種類のトリガーモードが利用可能です：

### Hover（ホバー）

```html
<ha-tooltip content="ホバーで表示" trigger="hover">
  <ha-button>ホバー</ha-button>
</ha-tooltip>
```

### Focus（フォーカス）

```html
<ha-tooltip content="フォーカスで表示" trigger="focus">
  <ha-button>フォーカス</ha-button>
</ha-tooltip>
```

### Click（クリック）

```html
<ha-tooltip content="クリックで表示" trigger="click">
  <ha-button>クリック</ha-button>
</ha-tooltip>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `content` | `string` | `''` | ツールチップのテキスト |
| `placement` | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'right-start' \| 'right-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end'` | `'top'` | 配置位置 |
| `trigger` | `'hover' \| 'focus' \| 'click'` | `'hover'` | トリガーモード |

## React

```tsx
import { Tooltip, Button } from '@hidearea-design/react';

function App() {
  return (
    <Tooltip content="クリックしてください" placement="top">
      <Button variant="primary">ボタン</Button>
    </Tooltip>
  );
}
```

## Vue

```vue
<template>
  <HaTooltip content="クリックしてください" placement="top">
    <HaButton variant="primary">ボタン</HaButton>
  </HaTooltip>
</template>

<script setup>
import { Tooltip as HaTooltip, Button as HaButton } from '@hidearea-design/vue';
</script>
```

## 使用例

### アイコンボタン

```html
<ha-tooltip content="編集">
  <ha-button variant="ghost" size="sm">✏️</ha-button>
</ha-tooltip>

<ha-tooltip content="削除">
  <ha-button variant="ghost" size="sm">🗑️</ha-button>
</ha-tooltip>

<ha-tooltip content="共有">
  <ha-button variant="ghost" size="sm">📤</ha-button>
</ha-tooltip>
```

### 入力フィールド

```html
<ha-form-group label="パスワード">
  <ha-stack direction="horizontal" gap="2" align="center">
    <ha-input type="password" full-width></ha-input>
    <ha-tooltip content="8文字以上、大文字・小文字・数字を含む" placement="right">
      <span style="cursor: help;">ℹ️</span>
    </ha-tooltip>
  </ha-stack>
</ha-form-group>
```

### テーブルヘッダー

```html
<table>
  <thead>
    <tr>
      <th>
        名前
        <ha-tooltip content="ユーザーのフルネーム" placement="top">
          <span style="cursor: help; margin-left: 4px;">?</span>
        </ha-tooltip>
      </th>
      <th>
        ステータス
        <ha-tooltip content="アカウントの有効/無効状態" placement="top">
          <span style="cursor: help; margin-left: 4px;">?</span>
        </ha-tooltip>
      </th>
    </tr>
  </thead>
</table>
```

### 無効化されたボタン

```tsx
import { Tooltip, Button } from '@hidearea-design/react';

function DisabledButtonWithTooltip() {
  return (
    <Tooltip content="この機能は現在利用できません" placement="top">
      <span>
        <Button variant="primary" disabled>
          送信
        </Button>
      </span>
    </Tooltip>
  );
}
```

### ナビゲーション

```html
<ha-stack direction="horizontal" gap="2">
  <ha-tooltip content="ホームに戻る" placement="bottom">
    <ha-button variant="ghost">🏠</ha-button>
  </ha-tooltip>

  <ha-tooltip content="設定を開く" placement="bottom">
    <ha-button variant="ghost">⚙️</ha-button>
  </ha-tooltip>

  <ha-tooltip content="ヘルプを表示" placement="bottom">
    <ha-button variant="ghost">❓</ha-button>
  </ha-tooltip>
</ha-stack>
```

### 長いコンテンツ

```html
<ha-tooltip content="これは非常に長いツールチップのテキストです。複数行にわたる説明を含めることができます。" placement="top">
  <ha-button>詳細情報</ha-button>
</ha-tooltip>
```

### グリッド配置

```html
<ha-grid columns="3" gap="2">
  <ha-tooltip content="上" placement="top">
    <ha-button variant="outline" full-width>上</ha-button>
  </ha-tooltip>

  <ha-tooltip content="右" placement="right">
    <ha-button variant="outline" full-width>右</ha-button>
  </ha-tooltip>

  <ha-tooltip content="下" placement="bottom">
    <ha-button variant="outline" full-width>下</ha-button>
  </ha-tooltip>

  <ha-tooltip content="左" placement="left">
    <ha-button variant="outline" full-width>左</ha-button>
  </ha-tooltip>
</ha-grid>
```

### カードアクション

```tsx
import { Tooltip, Card, Stack, Button } from '@hidearea-design/react';

function ActionCard() {
  return (
    <Card variant="outlined">
      <Stack direction="vertical" gap="3">
        <h3>プロジェクト名</h3>
        <p>プロジェクトの説明</p>

        <Stack direction="horizontal" gap="2" justify="end">
          <Tooltip content="プロジェクトを編集" placement="top">
            <Button variant="ghost" size="sm">✏️</Button>
          </Tooltip>

          <Tooltip content="プロジェクトを複製" placement="top">
            <Button variant="ghost" size="sm">📋</Button>
          </Tooltip>

          <Tooltip content="プロジェクトを削除" placement="top">
            <Button variant="ghost" size="sm">🗑️</Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Card>
  );
}
```

### ステータスインジケーター

```html
<ha-stack direction="horizontal" gap="3" align="center">
  <ha-tooltip content="オンライン" placement="top">
    <div style="width: 12px; height: 12px; border-radius: 50%; background: var(--color-success-500);"></div>
  </ha-tooltip>

  <span>ユーザー名</span>
</ha-stack>
```

### クリックトリガー

```tsx
import { Tooltip, Badge } from '@hidearea-design/react';
import { useState } from 'react';

function ClickableTooltip() {
  const [count, setCount] = useState(0);

  return (
    <Tooltip
      content={`クリック数: ${count}`}
      trigger="click"
      placement="top"
    >
      <Badge
        variant="primary"
        styleType="soft"
        onClick={() => setCount(count + 1)}
        style={{ cursor: 'pointer' }}
      >
        クリックしてください
      </Badge>
    </Tooltip>
  );
}
```

## アクセシビリティ

- `role="tooltip"` が自動的に設定されます
- `aria-describedby` で関連付けが行われます
- キーボード操作に対応しています（Esc キーで閉じる）
- フォーカス可能な要素でトリガーされる場合、適切にフォーカス管理されます

```html
<ha-tooltip content="説明テキスト" placement="top">
  <button aria-label="詳細情報">ℹ️</button>
</ha-tooltip>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-tooltip {
  --tooltip-bg: var(--color-gray-900);
  --tooltip-color: var(--color-white);
  --tooltip-padding: 8px 12px;
  --tooltip-border-radius: 6px;
  --tooltip-font-size: 14px;
  --tooltip-max-width: 200px;
  --tooltip-z-index: 9999;
}
```

## 配置オプション一覧

| 配置 | 説明 |
|------|------|
| `top` | 上中央 |
| `top-start` | 上左 |
| `top-end` | 上右 |
| `right` | 右中央 |
| `right-start` | 右上 |
| `right-end` | 右下 |
| `bottom` | 下中央 |
| `bottom-start` | 下左 |
| `bottom-end` | 下右 |
| `left` | 左中央 |
| `left-start` | 左上 |
| `left-end` | 左下 |

## トリガー別の使い分け

| トリガー | 用途 | 例 |
|---------|------|-----|
| `hover` | 補足情報の表示 | アイコン説明、ヘルプテキスト |
| `focus` | フォーム要素の説明 | 入力フィールドのヒント |
| `click` | インタラクティブな情報 | 詳細情報、統計データ |
