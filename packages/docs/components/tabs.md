# Tabs

タブコンポーネント。キーボードナビゲーションと動的タブをサポートします。

## 基本的な使い方

```html
<ha-tabs>
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
  <ha-tab-item value="tab3">タブ3</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="tab1">
  <p>タブ1のコンテンツ</p>
</ha-tab-panel>

<ha-tab-panel value="tab2">
  <p>タブ2のコンテンツ</p>
</ha-tab-panel>

<ha-tab-panel value="tab3">
  <p>タブ3のコンテンツ</p>
</ha-tab-panel>
```

## バリアント

2種類のバリアントが利用可能です：

### Default

```html
<ha-tabs variant="default">
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
</ha-tabs>
```

### Pills

```html
<ha-tabs variant="pills">
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
</ha-tabs>
```

## 無効化

```html
<ha-tabs>
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2" disabled>タブ2（無効）</ha-tab-item>
  <ha-tab-item value="tab3">タブ3</ha-tab-item>
</ha-tabs>
```

## プロパティ

### ha-tabs

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `variant` | `'default' \| 'pills'` | `'default'` | バリアント |
| `value` | `string` | `''` | 選択中のタブ値 |

### ha-tab-item

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `value` | `string` | `''` | タブの値 |
| `disabled` | `boolean` | `false` | 無効状態 |

### ha-tab-panel

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|-----------|------|
| `value` | `string` | `''` | 対応するタブの値 |

## イベント

| イベント | 説明 | ペイロード |
|---------|------|-----------|
| `tab-change` | タブが変更された時 | `CustomEvent<string>` |

## React

```tsx
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
        <TabItem value="tab3">タブ3</TabItem>
      </Tabs>

      <TabPanel value="tab1" active={activeTab === 'tab1'}>
        <p>タブ1のコンテンツ</p>
      </TabPanel>

      <TabPanel value="tab2" active={activeTab === 'tab2'}>
        <p>タブ2のコンテンツ</p>
      </TabPanel>

      <TabPanel value="tab3" active={activeTab === 'tab3'}>
        <p>タブ3のコンテンツ</p>
      </TabPanel>
    </>
  );
}
```

## Vue

```vue
<template>
  <div>
    <HaTabs v-model="activeTab">
      <HaTabItem value="tab1">タブ1</HaTabItem>
      <HaTabItem value="tab2">タブ2</HaTabItem>
      <HaTabItem value="tab3">タブ3</HaTabItem>
    </HaTabs>

    <HaTabPanel value="tab1" :active="activeTab === 'tab1'">
      <p>タブ1のコンテンツ</p>
    </HaTabPanel>

    <HaTabPanel value="tab2" :active="activeTab === 'tab2'">
      <p>タブ2のコンテンツ</p>
    </HaTabPanel>

    <HaTabPanel value="tab3" :active="activeTab === 'tab3'">
      <p>タブ3のコンテンツ</p>
    </HaTabPanel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Tabs as HaTabs,
  TabItem as HaTabItem,
  TabPanel as HaTabPanel,
} from '@hidearea-design/vue';

const activeTab = ref('tab1');
</script>
```

## 使用例

### シンプルなタブ

```html
<ha-tabs value="profile">
  <ha-tab-item value="profile">プロフィール</ha-tab-item>
  <ha-tab-item value="settings">設定</ha-tab-item>
  <ha-tab-item value="notifications">通知</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="profile">
  <ha-card>
    <h3>プロフィール</h3>
    <p>ユーザーのプロフィール情報</p>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="settings">
  <ha-card>
    <h3>設定</h3>
    <p>アカウント設定</p>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="notifications">
  <ha-card>
    <h3>通知</h3>
    <p>通知設定</p>
  </ha-card>
</ha-tab-panel>
```

### アイコン付きタブ

```html
<ha-tabs variant="pills">
  <ha-tab-item value="home">🏠 ホーム</ha-tab-item>
  <ha-tab-item value="profile">👤 プロフィール</ha-tab-item>
  <ha-tab-item value="settings">⚙️ 設定</ha-tab-item>
</ha-tabs>
```

### カウンター付きタブ

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

### 動的タブ

