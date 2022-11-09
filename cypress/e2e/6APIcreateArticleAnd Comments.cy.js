/// <reference types= 'cypress'/>

import { typeCredentials } from "../support/utilities.js";
import { createArticle } from "../support/utilities.js";

describe("API New Article", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
    cy.contains("Sign in").click();

    const credentials = ["bobaemail@gmail.com", "boba12345!"];
    typeCredentials(cy.get(".form-group .form-control"), credentials);
    cy.get('[type="submit"]').click();
    cy.wait(1000);
  });

  it("Create new Article with API", () => {
    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);

    cy.intercept(
      "POST",
      "https://api.realworld.io/api/articles/",
      (Myrequset) => {
        console.log(Myrequset);
        Myrequset.body.article.title = result + "Api title";
        Myrequset.body.article.body = "This is my API test article";
        Myrequset.body.article.desciption = "About API Testing";
      }
    ).as("createApiArticle");

    cy.contains("New Article").click();
    const articleDatas = [
      "Title Test",
      "About Testing",
      "This is my test article",
      "test automation",
    ];

    createArticle(cy.get(".form-group .form-control "), articleDatas);
    cy.contains(" Publish Article ").click();

    cy.wait("@createApiArticle").then((article) => {
      console.log(article);
      expect(article.request.body.article.body).eq(
        "This is my API test article"
      );
    });
  });

  it("Create New Comment with API", () => {
    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);

    cy.intercept("POST", "**/articles/**/comments", (postCom) => {
      console.log(postCom);
      postCom.body.comment.body = result + "Api komentar";
    }).as("createComm");

    cy.get(".user-pic").click();
    cy.get(".preview-link").then((article) => {
      cy.wrap(article).eq(0).click();
    });
    cy.get('[placeholder="Write a comment..."]').type("Komentar");
    cy.contains(" Post Comment ").click();

    cy.wait("@createComm").then((comment) => {
      console.log(comment);
      expect(comment.request.body.comment.body).eq(result + "Api komentar");
    });
  });

});
