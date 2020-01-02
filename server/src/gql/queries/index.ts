import { gql } from 'apollo-server-express';
import { IContext } from '@gql/index';
import { authenticated } from '@libs/auth';

import Page from '@models/pages';

export const queryType = gql`
    type Query {
        hello: String
        user: User
        pages: [Page]
        page(id: String): Page
    }
`;

export const queryResolver = {
    Query: {
        hello: () => 'world',
        user: authenticated(async function(_: any, __: any, context: IContext) {
            return context.currentUser;
        }),
        pages: authenticated(async (_: any, __: any, context: IContext) => {
            return Page.find({ owner: context.currentUser?.id });
        }),
        page: authenticated(async (_: any, { id }: { id: string }, context: IContext) => {
            return Page.findOne({ owner: context.currentUser?.id, _id: id });
        })
    }
};
