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

    /**
     * @param username als String
     * @param password als String
     * @return void
     */
    @log
    async login(username: string | undefined, password: string | undefined) {
        const loginUri = `${BASE_URI}/auth/rollen`
        console.log(`Login URI = ${loginUri}`)

        const base64 = window.btoa(`${username}:${password}`)
        const basicAuth = `Basic ${base64}`

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const headers = new Headers()
        headers.append('Authorization', basicAuth)
        const request = new Request(loginUri, {
            method: 'GET',
            headers,
        })

        let response: Response
        try {
            response = await fetch(request)
            // Optional catch binding parameters
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
        // Array von Strings als 1 String
        const roles: string = json.join()
        console.log(`roles=${roles}`)

        this.cookieService.saveAuthorization(
            // Base64-String fuer 1 Tag speichern
            basicAuth,
            roles,
            24 * 60 * 60 * 1000,
        )
        return json
    }

    toString() {
        return 'BasicAuthService'
    }
}
