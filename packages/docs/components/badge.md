# Badge

小さなラベルバッジコンポーネント。6つのバリアントと3つのスタイルをサポートします。

## 基本的な使い方

```html
<ha-badge>New</ha-badge>
```

## バリアント

6種類のバリアントが利用可能です：

```html
<ha-badge variant="primary">Primary</ha-badge>
<ha-badge variant="secondary">Secondary</ha-badge>
<ha-badge variant="success">Success</ha-badge>
<ha-badge variant="warning">Warning</ha-badge>
<ha-badge variant="error">Error</ha-badge>
<ha-badge variant="info">Info</ha-badge>
```

## スタイル

3種類のスタイルが利用可能です：

### Filled（塗りつぶし）

```html
<ha-badge variant="primary" style-type="filled">Filled</ha-badge>
```

### Outlined（アウトライン）

```html
<ha-badge variant="primary" style-type="outlined">Outlined</ha-badge>
```

### Soft（ソフト）

```html
<ha-badge variant="primary" style-type="soft">Soft</ha-badge>
```

## サイズ

3種類のサイズが利用可能です：

```html
<ha-badge size="sm">Small</ha-badge>
<ha-badge size="md">Medium</ha-badge>
<ha-badge size="lg">Large</ha-badge>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | バリアント |
| `style-type` | `'filled' \| 'outlined' \| 'soft'` | `'filled'` | スタイルタイプ |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |

## React

```tsx
import { Badge } from '@hidearea-design/react';

function App() {
  return (
    <Badge variant="success" styleType="soft">
      Active
    </Badge>
  );
}
```

## Vue

```vue
<template>
  <HaBadge variant="success" style-type="soft">
    Active
  </HaBadge>
</template>

<script setup>
import { Badge as HaBadge } from '@hidearea-design/vue';
</script>
```

## 使用例

### ステータス表示

```html
<ha-badge variant="success">有効</ha-badge>
<ha-badge variant="error">無効</ha-badge>
<ha-badge variant="warning">保留中</ha-badge>
<ha-badge variant="info">処理中</ha-badge>
```

### テキストと組み合わせる

```html
<h3>
  新機能
  <ha-badge variant="primary" size="sm">New</ha-badge>
</h3>
```

### リストアイテム

```html
<ul>
  <li>
    機能A
    <ha-badge variant="success" style-type="soft">完了</ha-badge>
  </li>
  <li>
    機能B
    <ha-badge variant="warning" style-type="soft">進行中</ha-badge>
  </li>
  <li>
    機能C
    <ha-badge variant="error" style-type="soft">未対応</ha-badge>
  </li>
</ul>
```

### テーブル

```tsx
import { Badge } from '@hidearea-design/react';

interface Order {
  id: number;
  product: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
}

function OrderTable({ orders }: { orders: Order[] }) {
  const getStatusBadge = (status: string) => {
    const config = {
      pending: { variant: 'warning', label: '保留中' },
      shipped: { variant: 'info', label: '発送済み' },
      delivered: { variant: 'success', label: '配達完了' },
      cancelled: { variant: 'error', label: 'キャンセル' },
    }[status];

    return (
      <Badge variant={config.variant as any} styleType="soft">
        {config.label}
      </Badge>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>注文ID</th>
          <th>商品</th>
          <th>ステータス</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.product}</td>
            <td>{getStatusBadge(order.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### カウンター

```html
<ha-button variant="outline">
  通知
  <ha-badge variant="error" size="sm" style="margin-left: 8px;">3</ha-badge>
</ha-button>
```

### カードヘッダー

```html
<ha-card>
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <h3>プレミアムプラン</h3>
    <ha-badge variant="primary">推奨</ha-badge>
  </div>
  <p>月額 ¥2,980</p>
</ha-card>
```

### タブラベル

```html
<ha-tabs>
  <ha-tab-item value="all">
    すべて
    <ha-badge variant="secondary" size="sm" style="margin-left: 4px;">24</ha-badge>
  </ha-tab-item>
  <ha-tab-item value="unread">
    未読
    <ha-badge variant="error" size="sm" style="margin-left: 4px;">5</ha-badge>
  </ha-tab-item>
  <ha-tab-item value="archived">
    アーカイブ
    <ha-badge variant="secondary" size="sm" style="margin-left: 4px;">19</ha-badge>
  </ha-tab-item>
</ha-tabs>
```

### 動的バッジ

```tsx
import { Badge } from '@hidearea-design/react';
import { useMemo } from 'react';

interface StatusBadgeProps {
  value: number;
  threshold: { low: number; medium: number };
}

function StatusBadge({ value, threshold }: StatusBadgeProps) {
  const { variant, label } = useMemo(() => {
    if (value < threshold.low) {
      return { variant: 'error', label: '低' };
    } else if (value < threshold.medium) {
      return { variant: 'warning', label: '中' };
    } else {
      return { variant: 'success', label: '高' };
    }
  }, [value, threshold]);

  return (
    <Badge variant={variant as any} styleType="soft">
      {label}: {value}%
    </Badge>
  );
}

// 使用例
function App() {
  return (
    <StatusBadge value={75} threshold={{ low: 30, medium: 60 }} />
  );
}
```

### 複数バッジ

```html
<ha-stack direction="horizontal" gap="2" wrap>
  <ha-badge variant="primary">JavaScript</ha-badge>
  <ha-badge variant="info">TypeScript</ha-badge>
  <ha-badge variant="success">React</ha-badge>
  <ha-badge variant="secondary">Vue</ha-badge>
</ha-stack>
```

## アクセシビリティ

- セマンティックな要素として機能します
- スクリーンリーダーがテキストを読み上げます
- 装飾的なバッジの場合は `aria-hidden="true"` を設定することを検討してください

```html
<!-- 意味のあるバッジ -->
<ha-badge variant="error">エラー</ha-badge>

<!-- 装飾的なバッジ -->
<ha-badge variant="primary" aria-hidden="true">New</ha-badge>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-badge {
  --badge-padding: 4px 8px;
  --badge-border-radius: 4px;
  --badge-font-size: 12px;
  --badge-font-weight: 500;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 例 |
|-----------|------|-----|
| `primary` | 主要な情報 | New, 推奨 |
| `secondary` | 補足情報 | カウント、タグ |
| `success` | 成功・完了 | 有効、完了 |
| `warning` | 警告・注意 | 保留中、要確認 |
| `error` | エラー・危険 | 無効、エラー |
| `info` | 情報 | 処理中、進行中 |
