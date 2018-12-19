/* global require, module */
/* eslint camelcase: 0 */

// https://www.syncano.io/blog/testing-syncano/#addingecmascript6tonightwatch
require('@babel/register')

// Konfiguration wie in nightwatch.json: nightwatch.conf.js hat hoehere Prioritaet
const config = {
    src_folders: 'test',
    output_folder: 'reports',
    page_objects_path: [
        'test/auth/pages',
        'test/kunde/pages',
        'test/shared/pages',
    ],
    globals_path: 'nightwatch.js',
    selenium: {
        // port: 4444,
        start_process: false,

        // start_process: true,
        // server_path: './config/selenium/selenium-server-standalone.jar',
        // cli_args: {
        //     'webdriver.chrome.driver': './bin/chromedriver',
        // },
    },

    // test_runner : {
    //     type : 'mocha',
    //     options : {
    //         ui : 'bdd',
    //         reporter : 'spec',
    //         // reporter : 'list',
    //     },
    // },

    test_settings: {
        default: {
            launch_url: 'https://localhost',
            webdriver: {
                // port: 4444,
                // host: '127.0.0.1',
                default_path_prefix: '',
                start_process: false,
                port: 9515,

                // start_process: true,
                // port: 9515,
                // server_path:
                //     './node_modules/chromedriver/lib/chromedriver/' +
                //     'chromedriver.exe',
            },
            desiredCapabilities: {
                browserName: 'chrome',
                elementScrollBehavior: '1',
                chromeOptions: {
                    args: ['--no-sandbox', 'window-size=1600,1200'],
                },
                acceptSslCerts: true,
            },
            // screenshots: {
            //     enabled: true,
            //     on_failure: true,
            //     on_error: true,
            //     path: './test_screenshots/',
            // },
        },
    },
    test_workers: false,
}
module.exports = config
