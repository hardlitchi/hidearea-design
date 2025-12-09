# Progress

プログレスバーコンポーネント。3つのバリアントをサポートします。

## 基本的な使い方

```html
<ha-progress value="50" max="100"></ha-progress>
```

## バリアント

3種類のバリアントが利用可能です：

### Default

```html
<ha-progress variant="default" value="60" max="100"></ha-progress>
```

### Striped（ストライプ）

```html
<ha-progress variant="striped" value="60" max="100"></ha-progress>
```

### Animated（アニメーション）

```html
<ha-progress variant="animated" value="60" max="100"></ha-progress>
```

## カラー

```html
<ha-progress color="primary" value="60" max="100"></ha-progress>
<ha-progress color="success" value="60" max="100"></ha-progress>
<ha-progress color="warning" value="60" max="100"></ha-progress>
<ha-progress color="error" value="60" max="100"></ha-progress>
```

## サイズ

```html
<ha-progress size="sm" value="60" max="100"></ha-progress>
<ha-progress size="md" value="60" max="100"></ha-progress>
<ha-progress size="lg" value="60" max="100"></ha-progress>
```

## ラベル表示

```html
<ha-progress value="75" max="100" show-label></ha-progress>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `value` | `number` | `0` | 現在の値 |
| `max` | `number` | `100` | 最大値 |
| `variant` | `'default' \| 'striped' \| 'animated'` | `'default'` | バリアント |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | カラー |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | サイズ |
| `show-label` | `boolean` | `false` | ラベル表示 |

## React

```tsx
import { Progress } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Progress value={progress} max={100} showLabel />
  );
}
```

## Vue

```vue
<template>
  <HaProgress :value="progress" :max="100" show-label />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Progress as HaProgress } from '@hidearea-design/vue';

const progress = ref(0);
let interval: number;

onMounted(() => {
  interval = setInterval(() => {
    progress.value = progress.value >= 100 ? 0 : progress.value + 10;
  }, 500);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>
```

## 使用例

### ファイルアップロード

```tsx
import { Progress, Stack, Button } from '@hidearea-design/react';
import { useState } from 'react';

function FileUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Stack direction="vertical" gap="3">
      <h3>ファイルアップロード</h3>
      <Progress
        value={progress}
        max={100}
        color={progress === 100 ? 'success' : 'primary'}
        showLabel
      />
      <Button
        variant="primary"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'アップロード中...' : 'アップロード'}
      </Button>
    </Stack>
  );
}
```

### ステップ進捗

```tsx
import { Progress, Stack, Button, Badge } from '@hidearea-design/react';
import { useState } from 'react';

function StepProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    { label: 'アカウント情報' },
    { label: 'プロフィール' },
    { label: '確認' },
    { label: '完了' },
  ];

  const progress = (currentStep / totalSteps) * 100;

  return (
    <Stack direction="vertical" gap="4">
      <h3>ステップ {currentStep} / {totalSteps}</h3>

      <Progress value={progress} max={100} color="primary" />

      <Stack direction="horizontal" gap="2" justify="space-between">
        {steps.map((step, index) => (
          <Badge
            key={index}
            variant={index < currentStep ? 'success' : 'secondary'}
            styleType="soft"
          >
            {step.label}
          </Badge>
        ))}
      </Stack>

      <Stack direction="horizontal" gap="2">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          戻る
        </Button>
        <Button
          variant="primary"
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
        >
          次へ
        </Button>
      </Stack>
    </Stack>
  );
}
```

### スキルレベル

```html
<ha-stack direction="vertical" gap="3">
  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span>JavaScript</span>
      <span>90%</span>
    </div>
    <ha-progress value="90" max="100" color="primary"></ha-progress>
  </div>

  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span>TypeScript</span>
      <span>85%</span>
    </div>
    <ha-progress value="85" max="100" color="primary"></ha-progress>
  </div>

  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span>React</span>
      <span>80%</span>
    </div>
    <ha-progress value="80" max="100" color="success"></ha-progress>
  </div>

  <div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span>Vue</span>
      <span>75%</span>
    </div>
    <ha-progress value="75" max="100" color="success"></ha-progress>
  </div>
