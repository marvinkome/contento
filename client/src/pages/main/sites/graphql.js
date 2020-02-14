import gql from 'graphql-tag';

export const GET_SITES = gql`
    query GetSites {
        sites {
            id
            name
        }
    }
`;

export const ADD_SITE = gql`
    mutation AddSite($name: String!, $description: String) {
        addSite(name: $name, description: $description) {
            id
        }
    }
`;
