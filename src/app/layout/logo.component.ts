import { Component } from '@angular/core'

/**
 * Komponente f&uuml;r das Logo mit dem Tag &lt;hs-logo&gt;.
 */
@Component({
    selector: 'hs-logo',
    template: `
        <a routerLink="/">
            <img
                src="/img/onepiece.png"
                alt="Logo"
                height="60px"
                width="70px"
            />
        </a>
    `,
})
export class LogoComponent {
    constructor() {
        console.log('LogoComponent.constructor()')
    }
}
