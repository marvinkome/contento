describe('Registration Page', () => {
    beforeEach(() => {
        // add fixtures
        cy.fixture('registration/successful.json').as('successJSON');
        cy.fixture('registration/dup-email.json').as('dupEmailJSON');

        cy.visit('/register');
    });

    it('should display registration form <snapshot>', () => {
        cy.get('.auth__container').toMatchSnapshot();
    });

    it('should verify email', () => {
        // server setup
        cy.server();
        cy.route('POST', '/api/auth/verify-email', { message: 'Test' }).as('verifyEmail');

        // type in email
        cy.get('input#email').type('testuser@gmail.com');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@verifyEmail').should((xhr) => {
            // check that request was made
            assert.deepEqual(xhr.request.body, {
                email: 'testuser@gmail.com',
                callbackUrl: '/register'
            });
            assert.isNotNull(xhr.response.body, 'Verify Email API Called');
        });
    });

    it('should register a new user with complete details', () => {
        cy.visit('/register?token=tests');

        // server setup
        cy.server();
        cy.route('POST', '/api/auth/register', '@successJSON').as('registerApi');

        // type in full name
        cy.get('input#fullName').type('Test User');

        // type in password
        cy.get('input#password').type('TestPassword');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@registerApi').should(() => {
            // check that token has been added to lacal storage
            expect(localStorage.getItem('contento_auth_token')).to.eq('user token');
        });
    });

    it('should not register a user with duplicate email', () => {
        // server setup
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/auth/verify-email',
            response: '@dupEmailJSON',
            status: 400
        }).as('badVerifyEmail');

        // type in email
        cy.get('input#email').type('testuser@gmail.com');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@badVerifyEmail').should((xhr) => {
            expect(xhr.status, 'Bad Request', 400);
        });
    });
});
