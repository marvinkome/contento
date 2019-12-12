import gql from 'graphql-tag';

export const GET_PAGES = gql`
    query GetPages {
        pages {
            id
            name
        }
    }
`;

export const ADD_PAGE = gql`
    mutation AddPage($name: String!) {
        addPage(name: $name) {
            id
            name
        }
    }
`;

export const DELETE_PAGE = gql`
    mutation DeletePage($id: ID!) {
        deletePage(id: $id)
    }
`;
