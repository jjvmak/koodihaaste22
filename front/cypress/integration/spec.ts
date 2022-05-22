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

// This test is non-deterministic and can cause random failures.
describe('Vote', () => {
  it('should vote', () => {
    cy.visit('/');
    cy.get('#citySearch').type('Turku');
    cy.get('app-restaurant').first().should('be.ok');

    cy.get('app-restaurant')
      .first()
      .then(($restaurant) => {
        if ($restaurant.find('button').first().is('visible')) {
          cy.get('app-restaurant')
            .first()
            .get('button')
            .first()
            .click({ force: true });
        } else {
          cy.get('.restaurant-container').first().click();
          cy.get('app-restaurant').first().get('button').first().click();
        }
      });
    cy.get('.voted-item').first().should('be.ok');
  });
});
