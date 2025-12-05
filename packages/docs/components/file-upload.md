# FileUpload

ファイルをアップロードするための汎用的なコンポーネントです。ドラッグ＆ドロップ、複数ファイル選択、プレビュー表示、ファイル制限などの機能をサポートしています。

## 基本的な使い方

ファイルを選択したり、ドラッグ＆ドロップで追加できるシンプルなファイルアップロードです。

```html
<ha-file-upload label="ファイルをアップロード" helper-text="ここにファイルをドラッグ＆ドロップしてください"></ha-file-upload>
```

## 複数ファイル選択

`multiple` 属性を追加することで、複数のファイルを一度に選択できるようになります。

```html
<ha-file-upload multiple label="複数のファイルをアップロード" helper-text="複数のファイルを一度に選択できます"></ha-file-upload>
```

## ファイルタイプとサイズ制限

`accept` 属性で許可するファイルタイプを、`max-size` 属性で最大ファイルサイズ（バイト単位）を指定できます。

```html
<ha-file-upload
  accept="image/*"
  max-size="5242880"
  label="画像ファイル (最大 5MB)"
  helper-text="画像ファイルのみ、最大5MBまでアップロード可能です"
></ha-file-upload>
```

## ファイル数制限

`max-files` 属性でアップロードできる最大ファイル数を指定できます。

```html
<ha-file-upload
  multiple
  max-files="3"
  label="最大3つのファイルをアップロード"
  helper-text="最大3つのファイルを選択できます"
></ha-file-upload>
```

## プレビュー表示

`show-preview` 属性を追加すると、画像ファイルのプレビューが表示されます。

```html
<ha-file-upload
  multiple
  accept="image/*"
  show-preview
  label="画像アップロード (プレビュー付き)"
  helper-text="選択した画像ファイルのプレビューが表示されます"
></ha-file-upload>
```

## バリアント

`variant` 属性で表示スタイルを変更できます。

### Compact

よりコンパクトな表示スタイルです。

```html
<ha-file-upload variant="compact" label="コンパクト表示"></ha-file-upload>
```

### Button

ボタンとして機能するスタイルです。

```html
<ha-file-upload variant="button" placeholder="ファイルを選択"></ha-file-upload>
```

## 状態

### Disabled

`disabled` 属性を追加すると、コンポーネントが無効になり操作できなくなります。

```html
<ha-file-upload disabled label="無効なファイルアップロード"></ha-file-upload>
```

### Error

`error` 属性と `error-text` 属性を使用すると、エラー状態とエラーメッセージを表示できます。

```html
<ha-file-upload
  error
  error-text="無効なファイルが選択されました。"
  label="エラー状態"
></ha-file-upload>
```

### Required

`required` 属性を追加すると、ファイル選択が必須であることを示します。

