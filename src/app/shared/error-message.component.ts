import { Component, Input } from '@angular/core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
    selector: 'hs-error-message',
    template: `
        <div class="text-danger" *ngIf="test !== undefined">
            <fa-icon [icon]="faExclamationCircle"></fa-icon>
            <span class="font-weight-bold ml-1">{{ text }}</span>
        </div>
    `
})
export class ErrorMessageComponent {
    @Input()
    text: string | undefined
    readonly faExclamationCircle = faExclamationCircle

    constructor() {
        console.log('ErrorMessageComponent.constructor()')
    }
}
