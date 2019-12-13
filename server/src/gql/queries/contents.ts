import { gql } from 'apollo-server-express';

export const contentType = gql`
    type Content {
        id: ID!
        type: String!
        name: String!
        content: String!
    }
`;

export const contentResolvers = {
    Content: {}
};
