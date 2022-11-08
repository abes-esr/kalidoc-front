function testValeurs() {
    // Teste la valeur de chaque ppn
    cy.get(':nth-child(1) > .v-chip__content').contains("123456789");
    cy.get(':nth-child(2) > .v-chip__content').contains("123456790");

    // Teste de la visibilité du v-alert
    cy.get('.v-alert').should('not.be.hidden');

    // Ouvre le v-alert
    cy.get('.v-expansion-panel-header__icon > .v-icon').click();

    // Teste de la valeur du chip dans le v-alert
    cy.get('.v-expansion-panel-content__wrap > .v-chip > .v-chip__content').contains("45df753");
    // Teste le vidage de la liste
    cy.get('.pe-1 > .v-btn__content').click();
    cy.get('.v-select__selections').should('have.value', '');
}

before(() => {
    // Mock
    cy.intercept(Cypress.env('urlApi') + "getFamillesDocuments",[{"id":"B","libelle":"Audiovisuel"}]);
    cy.intercept(Cypress.env('urlApi') + "getRuleSets",[]);

    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);

    // Affichage de la home page
    cy.visit(Cypress.env('url'));
})

beforeEach(() => {
    // Réglage de la taille de la fenêtre
    cy.viewport(1400, 1000);
})

describe('Ajout d\' ppn et vidage de la liste', () => {
    it('Ajout de ppn un par un', () => {

        // Teste l'ajout d'un ppn par ppn
        cy.get('.v-select__selections').click().type("123456789 ");
        cy.get('.v-select__selections').type('{enter}');
        cy.get('.v-select__selections').click().type("123456790 ");
        cy.get('.v-select__selections').type('{enter}');
        cy.get('.v-select__selections').click().type("45df753");
        cy.get('.v-select__selections').type('{enter}');

        testValeurs();
    })

    it ('Ajout d\'une liste de ppn',() => {

        // Teste l'ajout d'une liste de ppn
        cy.get('.v-select__selections').click().type("123456789,123456790 45df753");
        cy.get('.v-select__selections').type('{enter}');

        testValeurs();
    })

    it('Ajout d\'un fichier de ppn', () => {
        // Teste l'ajout du fichier de ppn dans le input-file
        cy.get('input[type=file]').selectFile('cypress/fixtures/ppnList.csv', {force: true});

        // Teste le contenu du input-file
        cy.get('.v-file-input__text').contains('ppnList.csv');
    })
})