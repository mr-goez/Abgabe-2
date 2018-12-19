import { ADMIN_PASSWORD, ADMIN_USERNAME, PAUSE } from '../shared/constants'

export default {
    '@tags': ['balkendiagramm', 'diagramme'],

    after(client) {
        client.end()
    },

    afterEach(client, done) {
        client.pause(PAUSE)
        done()
    },

    'Balkendiagramm anzeigen'(client) {
        // arrange
        const { page } = client
        page.authPage()
            // URL des "Page Objects" aus pages/authPage.js aufrufen
            .navigate()
            // Kommando des "Page Objects" aufrufen
            .login(ADMIN_USERNAME, ADMIN_PASSWORD)
            .checkLogin()

        // act
        // page.balkendiagrammPage().show()
        page.balkendiagrammPage().navigate()

        // assert
        client.pause(PAUSE)
        page.balkendiagrammPage().check()
        page.authPage()
            .logout()
            .end()
    },
}
