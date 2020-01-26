// Types
import { AxiosInstance } from 'axios'; // eslint-disable-line

export default class MainClient {
    /**
     *
     * @param {AxiosInstance} client
     */
    constructor(client) {
        this.client = client;
    }

    getPage(pageSlug) {
        return this.client.get(`/pages/${pageSlug}`);
    }
}
