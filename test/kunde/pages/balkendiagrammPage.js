/*
 * Copyright (C) 2017 - present Juergen Zimmermann
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

const show = function() {
    this.expect.element('@diagrammLabel').to.be.visible
    this.click('@diagrammLabel')
    this.expect.element('@diagrammLabelAngeklickt').to.be.visible
    this.expect.element('@menuItem').to.be.visible
    return this.click('@menuItem')
}

const check = function() {
    this.expect.element('@balkendiagramm').to.be.visible
    return this
}

export default {
    url: 'https://localhost/balkendiagramm',

    elements: {
        diagrammLabel: {
            selector: 'hs-nav li[class="nav-item dropdown"] span',
        },
        diagrammLabelAngeklickt: {
            selector:
                'li[class="nav-item dropdown show"] fa-icon ' +
                'svg[data-icon="chart-bar"]',
        },
        menuItem: {
            selector:
                'a[class="dropdown-item"] fa-icon svg[data-icon="chart-bar"]',
        },
        balkendiagramm: {
            selector: 'hs-balkendiagramm canvas',
        },
    },

    commands: [
        {
            show,
            check,
        },
    ],
}
