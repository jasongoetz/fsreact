describe('Set Up', () => {

    let email;
    const password = 'asdfasdf';

    it('registers and create league', function () {

        let time = Date.now().valueOf();
        cy.visit('/register')

        email = `jason.goetz+${time}@gmail.com`;

        cy.get('input[name=firstName]').type('Jason')
        cy.get('input[name=lastName]').type('Goetz')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type(password)
        cy.get('input[name=confirmation]').type(`${password}{enter}`)

        // we should be redirected to /dashboard
        cy.url().should('include', '/league/new')

        cy.get('input[id=leagueName]').type('CFB ' + time + '{enter}');

        cy.url().should('include', '/')
    })

    it('logs out', function () {
        cy.get('#sign-out').click();
        cy.url().should('include', '/login');
    })

    it('logs in', function () {
        // destructuring assignment of the this.currentUser object

        cy.visit('/login')

        cy.get('input[name=email]').type(email)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${password}{enter}`)

        // we should be redirected to /dashboard
        cy.url().should('include', '/')

        // UI should reflect this user being logged in
        cy.get('a.nav-link').should('contain', 'JASON')
        cy.get('a.nav-link').should('contain', 'GOETZ')
    })
})
