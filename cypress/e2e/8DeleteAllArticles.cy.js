/// <reference types = 'cypress'/>

import { typeCredentials } from "..//support/utilities.js";

describe("Edit Article", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
    cy.contains("Sign in").click();

    const credentials = ["bobaemail@gmail.com", "boba12345!"];
    typeCredentials(cy.get(".form-group .form-control"), credentials);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it("Delete Article", () => {
    cy.get('.user-pic').click()
    cy.get('.preview-link h1').then((Article)=>{
      cy.wrap(Article).should('be.visible')
      cy.wrap(Article).eq(0).click()
      cy.get('.ion-trash-a').eq(0).click()
    })
   
  });
});
