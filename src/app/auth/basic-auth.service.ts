import { Injectable } from '@angular/core'

import { BASE_URI, log } from '../shared'

import { CookieService } from './cookie.service'

declare type Rolle = 'ROLE_ADMIN' | 'ROLE_KUNDE' | 'ROLE_MITARBEITER'

export interface Identity {
    username: string
    rollen: Array<Rolle>
    password?: string
}

@Injectable({ providedIn: 'root' })
export class BasicAuthService {
    constructor(private readonly cookieService: CookieService) {
        console.log('BasicAuthService.constructor()')
    }

    @log
    async login(username: string | undefined, password: string | undefined) {
        const loginUri = `${BASE_URI}/auth/rollen`
        console.log(`Login URI = ${loginUri}`)

        const base64 = window.btoa(`${username}:${password}`)
        const basicAuth = `Basic ${base64}`

        const headers = new Headers()
        headers.append('Authorization', basicAuth)
        const request = new Request(loginUri, {
            method: 'GET',
            headers,
        })

        let response: Response
        try {
            response = await fetch(request)
        } catch {
            console.error(
                'BasicAuthService.login: Kommunikationsfehler mit d. Appserver',
            )
            return Promise.reject(
                new Error('Kommunikationsfehler mit dem Appserver'),
            )
        }

        const { status } = response
        console.log(`status=${status}`)
        if (status !== 200) {
            return Promise.reject(new Error(response.statusText))
        }

        const json = await response.json()
        console.log('json', json)
        const roles: string = json.join()
        console.log(`roles=${roles}`)

        this.cookieService.saveAuthorization(
            // Base64-String fuer 1 Tag speichern
            basicAuth,
            roles,
            24 * 60 * 60 * 1000000000,
        )
        return json
    }

    toString() {
        return 'BasicAuthService'
    }
}
