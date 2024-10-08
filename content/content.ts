import { StorageSync, storageSyncKeys } from "../queries/storage";
import TurndownService from "turndown";
import { Marked } from "marked";

setTimeout(initBodyAttributes, 500);
setTimeout(addOnChangeStorageListener, 500);
setTimeout(initial, 1500);

setTimeout(fetchLists, 1500);

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

async function addOnChangeStorageListener() {
  if (typeof browser === "undefined") {
    browser = chrome;
  }

  browser.storage.onChanged.addListener((changes) => {
    if (changes.enlargeCardBack) {
      if (changes.enlargeCardBack.newValue) {
        document.body.setAttribute("bttr-large-cards", "");
      } else {
        document.body.removeAttribute("bttr-large-cards");
      }
    }

    if (changes.cardWidth) {
      if (changes.cardWidth.newValue) {
        document.body.style.setProperty(
          "--bttr-card-width",
          `${changes.cardWidth.newValue}px`
        );
      }
    }

    if (changes.enlargeLists) {
      if (changes.enlargeLists.newValue) {
        document.body.setAttribute("bttr-list-width", "");
      } else {
        document.body.removeAttribute("bttr-list-width");
      }
    }

    if (changes.listWidth) {
      if (changes.listWidth.newValue) {
        document.body.style.setProperty(
          "--bttr-list-width",
          `${changes.listWidth.newValue}px`
        );
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

    if (changes.disableKeyboardShortcuts) {
      if (changes.disableKeyboardShortcuts.newValue) {
        window.addEventListener("keydown", handleKeyboardEvent, true);
        window.addEventListener("keypress", handleKeyboardEvent, true);
      } else {
        window.removeEventListener("keydown", handleKeyboardEvent, true);
        window.removeEventListener("keypress", handleKeyboardEvent, true);
      }
    }

    if (changes.showListsCardCount) {
      if (changes.showListsCardCount.newValue) {
        document.body.setAttribute("bttr-show-lists-card-count", "");

        showListsCardCount();
      } else {
        document.body.removeAttribute("bttr-show-lists-card-count");
        document.querySelectorAll(".list-card-count").forEach((element) => {
          element.parentElement?.parentElement?.removeAttribute(
            "bttr-list-card-count"
          );

          element.remove();
        });
      }
    }
  });
}

async function initBodyAttributes() {
  const storageSync = await getStorageSync();

  if (storageSync.enlargeCardBack) {
    document.body.setAttribute("bttr-large-cards", "");
  }

  if (storageSync.cardWidth) {
    document.body.style.setProperty(
      "--bttr-card-width",
      `${storageSync.cardWidth}px`
    );
  }

  if (storageSync.enlargeLists) {
    document.body.setAttribute("bttr-list-width", "");
  }

  if (storageSync.listWidth) {
    document.body.style.setProperty(
      "--bttr-list-width",
      `${storageSync.listWidth}px`
    );
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

  if (storageSync.showListsCardCount) {
    document.body.setAttribute("bttr-show-lists-card-count", "");
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

    if (document.querySelector(".board-canvas")) {
      document.querySelectorAll("[data-testid=list-cards]").forEach((node) =>
        observer.observe(node, {
          childList: true,
          subtree: true,
        })
      );
    } else {
      const boardCanvasObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            if (mutation.addedNodes.length > 0) {
              document
                .querySelectorAll("[data-testid=list-cards]")
                .forEach((node) =>
                  observer.observe(node, {
                    childList: true,
                    subtree: true,
                  })
                );
            }
          }
        }
      });

      const boardMainContent = document.querySelector(".board-main-content");

      if (boardMainContent) {
        boardCanvasObserver.observe(boardMainContent, {
          childList: true,
          subtree: true,
        });
      }
    }
  }

  if (storageSync.disableKeyboardShortcuts) {
    window.addEventListener("keydown", handleKeyboardEvent, true);
    window.addEventListener("keypress", handleKeyboardEvent, true);
  }

  if (storageSync.showListsCardCount) {
    showListsCardCount();

    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          if (mutation.addedNodes.length > 0) {
            showListsCardCount();
          }
        }
      }
    });

    if (document.querySelector(".board-canvas")) {
      document.querySelectorAll("[data-testid=list-cards]").forEach((node) =>
        observer.observe(node, {
          childList: true,
          subtree: true,
        })
      );
    } else {
      const boardCanvasObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
          if (mutation.type === "childList") {
            if (mutation.addedNodes.length > 0) {
              document
                .querySelectorAll("[data-testid=list-cards]")
                .forEach((node) =>
                  observer.observe(node, {
                    childList: true,
                    subtree: true,
                  })
                );
            }
          }
        }
      });

      const boardMainContent = document.querySelector(".board-main-content");

      if (boardMainContent) {
        boardCanvasObserver.observe(boardMainContent, {
          childList: true,
          subtree: true,
        });
      }
    }
  }
}