```tsx
import { Tabs, TabItem, TabPanel, Button, Stack } from '@hidearea-design/react';
import { useState } from 'react';

function DynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'タブ1', content: 'コンテンツ1' },
    { id: '2', label: 'タブ2', content: 'コンテンツ2' },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const addTab = () => {
    const newId = String(tabs.length + 1);
    setTabs([...tabs, {
      id: newId,
      label: `タブ${newId}`,
      content: `コンテンツ${newId}`,
    }]);
    setActiveTab(newId);
  };

  const removeTab = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  return (
    <Stack direction="vertical" gap="3">
      <Stack direction="horizontal" gap="2" align="center">
        <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
          {tabs.map(tab => (
            <TabItem key={tab.id} value={tab.id}>
              {tab.label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
              >
                ×
              </button>
            </TabItem>
          ))}
        </Tabs>
        <Button variant="outline" size="sm" onClick={addTab}>
          + タブ追加
        </Button>
      </Stack>

      {tabs.map(tab => (
        <TabPanel key={tab.id} value={tab.id} active={activeTab === tab.id}>
          <p>{tab.content}</p>
        </TabPanel>
      ))}
    </Stack>
  );
}
```

### フォームタブ

```html
<ha-tabs value="step1">
  <ha-tab-item value="step1">1. 基本情報</ha-tab-item>
  <ha-tab-item value="step2">2. 住所</ha-tab-item>
  <ha-tab-item value="step3">3. 確認</ha-tab-item>
</ha-tabs>

<ha-tab-panel value="step1">
  <ha-card>
    <ha-stack direction="vertical" gap="3">
      <ha-form-group label="お名前" required>
        <ha-input full-width></ha-input>
      </ha-form-group>
      <ha-form-group label="メールアドレス" required>
        <ha-input type="email" full-width></ha-input>
      </ha-form-group>
      <ha-button variant="primary">次へ</ha-button>
    </ha-stack>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="step2">
  <ha-card>
    <ha-stack direction="vertical" gap="3">
      <ha-form-group label="郵便番号">
        <ha-input full-width></ha-input>
      </ha-form-group>
      <ha-form-group label="住所">
        <ha-input full-width></ha-input>
      </ha-form-group>
      <ha-stack direction="horizontal" gap="2">
        <ha-button variant="outline">戻る</ha-button>
        <ha-button variant="primary">次へ</ha-button>
      </ha-stack>
    </ha-stack>
  </ha-card>
</ha-tab-panel>

<ha-tab-panel value="step3">
  <ha-card>
    <h3>入力内容の確認</h3>
    <p>入力内容を確認してください</p>
    <ha-stack direction="horizontal" gap="2">
      <ha-button variant="outline">戻る</ha-button>
      <ha-button variant="primary">送信</ha-button>
    </ha-stack>
  </ha-card>
</ha-tab-panel>
```

### ダッシュボードタブ

```tsx
import { Tabs, TabItem, TabPanel, Card, Grid } from '@hidearea-design/react';
import { useState } from 'react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="overview">概要</TabItem>
        <TabItem value="analytics">分析</TabItem>
        <TabItem value="reports">レポート</TabItem>
      </Tabs>

      <TabPanel value="overview" active={activeTab === 'overview'}>
        <Grid columns="1" mdColumns="2" lgColumns="4" gap="4">
          <Card>
            <h4>総売上</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>¥1,234,567</p>
          </Card>
          <Card>
            <h4>訪問者数</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>12,345</p>
          </Card>
          <Card>
            <h4>コンバージョン率</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>3.45%</p>
          </Card>
          <Card>
            <h4>平均注文額</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>¥8,900</p>
          </Card>
        </Grid>
      </TabPanel>

      <TabPanel value="analytics" active={activeTab === 'analytics'}>
        <Card>
          <h3>分析データ</h3>
          <p>詳細な分析情報がここに表示されます</p>
        </Card>
      </TabPanel>

      <TabPanel value="reports" active={activeTab === 'reports'}>
        <Card>
          <h3>レポート</h3>
          <p>各種レポートがここに表示されます</p>
        </Card>
      </TabPanel>
    </div>
  );
}
```

### 遅延読み込み

