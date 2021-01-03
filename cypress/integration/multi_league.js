describe('MultiLeague', () => {

    //Constants
    before(() => {
        cy.logout();
    })

    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(function () {
        if (this && this.currentTest.state !== 'failed') {
            cy.saveLocalStorage();
        }
    });

    //Re-using this agent deals with cookies and request headers so we can take advantage of login sessions
    let agent;
    let agent2;
    let agent3;

    const time = Date.now().valueOf();

    let hank = {
        firstName: 'Hank',
        lastName: 'Williams',
        email: `hwilliams+${time}@fakestacks.com`,
        password: 'h'
    }

    let waylon = {
        firstName: 'Waylon',
        lastName: 'Jennings',
        password: 'w'
    }

    describe('Create a user, create a league, invite a user, accept the invite', function() {

        //Create first commish
        it('registers and creates league', function () {

            let time = Date.now().valueOf();
            cy.visit('/register')

            cy.get('input[name=firstName]').type(hank.firstName);
            cy.get('input[name=lastName]').type(hank.lastName);
            cy.get('input[name=email]').type(hank.email);
            cy.get('input[name=password]').type(hank.password);
            cy.get('input[name=confirmation]').type(`${hank.password}`)

            cy.get('[data-cy=submit]').click()

            // we should be redirected to /dashboard
            cy.url().should('include', '/league/new')
        })

        //Create league for commish
        it('Should create an initial league', function () {
            cy.get('input[id=leagueName]').type(`CFB ${time}`);

            cy.get('[data-cy=submit]').click()

            cy.url().should('eq', Cypress.config().baseUrl + '/');
        });

        //Visit league manage page
        it('Visit league management page', function () {
            cy.get('[id="manage"]').click();
            cy.contains("League Management");
        });

        const password = "jg-test-password";
        let inboxId;

        it("Should fail for bad email address in invite", () => {
            // sign up with inbox email address and the password
            cy.get("input[type=email]").type("waylon");
            cy.get('input:invalid').should('have.length', 1);
            cy.get('button[type="submit"]').should('be.disabled');
        });

        it("can generate a new email address and sign up, then receive it from email", () => {
            // see commands.js custom commands
            cy.createInbox().then((inbox) => {
                // verify a new inbox was created
                assert.isDefined(inbox);

                // save the inboxId for later checking the emails
                inboxId = inbox.id;
                waylon.email = inbox.emailAddress;

                // sign up with inbox email address and the password
                cy.get("input[type=email]").clear();
                cy.get("input[type=email]").type(waylon.email);
                cy.get('button[type="submit"]').click();

                cy.contains(waylon.email);
            });
        });

        let token;
        it("can receive the invite email and extract the token", () => {
            // wait for an email in the inbox
            cy.waitForLatestEmail(inboxId).then((email) => {
                // verify we received an email
                assert.isDefined(email);

                // verify that email contains the code
                assert.strictEqual(/JOIN THE LEAGUE/.test(email.body), true);

                // extract the token (so we can confirm the user)
                token = /token=(.*?)\"/.exec(email.body)[1];
            });
        });

        it("Invited user accepts the invite", () => {
            // wait for an email in the inbox
            cy.logout();

            let time = Date.now().valueOf();
            cy.visit('/rsvp?token=' + token);

            cy.get('input[name=firstName]').type(waylon.firstName);
            cy.get('input[name=lastName]').type(waylon.lastName);
            cy.get('input[name=email]').type(waylon.email);
            cy.get('input[name=password]').type(waylon.password);
            cy.get('input[name=confirmation]').type(`${waylon.password}`);

            cy.get('[data-cy=submit]').click();

            cy.contains('SEE THE STANDINGS');
        });

        it("League admin sees that invite is consumed", () => {
            // wait for an email in the inbox
            cy.logout();

            let time = Date.now().valueOf();
            cy.visit('/');

            cy.get('input[name=email]').type(hank.email);
            cy.get('input[name=password]').type(`${hank.password}`);

            cy.get('[data-cy=submit]').click()

            cy.contains('SEE THE STANDINGS');

            cy.visit('/league/settings');

            //Check that League Members has two people
            cy.get('#leagueMembers').find('tr').should('have.length', 3);

            //Check that League Invites has zero people
            cy.get('#leagueInvites').find('tr').should('have.length', 2);
        });

    });
})