</ha-stack>
```

### ストレージ使用量

```tsx
import { Progress, Card, Stack, Badge } from '@hidearea-design/react';

function StorageUsage() {
  const used = 8.5; // GB
  const total = 10; // GB
  const percentage = (used / total) * 100;

  const getColor = () => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'primary';
  };

  return (
    <Card variant="outlined">
      <Stack direction="vertical" gap="3">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>ストレージ使用量</h3>
          <Badge variant={getColor() as any} styleType="soft">
            {percentage.toFixed(1)}%
          </Badge>
        </div>

        <Progress
          value={percentage}
          max={100}
          color={getColor() as any}
          variant="striped"
        />

        <p style={{ fontSize: '14px', color: 'var(--color-gray-600)' }}>
          {used} GB / {total} GB 使用中
        </p>
      </Stack>
    </Card>
  );
}
```

### タスク進捗

```tsx
import { Progress, Card, Stack, Checkbox } from '@hidearea-design/react';
import { useState } from 'react';

interface Task {
  id: number;
  label: string;
  completed: boolean;
}

function TaskProgress() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, label: 'デザイン作成', completed: true },
    { id: 2, label: 'コーディング', completed: true },
    { id: 3, label: 'テスト', completed: false },
    { id: 4, label: 'デプロイ', completed: false },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  const handleToggle = (id: number) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Card variant="outlined">
      <Stack direction="vertical" gap="3">
        <h3>プロジェクト進捗</h3>

        <Progress
          value={progress}
          max={100}
          color={progress === 100 ? 'success' : 'primary'}
          variant="animated"
          showLabel
        />

        <p style={{ fontSize: '14px', color: 'var(--color-gray-600)' }}>
          {completedCount} / {tasks.length} タスク完了
        </p>

        <Stack direction="vertical" gap="2">
          {tasks.map((task) => (
            <Checkbox
              key={task.id}
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            >
              {task.label}
            </Checkbox>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
```

### 不確定プログレス

```html
<!-- 値が不明な場合 -->
<ha-progress variant="animated" value="100" max="100"></ha-progress>
```

## アクセシビリティ

Progress コンポーネントは WCAG 2.1 AA 基準に準拠し、すべてのユーザーがアクセス可能な進捗表示を提供します。

### ARIAサポート

Progress コンポーネントは WAI-ARIA の Progressbar パターンに準拠しており、以下のARIA属性をサポートします：

```html
<ha-progress
  role="progressbar"
  aria-label="ファイルアップロード進捗"
  aria-valuenow="50"
  aria-valuemin="0"
  aria-valuemax="100"
  value="50"
  max="100"
></ha-progress>
```

| ARIA属性 | 説明 | 設定値 |
|---------|------|-------|
| `role` | プログレスバーの役割を示す | `progressbar` (自動設定) |
| `aria-label` | プログレスバーの目的を説明 | 必須：進捗の内容を明示 |
| `aria-valuenow` | 現在の値 | `value` プロパティから自動設定 |
| `aria-valuemin` | 最小値 | `0` (自動設定) |
| `aria-valuemax` | 最大値 | `max` プロパティから自動設定 |
| `aria-valuetext` | 値のテキスト表現（オプション） | 例：「50パーセント完了」 |
| `aria-live` | 不確定プログレス用の更新通知 | `polite` または `assertive` |
| `aria-busy` | 処理中状態を示す | `true` または `false` |

### キーボード操作

プログレスバーは読み取り専用のコンポーネントのため、キーボード操作は提供されません。スクリーンリーダーによる読み上げに対応しています。

### スクリーンリーダー

スクリーンリーダーは以下のように読み上げます：

```html
<!-- 確定プログレス -->
<ha-progress
  value="60"
  max="100"
  aria-label="ファイルのダウンロード"
></ha-progress>
```

**読み上げ例**：「ファイルのダウンロード プログレスバー 60パーセント」

```html
<!-- パーセンテージ表示付き -->
<ha-progress
  value="75"
  max="100"
  show-label
  aria-label="アップロード進捗"
></ha-progress>
```

**読み上げ例**：「アップロード進捗 プログレスバー 75パーセント」

```html
<!-- 不確定プログレス -->
<ha-progress
  variant="animated"
  value="100"
  max="100"
  aria-label="処理中"
  aria-live="polite"
  aria-busy="true"
></ha-progress>
```

**読み上げ例**：「処理中 プログレスバー ビジー」

### フォーカス管理

プログレスバー自体はインタラクティブではないため、フォーカスを受け取りません。ただし、進捗に関連するアクション（キャンセルボタンなど）を提供する場合は、適切なフォーカス管理を行ってください：

```tsx
import { Progress, Stack, Button } from '@hidearea-design/react';
import { useState, useRef } from 'react';

function AccessibleFileUpload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const handleUpload = () => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // アップロード開始時にキャンセルボタンにフォーカス
    setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 100);
  };

  return (
    <Stack direction="vertical" gap="3">
      <Progress
        value={progress}
        max={100}
        aria-label="ファイルアップロード進捗"
        showLabel
      />
      {uploading && (
        <Button
          ref={cancelButtonRef}
          variant="outline"
          onClick={() => setUploading(false)}
          aria-label="アップロードをキャンセル"
        >
          キャンセル
        </Button>
      )}
      {!uploading && (
        <Button variant="primary" onClick={handleUpload}>
          アップロード開始
        </Button>
      )}
    </Stack>
  );
}
```

### ライブリージョンの使用

動的に変化する進捗には `aria-live` を使用してスクリーンリーダーに更新を通知します：

```tsx
import { Progress } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function LiveProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('準備中');

  useEffect(() => {
    if (progress === 0) setStatus('準備中');
    else if (progress < 100) setStatus(`処理中 ${progress}%完了`);
    else setStatus('完了');
  }, [progress]);

  return (
    <>
      <Progress
        value={progress}
        max={100}
        aria-label="データ処理進捗"
        showLabel
      />
      {/* スクリーンリーダー用の状態通知 */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', left: '-10000px' }}
      >
        {status}
      </div>
    </>
  );
}
```

## スタイルのカスタマイズ

Progress コンポーネントのスタイルは、デザイントークン、CSS変数、Shadow DOMパーツを使用してカスタマイズできます。

### デザイントークン

Progress コンポーネントは以下のセマンティックトークンを使用します：

```css
:root {
  /* 高さ */
  --progress-height-sm: 4px;
  --progress-height-md: 8px;
  --progress-height-lg: 12px;

  /* 背景色 */
  --progress-bg: var(--color-gray-200);
  --progress-border-radius: var(--radius-sm);

  /* バーの色 */
  --progress-bar-primary: var(--color-primary-500);
  --progress-bar-success: var(--color-success-500);
  --progress-bar-warning: var(--color-warning-500);
  --progress-bar-error: var(--color-error-500);

  /* アニメーション */
  --progress-transition: width 0.3s ease;
  --progress-stripe-size: 1rem;
  --progress-animation-duration: 1s;
}
```

### カスタムCSS変数

CSS変数を使用して、個別のProgressコンポーネントをカスタマイズできます：

```html
<ha-progress
  value="60"
  max="100"
  style="
    --progress-height: 16px;
    --progress-border-radius: 8px;
    --progress-bg: #e0e0e0;
    --progress-bar-bg: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  "
