# Avatar コンポーネント

ユーザーやエンティティを表す画像またはイニシャルを表示するコンポーネントです。

## 概要

Avatarコンポーネントは、ユーザープロフィール画像、イニシャル、またはアイコンを円形や角丸の形状で表示します。オンライン状態を示すステータスインジケーターや、複数のアバターをグループ表示する機能も提供します。

## 基本的な使い方

### 画像アバター

```html
<div class="avatar avatar-md">
  <img src="/path/to/image.jpg" alt="ユーザー名">
</div>
```

### イニシャルアバター

```html
<div class="avatar avatar-md avatar-primary">
  <span class="avatar-text">田中</span>
</div>
```

### アイコンアバター

```html
<div class="avatar avatar-md avatar-default">
  <svg class="avatar-icon" width="20" height="20">
    <!-- アイコンSVG -->
  </svg>
</div>
```

## サイズバリアント

6つのサイズオプションが利用可能です：

```html
<!-- 超小 (24px) -->
<div class="avatar avatar-xs">
  <img src="/image.jpg" alt="User">
</div>

<!-- 小 (32px) -->
<div class="avatar avatar-sm">
  <img src="/image.jpg" alt="User">
</div>

<!-- 中（デフォルト、40px） -->
<div class="avatar avatar-md">
  <img src="/image.jpg" alt="User">
</div>

<!-- 大 (48px) -->
<div class="avatar avatar-lg">
  <img src="/image.jpg" alt="User">
</div>

<!-- 特大 (64px) -->
<div class="avatar avatar-xl">
  <img src="/image.jpg" alt="User">
</div>

<!-- 超特大 (96px) -->
<div class="avatar avatar-2xl">
  <img src="/image.jpg" alt="User">
</div>
```

## カラーバリアント

イニシャルやアイコン表示時に使用できる6つのカラーバリアント：

```html
<!-- デフォルト（グレー） -->
<div class="avatar avatar-md avatar-default">
  <span class="avatar-text">A</span>
</div>

<!-- プライマリ -->
<div class="avatar avatar-md avatar-primary">
  <span class="avatar-text">B</span>
</div>

<!-- 成功（グリーン） -->
<div class="avatar avatar-md avatar-success">
  <span class="avatar-text">C</span>
</div>

<!-- 警告（イエロー） -->
<div class="avatar avatar-md avatar-warning">
  <span class="avatar-text">D</span>
</div>

<!-- エラー（レッド） -->
<div class="avatar avatar-md avatar-error">
  <span class="avatar-text">E</span>
</div>

<!-- 情報（ブルー） -->
<div class="avatar avatar-md avatar-info">
  <span class="avatar-text">F</span>
</div>
```

## 形状バリアント

3つの形状オプション：

```html
<!-- 円形（デフォルト） -->
<div class="avatar avatar-md avatar-circle">
  <img src="/image.jpg" alt="User">
</div>

<!-- 角丸 -->
<div class="avatar avatar-md avatar-rounded">
  <img src="/image.jpg" alt="User">
</div>

<!-- 四角 -->
<div class="avatar avatar-md avatar-square">
  <img src="/image.jpg" alt="User">
</div>
```

## ステータスインジケーター

オンライン状態を示すインジケーター：

```html
<!-- オンライン（グリーン） -->
<div class="avatar avatar-md">
  <img src="/image.jpg" alt="User">
  <span class="avatar-status avatar-status-online"></span>
</div>

<!-- オフライン（グレー） -->
<div class="avatar avatar-md">
  <img src="/image.jpg" alt="User">
  <span class="avatar-status avatar-status-offline"></span>
</div>

<!-- 離席（イエロー） -->
<div class="avatar avatar-md">
  <img src="/image.jpg" alt="User">
  <span class="avatar-status avatar-status-away"></span>
</div>

<!-- 取り込み中（レッド） -->
<div class="avatar avatar-md">
  <img src="/image.jpg" alt="User">
  <span class="avatar-status avatar-status-busy"></span>
</div>
```

## グループアバター

複数のアバターを重ねて表示：

```html
<div class="avatar-group">
  <div class="avatar avatar-sm">
    <img src="/user1.jpg" alt="User 1">
  </div>
  <div class="avatar avatar-sm">
    <img src="/user2.jpg" alt="User 2">
  </div>
  <div class="avatar avatar-sm">
    <img src="/user3.jpg" alt="User 3">
  </div>
  <div class="avatar avatar-sm avatar-default">
    <span class="avatar-text">+5</span>
  </div>
</div>
```

