describe('Login Page', () => {
    beforeEach(() => {
        // add fixtures
        cy.fixture('login/successful.json').as('successJSON');
        cy.fixture('login/wrong-details.json').as('wrongDetailsJSON');

        cy.visit('/login');
    });

    it('should display login form', () => {
        // cy.get('[data-testid="login-page"]').toMatchSnapshot();
    });

    it('should fail to login a user with wrong details', () => {
        // server setup
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/auth/login',
            response: '@wrongDetailsJSON',
            status: 400
        }).as('failedLoginApi');

        // type in email
        cy.get('input#email').type('testuser@gmail.com');

        // type in password
        cy.get('input#password').type('wrongPassword');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@failedLoginApi').should((xhr) => {
            // check that server returned with bad request
            expect(xhr.status, 'Bad Request', 400);
        });
    });

    it('should login user with complete details', () => {
        // server setup
        cy.server();
        cy.route('POST', '/api/auth/login', '@successJSON').as('loginApi');

        // type in email
        cy.get('input#email').type('testuser@gmail.com');

        // type in password
        cy.get('input#password').type('TestPassword');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@loginApi').should(() => {
            // check that token has been added to lacal storage
            expect(localStorage.getItem('contentlify_auth_token')).to.eq('user token');
        });
    });
});
