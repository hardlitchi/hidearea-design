# Component Pattern Recipes

実践的なコンポーネントパターンのレシピ集。一般的なユースケースに対するコピペ可能な実装例を提供します。

## 目次

- [フォームパターン](#フォームパターン)
- [リストとテーブルパターン](#リストとテーブルパターン)
- [ナビゲーションパターン](#ナビゲーションパターン)
- [モーダルとダイアログパターン](#モーダルとダイアログパターン)
- [通知とフィードバックパターン](#通知とフィードバックパターン)
- [データ表示パターン](#データ表示パターン)

## フォームパターン

### レシピ1: ログインフォーム

完全なバリデーション付きログインフォーム。

```html
<form id="loginForm">
  <ha-form-group
    label="Email Address"
    helper-text="We'll never share your email"
    error-text="Please enter a valid email address">
    <ha-input
      type="email"
      name="email"
      required
      autocomplete="email"
      placeholder="you@example.com">
      <ha-icon slot="prefix" name="mail"></ha-icon>
    </ha-input>
  </ha-form-group>

  <ha-form-group
    label="Password"
    helper-text="At least 8 characters"
    error-text="Password must be at least 8 characters">
    <ha-input
      type="password"
      name="password"
      required
      minlength="8"
      autocomplete="current-password"
      placeholder="Enter your password">
      <ha-icon slot="prefix" name="lock"></ha-icon>
    </ha-input>
  </ha-form-group>

  <ha-checkbox name="remember">
    Remember me
  </ha-checkbox>

  <div class="form-actions">
    <ha-button type="submit" variant="primary" full-width>
      Sign In
    </ha-button>
  </div>

  <div class="form-footer">
    <a href="/forgot-password">Forgot password?</a>
  </div>
</form>

<script type="module">
  import '@hidearea-design/core';

  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // バリデーション
    const inputs = form.querySelectorAll('ha-input');
    let isValid = true;

    inputs.forEach(input => {
      const formGroup = input.closest('ha-form-group');

      if (!input.checkValidity()) {
        input.setAttribute('error', '');
        formGroup?.setAttribute('error', '');
        isValid = false;
      } else {
        input.removeAttribute('error');
        formGroup?.removeAttribute('error');
      }
    });

    if (!isValid) return;

    // フォーム送信
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        // エラー表示
        showToast('Login failed. Please check your credentials.', 'error');
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    }
  });
</script>
```

### レシピ2: 複数ステップフォーム

ウィザード形式のフォーム。

```html
<div id="multiStepForm">
  <!-- ステップインジケーター -->
  <ha-tabs active="step1" variant="segmented" id="stepTabs">
    <ha-tab-item value="step1">Personal Info</ha-tab-item>
    <ha-tab-item value="step2">Address</ha-tab-item>
    <ha-tab-item value="step3">Confirmation</ha-tab-item>
  </ha-tabs>

  <!-- Step 1: Personal Info -->
  <ha-tab-panel value="step1">
    <form id="step1Form">
      <ha-form-group label="First Name">
        <ha-input name="firstName" required></ha-input>
      </ha-form-group>

      <ha-form-group label="Last Name">
        <ha-input name="lastName" required></ha-input>
      </ha-form-group>

      <ha-form-group label="Email">
        <ha-input type="email" name="email" required></ha-input>
      </ha-form-group>

      <ha-button variant="primary" onclick="nextStep('step2')">
        Next
      </ha-button>
    </form>
  </ha-tab-panel>

  <!-- Step 2: Address -->
  <ha-tab-panel value="step2">
    <form id="step2Form">
      <ha-form-group label="Street Address">
        <ha-input name="street" required></ha-input>
      </ha-form-group>

      <div class="form-row">
        <ha-form-group label="City">
          <ha-input name="city" required></ha-input>
        </ha-form-group>

        <ha-form-group label="Postal Code">
          <ha-input name="postalCode" required></ha-input>
        </ha-form-group>
      </div>

      <div class="form-actions">
        <ha-button variant="ghost" onclick="prevStep('step1')">
          Back
        </ha-button>
        <ha-button variant="primary" onclick="nextStep('step3')">
          Next
        </ha-button>
      </div>
    </form>
  </ha-tab-panel>

  <!-- Step 3: Confirmation -->
  <ha-tab-panel value="step3">
    <div id="confirmation"></div>

    <div class="form-actions">
      <ha-button variant="ghost" onclick="prevStep('step2')">
        Back
      </ha-button>
      <ha-button variant="primary" onclick="submitForm()">
        Submit
      </ha-button>
    </div>
  </ha-tab-panel>
</div>

<script>
  const formData = {};
  const tabs = document.getElementById('stepTabs');

  function nextStep(step) {
    const currentForm = document.querySelector(`ha-tab-panel[value="${tabs.active}"] form`);

    if (currentForm && !validateForm(currentForm)) {
      return;
    }

    // 現在のステップのデータを保存
    if (currentForm) {
      const data = new FormData(currentForm);
      Object.assign(formData, Object.fromEntries(data));
    }

    // 確認画面の場合、データを表示
    if (step === 'step3') {
      displayConfirmation();
    }

    tabs.active = step;
  }

  function prevStep(step) {
    tabs.active = step;
  }

  function validateForm(form) {
    const inputs = form.querySelectorAll('ha-input');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        input.setAttribute('error', '');
        isValid = false;
      } else {
        input.removeAttribute('error');
      }
    });

    return isValid;
  }

  function displayConfirmation() {
    const confirmationEl = document.getElementById('confirmation');
    confirmationEl.innerHTML = `
      <ha-card>
        <h3 slot="header">Please Review Your Information</h3>
        <dl>
          <dt>Name:</dt>
          <dd>${formData.firstName} ${formData.lastName}</dd>

          <dt>Email:</dt>
          <dd>${formData.email}</dd>

          <dt>Address:</dt>
          <dd>
            ${formData.street}<br>
            ${formData.city}, ${formData.postalCode}
          </dd>
        </dl>
      </ha-card>
    `;
  }

  async function submitForm() {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        showToast('Form submitted successfully!', 'success');
        // Reset form
        Object.keys(formData).forEach(key => delete formData[key]);
        tabs.active = 'step1';
      }
    } catch (error) {
      showToast('Submission failed. Please try again.', 'error');
    }
  }
</script>
```

### レシピ3: 動的フォームフィールド

条件に応じてフィールドを表示/非表示。

```html
<form id="dynamicForm">
  <ha-form-group label="Account Type">
    <ha-select name="accountType" id="accountType">
      <option value="personal">Personal</option>
      <option value="business">Business</option>
    </ha-select>
  </ha-form-group>

  <!-- Personal fields -->
  <div id="personalFields" style="display: none;">
    <ha-form-group label="Date of Birth">
      <ha-input type="date" name="dob"></ha-input>
    </ha-form-group>
  </div>

  <!-- Business fields -->
  <div id="businessFields" style="display: none;">
    <ha-form-group label="Company Name">
      <ha-input name="companyName"></ha-input>
    </ha-form-group>

    <ha-form-group label="Tax ID">
      <ha-input name="taxId"></ha-input>
    </ha-form-group>
  </div>

  <ha-button type="submit" variant="primary">Submit</ha-button>
</form>

<script>
  const accountTypeSelect = document.getElementById('accountType');
  const personalFields = document.getElementById('personalFields');
  const businessFields = document.getElementById('businessFields');

  accountTypeSelect.addEventListener('change', (e) => {
    const value = e.target.value;

    if (value === 'personal') {
      personalFields.style.display = 'block';
      businessFields.style.display = 'none';

      // 必須フィールドの切り替え
      personalFields.querySelectorAll('ha-input').forEach(input => {
        input.setAttribute('required', '');
      });
      businessFields.querySelectorAll('ha-input').forEach(input => {
        input.removeAttribute('required');
      });
    } else if (value === 'business') {
      personalFields.style.display = 'none';
      businessFields.style.display = 'block';

      personalFields.querySelectorAll('ha-input').forEach(input => {
        input.removeAttribute('required');
      });
      businessFields.querySelectorAll('ha-input').forEach(input => {
        input.setAttribute('required', '');
      });
    }
  });

  // 初期状態
  accountTypeSelect.dispatchEvent(new Event('change'));
</script>
```

## リストとテーブルパターン

### レシピ4: フィルタ可能なテーブル

検索とフィルタ機能付きテーブル。

```html
<div id="dataTable">
  <!-- 検索とフィルタ -->
  <div class="table-controls">
    <ha-input
      type="search"
      placeholder="Search..."
      id="searchInput">
      <ha-icon slot="prefix" name="search"></ha-icon>
    </ha-input>

    <ha-select id="statusFilter">
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </ha-select>
  </div>

  <!-- テーブル -->
  <ha-table id="table">
    <table>
      <thead>
        <tr>
          <th data-sort="name">Name</th>
          <th data-sort="email">Email</th>
          <th data-sort="status">Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tableBody">
        <!-- 動的に生成 -->
      </tbody>
    </table>
  </ha-table>

  <!-- ページネーション -->
  <ha-pagination
    id="pagination"
    total="0"
    page-size="10"
    current="1">
  </ha-pagination>
</div>

<script>
  let data = [];
  let filteredData = [];
  let currentPage = 1;
  const pageSize = 10;

  // データ読み込み
  async function loadData() {
    const response = await fetch('/api/users');
    data = await response.json();
    applyFilters();
  }

  // フィルタ適用
  function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    filteredData = data.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm);

      const matchesStatus =
        !statusFilter || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    updatePagination();
    renderTable();
  }

  // テーブルレンダリング
  function renderTable() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = filteredData.slice(start, end);

    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = pageData.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>
          <ha-badge variant="${item.status === 'active' ? 'success' : 'neutral'}">
            ${item.status}
          </ha-badge>
        </td>
        <td>
          <ha-button size="sm" onclick="editUser(${item.id})">Edit</ha-button>
          <ha-button size="sm" variant="danger" onclick="deleteUser(${item.id})">Delete</ha-button>
        </td>
      </tr>
    `).join('');
  }

  // ページネーション更新
  function updatePagination() {
    const pagination = document.getElementById('pagination');
    pagination.setAttribute('total', filteredData.length);
  }

  // イベントリスナー
  document.getElementById('searchInput').addEventListener('input', applyFilters);
  document.getElementById('statusFilter').addEventListener('change', applyFilters);

  document.getElementById('pagination').addEventListener('page-change', (e) => {
    currentPage = e.detail.page;
    renderTable();
  });

  // ソート
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const field = th.dataset.sort;
      sortData(field);
    });
  });

  function sortData(field) {
    const ascending = !this._ascending;
    this._ascending = ascending;

    filteredData.sort((a, b) => {
      if (a[field] < b[field]) return ascending ? -1 : 1;
      if (a[field] > b[field]) return ascending ? 1 : -1;
      return 0;
    });

    renderTable();
  }

  // 初期化
  loadData();
