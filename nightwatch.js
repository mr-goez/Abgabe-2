// http://nightwatchjs.org/guide/#windows-
import 'nightwatch/bin/runner.js'

// Selenium ermoeglicht Tests mit Chrome, FireFox und Edge, erfordert aber einen
// zusaetzlichen Selenium-Server zzgl. Treiber fuer die jeweiligen Browser.

// ChromeDriver (s. nightwatch.conf.js) implementiert das "W3C WebDriver wire protocol"
// fuer Chrome, erfordert aber "External Globals" fuer Tests
// http://nightwatchjs.org/gettingstarted/#standalone-usage
// http://nightwatchjs.org/guide/#external-globals
import * as chromedriver from 'chromedriver'

export const before = done => {
    chromedriver.start()
    done()
}

export const after = done => {
    chromedriver.stop()
    done()
}

// Globaler Timeout in Millisekunden
export const waitForConditionTimeout = 5000
