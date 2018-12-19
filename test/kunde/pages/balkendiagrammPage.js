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