```tsx
import { Tabs, TabItem, TabPanel, Spinner } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function LazyTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set(['tab1']));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadedTabs.has(activeTab)) {
      setLoading(true);
      setTimeout(() => {
        setLoadedTabs(new Set([...loadedTabs, activeTab]));
        setLoading(false);
      }, 1000);
    }
  }, [activeTab]);

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
        <TabItem value="tab3">タブ3</TabItem>
      </Tabs>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spinner />
        </div>
      ) : (
        <>
          {loadedTabs.has('tab1') && (
            <TabPanel value="tab1" active={activeTab === 'tab1'}>
              <p>タブ1のコンテンツ</p>
            </TabPanel>
          )}
          {loadedTabs.has('tab2') && (
            <TabPanel value="tab2" active={activeTab === 'tab2'}>
              <p>タブ2のコンテンツ（遅延読み込み）</p>
            </TabPanel>
          )}
          {loadedTabs.has('tab3') && (
            <TabPanel value="tab3" active={activeTab === 'tab3'}>
              <p>タブ3のコンテンツ（遅延読み込み）</p>
            </TabPanel>
          )}
        </>
      )}
    </>
  );
}
```

## アクセシビリティ

### ARIAサポート

Tabs コンポーネントは、WCAG 2.1 AA に準拠した WAI-ARIA Tabs パターンを実装しています：

- **role="tablist"**: タブのコンテナに設定され、タブのリストであることを示します
- **role="tab"**: 各タブに設定され、タブであることを示します
- **role="tabpanel"**: パネルに設定され、タブパネルであることを示します
- **aria-selected**: 選択状態を示します（`true` / `false`）
- **aria-controls**: タブが制御するパネルの ID を参照します
- **aria-labelledby**: パネルがどのタブに関連付けられているかを示します
- **aria-disabled**: 無効なタブを示します

```html
<!-- Good ✓: 適切な ARIA 属性が自動設定される -->
<ha-tabs value="tab1" role="tablist" aria-label="メイン設定">
  <ha-tab-item value="tab1" role="tab" aria-selected="true" aria-controls="panel-tab1">
    プロフィール
  </ha-tab-item>
  <ha-tab-item value="tab2" role="tab" aria-selected="false" aria-controls="panel-tab2">
    設定
  </ha-tab-item>
  <ha-tab-item value="tab3" role="tab" aria-selected="false" aria-disabled="true">
    無効化
  </ha-tab-item>
</ha-tabs>

<ha-tab-panel id="panel-tab1" value="tab1" role="tabpanel" aria-labelledby="tab1">
  プロフィールコンテンツ
</ha-tab-panel>
```

### キーボード操作

Tabs コンポーネントは完全なキーボードナビゲーションをサポートします：

| キー | アクション |
|------|----------|
| `Tab` | タブリストにフォーカスを移動（または次のフォーカス可能要素へ） |
| `Shift + Tab` | 前のフォーカス可能要素に戻る |
| `Arrow Left` / `Arrow Right` | 前後のタブに移動（無効なタブはスキップ） |
| `Home` | 最初のタブに移動 |
| `End` | 最後のタブに移動 |
| `Enter` / `Space` | フォーカス中のタブを選択（パネルを表示） |

**重要:** Arrow キーでのタブ移動は、自動的にタブを選択します（Manual activation ではなく Automatic activation）。

### スクリーンリーダー

主要なスクリーンリーダー（NVDA、JAWS、VoiceOver）での動作：

1. **タブリストのフォーカス時**:
   - "タブリスト" と読み上げられます
   - タブの総数と現在位置が読み上げられます（例: "3つのタブのうち1番目"）

2. **タブのフォーカス時**:
   - タブの名前が読み上げられます
   - 選択状態が読み上げられます（例: "プロフィール タブ 選択中"）
   - 無効なタブは "無効" と読み上げられます

3. **パネルのフォーカス時**:
   - パネルの内容が読み上げられます
   - 対応するタブの名前が読み上げられます（aria-labelledby による）

### フォーカス管理

```tsx
// Good ✓: タブ変更時にパネルにフォーカスを移動
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import { useRef, useEffect } from 'react';

function AccessibleTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  const panelRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleTabChange = (e: CustomEvent<string>) => {
    setActiveTab(e.detail);

    // タブ変更後にパネルにフォーカスを移動
    setTimeout(() => {
      panelRefs.current[e.detail]?.focus();
    }, 0);
  };

  return (
    <>
      <Tabs value={activeTab} onTabChange={handleTabChange}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
      </Tabs>

      <TabPanel
        value="tab1"
        active={activeTab === 'tab1'}
        ref={(el) => (panelRefs.current.tab1 = el)}
        tabIndex={-1} // プログラムでのフォーカスを可能にする
      >
        コンテンツ1
      </TabPanel>

      <TabPanel
        value="tab2"
        active={activeTab === 'tab2'}
        ref={(el) => (panelRefs.current.tab2 = el)}
        tabIndex={-1}
      >
        コンテンツ2
      </TabPanel>
    </>
  );
}
```

