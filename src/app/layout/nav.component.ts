// import { Component, OnInit } from '@angular/core'
// import {
//     faBook,
//     faChartBar,
//     faChartLine,
//     faChartPie,
//     faSearch,
// } from '@fortawesome/free-solid-svg-icons'

// import { AuthService, ROLLE_ADMIN } from '../auth/auth.service'
// import { log } from '../shared'

// /**
//  * Komponente f&uuml;r die Navigationsleiste mit dem Tag &lt;hs-nav&gt;.
//  */
// @Component({
//     selector: 'hs-nav',
//     templateUrl: './nav.component.html',
// })
// export class NavComponent implements OnInit {
//     isAdmin!: boolean

//     readonly faBook = faBook
//     readonly faChartBar = faChartBar
//     readonly faChartLine = faChartLine
//     readonly faChartPie = faChartPie
//     readonly faSearch = faSearch

//     constructor(private readonly authService: AuthService) {
//         console.log('NavComponent.constructor()')
//     }

//     @log
//     ngOnInit() {
//         this.isAdmin = this.authService.isAdmin()
//         this.subscribeIsAdmin()
//     }

//     toString() {
//         return 'NavComponent'
//     }

//     /**
//      * Methode, um den injizierten <code>AuthService</code> zu beobachten,
//      * ob es Informationen zur Rolle "admin" gibt. Diese private Methode wird in
//      * der Methode <code>ngOnInit</code> aufgerufen.
//      */
//     private subscribeIsAdmin() {
//         const next = (event: Array<string>) => {
//             this.isAdmin = event !== undefined && event.includes(ROLLE_ADMIN)
//             console.log('NavComponent.isAdmin:', this.isAdmin)
//         }

//         // Funktion als Funktionsargument, d.h. Code als Daten uebergeben
//         this.authService.subscribeRollen(next)
//     }
// }
