# About

This project currently attempts to identify a bug in WebDriver 9 where multiple windows associated with the same Chrome extension are not included in the results of `getWindowHandles()`.

This project is bundled with a modified version of the "Hello World" example extension provided by Google here https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.hello-world

## Requirements

- Node version 18 or higher

## Setup Before Running Tests

1. Install dependencies using `npm install`.

# How to run the test

To run your tests just call the [WDIO runner](http://webdriver.io/guide/testrunner/gettingstarted.html):

```sh
$ npm run wdio
```

# Configurations

To configure your tests, checkout the [`wdio.conf.ts`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/wdio.conf.js) file in your test directory. It comes with a bunch of documented options you can choose from.
