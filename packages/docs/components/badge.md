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

### ARIAサポートとベストプラクティス

`<ha-badge>` コンポーネントは、WCAG 2.1 AA基準に準拠したアクセシビリティを考慮して設計されています。

**セマンティック要素:**
- バッジは `<span>` 要素としてレンダリングされます
- スクリーンリーダーがテキスト内容を読み上げます
- インラインで配置できるため、コンテキストを維持します

**装飾的なバッジ:**
純粋に視覚的な目的のバッジには `aria-hidden="true"` を設定：

```html
<!-- Good ✓: 意味のあるバッジ（ステータス表示） -->
<ha-badge variant="error">エラー</ha-badge>
<!-- スクリーンリーダー: 「エラー」 -->

<!-- Good ✓: 装飾的なバッジ -->
<h3>
  新機能
  <ha-badge variant="primary" aria-hidden="true">New</ha-badge>
</h3>
<!-- スクリーンリーダー: 「新機能」のみ読み上げ -->

<!-- Good ✓: 数値カウンターは読み上げる -->
<ha-button>
  通知
  <ha-badge variant="error" aria-label="3件の未読通知">3</ha-badge>
</ha-button>
<!-- スクリーンリーダー: 「通知 3件の未読通知」 -->
```

**色だけに依存しない:**
バッジのバリアントは色で区別されますが、テキストでも意味を伝えます：

```html
<!-- Good ✓: 色とテキストで意味を伝える -->
<ha-badge variant="success">完了</ha-badge>
<ha-badge variant="error">エラー</ha-badge>
<ha-badge variant="warning">保留中</ha-badge>

<!-- Bad ✗: 色だけに依存（テキストなし） -->
<ha-badge variant="success" aria-label="成功"></ha-badge>
<!-- 視覚的にしか意味が伝わらない -->
```

**コントラスト比:**
すべてのバリアントと style-type の組み合わせで、WCAG AA基準（4.5:1以上）のコントラスト比を確保しています。

## スタイルのカスタマイズ

### デザイントークン

このコンポーネントは以下のデザイントークンを使用します：

```css
/* カラー - Primary */
var(--component-badge-primary-background-filled)
var(--component-badge-primary-text-filled)
var(--component-badge-primary-background-soft)
var(--component-badge-primary-text-soft)
var(--component-badge-primary-border-outlined)
var(--component-badge-primary-text-outlined)

/* カラー - Success, Warning, Error, Info, Secondary */
/* 各バリアントで同様のトークンセット */

/* サイズ */
var(--component-badge-padding-sm)     /* 2px 6px */
var(--component-badge-padding-md)     /* 4px 8px */
var(--component-badge-padding-lg)     /* 6px 12px */
var(--component-badge-font-size-sm)   /* 10px */
var(--component-badge-font-size-md)   /* 12px */
var(--component-badge-font-size-lg)   /* 14px */

/* その他 */
var(--border-radius-sm)
var(--font-weight-medium)
```

### カスタムCSS変数

Shadow DOM外部からカスタマイズ可能なCSS変数：

```css
ha-badge {
  /* パディング（サイズごと） */
  --badge-padding-sm: 2px 6px;
  --badge-padding-md: 4px 8px;
  --badge-padding-lg: 6px 12px;

  /* フォント */
  --badge-font-size-sm: 10px;
  --badge-font-size-md: 12px;
  --badge-font-size-lg: 14px;
  --badge-font-weight: 500;
  --badge-font-family: inherit;
  --badge-line-height: 1.2;

  /* ボーダー */
  --badge-border-radius: 4px;
  --badge-border-width: 1px;

  /* カスタムカラー（例: primaryバリアント） */
  --badge-primary-filled-bg: var(--color-primary-500);
  --badge-primary-filled-text: white;
  --badge-primary-soft-bg: var(--color-primary-100);
  --badge-primary-soft-text: var(--color-primary-700);
  --badge-primary-outlined-border: var(--color-primary-500);
  --badge-primary-outlined-text: var(--color-primary-600);
}
```

