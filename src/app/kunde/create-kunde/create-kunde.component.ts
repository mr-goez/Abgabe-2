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
// Bereitgestellt durch das ReactiveFormsModule (s. Re-Export im SharedModule)
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
// Bereitgestellt durch das RouterModule (s. Re-Export im SharedModule)
import { Router } from '@angular/router'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import {
    faCheck,
    faExclamationCircle,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'

import { HOME_PATH, log } from '../../shared'
import { Kunde } from '../shared/kunde'
import { KundeService } from '../shared/kunde.service'

/**
 * Komponente mit dem Tag &lt;create-kunde&gt;, um das Erfassungsformular
 * f&uuml;r ein neuen Kunde zu realisieren.
 */
@Component({
    // moduleId: module.id,
    selector: 'hs-create-kunde',
    templateUrl: './create-kunde.component.html',
})
export class CreateKundeComponent implements OnInit {
    form!: FormGroup

    // Keine Vorbelegung bzw. der leere String, da es Placeholder gibt
    // Varianten fuer Validierung:
    //    serverseitig mittels Request/Response
    //    clientseitig bei den Ereignissen keyup, change, ...
    // Ein Endbenutzer bewirkt staendig einen neuen Fehlerstatus
    readonly nachname: FormControl = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^\w.*$/),
    ])
    readonly email: FormControl = new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
    ])
    readonly kategorie: FormControl = new FormControl(
        undefined,
        Validators.required,
    )
    readonly newsletter: FormControl = new FormControl(false)
    readonly geburtsdatum: FormControl = new FormControl(
        undefined,
        Validators.required,
    )
    readonly betrag: FormControl = new FormControl(undefined)
    readonly waehrung: FormControl = new FormControl(
        undefined,
        Validators.maxLength(3),
    )
    readonly homepage: FormControl = new FormControl(undefined)
    readonly geschlecht: FormControl = new FormControl(
        'MAENNLICH',
        Validators.required,
    )
    readonly familienstand: FormControl = new FormControl(undefined)
    readonly interessen: FormControl = new FormControl(undefined)
    readonly plz: FormControl = new FormControl(undefined, [
        Validators.required,
        Validators.maxLength(5),
    ])
    readonly ort: FormControl = new FormControl(undefined, Validators.required)
    readonly lesen: FormControl = new FormControl(false)
    readonly reisen: FormControl = new FormControl(false)
    readonly sport: FormControl = new FormControl(false)

    showWarning = false
    fertig = false

    readonly faCheck = faCheck
    readonly faExclamationCircle = faExclamationCircle
    readonly faExclamationTriangle = faExclamationTriangle
    readonly faExclamationTriangleSize: SizeProp = '2x'

    constructor(
        private formBuilder: FormBuilder,
        private kundeService: KundeService,
        private router: Router,
        private titleService: Title,
    ) {
        console.log('CreateKundeComponent.constructor()')
        if (router !== undefined) {
            console.log('Injizierter Router:', router)
        }
    }

    /**
     * Das Formular als Gruppe von Controls initialisieren.
     */
    @log
    ngOnInit() {
        this.form = this.formBuilder.group({
            // siehe formControlName innerhalb @Component({template: ...})
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum: this.geburtsdatum,
            umsatz: this.formBuilder.group({
                waehrung: this.waehrung,
                betrag: this.betrag,
            }),
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: this.formBuilder.group({
                plz: this.plz,
                ort: this.ort,
            }),
            lesen: this.lesen,
            reisen: this.reisen,
            sport: this.sport,
        })

        this.titleService.setTitle('Neuer Kunde')
    }

    /**
     * Die Methode <code>save</code> realisiert den Event-Handler, wenn das
     * Formular abgeschickt wird, um einen neuen Kunde anzulegen.
     * @return false, um das durch den Button-Klick ausgel&ouml;ste Ereignis
     *         zu konsumieren.
     */
    @log
    onSave() {
        // In einem Control oder in einer FormGroup gibt es u.a. folgende
        // Properties
        //    value     JSON-Objekt mit den IDs aus der FormGroup als
        //              Schluessel und den zugehoerigen Werten
        //    errors    Map<string,any> mit den Fehlern, z.B. {'required': true}
        //    valid     true/false
        //    dirty     true/false, falls der Wert geaendert wurde

        if (!this.form.valid) {
            console.log('Validierungsfehler:', this.form)
            return false
        }

        const neuerKunde = Kunde.fromForm(this.form.value)
        console.log('neueskunde=', neuerKunde)

        const successFn = (location: string | undefined) => {
            console.log(
                `CreateKunde.onSave(): successFn(): location: ${location}`,
            )
            console.log(
                `CreateKeunde.onSave(): successFn(): navigate: ${HOME_PATH}`,
            )
            this.fertig = true
            this.showWarning = false
            this.router.navigate([HOME_PATH])
        }
        const errorFn = (
            status: number,
            errors: { [s: string]: any } | undefined,
        ) => {
            console.error(`CreateKunde.onSave(): errorFn(): status: ${status}`)
            console.error('CreateKunde.onSave(): errorFn(): errors', errors)
        }
        this.kundeService.save(neuerKunde, successFn, errorFn)

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum Refresh
        // der gesamten Seite
        return false
    }

    toString() {
        return 'CreateKundeComponent'
    }
}
