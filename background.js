// background.js

function clearData() {
  chrome.storage.sync.get('cleanupSettings', (data) => {
    const settings = data.cleanupSettings || {};
    const options = {
      "since": 0
    };
    const dataToRemove = {
      "history": settings.history || false,
      "downloads": settings.downloads || false,
      "cookies": settings.cookies || false,
      "cache": settings.cache || false,
      "passwords": settings.passwords || false,
      "formData": settings.formData || false,
      "appcache": settings.appcache || false,
      "indexedDB": false,
      "localStorage": false,
      "fileSystems": false,
      "serviceWorkers": false,
      "webSQL": false
    };
    
    // trueに設定されている項目があるか確認
    const hasTrueValue = Object.values(dataToRemove).some(value => value === true);
    if (!hasTrueValue) {
      console.log("削除対象のデータが選択されていません。");
      return;
    }

    chrome.browsingData.remove(options, dataToRemove, () => {
      console.log("指定された閲覧データを削除しました。");
    });
  });
}

// 拡張機能がインストールまたは更新された時に一度実行
chrome.runtime.onInstalled.addListener(() => {
  clearData();
});

// Chromeが起動した時に毎回実行
chrome.runtime.onStartup.addListener(() => {
  console.log("Chromeが起動しました。クリーンアップを実行します。");
  clearData();
});
function updateIcon() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    const tabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        return theme;
      }
    }, (result) => {
      const theme = result[0].result;
      const path = theme === 'dark' ? {
        "16": "images/icon16-dark.png",
        "48": "images/icon48-dark.png",
        "128": "images/icon128-dark.png"
      } : {
        "16": "images/icon16-light.png",
        "48": "images/icon48-light.png",
        "128": "images/icon128-light.png"
      };
      chrome.action.setIcon({ path: path });
    });
  });
}