function useLegacyMarkdownEditor() {
  const turndownService = new TurndownService();
  turndownService.addRule("ignoreProseMirrorTrailingBreak", {
    filter: (node) =>
      node.classList.contains("ProseMirror-trailingBreak") ||
      node.classList.contains("ProseMirror-widget"),
    replacement: () => "",
  });

  const marked = new Marked({
    async: true,
    breaks: true,
  });

  const targetNode = document.getElementById("layer-manager-card-back");

  const config = {
    childList: true,
    subtree: true,
  };

  const callback = function (mutationsList: any, observer: any) {
    window.requestAnimationFrame(() => {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node: any) => {
            if (node.tagName === "DIV") {
              setTimeout(() => {
                node
                  .querySelectorAll("textarea[readonly]")
                  .forEach((textarea: any) => {
                    textarea.readOnly = false;
                  });
              }, 1000);

              node
                .querySelectorAll(".ProseMirror")
                .forEach((element: HTMLDivElement) => {
                  const markdownContent = turndownService.turndown(
                    element.innerHTML
                  );

                  const textarea = document.createElement("textarea");

                  textarea.value = markdownContent;
                  textarea.className = "bttr-markdown-editor";

                  textarea.addEventListener("change", async (event) => {
                    element.innerHTML = await marked.parse(textarea.value);
                  });

                  textarea.addEventListener("keydown", async (event) => {
                    handleMarkdownKeyboardShortcuts(textarea, event);
                    element.innerHTML = await marked.parse(textarea.value);

                    // Auto resize the textarea only on Firefox since it doesn't support the `field-sizing: content` CSS property yet (https://bugzilla.mozilla.org/show_bug.cgi?id=1832409)
                    if (navigator.userAgent.includes("Firefox")) {
                      textarea.style.height = "";
                      textarea.style.height = textarea.scrollHeight + "px";
                    }
                  });

                  const editorWrapper =
                    element.closest(".akEditor")?.parentNode;
                  const hasMarkdownEditor = !!editorWrapper?.querySelector(
                    ".bttr-markdown-editor"
                  );

                  if (editorWrapper && !hasMarkdownEditor) {
                    editorWrapper.insertBefore(textarea, null);

                    textarea.focus();

                    if (navigator.userAgent.includes("Firefox")) {
                      textarea.style.height = textarea.scrollHeight + "px";
                    }
                  }
                });
            }
          });
        }
      }
    });
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

function handleMarkdownKeyboardShortcuts(
  textarea: HTMLTextAreaElement,
  event: KeyboardEvent
) {
  const isCtrlOrCmd = event.ctrlKey || event.metaKey;

  // Ctrl/Cmd + B for Bold (**text**)
  if (isCtrlOrCmd && event.key === "b") {
    event.preventDefault();
    toggleWrapSelectedText(textarea, "**");
  }

  // Ctrl/Cmd + I for Italic (*text*)
  else if (isCtrlOrCmd && event.key === "i") {
    event.preventDefault();
    toggleWrapSelectedText(textarea, "*");
  }

  // Ctrl/Cmd + Alt + 1 for H1 (# Heading)
  else if (isCtrlOrCmd && event.altKey && event.key === "1") {
    event.preventDefault();
    toggleInsertAtStartOfLine(textarea, "# ");
  }

  // Ctrl/Cmd + Alt + 2 for H2 (## Heading)
  else if (isCtrlOrCmd && event.altKey && event.key === "2") {
    event.preventDefault();
    toggleInsertAtStartOfLine(textarea, "## ");
  }

  // Ctrl/Cmd + Alt + 3 for H3 (### Heading)
  else if (isCtrlOrCmd && event.altKey && event.key === "3") {
    event.preventDefault();
    toggleInsertAtStartOfLine(textarea, "### ");
  }

  textarea.dispatchEvent(new Event("change"));
}

