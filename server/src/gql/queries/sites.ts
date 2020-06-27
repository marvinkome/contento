import jwt from 'jsonwebtoken';
import Pages from '@models/pages';
import { gql } from 'apollo-server-express';
import { ISite } from '@models/sites';

export const siteType = gql`
    type Site {
        id: ID!
        name: String!
        description: String
        pages: [Page]

        siteSecretKey: String
    }
`;

export const siteResolvers = {
    Site: {
        pages: (site: ISite) => {
            return Pages.find({ site: site.id }); // get all pages with this site
        },

        siteSecretKey: async (site: ISite) => {
            site.lastTokenReset = Date.now();
            await site.save();

            return jwt.sign({ id: site.id }, process.env.APP_KEY || '');
        }
    }
};
