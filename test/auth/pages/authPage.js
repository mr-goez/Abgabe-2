// Pattern "Page Objects" http://martinfowler.com/bliki/PageObject.html
// Keine "Arrow Functions", weil "this" benoetigt wird

const login = function(username, password) {
    // wegen this kann keine "Arrow Function"" benutzt werden

    // s. globale Konstante waitForConditionTimeout in nightwatch.js
    // ggf. noch ergaenzen:   .before(millisek)

    const { expect } = this
    expect.element('@username').to.be.visible
    expect.element('@password').to.be.visible
    expect.element('@loginButton').to.be.visible
    expect.element('@loginButton').text.to.equal('Login')

    return this.clearValue('@username')
        .setValue('@username', username)
        .clearValue('@password')
        .setValue('@password', password)
        .click('@loginButton')
    // Alternative zu Mausklick: Formular abschicken
    // .submitForm('@form')
}

const checkLogin = function() {
    const { expect } = this
    expect.element('@logoutButton').text.to.contain('Logout')
    expect.element('@username').to.be.not.present
    expect.element('@password').to.be.not.present
    expect.element('@loginButton').to.be.not.present
    return this
}

const logout = function() {
    return this.click('@logoutButton')
}

const checkLogout = function() {
    const { expect } = this
    expect.element('@username').to.be.visible
    expect.element('@password').to.be.visible
    expect.element('@loginButton').to.be.visible
    expect.element('@loginButton').text.to.equal('Login')
    expect.element('@logoutButton').to.be.not.present
    return this
}

export default {
    url: 'https://localhost',

    elements: {
        form: {
            selector: 'hs-login-logout form',
        },
        username: {
            selector: 'input[id=usernameInput]',
        },
        password: {
            selector: 'input[id=passwordInput]',
        },
        loginButton: {
            selector:
                'hs-nav hs-login-logout button[class="btn btn-primary ' +
                'btn-sm ml-3"]',
        },
        logoutButton: {
            selector: 'hs-login-logout button span',
        },
    },

    // "Shorthand Property" fuer die Kommandos, s.o.
    commands: [
        {
            login,
            checkLogin,
            logout,
            checkLogout,
        },
    ],
}
