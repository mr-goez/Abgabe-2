import { PAUSE, ADMIN_USERNAME, ADMIN_PASSWORD } from '../shared/constants'

export default {
    '@tags': ['kunden', 'suche'],

    after(client) {
        client.end()
    },

    afterEach(client, done) {
        client.pause(PAUSE)
        done()
    },

    'Suche alle Kunden'(client) {
        const { page } = client

        page.authPage()
            .navigate()
            .login(ADMIN_USERNAME, ADMIN_PASSWORD)
            .checkLogin()

        page.header().clickSuche()

        page.suchePage()
            .navigate()

            .checkInit()
            .submit()

            .checkAlleKunden()
    },

    'Suche Kunden mit "De" im Nachname'(client) {
        // arrange
        const nachname = 'Delta'
        const { page } = client
        
        page.header().clickSuche()
        page
            .suchePage()
            // URL des "Page Objects" aus pages/suchePage.js
            .navigate()

            // act
            .checkInit()
            .nachname(nachname)
            .submit()

            // assert
            .checkGefundeneKunden(nachname)
    },

/*    'Suche mit Fehlermeldung'(client) {
        // arrange
        const nachname = 'XXX'

        // act
        client.page
            .suchePage()
            // URL des "Page Objects" aus pages/suchePage.js
            .navigate()
            .nachname(nachname)
            .submit()

            // assert
            .checkFehlermeldung()
            .end()
    }, */
}
