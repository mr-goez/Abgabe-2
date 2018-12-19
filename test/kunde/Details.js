import { ADMIN_PASSWORD, ADMIN_USERNAME, PAUSE } from '../shared/constants'

export default {
    '@tags': ['kunden', 'details'],

    after(client) {
        client.end()
    },

    afterEach(client, done) {
        client.pause(PAUSE)
        done()
    },

    'Details zu Kunden mit Nachname "Delta"'(client) {
        // arrange
        const nachname = 'Delta'
        const { page } = client

        // act
        page.authPage()
            // URL des "Page Objects" aufrufen
            .navigate()
            // Kommando des "Page Objects" aufrufen
            .login(ADMIN_USERNAME, ADMIN_PASSWORD)
            .checkLogin()

        page.header().clickSuche()

        page.suchePage()
            .navigate()
            .nachname(nachname)
            .submit()
            .clickNachnameErsteZeile(nachname)

        // assert
        page.detailsPage().checkNachname(nachname)
    },
}
