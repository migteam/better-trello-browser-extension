import { useQuery } from "@tanstack/react-query";

let browser: typeof chrome;

export const queryKeys = {
  storageSync: ["storageSync"] as const,
};

export const storageSyncKeys = [
  "enlargeCardBack",
  "cardWidth",
  "useLegacyMarkdownEditor",
  "autoHideTopBar",
  "enlargeLists",
  "listWidth",
  "showCardId",
  "disableKeyboardShortcuts",
];

export type StorageSync = {
  enlargeCardBack: boolean;
  cardWidth: number;
  useLegacyMarkdownEditor: boolean;
  autoHideTopBar: boolean;
  enlargeLists: boolean;
  listWidth: number;
  showCardId: boolean;
  disableKeyboardShortcuts: boolean;
};

export function useStorageSyncQuery(options?: {
  enabled?: boolean;
  useCache?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.storageSync,
    queryFn: async () => {
      if (typeof browser === "undefined") {
        browser = chrome;
      }

      const result = await browser.storage.sync.get(storageSyncKeys);
      return result as StorageSync;
    },
    enabled: options?.enabled,
  });
}
