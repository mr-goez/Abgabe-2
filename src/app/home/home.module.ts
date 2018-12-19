import { NgModule, Type } from '@angular/core'
import { Title } from '@angular/platform-browser'

import { SharedModule } from '../shared/shared.module'

import { HomeComponent } from './home.component'

const komponentenExport: Array<Type<any>> = [HomeComponent]
const komponentenIntern: Array<Type<any>> = []

@NgModule({
    // Der Singleton-Service "Title" wird benoetigt
    imports: [SharedModule.forRoot()],
    declarations: [...komponentenExport, ...komponentenIntern],
    providers: [Title],
    exports: komponentenExport,
})
export class HomeModule {}
