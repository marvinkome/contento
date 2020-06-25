const serverUrl = Cypress.env('serverUrl');

describe('Register page tests [E2E]', () => {
    beforeEach(() => {
        // remove test user from DB
        cy.request('DELETE', `${serverUrl}/api/auth/user`, {
            email: 'johndoe@gmail.com'
        });
    });

    it('creates a new user profile and set auth token', () => {
        // visit page
        cy.visit('/register');

        // server setup
        cy.server();
        cy.route('POST', `${serverUrl}/api/auth/register`).as('registerE2EApi');

        // type in full name
        cy.get('input#fullName').type('John Doe');

        // type in email
        cy.get('input#email').type('johndoe@gmail.com');

        // type in password
        cy.get('input#password').type('This is the password for john doe');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@registerE2EApi').should(() => {
            // check that token has been added to lacal storage
            expect(localStorage.getItem('contentlify_auth_token')).exist;

            // expect redirect to occur
            cy.url().should('include', '/');
        });
    });

    afterEach(() => {
        // remove test user from DB
        cy.request('DELETE', `${serverUrl}/api/auth/user`, {
            email: 'johndoe@gmail.com'
        });
    });
});
