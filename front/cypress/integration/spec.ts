describe('Page init', () => {
  it('should render page', () => {
    cy.visit('/');
    cy.contains('Lunch Voter 3000');
    cy.contains('Äänestystilanne tänään');
    cy.contains('Ravintolahaku');
    cy.contains('Ei hakutuloksia');
  });
});

describe('Search', () => {
  it('should do search', () => {
    cy.visit('/');
    cy.get('#citySearch').type('Turku');
    cy.get('app-restaurant').first().should('be.ok');
    cy.get('app-restaurant')
      .first()
      .get('button')
      .first()
      .should('have.text', ' Äänestä ');
  });
});

// TODO: make sure the first element is open before voting
// describe('Vote', () => {
//   it('should vote', () => {
//     cy.visit('/');
//     cy.get('#citySearch').type('Turku');
//     cy.get('app-restaurant').first().should('be.ok');
//     cy.get('app-restaurant').first().get('button').first().click();

//     cy.get('app-voting-status').first().get('.item').should('be.ok');
//   });
// });
