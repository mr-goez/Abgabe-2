import * as path from 'path'
import * as shell from 'shelljs'

const nightwatch = path.join(
    __dirname,
    '..',
    'node_modules',
    'nightwatch',
    'bin',
    'nightwatch',
)

const verbose = ''
// const verbose = '--verbose'

const group = ''
// const group = '--group auth'

// const tag = ''
// const tag = '--tag details'
// const tag = '--tag suche'
// const tag = '--tag update'
// const tag = '--tag delete'
// const tag = '--tag diagramme'
// const tag = '--tag balkendiagramm'
const tag = '--tag details --tag suche --tag diagramme --tag update'
// const tag = '--tag buecher'

shell.exec(`node ${nightwatch} ${verbose} ${group} ${tag}`)
