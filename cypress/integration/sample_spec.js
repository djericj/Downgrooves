/// <reference types="cypress" />
describe("My First Test", function() {
  it("Visits the Kitchen Sink", function() {
    cy.server();
    cy.visit("http://localhost:4200/");
    cy.get("[data-cy=music]").click();
    cy.get("a[data-cy=track]").each(element => {
      let href = element.prop("href");
      console.log(href);
      //cy.visit(href);
      var f = href.replace("http://www.downgrooves.com", "");
      console.log(f);
      cy.request(f);
    });

    // cy.get("[data-cy=remixes]").click();
    // cy.get("[data-cy=progressive]").click();
    // cy.get("[data-cy=vocal]").click();
    // cy.get("[data-cy=classics]").click();
    // cy.get("[data-cy=shop]").click();
    // cy.get("[data-cy=contact]").click();
  });
});
