import { gql } from 'apollo-server-express';
import * as PageType from './pages';
import * as SiteType from './sites';

export const mutationType = gql`
    type Mutation {
        ${PageType.typeDef}
        ${SiteType.typeDef}
    }

    ${PageType.inputDef}
`;

export const mutationResolvers = {
    Mutation: {
        ...PageType.resolver,
        ...SiteType.resolver
    }
};
