import schema from '../fixtures/gql_schema.json';

describe('Editor page test', () => {
    beforeEach(() => {
        // add fixtures
        cy.fixture('profile.json').as('successJSON');

        // setup server
        cy.server();

        // mock gql
        cy.mockGraphql({ schema });

        // mock profile calls
        cy.route('GET', '/api/auth/my-profile', '@successJSON').as('profileApi');
        cy.route('/sockjs-node', {});
        localStorage.setItem('contentlify_auth_token', 'auth-token');

        // initial mock
        cy.mockGraphqlOps({
            operations: {
                GetPage: {
                    page: {
                        id: 'randomID',
                        name: 'Test Page',
                        contents: []
                    }
                }
            }
        });

        cy.visit('/app/sites/randomID/editor/randomPageId');
    });

    it('It loads editor and site information with no content', () => {
        cy.mockGraphqlOps({
            operations: {
                GetPage: {
                    page: {
                        id: 'randomID',
                        name: 'Test Page',
                        contents: []
                    }
                }
            }
        });

        cy.get('.blocks').should(
            'contain.text',
            'No block added. Use the buttons on the right to add blocks'
        );
    });

    it('It loads editor and site information', () => {
        cy.mockGraphqlOps({
            operations: {
                GetPage: {
                    page: {
                        id: 'randomID',
                        name: 'Test Page',
                        contents: [
                            {
                                id: 'randomContentID',
                                type: 'TEXT',
                                name: 'Test Block',
                                slug: 'testBlock',
                                content: 'This is content of the test block'
                            }
                        ]
                    }
                }
            }
        });

        cy.get('.blocks .block')
            .its('length')
            .should('eq', 1);

        cy.get('.block input#block-name-randomContentID').should('have.value', 'Test Block');
        cy.get('.block input#block-slug-randomContentID').should('have.value', 'testBlock');
        cy.get('.block textarea#randomContentID').should(
            'have.value',
            'This is content of the test block'
        );
    });

    it('Can add a block', () => {
        cy.mockGraphqlOps({
            operations: {
                GetPage: {
                    page: {
                        id: 'randomID',
                        name: 'Test Page',
                        contents: []
                    }
                }
            }
        });

        // Add block
        cy.get('.block-list .btn')
            .contains('Add Text')
            .click();

        cy.get('.blocks .block')
            .its('length')
            .should('eq', 1);

        cy.get('.block .title-and-toggle h3').should('contain.text', 'Untitled');
    });

    it('Can edit a block', () => {
        cy.mockGraphqlOps({
            operations: {
                GetPage: {
                    page: {
                        id: 'randomID',
                        name: 'Test Page',
                        contents: [
                            {
                                id: 'randomContentID',
                                type: 'TEXT',
                                name: 'Test Block',
                                slug: 'testBlock',
                                content: 'This is content of the test block'
                            }
                        ]
                    }
                }
            }
        });

        cy.get('.block input#block-name-randomContentID').should('have.value', 'Test Block');
        cy.get('.block input#block-slug-randomContentID').should('have.value', 'testBlock');
        cy.get('.block textarea#randomContentID').should(
            'have.value',
            'This is content of the test block'
        );

        // edit fields
        cy.get('.block input#block-name-randomContentID')
            .clear()
            .type('New block name');
        cy.get('.block input#block-slug-randomContentID')
            .clear()
            .type('newBlockName');
        cy.get('.block textarea#randomContentID')
            .clear()
            .type('This is content of the new block');

        cy.get('.block .title-and-toggle h3').should('contain.text', 'New block name');
    });

    it('Can remove a block', () => {
        cy.mockGraphqlOps({
            operations: {
                GetPage: {
                    page: {
                        id: 'randomID',
                        name: 'Test Page',
                        contents: [
                            {
                                id: 'randomContentID',
                                type: 'TEXT',
                                name: 'Test Block',
                                slug: 'testBlock',
                                content: 'This is content of the test block'
                            }
                        ]
                    }
                }
            }
        });

        cy.get('.block .delete .icon').click();

        cy.get('.blocks').should(
            'contain.text',
            'No block added. Use the buttons on the right to add blocks'
        );
    });

    it('Shows error about fields when saving contents', () => {});

    it('Can save contents', () => {});
});
