# hidearea-design への貢献

hidearea-design への貢献に興味を持っていただき、ありがとうございます！このドキュメントは、貢献のためのガイドラインと手順を提供します。

## 目次

- [行動規範](#行動規範)
- [はじめに](#はじめに)
- [開発ワークフロー](#開発ワークフロー)
- [プロジェクト構造](#プロジェクト構造)
- [コーディング規約](#コーディング規約)
- [テスト](#テスト)
- [変更の提出](#変更の提出)
- [リリースプロセス](#リリースプロセス)

## 行動規範

このプロジェクトは、すべての貢献者にとって歓迎的で包括的な環境を確保するための行動規範に従います。すべてのやり取りにおいて、敬意を持ち、プロフェッショナルであることをお願いします。

## はじめに

### 必要要件

- Node.js 18.x 以上
- pnpm 10.x 以上
- Git

### セットアップ

1. GitHub でリポジトリをフォーク
2. ローカルにフォークをクローン：

```bash
git clone https://github.com/YOUR_USERNAME/hidearea-design.git
cd hidearea-design
```

3. 依存関係をインストール：

```bash
pnpm install
```

4. すべてのパッケージをビルド：

```bash
pnpm build
```

5. すべてが動作することを確認するためテストを実行：

```bash
pnpm test
```

## 開発ワークフロー

### ブランチの作成

機能やバグ修正のために新しいブランチを作成：

```bash
git checkout -b feature/your-feature-name
# または
git checkout -b fix/your-bug-fix
```

ブランチ命名規則：

- `feature/` - 新機能
- `fix/` - バグ修正
- `docs/` - ドキュメントの変更
- `test/` - テストの追加または変更
- `refactor/` - コードのリファクタリング

### 開発コマンド

```bash
# 開発モード開始（ウォッチモード）
pnpm dev

# テスト実行
pnpm test

# UI付きテスト実行
pnpm --filter @hidearea-design/core test:ui

# Lint実行
pnpm lint

# すべてのパッケージをビルド
pnpm build

# コードフォーマット
pnpm format
```

### 特定のパッケージで作業

```bash
# core パッケージで作業
cd packages/core
pnpm dev

# 特定パッケージのテスト実行
pnpm --filter @hidearea-design/core test

# 特定パッケージをビルド
pnpm --filter @hidearea-design/react build
```

## プロジェクト構造

```
hidearea-design/
├── packages/
│   ├── core/           # Web Components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── styles/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── react/          # React ラッパー
│   ├── vue/            # Vue ラッパー
│   ├── tokens/         # デザイントークン
│   ├── storybook/      # コンポーネントドキュメント
│   └── docs/           # VitePress ドキュメント
├── docs/               # Markdown ドキュメント
├── .changeset/         # バージョニング用 Changesets
└── .github/            # GitHub Actions ワークフロー
```

## コーディング規約

### TypeScript

- すべてのコードに TypeScript を使用
- 適切な型定義を提供
- 可能な限り `any` 型を避ける
- パブリック API にはインターフェースを使用

### Web Components

- Web Components のベストプラクティスに従う
- カプセル化には Shadow DOM を使用
- テーマ用の CSS カスタムプロパティを提供
- 適切な ARIA 属性を含める

コンポーネント構造の例：

```typescript
export class HaMyComponent extends HTMLElement {
  static get observedAttributes() {
    return ["prop1", "prop2"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  // パブリック API
  get prop1(): string {
    return this.getAttribute("prop1") || "";
  }

  set prop1(value: string) {
    this.setAttribute("prop1", value);
  }

  // メソッド
  private render() {
    // レンダリングロジック
  }
}
```

### React ラッパー

```typescript
export const MyComponent = forwardRef<MyComponentRef, MyComponentProps>(
  ({ prop1, prop2, children, ...props }, ref) => {
    const elementRef = useRef<HaMyComponent>(null);

    useImperativeHandle(ref, () => ({
      focus: () => elementRef.current?.focus(),
      // その他のメソッド
    }));

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      element.prop1 = prop1;
      element.prop2 = prop2;
    }, [prop1, prop2]);

    return (
      <ha-my-component ref={elementRef} {...props}>
        {children}
      </ha-my-component>
    );
  }
);
```

### Vue ラッパー

```vue
<template>
  <ha-my-component
    ref="componentRef"
    :prop1="prop1"
    :prop2="prop2"
    @custom-event="handleEvent"
  >
    <slot />
  </ha-my-component>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import "@hidearea-design/core";

interface Props {
  prop1?: string;
  prop2?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  prop1: "default",
  prop2: false,
});

const componentRef = ref<HTMLElement | null>(null);

watch(
  () => props.prop1,
  (newValue) => {
    if (componentRef.value) {
      (componentRef.value as any).prop1 = newValue;
    }
  },
);
</script>
```

### コードスタイル

- ESLint と Prettier を使用（プロジェクトで設定済み）
- インデントは2スペース
- 文字列にはシングルクォート
- セミコロン必須
- 複数行のオブジェクト/配列には末尾カンマ

フォーマット実行：

```bash
pnpm format
```

## テスト

### テストの作成

すべての新機能とバグ修正にはテストを含める必要があります。

#### ユニットテスト（Core パッケージ）

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { HaMyComponent } from "./my-component";

describe("HaMyComponent", () => {
  let component: HaMyComponent;

  beforeEach(() => {
    component = document.createElement("ha-my-component") as HaMyComponent;
    document.body.appendChild(component);
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it("デフォルトプロパティでレンダリングする", () => {
    expect(component.prop1).toBe("default");
  });

  it("プロパティ変更時に更新する", () => {
    component.prop1 = "new value";
    expect(component.prop1).toBe("new value");
  });
});
```

#### React コンポーネントテスト

```typescript
import { render } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('プロパティ付きでレンダリングする', () => {
    render(<MyComponent prop1="test">内容</MyComponent>);
    const element = document.querySelector('ha-my-component');
    expect(element).toBeInTheDocument();
  });
});
```

### テストの実行

```bash
# すべてのテスト実行
pnpm test

# カバレッジ付きでテスト実行
pnpm test:coverage

# ウォッチモードでテスト実行
pnpm --filter @hidearea-design/core test

# 特定のテストファイルを実行
pnpm --filter @hidearea-design/core test src/components/button/button.test.ts
```

### カバレッジ要件

- すべてのメトリクス（行、関数、分岐、ステートメント）で最低80%のカバレッジ
- すべての新しいコードにはテストを含める
- 既存のコードを変更する場合はテストを更新

## 変更の提出

### コミットメッセージ

Conventional Commits 仕様に従う：

```
type(scope): description

[オプション本文]

[オプションフッター]
```

タイプ：

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイル変更（フォーマットなど）
- `refactor`: コードのリファクタリング
- `test`: テストの追加または変更
- `chore`: メンテナンスタスク

例：

```
feat(button): ローディング状態を追加
fix(input): バリデーションエラー表示を修正
docs: インストールガイドを更新
test(checkbox): 不確定状態のテストを追加
```

### プルリクエストの作成

1. すべてのテストが通ることを確認：

```bash
pnpm test
pnpm lint
pnpm build
```

2. changeset を作成（バージョンバンプ用）：

```bash
pnpm changeset
```

バージョン変更するパッケージを選択し、変更の要約を提供します。

3. ブランチをプッシュ：

```bash
git push origin feature/your-feature-name
```

4. GitHub でプルリクエストを作成：
   - 明確なタイトルと説明
   - 関連する issue を参照
   - UI変更のスクリーンショット/GIF
   - テスト結果

### プルリクエストチェックリスト

- [ ] コードがプロジェクトのコーディング規約に従っている
- [ ] テストが追加/更新され、通過している
- [ ] ドキュメントが更新されている
- [ ] Changeset が作成されている（該当する場合）
- [ ] Lint エラーがない
- [ ] すべての CI チェックが通過している

## リリースプロセス

リリースは Changesets を使用して自動化されています：

1. 開発中に changesets を作成：

```bash
pnpm changeset
```

2. Release ワークフローが：
   - "Version Packages" PR を作成
   - package.json のバージョンを更新
   - CHANGELOG.md エントリーを生成

3. "Version Packages" PR をマージして npm パブリッシュをトリガー

### 手動リリース（メンテナーのみ）

```bash
# バージョン更新
pnpm changeset version

# パッケージをビルド
pnpm build

# npm に公開
pnpm release
```

## 追加リソース

- [コンポーネント API ドキュメント](./docs/ja/components/README.md)
- [使用例](./docs/ja/guides/examples.md)
- [プロジェクトノート](./notes/README.md)

## 質問がありますか？

質問がある場合は、お気軽に：

- GitHub で issue を開く
- GitHub Discussions でディスカッションを開始
- メンテナーに連絡

貢献いただきありがとうございます！
