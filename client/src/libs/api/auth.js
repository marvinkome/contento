// Types
import { AxiosInstance } from 'axios'; // eslint-disable-line

export default class AuthClient {
    /**
     *
     * @param {AxiosInstance} client
     */
    constructor(client) {
        this.client = client;
    }

    userProfile() {
        return this.client.get('/auth/my-profile');
    }

    login(data) {
        return this.client.post('/auth/login', data);
    }

    verifyEmail(data) {
        return this.client.post('/auth/verify-email', data);
    }

    register(data) {
        return this.client.post('/auth/register', data);
    }

    loginGoogle(data) {
        return this.client.post('/auth/google', data);
    }

    loginGithub(data) {
        return this.client.post('/auth/github', data);
    }

    forgetPassword(data) {
        return this.client.post('/auth/forget-password', data);
    }

    resetPassword(data) {
        return this.client.post('/auth/reset-password', data);
    }

    updateProfile(data, config = {}) {
        return this.client.put('/auth/update-profile', data, config);
    }

    unlinkGithub() {
        return this.client.post('/auth/unlink-github');
    }

    unlinkGoogle() {
        return this.client.post('/auth/unlink-google');
    }
}
