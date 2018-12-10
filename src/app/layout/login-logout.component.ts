import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from '../auth/auth.service'
import { HOME_PATH, log } from '../shared'

@Component({
    selector: 'hs-login-logout',
    templateUrl: './login-logout.component.html',
})
export class LoginLogoutComponent implements OnInit {
    username: string | undefined
    password: string | undefined
    notLoggedIn!: boolean

    readonly faSignOutAlt = faSignOutAlt

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        console.log('LoginLogoutComponent.constructor()')
    }

    @log
    ngOnInit() {
        // Initialisierung, falls zwischenzeitlich der Browser geschlossen wurde
        this.notLoggedIn = !this.authService.isLoggedIn()
        this.subscribeLogin()
    }

    @log
    onLogin() {
        this.authService.login(this.username, this.password)
    }

    /**
     * Ausloggen und dabei Benutzername und Passwort zur&uuml;cksetzen.
     */
    @log
    onLogout() {
        this.authService.logout()
        this.router.navigate([HOME_PATH])
    }

    toString() {
        return 'AuthComponent'
    }

    private subscribeLogin() {
        const next = (event: boolean) => {
            if (this.notLoggedIn && !event) {
                console.warn('AuthComponent: Falsche Login-Daten', event)
            }
            this.notLoggedIn = !event
            console.log('AuthComponent.notLoggedIn:', this.notLoggedIn)
        }

        this.authService.subscribeIsLoggedIn(next)
    }
}
