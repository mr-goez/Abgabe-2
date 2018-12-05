import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'

// import {HOME_PATH} from '../app/routes'
import { log } from '../shared'

import { AuthService } from './auth.service'

// https://angular.io/docs/ts/latest/guide/router.html#can-activate-guard
// https://angular.io/docs/ts/latest/api/router/index/CanActivate-interface.html

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService) {
        console.log('AdminGuard.constructor()')
    }

    @log
    canActivate(
        _: ActivatedRouteSnapshot,
        __: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAdmin()) {
            console.log('AdminGuard.canActivate(): admin')
            return true
        }

        console.warn('Nicht in der Rolle "admin" eingeloggt')
        return false
    }

    toString() {
        return 'AdminGuard'
    }
}
