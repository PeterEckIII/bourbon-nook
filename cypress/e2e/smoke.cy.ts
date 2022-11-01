describe("Smoke test", () => {
  it("Should visit the homepage", () => {
    cy.visit("/");
    expect(true).to.equal(true);
  });
});
