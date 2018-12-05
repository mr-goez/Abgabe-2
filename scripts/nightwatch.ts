/*
 * Copyright (C) 2017 - present Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
