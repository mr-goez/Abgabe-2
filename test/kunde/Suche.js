import { PAUSE } from '../shared/constants'

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
        // arrange
        client.page
            .suchePage()
            // URL des "Page Objects" aus pages/suchePage.js
            .navigate()

            // act
            .checkInit()
            .submit()

            // assert
            .checkAlleKunden()
    },

    'Suche Kunden mit "a" im Nachname'(client) {
        // arrange
        const nachname = 'a'
        client.page
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

    'Suche mit Fehlermeldung'(client) {
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
    },
}
