/*
 * Copyright (C) 2017 - present Juergen Zimmermann
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
