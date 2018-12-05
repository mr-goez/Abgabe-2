import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ModuleWithProviders, NgModule } from '@angular/core'

import { AuthInterceptor } from './auth.interceptor'

@NgModule({})
export class AuthModule {
    // Export als Singleton im Root-Modul
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                [
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: AuthInterceptor,
                        multi: true,
                    },
                ],
            ],
        }
    }
}

export const AUTH_PROVIDERS = AuthModule.forRoot()
