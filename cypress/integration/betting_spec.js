describe('Validate Game Betting', () => {

    const cWebb = {
        email: 'chris.webber@fakestacks.com',
        password: 'cw'
    };

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

    // Log in with Chris Webber
    it('Log in CWebb', function () {
        // destructuring assignment of the this.currentUser object

        cy.visit('/fslogin')

        cy.get('input[name=email]').type(cWebb.email)

        // {enter} causes the form to submit
        cy.get('input[name=password]').type(`${cWebb.password}{enter}`)

        // we should be redirected to /dashboard
        cy.url().should('include', '/')

        // Nav bar should reflect this user being logged in
        cy.get('a.nav-link').should('contain', 'CHRIS')
        cy.get('a.nav-link').should('contain', 'WEBBER')
        cy.get('#account-balance').should('contain.text', '$500'); //Should bail right away if data hasn't been reset
    })

    // Go to Games page and see if there's only one game to bet on
    it('Check Games page', function () {
        cy.visit('/games')

        cy.get('[data-testid="games-page-container"]').find('[data-testid="bettable-row"]').should('have.length', 1);
    })

    // Bet a parlay, bet 100 on under 100 and on Team 6 +10
    it('Bet a $100 parlay on Team 6 and the Under', function () {
        cy.get('[data-testid="games-page-container"]').get('[data-testid="team2-bet-button"]').click();
        cy.get('[data-testid="games-page-container"]').get('[data-testid="under-bet-button"]').click();

        cy.get('[data-testid="parlay-navlink"]').click();

        //Try to bet more than 250 and get invalidated
        cy.get('input[id=amount]').type('500');
        cy.get('[data-testid="review-bet-button"]').click();
        cy.get('[data-testid="bet-validation-error-panel"]').should('be.visible');

        cy.get('input[id=amount]').clear();
        cy.get('input[id=amount]').type('100');
        cy.get('[data-testid="review-bet-button"]').click();
        cy.url().should('include', '/confirmation');

        cy.get('[data-testid="confirm-bet-button"]').click();
        cy.url().should('include', '/account');
        cy.get('#account-balance').should('contain.text', '$400');
    })

    // Go to scores page and verify the bets that are displayed
    it('Scores reflect bets made', function () {
        cy.visit('/scores');

        cy.get('[data-testid="outcome-card"]').should('have.length', 3);

        cy.get('li:contains(Juwan Howard had)').should('have.length', 1);
        cy.get('li:contains(Jalen Rose had)').should('have.length', 1);
        cy.get('li:contains(Jalen Rose has)').should('have.length', 1);
        cy.get('li:contains(Chris Webber has)').should('have.length', 2);
    })

    // Verify the standings have everyone at 500
    it('Standings show everyone at $500', function () {
        cy.visit('/standings');

        cy.get('[data-testid="standings-table"]').find('tbody > tr').should('have.length', 3);
        cy.get('tbody > tr:contains("Juwan")').should('have.length', 1);
        cy.get('tbody > tr:contains("Juwan")').find('a').should('contain.text', '$500');
        cy.get('tbody > tr:contains("Juwan")  > :nth-child(4)').should('contain.text', '$50'); //Pending

        cy.get('tbody > tr:contains("Jalen")').should('have.length', 1);
        cy.get('tbody > tr:contains("Jalen")').find('a').should('contain.text', '$500');
        cy.get('tbody > tr:contains("Jalen")  > :nth-child(4)').should('contain.text', '$100'); //Pending

        cy.get('tbody > tr:contains("Chris")').should('have.length', 1);
        cy.get('tbody > tr:contains("Chris")').find('a').should('contain.text', '$500');
        cy.get('tbody > tr:contains("Chris")  > :nth-child(4)').should('contain.text', '$100'); //Pending
    })

    // Go to /admin?future=true
    it('Process the one auto-filled score', function () {
        cy.visit('/admin?future=true');

        // Verify that one score is filled in
        cy.get('[name="outcomes[1][side1Score]"]').should('contain.value', 14);
        cy.get('[name="outcomes[1][side2Score]"]').should('contain.value', 35);

        // Submit that score
        cy.contains('SUBMIT').click();
    })

    // Go back to standings and verify
    // Verify the standings have everyone at 500
    it('Standings reflect recent processed bet', function () {
        cy.visit('/standings');

        cy.get('[data-testid="standings-table"]').find('tbody > tr').should('have.length', 3);
        cy.get('tbody > tr:contains("Juwan")').should('have.length', 1);
        cy.get('tbody > tr:contains("Juwan")').find('a').should('contain.text', '$450'); //Money
        cy.get('tbody > tr:contains("Juwan")  > :nth-child(4)').should('contain.text', '$0'); //Pending

        cy.get('tbody > tr:contains("Jalen")').should('have.length', 1);
        cy.get('tbody > tr:contains("Jalen")').find('a').should('contain.text', '$450'); //Money
        cy.get('tbody > tr:contains("Jalen")  > :nth-child(4)').should('contain.text', '$50'); //Pending

        cy.get('tbody > tr:contains("Chris")').should('have.length', 1);
        cy.get('tbody > tr:contains("Chris")').find('a').should('contain.text', '$500'); //Money
        cy.get('tbody > tr:contains("Chris")  > :nth-child(4)').should('contain.text', '$100'); //Pending
    })

    // Go back to admin?future and enter the score for the last two games
    it('Process the other two games', function () {
        cy.visit('/admin?future=true');

        cy.get('[name="outcomes[2][side1Score]"]').type('144');
        cy.get('[name="outcomes[2][side2Score]"]').type('145');

        cy.get('[name="outcomes[3][side1Score]"]').type('54');
        cy.get('[name="outcomes[3][side2Score]"]').type('45');

        // Submit that score
        cy.contains('SUBMIT').click();
    })

    // Go back and verify the standings
    it('Standings reflect recent processed bet', function () {
        cy.visit('/standings');

        cy.get('[data-testid="standings-table"]').find('tbody > tr').should('have.length', 3);
        cy.get('tbody > tr:contains("Juwan")').should('have.length', 1);
        cy.get('tbody > tr:contains("Juwan")').find('a').should('contain.text', '$450'); //Money
        cy.get('tbody > tr:contains("Juwan")  > :nth-child(4)').should('contain.text', '$0.00'); //Pending
        cy.get('tbody > tr:contains("Juwan")  > :nth-child(5)').should('contain.text', '0-1-0'); //Record

        cy.get('tbody > tr:contains("Jalen")').should('have.length', 1);
        cy.get('tbody > tr:contains("Jalen")').find('a').should('contain.text', '$500'); //Money
        cy.get('tbody > tr:contains("Jalen")  > :nth-child(4)').should('contain.text', '$0'); //Pending
        cy.get('tbody > tr:contains("Jalen")  > :nth-child(5)').should('contain.text', '1-1-0'); //Pending

        cy.get('tbody > tr:contains("Chris")').should('have.length', 1);
        cy.get('tbody > tr:contains("Chris")').find('a').should('contain.text', '$800'); //Money
        cy.get('tbody > tr:contains("Chris")  > :nth-child(4)').should('contain.text', '$0'); //Pending
        cy.get('tbody > tr:contains("Chris")  > :nth-child(5)').should('contain.text', '2-0-0'); //Pending
    })

})
