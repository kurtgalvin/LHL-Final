describe("Appointments", () => {
  beforeEach(() => {
    cy.request("POST", "/api/markers/resetDB");
    cy.visit('/');
  })

  it("should add a marker", () => {
    cy.get("[placeholder='Find a store']")
    .type("T&T")
  
    cy.server();
    cy.route({method: 'POST', url:'/api/markers'}).as('markerPost');

    cy.contains("Keefer Place")
    .click();

    cy.wait(['@markerPost']);

    cy.get('h4').should('contain', 'T&T Supermarket');

  })

})