## スタイルのカスタマイズ

### デザイントークン

Tabs コンポーネントは、デザインシステムのセマンティックトークンを使用しています：

**バリアント別のスタイリング:**

```css
/* Default (アンダーライン) */
--ha-tabs-default-border-color: var(--ha-color-neutral-200);
--ha-tabs-default-active-color: var(--ha-color-primary-500);
--ha-tabs-default-active-border-width: 2px;
--ha-tabs-default-hover-bg: var(--ha-color-neutral-50);

/* Pills (ボタン風) */
--ha-tabs-pills-active-bg: var(--ha-color-primary-500);
--ha-tabs-pills-active-color: var(--ha-color-white);
--ha-tabs-pills-hover-bg: var(--ha-color-neutral-100);
--ha-tabs-pills-border-radius: var(--ha-radius-full);
```

### カスタムCSS変数

Tabs コンポーネントでカスタマイズ可能な CSS 変数：

```css
ha-tabs {
  /* レイアウト */
  --tabs-gap: 0px; /* タブ間の間隔 */
  --tabs-border-width: 1px;
  --tabs-border-color: var(--ha-color-neutral-200);

  /* デフォルトバリアント */
  --tabs-default-indicator-height: 2px;
  --tabs-default-indicator-color: var(--ha-color-primary-500);
}

ha-tab-item {
  /* タイポグラフィ */
  --tab-font-size: var(--ha-font-size-sm);
  --tab-font-weight: var(--ha-font-weight-medium);
  --tab-line-height: var(--ha-line-height-normal);

  /* レイアウト */
  --tab-padding: 12px 16px;
  --tab-min-width: 80px;

  /* カラー */
  --tab-color: var(--ha-color-neutral-700);
  --tab-hover-color: var(--ha-color-neutral-900);
  --tab-active-color: var(--ha-color-primary-600);
  --tab-disabled-color: var(--ha-color-neutral-300);

  /* Pills バリアント */
  --tab-pills-border-radius: var(--ha-radius-full);
  --tab-pills-active-bg: var(--ha-color-primary-500);
  --tab-pills-active-color: var(--ha-color-white);
}

ha-tab-panel {
  /* パネルのスタイル */
  --tab-panel-padding: 16px 0;
}
```

### Shadow DOMパーツ

`::part()` セレクターを使用して Shadow DOM 内の要素をスタイリングできます：

```css
/* タブリスト全体 */
ha-tabs::part(tablist) {
  background-color: var(--ha-color-neutral-50);
  padding: 4px;
  border-radius: var(--ha-radius-md);
}

/* 個別のタブ */
ha-tab-item::part(tab) {
  font-weight: 600;
  transition: all 0.2s ease;
}

/* アクティブなタブ */
ha-tab-item[active]::part(tab) {
  color: var(--ha-color-primary-600);
  font-weight: 700;
}

/* ホバー状態のタブ */
ha-tab-item:hover::part(tab) {
  background-color: var(--ha-color-neutral-100);
}

/* 無効なタブ */
ha-tab-item[disabled]::part(tab) {
  opacity: 0.5;
  cursor: not-allowed;
}

/* アクティブインジケーター（defaultバリアント） */
ha-tabs[variant="default"]::part(indicator) {
  background: linear-gradient(90deg, var(--ha-color-primary-400), var(--ha-color-primary-600));
  height: 3px;
}

/* タブパネル */
ha-tab-panel::part(panel) {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## ベストプラクティス

### Do's ✓

```html
<!-- Good ✓: 明確で短いタブラベル -->
<ha-tabs>
  <ha-tab-item value="overview">概要</ha-tab-item>
  <ha-tab-item value="details">詳細</ha-tab-item>
  <ha-tab-item value="settings">設定</ha-tab-item>
</ha-tabs>

<!-- Good ✓: 適切なバリアント選択 -->
<!-- ナビゲーション的な使用: default -->
<ha-tabs variant="default">
  <ha-tab-item value="home">ホーム</ha-tab-item>
  <ha-tab-item value="about">会社情報</ha-tab-item>
</ha-tabs>

