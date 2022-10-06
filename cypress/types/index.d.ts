/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): Chainable<any>;
    assertLoggedOut(): Chainable<any>;
    assertLoggedIn(): Chainable<any>;
  }
}
