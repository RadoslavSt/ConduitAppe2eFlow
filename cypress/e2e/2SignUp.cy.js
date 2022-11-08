/// <reference types = 'cypress'/>

describe("Sign Up", () => {
  beforeEach("VisitHomePage", () => {
    cy.HomePage();
  });

  it("SignUp UNsuccessfully new credentials ", () => {
    cy.contains("Sign up").click();
    cy.notPAssSignUpCredential();
  });

  it("SignUp successfully new credentials ", () => {
    cy.contains("Sign up").click();
    cy.NEWSignUpCredential();
  });

  it("SignUp UNsuccessfully with API", () => {
    cy.intercept("POST", "https://api.realworld.io/api/users", (Irequest) => {
      console.log(Irequest);
      Irequest.body.user.email = "Radoslav@gmail.com";
      Irequest.body.user.password = "Radoslav12";
      Irequest.body.user.username = "Radoslav S";
    }).as("postUser");
    cy.contains("Sign up").click();
    cy.NEWSignUpCredential();

    cy.wait("@postUser").then((user) => {
      console.log(user);
      expect(user.request.body.user.username).eq("Radoslav S");
    });
    if (
      cy
        .get(".error-messages")
        .should("be.visible")
        .should(
          "contain.text",
          "email has already been taken  username has already been taken "
        )
    ) {
      cy.contains("Have an account?").click();
    } else {
      cy.log(" Yeeyyyy we are logged!!!!!!!");
    }
  });
});
