/* eslint-disable wdio/no-pause */
import { Given, When, Then } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';

async function getExtensionId (this: WebdriverIO.Browser, extensionName: string) {
    if ((this.capabilities as WebdriverIO.Capabilities).browserName !== 'chrome') {
      throw new Error('This command only works with Chrome')
    }

    await this.url('chrome://extensions/')
  const extension = await this.waitUntil(async () => {
    const extensions = await this.$$('extensions-item')
    const extension: WebdriverIO.Element = await extensions.find(async (ext) => (
      await ext.$('#name').getText()) === extensionName
    )

    if (!extension) {
      const installedExtensions = await extensions.map((ext) => ext.$('#name').getText())
      throw new Error(`Couldn't find extension "${extensionName}", available installed extensions are "${installedExtensions.join('", "')}"`)
    }

    return extension
  })

  const extId = await extension.getAttribute('id')
  return extId
}

async function printHandlesAndContextTree (browser: WebdriverIO.Browser) {
  console.log(`Open window handles: ${await browser.getWindowHandles()}`);

  const contextTree = await browser.browsingContextGetTree({});
  console.log(`Context tree: ${JSON.stringify(contextTree)}`);
}

When(/^I open multiple "([^"]*)" extension pages$/, async (extensionName: string) => {
  const extensionId = await getExtensionId.call(browser, extensionName);

  // Open the first page
  await browser.url(`chrome-extension://${extensionId}/hello.html`);
  const titleElement = await browser.$('h1');
  const titleText = await titleElement.getText();
  expect(titleText).toEqual('Hello Extensions');

  console.log('Browser contexts BEFORE opening second window')
  await printHandlesAndContextTree(browser);

  // Try to open the second page
  await browser.newWindow(`chrome-extension://${extensionId}/goodbye.html`, { type: 'tab' });
  await browser.pause(2000);

  console.log('Browser contexts AFTER opening second window')
  await printHandlesAndContextTree(browser);
});

Then(/^I have two page handles to switch between$/, async () => {
  await browser.waitUntil(async () => {
    const openHandles = await browser.getWindowHandles();

    return openHandles.length === 2;
  }, { timeoutMsg: 'Never had at least 2 available window handles'});
});