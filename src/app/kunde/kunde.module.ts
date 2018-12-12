/*
 * Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
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

import { NgModule, Type } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { ROUTES } from '../routes'
import { SharedModule } from '../shared/shared.module'

import { DetailsKundeComponent } from './details-kunde/details-kunde.component'
import { DetailsSchlagwoerterComponent } from './details-kunde/details-schlagwoerter.component'
import { DetailsStammdatenComponent } from './details-kunde/details-stammdaten.component'
import { SucheKundenComponent } from './suche-kunden/suche-kunden.component'
import { SuchergebnisComponent } from './suche-kunden/suchergebnis.component'
import { SuchformularComponent } from './suche-kunden/suchformular.component'

const komponentenExport: Array<Type<any>> = [
    DetailsKundeComponent,
    SucheKundenComponent,
]

const komponentenIntern: Array<Type<any>> = [
    DetailsSchlagwoerterComponent,
    DetailsStammdatenComponent,
    SucheKundenComponent,
    SuchergebnisComponent,
    SuchformularComponent,
]

// Ein Modul enthaelt logisch zusammengehoerige Funktionalitaet.
// Exportierte Komponenten koennen bei einem importierenden Modul in dessen
// Komponenten innerhalb deren Templates (= HTML-Fragmente) genutzt werden.
// KundeModule ist ein "FeatureModule", das Features fuer Kunden bereitstellt
@NgModule({
    imports: [SharedModule, SharedModule.forRoot(), ROUTES],
    declarations: [...komponentenExport, ...komponentenIntern],
    // KundeService mit eigenem DI-Context innerhalb des Moduls, d.h.
    // es kann in anderen Moduln eine eigene Instanz von KundeService geben.
    // Title als Singleton aus dem SharedModule
    providers: [Title],
    exports: komponentenExport,
})
export class KundeModule {}
