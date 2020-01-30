describe('Registration Page', () => {
    beforeEach(() => {
        // add fixtures
        cy.fixture('registration/successful.json').as('successJSON');
        cy.fixture('registration/dup-email.json').as('dupEmailJSON');

        cy.visit('/auth/register');
    });

    it('should display registration form <snapshot>', () => {
        cy.get('.auth__container').toMatchSnapshot();
    });

    it('should register a new user with complete details', () => {
        // server setup
        cy.server();
        cy.route('POST', '/api/auth/register', '@successJSON').as('registerApi');

        // type in full name
        cy.get('input#fullName').type('Test User');

        // type in email
        cy.get('input#email').type('testuser@gmail.com');

        // type in password
        cy.get('input#password').type('TestPassword');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@registerApi').should(() => {
            // check that token has been added to lacal storage
            expect(localStorage.getItem('contentlify_auth_token')).to.eq('user token');
        });
    });

    it('should not register a user with duplicate email', () => {
        // server setup
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/auth/register',
            response: '@dupEmailJSON',
            status: 400
        }).as('badRegisterApi');

        // type in full name
        cy.get('input#fullName').type('Test User');

        // type in email
        cy.get('input#email').type('duplicateEmail@gmail.com');

        // type in password
        cy.get('input#password').type('TestPassword');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@badRegisterApi').should((xhr) => {
            expect(xhr.status, 'Bad Request', 400);
        });
    });
});
