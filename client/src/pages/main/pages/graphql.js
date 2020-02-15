import gql from 'graphql-tag';

export const GET_SITE_PAGES = gql`
    query GetSite($siteid: String) {
        site(id: $siteid) {
            id
            name
            pages {
                id
                name
                slug
            }
        }
    }
`;

export const ADD_PAGE = gql`
    mutation AddPage($name: String!, $siteid: String!, $slug: String!) {
        addPage(name: $name, siteId: $siteid, slug: $slug) {
            id
            name
            slug
        }
    }
`;

export const DELETE_PAGE = gql`
    mutation DeletePage($id: ID!, $siteid: String!) {
        deletePage(id: $id, siteId: $siteid)
    }
`;