></ha-progress>
```

### グラデーションバー

グラデーションを使用したプログレスバー：

```tsx
import { Progress } from '@hidearea-design/react';

function GradientProgress() {
  return (
    <Progress
      value={75}
      max={100}
      showLabel
      style={{
        '--progress-bar-bg': 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)'
      } as React.CSSProperties}
    />
  );
}
```

### Shadow DOMパーツ

`::part()` セレクターを使用して、Shadow DOM内の特定の要素をスタイリングできます：

```css
/* プログレスバーのコンテナ */
ha-progress::part(base) {
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* プログレスバー */
ha-progress::part(bar) {
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
}

/* ラベル */
ha-progress::part(label) {
  font-weight: 600;
  color: #333;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}
```

### カスタムアニメーション

アニメーション付きのカスタムプログレスバー：

```css
@keyframes custom-progress-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 0;
  }
}

ha-progress[variant="animated"]::part(bar) {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 40px 40px;
  animation: custom-progress-animation 2s linear infinite;
}
```

### テーマ別のカスタマイズ

ダークモード対応のプログレスバー：

```css
/* ライトモード */
ha-progress {
  --progress-bg: var(--color-gray-200);
  --progress-bar-primary: var(--color-primary-500);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  ha-progress {
    --progress-bg: var(--color-gray-700);
    --progress-bar-primary: var(--color-primary-400);
  }

  ha-progress::part(label) {
    color: var(--color-gray-100);
  }
}
```

## ベストプラクティス

### ✓ 推奨される使い方

#### 明確なラベルを提供する

```tsx
// Good: 進捗の目的を明示
<Progress
  value={60}
  max={100}
  aria-label="ファイルアップロード進捗"
  showLabel
