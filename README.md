# About

This project attempts to identify a bug in WebDriver 9 where I cannot load a Chrome extension while running a test.

This project is bundled with the "Hello World" example extension provided by Google here https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.hello-world

## Requirements

- Node version 18 or higher
- Google Chrome

## Setup Before Running Tests

1. Install dependencies using `npm install`.

2. You must install the test extension once manually in order to get the local ID. Follow these instructions:

- Open `chrome://extensions/`
- In the upper right corner, enable Developer mode.
- Click the "Load Unpacked" button in the upper left of the screen.
- Select the `extension-code/` directory in this project. The extension should load in.
- Copy the extension's ID, and then set the `EXTENSION_LOCAL_ID` variable inside `src/steps/loadExtensions.steps.ts`.

# How to run the test

To run your tests just call the [WDIO runner](http://webdriver.io/guide/testrunner/gettingstarted.html):

```sh
$ npm run wdio
```

# Configurations

To configure your tests, checkout the [`wdio.conf.ts`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/wdio.conf.js) file in your test directory. It comes with a bunch of documented options you can choose from.
