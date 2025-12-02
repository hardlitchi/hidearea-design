# 使用例

hidearea-design コンポーネントを使った一般的なパターンとユースケースの完全な例。

## 目次

- [ログインフォーム](#ログインフォーム)
- [登録フォーム](#登録フォーム)
- [検索インターフェース](#検索インターフェース)
- [設定パネル](#設定パネル)

## ログインフォーム

### React の例

```tsx
import { useState } from "react";
import "@hidearea-design/tokens/dist/tokens.css";
import { Input, Button, Checkbox } from "@hidearea-design/react";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "メールアドレスは必須です";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "メールアドレスが無効です";
    }

    if (!formData.password) {
      newErrors.password = "パスワードは必須です";
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上である必要があります";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log("ログイン成功");
    } catch (error) {
      console.error("ログイン失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      <h2>ログイン</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          メールアドレス
        </label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          fullWidth
          required
          error={!!errors.email}
          value={formData.email}
          onInput={(e) => {
            setFormData({ ...formData, email: e.detail.value });
            setErrors({ ...errors, email: "" });
          }}
        />
        {errors.email && (
          <p
            style={{
              color: "var(--ha-color-error)",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          パスワード
        </label>
        <Input
          id="password"
          type="password"
          placeholder="パスワードを入力"
          fullWidth
          required
          error={!!errors.password}
          value={formData.password}
          onInput={(e) => {
            setFormData({ ...formData, password: e.detail.value });
            setErrors({ ...errors, password: "" });
          }}
        />
        {errors.password && (
          <p
            style={{
              color: "var(--ha-color-error)",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            {errors.password}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <Checkbox
          checked={formData.remember}
          onChange={(e) =>
            setFormData({ ...formData, remember: e.detail.checked })
          }
        >
          ログイン状態を保持
        </Checkbox>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {loading ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  );
}

export default LoginForm;
```

### Vue の例

```vue
<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2>ログイン</h2>

    <div class="form-group">
      <label for="email">メールアドレス</label>
      <HaInput
        id="email"
        v-model="formData.email"
        type="email"
        placeholder="email@example.com"
        full-width
        required
        :error="!!errors.email"
        @input="errors.email = ''"
      />
      <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label for="password">パスワード</label>
      <HaInput
        id="password"
        v-model="formData.password"
        type="password"
        placeholder="パスワードを入力"
        full-width
        required
        :error="!!errors.password"
        @input="errors.password = ''"
      />
      <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
    </div>

    <div class="form-group">
      <HaCheckbox v-model="formData.remember"> ログイン状態を保持 </HaCheckbox>
    </div>

    <HaButton
      type="submit"
      variant="primary"
      full-width
      :loading="loading"
      :disabled="loading"
    >
      {{ loading ? "ログイン中..." : "ログイン" }}
    </HaButton>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import "@hidearea-design/tokens/dist/tokens.css";
import { HaInput, HaButton, HaCheckbox } from "@hidearea-design/vue";

const formData = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = reactive<Record<string, string>>({});
const loading = ref(false);

const validate = () => {
  const newErrors: Record<string, string> = {};

  if (!formData.email) {
    newErrors.email = "メールアドレスは必須です";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "メールアドレスが無効です";
  }

  if (!formData.password) {
    newErrors.password = "パスワードは必須です";
  } else if (formData.password.length < 8) {
    newErrors.password = "パスワードは8文字以上である必要があります";
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  loading.value = true;
  try {
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    console.log("ログイン成功");
  } catch (error) {
    console.error("ログイン失敗:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.error-message {
  color: var(--ha-color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
```

## 検索インターフェース

```tsx
// React
import { useState, useEffect } from "react";
import { Input } from "@hidearea-design/react";

function SearchInterface() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`,
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("検索失敗:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <Input
        type="search"
        placeholder="検索..."
        fullWidth
        value={query}
        onInput={(e) => setQuery(e.detail.value)}
      >
        <svg slot="prefix" width="20" height="20" viewBox="0 0 20 20">
          <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
      </Input>

      {loading && <p>検索中...</p>}

      <div>
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 設定パネル

```tsx
// React
import { useState } from "react";
import { Checkbox, Button } from "@hidearea-design/react";

function SettingsPanel() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    newsletter: true,
    updates: false,
  });

  const allNotifications = Object.values(settings).every(Boolean);
  const someNotifications =
    Object.values(settings).some(Boolean) && !allNotifications;

  const toggleAll = () => {
    const newValue = !allNotifications;
    setSettings({
      emailNotifications: newValue,
      pushNotifications: newValue,
      smsNotifications: newValue,
      newsletter: newValue,
      updates: newValue,
    });
  };

  const handleSave = () => {
    console.log("設定を保存:", settings);
  };

  return (
    <div style={{ maxWidth: "500px" }}>
      <h2>通知設定</h2>

      <Checkbox
        checked={allNotifications}
        indeterminate={someNotifications}
        onChange={toggleAll}
        size="lg"
      >
        <strong>すべての通知を有効にする</strong>
      </Checkbox>

      <div style={{ marginLeft: "2rem" }}>
        <Checkbox
          checked={settings.emailNotifications}
          onChange={(e) =>
            setSettings({ ...settings, emailNotifications: e.detail.checked })
          }
        >
          メール通知
          <span slot="description">メールで更新を受け取る</span>
        </Checkbox>

        <Checkbox
          checked={settings.pushNotifications}
          onChange={(e) =>
            setSettings({ ...settings, pushNotifications: e.detail.checked })
          }
        >
          プッシュ通知
          <span slot="description">デバイスで即座に更新を受け取る</span>
        </Checkbox>

        <Checkbox
          checked={settings.smsNotifications}
          onChange={(e) =>
            setSettings({ ...settings, smsNotifications: e.detail.checked })
          }
        >
          SMS通知
          <span slot="description">
            重要な更新をテキストメッセージで受け取る
          </span>
        </Checkbox>

        <Checkbox
          checked={settings.newsletter}
          onChange={(e) =>
            setSettings({ ...settings, newsletter: e.detail.checked })
          }
        >
          ニュースレター
          <span slot="description">更新とニュースの週次ダイジェスト</span>
        </Checkbox>

        <Checkbox
          checked={settings.updates}
          onChange={(e) =>
            setSettings({ ...settings, updates: e.detail.checked })
          }
        >
          プロダクト更新
          <span slot="description">新機能と改善について学ぶ</span>
        </Checkbox>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Button variant="primary" onClick={handleSave}>
          変更を保存
        </Button>
        <Button variant="outline">リセット</Button>
      </div>
    </div>
  );
}
```

## ベストプラクティス

### フォームバリデーション

1. **blur と submit でバリデーション**：ユーザーがフィールドを離れるときとフォーム送信時にチェック
2. **入力時にエラーをクリア**：ユーザーが入力するとエラーメッセージを削除
3. **具体的なエラーメッセージを表示**：何が間違っているか正確に伝える
4. **ネイティブバリデーションを使用**：HTML5 バリデーション属性を活用

### ローディング状態

1. **ローディングインジケーターを表示**：非同期操作中はボタンの loading プロパティを使用
2. **ローディング中は無効化**：複数の送信を防ぐ
3. **フィードバックを提供**：進行状況を示すためにボタンテキストを更新

### アクセシビリティ

1. **適切なラベルを使用**：入力とラベルを関連付ける
2. **説明を提供**：追加のコンテキストには description スロットを使用
3. **必須フィールドを示す**：required 属性と視覚的インジケーターを使用
4. **キーボードナビゲーション**：すべてのインタラクションがキーボードで動作することを確認

### パフォーマンス

1. **検索をデバウンス**：入力中の API 呼び出しを遅延
2. **オプションの遅延読み込み**：必要に応じて選択肢を読み込む
3. **再レンダリングを最適化**：React.memo や Vue のリアクティブシステムを賢く使用

## 関連ドキュメント

- [コンポーネント API リファレンス](../components/README.md)
- [カスタマイズガイド](./customization.md)
- [アクセシビリティガイド](./accessibility.md)