/>
```

```tsx
// Bad: ラベルなし
<Progress value={60} max={100} />
```

**理由**: スクリーンリーダーユーザーが進捗の目的を理解できません。`aria-label` で進捗の内容を明示してください。

#### 適切なカラーを使用する

```tsx
// Good: 状態に応じたカラー
function StorageProgress({ used, total }: { used: number; total: number }) {
  const percentage = (used / total) * 100;

  const getColor = () => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'primary';
  };

  return (
    <Progress
      value={percentage}
      max={100}
      color={getColor()}
      aria-label={`ストレージ使用量 ${percentage.toFixed(1)}%`}
      showLabel
    />
  );
}
```

```tsx
// Bad: 常に同じカラー
<Progress value={95} max={100} color="primary" showLabel />
```

**理由**: カラーは状態を視覚的に伝える重要な手段です。警告やエラー状態を適切なカラーで表現してください。

#### 長時間の処理には不確定プログレスを使用

```tsx
// Good: 完了時間が不明な場合
<Progress
  variant="animated"
  value={100}
  max={100}
  aria-label="データを処理しています"
  aria-live="polite"
  aria-busy="true"
/>
```

```tsx
// Bad: 推測値でプログレスを表示
<Progress value={50} max={100} aria-label="処理中" />
```

**理由**: 正確な進捗が不明な場合、不正確な値を表示するとユーザーを混乱させます。不確定プログレスを使用してください。

#### パーセンテージを表示する

```tsx
// Good: ユーザーに正確な情報を提供
<Progress
  value={75}
  max={100}
  showLabel
  aria-label="ダウンロード進捗"
/>
```

```tsx
// Bad: 視覚的な手がかりのみ
<Progress value={75} max={100} aria-label="ダウンロード進捗" />
```

**理由**: パーセンテージを表示することで、ユーザーは進捗状況を正確に把握できます。

### ✗ 避けるべき使い方

#### 小さな変化を頻繁に更新しない

```tsx
// Bad: 1%ごとに更新
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => prev + 1);
  }, 100);
  return () => clearInterval(interval);
}, []);
```

```tsx
// Good: 意味のある変化で更新（5-10%ごと）
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => Math.min(prev + 10, 100));
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

**代替案**: 更新頻度を抑えることで、パフォーマンスを改善し、スクリーンリーダーユーザーへの通知を減らせます。

#### プログレスバーを装飾目的で使用しない

```tsx
// Bad: 装飾として使用
<Progress value={100} max={100} color="primary" />
<h2>セクションタイトル</h2>
```

```tsx
// Good: 実際の進捗を表示
<Progress value={taskProgress} max={100} aria-label="タスク進捗" showLabel />
```

**代替案**: 装飾が必要な場合は、CSSのボーダーや区切り線を使用してください。

#### aria-labelなしで複数のプログレスバーを使用しない

```tsx
// Bad: 識別できない複数のプログレスバー
<div>
  <Progress value={60} max={100} />
  <Progress value={80} max={100} />
  <Progress value={40} max={100} />
</div>
```

