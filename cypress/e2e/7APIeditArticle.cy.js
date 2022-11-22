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

  it("PUT Method", () => {
    cy.intercept(
      "PUT",
      "https://api.realworld.io/api/articles/**",
      (editArticle) => {
        console.log(editArticle);
        editArticle.body.article.body = "Edited text with PUT method";
        editArticle.body.article.description =
          "Edited About with PUT method";
        editArticle.body.article.title =
          result + " Edited Title with PUT method";
      }
    ).as("edited");

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
    cy.contains("Publish Article").click();

    cy.wait("@edited").then((edits) => {
      console.log(edits);
      expect(edits.response.body.article.title).eq(
        result + " Edited Title with PUT method"
      );
    });
  });
});
