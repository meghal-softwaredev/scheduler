// appointments.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/")
      .contains("[data-testid=day]", "Monday");
  })

  it("should book an interview", () => {
    cy.get('[alt="Add"]')
      .first()
      .click();

    cy.get('[data-testid="student-name-input"]')
      .type("Lydia Miller-Jones")

    cy.get('[alt="Sylvia Palmer"]')
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get(".appointment__card")
      .first()
      .should('be.visible');

    cy.get('[alt="Edit"]')
      .click({ force: true });

    cy.get('[data-testid="student-name-input"]')
      .clear()
      .type("Lydia Miller-Jones")

    cy.get('[alt="Tori Malcolm"]')
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
})
