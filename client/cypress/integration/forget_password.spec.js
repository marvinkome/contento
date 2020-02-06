describe('Forget Password Page', () => {
    beforeEach(() => {
        cy.visit('/auth/forgot-password');
    });

    it('should display forgot password form', () => {
        cy.get('.auth__container').toMatchSnapshot();
    });

    it('should submit form to api', () => {
        // server setup
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/auth/forget-password',
            response: { message: 'Test' }
        }).as('forgetPasswordApi');

        // type in email
        cy.get('input#email').type('testuser@gmail.com');

        // click button
        cy.get('[data-testid="submit-btn"]').click();

        // check that request has been made to the server
        cy.wait('@forgetPasswordApi').then((xhr) => {
            // check that request was made
            assert.deepEqual(xhr.request.body, { email: 'testuser@gmail.com' });
            assert.isNotNull(xhr.response.body, 'Forgot password API Called');
        });
    });
});
