import { RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { DetailsKundeComponent } from './kunde/details-kunde/details-kunde.component'
import { SucheKundenComponent } from './kunde/suche-kunden/suche-kunden.component'
import { DETAILS_KUNDEN_PATH, HOME_PATH } from './shared/rest'

export const ROUTES = RouterModule.forRoot([
    { path: HOME_PATH, component: HomeComponent },
    { path: '', redirectTo: HOME_PATH, pathMatch: 'full' },
    { path: 'suche', component: SucheKundenComponent },
    // id als Pfad-Parameter
    { path: `${DETAILS_KUNDEN_PATH}/:id`, component: DetailsKundeComponent },
])
