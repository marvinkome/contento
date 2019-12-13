import { gql } from 'apollo-server-express';
import * as PageType from './pages';

export const mutationType = gql`
    type Mutation {
        ${PageType.typeDef}
    }

    ${PageType.inputDef}
`;

export const mutationResolvers = {
    Mutation: {
        ...PageType.resolver
    }
};
