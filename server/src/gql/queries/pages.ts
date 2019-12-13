import { gql } from 'apollo-server-express';

export const pageType = gql`
    type Page {
        id: ID!
        name: String!
        contents: [String]
    }
`;

export const pageResolvers = {
    Page: {}
};
