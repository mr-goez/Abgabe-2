import { NgModule, Type } from '@angular/core'

import { ROUTES } from '../routes'
import { SharedModule } from '../shared/shared.module'

import { FooterComponent } from './footer.component'
import { HeaderComponent } from './header.component'
// import { LoginLogoutComponent } from './login-logout.component'
import { LogoComponent } from './logo.component'
import { MainComponent } from './main.component'
// import { NavComponent } from './nav.component'

const komponentenExport: Array<Type<any>> = [
    FooterComponent,
    HeaderComponent,
    // LoginLogoutComponent,
    LogoComponent,
    MainComponent,
    // NavComponent,
]
const komponentenIntern: Array<Type<any>> = []

@NgModule({
    imports: [SharedModule, ROUTES],
    declarations: [...komponentenExport, ...komponentenIntern],
    exports: komponentenExport,
})
export class LayoutModule {}
