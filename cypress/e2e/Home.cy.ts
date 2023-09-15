export {};
describe('Home Page', () => {
  beforeEach(() => {
    // visit home page
    cy.visit('http://localhost:3000');
  });

  it('should load and display Pokemon cards', () => {
    // waiting for data to load
    cy.wait(5000); // Adjust as needed

    // check for pokemon cards if its displayed
    cy.get('.poke-card').should('have.length.gt', 0);

    // click on card
    cy.get('.poke-card').first().click();

    // check if modal is visible
    cy.get('.modal').should('be.visible');
  });
});
