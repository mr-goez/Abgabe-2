import { ADMIN_PASSWORD, ADMIN_USERNAME, PAUSE } from '../shared/constants'

export default {
    '@tags': ['liniendiagramm', 'diagramme'],

    after(client) {
        client.end()
    },

    afterEach(client, done) {
        client.pause(PAUSE)
        done()
    },

    'Liniendiagramm anzeigen'(client) {
        // arrange
        const { page } = client
        page.authPage()
            // URL des "Page Objects" aufrufen
            .navigate()
            // Kommando des "Page Objects" aufrufen
            .login(ADMIN_USERNAME, ADMIN_PASSWORD)
            .checkLogin()

        // act
        // page.liniendiagrammPage().show()
        page.liniendiagrammPage().navigate()

        // assert
        client.pause(PAUSE)
        page.liniendiagrammPage().check()
        page.authPage()
            .logout()
            .checkLogout()
            .end()
    },
}
