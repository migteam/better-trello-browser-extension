import { StorageSync, storageSyncKeys } from "../queries/storage";

setTimeout(initBodyAttributes, 500);
setTimeout(initial, 1500);

let browser: typeof chrome;

async function getStorageSync() {
  if (typeof browser === "undefined") {
    browser = chrome;
  }

  const storageSync = (await browser.storage.sync.get(
    storageSyncKeys
  )) as StorageSync;

  return storageSync;
}

async function initBodyAttributes() {
  const storageSync = await getStorageSync();

  if (storageSync.largeCardBack) {
    document.body.setAttribute("bttr-large-cards", "");
  }

  if (storageSync.useLegacyMarkdownEditor) {
    document.body.setAttribute("bttr-legacy-markdown", "");
  }

  if (storageSync.autoHideTopBar) {
    document.body.setAttribute("bttr-hide-topbar", "");
  }

  if (storageSync.showCardId) {
    document.body.setAttribute("bttr-card-id", "");
  }
}

async function initial() {
  const storageSync = await getStorageSync();

  if (storageSync.useLegacyMarkdownEditor) {
    useLegacyMarkdownEditor();
  }

  if (storageSync.showCardId) {
    showCardId();
  }
}

function useLegacyMarkdownEditor() {
  const targetNode = document.getElementById("layer-manager-card-back");

  const config = {
    childList: true,
    subtree: false,
  };

  const callback = function (mutationsList: any, observer: any) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node: any) => {
          setTimeout(() => {
            node
              .querySelectorAll("textarea[readonly]")
              .forEach((textarea: any) => {
                textarea.readOnly = false;
              });
          }, 1000);
        });
      }
    }
  };

  const observer = new MutationObserver(callback);

  if (targetNode) observer.observe(targetNode, config);

  document.querySelectorAll("textarea[readonly]").forEach((textarea: any) => {
    textarea.readOnly = false;
  });
}

function showCardId() {
  const anchors = document.querySelectorAll('a[data-testid="card-name"]');

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");

    const match = href?.match(/\/c\/[^\/]+\/(\d+)-/);
    if (match) {
      const id = match[1];

      const span = document.createElement("span");
      span.className = "card-id";
      span.textContent = `#${id}`;

      anchor.prepend(span);
    }
  });
}