<!-- フィルターやカテゴリ選択: pills -->
<ha-tabs variant="pills">
  <ha-tab-item value="all">すべて</ha-tab-item>
  <ha-tab-item value="active">アクティブ</ha-tab-item>
  <ha-tab-item value="archived">アーカイブ</ha-tab-item>
</ha-tabs>

<!-- Good ✓: 各パネルに意味のあるコンテンツを配置 -->
<ha-tab-panel value="overview">
  <ha-card>
    <h3>概要</h3>
    <p>プロジェクトの概要情報がここに表示されます</p>
  </ha-card>
</ha-tab-panel>

<!-- Good ✓: タブの数は適切に（3-7個が理想） -->
<ha-tabs>
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
  <ha-tab-item value="tab3">タブ3</ha-tab-item>
  <ha-tab-item value="tab4">タブ4</ha-tab-item>
  <ha-tab-item value="tab5">タブ5</ha-tab-item>
</ha-tabs>
```

### Don'ts ✗

```html
<!-- Bad ✗: タブラベルが長すぎる -->
<ha-tabs>
  <ha-tab-item value="tab1">
    非常に長いタブラベルでユーザーにとって読みにくい
  </ha-tab-item>
</ha-tabs>
<!-- 代わりに: 短く簡潔なラベルを使用 -->
<ha-tabs>
  <ha-tab-item value="tab1">概要</ha-tab-item>
</ha-tabs>

<!-- Bad ✗: タブが多すぎる（10個以上） -->
<ha-tabs>
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
  <ha-tab-item value="tab2">タブ2</ha-tab-item>
  <!-- ...10個以上のタブ... -->
</ha-tabs>
<!-- 代わりに: ドロップダウンや階層構造を検討 -->
<ha-tabs>
  <ha-tab-item value="category1">カテゴリ1</ha-tab-item>
  <ha-tab-item value="category2">カテゴリ2</ha-tab-item>
  <ha-tab-item value="more">その他</ha-tab-item>
</ha-tabs>

<!-- Bad ✗: パネルが空 -->
<ha-tab-panel value="tab1">
  <!-- 空のパネル -->
</ha-tab-panel>
<!-- 代わりに: 意味のあるコンテンツかプレースホルダーを表示 -->
<ha-tab-panel value="tab1">
  <p>まだコンテンツがありません</p>
</ha-tab-panel>

<!-- Bad ✗: タブとパネルの value が一致していない -->
<ha-tabs value="tab1">
  <ha-tab-item value="tab1">タブ1</ha-tab-item>
</ha-tabs>
<ha-tab-panel value="wrongValue">コンテンツ</ha-tab-panel>
<!-- 代わりに: value を一致させる -->
<ha-tab-panel value="tab1">コンテンツ</ha-tab-panel>
```

## よくある質問

### URLと連動したタブ切り替えを実装するには？

URL の hash やクエリパラメータと連動させることで、ブックマーク可能なタブを実装できます：

```tsx
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function UrlSyncedTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  // URLのhashからアクティブタブを取得
  const getTabFromUrl = () => {
    const hash = location.hash.replace('#', '');
    return hash || 'tab1';
  };

  const [activeTab, setActiveTab] = useState(getTabFromUrl);

  // URLが変更されたらタブを更新
  useEffect(() => {
    setActiveTab(getTabFromUrl());
  }, [location.hash]);

  const handleTabChange = (e: CustomEvent<string>) => {
    const newTab = e.detail;
    setActiveTab(newTab);
    // URLを更新
    navigate(`#${newTab}`, { replace: true });
  };

  return (
    <>
      <Tabs value={activeTab} onTabChange={handleTabChange}>
        <TabItem value="profile">プロフィール</TabItem>
        <TabItem value="settings">設定</TabItem>
        <TabItem value="billing">請求</TabItem>
      </Tabs>

      <TabPanel value="profile" active={activeTab === 'profile'}>
        プロフィール設定
      </TabPanel>
      <TabPanel value="settings" active={activeTab === 'settings'}>
        一般設定
      </TabPanel>
      <TabPanel value="billing" active={activeTab === 'billing'}>
        請求情報
      </TabPanel>
    </>
  );
}
```

Vue での実装例：

```vue
<template>
  <div>
    <HaTabs :value="activeTab" @tab-change="handleTabChange">
      <HaTabItem value="profile">プロフィール</HaTabItem>
      <HaTabItem value="settings">設定</HaTabItem>
      <HaTabItem value="billing">請求</HaTabItem>
    </HaTabs>

    <HaTabPanel value="profile" :active="activeTab === 'profile'">
      プロフィール設定
    </HaTabPanel>
    <HaTabPanel value="settings" :active="activeTab === 'settings'">
      一般設定
    </HaTabPanel>
    <HaTabPanel value="billing" :active="activeTab === 'billing'">
      請求情報
    </HaTabPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Tabs as HaTabs, TabItem as HaTabItem, TabPanel as HaTabPanel } from '@hidearea-design/vue';

