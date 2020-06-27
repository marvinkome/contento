import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { startLoader } from 'components/loader';
import { API_URL } from 'libs/keys';

export const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    }

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

export const httpLink = new HttpLink({
    uri: `${API_URL}/graphql`
});

export const authLink = (token) => {
    return new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });

        return forward(operation);
    });
};

export const loaderLink = new ApolloLink((operation, forward) => {
    let loaderCompleteCallback = startLoader();

    return forward(operation).map((data) => {
        loaderCompleteCallback();
        return data;
    });
});