</script>
```

### レシピ5: ドラッグ&ドロップリスト

並び替え可能なリスト。

```html
<ha-list-container id="sortableList">
  <ha-list-item draggable="true" data-id="1">
    <ha-icon slot="prefix" name="drag"></ha-icon>
    Item 1
  </ha-list-item>
  <ha-list-item draggable="true" data-id="2">
    <ha-icon slot="prefix" name="drag"></ha-icon>
    Item 2
  </ha-list-item>
  <ha-list-item draggable="true" data-id="3">
    <ha-icon slot="prefix" name="drag"></ha-icon>
    Item 3
  </ha-list-item>
</ha-list-container>

<script>
  const list = document.getElementById('sortableList');
  let draggedElement = null;

  list.addEventListener('dragstart', (e) => {
    draggedElement = e.target;
    e.target.style.opacity = '0.5';
  });

  list.addEventListener('dragend', (e) => {
    e.target.style.opacity = '';
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(list, e.clientY);
    const draggable = draggedElement;

    if (afterElement == null) {
      list.appendChild(draggable);
    } else {
      list.insertBefore(draggable, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('ha-list-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // 順序変更をサーバーに送信
  list.addEventListener('drop', async () => {
    const items = [...list.querySelectorAll('ha-list-item')];
    const order = items.map(item => item.dataset.id);

    await fetch('/api/update-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order })
    });
  });
</script>
```

## ナビゲーションパターン

### レシピ6: レスポンシブナビゲーション

モバイルでドロワーになるナビゲーション。

```html
<div class="app-layout">
  <!-- Header -->
  <header class="app-header">
    <ha-button
      variant="ghost"
      class="menu-toggle"
      onclick="toggleMenu()">
      <ha-icon name="menu"></ha-icon>
    </ha-button>

    <h1>My App</h1>

    <ha-avatar name="John Doe"></ha-avatar>
  </header>

  <!-- Desktop Navigation -->
  <nav class="desktop-nav">
    <ha-menu>
      <ha-menu-item href="/" icon="home">Home</ha-menu-item>
      <ha-menu-item href="/products" icon="box">Products</ha-menu-item>
      <ha-menu-item href="/orders" icon="shopping-cart">Orders</ha-menu-item>
      <ha-menu-item href="/settings" icon="settings">Settings</ha-menu-item>
    </ha-menu>
  </nav>

  <!-- Mobile Drawer -->
  <ha-drawer id="mobileDrawer" position="left">
    <h2 slot="header">Menu</h2>

    <ha-menu>
      <ha-menu-item href="/" icon="home">Home</ha-menu-item>
      <ha-menu-item href="/products" icon="box">Products</ha-menu-item>
      <ha-menu-item href="/orders" icon="shopping-cart">Orders</ha-menu-item>
      <ha-menu-item href="/settings" icon="settings">Settings</ha-menu-item>
    </ha-menu>
  </ha-drawer>

  <!-- Main Content -->
  <main class="app-main">
    <!-- コンテンツ -->
  </main>
</div>

<style>
  .app-layout {
    display: grid;
    grid-template-areas:
      "header header"
      "nav main";
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr;
    min-height: 100vh;
  }

  .app-header {
    grid-area: header;
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding: 0 var(--spacing-4);
    background: var(--surface-raised-background);
    border-bottom: 1px solid var(--surface-base-border);
  }

  .menu-toggle {
    display: none;
  }

  .desktop-nav {
    grid-area: nav;
    padding: var(--spacing-4);
    background: var(--surface-raised-background);
    border-right: 1px solid var(--surface-base-border);
  }

  .app-main {
    grid-area: main;
    padding: var(--spacing-6);
  }

  @media (max-width: 768px) {
    .app-layout {
      grid-template-areas:
        "header"
        "main";
      grid-template-columns: 1fr;
    }

    .menu-toggle {
      display: block;
    }

    .desktop-nav {
      display: none;
    }
  }
</style>

<script>
  function toggleMenu() {
    const drawer = document.getElementById('mobileDrawer');
    drawer.open = !drawer.open;
  }
</script>
```

### レシピ7: ブレッドクラム付きナビゲーション

階層的なナビゲーション。

```html
<div class="page-header">
  <ha-breadcrumb>
    <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
    <ha-breadcrumb-item href="/products">Products</ha-breadcrumb-item>
    <ha-breadcrumb-item href="/products/electronics">Electronics</ha-breadcrumb-item>
    <ha-breadcrumb-item current>Laptops</ha-breadcrumb-item>
  </ha-breadcrumb>

  <h1>Laptops</h1>
</div>

<script>
  // 動的にブレッドクラムを生成
  function generateBreadcrumb(path) {
    const parts = path.split('/').filter(Boolean);
    const breadcrumb = document.querySelector('ha-breadcrumb');

    breadcrumb.innerHTML = `
      <ha-breadcrumb-item href="/">Home</ha-breadcrumb-item>
      ${parts.map((part, index) => {
        const href = '/' + parts.slice(0, index + 1).join('/');
        const isLast = index === parts.length - 1;
        const label = part.charAt(0).toUpperCase() + part.slice(1);

        return `
          <ha-breadcrumb-item href="${href}" ${isLast ? 'current' : ''}>
            ${label}
          </ha-breadcrumb-item>
        `;
      }).join('')}
    `;
  }

  // 現在のパスからブレッドクラムを生成
  generateBreadcrumb(window.location.pathname);
</script>
```

## モーダルとダイアログパターン

### レシピ8: 確認ダイアログ

ユーザーアクションの確認。

```html
<ha-button onclick="showDeleteConfirmation()">Delete Item</ha-button>

<ha-modal id="deleteModal" dismissible>
  <h2 slot="header">Confirm Deletion</h2>

  <p>Are you sure you want to delete this item? This action cannot be undone.</p>

  <div slot="footer">
    <ha-button variant="ghost" onclick="closeDeleteModal()">
      Cancel
    </ha-button>
    <ha-button variant="danger" onclick="confirmDelete()">
      Delete
    </ha-button>
  </div>
</ha-modal>

<script>
  function showDeleteConfirmation() {
    document.getElementById('deleteModal').open = true;
  }

  function closeDeleteModal() {
    document.getElementById('deleteModal').open = false;
  }

  async function confirmDelete() {
    try {
      await fetch('/api/delete', { method: 'DELETE' });
      closeDeleteModal();
      showToast('Item deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete item', 'error');
    }
  }
</script>
```

### レシピ9: フォームモーダル

モーダル内でのフォーム編集。

```html
<ha-button onclick="openEditModal()">Edit Profile</ha-button>

<ha-modal id="editModal" size="md">
  <h2 slot="header">Edit Profile</h2>

  <form id="editForm">
    <ha-form-group label="Name">
      <ha-input name="name" required></ha-input>
    </ha-form-group>

    <ha-form-group label="Email">
      <ha-input type="email" name="email" required></ha-input>
    </ha-form-group>

    <ha-form-group label="Bio">
      <ha-textarea name="bio" rows="4"></ha-textarea>
    </ha-form-group>
  </form>

  <div slot="footer">
    <ha-button variant="ghost" onclick="closeEditModal()">
      Cancel
    </ha-button>
    <ha-button variant="primary" onclick="saveProfile()">
      Save Changes
    </ha-button>
  </div>
</ha-modal>

<script>
  function openEditModal() {
    // 現在のデータをロード
    loadProfileData();
    document.getElementById('editModal').open = true;
  }

  function closeEditModal() {
    document.getElementById('editModal').open = false;
  }

  async function loadProfileData() {
    const response = await fetch('/api/profile');
    const data = await response.json();

    const form = document.getElementById('editForm');
    form.elements.name.value = data.name;
    form.elements.email.value = data.email;
    form.elements.bio.value = data.bio;
  }

  async function saveProfile() {
    const form = document.getElementById('editForm');
    const formData = new FormData(form);

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
      });

      closeEditModal();
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update profile', 'error');
    }
  }
</script>
```

## 通知とフィードバックパターン

### レシピ10: トーストマネージャー

グローバルなトースト通知システム。

```html
<!-- トーストコンテナ -->
<ha-toast-container id="toastContainer"></ha-toast-container>

<script>
  class ToastManager {
    constructor() {
      this.container = document.getElementById('toastContainer');
    }

    show(message, variant = 'info', duration = 3000) {
      const toast = document.createElement('ha-toast');
      toast.variant = variant;
      toast.textContent = message;

      this.container.appendChild(toast);

      // 自動で閉じる
      if (duration > 0) {
        setTimeout(() => {
          toast.remove();
        }, duration);
      }

      return toast;
    }

    success(message, duration) {
      return this.show(message, 'success', duration);
    }

    error(message, duration) {
      return this.show(message, 'error', duration);
    }

    warning(message, duration) {
      return this.show(message, 'warning', duration);
    }

    info(message, duration) {
      return this.show(message, 'info', duration);
    }
  }

  // グローバルインスタンス
  window.toast = new ToastManager();
</script>

<!-- 使用例 -->
<script>
  toast.success('Operation completed successfully!');
  toast.error('An error occurred. Please try again.');
  toast.warning('Your session will expire in 5 minutes.');
  toast.info('New features available!');
</script>
```

### レシピ11: プログレス付き操作

長時間実行される操作の進捗表示。

```html
<ha-button onclick="startOperation()">Start Processing</ha-button>

<ha-modal id="progressModal" dismissible="false">
  <h2 slot="header">Processing Files</h2>

  <div class="progress-content">
    <p id="progressMessage">Processing file 1 of 100...</p>

    <ha-progress
      id="progressBar"
      value="0"
      max="100"
      show-label>
    </ha-progress>
  </div>
</ha-modal>

<script>
  async function startOperation() {
    const modal = document.getElementById('progressModal');
    const progressBar = document.getElementById('progressBar');
    const message = document.getElementById('progressMessage');

    modal.open = true;

    try {
      const response = await fetch('/api/process');
      const { taskId } = await response.json();

      // ポーリングで進捗を取得
      const interval = setInterval(async () => {
        const status = await fetch(`/api/process/${taskId}/status`);
        const data = await status.json();

        progressBar.value = data.progress;
        message.textContent = data.message;

        if (data.completed) {
          clearInterval(interval);
          modal.open = false;
          toast.success('Processing completed!');
        }

        if (data.error) {
          clearInterval(interval);
          modal.open = false;
          toast.error('Processing failed: ' + data.error);
        }
      }, 1000);
    } catch (error) {
      modal.open = false;
      toast.error('Failed to start processing');
    }
  }
</script>
```

## データ表示パターン

### レシピ12: カードグリッド

レスポンシブなカードレイアウト。

```html
<div class="card-grid">
  <!-- カードを動的に生成 -->
</div>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }
</style>