```tsx
// Good: それぞれに明確なラベル
<Stack direction="vertical" gap="2">
  <div>
    <label>JavaScript</label>
    <Progress value={60} max={100} aria-label="JavaScript スキルレベル" />
  </div>
  <div>
    <label>TypeScript</label>
    <Progress value={80} max={100} aria-label="TypeScript スキルレベル" />
  </div>
  <div>
    <label>React</label>
    <Progress value={40} max={100} aria-label="React スキルレベル" />
  </div>
</Stack>
```

**代替案**: 各プログレスバーに `aria-label` を設定し、視覚的なラベルも提供してください。

#### 100%完了後もプログレスバーを表示し続けない

```tsx
// Bad: 完了後も表示
{uploading && <Progress value={progress} max={100} showLabel />}
```

```tsx
// Good: 完了後は成功メッセージを表示
{uploading ? (
  <Progress value={progress} max={100} aria-label="アップロード中" showLabel />
) : (
  <Alert variant="success">アップロードが完了しました</Alert>
)}
```

**代替案**: 完了後は、明確な完了メッセージや次のアクションを提示してください。

## カラー別の使い分け

| カラー | 用途 | 例 |
|--------|------|-----|
| `primary` | 通常の進捗 | ページ読み込み、処理中 |
| `success` | 成功・完了 | タスク完了、100%達成 |
| `warning` | 警告 | 容量70-90%使用 |
| `error` | エラー・危険 | 容量90%以上使用 |

## よくある質問

### プログレスバーの値を動的に更新するにはどうすればよいですか？

ReactやVueの状態管理を使用して、プログレスバーの値を更新できます：

**React の例**:
```tsx
import { Progress, Button } from '@hidearea-design/react';
import { useState } from 'react';

function DynamicProgress() {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const startProcess = () => {
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <>
      <Progress
        value={progress}
        max={100}
        color={progress === 100 ? 'success' : 'primary'}
        aria-label="処理進捗"
        showLabel
      />
      <Button onClick={startProcess} disabled={isProcessing}>
        {isProcessing ? '処理中...' : '処理開始'}
      </Button>
    </>
  );
}
```

**Vue の例**:
```vue
<template>
  <div>
    <HaProgress
      :value="progress"
      :max="100"
      :color="progress === 100 ? 'success' : 'primary'"
      aria-label="処理進捗"
      show-label
    />
    <HaButton @click="startProcess" :disabled="isProcessing">
      {{ isProcessing ? '処理中...' : '処理開始' }}
    </HaButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Progress as HaProgress, Button as HaButton } from '@hidearea-design/vue';

const progress = ref(0);
const isProcessing = ref(false);

const startProcess = () => {
  isProcessing.value = true;
  progress.value = 0;

  const interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(interval);
      isProcessing.value = false;
    }
  }, 500);
};
</script>
```

### 複数のファイルのアップロード進捗を表示するにはどうすればよいですか？

各ファイルの進捗を個別に管理し、全体の進捗も表示できます：

**React の例**:
```tsx
import { Progress, Stack, Card } from '@hidearea-design/react';
import { useState } from 'react';

interface FileProgress {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

function MultiFileUpload() {
  const [files, setFiles] = useState<FileProgress[]>([
    { id: '1', name: 'document.pdf', progress: 60, status: 'uploading' },
    { id: '2', name: 'image.png', progress: 100, status: 'completed' },
    { id: '3', name: 'video.mp4', progress: 30, status: 'uploading' },
  ]);

  const totalProgress =
    files.reduce((sum, file) => sum + file.progress, 0) / files.length;

  return (
    <Stack direction="vertical" gap="3">
      <Card variant="outlined">
        <h3>全体の進捗</h3>
        <Progress
          value={totalProgress}
          max={100}
          color={totalProgress === 100 ? 'success' : 'primary'}
          aria-label="全ファイルのアップロード進捗"
          showLabel
        />
      </Card>

      {files.map((file) => (
        <Card key={file.id} variant="outlined">
          <Stack direction="vertical" gap="2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{file.name}</span>
              <span>{file.status}</span>
            </div>
            <Progress
              value={file.progress}
              max={100}
              color={
                file.status === 'completed'
                  ? 'success'
                  : file.status === 'error'
                  ? 'error'
                  : 'primary'
              }
              aria-label={`${file.name} アップロード進捗`}
              showLabel
            />
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
```

