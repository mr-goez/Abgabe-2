import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
    selector: 'hs-home',
    template: `
         <!-- to fade in = einblenden --
        <h1 class="display-1">Hallo!</h1>
    `,
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {}

    ngOnInit() {
        this.title.setTitle('Beispiel')
    }

    toString() {
        return 'HomeComponent'
    }
}
