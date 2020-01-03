import gql from 'graphql-tag';

export const GET_PAGE = gql`
    query GetPage($pageId: String) {
        page(id: $pageId) {
            id
            name
            contents {
                id
                type
                name
                content
            }
        }
    }
`;

export const SAVE_BLOCKS = gql`
    mutation AddBlocksToPage($pageid: ID!, $blocks: [BlockInput!]) {
        updateContents(id: $pageid, blocks: $blocks) {
            id
            contents {
                id
                name
                content
                type
            }
        }
    }
`;
