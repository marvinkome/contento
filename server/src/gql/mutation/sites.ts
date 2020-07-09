import { authenticated } from '@libs/auth';
import Site from '@models/sites';
import Page from '@models/pages';
import { IContext } from '@gql/index';

export const typeDef = `
    addSite(name: String!, description: String): Site
    updateSite(id: ID!, name: String, description: String): Site
    revokeSiteToken(id: ID!): Site
    deleteSite(id: ID!): ID
`;

export const resolver = {
    addSite: authenticated(async (_: any, data: any, context: IContext) => {
        const site = new Site({
            name: data.name,
            description: data.description,
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
            throw Error('Site not found, possibly deleted or belongs to another user');
        }

        if (data.name) {
            site.name = data.name;
        }

        if (data.description) {
            site.description = data.description;
        }

        return site.save();
    }),

    revokeSiteToken: authenticated(async (_: any, data: any, context: IContext) => {
        const site = await Site.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!site) {
            throw Error('Site not found, possibly deleted or belongs to another user');
        }

        site.lastTokenReset = Date.now();

        return site.save();
    }),

    deleteSite: authenticated(async (_: any, data: any, context: IContext) => {
        const site = await Site.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!site) {
            throw Error('Site not found, possibly deleted or belongs to another user');
        }
        // delete pages
        await Page.deleteMany({ site: site.id });

        await site.remove();
        return data.id;
    })
};
