import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const authorizationStr = `${this.authService.getAuthorization()}`
        console.log(`authorizationStr=${authorizationStr}`)
        const requestWithAuthorization = request.clone({
            setHeaders: {
                Authorization: authorizationStr,
            },
        })
        return next.handle(requestWithAuthorization)
    }
}
