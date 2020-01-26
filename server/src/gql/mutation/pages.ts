import Page from '@models/pages';
import Site from '@models/sites';
import { authenticated } from '@libs/auth';
import { IContext } from '@gql/index';
import { convertToSlug } from '@libs/helpers';

export const inputDef = `
    input BlockInput {
        type: String!
        name: String
        slug: String
        content: String
    }
`;

export const typeDef = `
    addPage(name: String!, siteId: String!): Page
    updatePage(id: ID!, name: String): Page
    deletePage(id: ID!, siteId: String!): ID
    updateContents(id: ID! siteId: ID!, blocks: [BlockInput]): Page
`;

export const resolver = {
    addPage: authenticated(async (_: any, data: any, context: IContext) => {
        // get site
        const site = await Site.findOne({
            _id: data.siteId,
            owner: context.currentUser
        });

        if (!site) {
            throw Error('Site not found, possibly deleted or belongs to another user');
        }

        const page = new Page({
            name: data.name,
            slug: convertToSlug(data.name),
            site: site.id
        });

        return page.save();
    }),

    updatePage: authenticated(async (_: any, data: any, context: IContext) => {
        const page = await Page.findOne({
            _id: data.id,
            owner: context.currentUser
        });

        if (!page) {
            throw Error('Page not found, possibly deleted or belongs to another user');
        }

        page.name = data.name;
        page.slug = convertToSlug(data.name);

        return page.save();
    }),

    deletePage: authenticated(async (_: any, data: any, context: IContext) => {
        // get site
        const site = await Site.findOne({
            _id: data.siteId,
            owner: context.currentUser
        });

        if (!site) {
            throw Error('Site not found, possibly deleted or belongs to another user');
        }

        const page = await Page.findOne({
            _id: data.id,
            site: site.id
        });

        if (!page) {
            throw Error('Page not found, possibly deleted or belongs to another user');
        }

        await page.remove();
        return data.id;
    }),

    updateContents: authenticated(async (_: any, data: any, context: IContext) => {
        const page = await Page.findOne({
            _id: data.id,
            site: data.siteId
        });

        if (!page) {
            throw Error('Page not found, possibly deleted or belongs to another user');
        }

        page.contents = data.blocks;
        await page.save();

        return page;
    })
};
