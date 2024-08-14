import Logo from "../components/logo";
import React from "react";
import { useStorageSyncQuery } from "../queries/storage";
import { Switch } from "../components/switch";

let browser: typeof chrome;

function Popup() {
  let storageSyncQuery = useStorageSyncQuery({ useCache: false });

  if (typeof browser === "undefined") {
    browser = chrome;
  }

  if (storageSyncQuery.isLoading) {
    return (
      <div className="w-72 min-h-48 dark:bg-gray-800 flex flex-col justify-center items-center">
        <Logo className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="w-72 min-h-48 dark:bg-gray-800 flex flex-col">
      <header className="flex items-center w-full p-3 dark:bg-gray-900">
        <Logo className="w-6 h-6" />

        <h1 className="text-base font-bold ml-3 leading-none dark:text-white">
          Better Trello
        </h1>
      </header>

      <fieldset className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between">
          <label className="dark:text-white text-sm leading-none pr-2">
            Enlargen Card View
          </label>

          <Switch
            defaultChecked={storageSyncQuery.data?.largeCardBack}
            onCheckedChange={(checked) => {
              browser.storage.sync.set({ largeCardBack: checked });
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="dark:text-white text-sm leading-none pr-2">
            Use legacy markdown editor
          </label>

          <Switch
            defaultChecked={storageSyncQuery.data?.useLegacyMarkdownEditor}
            onCheckedChange={(checked) => {
              browser.storage.sync.set({ useLegacyMarkdownEditor: checked });
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="dark:text-white text-sm leading-none pr-2">
            Auto hide top bar
          </label>

          <Switch
            defaultChecked={storageSyncQuery.data?.showCardId}
            onCheckedChange={(checked) => {
              browser.storage.sync.set({ showCardId: checked });
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="dark:text-white text-sm leading-none pr-2">
            Show Card Id
          </label>

          <Switch
            defaultChecked={storageSyncQuery.data?.autoHideTopBar}
            onCheckedChange={(checked) => {
              browser.storage.sync.set({ autoHideTopBar: checked });
            }}
          />
        </div>
      </fieldset>
    </div>
  );
}

export default Popup;
