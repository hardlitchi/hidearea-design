# Examples

hidearea-designデザインシステムの実用的なサンプル集です。

## 🎨 利用可能なサンプル

### 1. Component Showcase
**場所:** `./component-showcase/`

全コンポーネントのデモンストレーション。各コンポーネントのバリエーション、サイズ、状態を確認できます。

**含まれるコンポーネント:**
- Buttons (variants, sizes, states)
- Inputs & Form controls
- Data display (Avatar, Badge, Chip, Card)
- Feedback (Alert, Progress, Spinner)
- Navigation (Breadcrumb, Tabs, Pagination)
- Layout (Container, Stack)
- Other (Accordion)

**実行方法:**
```bash
cd component-showcase
npm install
npm run dev
```

### 2. Login Form
**場所:** `./login-form/`

実用的なログインフォームの実装例。フォームバリデーション、エラー表示、ローディング状態の処理を含みます。

**機能:**
- メールアドレスとパスワードの検証
- リアルタイムエラー表示
- ローディング状態の表示
- ライト/ダークモード切り替え
- レスポンシブデザイン

**実行方法:**
```bash
cd login-form
npm install
npm run dev
```

デモモードで起動（フォームが自動入力されます）:
```
http://localhost:5173/?demo=1
```

### 3. Dashboard
**場所:** `./dashboard/`

本格的なダッシュボードの実装例。複数のコンポーネントを組み合わせた実用的なUIを示します。

**機能:**
- サイドバーナビゲーション
- 統計カードの表示
- アクティビティフィード
- タスク管理
- レスポンシブレイアウト

**実行方法:**
```bash
cd dashboard
npm install
npm run dev
```

### 4. Theme Switcher (Basic Example)
**場所:** `./` (ルートディレクトリ)

シンプルなテーマ切り替えのデモ。基本的な使い方を学ぶのに最適です。

**実行方法:**
```bash
npm install
npm run dev
```

## 🚀 すべてのサンプルを一度に起動

### 方法1: 手動起動（開発時）

プロジェクトルートから:

```bash
# すべてのサンプルを起動
./scripts/start-examples.sh

# 停止する場合
./scripts/stop-examples.sh
```

### 方法2: systemd サービス（本番環境）

```bash
# サービスをインストール（初回のみ）
sudo ./scripts/install-systemd-service.sh

# サービスを起動
sudo systemctl start hidearea-examples
```

詳細は [ローカルサーバーデプロイガイド](../docs/deployment/local-server.md) を参照してください。

### アクセスURL

各サンプルは異なるポートで起動します:
- Component Showcase: http://localhost:5173
- Login Form: http://localhost:5174
- Dashboard: http://localhost:5175

## 📚 学習のヒント

### 初めての方へ

1. **Component Showcase** から始めることをお勧めします
   - 全コンポーネントの見た目と動作を確認
   - どのコンポーネントが利用可能かを把握

2. **Login Form** で実装パターンを学ぶ
   - フォームバリデーションの実装方法
   - エラーハンドリング
   - イベントリスナーの設定

3. **Dashboard** で複雑なレイアウトを理解
   - 複数コンポーネントの組み合わせ
   - レスポンシブデザインの実装
   - 実用的なUI構築

### コードの読み方

各サンプルは以下の構成になっています:

```
example-name/
├── index.html    # HTMLマークアップ
├── main.js       # JavaScript ロジック
└── package.json  # 依存関係（オプション）
```

**index.html** - コンポーネントの使い方とマークアップ構造を確認
**main.js** - イベントハンドリングと動的な処理を確認

## 🔧 カスタマイズ

### 自分のプロジェクトに統合する

1. 必要なパッケージをインストール:
```bash
npm install @hidearea-design/core @hidearea-design/tokens
```

2. サンプルコードをコピー&ペースト

3. 必要に応じてカスタマイズ

### テーマのカスタマイズ

CSSカスタムプロパティを上書き:

```css
:root {
  --primary-default: #your-color;
  --font-family-sans: 'Your Font', sans-serif;
}
```

## 📖 関連ドキュメント

- [使い方ガイド](../docs/getting-started/usage-guide.md)
- [コンポーネントAPI](../docs/components/)
- [デザイントークン](../packages/tokens/README.md)

## 💡 サンプルリクエスト

新しいサンプルの要望がありましたら、[GitHubのIssue](https://github.com/hardlitchi/hidearea-design/issues)でお知らせください。

特に以下のようなサンプルを検討中です:
- E-commerceの商品カタログ
- ユーザープロフィールページ
- データテーブル/グリッド
- モーダル/ダイアログの実装例
- フォームウィザード（マルチステップフォーム）
