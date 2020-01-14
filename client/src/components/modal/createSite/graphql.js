import gql from 'graphql-tag';

export const ADD_SITE = gql`
    mutation AddSite($name: String!) {
        addSite(name: $name) {
            id
        }
    }
`;