### Shadow DOMパーツ

`::part()` を使用してShadow DOM内部のスタイルをカスタマイズ：

```css
/* バッジ本体 */
ha-badge::part(badge) {
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* サイズ別カスタマイズ */
ha-badge[size="sm"]::part(badge) {
  padding: 2px 6px;
  font-size: 10px;
}

ha-badge[size="lg"]::part(badge) {
  padding: 8px 14px;
  font-size: 14px;
}

/* バリアント別カスタマイズ */
ha-badge[variant="success"]::part(badge) {
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
}

/* style-type 別カスタマイズ */
ha-badge[style-type="outlined"]::part(badge) {
  border-width: 2px;
  font-weight: 600;
}

ha-badge[style-type="soft"]::part(badge) {
  backdrop-filter: blur(8px);
}
```

### バリアント別カスタムカラー

特定のバリアントだけカスタマイズする例：

```css
/* Warningバリアントをオレンジ系に変更 */
ha-badge[variant="warning"] {
  --badge-warning-filled-bg: #f97316;
  --badge-warning-filled-text: white;
  --badge-warning-soft-bg: #fed7aa;
  --badge-warning-soft-text: #9a3412;
  --badge-warning-outlined-border: #f97316;
  --badge-warning-outlined-text: #c2410c;
}

/* カスタムバリアント風のスタイル */
ha-badge.custom-gradient::part(badge) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}
```

## バリアント別の使い分け

| バリアント | 用途 | 例 | 推奨 style-type |
|-----------|------|-----|----------------|
| `primary` | 主要な情報、強調 | New, 推奨, ベータ版 | filled, soft |
| `secondary` | 補足情報、中立 | カウント、タグ、カテゴリー | soft, outlined |
| `success` | 成功・完了・有効 | 完了, 有効, 公開済み | soft, filled |
| `warning` | 警告・注意・保留 | 保留中, 要確認, 期限間近 | soft, outlined |
| `error` | エラー・危険・無効 | エラー, 無効, 削除済み | filled, soft |
| `info` | 情報・処理中 | 処理中, 進行中, お知らせ | soft, outlined |

### style-type の選び方

**filled（塗りつぶし）:**
- 最も目立つスタイル
- 重要なステータスや通知に使用
- 例: エラーバッジ、重要な通知カウンター

**outlined（アウトライン）:**
- 控えめだが明確
- 多数のバッジが並ぶ場合に適している
- 例: タグ、フィルター、カテゴリー

**soft（ソフト）:**
- 柔らかく読みやすい
- 最も一般的で汎用的
- 例: ステータス表示、データテーブル、リスト項目

## ベストプラクティス

### Do's ✓

- **簡潔なテキスト**: 1〜2語の短いラベルを使用（長いテキストは避ける）
- **適切なバリアント**: ステータスの意味に合ったバリアントを選択
- **一貫性**: 同じ意味のステータスには同じバリアントとstyle-typeを使用
- **適度な使用**: 1つの要素に複数のバッジを詰め込みすぎない
- **セマンティック**: 装飾的なバッジには `aria-hidden` を使用

```html
<!-- Good ✓: 簡潔で明確 -->
<ha-badge variant="success" style-type="soft">完了</ha-badge>
<ha-badge variant="warning" style-type="soft">保留中</ha-badge>
<ha-badge variant="error" style-type="soft">エラー</ha-badge>

<!-- Good ✓: 一貫性のある使用 -->
<ha-card>
  <h3>タスク A <ha-badge variant="success">完了</ha-badge></h3>
</ha-card>
<ha-card>
  <h3>タスク B <ha-badge variant="success">完了</ha-badge></h3>
</ha-card>
```

### Don'ts ✗

- **長いテキスト**: バッジに長文を入れない（Tagコンポーネントを検討）
- **過度な装飾**: 同じ要素に5個以上のバッジを配置しない
- **色の意味の混乱**: successバリアントをエラー表示に使用しない
- **サイズの不統一**: 同じコンテキストで異なるサイズを混在させない

