import { authenticated } from '@libs/auth';
import Page from '@models/pages';
import { IContext } from '@gql/index';

export const typeDef = `
    addPage(name: String!): Page
    updatePage(id: ID!, name: String): Page
    deletePage(id: ID!): Boolean
`;

export const resolver = {
    addPage: authenticated(async (_: any, data: any, context: IContext) => {
        const page = new Page({
            name: data.name,
            owner: context.currentUser
        });

        return page.save();
    }),

    updatePage: authenticated(async (_: any, data: any, context: IContext) => {
        const page = await Page.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!page) {
            throw Error(
                'Page not found, possibly deleted or belongs to another user'
            );
        }

        page.name = data.name;

        return page.save();
    }),

    deletePage: authenticated(async (_: any, data: any, context: IContext) => {
        const page = await Page.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!page) {
            throw Error(
                'Page not found, possibly deleted or belongs to another user'
            );
        }

        await page.remove();
        return true;
    })
};