## インタラクティブアバター

クリック可能なアバター（ホバー効果付き）：

```html
<a href="/profile" class="avatar avatar-md avatar-interactive">
  <img src="/image.jpg" alt="プロフィールを表示">
</a>
```

## デザイントークン

### サイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.size.xs` | `1.5rem` | 超小サイズ (24px) |
| `component.avatar.size.sm` | `2rem` | 小サイズ (32px) |
| `component.avatar.size.md` | `2.5rem` | 中サイズ (40px) |
| `component.avatar.size.lg` | `3rem` | 大サイズ (48px) |
| `component.avatar.size.xl` | `4rem` | 特大サイズ (64px) |
| `component.avatar.size.2xl` | `6rem` | 超特大サイズ (96px) |

### 背景色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.background.default` | `{background.tertiary}` | デフォルト背景 |
| `component.avatar.background.primary` | `{primary.default}` | プライマリ背景 |
| `component.avatar.background.success` | `{success.default}` | 成功背景 |
| `component.avatar.background.warning` | `{warning.default}` | 警告背景 |
| `component.avatar.background.error` | `{error.default}` | エラー背景 |
| `component.avatar.background.info` | `{info.default}` | 情報背景 |

### テキスト色

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.text.default` | `{foreground.secondary}` | デフォルトテキスト色 |
| `component.avatar.text.onColor` | `{foreground.inverse}` | カラー背景上のテキスト色 |

### ボーダー

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.border.width` | `{border.width.2}` | ボーダー幅 (2px) |
| `component.avatar.border.color` | `{border.default}` | ボーダー色 |

### 角丸

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.borderRadius.circle` | `{border.radius.full}` | 円形 (50%) |
| `component.avatar.borderRadius.rounded` | `{border.radius.lg}` | 角丸 (0.5rem) |
| `component.avatar.borderRadius.square` | `{border.radius.sm}` | 四角 (0.25rem) |

### フォントサイズ（イニシャル）

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.fontSize.xs` | `0.625rem` | 超小サイズのフォント (10px) |
| `component.avatar.fontSize.sm` | `0.75rem` | 小サイズのフォント (12px) |
| `component.avatar.fontSize.md` | `0.875rem` | 中サイズのフォント (14px) |
| `component.avatar.fontSize.lg` | `1rem` | 大サイズのフォント (16px) |
| `component.avatar.fontSize.xl` | `1.25rem` | 特大サイズのフォント (20px) |
| `component.avatar.fontSize.2xl` | `2rem` | 超特大サイズのフォント (32px) |

### アイコンサイズ

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.icon.size.xs` | `0.875rem` | 超小サイズのアイコン (14px) |
| `component.avatar.icon.size.sm` | `1rem` | 小サイズのアイコン (16px) |
| `component.avatar.icon.size.md` | `1.25rem` | 中サイズのアイコン (20px) |
| `component.avatar.icon.size.lg` | `1.5rem` | 大サイズのアイコン (24px) |
| `component.avatar.icon.size.xl` | `2rem` | 特大サイズのアイコン (32px) |
| `component.avatar.icon.size.2xl` | `3rem` | 超特大サイズのアイコン (48px) |

### ステータスインジケーター

#### サイズ
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.status.size.xs` | `0.375rem` | 超小サイズのステータス (6px) |
| `component.avatar.status.size.sm` | `0.5rem` | 小サイズのステータス (8px) |
| `component.avatar.status.size.md` | `0.625rem` | 中サイズのステータス (10px) |
| `component.avatar.status.size.lg` | `0.75rem` | 大サイズのステータス (12px) |
| `component.avatar.status.size.xl` | `1rem` | 特大サイズのステータス (16px) |
| `component.avatar.status.size.2xl` | `1.5rem` | 超特大サイズのステータス (24px) |

#### 背景色
| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.status.background.online` | `{success.default}` | オンライン状態 |
| `component.avatar.status.background.offline` | `{foreground.tertiary}` | オフライン状態 |
| `component.avatar.status.background.away` | `{warning.default}` | 離席状態 |
| `component.avatar.status.background.busy` | `{error.default}` | 取り込み中状態 |

### ホバー効果

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.hover.opacity` | `0.8` | ホバー時の透明度 |
| `component.avatar.hover.scale` | `1.05` | ホバー時の拡大率 |
| `component.avatar.hover.transition.duration` | `{animation.duration.fast}` | トランジション時間 (150ms) |

