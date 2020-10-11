describe('MultiLeague', () => {

    //Constants
    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
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

    describe('Create a user, create a league, invite a user, accept the invite', function() {

        //Create first commish
        it('registers and creates league', function () {

            let time = Date.now().valueOf();
            cy.visit('/register')

            cy.get('input[name=firstName]').type(hank.firstName);
            cy.get('input[name=lastName]').type(hank.lastName);
            cy.get('input[name=email]').type(hank.email);
            cy.get('input[name=password]').type(hank.password);
            cy.get('input[name=confirmation]').type(`${hank.password}{enter}`)

            // we should be redirected to /dashboard
            cy.url().should('include', '/league/new')
        })

        //Create league for commish
        it('Should create an initial league', function () {
            cy.get('input[id=leagueName]').type(`CFB ${time}{enter}`);

            cy.url().should('eq', Cypress.config().baseUrl + '/');
        });

        //Create invite for additional user
        // it('Should create a user invite', function (done) {
        //     agent
        //         .post('/leagueinvite/create')
        //         .send({ inviteEmail: 'wjennings+1@hotmail.com' })
        //         .expect(302)
        //         .expect('location','/league/settings', done);
        // });

        // it('Should fail for bad email address in invite', function (done) {
        //     agent
        //         .post('/leagueinvite/create')
        //         .send({ inviteEmail: 'wjennings+2' })
        //         .expect(302)
        //         .expect('location','/league/settings', done);
        // });

        //Accept the invite
        // it('Should accept the invite', async function () {
        //     let leagueInvites = await LeagueInvite.find();
        //     let invite = leagueInvites[0];
        //
        //     //Can't accept the invite with the inviting agent
        //     await agent
        //         .get('/rsvp?token=' + invite.token)
        //         .expect(403);
        //
        //     //Bad token
        //     await agent2
        //         .get('/rsvp?token=' + invite.token.substring(0, 5))
        //         .expect(404);
        //
        //     //Accept the invite
        //     await agent2
        //         .get('/rsvp?token=' + invite.token)
        //         .expect(302)
        //         .expect('location','/register?token='+invite.token);
        //
        //     //Register with the invite token
        //     await agent2
        //         .post('/register/create')
        //         .send({ firstName: 'Waylon', lastName: 'Jennings', email: 'wjennings+1@hotmail.com', password: 'w', confirmation: 'w', token: invite.token })
        //         .expect(302)
        //         .expect('location','/');
        //
        // });

        //Verify that invite has been "used" and league now has two gamblers
        // it('Invite has been consumed and league now has two gamblers', async function () {
        //     let leagueInvites = await LeagueInvite.find();
        //     let invite = leagueInvites[0];
        //     if (invite.user == null) {
        //         throw new Error("User should have been added to invite");
        //     }
        //
        //     let leagueMembers = await Gambler.find().where({league: invite.league}).populate('user');
        //     if (leagueMembers.length != 2) {
        //         throw new Error("League should have two members now. Instead we got " + league.members);
        //     }
        //
        //     hanksLeagueId = leagueMembers[0].league;
        //     hankUserId = leagueMembers[0].user.id;
        //     waylonUserId = leagueMembers[0].user.id;
        //
        // });

    });


    // it('registers and create league', function () {
    //
    //     let time = Date.now().valueOf();
    //     cy.visit('/register')
    //
    //     email = `jason.goetz+${time}@gmail.com`;
    //
    //     cy.get('input[name=firstName]').type('Jason')
    //     cy.get('input[name=lastName]').type('Goetz')
    //     cy.get('input[name=email]').type(email)
    //     cy.get('input[name=password]').type(password)
    //     cy.get('input[name=confirmation]').type(`${password}{enter}`)
    //
    //     // we should be redirected to /dashboard
    //     cy.url().should('include', '/league/new')
    //
    //     cy.get('input[id=leagueName]').type('CFB ' + time + '{enter}');
    //
    //     cy.url().should('include', '/')
    // })
    //
    // it('logs out', function () {
    //     cy.get('#sign-out').click();
    //     cy.url().should('include', '/login');
    // })
    //
    // it('logs in', function () {
    //     // destructuring assignment of the this.currentUser object
    //
    //     cy.visit('/login')
    //
    //     cy.get('input[name=email]').type(email)
    //
    //     // {enter} causes the form to submit
    //     cy.get('input[name=password]').type(`${password}{enter}`)
    //
    //     // we should be redirected to /dashboard
    //     cy.url().should('include', '/')
    //
    //     // UI should reflect this user being logged in
    //     cy.get('a.nav-link').should('contain', 'JASON')
    //     cy.get('a.nav-link').should('contain', 'GOETZ')
    // })
})
