import schema from '../fixtures/gql_schema.json';

describe('Pages page test', () => {
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
                GetSite: {
                    site: {
                        id: 'randomID',
                        name: 'Test Site',
                        pages: []
                    }
                }
            }
        });

        cy.visit('/app/sites/randomID/pages');
    });

    it('displays page with no pages', () => {
        // mock gql response
        cy.mockGraphqlOps({
            operations: {
                GetSite: {
                    site: {
                        id: 'randomID',
                        name: 'Test Site',
                        pages: []
                    }
                }
            }
        });

        // check that sites are available
        cy.get('.page-list')
            .children()
            .should('have.length', 0);
    });

    it('displays page with list of pages', () => {
        // mock gql response
        cy.mockGraphqlOps({
            operations: {
                GetSite: {
                    site: {
                        id: 'randomID',
                        name: 'Test Site',
                        pages: [
                            {
                                id: 'randomPageId',
                                name: 'Test Page',
                                slug: 'testPage'
                            }
                        ]
                    }
                }
            }
        });

        // check that sites are available
        cy.get('.page-list .page-container')
            .its('length')
            .should('eq', 1);

        // check the first element contains correct details
        cy.get('.page-list .page-container')
            .eq(0)
            .get('.page-name')
            .contains('Test Page');
    });

    it('creates a new page', () => {
        cy.mockGraphqlOps({
            operations: {
                GetSite: {
                    site: {
                        id: 'randomID',
                        name: 'Test Site',
                        pages: []
                    }
                }
            }
        });

        // mock add mutation
        cy.mockGraphqlOps({
            operations: {
                AddPage: (v) => ({
                    addPage: {
                        id: '1110011',
                        name: v.name,
                        slug: v.slug
                    }
                })
            }
        });

        // expect list is currently empty
        cy.get('.page-list')
            .children()
            .should('have.length', 0);

        // open modal
        cy.get('.page-header .page-action .btn').click();

        // fill input
        cy.get('#add-page-modal input#page-name').type('Demo Page');
        cy.get('#add-page-modal #page-slug').type('page Slug');

        // submit form
        cy.get('#add-page-modal .btn').click();

        // expect form to not be submitted
        cy.get('input:invalid').should('have.length', 1);

        // re submit form
        cy.get('#add-page-modal #page-slug').clear();
        cy.get('#add-page-modal #page-slug').type('demoPage');

        // submit form
        cy.get('#add-page-modal .btn').click();

        // expect new item in the list
        cy.get('.page-list .page-container')
            .eq(0)
            .get('.page-name')
            .contains('Demo Page');
    });
});