const route = useRoute();
const router = useRouter();

const getTabFromUrl = () => {
  const hash = route.hash.replace('#', '');
  return hash || 'profile';
};

const activeTab = ref(getTabFromUrl());

watch(() => route.hash, () => {
  activeTab.value = getTabFromUrl();
});

function handleTabChange(e: CustomEvent<string>) {
  const newTab = e.detail;
  activeTab.value = newTab;
  router.replace({ hash: `#${newTab}` });
}
</script>
```

### タブ切り替え時にアニメーションを追加するには？

CSS や React Transition Group を使用してアニメーションを実装できます：

```css
/* シンプルなフェードアニメーション */
ha-tab-panel {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* スライドアニメーション */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

ha-tab-panel[active] {
  animation: slideIn 0.3s ease-out;
}
```

React Transition Group を使用した例：

```tsx
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import { CSSTransition } from 'react-transition-group';
import './tabs-animation.css';

function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  const tabs = ['tab1', 'tab2', 'tab3'];

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
        <TabItem value="tab3">タブ3</TabItem>
      </Tabs>

      {tabs.map((tab) => (
        <CSSTransition
          key={tab}
          in={activeTab === tab}
          timeout={300}
          classNames="tab-panel"
          unmountOnExit
        >
          <TabPanel value={tab} active={activeTab === tab}>
            コンテンツ {tab}
          </TabPanel>
        </CSSTransition>
      ))}
    </>
  );
}
```

```css
/* tabs-animation.css */
.tab-panel-enter {
  opacity: 0;
  transform: translateX(20px);
}

.tab-panel-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

.tab-panel-exit {
  opacity: 1;
}

.tab-panel-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
```

### タブの状態をlocalStorageに保存するには？

最後に選択したタブを記憶して、ページリロード時に復元できます：

```tsx
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import { useState, useEffect } from 'react';

function PersistentTabs() {
  const STORAGE_KEY = 'selected-tab';

  const [activeTab, setActiveTab] = useState(() => {
    // 初期値をlocalStorageから取得
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || 'tab1';
  });

  // タブが変更されたらlocalStorageに保存
  const handleTabChange = (e: CustomEvent<string>) => {
    const newTab = e.detail;
    setActiveTab(newTab);
    localStorage.setItem(STORAGE_KEY, newTab);
  };

  return (
    <>
      <Tabs value={activeTab} onTabChange={handleTabChange}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
        <TabItem value="tab3">タブ3</TabItem>
      </Tabs>

      <TabPanel value="tab1" active={activeTab === 'tab1'}>
        コンテンツ1
      </TabPanel>
      <TabPanel value="tab2" active={activeTab === 'tab2'}>
        コンテンツ2
      </TabPanel>
      <TabPanel value="tab3" active={activeTab === 'tab3'}>
        コンテンツ3
      </TabPanel>
    </>
  );
}
```

### 縦方向（垂直）のタブを実装するには？

CSS でレイアウトを変更して縦方向のタブを実装できます：

```css
/* 縦方向タブのスタイル */
.vertical-tabs ha-tabs::part(tablist) {
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid var(--ha-color-neutral-200);
  border-bottom: none;
}

.vertical-tabs ha-tab-item::part(tab) {
  text-align: left;
  border-right: 2px solid transparent;
  border-bottom: none;
}

.vertical-tabs ha-tab-item[active]::part(tab) {
  border-right-color: var(--ha-color-primary-500);
}

.vertical-tabs-container {
  display: flex;
  gap: 24px;
}

.vertical-tabs-content {
  flex: 1;
}
```

```tsx
import { Tabs, TabItem, TabPanel } from '@hidearea-design/react';
import './vertical-tabs.css';

