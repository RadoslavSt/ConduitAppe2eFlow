// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("notPAssSignUpCredential", () => {
  const result = Math.random().toString(36).substring(2, 7);
  console.log(result);

  cy.get('[placeholder="Username"]').type("Boba Test");
  cy.get('[type="submit"]').should("be.disabled");
  cy.get('[placeholder="Email"]').type("bobaemail@gmail.com");
  cy.get('[type="submit"]').should("be.disabled");
  cy.get('[placeholder="Password"]').type("boba12345!");
  cy.get('[type="submit"]').should("be.enabled").click();
  cy.get(".error-messages")
    .should("be.visible")
    .should(
      "contain.text",
      "email has already been taken  username has already been taken "
    );
  cy.log("Please Sign In with these credentials!!!!!!!!!");
});

Cypress.Commands.add("NEWSignUpCredential", () => {
  const result = Math.random().toString(36).substring(2, 7);
  console.log(result);

  cy.get('[placeholder="Username"]').type(result + "Boba Test");
  cy.get('[type="submit"]').should("be.disabled");
  cy.get('[placeholder="Email"]').type(result + "bobaemail@gmail.com");
  cy.get('[type="submit"]').should("be.disabled");
  cy.get('[placeholder="Password"]').type("boba12345!");
  cy.get('[type="submit"]').should("be.enabled").click();
});

Cypress.Commands.add("HomePage", () => {
  cy.visit("https://angular.realworld.io/");
  cy.viewport(1900, 1200);
});
