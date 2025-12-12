# Select (セレクトボックス) コンポーネント

**カテゴリ:** Forms
**ファイル:** `src/css/components/forms/select.css`
**ステータス:** ✅ 実装済み

---

## 概要

Selectコンポーネントは、ユーザーがドロップダウンメニューから1つのオプションを選択できるフォーム要素です。複数の選択肢から1つを選ぶ際に使用します。3つのバリアント（default, filled, outlined）と3つのサイズ（sm, md, lg）をサポートしています。

### 用途

- 国・地域の選択
- カテゴリーやタイプの選択
- 日付の月や年の選択
- 言語設定の切り替え
- フィルター条件の指定
- ステータスや優先度の設定

---

## バリアント

### 1. Default (デフォルト - アウトライン)

標準的なアウトラインスタイルです。最も一般的に使用されます。

**使用場面:**
- 一般的なフォーム
- ログインフォーム
- 設定画面

**スタイル:**
- ボーダー: 1px solid
- 背景: プライマリ背景色
- フォーカス時: プライマリカラーのボーダー + フォーカスリング

### 2. Filled (塗りつぶし)

背景が塗りつぶされたスタイルです。視覚的に区別しやすいです。

**使用場面:**
- フィルターバー
- 検索フォーム
- 背景が明るい場所での使用

**スタイル:**
- ボーダー: transparent
- 背景: セカンダリ背景色
- フォーカス時: プライマリ背景色 + ボーダー表示

### 3. Outlined (強調アウトライン)

2pxの太いボーダーで強調されたスタイルです。

**使用場面:**
- 重要な選択フィールド
- 単独で配置されるセレクトボックス
- 視覚的な強調が必要な場合

**スタイル:**
- ボーダー: 2px solid
- 背景: 透明
- フォーカス時: プライマリカラーのボーダー + フォーカスリング

---

## サイズ

### Small (sm)
- パディング: `0.375rem 0.75rem` (右側: 2.5rem で矢印アイコン用)
- フォントサイズ: `0.875rem`
- 最小高さ: 約32px

### Medium (md) - デフォルト
- パディング: `0.625rem 1rem` (右側: 2.5rem で矢印アイコン用)
- フォントサイズ: `1rem`
- 最小高さ: 約40px

### Large (lg)
- パディング: `0.75rem 1.25rem` (右側: 2.5rem で矢印アイコン用)
- フォントサイズ: `1.125rem`
- 最小高さ: 約48px

---

## 状態

### Default (デフォルト)

通常の選択可能な状態です。マウスホバーでわずかな視覚的フィードバックが表示されます。

### Focus (フォーカス)

キーボードフォーカスがある状態で、プライマリカラーのボーダーとフォーカスリングが表示されます。

### Hover (ホバー)

マウスカーソルがセレクトボックス上にある状態です。

### Disabled (無効)

操作できない状態で、視覚的に無効であることを示します。背景色が薄くなり、テキストも薄くなります。

### Error (エラー)

バリデーションエラーがある状態です。ボーダーはエラーカラーで表示され、矢印アイコンもエラーカラーになります。

---

## 使用方法

### Pattern 1: Plain HTML (推奨)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="@hidearea-design/tokens/css/variables.css">
  <link rel="stylesheet" href="@hidearea-design/tokens/css/html/forms/select.css">
</head>
<body>
  <!-- デフォルトバリアント -->
  <div class="ha-select" variant="default" size="md">
    <select>
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
      <option value="uk">イギリス</option>
    </select>
  </div>

  <!-- Filledバリアント -->
  <div class="ha-select" variant="filled" size="md">
    <select>
      <option value="">カテゴリを選択</option>
      <option value="tech">テクノロジー</option>
      <option value="design">デザイン</option>
      <option value="business">ビジネス</option>
    </select>
  </div>

  <!-- Outlinedバリアント -->
  <div class="ha-select" variant="outlined" size="lg">
    <select>
      <option value="">優先度を選択</option>
      <option value="high">高</option>
      <option value="medium">中</option>
      <option value="low">低</option>
    </select>
  </div>

  <!-- エラー状態 -->
  <div class="ha-select" variant="default" size="md" error>
    <select aria-invalid="true" aria-describedby="country-error">
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
    </select>
  </div>

  <!-- 無効状態 -->
  <div class="ha-select" variant="default" size="md">
    <select disabled>
      <option>利用不可</option>
    </select>
  </div>
