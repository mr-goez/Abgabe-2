// Pattern "Page Objects" http://martinfowler.com/bliki/PageObject.html
// Keine "Arrow Functions", weil "this" benoetigt wird

import * as _ from 'lodash'

const checkInit = function() {
    const { expect } = this
    expect.element('@nachname').to.be.visible
    return this
}

const nachname = function(nachnameStr) {
    this.expect.element('@nachname').to.be.visible
    return this.clearValue('@nachname').setValue('@nachname', nachnameStr)
}
const lesen = function() {
    this.expect.element('@lesen').to.be.visible
    return this.click('@lesen')
}
const reisen = function() {
    this.expect.element('@reisen').to.be.visible
    return this.click('@reisen')
}
const submit = function() {
    this.expect.element('@button').to.be.visible
    return this.click('@button')
}
const checkAlleKunden = function() {
    this.expect.element('@gefundeneKundenHeader').to.be.visible
    return this
}

const checkGefundeneKunden = function(nachnameSubstr) {
    this.expect.element('@gefundeneKundenHeader').to.be.visible

    const { api } = this.client

    // Nachname in der 1. Zeile ueberpruefen
    const selectorNachnameZeile1 =
        'hs-suchergebnis tbody tr:nth-child(1) ' + 'td:nth-child(3)'
    api.expect.element(selectorNachnameZeile1).text.to.contain(nachnameSubstr)

    // von allen "n Zeilen die Spalte "3" mit dem Nachname ermitteln:
    // Formel fuer nth-child():   a*n + b
    const selectorSpalte =
        'hs-suchergebnis table tbody tr:nth-child(n) ' + 'td:nth-child(3)'

    // Callback zum Ueberpruefen des Nachnames in den Datenzellen der Spalte
    const checkNachname = zellen => {
        _.times(zellen.value.length, i => {
            /* eslint no-magic-numbers: 0, space-infix-ops: 0 */
            const selectorZelle =
                'hs-suchergebnis tbody ' +
                `tr:nth-child(${i + 1}) td:nth-child(3)`
            api.expect.element(selectorZelle).text.to.contain(nachnameSubstr)
        })
    }

    api.elements('css selector', selectorSpalte, checkNachname)

    this.expect.element('@fehlermeldung').to.be.not.present

    return this
}

const clickNachnameErsteZeile = function() {
    this.expect.element('@nachnameErsteZeile').to.be.visible
    this.click('@nachnameErsteZeile')
}

const checkFehlermeldung = function() {
    const { expect } = this
    expect.element('@fehlermeldung').to.be.visible
    expect.element('@gefundeneKundenHeader').to.be.not.present
    return this
}

const deleteErsteZeile = function() {
    this.expect.element('@deleteIconErsteZeile').to.be.visible
    return this.click('@deleteIconErsteZeile')
}

export default {
    url: 'https://localhost/suche',

    elements: {
        nachname: {
            selector: 'input[id=nachnameInput]',
        },
        lesen: {
            selector: 'input[name=lesen]',
        },
        reisen: {
            selector: 'input[name=reisen]',
        },
        button: {
            selector: 'hs-suchformular button',
        },
        gefundeneKundenHeader: {
            selector: 'div[class=card-header]',
        },
        fehlermeldung: {
            selector: 'hs-suchergebnis hs-error-message',
        },
        nachnameErsteZeile: {
            selector:
                'hs-suchergebnis ' + 'tbody tr:nth-child(1) td:nth-child(3)',
        },
        deleteIconErsteZeile: {
            selector:
                'hs-suchergebnis ' + 'tbody tr:nth-child(1) td:nth-child(7) a',
        },
    },

    commands: [
        {
            checkInit,
            nachname,
            lesen,
            reisen,
            submit,
            checkAlleKunden,
            checkGefundeneKunden,
            checkFehlermeldung,
            clickNachnameErsteZeile,
            deleteErsteZeile,
        },
    ],
}
