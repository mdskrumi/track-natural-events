describe("Load The Application and Load single maps", () => {
  it("successfully loads and lands to single map page", () => {
    cy.visit("/");
    cy.get(".1x1_button").should("be.visible").click();
    cy.url().should("eq", "http://localhost:3000/map/1");
  });
});
