import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { log } from '../shared'

import { BasicAuthService } from './basic-auth.service'
import { CookieService } from './cookie.service'

export const ROLLE_ADMIN = 'ROLE_ADMIN'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isLoggedInSubject: Subject<boolean> = new Subject<boolean>()
    private rollenSubject = new Subject<Array<string>>()

    constructor(
        private readonly basicAuthService: BasicAuthService,
        private readonly cookieService: CookieService,
    ) {
        console.log('AuthService.constructor()')
    }

    @log
    async login(username: string | undefined, password: string | undefined) {
        let rollen: Array<string>
        try {
            rollen = await this.basicAuthService.login(username, password)
            console.log('AuthService.login()', rollen)
            this.isLoggedInSubject.next(true)
        } catch (e) {
            console.warn('AuthService.login(): Exception', e)
            rollen = []
            this.isLoggedInSubject.next(false)
        }

        this.rollenSubject.next(rollen)
    }

    @log
    logout() {
        this.cookieService.deleteAuthorization()
        this.isLoggedInSubject.next(false)
        this.rollenSubject.next([])
    }

    @log
    subscribeIsLoggedIn(next: (event: boolean) => void) {
        return this.isLoggedInSubject.subscribe(next)
    }

    @log
    subscribeRollen(next: (event: Array<string>) => void) {
        return this.rollenSubject.subscribe(next)
    }

    /**
     * @return String fuer JWT oder Basic-Authentifizierung
     */
    getAuthorization() {
        return this.cookieService.getAuthorization()
    }

    /**
     * @return true, falls ein User eingeloggt ist; sonst false.
     */
    isLoggedIn() {
        return this.cookieService.getAuthorization() !== undefined
    }

    /**
     * @return true, falls ein User in der Rolle "admin" eingeloggt ist;
     *         sonst false.
     */
    isAdmin() {
        const rolesStr = this.cookieService.getRoles()
        if (rolesStr === undefined) {
            return false
        }

        const rolesArray = rolesStr.split(',')
        return rolesArray !== undefined && rolesArray.includes(ROLLE_ADMIN)
    }

    toString() {
        return 'AuthService'
    }
}
