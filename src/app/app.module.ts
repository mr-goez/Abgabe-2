import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HomeModule } from './home/home.module'
import { LayoutModule } from './layout/layout.module'

import { KundeModule } from './kunde/kunde.module'
import { SharedModule } from './shared/shared.module'

import { ROUTES } from './routes'

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        HomeModule,
        LayoutModule,
        KundeModule,
        ROUTES,
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
