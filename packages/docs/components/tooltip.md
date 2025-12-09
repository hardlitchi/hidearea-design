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

### ARIAサポート

Tooltip コンポーネントは、WCAG 2.1 AA に準拠したアクセシビリティ機能を提供します：

- **role="tooltip"**: ツールチップ要素に自動的に設定されます
- **aria-describedby**: トリガー要素とツールチップを関連付けます
- **aria-live="polite"**: スクリーンリーダーが内容の変更を通知します
- **id**: 一意の ID が自動生成され、関連付けに使用されます

```html
<!-- Good ✓: 適切な ARIA 属性が自動設定される -->
<ha-tooltip content="保存する">
  <ha-button id="save-btn" aria-describedby="tooltip-save-btn">
    保存
  </ha-button>
</ha-tooltip>

<!-- Good ✓: アイコンボタンには aria-label を追加 -->
<ha-tooltip content="設定を開く">
  <ha-button variant="ghost" aria-label="設定">⚙️</ha-button>
</ha-tooltip>

<!-- Good ✓: 装飾的でない重要情報にはaria-labelを使用 -->
<ha-tooltip content="必須項目です">
  <ha-input required aria-label="メールアドレス (必須)" />
</ha-tooltip>
```

### キーボード操作

| キー | アクション |
|------|----------|
| `Escape` | 表示中のツールチップを閉じる |
| `Tab` | フォーカス可能な要素にフォーカス（trigger="focus" の場合、ツールチップを表示） |
| `Enter` / `Space` | trigger="click" の場合、ツールチップを表示/非表示 |

### スクリーンリーダー

主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）での動作：

1. **ツールチップの表示時**:
   - "ツールチップ: [内容]" と読み上げられます
   - トリガー要素のラベルと併せて読み上げられます

2. **重要な注意点**:
   - ツールチップの内容は補足情報として扱われるため、重要な情報はツールチップだけに頼らない
   - 代替手段（aria-label、visible text）も提供する

```tsx
// Good ✓: 重要な情報は視覚的にも表示
import { Tooltip, FormGroup, Input } from '@hidearea-design/react';

function AccessibleForm() {
  return (
    <FormGroup label="パスワード" required>
      <Input type="password" aria-describedby="password-requirements" />
      <Tooltip content="8文字以上、大文字・小文字・数字を含む">
        <span id="password-requirements" className="form-hint">
          パスワード要件を表示
        </span>
      </Tooltip>
    </FormGroup>
  );
}
```

### フォーカス管理

```tsx
// Good ✓: 無効化されたボタンへのTooltip
import { Tooltip, Button } from '@hidearea-design/react';

function DisabledButtonTooltip() {
  // 無効化されたボタンはイベントを受け取らないため、ラッパーが必要
  return (
    <Tooltip content="この操作は権限が必要です">
      <span tabIndex={0}> {/* フォーカス可能にする */}
        <Button disabled>実行</Button>
      </span>
    </Tooltip>
  );
}
```

## スタイルのカスタマイズ

### デザイントークン

Tooltip コンポーネントは、デザインシステムのセマンティックトークンを使用しています：

```css
--ha-tooltip-bg: var(--ha-color-neutral-900);
--ha-tooltip-color: var(--ha-color-white);
--ha-tooltip-border: none;
--ha-tooltip-shadow: var(--ha-shadow-lg);
```

### カスタムCSS変数

Tooltip コンポーネントでカスタマイズ可能な CSS 変数：

```css
ha-tooltip {
  /* カラー */
  --tooltip-bg: var(--ha-color-neutral-900);
  --tooltip-color: var(--ha-color-white);

  /* レイアウト */
  --tooltip-padding: 8px 12px;
  --tooltip-border-radius: var(--ha-radius-sm);
  --tooltip-max-width: 200px;
  --tooltip-min-height: 32px;

  /* タイポグラフィ */
  --tooltip-font-size: var(--ha-font-size-sm);
  --tooltip-font-weight: var(--ha-font-weight-normal);
  --tooltip-line-height: var(--ha-line-height-normal);

  /* エフェクト */
  --tooltip-box-shadow: var(--ha-shadow-lg);
  --tooltip-z-index: 9999;
  --tooltip-arrow-size: 6px;

  /* アニメーション */
  --tooltip-transition-duration: 0.2s;
  --tooltip-transition-easing: ease-out;
}
```

### Shadow DOMパーツ

`::part()` セレクターを使用して Shadow DOM 内の要素をスタイリングできます：

