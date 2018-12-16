// tslint:disable:max-file-line-count

import * as moment from 'moment'
import 'moment/locale/de'

// Alternativen zu Moment
//  https://github.com/date-fns/date-fns
//      https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189
//  https://github.com/moment/luxon
//  https://github.com/iamkun/dayjs

moment.locale('de')

export interface Umsatz {
    betrag?: number
    waehrung?: string
}

// export enum Interesse {
//     SPORT = 'SPORT',
//     LESEN = 'LESEN',
//     REISEN = 'REISEN',
// }

export enum Geschlecht {
    MÄNNLICH = 'M',
    WEIBLICH = 'W',
}

export enum Familienstand {
    VERHEIRATET = 'VH',
    GESCHIEDEN = 'G',
    VERWITWET = 'VW',
    LEDIG= 'L',
}

export interface Adresse {
    plz?: string
    ort?: string
}

export interface User {
    username?: string
    passwort?: string
}

type UUID = string
/**
 * Gemeinsame Datenfelder unabh&auml;ngig, ob die Kundedaten von einem Server
 * (z.B. RESTful Web Service) oder von einem Formular kommen.
 */
export interface KundeShared {
    _id?: UUID
    nachname?: string
    email?: string
    kategorie?: number
    newsletter?: boolean
    geburtsdatum?: Date
    umsatz?: Umsatz
    homepage?: string
    geschlecht?: Geschlecht
    familienstand?: Familienstand
    interessen?: Array<string>
    adresse?: Adresse
    version?: number
    user?: User
}

interface Href {
    href: string
}

interface SelfLink {
    self: Href
}
/**
 * Daten vom und zum REST-Server:
 * <ul>
 *  <li> Arrays f&uuml;r mehrere Werte, die in einem Formular als Checkbox
 *       dargestellt werden.
 *  <li> Daten mit Zahlen als Datentyp, die in einem Formular nur als
 *       String handhabbar sind.
 * </ul>
 */
export interface KundeServer extends KundeShared {
    // schlagwoerter?: Array<string>
    links?: any
    _links?: SelfLink
}

/**
 * Daten aus einem Formular:
 * <ul>
 *  <li> je 1 Control fuer jede Checkbox und
 *  <li> au&szlig;erdem Strings f&uuml;r Eingabefelder f&uuml;r Zahlen.
 * </ul>
 */
export interface KundeForm extends KundeShared {
    sport?: boolean
    lesen?: boolean
    reisen?: boolean
}

/**
 * Model als Plain-Old-JavaScript-Object (POJO) fuer die Daten *UND*
 * Functions fuer Abfragen und Aenderungen.
 */
export class Kunde {
    // ratingArray: Array<boolean> = []

