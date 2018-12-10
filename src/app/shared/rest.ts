const SCHEME = 'https'
const PORT = 443
const SERVERNAME = 'localhost'
const BASE_PATH = '/rest'

/**
 * Basis-URI, wenn der eigentliche Server verwendet wird.
 */
export const BASE_URI = `${SCHEME}://${SERVERNAME}:${PORT}${BASE_PATH}`

export const HOME_PATH = 'home'
export const DETAILS_KUNDEN_PATH = 'details'
export const KUNDEN_PATH = 'kunden'