```css
/* ツールチップコンテナ */
ha-tooltip::part(tooltip) {
  background: linear-gradient(135deg, var(--ha-color-neutral-800), var(--ha-color-neutral-900));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
}

/* ツールチップの矢印 */
ha-tooltip::part(arrow) {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* ツールチップのテキスト */
ha-tooltip::part(content) {
  font-weight: 500;
}

/* カスタム例: 成功メッセージ風のツールチップ */
ha-tooltip.success::part(tooltip) {
  background: var(--ha-color-success-600);
  color: var(--ha-color-white);
}

/* カスタム例: 警告メッセージ風のツールチップ */
ha-tooltip.warning::part(tooltip) {
  background: var(--ha-color-warning-500);
  color: var(--ha-color-neutral-900);
}
```

## ベストプラクティス

### Do's ✓

```html
<!-- Good ✓: 簡潔で分かりやすい説明 -->
<ha-tooltip content="保存する">
  <ha-button>💾</ha-button>
</ha-tooltip>

<!-- Good ✓: アイコンボタンには必ずツールチップを追加 -->
<ha-stack direction="horizontal" gap="2">
  <ha-tooltip content="編集"><ha-button variant="ghost">✏️</ha-button></ha-tooltip>
  <ha-tooltip content="削除"><ha-button variant="ghost">🗑️</ha-button></ha-tooltip>
  <ha-tooltip content="共有"><ha-button variant="ghost">📤</ha-button></ha-tooltip>
</ha-stack>

<!-- Good ✓: 適切な配置を選択（画面端では自動調整） -->
<ha-tooltip content="上部に表示" placement="top">
  <ha-button>ボタン</ha-button>
</ha-tooltip>

<!-- Good ✓: フォーカス可能な要素でトリガー -->
<ha-tooltip content="詳細情報">
  <button tabindex="0">ℹ️</button>
</ha-tooltip>

<!-- Good ✓: 適切な trigger 選択 -->
<!-- ホバーで補足情報 -->
<ha-tooltip content="ユーザー名" trigger="hover">
  <span>👤</span>
</ha-tooltip>

<!-- フォーカスで入力ヒント -->
<ha-tooltip content="半角英数字のみ" trigger="focus">
  <ha-input />
</ha-tooltip>
```

### Don'ts ✗

```html
<!-- Bad ✗: 長すぎる説明文 -->
<ha-tooltip content="これは非常に長いツールチップで、複数の段落にわたる詳細な説明が含まれており、ユーザーにとって読みにくくなっています...">
  <ha-button>詳細</ha-button>
</ha-tooltip>
<!-- 代わりに: Modal やポップオーバーを使用 -->
<ha-button onclick="showDetailModal()">詳細を見る</ha-button>

<!-- Bad ✗: 重要な情報をツールチップだけで提供 -->
<ha-tooltip content="必須項目です">
  <ha-input />
</ha-tooltip>
<!-- 代わりに: 視覚的な表示も追加 -->
<ha-form-group label="メールアドレス" required>
  <ha-input />
</ha-form-group>

<!-- Bad ✗: ツールチップの中にインタラクティブ要素 -->
<ha-tooltip content="<a href='/help'>ヘルプを見る</a>">
  <ha-button>?</ha-button>
</ha-tooltip>
<!-- 代わりに: ポップオーバーやドロップダウンを使用 -->

<!-- Bad ✗: ツールチップが多すぎる -->
<p>
  <ha-tooltip content="説明1"><span>単語1</span></ha-tooltip>
  <ha-tooltip content="説明2"><span>単語2</span></ha-tooltip>
  <ha-tooltip content="説明3"><span>単語3</span></ha-tooltip>
  <!-- ... -->
</p>
<!-- 代わりに: 用語集ページへのリンクを提供 -->
```

## よくある質問

### 動的なツールチップコンテンツを表示するには？

状態に応じてツールチップの内容を変更できます：

```tsx
import { Tooltip, Button } from '@hidearea-design/react';
import { useState } from 'react';

function DynamicTooltip() {
  const [count, setCount] = useState(0);
  const [lastClicked, setLastClicked] = useState<Date | null>(null);

  const handleClick = () => {
    setCount(count + 1);
    setLastClicked(new Date());
  };

  const tooltipContent = lastClicked
    ? `クリック数: ${count} (最終: ${lastClicked.toLocaleTimeString()})`
    : 'まだクリックされていません';

  return (
    <Tooltip content={tooltipContent} placement="top">
      <Button onClick={handleClick}>クリック</Button>
    </Tooltip>
  );
}
```

Vue での実装例：

