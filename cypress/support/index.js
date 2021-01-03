// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

afterEach(function onAfterEach() {
    if (this.currentTest.state === 'failed') {
        //set cookie to skip tests for further specs
        Cypress.runner.stop();
        //this will skip tests only for current spec
    }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