<script>
  async function loadCards() {
    const response = await fetch('/api/items');
    const items = await response.json();

    const grid = document.querySelector('.card-grid');

    grid.innerHTML = items.map(item => `
      <ha-card>
        <img slot="media" src="${item.image}" alt="${item.title}">

        <h3 slot="header">${item.title}</h3>

        <p>${item.description}</p>

        <div slot="footer">
          <ha-badge variant="primary">${item.category}</ha-badge>
          <span class="price">$${item.price}</span>
        </div>
      </ha-card>
    `).join('');
  }

  loadCards();
</script>
```

### レシピ13: インタラクティブダッシュボード

統計とグラフを表示するダッシュボード。

```html
<div class="dashboard">
  <!-- Stats Cards -->
  <div class="stats-grid">
    <ha-card class="stat-card">
      <div class="stat-content">
        <ha-icon name="users" class="stat-icon"></ha-icon>
        <div>
          <div class="stat-value">1,234</div>
          <div class="stat-label">Total Users</div>
        </div>
      </div>
    </ha-card>

    <ha-card class="stat-card">
      <div class="stat-content">
        <ha-icon name="shopping-cart" class="stat-icon"></ha-icon>
        <div>
          <div class="stat-value">567</div>
          <div class="stat-label">Orders</div>
        </div>
      </div>
    </ha-card>

    <ha-card class="stat-card">
      <div class="stat-content">
        <ha-icon name="dollar-sign" class="stat-icon"></ha-icon>
        <div>
          <div class="stat-value">$12,345</div>
          <div class="stat-label">Revenue</div>
        </div>
      </div>
    </ha-card>
  </div>

  <!-- Recent Activity -->
  <ha-card>
    <h3 slot="header">Recent Activity</h3>

    <ha-list-container>
      <ha-list-item>
        <ha-avatar slot="prefix" name="Alice"></ha-avatar>
        <div>
          <div>Alice ordered Product A</div>
          <small class="text-muted">2 minutes ago</small>
        </div>
      </ha-list-item>

      <ha-list-item>
        <ha-avatar slot="prefix" name="Bob"></ha-avatar>
        <div>
          <div>Bob wrote a review</div>
          <small class="text-muted">15 minutes ago</small>
        </div>
      </ha-list-item>
    </ha-list-container>
  </ha-card>
