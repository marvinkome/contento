const __DEV__ = process.env.NODE_ENV === 'development';

export const AUTH_TOKEN_KEY = 'contentlify_auth_token';
export const API_URL = __DEV__ ? 'http://localhost:7077' : 'https://mycontento.com/api';
export const APP_URL = __DEV__ ? 'http://localhost:3033' : 'https://mycontento.com';
export const GITHUB_CLIENT_KEY = __DEV__ ? 'edb690e9e92ffbbe926d' : 'c7a5dd1f5fd110551912';
export const GOOGLE_CLIENT_KEY = __DEV__
    ? '764204004419-vq0lhhuutp7jjhushatuvcmm7gd695np.apps.googleusercontent.com'
    : '764204004419-2jqhlgh99olns4dsqs1sn085vrleg5k9.apps.googleusercontent.com';
