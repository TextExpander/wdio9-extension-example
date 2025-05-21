/* eslint-disable wdio/no-pause */
import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';
import path from 'node:path';
import url from 'node:url';

const EXTENSION_LOCAL_ID = 'ddmgpgpbnpgmehdbpcggbfmbibefmmjc';

When(/^I open the Extensions page$/, async () => {
  /**
   * The commented-out lines are supposedly a way to load extensions in WDIO 9 using Bidi's webExtension.install function, but always fail with the following error:
   * Error: WebDriver Bidi command "webExtension.install" failed with error: unknown error - Method not available.
   */

  // const extensionPath = path.join(url.fileURLToPath(new URL('.', import.meta.url)), '..', '..', 'extension-code');
  // console.log(`Loading extension at path: ${extensionPath}`);
  // await browser.webExtensionInstall({ extensionData: { type: 'path', path: extensionPath } });
  // await browser.pause(5000);

  await browser.url('chrome://extensions');

  // Pause here for a moment to see whether the extension has been loaded
  await browser.pause(10000);
});

Then(/^I can open the "Hello world" extension page$/, async () => {
  // Attempt to open the extension's page and validate it's contents

  await browser.newWindow(`chrome-extension://${EXTENSION_LOCAL_ID}/hello.html`, { type: 'tab' });
  await browser.pause(2000);

  const titleElement = await browser.$('h1');
  const titleText = await titleElement.getText();
  expect(titleText).toEqual('Hello Extensions');
});