    // wird aufgerufen von fromServer() oder von fromForm()
    private constructor(
        // tslint:disable-next-line:variable-name
        public _id: UUID | undefined,
        public nachname: string | undefined,
        public email: string | undefined,
        public kategorie: number | undefined,
        public newsletter: boolean | undefined,
        public geburtsdatum: Date | undefined,
        public umsatz: Umsatz | undefined,
        public homepage: string | undefined,
        public geschlecht: Geschlecht | undefined,
        public familienstand: Familienstand | undefined,
        public interessen: Array<string> | undefined,
        public adresse: Adresse | undefined,
        public version: number | undefined,
        public user: User | undefined,
    ) {
        this._id = _id
        this.nachname = nachname
        this.email = email
        this.kategorie = kategorie
        this.newsletter = newsletter
        this.geburtsdatum = geburtsdatum
        this.umsatz = umsatz
        this.homepage = homepage
        this.geschlecht = geschlecht
        this.familienstand = familienstand
        this.interessen = interessen
        this.adresse = adresse
        this.user = user
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem RESTful Web
     * Service kommen.
     * @param kunde JSON-Objekt mit Daten vom RESTful Web Server
     * @return Das initialisierte Kunde-Objekt
     */
    static fromServer(kundeServer: KundeServer, etag?: string) {
        let selfLink: string | undefined
        if (kundeServer.links !== undefined) {
            // innerhalb von einem JSON-Array
            selfLink = kundeServer.links[1].href
        } else if (kundeServer._links !== undefined) {
            // ein einzelnes JSON-Objekt
            selfLink = kundeServer._links.self.href
        }
        let id: UUID | undefined
        if (selfLink !== undefined) {
            const lastSlash = selfLink.lastIndexOf('/')
            id = selfLink.substring(lastSlash + 1)
        }

        let version: number | undefined
        if (etag !== undefined) {
            // Anfuehrungszeichen am Anfang und am Ende entfernen
            const versionStr = etag.substring(1, etag.length - 1)
            version = Number.parseInt(versionStr, 10)
        }

        const kunde = new Kunde(
            id,
            kundeServer.nachname,
            kundeServer.email,
            kundeServer.kategorie,
            kundeServer.newsletter,
            kundeServer.geburtsdatum,
            kundeServer.umsatz,
            kundeServer.homepage,
            kundeServer.geschlecht,
            kundeServer.familienstand,
            kundeServer.interessen,
            kundeServer.adresse,
            version,
            kundeServer.user,
        )
        console.log('Kunde.fromServer(): kunde=', kunde)
        return kunde
    }

    /**
     * Ein Kunde-Objekt mit JSON-Daten erzeugen, die von einem Formular kommen.
     * @param kunde JSON-Objekt mit Daten vom Formular
     * @return Das initialisierte Kunde-Objekt
     */
    static fromForm(kundeForm: KundeForm) {
        const interessen: Array<string> = []
        if (kundeForm.lesen === true) {
            interessen.push('L')
        }
        if (kundeForm.reisen === true) {
            interessen.push('R')
        }
        if (kundeForm.sport === true) {
            interessen.push('S')
        }

        const kunde = new Kunde(
            kundeForm._id,
            kundeForm.nachname,
            kundeForm.email,
            kundeForm.kategorie,
            kundeForm.newsletter,
            kundeForm.geburtsdatum,
            kundeForm.umsatz,
            kundeForm.homepage,
            kundeForm.geschlecht,
            kundeForm.familienstand,
            kundeForm.interessen,
            kundeForm.adresse,
            kundeForm.version,
            kundeForm.user,
        )
        console.log('Kunde.fromForm(): kunde=', kunde)
        return kunde
    }

    /**
     * Abfrage, ob im Kundetitel der angegebene Teilstring enthalten ist. Dabei
     * wird nicht auf Gross-/Kleinschreibung geachtet.
     * @param nachname Zu &uuml;berpr&uuml;fender Teilstring
     * @return true, falls der Teilstring im Kundetitel enthalten ist. Sonst
     *         false.
     */
    containsNachname(nachname: string) {
        return this.nachname === undefined
            ? false
            : this.nachname.toLowerCase().includes(nachname.toLowerCase())
    }

    // /**
    //  * Die Bewertung ("rating") des Kundees um 1 erh&ouml;hen
    //  */
    // rateUp() {
    //     if (this.rating !== undefined && this.rating < MAX_RATING) {
    //         this.rating++
    //     }
    // }

    // /**
    //  * Die Bewertung ("rating") des Kundees um 1 erniedrigen
    //  */
    // rateDown() {
    //     if (this.rating !== undefined && this.rating > MIN_RATING) {
    //         this.rating--
    //     }
    // }

    /**
     * Abfrage, ob das Kunde dem angegebenen Verlag zugeordnet ist.
     * @param verlag der Name des Verlags
     * @return true, falls das Kunde dem Verlag zugeordnet ist. Sonst false.
     */
    // hasVerlag(verlag: string) {
    //     return this.verlag === verlag
    // }

    /**
     * Aktualisierung der Stammdaten des Kunde-Objekts.
     * @param titel Der neue Kundetitel
     * @param rating Die neue Bewertung
     * @param art Die neue Kundeart (DRUCKAUSGABE oder KINDLE)
     * @param verlag Der neue Verlag
     * @param preis Der neue Preis
     * @param rabatt Der neue Rabatt
     */
    // updateStammdaten(
    //     titel: string,
    //     art: KundeArt,
    //     verlag: Verlag,
    //     rating: number,
    //     datum: moment.Moment | undefined,
    //     preis: number | undefined,
    //     rabatt: number | undefined,
    //     isbn: string,
    // ) {
    //     this.titel = titel
    //     this.art = art
    //     this.verlag = verlag
    //     this.rating = rating
    //     this.ratingArray =
    //         rating === undefined
    //             ? Array(MAX_RATING - MIN_RATING).fill(false)
    //             : Array(rating - MIN_RATING).fill(true)
    //     this.datum = datum
    //     this.preis = preis
    //     this.rabatt = rabatt
    //     this.isbn = isbn
    // }

    /**
     * Abfrage, ob es zum Kunde auch Schlagw&ouml;rter gibt.
     * @return true, falls es mindestens ein Schlagwort gibt. Sonst false.
     */
    hasInteressen() {
        if (this.interessen === undefined) {
            return false
        }
        return this.interessen.length !== 0
    }

    /**
     * Abfrage, ob es zum Kunde das angegebene Schlagwort gibt.
     * @param interesse das zu &uuml;berpr&uuml;fende Schlagwort
     * @return true, falls es das Schlagwort gibt. Sonst false.
     */
    // hasSchlagwort(schlagwort: string) {
    //     if (this.schlagwoerter === undefined) {
    //         return false
    //     }
    //     return this.schlagwoerter.includes(schlagwort)
    // }

    /**
     * Aktualisierung der Schlagw&ouml;rter des Kunde-Objekts.
     * @param lesen ist das Schlagwort JAVASCRIPT gesetzt
     * @param schreiben ist das Schlagwort TYPESCRIPT gesetzt
     * @param sport ist das Schlagwort TYPESCRIPT gesetzt
     */
    // updateSchlagwoerter(javascript: boolean, typescript: boolean) {
    //     this.resetSchlagwoerter()
    //     if (javascript) {
    //         this.addSchlagwort('JAVASCRIPT')
    //     }
    //     if (typescript) {
    //         this.addSchlagwort('TYPESCRIPT')
    //     }
    // }

    /**
     * Konvertierung des Kundeobjektes in ein JSON-Objekt f&uuml;r den RESTful
     * Web Service.
     * @return Das JSON-Objekt f&uuml;r den RESTful Web Service
     */
    toJSON(): KundeServer {
        // const datum =
        //     this.datum === undefined
        //         ? undefined
        //         : this.datum.format('YYYY-MM-DD')
        return {
            _id: this._id,
            nachname: this.nachname,
            email: this.email,
            kategorie: this.kategorie,
            newsletter: this.newsletter,
            geburtsdatum: this.geburtsdatum,
            umsatz: this.umsatz,
            homepage: this.homepage,
            geschlecht: this.geschlecht,
            familienstand: this.familienstand,
            interessen: this.interessen,
            adresse: this.adresse,
            user: this.user,
        }
    }

    toString() {
        return JSON.stringify(this, null, 2)
    }

    // private resetSchlagwoerter() {
    //     this.schlagwoerter = []
    // }

    // private addInteressen(interesse: string) {
    //     if (this.interessen === undefined) {
    //         this.interessen = []
    //     }
    //     this.interessen.push(interesse)
    // }
}
