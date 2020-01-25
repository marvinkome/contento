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

    loginGoogle(data) {
        return this.client.post('/auth/google', data);
    }
}