function toggleWrapSelectedText(
  textarea: HTMLTextAreaElement,
  wrapper: string,
  wrapperEnd = wrapper
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  let selectedText = textarea.value.substring(start, end);

  const hasWrapper =
    selectedText.startsWith(wrapper) && selectedText.endsWith(wrapperEnd);

  if (hasWrapper) {
    // Remove the wrapper
    selectedText = selectedText.substring(
      wrapper.length,
      selectedText.length - wrapperEnd.length
    );
    textarea.setRangeText(selectedText);
    // Adjust selection
    textarea.selectionStart = start;
    textarea.selectionEnd = start + selectedText.length;
  } else {
    // Add the wrapper
    const newText = wrapper + selectedText + wrapperEnd;
    textarea.setRangeText(newText);
    // Adjust selection
    textarea.selectionStart = start + wrapper.length;
    textarea.selectionEnd = end + wrapper.length;
  }
}

function toggleInsertAtStartOfLine(
  textarea: HTMLTextAreaElement,
  prefix: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const value = textarea.value;

  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = value.indexOf("\n", end);
  if (lineEnd === -1) lineEnd = value.length;

  let lineText = value.substring(lineStart, lineEnd);

  if (lineText.startsWith(prefix)) {
    // Remove the prefix
    lineText = lineText.substring(prefix.length);
    textarea.setRangeText(lineText, lineStart, lineEnd);
    // Adjust selection
    const offset = prefix.length;
    textarea.selectionStart = start - offset;
    textarea.selectionEnd = end - offset;
  } else {
    // Add the prefix
    lineText = prefix + lineText;
    textarea.setRangeText(lineText, lineStart, lineEnd);
    // Adjust selection
    const offset = prefix.length;
    textarea.selectionStart = start + offset;
    textarea.selectionEnd = end + offset;
  }
}

// Credits to https://github.com/SosthenG/trello-shortcut-killer
// for the original implementation of this function
function handleKeyboardEvent(event: Event) {
  const authorizedKeys = ["Escape", "Enter", "Tab"];
  const keyboardEvent = event as KeyboardEvent;

  if ((keyboardEvent.target as HTMLElement)?.tagName === "TEXTAREA") return;

  if (!authorizedKeys.includes(keyboardEvent.key)) {
    keyboardEvent.stopImmediatePropagation();
  }
}

async function fetchLists() {
  if (typeof browser === "undefined") {
    browser = chrome;
  }

  const { lists } = await getStorageSync();

  let newLists = [...(lists || [])];

  document.querySelectorAll("[data-testid=list-wrapper]").forEach((list) => {
    const listId = list.getAttribute("data-list-id");
    const listName = list.querySelector("[data-testid=list-name]")?.textContent;
    const boardName = document.querySelector(
      "[data-testid=board-name-display]"
    )?.textContent;

    if (!listId || !listName || !boardName) return;

    const existingAtIndex = newLists.findIndex(
      (list) => list.listId === listId
    );

    if (existingAtIndex !== -1) {
      newLists[existingAtIndex] = {
        listId,
        listName,
        boardName,
      };
    } else {
      newLists.push({
        listId,
        listName,
        boardName,
      });
    }
  });

  browser.storage.sync.set({
    lists: newLists,
  });
}

function showListsCardCount() {
  const lists = document.querySelectorAll('[data-testid="list"]');

  lists.forEach((list) => {
    const listHeader = list.querySelector("[data-testid=list-header]");
    const listCards = list.querySelector("[data-testid=list-cards]");

    const listCardCount = listCards?.childElementCount || 0;

    const span = document.createElement("span");
    span.className = "list-card-count";
    span.textContent = `${listCardCount}`;

    if (listHeader) {
      const collapseButton = listHeader.querySelector("button");
      const existingSpan = listHeader.querySelector("span.list-card-count");

      if (existingSpan) {
        listHeader.replaceChild(span, existingSpan);
      } else {
        listHeader.insertBefore(span, collapseButton);
      }

      list.setAttribute("bttr-list-card-count", String(listCardCount));
    }
  });
}
