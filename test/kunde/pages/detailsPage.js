const checkNachname = function(nachname) {
    const { expect } = this

    expect.element('@tabStammdaten').to.be.visible
    expect.element('@tabInteressen').to.be.visible

    expect.element('@tabelle').to.be.visible
    expect.element('@nachname').text.to.be.equal(nachname)
    return this
}

const checkNoUpdateButton = function() {
    this.expect.element('@updateButton').to.be.not.present
    return this
}

export default {
    url: 'https://localhost/details',

    elements: {
        tabStammdaten: {
            selector: 'a[href="#stammdaten"]',
        },
        tabInteressen: {
            selector: 'a[href="#interessen"]',
        },
        tabelle: {
            selector:
                'table[class="table table-striped table-hover ' +
                'table-responsive table-borderless ng-star-inserted"] tbody',
        },
        nachname: {
            selector:
                'table[class="table table-striped table-hover ' +
                'table-responsive table-borderless ng-star-inserted"] tbody ' +
                'tr:first-child td:nth-child(2)',
        },
        updateButton: {
            selector: 'a[title="Bearbeiten"] fa-icon',
        },
    },

    commands: [
        {
            checkNachname,
            checkNoUpdateButton,
        },
    ],
}
