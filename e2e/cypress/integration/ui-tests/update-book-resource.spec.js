/// <reference types="cypress" />

const resourceData = require("../../fixtures/resource-api-data.json");
const newResourceData = require("../../fixtures/resource-updated-data.json");

describe("Update Book Resources", () => {
  beforeEach(() => {
    // TODO: login with admin user.
    cy.loginAndCleanUp();
    cy.createResourceWithAPI("book", resourceData);
    cy.visit("/");
    cy.get("[data-test=app]").should("be.visible");
  });

  it("Should update a book resource", () => { 
    cy.get("[data-test=spinner]")
      .should("not.exist")
      .then(() => {
        cy.get("[data-test=post-list-container]")
          .children()
          .first()
          .should("contain.text", "Test Title")
          .click();
      });

    cy.url().then((url) => {
      cy.get("[data-test=edit-button]").should("be.visible").click();

      cy.url().should("contain", "/update/");

      cy.get("h3").should("contain.text", "Update Resource Form");

      cy.get("[data-test=title-input]").should(
        "have.value",
        resourceData.title
      );
      cy.get("[data-test=author-input]").should(
        "have.value",
        resourceData.author
      );
      cy.get("[data-test=description-input]").should(
        "have.value",
        resourceData.description
      );

      cy.get("[data-test=image-url-input]").should(
        "have.value",
        resourceData.imageUrl
      );

      cy.get("[data-test=subtitle-input]").should(
        "have.value",
        resourceData.subtitle
      );
      cy.get("[data-test=isbn-input]").should("have.value", resourceData.isbn);

      cy.get("[data-test=value-one-input]").should(
        "have.value",
        resourceData.value_one
      );
      cy.get("[data-test=value-two-input]").should(
        "have.value",
        resourceData.value_two
      );
      cy.get("[data-test=value-three-input]").should(
        "have.value",
        resourceData.value_three
      );

      cy.get("[data-test=submit]").should("not.be.enabled");

      cy.updateResourceFieldsWithUI("book", {
        title: newResourceData.title,
        subtitle: newResourceData.subtitle,
        description: newResourceData.description,
        isbn: newResourceData.isbn,
      });

      cy.get("[data-test=submit]").should("be.enabled").click();

      cy.url().should("contain", url);

      cy.get("[data-test=detail-page-container]")
        .should("contain", newResourceData.title)
        //.and("contain", newResourceData.subtitle)
        .and("contain", newResourceData.description);
      //.and("contain", newResourceData.isbn);

      cy.get("[data-test=update-successfull-message]");
    });
  });

  it("should create a book resource by pressing ENTER when all fields are filled", () => {
    cy.get("[data-test=spinner]")
      .should("not.exist")
      .then(() => {
        cy.get("[data-test=post-list-container]")
          .children()
          .first()
          .should("contain.text", "Test Title")
          .click();
      });

    cy.url().then((url) => {
      cy.get("[data-test=edit-button]").should("be.visible").click();

      cy.updateResourceFieldsWithUI("book", {
        title: newResourceData.title,
        subtitle: newResourceData.subtitle,
        description: newResourceData.description,
        isbn: newResourceData.isbn,
      });

      cy.get("[data-test=value-three-input]").type("{enter}");

      cy.url().should("contain", url);

      cy.get("[data-test=detail-page-container]").should(
        "contain",
        newResourceData.title
      );
    });
  });

  it("should not create a new resource when updating a resource", () => {
    cy.get("[data-test=spinner]")
      .should("not.exist")
      .then(() => {
        cy.get("[data-test=post-list-container]")
          .children()
          .first()
          .should("contain.text", "Test Title")
          .click();
      });

    cy.get("[data-test=edit-button]").should("be.visible").click();

    cy.updateResourceFieldsWithUI("book", {
      title: newResourceData.title,
      subtitle: newResourceData.subtitle,
      description: newResourceData.description,
      isbn: newResourceData.isbn,
    });
  });

  it("should NOT display edit button when logged in as regular user", () => {
    cy.logoutWithUI();

    // TODO: login with admin user.
    cy.loginAndCleanUp();
    cy.get("[data-test=post-list-container]").children().first().click();

    cy.get("[data-test=edit-button]").should("not.exist");
  });

  afterEach(() => {
    cy.deleteTestData();
  });
});
