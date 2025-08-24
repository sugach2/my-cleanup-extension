// options.js

document.addEventListener('DOMContentLoaded', () => {
  // 保存された設定を読み込み、UIに反映
  chrome.storage.sync.get('cleanupSettings', (data) => {
    const settings = data.cleanupSettings || {};
    document.getElementById('history').checked = settings.history || false;
    document.getElementById('downloads').checked = settings.downloads || false;
    document.getElementById('cookies').checked = settings.cookies || false;
    document.getElementById('cache').checked = settings.cache || false;
    document.getElementById('passwords').checked = settings.passwords || false;
    document.getElementById('formData').checked = settings.formData || false;
    document.getElementById('appcache').checked = settings.appcache || false;
  });

  // 保存ボタンのクリックイベント
  document.getElementById('saveButton').addEventListener('click', () => {
    const settings = {
      history: document.getElementById('history').checked,
      downloads: document.getElementById('downloads').checked,
      cookies: document.getElementById('cookies').checked,
      cache: document.getElementById('cache').checked,
      passwords: document.getElementById('passwords').checked,
      formData: document.getElementById('formData').checked,
      appcache: document.getElementById('appcache').checked
    };
    chrome.storage.sync.set({ cleanupSettings: settings }, () => {
      const status = document.getElementById('status');
      status.textContent = '設定を保存しました。';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    });
  });
});