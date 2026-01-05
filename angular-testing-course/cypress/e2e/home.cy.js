/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept({ method: 'GET', url: '/api/courses' }, { fixture: 'courses.json' }).as('courses');
    cy.visit('/');
    cy.wait(['@courses']);
  });

  it('should display a list of courses', () => {
    cy.contains('All Courses');
    cy.get('mat-card').should('have.length', 9);
  });

  it('should display the advanced courses', () => {
    cy.get('.mat-mdc-tab').should('have.length', 2);
    cy.get('.mat-mdc-tab').last().click();
    cy.get('mat-card').should('have.length', 3);
    cy.get('mat-card-title').first().should('contain', 'Angular Security Course');
  });

});
