import gql from 'graphql-tag';

export const GET_SITES = gql`
    query GetSiteso {
        sites {
            id
            name
        }
    }
`;
