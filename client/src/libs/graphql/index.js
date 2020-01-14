import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onErrorLink, httpLink, authLink, loaderLink } from './links';

export const setupApollo = (token) => {
    const client = new ApolloClient({
        link: ApolloLink.from([onErrorLink, loaderLink, authLink(token), httpLink]),
        cache: new InMemoryCache()
    });

    return client;
};
