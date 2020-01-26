import { gql } from 'apollo-server-express';

export const pageType = gql`
    type Page {
        id: ID!
        name: String!
        slug: String!
        contents: [Content]
    }
`;

export const pageResolvers = {
    Page: {}
};
