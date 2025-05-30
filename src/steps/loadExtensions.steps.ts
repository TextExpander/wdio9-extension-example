/* eslint-disable wdio/no-pause */
import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import path from 'node:path';
import url from 'node:url';

const EXTENSION_LOCAL_ID = '';

When(/^I open the Extensions page$/, async () => {
  /**
   * These commented-out lines are supposedly a way to load extensions in WDIO 9 using Bidi's webExtension.install function, but always fail with the following error:
   * Error: WebDriver Bidi command "webExtension.install" failed with error: unknown error - Method not available.
   */

  // const extensionPath = path.join(url.fileURLToPath(new URL('.', import.meta.url)), '..', '..', 'extension-code');
  // console.log(`Loading extension at path: ${extensionPath}`);
  // await browser.webExtensionInstall({ extensionData: { type: 'path', path: extensionPath } });
  // await browser.pause(5000);



  /**
   * These commented-out lines are supposedly a way to load extensions using Puppeteer, but always fail with the following error:
   * ProtocolError: Protocol error (Extensions.loadUnpacked): Method not available.
   */
  // const extensionPath = path.join(url.fileURLToPath(new URL('.', import.meta.url)), '..', '..', 'extension-code');
  // const puppeteer = await browser.getPuppeteer();
  // await puppeteer.installExtension(extensionPath);

  await browser.url('chrome://extensions');

  await browser.pause(2000);

  const extensionItem = await $$('extensions-item');

  console.log(`Loaded extensions found: ${extensionItem.length}`);
});

Then(/^I can open the "Hello world" extension page$/, async () => {
  // Attempt to open the extension's page and validate it's contents

  if (EXTENSION_LOCAL_ID === '') {
    throw Error('EXTENSION_LOCAL_ID has not been set. Please check instructions in README.md to set the local ID.');
  }

  await browser.newWindow(`chrome-extension://${EXTENSION_LOCAL_ID}/hello.html`, { type: 'tab' });
  await browser.pause(2000);

  const titleElement = await browser.$('h1');
  const titleText = await titleElement.getText();
  expect(titleText).toEqual('Hello Extensions');
});

