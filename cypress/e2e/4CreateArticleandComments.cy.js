/// <reference types = 'cypress'/>

import { typeCredentials } from "../support/utilities.js";
import { createArticle } from "../support/utilities.js";

describe("Article", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
    cy.contains("Sign in").click();

    const credentials = ["bobaemail@gmail.com", "boba12345!"];
    typeCredentials(cy.get(".form-group .form-control"), credentials);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it("Create new Article", () => {
    cy.contains("New Article").click();
    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);

    const articleDatas = [
      result + "Title Test",
      "About Testing",
      "This is my test article",
      "test automation",
    ];

    createArticle(cy.get(".form-group .form-control "), articleDatas);
    cy.contains(" Publish Article ").click();
    cy.wait(1000);
  });

  it("Create Comments on Article", () => {
    cy.get(".user-pic").click();
    cy.get(".preview-link").then((Article) => {
      cy.wrap(Article).eq(0).click();
    });

    for (let i = 0; i < 3; i++) {
      cy.get('[placeholder="Write a comment..."]').type(
        "This is an Article Comment"
      );
      cy.contains(" Post Comment ").click();
      cy.wait(500);
    }
  });

  it("Give like on favorite article and dislike", () => {
    cy.get(".user-pic").click();

    cy.get(".article-preview").then((articles) => {
      cy.wrap(articles).should("be.visible");
    });

    cy.get(".ion-heart").eq(0).click();
    cy.wait(500);

    cy.contains("Favorited Posts").click();
    cy.wait(1500);
    cy.get(".article-preview").then((articles) => {
      cy.wrap(articles).should("have.length", 1).and("be.visible");
    });
    cy.get(".ion-heart").eq(0).click();
    cy.contains("My Posts").click();
  });
});
