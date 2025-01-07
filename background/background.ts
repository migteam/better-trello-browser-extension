let browserInstance: typeof chrome;

if (typeof browser === "undefined") {
  browserInstance = chrome;
} else {
  browserInstance = browser as any;
}

browserInstance.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const butlerToken = details.requestHeaders?.find(
      (header) => header.name === "X-Butler-Trello-Token"
    )?.value;

    if (butlerToken) {
      browserInstance.storage.local.set({
        butlerToken,
      });
    }
  },
  {
    urls: ["https://*.butlerfortrello.com/*"],
    types: ["xmlhttprequest"],
  },
  ["requestHeaders", "extraHeaders"]
);