**Vue の例**:
```vue
<template>
  <HaStack direction="vertical" gap="3">
    <HaCard variant="outlined">
      <h3>全体の進捗</h3>
      <HaProgress
        :value="totalProgress"
        :max="100"
        :color="totalProgress === 100 ? 'success' : 'primary'"
        aria-label="全ファイルのアップロード進捗"
        show-label
      />
    </HaCard>

    <HaCard
      v-for="file in files"
      :key="file.id"
      variant="outlined"
    >
      <HaStack direction="vertical" gap="2">
        <div style="display: flex; justify-content: space-between;">
          <span>{{ file.name }}</span>
          <span>{{ file.status }}</span>
        </div>
        <HaProgress
          :value="file.progress"
          :max="100"
          :color="getFileColor(file)"
          :aria-label="`${file.name} アップロード進捗`"
          show-label
        />
      </HaStack>
    </HaCard>
  </HaStack>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Progress as HaProgress,
  Stack as HaStack,
  Card as HaCard,
} from '@hidearea-design/vue';

interface FileProgress {
  id: string;
  name: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}

const files = ref<FileProgress[]>([
  { id: '1', name: 'document.pdf', progress: 60, status: 'uploading' },
  { id: '2', name: 'image.png', progress: 100, status: 'completed' },
  { id: '3', name: 'video.mp4', progress: 30, status: 'uploading' },
]);

const totalProgress = computed(() =>
  files.value.reduce((sum, file) => sum + file.progress, 0) / files.value.length
);

const getFileColor = (file: FileProgress) => {
  if (file.status === 'completed') return 'success';
  if (file.status === 'error') return 'error';
  return 'primary';
};
</script>
```

### サーバーからのリアルタイムな進捗更新を表示するにはどうすればよいですか？

WebSocketやServer-Sent Events（SSE）を使用して、サーバーからの進捗を受信できます：

**React の例（WebSocket）**:
```tsx
import { Progress } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function RealTimeProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('接続中...');

  useEffect(() => {
    const ws = new WebSocket('wss://example.com/progress');

    ws.onopen = () => {
      setStatus('処理中');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress);
      setStatus(data.message);
    };

    ws.onerror = () => {
      setStatus('エラーが発生しました');
    };

    ws.onclose = () => {
      setStatus('完了');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <Progress
        value={progress}
        max={100}
        color={status === 'エラーが発生しました' ? 'error' : 'primary'}
        aria-label="サーバー処理進捗"
        showLabel
      />
      <p>{status}</p>
    </div>
  );
}
```

**Vue の例（Server-Sent Events）**:
```vue
<template>
  <div>
    <HaProgress
      :value="progress"
      :max="100"
      :color="status.includes('エラー') ? 'error' : 'primary'"
      aria-label="サーバー処理進捗"
      show-label
    />
    <p>{{ status }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Progress as HaProgress } from '@hidearea-design/vue';

const progress = ref(0);
const status = ref('接続中...');
let eventSource: EventSource;

onMounted(() => {
  eventSource = new EventSource('/api/progress');

  eventSource.addEventListener('progress', (event) => {
    const data = JSON.parse(event.data);
    progress.value = data.progress;
    status.value = data.message;
  });

  eventSource.addEventListener('error', () => {
    status.value = 'エラーが発生しました';
    eventSource.close();
  });
});

onUnmounted(() => {
  if (eventSource) {
    eventSource.close();
  }
});
</script>
```

### カスタムフォーマットでパーセンテージを表示するにはどうすればよいですか？

`aria-valuetext` を使用してカスタムフォーマットを提供できます：

