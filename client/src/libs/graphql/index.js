import ApolloClient from 'apollo-boost';

export const setupApollo = (token) => {
    const client = new ApolloClient({
        request: (operation) => {
            operation.setContext({
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            });
        }
    });

    return { client };
};
