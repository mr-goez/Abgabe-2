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

import { Component, Input, OnInit } from '@angular/core'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { log } from '../../shared'
import { Kunde } from '../shared/kunde'

/**
 * Komponente f&uuml;r das Tag <code>hs-stammdaten</code>
 */
@Component({
    selector: 'hs-details-stammdaten',
    templateUrl: './details-stammdaten.component.html',
})
export class DetailsStammdatenComponent implements OnInit {
    // Property Binding: <hs-details-stammdaten [kunde]="...">
    // Decorator fuer ein Attribut. Siehe InputMetadata
    @Input()
    kunde!: Kunde

    readonly faStar = faStar

    constructor() {
        console.log('DetailsStammdatenComponent.constructor()')
    }

    @log
    ngOnInit() {
        console.log('kunde=', this.kunde)
    }

    toString() {
        return 'DetailsStammdatenComponent'
    }
}