function VerticalTabs() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="vertical-tabs-container">
      <div className="vertical-tabs">
        <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
          <TabItem value="general">一般設定</TabItem>
          <TabItem value="security">セキュリティ</TabItem>
          <TabItem value="notifications">通知</TabItem>
          <TabItem value="billing">請求</TabItem>
        </Tabs>
      </div>

      <div className="vertical-tabs-content">
        <TabPanel value="general" active={activeTab === 'general'}>
          一般設定の内容
        </TabPanel>
        <TabPanel value="security" active={activeTab === 'security'}>
          セキュリティ設定の内容
        </TabPanel>
        <TabPanel value="notifications" active={activeTab === 'notifications'}>
          通知設定の内容
        </TabPanel>
        <TabPanel value="billing" active={activeTab === 'billing'}>
          請求情報の内容
        </TabPanel>
      </div>
    </div>
  );
}
```

## 関連コンポーネント

- [Card](/components/card) - タブパネルのコンテナとして使用
- [Badge](/components/badge) - タブにカウンターやステータスを表示
- [Button](/components/button) - タブ内のアクションボタン

## API リファレンス

```typescript
interface TabsProps {
  /**
   * バリアント
   * @default 'default'
   */
  variant?: 'default' | 'pills';

  /**
   * 選択中のタブの値
   */
  value?: string;

  /**
   * タブが変更された時のコールバック
   */
  onTabChange?: (event: CustomEvent<string>) => void;

  /**
   * カスタムクラス名
   */
  className?: string;

  /**
   * Tabs のコンテンツ（TabItem 要素）
   */
  children: ReactNode;
}

interface TabItemProps {
  /**
   * タブの値（一意の識別子）
   * @required
   */
  value: string;

  /**
   * 無効状態
   * @default false
   */
  disabled?: boolean;

  /**
   * カスタムクラス名
   */
  className?: string;

  /**
   * タブのコンテンツ
   */
  children: ReactNode;
}

interface TabPanelProps {
  /**
   * 対応するタブの値
   * @required
   */
  value: string;

  /**
   * アクティブ状態（表示/非表示）
   */
  active?: boolean;

  /**
   * カスタムクラス名
   */
  className?: string;

  /**
   * パネルのコンテンツ
   */
  children: ReactNode;
}

interface TabsEvents {
  /**
   * タブが変更された時に発火
   * detail: 選択されたタブの value
   */
  'tab-change': CustomEvent<string>;
}
```

## トラブルシューティング

### 問題: タブパネルが表示されない

**原因:**
- タブとパネルの `value` が一致していない
- パネルの `active` プロパティが正しく設定されていない

**解決策:**

```tsx
// Bad ✗: value が一致していない
<Tabs value="tab1">
  <TabItem value="tab1">タブ1</TabItem>
</Tabs>
<TabPanel value="differentValue" active={true}>
  コンテンツ
</TabPanel>

// Good ✓: value を一致させる
<Tabs value={activeTab}>
  <TabItem value="tab1">タブ1</TabItem>
</Tabs>
<TabPanel value="tab1" active={activeTab === 'tab1'}>
  コンテンツ
</TabPanel>

// Good ✓: デバッグ用にログを追加
function DebugTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  console.log('Active tab:', activeTab); // デバッグログ

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => {
        console.log('Tab changed to:', e.detail);
        setActiveTab(e.detail);
      }}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
      </Tabs>

      <TabPanel value="tab1" active={activeTab === 'tab1'}>
        コンテンツ1 (active: {String(activeTab === 'tab1')})
      </TabPanel>
      <TabPanel value="tab2" active={activeTab === 'tab2'}>
        コンテンツ2 (active: {String(activeTab === 'tab2')})
      </TabPanel>
    </>
  );
}
```

### 問題: Arrow キーでタブが切り替わらない

**原因:**
- タブリストにフォーカスが当たっていない
- イベントが他の要素でキャプチャされている
- `disabled` 属性が設定されている

**解決策:**

```tsx
// Bad ✗: tabIndex が設定されていない
<Tabs value={activeTab}>
  <TabItem value="tab1">タブ1</TabItem>
</Tabs>

// Good ✓: タブリストは自動的に適切な tabIndex を持つ
// ただし、カスタムラッパーを使用している場合は注意
<div style={{ outline: 'none' }}>
  <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
    <TabItem value="tab1">タブ1</TabItem>
    <TabItem value="tab2">タブ2</TabItem>
  </Tabs>
</div>