```vue
<template>
  <HaTooltip :content="tooltipContent" placement="top">
    <HaButton @click="handleClick">クリック</HaButton>
  </HaTooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Tooltip as HaTooltip, Button as HaButton } from '@hidearea-design/vue';

const count = ref(0);
const lastClicked = ref<Date | null>(null);

const tooltipContent = computed(() => {
  if (!lastClicked.value) {
    return 'まだクリックされていません';
  }
  return `クリック数: ${count.value} (最終: ${lastClicked.value.toLocaleTimeString()})`;
});

function handleClick() {
  count.value++;
  lastClicked.value = new Date();
}
</script>
```

### 表示/非表示を制御するには？

プログラムでツールチップの表示状態を制御する例：

```tsx
import { Tooltip, Button } from '@hidearea-design/react';
import { useState } from 'react';

function ControlledTooltip() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Tooltip
        content="制御されたツールチップ"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Button>ホバーまたはクリック</Button>
      </Tooltip>

      <div style={{ marginTop: '12px' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '閉じる' : '開く'}
        </Button>
      </div>
    </div>
  );
}
```

### リッチな内容のツールチップを実装するには？

HTML を含む複雑なツールチップの実装例：

```tsx
import { Tooltip, Badge } from '@hidearea-design/react';

function RichTooltip() {
  const tooltipContent = (
    <div style={{ padding: '4px' }}>
      <strong>ユーザーステータス</strong>
      <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
        <li>アクティブユーザー: 245</li>
        <li>新規登録: 12</li>
        <li>オフライン: 8</li>
      </ul>
    </div>
  );

  return (
    <Tooltip content={tooltipContent} placement="right" trigger="click">
      <Badge variant="primary" styleType="soft">
        ユーザー統計
      </Badge>
    </Tooltip>
  );
}
```

**注意**: 複雑な内容や、インタラクティブな要素が必要な場合は、Popover や Dropdown コンポーネントの使用を検討してください。

### 遅延表示を実装するには？

ホバー後、一定時間経過してからツールチップを表示する例：

```tsx
import { Tooltip, Button } from '@hidearea-design/react';
import { useState, useRef, useEffect } from 'react';

function DelayedTooltip({ delay = 500, children, content, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <Tooltip content={content} open={isOpen} trigger="manual" {...props}>
        {children}
      </Tooltip>
    </div>
  );
}

// 使用例
function App() {
  return (
    <DelayedTooltip content="500ms後に表示" delay={500}>
      <Button>ホバーしてください</Button>
    </DelayedTooltip>
  );
}
```

## 関連コンポーネント

- [Popover](/components/popover) - インタラクティブな内容を表示するオーバーレイ
- [Dropdown](/components/dropdown) - 選択肢を表示するメニュー
- [Badge](/components/badge) - ステータスやカウントの表示

## API リファレンス

```typescript
interface TooltipProps {
  /**
   * ツールチップのコンテンツ
   * @required
   */
  content: string | ReactNode;

  /**
   * 配置位置
   * @default 'top'
   */
  placement?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';

  /**
   * トリガーモード
   * @default 'hover'
   */
  trigger?: 'hover' | 'focus' | 'click' | 'manual';

  /**
   * 表示状態（trigger="manual" の場合に使用）
   */
  open?: boolean;

  /**
   * 表示状態が変更された時のコールバック
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * 表示遅延（ミリ秒）
   * @default 0
   */
  delay?: number;

  /**
   * 矢印を表示するか
   * @default true
   */
  showArrow?: boolean;

  /**
   * カスタムクラス名
   */
  className?: string;

  /**
   * トリガー要素
   */
  children: ReactNode;
}

interface TooltipEvents {
  /**
   * ツールチップが表示された時に発火
   */
  show: CustomEvent<void>;

  /**
   * ツールチップが非表示になった時に発火
   */
  hide: CustomEvent<void>;
}
```

## トラブルシューティング

### 問題: ツールチップが表示されない

**原因:**
- トリガー要素がフォーカス不可能（`trigger="focus"` の場合）
- CSS で `pointer-events: none` が設定されている
- z-index が低い

**解決策:**

```tsx
// Bad ✗: フォーカス不可能な要素でfocusトリガー
<Tooltip content="説明" trigger="focus">
  <div>テキスト</div>
</Tooltip>

// Good ✓: フォーカス可能な要素を使用
<Tooltip content="説明" trigger="focus">
  <button>ボタン</button>
</Tooltip>

// Good ✓: divをフォーカス可能にする
<Tooltip content="説明" trigger="focus">
  <div tabIndex={0}>テキスト</div>
</Tooltip>

// Good ✓: z-indexを調整
<style>
  ha-tooltip {
    --tooltip-z-index: 10000;
  }
</style>
```

