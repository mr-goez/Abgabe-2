import { Component } from '@angular/core'

/**
 * Komponente f&uuml;r den Footer.
 */
@Component({
    selector: 'hs-footer',
    template: `
        <footer>
            <div class="sticky font-small text-center">
                &copy; JL | MJ | MA | CG
            </div>
        </footer>
    `,
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    constructor() {
        console.log('FooterComponent.constructor()')
    }
}
