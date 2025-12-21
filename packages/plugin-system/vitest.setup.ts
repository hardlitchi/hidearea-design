import { beforeEach, afterEach } from 'vitest';

// DOM環境のクリーンアップ
beforeEach(() => {
  // body要素をクリア
  document.body.innerHTML = '';

  // head内のstyle要素をクリア
  document.head.querySelectorAll('style').forEach(el => el.remove());

  // documentElementのstyleをクリア
  document.documentElement.removeAttribute('style');
  document.documentElement.removeAttribute('data-theme');
});

afterEach(() => {
  // テスト後のクリーンアップ
  document.body.innerHTML = '';
  document.head.querySelectorAll('style').forEach(el => el.remove());
  document.documentElement.removeAttribute('style');
  document.documentElement.removeAttribute('data-theme');
});
