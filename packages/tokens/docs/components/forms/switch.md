# Switch (スイッチ) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/switch.css`
**ステータス:** ✅ 実装済み

---

## 概要

スイッチコンポーネントは、オン/オフの2つの状態を切り替えるインタラクティブなトグルコントロールです。チェックボックスとは異なり、スイッチは即座に効果が現れる設定に使用され、フォームの送信を必要としません。通知の有効化、ダークモードの切り替え、機能の表示/非表示など、即座に反映される設定に最適です。

### 用途

- 設定のオン/オフ切り替え（通知、ダークモード、機能など）
- 即座に効果が現れる機能の有効化/無効化
- アプリケーション設定と環境設定の制御
- 2つのオプション間の切り替え（例: ビューの切り替え）
- コンテンツの表示/非表示の制御
- 機能フラグと実験的オプション

### スイッチとチェックボックスの違い

| 特徴 | スイッチ | チェックボックス |
|------|---------|----------------|
| 効果 | 即座に反映 | フォーム送信が必要 |
| 用途 | 設定の切り替え | 複数選択、同意 |
| 状態変更 | 切り替えと同時に適用 | 送信ボタンクリック後 |
| 視覚的比喩 | 物理的なスイッチ | チェックリストの項目 |
| 例 | ダークモード、通知オン/オフ | 利用規約への同意、フィルター選択 |

**いつスイッチを使うか:**
- 変更が即座に反映される場合
- 設定やプリファレンスの切り替え
- オン/オフの二択のみ

**いつチェックボックスを使うか:**
- フォーム送信が必要な場合
- 複数の独立した選択肢
- 利用規約への同意

---

## サイズ

### Small (sm)

コンパクトな表示領域に適した小さめのスイッチです。

**サイズ仕様:**
- トラック: 32px × 18px
- サム（つまみ）: 14px × 14px
- サム移動距離: 14px
- ラベルフォントサイズ: 0.875rem

**使用場面:**
- テーブル内のセル
- コンパクトな設定画面
- サイドバーの環境設定
- モバイルビュー

```html
<div class="ha-switch" size="sm">
  <div class="switch-container">
    <input type="checkbox" id="compact-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="compact-switch">コンパクト表示</label>
  </div>
</div>
```

### Medium (md) - デフォルト

ほとんどのインターフェースで使用される標準サイズのスイッチです。

**サイズ仕様:**
- トラック: 40px × 22px
- サム（つまみ）: 18px × 18px
- サム移動距離: 18px
- ラベルフォントサイズ: 1rem

**使用場面:**
- 標準的な設定フォーム
- 一般的なUIレイアウト
- 最も一般的な実装
- すべてのコンポーネントのデフォルト

```html
<div class="ha-switch" size="md">
  <div class="switch-container">
    <input type="checkbox" id="standard-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="standard-switch">通知を有効にする</label>
  </div>
</div>
```

### Large (lg)

視認性とアクセシビリティを重視した大きめのスイッチです。

**サイズ仕様:**
- トラック: 48px × 26px
- サム（つまみ）: 20px × 20px
- サム移動距離: 22px
- ラベルフォントサイズ: 1.125rem

**使用場面:**
- 重要な設定項目
- モバイルアプリケーション
- アクセシビリティ要件がある場合
- プライマリ設定画面

```html
<div class="ha-switch" size="lg">
  <div class="switch-container">
    <input type="checkbox" id="important-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="important-switch">アカウントを有効化</label>
  </div>
</div>
```

---

## 状態

### オフ（未選択）

スイッチがオフの状態です。デフォルトの状態を表します。

```html
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="off-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="off-switch">通知オフ</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック背景: `--color-neutral-300` (#d1d5db) - ライトグレー
- サム位置: 左（0pxオフセット）
- カーソル: pointer
- 不透明度: 100%

### オン（選択済み）

スイッチがオンで有効な状態です。

```html
<div class="ha-switch" checked>
  <div class="switch-container">
    <input type="checkbox" id="on-switch" checked role="switch" aria-checked="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="on-switch">通知オン</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック背景: `--color-primary-600` (#4f46e5) - プライマリブルー
- サム位置: 右（トラック幅 - サム幅 - パディング分移動）
- カーソル: pointer
- 不透明度: 100%

### ホバー

有効なスイッチにマウスカーソルを重ねた状態です。

```html
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="hover-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="hover-switch">ホバー時の視覚フィードバック</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック不透明度: 0.9（フィードバックのため減少）
- オン/オフ両方の状態に適用
- 無効化されていない場合のみ適用

### フォーカス

キーボードフォーカス状態で、明確なフォーカスリングが表示されます。

```html
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="focus-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="focus-switch">キーボードフォーカス状態</label>
  </div>