**React の例**:
```tsx
import { Progress } from '@hidearea-design/react';

function CustomFormatProgress() {
  const value = 7.5; // GB
  const max = 10; // GB
  const percentage = (value / max) * 100;

  return (
    <div>
      <Progress
        value={percentage}
        max={100}
        aria-label="ストレージ使用量"
        aria-valuetext={`${value} GB / ${max} GB 使用中 (${percentage.toFixed(1)}%)`}
        showLabel
      />
      <p style={{ fontSize: '14px', marginTop: '8px' }}>
        {value} GB / {max} GB 使用中
      </p>
    </div>
  );
}
```

**Vue の例**:
```vue
<template>
  <div>
    <HaProgress
      :value="percentage"
      :max="100"
      aria-label="ストレージ使用量"
      :aria-valuetext="`${value} GB / ${max} GB 使用中 (${percentage.toFixed(1)}%)`"
      show-label
    />
    <p style="font-size: 14px; margin-top: 8px;">
      {{ value }} GB / {{ max }} GB 使用中
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Progress as HaProgress } from '@hidearea-design/vue';

const value = 7.5; // GB
const max = 10; // GB
const percentage = computed(() => (value / max) * 100);
</script>
```

## 関連コンポーネント

- [Spinner](/components/spinner) - 不確定な処理の読み込み状態を表示
- [Skeleton](/components/skeleton) - コンテンツの読み込み中のプレースホルダー
- [Button](/components/button) - プログレスに関連するアクション（キャンセル、再試行など）

## API リファレンス

### Props

Progress コンポーネントは以下のプロパティをサポートします：

```typescript
interface ProgressProps {
  /**
   * 現在の進捗値
   * @default 0
   */
  value: number;

  /**
   * 最大値
   * @default 100
   */
  max: number;

  /**
   * プログレスバーのバリアント
   * @default 'default'
   */
  variant?: 'default' | 'striped' | 'animated';

  /**
   * プログレスバーのカラー
   * @default 'primary'
   */
  color?: 'primary' | 'success' | 'warning' | 'error';

  /**
   * プログレスバーのサイズ
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * パーセンテージラベルを表示するかどうか
   * @default false
   */
  showLabel?: boolean;

  /**
   * プログレスバーの目的を説明するラベル（アクセシビリティ用）
   */
  'aria-label'?: string;

  /**
   * 進捗値のテキスト表現（アクセシビリティ用）
   * @example "75パーセント完了"
   */
  'aria-valuetext'?: string;

  /**
   * ライブリージョンの更新通知レベル
   * 不確定プログレスで使用
   * @default undefined
   */
  'aria-live'?: 'polite' | 'assertive' | 'off';

  /**
   * 処理中状態を示す
   * 不確定プログレスで使用
   * @default undefined
   */
  'aria-busy'?: boolean;
}
```

### CSS Variables

Progress コンポーネントで使用できるCSS変数：

```typescript
interface ProgressCSSVariables {
  /**
   * プログレスバーの高さ
   * @default サイズに応じて: 4px (sm) / 8px (md) / 12px (lg)
   */
  '--progress-height': string;

  /**
   * プログレスバーの角丸
   * @default var(--radius-sm)
   */
  '--progress-border-radius': string;

  /**
   * プログレスバーの背景色
   * @default var(--color-gray-200)
   */
  '--progress-bg': string;

  /**
   * プログレスバーの色
   * @default カラーに応じて設定
   */
  '--progress-bar-bg': string;

  /**
   * プログレスバーのトランジション
   * @default width 0.3s ease
   */
  '--progress-transition': string;

  /**
   * ストライプのサイズ
   * @default 1rem
   */
  '--progress-stripe-size': string;

  /**
   * アニメーションの持続時間
   * @default 1s
   */
  '--progress-animation-duration': string;
}
```

### Parts

Shadow DOM内の要素に `::part()` セレクターでアクセスできます：

```typescript
interface ProgressParts {
  /**
   * プログレスバーのコンテナ要素
   */
  base: HTMLDivElement;

  /**
   * プログレスバー要素
   */
  bar: HTMLDivElement;

  /**
   * ラベル要素（showLabel=trueの場合）
   */
  label?: HTMLSpanElement;
}
```

