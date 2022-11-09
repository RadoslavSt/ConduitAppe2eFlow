/// <reference types ='cypress'/>

import { typeCredentials } from "..//support/utilities.js";
import { createArticle2 } from "..//support/utilities.js";

describe("Edit Article", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
    cy.contains("Sign in").click();

    const credentials = ["bobaemail@gmail.com", "boba12345!"];
    typeCredentials(cy.get(".form-group .form-control"), credentials);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it("Edit Article", () => {
    cy.get(".user-pic").click();
    cy.get(".preview-link").then((articles) => {
      cy.wrap(articles).eq(0).click();
    });
    cy.get(".ion-edit").eq(0).click();

    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);

    const articleDatas2 = [
      result + "Edited Title",
      "Edited about",
      "Edited text",
      "edit",
    ];
    createArticle2(cy.get(".form-group .form-control "), articleDatas2);
    cy.contains(" Publish Article ").click();
    cy.wait(500);
    cy.get(".user-pic").click();
    cy.wait(500);

    cy.get(".preview-link").then((articles) => {
      cy.wrap(articles)
        .eq(0)
        .should("contain", result + "Edited Title");
    });
  });

  it("Delete All Comments from Article", () => {
    cy.get(".user-pic").click();
    cy.get(".preview-link").then((articles) => {
      cy.wrap(articles).eq(0).click();
    });

    cy.get(".mod-options .ion-trash-a").then((trash) => {
      for (let i = 0; i < trash.length; i++) {
        cy.wrap(trash[i]).eq(0).click();
      }
    });

    cy.get(".mod-options .ion-trash-a").should('have.length', 0)

  });
});
