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
  });

  it("Create new Article", () => {

    const result = Math.random().toString(36).substring(2, 7);
    console.log(result);

    cy.contains("New Article").click();
    const articleDatas = [
      result + "Title Test",
      "About Testing",
      "This is my test article",
      "test automation",
    ];

    createArticle(cy.get(".form-group .form-control "), articleDatas);
    cy.contains(" Publish Article ").click();

   

    
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
});
