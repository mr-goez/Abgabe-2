import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { fadeIn } from '../shared/animations'

@Component({
    selector: 'hs-home',
    template: `
        <h2 [@fadeIn]>Willkommen zu Ihrer persönlichen Kundenliste</h2>
    `,
    animations: [fadeIn],
})
export class HomeComponent implements OnInit {
    constructor(private readonly title: Title) {}

    ngOnInit() {
        this.title.setTitle('Home')
    }

    toString() {
        return 'HomeComponent'
    }
}
