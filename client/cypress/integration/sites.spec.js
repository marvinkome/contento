import schema from '../fixtures/gql_schema.json';

describe('Sites page', () => {
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
                GetSites: {
                    sites: []
                }
            }
        });
        cy.visit('/app/sites');
    });

    it('displays page with no sites', () => {
        // mock gql response
        cy.mockGraphqlOps({
            operations: {
                GetSites: {
                    sites: []
                }
            }
        });

        // check that sites are available
        cy.get('.site-list')
            .children()
            .should('have.length', 0);
    });

    it('displays page with list of sites', () => {
        // mock gql response
        cy.mockGraphqlOps({
            operations: {
                GetSites: {
                    sites: [
                        {
                            id: '01110011',
                            name: 'Test Site'
                        }
                    ]
                }
            }
        });

        // check that sites are available
        cy.get('.site-list .site-container')
            .its('length')
            .should('eq', 1);

        // check the first element contains correct details
        cy.get('.site-list .site-container')
            .eq(0)
            .get('.site-name')
            .contains('Manage Test Site');
    });

    it('creates a new site', () => {
        // mock gql response
        cy.mockGraphqlOps({
            operations: {
                GetSites: {
                    sites: []
                }
            }
        });

        // mock add mutation
        cy.mockGraphqlOps({
            operations: {
                AddSite: (v) => ({
                    addSite: {
                        id: '1110011',
                        name: v.name
                    }
                })
            }
        });

        // expect list is currently empty
        cy.get('.site-list')
            .children()
            .should('have.length', 0);

        // open modal
        cy.get('.page-header .page-action .btn').click();

        // fill input
        cy.get('#create-site-modal input#site-name').type('Demo Site');
        cy.get('#create-site-modal #site-description').type('Demo site small description');

        // submit form
        cy.get('#create-site-modal .btn').click();

        // expect new item in the list
        cy.get('.site-list .site-container')
            .eq(0)
            .get('.site-name')
            .contains('Manage Demo Site');
    });
});
