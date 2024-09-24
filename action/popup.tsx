import Logo from "../components/logo";
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
import { AddToTrello } from "../components/add-to-trello";

import { WarningDiamond } from "@phosphor-icons/react/dist/ssr/WarningDiamond";

import manifest from "../manifest.json";

let browser: typeof chrome;

function Popup() {
  const storageSyncQuery = useStorageSyncQuery({ useCache: false });

  if (typeof browser === "undefined") {
    browser = chrome;
  }

  if (storageSyncQuery.isLoading) {
    return (
      <div className="w-96 min-h-4 dark:bg-gray-800 flex flex-col justify-center items-center">
        <Logo className="w-6 h-6" />
      </div>
    );
  }

  return (
    <div className="w-96 min-h-48 dark:bg-gray-800 flex flex-col">
      <header className="flex items-center w-full p-3 bg-gray-50 dark:bg-gray-900">
        <Logo className="w-6 h-6" />

        <h1 className="text-base font-bold ml-3 leading-none dark:text-white">
          Better Trello
        </h1>
      </header>

      <div className="p-3">
        {(storageSyncQuery.data?.showAddToTrello ?? true) && <AddToTrello />}

        <fieldset className="flex flex-col gap-2 mt-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="large-card">
              <AccordionTrigger>
                <label className="dark:text-white text-sm leading-none pr-2">
                  Enlarge Card Back
                </label>

                <Switch
                  className="ml-auto"
                  defaultChecked={storageSyncQuery.data?.enlargeCardBack}
                  onCheckedChange={(checked) => {
                    browser.storage.sync.set({ enlargeCardBack: checked });
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
                      defaultValue={storageSyncQuery.data?.cardWidth}
                      onChange={(event) => {
                        browser.storage.sync.set({
                          cardWidth: event.target.value,
                        });
                      }}
                    />
                  </div>
                </fieldset>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="large-card">
              <AccordionTrigger>
                <label className="dark:text-white text-sm leading-none pr-2">
                  Enlarge Lists
                </label>

                <Switch
                  className="ml-auto"
                  defaultChecked={storageSyncQuery.data?.enlargeLists}
                  onCheckedChange={(checked) => {
                    browser.storage.sync.set({ enlargeLists: checked });
                  }}
                  onClick={(event) => event.stopPropagation()}
                />
              </AccordionTrigger>

              <AccordionContent>
                <fieldset className="flex flex-col">
                  <div className="flex flex-col gap-2">
                    <Label>List width (px)</Label>

                    <Input
                      type="number"
                      placeholder="320"
                      defaultValue={storageSyncQuery.data?.listWidth}
                      onChange={(event) => {
                        browser.storage.sync.set({
                          listWidth: event.target.value,
                        });
                      }}
                    />
                  </div>
                </fieldset>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible>
            <AccordionItem value="legacy-markdown">
              <AccordionTrigger>
                <label className="dark:text-white text-sm leading-none pr-2 flex items-center">
                  <span>Use legacy markdown editor</span>
                  <WarningDiamond
                    size={14}
                    weight="bold"
                    className="text-orange-400 ml-1.5"
                  />
                </label>

                <Switch
                  className="ml-auto"
                  defaultChecked={
                    storageSyncQuery.data?.useLegacyMarkdownEditor
                  }
                  onCheckedChange={(checked) => {
                    browser.storage.sync.set({
                      useLegacyMarkdownEditor: checked,
                    });
                  }}
                  onClick={(event) => event.stopPropagation()}
                />
              </AccordionTrigger>

              <AccordionContent className="bg-orange-200 dark:bg-orange-800">
                <p className="dark:text-white text-xs">
                  As of September 2024, mentions might not work properly with
                  the legacy markdown editor due to recent changes.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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

          <div className="flex items-center justify-between">
            <label className="dark:text-white text-sm leading-none pr-2">
              Show Add to Trello button
            </label>

            <Switch
              defaultChecked={storageSyncQuery.data?.showAddToTrello ?? true}
              onCheckedChange={(checked) => {
                browser.storage.sync.set({ showAddToTrello: checked });
                storageSyncQuery.refetch();
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="dark:text-white text-sm leading-none pr-2">
              Disable Trello keyboard shortcuts
            </label>

            <Switch
              defaultChecked={storageSyncQuery.data?.disableKeyboardShortcuts}
              onCheckedChange={(checked) => {
                browser.storage.sync.set({ disableKeyboardShortcuts: checked });
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="dark:text-white text-sm leading-none pr-2">
              Show lists card count
            </label>

            <Switch
              defaultChecked={storageSyncQuery.data?.showListsCardCount}
              onCheckedChange={(checked) => {
                browser.storage.sync.set({ showListsCardCount: checked });
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
          <span>·</span>
          <a
            href="https://ko-fi.com/sewerynkalemba"
            className="hover:underline underline-offset-4"
            target="_blank"
          >
            💖 Buy me a coffee
          </a>
        </small>
      </div>
    </div>
  );
}

export default Popup;
