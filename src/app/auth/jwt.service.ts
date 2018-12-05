import { Injectable } from '@angular/core'

import { BASE_URI, log } from '../shared'

import { CookieService } from './cookie.service'

@Injectable({ providedIn: 'root' })
export class JwtService {
    private static readonly TIMEZONE_OFFSET_MS =
        new Date().getTimezoneOffset() * 60 * 1000

    constructor(private readonly cookieService: CookieService) {
        console.log('JwtService.constructor()')
    }

    // GET-Request durch fetch() von ES statt HttpClient von Angular
    @log
    async login(
        username: string | undefined,
        password: string | undefined,
    ): Promise<Array<string>> {
        console.log(`
            JwtService.login(): username=${username}, password=${password}`)
        const loginUri = `${BASE_URI}/login`
        console.log(`Login URI = ${loginUri}`)

        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const headers = new Headers()
        headers.append('Content-Type', 'application/x-www-form-urlencoded')
        const request = new Request(loginUri, {
            method: 'POST',
            headers,
            body: `username=${username}&password=${password}`,
        })

        let response: Response
        try {
            // ky ist eine Alternative zu fetch
            // https://github.com/sindresorhus/ky
            response = await fetch(request)
            // Optional catch binding parameters
        } catch {
            console.error(
                'JwtService.login: Kommunikationsfehler mit dem Appserver',
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
        const { token, roles } = json
        const authorization = `Bearer ${token}`
        console.log(`authorization=${authorization}`)

        // Array von Strings als 1 String
        const rolesStr: string = roles.join()
        console.log(`rolesStr=${rolesStr}`)

        const decodedToken = this.decodeToken(token)
        console.log('decodedToken', decodedToken)
        if (decodedToken.exp === undefined) {
            return Promise.resolve([])
        }

        // Expiration beim Token: Sekunden seit 1.1.1970 UTC
        // Cookie: Millisekunden in eigener Zeitzone
        const expiration =
            decodedToken.exp * 1000 + JwtService.TIMEZONE_OFFSET_MS
        console.log(`fetch.then(): exp=${expiration}`)
        this.cookieService.saveAuthorization(
            authorization,
            rolesStr,
            expiration,
        )

        return Promise.resolve(roles)
    }

    toString() {
        return 'JwtService'
    }

    // https://github.com/auth0/angular2-jwt/blob/master/angular2-jwt.ts#L147
    private decodeToken(token: string) {
        // Destructuring
        const [, payload, signature]: Array<string | undefined> = token.split(
            '.',
        )
        if (signature === undefined) {
            console.error('JWT enthaelt keine Signature')
            return undefined
        }

        let base64Token = payload.replace(/-/g, '+').replace(/_/g, '/')
        switch (base64Token.length % 4) {
            case 0:
                break
            case 2:
                base64Token += '=='
                break
            case 3:
                base64Token += '='
                break
            default:
                console.error('Laenge des JWT in Base64 ist falsch.')
                return undefined
        }

        // tslint:disable:max-line-length
        // http://xkr.us/articles/javascript/encode-compare
        // http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent#23842171
        // tslint:enable:max-line-length
        const decodedStr = decodeURIComponent(
            encodeURIComponent(window.atob(base64Token)),
        )
        if (decodedStr === undefined) {
            console.error('JWT kann nicht decodiert werden.')
            return undefined
        }
        return JSON.parse(decodedStr)
    }
}
