describe("Load The Application and Load 4 maps", () => {
  it("successfully loads and lands to 4 map page", () => {
    cy.visit("/");
    cy.get(".4x4_button").should("be.visible").click();
    cy.url().should("eq", "http://localhost:3000/map/4");
  });
});
