describe("Navigation", () => {
  it("should visit the home page", ()=> {
    cy.visit('/');
  });
  it ("should change to the news page when news is clicked", () => {
    cy.visit('/');
    cy.contains("News").click();
    cy.contains("Read More").should("exist");
  });
});