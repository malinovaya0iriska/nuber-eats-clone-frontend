import '@testing-library/cypress/add-commands';

Cypress.Commands.add('assertLoggedIn', () => {
  cy.window().its('localStorage.nuber-token').should('be.a', 'string');
});

Cypress.Commands.add('assertLoggedOut', () => {
  cy.window().its('localStorage.nuber-token').should('be.undefined');
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.assertLoggedOut();
  cy.title().should('eq', 'Login | Nuber Eats');
  cy.findByPlaceholderText(/email/i).type(email);
  cy.findByPlaceholderText(/password/i)
    .type(password)
    .blur();
  cy.findByRole('button').should('not.have.class', 'pointer-events-none').click();
  cy.assertLoggedIn();
});
