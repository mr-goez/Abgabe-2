import { RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { HOME_PATH } from './shared/rest'

export const ROUTES = RouterModule.forRoot([
    { path: HOME_PATH, component: HomeComponent },
    { path: '', redirectTo: HOME_PATH, pathMatch: 'full' }
])
