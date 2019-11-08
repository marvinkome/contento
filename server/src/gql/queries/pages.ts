import { gql } from 'apollo-server-express';

export const pageType = gql`
    type Page {
        id: ID!
        name: String!
    }
`;

export const pageResolvers = {
    Page: {}
};
