/// <reference types='cypress'/>
import { typeCredentials } from "../support/utilities.js";

describe("Sign In ", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
  });

  it("Sign In successfully", () => {
    cy.contains("Sign in").click();

    const credentials = ["bobaemail@gmail.com", "boba12345!"];
    typeCredentials(cy.get(".form-group .form-control"), credentials);

    if (cy.get('[type="submit"]').should("be.enabled")) {
      cy.get('[type="submit"]').click();
      cy.log('Yeeey we are logged In!!')
    }
  });

  it("Sign In Unsuccessfully", () => {
    cy.contains("Sign in").click();
    const credentials2 = ["bob@gmail.com", "pass12"];
    typeCredentials(cy.get(".form-group .form-control"), credentials2);
    cy.get('[type="submit"]').click();
    cy.get(".error-messages")
      .should("be.visible")
      .and("contain", " email or password is invalid ");
  });

  it('Sign In with API', ()=>{
    cy.intercept('POST', 'https://api.realworld.io/api/users/login',(Irequest)=>{
        console.log(Irequest)
        Irequest.body.user.email = "Radoslav@gmail.com"
        Irequest.body.user.password = "Radoslav12"
    }).as('SignIn')

    cy.contains("Sign in").click();
    const credentials2 = ["bob@gmail.com", "pass12"];
    typeCredentials(cy.get(".form-group .form-control"), credentials2);
    cy.get('[type="submit"]').click();

    cy.wait('@SignIn').then(user=>{
        console.log(user)
        expect(user.response.body.user.username).eq('Radoslav S')
    })

    cy.get('ul li a').eq(3).should('have.text', " Radoslav S ")







  })
});
