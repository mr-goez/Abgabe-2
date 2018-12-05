import { animate, state, style, transition, trigger } from '@angular/animations'

export const easeIn = trigger('easeIn', [
    state('active', style({ transform: 'translateX(0)' })),
    transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.5s ease-in'),
    ]),
])

export const easeOut = trigger('easeOut', [
    transition(':leave', [
        animate(
            '0.5s ease-out',
            style({
                transform: 'translateX(100%)',
                opacity: 0,
            }),
        ),
    ]),
])

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 })),
    ]),
])
