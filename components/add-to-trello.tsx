import { Button } from "../components/button";
import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown";
import * as Popover from "@radix-ui/react-popover";
import { StorageSync, useStorageSyncQuery } from "../queries/storage";
import { cn } from "../lib/utils";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Star } from "@phosphor-icons/react/dist/ssr/Star";
import { FolderSimpleStar } from "@phosphor-icons/react/dist/ssr/FolderSimpleStar";
import { FolderSimple } from "@phosphor-icons/react/dist/ssr/FolderSimple";

let browser: typeof chrome;

export function AddToTrello() {
  const storageSyncQuery = useStorageSyncQuery({ useCache: false });
  const [tab, setTab] = useState<chrome.tabs.Tab | undefined>(undefined);

  if (typeof browser === "undefined") {
    browser = chrome;
  }

  browser.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function ([tab]) {
      setTab(tab);
    }
  );

  const { lists } = storageSyncQuery.data as StorageSync;

  const defaultList = lists?.find((list) => list.isDefault);

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center gap-2 dark:text-white max-w-full overflow-hidden">
        <img
          className="w-5 h-5 rounded-sm shrink-0"
          src={tab?.favIconUrl}
          alt={tab?.title}
        />

        <span className="text-sm font-medium truncate shrink-0">
          {tab?.title}
        </span>

        <span className="text-sm opacity-40 truncate min-w-0">{tab?.url}</span>
      </div>

      <div className="flex items-center gap-0.5">
        <Button
          className={cn(
            "grow truncate min-w-0",
            lists?.length > 0 && "rounded-tr-none rounded-br-none"
          )}
          onClick={() => {
            if (!tab?.url) return;

            const url = new URL(tab.url);

            window.open(
              `https://trello.com/en-US/add-card?source=${url.host}&mode=popup&url=${url}&name=${tab.title}` +
                (defaultList ? `&idList=${defaultList.listId}` : ""),
              "add-trello-card",
              "width=500,height=600"
            );
          }}
        >
          {defaultList ? (
            <FolderSimpleStar className="w-5 h-5" />
          ) : (
            <FolderSimple className="w-5 h-5" />
          )}
          Add to {defaultList ? defaultList.listName : "Trello"}
        </Button>

        {lists?.length > 0 && (
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button className="shrink-0 px-2 rounded-tl-none rounded-bl-none">
                <CaretDown className="w-5 h-5" />
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content className="shadow-xl shadow-black/20 bg-gray-100 dark:bg-gray-900 rounded-md overflow-auto p-2 dark:text-white max-h-[220px] max-w-[360px] -translate-x-3">
                <div className="flex flex-col gap-1.5 w-full">
                  {lists.map((list) => (
                    <div
                      key={list.listId}
                      className="flex items-center gap-2 w-full"
                    >
                      <button
                        className="shrink-0"
                        onClick={() => {
                          browser.storage.sync.set({
                            lists: lists.map((l) => ({
                              ...l,
                              isDefault:
                                l.listId === list.listId
                                  ? defaultList?.listId !== list.listId
                                  : false,
                            })),
                          });

                          storageSyncQuery.refetch();
                        }}
                      >
                        <Star
                          className={cn(
                            "w-4 h-4",
                            list.isDefault
                              ? "text-yellow-500 dark:text-yellow-500"
                              : "text-gray-400 dark:text-gray-500"
                          )}
                          weight={list.isDefault ? "fill" : "bold"}
                        />
                      </button>

                      <div className="grow flex flex-col mr-3">
                        <span className="text-xs">{list.listName}</span>
                        <span className="text-[10px] font-medium opacity-65">
                          {list.boardName}
                        </span>
                      </div>

                      <Button
                        key={list.listId}
                        size="sm"
                        className="ml-auto rounded-full px-1.5 shrink-0"
                        onClick={() => {
                          if (!tab?.url) return;

                          const url = new URL(tab.url);

                          window.open(
                            `https://trello.com/en-US/add-card?source=${url.host}&mode=popup&url=${url}&name=${tab.title}&idList=${list.listId}`,
                            "add-trello-card",
                            "width=500,height=600"
                          );
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Popover.Arrow className="fill-gray-100 dark:fill-gray-900 -translate-x-3" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        )}
      </div>
    </div>
  );
}
