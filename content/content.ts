import { StorageSync, storageSyncKeys } from "../queries/storage";

setTimeout(initBodyAttributes, 500);
setTimeout(addOnChangeStorageListener, 500);
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

function addOnChangeStorageListener() {
  if (typeof browser === "undefined") {
    browser = chrome;
  }

  browser.storage.onChanged.addListener((changes) => {
    if (changes.largeCardBack) {
      if (changes.largeCardBack.newValue) {
        document.body.setAttribute("bttr-large-cards", "");
      } else {
        document.body.removeAttribute("bttr-large-cards");
      }
    }

    if (changes.autoHideTopBar) {
      if (changes.autoHideTopBar.newValue) {
        document.body.setAttribute("bttr-hide-topbar", "");
      } else {
        document.body.removeAttribute("bttr-hide-topbar");
      }
    }

    if (changes.useLegacyMarkdownEditor) {
      if (changes.useLegacyMarkdownEditor.newValue) {
        document.body.setAttribute("bttr-legacy-markdown", "");
        useLegacyMarkdownEditor();
      } else {
        document.body.removeAttribute("bttr-legacy-markdown");
      }
    }

    if (changes.showCardId) {
      if (changes.showCardId.newValue) {
        document.body.setAttribute("bttr-show-card-id", "");

        showCardId();

        const observer = new MutationObserver((mutationsList) => {
          for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
              if (mutation.addedNodes.length > 0) {
                showCardId();
              }
            }
          }
        });

        document.querySelectorAll("[data-testid=list-cards]").forEach((node) =>
          observer.observe(node, {
            childList: true,
            subtree: true,
          })
        );
      } else {
        document.body.removeAttribute("bttr-show-card-id");
        document.querySelectorAll(".card-id").forEach((element) => {
          element.parentElement?.removeAttribute("bttr-card-id");
          element.remove();
        });
      }
    }
  });
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
    document.body.setAttribute("bttr-show-card-id", "");
  }
}

async function initial() {
  const storageSync = await getStorageSync();

  if (storageSync.useLegacyMarkdownEditor) {
    useLegacyMarkdownEditor();
  }

  if (storageSync.showCardId) {
    showCardId();

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          if (mutation.addedNodes.length > 0) {
            showCardId();
          }
        }
      }
    });

    document.querySelectorAll("[data-testid=list-cards]").forEach((node) =>
      observer.observe(node, {
        childList: true,
        subtree: true,
      })
    );
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
  const anchors = document.querySelectorAll(
    'a[data-testid="card-name"]:not([bttr-card-id])'
  );

  anchors.forEach((anchor) => {
    const href = anchor.getAttribute("href");

    const match = href?.match(/\/c\/[^\/]+\/(\d+)-/);
    if (match) {
      const id = match[1];

      const span = document.createElement("span");
      span.className = "card-id";
      span.textContent = `#${id}`;

      anchor.setAttribute("bttr-card-id", id);
      anchor.prepend(span);
    }
  });
}
