// Testing navigation of application
describe("Navigation", () => {
  //test to check application is navigating to baseURL
  it("should visit root", () => {
    cy.visit("/");
  });

  //test to navigate to Tuesday with appropriate styles
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});