</div>
```

**視覚的プロパティ:**
- アウトライン: 2px solid プライマリカラー (#4f46e5)
- アウトラインオフセット: 2px
- キーボードフォーカス時のみ表示（マウスクリックでは非表示）
- WCAG 2.1 AAコントラスト基準を満たす

### 無効化（オフ）

操作できないスイッチで、オフの状態です。

```html
<div class="ha-switch" disabled>
  <div class="switch-container">
    <input type="checkbox" id="disabled-off" disabled role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="disabled-off">利用できない機能</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック背景: `--color-neutral-200` (#e5e7eb) - より薄いグレー
- ラベルカラー: `--color-text-disabled` (#9ca3af) - 無効化グレー
- カーソル: not-allowed
- ホスト不透明度: 0.6

### 無効化（オン）

操作できないスイッチで、オンの状態です。ロックされた設定などに使用します。

```html
<div class="ha-switch" checked disabled>
  <div class="switch-container">
    <input type="checkbox" id="disabled-on" checked disabled role="switch" aria-checked="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="disabled-on">ロックされた設定</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック背景: `--color-neutral-400` (#9ca3af) - ミディアムグレー
- ラベルカラー: `--color-text-disabled` (#9ca3af)
- カーソル: not-allowed
- ホスト不透明度: 0.6

### エラー（オフ）

バリデーションエラーを示す状態で、オフの状態です。

```html
<div class="ha-switch" error>
  <div class="switch-container">
    <input type="checkbox" id="error-off" role="switch" aria-checked="false" aria-invalid="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="error-off">必須設定</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック背景: `--color-danger-200` (#fecaca) - ライトレッド
- ラベルカラー: `--color-danger-700` (#b91c1c) - ダークレッド
- 説明テキストカラー: `--color-danger-700`

### エラー（オン）

バリデーションエラーを示す状態で、オンの状態です。

```html
<div class="ha-switch" checked error>
  <div class="switch-container">
    <input type="checkbox" id="error-on" checked role="switch" aria-checked="true" aria-invalid="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="error-on">無効な設定</label>
  </div>
</div>
```

**視覚的プロパティ:**
- トラック背景: `--color-danger-600` (#dc2626) - ミディアムレッド
- ラベルカラー: `--color-danger-700` (#b91c1c)
- 説明テキストカラー: `--color-danger-700`

---

## 使用方法

### Pattern 1: WebComponents (Shadow DOM)

```html
<!-- 基本的なスイッチ -->
<ha-switch></ha-switch>

<!-- ラベル付き -->
<ha-switch label="通知を有効にする"></ha-switch>

<!-- 説明付き -->
<ha-switch
  label="ダークモード"
  description="日没時に自動的に切り替え">
</ha-switch>

<!-- サイズバリアント -->
<ha-switch size="sm" label="コンパクト設定"></ha-switch>
<ha-switch label="標準設定"></ha-switch>
<ha-switch size="lg" label="重要な設定"></ha-switch>

<!-- 状態の例 -->
<ha-switch checked label="通知が有効"></ha-switch>
<ha-switch disabled label="利用できない機能"></ha-switch>
<ha-switch error label="無効な設定"></ha-switch>
```

### Pattern 2: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/switch.css">
</head>
<body>
  <!-- 基本的なスイッチ -->
  <div class="ha-switch" size="md">
    <div class="switch-container">
      <input type="checkbox" id="basic-switch" role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="basic-switch">通知を有効にする</label>
    </div>
  </div>

  <!-- 説明付きスイッチ -->
  <div class="ha-switch" size="md">
    <div class="switch-container">
      <input type="checkbox" id="with-desc" role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="with-desc">ダークモード</label>
        <span class="description">目に優しい暗い配色に切り替えます</span>
      </div>
    </div>
  </div>

  <!-- オン状態のスイッチ -->
  <div class="ha-switch" size="md" checked>
    <div class="switch-container">
      <input type="checkbox" id="checked-switch" checked role="switch" aria-checked="true">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="checked-switch">自動保存</label>
    </div>
  </div>

  <!-- エラー状態のスイッチ -->
  <div class="ha-switch" size="md" error>
    <div class="switch-container">
      <input type="checkbox" id="error-switch" role="switch" aria-checked="false" aria-invalid="true">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="error-switch">利用規約への同意</label>
        <span class="description">続行するには同意が必要です</span>
      </div>
    </div>
  </div>

  <!-- 無効化されたスイッチ -->
  <div class="ha-switch" size="md" disabled>
    <div class="switch-container">
      <input type="checkbox" id="disabled-switch" disabled role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="disabled-switch">ベータ機能</label>
        <span class="description">アップグレードでアクセス可能</span>
      </div>
    </div>
  </div>

  <!-- サイズバリエーション -->
  <div class="ha-switch" size="sm">
    <div class="switch-container">
      <input type="checkbox" id="small-switch" role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="small-switch">小サイズ</label>
    </div>
  </div>

  <div class="ha-switch" size="lg">
    <div class="switch-container">
      <input type="checkbox" id="large-switch" role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="large-switch">大サイズ</label>
    </div>
  </div>

  <script>
    // スイッチの切り替え処理
    document.querySelectorAll('.ha-switch input[type="checkbox"]').forEach(input => {
      input.addEventListener('change', function() {
        const switchElement = this.closest('.ha-switch');
        const isChecked = this.checked;

        // aria-checked属性を更新
        this.setAttribute('aria-checked', isChecked);

        // checked属性をスイッチ要素に反映
        if (isChecked) {
          switchElement.setAttribute('checked', '');
        } else {
          switchElement.removeAttribute('checked');
        }

        console.log(`スイッチ ${this.id}: ${isChecked ? 'オン' : 'オフ'}`);
      });
    });
  </script>
</body>
</html>
```

### Pattern 3: React/TypeScript

```typescript
import React, { useState } from 'react';
import '@hidearea-design/tokens/css/html/forms/switch.css';

interface SwitchProps {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

function Switch({
  id,
  label,
  description,
  error = false,
  size = 'md',
  disabled = false,
  checked = false,
  onChange,
  ...ariaProps
}: SwitchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div
      className="ha-switch"
      {...(size && { size })}
      {...(error && { error: '' })}
      {...(disabled && { disabled: '' })}
      {...(checked && { checked: '' })}
    >
      <div className="switch-container">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          aria-invalid={error}
          aria-describedby={description ? `${id}-desc` : ariaProps['aria-describedby']}
          {...ariaProps}
        />
        <div className="switch-track">
          <div className="switch-thumb"></div>
        </div>
        {(label || description) && (
          <div className="label-wrapper">
            <label htmlFor={id}>{label}</label>
            {description && (
              <span id={`${id}-desc`} className="description">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 使用例: 設定画面
function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="settings-form">
      <h2>設定</h2>

      <fieldset>
        <legend>表示設定</legend>

        <Switch
          id="dark-mode"
          label="ダークモード"
          description="目に優しい暗い配色に切り替えます"
          checked={darkMode}
          onChange={setDarkMode}
        />

        <Switch
          id="compact-view"
          label="コンパクト表示"
          description="より多くのコンテンツを表示します"
          size="sm"
        />
      </fieldset>

      <fieldset>
        <legend>通知設定</legend>

        <Switch
          id="notifications"
          label="通知を有効にする"
          description="新着メッセージをプッシュ通知で受け取ります"
          checked={notifications}
          onChange={setNotifications}
        />

        <Switch
          id="email-notif"
          label="メール通知"
          description="アクティビティのメールダイジェストを受信します"
        />
      </fieldset>

      <fieldset>
        <legend>編集設定</legend>

        <Switch
          id="auto-save"
          label="自動保存"
          description="5分ごとに自動的に保存します"
          checked={autoSave}
          onChange={setAutoSave}
        />
      </fieldset>
    </div>
  );
}

export { Switch, SettingsPage };
```

### Pattern 4: 統合CSS

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/all.css">
</head>
<body>
  <!-- 全コンポーネントが利用可能 -->
  <div class="ha-switch" size="md">
    <div class="switch-container">
      <input type="checkbox" id="example" role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="example">スイッチ</label>
    </div>
  </div>
</body>
</html>
```

---

## 属性

| 属性 | 型 | デフォルト | 説明 |
|------|-----|-----------|------|
| `checked` | boolean | `false` | スイッチがオン/選択状態かどうか |
| `disabled` | boolean | `false` | スイッチを無効化する |
| `size` | `sm` \| `md` \| `lg` | `md` | スイッチのサイズバリアント |
| `error` | boolean | `false` | エラー状態を示す |
| `name` | string | — | フォームフィールドのname属性 |
| `value` | string | `on` | チェック時のvalue属性 |
| `role` | string | `switch` | ARIA role（常に"switch"） |
| `aria-checked` | string | `false` | 自動更新されるARIA属性 |
| `aria-label` | string | — | 視覚的ラベルが利用できない場合のアクセシブルラベル |
| `aria-describedby` | string | — | スイッチを説明する要素のID |
| `aria-invalid` | boolean | — | エラー状態を示す |

---

## CSSカスタムプロパティ

スイッチコンポーネントは以下のデザイントークンを使用しています:

### カラー
- `--color-neutral-200` - #e5e7eb（無効化オフ）
- `--color-neutral-300` - #d1d5db（デフォルトオフ）
- `--color-neutral-400` - #9ca3af（無効化オン）
- `--color-primary-600` - #4f46e5（プライマリ/チェック済み）
- `--color-danger-200` - #fecaca（エラーオフ）
- `--color-danger-600` - #dc2626（エラーオン）
- `--color-danger-700` - #b91c1c（エラーテキスト）
- `--color-background` - #ffffff（サム背景）
- `--color-text-primary` - #1a1a1a（ラベルテキスト）
- `--color-text-secondary` - #6b7280（説明テキスト）
- `--color-text-disabled` - #9ca3af（無効化テキスト）

### スペーシング
- `--spacing-1` - 0.25rem（ラベル/説明間のギャップ）
- `--spacing-3` - 0.75rem（スイッチ/ラベル間のギャップ）

### タイポグラフィ
- `--font-family-base` - system-ui, -apple-system, sans-serif
- `--font-size-base` - 1rem（ラベルフォントサイズ）
- `--font-size-sm` - 0.875rem（説明フォントサイズ）
- `--font-size-lg` - 1.125rem（大ラベルフォントサイズ）
- `--font-weight-normal` - 400（ラベルウェイト）
- `--line-height-normal` - 1.5（テキスト行の高さ）

### エフェクト
- トランジション時間: 0.2s（スムーズな切り替え）
- トランジションタイミング: ease

---

## アクセシビリティ

### ARIA属性

スイッチコンポーネントは以下のARIA属性を自動的に管理します:

- **`role="switch"`** - コンポーネントをスイッチコントロールとして識別
- **`aria-checked`** - 常に現在の状態を反映（true/false）
- **`aria-label`** - 視覚的ラベルが利用できない場合のアクセシブル名を提供
- **`aria-describedby`** - 説明/エラーテキストにリンク
- **`aria-disabled`** - 無効化時に設定
- **`aria-invalid`** - エラー状態を示す

### ARIA例

```html
<!-- アクセシブルラベル付き基本スイッチ -->
<div class="ha-switch">
  <div class="switch-container">
    <input
      type="checkbox"
      id="notif"
      role="switch"
      aria-checked="true"
      aria-label="通知を有効にする"
      checked
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="notif">通知を有効にする</label>
  </div>
</div>

<!-- コンテキストのための説明付き -->
<div class="ha-switch">
  <div class="switch-container">
    <input
      type="checkbox"
      id="dark-mode"
      role="switch"
      aria-checked="false"
      aria-describedby="dark-mode-desc"
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="dark-mode">ダークモード</label>
      <span id="dark-mode-desc" class="description">
        システムは日没時に自動的に切り替わります
      </span>
    </div>
  </div>
</div>

<!-- アクセシブルなエラーメッセージ付き -->
<div class="ha-switch" error>
  <div class="switch-container">
    <input
      type="checkbox"
      id="terms"
      role="switch"
      aria-checked="false"
      aria-invalid="true"
      aria-describedby="terms-error"
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="terms">利用規約に同意する</label>
      <span id="terms-error" class="description">
        続行するには同意が必要です
      </span>
    </div>
  </div>
</div>

<!-- プログラム的にラベル付け -->
<span id="wifi-label">WiFi</span>
<div class="ha-switch">
  <div class="switch-container">
    <input
      type="checkbox"
      id="wifi"
      role="switch"
      aria-checked="false"
      aria-labelledby="wifi-label"
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
  </div>
</div>
```

### キーボード操作

| キー | アクション |
|------|-----------|
| **Tab** | スイッチコンポーネントにフォーカス |
| **Shift + Tab** | フォーカスを後ろに移動 |
| **Space** | スイッチをオン/オフ切り替え |
| **Enter** | スイッチをオン/オフ切り替え（代替） |

### フォーカス管理

```html
<div class="ha-switch">
  <div class="switch-container">
    <input
      type="checkbox"
      id="focus-example"
      role="switch"
      aria-checked="false"
      tabindex="0"
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="focus-example">フォーカス可能なスイッチ</label>
  </div>
</div>
```

- スイッチはTabキーでフォーカスを受け取る
- 視覚的なフォーカスリングが表示される（2pxアウトライン、2pxオフセット）
- フォーカスリングカラーはプライマリカラー（#4f46e5）に一致
- フォーカスはキーボードフォーカス時のみ表示（マウスクリックでは非表示）

### カラーコントラスト

すべての状態がWCAG AA基準を満たしています:
- 背景上のテキスト: 最小4.5:1
- フォーカスリング: 背景に対して最小3:1
- エラー状態: 最小4.5:1

### スクリーンリーダー対応

```html
<!-- "ダークモードスイッチ、チェック済み"とアナウンス -->
<div class="ha-switch" checked>
  <div class="switch-container">
    <input type="checkbox" id="dark" checked role="switch" aria-checked="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="dark">ダークモード</label>
  </div>
</div>

<!-- 追加のコンテキストでアナウンス -->
<div class="ha-switch">
  <div class="switch-container">
    <input
      type="checkbox"
      id="notif"
      role="switch"
      aria-checked="false"
      aria-describedby="notif-help"
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="notif">通知</label>
      <span id="notif-help" class="description">
        新着メッセージのプッシュ通知を受信します
      </span>
    </div>
  </div>
</div>

<!-- 明確なエラーコミュニケーション -->
<div class="ha-switch" error>
  <div class="switch-container">
    <input
      type="checkbox"
      id="accept"
      role="switch"
      aria-checked="false"
      aria-invalid="true"
      aria-describedby="accept-error"
    >
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="accept">利用規約に同意する</label>
      <span id="accept-error" class="description">
        続行するにはこのフィールドが必須です
      </span>
    </div>
  </div>
</div>
```

---

## ベストプラクティス

### ✅ 推奨

1. **明確なラベルを提供する**
   - オン状態が何を意味するか説明する
   - title属性のみに頼らない

```html
<!-- 明確 -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="dark-enable" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="dark-enable">ダークモードを有効にする</label>
  </div>
</div>

<!-- コンテキストに適している -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="email-notif" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="email-notif">メール通知</label>
  </div>
</div>
```

2. **複雑な設定には説明を追加する**

```html
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="auto-refresh" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="auto-refresh">データの自動更新</label>
      <span class="description">5分ごとに自動的にコンテンツを更新します</span>
    </div>
  </div>
</div>
```

3. **コンテキストに応じた適切なサイズを使用する**

```html
<!-- コンパクトなテーブルセル -->
<div class="ha-switch" size="sm">
  <div class="switch-container">
    <input type="checkbox" id="active" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="active">有効</label>
  </div>
</div>

<!-- 重要な設定 -->
<div class="ha-switch" size="lg">
  <div class="switch-container">
    <input type="checkbox" id="enable-account" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="enable-account">アカウントを有効化</label>
  </div>
</div>
```

4. **賢明なデフォルトを設定する**

```html
<!-- プライバシーに配慮したデフォルト（オフ） -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="share-analytics" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="share-analytics">分析データを共有</label>
  </div>
</div>

<!-- 利便性のデフォルト（オン） -->
<div class="ha-switch" checked>
  <div class="switch-container">
    <input type="checkbox" id="save-password" checked role="switch" aria-checked="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="save-password">パスワードを保存</label>
  </div>
</div>
```

5. **無効化されたスイッチを明確に示す**

```html
<!-- なぜ無効化されているかを説明 -->
<div class="ha-switch" disabled>
  <div class="switch-container">
    <input type="checkbox" id="beta" disabled role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="beta">ベータ機能</label>
      <span class="description">アクセスするにはプランをアップグレードしてください</span>
    </div>
  </div>
</div>
```

6. **即座に効果が現れる設定にのみ使用する**

```html
<!-- 良い例: 即座に切り替わる -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="theme" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="theme">ダークテーマ</label>
  </div>
</div>
```

### ❌ 非推奨

1. **曖昧なラベルを使用する**

```html
<!-- 不明確 -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="setting" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="setting">設定</label>
  </div>
</div>

<!-- より良い -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="notif-enable" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="notif-enable">通知を有効にする</label>
  </div>
</div>
```

2. **3つの状態を持つスイッチを作成する**

```javascript
// この混乱を招くパターンは避ける
// 代わりに別のコントロールを使用
```

3. **「明らかな」スイッチのラベルを削除する**

```html
<!-- 悪い例 - これが何をするのか不明確 -->
<div class="ha-switch">
  <div class="switch-container">
    <input type="checkbox" id="mystery" checked role="switch" aria-checked="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
  </div>
</div>

<!-- 良い例 -->
<div class="ha-switch" checked>
  <div class="switch-container">
    <input type="checkbox" id="dark-mode" checked role="switch" aria-checked="true">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="dark-mode">ダークモード</label>
  </div>
</div>
```

4. **ローディング状態にスイッチを使用する**

```html
<!-- 悪い例 - スイッチはローディングを表示しない -->
<!-- 代わりにスピナーやローディング状態を使用 -->
```

5. **説明なしでスイッチを無効化する**

```html
<!-- 悪い例 - なぜ無効化されているかユーザーが混乱 -->
<div class="ha-switch" disabled>
  <div class="switch-container">
    <input type="checkbox" id="feature" disabled role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <label for="feature">機能</label>
  </div>
</div>

<!-- 良い例 -->
<div class="ha-switch" disabled>
  <div class="switch-container">
    <input type="checkbox" id="premium-feature" disabled role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="premium-feature">プレミアム機能</label>
      <span class="description">アンロックするにはアップグレードしてください</span>
    </div>
  </div>
</div>
```

6. **フォーム送信が必要な場合にスイッチを使用する**

```html
<!-- 悪い例 - スイッチは即座に効果を示唆 -->
<!-- フォーム送信が必要な場合はチェックボックスを使用 -->
```

---

## バリエーション

### ダークモード切り替え

```html
<div class="ha-switch" id="dark-mode-toggle">
  <div class="switch-container">
    <input type="checkbox" id="dark-mode-switch" role="switch" aria-checked="false">
    <div class="switch-track">
      <div class="switch-thumb"></div>
    </div>
    <div class="label-wrapper">
      <label for="dark-mode-switch">ダークモード</label>
      <span class="description">目に優しい暗い配色</span>
    </div>
  </div>
</div>

<script>
const darkModeSwitch = document.getElementById('dark-mode-switch');
const html = document.documentElement;

// 保存された設定を読み込む
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  darkModeSwitch.checked = true;
  darkModeSwitch.setAttribute('aria-checked', 'true');
  document.getElementById('dark-mode-toggle').setAttribute('checked', '');
  html.setAttribute('data-theme', 'dark');
}

// スイッチの切り替えイベント
darkModeSwitch.addEventListener('change', function() {
  const isDark = this.checked;
  const switchElement = document.getElementById('dark-mode-toggle');

  // ARIA属性を更新
  this.setAttribute('aria-checked', isDark);

  // checked属性を更新
  if (isDark) {
    switchElement.setAttribute('checked', '');
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    switchElement.removeAttribute('checked');
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});
</script>
```

### 機能トグルの例

```html
<div class="settings-panel">
  <h3>機能設定</h3>

  <div class="ha-switch" id="autosave-toggle">
    <div class="switch-container">
      <input type="checkbox" id="autosave" role="switch" aria-checked="false">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="autosave">自動保存</label>
        <span class="description">変更を自動的に保存します</span>
      </div>
    </div>
  </div>

  <div class="ha-switch" id="spell-check-toggle" checked>
    <div class="switch-container">
      <input type="checkbox" id="spell-check" checked role="switch" aria-checked="true">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="spell-check">スペルチェック</label>
        <span class="description">入力時にスペルをチェックします</span>
      </div>
    </div>
  </div>

  <div class="ha-switch" id="autocomplete-toggle" checked>
    <div class="switch-container">
      <input type="checkbox" id="autocomplete" checked role="switch" aria-checked="true">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="autocomplete">オートコンプリート</label>
        <span class="description">入力候補を提案します</span>
      </div>
    </div>
  </div>
</div>

<script>
// 各機能のトグル処理
document.querySelectorAll('.settings-panel input[type="checkbox"]').forEach(input => {
  input.addEventListener('change', function() {
    const switchElement = this.closest('.ha-switch');
    const isChecked = this.checked;
    const featureName = this.id;

    // aria-checked属性を更新
    this.setAttribute('aria-checked', isChecked);

    // checked属性をスイッチ要素に反映
    if (isChecked) {
      switchElement.setAttribute('checked', '');
    } else {
      switchElement.removeAttribute('checked');
    }

    // 設定を保存
    localStorage.setItem(featureName, isChecked);

    // 機能を有効化/無効化
    console.log(`${featureName}: ${isChecked ? '有効' : '無効'}`);

    // 実際の機能を適用
    applyFeature(featureName, isChecked);
  });

  // 保存された設定を読み込む
  const savedValue = localStorage.getItem(input.id);
  if (savedValue !== null) {
    input.checked = savedValue === 'true';
    input.setAttribute('aria-checked', savedValue);
    if (savedValue === 'true') {
      input.closest('.ha-switch').setAttribute('checked', '');
    }
  }
});

function applyFeature(featureName, enabled) {
  // 各機能の実装ロジック
  switch(featureName) {
    case 'autosave':
      if (enabled) {
        // 自動保存を有効化
        console.log('自動保存を開始しました');
      } else {
        // 自動保存を無効化
        console.log('自動保存を停止しました');
      }
      break;
    case 'spell-check':
      // スペルチェックの有効化/無効化
      document.querySelectorAll('textarea, input[type="text"]').forEach(el => {
        el.spellcheck = enabled;
      });
      break;
    case 'autocomplete':
      // オートコンプリートの有効化/無効化
      console.log(`オートコンプリート: ${enabled ? 'オン' : 'オフ'}`);
      break;
  }
}
</script>
```

### 通知設定の例

```html
<form class="notification-settings">
  <h3>通知設定</h3>

  <fieldset>
    <legend>メール通知</legend>

    <div class="ha-switch" checked>
      <div class="switch-container">
        <input
          type="checkbox"
          id="email-digest"
          name="notifications"
          value="email-digest"
          checked
          role="switch"
          aria-checked="true"
        >
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <div class="label-wrapper">
          <label for="email-digest">デイリーダイジェスト</label>
          <span class="description">アクティビティの毎日のメール要約</span>
        </div>
      </div>
    </div>

    <div class="ha-switch">
      <div class="switch-container">
        <input
          type="checkbox"
          id="email-mentions"
          name="notifications"
          value="email-mentions"
          role="switch"
          aria-checked="false"
        >
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <div class="label-wrapper">
          <label for="email-mentions">メンション通知</label>
          <span class="description">誰かがあなたに@メンションしたとき</span>
        </div>
      </div>
    </div>
  </fieldset>

  <fieldset>
    <legend>プッシュ通知</legend>

    <div class="ha-switch" checked>
      <div class="switch-container">
        <input
          type="checkbox"
          id="push-messages"
          name="notifications"
          value="push-messages"
          checked
          role="switch"
          aria-checked="true"
        >
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <div class="label-wrapper">
          <label for="push-messages">新着メッセージ</label>
          <span class="description">デバイスに即座にアラート</span>
        </div>
      </div>
    </div>

    <div class="ha-switch">
      <div class="switch-container">
        <input
          type="checkbox"
          id="push-updates"
          name="notifications"
          value="push-updates"
          role="switch"
          aria-checked="false"
        >
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <div class="label-wrapper">
          <label for="push-updates">システム更新</label>
          <span class="description">重要な更新情報</span>
        </div>
      </div>
    </div>
  </fieldset>

  <fieldset>
    <legend>SMS通知</legend>

    <div class="ha-switch" disabled>
      <div class="switch-container">
        <input
          type="checkbox"
          id="sms-alerts"
          name="notifications"
          value="sms-alerts"
          disabled
          role="switch"
          aria-checked="false"
        >
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <div class="label-wrapper">
          <label for="sms-alerts">SMS アラート</label>
          <span class="description">プレミアムプランでご利用可能</span>
        </div>
      </div>
    </div>
  </fieldset>

  <button type="submit">設定を保存</button>
</form>

<style>
.notification-settings {
  max-width: 600px;
  margin: 2rem 0;
}

.notification-settings fieldset {
  border: 1px solid var(--color-neutral-200);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.notification-settings legend {
  font-weight: 600;
  padding: 0 0.5rem;
  color: var(--color-text-primary);
}

.notification-settings .ha-switch {
  margin-bottom: 1.5rem;
}

.notification-settings .ha-switch:last-of-type {
  margin-bottom: 0;
}

.notification-settings button[type="submit"] {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background-color: var(--color-primary-600);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.notification-settings button[type="submit"]:hover {
  background-color: var(--color-primary-700);
}
</style>

<script>
const notificationForm = document.querySelector('.notification-settings');

// スイッチの状態を処理
notificationForm.querySelectorAll('input[type="checkbox"]').forEach(input => {
  input.addEventListener('change', function() {
    const switchElement = this.closest('.ha-switch');
    const isChecked = this.checked;

    // aria-checked属性を更新
    this.setAttribute('aria-checked', isChecked);

    // checked属性をスイッチ要素に反映
    if (isChecked) {
      switchElement.setAttribute('checked', '');
    } else {
      switchElement.removeAttribute('checked');
    }

    console.log(`${this.value}: ${isChecked ? 'オン' : 'オフ'}`);
  });
});

// フォーム送信
notificationForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const settings = {};

  // すべてのスイッチの状態を収集
  this.querySelectorAll('input[type="checkbox"]').forEach(input => {
    settings[input.value] = input.checked;
  });

  console.log('保存された設定:', settings);

  // APIに送信
  // fetch('/api/settings/notifications', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(settings)
  // });

  alert('通知設定を保存しました！');
});
</script>
```

### 条件付き有効化

```html
<div class="conditional-settings">
  <div class="ha-switch" id="advanced-toggle">
    <div class="switch-container">
      <input
        type="checkbox"
        id="enable-advanced"
        role="switch"
        aria-checked="false"
        aria-controls="advanced-options"
      >
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="enable-advanced">詳細設定を有効化</label>
        <span class="description">追加のカスタマイズオプションにアクセス</span>
      </div>
    </div>
  </div>

  <fieldset id="advanced-options" disabled style="margin-top: 1.5rem;">
    <legend>詳細オプション</legend>

    <div class="ha-switch" size="sm" disabled>
      <div class="switch-container">
        <input type="checkbox" id="debug-mode" disabled role="switch" aria-checked="false">
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <label for="debug-mode">デバッグモード</label>
      </div>
    </div>

    <div class="ha-switch" size="sm" disabled>
      <div class="switch-container">
        <input type="checkbox" id="experimental" disabled role="switch" aria-checked="false">
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <label for="experimental">実験的機能</label>
      </div>
    </div>

    <div class="ha-switch" size="sm" disabled>
      <div class="switch-container">
        <input type="checkbox" id="verbose-logging" disabled role="switch" aria-checked="false">
        <div class="switch-track">
          <div class="switch-thumb"></div>
        </div>
        <label for="verbose-logging">詳細ログ</label>
      </div>
    </div>
  </fieldset>
</div>

<script>
const enableAdvanced = document.getElementById('enable-advanced');
const advancedOptions = document.getElementById('advanced-options');
const advancedSwitches = advancedOptions.querySelectorAll('.ha-switch');

enableAdvanced.addEventListener('change', function() {
  const isEnabled = this.checked;
  const toggleElement = document.getElementById('advanced-toggle');

  // メイントグルのaria-checked属性を更新
  this.setAttribute('aria-checked', isEnabled);

  // メイントグルのchecked属性を更新
  if (isEnabled) {
    toggleElement.setAttribute('checked', '');
  } else {
    toggleElement.removeAttribute('checked');
  }

  // フィールドセットを有効化/無効化
  advancedOptions.disabled = !isEnabled;

  // 各スイッチの無効化状態を更新
  advancedSwitches.forEach(switchEl => {
    const input = switchEl.querySelector('input');
    input.disabled = !isEnabled;

    if (isEnabled) {
      switchEl.removeAttribute('disabled');
    } else {
      switchEl.setAttribute('disabled', '');
    }
  });
});
</script>
```

### バリデーション付きスイッチ

```html
<form id="consent-form">
  <h3>必須の同意</h3>

  <div class="ha-switch" id="terms-switch" error>
    <div class="switch-container">
      <input
        type="checkbox"
        id="terms-consent"
        required
        role="switch"
        aria-checked="false"
        aria-invalid="true"
        aria-describedby="terms-error"
      >
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="terms-consent">利用規約に同意する</label>
        <span id="terms-error" class="description">
          続行するには同意が必要です
        </span>
      </div>
    </div>
  </div>

  <div class="ha-switch" id="privacy-switch" error>
    <div class="switch-container">
      <input
        type="checkbox"
        id="privacy-consent"
        required
        role="switch"
        aria-checked="false"
        aria-invalid="true"
        aria-describedby="privacy-error"
      >
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="privacy-consent">プライバシーポリシーに同意する</label>
        <span id="privacy-error" class="description">
          続行するには同意が必要です
        </span>
      </div>
    </div>
  </div>

  <div class="ha-switch" id="marketing-switch">
    <div class="switch-container">
      <input
        type="checkbox"
        id="marketing-consent"
        role="switch"
        aria-checked="false"
      >
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <div class="label-wrapper">
        <label for="marketing-consent">マーケティング情報を受け取る（任意）</label>
        <span class="description">特別オファーや更新情報</span>
      </div>
    </div>
  </div>

  <button type="submit">続行</button>
</form>

<script>
const consentForm = document.getElementById('consent-form');
const termsSwitch = document.getElementById('terms-consent');
const privacySwitch = document.getElementById('privacy-consent');
const marketingSwitch = document.getElementById('marketing-consent');

function validateSwitch(input, switchElement) {
  const isValid = input.checked;
  const errorSpan = switchElement.querySelector('.description');

  if (!isValid && input.required) {
    switchElement.setAttribute('error', '');
    input.setAttribute('aria-invalid', 'true');
    errorSpan.textContent = '続行するには同意が必要です';
    return false;
  } else {
    switchElement.removeAttribute('error');
    input.removeAttribute('aria-invalid');
    if (input.required) {
      errorSpan.textContent = '';
    }
    return true;
  }
}

// リアルタイムバリデーション
[termsSwitch, privacySwitch].forEach(input => {
  input.addEventListener('change', function() {
    const switchElement = this.closest('.ha-switch');
    const isChecked = this.checked;

    // aria-checked属性を更新
    this.setAttribute('aria-checked', isChecked);

    // checked属性を更新
    if (isChecked) {
      switchElement.setAttribute('checked', '');
    } else {
      switchElement.removeAttribute('checked');
    }

    validateSwitch(this, switchElement);
  });
});

// マーケティング同意の処理
marketingSwitch.addEventListener('change', function() {
  const switchElement = this.closest('.ha-switch');
  const isChecked = this.checked;

  this.setAttribute('aria-checked', isChecked);

  if (isChecked) {
    switchElement.setAttribute('checked', '');
  } else {
    switchElement.removeAttribute('checked');
  }
});

// フォーム送信
consentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const termsValid = validateSwitch(termsSwitch, document.getElementById('terms-switch'));
  const privacyValid = validateSwitch(privacySwitch, document.getElementById('privacy-switch'));

  if (termsValid && privacyValid) {
    console.log('同意を記録:', {
      terms: termsSwitch.checked,
      privacy: privacySwitch.checked,
      marketing: marketingSwitch.checked
    });
    alert('同意が記録されました！');
  } else {
    // 最初のエラーにフォーカス
    if (!termsValid) {
      termsSwitch.focus();
    } else if (!privacyValid) {
      privacySwitch.focus();
    }
  }
});
</script>
```

---

## テーマサポート

すべてのスイッチトークンは`data-theme`属性を使用したテーマ切り替えをサポートしています:

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-switch" checked>
    <div class="switch-container">
      <input type="checkbox" id="light-switch" checked role="switch" aria-checked="true">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="light-switch">ライトモードのスイッチ</label>
    </div>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-switch" checked>
    <div class="switch-container">
      <input type="checkbox" id="dark-switch" checked role="switch" aria-checked="true">
      <div class="switch-track">
        <div class="switch-thumb"></div>
      </div>
      <label for="dark-switch">ダークモードのスイッチ</label>
    </div>
  </div>
</html>

<!-- テーマ切り替え例 -->
<script>
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// 保存されたテーマを読み込む
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
</script>
```

---

## 統合例

### React/TypeScript 高度な統合例

```typescript
import React, { useState, useEffect } from 'react';
import '@hidearea-design/tokens/css/html/forms/switch.css';

interface SwitchProps {
  id: string;
  label: string;
  description?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  description,
  error = false,
  errorMessage,
  size = 'md',
  disabled = false,
  checked = false,
  onChange,
  ...ariaProps
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <div
      className="ha-switch"
      {...(size && { size })}
      {...(error && { error: '' })}
      {...(disabled && { disabled: '' })}
      {...(checked && { checked: '' })}
    >
      <div className="switch-container">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
          aria-invalid={error}
          aria-describedby={
            error
              ? `${id}-error`
              : description
                ? `${id}-desc`
                : ariaProps['aria-describedby']
          }
          {...ariaProps}
        />
        <div className="switch-track">
          <div className="switch-thumb"></div>
        </div>
        {(label || description || error) && (
          <div className="label-wrapper">
            <label htmlFor={id}>{label}</label>
            {(description || error) && (
              <span
                id={error ? `${id}-error` : `${id}-desc`}
                className="description"
              >
                {error ? errorMessage : description}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 設定フォームの例
interface SettingsFormProps {
  onSave: (settings: SettingsData) => void;
}

interface SettingsData {
  darkMode: boolean;
  notifications: boolean;
  emailDigest: boolean;
  autoSave: boolean;
  spellCheck: boolean;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSave }) => {
  const [settings, setSettings] = useState<SettingsData>({
    darkMode: false,
    notifications: true,
    emailDigest: false,
    autoSave: true,
    spellCheck: true,
  });

  // ローカルストレージから設定を読み込む
  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 設定を更新
  const updateSetting = (key: keyof SettingsData, value: boolean) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('app-settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  // ダークモードの適用
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      settings.darkMode ? 'dark' : 'light'
    );
  }, [settings.darkMode]);

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="settings-form">
      <h2>アプリケーション設定</h2>

      <section>
        <h3>表示設定</h3>

        <Switch
          id="dark-mode"
          label="ダークモード"
          description="目に優しい暗い配色に切り替えます"
          checked={settings.darkMode}
          onChange={(checked) => updateSetting('darkMode', checked)}
        />
      </section>

      <section>
        <h3>通知設定</h3>

        <Switch
          id="notifications"
          label="通知を有効にする"
          description="アプリ内通知とプッシュ通知を受け取ります"
          checked={settings.notifications}
          onChange={(checked) => updateSetting('notifications', checked)}
        />

        <Switch
          id="email-digest"
          label="メールダイジェスト"
          description="毎日のアクティビティ要約をメールで受信します"
          checked={settings.emailDigest}
          onChange={(checked) => updateSetting('emailDigest', checked)}
          disabled={!settings.notifications}
        />
      </section>

      <section>
        <h3>編集設定</h3>

        <Switch
          id="auto-save"
          label="自動保存"
          description="変更を自動的に保存します"
          checked={settings.autoSave}
          onChange={(checked) => updateSetting('autoSave', checked)}
        />

        <Switch
          id="spell-check"
          label="スペルチェック"
          description="入力時にスペルミスを強調表示します"
          checked={settings.spellCheck}
          onChange={(checked) => updateSetting('spellCheck', checked)}
        />
      </section>

      <button onClick={handleSave} className="save-button">
        設定を保存
      </button>
    </div>
  );
};

export { Switch, SettingsForm };
```

---

## スイッチ vs チェックボックス vs ラジオ

### スイッチ
- **状態:** オン/オフのみ
- **効果:** 即座に反映
- **フォーム:** オプション（単独で動作可能）
- **インタラクション:** 1つの設定を切り替え
- **例:** ダークモード、通知、機能フラグ

### チェックボックス
- **状態:** チェック/未チェック（オプションで不確定）
- **効果:** フォーム送信が必要
- **フォーム:** フォーム送信に必須
- **インタラクション:** 複数の独立したオプションを選択
- **例:** 同意チェックボックス、複数選択フィルター

### ラジオボタン
- **状態:** 選択/未選択（最大1つが選択）
- **効果:** フォーム送信が必要
- **フォーム:** フォーム送信に必須
- **インタラクション:** 複数のオプションから1つを選択
- **例:** 性別選択、支払い方法、サイズ選択

### 決定マトリックス

| 必要な機能 | 使用するコントロール |
|-----------|-------------------|
| 即座の効果、オン/オフ | **スイッチ** |
| フォーム送信、オン/オフ | **チェックボックス** |
| 複数選択 | **チェックボックス** |
| 複数から1つ選択 | **ラジオボタン** |
| 2つのオプション、排他的 | **ラジオボタン** または **スイッチ** |
| 複雑なワークフロー | **セレクト**を検討 |

---

## 関連コンポーネント

- [Checkbox](./checkbox.md) - 複数の独立した選択用
- [Radio](./radio.md) - 複数オプションからの単一選択用
- [Input](./input.md) - テキスト入力用
- [Select](./select.md) - ドロップダウン選択用
- [Button](../layout/button.md) - アクションと送信用

---

## 関連ドキュメント

- [アーキテクチャガイド](../architecture.md)
- [デザイントークン](../tokens.md)
- [コンポーネントリファレンス](./README.md)
- [使用方法ガイド](../使用方法ガイド.md)
- [アクセシビリティガイドライン](../accessibility.md)

---

**最終更新:** 2025-12-12
**コンポーネントステータス:** 本番環境対応
**アクセシビリティレベル:** WCAG 2.1 AA準拠
