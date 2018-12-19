const show = function() {
    this.click('@diagrammLabel')
    this.expect.element('@menuItem').to.be.visible
    return this.click('@menuItem')
}

const check = function() {
    this.expect.element('@tortendiagramm').to.be.visible
    return this
}

export default {
    url: 'https://localhost/tortendiagramm',

    elements: {
        diagrammLabel: {
            selector:
                'li[class="nav-item dropdown"] fa-icon ' +
                'svg[data-icon="chart-bar"]',
        },
        menuItem: {
            selector:
                'a[class="dropdown-item"] fa-icon svg[data-icon="chart-pie"]',
        },
        tortendiagramm: {
            selector: 'hs-tortendiagramm canvas',
        },
    },

    commands: [
        {
            show,
            check,
        },
    ],
}