</div>

<style>
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
    padding: var(--spacing-6);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-4);
  }

  .stat-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    padding: var(--spacing-4);
  }

  .stat-icon {
    font-size: 2rem;
    color: var(--color-primary-500);
  }

  .stat-value {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
  }

  .stat-label {
    font-size: var(--font-size-sm);
    color: var(--text-body-muted-color);
  }

  .text-muted {
    color: var(--text-body-muted-color);
  }
</style>
```

## まとめ

これらのレシピは実際のプロジェクトで使用できるコピペ可能なパターンです：

### 実装されているパターン

1. **フォーム**: ログイン、複数ステップ、動的フィールド
2. **リスト・テーブル**: フィルタ、ソート、ドラッグ&ドロップ
3. **ナビゲーション**: レスポンシブメニュー、ブレッドクラム
4. **モーダル**: 確認ダイアログ、フォームモーダル
5. **通知**: トーストマネージャー、プログレス表示
6. **データ表示**: カードグリッド、ダッシュボード

### 次のステップ

- [Advanced Component Patterns](./advanced-component-patterns.md) - 詳細なパターン解説
- [Accessibility Guide](./accessibility-guide.md) - アクセシビリティ実装
- [Performance Optimization](./performance-optimization.md) - パフォーマンス最適化

これらのレシピを組み合わせることで、複雑なアプリケーションUIを構築できます。
