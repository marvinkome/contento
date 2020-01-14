import gql from 'graphql-tag';

export const GET_SITES = gql`
    query GetSites {
        sites {
            id
            name
        }
    }
`;
