// ***********************************************************
// This example support/e2e.js is processed and
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
Cypress.on('uncaught:exception', (err, runnable) => {
  // para não erro ao deslogar
  if (err.message.includes('KeyError') || err.message.includes('user_id')) {
    return false;
  }
});
// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
//biblioteca xpath 
//require('cypress-xpath');
import 'cypress-mochawesome-reporter/register';