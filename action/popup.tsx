import Logo from "../components/logo";
import React from "react";
import { useStorageSyncQuery } from "../queries/storage";

import { Switch } from "../components/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/accordion";
import { Label } from "../components/label";
import { Input } from "../components/input";

import manifest from "../manifest.json";

let browser: typeof chrome;

function Popup() {
  let storageSyncQuery = useStorageSyncQuery({ useCache: false });

  if (typeof browser === "undefined") {
    browser = chrome;
  }

  if (storageSyncQuery.isLoading) {
    return (
      <div className="w-72 min-h-4 dark:bg-gray-800 flex flex-col justify-center items-center">
        <Logo className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="w-72 min-h-48 dark:bg-gray-800 flex flex-col">
      <header className="flex items-center w-full p-3 bg-gray-50 dark:bg-gray-900">
        <Logo className="w-6 h-6" />

        <h1 className="text-base font-bold ml-3 leading-none dark:text-white">
          Better Trello
        </h1>
      </header>

      <div className="p-3">
        <fieldset className="flex flex-col gap-2">
          <Accordion type="single" collapsible>
            <AccordionItem value="large-card">
              <AccordionTrigger>
                <label className="dark:text-white text-sm leading-none pr-2">
                  Enlarge Card View
                </label>

                <Switch
                  className="ml-auto"
                  defaultChecked={storageSyncQuery.data?.largeCardBack}
                  onCheckedChange={(checked) => {
                    browser.storage.sync.set({ largeCardBack: checked });
                  }}
                  onClick={(event) => event.stopPropagation()}
                />
              </AccordionTrigger>

              <AccordionContent>
                <fieldset className=" flex flex-col">
                  <div className="flex flex-col gap-2">
                    <Label>Card back width (px)</Label>

                    <Input
                      type="number"
                      placeholder="1024"
                      defaultValue={storageSyncQuery.data?.largeCardWidth}
                      onChange={(event) => {
                        browser.storage.sync.set({
                          largeCardWidth: event.target.value,
                        });
                      }}
                    />
                  </div>
                </fieldset>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
              defaultChecked={storageSyncQuery.data?.autoHideTopBar}
              onCheckedChange={(checked) => {
                browser.storage.sync.set({ autoHideTopBar: checked });
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="dark:text-white text-sm leading-none pr-2">
              Show Card ID
            </label>

            <Switch
              defaultChecked={storageSyncQuery.data?.showCardId}
              onCheckedChange={(checked) => {
                browser.storage.sync.set({ showCardId: checked });
              }}
            />
          </div>
        </fieldset>

        <small className="flex-row text-xs flex gap-1 mt-3 dark:text-white/40 text-black/40">
          <strong>Version {manifest.version}</strong>
          <span>·</span>
          <a
            href="https://github.com/migteam/better-trello-browser-extension/issues/new"
            className="hover:underline underline-offset-4"
            target="_blank"
          >
            🐛 Report an issue
          </a>
        </small>
      </div>
    </div>
  );
}

export default Popup;
