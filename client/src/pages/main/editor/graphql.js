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
