import { ADMIN_PASSWORD, ADMIN_USERNAME, PAUSE } from '../shared/constants'

export default {
    '@tags': ['kunden', 'delete'],

    after(client) {
        client.end()
    },

    afterEach(client, done) {
        client.pause(PAUSE)
        done()
    },

    'Kunde mit Nachname "Epsilon" loeschen'(client) {
        // Given
        const nachname = 'Epsilon'
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
            .nachname(nachname)
            .submit()
            .deleteErsteZeile()

            // assert
            .nachname(nachname)
            .submit()
            .checkFehlermeldung()
        page.authPage()
            .logout()
            .checkLogout()
            .end()
    },
}
