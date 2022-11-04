before(() => {
    // Mock
    cy.intercept("http://localhost:8082/api/v1/getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept("http://localhost:8082/api/v1/getRuleSets",[]);

    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);

    // Affichage de la home page
    cy.visit('http://localhost:8080');
})

beforeEach(() => {
    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);
})

describe('Sélection du type d\'analyse', () => {
    it('Analyse RAPIDE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(1)').click();
        cy.get('[id^=input-36]').click({force: true}).should('be.checked');
    })
    it('Analyse EXPERTE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(4)').click();
        cy.get('[id^=input-39]').click({force: true}).should('be.checked');
    })
    it('Analyse CIBLEE', () => {
        cy.get('.v-input--radio-group__input > :nth-child(6)').click();
        cy.get('[id^=input-42]').click({force: true}).should('be.checked');
    })
})