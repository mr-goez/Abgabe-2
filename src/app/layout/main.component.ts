import { Component } from '@angular/core'

/**
 * Komponente f&uuml;r den Hauptteil einer Seite mit dem Tag &lt;hs-main&gt;.
 */
@Component({
    selector: 'hs-main',
    template: `
        <main>
            <div class="col col-12"><router-outlet></router-outlet></div>
        </main>
    `,
    styleUrls: ['./main.component.scss'],
})
export class MainComponent {
    constructor() {
        console.log('MainComponent.constructor()')
    }
}
