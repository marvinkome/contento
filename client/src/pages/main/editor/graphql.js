import gql from 'graphql-tag';

export const GET_PAGE = gql`
    query GetPage($pageid: String, $siteid: String) {
        page(id: $pageid, siteId: $siteid) {
            id
            name
            contents {
                id
                type
                name
                slug
                content
            }
        }
    }
`;

export const SAVE_BLOCKS = gql`
    mutation AddBlocksToPage($pageid: ID!, $siteid: ID!, $blocks: [BlockInput!]) {
        updateContents(id: $pageid, siteId: $siteid, blocks: $blocks) {
            id
            contents {
                id
                name
                content
                slug
                type
            }
        }
    }
`;