```html
<!-- Bad ✗: テキストが長すぎる -->
<ha-badge>このタスクは完了しました</ha-badge>

<!-- Bad ✗: バリアントの意味が逆 -->
<ha-badge variant="success">エラー</ha-badge>
<ha-badge variant="error">完了</ha-badge>

<!-- Bad ✗: 過度なバッジ -->
<h3>
  タイトル
  <ha-badge>Tag1</ha-badge>
  <ha-badge>Tag2</ha-badge>
  <ha-badge>Tag3</ha-badge>
  <ha-badge>Tag4</ha-badge>
  <ha-badge>Tag5</ha-badge>
  <ha-badge>Tag6</ha-badge>
</h3>
```

## よくある質問

### ステータスに応じて動的にバリアントを変更するには？

ステータス値に基づいてバリアントをマッピングします。

```tsx
import { Badge } from '@hidearea-design/react';

type Status = 'draft' | 'pending' | 'approved' | 'rejected' | 'published';

const STATUS_CONFIG: Record<Status, { variant: string; label: string; styleType: string }> = {
  draft: { variant: 'secondary', label: '下書き', styleType: 'soft' },
  pending: { variant: 'warning', label: '承認待ち', styleType: 'soft' },
  approved: { variant: 'info', label: '承認済み', styleType: 'soft' },
  rejected: { variant: 'error', label: '却下', styleType: 'filled' },
  published: { variant: 'success', label: '公開中', styleType: 'soft' },
};

function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge
      variant={config.variant as any}
      styleType={config.styleType as any}
    >
      {config.label}
    </Badge>
  );
}

// 使用例
<StatusBadge status="published" />
```

### カウンターバッジを実装するには？

数値を表示するバッジパターンです。

```tsx
import { Badge } from '@hidearea-design/react';

interface CounterBadgeProps {
  count: number;
  max?: number;
  variant?: string;
}

function CounterBadge({ count, max = 99, variant = 'error' }: CounterBadgeProps) {
  const displayCount = count > max ? `${max}+` : count;

  if (count === 0) {
    return null; // 0件の場合は表示しない
  }

  return (
    <Badge variant={variant as any} size="sm" styleType="filled">
      {displayCount}
    </Badge>
  );
}

// 使用例
function NotificationButton() {
  const [unreadCount, setUnreadCount] = useState(12);

  return (
    <ha-button variant="ghost" style={{ position: 'relative' }}>
      通知
      {unreadCount > 0 && (
        <CounterBadge
          count={unreadCount}
          max={99}
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
          }}
        />
      )}
    </ha-button>
  );
}
```

### 複数のバッジをグループ化するには？

タグのように複数のバッジを並べる場合のパターンです。

```tsx
import { Badge } from '@hidearea-design/react';

interface TagListProps {
  tags: string[];
  onRemove?: (tag: string) => void;
}

function TagList({ tags, onRemove }: TagListProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          styleType="outlined"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {tag}
          {onRemove && (
            <button
              onClick={() => onRemove(tag)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '0',
                marginLeft: '4px',
              }}
              aria-label={`${tag}を削除`}
            >
              ×
            </button>
          )}
        </Badge>
      ))}
    </div>
  );
}

// 使用例
function App() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Vite']);

  const handleRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return <TagList tags={tags} onRemove={handleRemove} />;
}
```

### アニメーション付きバッジを作成するには？

パルスアニメーションやフェードインなどのアニメーションを追加できます。

```css
/* パルスアニメーション（重要な通知） */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

ha-badge.pulse::part(badge) {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* フェードインアニメーション */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

ha-badge.fade-in::part(badge) {
  animation: fadeIn 300ms ease-out;
}

/* バウンスアニメーション（新着通知） */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

ha-badge.bounce::part(badge) {
  animation: bounce 600ms ease-in-out;
}
```

