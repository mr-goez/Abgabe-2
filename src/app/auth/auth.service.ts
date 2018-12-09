import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { log } from '../shared'

import { BasicAuthService } from './basic-auth.service'
import { CookieService } from './cookie.service'

export const ROLLE_ADMIN = 'admin'
// Spring Security:
// export const ROLLE_ADMIN = 'ROLE_ADMIN'

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

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    @log
    async login(username: string | undefined, password: string | undefined) {
        let rollen: Array<string>
        try {
            // this.basicAuthService.login(username, password)
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

    /**
     * @return void
     */
    @log
    logout() {
        this.cookieService.deleteAuthorization()
        this.isLoggedInSubject.next(false)
        this.rollenSubject.next([])
    }

    @log
    subscribeIsLoggedIn(next: (event: boolean) => void) {
        // Observable.subscribe() aus RxJS liefert ein Subscription Objekt,
        // mit dem man den Request abbrechen ("cancel") kann
        // tslint:disable:max-line-length
        // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md
        // http://stackoverflow.com/questions/34533197/what-is-the-difference-between-rx-observable-subscribe-and-foreach
        // https://xgrommx.github.io/rx-book/content/observable/observable_instance_methods/subscribe.html
        // tslint:enable:max-line-length
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
        // z.B. 'admin,mitarbeiter'
        const rolesStr = this.cookieService.getRoles()
        if (rolesStr === undefined) {
            return false
        }

        // z.B. ['admin', 'mitarbeiter']
        const rolesArray = rolesStr.split(',')
        return rolesArray !== undefined && rolesArray.includes(ROLLE_ADMIN)
    }

    toString() {
        return 'AuthService'
    }
}
