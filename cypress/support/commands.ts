import '@testing-library/cypress/add-commands';
import { BASE_URL, SIGN_UP } from '../../src/routes/constants/index';
/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

Cypress.Commands.add('assertLoggedIn', () => {
  cy.window().its('localStorage.nuber-token').should('be.a', 'string');
});

Cypress.Commands.add('assertLoggedOut', () => {
  cy.window().its('localStorage.nuber-token').should('be.undefined');
});

Cypress.Commands.add('assertTitle', title => {
  cy.title().should('eq', `${title} | Nuber Eats`);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit(BASE_URL);
  cy.assertLoggedOut();
  cy.assertTitle('Login');
  cy.findByPlaceholderText(/email/i).type(email);
  cy.findByPlaceholderText(/password/i)
    .type(password)
    .blur();
  cy.findByRole('button').should('not.have.class', 'pointer-events-none').click();
  cy.assertLoggedIn();
});