```tsx
// Reactでの使用例
function AnimatedBadge({ children, animation }: { children: React.ReactNode; animation?: string }) {
  return (
    <Badge
      variant="error"
      className={animation}
    >
      {children}
    </Badge>
  );
}

<AnimatedBadge animation="pulse">3</AnimatedBadge>
```

## 関連コンポーネント

- [Button](/components/button) - バッジと組み合わせてカウンター表示
- [Card](/components/card) - カードヘッダーにバッジを配置
- [Alert](/components/alert) - より詳細なステータスメッセージ

## API リファレンス

詳細なAPI仕様については、型定義ファイルを参照してください：

```typescript
import type { BadgeProps } from '@hidearea-design/core';

interface BadgeProps {
  /**
   * バリアント
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * スタイルタイプ
   * @default 'filled'
   */
  styleType?: 'filled' | 'outlined' | 'soft';

  /**
   * サイズバリアント
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}
```

## トラブルシューティング

### バッジが親要素からはみ出る

**問題**: バッジのテキストが長い場合、親要素の幅を超えてはみ出る

**原因**: バッジは `display: inline` でテキストを折り返さない

**解決策**:
```css
/* 方法1: テキストを短くする（推奨） */
<ha-badge>完了</ha-badge>  /* Good ✓ */
<ha-badge>このタスクは完了しました</ha-badge>  /* Bad ✗ */

/* 方法2: 最大幅を設定してテキストを省略 */
ha-badge::part(badge) {
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 方法3: 複数行を許可 */
ha-badge::part(badge) {
  white-space: normal;
  display: inline-block;
  max-width: 150px;
}
```

### カウンターバッジの位置調整がうまくいかない

**問題**: ボタンの右上に配置したカウンターバッジの位置が意図通りにならない

**原因**: 親要素に `position: relative` が設定されていない

**解決策**:
```html
<!-- Bad ✗: 親要素にposition指定なし -->
<ha-button>
  通知
  <ha-badge style="position: absolute; top: 0; right: 0;">3</ha-badge>
</ha-button>

<!-- Good ✓: 親要素をラップして position: relative を設定 -->
<div style="position: relative; display: inline-block;">
  <ha-button>通知</ha-button>
  <ha-badge
    variant="error"
    size="sm"
    style="position: absolute; top: -8px; right: -8px;"
  >
    3
  </ha-badge>
</div>
```

### バッジの色が期待通りに表示されない

**問題**: カスタムCSS変数を設定しても色が変わらない

**原因**: バリアントとstyle-typeの組み合わせで異なるCSS変数が使用される

**解決策**:
```css
/* Bad ✗: 汎用的な変数は効かない */
ha-badge {
  --badge-bg: red;  /* このような変数は存在しない */
}

/* Good ✓: バリアントとstyle-typeごとの変数を設定 */
ha-badge[variant="primary"][style-type="filled"] {
  --badge-primary-filled-bg: #3b82f6;
  --badge-primary-filled-text: white;
}

ha-badge[variant="primary"][style-type="soft"] {
  --badge-primary-soft-bg: #dbeafe;
  --badge-primary-soft-text: #1e40af;
}

ha-badge[variant="primary"][style-type="outlined"] {
  --badge-primary-outlined-border: #3b82f6;
  --badge-primary-outlined-text: #2563eb;
}
```

### 複数のバッジの垂直位置が揃わない

**問題**: サイズの異なるバッジを並べると、垂直方向の位置が揃わない

**原因**: デフォルトの `vertical-align` 設定

**解決策**:
```css
/* すべてのバッジを垂直中央揃えに */
ha-badge {
  vertical-align: middle;
}

/* または、親要素でflexboxを使用 */
.badge-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
```

```html
<div class="badge-container">
  <ha-badge size="sm">Small</ha-badge>
  <ha-badge size="md">Medium</ha-badge>
  <ha-badge size="lg">Large</ha-badge>
</div>
```
