import { Component } from '@angular/core'

@Component({
    selector: 'hs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
    // styles: [
    //     `header {
    //         background-color: #BED6F8;
    //         background-position: left top;
    //         background-repeat: repeat-x;
    //         background-image: url(/img/gradientBlueSky.png);
    //      }`
    // ]
})
export class HeaderComponent {
    constructor() {
        console.log('HeaderComponent.constructor()')
    }
}
