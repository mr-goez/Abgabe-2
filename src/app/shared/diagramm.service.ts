// Charts mittes JavaScript, siehe http://www.jsgraphs.com und
// http://jqueryhouse.com/javascript-chart-and-graph-libraries
// - D3: fuehrend, flexibel, aber keine vorgefertigten Layouts fuer z.B.
// Balken-Diagramme
// - Google Charts: nur online benutzbar, JS-Datei *nicht* auf eigenem Server
// benutzbar
// - Chart.js 250.000 Downloads/Monat
// - NVD3 basiert auf D3, 40.000 Downloads/Monat
// - Power BI Visuals https://github.com/Microsoft/PowerBI-visuals
// - ...

import { Injectable } from '@angular/core'
import * as Chart from 'chart.js'

import { log } from './index'

interface ColorHighlight {
    color: string
    highlight: string
}

/**
 * Service-Klasse f&uuml;r die Verwendung von Chart.js.
 */
// http://blog.thoughtram.io/angular/2015/09/17/resolve-service-dependencies-in-angular-2.html
// http://blog.thoughtram.io/angular/2015/09/03/forward-references-in-angular-2.html
@Injectable({ providedIn: 'root' })
export class DiagrammService {
    private backgroundColors: Map<number, ColorHighlight> = new Map<
        number,
        ColorHighlight
    >()

    constructor() {
        this.backgroundColors.set(0, { color: '#F7464A', highlight: '#FF5A5E' }) // red
        this.backgroundColors.set(1, { color: '#46BFBD', highlight: '#5AD3D1' }) // green
        this.backgroundColors.set(2, { color: '#FDB45C', highlight: '#FFC870' }) // yellow

        console.log(
            'DiagrammService.constructor(): backgroundColors=',
            this.backgroundColors,
        )
    }

    /**
     * @param elementId ID des HTML-Tags, bei dem das Chart eingesetzt wird.
     * @return Chart-Objekt
     */
    @log
    createChart(
        chartElement: HTMLCanvasElement | undefined,
        config: any,
    ): any | undefined {
        if (chartElement === undefined) {
            console.error(
                'Kein HTML-Element fuer ein Chart gefunden:',
                chartElement,
            )
            return undefined
        }

        const ctx = chartElement.getContext('2d')
        if (ctx === null) {
            console.error('Kein 2D-Kontext gefunden', ctx)
            return undefined
        }

        console.log('Chart wird erzeugt:', ctx, config)
        return new Chart(ctx, config)
    }

    /**
     * @param idx Fortlaufende Nummer f&uuml;r die Farbe bei einem
     *        Tortendiagramm.
     * @return String mit dem Hex-Code der Farbe.
     */
    getBackgroundColor(idx: number) {
        const colorHighlight = this.backgroundColors.get(
            idx % 3,
        ) as ColorHighlight
        return colorHighlight.color
    }

    /**
     * @param idx Fortlaufende Nummer f&uuml;r die Farbe zur Hervorhebung bei
     *        einem Tortendiagramm.
     * @return String mit dem Hex-Code dieser Farbe.
     */
    getHoverBackgroundColor(idx: number) {
        const backgroundColor = this.backgroundColors.get(idx % 3)
        return (backgroundColor as ColorHighlight).highlight
    }

    toString() {
        return (
            'DiagrammService: {_backgroundColors: ' +
            `${JSON.stringify(this.backgroundColors)}}`
        )
    }
}
