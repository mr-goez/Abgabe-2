const show = function() {
    this.click('@diagrammLabel')
    this.expect.element('@menuItem').to.be.visible
    return this.click('@menuItem')
}

const check = function() {
    this.expect.element('@liniendiagramm').to.be.visible
    return this
}

export default {
    url: 'https://localhost/liniendiagramm',

    elements: {
        diagrammLabel: {
            selector:
                'li[class="nav-item dropdown"] fa-icon ' +
                'svg[data-icon="chart-bar"]',
        },
        menuItem: {
            selector:
                'a[class="dropdown-item"] fa-icon svg[data-icon="chart-line"]',
        },
        liniendiagramm: {
            selector: 'hs-liniendiagramm canvas',
        },
    },

    commands: [
        {
            show,
            check,
        },
    ],
}
