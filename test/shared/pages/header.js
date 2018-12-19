const clickSuche = function() {
    this.expect.element('@suche').to.be.visible
    return this.click('@suche')
}

export default {
    elements: {
        suche: {
            selector: 'hs-nav li:nth-child(1) a',
        },
    },

    commands: [
        {
            clickSuche,
        },
    ],
}
