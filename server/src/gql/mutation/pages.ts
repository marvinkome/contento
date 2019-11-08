import { authenticated } from '@libs/auth';
import Page from '@models/pages';
import { IContext } from '@gql/index';

export const typeDef = `
    addPage(name: String!): Page
`;

export const resolver = {
    addPage: authenticated(async (_: any, data: any, context: IContext) => {
        const page = new Page({
            name: data.name,
            owner: context.currentUser
        });

        return page.save();
    })
};