```html
<ha-file-upload required label="必須ファイルアップロード"></ha-file-upload>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|---|---|---|---|
| `variant` | `'default' \| 'compact' \| 'button'` | `'default'` | ファイルアップロードの表示スタイル |
| `multiple` | `boolean` | `false` | 複数ファイルの選択を許可するか |
| `accept` | `string` | `''` | 許可するファイルタイプ（例: `image/*,application/pdf`） |
| `max-size` | `number` | `Infinity` | 最大ファイルサイズ（バイト単位） |
| `max-files` | `number` | `Infinity` | 最大ファイル数 |
| `disabled` | `boolean` | `false` | 無効状態 |
| `required` | `boolean` | `false` | 必須フィールドとしてマークするか |
| `error` | `boolean` | `false` | エラー状態 |
| `show-file-list` | `boolean` | `true` | アップロードされたファイルのリストを表示するか |
| `show-preview` | `boolean` | `false` | 画像ファイルのプレビューを表示するか |
| `label` | `string` | `''` | コンポーネントのラベルテキスト |
| `placeholder` | `string` | `'Choose files or drag and drop'` | ドラッグ＆ドロップゾーンのプレースホルダーテキスト |
| `drag-drop-text` | `string` | `'Drop files here'` | ドラッグ中のドロップゾーンに表示されるテキスト |
| `helper-text` | `string` | `''` | ヘルパーテキスト |
| `error-text` | `string` | `''` | エラーメッセージ |

## イベント

| イベント | ペイロード | 説明 |
|---|---|---|
| `file-select` | `{ files: File[]; validFiles: File[]; invalidFiles: Array<{ file: File; error: string }>; }` | ファイルが選択またはドロップされた時 |
| `file-remove` | `{ file: File; remainingFiles: File[]; }` | ファイルが削除された時 |
| `file-clear` | `{ clearedFiles: File[]; }` | すべてのファイルがクリアされた時 |
| `validation-error` | `{ invalidFiles: Array<{ file: File; error: string }>; }` | ファイルバリデーションに失敗した時 |

## メソッド (Public API)

コンポーネントインスタンスを通して、以下のメソッドを直接呼び出すことができます。

| メソッド | 説明 |
|---|---|
| `getFiles(): File[]` | 現在選択されているすべてのファイルを取得します。 |
| `addFiles(files: File[]): void` | プログラム的にファイルを追加します。 |
| `removeFile(fileOrId: File \| string): void` | 指定されたファイルまたはIDのファイルを削除します。 |
| `clearFiles(): void` | すべての選択されたファイルをクリアします。 |
| `validate(): boolean` | 現在のファイルがバリデーションルールを満たしているか確認します。 |
| `openFilePicker(): void` | ファイル選択ダイアログを開きます。 |

## React

```tsx
import { useState, useRef } from 'react';
import { FileUpload, FileUploadRef } from '@hidearea-design/react';

function MyFileUploadComponent() {
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = (
    files: File[],
    validFiles: File[],
    invalidFiles: Array<{ file: File; error: string }>
  ) => {
    setSelectedFiles(validFiles);
    if (invalidFiles.length > 0) {
      setUploadError(`以下のファイルはアップロードできません: ${invalidFiles.map(f => f.file.name).join(', ')}`);
    } else {
      setUploadError('');
    }
  };

  const handleFileRemove = (file: File, remainingFiles: File[]) => {
    setSelectedFiles(remainingFiles);
    setUploadError(''); // Clear error on remove
  };

  const handleClearAll = () => {
    fileUploadRef.current?.clearFiles();
    setSelectedFiles([]);
    setUploadError('');
  };

  return (
    <div>
      <FileUpload
        ref={fileUploadRef}
        multiple
        accept="image/*,application/pdf"
        maxSize={10485760} // 10MB
        maxFiles={5}
        showPreview
        label="ドキュメントと画像をアップロード"
        helperText="画像 (.jpg, .png) またはPDF (.pdf) を最大5つ、各10MBまで。"
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        onFileClear={() => {
          setSelectedFiles([]);
          setUploadError('');
        }}
        onValidationError={(invalidFiles) => {
          setUploadError(`無効なファイル: ${invalidFiles.map(f => f.file.name + ' (' + f.error + ')').join(', ')}`);
        }}
      />
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
      {selectedFiles.length > 0 && (
        <button onClick={handleClearAll} style={{ marginTop: '10px' }}>
          すべてのファイルをクリア
        </button>
      )}
    </div>
  );
}
```

## Vue

```vue
<template>
  <div>
    <FileUpload
      ref="fileUploadRef"
      multiple
      accept="image/*,application/pdf"
      :max-size="10485760" <!-- 10MB -->
      :max-files="5"
      show-preview
      label="ドキュメントと画像をアップロード"
      helper-text="画像 (.jpg, .png) またはPDF (.pdf) を最大5つ、各10MBまで。"
      @file-select="handleFileSelect"
      @file-remove="handleFileRemove"
      @file-clear="handleClearAll"
      @validation-error="handleValidationError"
    />
    <p v-if="uploadError" style="color: red;">{{ uploadError }}</p>
    <button v-if="selectedFiles.length > 0" @click="handleClearAll" style="margin-top: 10px;">
      すべてのファイルをクリア
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FileUpload, type FileUploadRef } from '@hidearea-design/vue';
import type { FileUploadFile } from '@hidearea-design/core';

const fileUploadRef = ref<FileUploadRef | null>(null);
const selectedFiles = ref<File[]>([]);
const uploadError = ref<string>('');

const handleFileSelect = (
  files: File[],
  validFiles: File[],
  invalidFiles: Array<{ file: File; error: string }>
) => {
  selectedFiles.value = validFiles;
  if (invalidFiles.length > 0) {
    uploadError.value = `以下のファイルはアップロードできません: ${invalidFiles.map(f => f.file.name).join(', ')}`;
  } else {
    uploadError.value = '';
  }
};

const handleFileRemove = (file: File, remainingFiles: File[]) => {
  selectedFiles.value = remainingFiles;
  uploadError.value = ''; // Clear error on remove
};

const handleClearAll = () => {
  fileUploadRef.value?.clearFiles();
  selectedFiles.value = [];
  uploadError.value = '';
};

const handleValidationError = (invalidFiles: Array<{ file: File; error: string }>) => {
  uploadError.value = `無効なファイル: ${invalidFiles.map(f => f.file.name + ' (' + f.error + ')').join(', ')}`;
};
</script>
