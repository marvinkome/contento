import { gql } from 'apollo-server-express';
import { IContext } from '@gql/index';
import { authenticated } from '@libs/auth';

import Page from '@models/pages';
import Site from '@models/sites';

export const queryType = gql`
    type Query {
        hello: String
        user: User
        sites: [Site]
        site(id: String): Site
        pages(siteId: String): [Page]
        page(id: String): Page
    }
`;

export const queryResolver = {
    Query: {
        hello: () => 'world',

        user: authenticated(async function(_: any, __: any, context: IContext) {
            return context.currentUser;
        }),

        sites: authenticated(async (_: any, __: any, context: IContext) => {
            return Site.find({ owner: context.currentUser?.id });
        }),

        site: authenticated(async (_: any, { id }: any, context: IContext) => {
            return Site.findOne({ owner: context.currentUser?.id, _id: id  });
        }),

        pages: authenticated(async (_: any, {siteId}: any, context: IContext) => {
            // find pages for the site where owner matches current users
            const site = Site.findOne({ _id: siteId, owner: context.currentUser?.id });

            if (!site) {
                throw Error('Site not found, possibly deleted or belongs to another user');
            }

            return Page.find({ site: siteId });
        }),

        page: authenticated(async (_: any, { id }: { id: string }, context: IContext) => {
            return Page.findOne({ owner: context.currentUser?.id, _id: id });
        }),
    }
};