### 問題: 無効化されたボタンでツールチップが動作しない

**原因:**
- 無効化された要素は pointer events を受け取らない

**解決策:**

```tsx
// Bad ✗: 無効化されたボタンに直接適用
<Tooltip content="権限が必要です">
  <Button disabled>実行</Button>
</Tooltip>

// Good ✓: ラッパー要素でツールチップを有効化
<Tooltip content="権限が必要です">
  <span style={{ display: 'inline-block', cursor: 'not-allowed' }}>
    <Button disabled style={{ pointerEvents: 'none' }}>
      実行
    </Button>
  </span>
</Tooltip>

// Good ✓: カスタムフック化
function useDisabledTooltip() {
  const wrapperStyle: React.CSSProperties = {
    display: 'inline-block',
    cursor: 'not-allowed',
  };

  const buttonStyle: React.CSSProperties = {
    pointerEvents: 'none',
  };

  return { wrapperStyle, buttonStyle };
}

function Component() {
  const { wrapperStyle, buttonStyle } = useDisabledTooltip();

  return (
    <Tooltip content="権限が必要です">
      <span style={wrapperStyle}>
        <Button disabled style={buttonStyle}>
          実行
        </Button>
      </span>
    </Tooltip>
  );
}
```

### 問題: ツールチップが画面外に表示される

**原因:**
- 配置位置が不適切
- 自動調整機能が無効化されている

**解決策:**

```tsx
// Bad ✗: 画面端で固定配置
<div style={{ position: 'absolute', right: 0 }}>
  <Tooltip content="説明" placement="right">
    <Button>ボタン</Button>
  </Tooltip>
</div>

// Good ✓: 自動調整を有効化（デフォルト）
<div style={{ position: 'absolute', right: 0 }}>
  <Tooltip
    content="説明"
    placement="right"
    autoAdjust={true} // 画面外なら自動で左に表示
  >
    <Button>ボタン</Button>
  </Tooltip>
</div>

// Good ✓: 適切な配置を選択
<div style={{ position: 'absolute', right: 0 }}>
  <Tooltip content="説明" placement="left"> {/* 最初から左配置 */}
    <Button>ボタン</Button>
  </Tooltip>
</div>
```

### 問題: モバイルでツールチップが使いにくい

**原因:**
- モバイルデバイスではホバーイベントが正しく機能しない
- タッチ後にツールチップが残り続ける

**解決策:**

```tsx
// Good ✓: モバイル対応のツールチップ
import { Tooltip, Button } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function MobileResponsiveTooltip({ content, children, ...props }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // モバイルではクリックトリガー、デスクトップではホバー
  const trigger = isMobile ? 'click' : 'hover';

  return (
    <Tooltip content={content} trigger={trigger} {...props}>
      {children}
    </Tooltip>
  );
}

// 使用例
function App() {
  return (
    <MobileResponsiveTooltip content="保存する">
      <Button>💾</Button>
    </MobileResponsiveTooltip>
  );
}
```

## 配置オプション一覧

| 配置 | 説明 | 推奨用途 |
|------|------|---------|
| `top` | 上中央 | 標準的な配置、最も読みやすい |
| `top-start` | 上左 | 左寄せのコンテンツ |
| `top-end` | 上右 | 右寄せのコンテンツ |
| `right` | 右中央 | 左側に十分なスペースがない場合 |
| `right-start` | 右上 | 上部右側の配置 |
| `right-end` | 右下 | 下部右側の配置 |
| `bottom` | 下中央 | ナビゲーションやヘッダー要素 |
| `bottom-start` | 下左 | 下部左寄せ |
| `bottom-end` | 下右 | 下部右寄せ |
| `left` | 左中央 | 右側に十分なスペースがない場合 |
| `left-start` | 左上 | 上部左側の配置 |
| `left-end` | 左下 | 下部左側の配置 |

## トリガー別の使い分け

| トリガー | 用途 | 例 | 推奨デバイス |
|---------|------|-----|------------|
| `hover` | 補足情報の表示 | アイコン説明、ヘルプテキスト、ステータス情報 | デスクトップ |
| `focus` | フォーム要素の説明 | 入力フィールドのヒント、バリデーションルール | すべて |
| `click` | インタラクティブな情報 | 詳細情報、統計データ、動的コンテンツ | モバイル、デスクトップ |
| `manual` | プログラム制御 | カスタムロジック、複雑な条件分岐 | カスタム実装 |
