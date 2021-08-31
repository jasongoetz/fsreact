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

    let george = {
        firstName: 'George',
        lastName: 'Jones',
        email: `gjones+${time}@fakestacks.com`,
        password: 'g'
    }

    let tammy = {
        firstName: 'Tammy',
        lastName: 'Wynette',
        email: `twynette+${time}@fakestacks.com`,
        password: 't'
    }

    describe('Create a user, create a league, invite a user, accept the invite', function() {

        //Create first commish
        it('registers and creates league', function () {

            let time = Date.now().valueOf();
            cy.visit('/fsregister')

            cy.get('input[name=firstName]').type(hank.firstName);
            cy.get('input[name=lastName]').type(hank.lastName);
            cy.get('input[name=email]').type(hank.email);
            cy.get('input[name=password]').type(hank.password);
            cy.get('input[name=confirmation]').type(`${hank.password}`)

            cy.get('[data-cy=submit]').click()

            // we should be redirected to /dashboard
            cy.url().should('include', '/league/join')
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
        let waylonInboxId;
        let georgeInboxId;

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

                // save the waylonInboxId for later checking the emails
                waylonInboxId = inbox.id;
                console.log("waylon inbox = " + waylonInboxId);
                waylon.email = inbox.emailAddress;

                // sign up with inbox email address and the password
                cy.get("input[type=email]").clear();
                cy.get("input[type=email]").type(waylon.email);
                cy.get('button[type="submit"]').click();

                cy.contains(waylon.email);
            });
        });

        it("Invite a third person to the league (without real email address)", () => {
            // sign up with inbox email address and the password
            cy.get("input[type=email]").clear();
            cy.get("input[type=email]").type(george.email);
            cy.get('button[type="submit"]').click();

            cy.contains(george.email);
        });

        let waylonInviteToken;
        it("First invitee can receive the invite email and extract the token", () => {
            // wait for an email in the inbox
            cy.waitForLatestEmail(waylonInboxId).then((email) => {
                // verify we received an email
                assert.isDefined(email);

                // verify that email contains the code
                assert.strictEqual(/JOIN THE LEAGUE/.test(email.body), true);

                // extract the token (so we can confirm the user)
                waylonInviteToken = /token=(.*?)\"/.exec(email.body)[1];
            });
        });

        it("Invited user accepts the invite", () => {
            // wait for an email in the inbox
            cy.logout();

            let time = Date.now().valueOf();
            cy.visit('/rsvp?token=' + waylonInviteToken);

            cy.get('[data-testid="fs-registration-button"]').click();

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

            cy.get('[data-testid="fs-login-button"]').click();

            cy.get('input[name=email]').type(hank.email);
            cy.get('input[name=password]').type(`${hank.password}`);

            cy.get('[data-cy=submit]').click()

            cy.contains('SEE THE STANDINGS');

            cy.visit('/league/settings');

            //Check that League Members has two people
            cy.get('#leagueMembers').find('tr').should('have.length', 3);

            //Check that League Invites has one person
            cy.get('#leagueInvites').find('tr').should('have.length', 3);
        });

        // let georgeInviteToken;
        // it("Second invitee can receive the invite email and extract the token", () => {
        //     // wait for an email in the inbox
        //     cy.waitForLatestEmail(georgeInboxId).then((email) => {
        //         // verify we received an email
        //         assert.isDefined(email);
        //
        //         // verify that email contains the code
        //         assert.strictEqual(/JOIN THE LEAGUE/.test(email.body), true);
        //
        //         // extract the token (so we can confirm the user)
        //         georgeInviteToken = /token=(.*?)\"/.exec(email.body)[1];
        //     });
        // });

        it("Second invitee just signs up and sees the invite, then sees they have invite in app", () => {
            // wait for an email in the inbox
            cy.logout();

            cy.visit('/register');

            cy.get('[data-testid="fs-registration-button"]').click();

            cy.get('input[name=firstName]').type(george.firstName);
            cy.get('input[name=lastName]').type(george.lastName);
            cy.get('input[name=email]').type(george.email);
            cy.get('input[name=password]').type(george.password);
            cy.get('input[name=confirmation]').type(`${george.password}`);

            cy.get('[data-cy=submit]').click()

            cy.get('[data-testid="join-league-0"]').click();

            cy.contains('SEE THE STANDINGS');
        });

        //Create first commish
        it('Tammy registers and creates league', function () {
            cy.logout();

            cy.visit('/fsregister')

            cy.get('input[name=firstName]').type(tammy.firstName);
            cy.get('input[name=lastName]').type(tammy.lastName);
            cy.get('input[name=email]').type(tammy.email);
            cy.get('input[name=password]').type(tammy.password);
            cy.get('input[name=confirmation]').type(`${tammy.password}`)

            cy.get('[data-cy=submit]').click()

            // we should be redirected to /dashboard
            cy.url().should('include', '/league/join')
        })

        //Create league for commish
        it('Tammy creates an initial league', function () {
            cy.get('input[id=leagueName]').type(`TAMMY LEAGUE ${time}`);

            cy.get('[data-cy=submit]').click()

            cy.url().should('eq', Cypress.config().baseUrl + '/');
        });


        it('Tammy visits the league management page and invites Waylon to second league', function () {
            cy.get('[id="manage"]').click();
            cy.contains("League Management");

            cy.get("input[type=email]").clear();
            cy.get("input[type=email]").type(waylon.email);
            cy.get('button[type="submit"]').click();

            cy.contains(waylon.email);
        });

        let secondWaylonInviteToken;
        it("Waylon gets second invite email extracts the token", () => {
            // wait for an email in the inbox
            console.log("waylon inbox (2nd time) = " + waylonInboxId);
            cy.waitForLatestUnreadEmail(waylonInboxId).then((email) => {
                // verify we received an email
                assert.isDefined(email);

                // verify that email contains the code
                assert.strictEqual(/JOIN THE LEAGUE/.test(email.body), true);

                // extract the token (so we can confirm the user)
                secondWaylonInviteToken = /token=(.*?)\"/.exec(email.body)[1];
            });
        });

        it("Waylon accepts this invite too, joining the second league", () => {
            // wait for an email in the inbox
            cy.logout();

            cy.visit('/rsvp?token=' + secondWaylonInviteToken);

            cy.get('a[href*="/login"]').click()

            cy.get('[data-testid="fs-login-button"]').click();

            cy.get('input[name=email]').type(waylon.email);
            cy.get('input[name=password]').type(waylon.password);

            cy.get('[data-cy=submit]').click();

            cy.contains('SEE THE STANDINGS');

            //There are only two people in the standings (We're in Tammy's league)
            cy.get('.standings').find('tbody>tr').should('have.length', 2);
        });

        it("Waylon sees a League Switcher and switches leagues", () => {

            cy.get('[data-testid="league-switcher"]').click();

            cy.get('[data-testid="lg-switcher-item-0"]').click();

            cy.contains('CFB');

            //There are only two people in the standings (We're in Tammy's league)
            cy.get('.standings').find('tbody>tr').should('have.length', 3);
        });

    });
})
