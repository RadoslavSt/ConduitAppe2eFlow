/// <reference types = 'cypress'/>

import { HeaderValidation } from "../support/utilities";

describe("First Condui tests", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
  });

  it("cypress Api plugin", () => {
    const tags = ["This", "is ", "my", "tags", "Boba"];

    cy.api("GET", "https://api.realworld.io/api/tags", tags);
  });

  it("cypress intercept tags", () => {
    cy.intercept("GET", "https://api.realworld.io/api/tags", {
      fixture: "tags.json",
    });
    cy.get(".sidebar .tag-pill").each((tags) => {
      cy.log(tags[0].innerText);
    });
  });

  it("Validate header ", () => {
    const expectedNavItem = ["Home", " Sign in ", " Sign up "];

    HeaderValidation(
      cy.get('[class = "nav navbar-nav pull-xs-right"] li a '),
      expectedNavItem
    );
  });
});