使用例：

```css
/* コンテナのスタイリング */
ha-progress::part(base) {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
}

/* バーのスタイリング */
ha-progress::part(bar) {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

/* ラベルのスタイリング */
ha-progress::part(label) {
  font-weight: 600;
  color: #333;
}
```

## トラブルシューティング

### 問題: プログレスバーが表示されない

**原因**:

`value` プロパティが設定されていないか、`max` プロパティよりも小さい値が設定されていない可能性があります。

**解決策**:

1. `value` プロパティが正しく設定されているか確認してください：

```tsx
// 値が設定されているか確認
console.log('Progress value:', progress);

<Progress value={progress} max={100} showLabel />
```

2. `value` が0以上、`max` 以下の範囲内にあることを確認してください：

```tsx
// 値を範囲内にクランプ
const clampedValue = Math.max(0, Math.min(progress, 100));

<Progress value={clampedValue} max={100} showLabel />
```

### 問題: パーセンテージが更新されない

**原因**:

React や Vue の状態管理が正しく機能していない、または依存配列が不適切な可能性があります。

**解決策**:

React の場合、状態の更新を確認してください：

```tsx
import { Progress } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function ProgressExample() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log('Progress updated:', progress);
  }, [progress]); // 依存配列に progress を追加

  const updateProgress = () => {
    setProgress((prev) => {
      const newValue = prev + 10;
      console.log('Updating progress from', prev, 'to', newValue);
      return newValue;
    });
  };

  return (
    <>
      <Progress value={progress} max={100} showLabel />
      <button onClick={updateProgress}>更新</button>
    </>
  );
}
```

Vue の場合：

```vue
<template>
  <div>
    <HaProgress :value="progress" :max="100" show-label />
    <button @click="updateProgress">更新</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Progress as HaProgress } from '@hidearea-design/vue';

const progress = ref(0);

// 値の変化を監視
watch(progress, (newValue, oldValue) => {
  console.log('Progress updated from', oldValue, 'to', newValue);
});

const updateProgress = () => {
  progress.value += 10;
};
</script>
```

### 問題: アニメーションが滑らかでない

**原因**:

更新頻度が高すぎるか、トランジション設定が適切でない可能性があります。

**解決策**:

1. 更新頻度を調整してください：

```tsx
// Bad: 高頻度の更新
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => prev + 1);
  }, 50); // 50msごとに更新
  return () => clearInterval(interval);
}, []);

// Good: 適切な頻度での更新
useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => prev + 5);
  }, 500); // 500msごとに更新
  return () => clearInterval(interval);
}, []);
```

2. カスタムトランジションを設定してください：

```tsx
<Progress
  value={progress}
  max={100}
  style={{
    '--progress-transition': 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  } as React.CSSProperties}
  showLabel
/>
```

### 問題: スクリーンリーダーが進捗を読み上げない

**原因**:

適切なARIA属性が設定されていない可能性があります。

**解決策**:

1. `aria-label` を必ず設定してください：

```tsx
// Bad: aria-labelなし
<Progress value={60} max={100} />

// Good: aria-labelあり
<Progress value={60} max={100} aria-label="ファイルアップロード進捗" />
```

2. 動的な進捗には `aria-live` を使用してください：

```tsx
<Progress
  value={progress}
  max={100}
  aria-label="処理中"
  aria-live="polite"
  showLabel
/>
```

3. より詳細な情報を提供する場合は、`aria-valuetext` を使用してください：

```tsx
<Progress
  value={percentage}
  max={100}
  aria-label="ダウンロード進捗"
  aria-valuetext={`${downloadedMB} MB / ${totalMB} MB ダウンロード済み`}
  showLabel
/>
```

4. 補助的なライブリージョンを追加してください：

```tsx
function AccessibleProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('準備中');

  return (
    <>
      <Progress
        value={progress}
        max={100}
        aria-label="タスク進捗"
        showLabel
      />
      {/* スクリーンリーダー用の状態通知 */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', left: '-10000px' }}
      >
        {status}
      </div>
    </>
  );
}
```
