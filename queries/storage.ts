import { useQuery } from "@tanstack/react-query";

let browser: typeof chrome;

export const queryKeys = {
  storageSync: ["storageSync"] as const,
  storageLocal: ["storageLocal"] as const,
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
  "lists",
  "showAddToTrello",
  "showListsCardCount",
];

export const storageLocalKeys = ["butlerToken"];

export type TrelloList = {
  listId: string;
  listName: string;
  boardName: string;
  isDefault?: boolean;
};

export type StorageSync = {
  enlargeCardBack: boolean;
  cardWidth: number;
  useLegacyMarkdownEditor: boolean;
  autoHideTopBar: boolean;
  enlargeLists: boolean;
  listWidth: number;
  showCardId: boolean;
  disableKeyboardShortcuts: boolean;
  lists: TrelloList[];
  showAddToTrello: boolean;
  showListsCardCount: boolean;
};

export type StorageLocal = {
  butlerToken: string;
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

export function useStorageLocalQuery(options?: {
  enabled?: boolean;
  useCache?: boolean;
}) {
  return useQuery({
    queryKey: queryKeys.storageLocal,
    queryFn: async () => {
      if (typeof browser === "undefined") {
        browser = chrome;
      }

      const result = await browser.storage.local.get(storageLocalKeys);
      return result as StorageLocal;
    },
    enabled: options?.enabled,
  });
}
