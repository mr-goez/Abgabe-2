// Direktiven (z.B. ngFor, ngIf) und Pipes
import { CommonModule } from '@angular/common'
// HTTP-Methoden fuer REST
import { HttpClientModule } from '@angular/common/http'
// Kern-Funktionalitaet von Angular
import { ModuleWithProviders, NgModule, Type } from '@angular/core'
// Form Controls fuer statische und dynamische Formulare
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
// Titel im Tab aendern
import { Title } from '@angular/platform-browser'
// mind. 1x Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// https://fontawesome.com/how-to-use/on-the-web/using-with/angular
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ErrorMessageComponent } from './error-message.component'
import { WaitingComponent } from './waiting.component'

const komponentenReExport: Array<Type<any>> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
]
const komponentenExport: Array<Type<any>> = [
    ErrorMessageComponent,
    WaitingComponent,
]
const komponentenIntern: Array<Type<any>> = []

@NgModule({
    imports: [...komponentenReExport],

    declarations: [...komponentenExport, ...komponentenIntern],

    exports: [...komponentenReExport, ...komponentenExport],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule, providers: [Title] }
    }
}