// Good ✓: イベントの伝播を確認
<Tabs
  value={activeTab}
  onTabChange={(e) => setActiveTab(e.detail)}
  onKeyDown={(e) => {
    console.log('Key pressed:', e.key); // デバッグログ
  }}
>
  <TabItem value="tab1">タブ1</TabItem>
  <TabItem value="tab2">タブ2</TabItem>
</Tabs>
```

### 問題: 動的に追加したタブが選択できない

**原因:**
- タブの配列の更新後に状態が正しく同期されていない
- `key` プロパティが重複している

**解決策:**

```tsx
// Bad ✗: key が重複している
function BadDynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'タブ1' },
    { id: '2', label: 'タブ2' },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const addTab = () => {
    setTabs([...tabs, { id: '1', label: '新タブ' }]); // Bad: IDが重複
  };

  return (
    <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
      {tabs.map((tab) => (
        <TabItem key={tab.id} value={tab.id}>
          {tab.label}
        </TabItem>
      ))}
    </Tabs>
  );
}

// Good ✓: 一意の ID を生成
function GoodDynamicTabs() {
  const [tabs, setTabs] = useState([
    { id: '1', label: 'タブ1' },
    { id: '2', label: 'タブ2' },
  ]);
  const [activeTab, setActiveTab] = useState('1');

  const addTab = () => {
    const newId = `tab-${Date.now()}`; // 一意の ID
    const newTab = { id: newId, label: `タブ${tabs.length + 1}` };
    setTabs([...tabs, newTab]);
    setActiveTab(newId); // 新しいタブをアクティブに
  };

  return (
    <>
      <Tabs value={activeTab} onTabChange={(e) => setActiveTab(e.detail)}>
        {tabs.map((tab) => (
          <TabItem key={tab.id} value={tab.id}>
            {tab.label}
          </TabItem>
        ))}
      </Tabs>
      <button onClick={addTab}>タブ追加</button>
    </>
  );
}
```

### 問題: タブ切り替え時にパネルのスクロール位置が保持されない

**原因:**
- パネルが DOM から削除されている（`unmountOnExit`）
- スクロール位置を管理していない

**解決策:**

```tsx
// Good ✓: スクロール位置を保存・復元
function ScrollPreservingTabs() {
  const [activeTab, setActiveTab] = useState('tab1');
  const scrollPositions = useRef<{ [key: string]: number }>({});
  const panelRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleTabChange = (e: CustomEvent<string>) => {
    // 現在のタブのスクロール位置を保存
    const currentPanel = panelRefs.current[activeTab];
    if (currentPanel) {
      scrollPositions.current[activeTab] = currentPanel.scrollTop;
    }

    setActiveTab(e.detail);

    // 新しいタブのスクロール位置を復元
    setTimeout(() => {
      const newPanel = panelRefs.current[e.detail];
      if (newPanel && scrollPositions.current[e.detail]) {
        newPanel.scrollTop = scrollPositions.current[e.detail];
      }
    }, 0);
  };

  return (
    <>
      <Tabs value={activeTab} onTabChange={handleTabChange}>
        <TabItem value="tab1">タブ1</TabItem>
        <TabItem value="tab2">タブ2</TabItem>
      </Tabs>

      <div
        ref={(el) => (panelRefs.current.tab1 = el)}
        style={{
          display: activeTab === 'tab1' ? 'block' : 'none',
          height: '300px',
          overflow: 'auto',
        }}
      >
        <TabPanel value="tab1" active={activeTab === 'tab1'}>
          {/* 長いコンテンツ */}
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>コンテンツ {i + 1}</p>
          ))}
        </TabPanel>
      </div>

      <div
        ref={(el) => (panelRefs.current.tab2 = el)}
        style={{
          display: activeTab === 'tab2' ? 'block' : 'none',
          height: '300px',
          overflow: 'auto',
        }}
      >
        <TabPanel value="tab2" active={activeTab === 'tab2'}>
          {/* 長いコンテンツ */}
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>コンテンツ {i + 1}</p>
          ))}
        </TabPanel>
      </div>
    </>
  );
}
```

## バリアント別の使い分け

| バリアント | 用途 | 特徴 | 推奨シーン |
|-----------|------|------|-----------|
| `default` | ナビゲーション | アンダーライン表示、シンプル | ダッシュボード、設定画面、プロフィールページ |
| `pills` | フィルター・カテゴリ選択 | ボタン風デザイン、コンパクト | データフィルター、コンテンツカテゴリ、ステータス切り替え |
