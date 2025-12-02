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

- `role="progressbar"` が自動的に設定されます
- `aria-valuenow`、`aria-valuemin`、`aria-valuemax` が自動的に設定されます
- `aria-label` を設定して目的を明示することを推奨します

```html
<ha-progress
  value="50"
  max="100"
  aria-label="ファイルアップロード進捗"
></ha-progress>
```

## スタイルのカスタマイズ

CSS変数を使用してスタイルをカスタマイズできます：

```css
ha-progress {
  --progress-height: 8px;
  --progress-border-radius: 4px;
  --progress-bg: var(--color-gray-200);
  --progress-bar-bg: var(--color-primary-500);
}
```

## カラー別の使い分け

| カラー | 用途 | 例 |
|--------|------|-----|
| `primary` | 通常の進捗 | ページ読み込み、処理中 |
| `success` | 成功・完了 | タスク完了、100%達成 |
| `warning` | 警告 | 容量70-90%使用 |
| `error` | エラー・危険 | 容量90%以上使用 |