### グループアバター

| トークン | 値 | 説明 |
|---------|-----|------|
| `component.avatar.group.overlap` | `-0.5rem` | アバター同士の重なり幅 (-8px) |
| `component.avatar.group.zIndexIncrement` | `1` | 各アバターのz-index増分 |

## アクセシビリティ

### 代替テキスト

画像には必ず`alt`属性を設定：

```html
<div class="avatar avatar-md">
  <img src="/user.jpg" alt="田中太郎">
</div>
```

### ARIA属性

```html
<div class="avatar avatar-md" role="img" aria-label="田中太郎のプロフィール画像">
  <img src="/user.jpg" alt="">
</div>
```

### ステータス情報

```html
<div class="avatar avatar-md">
  <img src="/user.jpg" alt="田中太郎">
  <span class="avatar-status avatar-status-online"
        aria-label="オンライン"></span>
</div>
```

### インタラクティブアバター

```html
<button class="avatar avatar-md avatar-interactive"
        aria-label="プロフィール設定を開く">
  <img src="/user.jpg" alt="">
</button>
```

## ベストプラクティス

### 使用すべき場合

- ユーザープロフィール表示
- コメントや投稿の作者表示
- チームメンバー一覧
- メッセージの送信者表示
- 通知の発信元表示

### サイズの選択指針

- **xs (24px)**: コンパクトなリストや通知
- **sm (32px)**: テーブルやカード内
- **md (40px)**: 一般的な使用（デフォルト）
- **lg (48px)**: プロフィールカード
- **xl (64px)**: プロフィールヘッダー
- **2xl (96px)**: ユーザー設定ページ

### イニシャルの生成

```javascript
function getInitials(name) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// 使用例
const initials = getInitials('田中 太郎'); // "田太"
```

### カラーの自動割り当て

```javascript
function getAvatarColor(name) {
  const colors = ['primary', 'success', 'warning', 'error', 'info'];
  const hash = name.split('').reduce((acc, char) =>
    acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}
```

### パフォーマンス最適化

画像の最適化：

```html
<!-- srcsetで高解像度対応 -->
<div class="avatar avatar-md">
  <img src="/user-40.jpg"
       srcset="/user-40.jpg 1x, /user-80.jpg 2x"
       alt="User">
</div>

<!-- 遅延読み込み -->
<div class="avatar avatar-md">
  <img src="/user.jpg" alt="User" loading="lazy">
</div>
```

## 実装例

### 動的アバター生成

```javascript
function createAvatar(user) {
  const avatar = document.createElement('div');
  avatar.className = `avatar avatar-md avatar-${getAvatarColor(user.name)}`;

  if (user.image) {
    const img = document.createElement('img');
    img.src = user.image;
    img.alt = user.name;
    avatar.appendChild(img);
  } else {
    const text = document.createElement('span');
    text.className = 'avatar-text';
    text.textContent = getInitials(user.name);
    avatar.appendChild(text);
  }

  // ステータス追加
  if (user.status) {
    const status = document.createElement('span');
    status.className = `avatar-status avatar-status-${user.status}`;
    status.setAttribute('aria-label', user.status);
    avatar.appendChild(status);
  }

  return avatar;
}
```

### グループアバターの生成

```javascript
function createAvatarGroup(users, maxVisible = 3) {
  const group = document.createElement('div');
  group.className = 'avatar-group';

  const visible = users.slice(0, maxVisible);
  const remaining = users.length - maxVisible;

  visible.forEach(user => {
    group.appendChild(createAvatar(user));
  });

  if (remaining > 0) {
    const more = document.createElement('div');
    more.className = 'avatar avatar-sm avatar-default';
    more.innerHTML = `<span class="avatar-text">+${remaining}</span>`;
    group.appendChild(more);
  }

  return group;
}
```

## 関連コンポーネント

- **Badge**: 通知数の表示
- **Card**: ユーザープロフィールカード
- **List**: ユーザーリスト表示

## ブラウザ対応

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 変更履歴

- **Phase 4 (2025-12)**: 初回実装
  - 6つのサイズバリアント
  - 6つのカラーバリアント
  - 3つの形状バリアント
  - ステータスインジケーター
  - グループアバター機能
  - ホバー効果とインタラクティブサポート
