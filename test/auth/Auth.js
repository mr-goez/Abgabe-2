import { ADMIN_PASSWORD, ADMIN_USERNAME, PAUSE } from '../shared/constants'

// Alternativen zu Nightwatch:
// * Nightwatch enthaelt auch Mocha
// * Katalon Studio
// * Appium

export default {
    // "Shorthand Properties" ab ES 2015
    after(client) {
        client.end()
    },

    afterEach(client, done) {
        client.pause(PAUSE)
        done()
    },

    'Login mit gueltigen Daten'(client) {
        // arrange
        const username = ADMIN_USERNAME
        const password = ADMIN_PASSWORD
        const { page } = client

        // act
        page.authPage()
            // URL des "Page Objects" aufrufen
            .navigate()
            // Kommando des "Page Objects" aufrufen
            .login(username, password)

        // assert
        page.authPage().checkLogin()
        page.authPage()
            .logout()
            .checkLogout()
    },

    // https://github.com/nightwatchjs/nightwatch-docs/blob/master/guide/running-tests/disabling-tests.md
    // http://nightwatchjs.org/guide/#test-tags
    // http://nightwatchjs.org/guide/#disabling-tests
    /* eslint no-empty-function: 0, prefer-template: 0 */
    'Login mit ungueltigen Daten': '' + function() {},
}
