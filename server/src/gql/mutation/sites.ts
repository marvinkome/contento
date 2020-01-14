import { authenticated } from '@libs/auth';
import Site from '@models/sites';
import { IContext } from '@gql/index';

export const typeDef = `
    addSite(name: String!): Site
    updateSite(id: ID!, name: String): Site
    deleteSite(id: ID!): ID
`;

export const resolver = {
    addSite: authenticated(async (_: any, data: any, context: IContext) => {
        const site = new Site({
            name: data.name,
            owner: context.currentUser
        });

        return site.save();
    }),

    updateSite: authenticated(async (_: any, data: any, context: IContext) => {
        const site = await Site.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!site) {
            throw Error(
                'Site not found, possibly deleted or belongs to another user'
            );
        }

        site.name = data.name;

        return site.save();
    }),

    deleteSite: authenticated(async (_: any, data: any, context: IContext) => {
        const site = await Site.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!site) {
            throw Error(
                'Site not found, possibly deleted or belongs to another user'
            );
        }

        await site.remove();
        return data.id;
    })
};
