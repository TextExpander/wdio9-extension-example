import url from 'node:url';
import path from 'node:path';

import { hooks } from './src/support/hooks.js';

const extensionPath = path.join(url.fileURLToPath(new URL('.', import.meta.url)), 'extension-code');
console.log(`Extension path: ${extensionPath}`);

export const config: WebdriverIO.Config = {
    services: [],
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',

    specs: [
        './src/features/**/*.feature',
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    capabilities: [{
        maxInstances: 1,
        //
        browserName: 'chrome',

        /**
         * In WDIO 8, this combination of chromeOptions and devtoolsOptions would load the
         * unpacked Chrome extension at the beginning of each test. After upgrading to WDIO 9.14.0,
         * this no longer works, presumably because of devtools being deprecated
         */
        'goog:chromeOptions': {
                args: [
                    'window-size=1280,800',
                    // 'headless',
                    'disable-dev-shm-usage',
                    `load-extension=${extensionPath}`
                ],
            },
        'wdio:devtoolsOptions': {
          ignoreDefaultArgs: ['--disable-extensions']
        }

        /**
         * This setting is shown in the example config file at https://webdriver.io/docs/configurationfile/,
         * but does not replicate the behavior from the devtoolsOptions config above
         */
        // ignoreDefaultArgs: true,
    }],
    debug: true, 

    logLevel: 'trace',
    outputDir: 'logs',

    bail: 0,

    baseUrl: '',

    waitforTimeout: 10000,

    connectionRetryTimeout: 90000,

    connectionRetryCount: 3,

    framework: 'cucumber',

    reporters: ['spec'],

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> module used for processing required features
        requireModule: [],
        // <boolean< Treat ambiguous definitions as errors
        failAmbiguousDefinitions: true,
        // <boolean> invoke formatters without executing steps
        // dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> Enable this config to treat undefined definitions as
        // warnings
        ignoreUndefinedDefinitions: false,
        // <string[]> ("extension:module") require files with the given
        // EXTENSION after requiring MODULE (repeatable)
        names: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <string[]> (file/dir) require files before executing features
        require: [
            './src/steps/**/*.ts',
            // Or search a (sub)folder for JS files with a wildcard
            // works since version 1.1 of the wdio-cucumber-framework
            // './src/**/*.js',
        ],
        scenarioLevelReporter: false,
        order: 'defined',
        // <string> specify a custom snippet syntax
        snippetSyntax: undefined,
        // <boolean> fail if there are any undefined or pending steps
        strict: true,
        // <string> (expression) only execute the features or scenarios with
        // tags matching the expression, see
        // https://docs.cucumber.io/tag-expressions/
        tagExpression: 'not @Pending',
        // <boolean> add cucumber tags to feature or scenario name
        tagsInTitle: false,
        // <number> timeout for step definitions
        timeout: 20000,
    } as WebdriverIO.CucumberOpts,
    ...hooks,
};