</body>
</html>
```

### Pattern 2: WebComponents (Shadow DOM)

```html
<!-- カスタム要素として使用 -->
<ha-select variant="default" size="md">
  <select>
    <option value="">選択してください</option>
    <option value="jp">日本</option>
    <option value="us">アメリカ</option>
  </select>
</ha-select>

<ha-select variant="filled" size="md">
  <select>
    <option value="">カテゴリを選択</option>
    <option value="tech">テクノロジー</option>
  </select>
</ha-select>

<ha-select variant="outlined" size="lg">
  <select disabled>
    <option>無効なセレクト</option>
  </select>
</ha-select>
```

### Pattern 3: React/Vue

```javascript
// React例
function Select({ variant = 'default', size = 'md', options, error = false, ...props }) {
  return (
    <div className="ha-select" data-variant={variant} data-size={size}>
      <select {...props} aria-invalid={error}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// 使用例
const countries = [
  { value: '', label: '選択してください' },
  { value: 'jp', label: '日本' },
  { value: 'us', label: 'アメリカ' },
  { value: 'uk', label: 'イギリス' },
];

<Select
  variant="default"
  size="md"
  options={countries}
  error={false}
  onChange={(e) => setCountry(e.target.value)}
/>
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
  <div class="ha-select" variant="default" size="md">
    <select>
      <option value="">選択してください</option>
      <option value="opt1">オプション1</option>
      <option value="opt2">オプション2</option>
    </select>
  </div>
</body>
</html>
```

---

## HTML例

### オプショングループの使用

```html
<div class="ha-select" size="md">
  <select>
    <option value="">タイムゾーンを選択</option>
    <optgroup label="アジア">
      <option value="tokyo">東京 (UTC+9)</option>
      <option value="seoul">ソウル (UTC+9)</option>
      <option value="bangkok">バンコク (UTC+7)</option>
    </optgroup>
    <optgroup label="ヨーロッパ">
      <option value="london">ロンドン (UTC+0)</option>
      <option value="paris">パリ (UTC+1)</option>
      <option value="berlin">ベルリン (UTC+1)</option>
    </optgroup>
    <optgroup label="アメリカ">
      <option value="newyork">ニューヨーク (UTC-5)</option>
      <option value="losangeles">ロサンゼルス (UTC-8)</option>
    </optgroup>
  </select>
</div>
```

### 複数選択（Multiple）

```html
<div class="ha-select" size="md">
  <select multiple>
    <option value="">スキルを選択（複数可）</option>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="design">デザイン</option>
  </select>
</div>
```

### ラベル付きセレクト

```html
<div class="select-group">
  <label for="country" class="select-label">国を選択</label>
  <div class="ha-select" size="md">
    <select id="country" name="country" required>
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
      <option value="uk">イギリス</option>
      <option value="de">ドイツ</option>
    </select>
  </div>
  <span class="select-helper">お住まいの国を選択してください</span>
</div>
```

### ヘルパーテキスト付き

```html
<div class="select-group">
  <label for="category" class="select-label">カテゴリー</label>
  <div class="ha-select" size="md">
    <select id="category" name="category">
      <option value="">選択してください</option>
      <option value="tech">テクノロジー</option>
      <option value="design">デザイン</option>
      <option value="business">ビジネス</option>
    </select>
  </div>
  <span class="select-helper">コンテンツのカテゴリを選択してください</span>
</div>
```

### エラーメッセージ付き

```html
<div class="select-group">
  <label for="region" class="select-label">地域を選択</label>
  <div class="ha-select" size="md" error>
    <select id="region" name="region" aria-invalid="true" aria-describedby="region-error">
      <option value="">選択してください</option>
      <option value="kanto">関東</option>
      <option value="kansai">関西</option>
    </select>
  </div>
  <span id="region-error" class="select-helper select-helper-error">地域は必須項目です</span>
</div>
```

### サイズバリアント

```html
<!-- Small サイズ -->
<div class="ha-select" size="sm">
  <select>
    <option value="">選択</option>
    <option value="1">オプション1</option>
    <option value="2">オプション2</option>
  </select>
</div>

<!-- Medium サイズ（デフォルト） -->
<div class="ha-select" size="md">
  <select>
    <option value="">選択してください</option>
    <option value="1">オプション1</option>
    <option value="2">オプション2</option>
  </select>
</div>

<!-- Large サイズ -->
<div class="ha-select" size="lg">
  <select>
    <option value="">選択してください</option>
    <option value="1">オプション1</option>
    <option value="2">オプション2</option>
  </select>
</div>
```

### フルウィッド

```html
<!-- コンテナがフルウィッドの場合 -->
<div class="ha-select" full-width size="md">
  <select>
    <option value="">全幅で表示</option>
    <option value="1">オプション1</option>
    <option value="2">オプション2</option>
  </select>
</div>
```

---

## 属性

| 属性 | 値 | デフォルト | 説明 |
|------|-----|-----------|------|
| `variant` | `default` \| `filled` \| `outlined` | `default` | セレクトボックスのスタイルバリアント |
| `size` | `sm` \| `md` \| `lg` | `md` | セレクトボックスのサイズ |
| `error` | boolean | `false` | エラー状態を示す |
| `disabled` | boolean | `false` | セレクトボックスを無効化 |
| `full-width` | boolean | `false` | 親要素の幅いっぱいに拡張 |
| `multiple` | boolean | `false` | 複数選択を許可 |
| `required` | boolean | `false` | 必須項目を示す |
| `aria-label` | string | - | スクリーンリーダー用ラベル |
| `aria-invalid` | boolean | `false` | エラー状態をアクセシビリティで示す |
| `aria-describedby` | string | - | ヘルパーテキストやエラーメッセージのID |

---

## CSS変数

Selectコンポーネントは以下のCSS変数（デザイントークン）を使用しています:

### 色関連
- `--color-primary` - フォーカス時のボーダーカラー
- `--color-primary-alpha` - フォーカスリング用のアルファ値付きプライマリカラー
- `--color-background` - デフォルト背景色
- `--color-background-secondary` - Filledバリアント背景色
- `--color-background-disabled` - 無効状態の背景色
- `--color-text-primary` - テキストカラー
- `--color-text-secondary` - 矢印アイコンのカラー
- `--color-text-disabled` - 無効状態のテキストカラー
- `--color-border` - デフォルトボーダーカラー
- `--color-error` - エラーカラー
- `--color-error-alpha` - エラーフォーカスリング用のアルファ値付きカラー

### スペーシング
- `--spacing-1-5` - 0.375rem (sm パディング縦)
- `--spacing-2-5` - 0.625rem (md パディング縦)
- `--spacing-3` - 0.75rem (sm パディング横)
- `--spacing-4` - 1rem (md パディング横)
- `--spacing-5` - 1.25rem (lg パディング横)

### ボーダー
- `--border-radius-md` - セレクトボックスの角丸
- `--border-width-1` - 1px (デフォルト)
- `--border-width-2` - 2px (Outlinedバリアント)

### タイポグラフィ
- `--font-size-base` - デフォルトフォントサイズ
- `--font-size-sm` - Smallサイズのフォントサイズ
- `--font-size-lg` - Largeサイズのフォントサイズ

### アニメーション
- `--animation-duration-base` - トランジション時間（200ms）

---

## アクセシビリティ

### キーボード操作

- **Tab**: セレクトボックスにフォーカス
- **Space / Enter**: ドロップダウンメニューを開く
- **↑ / ↓**: オプション間を移動
- **Home / End**: 最初/最後のオプションに移動
- **文字キー**: その文字で始まるオプションに移動
- **Esc**: ドロップダウンメニューを閉じる
- **Shift + Tab**: 前の要素にフォーカス

### ARIA属性

```html
<!-- エラー状態のセレクトボックス -->
<div class="select-group">
  <label for="country" class="select-label">
    国を選択 <span aria-label="required">*</span>
  </label>
  <div class="ha-select" error>
    <select
      id="country"
      aria-invalid="true"
      aria-describedby="country-error"
      aria-required="true"
    >
      <option value="">選択してください</option>
      <option value="jp">日本</option>
      <option value="us">アメリカ</option>
    </select>
  </div>
  <span id="country-error" class="select-helper select-helper-error">
    国を選択してください
  </span>
</div>

<!-- オプショングループ -->
<label for="timezone">タイムゾーン</label>
<div class="ha-select">
  <select id="timezone">
    <optgroup label="アジア">
      <option value="tokyo">東京</option>
      <option value="seoul">ソウル</option>
    </optgroup>
    <optgroup label="ヨーロッパ">
      <option value="london">ロンドン</option>
      <option value="paris">パリ</option>
    </optgroup>
  </select>
</div>

<!-- 複数選択 -->
<label for="skills">スキル（複数選択可）</label>
<div class="ha-select">
  <select id="skills" multiple aria-label="スキルの複数選択">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
  </select>
</div>
```

### フォーカススタイル

フォーカスリングは WCAG 2.1 のアクセシビリティガイドラインに準拠しています：
- 3px のフォーカスリング幅
- 2px のオフセット
- 十分なコントラスト比（4.5:1 以上）
- 明確な視覚的フィードバック

### スクリーンリーダー対応

- セマンティックな `<select>` 要素を使用
- 必須項目には `required` 属性またはラベルに「*」を記載
- エラー状態には `aria-invalid="true"` を使用
- エラーメッセージには `aria-describedby` で関連付け
- オプショングループは `<optgroup>` で視覚的・構造的に示す

---

## ベストプラクティス

### ✅ 推奨

1. **明確なラベル**
   - 何を選択するのか明確に記述
   - 必須項目には視覚的な表示を追加（* など）

```html
<!-- 良い例 -->
<label for="country">国を選択</label>
<div class="ha-select">
  <select id="country">
    <option value="">選択してください</option>
    <option value="jp">日本</option>
  </select>
</div>
```

2. **適切なデフォルト値**
   - プレースホルダーオプションを最初に配置
   - よく使われる選択肢を上部に配置

```html
<!-- 良い例 -->
<select>
  <option value="">選択してください</option>
  <option value="jp">日本</option>
  <option value="us">アメリカ</option>
</select>
```

3. **オプションの整理**
   - 論理的な順序で並べる（アルファベット順、使用頻度順など）
   - 多数のオプション（10個以上）は `<optgroup>` でグループ化
   - 関連オプションをグループ化

```html
<!-- 良い例 -->
<select>
  <option value="">選択してください</option>
  <optgroup label="アジア">
    <option value="japan">日本</option>
    <option value="korea">韓国</option>
  </optgroup>
  <optgroup label="ヨーロッパ">
    <option value="france">フランス</option>
    <option value="germany">ドイツ</option>
  </optgroup>
</select>
```

4. **ヘルパーテキスト**
   - 選択のヒントや補足情報を提供
   - エラーメッセージは具体的で実行可能な内容

```html
<!-- 良い例 -->
<div class="select-group">
  <label for="region">地域</label>
  <div class="ha-select">
    <select id="region">
      <option value="">選択してください</option>
      <option value="kanto">関東</option>
    </select>
  </div>
  <span class="select-helper">配送先を選択してください</span>
</div>
```

5. **適切なバリアントの選択**
   - 通常のフォーム: Default
   - フィルター・検索: Filled
   - 強調が必要: Outlined

### ❌ 非推奨

1. **ラベルなし**
   - 必ずラベルテキストを提供
   - プレースホルダーだけでは不十分

```html
<!-- 悪い例 -->
<select>
  <option>選択してください</option>
</select>

<!-- 良い例 -->
<label for="country">国を選択</label>
<select id="country">
  <option value="">選択してください</option>
</select>
```

2. **多すぎるオプション**
   - 20個を超える場合は検索機能付きセレクトを検討
   - またはオートコンプリート入力を使用
   - オプショングループでグループ化を検討

```html
<!-- 避けるべき例 -->
<select>
  <option>A</option>
  <option>B</option>
  <!-- ... 50個以上のオプション ... -->
  <option>Z</option>
</select>

<!-- 改善案 -->
<select>
  <optgroup label="A">
    <option>Apple</option>
    <option>Apricot</option>
  </optgroup>
  <optgroup label="B">
    <option>Banana</option>
  </optgroup>
</select>
```

3. **複雑な階層構造**
   - ネストされた optgroup は避ける
   - シンプルな1-2階層を維持

```html
<!-- 避けるべき例 -->
<select>
  <optgroup label="地域">
    <optgroup label="アジア">  <!-- ネスト不可能 -->
      <option>日本</option>
    </optgroup>
  </optgroup>
</select>
```

4. **曖昧な選択肢**
   - 「その他」だけでなく具体的な説明を提供
   - ユーザーが迷わないようにする

```html
<!-- 悪い例 -->
<select>
  <option>選択</option>
  <option>その他</option>
</select>

<!-- 良い例 -->
<select>
  <option value="">選択してください</option>
  <option value="other">上記の選択肢にない</option>
</select>
```

5. **バリアント・サイズの不統一**
   - フォーム内でバリアント・サイズを統一
   - 意図的な強調以外は同じスタイルを使用

```html
<!-- 避けるべき例 -->
<div class="ha-select" size="sm"><select>...</select></div>
<div class="ha-select" size="lg"><select>...</select></div>

<!-- 良い例 -->
<div class="ha-select" size="md"><select>...</select></div>
<div class="ha-select" size="md"><select>...</select></div>
```

---

## 関連コンポーネント

- [Input](./input.md) - テキスト入力
- [Checkbox](./checkbox.md) - 複数選択（複数チェック）
- [Radio](./radio.md) - 単一選択（固定表示）
- [Textarea](./textarea.md) - 複数行入力
- [Button](../layout/button.md) - フォーム送信ボタン
- [Form Group](./form-group.md) - フォーム要素のグループ化

---

## テーマ対応

全てのセレクトボックストークンはテーマに対応しています。`data-theme` 属性を変更するだけで、自動的にダークモードに切り替わります。

```html
<!-- ライトテーマ -->
<html data-theme="light">
  <div class="ha-select">
    <select>
      <option>オプション</option>
    </select>
  </div>
</html>

<!-- ダークテーマ -->
<html data-theme="dark">
  <div class="ha-select">
    <select>
      <option>オプション</option>
    </select>
  </div>
</html>
```

---

## 実装詳細

### CSS アーキテクチャ

Selectコンポーネントは以下の構造で構成されています：

```
:host (Web Components)
├── appearance: none (ネイティブドロップダウンを非表示)
├── .select-wrapper (フレックスコンテナ)
├── select (実際のセレクト要素)
└── .arrow (矢印アイコン)
```

### 矢印アイコンの配置

- 絶対配置で右側に配置
- ポインターイベントを無効化（`pointer-events: none`）
- 無効状態時に色を変更

### フォーカスリング

- ボックスシャドウで実装
- オフセット付き（より視認性を高める）
- エラー状態で色を変更

### トランジション

- すべての視覚的変化は `transition: all 0.2s ease` で滑らかに
- ホバー・フォーカス・エラーへの状態変化

---

## 関連ドキュメント

- [アーキテクチャガイド](../../../docs/アーキテクチャガイド.md)
- [使用方法ガイド](../../../docs/使用方法ガイド.md)
- [コンポーネントリファレンス](./README.md)
- [設計トークン](../../../docs/tokens.md)

---

**最終更新:** 2025-12-12
