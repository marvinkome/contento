import axios from 'axios';
import { toast } from 'react-toastify';
import MainClient from './main';
import keys from 'libs/keys';

const mainInstance = axios.create({
    baseURL: `http://localhost:7077/api/cdn/sites/${keys.CONTENTO_API_KEY}`
});

// interceptors
mainInstance.interceptors.response.use(undefined, function(error) {
    if (!error.response) {
        return Promise.reject(error);
    }

    if (error.response.status >= 500) {
        toast.error(`[${error.response.status}] ${error.response.statusText}`);
        return Promise.reject(error);
    }

    if (error.response.status === 401) {
        toast.error('Please login/register before making this request');
        return Promise.reject(error);
    }

    if (error.response.status === 422) {
        let msg = error.response.data.error || error.toString();
        toast.error(msg);
    }

    let data = error.response.data;
    let message;

    switch (true) {
        case !!data.error:
            message = data.error.message;
            break;
        case !!data.message:
            message = data.message;
            break;
        case !!data.info:
            message = data.info;
            break;
        default:
            message = `[${error.response.status}] An error occurred`;
    }

    toast.error(message);

    return Promise.reject(error);
});

class HttpClient {
    constructor(client) {
        this.client = client;
        this.setAccessToken();
        this.initHttpVerbsWrapper();
    }

    initHttpVerbsWrapper = () => {
        const verbs = ['get', 'post', 'put', 'patch', 'delete'];
        verbs.forEach((verb) => {
            this[verb] = (...params) => {
                // start loader
                // let loaderCompleteCallback = startLoader();

                return new Promise((resolve, reject) => {
                    this.client[verb](...params)
                        .then(resolve)
                        .catch(reject);
                    // use then cb to stop loader
                    // .then(loaderCompleteCallback);
                });
            };
        });
    };

    setAccessToken = () => {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${keys.CONTENTO_API_SECRET}`;
    };

    removeAccessToken = () => {
        delete this.client.defaults.headers.common['Authorization'];
    };
}

export const httpClient = new HttpClient(mainInstance);
export const mainApi = new MainClient(httpClient);
