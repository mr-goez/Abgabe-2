/*
 * Copyright (C) 2015 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
// Bereitgestellt durch das RouterModule (s. Re-Export im SharedModule)
import { ActivatedRoute, Params } from '@angular/router'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { AuthService, ROLLE_ADMIN } from '../../auth/auth.service'
import { isString, log } from '../../shared'
import { Kunde } from '../shared/kunde'
import { KundeService } from '../shared/kunde.service'

/**
 * Komponente f&uuml;r das Tag <code>hs-details-kunde</code>
 */
@Component({
    selector: 'hs-details-kunde',
    templateUrl: './details-kunde.component.html',
})
export class DetailsKundeComponent implements OnInit {
    waiting = false
    kunde: Kunde | undefined
    errorMsg: string | undefined
    isAdmin!: boolean

    readonly faEdit = faEdit
    readonly faEditSize: SizeProp = '2x'

    constructor(
        private kundeService: KundeService,
        private titleService: Title,
        private route: ActivatedRoute,
        private authService: AuthService,
    ) {
        console.log('DetailsKundeComponent.constructor()')
    }

    @log
    ngOnInit() {
        // Die Beobachtung starten, ob es ein zu darzustellendes Kunde oder
        // einen Fehler gibt.
        this.subscribeKunde()
        this.subscribeError()

        // Pfad-Parameter aus /detailsKunde/:id
        // UUID (oder Mongo-ID) ist ein String
        const next = (params: Params) => {
            console.log('params=', params)
            this.kundeService.findById(params.id)
        }
        // ActivatedRoute.params ist ein Observable
        this.route.params.subscribe(next)

        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.isAdmin = this.authService.isAdmin()
        this.subscribeIsAdmin()
    }

    toString() {
        return 'DetailsKundeComponent'
    }

    private subscribeKunde() {
        const next = (kunde: Kunde) => {
            this.waiting = false
            this.kunde = kunde
            console.log('DetailsKundeComponent.kunde=', this.kunde)

            const titel =
                this.kunde === undefined
                    ? 'Details'
                    : `Details ${this.kunde._id}`
            this.titleService.setTitle(titel)
        }
        this.kundeService.subscribeKunde(next)
    }

    private subscribeError() {
        const next = (err: string | number | undefined) => {
            this.waiting = false
            if (err === undefined) {
                this.errorMsg = 'Ein Fehler ist aufgetreten.'
                return
            }

            if (isString(err)) {
                this.errorMsg = err as string
                return
            }

            this.errorMsg =
                err === 404
                    ? 'Kein Kunde gefunden.'
                    : 'Ein Fehler ist aufgetreten.'
            console.log(`DetailsKundeComponent.errorMsg: ${this.errorMsg}`)

            this.titleService.setTitle('Fehler')
        }

        this.kundeService.subscribeError(next)
    }

    private subscribeIsAdmin() {
        const next = (event: Array<string>) => {
            this.isAdmin = event.includes(ROLLE_ADMIN)
            console.log('DetailsKundeComponent.isAdmin:', this.isAdmin)
        }
        this.authService.subscribeRollen(next)
    }
}
